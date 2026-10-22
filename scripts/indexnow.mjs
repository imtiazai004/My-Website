// IndexNow: tells Bing (and other IndexNow engines) that pages changed,
// so they are re-crawled quickly. The key file lives at public/<KEY>.txt.
//
// Usage:
//   node scripts/indexnow.mjs sitemap            # submit every URL in the sitemap
//   node scripts/indexnow.mjs <url> [<url> ...]  # submit specific URLs
// Also imported by publish-next-post.mjs after a new blog post goes live.

const SITE = 'https://aisofttechsolution.com';
const HOST = 'aisofttechsolution.com';
export const INDEXNOW_KEY = '43f0edfd47820605e4c7c05a2e4e3428';

export async function pingIndexNow(urls) {
  const urlList = [...new Set(urls)].filter((u) => u.startsWith(SITE));
  if (urlList.length === 0) return { ok: true, status: 0, count: 0 };
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList: urlList.slice(0, 10000),
    }),
  });
  // 200 = accepted, 202 = accepted (key check pending). Anything else is a problem.
  return { ok: res.status === 200 || res.status === 202, status: res.status, count: urlList.length };
}

async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const urls = args[0] === 'sitemap' ? await sitemapUrls() : args;
  const r = await pingIndexNow(urls);
  console.log(`IndexNow: HTTP ${r.status}, ${r.count} URLs`);
  if (!r.ok) process.exit(1);
}
