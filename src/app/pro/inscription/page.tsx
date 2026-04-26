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
          data: { company_name: form.company_name, is_pro: true },
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

      // 2. Créer le profil pro via API (bypass RLS avec admin)
      const registerRes = await fetch('/api/pro/register', {
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

      if (!registerRes.ok) {
        const errData = await registerRes.json()
        console.error('Profile error:', errData)
        setError(errData.error || 'Erreur lors de la création du profil.')
        setLoading(false)
        return
      }

      // 3. Rediriger vers le dashboard
      router.push('/pro/dashboard')
    } catch (err) {
      setError('Erreur inattendue. Réessayez.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <Link href="/pro" className="text-4xl inline-block mb-4">🚛</Link>
          <h1 className="text-3xl font-bold text-white">Créer votre compte Pro</h1>
          <p className="text-slate-400 mt-2">Inscription gratuite — 1 lead offert pour tester</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Prénom *</label>
              <input
                type="text"
                required
                value={form.first_name}
                onChange={e => setForm({ ...form, first_name: e.target.value })}
                placeholder="Jean"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nom *</label>
              <input
                type="text"
                required
                value={form.last_name}
                onChange={e => setForm({ ...form, last_name: e.target.value })}
                placeholder="Dupont"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nom de l&apos;entreprise *</label>
            <input
              type="text"
              required
              value={form.company_name}
              onChange={e => setForm({ ...form, company_name: e.target.value })}
              placeholder="Benne Express SARL"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Téléphone *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="06 12 34 56 78"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">SIRET (optionnel)</label>
              <input
                type="text"
                value={form.siret}
                onChange={e => setForm({ ...form, siret: e.target.value })}
                placeholder="12345678901234"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="contact@votre-entreprise.fr"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Mot de passe *</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Minimum 6 caractères"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Départements d&apos;intervention * <span className="text-slate-500">({form.departments.length} sélectionné{form.departments.length > 1 ? 's' : ''})</span>
            </label>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 max-h-48 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {DEPARTEMENTS.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDept(d)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      form.departments.includes(d)
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Création en cours...' : 'Créer mon compte Pro →'}
          </button>

          <p className="text-center text-sm text-slate-500">
            Déjà inscrit ?{' '}
            <Link href="/pro/connexion" className="text-amber-400 hover:underline">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
