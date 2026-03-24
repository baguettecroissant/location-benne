import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hammer, CheckCircle, AlertTriangle, Scale, Truck, Clock, ShieldCheck, Info, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PopularCitiesGrid } from "@/components/pseo/PopularCitiesGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Location Benne Gravats 2026 — Prix, Volumes & Devis Gratuit",
    description: "Location de benne pour gravats : béton, briques, tuiles, carrelage, pierres. Bennes renforcées 3m³ à 10m³ dès 179€ TTC. Comparatif volumes, réglementation ISDI, guide complet. Devis gratuit en 2 min.",
    alternates: { canonical: 'https://www.prix-location-benne.fr/location-benne-gravats' },
};

const faqData = [
    { q: "Peut-on mélanger gravats et encombrants dans une même benne ?", a: "Non, c'est formellement déconseillé. Les gravats (déchets inertes) et les encombrants (déchets non dangereux) suivent des filières de traitement différentes. Les gravats sont envoyés en ISDI (Installation de Stockage de Déchets Inertes) ou concassés pour recyclage, tandis que les encombrants sont orientés vers des centres de tri. Mélanger les deux entraîne un reclassement en « DIB tout-venant » avec un surcoût de 40 à 80% sur le traitement. Pour un chantier produisant les deux types de déchets, commandez deux bennes séparées : c'est paradoxalement plus économique." },
    { q: "Pourquoi les bennes gravats sont-elles limitées à 10m³ ?", a: "Les gravats ont une densité très élevée, entre 1,3 et 1,8 tonne par mètre cube selon les matériaux. Une benne de 10m³ remplie de béton pèse entre 13 et 18 tonnes, soit la limite de charge maximale (PTAC) des camions ampliroll utilisés pour le transport. Au-delà, le véhicule serait en surcharge, ce qui est interdit par le Code de la route et passible d'amendes pouvant atteindre 750€ pour le transporteur." },
    { q: "La terre est-elle considérée comme du gravat ?", a: "Non. La terre, les déblais de terrassement et la terre végétale ne sont pas des gravats au sens réglementaire. Ils constituent une catégorie à part (code déchet 17 05 04) et nécessitent une filière spécifique. Certains loueurs proposent des bennes « terre et déblais » dédiées. Si votre chantier génère à la fois de la terre et des gravats, deux bennes séparées sont nécessaires." },
    { q: "Que devient le gravat après la collecte ?", a: "Les gravats collectés sont acheminés vers un centre ISDI (Installation de Stockage de Déchets Inertes) ou une plateforme de recyclage agréée. Le béton est concassé et transformé en granulats recyclés (GR) utilisés en sous-couche routière. Les briques et tuiles sont broyées pour du remblai. En France, le taux de valorisation des déchets inertes du BTP atteint 76%, un chiffre en constante progression grâce à la loi AGEC." },
    { q: "Faut-il une autorisation pour poser une benne à gravats sur la voie publique ?", a: "Oui, toute occupation de la voie publique nécessite une autorisation de voirie délivrée par la mairie. Le délai d'obtention varie de 5 à 15 jours selon les communes. Votre loueur de bennes peut généralement effectuer cette démarche pour vous, moyennant un supplément de 50 à 150€ selon la ville. Sur votre terrain privé (cour, jardin, parking), aucune autorisation n'est nécessaire." },
    { q: "Comment estimer le volume de gravats de mon chantier ?", a: "Utilisez ces repères : démolition d'une cloison en brique de 10m² = environ 0,5 à 1m³ de gravats. Réfection d'une salle de bain complète (sol + murs) = 1 à 2m³. Démolition d'un mur porteur = 2 à 4m³. Réfection d'une chape de 20m² = 1,5 à 2m³. En cas de doute, choisissez toujours la benne de taille supérieure : le surcoût est minime comparé au prix d'une seconde rotation (~150-200€)." },
    { q: "Quel est le poids maximum autorisé dans une benne à gravats ?", a: "Le poids maximal dépend du volume de la benne et du type de camion de collecte : 3m³ = 4 à 5 tonnes, 6m³ = 8 à 10 tonnes, 10m³ = 13 à 15 tonnes. Ces limites sont imposées par le PTAC (Poids Total Autorisé en Charge) du véhicule. Le loueur indiquera la charge maximale au moment du devis. Le béton armé, plus dense que la brique, peut entraîner un dépassement de poids même si la benne n'est pas remplie à ras bord." },
    { q: "Les gravats contenant de l'amiante sont-ils acceptés ?", a: "Absolument pas. L'amiante est un déchet dangereux soumis à une réglementation spécifique (arrêté du 12 mars 2012). Son évacuation nécessite une entreprise certifiée, un conditionnement en double emballage étanche, et un transport vers un centre ISDD (Installation de Stockage de Déchets Dangereux). Si vous suspectez la présence d'amiante (fibrociment, dalles vinyle avant 1997, flocage), faites réaliser un diagnostic avant travaux." },
];

