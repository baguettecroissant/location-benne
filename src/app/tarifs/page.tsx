import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Package, Hammer, Truck, Factory, ArrowRight, CheckCircle, XCircle, AlertTriangle, Euro, Clock, Recycle, Shield, TreePine, BookOpen, MapPin, Info } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Prix Location Benne 2026 : Tarifs Complets de 129€ à 799€ (Toutes Tailles)",
    description: "Tous les prix de location de benne en 2026 : gravats, encombrants, déchets verts, DIB. Tarifs de 129€ (3m³) à 799€ (30m³). Ce qui est inclus, les surcoûts à éviter, guide complet.",
    alternates: { canonical: 'https://www.prix-location-benne.fr/tarifs' },
};

/* ─── Data ─── */
const pricingCards = [
    { volume: "3m³", prixFrom: "129", equiv: "≈ 20 brouettes", usage: "SdB, WC, petit jardin", icon: Package, popular: false, color: "border-slate-200" },
    { volume: "6m³", prixFrom: "199", equiv: "≈ 40 brouettes", usage: "Cuisine, terrasse, salon", icon: Package, popular: false, color: "border-slate-200" },
    { volume: "10m³", prixFrom: "269", equiv: "≈ 65 brouettes", usage: "Rénovation lourde, toiture", icon: Hammer, popular: true, color: "border-amber-400" },
    { volume: "15m³", prixFrom: "349", equiv: "≈ 100 brouettes", usage: "Débarras complet, gros travaux", icon: Truck, popular: false, color: "border-slate-200" },
    { volume: "20m³", prixFrom: "399", equiv: "≈ 130 brouettes", usage: "Chantier pro, démolition", icon: Truck, popular: false, color: "border-slate-200" },
    { volume: "30m³", prixFrom: "549", equiv: "≈ 200 brouettes", usage: "BTP, industriel, démolition", icon: Factory, popular: false, color: "border-slate-200" },
];

const tarifDetailTable = [
    { volume: "3m³", gravats: 179, encombrants: 149, verts: 129, dib: 169 },
    { volume: "6m³", gravats: 279, encombrants: 229, verts: 199, dib: 249 },
    { volume: "10m³", gravats: 399, encombrants: 299, verts: 269, dib: 349 },
    { volume: "15m³", gravats: 499, encombrants: 399, verts: 349, dib: 449 },
    { volume: "20m³", gravats: 599, encombrants: 449, verts: 399, dib: 549 },
    { volume: "30m³", gravats: 799, encombrants: 599, verts: 549, dib: 699 },
];

const estimations = [
    { projet: "Rénovation salle de bain", volume: "3m³", estimation: "1 à 2 tonnes de gravats + sanitaires", prix: "149 à 179€" },
    { projet: "Rénovation cuisine complète", volume: "6m³", estimation: "Meubles + carrelage + plâtre", prix: "199 à 279€" },
    { projet: "Débarras cave ou grenier", volume: "6-10m³", estimation: "Meubles, cartons, objets divers", prix: "229 à 299€" },
    { projet: "Toiture 80-100m²", volume: "10-15m³", estimation: "Tuiles, bois de charpente", prix: "269 à 499€" },
    { projet: "Démolition mur porteur", volume: "10m³", estimation: "5 à 8 tonnes de gravats lourds", prix: "399€" },
    { projet: "Élagage gros jardin (500m²+)", volume: "10-15m³", estimation: "Branches, troncs, feuillage", prix: "269 à 349€" },
    { projet: "Débarras maison complète", volume: "20-30m³", estimation: "Tout le mobilier + déchets", prix: "449 à 599€" },
    { projet: "Chantier BTP / démolition", volume: "30m³", estimation: "Béton, ferraille, tout-venant", prix: "549 à 799€" },
];

