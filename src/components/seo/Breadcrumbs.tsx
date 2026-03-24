import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    const allItems = [{ label: "Accueil", href: "/" }, ...items];

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": allItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            ...(item.href ? { "item": `https://www.prix-location-benne.fr${item.href}` } : {}),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <nav aria-label="Fil d'Ariane" className="text-sm mb-4">
                <ol className="flex flex-wrap items-center gap-1.5">
                    {allItems.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                            {i > 0 && <span className="text-slate-400">/</span>}
                            {item.href ? (
                                <Link href={item.href} className="text-slate-400 hover:text-amber-400 transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-slate-200 font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
