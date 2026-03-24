import { City } from "@/types";
import citiesData from "@/lib/db/cities.json";
import departmentsData from "@/lib/db/departments-infos.json";

const cities = citiesData as City[];

export function getCityFromSlug(slug: string): City | undefined {
    const city = cities.find(c => c.slug === slug);
    if (!city) return undefined;

    const deptInfo = departmentsData.find(d => d.code === city.department_code);
    return {
        ...city,
        department_info: deptInfo
    };
}

export function getAllCitySlugs(): string[] {
    return cities.map(c => c.slug);
}

export function generateCityMetadata(city: City) {
    return {
        title: `Location de Benne à ${city.name} (${city.zip}) — Prix & Devis 2026`,
        description: `Location de benne à ${city.name} dès 149€. Comparez les prix des loueurs dans le ${city.department_name} (${city.department_code}). Devis gratuit, livraison 24h. Gravats, encombrants, déchets verts.`,
        alternates: {
            canonical: `https://www.prix-location-benne.fr/location-benne/${city.slug}`,
        },
    };
}

export function getAllDepartmentCodes(): string[] {
    return departmentsData.map(d => d.code);
}

export function getCitiesByDepartment(departmentCode: string): City[] {
    return cities.filter(c => c.department_code === departmentCode);
}
