import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, CheckCircle, AlertTriangle, Truck, Clock, ShieldCheck, HelpCircle, Info, Ruler, Recycle, FileText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PopularCitiesGrid } from "@/components/pseo/PopularCitiesGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Location Benne DIB (Déchets Industriels Banals) — Prix 2026 & Devis",
    description: "Location de benne DIB pour professionnels et particuliers : bois, métal, plastique, plâtre, carton. Bennes 10m³ à 30m³ dès 299€ TTC. Décret 7 flux, tri, traçabilité. Devis gratuit en 2 min.",
    alternates: { canonical: 'https://www.prix-location-benne.fr/location-benne-dib' },
};

const faqData = [
    { q: "Qu'est-ce qu'un DIB exactement ?", a: "Les Déchets Industriels Banals (DIB) sont tous les déchets non dangereux produits par les entreprises, artisans, commerçants et collectivités — hors déchets inertes (gravats). Concrètement, ce sont les déchets de chantier « mélangés » : chutes de bois, plastiques d'emballage, plaques de plâtre, isolants non dangereux, métal, carton, moquette, etc. Le terme « industriels » est trompeur : les particuliers peuvent aussi produire des DIB lors de travaux de rénovation." },
    { q: "Quelle est la différence entre une benne DIB et une benne gravats ?", a: "La benne gravats n'accepte que les déchets inertes (béton, briques, tuiles) et est limitée à 10m³ en raison du poids. La benne DIB accepte tous les déchets non dangereux, non inertes : bois, plastique, plâtre, métal, carton, isolants, etc. Les DIB sont plus légers mais plus volumineux, d'où des bennes de 10 à 30m³. Les coûts de traitement des DIB sont plus élevés car ils nécessitent un tri en centre de traitement." },
    { q: "Faut-il trier les DIB dans la benne ?", a: "Le tri dans la benne n'est pas obligatoire mais très fortement recommandé. Un benne de DIB triés (mono-matériau : tout bois, tout métal, tout plâtre) coûte 30 à 50% moins cher qu'une benne tout-venant. Pour les chantiers importants, le décret « 7 flux » (décret n° 2016-288) impose le tri séparé de 7 catégories : papier/carton, métal, plastique, verre, bois, textile, plâtre. Ce tri est obligatoire pour les sites produisant plus de 1100L de déchets par semaine." },
    { q: "Les déchets contenant de l'amiante sont-ils acceptés en benne DIB ?", a: "Absolument pas. L'amiante est un déchet dangereux (classe DD) soumis à une réglementation très stricte. Son conditionnement, transport et traitement doivent être réalisés par des entreprises certifiées, avec un acheminement vers un centre ISDD (Installation de Stockage de Déchets Dangereux). Si vous suspectez la présence d'amiante (fibrociment, dalles vinyle avant 1997, flocage), un diagnostic amiante avant travaux (DAAT) est obligatoire." },
    { q: "Comment fonctionne la traçabilité des DIB ?", a: "Depuis la loi AGEC (2020) et le décret triennal, tout producteur de déchets du BTP doit assurer la traçabilité de ses déchets. Votre loueur vous fournira un Bordereau de Suivi des Déchets (BSD) mentionnant : la nature et le volume des déchets, le nom du collecteur, la destination finale (centre de tri, recyclage, valorisation énergétique ou enfouissement). Conservez ce bordereau pendant 3 ans minimum — il constitue votre preuve de conformité." },
    { q: "Quelle est la différence de prix entre DIB trié et DIB tout-venant ?", a: "L'écart est significatif. Exemple pour une benne 10m³ : DIB tout-venant (mélangé) = 299-350€ TTC. Benne bois seul = 180-250€. Benne ferraille = souvent gratuit ou très peu cher car le métal a une valeur de revente. Benne plâtre seul = 200-280€. Le tri à la source, même s'il demande un peu plus d'organisation sur le chantier, est toujours rentable économiquement." },
    { q: "Le plâtre peut-il aller dans la benne DIB tout-venant ?", a: "Techniquement oui, mais c'est fortement déconseillé depuis le décret 7 flux qui impose le tri séparé du plâtre. Le plâtre contamine les autres matériaux et augmente le coût de traitement. De plus, le plâtre est 100% recyclable dans une filière dédiée (la filière Placo® Recycling par exemple). Si votre chantier génère plus de 200 kg de plâtre, commandez une benne plâtre dédiée — c'est plus économique et plus responsable." },
    { q: "Quels sont les déchets dangereux interdits en benne DIB ?", a: "Les déchets dangereux (DD) ne doivent JAMAIS être mélangés aux DIB. Ils incluent : peintures et solvants, colles et résines chimiques, huiles de vidange, batteries et accumulateurs, tubes fluorescents et néons, produits phytosanitaires, bois traité CCA (arsenic), amiante et fibrociment, et tout matériau contaminé. Ces déchets doivent être acheminés vers un centre ISDD ou un point de collecte spécialisé." },
];

