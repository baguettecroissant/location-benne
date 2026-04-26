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
  }, [router, supabase])

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6 relative z-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">Mon Profil</h1>
          <p className="text-lg text-slate-400">Gérez vos informations et zones d'intervention</p>
        </div>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-[#0a0f1c] border border-white/10 text-white px-6 py-3 rounded-2xl font-bold hover:bg-white/5 transition-all shadow-lg flex items-center gap-2"
          >
            <span>✏️</span> Modifier
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => { setEditMode(false); setMessage('') }}
              className="bg-[#0a0f1c] border border-white/10 text-slate-400 px-5 py-3 rounded-2xl font-bold hover:bg-white/5 hover:text-white transition-all shadow-inner"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 px-6 py-3 rounded-2xl font-bold hover:from-amber-400 hover:to-orange-500 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <><span>💾</span> Sauvegarder</>
              )}
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className={`mb-8 p-5 rounded-2xl border flex items-center gap-3 font-medium shadow-xl relative z-10 ${
          message.startsWith('✅')
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {message}
        </div>
      )}

      {/* Stats résumé */}
      <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none" />
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
          <span>📊</span> Résumé du compte
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 relative z-10">
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Crédits actuels</div>
            <div className="text-4xl font-black text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]">{profile.credits}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Leads achetés</div>
            <div className="text-4xl font-black text-emerald-400">{profile.total_purchased}</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total dépensé</div>
            <div className="text-4xl font-black text-blue-400">{profile.total_spent}€</div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-white/5 text-sm font-medium text-slate-500 relative z-10">
          Membre depuis le <span className="text-slate-300">{new Date(profile.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Infos du compte */}
        <div className="bg-[#0a0f1c]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Informations</h2>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldRow label="Prénom" value={form.first_name} editMode={editMode} onChange={v => setForm({ ...form, first_name: v })} placeholder="Jean" />
              <FieldRow label="Nom" value={form.last_name} editMode={editMode} onChange={v => setForm({ ...form, last_name: v })} placeholder="Dupont" />
            </div>
            <FieldRow label="Entreprise" value={form.company_name} editMode={editMode} onChange={v => setForm({ ...form, company_name: v })} placeholder="Benne Express SARL" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldRow label="Téléphone" value={form.phone} editMode={editMode} onChange={v => setForm({ ...form, phone: v })} placeholder="06 12 34 56 78" />
              <FieldRow label="SIRET" value={form.siret} editMode={editMode} onChange={v => setForm({ ...form, siret: v })} placeholder="12345678901234" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Email <span className="text-slate-600 text-xs ml-1 font-normal">(non modifiable)</span></label>
              <div className="text-white bg-[#030712] rounded-2xl px-5 py-4 text-sm border border-white/5 shadow-inner flex items-center gap-3 opacity-70">
                <span>🔒</span> {email}
              </div>
            </div>
          </div>
        </div>

        {/* Départements */}
        <div className="bg-[#0a0f1c]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span>📍</span> Zones d'intervention
            </h2>
            <p className="text-slate-400 text-sm">
              <strong className="text-amber-400">{form.departments.length}</strong> département{form.departments.length > 1 ? 's' : ''} sélectionné{form.departments.length > 1 ? 's' : ''}
            </p>
          </div>
          
          {editMode ? (
            <div className="bg-[#030712] border border-white/5 rounded-2xl p-5 flex-1 min-h-[250px] shadow-inner overflow-hidden flex flex-col">
              <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
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
          ) : (
            <div className="bg-[#030712] border border-white/5 rounded-2xl p-5 flex-1 shadow-inner">
              <div className="flex flex-wrap gap-2">
                {form.departments.length === 0 ? (
                  <span className="text-slate-500 italic text-sm">Aucun département sélectionné</span>
                ) : (
                  form.departments.map(d => (
                    <span key={d} className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3.5 py-1.5 rounded-xl text-sm font-bold shadow-sm">
                      {d}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  )
}

function FieldRow({ label, value, editMode, onChange, placeholder }: {
  label: string; value: string; editMode: boolean; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">{label}</label>
      {editMode ? (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#030712] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
        />
      ) : (
        <div className="text-white bg-[#030712] rounded-2xl px-5 py-4 text-sm border border-white/5 shadow-inner min-h-[54px] flex items-center">
          {value ? <span className="font-medium">{value}</span> : <span className="text-slate-600 italic">Non renseigné</span>}
        </div>
      )}
    </div>
  )
}
