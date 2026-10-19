// Bot-prerender route for a single blog post: /blog/:slug
// Served ONLY to bot user-agents via middleware.ts. Fetches the live post
// from Firestore and returns full HTML with SEO meta + BlogPosting JSON-LD,
// so crawlers that don't execute JavaScript still see the real content.

import { fetchPost, postHtml } from './_blog-html.js';

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
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(postHtml(post));
  } catch (e) {
    console.error('blog-prerender failed', slug, e);
    res.status(500).send('Error rendering article');
  }
}