export default function BenneGravatsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Schema.org FAQPage */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org", "@type": "FAQPage",
                "mainEntity": faqData.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
            }) }} />

            {/* HERO */}
            <section className="bg-orange-950 text-white py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
                        <Hammer className="h-4 w-4" /> Benne spécialisée déchets inertes
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">Location Benne <span className="text-orange-400">Gravats</span></h1>
                    <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-8">
                        Évacuez béton, briques, tuiles, carrelage et pierres de votre chantier. Bennes renforcées de 3m³ à 10m³, livrées en 24h partout en France.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/devis"><Button size="lg" className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl">Devis Gratuit en 2 min <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                        <Link href="/tarifs"><Button size="lg" variant="outline" className="border-orange-400 text-orange-300 hover:bg-orange-900 font-bold text-lg px-8 py-6 rounded-xl">Voir tous les tarifs</Button></Link>
                    </div>
                </div>
            </section>

            {/* CONTENU PRINCIPAL */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 prose prose-lg prose-slate max-w-none">
                            <h2>Qu&apos;est-ce qu&apos;une benne à gravats ?</h2>
                            <p>Une benne à gravats est un conteneur métallique <strong>renforcé et à fond plat</strong>, spécialement conçu pour supporter le poids élevé des <strong>déchets inertes</strong> issus de travaux de construction, de démolition ou de rénovation. Contrairement aux bennes classiques, elle dispose de parois plus épaisses et d&apos;une structure renforcée capable de supporter jusqu&apos;à <strong>15 tonnes de charge</strong>.</p>
                            <p>Les gravats représentent la catégorie de déchets la plus lourde : avec une densité moyenne de <strong>1,5 tonne par mètre cube</strong>, une benne de 10m³ remplie peut peser jusqu&apos;à 15 tonnes. C&apos;est pourquoi les bennes gravats sont <strong>limitées à 10m³ maximum</strong>, contrairement aux bennes encombrants ou déchets verts qui montent jusqu&apos;à 30m³.</p>

                            <div className="not-prose bg-orange-50 border border-orange-200 rounded-2xl p-6 my-8">
                                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-orange-500" /> Bon à savoir — Réglementation</h3>
                                <p className="text-sm text-slate-600">Les gravats sont classés « <strong>déchets inertes</strong> » (code déchet 17 01) par la nomenclature européenne. Ils doivent être orientés vers une <strong>Installation de Stockage de Déchets Inertes (ISDI)</strong> agréée ou une plateforme de recyclage. Depuis la <strong>loi AGEC (2020)</strong>, les producteurs de déchets du BTP ont l&apos;obligation de traçabilité : votre loueur vous fournira un <strong>bordereau de suivi des déchets (BSD)</strong> attestant de leur bonne élimination.</p>
                            </div>

                            <h2>Quels déchets sont acceptés en benne gravats ?</h2>
                            <p>Les bennes à gravats acceptent exclusivement les <strong>matériaux inertes</strong>, c&apos;est-à-dire qui ne se décomposent pas, ne brûlent pas et ne produisent aucune réaction chimique :</p>
                            <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
                                {[
                                    { item: "Béton et béton armé", detail: "Dalles, poutres, fondations" },
                                    { item: "Briques et parpaings", detail: "Murs, cloisons, cheminées" },
                                    { item: "Tuiles et ardoises", detail: "Toiture, faîtage, rives" },
                                    { item: "Carrelage et faïence", detail: "Sols, murs de salle de bain" },
                                    { item: "Pierres naturelles", detail: "Granit, calcaire, grès" },
                                    { item: "Enduits, mortier et ciment", detail: "Crépis, chapes, joints" },
                                ].map((d, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-100">
                                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                        <div><span className="text-slate-800 font-semibold text-sm">{d.item}</span><br/><span className="text-slate-500 text-xs">{d.detail}</span></div>
                                    </div>
                                ))}
                            </div>

                            <div className="not-prose bg-red-50 p-6 rounded-xl border border-red-200 my-8">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-red-900 mb-2">⛔ Déchets strictement interdits en benne gravats</h3>
                                        <div className="grid sm:grid-cols-2 gap-2 text-sm text-red-700">
                                            <div>• <strong>Amiante et fibrociment</strong> — déchet dangereux</div>
                                            <div>• <strong>Plâtre et plaques BA13</strong> — filière plâtre dédiée</div>
                                            <div>• <strong>Bois et palettes</strong> → <Link href="/location-benne-dib" className="underline text-red-800 font-semibold">Benne DIB</Link></div>
                                            <div>• <strong>Terre et déblais</strong> — filière terre dédiée</div>
                                            <div>• <strong>Déchets végétaux</strong> → <Link href="/location-benne-dechets-verts" className="underline text-red-800 font-semibold">Benne Déchets Verts</Link></div>
                                            <div>• <strong>Meubles, matelas</strong> → <Link href="/location-benne-encombrants" className="underline text-red-800 font-semibold">Benne Encombrants</Link></div>
                                        </div>
                                        <p className="text-xs text-red-600 mt-3">Le mélange de gravats avec d&apos;autres déchets entraîne un surcoût de tri de 40 à 80% au centre de traitement.</p>
                                    </div>
                                </div>
                            </div>

                            <h2>Prix d&apos;une benne gravats en 2026</h2>
                            <p>Les prix ci-dessous sont des <strong>moyennes nationales TTC</strong> incluant la livraison, 7 jours de location et le traitement des gravats en centre ISDI agréé. Le tarif exact dépend de votre localisation et de la distance au centre de traitement le plus proche :</p>
                        </div>

                        {/* SIDEBAR */}
                        <div className="space-y-6">
                            <div className="bg-amber-500 text-white rounded-2xl p-8 shadow-xl sticky top-24">
                                <h3 className="text-2xl font-bold mb-4">Devis Gravats</h3>
                                <p className="text-amber-100 mb-4 text-sm">Recevez votre tarif exact en 2 minutes. Prix personnalisé selon votre ville.</p>
                                <Link href="/devis"><Button className="w-full bg-white text-amber-600 hover:bg-amber-50 font-bold text-lg py-5">Devis gratuit <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                                <div className="mt-6 pt-6 border-t border-amber-400/30 space-y-3">
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><Truck className="h-4 w-4" /> Livraison 24h</div>
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><Clock className="h-4 w-4" /> 7 jours de location inclus</div>
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><ShieldCheck className="h-4 w-4" /> Bordereau de suivi fourni</div>
                                </div>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Scale className="h-5 w-5 text-orange-500" /> Volumes recommandés</h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">3m³</strong> <span className="text-orange-600 font-medium">(~4,5 tonnes)</span><br/>Salle de bain, WC, petit mur, chape partielle</li>
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">6m³</strong> <span className="text-orange-600 font-medium">(~9 tonnes)</span><br/>Cuisine, terrasse, cloison complète, cheminée</li>
                                    <li><strong className="text-slate-900">10m³</strong> <span className="text-orange-600 font-medium">(~15 tonnes)</span><br/>Démolition de mur porteur, toiture, rénovation lourde</li>
                                </ul>
                            </div>

                            {/* Maillage inter-catégories */}
                            <div className="bg-slate-900 text-white rounded-2xl p-6">
                                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Autres types de bennes</h3>
                                <div className="space-y-3">
                                    <Link href="/location-benne-encombrants" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                        <span className="text-2xl">📦</span>
                                        <div><span className="font-semibold text-sm">Encombrants</span><br/><span className="text-xs text-slate-400">Meubles, matelas, électro</span></div>
                                    </Link>
                                    <Link href="/location-benne-dechets-verts" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                        <span className="text-2xl">🌿</span>
                                        <div><span className="font-semibold text-sm">Déchets Verts</span><br/><span className="text-xs text-slate-400">Tontes, branches, feuilles</span></div>
                                    </Link>
                                    <Link href="/location-benne-dib" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                        <span className="text-2xl">🏭</span>
                                        <div><span className="font-semibold text-sm">DIB</span><br/><span className="text-xs text-slate-400">Bois, métal, plastique, plâtre</span></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GRILLE PRIX DÉTAILLÉE */}
            <section className="py-16 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">Grille tarifaire benne gravats — 2026</h2>
                    <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto text-sm">Prix moyens TTC incluant livraison, 7 jours de location et traitement ISDI</p>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
                            <thead className="bg-orange-50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold text-slate-900">Volume</th>
                                    <th className="px-6 py-4 text-center font-bold text-slate-900">Poids max</th>
                                    <th className="px-6 py-4 text-center font-bold text-slate-900">Prix moyen</th>
                                    <th className="px-6 py-4 text-left font-bold text-slate-900">Usage type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { vol: "3m³", poids: "~4,5 t", prix: "179€", usage: "Petite salle de bain, WC, réfection de chape partielle" },
                                    { vol: "5m³", poids: "~7,5 t", prix: "239€", usage: "Cuisine, terrasse en carrelage, cheminée à démolir" },
                                    { vol: "6m³", poids: "~9 t", prix: "279€", usage: "Grande pièce en carrelage, mur de séparation complet" },
                                    { vol: "8m³", poids: "~12 t", prix: "349€", usage: "Rénovation lourde, deux pièces, cloisons + sols" },
                                    { vol: "10m³", poids: "~15 t", prix: "399€", usage: "Mur porteur, toiture, rénovation complète d'étage" },
                                ].map((r, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                        <td className="px-6 py-4 font-bold text-orange-600 text-lg">{r.vol}</td>
                                        <td className="px-6 py-4 text-center text-slate-600">{r.poids}</td>
                                        <td className="px-6 py-4 text-center font-black text-slate-900 text-lg">{r.prix}</td>
                                        <td className="px-6 py-4 text-slate-600">{r.usage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 text-center">* Les gravats étant très lourds (densité ~1,5 t/m³), les bennes sont limitées à 10m³ maximum. Au-delà, le camion serait en surcharge.</p>
                </div>
            </section>

            {/* PROCESSUS 4 ÉTAPES */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center">Comment ça marche ?</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Demandez un devis", desc: "Indiquez votre ville, le volume estimé et la date souhaitée. Recevez un tarif personnalisé en 2 minutes.", icon: HelpCircle },
                            { step: "2", title: "Livraison en 24h", desc: "Votre benne est livrée par camion ampliroll devant votre chantier. Le chauffeur vérifie l'accès et positionne la benne.", icon: Truck },
                            { step: "3", title: "Remplissez à votre rythme", desc: "Vous disposez de 7 jours pour remplir la benne. Ne dépassez pas le niveau des bords pour la sécurité du transport.", icon: Hammer },
                            { step: "4", title: "Enlèvement et traçabilité", desc: "Le loueur récupère la benne et achemine les gravats vers un centre ISDI agréé. Bordereau de suivi fourni.", icon: ShieldCheck },
                        ].map((s) => (
                            <div key={s.step} className="text-center">
                                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <s.icon className="h-7 w-7 text-orange-600" />
                                </div>
                                <div className="text-sm font-black text-orange-500 mb-1">ÉTAPE {s.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                                <p className="text-sm text-slate-500">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GUIDE PRATIQUE - TIPS PRO */}
            <section className="py-16 bg-orange-50 border-y border-orange-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Conseils de pro pour votre benne gravats</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Préparez l'accès", tips: ["Dégagez l'espace de pose (4m × 2,5m minimum)", "Vérifiez la hauteur de passage (3,5m pour le camion)", "Protégez le sol fragile (dalles) avec des planches", "Prévoyez un accès camion sans marche arrière si possible"] },
                            { title: "Chargez intelligemment", tips: ["Commencez par les gravats les plus lourds au fond", "Remplissez de manière homogène sur toute la surface", "Ne dépassez jamais le niveau des bords", "Broyez les gros blocs de béton si possible avant chargement"] },
                            { title: "Optimisez le budget", tips: ["Triez vos déchets : deux petites bennes triées coûtent moins qu'une grosse mélangée", "Regroupez vos besoins en une seule rotation", "Commandez hors saison (novembre-février) pour des prix plus bas", "Comparez au moins 3 devis de loueurs différents"] },
                        ].map((tip, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4 text-lg">{tip.title}</h3>
                                <ul className="space-y-2">
                                    {tip.tips.map((t, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                                            <CheckCircle className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MAILLAGE — VILLES POPULAIRES */}
            <PopularCitiesGrid categoryPath="location-benne-gravats" categoryLabel="Benne Gravats" accentColor="orange" />

            {/* FAQ */}
            <section className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">FAQ — Benne Gravats</h2>
                    <Accordion type="single" collapsible className="bg-white border border-slate-200 rounded-2xl p-6">
                        {faqData.map((f, i) => (
                            <AccordionItem key={i} value={String(i)}>
                                <AccordionTrigger className="text-base font-bold text-left">{f.q}</AccordionTrigger>
                                <AccordionContent className="text-slate-600 text-sm leading-relaxed">{f.a}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-16 bg-orange-950 text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-extrabold mb-4">Prêt à évacuer vos gravats ?</h2>
                    <p className="text-orange-200 text-lg mb-8">Trouvez la benne idéale pour votre chantier. Devis personnalisé en 2 minutes, livraison sous 24h.</p>
                    <Link href="/devis"><Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold text-xl px-12 py-7 rounded-full shadow-xl">Obtenir mon devis gratuit</Button></Link>
                </div>
            </section>
        </div>
    );
}
