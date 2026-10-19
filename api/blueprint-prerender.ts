// Bot-prerender route for a single blueprint: /blueprint-library/:id
// Served ONLY to bot user-agents via middleware.ts, like the blog routes.

import { fetchBlueprint, blueprintHtml } from './_blog-html.js';

export default async function handler(req: any, res: any) {
  const id = String(req.query.id || '').trim();
  if (!id || !/^[A-Za-z0-9_-]{1,128}$/.test(id)) {
    res.status(400).send('Bad id');
    return;
  }
  try {
    const bp = await fetchBlueprint(id);
    if (!bp) {
      res.status(404).send('Blueprint not found');
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(blueprintHtml(bp));
  } catch (e) {
    console.error('blueprint-prerender failed', id, e);
    res.status(500).send('Error rendering blueprint');
  }
}
