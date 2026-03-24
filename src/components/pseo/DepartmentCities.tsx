"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { City } from "@/types";

interface DepartmentCitiesProps {
    departmentName: string;
    departmentCode: string;
    cities: City[];
}

export function DepartmentCities({ departmentName, departmentCode, cities }: DepartmentCitiesProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [showAll, setShowAll] = useState(false);

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.zip.includes(searchTerm)
    );

    const displayedCities = showAll ? filteredCities : filteredCities.slice(0, 50);

    return (
        <div className="-mt-20 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder={`Rechercher une ville dans le ${departmentName}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-lg"
                        />
                    </div>
                    <p className="text-center text-sm text-slate-400 mt-2">
                        {filteredCities.length} commune{filteredCities.length > 1 ? 's' : ''} dans le {departmentName} ({departmentCode})
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {displayedCities.map((city) => (
                        <Link
                            key={city.slug}
                            href={`/location-benne/${city.slug}`}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all group text-sm"
                        >
                            <span className="text-slate-700 font-medium group-hover:text-amber-700 truncate">{city.name}</span>
                            <span className="text-xs text-slate-400 ml-1 shrink-0">{city.zip}</span>
                        </Link>
                    ))}
                </div>

                {!showAll && filteredCities.length > 50 && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-6 py-3 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-700 rounded-xl font-medium transition-all"
                        >
                            Voir les {filteredCities.length - 50} autres communes
                        </button>
                    </div>
                )}

                {filteredCities.length === 0 && (
                    <p className="text-center text-slate-400 py-8">Aucune commune trouvée pour &quot;{searchTerm}&quot;</p>
                )}
            </div>
        </div>
    );
}
