import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Award, Clock, Zap, CheckCircle2, Globe } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { DEMO_APPS } from '../data/demos';
import { GUIDE_COUNT } from '../data/guides';
import { BUSINESS, FOUNDER } from '../config/business';

/* Every number here is counted from data in this repo — nothing to inflate, nothing to go stale. */
const STATS = [
  { value: String(PROJECTS.length), label: 'Products & apps built' },
  { value: String(DEMO_APPS.length), label: 'Live demos to try' },
  { value: String(GUIDE_COUNT), label: 'Free build guides' },
  { value: '<24h', label: 'Reply time' },
];

/** The founder/team card in this section is switched off for now. */
const SHOW_TEAM_CARD = false;

/** Skip the count-up for reduced-motion users and for headless prerendering, so the HTML always holds the real number. */
function shouldAnimate() {
  if (typeof window === 'undefined') return false;
  if (navigator.webdriver) return false;
  return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/* Counts up to the numeric part of a value when scrolled into view (IntersectionObserver). */
function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const match = value.match(/^(\D*)([\d.]+)(\D*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : value;
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0;
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldAnimate()) return;
    // Only animate numbers that start below the fold; anything already visible just shows its value.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setDisplay(0);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setDisplay(target * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(target);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{display.toFixed(decimals)}{suffix}</span>;
}

const HIGHLIGHTS = [
  'WhatsApp & website AI assistants',
  'Booking, reminder & payment-collection systems',
  'TikTok Shop & e-commerce automation',
  'Custom web, mobile & desktop apps',
  'Fixed-price quote after a free call',
  '30 days of free support after launch',
];

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-32 px-6 relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center [&>*]:min-w-0">

          {/* Left — Story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/10 bg-slate-900/[0.04] text-xs font-semibold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                Who we are
              </div>
              <h2 id="about-heading" className="text-4xl md:text-6xl font-display font-medium text-slate-900 tracking-tight leading-tight">
                A small studio <br />
                <span className="text-brand-accent italic">that ships real products</span>
              </h2>
              <p className="text-slate-600 text-xl leading-relaxed">
                {BUSINESS.brandName} builds AI assistants, automation systems and custom apps for online sellers, shops,
                clinics, schools and government offices. We also build and run our own products — Soft Clipper,
                ProfitScout and the District Nerve Center.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                The company is registered in England and Wales as {BUSINESS.legalCompanyName}. We work with clients in
                the UK and Pakistan over WhatsApp, email and video calls.
              </p>
            </div>

            {/* Founder / team card — hidden for now; set SHOW_TEAM_CARD to true to bring it back. */}
            {SHOW_TEAM_CARD && <div className="flex items-center gap-6 p-6 bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-2xl font-display font-black text-brand-accent shrink-0">
                IA
              </div>
              <div>
                <p className="font-display font-medium text-slate-900 text-lg">
                  <a href={FOUNDER.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">{FOUNDER.name}</a>
                </p>
                <p className="text-xs font-semibold text-brand-accent mt-0.5">{FOUNDER.jobTitle}</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">Builds with AI coding agents to ship working software fast — from WhatsApp bots to a district emergency platform.</p>
              </div>
            </div>}

            <motion.button
              whileHover={{ scale: 1.02, x: 6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 text-brand-accent font-bold text-sm group"
            >
              Start a conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right — Stats + Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Stats — single horizontal bar, 4 columns with thin dividers + count-up */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:divide-x divide-slate-900/10">
              {STATS.map((stat, i) => (
                <div key={i} className="px-3 sm:px-4 text-center flex flex-col-reverse">
                  <dt className="text-xs font-semibold text-slate-500 mt-2">{stat.label}</dt>
                  <dd className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-accent tracking-tighter tabular-nums">
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>

            {/* Highlights */}
            <div className="p-8 bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl space-y-4">
              <p className="text-xs font-semibold text-brand-accent mb-6">What we deliver</p>
              <div className="grid grid-cols-1 gap-3">
                {HIGHLIGHTS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Globe, text: 'UK-registered company' },
                { icon: Clock, text: 'Reply within 24h' },
                { icon: Award, text: 'NDA on request' },
                { icon: Zap, text: 'Fixed-price quotes' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-900/[0.03] border border-slate-900/10 rounded-full text-xs font-semibold text-slate-600">
                  <Icon className="w-3 h-3 text-brand-accent" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
