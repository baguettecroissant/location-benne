export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import { getCityFromSlug, generateCityMetadata } from "@/lib/seo-utils";
import { getNearbyCities } from "@/lib/cities";
import { generateGenericContent } from "@/lib/content-engine";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CityMap } from "@/components/pseo/CityMap";
import { CityInfoBar } from "@/components/pseo/CityInfoBar";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Lightbulb, Info, Euro, Clock, Recycle, Shield, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const city = getCityFromSlug(slug);
    if (!city) return {};
    return generateCityMetadata(city);
}

export default async function CityPage({ params }: Props) {
    const { slug } = await params;
    const city = getCityFromSlug(slug);
    if (!city) notFound();

    const nearbyCities = getNearbyCities(city, 8);
    const deptSlug = `${city.department_name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${city.department_code}`;
    const content = generateGenericContent(city);

    const priceFactor = city.population && city.population > 100000 ? 1.15 : city.population && city.population > 50000 ? 1.08 : 1;
    const priceTable = [
        { vol: "3m³", gravats: Math.round(179 * priceFactor), encombrants: Math.round(149 * priceFactor), verts: Math.round(129 * priceFactor), dib: Math.round(169 * priceFactor) },
        { vol: "6m³", gravats: Math.round(279 * priceFactor), encombrants: Math.round(229 * priceFactor), verts: Math.round(199 * priceFactor), dib: Math.round(249 * priceFactor) },
        { vol: "10m³", gravats: Math.round(399 * priceFactor), encombrants: Math.round(299 * priceFactor), verts: Math.round(269 * priceFactor), dib: Math.round(349 * priceFactor) },
        { vol: "15m³", gravats: Math.round(499 * priceFactor), encombrants: Math.round(399 * priceFactor), verts: Math.round(349 * priceFactor), dib: Math.round(449 * priceFactor) },
        { vol: "20m³", gravats: Math.round(599 * priceFactor), encombrants: Math.round(449 * priceFactor), verts: Math.round(399 * priceFactor), dib: Math.round(549 * priceFactor) },
        { vol: "30m³", gravats: Math.round(799 * priceFactor), encombrants: Math.round(599 * priceFactor), verts: Math.round(549 * priceFactor), dib: Math.round(699 * priceFactor) },
    ];

    return (
        <div className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org", "@type": ["Service", "FAQPage"],
                "name": `Location de benne à ${city.name}`,
                "description": `Service de location de bennes à ${city.name} (${city.zip}), département ${city.department_name}.`,
                "areaServed": { "@type": "City", "name": city.name, "containedInPlace": { "@type": "AdministrativeArea", "name": city.department_name } },
                "provider": { "@type": "Organization", "name": "Prix-Location-Benne.fr", "url": "https://www.prix-location-benne.fr" },
                "mainEntity": content.faqItems.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } }))
            }) }} />

            {/* HERO WITH BACKGROUND IMAGE */}
            <section className="relative text-white pb-8 pt-12 overflow-hidden">
                <Image src="/images/hero-homepage.png" alt={`Location de benne à ${city.name}`} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-900/95"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs items={[
                        { label: "Départements", href: "/departements" },
                        { label: `${city.department_name} (${city.department_code})`, href: `/departements/${deptSlug}` },
                        { label: city.name },
                    ]} />
                    <div className="text-center mt-4">
                        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-sm font-medium mb-6">
                            <MapPin className="h-4 w-4" /> {city.zip} — {city.department_name}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6">
                            Location de Benne à <span className="text-amber-400">{city.name}</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Comparez les prix de location de bennes à {city.name} ({city.zip}). Livraison sous 24h, devis gratuit. Gravats, encombrants, déchets verts, DIB.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Link href="/devis"><Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg px-8 py-6 rounded-xl shadow-xl">Devis gratuit à {city.name} <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            <section className="bg-slate-800 py-4 border-b border-slate-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-slate-200 text-xs font-semibold text-center">
                        <div className="flex flex-col items-center gap-1"><Euro className="h-4 w-4 text-amber-400" /> Devis gratuit</div>
                        <div className="flex flex-col items-center gap-1"><Clock className="h-4 w-4 text-amber-400" /> Livraison 24-48h</div>
                        <div className="flex flex-col items-center gap-1"><Recycle className="h-4 w-4 text-amber-400" /> Traitement conforme</div>
                        <div className="flex flex-col items-center gap-1"><Shield className="h-4 w-4 text-amber-400" /> Sans engagement</div>
                    </div>
                </div>
            </section>

            {/* INTRO + CITY INFO BAR */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{content.introTitle}</h2>
                            <div className="prose prose-lg prose-slate max-w-none">
                                <p>{content.introParagraph}</p>
                            </div>
                        </div>
                        <div>
                            <CityInfoBar
                                cityName={city.name}
                                zip={city.zip}
                                departmentName={city.department_name}
                                departmentCode={city.department_code}
                                population={city.population}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* PRIX — GRILLE ENRICHIE PAR TYPE DE DÉCHET */}
            <section className="py-16 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">Prix location de benne à {city.name} — Tarifs 2026</h2>
                    <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto text-sm">{content.pricingContext}</p>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden text-sm">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="text-left py-3 px-4 font-bold">Volume</th>
                                    <th className="text-center py-3 px-4 font-bold"><Link href={`/location-benne-gravats/${city.slug}`} className="hover:text-amber-300 transition-colors">🪨 Gravats</Link></th>
                                    <th className="text-center py-3 px-4 font-bold"><Link href={`/location-benne-encombrants/${city.slug}`} className="hover:text-amber-300 transition-colors">📦 Encombrants</Link></th>
                                    <th className="text-center py-3 px-4 font-bold"><Link href={`/location-benne-dechets-verts/${city.slug}`} className="hover:text-amber-300 transition-colors">🌿 Déchets Verts</Link></th>
                                    <th className="text-center py-3 px-4 font-bold"><Link href={`/location-benne-dib/${city.slug}`} className="hover:text-amber-300 transition-colors">🏭 DIB</Link></th>
                                </tr>
                            </thead>
                            <tbody>
                                {priceTable.map((row, i) => (
                                    <tr key={row.vol} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-amber-50/50 transition-colors`}>
                                        <td className="py-3 px-4 font-bold text-slate-900">{row.vol}</td>
                                        <td className="py-3 px-4 text-center"><span className="font-black text-orange-600">{row.gravats}€</span></td>
                                        <td className="py-3 px-4 text-center"><span className="font-black text-blue-600">{row.encombrants}€</span></td>
                                        <td className="py-3 px-4 text-center"><span className="font-black text-green-600">{row.verts}€</span></td>
                                        <td className="py-3 px-4 text-center"><span className="font-black text-purple-600">{row.dib}€</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-4">* Prix indicatifs TTC pour {city.name}. Tarif final sur devis selon le loueur et la distance.</p>
                </div>
            </section>

            {/* TYPES DE BENNES — MAILLAGE */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">Quelle benne à {city.name} ?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { href: `/location-benne-gravats/${city.slug}`, label: "🪨 Benne Gravats", desc: "Béton, briques, tuiles, carrelage", detail: content.categorySummaries.gravats, color: "border-orange-200 hover:border-orange-400" },
                            { href: `/location-benne-encombrants/${city.slug}`, label: "📦 Benne Encombrants", desc: "Meubles, matelas, électroménagers", detail: content.categorySummaries.encombrants, color: "border-blue-200 hover:border-blue-400" },
                            { href: `/location-benne-dechets-verts/${city.slug}`, label: "🌿 Benne Déchets Verts", desc: "Tontes, branches, feuilles mortes", detail: content.categorySummaries.dechets_verts, color: "border-green-200 hover:border-green-400" },
                            { href: `/location-benne-dib/${city.slug}`, label: "🏭 Benne DIB", desc: "Bois, métal, plastique, carton", detail: content.categorySummaries.dib, color: "border-purple-200 hover:border-purple-400" },
                        ].map((type) => (
                            <Link key={type.href} href={type.href} className={`flex flex-col p-6 bg-white border-2 ${type.color} rounded-2xl transition-all group hover:shadow-lg`}>
                                <h3 className="font-bold text-slate-900 mb-1 text-lg">{type.label}</h3>
                                <p className="text-sm text-amber-600 font-medium mb-3">{type.desc}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">{type.detail}</p>
                                <span className="mt-4 text-sm font-bold text-amber-600 group-hover:text-amber-700 flex items-center gap-1">Voir les prix <ArrowRight className="h-4 w-4" /></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CARTE + INFOS LOCALES */}
            <section className="py-16 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-amber-500" /> Zone de livraison — {city.name} ({city.zip})
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <CityMap cityName={city.name} zip={city.zip} departmentName={city.department_name} />
                        <div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
                                <h3 className="font-bold text-slate-900 mb-3">📍 Informations de livraison</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">→</span> Livraison possible sur tout le territoire de {city.name} et communes limitrophes</li>
                                    <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">→</span> Délai standard : 24 à 48h après validation du devis</li>
                                    <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">→</span> Dépôt sur terrain privé (jardin, parking) : aucune autorisation</li>
                                    <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">→</span> Dépôt sur voie publique : autorisation mairie requise (5-15 jours)</li>
                                </ul>
                            </div>
                            {content.logistique && (
                                <div className="bg-slate-900 text-white rounded-2xl p-6">
                                    <h3 className="font-bold mb-2">🚚 Logistique locale</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">{content.logistique}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTEXTE RÉGIONAL */}
            {content.regionOverview && (
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Info className="h-6 w-6 text-amber-500" /> Location de benne en {city.region}
                        </h2>
                        <div className="prose prose-sm prose-slate max-w-none">
                            <p>{content.regionOverview}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* CONTEXTE DÉPARTEMENT */}
            {content.departmentContext && (
                <section className="py-12 bg-amber-50 border-y border-amber-100">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Déchetteries et traitement dans le {city.department_name}</h2>
                        <p className="text-slate-700 leading-relaxed">{content.departmentContext}</p>
                    </div>
                </section>
            )}

            {/* CONSEIL CLIMAT + PRATIQUE */}
            <section className="py-12 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-amber-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Conseil saisonnier</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{content.climateAdvice}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">💡 Conseils pratiques</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{content.conseilPratique}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* LE SAVIEZ-VOUS */}
            {content.facts.length > 0 && (
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">💡 Le saviez-vous ?</h2>
                        <div className="space-y-4">
                            {content.facts.map((fact, i) => (
                                <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                                    <p className="text-slate-700 text-sm leading-relaxed">{fact}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ DYNAMIQUE */}
            <section className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Questions fréquentes — Location benne {city.name}</h2>
                    <Accordion type="single" collapsible className="bg-white border border-slate-200 rounded-2xl p-6">
                        {content.faqItems.map((faq, i) => (
                            <AccordionItem key={i} value={String(i)}>
                                <AccordionTrigger className="text-lg font-bold text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-slate-600">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* GUIDES */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><BookOpen className="h-5 w-5 text-amber-500" /> Nos guides pour votre projet</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link href="/guides/comment-choisir-taille-benne" className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md hover:border-amber-200 transition-all group">
                            <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">Choisir la taille de sa benne</h3>
                            <p className="text-xs text-slate-500 mt-1">3m³ à 30m³ — guide complet</p>
                        </Link>
                        <Link href="/guides/prix-location-benne-guide-complet" className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md hover:border-amber-200 transition-all group">
                            <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">Guide des prix 2026</h3>
                            <p className="text-xs text-slate-500 mt-1">Grille tarifaire complète</p>
                        </Link>
                        <Link href="/guides/autorisation-voirie-benne-guide" className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md hover:border-amber-200 transition-all group">
                            <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">Autorisation de voirie</h3>
                            <p className="text-xs text-slate-500 mt-1">Démarches et coûts</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* VILLES PROCHES */}
            {nearbyCities.length > 0 && (
                <section className="py-16 bg-slate-50 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-2">
                            <MapPin className="h-6 w-6 text-amber-500" /> Location de benne près de {city.name}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {nearbyCities.map((c) => (
                                <Link key={c.slug} href={`/location-benne/${c.slug}`} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-500 hover:shadow-md transition-all group">
                                    <span className="font-medium text-slate-700 group-hover:text-amber-700 text-sm">{c.name}</span>
                                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">{c.zip}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 bg-amber-50 text-center border-t border-amber-100">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Besoin d&apos;une benne à {city.name} ?</h2>
                    <p className="text-lg text-amber-800 mb-8">Obtenez votre devis gratuit en 2 minutes. Comparez les prix des loueurs à {city.name}.</p>
                    <Link href="/devis"><Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold text-xl px-12 py-7 rounded-full shadow-xl">Devis Gratuit</Button></Link>
                </div>
            </section>
        </div>
    );
}
