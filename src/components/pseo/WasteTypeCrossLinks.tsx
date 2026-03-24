import Link from "next/link";

interface WasteTypeCrossLinksProps {
    cityName: string;
    citySlug: string;
    currentCategory: "gravats" | "encombrants" | "dechets-verts" | "dib";
}

const allCategories = [
    { key: "gravats" as const, href: "location-benne-gravats", label: "Gravats", icon: "🪨", color: "border-orange-200 hover:border-orange-400 hover:bg-orange-50" },
    { key: "encombrants" as const, href: "location-benne-encombrants", label: "Encombrants", icon: "📦", color: "border-blue-200 hover:border-blue-400 hover:bg-blue-50" },
    { key: "dechets-verts" as const, href: "location-benne-dechets-verts", label: "Déchets Verts", icon: "🌿", color: "border-green-200 hover:border-green-400 hover:bg-green-50" },
    { key: "dib" as const, href: "location-benne-dib", label: "DIB", icon: "🏭", color: "border-purple-200 hover:border-purple-400 hover:bg-purple-50" },
];

export function WasteTypeCrossLinks({ cityName, citySlug, currentCategory }: WasteTypeCrossLinksProps) {
    const otherCategories = allCategories.filter(c => c.key !== currentCategory);

    return (
        <section className="py-12 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Autres types de bennes à {cityName}</h2>
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {otherCategories.map((cat) => (
                        <Link
                            key={cat.key}
                            href={`/${cat.href}/${citySlug}`}
                            className={`flex flex-col items-center p-5 border-2 ${cat.color} rounded-2xl transition-all text-center`}
                        >
                            <span className="text-2xl mb-2">{cat.icon}</span>
                            <span className="font-bold text-slate-900 text-sm">{cat.label}</span>
                        </Link>
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <Link href={`/location-benne/${citySlug}`} className="text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors">
                        ← Voir tous les tarifs bennes à {cityName}
                    </Link>
                </div>
            </div>
        </section>
    );
}
