import citiesData from "@/lib/db/cities.json";
import { NextRequest, NextResponse } from "next/server";

interface CityEntry {
    name: string;
    slug: string;
    zip: string;
    department_name: string;
    coordinates: { lat: number; lng: number };
}

const cities = citiesData as CityEntry[];

function getDistanceFromLatLon(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export async function GET(request: NextRequest) {
    const lat = parseFloat(request.nextUrl.searchParams.get("lat") || "");
    const lng = parseFloat(request.nextUrl.searchParams.get("lng") || "");

    if (isNaN(lat) || isNaN(lng)) {
        return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
    }

    // Find nearest city by coordinates
    let nearest = cities[0];
    let minDist = Infinity;

    for (const city of cities) {
        const dist = getDistanceFromLatLon(lat, lng, city.coordinates.lat, city.coordinates.lng);
        if (dist < minDist) {
            minDist = dist;
            nearest = city;
        }
    }

    return NextResponse.json({
        name: nearest.name,
        slug: nearest.slug,
        zip: nearest.zip,
        department_name: nearest.department_name,
        lat: nearest.coordinates.lat,
        lng: nearest.coordinates.lng,
    });
}
