import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { POSTS } from '../blog-queue/posts.mjs';

// Publishes the next unpublished queued post to Firestore `posts` collection.
// Run by .github/workflows/daily-blog-publish.yml (scheduled + manual).
// Requires FIREBASE_SERVICE_ACCOUNT_JSON env var (service account JSON).

const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
if (!raw) {
  console.error('FIREBASE_SERVICE_ACCOUNT_JSON is not set');
  process.exit(1);
}

initializeApp({ credential: cert(JSON.parse(raw)) });
const db = getFirestore();

const snap = await db.collection('posts').select('slug').get();
const existing = new Set(snap.docs.map((d) => d.data().slug));
const next = POSTS.find((p) => !existing.has(p.slug));

if (!next) {
  console.log('DONE: all queued posts are already published');
  process.exit(0);
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

console.log(`PUBLISHED: ${next.slug} — ${next.title}`);
