import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, Truck, CheckCircle, Users, MapPin, Award, Leaf, Recycle, Shield, Phone, Clock, BookOpen, Building2, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "À Propos de Prix-Location-Benne.fr — Notre Mission & Nos Engagements",
    description: "Découvrez l'équipe derrière Prix-Location-Benne.fr : notre mission, nos valeurs, notre réseau de loueurs certifiés et notre engagement pour une gestion responsable des déchets de chantier.",
    alternates: { canonical: 'https://www.prix-location-benne.fr/a-propos' },
};

const chiffres = [
    { value: "35 000+", label: "Communes couvertes", icon: MapPin },
    { value: "100+", label: "Loueurs partenaires", icon: Truck },
    { value: "175 000", label: "Pages de service", icon: Building2 },
    { value: "24-48h", label: "Délai de livraison", icon: Clock },
];

const valeurs = [
    {
        icon: Shield,
        title: "Transparence totale",
        description: "Pas de frais cachés, pas de surprise. Chaque devis détaille le prix de la benne, le transport, la durée et le traitement des déchets. Nous comparons les offres pour vous donner le vrai prix.",
    },
    {
        icon: Leaf,
        title: "Éco-responsabilité",
        description: "100% de nos loueurs partenaires sont engagés dans une démarche de traitement conforme. Les déchets sont acheminés vers des centres agréés : ISDI pour les gravats, plateformes de compostage pour les déchets verts, centres de tri pour les DIB.",
    },
    {
        icon: Users,
        title: "Proximité & expertise",
        description: "Nous travaillons exclusivement avec des loueurs locaux implantés dans votre département. Résultat : des prix compétitifs, une connaissance du terrain, et un service réactif.",
    },
    {
        icon: Scale,
        title: "Conformité réglementaire",
        description: "Nous accompagnons nos clients dans le respect de la réglementation : décret 7 flux, loi AGEC, bordereau de suivi des déchets (BSD), autorisation de voirie. Chaque prestation est traçable.",
    },
];

const engagements = [
    "Devis 100% gratuit et sans engagement",
    "Aucune commission facturée au client",
    "Loueurs certifiés et assurés",
    "Traitement conforme des déchets (BSD fourni)",
    "Respect du décret 7 flux et de la loi AGEC",
    "Support disponible par téléphone et email",
    "Livraison sous 24 à 48h en zone urbaine",
    "Couverture nationale : 35 000+ communes",
];

