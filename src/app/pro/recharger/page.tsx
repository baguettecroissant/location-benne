'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const PACKS = [
  { type: 'single', name: '1 Lead', credits: 1, price: 20, per: '20€/lead', desc: 'Idéal pour tester', icon: '🎯' },
  { type: 'pack5', name: 'Pack 5 Leads', credits: 5, price: 85, per: '17€/lead', desc: 'Économisez 15€', icon: '⭐', popular: true },
  { type: 'pack10', name: 'Pack 10 Leads', credits: 10, price: 150, per: '15€/lead', desc: 'Économisez 50€', icon: '🚀' },
]

export default function RechargerPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    }>
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
            setMessage(`✅ Paiement réussi ! ${receipt.pack} — ${receipt.credits} crédit${receipt.credits > 1 ? 's' : ''} ajouté${receipt.credits > 1 ? 's' : ''}. Réf: ${receipt.order_id?.slice(0, 12)}...`)
          } else {
            setMessage(`✅ Paiement réussi ! ${data.credits_added} crédit${data.credits_added > 1 ? 's' : ''} ajouté${data.credits_added > 1 ? 's' : ''}.`)
          }
        } else {
          setMessage(`⚠️ ${data.error || 'Erreur lors de la capture du paiement'}`)
        }
      }

      if (searchParams.get('cancelled') === 'true') {
        setMessage('❌ Paiement annulé. Vous n\'avez pas été débité.')
      }
    }
    load()
  }, [router, searchParams, supabase])

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mb-10 relative z-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">Recharger mes crédits</h1>
        <p className="text-lg text-slate-400">1 crédit = 1 lead exclusif avec coordonnées complètes. Zéro abonnement.</p>
      </div>

      {message && (
        <div className={`mb-10 p-5 rounded-2xl border flex items-center gap-3 font-medium shadow-xl relative z-10 ${
          message.startsWith('✅') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
          message.startsWith('❌') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
          'bg-amber-500/10 border-amber-500/20 text-amber-400'
        }`}>
          <span>{message.startsWith('✅') ? '🎉' : message.startsWith('❌') ? '🚫' : '⚠️'}</span>
          {message.substring(2)}
        </div>
      )}

      {/* Solde actuel */}
      <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 text-center shadow-2xl relative overflow-hidden group max-w-sm mx-auto md:mx-0">
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 relative z-10">Solde actuel</div>
        <div className="flex items-baseline justify-center gap-2 relative z-10">
          <div className="text-7xl font-black text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform duration-300">{credits}</div>
          <div className="text-xl font-bold text-amber-500/60">crédit{credits !== 1 ? 's' : ''}</div>
        </div>
      </div>

      {/* Packs */}
      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {PACKS.map(pack => (
          <div key={pack.type} className={`rounded-3xl p-8 text-center relative overflow-hidden transition-all duration-300 ${
            pack.popular
              ? 'bg-gradient-to-b from-slate-900 to-[#0a0f1c] border-2 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)] transform md:-translate-y-4 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]'
              : 'bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl'
          }`}>
            {pack.popular && (
              <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 py-1.5 text-xs font-bold uppercase tracking-wider">
                Le plus choisi
              </div>
            )}
            
            <div className={`text-5xl mb-6 ${pack.popular ? 'mt-4' : ''} drop-shadow-xl`}>{pack.icon}</div>
            
            <h3 className={`text-2xl font-bold mb-2 ${pack.popular ? 'text-amber-400' : 'text-white'}`}>{pack.name}</h3>
            <p className="text-slate-400 text-sm mb-6 font-medium">{pack.desc}</p>
            
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <div className="text-5xl font-black text-white">{pack.price}€</div>
            </div>
            
            <div className={`text-sm font-bold mb-8 ${pack.popular ? 'text-emerald-400 bg-emerald-500/10 inline-block px-3 py-1 rounded-lg' : 'text-slate-500'}`}>
              {pack.per}
            </div>
            
            <button
              onClick={() => handleBuy(pack.type)}
              disabled={purchasing !== null}
              className={`w-full py-4 rounded-2xl font-bold transition-all transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg ${
                pack.popular
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 hover:from-amber-400 hover:to-orange-500 shadow-amber-500/25'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}
            >
              {purchasing === pack.type ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Redirection...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 opacity-80" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74l3.144-20.106A.641.641 0 0 1 5.613 0h4.606c.322 0 .594.237.633.555l.894 7.218h4.084c4.686 0 7.399 2.115 6.46 6.31-1.071 4.791-4.717 7.254-9.37 7.254H7.076zM7.076 21.337v0z" fill="#253B80"/><path d="M10.852 7.773H6.505l-1.5 9.589a.64.64 0 0 0 .633.74h3.766a.64.64 0 0 0 .633-.541l.872-5.58a.64.64 0 0 1 .633-.541h1.564c3.42 0 5.405-1.545 4.718-4.609-.542-2.42-2.55-3.058-6.972-3.058v0z" fill="#179BD7"/><path d="M10.301 11.282H6.963l-1.056 6.746a.64.64 0 0 0 .633.74h3.29a.64.64 0 0 0 .633-.541l.872-5.58a.64.64 0 0 1 .633-.541h.523c1.782 0 3.013-.448 2.62-2.18-.328-1.458-1.721-1.573-4.21-1.573v0z" fill="#222D65"/></svg>
                  PayPal
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Info sécurité */}
      <div className="mt-12 bg-[#0a0f1c]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 text-center max-w-2xl mx-auto relative z-10 shadow-inner">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-400">
          <span className="flex items-center gap-2"><span className="text-emerald-400 text-lg">🔒</span> Paiement 100% sécurisé</span>
          <span className="flex items-center gap-2"><span className="text-blue-400 text-lg">💳</span> Cartes ou PayPal</span>
          <span className="flex items-center gap-2"><span className="text-amber-400 text-lg">⚡</span> Crédits instantanés</span>
        </div>
      </div>
    </div>
  )
}
