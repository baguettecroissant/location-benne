import Link from "next/link";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-amber-500 text-white p-1.5 rounded-lg">
                                <Truck className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                Prix-Location-Benne<span className="text-amber-500">.fr</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Comparez les prix de location de bennes dans votre ville. Devis gratuit, livraison 24h, loueurs certifiés partout en France.
                        </p>
                    </div>

                    {/* Types de Bennes */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Types de Bennes</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="/location-benne-gravats" className="hover:text-amber-400 transition-colors">🪨 Benne Gravats</Link></li>
                            <li><Link href="/location-benne-encombrants" className="hover:text-amber-400 transition-colors">📦 Benne Encombrants</Link></li>
                            <li><Link href="/location-benne-dechets-verts" className="hover:text-amber-400 transition-colors">🌿 Benne Déchets Verts</Link></li>
                            <li><Link href="/location-benne-dib" className="hover:text-amber-400 transition-colors">🏭 Benne DIB</Link></li>
                        </ul>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigation</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="/" className="hover:text-amber-400 transition-colors">Accueil</Link></li>
                            <li><Link href="/tarifs" className="hover:text-amber-400 transition-colors">Tarifs 2026</Link></li>
                            <li><Link href="/departements" className="hover:text-amber-400 transition-colors">Départements</Link></li>
                            <li><Link href="/guides" className="hover:text-amber-400 transition-colors">Guides & Conseils</Link></li>
                            <li><Link href="/a-propos" className="hover:text-amber-400 transition-colors">À Propos</Link></li>
                            <li><Link href="/devis" className="hover:text-amber-400 transition-colors">Devis Gratuit</Link></li>
                            <li><Link href="/mentions-legales" className="hover:text-amber-400 transition-colors">Mentions Légales</Link></li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Besoin d&apos;une benne ?</h3>
                        <p className="text-sm mb-4 text-slate-500">Obtenez votre devis gratuit en 2 minutes. Comparez les prix des loueurs de votre ville.</p>
                        <Link href="/devis">
                            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full">Devis Gratuit</Button>
                        </Link>
                    </div>
                </div>

                {/* Popular cities for extra maillage */}
                <div className="border-t border-slate-800 pt-8 mb-8">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Villes populaires</h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {[
                            { name: "Paris", slug: "paris-75001" },
                            { name: "Lyon", slug: "lyon-69001" },
                            { name: "Marseille", slug: "marseille-13001" },
                            { name: "Toulouse", slug: "toulouse-31000" },
                            { name: "Nice", slug: "nice-06000" },
                            { name: "Nantes", slug: "nantes-44000" },
                            { name: "Bordeaux", slug: "bordeaux-33000" },
                            { name: "Lille", slug: "lille-59000" },
                            { name: "Strasbourg", slug: "strasbourg-67000" },
                            { name: "Montpellier", slug: "montpellier-34000" },
                            { name: "Rennes", slug: "rennes-35000" },
                            { name: "Grenoble", slug: "grenoble-38000" },
                        ].map((city) => (
                            <Link key={city.slug} href={`/location-benne/${city.slug}`} className="px-3 py-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-900 rounded-full transition-colors">
                                {city.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
                    <span>© {new Date().getFullYear()} Prix-Location-Benne.fr - Tous droits réservés.</span>
                    <Link href="/pro" className="text-slate-600 hover:text-amber-400 transition-colors text-xs">
                        Espace Professionnel →
                    </Link>
                </div>
            </div>
        </footer>
    );
}
