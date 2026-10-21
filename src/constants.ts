import { FAQ, SectionSettings } from './types';
import { BUSINESS, PAYMENT_DISCLOSURE } from './config/business';
import { DEMO_APPS } from './data/demos';

// Projects live in src/data/projects.ts, services in src/data/services.ts.
// There are deliberately no placeholder testimonials anywhere in the code.

export const BILLING_FAQ: FAQ = {
  id: 'billing-statement-descriptor',
  question: `Why does ${BUSINESS.statementDescriptor} appear on my bank statement?`,
  answer: `${BUSINESS.statementDescriptor} is our payment statement descriptor. ${PAYMENT_DISCLOSURE} ${BUSINESS.brandName} is operated by ${BUSINESS.legalCompanyName}.`,
  order: 11,
};

export const FAQS: FAQ[] = [
  { id: '9', question: 'Can I see your work before hiring you?', answer: `Yes. You can try ${DEMO_APPS.length} working demos at aisofttechsolution.com/demos and see the products we built and run at /work.`, order: 1 },
  { id: '1', question: 'How long does a typical project take?', answer: 'Project timelines vary by scope. A landing page takes 1–2 weeks, a full web app 4–8 weeks, and larger systems 3–6 months. We give you a detailed timeline during the free consultation before any work begins.', order: 2 },
  { id: '4', question: 'How does your pricing work?', answer: 'We price per project, not per hour. After your free discovery call, we send a fixed-price proposal scoped to your requirements. No surprise invoices. For ongoing work, we offer monthly retainer arrangements.', order: 3 },
  { id: '2', question: 'What technologies do you use?', answer: 'React and TypeScript for web apps, Node.js and Python (FastAPI, Flask) on the server, PostgreSQL, Supabase or Firebase for data, Flutter for mobile apps, and Gemini, Claude and OpenAI models for AI features. We pick what fits your project and budget.', order: 4 },
  { id: '7', question: 'Can you integrate AI into my existing business?', answer: 'Yes — this is our core work. We build WhatsApp and website assistants that answer from your own business information, document readers that turn photos and PDFs into text, and automations that confirm orders or send reminders inside the tools you already use.', order: 5 },
  { id: '10', question: 'Do you work with clients in the UK and Pakistan?', answer: `Yes. The company is registered in England and Wales as ${BUSINESS.legalCompanyName}, and we work with clients in the UK and Pakistan over WhatsApp (${BUSINESS.whatsapp.uk.display} and ${BUSINESS.whatsapp.pk.display}), email and video calls.`, order: 6 },
  { id: '3', question: 'Do you offer ongoing support after launch?', answer: 'Yes. Every project comes with 30 days of free post-launch support. After that we offer Basic (bug fixes only), Standard (monthly updates + monitoring) and Premium (dedicated developer on-call) plans.', order: 7 },
  { id: '5', question: 'Can you work with an existing codebase?', answer: 'Yes. We regularly audit, refactor and extend existing systems, starting with a technical review to identify risks before writing new code.', order: 8 },
  { id: '6', question: 'Do you sign NDAs and IP agreements?', answer: 'Yes. We sign NDAs before any confidential discussion and full IP assignment agreements are included in every project contract. You own 100% of the code, designs and assets we produce for you.', order: 9 },
  { id: '8', question: 'How do we get started?', answer: 'Message us on WhatsApp or use the contact form with two lines about your project. We reply within 24 hours and book a free 30-minute discovery call. No commitment required at that stage.', order: 10 },
  BILLING_FAQ,
];

export const DEFAULT_SECTION_SETTINGS: SectionSettings = {
  clientLogos: true,
  about: true,
  services: true,
  projects: true,
  whyChooseUs: true,
  skills: false,
  testimonials: true,
  faq: true,
};