const inclus = [
    { label: "Livraison de la benne sur votre site", included: true },
    { label: "Location pendant 7 jours calendaires", included: true },
    { label: "Enlèvement de la benne remplie", included: true },
    { label: "Transport vers le centre de traitement", included: true },
    { label: "Traitement et valorisation des déchets", included: true },
    { label: "Bordereau de suivi des déchets (BSD)", included: true },
];

const nonInclus = [
    { label: "Extension au-delà de 7 jours", detail: "10 à 30€ / jour supplémentaire" },
    { label: "Transport longue distance (zone rurale isolée)", detail: "50 à 100€ de supplément" },
    { label: "Surcharge poids (gravats > limite)", detail: "Variable selon le loueur" },
    { label: "Autorisation de voirie (voie publique)", detail: "50 à 150€, à demander en mairie" },
    { label: "Déchets interdits (amiante, peinture...)", detail: "Refus de prise en charge" },
];

const faqItems = [
    {
        q: "Le prix inclut-il la livraison et l'enlèvement ?",
        a: "Oui, nos tarifs sont tout compris : livraison, location 7 jours, enlèvement et traitement des déchets en centre agréé. Aucun frais caché."
    },
    {
        q: "Pourquoi les gravats coûtent-ils plus cher que les déchets verts ?",
        a: "Les gravats sont beaucoup plus lourds (1 m³ de gravats pèse environ 1,5 tonne contre 0,3 tonne pour les déchets verts). Le transport et le traitement en ISDI (Installation de Stockage de Déchets Inertes) sont donc plus coûteux."
    },
    {
        q: "Peut-on mélanger différents types de déchets ?",
        a: "Il est déconseillé de mélanger les déchets car cela augmente le coût de traitement. Si vous avez des gravats ET des encombrants, nous recommandons deux bennes séparées ou une benne DIB (tout-venant) qui accepte les mélanges, mais à un tarif supérieur."
    },
    {
        q: "Comment estimer le volume nécessaire ?",
        a: "La règle d'or : prenez la taille supérieure. Une benne trop petite vous obligera à commander une seconde rotation (150 à 200€ de surcoût). Pour une rénovation classique d'une pièce, 6 à 10m³ suffisent. Consultez notre guide complet pour une estimation précise."
    },
    {
        q: "Combien de temps peut-on garder la benne ?",
        a: "La location standard est de 7 jours calendaires. Des extensions sont possibles moyennant 10 à 30€ par jour supplémentaire selon le loueur. En cas de dépôt sur la voie publique, la durée est limitée par l'autorisation de la mairie."
    },
    {
        q: "Faut-il une autorisation pour poser une benne ?",
        a: "Sur un terrain privé (jardin, cour, parking) : aucune autorisation nécessaire. Sur la voie publique (trottoir, chaussée) : une autorisation d'occupation temporaire est obligatoire, à demander en mairie (délai 5 à 15 jours, coût 50 à 150€)."
    },
    {
        q: "Peut-on négocier le prix pour plusieurs bennes ?",
        a: "Oui ! La plupart des loueurs proposent des tarifs dégressifs pour les commandes multiples. C'est particulièrement courant sur les chantiers professionnels. Demandez un devis groupé pour obtenir le meilleur prix."
    },
    {
        q: "Quels déchets sont interdits dans une benne ?",
        a: "Les déchets dangereux sont strictement interdits : amiante, peintures et solvants, batteries, huiles, produits chimiques, appareils contenant du gaz (frigos, climatiseurs). Leur évacuation nécessite des filières spécialisées."
    },
];

