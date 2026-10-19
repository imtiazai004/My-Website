import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, Cpu, MonitorPlay, Receipt, Rocket, LifeBuoy,
  MousePointerClick, X, ArrowRight, Activity, Lock, Workflow
} from 'lucide-react';
import { DEMO_APPS, DEMO_INDUSTRIES } from '../data/demos';
import { PROJECTS } from '../data/projects';

// Every claim here is a commitment already in our FAQ and contracts — no invented metrics.
const REASONS = [
  {
    id: 'demos',
    title: 'Try it before you pay',
    description: `Most problems we solve already have a working demo. Open it, click around, then decide — and ask for a free preview set up for your business.`,
    icon: MonitorPlay,
    stat: String(DEMO_APPS.length),
    statLabel: 'Live demos',
    details: {
      metrics: [
        { label: 'Working demos', value: String(DEMO_APPS.length) },
        { label: 'Industries covered', value: String(DEMO_INDUSTRIES.length) },
        { label: 'Preview for your business', value: 'Free' },
      ],
      points: ['Real apps you can click through, not screenshots', 'Covers shops, clinics, schools, property, e-commerce and more', 'A free, no-obligation preview for your own business'],
    },
  },
  {
    id: 'price',
    title: 'Fixed price, in writing',
    description: 'We price per project, not per hour. After a free discovery call you get a written, fixed-price proposal — no surprise invoices.',
    icon: Receipt,
    stat: 'Fixed',
    statLabel: 'Project price',
    details: {
      metrics: [
        { label: 'Discovery call', value: '30 min' },
        { label: 'Cost of the call', value: 'Free' },
        { label: 'Billing', value: 'Per project' },
      ],
      points: ['Free 30-minute discovery call', 'Written fixed-price proposal before any work starts', 'Monthly retainer only if you want ongoing work'],
    },
  },
  {
    id: 'ai',
    title: 'AI that does real work',
    description: 'Our assistants answer customers, confirm orders and send reminders on WhatsApp and your website — trained on your own prices, timings and policies.',
    icon: Cpu,
    stat: '24/7',
    statLabel: 'Replies to customers',
    details: {
      metrics: [
        { label: 'Channels', value: 'WhatsApp + web' },
        { label: 'Languages', value: 'English + Urdu' },
        { label: 'Models', value: 'Gemini, Claude' },
      ],
      points: ['Answers from your own business information', 'Hands the chat to a person when it should', 'Works in English and Urdu'],
    },
  },
  {
    id: 'products',
    title: 'We run our own products',
    description: 'Soft Clipper, ProfitScout and the District Nerve Center are built and run by us — the same team that builds your software.',
    icon: Rocket,
    stat: String(PROJECTS.filter((p) => ['In daily use', 'Live product', 'Live'].includes(p.status)).length),
    statLabel: 'Live products',
    details: {
      metrics: [
        { label: 'Projects on our work page', value: String(PROJECTS.length) },
        { label: 'Live or in daily use', value: String(PROJECTS.filter((p) => ['In daily use', 'Live product', 'Live'].includes(p.status)).length) },
        { label: 'Open source', value: String(PROJECTS.filter((p) => p.status === 'Open source').length) },
      ],
      points: ['District Nerve Center — in daily use at a district control room', 'Soft Clipper — a paid desktop app', 'ProfitScout — a free Chrome extension'],
    },
  },
  {
    id: 'ownership',
    title: 'You own everything',
    description: 'We sign an NDA before any confidential discussion, and every contract assigns 100% of the code, designs and assets to you.',
    icon: ShieldCheck,
    stat: '100%',
    statLabel: 'IP assigned to you',
    details: {
      metrics: [
        { label: 'NDA', value: 'Before we talk details' },
        { label: 'IP ownership', value: 'Yours' },
        { label: 'Source code', value: 'Handed over' },
      ],
      points: ['NDA before any confidential discussion', 'Full IP assignment in every contract', 'Source code and accounts handed over at the end'],
    },
  },
  {
    id: 'support',
    title: 'Support after launch',
    description: 'Every project includes 30 days of free fixes after launch, and we reply within 24 hours. Ongoing plans are there if you want them.',
    icon: LifeBuoy,
    stat: '30 days',
    statLabel: 'Free support',
    details: {
      metrics: [
        { label: 'Free support', value: '30 days' },
        { label: 'Reply time', value: '< 24h' },
        { label: 'Ongoing plans', value: '3 levels' },
      ],
      points: ['30 days of free post-launch fixes', 'Basic, Standard or Premium plans afterwards', 'WhatsApp and email support'],
    },
  },
];

