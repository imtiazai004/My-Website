/**
 * The services we actually deliver, each backed by a live demo or a shipped
 * project. Used by the Services section, the navbar, the homepage
 * structured data and llms.txt — keep them in sync by editing only here.
 */

export interface Service {
  id: string;
  /** Short tab label. */
  name: string;
  /** Full service name. */
  label: string;
  icon: 'bot' | 'bell' | 'cart' | 'app' | 'globe' | 'landmark';
  /** Navbar accent colour. */
  color: string;
  tagline: string;
  description: string;
  /** Who it is for, in plain words. */
  forWho: string;
  /** Proof: demo slugs (public/demos/<slug>) or project slugs. */
  examples: { label: string; href: string }[];
  tags: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'ai-assistants',
    name: 'AI assistants',
    label: 'WhatsApp & website AI assistants',
    icon: 'bot',
    color: '#a855f7',
    tagline: 'Every message answered — even at midnight.',
    description:
      'An AI assistant trained on your prices, timings and policies answers customers on WhatsApp and your website, takes orders and bookings, and hands the conversation to a person when it should.',
    forWho: 'Restaurants, clinics, salons, shops and online stores that lose customers to unanswered messages.',
    examples: [
      { label: 'BizBot demo', href: '/demos/bizbot' },
      { label: 'FoodBot demo', href: '/demos/foodbot' },
      { label: 'SupportAI demo', href: '/demos/supportai' },
    ],
    tags: ['Gemini', 'Claude', 'WhatsApp Business'],
  },
  {
    id: 'automation',
    name: 'Automation',
    label: 'Booking, reminder & payment-collection systems',
    icon: 'bell',
    color: '#1a7fe6',
    tagline: 'The system remembers, so your staff don’t have to.',
    description:
      'Appointments without double bookings, digital queue tokens, and automatic WhatsApp reminders for fees, rent, invoices, refills and services — with a dashboard that shows who has paid.',
    forWho: 'Salons, clinics, pharmacies, schools, landlords, workshops and freelancers.',
    examples: [
      { label: 'SalonBook demo', href: '/demos/salonbook' },
      { label: 'ClinicToken demo', href: '/demos/clinictoken' },
      { label: 'FeeChaser demo', href: '/demos/feechaser' },
    ],
    tags: ['WhatsApp reminders', 'Dashboards', 'Payments'],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    label: 'E-commerce & TikTok Shop tools',
    icon: 'cart',
    color: '#FF9900',
    tagline: 'Fewer refused parcels, faster dispatch, one dashboard.',
    description:
      'COD order confirmation, automatic TikTok Shop fulfilment, one dashboard for several shops, order-status bots and product research — the tools online sellers need once orders start piling up.',
    forWho: 'Online sellers in Pakistan and TikTok Shop sellers and agencies in the UK.',
    examples: [
      { label: 'CODConfirm demo', href: '/demos/codconfirm' },
      { label: 'TikFulfill demo', href: '/demos/tikfulfill' },
      { label: 'ProfitScout', href: '/profitscout' },
    ],
    tags: ['TikTok Shop', 'COD', 'Chrome extensions'],
  },
  {
    id: 'custom-apps',
    name: 'Custom apps',
    label: 'Custom web, mobile & desktop apps',
    icon: 'app',
    color: '#10b981',
    tagline: 'Software shaped around how your business already works.',
    description:
      'CRMs, digital khata and profit dashboards, school management, ride-booking apps and offline Windows tools — built for your workflow, with your data in your hands.',
    forWho: 'Businesses that have outgrown notebooks, spreadsheets and WhatsApp groups.',
    examples: [
      { label: 'KhataBook demo', href: '/demos/khatabook' },
      { label: 'LeadCRM demo', href: '/demos/leadcrm' },
      { label: 'All projects', href: '/work' },
    ],
    tags: ['React', 'Flutter', 'Python', 'PostgreSQL'],
  },
  {
    id: 'websites',
    name: 'Websites',
    label: 'Business websites & 3D experiences',
    icon: 'globe',
    color: '#06b6d4',
    tagline: 'Fast sites that turn visitors into bookings.',
    description:
      'Clean business websites with service pages, reviews and WhatsApp booking built in — or an immersive 3D site when you want to stand out.',
    forWho: 'Clinics, firms and local businesses that need to be found and trusted online.',
    examples: [
      { label: '3D dental website', href: '/demos/family-dental/' },
      { label: 'Website demos', href: '/demos' },
    ],
    tags: ['React', 'Three.js', 'SEO'],
  },
  {
    id: 'government-systems',
    name: 'Office systems',
    label: 'Government & office systems',
    icon: 'landmark',
    color: '#f43f5e',
    tagline: 'One record, clear ownership, nothing lost between desks.',
    description:
      'Emergency coordination, file tracking and reporting systems for district offices — every case logged once, routed to the right officer, and tracked until it is closed.',
    forWho: 'District administrations, control rooms and government departments.',
    examples: [{ label: 'District Nerve Center', href: '/work#district-nerve-center' }],
    tags: ['PostgreSQL', 'WhatsApp alerts', 'Audit trails'],
  },
];
