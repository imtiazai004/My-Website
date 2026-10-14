// Shared helpers for the bot-prerender API routes (api/blog-prerender.ts,
// api/blog-list-prerender.ts). These routes exist so crawlers that do NOT
// execute JavaScript (GPTBot, ClaudeBot, PerplexityBot, and friends) still
// see the real blog content — the SPA renders blog posts client-side from
// Firestore, so without this they get an almost-empty shell.
//
// Uses the public Firebase *web* config (same values already shipped in the
// client bundle via firebase-applet-config.json) — the API key is a browser
// key, not a secret. The posts collection is publicly readable by design.

import firebaseConfig from '../firebase-applet-config.json';

const BASE = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.firestoreDatabaseId}/documents`;
const KEY = firebaseConfig.apiKey;
const SITE = 'https://aisofttechsolution.com';
const BRAND = 'AI Soft Tech Solution';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string | null;
}

// ---------- Firestore REST decoding ----------

function str(f: any): string {
  return f?.stringValue ?? '';
}

function bool(f: any): boolean {
  return f?.booleanValue ?? false;
}

function tagList(f: any): string[] {
  const vals = f?.arrayValue?.values ?? [];
  return vals.map((v: any) => v.stringValue).filter(Boolean);
}

function parsePost(name: string, fields: any): BlogPost {
  const slug = name.split('/').pop() || '';
  return {
    slug,
    title: str(fields.title),
    excerpt: str(fields.excerpt),
    content: str(fields.content),
    coverImage: str(fields.coverImage),
    author: str(fields.author),
    tags: tagList(fields.tags),
    published: bool(fields.published),
    createdAt: fields.createdAt?.timestampValue ?? null,
  };
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
  const url = `${BASE}/posts/${encodeURIComponent(slug)}?key=${KEY}`;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore get failed: ${res.status}`);
  const doc = await res.json();
  const post = parsePost(doc.name, doc.fields || {});
  return post.published ? post : null;
}

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  const url = `${BASE}:runQuery?key=${KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'posts' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'published' },
            op: 'EQUAL',
            value: { booleanValue: true },
          },
        },
        orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
      },
    }),
  });
  if (!res.ok) throw new Error(`Firestore query failed: ${res.status}`);
  const rows = await res.json();
  const posts: BlogPost[] = [];
  for (const row of rows) {
    if (!row.document) continue;
    const post = parsePost(row.document.name, row.document.fields || {});
    if (post.published) posts.push(post);
  }
  return posts;
}

// ---------- Markdown -> HTML (server-side twin of src/lib/markdown.ts) ----------

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

export function renderMarkdown(md: string): string {
  if (!md) return '';
  const src = escapeHtml(md.replace(/\r\n/g, '\n'));
  const lines = src.split('\n');
  const out: string[] = [];
  let i = 0;

  const flushList = (items: string[], ordered: boolean) => {
    if (!items.length) return;
    const tag = ordered ? 'ol' : 'ul';
    out.push(`<${tag}>${items.map((it) => `<li>${inline(it)}</li>`).join('')}</${tag}>`);
  };

  while (i < lines.length) {
    const line = lines[i];

    // Interactive demo embed: bots don't run iframes, so link to the demo.
    const dm = line.match(/^:::\s*demo\s+([a-z0-9-]+)(?:\s+(desktop))?\s*:::\s*$/);
    if (dm) {
      out.push(
        `<p class="demo-link">👉 <a href="${SITE}/demos/${dm[1]}">Try the interactive demo: ${dm[1]}</a></p>`
      );
      i++;
      continue;
    }

    if (/^```/.test(line)) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      out.push(`<pre><code>${buf.join('\n')}</code></pre>`);
      continue;
    }

    if (/^(\s*([-*_])\s*){3,}$/.test(line)) {
      out.push('<hr />');
      i++;
      continue;
    }

    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      out.push(`<blockquote>${inline(line.replace(/^>\s?/, ''))}</blockquote>`);
      i++;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      flushList(items, false);
      continue;
    }

    if (/^\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+[.)]\s+/, ''));
        i++;
      }
      flushList(items, true);
      continue;
    }

    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }

    out.push(`<p>${inline(line)}</p>`);
    i++;
  }

  return out.join('\n');
}

// ---------- HTML shells ----------

