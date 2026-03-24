import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, CheckCircle, AlertTriangle, Truck, Clock, ShieldCheck, HelpCircle, Home, Info, Ruler, Hammer } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PopularCitiesGrid } from "@/components/pseo/PopularCitiesGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Location Benne Encombrants 2026 — Débarras, Prix & Devis Gratuit",
    description: "Location de benne pour encombrants : meubles, matelas, électroménagers, objets volumineux. Bennes 3m³ à 30m³ dès 149€ TTC. Guide complet débarras maison, succession, déménagement. Devis gratuit.",
    alternates: { canonical: 'https://www.prix-location-benne.fr/location-benne-encombrants' },
};

const faqData = [
    { q: "Quelle différence entre encombrants et déchets ménagers ?", a: "Les encombrants sont des objets trop volumineux ou trop lourds pour être collectés par le service classique des ordures ménagères : meubles, électroménagers, matelas, vélos, etc. Tous les objets qui ne rentrent pas dans votre poubelle de 240L sont considérés comme encombrants. Ils nécessitent une collecte spécifique : ramassage municipal (souvent limité), déchetterie, ou location de benne." },
    { q: "Les appareils électroménagers vont-ils dans une benne encombrants ?", a: "Les « gros blancs » (lave-linge, réfrigérateur, four, lave-vaisselle) sont des DEEE (Déchets d'Équipements Électriques et Électroniques) et doivent idéalement suivre la filière DEEE : reprise gratuite par le vendeur lors d'un achat neuf (programme « 1 pour 1 »), ou dépôt en déchetterie. En pratique, certains loueurs les acceptent dans les bennes encombrants car ils seront triés au centre de traitement. Vérifiez au moment du devis." },
    { q: "Combien de temps peut-on garder la benne ?", a: "La durée standard de location est de 7 jours calendaires. Au-delà, la plupart des loueurs facturent un supplément de 5 à 15€ par jour supplémentaire. Des locations longue durée (15 jours, 1 mois) sont possibles sur devis pour les chantiers de rénovation. Si la benne est posée sur la voie publique, la durée est limitée par votre autorisation de voirie (généralement 7 à 15 jours)." },
    { q: "Quelle benne pour vider une maison complète (succession, déménagement) ?", a: "Pour un appartement T2-T3 standard : une benne de 10 à 15m³ suffit généralement. Pour une maison de 4-5 pièces avec grenier et garage : prévoyez 20 à 30m³. Astuce : les encombrants sont volumineux mais légers — en cas de doute, prenez systématiquement la taille supérieure. Le surcoût est bien moindre qu'une seconde rotation (150 à 200€ de frais de livraison supplémentaire)." },
    { q: "La benne encombrants accepte-t-elle les gravats ?", a: "Non. Les gravats (béton, briques, tuiles) sont des déchets inertes beaucoup plus lourds qui nécessitent une benne spécialement renforcée et une filière de traitement différente (ISDI). Mélanger encombrants et gravats entraîne un surcoût de tri important. Si votre chantier produit les deux types de déchets, commandez une benne encombrants ET une benne gravats séparément." },
    { q: "Peut-on mettre des déchets alimentaires ou liquides dans la benne ?", a: "Non. Les déchets putrescibles (alimentaires), les liquides (peintures, huiles, solvants) et les déchets dangereux (batteries, produits chimiques, médicaments) sont strictement interdits dans toutes les bennes. Les liquides risquent de s'écouler pendant le transport, ce qui constitue une infraction environnementale. Orientez ces déchets vers votre déchetterie locale ou les points de collecte spécialisés." },
    { q: "Le loueur se charge-t-il du chargement de la benne ?", a: "En règle générale, non. La location de benne est un service de mise à disposition : le loueur livre la benne vide et la récupère une fois pleine. Le chargement est à votre charge. Si vous avez besoin d'aide pour le chargement (vidage de grenier, succession), vous pouvez faire appel à une entreprise de débarras qui proposera une prestation tout-en-un : manutention + benne + évacuation." },
    { q: "Quelle est la différence de prix entre une benne encombrants et une benne gravats ?", a: "À volume égal, les bennes encombrants sont légèrement moins chères que les bennes gravats car les encombrants sont plus légers et les frais de traitement en centre de tri sont inférieurs à ceux d'un ISDI. Cependant, une benne encombrants 20m³ (449€) revient plus cher qu'une benne gravats 10m³ (399€) car les bennes encombrants sont disponibles en plus grands volumes." },
];

