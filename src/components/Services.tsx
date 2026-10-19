import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Bot, BellRing, ShoppingCart, AppWindow, Globe, Landmark,
  ArrowRight, Sparkles, FileText, MonitorPlay,
} from 'lucide-react';
import { SERVICES } from '../data/services';

const ICONS = {
  bot: Bot,
  bell: BellRing,
  cart: ShoppingCart,
  app: AppWindow,
  globe: Globe,
  landmark: Landmark,
} as const;

export default function Services() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];
  const progress = ((active + 1) / SERVICES.length) * 100;

  return (
    <section id="services" aria-labelledby="services-heading" className="py-32 px-6 relative bg-[#f1f5f9] overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/10 bg-slate-900/[0.03] text-xs font-semibold text-slate-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            Services
          </div>
          <h2 id="services-heading" className="text-4xl md:text-6xl font-display font-medium text-slate-900 tracking-tight leading-tight">
            What we <span className="text-brand-accent italic">build for you</span>
          </h2>
          <p className="text-slate-600 text-xl leading-relaxed mt-5">
            Six things we do well — each one backed by a working demo or a product we already run.
          </p>
        </div>

        {/* Two-column tabbed layout */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 [&>*]:min-w-0">

          {/* Left — vertical tab list */}
          <div className="flex flex-col gap-2" role="tablist" aria-label="Services">
            {SERVICES.map((s, i) => {
              const TabIcon = ICONS[s.icon];
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  id={`service-tab-${s.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-${s.id}`}
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

          {/* Right — every service is rendered (crawlers and screen readers get all six); only the active one is shown */}
          <div>
            {SERVICES.map((sv, i) => {
              const Icon = ICONS[sv.icon];
              return (
                <div
                  key={sv.id}
                  id={`service-${sv.id}`}
                  role="tabpanel"
                  aria-labelledby={`service-tab-${sv.id}`}
                  hidden={i !== active}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in"
                >
                  <div className="bg-gradient-to-br from-brand-accent to-blue-500 rounded-2xl p-6 flex flex-col justify-between min-h-[180px] text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-display font-bold leading-tight mt-6">{sv.label}</h3>
                  </div>

                  <div className="bg-white border border-slate-900/10 rounded-2xl p-6 flex flex-col min-h-[180px]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-accent mb-3">
                      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> In one line
                    </div>
                    <p className="text-xl md:text-2xl font-display font-medium text-slate-900 leading-snug">{sv.tagline}</p>
                  </div>

                  <div className="bg-white border border-slate-900/10 rounded-2xl p-6 flex flex-col min-h-[180px]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" /> What we do
                    </div>
                    <p className="text-slate-700 text-base leading-relaxed">{sv.description}</p>
                    <p className="text-slate-500 text-sm leading-relaxed mt-3"><span className="font-semibold text-slate-700">For:</span> {sv.forWho}</p>
                  </div>

                  <div className="bg-white border border-slate-900/10 rounded-2xl p-6 flex flex-col min-h-[180px]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
                      <MonitorPlay className="w-3.5 h-3.5" aria-hidden="true" /> See it working
                    </div>
                    <ul className="flex flex-col gap-2">
                      {sv.examples.map((ex) => (
                        <li key={ex.href}>
                          {ex.href.startsWith('/demos/') ? (
                            <a href={ex.href} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:gap-3 transition-all">
                              {ex.label} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          ) : (
                            <Link to={ex.href} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:gap-3 transition-all">
                              {ex.label} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                      {sv.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-slate-900/[0.04] border border-slate-900/10 text-xs text-slate-600">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Progress bar — fills as you switch tabs */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">
                  {active + 1} of {SERVICES.length}
                </span>
                <span className="text-xs font-semibold text-brand-accent">
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