export default function TarifsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Schema FAQ */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org", "@type": "FAQPage",
                "mainEntity": faqItems.map(f => ({
                    "@type": "Question", "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            }) }} />

            {/* Hero */}
            <section className="relative py-20 lg:py-24 overflow-hidden">
                <Image src="/images/hero-homepage.png" alt="Location de bennes sur un chantier français" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60"></div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
                        <Euro className="h-4 w-4" /> Prix actualisés mars 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Prix Location de Benne <span className="text-amber-400">2026</span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                        Dès <strong className="text-white">129€ TTC</strong>, livraison, location 7 jours et enlèvement inclus. Comparez les prix par volume et type de déchet pour votre projet.
                    </p>
                    <div className="flex justify-center">
                        <Link href="/devis">
                            <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg px-10 py-7 rounded-xl shadow-xl">
                                Obtenir mon prix exact <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <section className="bg-slate-800 py-5 border-b border-slate-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-slate-200 text-xs md:text-sm font-semibold text-center">
                        <div className="flex flex-col items-center gap-1"><Euro className="h-5 w-5 text-amber-400" /> Prix transparents</div>
                        <div className="flex flex-col items-center gap-1"><Clock className="h-5 w-5 text-amber-400" /> Livraison 24-48h</div>
                        <div className="flex flex-col items-center gap-1"><Recycle className="h-5 w-5 text-amber-400" /> Traitement conforme</div>
                        <div className="flex flex-col items-center gap-1"><Shield className="h-5 w-5 text-amber-400" /> Sans engagement</div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Tarifs par volume</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
                            Choisissez la taille de votre benne
                        </h2>
                        <p className="text-lg text-slate-600">
                            Prix indicatifs TTC, tout compris (livraison + 7j + enlèvement + traitement). Le tarif varie selon le type de déchet.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {pricingCards.map((c) => (
                            <div key={c.volume} className={`relative bg-white border-2 ${c.color} rounded-2xl p-8 hover:shadow-xl transition-all group text-center ${c.popular ? 'ring-2 ring-amber-400 shadow-lg' : ''}`}>
                                {c.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                                        ⭐ Le plus demandé
                                    </div>
                                )}
                                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
                                    <c.icon className="h-8 w-8 text-amber-600" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-1">Benne {c.volume}</h3>
                                <div className="text-sm text-slate-400 mb-4">{c.equiv}</div>
                                <div className="text-4xl font-black text-amber-600 mb-1">
                                    dès {c.prixFrom}€<span className="text-sm font-normal text-slate-400 ml-1">TTC</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-6">{c.usage}</p>
                                <Link href="/devis">
                                    <Button className={`w-full rounded-lg font-bold ${c.popular ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white'} transition-all`}>
                                        Devis gratuit
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Price Table by Waste Type */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Grille tarifaire complète</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
                            Prix par type de déchet et volume
                        </h2>
                        <p className="text-lg text-slate-600">
                            Les tarifs varient selon la nature des déchets. Les <Link href="/location-benne-gravats" className="text-amber-600 font-semibold hover:underline">gravats</Link> sont les plus chers (poids élevé), les <Link href="/location-benne-dechets-verts" className="text-amber-600 font-semibold hover:underline">déchets verts</Link> les moins chers.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="text-left py-4 px-5 font-bold text-sm">Volume</th>
                                    <th className="text-center py-4 px-5 font-bold text-sm">
                                        <Link href="/location-benne-gravats" className="hover:text-amber-300 transition-colors">🪨 Gravats</Link>
                                    </th>
                                    <th className="text-center py-4 px-5 font-bold text-sm">
                                        <Link href="/location-benne-encombrants" className="hover:text-amber-300 transition-colors">📦 Encombrants</Link>
                                    </th>
                                    <th className="text-center py-4 px-5 font-bold text-sm">
                                        <Link href="/location-benne-dechets-verts" className="hover:text-amber-300 transition-colors">🌿 Déchets Verts</Link>
                                    </th>
                                    <th className="text-center py-4 px-5 font-bold text-sm">
                                        <Link href="/location-benne-dib" className="hover:text-amber-300 transition-colors">🏭 DIB</Link>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tarifDetailTable.map((row, i) => (
                                    <tr key={row.volume} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-amber-50/50 transition-colors`}>
                                        <td className="py-4 px-5 font-bold text-slate-900 text-lg">{row.volume}</td>
                                        <td className="py-4 px-5 text-center"><span className="text-xl font-black text-orange-600">{row.gravats}€</span></td>
                                        <td className="py-4 px-5 text-center"><span className="text-xl font-black text-blue-600">{row.encombrants}€</span></td>
                                        <td className="py-4 px-5 text-center"><span className="text-xl font-black text-green-600">{row.verts}€</span></td>
                                        <td className="py-4 px-5 text-center"><span className="text-xl font-black text-purple-600">{row.dib}€</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-4">
                        * Prix indicatifs TTC constatés en 2026. Le tarif final dépend de votre localisation et du loueur. Devis personnalisé gratuit.
                    </p>
                </div>
            </section>

            {/* Estimation par projet */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Guide d&apos;estimation</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
                            Quel volume pour votre projet ?
                        </h2>
                        <p className="text-lg text-slate-600">
                            Retrouvez ci-dessous nos estimations par type de projet pour vous aider à choisir la bonne taille. <Link href="/guides/comment-choisir-taille-benne" className="text-amber-600 font-semibold hover:underline">Guide complet →</Link>
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="text-left py-3 px-5 font-bold text-slate-700">Projet</th>
                                    <th className="text-center py-3 px-5 font-bold text-slate-700">Volume recommandé</th>
                                    <th className="text-left py-3 px-5 font-bold text-slate-700">Ce que ça représente</th>
                                    <th className="text-center py-3 px-5 font-bold text-slate-700">Budget</th>
                                </tr>
                            </thead>
                            <tbody>
                                {estimations.map((e, i) => (
                                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                                        <td className="py-3 px-5 font-semibold text-slate-900">{e.projet}</td>
                                        <td className="py-3 px-5 text-center"><span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-xs">{e.volume}</span></td>
                                        <td className="py-3 px-5 text-slate-500">{e.estimation}</td>
                                        <td className="py-3 px-5 text-center font-bold text-slate-900">{e.prix}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
                        <Info className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="font-bold text-slate-900 mb-1">💡 La règle d&apos;or</div>
                            <p className="text-slate-600 text-sm">
                                <strong>Prenez toujours la taille supérieure.</strong> Une benne trop petite vous obligera à commander une seconde rotation (150 à 200€ de surcoût). Il vaut mieux payer 50€ de plus pour un volume supérieur que de devoir faire un second enlèvement.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ce qui est inclus / Non inclus */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-16">Ce qui est inclus dans le prix</h2>
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Inclus */}
                        <div>
                            <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-2"><CheckCircle className="h-6 w-6" /> Inclus dans tous nos tarifs</h3>
                            <div className="space-y-3">
                                {inclus.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-green-100">
                                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                        <span className="text-slate-700 font-medium">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Non inclus */}
                        <div>
                            <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2"><AlertTriangle className="h-6 w-6" /> Surcoûts possibles à connaître</h3>
                            <div className="space-y-3">
                                {nonInclus.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-red-100">
                                        <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-slate-700 font-medium">{item.label}</span>
                                            <div className="text-xs text-slate-400 mt-0.5">{item.detail}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Maillage Interne — Types de déchets */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Comparez par type de déchet</h2>
                        <p className="text-lg text-slate-600">Découvrez les tarifs détaillés, les volumes recommandés et les spécificités de chaque type de benne.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link href="/location-benne-gravats" className="bg-orange-50 border border-orange-200 p-6 rounded-2xl hover:shadow-lg hover:border-orange-400 transition-all group text-center">
                            <span className="text-3xl block mb-3">🪨</span>
                            <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">Benne Gravats</h3>
                            <p className="text-sm text-slate-500 mt-2">Béton, briques, tuiles, carrelage</p>
                            <div className="mt-3 text-orange-600 font-bold text-lg">dès 179€</div>
                        </Link>
                        <Link href="/location-benne-encombrants" className="bg-blue-50 border border-blue-200 p-6 rounded-2xl hover:shadow-lg hover:border-blue-400 transition-all group text-center">
                            <span className="text-3xl block mb-3">📦</span>
                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Benne Encombrants</h3>
                            <p className="text-sm text-slate-500 mt-2">Meubles, matelas, électroménagers</p>
                            <div className="mt-3 text-blue-600 font-bold text-lg">dès 149€</div>
                        </Link>
                        <Link href="/location-benne-dechets-verts" className="bg-green-50 border border-green-200 p-6 rounded-2xl hover:shadow-lg hover:border-green-400 transition-all group text-center">
                            <span className="text-3xl block mb-3">🌿</span>
                            <h3 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors">Benne Déchets Verts</h3>
                            <p className="text-sm text-slate-500 mt-2">Tontes, branches, feuilles</p>
                            <div className="mt-3 text-green-600 font-bold text-lg">dès 129€</div>
                        </Link>
                        <Link href="/location-benne-dib" className="bg-purple-50 border border-purple-200 p-6 rounded-2xl hover:shadow-lg hover:border-purple-400 transition-all group text-center">
                            <span className="text-3xl block mb-3">🏭</span>
                            <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Benne DIB</h3>
                            <p className="text-sm text-slate-500 mt-2">Bois, métal, plastique, carton</p>
                            <div className="mt-3 text-purple-600 font-bold text-lg">dès 169€</div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-16">Questions fréquentes sur les tarifs</h2>

                    <div className="bg-white border border-slate-200 rounded-3xl p-8">
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((faq, i) => (
                                <AccordionItem key={i} value={`faq-${i}`} className="border-b-slate-100">
                                    <AccordionTrigger className="text-lg font-bold text-slate-900 py-5 text-left">{faq.q}</AccordionTrigger>
                                    <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">{faq.a}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            {/* Guides Associés */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">Nos guides pour aller plus loin</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/guides/comment-choisir-taille-benne" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:shadow-lg hover:border-amber-200 transition-all group">
                            <BookOpen className="h-7 w-7 text-amber-500 mb-3" />
                            <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Comment choisir la taille de sa benne</h3>
                            <p className="text-sm text-slate-500 mt-2">3m³ à 30m³ — tableau comparatif et estimation par projet.</p>
                        </Link>
                        <Link href="/guides/prix-location-benne-guide-complet" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:shadow-lg hover:border-amber-200 transition-all group">
                            <BookOpen className="h-7 w-7 text-amber-500 mb-3" />
                            <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Guide complet des prix 2026</h3>
                            <p className="text-sm text-slate-500 mt-2">Grille tarifaire détaillée avec les surcoûts cachés à éviter.</p>
                        </Link>
                        <Link href="/guides/autorisation-voirie-benne-guide" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:shadow-lg hover:border-amber-200 transition-all group">
                            <BookOpen className="h-7 w-7 text-amber-500 mb-3" />
                            <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Autorisation de voirie</h3>
                            <p className="text-sm text-slate-500 mt-2">Démarches, délais et coûts pour poser une benne en mairie.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-amber-50 border-t border-amber-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Obtenez votre prix exact</h2>
                    <p className="text-xl text-amber-800 mb-10 max-w-2xl mx-auto">
                        Ces tarifs sont indicatifs. Pour connaître le prix exact dans votre ville, demandez votre devis personnalisé gratuit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/devis">
                            <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold text-xl px-12 py-8 rounded-full shadow-2xl transition-all transform hover:scale-105">
                                Devis Gratuit <ArrowRight className="ml-3 h-6 w-6" />
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-8 flex justify-center gap-6 text-sm font-semibold text-amber-700/60 uppercase tracking-widest">
                        <span>Gratuit</span>
                        <span>Rapide</span>
                        <span>Sans engagement</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
