// Daily blog auto-publisher. Called by an external cron (1x/day) with the
// CRON_SECRET header. Publishes the next unpublished post from the queue
// into the Firestore `posts` collection (published=true).
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { POSTS } from './queue/posts';

function getDb() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';
    if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not set');
    initializeApp({ credential: cert(JSON.parse(raw)) });
  }
  return getFirestore();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = req.headers['x-cron-secret'];
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const db = getDb();
    const snap = await db.collection('posts').select('slug').get();
    const existing = new Set(snap.docs.map((d: any) => d.data().slug));
    const next = POSTS.find((p) => !existing.has(p.slug));

    if (!next) {
      return res.status(200).json({ status: 'done', message: 'All queued posts are published' });
    }

    // Doc ID = slug (matches firestore.rules ^[a-zA-Z0-9_-]+$)
    await db.collection('posts').doc(next.slug).set({
      slug: next.slug,
      title: next.title,
      excerpt: next.excerpt,
      content: next.content,
      tags: next.tags,
      author: 'Imtiaz Ahmad',
      published: true,
      createdAt: Timestamp.now(),
    });

    return res.status(200).json({ status: 'published', slug: next.slug, title: next.title });
  } catch (err: any) {
    console.error('publish-post error:', err?.message || err);
    return res.status(500).json({ error: 'Publish failed' });
  }
}
