// Regenerates the static HTML snapshots in public/prerendered/ that
// middleware.ts serves to AI/search crawlers on the 6 static routes below.
// Run this after any content change to one of those routes:
//   1. npm run build
//   2. npx vite preview --port 4173   (in a second terminal, leave running)
//   3. node prerender.mjs
//   4. commit the updated public/prerendered/*.html files
// Requires the `playwright` package (npm install -D playwright) and its
// browsers (npx playwright install chromium) if not already present.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE = 'http://localhost:4173';
const OUT_DIR = path.resolve('public/prerendered');
fs.mkdirSync(OUT_DIR, { recursive: true });

// route -> output filename
const routes = {
  '/': 'home.html',
  '/profitscout': 'profitscout.html',
  '/soft-clipper': 'soft-clipper.html',
  '/privacy': 'privacy.html',
  '/terms': 'terms.html',
  '/profitscout-privacy': 'profitscout-privacy.html',
  '/compare/agency-vs-freelancer': 'agency-vs-freelancer.html',
};

const browser = await chromium.launch();
const page = await browser.newPage();

function stripClientScripts(html) {
  // Keep JSON-LD (<script type="application/ld+json">) and the Vercel
  // Analytics beacon, drop the React/Vite JS bundle <script type="module">
  // tags — bots reading this snapshot don't execute JS, so shipping the
  // bundle references here is dead weight, not a feature.
  html = html.replace(
    /<script\b(?![^>]*application\/ld\+json)(?![^>]*_vercel\/insights)[^>]*>[\s\S]*?<\/script>\s*/gi,
    ''
  );
  // Same logic for the compiled CSS <link> and <link rel="modulepreload">
  // hints: both reference content-hashed build asset filenames that change
  // on every rebuild even when nothing a bot would read has changed, so
  // they're pure diff noise here — strip them too.
  html = html.replace(/<link\b[^>]*rel="(?:stylesheet|modulepreload)"[^>]*>\s*/gi, '');
  return html;
}

for (const [route, filename] of Object.entries(routes)) {
  await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);
  let html = await page.evaluate(() => document.documentElement.outerHTML);
  html = stripClientScripts(html);
  const banner =
    '<!-- Prerendered static snapshot for AI/search crawlers that do not execute JavaScript.\n' +
    '     Generated from the live SPA build; served only to bot user-agents via middleware.ts.\n' +
    '     Regenerate with `node prerender.mjs` after any content change to this route. -->\n';
  html = '<!doctype html>\n' + banner + html;
  fs.writeFileSync(path.join(OUT_DIR, filename), html);
  console.log('Rendered', route, '->', filename, html.length, 'bytes');
}

await browser.close();