export default function BenneDIBPage() {
    return (
        <div className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org", "@type": "FAQPage",
                "mainEntity": faqData.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
            }) }} />

            <section className="bg-purple-950 text-white py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-lg text-sm font-semibold mb-6"><Factory className="h-4 w-4" /> Professionnels, artisans & particuliers</div>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">Location Benne <span className="text-purple-400">DIB</span></h1>
                    <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-2">Déchets Industriels Banals</p>
                    <p className="text-lg text-purple-200 max-w-2xl mx-auto mb-8">Bois, métal, plastique, plâtre, carton et tous déchets non dangereux de chantier. Bennes 10m³ à 30m³, tri 7 flux, traçabilité BSD incluse.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/devis"><Button size="lg" className="bg-purple-500 hover:bg-purple-400 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl">Devis Gratuit en 2 min <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                        <Link href="/tarifs"><Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-900 font-bold text-lg px-8 py-6 rounded-xl">Voir tous les tarifs</Button></Link>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 prose prose-lg prose-slate max-w-none">
                            <h2>Qu&apos;est-ce qu&apos;un DIB ?</h2>
                            <p>Les <strong>Déchets Industriels Banals</strong> (DIB) — également appelés <strong>Déchets d&apos;Activités Économiques (DAE)</strong> depuis la loi AGEC — sont tous les déchets <strong>non dangereux et non inertes</strong> produits par les entreprises, artisans et particuliers dans le cadre de travaux ou d&apos;activités professionnelles. Le terme « industriels » est historique : il ne signifie pas que seules les industries sont concernées. Tout chantier de rénovation qui génère des déchets mélangés (bois + plâtre + plastique + carton) produit des DIB.</p>
                            <p>Les DIB se distinguent des <strong>gravats</strong> (déchets inertes comme le béton et la brique, qui vont en ISDI) et des <strong>déchets dangereux</strong> (amiante, peintures, solvants, qui vont en ISDD). Ils constituent la catégorie la plus large et la plus diversifiée de déchets de chantier.</p>

                            <div className="not-prose bg-purple-50 border border-purple-200 rounded-2xl p-6 my-8">
                                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><FileText className="h-5 w-5 text-purple-500" /> Décret 7 flux — Ce que dit la loi</h3>
                                <p className="text-sm text-slate-600 mb-3">Le <strong>décret n° 2016-288</strong> (dit « décret 7 flux ») impose le tri séparé de 7 catégories de déchets à tout producteur dépassant <strong>1 100 litres de déchets par semaine</strong> :</p>
                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                                    {["Papier", "Métal", "Plastique", "Verre", "Bois", "Textile", "Plâtre"].map((m, i) => (
                                        <div key={i} className="bg-white rounded-lg p-2 text-center text-xs font-bold text-purple-700 border border-purple-100">{m}</div>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 mt-3">Le non-respect est passible d&apos;amendes de 150€ (personne physique) à 750€ (personne morale) par infraction constatée.</p>
                            </div>

                            <h2>Déchets DIB acceptés en benne</h2>
                            <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
                                {[
                                    { item: "Bois", detail: "Palettes, charpente, menuiserie, plancher" },
                                    { item: "Métal et ferraille", detail: "Tuyaux, radiateurs, armatures, grillage" },
                                    { item: "Plastique", detail: "PVC, PE, films, gaines, tuyaux" },
                                    { item: "Carton et papier", detail: "Emballages, cartons de livraison" },
                                    { item: "Plâtre", detail: "Plaques BA13, enduit, carreaux de plâtre" },
                                    { item: "Isolants non dangereux", detail: "Laine de verre, PSE, mousse PU" },
                                    { item: "Moquette et revêtements", detail: "Lino, dalles PVC, parquet flottant" },
                                    { item: "Polystyrène", detail: "Blocs, plaques, emballages PSE" },
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
                                        <h3 className="font-bold text-red-900 mb-2">⛔ Déchets dangereux — Strictement interdits en benne DIB</h3>
                                        <div className="grid sm:grid-cols-2 gap-2 text-sm text-red-700">
                                            <div>• <strong>Amiante et fibrociment</strong> — filière ISDD</div>
                                            <div>• <strong>Peintures et solvants</strong> — déchetterie</div>
                                            <div>• <strong>Huiles et graisses</strong> — point de collecte</div>
                                            <div>• <strong>Batteries et accumulateurs</strong> — filière DEEE</div>
                                            <div>• <strong>Gravats (béton, brique)</strong> → <Link href="/location-benne-gravats" className="underline text-red-800 font-semibold">Benne Gravats</Link></div>
                                            <div>• <strong>Déchets verts</strong> → <Link href="/location-benne-dechets-verts" className="underline text-red-800 font-semibold">Benne Déchets Verts</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2>Prix d&apos;une benne DIB en 2026</h2>
                            <p>Le prix dépend du <strong>volume et du degré de tri</strong>. Une benne triée (mono-matériau) coûte <strong>30 à 50% moins cher</strong> qu&apos;une benne tout-venant. Pour les chantiers importants, le tri à la source est toujours rentable :</p>
                        </div>

                        {/* SIDEBAR */}
                        <div className="space-y-6">
                            <div className="bg-amber-500 text-white rounded-2xl p-8 shadow-xl sticky top-24">
                                <h3 className="text-2xl font-bold mb-4">Devis DIB</h3>
                                <p className="text-amber-100 mb-4 text-sm">Chantier de rénovation, aménagement de locaux ? Tarif dégressif multi-bennes.</p>
                                <Link href="/devis"><Button className="w-full bg-white text-amber-600 hover:bg-amber-50 font-bold text-lg py-5">Devis gratuit <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                                <div className="mt-6 pt-6 border-t border-amber-400/30 space-y-3">
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><Truck className="h-4 w-4" /> Livraison 24h</div>
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><Clock className="h-4 w-4" /> 7 jours inclus</div>
                                    <div className="flex items-center gap-2 text-amber-100 text-sm"><FileText className="h-4 w-4" /> BSD traçabilité fourni</div>
                                </div>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Ruler className="h-5 w-5 text-purple-500" /> Volumes par chantier</h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">10m³</strong><br/>Rénovation d&apos;une pièce, petit chantier artisan</li>
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">15m³</strong><br/>Rénovation de cuisine + salle de bain</li>
                                    <li className="border-b border-slate-100 pb-3"><strong className="text-slate-900">20m³</strong><br/>Rénovation d&apos;appartement complet, aménagement de local</li>
                                    <li><strong className="text-slate-900">30m³</strong><br/>Chantier professionnel complet, démolition intérieure</li>
                                </ul>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                                <h3 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2"><Recycle className="h-4 w-4 text-purple-500" /> Astuce — Tri = Économies</h3>
                                <p className="text-sm text-slate-600">Une benne <strong>bois pur</strong> coûte 30-50% moins cher qu&apos;une benne tout-venant. La <strong>ferraille</strong> est souvent reprise gratuitement ou à très bas prix. Triez à la source pour optimiser votre budget.</p>
                            </div>

                            <div className="bg-slate-900 text-white rounded-2xl p-6">
                                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Autres bennes</h3>
                                <div className="space-y-3">
                                    <Link href="/location-benne-gravats" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><span className="text-2xl">🪨</span><div><span className="font-semibold text-sm">Gravats</span><br/><span className="text-xs text-slate-400">Béton, briques, tuiles</span></div></Link>
                                    <Link href="/location-benne-encombrants" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><span className="text-2xl">📦</span><div><span className="font-semibold text-sm">Encombrants</span><br/><span className="text-xs text-slate-400">Meubles, matelas, électro</span></div></Link>
                                    <Link href="/location-benne-dechets-verts" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><span className="text-2xl">🌿</span><div><span className="font-semibold text-sm">Déchets Verts</span><br/><span className="text-xs text-slate-400">Tontes, branches, feuilles</span></div></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GRILLE PRIX */}
            <section className="py-16 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">Grille tarifaire benne DIB — 2026</h2>
                    <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto text-sm">Prix moyens TTC avec livraison, 7 jours de location et traitement en centre de tri agréé</p>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4 text-lg">📦 DIB Tout-venant (mélangé)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
                                    <thead className="bg-purple-50"><tr><th className="px-4 py-3 text-left font-bold">Volume</th><th className="px-4 py-3 text-center font-bold">Prix</th></tr></thead>
                                    <tbody>
                                        {[
                                            { vol: "10m³", prix: "299€" },
                                            { vol: "15m³", prix: "399€" },
                                            { vol: "20m³", prix: "449€" },
                                            { vol: "30m³", prix: "599€" },
                                        ].map((r, i) => (
                                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="px-4 py-3 font-bold text-purple-600">{r.vol}</td><td className="px-4 py-3 text-center font-black text-slate-900">{r.prix}</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4 text-lg">♻️ DIB Trié (mono-matériau)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
                                    <thead className="bg-green-50"><tr><th className="px-4 py-3 text-left font-bold">Matériau</th><th className="px-4 py-3 text-center font-bold">10m³</th><th className="px-4 py-3 text-center font-bold">20m³</th></tr></thead>
                                    <tbody>
                                        {[
                                            { mat: "Bois seul", p10: "199€", p20: "329€" },
                                            { mat: "Ferraille", p10: "Gratuit*", p20: "Gratuit*" },
                                            { mat: "Plâtre seul", p10: "249€", p20: "379€" },
                                            { mat: "Carton seul", p10: "149€", p20: "249€" },
                                        ].map((r, i) => (
                                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}><td className="px-4 py-3 font-semibold text-slate-700">{r.mat}</td><td className="px-4 py-3 text-center font-bold text-green-600">{r.p10}</td><td className="px-4 py-3 text-center font-bold text-green-600">{r.p20}</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">* La ferraille a une valeur de revente. Certains loueurs la collectent gratuitement.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESSUS */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center">Comment ça marche ?</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Devis personnalisé", desc: "Volume, type de déchet (trié ou mélangé), localisation. Réponse en 2 minutes.", icon: HelpCircle },
                            { step: "2", title: "Livraison sur site", desc: "La benne est livrée sur votre chantier ou à l'adresse souhaitée sous 24h.", icon: Truck },
                            { step: "3", title: "7 jours de remplissage", desc: "Remplissez la benne au fil du chantier. Triez si possible pour réduire les coûts.", icon: Factory },
                            { step: "4", title: "Tri et valorisation", desc: "Le loueur collecte la benne. Vos déchets sont triés et orientés vers les filières de recyclage. BSD fourni.", icon: Recycle },
                        ].map((s) => (
                            <div key={s.step} className="text-center">
                                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><s.icon className="h-7 w-7 text-purple-600" /></div>
                                <div className="text-sm font-black text-purple-500 mb-1">ÉTAPE {s.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                                <p className="text-sm text-slate-500">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAS D'USAGE PRO */}
            <section className="py-16 bg-purple-50 border-y border-purple-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Cas d&apos;usage professionnels</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Artisan du bâtiment", desc: "Plaquiste, plombier, électricien, menuisier — vos chutes de chantier (plâtre, gaines, bois, plastique) sont des DIB. Une benne 10m³ sur chaque chantier permet une gestion propre et conforme. Demandez un tarif pro multi-chantiers.", color: "bg-purple-100 text-purple-600" },
                            { title: "Entreprise de rénovation", desc: "Rénovation d'appartement ou de local commercial : les déchets mélangés (cloisons BA13, moquette, faux-plafond, câblage) remplissent vite une benne 20m³. Le tri bois/plâtre/ferraille réduit la facture de 30 à 50%.", color: "bg-indigo-100 text-indigo-600" },
                            { title: "Particulier en travaux", desc: "Rénovation de cuisine, salle de bain, isolation de combles : si vos déchets contiennent un mélange de matériaux (pas uniquement des gravats), vous avez besoin d'une benne DIB plutôt que d'une benne gravats.", color: "bg-violet-100 text-violet-600" },
                        ].map((c, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
                                <div className={`w-12 h-12 ${c.color} rounded-xl flex items-center justify-center mb-4`}><Factory className="h-6 w-6" /></div>
                                <h3 className="font-bold text-slate-900 mb-3 text-lg">{c.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PopularCitiesGrid categoryPath="location-benne-dib" categoryLabel="Benne DIB" accentColor="purple" />

            <section className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">FAQ — Benne DIB</h2>
                    <Accordion type="single" collapsible className="bg-white border border-slate-200 rounded-2xl p-6">
                        {faqData.map((f, i) => (<AccordionItem key={i} value={String(i)}><AccordionTrigger className="text-base font-bold text-left">{f.q}</AccordionTrigger><AccordionContent className="text-slate-600 text-sm leading-relaxed">{f.a}</AccordionContent></AccordionItem>))}
                    </Accordion>
                </div>
            </section>

            <section className="py-16 bg-purple-950 text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-extrabold mb-4">Chantier en cours ?</h2>
                    <p className="text-purple-200 text-lg mb-8">Gérez vos DIB conformément au décret 7 flux. Devis pro en 2 minutes, BSD inclus.</p>
                    <Link href="/devis"><Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold text-xl px-12 py-7 rounded-full shadow-xl">Obtenir mon devis gratuit</Button></Link>
                </div>
            </section>
        </div>
    );
}
