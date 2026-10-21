/** Website demos built for clinics and local businesses (hosted separately). */
export interface Demo {
  id: string;
  client: string;
  title: string;
  description: string;
  category: string;
  url: string;
  /** If set, the demo is passcode-gated. The passcode itself is never shown publicly. */
  passcodeProtected?: boolean;
  dateAdded: string;
  featured?: boolean;
  /** Gradient classes for the card thumbnail */
  gradient: string;
}

export const DEMOS: Demo[] = [
  {
    id: 'family-dental-3d-immersive',
    client: 'Family Dental & Aesthetic Clinic',
    title: 'Immersive 3D Website',
    description:
      'A cinematic 3D scroll experience — take a tooth apart layer by layer, explore treatments in interactive 3D, and book through an on-page assistant.',
    category: '3D Experience',
    url: '/demos/family-dental/',
    dateAdded: '8 Oct 2026',
    featured: true,
    gradient: 'from-indigo-500 via-purple-500 to-fuchsia-500',
  },
  {
    id: 'family-dental-simple',
    client: 'Family Dental & Aesthetic Clinic',
    title: 'Simple Website',
    description:
      'Clean and fast clinic website — home, about, services with 15 treatment pages, reviews and contact, with a chat booking assistant built in.',
    category: 'Business Website',
    url: 'https://flourishing-figolla-d8bb17.netlify.app/',
    dateAdded: '8 Oct 2026',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
  },
  {
    id: 'sinma-hair-3d-immersive',
    client: 'Sinma Hair And Beauty',
    title: 'Immersive 3D Website',
    description:
      'A cinematic 3D salon website — floating 3D cards and a rotating 3D gallery, online booking, a 24/7 assistant and WhatsApp automation that confirms every booking and reminds every client.',
    category: '3D Experience',
    url: '/demos/sinma-3d/',
    dateAdded: '21 Oct 2026',
    gradient: 'from-fuchsia-500 via-purple-600 to-indigo-600',
  },
  {
    id: 'sinma-hair-simple',
    client: 'Sinma Hair And Beauty',
    title: 'Simple Website',
    description:
      'Clean and fast salon website — services, gallery and contact, with online booking, a chat booking assistant and WhatsApp confirmations and reminders built in.',
    category: 'Business Website',
    url: '/demos/sinma-classic/',
    dateAdded: '21 Oct 2026',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
  },
  {
    id: 'sinma-hair-owner-dashboard',
    client: 'Sinma Hair And Beauty',
    title: 'Owner Booking Dashboard',
    description:
      'Every booking from the website form and chatbot lands in one dashboard — today’s schedule, revenue in £, client history, double-booking protection and WhatsApp alerts and reminders. Try a booking and watch it appear live.',
    category: 'Booking Dashboard',
    url: '/demos/sinma-dashboard/',
    dateAdded: '21 Oct 2026',
    gradient: 'from-indigo-500 via-violet-500 to-purple-500',
  },
];

/**
 * Working business-app demos served from /public/demos/<slug>/. Each one
 * solves one problem we write about on the blog (`post`). Thumbnails are
 * real screenshots in /public/demos/thumbs/<slug>.webp.
 */
export interface DemoApp {
  slug: string;
  name: string;
  /** The problem it solves, in one line. */
  problem: string;
  /** What the demo shows. */
  description: string;
  industry: 'Retail & shops' | 'E-commerce' | 'Food & hospitality' | 'Health' | 'Education & fitness' | 'Property & venues' | 'Services & trades' | 'Sales & admin';
  /** Blog post that explains the problem. */
  post?: string;
}

