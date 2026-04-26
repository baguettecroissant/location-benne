import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// POST /api/pro/register — Créer le profil pro après signup
// Utilise le service_role pour bypass RLS
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user_id, first_name, last_name, company_name, phone, siret, departments } = body

    if (!user_id || !company_name || !phone || !departments?.length) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const admin = createAdminClient()

    // Vérifier que le user auth existe
    const { data: user, error: userError } = await admin.auth.admin.getUserById(user_id)
    if (userError || !user) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })
    }

    // Vérifier qu'un profil n'existe pas déjà
    const { data: existing } = await admin
      .from('pro_profiles')
      .select('id')
      .eq('id', user_id)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Profil déjà existant', profile: existing }, { status: 409 })
    }

    // Créer le profil pro (via admin = bypass RLS)
    const { data: profile, error: profileError } = await admin
      .from('pro_profiles')
      .insert({
        id: user_id,
        first_name: first_name || null,
        last_name: last_name || null,
        company_name,
        phone,
        siret: siret || null,
        departments,
        credits: 1, // 1 crédit offert
      })
      .select()
      .single()

    if (profileError) {
      console.error('Profile creation error:', profileError)
      return NextResponse.json({ error: 'Erreur création profil' }, { status: 500 })
    }

    return NextResponse.json({ success: true, profile })
  } catch (err) {
    console.error('Register API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
