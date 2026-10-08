import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const live = process.argv.includes('--live');
const base = live
  ? 'https://aisofttechsolution.com/demos/family-dental/'
  : 'https://family-dental-clinic-3d-website-wit.vercel.app/';
const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const demoRule = config.rewrites.findIndex(rule => rule.source === '/demos/family-dental/:path*');
const genericRule = config.rewrites.findIndex(rule => rule.source === '/demos/:demo');
assert.ok(demoRule >= 0 && demoRule < genericRule, 'Dental requests must resolve before generic demo routes');

for (const page of ['', 'treatments/root-canal-treatment/']) {
  const url = new URL(page, base);
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `${url} must load`);
  assert.ok(response.url.startsWith(base), `Navigation escaped the demo address: ${response.url}`);
  const html = await response.text();
  assert.ok(html.includes('Family Dental') && html.includes('models/teeth.glb'), 'Expected dental page, not the main-site SPA');
  const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]);
  const localAssets = urls.filter(value => !/^(https?:|data:)/.test(value) && /\.(js|css|glb)(?:[?#]|$)/.test(value));
  assert.ok(localAssets.length >= 3, 'Expected scripts, stylesheet and tooth model');
  for (const asset of localAssets.slice(0, 6)) {
    const assetUrl = new URL(asset, url);
    assert.ok(assetUrl.href.startsWith(base), `Asset escaped the demo path: ${assetUrl}`);
    const assetResponse = await fetch(assetUrl, { method: 'HEAD', signal: AbortSignal.timeout(20000) });
    assert.equal(assetResponse.status, 200, `${assetUrl} must load`);
    assert.ok(!assetResponse.headers.get('content-type')?.includes('text/html'), `Asset returned the SPA instead: ${assetUrl}`);
  }
  console.log('PASS:', url.href, 'and its model/scripts/styles');
}

if (live) {
  const shortLink = base.slice(0, -1);
  const response = await fetch(shortLink, { signal: AbortSignal.timeout(20000) });
  assert.equal(response.url, base, 'The short link should normalize to the same branded address with a slash');
  console.log('PASS: short link remains on the branded domain');
}
