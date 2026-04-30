import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  BarChart3, 
  Users2, 
  Code2,
  MousePointerClick,
  X,
  ArrowRight,
  Activity,
  Lock,
  Workflow
} from 'lucide-react';

const REASONS = [
  {
    id: 'perf',
    title: 'Engineered for Performance',
    description: 'We don\'t just write code; we architect systems. Our solutions are optimized for sub-second response times and high concurrency handling from day one.',
    icon: Zap,
    stat: '< 200ms',
    statLabel: 'Avg. Latency',
    details: {
      metrics: [
        { label: 'Time to First Byte', value: '45ms' },
        { label: 'Hydration Time', value: '1.2s' },
        { label: 'Core Web Vitals', value: '100/100' }
      ],
      points: [
        'Edge-computed rendering paths',
        'Advanced tree-shaking architectures',
        'Sub-millisecond data fetching'
      ]
    }
  },
  {
    id: 'sec',
    title: 'Security-First Protocol',
    description: 'Deep-level security is baked into our development lifecycle. From zero-trust architectures to encrypted data pipelines, your IP and user data are fortress-secure.',
    icon: ShieldCheck,
    stat: '100%',
    statLabel: 'Audit Ready',
    details: {
      metrics: [
        { label: 'Encryption Level', value: 'AES-256' },
        { label: 'Auth Protocol', value: 'OAuth2/OIDC' },
        { label: 'Uptime', value: '99.99%' }
      ],
      points: [
        'Automated penetration testing',
        'End-to-end data sanitization',
        'Zero-trust network topology'
      ]
    }
  },
  {
    id: 'ai',
    title: 'AI-Native Integration',
    description: 'We leverage cutting-edge LLMs and machine learning models to automate complex workflows, giving your business a decisive edge in the era of artificial intelligence.',
    icon: Cpu,
    stat: '40%+',
    statLabel: 'Efficiency Gained',
    details: {
      metrics: [
        { label: 'Inference Speed', value: 'Fast' },
        { label: 'Model Support', value: 'Multi-LLM' },
        { label: 'Automation', value: 'Deep' }
      ],
      points: [
        'Custom RAG pipeline development',
        'Vector database optimization',
        'Intelligent agent orchestration'
      ]
    }
  },
  {
    id: 'scale',
    title: 'Scalability at Core',
    description: 'Our cloud-native approach ensures your infrastructure grows as you do. Whether it\'s 100 or 1,000,000 users, our systems scale elastically without downtime.',
    icon: BarChart3,
    stat: 'ELASTIC',
    statLabel: 'Auto-Scaling',
    details: {
      metrics: [
        { label: 'Cluster Type', value: 'K8s Edge' },
        { label: 'Deployment', value: 'Blue/Green' },
        { label: 'Throttling', value: 'Dynamic' }
      ],
      points: [
        'Distributed microservices mesh',
        'Global Content Delivery (CDN)',
        'Serverless compute isolation'
      ]
    }
  },
  {
    id: 'squad',
    title: 'Dedicated Engineering Squad',
    description: 'You get a direct line to the architects, not just account managers. We act as your extended CTO office, providing strategic advisory.',
    icon: Users2,
    stat: '24/7',
    statLabel: 'Architect Level',
    details: {
      metrics: [
        { label: 'Avg. Seniority', value: '8+ Years' },
        { label: 'Response Time', value: '< 1hr' },
        { label: 'Communication', value: 'Slack/Discord' }
      ],
      points: [
        'Weekly architectural reviews',
        'Shared technical roadmapping',
        'Direct developer access'
      ]
    }
  },
  {
    id: 'tech',
    title: 'Modern Tech Stack',
    description: 'We stay at the bleeding edge. Using Next.js 15, Tailwind 4, and Rust components, we deliver future-proof software that doesn\'t become legacy.',
    icon: Code2,
    stat: 'v2025',
    statLabel: 'Standard',
    details: {
      metrics: [
        { label: 'Framework', value: 'React 19' },
        { label: 'Language', value: 'TypeScript' },
        { label: 'Build Tool', value: 'Vite/Turbopack' }
      ],
      points: [
        'Strict-mode type engineering',
        'Headless component architecture',
        'Atomic design principles'
      ]
    }
  }
];

