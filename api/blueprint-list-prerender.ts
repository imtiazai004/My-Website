// Bot-prerender route for /blueprint-library (served to bot user-agents only).

import { fetchBlueprints, blueprintListHtml } from './_blog-html.js';

export default async function handler(_req: any, res: any) {
  try {
    const items = await fetchBlueprints();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(blueprintListHtml(items));
  } catch (e) {
    console.error('blueprint-list-prerender failed', e);
    res.status(500).send('Error rendering blueprint library');
  }
}
