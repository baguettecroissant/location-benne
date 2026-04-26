'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Lead {
  id: string
  nom?: string
  prenom?: string
  email?: string
  telephone?: string
  adresse?: string
  ville: string
  code_postal: string
  departement: string
  type_dechet: string
  volume: string
  profil: string
  date_livraison?: string
  message?: string
  created_at: string
  _status: 'available' | 'owned' | 'sold'
}

export default function MarketplacePage() {
  const router = useRouter()
  const supabase = createClient()

  const [leads, setLeads] = useState<Lead[]>([])
  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [filter, setFilter] = useState({ department: '', type: '' })
  const [myDepartments, setMyDepartments] = useState<string[]>([])
  const [showMyDepts, setShowMyDepts] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const myDepsRef = useRef<string[]>([])

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: page.toString() })
    if (showMyDepts && myDepsRef.current.length > 0) {
      params.set('departments', myDepsRef.current.join(','))
    } else if (filter.department) {
      params.set('department', filter.department)
    }
    if (filter.type) params.set('type', filter.type)

    const res = await fetch(`/api/pro/leads?${params}`)
    if (res.status === 401) { router.push('/pro/connexion'); return }
    if (res.ok) {
      const data = await res.json()
      setLeads(data.leads || [])
      setCredits(data.credits || 0)
      setTotal(data.total || 0)
      if (data.departments?.length && myDepsRef.current.length === 0) {
        myDepsRef.current = data.departments
        setMyDepartments(data.departments)
      }
    }
    setLoading(false)
  }, [page, filter, showMyDepts])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  // Realtime subscription pour les mises à jour
  useEffect(() => {
    const channel = supabase
      .channel('marketplace')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'benne_leads' }, () => {
        fetchLeads()
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'benne_leads' }, () => {
        fetchLeads()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [fetchLeads, supabase])

  const handlePurchase = async (leadId: string) => {
    if (credits < 1) {
      alert('Crédits insuffisants ! Rechargez votre compte.')
      router.push('/pro/recharger')
      return
    }

    if (!confirm('Acheter ce lead pour 1 crédit (20€) ? Cette action est irréversible.')) return

    setPurchasing(leadId)
    try {
      const res = await fetch('/api/pro/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId }),
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Erreur lors de l\'achat')
        return
      }

      // Mettre à jour localement
      setCredits(data.credits_remaining)
      setSelectedLead(data.lead)
      await fetchLeads()
    } catch (err) {
      alert('Erreur réseau. Réessayez.')
    } finally {
      setPurchasing(null)
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 relative z-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Marketplace
          </h1>
          <p className="text-lg text-slate-400 mt-2">Achetez des leads exclusifs en temps réel</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl">
            <div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Votre solde</div>
              <div className="flex items-baseline gap-1">
                <span className="text-amber-400 text-3xl font-black">{credits}</span>
                <span className="text-amber-500/60 font-medium">crédit{credits !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <Link href="/pro/recharger" className="ml-4 bg-white/5 hover:bg-white/10 border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all shadow-inner">
              +
            </Link>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-[#0a0f1c]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 sm:p-6 mb-8 shadow-2xl relative z-10">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
          <button
            onClick={() => { setShowMyDepts(!showMyDepts); setFilter({ ...filter, department: '' }); setPage(1) }}
            className={`px-5 py-3.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap shadow-inner flex items-center gap-2 ${
              showMyDepts
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>📍</span> Mes départements {myDepartments.length > 0 && `(${myDepartments.join(', ')})`}
          </button>
          
          {!showMyDepts && (
            <div className="relative w-full sm:w-auto">
              <select
                value={filter.department}
                onChange={e => { setFilter({ ...filter, department: e.target.value }); setPage(1) }}
                className="bg-[#030712] border border-white/10 rounded-2xl pl-4 pr-10 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 w-full sm:w-auto appearance-none shadow-inner"
              >
                <option value="">Tous les départements</option>
                {Array.from({ length: 96 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
            </div>
          )}
          
          <div className="relative w-full sm:w-auto">
            <select
              value={filter.type}
              onChange={e => { setFilter({ ...filter, type: e.target.value }); setPage(1) }}
              className="bg-[#030712] border border-white/10 rounded-2xl pl-4 pr-10 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 w-full sm:w-auto appearance-none shadow-inner"
            >
              <option value="">Tous les déchets</option>
              <option value="gravats">Gravats purs</option>
              <option value="encombrants">Encombrants</option>
              <option value="dechets-verts">Déchets verts</option>
              <option value="dib">DIB</option>
              <option value="melange">Mélange</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
          </div>
          
          <div className="text-slate-400 text-sm font-medium flex items-center sm:ml-auto bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <span className="text-amber-400 font-bold mr-2">{total}</span> lead{total !== 1 ? 's' : ''} au total
          </div>
        </div>
      </div>

      {/* Liste des leads */}
      <div className="relative z-10">
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-r-2 border-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-[#0a0f1c]/50 backdrop-blur-xl border border-white/5 rounded-3xl text-center py-32 text-slate-500 shadow-2xl">
            <div className="text-6xl mb-6 opacity-50 grayscale">📭</div>
            <p className="text-xl font-bold text-white mb-2">Aucun lead disponible</p>
            <p className="text-slate-400 max-w-md mx-auto">Revenez plus tard ou élargissez vos critères pour voir plus de chantiers.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {leads.map(lead => (
              <LeadCard
                key={lead.id}
                lead={lead}
                purchasing={purchasing === lead.id}
                onPurchase={() => handlePurchase(lead.id)}
                onView={() => setSelectedLead(lead)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 20 && (
        <div className="flex justify-center gap-3 mt-12 relative z-10">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-6 py-3 bg-[#0a0f1c] border border-white/10 rounded-xl font-bold text-slate-300 disabled:opacity-30 hover:bg-white/5 hover:text-white transition-all shadow-inner"
          >
            ← Précédent
          </button>
          <div className="px-6 py-3 bg-[#0a0f1c]/50 backdrop-blur-xl border border-white/5 rounded-xl font-bold text-amber-400">
            Page {page}
          </div>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={leads.length < 20}
            className="px-6 py-3 bg-[#0a0f1c] border border-white/10 rounded-xl font-bold text-slate-300 disabled:opacity-30 hover:bg-white/5 hover:text-white transition-all shadow-inner"
          >
            Suivant →
          </button>
        </div>
      )}

      {/* Modal lead débloqué */}
      {selectedLead && selectedLead._status === 'owned' && (
        <div className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-[#0a0f1c] border border-emerald-500/30 rounded-3xl p-6 md:p-10 max-w-lg w-full shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl shadow-inner border border-emerald-500/20">
                  ✅
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Lead débloqué</h2>
              </div>
              <button onClick={() => setSelectedLead(null)} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">✕</button>
            </div>
            
            <div className="space-y-4 relative z-10 bg-black/20 p-6 rounded-2xl border border-white/5 shadow-inner">
              <InfoRow label="Client" value={`${selectedLead.prenom || ''} ${selectedLead.nom || ''}`.trim()} highlight />
              <InfoRow label="Téléphone" value={selectedLead.telephone} highlight link={`tel:${selectedLead.telephone}`} />
              <InfoRow label="Email" value={selectedLead.email} highlight link={`mailto:${selectedLead.email}`} />
              <InfoRow label="Adresse" value={selectedLead.adresse} highlight />
              <hr className="border-white/5 my-4" />
              <InfoRow label="Ville" value={`${selectedLead.ville} (${selectedLead.code_postal})`} />
              <InfoRow label="Département" value={selectedLead.departement} />
              <InfoRow label="Type de déchet" value={selectedLead.type_dechet} />
              <InfoRow label="Volume" value={selectedLead.volume} />
              <InfoRow label="Profil" value={selectedLead.profil} />
              <InfoRow label="Date souhaitée" value={selectedLead.date_livraison} />
              {selectedLead.message && <InfoRow label="Message" value={selectedLead.message} />}
            </div>
            
            <div className="mt-8 flex gap-4 relative z-10">
              {selectedLead.telephone && (
                <a href={`tel:${selectedLead.telephone}`} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-bold text-center hover:from-emerald-400 hover:to-teal-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2">
                  <span>📞</span> Appeler
                </a>
              )}
              {selectedLead.email && (
                <a href={`mailto:${selectedLead.email}`} className="flex-1 bg-[#030712] border border-white/10 text-white py-4 rounded-xl font-bold text-center hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                  <span>📧</span> Email
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function LeadCard({ lead, purchasing, onPurchase, onView }: {
  lead: Lead; purchasing: boolean; onPurchase: () => void; onView: () => void
}) {
  const isAvailable = lead._status === 'available'
  const isOwned = lead._status === 'owned'
  const isSold = lead._status === 'sold'

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl transition-all gap-5 backdrop-blur-md shadow-lg ${
      isOwned ? 'bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10' :
      isSold ? 'bg-black/40 border border-white/5 opacity-50 grayscale' :
      'bg-[#0a0f1c]/80 border border-white/10 hover:border-amber-500/30 hover:bg-[#0a0f1c]'
    }`}>
      <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0 w-full">
        {/* Status badge */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner border ${
          isOwned ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
          isSold ? 'bg-slate-800/50 border-white/5 text-slate-500' : 
          'bg-amber-500/10 border-amber-500/20 text-amber-400'
        }`}>
          {isOwned ? '✅' : isSold ? '🔒' : '🟢'}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1.5">
            <span className="text-white font-extrabold text-lg tracking-tight truncate max-w-[200px] sm:max-w-xs">{lead.ville || '—'}</span>
            <span className="bg-white/10 border border-white/5 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-bold">
              {lead.departement}
            </span>
            <span className="bg-[#030712] border border-white/5 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-medium">
              {lead.type_dechet || 'Déchets'}
            </span>
            <span className="bg-[#030712] border border-white/5 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold">
              {lead.volume || '?'}
            </span>
          </div>
          <div className="text-sm text-slate-400 flex items-center gap-2">
            <span className={lead.profil === 'professionnel' ? 'text-blue-400 font-medium' : ''}>
              {lead.profil === 'professionnel' ? '🏢 Pro' : '👤 Particulier'}
            </span>
            <span>·</span>
            <span>{new Date(lead.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
            {lead.date_livraison && (
              <>
                <span>·</span>
                <span className="text-slate-300">Liv: {lead.date_livraison}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="shrink-0 w-full sm:w-auto sm:ml-4 flex justify-end">
        {isAvailable && (
          <button
            onClick={onPurchase}
            disabled={purchasing}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:from-amber-400 hover:to-orange-500 transition-all disabled:opacity-50 whitespace-nowrap shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transform hover:scale-[1.02]"
          >
            {purchasing ? '⏳ ...' : '💰 Acheter (1 crédit)'}
          </button>
        )}
        {isOwned && (
          <button
            onClick={onView}
            className="w-full sm:w-auto bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-500/20 transition-all whitespace-nowrap"
          >
            👁️ Voir coordonnées
          </button>
        )}
        {isSold && (
          <div className="w-full sm:w-auto bg-black/50 text-slate-500 border border-white/5 px-6 py-3 rounded-xl font-bold text-sm text-center">
            Vendu à un autre pro
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value, highlight, link }: { label: string; value?: string; highlight?: boolean; link?: string }) {
  if (!value) return null
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1">
      <span className="text-slate-500 text-sm mb-1 sm:mb-0">{label}</span>
      {link ? (
        <a href={link} className={`font-bold sm:text-right ${highlight ? 'text-emerald-400 hover:text-emerald-300' : 'text-white'}`}>
          {value}
        </a>
      ) : (
        <span className={`font-bold sm:text-right ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
      )}
    </div>
  )
}