const STYLE = `
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:760px;margin:0 auto;padding:32px 20px;color:#1e293b;line-height:1.75}
a{color:#1a7fe6;text-decoration:none}a:hover{text-decoration:underline}
header{border-bottom:1px solid #e2e8f0;padding-bottom:16px;margin-bottom:32px;font-weight:700}
header a{color:#0f172a}.brand{color:#1a7fe6}
h1{font-size:2rem;line-height:1.2;color:#0f172a}h2{font-size:1.4rem;color:#0f172a}h3{font-size:1.15rem;color:#0f172a}
.tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}.tag{background:#e8f2fe;color:#1a7fe6;padding:3px 12px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.meta{color:#94a3b8;font-size:14px;margin-bottom:24px}
img{max-width:100%;border-radius:12px}pre{background:#0f172a;color:#e2e8f0;padding:16px;border-radius:12px;overflow:auto}
code{background:#f1f5f9;padding:2px 6px;border-radius:4px}pre code{background:none;padding:0}
blockquote{border-left:3px solid #1a7fe6;padding-left:16px;color:#475569;margin-left:0}
.demo-link{background:#f0f7ff;border:1px solid #bfdbfe;padding:14px 18px;border-radius:12px;font-weight:600}
.post-card{border:1px solid #e2e8f0;border-radius:16px;padding:20px 24px;margin-bottom:20px}
.post-card h2{margin:0 0 8px}.post-card p{margin:0;color:#475569}
footer{border-top:1px solid #e2e8f0;margin-top:48px;padding-top:16px;color:#94a3b8;font-size:13px}
`;

function shell(opts: {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  image: string;
  jsonLd: object | null;
  body: string;
}): string {
  const jsonLd = opts.jsonLd
    ? `<script type="application/ld+json">\n${JSON.stringify(opts.jsonLd, null, 2)}\n</script>`
    : '';
  return `<!doctype html>
<!-- Prerendered for crawlers that do not execute JavaScript. Served to bot
     user-agents via middleware.ts. Content is fetched live from Firestore. -->
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(opts.title)}</title>
<meta name="description" content="${escapeHtml(opts.description)}">
<link rel="canonical" href="${opts.canonical}">
<meta property="og:type" content="${opts.ogType}">
<meta property="og:url" content="${opts.canonical}">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:title" content="${escapeHtml(opts.title)}">
<meta property="og:description" content="${escapeHtml(opts.description)}">
<meta property="og:image" content="${opts.image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(opts.title)}">
<meta name="twitter:description" content="${escapeHtml(opts.description)}">
<meta name="twitter:image" content="${opts.image}">
${jsonLd}
<style>${STYLE}</style>
</head>
<body>
<header><a href="${SITE}"><span class="brand">AI Soft Tech Solution</span></a> · <a href="${SITE}/blog">Blog</a></header>
${opts.body}
<footer>${BRAND} — AI &amp; Web Development Agency · <a href="${SITE}/">aisofttechsolution.com</a></footer>
</body></html>`;
}

export function postHtml(post: BlogPost): string {
  const canonical = `${SITE}/blog/${post.slug}`;
  const image = post.coverImage || `${SITE}/og-image.jpg`;
  const date = post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : undefined;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image,
    author: { '@type': 'Person', name: post.author || BRAND },
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      legalName: 'Atlantic LTD STORE LIMITED',
      logo: { '@type': 'ImageObject', url: `${SITE}/og-image.jpg` },
    },
    mainEntityOfPage: canonical,
    ...(date ? { datePublished: date } : {}),
  };
  const tags = post.tags.length
    ? `<div class="tags">${post.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`
    : '';
  const byline = `<div class="meta">By ${escapeHtml(post.author || BRAND)}${date ? ` · ${date}` : ''}</div>`;
  return shell({
    title: `${post.title} — ${BRAND} Blog`,
    description: post.excerpt,
    canonical,
    ogType: 'article',
    image,
    jsonLd,
    body: `<main><article>${tags}<h1>${escapeHtml(post.title)}</h1>${byline}${renderMarkdown(post.content)}</article></main>`,
  });
}

export function listHtml(posts: BlogPost[]): string {
  const cards = posts
    .map(
      (p) => `<div class="post-card"><h2><a href="${SITE}/blog/${p.slug}">${escapeHtml(p.title)}</a></h2><p>${escapeHtml(p.excerpt)}</p></div>`
    )
    .join('\n');
  return shell({
    title: `Blog — ${BRAND}`,
    description: `${BRAND} blog: practical guides on AI, automation, and websites for growing businesses.`,
    canonical: `${SITE}/blog`,
    ogType: 'website',
    image: `${SITE}/og-image.jpg`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${BRAND} Blog`,
      url: `${SITE}/blog`,
    },
    body: `<main><h1>Blog</h1><p>Practical guides on AI, automation, and websites for growing businesses.</p>${cards}</main>`,
  });
}
