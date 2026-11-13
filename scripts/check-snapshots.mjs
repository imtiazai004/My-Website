// Deploy-time guard (SEO audit F1 / mistakes log #1): fail the build if any
// snapshot path mapped in middleware.ts has no file in public/prerendered/.
// This is what let 4 guide pages serve the empty SPA shell to Googlebot for
// ~2 weeks — the mapping existed, the files didn't, and nothing complained.
// Runs automatically before every build via the "prebuild" npm script, so a
// missing snapshot can never deploy silently again.
//
// NOTE on first use: snapshots are generated AFTER a build (npm run build,
// then vite preview, then `npm run prerender`), so the first time this guard
// runs the new files must already exist — generate them with `npm run
// prerender` first, or run the build directly with `npx vite build` (which
// skips the npm prebuild hook) for the generation pass only.
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mw = fs.readFileSync(path.join(ROOT, 'middleware.ts'), 'utf8');

// '/route': '/prerendered/file.html' entries of STATIC_SNAPSHOTS.
const matches = [...mw.matchAll(/'(\/[^']*)':\s*'(\/prerendered\/[^']+\.html)'/g)];

if (!matches.length) {
  console.error('check-snapshots: no snapshot mappings found in middleware.ts — refusing to pass blind');
  process.exit(1);
}

const missing = matches.filter(([, , snap]) => !fs.existsSync(path.join(ROOT, 'public', snap)));
if (missing.length) {
  console.error('check-snapshots: MISSING snapshot files — regenerate with `npm run prerender` (npm run build, vite preview, npm run prerender):');
  for (const [, route, snap] of missing) console.error(`  ${route} -> public${snap}`);
  process.exit(1);
}

// A snapshot the size of the empty SPA shell (~5.5 KB) is not a snapshot.
const tiny = matches.filter(([, , snap]) => fs.statSync(path.join(ROOT, 'public', snap)).size <= 6000);
if (tiny.length) {
  console.error('check-snapshots: snapshot files suspiciously small (empty-shell size) — regenerate with `npm run prerender`:');
  for (const [, route, snap] of tiny) console.error(`  ${route} -> public${snap}`);
  process.exit(1);
}

console.log(`check-snapshots: OK — ${matches.length} snapshot mappings, all files present`);
