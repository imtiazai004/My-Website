import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2, Smartphone, BrainCircuit, Cloud, Globe, Terminal,
  ArrowRight, Sparkles, FileText, Layers,
} from 'lucide-react';

const SERVICES = [
  {
    name: 'Full-Stack',
    label: 'Full-Stack Web Development',
    icon: Globe,
    tagline: 'Pixel-perfect web apps that convert.',
    description: 'High-performance, SEO-optimized applications with server-side rendering and edge computing for sub-500ms global load times.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
  },
  {
    name: 'Mobile',
    label: 'Mobile App Engineering',
    icon: Smartphone,
    tagline: 'Native-quality apps from a single codebase.',
    description: 'Gesture-driven, offline-first iOS & Android experiences — from initial wireframe all the way to App Store deployment.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    name: 'AI / LLM',
    label: 'AI & LLM Integration',
    icon: BrainCircuit,
    tagline: 'Intelligent automation that actually works.',
    description: 'Gemini & OpenAI integration via RAG pipelines, custom models, and semantic search that turns your data into leverage.',
    tags: ['Gemini', 'OpenAI', 'RAG', 'NLP'],
  },
  {
    name: 'Cloud',
    label: 'Cloud Infrastructure & DevOps',
    icon: Cloud,
    tagline: 'Resilient, auto-scaling infrastructure.',
    description: 'Cloud-native systems on AWS & GCP with zero-downtime CI/CD pipelines and 99.99% reliability, built as infrastructure-as-code.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    name: 'API',
    label: 'Custom API Development',
    icon: Code2,
    tagline: 'The connective tissue of your stack.',
    description: 'Secure, high-throughput REST & GraphQL APIs with robust versioning, rate limiting, and comprehensive documentation.',
    tags: ['GraphQL', 'REST', 'Microservices', 'OAuth'],
  },
  {
    name: 'Enterprise',
    label: 'Enterprise Software',
    icon: Terminal,
    tagline: 'Bespoke tools that simplify operations.',
    description: 'Tailored ERP systems, internal dashboards, and mission-critical software with multi-tenancy and role-based access control.',
    tags: ['Dashboards', 'ERP', 'RBAC', 'SQL'],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];
  const Icon = svc.icon;
  const progress = ((active + 1) / SERVICES.length) * 100;

  return (
    <section id="services" className="py-32 px-6 relative bg-[#f1f5f9] overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/10 bg-slate-900/[0.03] text-[10px] font-bold tracking-[0.2em] text-slate-500 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            OUR_SPECIALIZED_VECTORS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-medium text-slate-900 tracking-tight leading-tight">
            Services We <span className="text-brand-accent italic">Offer</span>
          </h2>
          <p className="text-slate-500 text-xl font-light leading-relaxed mt-5">
            Comprehensive engineering solutions tailored for the modern digital era — pick a vector to explore.
          </p>
        </div>

        {/* Two-column tabbed layout */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">

          {/* Left — vertical tab list */}
          <div className="flex flex-col gap-2">
            {SERVICES.map((s, i) => {
              const TabIcon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.name}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300 border ${
                    isActive
                      ? 'bg-white border-slate-900/10 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.15)]'
                      : 'bg-transparent border-transparent hover:bg-white/60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive ? 'bg-brand-accent text-white' : 'bg-slate-900/[0.05] text-slate-500 group-hover:text-brand-accent'
                  }`}>
                    <TabIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-semibold text-sm transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
                      {s.name}
                    </p>
                  </div>
                  <ArrowRight className={`w-4 h-4 ml-auto shrink-0 transition-all ${isActive ? 'text-brand-accent translate-x-0 opacity-100' : 'text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>

          {/* Right — 2×2 bento grid */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {/* Cell 1 — Icon + name (featured) */}
                <div className="bg-gradient-to-br from-brand-accent to-blue-500 rounded-2xl p-6 flex flex-col justify-between min-h-[180px] text-white">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold leading-tight mt-6">{svc.label}</h3>
                </div>

                {/* Cell 2 — Tagline */}
                <div className="bg-white border border-slate-900/10 rounded-2xl p-6 flex flex-col min-h-[180px]">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-3">
                    <Sparkles className="w-3.5 h-3.5" /> The Promise
                  </div>
                  <p className="text-xl md:text-2xl font-display font-medium text-slate-900 leading-snug">
                    {svc.tagline}
                  </p>
                </div>

                {/* Cell 3 — Short description */}
                <div className="bg-white border border-slate-900/10 rounded-2xl p-6 flex flex-col min-h-[180px]">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    <FileText className="w-3.5 h-3.5" /> What We Do
                  </div>
                  <p className="text-slate-600 text-base font-light leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Cell 4 — Tech stack pills */}
                <div className="bg-white border border-slate-900/10 rounded-2xl p-6 flex flex-col min-h-[180px]">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                    <Layers className="w-3.5 h-3.5" /> Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2 content-start">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/10 text-xs font-semibold text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar — fills as you switch tabs */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  Vector {String(active + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-accent">
                  {svc.name}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-900/10 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-brand-accent rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
