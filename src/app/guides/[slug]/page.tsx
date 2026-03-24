import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { guides, getGuideBySlug, getRelatedGuides, guidesCategories } from "@/lib/guides-data";
import { guideContents } from "@/lib/guides-content";
import { Clock, ArrowLeft, ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
    return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const guide = getGuideBySlug(slug);
    if (!guide) return { title: "Guide introuvable" };
    return {
        title: guide.metaTitle,
        description: guide.metaDescription,
        alternates: { canonical: `https://www.prix-location-benne.fr/guides/${guide.slug}` },
        openGraph: {
            title: guide.metaTitle,
            description: guide.metaDescription,
            images: [{ url: `https://www.prix-location-benne.fr${guide.image}`, width: 1200, height: 630 }],
        },
    };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const guide = getGuideBySlug(slug);
    if (!guide) notFound();

    const content = guideContents[slug];
    const related = getRelatedGuides(slug, 3);
    const cat = guidesCategories[guide.category];

    return (
        <div className="min-h-screen bg-white">
            {/* Schema Article */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org", "@type": "Article",
                "headline": guide.title,
                "description": guide.metaDescription,
                "image": `https://www.prix-location-benne.fr${guide.image}`,
                "datePublished": guide.publishDate,
                "dateModified": guide.updatedDate,
                "publisher": { "@type": "Organization", "name": "Prix-Location-Benne.fr" },
                "mainEntityOfPage": `https://www.prix-location-benne.fr/guides/${guide.slug}`,
            }) }} />

            {/* Breadcrumbs */}
            <div className="bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl py-3">
                    <nav className="flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-amber-600">Accueil</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href="/guides" className="hover:text-amber-600">Guides</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-slate-800 font-medium truncate">{guide.title}</span>
                    </nav>
                </div>
            </div>

            {/* Article Header */}
            <header className="py-10 border-b border-slate-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`${cat.color} px-3 py-1 rounded-full text-xs font-semibold`}>{cat.icon} {cat.label}</span>
                        <span className="text-sm text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {guide.readTime} min de lecture</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">{guide.title}</h1>
                    <p className="text-lg text-slate-500">{guide.excerpt}</p>
                    <div className="flex items-center gap-4 mt-6 text-xs text-slate-400">
                        <span>Publié le {new Date(guide.publishDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>Mis à jour le {new Date(guide.updatedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>
            </header>

            {/* Hero Image */}
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={guide.image} alt={guide.imageAlt} fill className="object-cover" priority />
                </div>
            </div>

            {/* Article Body */}
            <article className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-extrabold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-a:text-amber-600 prose-a:font-semibold hover:prose-a:text-amber-500 prose-img:rounded-xl prose-table:text-sm">
                        {content}
                    </div>
                </div>
            </article>

            {/* CTA Devis */}
            <section className="py-10 bg-amber-50 border-y border-amber-100">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Prêt à passer à l&apos;action ?</h2>
                    <p className="text-slate-600 mb-6">Obtenez votre devis personnalisé en 2 minutes. Livraison sous 24h, partout en France.</p>
                    <Link href="/devis"><Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 font-bold text-lg px-10 py-6 rounded-xl shadow-lg">Devis Gratuit <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                </div>
            </section>

            {/* Related Articles */}
            {related.length > 0 && (
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Articles similaires</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {related.map((r) => (
                                <Link key={r.slug} href={`/guides/${r.slug}`} className="group">
                                    <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-lg hover:border-amber-200 transition-all">
                                        <div className="relative w-full h-36">
                                            <Image src={r.image} alt={r.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-5 flex flex-col flex-1">
                                            <span className={`${guidesCategories[r.category].color} px-2.5 py-1 rounded-full text-xs font-semibold w-fit mb-3`}>{guidesCategories[r.category].icon} {guidesCategories[r.category].label}</span>
                                            <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors leading-snug">{r.title}</h3>
                                            <p className="text-sm text-slate-500 flex-1 line-clamp-2">{r.excerpt}</p>
                                            <span className="text-xs text-amber-600 font-semibold mt-3 flex items-center gap-1">Lire <ArrowRight className="h-3 w-3" /></span>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Back to guides */}
            <div className="container mx-auto px-4 max-w-4xl pb-12">
                <Link href="/guides" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 font-medium transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Retour aux guides
                </Link>
            </div>
        </div>
    );
}
