// One-off fix for a published post whose Firestore title is wrong.
// SEO audit (2026-11-13): the TikTok-clips post's title field is the raw slug:
//   slug:  how-to-turn-long-videos-into-viral-tiktok-clips
//   title: how-to-turn-long-videos-into-viral-tiktok-clips  (should be a headline)
//   doc:   posts/Yu3Im5NkjbAI0Xap7HzM (admin-created, auto ID — looked up by slug)
//
// Usage (needs the service account — same secret as the daily publisher):
//   FIREBASE_SERVICE_ACCOUNT_JSON='...' node scripts/fix-post-title.mjs \
//     how-to-turn-long-videos-into-viral-tiktok-clips \
//     "How to Turn Long Videos Into Viral TikTok Clips"
// Mirrors scripts/publish-next-post.mjs auth. Never commit the JSON.
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { readFileSync } from 'node:fs';

const [slug, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(' ').trim();
if (!slug || !title) {
  console.error('Usage: node scripts/fix-post-title.mjs <slug> "<new title>"');
  process.exit(1);
}
if (title.length > 200) {
  console.error('Title must be <= 200 chars (Firestore isValidPost rule)');
  process.exit(1);
}

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

const snap = await db.collection('posts').where('slug', '==', slug).limit(1).get();
if (snap.empty) {
  console.error(`No post with slug: ${slug}`);
  process.exit(1);
}
const doc = snap.docs[0];
const old = doc.data().title;
await doc.ref.update({ title, updatedAt: Timestamp.now() });
console.log(`UPDATED: ${slug} — ${JSON.stringify(old)} -> ${JSON.stringify(title)}`);
