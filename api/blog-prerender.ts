// Bot-prerender route for a single blog post: /blog/:slug
// Served ONLY to bot user-agents via middleware.ts. Fetches the live post
// from Firestore and returns full HTML with SEO meta + BlogPosting JSON-LD,
// so crawlers that don't execute JavaScript still see the real content.

import { fetchPost, fetchPublishedPosts, postHtml } from './_blog-html.js';

export default async function handler(req: any, res: any) {
  const slug = String(req.query.slug || '').trim();
  if (!slug || !/^[A-Za-z0-9_-]{1,128}$/.test(slug)) {
    res.status(400).send('Bad slug');
    return;
  }
  try {
    const post = await fetchPost(slug);
    if (!post) {
      res.status(404).send('Article not found');
      return;
    }
    // Prev/next for the "Keep reading" block: posts arrive newest-first
    // (createdAt desc), so the previous item is newer and the next is older.
    // A failure here must not break the article itself.
    let related: { newer: { slug: string; title: string } | null; older: { slug: string; title: string } | null } = {
      newer: null,
      older: null,
    };
    try {
      const all = await fetchPublishedPosts();
      const idx = all.findIndex((p) => p.slug === slug);
      if (idx > 0) related.newer = { slug: all[idx - 1].slug, title: all[idx - 1].title };
      if (idx >= 0 && idx < all.length - 1) related.older = { slug: all[idx + 1].slug, title: all[idx + 1].title };
    } catch (e) {
      console.error('blog-prerender related failed', slug, e);
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(postHtml(post, related));
  } catch (e) {
    console.error('blog-prerender failed', slug, e);
    res.status(500).send('Error rendering article');
  }
}
