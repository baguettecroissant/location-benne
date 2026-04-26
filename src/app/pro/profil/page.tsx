'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const DEPARTEMENTS = [
  '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19',
  '21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39',
  '40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58',
  '59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77',
  '78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','2A','2B'
]

interface ProProfile {
  id: string
  first_name: string | null
  last_name: string | null
  company_name: string
  phone: string
  siret: string | null
  departments: string[]
  credits: number
  total_purchased: number
  total_spent: number
  created_at: string
}

export default function ProfilPage() {
  const router = useRouter()
  const supabase = createClient()

  const [profile, setProfile] = useState<ProProfile | null>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [editMode, setEditMode] = useState(false)

  // Form state
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    phone: '',
    siret: '',
    departments: [] as string[],
  })

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/pro/connexion'); return }

      setEmail(user.email || '')

      const { data: pro } = await supabase
        .from('pro_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!pro) { router.push('/pro/inscription'); return }
      setProfile(pro)
      setForm({
        first_name: pro.first_name || '',
        last_name: pro.last_name || '',
        company_name: pro.company_name || '',
        phone: pro.phone || '',
        siret: pro.siret || '',
        departments: pro.departments || [],
      })
      setLoading(false)
    }
    load()
  }, [])

  const toggleDept = (d: string) => {
    setForm(prev => ({
      ...prev,
      departments: prev.departments.includes(d)
        ? prev.departments.filter(x => x !== d)
        : [...prev.departments, d],
    }))
  }

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)
    setMessage('')

    const { error } = await supabase
      .from('pro_profiles')
      .update({
        first_name: form.first_name || null,
        last_name: form.last_name || null,
        company_name: form.company_name,
        phone: form.phone,
        siret: form.siret || null,
        departments: form.departments,
      })
      .eq('id', profile.id)

    if (error) {
      setMessage('❌ Erreur lors de la sauvegarde')
      console.error(error)
    } else {
      setMessage('✅ Profil mis à jour avec succès')
      setProfile(prev => prev ? { ...prev, ...form } : prev)
      setEditMode(false)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">👤 Mon Profil</h1>
          <p className="text-slate-400 mt-1">Gérez vos informations personnelles</p>
        </div>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-slate-800 border border-slate-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            ✏️ Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => { setEditMode(false); setMessage('') }}
              className="bg-slate-800 border border-slate-700 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-amber-500 text-slate-950 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              {saving ? '⏳ ...' : '💾 Sauvegarder'}
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl border text-sm ${
          message.startsWith('✅')
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {message}
        </div>
      )}

      {/* Infos du compte */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-5">Informations personnelles</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldRow label="Prénom" value={form.first_name} editMode={editMode}
              onChange={v => setForm({ ...form, first_name: v })} placeholder="Jean" />
            <FieldRow label="Nom" value={form.last_name} editMode={editMode}
              onChange={v => setForm({ ...form, last_name: v })} placeholder="Dupont" />
          </div>
          <FieldRow label="Entreprise" value={form.company_name} editMode={editMode}
            onChange={v => setForm({ ...form, company_name: v })} placeholder="Benne Express SARL" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldRow label="Téléphone" value={form.phone} editMode={editMode}
              onChange={v => setForm({ ...form, phone: v })} placeholder="06 12 34 56 78" />
            <FieldRow label="SIRET" value={form.siret} editMode={editMode}
              onChange={v => setForm({ ...form, siret: v })} placeholder="12345678901234" />
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1">Email</label>
            <div className="text-white bg-slate-800/50 rounded-xl px-4 py-3 text-sm border border-slate-700/50">
              {email} <span className="text-slate-600 text-xs ml-2">(non modifiable)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Départements */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-2">📍 Départements d&apos;intervention</h2>
        <p className="text-slate-500 text-sm mb-4">
          {form.departments.length} département{form.departments.length > 1 ? 's' : ''} sélectionné{form.departments.length > 1 ? 's' : ''}
        </p>
        {editMode ? (
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
        ) : (
          <div className="flex flex-wrap gap-2">
            {form.departments.map(d => (
              <span key={d} className="bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-lg text-sm font-medium border border-amber-500/20">
                {d}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats résumé */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-5">📊 Résumé du compte</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-amber-400">{profile.credits}</div>
            <div className="text-xs text-slate-500 mt-1">Crédits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-emerald-400">{profile.total_purchased}</div>
            <div className="text-xs text-slate-500 mt-1">Leads achetés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-blue-400">{profile.total_spent}€</div>
            <div className="text-xs text-slate-500 mt-1">Total dépensé</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800 text-center text-xs text-slate-600">
          Membre depuis le {new Date(profile.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>
    </div>
  )
}

function FieldRow({ label, value, editMode, onChange, placeholder }: {
  label: string; value: string; editMode: boolean; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm text-slate-500 mb-1">{label}</label>
      {editMode ? (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      ) : (
        <div className="text-white bg-slate-800/50 rounded-xl px-4 py-3 text-sm border border-slate-700/50">
          {value || <span className="text-slate-600">Non renseigné</span>}
        </div>
      )}
    </div>
  )
}
