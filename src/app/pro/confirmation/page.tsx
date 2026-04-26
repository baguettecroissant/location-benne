'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'votre adresse'

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        {/* Animated checkmark */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping" />
          <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 rounded-full w-24 h-24 flex items-center justify-center">
            <span className="text-4xl">📧</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Vérifiez votre boîte mail !
        </h1>
        <p className="text-slate-400 text-lg mb-2">
          Un email de confirmation a été envoyé à
        </p>
        <p className="text-amber-400 font-semibold text-lg mb-8">
          {email}
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 text-left">
          <h2 className="text-white font-bold mb-4 text-center">📋 Prochaines étapes</h2>
          <div className="space-y-4">
            <Step number={1} title="Confirmez votre email" description="Cliquez sur le lien dans l'email que vous venez de recevoir" done={false} />
            <Step number={2} title="Accédez au Dashboard" description="Connectez-vous pour découvrir le marketplace de leads" done={false} />
            <Step number={3} title="Achetez vos premiers leads" description="1 crédit offert pour tester — leads exclusifs dans vos départements" done={false} />
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/pro/connexion"
            className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 transition-all"
          >
            J&apos;ai confirmé → Se connecter
          </Link>
          <p className="text-slate-600 text-sm">
            Pas reçu l&apos;email ? Vérifiez vos spams ou{' '}
            <Link href="/pro/inscription" className="text-amber-400 hover:underline">
              réessayez
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function Step({ number, title, description, done }: {
  number: number; title: string; description: string; done: boolean
}) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
        done ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-amber-400 border border-slate-700'
      }`}>
        {done ? '✓' : number}
      </div>
      <div>
        <div className="text-white font-medium">{title}</div>
        <div className="text-slate-500 text-sm">{description}</div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
