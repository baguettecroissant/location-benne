import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createServerSupabase } from '@/lib/supabase/server'

// POST /api/pro/paypal/capture-order — Capture le paiement après validation PayPal
export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const body = await req.json()
    const { order_id } = body

    if (!order_id) {
      return NextResponse.json({ error: 'order_id requis' }, { status: 400 })
    }

    // Capturer le paiement PayPal
    const auth = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64')

    const baseUrl = process.env.PAYPAL_MODE === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com'

    const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${order_id}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
    })

    if (!captureRes.ok) {
      const err = await captureRes.text()
      console.error('PayPal capture error:', err)
      return NextResponse.json({ error: 'Erreur de capture PayPal' }, { status: 500 })
    }

    const capture = await captureRes.json()

    if (capture.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Paiement non complété' }, { status: 400 })
    }

    // Vérifier le montant et la devise capturés (anti-fraude)
    const capturedAmount = capture.purchase_units?.[0]?.payments?.captures?.[0]?.amount
    if (capturedAmount) {
      const EXPECTED_AMOUNTS: Record<string, number> = {
        single: 20, pack5: 85, pack10: 150,
      }
      const currency = capturedAmount.currency_code
      if (currency !== 'EUR') {
        console.error(`PayPal fraud: devise ${currency} au lieu de EUR — order ${order_id}`)
        return NextResponse.json({ error: 'Devise invalide' }, { status: 400 })
      }
    }

    const admin = createAdminClient()

    // Trouver la commande de crédits correspondante
    const { data: creditPurchase } = await admin
      .from('credit_purchases')
      .select('*')
      .eq('paypal_order_id', order_id)
      .eq('pro_id', user.id)
      .single()

    if (!creditPurchase) {
      return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
    }

    if (creditPurchase.paypal_status === 'COMPLETED') {
      return NextResponse.json({ error: 'Commande déjà traitée' }, { status: 409 })
    }

    // Vérifier que le montant capturé correspond au pack (anti-fraude)
    if (capturedAmount) {
      const paidAmount = parseFloat(capturedAmount.value)
      if (Math.abs(paidAmount - creditPurchase.amount) > 0.01) {
        console.error(`PayPal fraud: montant ${paidAmount}€ au lieu de ${creditPurchase.amount}€ — order ${order_id}`)
        return NextResponse.json({ error: 'Montant incorrect' }, { status: 400 })
      }
    }

    // Mettre à jour le statut de la commande
    await admin
      .from('credit_purchases')
      .update({ paypal_status: 'COMPLETED' })
      .eq('id', creditPurchase.id)

    // Ajouter les crédits au profil pro
    const { data: pro } = await admin
      .from('pro_profiles')
      .select('credits, total_spent')
      .eq('id', user.id)
      .single()

    if (pro) {
      await admin
        .from('pro_profiles')
        .update({
          credits: pro.credits + creditPurchase.credits,
          total_spent: (parseFloat(pro.total_spent) || 0) + creditPurchase.amount,
        })
        .eq('id', user.id)
    }

    // 📧 Envoyer le reçu par email (fire-and-forget)
    const packLabels: Record<string, string> = { single: '1 Lead', pack5: 'Pack 5 Leads', pack10: 'Pack 10 Leads' }
    const receiptData = {
      order_id: order_id,
      pack: packLabels[creditPurchase.pack_type] || creditPurchase.pack_type,
      credits: creditPurchase.credits,
      amount: creditPurchase.amount,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      new_balance: (pro?.credits || 0) + creditPurchase.credits,
    }

    if (process.env.RESEND_API_KEY && user.email) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Prix-Location-Benne.fr <notifications@prix-location-benne.fr>',
          to: user.email,
          subject: `🧾 Reçu — ${receiptData.pack} (${receiptData.amount}€)`,
          html: `
<div style="max-width:520px;margin:40px auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;border-radius:16px;overflow:hidden;border:1px solid #1e293b">
  <div style="background:linear-gradient(135deg,#f59e0b,#ea580c);padding:24px 32px;text-align:center">
    <h1 style="color:#0f172a;font-size:20px;margin:0">🧾 Reçu de paiement</h1>
  </div>
  <div style="padding:32px;color:#cbd5e1;font-size:15px;line-height:1.6">
    <p>Merci pour votre achat !</p>
    <div style="background:#1e293b;border-radius:12px;padding:20px;margin:20px 0">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="color:#64748b;padding:6px 0;font-size:13px">Pack</td><td style="color:white;font-weight:bold;text-align:right">${receiptData.pack}</td></tr>
        <tr><td style="color:#64748b;padding:6px 0;font-size:13px">Crédits ajoutés</td><td style="color:#f59e0b;font-weight:bold;text-align:right">+${receiptData.credits}</td></tr>
        <tr><td style="color:#64748b;padding:6px 0;font-size:13px">Montant</td><td style="color:white;font-weight:bold;text-align:right">${receiptData.amount}€</td></tr>
        <tr style="border-top:1px solid #334155"><td style="color:#64748b;padding:6px 0;font-size:13px">Nouveau solde</td><td style="color:#22c55e;font-weight:bold;text-align:right">${receiptData.new_balance} crédits</td></tr>
      </table>
    </div>
    <p style="font-size:12px;color:#64748b;text-align:center">Réf. PayPal : ${order_id}<br>Date : ${receiptData.date}</p>
  </div>
  <div style="border-top:1px solid #1e293b;padding:16px;text-align:center;font-size:12px;color:#475569">
    © 2026 Prix-Location-Benne.fr — Espace Professionnel
  </div>
</div>`,
        }),
      }).catch(err => console.error('Receipt email error:', err))
    }

    return NextResponse.json({
      success: true,
      credits_added: creditPurchase.credits,
      new_balance: (pro?.credits || 0) + creditPurchase.credits,
      receipt: receiptData,
    })
  } catch (err) {
    console.error('PayPal capture error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
