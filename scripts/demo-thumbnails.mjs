// Generates real screenshots of every demo in public/demos/<slug>/ as
// public/demos/thumbs/<slug>.webp (640×400), used by the /demos gallery and
// the homepage. Re-run after adding or changing a demo:
//   1. npm run build && npx vite preview --port 4173   (leave running)
//   2. npm run thumbs
// Optional: OFFLINE_FONTS_CSS=/path/to/fonts.css serves Google Fonts from a
// local stylesheet when the machine has no internet access.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const DEMOS_DIR = path.resolve('public/demos');
const OUT_DIR = path.join(DEMOS_DIR, 'thumbs');
fs.mkdirSync(OUT_DIR, { recursive: true });

const slugs = fs
  .readdirSync(DEMOS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(DEMOS_DIR, d.name, 'index.html')))
  .map((d) => d.name);

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
const page = await context.newPage();

if (process.env.OFFLINE_FONTS_CSS) {
  const css = fs.readFileSync(process.env.OFFLINE_FONTS_CSS, 'utf8');
  await page.route(/fonts\.googleapis\.com/, (r) => r.fulfill({ contentType: 'text/css', body: css }));
  await page.route(/fonts\.gstatic\.com/, (r) => r.abort());
}

for (const slug of slugs) {
  await page.goto(`${BASE}/demos/${slug}/index.html`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);
  const png = await page.screenshot({ type: 'png' });

  // Downscale and encode as WebP in the browser itself — no image library needed.
  const dataUrl = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 400;
    canvas.getContext('2d').drawImage(img, 0, 0, 640, 400);
    return canvas.toDataURL('image/webp', 0.82);
  }, png.toString('base64'));

  const file = path.join(OUT_DIR, `${slug}.webp`);
  fs.writeFileSync(file, Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('thumb', slug, fs.statSync(file).size, 'bytes');
}

await browser.close();
