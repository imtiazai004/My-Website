/**
 * Real projects only. Every entry here maps to a product we run, a public
 * repo on github.com/imtiazai004, or a live deployment. No stock photos, no
 * invented metrics — the `status` label says honestly where each one stands.
 *
 * This file is the single source of truth for the Work section on the
 * homepage, the /work page, llms.txt and the Organization structured data.
 */

export type ProjectStatus =
  | 'In daily use'
  | 'Live product'
  | 'Live'
  | 'Open source'
  | 'In development'
  | 'Prototype'
  | 'Hackathon build';

export interface WorkProject {
  slug: string;
  title: string;
  /** One sentence: what it is and who it is for. */
  summary: string;
  /** Two to four sentences of detail for the /work page and the modal. */
  description: string;
  category: string;
  status: ProjectStatus;
  tags: string[];
  /** Illustration in /public/projects, if one exists. */
  image?: string;
  links?: {
    live?: string;
    github?: string;
    download?: string;
    page?: string;
  };
  /** Shown on the homepage Work grid. */
  featured?: boolean;
  /** Gradient used when there is no illustration. */
  gradient: string;
  icon: 'shield' | 'scissors' | 'search' | 'scan' | 'store' | 'tooth' | 'bike' | 'bot' | 'sparkles' | 'school' | 'chart' | 'book' | 'youtube' | 'mic' | 'file' | 'eye' | 'table';
}

const GH = 'https://github.com/imtiazai004';

