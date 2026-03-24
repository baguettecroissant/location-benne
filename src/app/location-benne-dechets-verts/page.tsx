import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TreePine, CheckCircle, AlertTriangle, Truck, Clock, ShieldCheck, HelpCircle, Info, Ruler, Leaf, Flame } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PopularCitiesGrid } from "@/components/pseo/PopularCitiesGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Location Benne Déchets Verts 2026 — Prix, Guide Élagage & Devis",
    description: "Location de benne pour déchets verts : tontes, branches, feuilles, tailles de haies, souches. Bennes 3m³ à 30m³ dès 129€ TTC. Réglementation brûlage, guide élagage. Devis gratuit en 2 min.",
    alternates: { canonical: 'https://www.prix-location-benne.fr/location-benne-dechets-verts' },
};

const faqData = [
    { q: "Peut-on brûler ses déchets verts au fond du jardin ?", a: "Non, le brûlage à l'air libre des déchets verts est interdit partout en France depuis la circulaire du 18 novembre 2011, confirmée par l'article 84 de la loi Climat & Résilience (2021). L'amende est de 450€. Même en zone rurale, aucune dérogation n'est possible. Les alternatives légales : benne de location, compostage domestique, broyage (certaines communes prêtent des broyeurs), dépôt en déchetterie ou service de ramassage communal." },
    { q: "Quelle est la meilleure période pour louer une benne déchets verts ?", a: "La demande est la plus forte de mars à octobre, avec des pics en avril (premières tontes) et septembre-octobre (taille d'automne). Pour bénéficier de meilleurs tarifs et d'une disponibilité garantie, commandez 1 à 2 semaines à l'avance pendant la haute saison. L'hiver (novembre-février) est la basse saison : les prix sont plus compétitifs et les délais de livraison plus courts." },
    { q: "Le bois traité ou peint est-il accepté dans une benne déchets verts ?", a: "Non. Le bois traité (autoclave, lasure), peint ou verni n'est pas un déchet vert : il entre dans la catégorie des DIB (Déchets Industriels Banals). Seul le bois naturel brut, non traité, issu de l'élagage ou de l'abattage d'arbres est accepté en benne déchets verts. Les palettes, planches de terrasse traitées et bardages peints doivent être orientés vers une benne DIB." },
    { q: "Peut-on mettre de la terre dans une benne déchets verts ?", a: "Non. La terre, même végétale, n'est pas un déchet vert. Elle est classée « déchet inerte » (catégorie terres et déblais) et doit suivre une filière spécifique. Si vos souches contiennent de la terre, secouez-les au maximum avant de les charger dans la benne. Un excès de terre dans une benne déchets verts entraîne un surcoût de traitement." },
    { q: "Faut-il broyer les branches avant de les mettre dans la benne ?", a: "Ce n'est pas obligatoire, mais c'est vivement recommandé. Le broyage réduit le volume de 50 à 70%, ce qui vous permet d'utiliser une benne plus petite et donc moins chère. Un broyeur de végétaux se loue environ 80-100€/jour. Certaines communes proposent aussi un service de broyage communal gratuit. Alternative : coupez les branches en tronçons de 50cm et rangez-les à plat dans la benne pour optimiser le remplissage." },
    { q: "Quelles sont les obligations de débroussaillage (OLD) ?", a: "L'Obligation Légale de Débroussaillage (OLD) s'applique dans les zones à risque d'incendie (communes classées) : vous devez débroussailler 50 mètres autour de votre habitation (200m dans certaines zones). Le non-respect est passible de 30 à 60€/m². Ces travaux génèrent des volumes importants de déchets verts : une benne 10 à 20m³ est souvent nécessaire. Renseignez-vous auprès de votre mairie pour connaître votre obligation." },
    { q: "Les déchets verts sont-ils compostés ou incinérés ?", a: "Les déchets verts collectés en benne sont acheminés vers une plateforme de compostage industriel agréée. Ils sont broyés, mis en andain pendant 3 à 6 mois, puis transformés en compost normé (NF U 44-051) vendu aux agriculteurs et paysagistes. C'est une filière 100% valorisation matière, l'une des plus vertueuses du secteur des déchets. Le compostage domestique reste la solution la plus écologique pour les petits volumes." },
    { q: "Existe-t-il des restrictions saisonnières pour la taille des haies ?", a: "Oui. La taille des haies est réglementairement déconseillée du 15 mars au 31 juillet (période de nidification des oiseaux, selon l'article L. 411-1 du Code de l'environnement). Certaines communes prennent des arrêtés rendant cette interdiction obligatoire. L'automne (octobre-novembre) est le meilleur créneau pour les gros élagages. Pour les haies de clôture, une taille d'entretien légère reste tolérée toute l'année." },
];

