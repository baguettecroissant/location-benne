import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// POST /api/pro/notify-new-lead — Notifie les pros concernés par un nouveau lead
// Appelé après insertion d'un lead dans benne_leads
export async function POST(req: NextRequest) {
  try {
    // Vérifier l'autorisation via un header secret
    const authHeader = req.headers.get('x-api-key')
    if (authHeader !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await req.json()
    const { lead_id, departement, ville, type_dechet, volume } = body

    if (!lead_id || !departement) {
      return NextResponse.json({ error: 'lead_id et departement requis' }, { status: 400 })
    }

    const admin = createAdminClient()

    // Trouver tous les pros actifs qui couvrent ce département
    const { data: pros, error } = await admin
      .from('pro_profiles')
      .select('id, first_name, last_name, company_name')
      .eq('is_active', true)
      .contains('departments', [departement])

    if (error) {
      console.error('Error finding pros:', error)
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }

    if (!pros || pros.length === 0) {
      return NextResponse.json({ notified: 0, message: 'Aucun pro dans ce département' })
    }

    // Récupérer les emails des pros via auth
    let notifiedCount = 0
    for (const pro of pros) {
      try {
        const { data: authUser } = await admin.auth.admin.getUserById(pro.id)
        if (!authUser?.user?.email) continue

        const proName = pro.first_name || pro.company_name || 'Professionnel'
        const emailHtml = buildNotificationEmail({
          proName,
          ville,
          departement,
          type_dechet: type_dechet || 'Déchets',
          volume: volume || 'Non précisé',
        })

        // Envoyer l'email via Supabase Auth (admin)
        // Note: On utilise l'API interne Supabase pour envoyer des emails
        const resendRes = await fetch(`https://api.resend.com/emails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY || ''}`,
          },
          body: JSON.stringify({
            from: 'Prix-Location-Benne.fr <notifications@prix-location-benne.fr>',
            to: authUser.user.email,
            subject: `🟢 Nouveau lead disponible — ${ville} (${departement})`,
            html: emailHtml,
          }),
        })

        if (resendRes.ok) {
          notifiedCount++
        } else {
          console.error(`Failed to notify ${authUser.user.email}:`, await resendRes.text())
        }
      } catch (err) {
        console.error(`Error notifying pro ${pro.id}:`, err)
      }
    }

    return NextResponse.json({
      notified: notifiedCount,
      total_pros: pros.length,
    })
  } catch (err) {
    console.error('Notify API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

function buildNotificationEmail({ proName, ville, departement, type_dechet, volume }: {
  proName: string; ville: string; departement: string; type_dechet: string; volume: string
}) {
  return `
<div style="max-width:520px;margin:40px auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;border-radius:16px;overflow:hidden;border:1px solid #1e293b">
  <div style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:24px 32px;text-align:center">
    <div style="font-size:32px;margin-bottom:4px">🟢</div>
    <h1 style="color:white;font-size:20px;margin:0">Nouveau lead disponible !</h1>
  </div>
  <div style="padding:32px;color:#cbd5e1;font-size:15px;line-height:1.6">
    <p>Bonjour <strong style="color:white">${proName}</strong>,</p>
    <p>Un nouveau lead correspondant à votre zone d'intervention vient d'arriver sur le marketplace :</p>
    <div style="background:#1e293b;border-radius:12px;padding:20px;margin:20px 0">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px">📍 Ville</td><td style="color:white;font-weight:bold;text-align:right">${ville} (${departement})</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px">🗑️ Type</td><td style="color:white;text-align:right">${type_dechet}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px">📦 Volume</td><td style="color:white;text-align:right">${volume}</td></tr>
      </table>
    </div>
    <div style="text-align:center;margin:24px 0">
      <a href="https://www.prix-location-benne.fr/pro/marketplace" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#ea580c);color:#0f172a;padding:14px 32px;border-radius:12px;font-weight:bold;font-size:16px;text-decoration:none">🏪 Voir sur le Marketplace →</a>
    </div>
    <p style="font-size:13px;color:#64748b;text-align:center">Soyez le premier à saisir cette opportunité !</p>
  </div>
  <div style="border-top:1px solid #1e293b;padding:16px;text-align:center;font-size:12px;color:#475569">
    © 2026 Prix-Location-Benne.fr — Espace Professionnel
  </div>
</div>`
}
