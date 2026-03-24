import citiesData from "@/lib/db/cities.json";
import { NextRequest, NextResponse } from "next/server";

interface CityEntry {
    name: string;
    slug: string;
    zip: string;
    department_name: string;
    department_code: string;
    coordinates: { lat: number; lng: number };
}

const cities = citiesData as CityEntry[];

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q")?.toLowerCase().trim();

    if (!query || query.length < 2) {
        return NextResponse.json([]);
    }

    const results: CityEntry[] = [];
    const limit = 8;

    // Search by zip code first (exact prefix match — faster)
    if (/^\d+$/.test(query)) {
        for (const city of cities) {
            if (results.length >= limit) break;
            if (city.zip.startsWith(query)) {
                results.push(city);
            }
        }
    } else {
        // Search by city name (prefix match, case insensitive)
        const normalizedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        for (const city of cities) {
            if (results.length >= limit) break;
            const normalizedName = city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (normalizedName.startsWith(normalizedQuery)) {
                results.push(city);
            }
        }
        // If not enough prefix matches, try includes
        if (results.length < limit) {
            for (const city of cities) {
                if (results.length >= limit) break;
                const normalizedName = city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (normalizedName.includes(normalizedQuery) && !results.find(r => r.slug === city.slug)) {
                    results.push(city);
                }
            }
        }
    }

    return NextResponse.json(
        results.map(c => ({
            name: c.name,
            slug: c.slug,
            zip: c.zip,
            department_name: c.department_name,
            department_code: c.department_code,
            lat: c.coordinates.lat,
            lng: c.coordinates.lng,
        }))
    );
}