export default function WhyChooseUs() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedReason = REASONS.find(r => r.id === selectedId);

  return (
    <section id="why-choose-us" className="py-32 px-6 relative bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <div className="text-[20rem] font-black font-mono leading-none rotate-90 translate-x-1/2">
          WHY_US
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Sticky Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-black/5 text-[10px] font-bold tracking-[0.2em] text-black/60"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent scale-anim" />
              THE_SOFT_TECH_ADVANTAGE
            </motion.div>
            
            <div className="space-y-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-display font-medium text-black leading-tight tracking-tight"
              >
                Why Leaders <span className="text-brand-accent italic">Trust</span> Us
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-black/60 text-xl font-light leading-relaxed max-w-md"
              >
                We don't just build websites; we engineer digital competitive advantages. Our approach combines mathematical precision with artistic UI execution.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-black rounded-[2rem] text-white space-y-6 relative overflow-hidden group"
            >
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-display font-medium">Ready for the Next Level?</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Join 50+ hyper-growth startups and enterprises that have scaled their vision with our specialized engineering.
                </p>
                <button className="flex items-center gap-2 text-brand-accent font-bold text-sm group-hover:gap-4 transition-all">
                  Book a strategic audit <MousePointerClick className="w-4 h-4" />
                </button>
              </div>
              
              {/* Abstract decorative shape */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-accent/20 blur-[80px] group-hover:bg-brand-accent/40 transition-all duration-700" />
            </motion.div>
          </div>

          {/* Right Grid Content */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {REASONS.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedId(reason.id)}
                className="p-8 border border-black/5 bg-neutral-50 rounded-3xl cursor-pointer hover:bg-white hover:border-brand-accent/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center text-brand-accent mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <reason.icon className="w-6 h-6" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-display font-medium text-black group-hover:text-brand-accent transition-colors">
                      {reason.title}
                    </h4>
                    <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-black/50 leading-relaxed font-light">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/5 flex items-end justify-between">
                  <div className="space-y-1">
                    <p className="text-2xl font-display font-bold text-black tracking-tighter">{reason.stat}</p>
                    <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-black/30">{reason.statLabel}</p>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-black/10">
                    S_VAL_{index + 1}
                  </div>
                </div>

                {/* Hover Reveal Subtle Glow */}
                <div className="absolute -inset-1 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Overlay */}
      <AnimatePresence>
        {selectedId && selectedReason && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/80 backdrop-blur-2xl"
            />
            
            <motion.div
              layoutId={selectedId}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="w-full max-w-4xl bg-white border border-black/10 rounded-[3rem] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row"
            >
              {/* Sidebar/Graphic */}
              <div className="md:w-1/3 bg-black p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <selectedReason.icon className="w-12 h-12 text-brand-accent mb-8" />
                  <h3 className="text-3xl font-display font-medium leading-tight">{selectedReason.title}</h3>
                </div>
                
                <div className="space-y-8 relative z-10">
                  {selectedReason.details.metrics.map((m, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-brand-accent text-3xl font-display font-bold tracking-tighter">{m.value}</p>
                      <p className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20 pointer-events-none">
                  <div className="w-full h-full border-[0.5px] border-white/20 rounded-full animate-spin-slow" />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-12 space-y-10 relative">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-8 right-8 p-2 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-brand-accent uppercase tracking-[0.2em]">Engineering_Brief</h4>
                  <p className="text-xl text-black/70 font-light leading-relaxed italic">
                    "{selectedReason.description}"
                  </p>
                </div>

                <div className="grid md:grid-cols-1 gap-6">
                  <div className="space-y-6">
                    <h4 className="text-xs font-mono font-bold text-black/40 uppercase tracking-widest">Protocol_Framework</h4>
                    <div className="space-y-4">
                      {selectedReason.details.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="mt-1 w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                            <ArrowRight className="w-3 h-3" />
                          </div>
                          <p className="text-black/60 font-medium leading-normal">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-brand-accent" />
                      <span className="text-[10px] font-mono text-black/40 font-bold">STATUS: STABLE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-brand-accent" />
                      <span className="text-[10px] font-mono text-black/40 font-bold">ENCRYPTION: ACTIVE</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-black text-white rounded-full text-xs font-bold hover:bg-brand-accent hover:text-black transition-all flex items-center gap-2">
                    Request Full Documentation <Workflow className="w-3 h-3" />
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

