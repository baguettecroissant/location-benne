'use client'

import { useEffect, useState, useCallback } from 'react'
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

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: page.toString() })
    if (showMyDepts && myDepartments.length > 0) {
      // Filter by all my departments
      params.set('departments', myDepartments.join(','))
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
      if (data.departments?.length) setMyDepartments(data.departments)
    }
    setLoading(false)
  }, [page, filter, showMyDepts, myDepartments])

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
  }, [])

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
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">🏪 Marketplace</h1>
          <p className="text-slate-400 mt-1">Achetez des leads exclusifs en temps réel</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-amber-500/10 border border-amber-500/20 px-5 py-3 rounded-xl">
            <span className="text-amber-400 text-2xl font-extrabold">{credits}</span>
            <span className="text-amber-400/60 text-sm ml-2">crédit{credits !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => { setShowMyDepts(!showMyDepts); setFilter({ ...filter, department: '' }); setPage(1) }}
          className={`px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            showMyDepts
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-500/50'
          }`}
        >
          📍 Mes départements {myDepartments.length > 0 && `(${myDepartments.join(', ')})`}
        </button>
        {!showMyDepts && (
          <select
            value={filter.department}
            onChange={e => { setFilter({ ...filter, department: e.target.value }); setPage(1) }}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 w-full sm:w-auto"
          >
            <option value="">Tous les départements</option>
            {Array.from({ length: 96 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        )}
        <select
          value={filter.type}
          onChange={e => { setFilter({ ...filter, type: e.target.value }); setPage(1) }}
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 w-full sm:w-auto"
        >
          <option value="">Tous les types</option>
          <option value="gravats">Gravats</option>
          <option value="encombrants">Encombrants</option>
          <option value="dechets-verts">Déchets verts</option>
          <option value="dib">DIB</option>
          <option value="melange">Mélange</option>
        </select>
        <div className="text-slate-500 text-sm flex items-center sm:ml-auto">
          {total} lead{total !== 1 ? 's' : ''} au total
        </div>
      </div>

      {/* Liste des leads */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-lg">Aucun lead disponible pour ces filtres</p>
          <p className="text-sm mt-2">Revenez plus tard ou élargissez vos critères</p>
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

      {/* Pagination */}
      {total > 20 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 disabled:opacity-30"
          >
            ←
          </button>
          <span className="px-4 py-2 text-slate-400">Page {page}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={leads.length < 20}
            className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 disabled:opacity-30"
          >
            →
          </button>
        </div>
      )}

      {/* Modal lead débloqué */}
      {selectedLead && selectedLead._status === 'owned' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6" onClick={() => setSelectedLead(null)}>
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">✅ Lead débloqué</h2>
              <button onClick={() => setSelectedLead(null)} className="text-slate-500 hover:text-white text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <InfoRow label="Nom" value={`${selectedLead.prenom || ''} ${selectedLead.nom || ''}`.trim()} highlight />
              <InfoRow label="Téléphone" value={selectedLead.telephone} highlight link={`tel:${selectedLead.telephone}`} />
              <InfoRow label="Email" value={selectedLead.email} highlight link={`mailto:${selectedLead.email}`} />
              <InfoRow label="Adresse" value={selectedLead.adresse} highlight />
              <hr className="border-slate-700" />
              <InfoRow label="Ville" value={`${selectedLead.ville} (${selectedLead.code_postal})`} />
              <InfoRow label="Département" value={selectedLead.departement} />
              <InfoRow label="Type" value={selectedLead.type_dechet} />
              <InfoRow label="Volume" value={selectedLead.volume} />
              <InfoRow label="Profil" value={selectedLead.profil} />
              <InfoRow label="Date souhaitée" value={selectedLead.date_livraison} />
              {selectedLead.message && <InfoRow label="Message" value={selectedLead.message} />}
            </div>
            <div className="mt-6 flex gap-3">
              {selectedLead.telephone && (
                <a href={`tel:${selectedLead.telephone}`} className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-bold text-center hover:bg-emerald-400 transition-colors">
                  📞 Appeler
                </a>
              )}
              {selectedLead.email && (
                <a href={`mailto:${selectedLead.email}`} className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold text-center hover:bg-blue-400 transition-colors">
                  📧 Email
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
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border transition-all gap-4 ${
      isOwned ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40' :
      isSold ? 'bg-slate-800/30 border-slate-800 opacity-40' :
      'bg-slate-900 border-slate-800 hover:border-amber-500/30'
    }`}>
      <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0 w-full">
        {/* Status badge */}
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl shrink-0 ${
          isOwned ? 'bg-emerald-500/10' : isSold ? 'bg-slate-700/50' : 'bg-amber-500/10'
        }`}>
          {isOwned ? '✅' : isSold ? '🔒' : '🟢'}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-white font-bold">{lead.ville || '—'}</span>
            <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs font-medium">
              {lead.departement}
            </span>
            <span className="bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded text-xs">
              {lead.type_dechet || 'Déchets'}
            </span>
            <span className="bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded text-xs">
              {lead.volume || '?'}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-slate-500 mt-1">
            {lead.profil === 'professionnel' ? '🏢 Pro' : '👤 Particulier'}
            {' · '}
            {new Date(lead.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            {lead.date_livraison && ` · Liv: ${lead.date_livraison}`}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="shrink-0 w-full sm:w-auto sm:ml-4 flex justify-end">
        {isAvailable && (
          <button
            onClick={onPurchase}
            disabled={purchasing}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-50 whitespace-nowrap"
          >
            {purchasing ? '⏳ ...' : '💰 Acheter (1 crédit)'}
          </button>
        )}
        {isOwned && (
          <button
            onClick={onView}
            className="w-full sm:w-auto bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-500/20 transition-all whitespace-nowrap"
          >
            👁️ Coordonnées
          </button>
        )}
        {isSold && (
          <span className="text-slate-600 text-sm font-medium w-full text-right sm:text-left">Vendu</span>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value, highlight, link }: { label: string; value?: string; highlight?: boolean; link?: string }) {
  if (!value) return null
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-500 text-sm">{label}</span>
      {link ? (
        <a href={link} className={`font-medium ${highlight ? 'text-emerald-400 hover:underline' : 'text-white'}`}>
          {value}
        </a>
      ) : (
        <span className={`font-medium ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
      )}
    </div>
  )
}
