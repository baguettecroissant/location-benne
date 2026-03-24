import Link from "next/link";
import { MapPin } from "lucide-react";

const popularCities = [
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
    { name: "Toulon", slug: "toulon-83000" },
    { name: "Dijon", slug: "dijon-21000" },
    { name: "Angers", slug: "angers-49000" },
    { name: "Rouen", slug: "rouen-76000" },
];

interface PopularCitiesGridProps {
    categoryPath: string;
    categoryLabel: string;
    accentColor?: string;
}

export function PopularCitiesGrid({ categoryPath, categoryLabel, accentColor = "amber" }: PopularCitiesGridProps) {
    const colorMap: Record<string, string> = {
        amber: "hover:border-amber-500 hover:text-amber-700",
        orange: "hover:border-orange-500 hover:text-orange-700",
        blue: "hover:border-blue-500 hover:text-blue-700",
        green: "hover:border-green-500 hover:text-green-700",
        purple: "hover:border-purple-500 hover:text-purple-700",
    };
    const hoverClasses = colorMap[accentColor] || colorMap.amber;

    return (
        <section className="py-16 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-3 text-center flex items-center justify-center gap-2">
                    <MapPin className="h-6 w-6 text-amber-500" /> {categoryLabel} par ville
                </h2>
                <p className="text-center text-slate-500 mb-8 text-sm">Sélectionnez votre ville pour voir les tarifs locaux</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {popularCities.map((city) => (
                        <Link
                            key={city.slug}
                            href={`/${categoryPath}/${city.slug}`}
                            className={`p-4 bg-white border border-slate-200 rounded-xl ${hoverClasses} hover:shadow-md transition-all group text-center`}
                        >
                            <span className="font-medium text-slate-700 group-hover:font-bold text-sm">{city.name}</span>
                        </Link>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <Link href="/departements" className="text-amber-600 font-semibold hover:text-amber-700">
                        Voir tous les départements →
                    </Link>
                </div>
            </div>
        </section>
    );
}
