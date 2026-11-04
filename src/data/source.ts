/** Downloadable source repos at /source — also used by the sitemap and llms.txt. */
export interface SourceEntry {
  slug: string;
  badge: string;
  title: string;
  description: string;
  meta: string;
  /** ISO date the entry was published or last updated (sitemap lastmod). */
  updated: string;
  /** Direct download path for the ZIP (public/source/<slug>.zip). */
  zipUrl: string;
  /** Original repository this download comes from. */
  originUrl: string;
  originLabel: string;
}

export const SOURCES: SourceEntry[] = [
  {
    slug: 'ecommerce-ai-tools',
    updated: '2026-11-04',
    badge: 'Source',
    title: 'ecommerce-ai-tools',
    description:
      'AI product video workflows, ecommerce data APIs and free product listings for online sellers — turn product photos, a listing link, an avatar or a reference clip into a product video with five workflows (Image to Video, URL to Video, Avatar Video, Video Clone, Bulk Video); look up marketplace data for Amazon, TikTok, 1688, Shopify, Shopee and Walmart — product search, reviews, sourcing and keywords; and list a product on a free public page built for search and AI discovery.',
    meta: 'ZIP · English',
    zipUrl: '/source/ecommerce-ai-tools.zip',
    originUrl: 'https://github.com/nexscope-ai/ecommerce-ai-tools',
    originLabel: 'nexscope-ai/ecommerce-ai-tools on GitHub',
  },
];
