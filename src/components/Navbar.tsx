import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import {
  Globe, Smartphone, MonitorSmartphone, Building2, Brain,
  ShoppingCart, Server, Blocks, Code2, Briefcase,
  ChevronDown, ArrowRight, Mail, MessageCircle,
  Layers, Star, Cpu, Users, HelpCircle, X, Menu,
  Zap, Shield, BarChart3, Bot,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────── */

const SERVICES = [
  { icon: Globe,            label: 'Website Development',   desc: 'Fast, responsive sites that convert',        color: '#6366f1' },
  { icon: MonitorSmartphone,label: 'Web App Development',   desc: 'Powerful browser-based applications',        color: '#8b5cf6' },
  { icon: Smartphone,       label: 'Mobile App Development',desc: 'Native iOS & Android experiences',           color: '#06b6d4' },
  { icon: Code2,            label: 'App Development',       desc: 'Cross-platform apps built to scale',         color: '#10b981' },
  { icon: Building2,        label: 'Business Websites',     desc: 'Professional sites for growing businesses',  color: '#f59e0b' },
  { icon: Briefcase,        label: 'Firm & Agency Sites',   desc: 'Authority-driven sites for law & finance',   color: '#f43f5e' },
  { icon: Brain,            label: 'AI Automation',         desc: 'Intelligent workflows that save hours',       color: '#a855f7' },
  { icon: ShoppingCart,     label: 'E-commerce Solutions',  desc: 'Stores that sell while you sleep',           color: '#FF9900' },
  { icon: Server,           label: 'SaaS Development',      desc: 'Scalable software-as-a-service platforms',   color: '#6366f1' },
  { icon: Blocks,           label: 'API & Integrations',    desc: 'Connect your systems seamlessly',            color: '#06b6d4' },
  { icon: Bot,              label: 'Chatbot & AI Agents',   desc: 'Deploy AI that handles queries 24/7',        color: '#a855f7' },
  { icon: Shield,           label: 'Security & Compliance', desc: 'Harden your stack against threats',         color: '#ef4444' },
];

const WORK_ITEMS = [
  { icon: Layers,    label: 'All Projects',      desc: 'Browse our full portfolio',            href: '#work' },
  { icon: Server,    label: 'SaaS Platforms',    desc: 'Enterprise-grade software products',   href: '#work' },
  { icon: Globe,     label: 'Web Applications',  desc: 'Complex, interactive systems',         href: '#work' },
  { icon: Smartphone,label: 'Mobile Apps',       desc: 'iOS & Android experiences',            href: '#work' },
  { icon: Bot,       label: 'AI Solutions',      desc: 'Machine learning in production',       href: '#work' },
  { icon: Cpu,       label: 'Desktop Tools',     desc: 'Windows & macOS applications',         href: '#work' },
];

const COMPANY_ITEMS = [
  { icon: Users,      label: 'About Us',       desc: 'Our story, mission & team',      href: '#about' },
  { icon: Star,       label: 'Why Choose Us',  desc: 'What sets us apart',             href: '#whyChooseUs' },
  { icon: BarChart3,  label: 'Our Tech Stack', desc: 'Technologies we master',         href: '#skills' },
  { icon: HelpCircle, label: 'FAQ',            desc: 'Common questions answered',      href: '#faq' },
  { icon: Zap,        label: 'Testimonials',   desc: 'What our clients say',           href: '#testimonials' },
];

const CONTACT_ITEMS = [
  { icon: Mail,          label: 'Email Us',       desc: 'info@aisofttechsolution.com', href: 'mailto:info@aisofttechsolution.com' },
  { icon: MessageCircle, label: 'WhatsApp (UK)',  desc: '+44 7462 086661',             href: 'https://wa.me/447462086661' },
  { icon: MessageCircle, label: 'WhatsApp (PK)',  desc: '+92 300 5863032',             href: 'https://wa.me/923005863032' },
];

type DropdownKey = 'services' | 'work' | 'company' | 'contact' | null;

/* ─── Dropdown panel variants ────────────────────────────────── */
const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 6 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.2, ease: 'easeOut' } }),
};

