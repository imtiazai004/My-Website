// Dynamic sitemap: /sitemap.xml (rewritten here by middleware.ts for everyone).
// Static pages are listed below — keep them in sync with src/App.tsx routes,
// src/data/guides.ts and src/data/demos.ts. Blog posts and blueprints are
// fetched live from Firestore, so new content appears automatically.

import { fetchPublishedPosts, fetchBlueprints } from './_blog-html.js';

const SITE = 'https://aisofttechsolution.com';

type Entry = { loc: string; lastmod: string; changefreq: string; priority: string };

const STATIC_PAGES: Entry[] = [
  { loc: '/', lastmod: '2026-10-20', changefreq: 'weekly', priority: '1.0' },
  { loc: '/work', lastmod: '2026-10-20', changefreq: 'monthly', priority: '0.9' },
  { loc: '/demos', lastmod: '2026-10-20', changefreq: 'weekly', priority: '0.9' },
  { loc: '/demos/family-dental', lastmod: '2026-10-08', changefreq: 'monthly', priority: '0.5' },
  { loc: '/demos/sinma-3d', lastmod: '2026-10-21', changefreq: 'monthly', priority: '0.5' },
  { loc: '/profitscout', lastmod: '2026-06-17', changefreq: 'monthly', priority: '0.8' },
  { loc: '/guides', lastmod: '2026-10-26', changefreq: 'weekly', priority: '0.8' },
  { loc: '/guides/fee-stack-calculator', lastmod: '2026-10-26', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides/agent-hardening-guide', lastmod: '2026-10-23', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides/morning-briefing-agent', lastmod: '2026-10-22', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides/claimback', lastmod: '2026-10-21', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides/sellerradar-part-1', lastmod: '2026-10-20', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides/client-website-prompt-pack', lastmod: '2026-10-20', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides/tiktok-shop-outreach-seller-guide', lastmod: '2026-10-19', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides/ai-agent-safety-audit', lastmod: '2026-10-19', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides/build-your-own-ai-seller-copilot', lastmod: '2026-10-18', changefreq: 'monthly', priority: '0.7' },
  { loc: '/guides/tikfulfill-build-guide', lastmod: '2026-10-14', changefreq: 'monthly', priority: '0.7' },
  { loc: '/blog', lastmod: '2026-10-20', changefreq: 'daily', priority: '0.8' },
  { loc: '/blueprint-library', lastmod: '2026-10-20', changefreq: 'weekly', priority: '0.6' },
  { loc: '/compare/agency-vs-freelancer', lastmod: '2026-10-14', changefreq: 'monthly', priority: '0.6' },
  { loc: '/privacy', lastmod: '2026-07-27', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms', lastmod: '2026-07-27', changefreq: 'yearly', priority: '0.3' },
  { loc: '/profitscout-privacy', lastmod: '2026-06-17', changefreq: 'yearly', priority: '0.3' },
];

// Standalone demo apps in public/demos/<slug>/ (same list as src/data/demos.ts).
const DEMO_SLUGS = [
  'bizbot', 'foodbot', 'supportai', 'codconfirm', 'tikfulfill', 'shopconsole', 'khatabook', 'profitlens',
  'expiryguard', 'salonbook', 'clinictoken', 'scriptrefill', 'feechaser', 'classflow', 'rentguard', 'viewbook',
  'hallbook', 'leasemind', 'jobtrack', 'carcare', 'leadcrm', 'proposalgen', 'invoicechaser', 'hirepipe',
];

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function day(iso: string | null, fallback: string): string {
  return iso ? new Date(iso).toISOString().split('T')[0] : fallback;
}

function urlXml(e: Entry): string {
  return `  <url>\n    <loc>${SITE}${esc(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`;
}

export default async function handler(_req: any, res: any) {
  const today = new Date().toISOString().split('T')[0];
  const entries: Entry[] = [...STATIC_PAGES];

  for (const slug of DEMO_SLUGS) {
    entries.push({ loc: `/demos/${slug}`, lastmod: '2026-10-14', changefreq: 'monthly', priority: '0.5' });
  }

  // Firestore content: a failure here must not take the whole sitemap down.
  const [posts, blueprints] = await Promise.allSettled([fetchPublishedPosts(), fetchBlueprints()]);
  if (posts.status === 'fulfilled') {
    for (const p of posts.value) {
      if (!/^[A-Za-z0-9_-]{1,128}$/.test(p.slug)) continue;
      entries.push({ loc: `/blog/${p.slug}`, lastmod: day(p.updatedAt || p.createdAt, today), changefreq: 'monthly', priority: '0.7' });
    }
  } else {
    console.error('sitemap: posts failed', posts.reason);
  }
  if (blueprints.status === 'fulfilled') {
    for (const b of blueprints.value) {
      entries.push({ loc: `/blueprint-library/${b.id}`, lastmod: day(b.createdAt, today), changefreq: 'monthly', priority: '0.5' });
    }
  } else {
    console.error('sitemap: blueprints failed', blueprints.reason);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(urlXml).join('\n')}\n</urlset>\n`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}
