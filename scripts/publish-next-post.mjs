import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { readFileSync } from 'node:fs';
import { POSTS } from '../blog-queue/posts.mjs';

// Publishes the next unpublished queued post to Firestore `posts` collection.
// Run by .github/workflows/daily-blog-publish.yml (scheduled + manual).
// Requires FIREBASE_SERVICE_ACCOUNT_JSON env var (service account JSON).
//
// NOTE: this Firebase project uses a NAMED Firestore database
// (provisioned by AI Studio), not the "(default)" one. The database ID
// is read from firebase-applet-config.json so it stays in sync with the site.

const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
if (!raw) {
  console.error('FIREBASE_SERVICE_ACCOUNT_JSON is not set');
  process.exit(1);
}

const siteConfig = JSON.parse(
  readFileSync(new URL('../firebase-applet-config.json', import.meta.url), 'utf-8')
);

const app = initializeApp({ credential: cert(JSON.parse(raw)) });
const db = getFirestore(app, siteConfig.firestoreDatabaseId);

const snap = await db.collection('posts').select('slug').get();
const existing = new Set(snap.docs.map((d) => d.data().slug));
// Optional: POST_SLUG publishes one specific queued post now (manual run).
// Scheduled runs leave it empty and keep the normal queue order.
const wanted = (process.env.POST_SLUG || '').trim();
if (wanted && !POSTS.some((p) => p.slug === wanted)) {
  console.error(`Slug not in queue: ${wanted}`);
  process.exit(1);
}
const next = wanted
  ? POSTS.find((p) => p.slug === wanted && !existing.has(p.slug))
  : POSTS.find((p) => !existing.has(p.slug));

if (!next) {
  console.log(wanted ? `SKIP: ${wanted} is already published` : 'DONE: all queued posts are already published');
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
