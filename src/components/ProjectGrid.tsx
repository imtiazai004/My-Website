import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectCard from './ProjectCard';
import { Laptop, Cpu, Bot, Code, Zap, Globe, Shield } from 'lucide-react';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';
import { subscribeToProjects } from '../services/dataService';
import { Project } from '../types';

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  useEffect(() => {
    const unsubscribe = subscribeToProjects((data) => {
      if (data.length > 0) {
        setProjects(data);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <section id="work" className="py-40 px-6 relative overflow-hidden bg-white text-black">
      {/* Background Neural Grid Decal - Adjusted for visibility on white */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto mb-32 px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-black/5 text-[10px] font-bold tracking-[0.2em] text-black/60 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          CORE_PHILOSOPHY & CAPABILITIES
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-6xl font-display font-medium text-black leading-tight tracking-tight">
              Engineering <span className="text-brand-accent italic">Intelligent</span> <br />
              Digital Ecosystems
            </h2>
            
            <div className="space-y-8 text-black/80 text-xl font-light leading-relaxed">
              <p>
                Soft Tech empowers businesses with intelligent, high-performance digital solutions designed to solve complex operational challenges and accelerate growth. Our passionate team of developers, designers, and AI specialists focuses on building tailored software systems that combine cutting-edge technology with seamless user experiences and modern cinematic design aesthetics.
              </p>
              <p>
                Leveraging expertise in AI development, intelligent automation, cloud infrastructure, scalable web platforms, and custom software engineering, we create solutions that help businesses streamline operations, enhance decision-making, improve efficiency, and unlock new growth opportunities.
              </p>
              <p>
                From AI-powered workflows and smart automation systems to responsive digital platforms and scalable architectures, every solution is engineered for performance, reliability, and long-term impact. At Soft Tech, we believe technology should not only function flawlessly but also deliver a refined and future-ready experience.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-black/10 flex items-center justify-center overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Expert" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-[12px] font-mono text-black/50 tracking-widest uppercase">
                <span className="text-brand-accent font-bold">24+</span> SENIOR_SYSTEM_ENGINEERS
              </p>
            </div>
          </motion.div>

          {/* Right Column: Illustration */}
          <div className="relative flex items-center justify-center py-20">
            <div className="absolute inset-0 bg-brand-accent/5 rounded-full blur-3xl opacity-60" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              {/* Laptop Base - Dark contrast on white background */}
              <div className="relative bg-black rounded-xl p-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-black/20 w-80 h-52 md:w-96 md:h-64">
                <div className="absolute inset-x-0 bottom-0 h-2 bg-neutral-900 rounded-b-xl border-t border-white/5" />
                <div className="w-full h-full bg-neutral-950 rounded-lg relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 pointer-events-none" 
                       style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                  <Code className="w-16 h-16 text-brand-accent animate-pulse" />
                </div>

                {/* Floating Elements rising from the screen */}
                <AnimatePresence>
                  {/* AI Bot */}
                  <motion.div
                    animate={{ y: [0, -40, 0], x: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 left-1/4 bg-brand-accent/20 backdrop-blur-md p-3 rounded-full border border-brand-accent/30"
                  >
                    <Bot className="w-6 h-6 text-brand-accent" />
                  </motion.div>

                  {/* CPU/Brain */}
                  <motion.div
                    animate={{ y: [0, -60, 0], x: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -top-20 right-1/4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10"
                  >
                    <Cpu className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Security/Shield */}
                  <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-10 -right-5 bg-white/5 backdrop-blur-md p-2 rounded-lg border border-white/10"
                  >
                    <Shield className="w-5 h-5 text-emerald-500" />
                  </motion.div>

                  {/* Global/Globe */}
                  <motion.div
                    animate={{ y: [0, -50, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute top-20 -left-10 bg-white/5 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                  >
                    <Globe className="w-6 h-6 text-blue-400" />
                  </motion.div>

                  {/* Zap/Performance */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 -right-10 bg-amber-500/20 backdrop-blur-md p-2 rounded-full border border-amber-500/30"
                  >
                    <Zap className="w-4 h-4 text-amber-500" />
                  </motion.div>
                </AnimatePresence>

                {/* Vertical Data Streams */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 flex gap-8 pointer-events-none opacity-20">
                  <div className="w-px h-32 bg-gradient-to-t from-brand-accent to-transparent relative overflow-hidden">
                    <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-full h-1/2 bg-white" />
                  </div>
                  <div className="w-px h-40 bg-gradient-to-t from-brand-accent to-transparent relative overflow-hidden">
                    <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }} className="w-full h-1/2 bg-white" />
                  </div>
                  <div className="w-px h-24 bg-gradient-to-t from-brand-accent to-transparent relative overflow-hidden">
                    <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }} className="w-full h-1/2 bg-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 mb-32 items-start opacity-70">
          <div className="space-y-6">
             <h3 className="text-black font-bold tracking-widest text-xs uppercase opacity-40">PROTOCOL_ACTIVE</h3>
             <p className="text-black/60 text-lg font-light leading-relaxed max-w-xl">
                The following matrix contains our most critical production deployments. 
                Each node represents a distinct architecture optimized for specific operational vectors.
             </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-4 border-l border-black/10 pl-12">
            <div className="space-y-4">
              <h4 className="text-black font-bold tracking-widest text-[10px] uppercase">Architecture-First</h4>
              <p className="text-black/40 text-sm font-light leading-relaxed">
                Infinite scalability from day zero. We bridge backends and cinematic frontends.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-black font-bold tracking-widest text-[10px] uppercase">Cloud Intelligence</h4>
              <p className="text-black/40 text-sm font-light leading-relaxed">
                Bespoke enterprise solutions with real-time data orchestration and AI.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(projects || []).map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </div>
        
        <div className="flex justify-center pt-12">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-12 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all group"
          >
            LOAD ARCHIVE
            <span className="ml-3 font-mono text-[8px] text-brand-accent opacity-60 group-hover:opacity-100 transition-opacity">v.2.4</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}


