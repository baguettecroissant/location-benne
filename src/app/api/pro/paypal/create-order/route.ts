import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createServerSupabase } from '@/lib/supabase/server'

const PACKS = {
  single: { credits: 1, amount: 20, label: '1 lead' },
  pack5: { credits: 5, amount: 85, label: 'Pack 5 leads' },
  pack10: { credits: 10, amount: 150, label: 'Pack 10 leads' },
}

// POST /api/pro/paypal/create-order — Crée une commande PayPal
export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const body = await req.json()
    const { pack_type } = body as { pack_type: keyof typeof PACKS }

    const pack = PACKS[pack_type]
    if (!pack) {
      return NextResponse.json({ error: 'Pack invalide' }, { status: 400 })
    }

    // Créer la commande PayPal via l'API REST v2
    const auth = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64')

    const baseUrl = process.env.PAYPAL_MODE === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com'

    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: pack.amount.toFixed(2),
          },
          description: `${pack.label} — Prix-Location-Benne.fr`,
          custom_id: JSON.stringify({ user_id: user.id, pack_type }),
        }],
        application_context: {
          brand_name: 'Prix-Location-Benne.fr',
          landing_page: 'LOGIN',
          user_action: 'PAY_NOW',
          return_url: `${req.headers.get('origin') || 'https://www.prix-location-benne.fr'}/pro/recharger?success=true`,
          cancel_url: `${req.headers.get('origin') || 'https://www.prix-location-benne.fr'}/pro/recharger?cancelled=true`,
        },
      }),
    })

    if (!orderRes.ok) {
      const err = await orderRes.text()
      console.error('PayPal create order error:', err)
      return NextResponse.json({ error: 'Erreur PayPal' }, { status: 500 })
    }

    const order = await orderRes.json()

    // Enregistrer la commande en DB
    const admin = createAdminClient()
    await admin.from('credit_purchases').insert({
      pro_id: user.id,
      credits: pack.credits,
      amount: pack.amount,
      pack_type,
      paypal_order_id: order.id,
      paypal_status: 'CREATED',
    })

    // Trouver le lien d'approbation PayPal
    const approveUrl = order.links?.find((l: { rel: string }) => l.rel === 'approve')?.href

    return NextResponse.json({
      order_id: order.id,
      approve_url: approveUrl,
    })
  } catch (err) {
    console.error('PayPal create error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
