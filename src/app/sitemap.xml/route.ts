import { getAllDepartmentCodes } from '@/lib/seo-utils';

export const dynamic = 'force-static';

export async function GET() {
    const baseUrl = 'https://www.prix-location-benne.fr';
    const departmentCodes = getAllDepartmentCodes();

    const sitemaps = [
        `${baseUrl}/sitemap/main.xml`,
        ...departmentCodes.map(code => `${baseUrl}/sitemap/${code}.xml`)
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps.map(url => `
    <sitemap>
        <loc>${url}</loc>
    </sitemap>`).join('')}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
