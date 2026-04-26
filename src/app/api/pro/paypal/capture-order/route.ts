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

    return NextResponse.json({
      success: true,
      credits_added: creditPurchase.credits,
      new_balance: (pro?.credits || 0) + creditPurchase.credits,
    })
  } catch (err) {
    console.error('PayPal capture error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
