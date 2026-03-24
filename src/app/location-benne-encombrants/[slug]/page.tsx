import { notFound } from "next/navigation";
import { getCityFromSlug, getAllCitySlugs } from "@/lib/seo-utils";
import { getNearbyCities } from "@/lib/cities";
import { generateEncombrantsContent } from "@/lib/content-engine";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CityMap } from "@/components/pseo/CityMap";
import { CityInfoBar } from "@/components/pseo/CityInfoBar";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, CheckCircle, Package, Lightbulb, Info, Euro, Clock, Recycle, Shield, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WasteTypeCrossLinks } from "@/components/pseo/WasteTypeCrossLinks";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return getAllCitySlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const city = getCityFromSlug(slug);
    if (!city) return {};
    return {
        title: `Benne Encombrants ${city.name} (${city.zip}) — Prix & Devis 2026`,
        description: `Location de benne pour encombrants à ${city.name} (${city.zip}). Meubles, matelas, électroménagers — dès 149€ TTC. Devis gratuit, livraison 24h dans le ${city.department_name}.`,
        alternates: { canonical: `https://www.prix-location-benne.fr/location-benne-encombrants/${city.slug}` },
    };
}

export default async function EncombrantsCityPage({ params }: Props) {
    const { slug } = await params;
    const city = getCityFromSlug(slug);
    if (!city) notFound();

    const nearbyCities = getNearbyCities(city, 6);
    const content = generateEncombrantsContent(city);
    const priceFactor = city.population && city.population > 100000 ? 1.12 : city.population && city.population > 50000 ? 1.06 : 1;
    const prices = [
        { vol: "3m³", prix: Math.round(149 * priceFactor) },
        { vol: "10m³", prix: Math.round(299 * priceFactor) },
        { vol: "20m³", prix: Math.round(449 * priceFactor) },
    ];

    return (
        <div className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org", "@type": ["Service", "FAQPage"],
                "name": `Location benne encombrants à ${city.name}`,
                "description": `Débarras et évacuation d'encombrants à ${city.name} (${city.zip}). Bennes 3m³ à 30m³.`,
                "areaServed": { "@type": "City", "name": city.name },
                "provider": { "@type": "Organization", "name": "Prix-Location-Benne.fr" },
                "mainEntity": content.faqItems.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } }))
            }) }} />

            {/* HERO WITH BACKGROUND IMAGE */}
            <section className="relative text-white pt-12 pb-8 overflow-hidden">
                <Image src="/images/hero-homepage.png" alt={`Benne encombrants à ${city.name}`} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/85 to-blue-950/95"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs items={[
                        { label: "Benne Encombrants", href: "/location-benne-encombrants" },
                        { label: `${city.department_name} (${city.department_code})`, href: `/departements/${city.department_name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${city.department_code}` },
                        { label: city.name },
                    ]} />
                    <div className="text-center mt-4">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-sm font-medium mb-6">
                            <Package className="h-4 w-4" /> Encombrants — {city.zip}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6">Benne Encombrants à <span className="text-blue-400">{city.name}</span></h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">Évacuez vos meubles, matelas et objets volumineux à {city.name} ({city.zip}). Bennes 3m³ à 30m³, livraison 24h dans le {city.department_name}.</p>
                        <div className="mt-8 flex justify-center">
                            <Link href="/devis"><Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl">Devis encombrants à {city.name} <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            <section className="bg-blue-900 py-4 border-b border-blue-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-blue-100 text-xs font-semibold text-center">
                        <div className="flex flex-col items-center gap-1"><Euro className="h-4 w-4 text-blue-300" /> Devis gratuit</div>
                        <div className="flex flex-col items-center gap-1"><Clock className="h-4 w-4 text-blue-300" /> Livraison 24-48h</div>
                        <div className="flex flex-col items-center gap-1"><Recycle className="h-4 w-4 text-blue-300" /> Tri et recyclage</div>
                        <div className="flex flex-col items-center gap-1"><Shield className="h-4 w-4 text-blue-300" /> Sans engagement</div>
                    </div>
                </div>
            </section>

            {/* INTRO + CITY INFO */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{content.introTitle}</h2>
                            <div className="prose prose-lg prose-slate max-w-none">
                                <p>{content.introParagraph}</p>
                                {content.regionContext && <p>{content.regionContext}</p>}
                            </div>
                        </div>
                        <CityInfoBar cityName={city.name} zip={city.zip} departmentName={city.department_name} departmentCode={city.department_code} population={city.population} />
                    </div>
                </div>
            </section>

            {/* PRIX */}
            <section className="py-16 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4 text-center">Prix benne encombrants à {city.name} — 2026</h2>
                    <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto text-sm">{content.pricingContext}</p>
                    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                        {prices.map((p) => (
                            <div key={p.vol} className="bg-white border-2 border-slate-100 rounded-2xl p-6 text-center hover:border-blue-400 hover:shadow-lg transition-all">
                                <div className="text-lg font-bold text-slate-900">{p.vol}</div>
                                <div className="text-3xl font-black text-blue-600 my-2">{p.prix}€</div>
                                <div className="text-xs text-slate-400">TTC</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ACCEPTÉS */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Encombrants acceptés en benne</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {["Meubles (armoires, canapés, tables)", "Électroménagers (lave-linge, four)", "Matelas et sommiers", "Objets volumineux divers", "Cartons et emballages en grande quantité", "Textile et literie"].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                <span className="text-slate-700 font-medium text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CARTE + INFOS LIVRAISON */}
            <section className="py-16 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-blue-500" /> Zone de livraison — {city.name} ({city.zip})
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <CityMap cityName={city.name} zip={city.zip} departmentName={city.department_name} />
                        <div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
                                <h3 className="font-bold text-slate-900 mb-3">📍 Informations de livraison</h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">→</span> Livraison sur tout le territoire de {city.name}</li>
                                    <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">→</span> Délai : 24 à 48h après validation du devis</li>
                                    <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">→</span> Encombrants légers → possibilité de grandes bennes (20-30m³)</li>
                                    <li className="flex items-start gap-2"><span className="text-blue-500 font-bold">→</span> Accès camion ampliroll nécessaire (largeur min. 3m)</li>
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

            {/* CONTEXTE DÉPARTEMENT */}
            {content.departmentContext && (
                <section className="py-12 bg-blue-50 border-y border-blue-100">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Info className="h-6 w-6 text-blue-500" /> Encombrants dans le {city.department_name}</h2>
                        <p className="text-slate-700 leading-relaxed">{content.departmentContext}</p>
                    </div>
                </section>
            )}

            {/* CAS D'USAGE + CONSEILS */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">📦 Situations fréquentes</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">{content.casUsage}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">💡 Conseils pratiques</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">{content.conseilPratique}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CLIMAT */}
            <section className="py-12 bg-amber-50 border-y border-amber-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-start gap-4">
                        <Lightbulb className="h-8 w-8 text-amber-500 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Conseil saisonnier — {city.name}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{content.climateAdvice}</p>
                            <p className="text-xs text-amber-600 mt-3 font-medium">📅 Haute saison : {content.saisonHaute}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FACTS */}
            {content.facts.length > 0 && (
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">💡 Le saviez-vous ?</h2>
                        <div className="space-y-4">
                            {content.facts.map((fact, i) => (
                                <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                                    <p className="text-slate-700 text-sm leading-relaxed">{fact}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            <section className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-8">FAQ — Benne encombrants {city.name}</h2>
                    <Accordion type="single" collapsible className="bg-white border border-slate-200 rounded-2xl p-6">
                        {content.faqItems.map((faq, i) => (
                            <AccordionItem key={i} value={String(i)}><AccordionTrigger className="text-lg font-bold text-left">{faq.question}</AccordionTrigger><AccordionContent className="text-slate-600">{faq.answer}</AccordionContent></AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* GUIDES */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><BookOpen className="h-5 w-5 text-amber-500" /> Guides utiles</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link href="/guides/comment-choisir-taille-benne" className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md hover:border-blue-200 transition-all group">
                            <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Choisir la taille de sa benne</h3>
                            <p className="text-xs text-slate-500 mt-1">3m³ à 30m³ — guide complet</p>
                        </Link>
                        <Link href="/guides/prix-location-benne-guide-complet" className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md hover:border-blue-200 transition-all group">
                            <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Guide des prix 2026</h3>
                            <p className="text-xs text-slate-500 mt-1">Grille tarifaire complète</p>
                        </Link>
                        <Link href="/guides/autorisation-voirie-benne-guide" className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:shadow-md hover:border-blue-200 transition-all group">
                            <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Autorisation de voirie</h3>
                            <p className="text-xs text-slate-500 mt-1">Démarches mairie</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* VILLES PROCHES */}
            {nearbyCities.length > 0 && (
                <section className="py-16 bg-slate-50 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-2"><MapPin className="h-6 w-6 text-blue-500" /> Benne encombrants près de {city.name}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {nearbyCities.map((c) => (
                                <Link key={c.slug} href={`/location-benne-encombrants/${c.slug}`} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group">
                                    <span className="font-medium text-slate-700 group-hover:text-blue-700 text-sm">{c.name}</span>
                                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">{c.zip}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <WasteTypeCrossLinks cityName={city.name} citySlug={city.slug} currentCategory="encombrants" />

            <section className="py-16 bg-blue-50 text-center border-t border-blue-100">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Débarrassez-vous de vos encombrants à {city.name}</h2>
                    <Link href="/devis"><Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold text-xl px-12 py-7 rounded-full shadow-xl">Devis Gratuit</Button></Link>
                </div>
            </section>
        </div>
    );
}
