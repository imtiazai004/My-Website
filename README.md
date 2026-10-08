<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/b76c3de3-e8dd-4066-a257-77e5660bc99b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Client demos

The homepage Demos section and `/demos` gallery share `src/data/demos.ts`.
Add a demo entry there to show its card and live link in both places.
After changing demo cards, run `npx tsx scripts/sync-demo-snapshot.ts` to update
the homepage snapshot used by search crawlers (or regenerate all snapshots
with the existing `prerender.mjs` workflow).

The 3D dental demo uses the branded URL `/demos/family-dental/`. Its Vercel
rewrite proxies the deployed dental website and all nested assets/pages;
the browser stays on `aisofttechsolution.com`. Keep this specific rewrite
before the generic demo and SPA rewrites in `vercel.json`. The dental
deployment remains the source of the demo and must stay available.
