'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export default function ProLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isAuth = !!user
  const isPublicPage = pathname === '/pro' || pathname === '/pro/inscription' || pathname === '/pro/connexion' || pathname === '/pro/confirmation'

  // Pages publiques (landing, inscription, connexion) : pas de sidebar
  if (isPublicPage) {
    return <div className="min-h-screen bg-[#030712] text-slate-50">{children}</div>
  }

  // Pages protégées : sidebar + contenu
  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 flex flex-col md:flex-row selection:bg-amber-500/30 font-sans">
      
      {/* Background Ambient Effects pour tout l'espace pro */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <Link href="/pro/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-sm shadow-lg shadow-amber-500/20">
            🚛
          </div>
          <span className="font-bold text-white tracking-tight">Espace Pro</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-400 hover:text-white p-2"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Overlay mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#030712]/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-[#0a0f1c]/90 backdrop-blur-xl border-r border-white/5 flex flex-col fixed h-full z-50 transition-transform duration-300 md:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } shadow-2xl`}>
        <div className="p-6 border-b border-white/5 hidden md:block">
          <Link href="/pro/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              🚛
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors leading-tight">Espace Pro</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Location Benne</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-2">
          <NavLink href="/pro/dashboard" icon="📊" label="Dashboard" active={pathname === '/pro/dashboard'} />
          <NavLink href="/pro/marketplace" icon="🏪" label="Marketplace" active={pathname === '/pro/marketplace'} />
          <NavLink href="/pro/mes-achats" icon="📋" label="Mes Achats" active={pathname === '/pro/mes-achats'} />
          <NavLink href="/pro/recharger" icon="💳" label="Recharger" active={pathname === '/pro/recharger'} />
          
          <div className="my-4 border-t border-white/5" />
          
          <NavLink href="/pro/profil" icon="👤" label="Mon Profil" active={pathname === '/pro/profil'} />
        </nav>

        <div className="p-4 border-t border-white/5 bg-[#030712]/50">
          <button
            onClick={() => { supabase.auth.signOut(); window.location.href = '/pro' }}
            className="w-full text-left text-sm font-medium text-slate-400 hover:text-white transition-all px-4 py-3 rounded-xl hover:bg-white/5 flex items-center gap-3"
          >
            <span>🚪</span> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 min-h-screen relative z-10 flex flex-col">
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, icon, label, active }: { href: string; icon: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
        active
          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]'
          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      <span className="text-lg opacity-90">{icon}</span>
      {label}
    </Link>
  )
}
