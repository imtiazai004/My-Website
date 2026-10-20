// Regenerates the static HTML snapshots in public/prerendered/ that
// middleware.ts serves to search and AI crawlers. Run after any content change
// to one of the routes below:
//   1. npm run build
//   2. npx vite preview --port 4173   (in a second terminal, leave running)
//   3. npm run prerender
//   4. commit the updated public/prerendered/*.html files
// Requires Playwright's Chromium (npx playwright install chromium), or set
// CHROMIUM_PATH to an existing Chromium binary.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const OUT_DIR = path.resolve('public/prerendered');
fs.mkdirSync(OUT_DIR, { recursive: true });

// route -> output filename. Keep in sync with STATIC_SNAPSHOTS in middleware.ts.
const routes = {
  '/': 'home.html',
  '/work': 'work.html',
  '/demos': 'demos.html',
  '/guides': 'guides.html',
  '/guides/sellerradar-part-1': 'guides-sellerradar-part-1.html',
  '/guides/client-website-prompt-pack': 'guides-client-website-prompt-pack.html',
  '/guides/tiktok-shop-outreach-seller-guide': 'guides-tiktok-shop-outreach-seller-guide.html',
  '/guides/ai-agent-safety-audit': 'guides-ai-agent-safety-audit.html',
  '/guides/build-your-own-ai-seller-copilot': 'guides-build-your-own-ai-seller-copilot.html',
  '/guides/tikfulfill-build-guide': 'guides-tikfulfill-build-guide.html',
  '/profitscout': 'profitscout.html',
  '/privacy': 'privacy.html',
  '/terms': 'terms.html',
  '/profitscout-privacy': 'profitscout-privacy.html',
  '/compare/agency-vs-freelancer': 'agency-vs-freelancer.html',
};

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// The snapshot must not depend on the visitor: skip analytics and the chat widget's network calls.
await page.route(/va\.vercel-scripts\.com|_vercel\/insights|\/api\/chat/, (r) => r.abort());

function stripClientScripts(html) {
  // Keep JSON-LD and drop the app's JS bundle — bots reading the snapshot
  // don't execute JS, and the hashed bundle names would only add diff noise.
  html = html.replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>\s*/gi, '');
  html = html.replace(/<link\b[^>]*rel="(?:stylesheet|modulepreload)"[^>]*>\s*/gi, '');
  return html;
}

const problems = [];
for (const [route, filename] of Object.entries(routes)) {
  // Firestore keeps a long-poll open, so "networkidle" never settles: wait for load + a fixed delay.
  await page.goto(BASE + route, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2500);
  let html = await page.evaluate(() => document.documentElement.outerHTML);

  // Guard rails: catch the mistakes this file exists to prevent.
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const expected = 'https://aisofttechsolution.com' + (route === '/' ? '/' : route);
  if (canonical !== expected) problems.push(`${route}: canonical is ${canonical}, expected ${expected}`);
  if (!/<h1[\s>]/.test(html)) problems.push(`${route}: no <h1>`);
  if (/>0\+<|>0%</.test(html)) problems.push(`${route}: a stat rendered as 0`);

  html = stripClientScripts(html);
  const banner =
    '<!-- Prerendered static snapshot for search and AI crawlers that do not execute JavaScript.\n' +
    '     Generated from the live SPA build; served only to bot user-agents via middleware.ts.\n' +
    '     Regenerate with `npm run prerender` after any content change to this route. -->\n';
  html = '<!doctype html>\n' + banner + html;
  fs.writeFileSync(path.join(OUT_DIR, filename), html);
  console.log('Rendered', route, '->', filename, html.length, 'bytes');
}

await browser.close();

if (problems.length) {
  console.error('\nSnapshot problems:\n' + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}
