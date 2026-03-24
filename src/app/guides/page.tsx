import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { guides, guidesCategories } from "@/lib/guides-data";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "Guides & Conseils Location de Benne — Blog Expert 2026",
    description: "Guides pratiques, réglementation, prix et conseils d'experts pour la location de benne. Apprenez à choisir la bonne benne, éviter les pièges et économiser sur vos projets.",
    alternates: { canonical: 'https://www.prix-location-benne.fr/guides' },
};

export default function GuidesPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-slate-900 text-white py-16">
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-4 py-2 rounded-lg text-sm font-semibold mb-6">
                        <BookOpen className="h-4 w-4" /> Blog & Guides Experts
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Guides <span className="text-amber-400">Location de Benne</span></h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Conseils d&apos;experts, réglementation, prix détaillés et astuces pour gérer vos déchets de chantier comme un pro. Tout ce que vous devez savoir avant de commander.
                    </p>
                </div>
            </section>

            {/* Category Pills */}
            <section className="border-b border-slate-100 bg-slate-50">
                <div className="container mx-auto px-4 max-w-5xl py-4 flex flex-wrap gap-2 justify-center">
                    {Object.entries(guidesCategories).map(([key, cat]) => (
                        <span key={key} className={`${cat.color} px-3 py-1.5 rounded-full text-xs font-semibold`}>
                            {cat.icon} {cat.label}
                        </span>
                    ))}
                </div>
            </section>

            {/* Featured Article */}
            {guides[0] && (
                <section className="py-12 border-b border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <Link href={`/guides/${guides[0].slug}`} className="block group">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="relative w-full h-64 md:h-80">
                                    <Image src={guides[0].image} alt={guides[0].imageAlt} fill className="object-cover" priority />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>
                                <div className="p-8 md:p-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`${guidesCategories[guides[0].category].color} px-3 py-1 rounded-full text-xs font-semibold`}>
                                            {guidesCategories[guides[0].category].icon} {guidesCategories[guides[0].category].label}
                                        </span>
                                        <span className="text-sm text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {guides[0].readTime} min</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">{guides[0].title}</h2>
                                    <p className="text-slate-600 text-lg mb-6 max-w-3xl">{guides[0].excerpt}</p>
                                    <span className="inline-flex items-center gap-2 text-amber-600 font-bold group-hover:gap-3 transition-all">
                                        Lire le guide complet <ArrowRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Articles Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Tous nos guides</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guides.slice(1).map((guide) => (
                            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                                <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                                    <div className="relative w-full h-44">
                                        <Image src={guide.image} alt={guide.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`${guidesCategories[guide.category].color} px-2.5 py-1 rounded-full text-xs font-semibold`}>
                                                {guidesCategories[guide.category].icon} {guidesCategories[guide.category].label}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors leading-snug">{guide.title}</h3>
                                        <p className="text-sm text-slate-500 mb-4 flex-1">{guide.excerpt}</p>
                                        <div className="flex items-center justify-between text-xs text-slate-400">
                                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {guide.readTime} min de lecture</span>
                                            <span className="text-amber-600 font-semibold group-hover:underline flex items-center gap-1">Lire <ArrowRight className="h-3 w-3" /></span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Newsletter / Devis */}
            <section className="py-12 bg-amber-50 border-t border-amber-100">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Besoin d&apos;une benne maintenant ?</h2>
                    <p className="text-slate-600 mb-6">Nos guides vous ont convaincu ? Obtenez votre devis personnalisé en 2 minutes.</p>
                    <Link href="/devis" className="inline-flex items-center gap-2 bg-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-600 transition-colors shadow-lg">
                        Devis Gratuit <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
