'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ConnexionPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Email ou mot de passe incorrect')
      setLoading(false)
      return
    }

    router.push('/pro/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 font-sans relative overflow-hidden flex flex-col">
      
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation (Minimal) */}
      <nav className="relative z-50 p-6 flex justify-center">
        <Link href="/pro" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
            🚛
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">Espace Pro</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Bon retour 👋</h1>
            <p className="text-slate-400">Accédez à votre marketplace de leads exclusifs</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 space-y-6 relative">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />

            {error && (
              <div className="relative bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm flex items-center gap-3">
                <span>⚠️</span> {error}
              </div>
            )}

            <div className="relative z-10 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Adresse Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="contact@votre-entreprise.fr"
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Mot de passe</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 py-4 rounded-2xl font-bold text-lg hover:from-amber-400 hover:to-orange-500 transition-all disabled:opacity-50 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </div>

            <div className="relative z-10 pt-4 text-center">
              <p className="text-sm text-slate-500">
                Vous n'avez pas de compte ?{' '}
                <Link href="/pro/inscription" className="text-amber-400 hover:text-amber-300 font-medium hover:underline transition-colors">
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
