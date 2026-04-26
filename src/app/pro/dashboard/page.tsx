'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface ProProfile {
  company_name: string
  first_name: string | null
  last_name: string | null
  credits: number
  total_purchased: number
  total_spent: number
  departments: string[]
}

interface Lead {
  id: string
  ville: string
  departement: string
  type_dechet: string
  volume: string
  created_at: string
  _status: string
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<ProProfile | null>(null)
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])
  const [availableCount, setAvailableCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/pro/connexion'); return }

      const { data: pro } = await supabase
        .from('pro_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!pro) { router.push('/pro/inscription'); return }
      setProfile(pro)

      // Charger les leads récents via l'API
      const res = await fetch('/api/pro/leads?page=1')
      if (res.ok) {
        const data = await res.json()
        setRecentLeads(data.leads?.slice(0, 5) || [])
        setAvailableCount(data.leads?.filter((l: Lead) => l._status === 'available').length || 0)
      }

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

  if (!profile) return null

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          Bonjour, <span className="text-amber-400">{profile.first_name || profile.company_name}</span>
        </h1>
        <p className="text-slate-400 mt-1">Voici votre tableau de bord · {profile.company_name}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon="💰"
          label="Crédits disponibles"
          value={profile.credits.toString()}
          sub={profile.credits === 0 ? 'Rechargez !' : 'leads à acheter'}
          color="amber"
          action={profile.credits === 0 ? '/pro/recharger' : undefined}
        />
        <StatCard
          icon="🏪"
          label="Leads disponibles"
          value={availableCount.toString()}
          sub="dans vos départements"
          color="emerald"
          action="/pro/marketplace"
        />
        <StatCard
          icon="📋"
          label="Leads achetés"
          value={profile.total_purchased.toString()}
          sub="au total"
          color="blue"
        />
        <StatCard
          icon="💳"
          label="Total dépensé"
          value={`${profile.total_spent}€`}
          sub="HT"
          color="purple"
        />
      </div>

      {/* Départements */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">📍 Vos départements</h2>
        <div className="flex flex-wrap gap-2">
          {profile.departments.map(d => (
            <span key={d} className="bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-lg text-sm font-medium border border-amber-500/20">
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Leads récents */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">🏪 Derniers leads disponibles</h2>
          <Link href="/pro/marketplace" className="text-sm text-amber-400 hover:underline">
            Voir tout →
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-slate-500 text-sm">Aucun lead disponible pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {recentLeads.map(lead => (
              <div key={lead.id} className={`flex items-center justify-between p-4 rounded-xl border ${
                lead._status === 'available' ? 'bg-slate-800/50 border-slate-700 hover:border-amber-500/30' :
                lead._status === 'owned' ? 'bg-emerald-500/5 border-emerald-500/20' :
                'bg-slate-800/30 border-slate-800 opacity-50'
              } transition-all`}>
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {lead._status === 'available' ? '🟢' : lead._status === 'owned' ? '✅' : '⬜'}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {lead.ville || 'Ville'} — {lead.type_dechet || 'Déchets'}
                    </div>
                    <div className="text-sm text-slate-500">
                      Dept {lead.departement} · {lead.volume || '?'}m³ · {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
                {lead._status === 'available' && (
                  <Link href="/pro/marketplace" className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-400 transition-colors">
                    Acheter
                  </Link>
                )}
                {lead._status === 'sold' && (
                  <span className="text-slate-600 text-sm">Vendu</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub, color, action }: {
  icon: string; label: string; value: string; sub: string; color: string; action?: string
}) {
  const colorMap: Record<string, string> = {
    amber: 'from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-400',
    emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-400',
    purple: 'from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-400',
  }
  const classes = colorMap[color] || colorMap.amber

  const content = (
    <div className={`bg-gradient-to-br ${classes} border rounded-2xl p-5 transition-all hover:scale-[1.02]`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-slate-400 font-medium">{label}</span>
      </div>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{sub}</div>
    </div>
  )

  return action ? <Link href={action}>{content}</Link> : content
}