/* ─── Reusable service card ──────────────────────────────────── */
function ServiceCard({ item, index, onClick }: { item: typeof SERVICES[0]; index: number; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <motion.button
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-900/[0.04] transition-all duration-200 group text-left w-full"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
        style={{ backgroundColor: `${item.color}18`, color: item.color }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[12px] font-semibold text-slate-700 group-hover:text-slate-900 leading-tight">{item.label}</p>
        <p className="text-[11px] text-slate-500 group-hover:text-slate-600 leading-tight mt-0.5">{item.desc}</p>
      </div>
    </motion.button>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setOpen(null);
    setMobileOpen(false);
    const id = href.replace('#', '');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, []);

  const handleMouseEnter = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'border-b border-slate-900/10 bg-slate-900/40 backdrop-blur-xl shadow-[0_1px_40px_rgba(15,23,42,0.08)]'
            : 'border-b border-slate-900/[0.07] backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">

          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ opacity: 0.85 }}
            className="cursor-pointer shrink-0"
          >
            <Logo variant="compact" size={40} />
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center" onMouseLeave={handleMouseLeave}>

            {/* Services */}
            <NavItem label="Services" icon={<Globe className="w-3.5 h-3.5" />} active={open === 'services'} onEnter={() => handleMouseEnter('services')} />

            {/* Work */}
            <NavItem label="Our Work" icon={<Layers className="w-3.5 h-3.5" />} active={open === 'work'} onEnter={() => handleMouseEnter('work')} />

            {/* Company */}
            <NavItem label="Company" icon={<Users className="w-3.5 h-3.5" />} active={open === 'company'} onEnter={() => handleMouseEnter('company')} />

            {/* Direct links */}
            <button
              onClick={() => scrollTo('#contact')}
              className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors duration-200 rounded-lg hover:bg-slate-900/[0.04]"
            >
              Contact
            </button>

            {/* ─── Dropdowns ─────────────────────────────────────── */}
            <AnimatePresence>
              {open === 'services' && (
                <motion.div
                  key="services-dd"
                  variants={dropdownVariants}
                  initial="hidden" animate="visible" exit="exit"
                  onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-[76px] left-1/2 -translate-x-1/2 w-[780px] bg-white/95 backdrop-blur-2xl border border-slate-900/10 rounded-2xl shadow-[0_24px_80px_rgba(15,23,42,0.15)] overflow-hidden"
                >
                  {/* Header */}
                  <div className="px-6 pt-5 pb-4 border-b border-slate-900/[0.07] flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 font-bold tracking-tight text-sm">Our Services</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Everything you need to build, launch, and scale</p>
                    </div>
                    <button
                      onClick={() => scrollTo('#services')}
                      className="flex items-center gap-1.5 text-[11px] font-bold text-brand-accent hover:text-slate-900 transition-colors uppercase tracking-widest group"
                    >
                      View all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Grid */}
                  <div className="p-4 grid grid-cols-3 gap-1">
                    {SERVICES.map((item, i) => (
                      <ServiceCard key={item.label} item={item} index={i} onClick={() => scrollTo('#services')} />
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="px-6 py-4 border-t border-slate-900/[0.07] bg-brand-accent/5 flex items-center justify-between">
                    <p className="text-[11px] text-slate-500">Not sure which service fits? We'll guide you.</p>
                    <button
                      onClick={() => scrollTo('#contact')}
                      className="px-4 py-2 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-indigo-400 transition-colors"
                    >
                      Free Consultation
                    </button>
                  </div>
                </motion.div>
              )}

              {open === 'work' && (
                <motion.div
                  key="work-dd"
                  variants={dropdownVariants}
                  initial="hidden" animate="visible" exit="exit"
                  onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-[76px] left-1/2 -translate-x-1/2 w-[440px] bg-white/95 backdrop-blur-2xl border border-slate-900/10 rounded-2xl shadow-[0_24px_80px_rgba(15,23,42,0.15)] overflow-hidden"
                >
                  <div className="px-5 pt-4 pb-3 border-b border-slate-900/[0.07]">
                    <p className="text-slate-900 font-bold tracking-tight text-sm">Portfolio</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Real products. Real impact.</p>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-1">
                    {WORK_ITEMS.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.label}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => scrollTo(item.href)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-900/[0.04] transition-all duration-200 group text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-slate-700 group-hover:text-slate-900 leading-tight">{item.label}</p>
                            <p className="text-[11px] text-slate-500 group-hover:text-slate-600 leading-tight mt-0.5">{item.desc}</p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="px-5 py-3 border-t border-slate-900/[0.07] bg-slate-900/[0.02]">
                    <button onClick={() => scrollTo('#work')} className="w-full flex items-center justify-center gap-2 py-2 text-[11px] font-bold text-brand-accent hover:text-slate-900 transition-colors uppercase tracking-widest group">
                      See All Projects <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {open === 'company' && (
                <motion.div
                  key="company-dd"
                  variants={dropdownVariants}
                  initial="hidden" animate="visible" exit="exit"
                  onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-[76px] left-1/2 -translate-x-1/2 w-[360px] bg-white/95 backdrop-blur-2xl border border-slate-900/10 rounded-2xl shadow-[0_24px_80px_rgba(15,23,42,0.15)] overflow-hidden"
                >
                  <div className="px-5 pt-4 pb-3 border-b border-slate-900/[0.07]">
                    <p className="text-slate-900 font-bold tracking-tight text-sm">Company</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Get to know Soft Tech Solution</p>
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    {COMPANY_ITEMS.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.label}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => scrollTo(item.href)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-900/[0.04] transition-all duration-200 group text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-900/[0.04] flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-brand-accent/20 group-hover:text-brand-accent transition-all">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-slate-700 group-hover:text-slate-900 leading-tight">{item.label}</p>
                            <p className="text-[11px] text-slate-500 group-hover:text-slate-600 leading-tight">{item.desc}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all ml-auto shrink-0" />
                        </motion.button>
                      );
                    })}
                  </div>
                  {/* Contact shortcuts */}
                  <div className="px-5 py-4 border-t border-slate-900/[0.07] bg-slate-900/[0.02] flex gap-3">
                    {CONTACT_ITEMS.map(c => {
                      const Icon = c.icon;
                      return (
                        <a
                          key={c.label}
                          href={c.href}
                          target={c.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/[0.04] hover:bg-brand-accent/10 hover:border-brand-accent/30 border border-slate-900/[0.07] transition-all group"
                        >
                          <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-accent transition-colors shrink-0" />
                          <div>
                            <p className="text-[10px] font-bold text-slate-600 group-hover:text-slate-900 leading-none">{c.label}</p>
                            <p className="text-[9px] text-slate-400 leading-none mt-0.5">{c.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#contact')}
              className="hidden sm:flex px-6 py-2.5 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-indigo-400 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              Get Started
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-slate-900/10 text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.04] transition-all"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 w-80 z-[99] bg-white/98 backdrop-blur-2xl border-l border-slate-900/10 flex flex-col overflow-y-auto"
          >
            <div className="px-6 h-20 flex items-center justify-between border-b border-slate-900/[0.07]">
              <span className="text-sm font-bold text-slate-600 tracking-widest uppercase">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-900/10 text-slate-600 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 px-4 py-6 space-y-1">
              <MobileSection title="Services">
                {SERVICES.slice(0, 8).map(s => {
                  const Icon = s.icon;
                  return (
                    <button key={s.label} onClick={() => scrollTo('#services')} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-900/[0.04] transition-all group text-left">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}18`, color: s.color }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[13px] text-slate-600 group-hover:text-slate-900 transition-colors">{s.label}</span>
                    </button>
                  );
                })}
              </MobileSection>

              <MobileSection title="Our Work">
                {WORK_ITEMS.map(w => {
                  const Icon = w.icon;
                  return (
                    <button key={w.label} onClick={() => scrollTo(w.href)} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-900/[0.04] transition-all group text-left">
                      <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[13px] text-slate-600 group-hover:text-slate-900 transition-colors">{w.label}</span>
                    </button>
                  );
                })}
              </MobileSection>

              <MobileSection title="Company">
                {COMPANY_ITEMS.map(c => {
                  const Icon = c.icon;
                  return (
                    <button key={c.label} onClick={() => scrollTo(c.href)} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-900/[0.04] transition-all group text-left">
                      <div className="w-8 h-8 rounded-lg bg-slate-900/[0.04] text-slate-500 group-hover:text-brand-accent flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[13px] text-slate-600 group-hover:text-slate-900 transition-colors">{c.label}</span>
                    </button>
                  );
                })}
              </MobileSection>
            </div>

            <div className="p-6 border-t border-slate-900/[0.07] space-y-3">
              <a href="https://wa.me/447462086661" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 transition-all group">
                <MessageCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-[12px] font-bold text-slate-700 group-hover:text-slate-900">WhatsApp (UK)</p>
                  <p className="text-[10px] text-slate-500">+44 7462 086661</p>
                </div>
              </a>
              <a href="https://wa.me/923005863032" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 transition-all group">
                <MessageCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-[12px] font-bold text-slate-700 group-hover:text-slate-900">WhatsApp (PK)</p>
                  <p className="text-[10px] text-slate-500">+92 300 5863032</p>
                </div>
              </a>
              <button onClick={() => scrollTo('#contact')} className="w-full py-3.5 bg-brand-accent text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-400 transition-colors">
                Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[98] bg-slate-900/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────── */
function NavItem({ label, icon, active, onEnter }: { label: string; icon: React.ReactNode; active: boolean; onEnter: () => void }) {
  return (
    <button
      onMouseEnter={onEnter}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-200 group ${
        active ? 'bg-slate-900/[0.06] text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-900/[0.04]'
      }`}
    >
      <span className={`transition-colors ${active ? 'text-brand-accent' : 'text-slate-400 group-hover:text-brand-accent'}`}>{icon}</span>
      {label}
      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${active ? 'rotate-180 text-brand-accent' : 'text-slate-400 group-hover:text-slate-600'}`} />
    </button>
  );
}

function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-900/[0.07] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-900/[0.04] transition-colors"
      >
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em]">{title}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="overflow-hidden border-t border-slate-900/[0.07]"
          >
            <div className="p-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