function ReasonCard({ reason, index, onClick }: { reason: typeof REASONS[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setTiltStyle({
      transform: `perspective(900px) rotateX(${(y - 0.5) * -12}deg) rotateY(${(x - 0.5) * 12}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.1s ease-out',
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const onLeave = () => {
    setTiltStyle({
      transform: 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)',
      transition: 'transform 0.5s ease-out',
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={tiltStyle}
      className="relative group p-8 border border-slate-900/10 bg-slate-900/[0.03] rounded-3xl cursor-pointer overflow-hidden"
    >
      {/* Mouse-follow glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(26,127,230,0.13) 0%, transparent 60%)` }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-300 relative z-10">
        <reason.icon className="w-6 h-6 group-hover:text-white transition-colors" />
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-display font-medium text-slate-900 group-hover:text-brand-accent transition-colors">
            {reason.title}
          </h4>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-accent group-hover:translate-x-1 transition-all shrink-0" />
        </div>
        <p className="text-sm text-slate-500 leading-relaxed font-light">{reason.description}</p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-900/[0.07] flex items-end justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-2xl font-display font-bold text-slate-900 tracking-tighter">{reason.stat}</p>
          <p className="text-xs font-semibold text-slate-500">{reason.statLabel}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedReason = REASONS.find(r => r.id === selectedId);

  return (
    <section id="why-choose-us" className="py-32 px-6 relative bg-[#f1f5f9] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.015] pointer-events-none select-none overflow-hidden">
        <div className="text-[20rem] font-black font-mono leading-none rotate-90 translate-x-1/2 text-slate-900/[0.04]">
          WHY US
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Sticky Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/10 bg-slate-900/[0.04] text-[10px] font-bold tracking-[0.2em] text-slate-500"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Why work with us
            </motion.div>

            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-display font-medium text-slate-900 leading-tight tracking-tight"
              >
                Why businesses <span className="text-brand-accent italic">choose</span> us
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-xl font-light leading-relaxed max-w-md"
              >
                Proof over promises: working demos, fixed prices, and products we run ourselves.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-brand-accent/10 border border-brand-accent/20 rounded-[2rem] text-slate-800 space-y-6 relative overflow-hidden group"
            >
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-display font-medium">Not sure what you need?</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Tell us the problem in two lines. We reply within 24 hours with the demo that fits — or a plan if none does.
                </p>
                <button
                  className="flex items-center gap-2 text-brand-accent font-bold text-sm group-hover:gap-4 transition-all"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book a free call <MousePointerClick className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-accent/20 blur-[80px] group-hover:bg-brand-accent/40 transition-all duration-700" />
            </motion.div>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {REASONS.map((reason, index) => (
              <ReasonCard
                key={reason.id}
                reason={reason}
                index={index}
                onClick={() => setSelectedId(reason.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedId && selectedReason && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xl"
            />
            <motion.div
              layoutId={selectedId}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="w-full max-w-4xl bg-white border border-slate-900/10 rounded-[3rem] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row"
            >
              {/* Sidebar */}
              <div className="md:w-1/3 bg-slate-50 p-12 text-slate-900 flex flex-col justify-between relative overflow-hidden border-r border-slate-900/[0.07]">
                <div className="relative z-10">
                  <selectedReason.icon className="w-12 h-12 text-brand-accent mb-8" />
                  <h3 className="text-3xl font-display font-medium leading-tight">{selectedReason.title}</h3>
                </div>
                <div className="space-y-8 relative z-10">
                  {selectedReason.details.metrics.map((m, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-brand-accent text-3xl font-display font-bold tracking-tighter">{m.value}</p>
                      <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 pointer-events-none">
                  <div className="w-full h-full border border-brand-accent/30 rounded-full" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-12 space-y-10 relative bg-white">
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-900/[0.06] transition-colors text-slate-500 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-brand-accent uppercase tracking-[0.2em]">In short</h4>
                  <p className="text-xl text-slate-600 font-light leading-relaxed italic">
                    "{selectedReason.description}"
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">What you get</h4>
                  <div className="space-y-4">
                    {selectedReason.details.points.map((point, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="mt-1 w-5 h-5 rounded-md bg-brand-accent/10 text-brand-accent border border-brand-accent/20 flex items-center justify-center shrink-0">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                        <p className="text-slate-500 font-medium leading-normal">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-900/[0.07] flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-brand-accent" />
                      <span className="text-[10px] font-mono text-slate-400 font-bold">STATUS: STABLE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-brand-accent" />
                      <span className="text-[10px] font-mono text-slate-400 font-bold">ENCRYPTION: ACTIVE</span>
                    </div>
                  </div>
                  <button
                    className="px-6 py-3 bg-brand-accent text-white rounded-full text-xs font-bold hover:bg-blue-400 transition-all flex items-center gap-2"
                    onClick={() => { setSelectedId(null); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    Request Docs <Workflow className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
