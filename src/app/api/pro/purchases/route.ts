import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createServerSupabase } from '@/lib/supabase/server'

// GET /api/pro/purchases — Retourne l'historique des achats du pro
export async function GET() {
  try {
    const supabase = await createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const admin = createAdminClient()

    // Récupérer les achats avec les détails des leads
    const { data: purchases, error } = await admin
      .from('lead_purchases')
      .select(`
        id, amount, payment_method, purchased_at,
        benne_leads (
          id, nom, prenom, ville, code_postal, departement,
          type_dechet, volume, profil, telephone, email,
          adresse, date_livraison, message
        )
      `)
      .eq('pro_id', user.id)
      .order('purchased_at', { ascending: false })

    if (error) {
      console.error('Purchases fetch error:', error)
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }

    // Récupérer les achats de crédits
    const { data: creditHistory } = await admin
      .from('credit_purchases')
      .select('id, credits, amount, pack_type, paypal_status, created_at')
      .eq('pro_id', user.id)
      .eq('paypal_status', 'COMPLETED')
      .order('created_at', { ascending: false })

    // Stats
    const totalSpent = (purchases || []).reduce((sum, p) => sum + Number(p.amount), 0)
    const totalLeads = (purchases || []).length

    const formatted = (purchases || []).map((p: Record<string, unknown>) => ({
      ...(p as object),
      lead: p.benne_leads,
    }))

    return NextResponse.json({
      purchases: formatted,
      credit_history: creditHistory || [],
      stats: { total_spent: totalSpent, total_leads: totalLeads },
    })
  } catch (err) {
    console.error('Purchases API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
