// Dynamic sitemap: /sitemap.xml (rewritten here by middleware.ts for ALL
// visitors, not just bots). Static pages are hardcoded; blog post URLs are
// fetched live from Firestore, so the sitemap never goes stale as new posts
// publish daily. Replaces the hand-maintained public/sitemap.xml.

import { fetchPublishedPosts } from './_blog-html.js';

const SITE = 'https://aisofttechsolution.com';

const STATIC_PAGES: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [
  { loc: '/', lastmod: '2026-10-14', changefreq: 'weekly', priority: '1.0' },
  { loc: '/profitscout', lastmod: '2026-06-17', changefreq: 'monthly', priority: '0.9' },
  { loc: '/soft-clipper', lastmod: '2026-07-15', changefreq: 'monthly', priority: '0.9' },
  { loc: '/blog', lastmod: '2026-10-14', changefreq: 'daily', priority: '0.8' },
  { loc: '/demos', lastmod: '2026-10-14', changefreq: 'weekly', priority: '0.8' },
  { loc: '/blueprint-library', lastmod: '2026-10-14', changefreq: 'weekly', priority: '0.7' },
  { loc: '/compare/agency-vs-freelancer', lastmod: '2026-10-14', changefreq: 'monthly', priority: '0.6' },
  { loc: '/guides', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.7' },
  { loc: '/guides/tikfulfill-build-guide', lastmod: '2026-10-14', changefreq: 'monthly', priority: '0.6' },
  { loc: '/guides/build-your-own-ai-seller-copilot', lastmod: '2026-10-18', changefreq: 'monthly', priority: '0.6' },
  { loc: '/submit-testimonial', lastmod: '2026-10-14', changefreq: 'yearly', priority: '0.4' },
  { loc: '/profitscout-privacy', lastmod: '2026-06-17', changefreq: 'yearly', priority: '0.3' },
  { loc: '/privacy', lastmod: '2026-07-27', changefreq: 'yearly', priority: '0.4' },
  { loc: '/terms', lastmod: '2026-07-27', changefreq: 'yearly', priority: '0.4' },
];

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default async function handler(_req: any, res: any) {
  try {
    const posts = await fetchPublishedPosts();
    const today = new Date().toISOString().split('T')[0];
    const urls = STATIC_PAGES.map(
      (p) =>
        `  <url>\n    <loc>${SITE}${p.loc}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
    );
    for (const post of posts) {
      const lastmod = post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : today;
      urls.push(
        `  <url>\n    <loc>${SITE}/blog/${esc(post.slug)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      );
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
  } catch (e) {
    console.error('sitemap failed', e);
    res.status(500).send('Error generating sitemap');
  }
}
