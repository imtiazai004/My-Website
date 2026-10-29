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
    slug: 'account-health',
    updated: '2026-10-29',
    badge: 'New',
    title: 'The Account-Health App — Stops One Bad Week From Freezing a TikTok Shop',
    description:
      'The app that watches a TikTok Shop Account Health Rating — live score and milestone distance, WhatsApp alerts before the freeze, violation breakdown, cancellation and dispatch gauges, and the policy-quiz recovery path. The illustrative slide math and the full build roadmap.',
    meta: 'PDF · 3 pages · English',
  },
  {
    slug: 'competitor-price-watch',
    updated: '2026-10-27',
    badge: 'Guide',
    title: 'Competitor Price Watch — The App That Tracks Competitors Prices',
    description:
      'The app that tracks competitors prices — alerts you the moment a rival cuts a price, guards your margin with a floor, and reprices by your rules. The five pieces, the illustrative leak math, and the full build roadmap.',
    meta: 'PDF · 3 pages · English',
  },
  {
    slug: 'fee-stack-calculator',
    updated: '2026-10-26',
    badge: 'Guide',
    title: 'The Fee-Stack Calculator',
    description:
      'The app Imtiaz is building for an agency that shows marketplace sellers the fees their calculator misses — across TikTok Shop, Amazon, Etsy, and eBay. The verified fee stacks, the $50,000-month math, the multi-marketplace adapter architecture and the full build roadmap.',
    meta: 'PDF · 8 pages · English',
  },
  {
    slug: 'agent-hardening-guide',
    updated: '2026-10-23',
    badge: 'Guide',
    title: 'From Demo to Production — The AI Agent Hardening Guide',
    description:
      'Why AI agent demos always work and production agents fail silently — and the six hardening layers that close the gap: guardrails, approval gates, observability, evals, fallbacks and recovery, and cost controls. Includes the hardened skeleton prompt, the business math, the step-by-step build roadmap and the 7-point pre-launch checklist.',
    meta: 'PDF · 10 pages · English',
  },
  {
    slug: 'morning-briefing-agent',
    updated: '2026-10-22',
    badge: 'Guide',
    title: 'The Morning Briefing Agent — An AI Agent That Briefs You at 6 AM',
    description:
      'The custom agent built for business owners: it collects overnight email, messages, orders and invoices, ranks them (money waiting first, customers waiting second), delivers one WhatsApp brief at 6 AM, and never acts without your YES. Includes the exact ranking prompt, the business math and the full build roadmap.',
    meta: 'PDF · 9 pages · English',
  },
  {
    slug: 'claimback',
    updated: '2026-10-21',
    badge: 'Guide',
    title: 'ClaimBack — The FBA Reimbursement Finder',
    description:
      'The custom app built for Amazon FBA sellers: it pulls Seller Central reports, flags every lost, damaged or miscounted unit, builds the claim case with evidence, and tracks it to payout. Plus the returns-fee leak, the business math and the full build roadmap.',
    meta: 'PDF · 9 pages · English',
  },
  {
    slug: 'sellerradar-part-1',
    updated: '2026-10-20',
    badge: 'Guide',
    title: 'SellerRadar Part 1 — TikTok Shop Product Research',
    description:
      'Modules 1-2 of the custom TikTok Shop research app: the Product Finder (rank products by sales velocity, rating and price) and the Shop & Competitor X-Ray (gaps, ratings, service metrics). Filters, sample X-ray and the full build roadmap.',
    meta: 'PDF · 8 pages · English',
  },
  {
    slug: 'client-website-prompt-pack',
    updated: '2026-10-20',
    badge: 'Guide',
    title: 'The Prompt Pack — Client Website in a Weekend',
    description:
      'The exact 4 prompts behind every client website we ship: the discovery interview, the design brief, the copy polisher, and the QA gate — copy-paste ready, plus the weekend build checklist.',
    meta: 'PDF · 8 pages · English',
  },
  {
    slug: 'tiktok-shop-outreach-seller-guide',
    updated: '2026-10-19',
    badge: 'Guide',
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
