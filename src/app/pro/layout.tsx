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
    return <div className="min-h-screen bg-slate-950">{children}</div>
  }

  // Pages protégées : sidebar + contenu
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <Link href="/pro/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">🚛</span>
          <span className="font-bold text-white text-lg">Espace Pro</span>
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
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-50 transition-transform duration-300 md:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-5 border-b border-slate-800 hidden md:block">
          <Link href="/pro/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🚛</span>
            <span className="font-bold text-white text-lg">Espace Pro</span>
          </Link>
          <p className="text-xs text-slate-500 mt-1">prix-location-benne.fr</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLink href="/pro/dashboard" icon="📊" label="Dashboard" active={pathname === '/pro/dashboard'} />
          <NavLink href="/pro/marketplace" icon="🏪" label="Marketplace" active={pathname === '/pro/marketplace'} />
          <NavLink href="/pro/mes-achats" icon="📋" label="Mes Achats" active={pathname === '/pro/mes-achats'} />
          <NavLink href="/pro/recharger" icon="💳" label="Recharger" active={pathname === '/pro/recharger'} />
          <div className="my-2 border-t border-slate-800" />
          <NavLink href="/pro/profil" icon="👤" label="Mon Profil" active={pathname === '/pro/profil'} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => { supabase.auth.signOut(); window.location.href = '/pro' }}
            className="w-full text-left text-sm text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            ← Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, icon, label, active }: { href: string; icon: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active
          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  )
}