export default function AProposPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Schema Organization */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Prix-Location-Benne.fr",
                "url": "https://www.prix-location-benne.fr",
                "description": "Plateforme de comparaison de prix de location de bennes en France. Devis gratuit, loueurs certifiés, livraison 24-48h.",
                "areaServed": { "@type": "Country", "name": "France" },
                "sameAs": [],
            }) }} />

            {/* Hero */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <Image src="/images/about-depot.png" alt="Dépôt de bennes moderne en France" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60"></div>
                <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
                        <Users className="h-4 w-4" /> Qui sommes-nous
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        La référence de la<br />
                        <span className="text-amber-400">location de benne</span> en France
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                        Prix-Location-Benne.fr est la plateforme n°1 pour comparer les tarifs de location de bennes. Nous connectons particuliers et professionnels avec les meilleurs loueurs locaux, partout en France.
                    </p>
                </div>
            </section>

            {/* Chiffres clés */}
            <section className="bg-slate-800 py-10 -mt-1">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {chiffres.map((c) => (
                            <div key={c.label} className="text-center">
                                <c.icon className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                                <div className="text-2xl md:text-3xl font-black text-white">{c.value}</div>
                                <div className="text-sm text-slate-400 font-medium">{c.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Notre mission */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Notre mission</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
                                Simplifier la location de benne pour tous
                            </h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Louer une benne ne devrait pas être compliqué. Pourtant, avant Prix-Location-Benne.fr, il fallait appeler 5 loueurs différents, comparer des devis incomparables, et espérer ne pas payer trop cher.
                            </p>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                <strong>Nous avons changé la donne.</strong> Notre plateforme centralise les offres de plus de 100 loueurs partenaires dans toute la France. En 2 minutes, vous obtenez un devis personnalisé au meilleur prix, avec la garantie d&apos;un prestataire certifié et d&apos;un traitement conforme de vos déchets.
                            </p>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Que vous soyez un <strong>particulier</strong> en pleine rénovation de salle de bain, un <strong>artisan</strong> sur un chantier de démolition, ou une <strong>entreprise du BTP</strong> qui gère des flux de déchets importants — notre service s&apos;adapte à vos besoins.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                <Link href="/tarifs" className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-amber-100 transition-colors">
                                    💰 Voir les tarifs
                                </Link>
                                <Link href="/guides" className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                                    📋 Nos guides experts
                                </Link>
                                <Link href="/departements" className="inline-flex items-center gap-2 bg-green-50 text-green-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-100 transition-colors">
                                    📍 Trouver un loueur
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative w-full h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                                <Image src="/images/about-team.png" alt="Équipe de professionnels de la gestion des déchets" fill className="object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                                <div className="text-3xl font-black">100%</div>
                                <div className="text-sm font-medium">Gratuit & sans engagement</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nos valeurs */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Nos valeurs</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
                            Ce qui nous guide au quotidien
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {valeurs.map((v) => (
                            <div key={v.title} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                                    <v.icon className="h-7 w-7 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image + Engagement */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative w-full h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image src="/images/about-values.png" alt="Tri sélectif des déchets de chantier dans un centre de recyclage" fill className="object-cover" />
                        </div>

                        <div>
                            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Nos engagements</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-8">
                                Notre charte qualité
                            </h2>

                            <div className="space-y-4">
                                {engagements.map((e, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-700 font-medium">{e}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Types de bennes */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Nos prestations</h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Nous couvrons tous les types de déchets avec des solutions adaptées à chaque projet.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link href="/location-benne-gravats" className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-amber-500 hover:bg-slate-800/80 transition-all group text-center">
                            <span className="text-3xl mb-3 block">🪨</span>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Benne Gravats</h3>
                            <p className="text-sm text-slate-400">Béton, briques, tuiles, carrelage — 3m³ à 10m³</p>
                            <div className="mt-4 text-amber-400 text-sm font-semibold">Dès 179€ →</div>
                        </Link>
                        <Link href="/location-benne-encombrants" className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-amber-500 hover:bg-slate-800/80 transition-all group text-center">
                            <span className="text-3xl mb-3 block">📦</span>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Benne Encombrants</h3>
                            <p className="text-sm text-slate-400">Meubles, matelas, électroménagers — 3m³ à 30m³</p>
                            <div className="mt-4 text-amber-400 text-sm font-semibold">Dès 149€ →</div>
                        </Link>
                        <Link href="/location-benne-dechets-verts" className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-amber-500 hover:bg-slate-800/80 transition-all group text-center">
                            <span className="text-3xl mb-3 block">🌿</span>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Benne Déchets Verts</h3>
                            <p className="text-sm text-slate-400">Tontes, branches, feuilles — 3m³ à 30m³</p>
                            <div className="mt-4 text-amber-400 text-sm font-semibold">Dès 129€ →</div>
                        </Link>
                        <Link href="/location-benne-dib" className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-amber-500 hover:bg-slate-800/80 transition-all group text-center">
                            <span className="text-3xl mb-3 block">🏭</span>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Benne DIB</h3>
                            <p className="text-sm text-slate-400">Bois, métal, plastique, tout-venant — 10m³ à 30m³</p>
                            <div className="mt-4 text-amber-400 text-sm font-semibold">Dès 299€ →</div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Guides Experts */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Ressources</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
                            Nos guides pour vous accompagner
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Des contenus experts, rédigés par des professionnels du secteur, pour vous aider à chaque étape de votre projet.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/guides/comment-choisir-taille-benne" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:shadow-lg hover:border-amber-200 transition-all group">
                            <BookOpen className="h-8 w-8 text-amber-500 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">Guide des tailles de bennes</h3>
                            <p className="text-sm text-slate-500">3m³, 6m³, 10m³... trouvez le volume parfait pour votre chantier.</p>
                        </Link>
                        <Link href="/guides/prix-location-benne-guide-complet" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:shadow-lg hover:border-amber-200 transition-all group">
                            <BookOpen className="h-8 w-8 text-amber-500 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">Grille des prix 2026</h3>
                            <p className="text-sm text-slate-500">Tous les tarifs par type de déchet et volume, avec les pièges à éviter.</p>
                        </Link>
                        <Link href="/guides/autorisation-voirie-benne-guide" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:shadow-lg hover:border-amber-200 transition-all group">
                            <BookOpen className="h-8 w-8 text-amber-500 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">Autorisation de voirie</h3>
                            <p className="text-sm text-slate-500">Démarches mairie, délais et coûts pour poser une benne sur la voie publique.</p>
                        </Link>
                    </div>

                    <div className="mt-10 text-center">
                        <Link href="/guides" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-500 transition-colors text-lg">
                            Voir tous nos guides <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-amber-50 border-t border-amber-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Besoin d&apos;une benne ?</h2>
                    <p className="text-xl text-amber-800 mb-10 max-w-2xl mx-auto">
                        Obtenez votre devis personnalisé en 2 minutes. Service 100% gratuit, loueurs certifiés, livraison sous 24h.
                    </p>
                    <Link href="/devis">
                        <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold text-xl px-12 py-8 rounded-full shadow-2xl transition-all transform hover:scale-105">
                            Devis Gratuit <ArrowRight className="ml-3 h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
