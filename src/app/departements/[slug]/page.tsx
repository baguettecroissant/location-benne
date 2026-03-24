import { notFound } from "next/navigation";
import { getAllDepartments, getCitiesByDepartment, getDepartmentByCode, getDepartmentsByRegion } from "@/lib/cities";
import Link from "next/link";
import { Metadata } from "next";
import { DepartmentCities } from "@/components/pseo/DepartmentCities";
import { MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const depts = getAllDepartments();
    return depts.map(d => ({
        slug: `${d.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${d.code}`
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const parts = slug.split('-');
    const code = parts[parts.length - 1];
    const dept = getDepartmentByCode(code);
    if (!dept) return {};
    return {
        title: `Location de Benne ${dept.name} (${dept.code}) — Prix & Devis 2026`,
        description: `Louez une benne dans le ${dept.name} (${dept.code}). Comparez les prix des loueurs certifiés. Gravats, encombrants, déchets verts. Devis gratuit.`,
        alternates: { canonical: `https://www.prix-location-benne.fr/departements/${slug}` },
    };
}

export default async function DepartmentPage({ params }: Props) {
    const { slug } = await params;
    const parts = slug.split('-');
    const code = parts[parts.length - 1];

    const dept = getDepartmentByCode(code);
    if (!dept) notFound();

    const cities = getCitiesByDepartment(code);
    cities.sort((a, b) => a.name.localeCompare(b.name));

    const neighborDepts = getDepartmentsByRegion(dept.region).filter(d => d.code !== dept.code);

    return (
        <div className="min-h-screen bg-white">
            <section className="bg-slate-900 text-white relative pb-32 pt-12">
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs items={[
                        { label: "Départements", href: "/departements" },
                        { label: `${dept.name} (${dept.code})` },
                    ]} />
                    <div className="text-center mt-4">
                        <div className="inline-block bg-white/10 text-amber-300 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-white/10">
                            Département {dept.code}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Location de Benne <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">{dept.name}</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Trouvez un loueur de benne certifié dans le {dept.name}, région {dept.region}. Devis gratuit, livraison 24-48h.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-20 bg-slate-50 min-h-[500px]">
                <div className="container mx-auto px-4">
                    <DepartmentCities
                        departmentName={dept.name}
                        departmentCode={dept.code}
                        cities={cities}
                    />

                    {neighborDepts.length > 0 && (
                        <div className="mt-16 pt-16 border-t border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                <MapPin className="h-6 w-6 text-amber-500" />
                                Autres départements en {dept.region}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {neighborDepts.map((d) => (
                                    <Link
                                        key={d.code}
                                        href={`/departements/${d.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${d.code}`}
                                        className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-500 hover:shadow-md transition-all group"
                                    >
                                        <span className="font-medium text-slate-700 group-hover:text-amber-700">{d.name}</span>
                                        <span className="text-sm text-slate-400 bg-slate-50 px-2 py-1 rounded group-hover:bg-amber-50 group-hover:text-amber-600">{d.code}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
