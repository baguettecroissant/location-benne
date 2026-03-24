export const dynamic = 'force-static';

export async function GET() {
    const baseUrl = 'https://www.prix-location-benne.fr';

    const staticPages = [
        { path: '', priority: '1.0', changefreq: 'weekly' },
        { path: '/devis', priority: '0.9', changefreq: 'monthly' },
        { path: '/tarifs', priority: '0.9', changefreq: 'weekly' },
        { path: '/departements', priority: '0.8', changefreq: 'weekly' },
        { path: '/guides', priority: '0.8', changefreq: 'weekly' },
        { path: '/a-propos', priority: '0.6', changefreq: 'monthly' },
        { path: '/location-benne-gravats', priority: '0.8', changefreq: 'weekly' },
        { path: '/location-benne-encombrants', priority: '0.8', changefreq: 'weekly' },
        { path: '/location-benne-dechets-verts', priority: '0.8', changefreq: 'weekly' },
        { path: '/location-benne-dib', priority: '0.8', changefreq: 'weekly' },
        { path: '/mentions-legales', priority: '0.3', changefreq: 'yearly' },
    ];

    // Add individual guide pages
    const guidePages = [
        '/guides/comment-choisir-taille-benne',
        '/guides/prix-location-benne-guide-complet',
        '/guides/autorisation-voirie-benne-guide',
        '/guides/evacuation-gravats-chantier-guide',
        '/guides/tri-dechets-chantier-guide',
        '/guides/benne-dechets-verts-guide-complet',
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages.map(page => `
    <url>
        <loc>${baseUrl}${page.path}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('')}
    ${guidePages.map(path => `
    <url>
        <loc>${baseUrl}${path}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}