export default function BenneEncombrantsPage() {
    return (
        <div className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org", "@type": "FAQPage",
                "mainEntity": faqData.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
            }) }} />

            {/* HERO */}
            <section className="bg-blue-950 text-white py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
                        <Package className="h-4 w-4" /> Débarras & objets volumineux
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">Location Benne <span className="text-blue-400">Encombrants</span></h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Débarrassez-vous de vos meubles, matelas, électroménagers et objets volumineux. Bennes de 3m³ à 30m³ livrées en 24h. Idéal pour débarras de maison, succession ou déménagement.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/devis"><Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl">Devis Gratuit en 2 min <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                        <Link href="/tarifs"><Button size="lg" variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900 font-bold text-lg px-8 py-6 rounded-xl">Voir tous les tarifs</Button></Link>
                    </div>
                </div>
            </section>

            {/* CONTENU */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 prose prose-lg prose-slate max-w-none">
                            <h2>La benne encombrants : pour quels projets ?</h2>
                            <p>La benne encombrants est la solution idéale pour évacuer <strong>tous les objets volumineux</strong> qui ne peuvent pas être traités par le ramassage des ordures ménagères classique. Elle est particulièrement adaptée à trois situations courantes :</p>
                            <ul>
                                <li><strong>Débarras de maison ou d&apos;appartement</strong> : succession, départ en maison de retraite, vidage avant vente immobilière. Le volume d&apos;objets accumulés sur des années dépasse largement la capacité d&apos;une voiture ou d&apos;un utilitaire.</li>
                                <li><strong>Rénovation de logement</strong> : remplacement de cuisine, de salle de bain, de mobilier. Les anciens équipements (meubles, sanitaires, plans de travail) nécessitent une évacuation rapide pour ne pas bloquer le chantier.</li>
                                <li><strong>Déménagement</strong> : le tri avant déménagement génère des volumes importants de mobilier à jeter, matelas usagés, vaisselle cassée, vêtements et textiles.</li>
                            </ul>

                            <div className="not-prose bg-blue-50 border border-blue-200 rounded-2xl p-6 my-8">
                                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-blue-500" /> Bon à savoir — Ramassage municipal</h3>
                                <p className="text-sm text-slate-600">La plupart des communes proposent un service de <strong>ramassage gratuit des encombrants</strong> (1 à 2 fois par an, sur rendez-vous). Cependant, ce service est limité en volume (souvent 2m³ max), en fréquence, et ne couvre pas les projets de débarras complet. La benne de location est <strong>sans limite de volume</strong>, livrée quand vous en avez besoin, et reste disponible pendant 7 jours.</p>
                            </div>

                            <h2>Encombrants acceptés en benne</h2>
                            <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
                                {[
                                    { item: "Meubles", detail: "Armoires, canapés, tables, chaises, bibliothèques" },
                                    { item: "Literie", detail: "Matelas, sommiers, cadres de lit" },
                                    { item: "Électroménager", detail: "Lave-linge, four, micro-ondes (selon loueur)" },
                                    { item: "Objets volumineux", detail: "Vélos, poussettes, jouets, valises" },
                                    { item: "Textile en grande quantité", detail: "Vêtements, rideaux, couettes, tapis" },
                                    { item: "Cartons et emballages", detail: "Cartons de déménagement, polystyrène" },
                                    { item: "Vaisselle et verrerie", detail: "Assiettes, verres, objets en céramique" },
                                    { item: "Équipement de jardin", detail: "Salon de jardin, barbecue, parasol" },
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
                                        <h3 className="font-bold text-red-900 mb-2">⛔ Déchets interdits en benne encombrants</h3>
                                        <div className="grid sm:grid-cols-2 gap-2 text-sm text-red-700">
                                            <div>• <strong>Gravats</strong> → <Link href="/location-benne-gravats" className="underline text-red-800 font-semibold">Benne Gravats</Link></div>
                                            <div>• <strong>Déchets verts</strong> → <Link href="/location-benne-dechets-verts" className="underline text-red-800 font-semibold">Benne Déchets Verts</Link></div>
                                            <div>• <strong>Pneus</strong> — filière retour garage</div>
                                            <div>• <strong>Peintures, solvants, huiles</strong> — déchetterie</div>
                                            <div>• <strong>Batteries et piles</strong> — points de collecte</div>
                                            <div>• <strong>Déchets alimentaires</strong> — poubelle classique</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2>Prix d&apos;une benne encombrants en 2026</h2>
                            <p>Les encombrants étant <strong>volumineux mais légers</strong> (100 à 300 kg/m³), les bennes encombrants sont disponibles dans des <strong>volumes plus importants</strong> que les bennes gravats, allant jusqu&apos;à 30m³. Le prix inclut la livraison, 7 jours de location et le traitement au centre de tri agréé :</p>
                        </div>

                        {/* SIDEBAR */}
                        <div className="space-y-6">
                            <div className="bg-amber-500 text-white rounded-2xl p-8 shadow-xl sticky top-24">
                                <h3 className="text-2xl font-bold mb-4">Devis Encombrants</h3>
                                <p className="text-amber-100 mb-4 text-sm">Tarif personnalisé en 2 minutes. Idéal pour débarras, succession et déménagement.</p>
                                <Link href="/devis"><Button className="w-full bg-white text-amber-600 hover:bg-amber-50 font-bold text-lg py-5">Devis gratuit <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                                <div className="mt-6 pt-6 border-t border-amber-400/30 space-y-3">
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><Truck className="h-4 w-4" /> Livraison 24h</div>
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><Clock className="h-4 w-4" /> 7 jours inclus</div>
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><ShieldCheck className="h-4 w-4" /> Traitement aux normes</div>
                                </div>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Ruler className="h-5 w-5 text-blue-500" /> Guide des volumes</h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">3m³</strong><br/>Petit débarras : quelques meubles, cartons</li>
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">10m³</strong><br/>Débarras d&apos;appartement T2-T3</li>
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">15m³</strong><br/>Rénovation de cuisine + salle de bain</li>
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">20m³</strong><br/>Vidage de maison 3-4 pièces</li>
                                    <li><strong className="text-slate-900">30m³</strong><br/>Succession complète, grenier + garage + maison</li>
                                </ul>
                            </div>

                            <div className="bg-slate-900 text-white rounded-2xl p-6">
                                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Autres types de bennes</h3>
                                <div className="space-y-3">
                                    <Link href="/location-benne-gravats" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><span className="text-2xl">🪨</span><div><span className="font-semibold text-sm">Gravats</span><br/><span className="text-xs text-slate-400">Béton, briques, tuiles</span></div></Link>
                                    <Link href="/location-benne-dechets-verts" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><span className="text-2xl">🌿</span><div><span className="font-semibold text-sm">Déchets Verts</span><br/><span className="text-xs text-slate-400">Tontes, branches, feuilles</span></div></Link>
                                    <Link href="/location-benne-dib" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><span className="text-2xl">🏭</span><div><span className="font-semibold text-sm">DIB</span><br/><span className="text-xs text-slate-400">Bois, métal, plastique, plâtre</span></div></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GRILLE PRIX */}
            <section className="py-16 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">Grille tarifaire benne encombrants — 2026</h2>
                    <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto text-sm">Prix moyens TTC incluant livraison, 7 jours de location et traitement en centre de tri</p>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold text-slate-900">Volume</th>
                                    <th className="px-6 py-4 text-center font-bold text-slate-900">Prix moyen</th>
                                    <th className="px-6 py-4 text-left font-bold text-slate-900">Usage recommandé</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { vol: "3m³", prix: "149€", usage: "Quelques meubles, tri de garage partiel" },
                                    { vol: "6m³", prix: "219€", usage: "Débarras de studio, déménagement de petite taille" },
                                    { vol: "10m³", prix: "299€", usage: "Vidage d'appartement T2-T3, rénovation d'une pièce" },
                                    { vol: "15m³", prix: "369€", usage: "Rénovation cuisine + SdB, vidage de cave ou grenier" },
                                    { vol: "20m³", prix: "449€", usage: "Vidage de maison 3-4 pièces, succession" },
                                    { vol: "30m³", prix: "599€", usage: "Succession complète maison + grenier + garage + cave" },
                                ].map((r, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                        <td className="px-6 py-4 font-bold text-blue-600 text-lg">{r.vol}</td>
                                        <td className="px-6 py-4 text-center font-black text-slate-900 text-lg">{r.prix}</td>
                                        <td className="px-6 py-4 text-slate-600">{r.usage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CAS D'USAGE CONCRETS */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Cas d&apos;usage concrets</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Home, title: "Succession & vidage de maison", desc: "Après le décès d'un proche ou le départ en EHPAD, le vidage complet d'un logement nécessite un volume important. Comptez 20 à 30m³ pour une maison de 4-5 pièces avec dépendances. La benne reste 7 jours, le temps de trier et charger à votre rythme.", accentColor: "bg-blue-100 text-blue-600" },
                            { icon: Package, title: "Déménagement & grand tri", desc: "Le déménagement est l'occasion de faire un grand tri. Meubles abîmés, matelas usagés, cartons accumulés : une benne 10 à 15m³ vous évite les allers-retours en déchetterie et vous fait gagner un temps précieux le jour J.", accentColor: "bg-indigo-100 text-indigo-600" },
                            { icon: Hammer, title: "Rénovation de logement", desc: "Remplacement de cuisine, de salle de bain, de revêtements : les anciens équipements (meubles, sanitaires, faïence) doivent être évacués rapidement pour ne pas encombrer le chantier. Une benne 10m³ par pièce est un bon repère.", accentColor: "bg-purple-100 text-purple-600" },
                        ].map((c, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                <div className={`w-12 h-12 ${c.accentColor} rounded-xl flex items-center justify-center mb-4`}><c.icon className="h-6 w-6" /></div>
                                <h3 className="font-bold text-slate-900 mb-3 text-lg">{c.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESSUS */}
            <section className="py-16 bg-blue-50 border-y border-blue-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center">Comment ça marche ?</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Devis en ligne", desc: "Indiquez votre ville, le volume estimé et vos dates. Réponse en 2 minutes.", icon: HelpCircle },
                            { step: "2", title: "Livraison rapide", desc: "Votre benne est livrée à l'adresse souhaitée sous 24 à 48h.", icon: Truck },
                            { step: "3", title: "7 jours pour charger", desc: "Remplissez la benne à votre rythme. Ne dépassez pas le bord supérieur.", icon: Package },
                            { step: "4", title: "Enlèvement & tri", desc: "Le loueur récupère la benne et oriente vos encombrants vers le centre de tri agréé.", icon: ShieldCheck },
                        ].map((s) => (
                            <div key={s.step} className="text-center">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><s.icon className="h-7 w-7 text-blue-600" /></div>
                                <div className="text-sm font-black text-blue-500 mb-1">ÉTAPE {s.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                                <p className="text-sm text-slate-500">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PopularCitiesGrid categoryPath="location-benne-encombrants" categoryLabel="Benne Encombrants" accentColor="blue" />

            {/* FAQ */}
            <section className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">FAQ — Benne Encombrants</h2>
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

            <section className="py-16 bg-blue-950 text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-extrabold mb-4">Besoin de vider une maison ?</h2>
                    <p className="text-blue-200 text-lg mb-8">Succession, déménagement, rénovation — obtenez votre devis personnalisé en 2 minutes. Livraison sous 24h.</p>
                    <Link href="/devis"><Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold text-xl px-12 py-7 rounded-full shadow-xl">Obtenir mon devis gratuit</Button></Link>
                </div>
            </section>
        </div>
    );
}
