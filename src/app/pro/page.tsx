import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espace Pro — Achetez des Leads Location Benne | Prix-Location-Benne.fr',
  description: 'Recevez des demandes de chantier qualifiées dans votre département. Leads exclusifs, coordonnées complètes, paiement à l\'unité.',
}

export default function ProLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5" />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="animate-pulse">🟢</span> 10+ nouveaux leads par jour
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Des chantiers qualifiés{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                livrés dans votre boîte
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Des particuliers et pros de votre département cherchent un loueur de benne{' '}
              <strong className="text-white">maintenant</strong>. Achetez leurs coordonnées en exclusivité
              et transformez-les en chantiers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pro/inscription"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg shadow-amber-500/25"
              >
                Créer mon compte Pro →
              </Link>
              <Link
                href="/pro/connexion"
                className="border border-slate-700 text-slate-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 hover:border-slate-600 transition-all"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🔍', title: 'Consultez les leads', desc: 'Parcourez les demandes en temps réel, filtrées par département, type de déchet et volume. Aperçu gratuit (ville, volume, type).' },
              { icon: '💳', title: 'Achetez à l\'unité', desc: 'Choisissez les leads qui vous intéressent. 20€/lead ou achetez un pack (5 leads = 85€). Paiement sécurisé via PayPal.' },
              { icon: '📞', title: 'Contactez le client', desc: 'Recevez instantanément les coordonnées complètes (nom, téléphone, email, adresse du chantier). Lead exclusif, vendu à vous seul.' },
            ].map((step, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-amber-500/30 transition-all group">
                <div className="text-5xl mb-5">{step.icon}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 text-sm font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemple de lead */}
      <section className="py-20 border-t border-slate-800/50 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Exemple de lead que vous recevrez</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lead flouté */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 relative opacity-80">
              <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold">
                Avant achat
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Ville</span><span className="text-white font-medium">Villeurbanne</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Département</span><span className="text-white font-medium">Rhône (69)</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Type</span><span className="text-white font-medium">Gravats</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Volume</span><span className="text-white font-medium">8m³</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Profil</span><span className="text-white font-medium">Particulier</span></div>
                <hr className="border-slate-700" />
                <div className="flex justify-between"><span className="text-slate-500">Nom</span><span className="text-slate-600 blur-sm select-none">Jean Dupont</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Téléphone</span><span className="text-slate-600 blur-sm select-none">06 12 34 56 78</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Email</span><span className="text-slate-600 blur-sm select-none">jean@email.com</span></div>
              </div>
            </div>

            {/* Lead débloqué */}
            <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-2xl p-6 relative shadow-lg shadow-emerald-500/5">
              <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                ✅ Après achat
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Ville</span><span className="text-white font-medium">Villeurbanne</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Département</span><span className="text-white font-medium">Rhône (69)</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Type</span><span className="text-white font-medium">Gravats</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Volume</span><span className="text-white font-medium">8m³</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Profil</span><span className="text-white font-medium">Particulier</span></div>
                <hr className="border-slate-700" />
                <div className="flex justify-between"><span className="text-slate-500">Nom</span><span className="text-emerald-400 font-bold">Jean Dupont</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Téléphone</span><span className="text-emerald-400 font-bold">06 12 34 56 78</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Email</span><span className="text-emerald-400 font-bold">jean.dupont@email.com</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Adresse</span><span className="text-emerald-400 font-bold">12 rue de la Paix</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Tarifs simples, sans engagement</h2>
          <p className="text-slate-400 text-center mb-12 max-w-lg mx-auto">Achetez uniquement les leads qui vous intéressent. Pas d&apos;abonnement, pas de minimum.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: '1 Lead', price: '20€', per: 'par lead', desc: 'Idéal pour tester', features: ['1 lead exclusif', 'Coordonnées complètes', 'Achat instantané'], highlight: false },
              { name: 'Pack 5', price: '85€', per: '17€/lead', desc: 'Le plus populaire', features: ['5 leads exclusifs', 'Économisez 15€', 'Crédits valables 6 mois'], highlight: true },
              { name: 'Pack 10', price: '150€', per: '15€/lead', desc: 'Pour les pros actifs', features: ['10 leads exclusifs', 'Économisez 50€', 'Crédits valables 1 an'], highlight: false },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-8 text-center ${plan.highlight ? 'bg-gradient-to-b from-amber-500/10 to-orange-500/5 border-2 border-amber-500/30 relative' : 'bg-slate-900 border border-slate-800'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-4 py-1 rounded-full text-xs font-bold">
                    ⭐ Recommandé
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.desc}</p>
                <div className="text-4xl font-extrabold mb-1">{plan.price}</div>
                <div className="text-sm text-slate-500 mb-6">{plan.per}</div>
                <ul className="space-y-2 text-sm text-slate-400 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 justify-center">
                      <span className="text-emerald-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pro/inscription"
                  className={`block w-full py-3 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                >
                  Commencer
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-slate-800/50 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '35 000+', label: 'Communes couvertes' },
              { value: '114K', label: 'Pages indexées Google' },
              { value: '10+', label: 'Leads/jour' },
              { value: '96', label: 'Départements' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-extrabold text-amber-400">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à recevoir des chantiers ?</h2>
          <p className="text-slate-400 mb-8">Inscription gratuite en 30 secondes. Commencez à acheter des leads immédiatement.</p>
          <Link
            href="/pro/inscription"
            className="inline-flex bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-10 py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg shadow-amber-500/25"
          >
            Créer mon compte Pro gratuitement →
          </Link>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 border-t border-slate-800/50 text-center text-sm text-slate-600">
        <p>© 2026 prix-location-benne.fr — WADE STUDIO LTD</p>
      </footer>
    </div>
  )
}
