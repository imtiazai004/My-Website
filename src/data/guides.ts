/** Free guides at /guides/<slug> — also used by the sitemap and llms.txt. */
export interface Guide {
  slug: string;
  badge: string;
  title: string;
  description: string;
  meta: string;
  /** ISO date the guide was published or last updated (sitemap lastmod). */
  updated: string;
}

export const GUIDES: Guide[] = [
  {
    slug: 'tiktok-shop-outreach-seller-guide',
    updated: '2026-10-19',
    badge: 'New',
    title: 'TikTok Shop Outreach — Seller Guide',
    description:
      'The AffiliatePilot playbook: a custom app that recruits TikTok creators to sell your products through shoppable videos and LIVE streams — on commission, zero ad spend up front.',
    meta: 'PDF · 6 pages · English',
  },
  {
    slug: 'ai-agent-safety-audit',
    updated: '2026-10-19',
    badge: 'Guide',
    title: 'The Agent Safety Audit',
    description:
      '10 guardrails to demand before any AI agent touches your business — sandboxing, approval gates, secret masking, audit trails, data boundaries and more. Plain English, no jargon.',
    meta: 'PDF · 8 pages · English',
  },
  {
    slug: 'build-your-own-ai-seller-copilot',
    updated: '2026-10-18',
    badge: 'Guide',
    title: 'Build Your Own AI Seller Copilot',
    description:
      'Turn your sales playbooks into an AI copilot that answers like a specialist. Pick your coding agent, build the app step by step — no coding required.',
    meta: 'PDF · 11 pages · English',
  },
  {
    slug: 'tikfulfill-build-guide',
    updated: '2026-10-14',
    badge: 'Guide',
    title: 'TikFulfill Build Guide',
    description:
      'Build your own TikTok Shop auto-fulfilment dashboard in VS Code with Claude Code — every prompt included, copy-paste ready.',
    meta: 'PDF · 13 pages · English',
  },
];

export const GUIDE_COUNT = GUIDES.length;
