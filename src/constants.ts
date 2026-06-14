import { Project, Testimonial, Skill, FAQ, SectionSettings } from './types';

/** Maps Firestore project titles → bundled SVG illustration paths.
 *  Used by ProjectCard when imageUrl is blank, a placeholder, or missing. */
export const PROJECT_LOGO_MAP: Record<string, string> = {
  'Amazon Product Hunting': '/projects/amazon-hunt.svg',
  'Nursing App': '/projects/nursing-app.svg',
};                                                                                                                                                                                     
  export const PROJECTS: Project[] = [
    {
      id: '1',
      title: 'SoftFlow SaaS',
      description: 'A comprehensive project management tool designed for teams to sync their workflow with high-performance architecture. Featuring real-time collaboration and AI-powered task prioritization.',
      category: 'SaaS',
      tags: ['React', 'Node.js', 'PostgreSQL', 'AI'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
      demoUrl: '#',
      downloadUrl: '#',
      stats: [{ label: 'Users', value: '10k+' }, { label: 'Uptime', value: '99.9%' }]
    },
    {
      id: '2',
      title: 'ZenEngine Web App',
      description: 'An immersive focus and meditation application that uses generative soundscapes to enhance productivity. Designed for deep work sessions.',
      category: 'Web App',
      tags: ['Next.js', 'WebAudio API', 'Framer Motion'],
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
      demoUrl: '#',
      downloadUrl: '#',
      stats: [{ label: 'Sessions', value: '50k+' }, { label: 'Rating', value: '4.9/5' }]
    },
    {
      id: '3',
      title: 'Pulse Analytics Tool',
      description: 'A light-weight, high-performance analytics dashboard that provides real-time insights into user behavior without compromising privacy.',
      category: 'Tool',
      tags: ['TypeScript', 'D3.js', 'Redis'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda38a6fba1?q=80&w=2070&auto=format&fit=crop',
      demoUrl: '#',
      downloadUrl: '#',
      stats: [{ label: 'Latency', value: '<50ms' }, { label: 'Data Points', value: '1M/day' }]
    },
    {
      id: '5',
      title: 'Amazon Product Hunting',
      description: 'A powerful desktop tool for Amazon FBA sellers to discover high-demand, low-competition products. Features real-time BSR tracking, competitor analysis, profit calculators, and keyword research — all in one streamlined dashboard.',
      category: 'Tool',
      tags: ['Python', 'Tkinter', 'Amazon API', 'Data Analytics'],
      imageUrl: '/projects/amazon-hunt.svg',
      demoUrl: '#',
      downloadUrl: '#',
      stats: [{ label: 'Products Scanned', value: '1M+' }, { label: 'Avg ROI', value: '3.2×' }]
    },
    {
      id: '6',
      title: 'Nursing App',
      description: 'A comprehensive mobile-first platform for nursing professionals. Manage patient care schedules, medication reminders, shift logs, and clinical notes with an intuitive interface built for high-pressure healthcare environments.',
      category: 'Web App',
      tags: ['React Native', 'Firebase', 'Healthcare', 'HIPAA'],
      imageUrl: '/projects/nursing-app.svg',
      demoUrl: '#',
      downloadUrl: '#',
      stats: [{ label: 'Patients Tracked', value: '500+' }, { label: 'Shift Accuracy', value: '99.8%' }]
    },
    {
      id: '7',
      title: 'Composer — AI OCR Scanner',
      description: 'An AI-powered document scanner that extracts text from any image instantly. Supports multi-page scanning, 10+ languages, Gemini AI engine with EasyOCR fallback, and installs as a PWA on mobile and desktop.',
      category: 'AI Tool',
      tags: ['Python', 'Gemini AI', 'OCR', 'Streamlit', 'PWA'],
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
      demoUrl: 'https://composer.aisofttechsolution.com',
      downloadUrl: '#',
      stats: [{ label: 'AI Engine', value: 'Gemini' }, { label: 'Languages', value: '10+' }]
    },
    {
      id: '8',
      title: 'ProfitScout — Chrome Extension',
      description: 'A 100% free Chrome extension for e-commerce product research. Analyze listings on Amazon, eBay, TikTok Shop, Walmart & Etsy with X-Ray niche scanning, ROI calculator, AI-powered insights via Gemini, lead manager, and price tracker — all in the browser, no sign-up needed.',
      category: 'Chrome Extension',
      tags: ['Chrome Extension', 'JavaScript', 'Gemini AI', 'Firebase', 'E-commerce'],
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
      demoUrl: 'https://aisofttechsolution.com/profitscout',
      downloadUrl: '#',
      stats: [{ label: 'Platforms', value: '12' }, { label: 'Price', value: 'Free' }]
    },
    {
      id: '4',
      title: 'School Finance System',
      description: 'A complete offline fee management system for Windows schools. Manage student records, collect fees, generate receipts, and track payments. Staff can access it from any PC on the school\'s network — no internet needed.',
      category: 'Desktop App',
      tags: ['Python', 'Flask', 'SQLite', 'Windows', 'Offline'],
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
      demoUrl: '#',
      downloadUrl: 'https://github.com/imtiazai004/school-finance-system/releases/download/v1.0/SchoolFinance-v1.0-Windows.zip',
      stats: [{ label: 'Platform', value: 'Windows' }, { label: 'Setup', value: '1 Click' }]
    }
  ];

  export const TESTIMONIALS: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Product Lead',
      company: 'TechFlow',
      content: 'The level of technical precision and creative flair brought to our project was exceptional. The results exceeded our expectations both in performance and design.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: '2',
      name: 'Marcus Thorne',
      role: 'Founder',
      company: 'SoftFlow Systems',
      content: "Working with Soft Tech Solution is a different experience. They don't just build features; they create experiences that resonate with users.",
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
    }
  ];

  export const SKILLS: Skill[] = [
    { name: 'TypeScript/Frontend', level: 95, iconName: 'Code' },
    { name: 'Full-stack Node.js', level: 90, iconName: 'Server' },
    { name: 'AI Integration', level: 85, iconName: 'Brain' },
    { name: 'UI/UX & Motion', level: 92, iconName: 'Layers' },
    { name: 'Performance Optimization', level: 88, iconName: 'Zap' }
  ];

