import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createServerSupabase } from '@/lib/supabase/server'

// POST /api/pro/purchase — Acheter un lead avec des crédits
export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabase()
    const admin = createAdminClient()

    // Auth check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const body = await req.json()
    const { lead_id } = body

    if (!lead_id) {
      return NextResponse.json({ error: 'lead_id requis' }, { status: 400 })
    }

    // Vérifier le profil pro et les crédits
    const { data: pro } = await admin
      .from('pro_profiles')
      .select('id, credits, total_purchased')
      .eq('id', user.id)
      .single()

    if (!pro) {
      return NextResponse.json({ error: 'Profil pro introuvable' }, { status: 403 })
    }

    if (pro.credits < 1) {
      return NextResponse.json({ error: 'Crédits insuffisants. Rechargez votre compte.' }, { status: 402 })
    }

    // Vérifier que le lead existe et n'est pas déjà vendu
    const { data: lead } = await admin
      .from('benne_leads')
      .select('*')
      .eq('id', lead_id)
      .eq('is_sold', false)
      .eq('marketplace_visible', true)
      .single()

    if (!lead) {
      return NextResponse.json({ error: 'Lead indisponible ou déjà vendu' }, { status: 409 })
    }

    // Transaction : acheter le lead
    // 1. Créer l'achat
    const { error: purchaseError } = await admin
      .from('lead_purchases')
      .insert({
        pro_id: user.id,
        lead_id: lead_id,
        amount: 20,
        payment_method: 'credits',
      })

    if (purchaseError) {
      // Probablement déjà vendu (UNIQUE constraint)
      return NextResponse.json({ error: 'Ce lead a déjà été acheté' }, { status: 409 })
    }

    // 2. Marquer le lead comme vendu
    await admin
      .from('benne_leads')
      .update({
        is_sold: true,
        sold_to: user.id,
        sold_at: new Date().toISOString(),
      })
      .eq('id', lead_id)

    // 3. Décrémenter les crédits
    await admin
      .from('pro_profiles')
      .update({
        credits: pro.credits - 1,
        total_purchased: pro.total_purchased + 1,
      })
      .eq('id', user.id)

    // Retourner le lead complet (toutes les coordonnées)
    return NextResponse.json({
      success: true,
      lead: { ...lead, _status: 'owned' },
      credits_remaining: pro.credits - 1,
    })
  } catch (err) {
    console.error('Purchase API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
