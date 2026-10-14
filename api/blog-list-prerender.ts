// Bot-prerender route for the blog index: /blog
// Served ONLY to bot user-agents via middleware.ts. Fetches the live list of
// published posts from Firestore and returns full HTML with SEO meta.

import { fetchPublishedPosts, listHtml } from './_blog-html.js';

export default async function handler(_req: any, res: any) {
  try {
    const posts = await fetchPublishedPosts();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(listHtml(posts));
  } catch (e) {
    console.error('blog-list-prerender failed', e);
    res.status(500).send('Error rendering blog');
  }
}