export const FAQS: FAQ[] = [
  { id: '1', question: 'How long does a typical project take?', answer: 'Project timelines vary by scope. A landing page takes 1–2 weeks, a full web app 4–8 weeks, and enterprise systems 3–6 months. We provide a detailed timeline estimate during the free consultation before any work begins.', order: 1 },
  { id: '2', question: 'What technologies do you specialize in?', answer: 'Our core stack is React/Next.js, TypeScript, Node.js, and Firebase/PostgreSQL for web. We also work with React Native for mobile, Python for AI/ML integrations, and AWS/GCP for cloud infrastructure.', order: 2 },
  { id: '3', question: 'Do you offer ongoing support after launch?', answer: 'Yes. We offer flexible support plans: Basic (bug fixes only), Standard (monthly updates + monitoring), and Premium (dedicated developer on-call). All projects come with 30 days of free post-launch support.', order: 3 },
  { id: '4', question: 'How does your pricing work?', answer: 'We price per project, not per hour. After your free discovery call, we send a fixed-price proposal scoped to your requirements. No surprise invoices. For ongoing work, we offer monthly retainer arrangements.', order: 4 },
  { id: '5', question: 'Can you work with an existing codebase?', answer: 'Absolutely. We regularly audit, refactor, and extend existing systems. We start every legacy project with a technical audit to identify risks and opportunities before writing a single line of new code.', order: 5 },
  { id: '6', question: 'Do you sign NDAs and IP agreements?', answer: 'Yes. We sign NDAs before any confidential discussion and full IP assignment agreements are included in every project contract. You own 100% of the code, designs, and assets we produce for you.', order: 6 },
  { id: '7', question: 'Can you integrate AI into my existing product?', answer: 'Yes — this is one of our strongest capabilities. We integrate OpenAI, Gemini, and custom models via RAG pipelines, fine-tuning, or API orchestration depending on your needs and data sensitivity.', order: 7 },
  { id: '8', question: 'How do we get started?', answer: 'Click "Get Free Consultation" anywhere on the site, fill in a brief project description, and we will schedule a 30-minute discovery call within 24 hours. No commitment required at that stage.', order: 8 },
];

export const DEFAULT_SECTION_SETTINGS: SectionSettings = {
  clientLogos: true,
  about: true,
  services: true,
  projects: true,
  whyChooseUs: true,
  skills: true,
  testimonials: true,
  faq: true,
};
