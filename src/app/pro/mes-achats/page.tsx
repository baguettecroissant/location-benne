'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Lead {
  nom: string
  prenom: string
  ville: string
  code_postal: string
  departement: string
  type_dechet: string
  volume: string
  profil: string
  telephone: string
  email: string
  adresse?: string
  date_livraison?: string
  message?: string
}

interface Purchase {
  id: string
  amount: number
  payment_method: string
  purchased_at: string
  lead: Lead
}

interface CreditPurchase {
  id: string
  credits: number
  amount: number
  pack_type: string
  paypal_status: string
  created_at: string
}

export default function MesAchatsPage() {
  const router = useRouter()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [creditHistory, setCreditHistory] = useState<CreditPurchase[]>([])
  const [stats, setStats] = useState({ total_spent: 0, total_leads: 0 })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'leads' | 'credits'>('leads')
  const [expandedLead, setExpandedLead] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/pro/purchases')
      if (res.status === 401) { router.push('/pro/connexion'); return }
      if (res.ok) {
        const data = await res.json()
        setPurchases(data.purchases || [])
        setCreditHistory(data.credit_history || [])
        setStats(data.stats || { total_spent: 0, total_leads: 0 })
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-white mb-2">📋 Mes Achats</h1>
      <p className="text-slate-400 mb-6">Historique complet de vos achats de leads et crédits</p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon="🎯" label="Leads achetés" value={stats.total_leads.toString()} />
        <StatCard icon="💰" label="Total dépensé" value={`${stats.total_spent}€`} />
        <StatCard icon="📦" label="Recharges" value={creditHistory.length.toString()} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'leads'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          🎯 Leads ({purchases.length})
        </button>
        <button
          onClick={() => setActiveTab('credits')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'credits'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          💳 Crédits ({creditHistory.length})
        </button>
      </div>

      {/* Lead purchases */}
      {activeTab === 'leads' && (
        purchases.length === 0 ? (
          <EmptyState icon="📭" title="Aucun lead acheté" desc="Rendez-vous sur le marketplace pour acheter votre premier lead" />
        ) : (
          <div className="space-y-3">
            {purchases.map(p => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                {/* Header row */}
                <button
                  onClick={() => setExpandedLead(expandedLead === p.id ? null : p.id)}
                  className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-slate-800/50 transition-colors text-left gap-3"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-lg shrink-0">✅</div>
                    <div className="min-w-0">
                      <div className="text-white font-bold">{p.lead?.ville} ({p.lead?.departement})</div>
                      <div className="text-xs text-slate-500">
                        {p.lead?.type_dechet} · {p.lead?.volume} · {p.lead?.profil === 'professionnel' ? '🏢 Pro' : '👤 Part.'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold">{p.lead?.prenom} {p.lead?.nom}</div>
                      <div className="text-xs text-slate-500">
                        {new Date(p.purchased_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <span className="text-slate-500 text-xl">{expandedLead === p.id ? '▲' : '▼'}</span>
                  </div>
                </button>

                {/* Expanded details */}
                {expandedLead === p.id && p.lead && (
                  <div className="border-t border-slate-800 p-5 bg-slate-800/20">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <DetailRow icon="📞" label="Téléphone" value={p.lead.telephone} link={`tel:${p.lead.telephone}`} />
                      <DetailRow icon="📧" label="Email" value={p.lead.email} link={`mailto:${p.lead.email}`} />
                      <DetailRow icon="📍" label="Adresse" value={p.lead.adresse} />
                      <DetailRow icon="📦" label="Volume" value={p.lead.volume} />
                      <DetailRow icon="🗓️" label="Date souhaitée" value={p.lead.date_livraison} />
                      <DetailRow icon="💰" label="Prix payé" value={`${p.amount}€`} />
                    </div>
                    {p.lead.message && (
                      <div className="bg-slate-900 rounded-xl p-4 text-sm text-slate-400">
                        <span className="text-slate-500 font-medium">Message : </span>{p.lead.message}
                      </div>
                    )}
                    <div className="flex gap-3 mt-4">
                      {p.lead.telephone && (
                        <a href={`tel:${p.lead.telephone}`} className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-center text-sm hover:bg-emerald-400 transition-colors">
                          📞 Appeler
                        </a>
                      )}
                      {p.lead.email && (
                        <a href={`mailto:${p.lead.email}`} className="flex-1 bg-blue-500 text-white py-2.5 rounded-xl font-bold text-center text-sm hover:bg-blue-400 transition-colors">
                          📧 Envoyer un email
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}

      {/* Credit purchases */}
      {activeTab === 'credits' && (
        creditHistory.length === 0 ? (
          <EmptyState icon="💳" title="Aucun achat de crédits" desc="Rechargez vos crédits pour acheter des leads" />
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left px-6 py-4 text-xs font-medium text-slate-500 uppercase">Date</th>
                    <th className="text-left px-6 py-4 text-xs font-medium text-slate-500 uppercase">Pack</th>
                    <th className="text-right px-6 py-4 text-xs font-medium text-slate-500 uppercase">Crédits</th>
                    <th className="text-right px-6 py-4 text-xs font-medium text-slate-500 uppercase">Montant</th>
                    <th className="text-right px-6 py-4 text-xs font-medium text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {creditHistory.map(c => (
                    <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(c.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">
                          {c.pack_type === 'single' ? '🎯 1 Lead' : c.pack_type === 'pack5' ? '⭐ Pack 5' : '🚀 Pack 10'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-amber-400 font-bold">+{c.credits}</span>
                      </td>
                      <td className="px-6 py-4 text-right text-white font-bold">{c.amount}€</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                          c.paypal_status === 'COMPLETED'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {c.paypal_status === 'COMPLETED' ? '✅ Payé' : '⏳ En cours'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  )
}

function DetailRow({ icon, label, value, link }: { icon: string; label: string; value?: string; link?: string }) {
  if (!value) return null
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        {link ? (
          <a href={link} className="text-emerald-400 font-medium hover:underline">{value}</a>
        ) : (
          <div className="text-white font-medium">{value}</div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="text-center py-20 text-slate-500">
      <div className="text-5xl mb-4">{icon}</div>
      <p className="text-lg">{title}</p>
      <p className="text-sm mt-2">{desc}</p>
    </div>
  )
}
