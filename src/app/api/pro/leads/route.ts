import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

// GET /api/pro/leads — Retourne les leads marketplace
// - Leads non vendus visibles par tous les pros authentifiés
// - Données sensibles masquées (nom, tel, email) sauf si acheté par ce pro
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabase()

    // Vérifier que l'utilisateur est connecté et est un pro
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // Vérifier le profil pro
    const { data: proProfile } = await supabase
      .from('pro_profiles')
      .select('id, departments, credits')
      .eq('id', user.id)
      .single()

    if (!proProfile) {
      return NextResponse.json({ error: 'Profil pro introuvable' }, { status: 403 })
    }

    // Paramètres de filtre
    const url = new URL(req.url)
    const department = url.searchParams.get('department')
    const departments = url.searchParams.get('departments') // comma-separated
    const type = url.searchParams.get('type')
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = 20

    // Query les leads visibles sur le marketplace
    let query = supabase
      .from('benne_leads')
      .select('*', { count: 'exact' })
      .eq('marketplace_visible', true)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (departments) {
      // Multi-department filter (for "Mes départements")
      const deptList = departments.split(',').map(d => d.trim()).filter(Boolean)
      if (deptList.length > 0) {
        query = query.in('departement', deptList)
      }
    } else if (department) {
      query = query.eq('departement', department)
    }
    if (type) {
      query = query.eq('type_dechet', type)
    }

    const { data: leads, error, count } = await query

    if (error) {
      console.error('Error fetching leads:', error)
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }

    // Récupérer les achats de ce pro
    const { data: purchases } = await supabase
      .from('lead_purchases')
      .select('lead_id')
      .eq('pro_id', user.id)

    const purchasedLeadIds = new Set((purchases || []).map(p => p.lead_id))

    // Formater les leads : masquer les données sensibles
    const formattedLeads = (leads || []).map(lead => {
      const isMine = purchasedLeadIds.has(lead.id)
      const isSold = lead.is_sold

      if (isMine) {
        // Ce pro a acheté ce lead — montrer tout
        return { ...lead, _status: 'owned' }
      } else if (isSold) {
        // Vendu à un autre pro — grisé
        return {
          id: lead.id,
          ville: lead.ville,
          departement: lead.departement,
          code_postal: lead.code_postal,
          type_dechet: lead.type_dechet,
          volume: lead.volume,
          profil: lead.profil,
          created_at: lead.created_at,
          _status: 'sold',
        }
      } else {
        // Disponible — montrer aperçu flouté
        return {
          id: lead.id,
          ville: lead.ville,
          departement: lead.departement,
          code_postal: lead.code_postal?.slice(0, 2) + 'xxx',
          type_dechet: lead.type_dechet,
          volume: lead.volume,
          profil: lead.profil,
          date_livraison: lead.date_livraison,
          created_at: lead.created_at,
          _status: 'available',
        }
      }
    })

    return NextResponse.json({
      leads: formattedLeads,
      total: count || 0,
      page,
      limit,
      credits: proProfile.credits,
      departments: proProfile.departments || [],
    })
  } catch (err) {
    console.error('Leads API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