export const PROJECTS: WorkProject[] = [
  {
    slug: 'district-nerve-center',
    title: 'District Nerve Center (DNC)',
    summary: 'Emergency coordination platform for a district control room in Khyber Pakhtunkhwa — in daily use.',
    description:
      'Every emergency reported in the district is logged once, sent to the responsible department and officer on WhatsApp, and must be acknowledged within a set time or it escalates automatically. Supervisors see every open case in one command view and download response-time reports. Designed with the control room staff around how they actually work.',
    category: 'Government system',
    status: 'In daily use',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp alerts'],
    featured: true,
    gradient: 'from-sky-600 to-indigo-700',
    icon: 'shield',
  },
  {
    slug: 'soft-clipper',
    title: 'Soft Clipper',
    summary: 'Windows app that turns long videos into ready-to-post vertical clips for TikTok, Reels and Shorts.',
    description:
      'AI finds the strongest moments in a long video, reframes them to 9:16 while keeping the speaker in frame, burns in captions and exports finished clips. Sold as a one-time purchase through its own website.',
    category: 'Desktop app',
    status: 'Live product',
    tags: ['Python', 'FastAPI', 'React', 'Gemini'],
    image: '/projects/soft-clipper.svg',
    links: { live: 'https://softclipper.pro' },
    featured: true,
    gradient: 'from-slate-800 to-slate-950',
    icon: 'scissors',
  },
  {
    slug: 'profitscout',
    title: 'ProfitScout',
    summary: 'Free Chrome extension for product research on Amazon, eBay, TikTok Shop, Walmart and Etsy.',
    description:
      'Analyses listings in the browser with an X-Ray niche scanner, ROI calculator, price tracker, lead manager and Gemini-powered insights. No sign-up; data stays in the browser.',
    category: 'Chrome extension',
    status: 'Live product',
    tags: ['JavaScript', 'Chrome Extension', 'Gemini'],
    links: { page: '/profitscout' },
    featured: true,
    gradient: 'from-orange-500 to-rose-600',
    icon: 'search',
  },
  {
    slug: 'sellops',
    title: 'SellOps',
    summary: 'Operations dashboard for TikTok Shop agencies and Etsy sellers.',
    description:
      'Revenue tracking, creator management, invoicing and payroll for TikTok Shop agencies, plus AI niche research and listing generation for Etsy — in one login.',
    category: 'SaaS',
    status: 'Open source',
    tags: ['Next.js', 'PostgreSQL (Neon)', 'Better Auth', 'Claude API'],
    links: { github: `${GH}/SellOps` },
    featured: true,
    gradient: 'from-fuchsia-600 to-purple-700',
    icon: 'store',
  },
  {
    slug: 'composer-ocr',
    title: 'Composer — AI Document Scanner',
    summary: 'Extracts text from photos and scans in 10+ languages; installs as an app on phone or desktop.',
    description:
      'Upload one or many pages and get clean, editable text back. Uses Gemini with an EasyOCR fallback and runs as a progressive web app.',
    category: 'AI tool',
    status: 'Live',
    tags: ['Python', 'Streamlit', 'Gemini', 'OCR'],
    links: { live: 'https://composer.aisofttechsolution.com', github: `${GH}/Compsoser-by-Imtiaz-Ahmad` },
    featured: true,
    gradient: 'from-indigo-500 to-violet-600',
    icon: 'scan',
  },
  {
    slug: 'family-dental-3d',
    title: 'Family Dental — 3D Clinic Website',
    summary: 'Immersive 3D scroll website for a dental clinic, with an on-page booking assistant.',
    description:
      'Visitors take a tooth apart layer by layer, explore treatments in interactive 3D and book through a chat assistant. A second, simpler version covers 15 treatment pages for clinics that want speed over spectacle.',
    category: 'Website',
    status: 'Live',
    tags: ['Three.js', 'GSAP', 'Vite'],
    links: { live: '/demos/family-dental/', github: `${GH}/family-dental-clinic-3d-website-with-Claude-desktop` },
    featured: true,
    gradient: 'from-cyan-500 to-teal-600',
    icon: 'tooth',
  },
  {
    slug: 'dir-ride',
    title: 'Dir Ride',
    summary: 'Bike-taxi app for Timergara that replaces booking rides through WhatsApp groups.',
    description:
      'One Flutter app for customers and riders with role-based screens, a Supabase backend and a Next.js admin dashboard with Google Maps.',
    category: 'Mobile app',
    status: 'In development',
    tags: ['Flutter', 'Supabase', 'Next.js', 'Google Maps'],
    gradient: 'from-emerald-500 to-green-700',
    icon: 'bike',
  },
  {
    slug: 'fixr-ai',
    title: 'Fixr AI',
    summary: 'Voice-first booking agent for local services like AC repair, electricians and plumbers.',
    description:
      'Five cooperating agents (intent, discovery, ranking, booking, follow-up) turn a spoken request in English, Roman Urdu or Urdu into a confirmed booking, with a visible trace of every decision. Built for the Google Antigravity Hackathon 2026.',
    category: 'AI agent',
    status: 'Hackathon build',
    tags: ['Node.js', 'Multi-agent', 'Web Speech API', 'Leaflet'],
    links: { github: `${GH}/fixr-ai` },
    gradient: 'from-violet-600 to-blue-700',
    icon: 'bot',
  },
  {
    slug: 'etsy-automation',
    title: 'Etsy Automation Tool',
    summary: 'From niche research to a published Etsy listing: research, product files and auto-listing.',
    description:
      'Claude scores niches for demand and competition, scans top sellers for gaps, writes titles, descriptions and 13 tags, generates the PDF/SVG/PNG product files and publishes through the official Etsy API with seller consent.',
    category: 'E-commerce automation',
    status: 'Prototype',
    tags: ['FastAPI', 'React', 'Claude API', 'Etsy API'],
    gradient: 'from-amber-500 to-orange-600',
    icon: 'sparkles',
  },
  {
    slug: 'school-finance-system',
    title: 'School Finance System',
    summary: 'Offline fee management for schools on Windows — no internet needed.',
    description:
      'Student records, fee collection, receipts and payment tracking, shared across the school network from one PC. One-click setup.',
    category: 'Desktop app',
    status: 'Open source',
    tags: ['Python', 'Flask', 'SQLite', 'Windows'],
    links: {
      github: `${GH}/school-finance-system`,
      download: `${GH}/school-finance-system/releases/download/v1.0/SchoolFinance-v1.0-Windows.zip`,
    },
    gradient: 'from-blue-600 to-blue-800',
    icon: 'school',
  },
  {
    slug: 'nursify',
    title: 'Nursify — Nursing Study Assistant',
    summary: 'Turns a nursing student’s own slides and notes into summaries, MCQs and a study plan.',
    description:
      'Answers and questions are generated strictly from the uploaded material, so students revise what their course actually covers.',
    category: 'EdTech',
    status: 'Open source',
    tags: ['React', 'Gemini', 'Firebase'],
    image: '/projects/nursing-app.svg',
    links: { github: `${GH}/Nursing-app-2` },
    gradient: 'from-teal-500 to-emerald-600',
    icon: 'book',
  },
  {
    slug: 'profitflow',
    title: 'ProfitFlow',
    summary: 'Profit & loss and balance-sheet reports for small businesses, built from uploaded statements.',
    description:
      'AI reads bank and sales statements, categorises entries and produces P&L and balance-sheet PDFs a shop owner can hand to an accountant.',
    category: 'Finance tool',
    status: 'Open source',
    tags: ['React', 'Express', 'SQLite', 'Gemini'],
    links: { github: `${GH}/Profit-and-Loss-maker` },
    gradient: 'from-lime-500 to-emerald-600',
    icon: 'chart',
  },
  {
    slug: 'smart-education',
    title: 'Smart Education — School Management',
    summary: 'School management system with separate portals for admin, staff and guardians.',
    description:
      'Admissions and onboarding, role-based operations, fee and finance records, staff directory and Gemini-powered analytics.',
    category: 'Web app',
    status: 'Open source',
    tags: ['React', 'Firebase', 'Gemini'],
    links: { github: `${GH}/School-Management-` },
    gradient: 'from-sky-500 to-blue-700',
    icon: 'school',
  },
  {
    slug: 'niche-researcher',
    title: 'Niche Researcher',
    summary: 'Finds similar YouTube channels and the topics trending in a niche over the last 24 hours.',
    description: 'Scrapes channel data and uses Gemini to surface peak-performing videos, rising topics and look-alike creators.',
    category: 'AI tool',
    status: 'Open source',
    tags: ['React', 'Express', 'Gemini'],
    links: { github: `${GH}/Niche-Researcher` },
    gradient: 'from-red-500 to-rose-700',
    icon: 'youtube',
  },
  {
    slug: 'formula-wizard',
    title: 'FormulaWizard',
    summary: 'Write what you want in plain English and get the Excel formula.',
    description: 'Generates and explains complex spreadsheet formulas from a plain-language request.',
    category: 'AI tool',
    status: 'Prototype',
    tags: ['React', 'Gemini'],
    gradient: 'from-green-600 to-emerald-700',
    icon: 'table',
  },
  {
    slug: 'voxgen',
    title: 'VoxGen',
    summary: 'Text-to-speech app with several natural-sounding voices.',
    description: 'Gemini-powered speech generation with voice selection and natural prosody.',
    category: 'AI tool',
    status: 'Open source',
    tags: ['React', 'Gemini TTS'],
    links: { github: `${GH}/VoxGen-AI` },
    gradient: 'from-pink-500 to-fuchsia-600',
    icon: 'mic',
  },
  {
    slug: 'report-analyzer',
    title: 'ReportAnalyzer AI',
    summary: 'Upload a report and get a command-centre view of its findings.',
    description: 'Hackathon build that reads long reports and turns them into a structured dashboard of key points and actions.',
    category: 'AI tool',
    status: 'Hackathon build',
    tags: ['React', 'Express', 'Gemini'],
    links: { github: `${GH}/anty-gravity-hakathon2` },
    gradient: 'from-slate-600 to-slate-800',
    icon: 'file',
  },
  {
    slug: 'googly-eyes',
    title: 'Googly Eyes for Windows',
    summary: 'A voice desktop companion on an Android phone that can point at and operate a Windows PC.',
    description:
      'Talks through OpenAI Realtime and, when asked, uses the computer — with a master kill switch (Ctrl+Alt+S), a self-check mode and guardrails on every action.',
    category: 'AI agent',
    status: 'Prototype',
    tags: ['C#', 'Kotlin', 'OpenAI Realtime'],
    gradient: 'from-blue-500 to-indigo-600',
    icon: 'eye',
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
