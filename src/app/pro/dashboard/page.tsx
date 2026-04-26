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

      // Charger les leads récents FILTRÉS par mes départements
      const deptParam = pro.departments?.length ? `&departments=${pro.departments.join(',')}` : ''
      const res = await fetch(`/api/pro/leads?page=1${deptParam}`)
      if (res.ok) {
        const data = await res.json()
        setRecentLeads(data.leads?.slice(0, 5) || [])
        setAvailableCount(data.total || 0)
      }

      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="mb-12 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 blur-[60px] rounded-full pointer-events-none" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 relative z-10">
          Bonjour, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{profile.first_name || profile.company_name}</span>
        </h1>
        <p className="text-lg text-slate-400 relative z-10">Voici votre tableau de bord · {profile.company_name}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        <StatCard
          icon="💰"
          label="Crédits"
          value={profile.credits.toString()}
          sub={profile.credits === 0 ? 'Rechargez !' : 'disponibles'}
          color="amber"
          action={profile.credits === 0 ? '/pro/recharger' : undefined}
        />
        <StatCard
          icon="🏪"
          label="Leads"
          value={availableCount.toString()}
          sub="dans vos depts"
          color="emerald"
          action="/pro/marketplace"
        />
        <StatCard
          icon="📋"
          label="Achetés"
          value={profile.total_purchased.toString()}
          sub="au total"
          color="blue"
        />
        <StatCard
          icon="💳"
          label="Dépenses"
          value={`${profile.total_spent}€`}
          sub="HT au total"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Derniers leads */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>⚡</span> Derniers leads disponibles
              </h2>
              <Link href="/pro/marketplace" className="text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors">
                Voir tout →
              </Link>
            </div>

            <div className="space-y-3 relative z-10">
              {recentLeads.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                  <p>Aucun nouveau lead dans vos départements.</p>
                </div>
              ) : (
                recentLeads.map(lead => (
                  <div key={lead.id} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all gap-4">
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-sm shrink-0 shadow-inner">
                        🟢
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white truncate">{lead.ville}</span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/5">
                            {lead.type_dechet}
                          </span>
                        </div>
                        <div className="text-sm text-slate-400 mt-1 truncate">
                          Dept {lead.departement} · {lead.volume} · {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/pro/marketplace"
                      className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 text-sm font-bold rounded-xl hover:from-amber-400 hover:to-orange-500 transition-all whitespace-nowrap text-center shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    >
                      Acheter
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Départements */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
            <h2 className="text-xl font-bold tracking-tight text-white mb-6 flex items-center gap-2 relative z-10">
              <span>📍</span> Vos zones
            </h2>
            <div className="flex flex-wrap gap-2 relative z-10">
              {profile.departments.map(d => (
                <span key={d} className="px-3.5 py-1.5 bg-slate-800/50 border border-white/10 text-slate-300 rounded-xl text-sm font-bold shadow-inner">
                  {d}
                </span>
              ))}
              <Link href="/pro/profil" className="px-3.5 py-1.5 border border-white/10 border-dashed text-slate-500 rounded-xl text-sm font-medium hover:text-white hover:border-white/30 transition-all flex items-center justify-center">
                + Modifier
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/5 border border-amber-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
             <h2 className="text-xl font-bold tracking-tight text-amber-400 mb-4">Besoin de leads ?</h2>
             <p className="text-sm text-slate-300 mb-6">Rechargez votre compte en crédits pour pouvoir acheter les prochains chantiers instantanément.</p>
             <Link href="/pro/recharger" className="block w-full py-3 bg-amber-500 text-slate-950 font-bold text-center rounded-xl hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]">
               Acheter des crédits
             </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub, color, action }: any) {
  const colors: Record<string, string> = {
    amber: 'from-amber-500/20 to-orange-500/5 text-amber-400 border-amber-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/30',
    blue: 'from-blue-500/20 to-indigo-500/5 text-blue-400 border-blue-500/30',
    purple: 'from-purple-500/20 to-pink-500/5 text-purple-400 border-purple-500/30',
  }

  const baseStyle = `bg-gradient-to-br ${colors[color] || colors.amber} border rounded-3xl p-6 relative overflow-hidden shadow-2xl backdrop-blur-xl group`
  
  const content = (
    <>
      <div className="absolute -top-6 -right-6 text-6xl opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">{icon}</div>
      <div className="text-3xl mb-4">{icon}</div>
      <div className="text-4xl font-black text-white tracking-tight mb-1">{value}</div>
      <div className="font-bold opacity-90 mb-1">{label}</div>
      <div className="text-xs opacity-60 font-medium uppercase tracking-wider">{sub}</div>
    </>
  )

  if (action) {
    return (
      <Link href={action} className={`${baseStyle} block hover:scale-[1.02] transition-transform`}>
        {content}
      </Link>
    )
  }

  return <div className={baseStyle}>{content}</div>
}