export const DEMO_APPS: DemoApp[] = [
  { slug: 'bizbot', name: 'BizBot', industry: 'Sales & admin', post: 'ai-assistant-whatsapp-website-any-business',
    problem: 'Customers message after hours and buy elsewhere.',
    description: 'An AI assistant for any business that answers on WhatsApp and the website 24/7, in English or Urdu.' },
  { slug: 'foodbot', name: 'FoodBot', industry: 'Food & hospitality', post: 'whatsapp-ai-restaurant-ordering',
    problem: 'Rush-hour calls go unanswered and orders go to competitors.',
    description: 'A WhatsApp ordering bot that takes the menu order, confirms it and sends it to the kitchen.' },
  { slug: 'supportai', name: 'SupportAI', industry: 'E-commerce', post: 'wismo-most-expensive-sentence',
    problem: '“Where is my order?” eats hours of support time.',
    description: 'An AI support agent connected to order and courier data that gives real tracking answers instantly.' },
  { slug: 'codconfirm', name: 'CODConfirm', industry: 'E-commerce', post: 'unconfirmed-cod-orders',
    problem: 'Unconfirmed cash-on-delivery orders get refused at the door.',
    description: 'Confirms every COD order on WhatsApp before it ships, so fake and impulse orders never leave the warehouse.' },
  { slug: 'tikfulfill', name: 'TikFulfill', industry: 'E-commerce', post: 'tiktok-shop-dispatch-penalty',
    problem: 'A viral day means hundreds of orders and missed dispatch deadlines.',
    description: 'Automatic TikTok Shop fulfilment: orders pulled in, labels printed and dispatch tracked against the deadline.' },
  { slug: 'shopconsole', name: 'ShopConsole', industry: 'E-commerce', post: 'multiple-tiktok-shops-one-dashboard',
    problem: 'Five TikTok shops, five logins, no idea where the money is.',
    description: 'One dashboard for every TikTok shop: orders, revenue and stock side by side.' },
  { slug: 'khatabook', name: 'KhataBook', industry: 'Retail & shops', post: 'digital-khata-udhaar-notebook',
    problem: 'Udhaar in paper notebooks quietly goes missing.',
    description: 'A digital khata for shopkeepers that records credit and sends polite WhatsApp payment reminders.' },
  { slug: 'profitlens', name: 'ProfitLens', industry: 'Retail & shops', post: 'shopkeeper-real-profit',
    problem: 'Sales are up but the shopkeeper doesn’t know the real profit.',
    description: 'Shows real daily profit after costs, so the owner sees whether the shop is growing or just busy.' },
  { slug: 'expiryguard', name: 'ExpiryGuard', industry: 'Retail & shops', post: 'expired-stock-customer-complaints',
    problem: 'Expired stock reaches customers and costs trust.',
    description: 'Tracks batch expiry dates and warns before stock goes bad, so nothing expired is sold.' },
  { slug: 'salonbook', name: 'SalonBook', industry: 'Services & trades', post: 'salon-empty-chair',
    problem: 'Double bookings and no-shows leave chairs empty.',
    description: 'Salon booking with locked slots, automatic WhatsApp reminders and client history.' },
  { slug: 'clinictoken', name: 'ClinicToken', industry: 'Health', post: 'clinic-patient-token-queues',
    problem: 'Patients wait for hours with no idea when their turn comes.',
    description: 'Digital patient tokens with live queue status, so patients arrive when it is nearly their turn.' },
  { slug: 'scriptrefill', name: 'ScriptRefill', industry: 'Health', post: 'pharmacy-refill-reminders',
    problem: 'Regular patients run out of medicine and buy elsewhere.',
    description: 'Refill reminders for pharmacies that bring chronic patients back before their medicine runs out.' },
  { slug: 'feechaser', name: 'FeeChaser', industry: 'Education & fitness', post: 'school-fee-defaulters-reminders',
    problem: 'Teachers spend mornings chasing unpaid fees.',
    description: 'A fee-collection dashboard for schools with automatic reminders to parents and a live defaulters list.' },
  { slug: 'classflow', name: 'ClassFlow', industry: 'Education & fitness', post: 'gym-membership-churn-early-warning',
    problem: 'Gym members quit in month three without warning.',
    description: 'Flags members whose attendance is dropping so the gym can win them back early.' },
  { slug: 'rentguard', name: 'RentGuard', industry: 'Property & venues', post: 'late-rent-reminders-property-managers',
    problem: 'Rent arrives late because reminders live on paper.',
    description: 'A rent-collection dashboard with automatic follow-ups for landlords and property managers.' },
  { slug: 'viewbook', name: 'ViewBook', industry: 'Property & venues', post: 'real-estate-viewing-no-shows',
    problem: 'Viewing no-shows and cold buyers cost agents sales.',
    description: 'Property-viewing booking with confirmations, reminders and follow-ups after every visit.' },
  { slug: 'hallbook', name: 'HallBook', industry: 'Property & venues', post: 'wedding-hall-double-booking',
    problem: 'One double-booked hall is a reputation disaster.',
    description: 'Wedding-hall booking that locks dates, tracks vendors and chases payment milestones.' },
  { slug: 'leasemind', name: 'LeaseMind', industry: 'Property & venues', post: 'coworking-space-booking-chaos',
    problem: 'Room bookings in WhatsApp chats and invoices from memory.',
    description: 'Room and seat booking plus invoicing for co-working spaces.' },
  { slug: 'jobtrack', name: 'JobTrack', industry: 'Services & trades', post: 'home-service-job-scheduling-chaos',
    problem: 'Jobs in a notebook and customers asking where the technician is.',
    description: 'One board for every job, technician and quote, with WhatsApp updates to customers.' },
  { slug: 'carcare', name: 'CarCare', industry: 'Services & trades', post: 'auto-workshop-service-reminders',
    problem: 'Customers forget their car service and go elsewhere.',
    description: 'Digital job cards and service-due reminders for auto workshops.' },
  { slug: 'leadcrm', name: 'LeadCRM', industry: 'Sales & admin', post: 'cold-leads-buried-money',
    problem: 'Warm leads die in spreadsheets and inboxes.',
    description: 'A simple CRM that keeps every lead, conversation and follow-up in one place.' },
  { slug: 'proposalgen', name: 'ProposalGen', industry: 'Sales & admin', post: 'slow-proposals-lose-clients',
    problem: 'Two days writing a proposal while the client hires someone else.',
    description: 'Branded proposals in minutes — sent, tracked when opened, and accepted online.' },
  { slug: 'invoicechaser', name: 'InvoiceChaser', industry: 'Sales & admin', post: 'freelancer-invoice-chasing',
    problem: 'Freelancers spend hours chasing their own payments.',
    description: 'Automatic invoice reminder sequences with templates and payment links.' },
  { slug: 'hirepipe', name: 'HirePipe', industry: 'Sales & admin', post: 'candidate-ghosting-recruiters',
    problem: 'Great candidates accept other offers while hiring stalls.',
    description: 'A hiring pipeline with interview scheduling and candidate follow-ups.' },
];

/** Display order on /demos — our core customers first. */
export const DEMO_INDUSTRIES: DemoApp['industry'][] = [
  'E-commerce',
  'Retail & shops',
  'Food & hospitality',
  'Health',
  'Services & trades',
  'Education & fitness',
  'Property & venues',
  'Sales & admin',
];
