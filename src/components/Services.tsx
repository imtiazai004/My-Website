import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Smartphone, 
  BrainCircuit, 
  Cloud, 
  Layers, 
  Cpu, 
  Globe, 
  ShieldCheck,
  Terminal,
  X,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const SERVICES = [
  {
    title: 'Full-Stack Web Development',
    description: 'Architecting high-performance, responsive web applications using modern frameworks like React, Next.js, and Node.js.',
    icon: Globe,
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    details: 'Our web engineering team builds pixel-perfect, SEO-optimized applications that convert. We specialize in Server-Side Rendering (SSR) and edge-computing solutions that ensure your application loads in under 500ms globally.',
    features: ['Progressive Web Apps (PWA)', 'Real-time Data Sync', 'Accessibility (WCAG) Compliance', 'SEO & Performance Optimization']
  },
  {
    title: 'Mobile App Engineering',
    description: 'Developing native-quality mobile experiences for iOS and Android. From initial wireframing to App Store deployment.',
    icon: Smartphone,
    tags: ['React Native', 'Flutter', 'iOS/Android'],
    details: 'Leveraging cross-platform technologies to deliver native performance with a single codebase. We focus on gesture-driven interfaces and offline-first capabilities for a seamless mobile experience.',
    features: ['Native Performance', 'Push Notifications', 'Biometric Authentication', 'Offline Data Persistence']
  },
  {
    title: 'AI & LLM Integration',
    description: 'Transforming businesses with intelligent automation. We specialize in integrating Gemini, OpenAI, and custom ML models.',
    icon: BrainCircuit,
    tags: ['Gemini AI', 'OpenAI', 'Automation', 'NLP'],
    details: 'We bridge the gap between static applications and intelligent systems. From RAG (Retrieval-Augmented Generation) pipelines to custom vision models, we help you leverage your data strategically.',
    features: ['Custom Chatbot Orchestration', 'Automated Content Generation', 'Predictive Analytics', 'Semantic Search Systems']
  },
  {
    title: 'Cloud Infrastructure & DevOps',
    description: 'Building resilient, auto-scaling architectures on AWS, GCP, and Azure. We implement zero-downtime CI/CD pipelines.',
    icon: Cloud,
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    details: 'Infrastructure as code is at our core. We design cloud-native systems that scale horizontally and vertically based on traffic demand, ensuring maximum cost-efficiency and 99.99% reliability.',
    features: ['Kubernetes Orchestration', 'Auto-scaling Clusters', 'Disaster Recovery Planning', 'Security & Compliance Audits']
  },
  {
    title: 'Custom API Development',
    description: 'Designing secure, high-throughput REST and GraphQL APIs that serve as the backbone for complex digital ecosystems.',
    icon: Code2,
    tags: ['GraphQL', 'REST', 'Microservices', 'OAuth'],
    details: 'We build the connective tissue for modern enterprises. Our APIs are designed with developer experience in mind, featuring comprehensive documentation, robust versioning, and high security.',
    features: ['Zero-Trust Security Layout', 'Rate Limiting & Throttling', 'Websocket Real-time Feeds', 'Comprehensive Documentation']
  },
  {
    title: 'Enterprise Software Solutions',
    description: 'Engineering tailored internal tools, ERP systems, and dashboards designed to handle complex business logic.',
    icon: Terminal,
    tags: ['Dashboard', 'ERP', 'Internal Tools', 'SQL'],
    details: 'Modernizing legacy systems and building bespoke mission-critical software. We understand enterprise complexity and build tools that simplify operations rather than adding to it.',
    features: ['Legacy Data Migration', 'Complex Workflow Automation', 'SaaS Multi-tenancy', 'Role-Based Access Control (RBAC)']
  },
  {
    title: 'Embedded Systems & IoT',
    description: 'Developing firmware and software for connected devices and edge computing. Bridging the gap between hardware and software.',
    icon: Cpu,
    tags: ['C/C++', 'Rust', 'Firmware', 'RTOS'],
    details: 'Writing low-latency, resource-efficient code for hardware sensors and controllers. We handle the entire IoT stack from device firmware to cloud-based data ingestion.',
    features: ['Firmware Development', 'Edge AI Implementation', 'MQTT & CoAP Protocols', 'Hardware-Software Integration']
  },
  {
    title: 'Blockchain & Web3 Engineering',
    description: 'Building decentralized applications and smart contracts with high security standards for Ethereum and Solana.',
    icon: ShieldCheck,
    tags: ['Solidity', 'Web3.js', 'Smart Contracts'],
    details: 'Security-first development for decentralized protocols. We provide comprehensive smart contract audits and build decentralized frontends that users trust.',
    features: ['Smart Contract Audits', 'DeFi Protocol Engineering', 'NFT Ecosystems', 'DAOs & Governance Layers']
  },
  {
    title: 'Data Engineering & Analytics',
    description: 'Designing robust data pipelines and processing frameworks. Transforming raw data into actionable insights.',
    icon: Layers,
    tags: ['Python', 'Spark', 'Kafka', 'BigQuery'],
    details: 'Making sense of the data deluge. We build the pipelines that ingest, clean, and transform multi-terabyte datasets into dashboards that drive decision-making.',
    features: ['ETL Pipeline Orchestration', 'Real-time Streaming Analytics', 'Data Lakehouse Architecture', 'Visualization Dashboards']
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <section id="services" className="py-32 px-6 relative bg-neutral-50 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-6 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-black/5 text-[10px] font-bold tracking-[0.2em] text-black/60"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              OUR_SPECIALIZED_VECTORS
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-medium text-black tracking-tight leading-tight"
            >
              Services We <span className="text-brand-accent italic">Offer</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-black/60 text-xl font-light leading-relaxed"
            >
              Comprehensive programming and software engineering solutions tailored for the modern digital era. We build systems that perform as elegantly as they look.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            <div className="glass-card-light !p-4 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-accent" />
              <span className="text-xs font-mono font-bold text-black/60">SECURE_PROTOCOL_V4</span>
            </div>
            <div className="glass-card-light !p-4 flex items-center gap-3">
              <Layers className="w-5 h-5 text-brand-accent" />
              <span className="text-xs font-mono font-bold text-black/60">SCALABLE_ARCHITECTURE</span>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedService(service)}
              className="glass-card-light group flex flex-col hover:border-brand-accent/30 transition-all duration-500 cursor-pointer"
            >
              <div className="mb-8 relative">
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-brand-accent group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl">
                  <service.icon className="w-7 h-7" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border border-black/5 bg-white flex items-center justify-center text-[10px] font-mono font-bold text-black/20">
                  {index + 1}
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                <h3 className="text-2xl font-display font-medium text-black group-hover:text-brand-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-black/60 text-base font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {service.tags.slice(0, 2).map((tag, tagIdx) => (
                    <span key={`${tag}-${tagIdx}`} className="text-[9px] font-mono font-bold text-black/40 uppercase tracking-widest px-2 py-1 bg-black/5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.div 
                  className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center text-black/20 group-hover:text-brand-accent group-hover:border-brand-accent/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Overlay */}
        <AnimatePresence>
          {selectedService && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] cursor-pointer"
              />
              <motion.div 
                layoutId={`service-${selectedService.title}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white border border-black/5 rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] z-[101] overflow-hidden"
              >
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors z-20 text-black/40 hover:text-black"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-10">
                    <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center text-brand-accent shadow-2xl shrink-0">
                      <selectedService.icon className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                       <div className="inline-block px-3 py-1 rounded-full border border-brand-accent/20 bg-brand-accent/5 text-[10px] font-bold tracking-widest text-brand-accent uppercase">
                          SERVICE_VECTOR_DETAILED
                       </div>
                       <h3 className="text-3xl md:text-4xl font-display font-medium text-black">
                          {selectedService.title}
                       </h3>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 gap-12">
                    <div className="md:col-span-3 space-y-8">
                       <div className="space-y-4">
                          <h4 className="text-xs font-mono font-bold text-black/40 uppercase tracking-widest">Engineering_Philosophy</h4>
                          <p className="text-black/70 text-lg font-light leading-relaxed">
                            {selectedService.details}
                          </p>
                       </div>

                       <div className="space-y-4">
                          <h4 className="text-xs font-mono font-bold text-black/40 uppercase tracking-widest">Core_Deliverables</h4>
                          <div className="grid grid-cols-1 gap-3">
                            {selectedService.features.map((feature, fIdx) => (
                              <div key={`${feature}-${fIdx}`} className="flex items-center gap-3 text-sm text-black/60 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                {feature}
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                       <div className="space-y-4">
                          <h4 className="text-xs font-mono font-bold text-black/40 uppercase tracking-widest">Tech_Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedService.tags.map((tag, tIdx) => (
                              <span key={`${tag}-${tIdx}`} className="px-3 py-2 bg-neutral-100 rounded-xl text-[11px] font-bold text-black/60 border border-black/5">
                                {tag}
                              </span>
                            ))}
                          </div>
                       </div>

                       <div className="p-6 bg-brand-accent rounded-2xl text-white space-y-4">
                          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Ready to deploy?</p>
                          <h5 className="text-xl font-display font-medium">Request Quote</h5>
                          <button className="w-full py-3 bg-white text-brand-accent rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                            Start Project <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Global Stats Footer */}
        <div className="mt-20 pt-10 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <p className="text-3xl font-display font-bold text-black tracking-tighter">99.9%</p>
              <p className="text-[10px] font-mono font-bold tracking-widest uppercase">Uptime_Guarantee</p>
            </div>
            <div className="w-px h-10 bg-black/10" />
            <div className="space-y-1">
              <p className="text-3xl font-display font-bold text-black tracking-tighter">150ms</p>
              <p className="text-[10px] font-mono font-bold tracking-widest uppercase">Median_Latency</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end gap-1">
               <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">Deployment_Status</span>
               <span className="text-[9px] font-mono font-medium text-emerald-500 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 ALL_SYSTEMS_OPERATIONAL
               </span>
             </div>
             <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
               <Cpu className="w-5 h-5" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
