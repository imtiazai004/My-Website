import { next, rewrite } from '@vercel/functions';

// Search and AI crawlers. Most AI crawlers fetch a page live and do NOT
// execute JavaScript, and this site is a client-rendered SPA — so for bots we
// serve real HTML instead of the empty app shell:
//   • static routes  → build-time snapshots in public/prerendered/ (prerender.mjs)
//   • blog/blueprints → server-rendered from Firestore by the /api/*-prerender routes
//   • unknown paths  → a real 404 status (the SPA can only send 200)
// Google and Bing are included: the snapshot is the same page their renderer
// would produce, and it is cheaper for them to fetch.
const BOT_USER_AGENT = new RegExp(
  [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'ClaudeBot',
    'Claude-Web',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Googlebot',
    'GoogleOther',
    'Bingbot',
    'DuckDuckBot',
    'Applebot',
    'CCBot',
    'anthropic-ai',
    'cohere-ai',
    'Bytespider',
    'Amazonbot',
    'meta-externalagent',
    'facebookexternalhit',
    'LinkedInBot',
    'Twitterbot',
    'Slackbot',
    'WhatsApp',
  ].join('|'),
  'i'
);

/** Route -> prerendered snapshot. Keep in sync with the `routes` map in prerender.mjs. */
const STATIC_SNAPSHOTS: Record<string, string> = {
  '/': '/prerendered/home.html',
  '/work': '/prerendered/work.html',
  '/demos': '/prerendered/demos.html',
  '/guides': '/prerendered/guides.html',
  '/guides/claimback': '/prerendered/guides-claimback.html',
  '/guides/sellerradar-part-1': '/prerendered/guides-sellerradar-part-1.html',
  '/guides/client-website-prompt-pack': '/prerendered/guides-client-website-prompt-pack.html',
  '/guides/tiktok-shop-outreach-seller-guide': '/prerendered/guides-tiktok-shop-outreach-seller-guide.html',
  '/guides/ai-agent-safety-audit': '/prerendered/guides-ai-agent-safety-audit.html',
  '/guides/build-your-own-ai-seller-copilot': '/prerendered/guides-build-your-own-ai-seller-copilot.html',
  '/guides/tikfulfill-build-guide': '/prerendered/guides-tikfulfill-build-guide.html',
  '/profitscout': '/prerendered/profitscout.html',
  '/privacy': '/prerendered/privacy.html',
  '/terms': '/prerendered/terms.html',
  '/profitscout-privacy': '/prerendered/profitscout-privacy.html',
  '/compare/agency-vs-freelancer': '/prerendered/agency-vs-freelancer.html',
};

const ADMIN_PATH = '/sts-x9k2m7p4-console';

/** Real routes that bots should simply pass through to (no snapshot needed). */
function isPassThrough(p: string): boolean {
  return (
    p === ADMIN_PATH ||
    p === '/submit-testimonial' ||
    p === '/soft-clipper' ||
    /^\/demos\/[^/]+(\/.*)?$/.test(p) // standalone demo apps and the proxied dental site
  );
}

const NOT_FOUND_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page not found | Soft Tech Solution</title><meta name="robots" content="noindex"></head><body><h1>Page not found</h1><p>This page does not exist. Try <a href="https://aisofttechsolution.com/">the homepage</a>, <a href="https://aisofttechsolution.com/work">our work</a> or <a href="https://aisofttechsolution.com/demos">live demos</a>.</p></body></html>`;

export const config = {
  // Everything except API routes, build assets, snapshots and files with an
  // extension (images, PDFs, llms.txt…) — plus sitemap.xml, which is rewritten.
  matcher: ['/sitemap.xml', '/((?!api/|assets/|_vercel/|prerendered/|.*\\.).*)'],
};

export default function middleware(request: Request) {
  const url = new URL(request.url);

  // Dynamic sitemap for everyone: blog and blueprint URLs come live from Firestore.
  if (url.pathname === '/sitemap.xml') {
    return rewrite(new URL('/api/sitemap', request.url));
  }

  const userAgent = request.headers.get('user-agent') || '';
  if (!BOT_USER_AGENT.test(userAgent)) return next();

  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;

  const snapshot = STATIC_SNAPSHOTS[path];
  if (snapshot) return rewrite(new URL(snapshot, request.url));

  if (path === '/blog') return rewrite(new URL('/api/blog-list-prerender', request.url));
  const post = path.match(/^\/blog\/([A-Za-z0-9_-]{1,128})$/);
  if (post) return rewrite(new URL(`/api/blog-prerender?slug=${post[1]}`, request.url));

  if (path === '/blueprint-library') return rewrite(new URL('/api/blueprint-list-prerender', request.url));
  const bp = path.match(/^\/blueprint-library\/([A-Za-z0-9_-]{1,128})$/);
  if (bp) return rewrite(new URL(`/api/blueprint-prerender?id=${bp[1]}`, request.url));

  if (isPassThrough(path)) return next();

  // Unknown URL: tell crawlers it does not exist instead of serving the homepage with 200.
  return new Response(NOT_FOUND_HTML, {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
}