export default function BenneDechetsVertsPage() {
    return (
        <div className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org", "@type": "FAQPage",
                "mainEntity": faqData.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
            }) }} />

            <section className="bg-green-950 text-white py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 border border-green-500/30 px-4 py-2 rounded-lg text-sm font-semibold mb-6"><TreePine className="h-4 w-4" /> Jardin, élagage & espaces verts</div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">Location Benne <span className="text-green-400">Déchets Verts</span></h1>
                    <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">Évacuez tontes, branches, feuilles, tailles de haies et souches. Bennes de 3m³ à 30m³ livrées en 24h. Alternative légale au brûlage, interdit en France depuis 2011.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/devis"><Button size="lg" className="bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl">Devis Gratuit en 2 min <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                        <Link href="/tarifs"><Button size="lg" variant="outline" className="border-green-400 text-green-300 hover:bg-green-900 font-bold text-lg px-8 py-6 rounded-xl">Voir tous les tarifs</Button></Link>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 prose prose-lg prose-slate max-w-none">
                            <h2>Quand louer une benne pour déchets verts ?</h2>
                            <p>Les travaux de jardin et d&apos;entretien des espaces verts peuvent générer des volumes de déchets <strong>bien supérieurs à ce qu&apos;une déchetterie peut accepter en un seul passage</strong> (souvent limité à 1m³ par visite). La benne de location est la solution pour :</p>
                            <ul>
                                <li><strong>Élagage et abattage d&apos;arbres</strong> : un arbre de taille moyenne produit 3 à 8m³ de branchages. Un gros arbre peut atteindre 15m³.</li>
                                <li><strong>Taille de haies</strong> : une haie de thuyas de 30 mètres linéaires produit facilement 3 à 5m³ de déchets lors d&apos;un rabattage sévère.</li>
                                <li><strong>Défrichage de terrain</strong> : remise en état d&apos;une parcelle abandonnée, nettoyage de sous-bois, préparation de terrain constructible.</li>
                                <li><strong>Obligation Légale de Débroussaillage (OLD)</strong> : dans les zones à risque d&apos;incendie, le débroussaillage obligatoire génère des volumes très importants.</li>
                            </ul>

                            <div className="not-prose bg-red-50 border border-red-200 rounded-2xl p-6 my-8">
                                <div className="flex items-start gap-3">
                                    <Flame className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-red-900 mb-2">⚠️ Brûlage interdit — 450€ d&apos;amende</h3>
                                        <p className="text-sm text-red-700">Le brûlage à l&apos;air libre des déchets verts est <strong>interdit partout en France</strong> (circulaire du 18/11/2011, article 84 de la loi Climat & Résilience). L&apos;amende est de <strong>450€</strong>. Même en zone rurale, aucune dérogation n&apos;est accordée. La location de benne est l&apos;alternative légale la plus simple pour les volumes importants.</p>
                                    </div>
                                </div>
                            </div>

                            <h2>Déchets verts acceptés en benne</h2>
                            <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
                                {[
                                    { item: "Tontes de gazon", detail: "En vrac ou en sacs biodégradables" },
                                    { item: "Branches et branchages", detail: "Élagage, taille, abattage" },
                                    { item: "Feuilles mortes", detail: "Ramassage automnal" },
                                    { item: "Tailles de haies", detail: "Thuyas, lauriers, cyprès, buis" },
                                    { item: "Souches et racines", detail: "Selon diamètre (vérifier avec loueur)" },
                                    { item: "Fleurs et plantes fanées", detail: "Annuelles, vivaces, massifs" },
                                    { item: "Écorces et petit bois", detail: "Paillis naturel, copeaux" },
                                    { item: "Résidus de potager", detail: "Plants de tomates, courges, etc." },
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
                                        <h3 className="font-bold text-red-900 mb-2">⛔ Interdits en benne déchets verts</h3>
                                        <div className="grid sm:grid-cols-2 gap-2 text-sm text-red-700">
                                            <div>• <strong>Terre et déblais</strong> — même végétale</div>
                                            <div>• <strong>Bois traité, peint ou verni</strong> → <Link href="/location-benne-dib" className="underline text-red-800 font-semibold">Benne DIB</Link></div>
                                            <div>• <strong>Gravats, béton, tuiles</strong> → <Link href="/location-benne-gravats" className="underline text-red-800 font-semibold">Benne Gravats</Link></div>
                                            <div>• <strong>Plastique, sacs poubelle</strong></div>
                                            <div>• <strong>Souches trop volumineuses</strong> (Ø &gt; 30cm)</div>
                                            <div>• <strong>Mobilier de jardin</strong> → <Link href="/location-benne-encombrants" className="underline text-red-800 font-semibold">Benne Encombrants</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2>Prix d&apos;une benne déchets verts en 2026</h2>
                            <p>Les déchets verts sont <strong>très volumineux mais légers</strong> (200 à 400 kg/m³). Les bennes sont disponibles en grands volumes, et les tarifs de traitement sont parmi les plus bas puisque la filière de compostage est bien établie :</p>
                        </div>

                        {/* SIDEBAR */}
                        <div className="space-y-6">
                            <div className="bg-amber-500 text-white rounded-2xl p-8 shadow-xl sticky top-24">
                                <h3 className="text-2xl font-bold mb-4">Devis Déchets Verts</h3>
                                <p className="text-amber-100 mb-4 text-sm">Jardin à débroussailler, arbre à élaguer ? Recevez votre tarif en 2 minutes.</p>
                                <Link href="/devis"><Button className="w-full bg-white text-amber-600 hover:bg-amber-50 font-bold text-lg py-5">Devis gratuit <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                                <div className="mt-6 pt-6 border-t border-amber-400/30 space-y-3">
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><Truck className="h-4 w-4" /> Livraison 24h</div>
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><Clock className="h-4 w-4" /> 7 jours inclus</div>
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><Leaf className="h-4 w-4" /> Compostage 100% valorisé</div>
                                </div>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Ruler className="h-5 w-5 text-green-500" /> Volumes par projet</h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">3m³</strong><br/>Tonte + taille de haie standard</li>
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">6m³</strong><br/>Élagage d&apos;arbre moyen, haie de 20m</li>
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">10m³</strong><br/>Abattage d&apos;arbre, défrichage partiel</li>
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">20m³</strong><br/>Remise en état de terrain, OLD</li>
                                    <li><strong className="text-slate-900">30m³</strong><br/>Défrichage complet de grande parcelle</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                                <h3 className="font-bold text-slate-900 mb-3 text-sm">💡 Astuce pro — Broyage</h3>
                                <p className="text-sm text-slate-600">Broyez vos branches avant chargement : vous réduisez le volume de <strong>50 à 70%</strong>. Un broyeur se loue ~80€/jour. Résultat : une benne 6m³ suffit là où 15m³ auraient été nécessaires.</p>
                            </div>

                            <div className="bg-slate-900 text-white rounded-2xl p-6">
                                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Autres bennes</h3>
                                <div className="space-y-3">
                                    <Link href="/location-benne-gravats" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><span className="text-2xl">🪨</span><div><span className="font-semibold text-sm">Gravats</span><br/><span className="text-xs text-slate-400">Béton, briques, tuiles</span></div></Link>
                                    <Link href="/location-benne-encombrants" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><span className="text-2xl">📦</span><div><span className="font-semibold text-sm">Encombrants</span><br/><span className="text-xs text-slate-400">Meubles, matelas, électro</span></div></Link>
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
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">Grille tarifaire benne déchets verts — 2026</h2>
                    <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto text-sm">Prix moyens TTC avec livraison, 7 jours de location et compostage en plateforme agréée</p>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
                            <thead className="bg-green-50"><tr><th className="px-6 py-4 text-left font-bold">Volume</th><th className="px-6 py-4 text-center font-bold">Prix moyen</th><th className="px-6 py-4 text-left font-bold">Usage type</th></tr></thead>
                            <tbody>
                                {[
                                    { vol: "3m³", prix: "129€", usage: "Tonte + taille de haie standard" },
                                    { vol: "6m³", prix: "199€", usage: "Élagage d'arbre moyen, rabattage de haie 30m" },
                                    { vol: "10m³", prix: "269€", usage: "Abattage d'un arbre, défrichage partiel (500m²)" },
                                    { vol: "15m³", prix: "339€", usage: "Nettoyage de jardin complet, plusieurs arbres" },
                                    { vol: "20m³", prix: "399€", usage: "Remise en état de terrain, débroussaillage OLD" },
                                    { vol: "30m³", prix: "499€", usage: "Défrichage complet de grande parcelle (1000m²+)" },
                                ].map((r, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="px-6 py-4 font-bold text-green-600 text-lg">{r.vol}</td><td className="px-6 py-4 text-center font-black text-slate-900 text-lg">{r.prix}</td><td className="px-6 py-4 text-slate-600">{r.usage}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* PROCESSUS */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center">Comment ça marche ?</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Demandez un devis", desc: "Type de projet, volume estimé, date souhaitée. Réponse sous 2 minutes.", icon: HelpCircle },
                            { step: "2", title: "Livraison 24h", desc: "La benne est livrée devant votre jardin ou sur votre terrain.", icon: Truck },
                            { step: "3", title: "Chargez à votre rythme", desc: "7 jours pour remplir. Broyez les branches pour optimiser le volume.", icon: TreePine },
                            { step: "4", title: "Compostage agréé", desc: "Vos déchets sont collectés et compostés en plateforme certifiée.", icon: Leaf },
                        ].map((s) => (
                            <div key={s.step} className="text-center">
                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><s.icon className="h-7 w-7 text-green-600" /></div>
                                <div className="text-sm font-black text-green-500 mb-1">ÉTAPE {s.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                                <p className="text-sm text-slate-500">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PopularCitiesGrid categoryPath="location-benne-dechets-verts" categoryLabel="Benne Déchets Verts" accentColor="green" />

            <section className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">FAQ — Benne Déchets Verts</h2>
                    <Accordion type="single" collapsible className="bg-white border border-slate-200 rounded-2xl p-6">
                        {faqData.map((f, i) => (<AccordionItem key={i} value={String(i)}><AccordionTrigger className="text-base font-bold text-left">{f.q}</AccordionTrigger><AccordionContent className="text-slate-600 text-sm leading-relaxed">{f.a}</AccordionContent></AccordionItem>))}
                    </Accordion>
                </div>
            </section>

            <section className="py-16 bg-green-950 text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-extrabold mb-4">Jardin à nettoyer ?</h2>
                    <p className="text-green-200 text-lg mb-8">Élagage, débroussaillage, tonte — évacuez vos déchets verts légalement. Devis personnalisé en 2 minutes.</p>
                    <Link href="/devis"><Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold text-xl px-12 py-7 rounded-full shadow-xl">Obtenir mon devis gratuit</Button></Link>
                </div>
            </section>
        </div>
    );
}
