import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createServerSupabase } from '@/lib/supabase/server'

// POST /api/pro/purchase — Acheter un lead avec des crédits
// Utilise une fonction Postgres atomique pour éviter les race conditions
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

    // Appeler la fonction atomique Postgres
    const { data, error } = await admin.rpc('purchase_lead', {
      p_pro_id: user.id,
      p_lead_id: lead_id,
    })

    if (error) {
      console.error('Purchase RPC error:', error)
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }

    const result = data as { success: boolean; error?: string; credits_remaining?: number; lead?: Record<string, unknown> }

    if (!result.success) {
      const statusMap: Record<string, number> = {
        'Crédits insuffisants': 402,
        'Lead indisponible ou déjà vendu': 409,
        'Profil pro introuvable': 403,
      }
      return NextResponse.json(
        { error: result.error },
        { status: statusMap[result.error || ''] || 400 }
      )
    }

    // Retourner le lead complet avec toutes les coordonnées
    return NextResponse.json({
      success: true,
      lead: { ...result.lead, _status: 'owned' },
      credits_remaining: result.credits_remaining,
    })
  } catch (err) {
    console.error('Purchase API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
