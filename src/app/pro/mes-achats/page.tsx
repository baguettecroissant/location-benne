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
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mb-10 relative z-10">
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Mes Achats</h1>
        <p className="text-lg text-slate-400">Historique complet de vos achats de leads et crédits</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-10 relative z-10">
        <StatCard icon="🎯" label="Leads achetés" value={stats.total_leads.toString()} />
        <StatCard icon="💳" label="Total dépensé" value={`${stats.total_spent}€`} />
        <StatCard icon="📦" label="Recharges" value={creditHistory.length.toString()} />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 relative z-10">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-inner ${
            activeTab === 'leads'
              ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
              : 'bg-[#0a0f1c] text-slate-400 hover:text-white border border-white/10 hover:bg-white/5'
          }`}
        >
          🎯 Leads ({purchases.length})
        </button>
        <button
          onClick={() => setActiveTab('credits')}
          className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-inner ${
            activeTab === 'credits'
              ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
              : 'bg-[#0a0f1c] text-slate-400 hover:text-white border border-white/10 hover:bg-white/5'
          }`}
        >
          💳 Crédits ({creditHistory.length})
        </button>
      </div>

      {/* Lead purchases */}
      <div className="relative z-10">
        {activeTab === 'leads' && (
          purchases.length === 0 ? (
            <EmptyState icon="📭" title="Aucun lead acheté" desc="Rendez-vous sur le marketplace pour acheter votre premier chantier" />
          ) : (
            <div className="space-y-4">
              {purchases.map(p => (
                <div key={p.id} className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all">
                  {/* Header row */}
                  <button
                    onClick={() => setExpandedLead(expandedLead === p.id ? null : p.id)}
                    className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 transition-colors text-left gap-4 hover:bg-white/5 ${expandedLead === p.id ? 'bg-white/5' : ''}`}
                  >
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-xl shrink-0 border border-emerald-500/20 shadow-inner">✅</div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-lg mb-1">{p.lead?.ville} <span className="text-slate-400 font-medium">({p.lead?.departement})</span></div>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-[#030712] border border-white/5 text-slate-300 px-2 py-0.5 rounded text-xs font-medium">
                            {p.lead?.type_dechet}
                          </span>
                          <span className="bg-[#030712] border border-white/5 text-slate-300 px-2 py-0.5 rounded text-xs font-medium">
                            {p.lead?.volume}
                          </span>
                          <span className="text-slate-500 text-xs flex items-center ml-1">
                            {p.lead?.profil === 'professionnel' ? '🏢 Pro' : '👤 Part.'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                      <div className="text-left sm:text-right">
                        <div className="text-emerald-400 font-bold mb-1">{p.lead?.prenom} {p.lead?.nom}</div>
                        <div className="text-xs text-slate-500">
                          {new Date(p.purchased_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                        <span className={`transform transition-transform ${expandedLead === p.id ? 'rotate-180' : ''}`}>▼</span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {expandedLead === p.id && p.lead && (
                    <div className="border-t border-white/5 p-6 bg-black/20">
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <DetailRow icon="📞" label="Téléphone" value={p.lead.telephone} link={`tel:${p.lead.telephone}`} />
                        <DetailRow icon="📧" label="Email" value={p.lead.email} link={`mailto:${p.lead.email}`} />
                        <DetailRow icon="📍" label="Adresse" value={p.lead.adresse} />
                        <DetailRow icon="📦" label="Volume" value={p.lead.volume} />
                        <DetailRow icon="🗓️" label="Date souhaitée" value={p.lead.date_livraison} />
                        <DetailRow icon="💰" label="Prix payé" value={`${p.amount}€`} />
                      </div>
                      {p.lead.message && (
                        <div className="bg-[#030712] border border-white/5 rounded-2xl p-5 text-sm text-slate-300 shadow-inner">
                          <span className="text-slate-500 font-medium block mb-2">Message du client :</span>
                          {p.lead.message}
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        {p.lead.telephone && (
                          <a href={`tel:${p.lead.telephone}`} className="flex-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-3 rounded-xl font-bold text-center text-sm hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2">
                            <span>📞</span> Appeler
                          </a>
                        )}
                        {p.lead.email && (
                          <a href={`mailto:${p.lead.email}`} className="flex-1 bg-white/5 text-white border border-white/10 py-3 rounded-xl font-bold text-center text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                            <span>📧</span> Envoyer un email
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
            <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Pack</th>
                      <th className="px-6 py-4 text-right">Crédits</th>
                      <th className="px-6 py-4 text-right">Montant</th>
                      <th className="px-6 py-4 text-center">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {creditHistory.map(c => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-slate-300 font-medium whitespace-nowrap">
                          {new Date(c.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white font-bold inline-flex items-center gap-2">
                            {c.pack_type === 'single' ? '🎯 1 Lead' : c.pack_type === 'pack5' ? '⭐ Pack 5' : '🚀 Pack 10'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-amber-400 font-black text-base">+{c.credits}</span>
                        </td>
                        <td className="px-6 py-4 text-right text-white font-bold text-base">{c.amount}€</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${
                            c.paypal_status === 'COMPLETED'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
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
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 text-center shadow-xl relative overflow-hidden group hover:border-white/10 transition-colors">
      <div className="absolute -top-6 -right-6 text-7xl opacity-5 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <div className="text-3xl mb-3 relative z-10">{icon}</div>
      <div className="text-3xl font-black text-white relative z-10">{value}</div>
      <div className="text-sm font-medium text-slate-500 mt-1 relative z-10">{label}</div>
    </div>
  )
}

function DetailRow({ icon, label, value, link }: { icon: string; label: string; value?: string; link?: string }) {
  if (!value) return null
  return (
    <div className="flex items-center gap-4 bg-[#030712] p-3 rounded-xl border border-white/5">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-500 font-medium mb-0.5">{label}</div>
        {link ? (
          <a href={link} className="text-emerald-400 font-bold hover:underline">{value}</a>
        ) : (
          <div className="text-white font-bold">{value}</div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-[#0a0f1c]/50 backdrop-blur-xl border border-white/5 rounded-3xl text-center py-32 text-slate-500 shadow-2xl">
      <div className="text-6xl mb-6 opacity-50 grayscale">{icon}</div>
      <p className="text-xl font-bold text-white mb-2">{title}</p>
      <p className="text-slate-400 max-w-md mx-auto">{desc}</p>
    </div>
  )
}
