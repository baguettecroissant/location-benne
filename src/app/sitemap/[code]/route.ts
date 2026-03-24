import { getCitiesByDepartment, getAllDepartmentCodes } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;
    const rawCode = code.replace('.xml', '');
    const baseUrl = 'https://www.prix-location-benne.fr';

    const cities = getCitiesByDepartment(rawCode);

    if (cities.length === 0) {
        return new Response('Not found', { status: 404 });
    }

    const categories = ['location-benne', 'location-benne-gravats', 'location-benne-encombrants', 'location-benne-dechets-verts', 'location-benne-dib'];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${cities.flatMap(city => categories.map(cat => `
    <url>
        <loc>${baseUrl}/${cat}/${city.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>${cat === 'location-benne' ? '0.6' : '0.5'}</priority>
    </url>`)).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}

export async function generateStaticParams() {
    const codes = getAllDepartmentCodes();
    return codes.map(code => ({ code: `${code}.xml` }));
}
