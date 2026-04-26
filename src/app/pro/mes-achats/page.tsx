'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Purchase {
  id: string
  amount: number
  payment_method: string
  purchased_at: string
  lead: {
    nom: string
    prenom: string
    ville: string
    departement: string
    type_dechet: string
    volume: string
    telephone: string
    email: string
  }
}

export default function MesAchatsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/pro/connexion'); return }

      const { data } = await supabase
        .from('lead_purchases')
        .select(`
          id, amount, payment_method, purchased_at,
          benne_leads (nom, prenom, ville, departement, type_dechet, volume, telephone, email)
        `)
        .eq('pro_id', user.id)
        .order('purchased_at', { ascending: false })

      const formatted = (data || []).map((p: any) => ({
        ...p,
        lead: p.benne_leads,
      }))
      setPurchases(formatted)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-white mb-2">📋 Mes Achats</h1>
      <p className="text-slate-400 mb-8">Historique de tous vos leads achetés</p>

      {purchases.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-lg">Aucun achat pour le moment</p>
          <p className="text-sm mt-2">Rendez-vous sur le marketplace pour acheter votre premier lead</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {purchases.map(p => (
                <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {new Date(p.purchased_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{p.lead?.ville} ({p.lead?.departement})</div>
                    <div className="text-xs text-slate-500">{p.lead?.type_dechet} · {p.lead?.volume}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-emerald-400 font-medium">{p.lead?.prenom} {p.lead?.nom}</div>
                    <div className="text-xs text-slate-500">
                      {p.lead?.telephone && <a href={`tel:${p.lead.telephone}`} className="hover:text-emerald-400">{p.lead.telephone}</a>}
                      {p.lead?.telephone && p.lead?.email && ' · '}
                      {p.lead?.email && <a href={`mailto:${p.lead.email}`} className="hover:text-emerald-400">{p.lead.email}</a>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-bold">{p.amount}€</span>
                    <div className="text-xs text-slate-500">{p.payment_method}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
