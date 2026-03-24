"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Loader2, Search } from "lucide-react";

interface CityResult {
    name: string;
    slug: string;
    zip: string;
    department_name: string;
    department_code: string;
    lat: number;
    lng: number;
}

interface CityAutocompleteProps {
    onSelect: (city: CityResult) => void;
    defaultValue?: string;
}

export function CityAutocomplete({ onSelect, defaultValue }: CityAutocompleteProps) {
    const [query, setQuery] = useState(defaultValue || "");
    const [results, setResults] = useState<CityResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGeolocating, setIsGeolocating] = useState(false);
    const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>();

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const searchCities = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/cities/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            setResults(data);
            setIsOpen(data.length > 0);
        } catch {
            setResults([]);
        }
        setIsLoading(false);
    }, []);

    function handleInputChange(value: string) {
        setQuery(value);
        setSelectedCity(null);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => searchCities(value), 200);
    }

    function handleSelectCity(city: CityResult) {
        setQuery(`${city.name} (${city.zip})`);
        setSelectedCity(city);
        setIsOpen(false);
        onSelect(city);
    }

    async function handleGeolocate() {
        if (!navigator.geolocation) {
            alert("La géolocalisation n'est pas supportée par votre navigateur.");
            return;
        }

        setIsGeolocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const res = await fetch(`/api/cities/geolocate?lat=${position.coords.latitude}&lng=${position.coords.longitude}`);
                    const city = await res.json();
                    if (city.name) {
                        const cityResult: CityResult = {
                            name: city.name,
                            slug: city.slug,
                            zip: city.zip,
                            department_name: city.department_name,
                            department_code: "",
                            lat: city.lat,
                            lng: city.lng,
                        };
                        setQuery(`${city.name} (${city.zip})`);
                        setSelectedCity(cityResult);
                        onSelect(cityResult);
                    }
                } catch {
                    alert("Impossible de déterminer votre ville.");
                }
                setIsGeolocating(false);
            },
            () => {
                alert("Géolocalisation refusée. Veuillez saisir votre ville manuellement.");
                setIsGeolocating(false);
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
        );
    }

    return (
        <div ref={wrapperRef} className="relative">
            <div className="relative flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                        placeholder="Ville ou code postal..."
                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-lg"
                        autoComplete="off"
                    />
                    {isLoading && (
                        <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 animate-spin" />
                    )}
                </div>
                <button
                    type="button"
                    onClick={handleGeolocate}
                    disabled={isGeolocating}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all flex items-center gap-2 text-sm font-semibold text-slate-600 shrink-0 disabled:opacity-50"
                    title="Utiliser ma position"
                >
                    {isGeolocating ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <MapPin className="h-5 w-5 text-amber-500" />
                    )}
                    <span className="hidden sm:inline">{isGeolocating ? "Détection..." : "Ma position"}</span>
                </button>
            </div>

            {/* Hidden inputs for form submission */}
            <input type="hidden" name="ville" value={selectedCity?.name || query} />
            <input type="hidden" name="code_postal" value={selectedCity?.zip || ""} />
            <input type="hidden" name="departement" value={selectedCity?.department_name || ""} />

            {/* Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-80 overflow-y-auto">
                    {results.map((city) => (
                        <button
                            key={city.slug}
                            type="button"
                            onClick={() => handleSelectCity(city)}
                            className="w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-b-0"
                        >
                            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                            <div>
                                <span className="font-semibold text-slate-900">{city.name}</span>
                                <span className="text-slate-500 ml-2 text-sm">{city.zip}</span>
                                <span className="text-slate-400 ml-2 text-xs">{city.department_name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Selected indicator */}
            {selectedCity && (
                <div className="mt-2 inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm px-3 py-1 rounded-lg border border-green-200">
                    <MapPin className="h-3 w-3" /> {selectedCity.name} ({selectedCity.zip}) — {selectedCity.department_name}
                </div>
            )}
        </div>
    );
}
