import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espace Pro — Achetez des Leads Location Benne | Prix-Location-Benne.fr',
  description: 'Recevez des demandes de chantier qualifiées dans votre département. Leads exclusifs, coordonnées complètes, paiement à l\'unité sans abonnement.',
}

export default function ProLandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 selection:bg-amber-500/30 font-sans overflow-x-hidden">
      
      {/* NAvigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/pro" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              🚛
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">Espace Pro</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/pro/connexion" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
              Se connecter
            </Link>
            <Link href="/pro/inscription" className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-full animate-[spin_3s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-slate-950 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all group-hover:bg-opacity-0 group-hover:text-slate-950">
                Créer mon compte
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-amber-400 mb-8 backdrop-blur-sm shadow-2xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            Plus de 60 chantiers disponibles aujourd'hui
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            Remplissez votre agenda.<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Sans abonnement.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Accédez à la première marketplace de leads qualifiés en location de benne. Particuliers et professionnels cherchent vos services <strong className="text-white font-semibold">dans votre département</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pro/inscription" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-2xl transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2">
              Voir les leads disponibles <span className="text-xl">→</span>
            </Link>
            <Link href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all backdrop-blur-sm flex items-center justify-center">
              Voir les tarifs
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 opacity-60 grayscale">
            <div className="flex items-center gap-2"><span className="text-xl">🔒</span> Paiement Sécurisé</div>
            <div className="hidden sm:flex items-center gap-2"><span className="text-xl">⭐</span> Leads Exclusifs</div>
            <div className="flex items-center gap-2"><span className="text-xl">⚡</span> Accès Immédiat</div>
          </div>
        </div>

        {/* Dashboard Mockup Showcase */}
        <div className="max-w-6xl mx-auto px-6 mt-20 relative z-10 perspective-1000">
          <div className="relative rounded-2xl md:rounded-[2.5rem] bg-slate-900/50 p-2 md:p-4 border border-white/10 shadow-2xl backdrop-blur-xl transform md:-rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out">
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10 pointer-events-none rounded-2xl" />
            <div className="rounded-xl md:rounded-3xl overflow-hidden border border-white/5 bg-[#0a0f1c] shadow-inner">
              {/* Fake UI Header */}
              <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              {/* Fake UI Body */}
              <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
                <div className="md:col-span-2 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl">🟢</div>
                        <div>
                          <div className="h-4 w-32 bg-white/20 rounded mb-2" />
                          <div className="flex gap-2">
                            <div className="h-3 w-16 bg-white/10 rounded" />
                            <div className="h-3 w-12 bg-white/10 rounded" />
                          </div>
                        </div>
                      </div>
                      <div className="h-10 w-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl" />
                    </div>
                  ))}
                </div>
                <div className="space-y-4 hidden md:block">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                    <div className="h-4 w-24 bg-white/20 rounded mb-6" />
                    <div className="w-32 h-32 rounded-full border-4 border-amber-500/30 mx-auto mb-6 flex items-center justify-center">
                      <div className="text-3xl font-bold text-amber-400">19</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-full bg-white/10 rounded" />
                      <div className="h-3 w-4/5 bg-white/10 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Pensé pour votre rentabilité.</h2>
            <p className="text-slate-400 text-lg">Ne perdez plus d'argent avec des abonnements inutiles ou des leads partagés.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full group-hover:bg-amber-500/20 transition-all" />
              <div className="text-4xl mb-6">💎</div>
              <h3 className="text-2xl font-bold text-white mb-3">100% Exclusif</h3>
              <p className="text-slate-400 text-lg max-w-md">Quand vous achetez un lead, il disparaît de la plateforme. Vous êtes le <strong className="text-white">seul et unique</strong> professionnel à contacter le client. Fini la guerre des prix.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/30 transition-all">
               <div className="text-4xl mb-6">🎯</div>
               <h3 className="text-xl font-bold text-white mb-3">Filtres ultra-précis</h3>
               <p className="text-slate-400">Ne voyez que les chantiers dans vos départements, triés par type de déchet et volume.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
               <div className="text-4xl mb-6">💳</div>
               <h3 className="text-xl font-bold text-white mb-3">Zéro abonnement</h3>
               <p className="text-slate-400">Achetez des crédits quand vous avez besoin de remplir votre planning. Aucun frais caché.</p>
            </div>
            
            {/* Feature 4 - Large */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden flex items-center justify-between group hover:border-blue-500/30 transition-all">
              <div>
                <div className="text-4xl mb-6">⚡</div>
                <h3 className="text-2xl font-bold text-white mb-3">Instantané & Automatisé</h3>
                <p className="text-slate-400 text-lg max-w-md">Soyez notifié par email dès qu'un nouveau chantier est publié dans votre zone. Achetez en 1 clic et recevez les coordonnées instantanément.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-slate-900/30 border-y border-white/5 relative z-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight">Avant d'acheter un lead...</h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Avant achat */}
            <div className="bg-slate-950 border border-white/5 rounded-3xl p-8 relative shadow-xl">
              <div className="absolute -top-4 left-8 bg-slate-800 text-slate-300 px-4 py-1.5 rounded-full text-sm font-bold border border-white/10 shadow-lg">
                👀 Ce que vous voyez (Gratuit)
              </div>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-500">Localisation</span>
                  <span className="text-white font-semibold">Toulouse (31)</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-500">Type de déchet</span>
                  <span className="text-white font-semibold">Gravats purs</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-500">Volume</span>
                  <span className="text-white font-semibold">8m³</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-500">Date souhaitée</span>
                  <span className="text-white font-semibold">Dans la semaine</span>
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Nom du client</span>
                    <span className="text-slate-700 blur-sm font-mono">Jean Dupont</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Téléphone</span>
                    <span className="text-slate-700 blur-sm font-mono">06 12 34 56 78</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Après achat */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-8 relative shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              <div className="absolute -top-4 left-8 bg-emerald-500 text-slate-950 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20">
                ✅ Après achat (Exclusif)
              </div>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-500">Localisation</span>
                  <span className="text-white font-semibold">Toulouse (31)</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-500">Type de déchet</span>
                  <span className="text-white font-semibold">Gravats purs</span>
                </div>
                
                <div className="pt-4 space-y-4 bg-emerald-500/5 -mx-4 px-4 py-4 rounded-2xl border border-emerald-500/10">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Nom du client</span>
                    <span className="text-emerald-400 font-bold">Jean Dupont</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Téléphone</span>
                    <span className="text-emerald-400 font-bold text-lg">06 12 34 56 78</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Email</span>
                    <span className="text-emerald-400 font-bold">jean.dupont@email.com</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-emerald-500/10">
                    <span className="text-slate-400">Adresse exacte</span>
                    <span className="text-emerald-400 font-bold text-right">14 Avenue de l'Europe<br/>31000 Toulouse</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Le juste prix. Zéro surprise.</h2>
            <p className="text-slate-400 text-lg">1 crédit = 1 lead exclusif complet. Paiement unique, facturation claire.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Basic */}
            <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-xl font-medium text-slate-300 mb-2">À l'unité</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">20€</span>
                <span className="text-slate-500">/ lead</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-300"><span className="text-amber-500">✓</span> 1 crédit valable à vie</li>
                <li className="flex items-center gap-3 text-slate-300"><span className="text-amber-500">✓</span> Sans engagement</li>
                <li className="flex items-center gap-3 text-slate-300"><span className="text-amber-500">✓</span> Facture pro immédiate</li>
              </ul>
              <Link href="/pro/inscription" className="block w-full py-3 rounded-xl border border-white/10 text-center font-medium hover:bg-white/5 transition-all">
                Tester avec 1 lead
              </Link>
            </div>

            {/* Pro - Highlighted */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-amber-500/50 rounded-3xl p-8 transform md:-translate-y-4 shadow-2xl shadow-amber-500/10 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                Le plus choisi
              </div>
              <h3 className="text-xl font-medium text-amber-400 mb-2">Pack 5 Leads</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-extrabold text-white">85€</span>
              </div>
              <div className="text-emerald-400 font-medium mb-6 bg-emerald-500/10 inline-block px-3 py-1 rounded-lg text-sm">
                Soit 17€ / lead (Économisez 15€)
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white"><span className="text-amber-500">✓</span> 5 crédits valables à vie</li>
                <li className="flex items-center gap-3 text-white"><span className="text-amber-500">✓</span> Notifications prioritaires</li>
                <li className="flex items-center gap-3 text-white"><span className="text-amber-500">✓</span> Facture pro immédiate</li>
                <li className="flex items-center gap-3 text-white"><span className="text-amber-500">✓</span> Support dédié</li>
              </ul>
              <Link href="/pro/inscription" className="block w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 text-center font-bold hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/25">
                Créer mon compte
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-xl font-medium text-slate-300 mb-2">Pack 10 Leads</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">150€</span>
              </div>
              <div className="text-emerald-400 font-medium mb-6 text-sm">
                Soit 15€ / lead (Économisez 50€)
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-300"><span className="text-amber-500">✓</span> 10 crédits valables à vie</li>
                <li className="flex items-center gap-3 text-slate-300"><span className="text-amber-500">✓</span> Parfait pour gros volumes</li>
                <li className="flex items-center gap-3 text-slate-300"><span className="text-amber-500">✓</span> Facture pro immédiate</li>
              </ul>
              <Link href="/pro/inscription" className="block w-full py-3 rounded-xl border border-white/10 text-center font-medium hover:bg-white/5 transition-all">
                Choisir ce pack
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-500/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Prenez de l'avance sur<br/>vos concurrents.
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Rejoignez des dizaines de professionnels qui remplissent leur planning chaque semaine grâce à nos leads.
          </p>
          <Link href="/pro/inscription" className="inline-block px-10 py-5 bg-white text-slate-950 font-bold rounded-full text-lg hover:bg-amber-400 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Créer mon compte pro gratuitement
          </Link>
          <p className="mt-6 text-slate-500 text-sm">Création en 1 minute. Sans carte bancaire.</p>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-8 border-t border-white/5 text-center text-sm text-slate-600 bg-[#030712] relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} prix-location-benne.fr — Espace Professionnel</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-slate-400 transition-colors">Mentions légales</Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
      
      {/* Global styles for animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-x-0 {
          transform: rotateX(0deg);
        }
        .-rotate-x-12 {
          transform: rotateX(12deg);
        }
      `}} />
    </div>
  )
}
