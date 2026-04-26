'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const PACKS = [
  { type: 'single', name: '1 Lead', credits: 1, price: 20, per: '20€/lead', desc: 'Testez le service', icon: '🎯' },
  { type: 'pack5', name: 'Pack 5 Leads', credits: 5, price: 85, per: '17€/lead', desc: 'Économisez 15€', icon: '⭐', popular: true },
  { type: 'pack10', name: 'Pack 10 Leads', credits: 10, price: 150, per: '15€/lead', desc: 'Économisez 50€', icon: '🚀' },
]

export default function RechargerPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" /></div>}>
      <RechargerContent />
    </Suspense>
  )
}

function RechargerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/pro/connexion'); return }

      const { data: pro } = await supabase
        .from('pro_profiles')
        .select('credits')
        .eq('id', user.id)
        .single()

      if (pro) setCredits(pro.credits)
      setLoading(false)

      // Gérer le retour PayPal
      const success = searchParams.get('success')
      const orderId = searchParams.get('token')
      if (success === 'true' && orderId) {
        // Capturer le paiement
        const res = await fetch('/api/pro/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderId }),
        })
        const data = await res.json()
        if (res.ok && data.success) {
          setCredits(data.new_balance)
          const receipt = data.receipt
          if (receipt) {
            setMessage(`✅ Paiement reçu ! ${receipt.pack} — ${receipt.credits} crédit${receipt.credits > 1 ? 's' : ''} ajouté${receipt.credits > 1 ? 's' : ''} (${receipt.amount}€). Réf: ${receipt.order_id?.slice(0, 12)}...`)
          } else {
            setMessage(`✅ Paiement reçu ! ${data.credits_added} crédit${data.credits_added > 1 ? 's' : ''} ajouté${data.credits_added > 1 ? 's' : ''}.`)
          }
        } else {
          setMessage(`⚠️ ${data.error || 'Erreur lors de la capture du paiement'}`)
        }
      }

      if (searchParams.get('cancelled') === 'true') {
        setMessage('❌ Paiement annulé.')
      }
    }
    load()
  }, [])

  const handleBuy = async (packType: string) => {
    setPurchasing(packType)
    try {
      const res = await fetch('/api/pro/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pack_type: packType }),
      })
      const data = await res.json()
      if (res.ok && data.approve_url) {
        window.location.href = data.approve_url
      } else {
        alert(data.error || 'Erreur PayPal. Réessayez.')
        setPurchasing(null)
      }
    } catch {
      alert('Erreur réseau. Réessayez.')
      setPurchasing(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-2">💳 Recharger mes crédits</h1>
      <p className="text-slate-400 mb-8">Chaque crédit = 1 lead exclusif avec coordonnées complètes</p>

      {message && (
        <div className={`mb-8 p-4 rounded-xl border ${message.startsWith('✅') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : message.startsWith('❌') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
          {message}
        </div>
      )}

      {/* Solde actuel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 text-center">
        <div className="text-sm text-slate-500 mb-2">Solde actuel</div>
        <div className="text-5xl font-extrabold text-amber-400">{credits}</div>
        <div className="text-sm text-slate-500 mt-1">crédit{credits !== 1 ? 's' : ''} disponible{credits !== 1 ? 's' : ''}</div>
      </div>

      {/* Packs */}
      <div className="grid md:grid-cols-3 gap-6">
        {PACKS.map(pack => (
          <div key={pack.type} className={`rounded-2xl p-6 text-center relative ${
            pack.popular
              ? 'bg-gradient-to-b from-amber-500/10 to-orange-500/5 border-2 border-amber-500/30'
              : 'bg-slate-900 border border-slate-800'
          }`}>
            {pack.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-3 py-0.5 rounded-full text-xs font-bold">
                ⭐ Populaire
              </div>
            )}
            <div className="text-4xl mb-4">{pack.icon}</div>
            <h3 className="text-xl font-bold text-white mb-1">{pack.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{pack.desc}</p>
            <div className="text-4xl font-extrabold text-white mb-1">{pack.price}€</div>
            <div className="text-sm text-slate-500 mb-6">{pack.per}</div>
            <button
              onClick={() => handleBuy(pack.type)}
              disabled={purchasing !== null}
              className={`w-full py-3 rounded-xl font-bold transition-all disabled:opacity-50 ${
                pack.popular
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              {purchasing === pack.type ? '⏳ Redirection PayPal...' : 'Acheter via PayPal'}
            </button>
          </div>
        ))}
      </div>

      {/* Info sécurité */}
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
          <span>🔒 Paiement sécurisé PayPal</span>
          <span>💳 CB ou solde PayPal</span>
          <span>⚡ Crédits instantanés</span>
        </div>
      </div>
    </div>
  )
}
