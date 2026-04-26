'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const DEPARTEMENTS = [
  '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19',
  '21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39',
  '40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58',
  '59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77',
  '78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','2A','2B'
]

export default function InscriptionPage() {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    phone: '',
    email: '',
    password: '',
    siret: '',
    departments: [] as string[],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleDept = (d: string) => {
    setForm(prev => ({
      ...prev,
      departments: prev.departments.includes(d)
        ? prev.departments.filter(x => x !== d)
        : [...prev.departments, d],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (form.departments.length === 0) {
      setError('Sélectionnez au moins 1 département')
      setLoading(false)
      return
    }

    try {
      // 1. Créer le compte auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { company_name: form.company_name, is_pro: true, first_name: form.first_name, last_name: form.last_name },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/pro/connexion`,
        },
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      if (!authData.user) {
        setError('Erreur lors de la création du compte')
        setLoading(false)
        return
      }

      // 2. Créer le profil pro via API
      try {
        await fetch('/api/pro/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: authData.user.id,
            first_name: form.first_name,
            last_name: form.last_name,
            company_name: form.company_name,
            phone: form.phone,
            siret: form.siret || null,
            departments: form.departments,
          }),
        })
      } catch (profileErr) {
        console.error('Profile creation failed:', profileErr)
      }

      // 3. TOUJOURS rediriger vers la page de confirmation
      router.push(`/pro/confirmation?email=${encodeURIComponent(form.email)}`)
    } catch (err) {
      setError('Erreur inattendue. Réessayez.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 font-sans relative overflow-x-hidden flex flex-col py-10">
      
      {/* Background Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation (Minimal) */}
      <nav className="relative z-50 px-6 pb-10 flex justify-center">
        <Link href="/pro" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
            🚛
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">Espace Pro</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Rejoignez le réseau</h1>
            <p className="text-slate-400 text-lg">Créez votre compte gratuitement. Sans engagement.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 md:p-10 space-y-6 relative">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />

            {error && (
              <div className="relative bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm flex items-center gap-3">
                <span>⚠️</span> {error}
              </div>
            )}

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Prénom *</label>
                <input
                  type="text"
                  required
                  value={form.first_name}
                  onChange={e => setForm({ ...form, first_name: e.target.value })}
                  placeholder="Jean"
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Nom *</label>
                <input
                  type="text"
                  required
                  value={form.last_name}
                  onChange={e => setForm({ ...form, last_name: e.target.value })}
                  placeholder="Dupont"
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="relative z-10">
              <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Nom de l'entreprise *</label>
              <input
                type="text"
                required
                value={form.company_name}
                onChange={e => setForm({ ...form, company_name: e.target.value })}
                placeholder="Benne Express SARL"
                className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="06 12 34 56 78"
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">SIRET <span className="text-slate-500 font-normal">(optionnel)</span></label>
                <input
                  type="text"
                  value={form.siret}
                  onChange={e => setForm({ ...form, siret: e.target.value })}
                  placeholder="12345678901234"
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@votre-entreprise.fr"
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Mot de passe *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 6 caractères"
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="relative z-10 pt-2">
              <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
                Départements d'intervention * <span className="text-amber-500 font-bold ml-1">{form.departments.length > 0 && `(${form.departments.length})`}</span>
              </label>
              <div className="bg-[#0a0f1c] border border-white/10 rounded-2xl p-4 max-h-56 overflow-y-auto shadow-inner">
                <div className="flex flex-wrap gap-2">
                  {DEPARTEMENTS.map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDept(d)}
                      className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all border ${
                        form.departments.includes(d)
                          ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                          : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 py-4 rounded-2xl font-bold text-lg hover:from-amber-400 hover:to-orange-500 transition-all disabled:opacity-50 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                {loading ? 'Création en cours...' : 'Créer mon compte Pro →'}
              </button>
            </div>

            <div className="relative z-10 pt-4 text-center">
              <p className="text-sm text-slate-500">
                Vous avez déjà un compte ?{' '}
                <Link href="/pro/connexion" className="text-amber-400 hover:text-amber-300 font-medium hover:underline transition-colors">
                  Connectez-vous
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
