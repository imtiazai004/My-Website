import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectCard from './ProjectCard';
import { Laptop, Cpu, Bot, Code, Zap, Globe, Shield, X, ExternalLink, Github, Layers, Target, LineChart } from 'lucide-react';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';
import { subscribeToProjects } from '../services/dataService';
import { Project } from '../types';

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find(p => p.id === selectedId);

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
        {/* ... existing header content ... */}
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
                Soft Tech empowers businesses with intelligent, high-performance digital solutions designed to solve complex operational challenges and accelerate growth.
              </p>
              <p>
                Leveraging expertise in AI development, intelligent automation, and cloud infrastructure, we create solutions that help businesses streamline operations and unlock new growth opportunities.
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
              {/* Laptop Base */}
              <div className="relative bg-black rounded-xl p-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-black/20 w-80 h-52 md:w-96 md:h-64">
                <div className="absolute inset-x-0 bottom-0 h-2 bg-neutral-900 rounded-b-xl border-t border-white/5" />
                <div className="w-full h-full bg-neutral-950 rounded-lg relative overflow-hidden flex items-center justify-center">
                  <Code className="w-16 h-16 text-brand-accent animate-pulse" />
                </div>

                <AnimatePresence>
                  <motion.div
                    animate={{ y: [0, -40, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 left-1/4 bg-brand-accent/20 backdrop-blur-md p-3 rounded-full border border-brand-accent/30"
                  >
                    <Bot className="w-6 h-6 text-brand-accent" />
                  </motion.div>
                </AnimatePresence>
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
                Matrix contains our most critical production deployments. 
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
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(projects || []).map((project, index) => (
            <div key={project.id || `project-${index}`} onClick={() => setSelectedId(project.id)}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/70 backdrop-blur-2xl"
            />
            
            <motion.div
              layoutId={selectedId}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="w-full max-w-5xl bg-white border border-black/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 flex flex-col lg:flex-row max-h-[90vh]"
            >
              <div className="lg:w-1/2 relative bg-neutral-100 overflow-hidden">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase opacity-70 mb-2 block">PROJECT_ID: {selectedProject.id}</span>
                  <h3 className="text-4xl font-display font-medium">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="lg:w-1/2 p-12 overflow-y-auto custom-scrollbar bg-white">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-8 right-8 p-3 rounded-full hover:bg-neutral-100 transition-colors z-20"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-12">
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest flex items-center gap-2">
                      <Target className="w-4 h-4" /> OBJECTIVE & BRIEF
                    </h4>
                    <p className="text-black/60 text-lg font-light leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold text-black/40 uppercase tracking-widest flex items-center gap-2">
                        <Layers className="w-4 h-4" /> TECH_STACK
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags?.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-neutral-50 border border-black/5 rounded-full text-[10px] font-bold text-black/60 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono font-bold text-black/40 uppercase tracking-widest flex items-center gap-2">
                        <LineChart className="w-4 h-4" /> IMPACT_METRIC
                      </h4>
                      <div className="p-4 bg-brand-accent/5 rounded-2xl border border-brand-accent/10">
                        <p className="text-2xl font-display font-bold text-brand-accent tracking-tighter">99.9%</p>
                        <p className="text-[9px] font-mono text-black/40 font-bold uppercase tracking-widest">Uptime Architecture</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-xs font-bold hover:bg-brand-accent hover:text-black transition-all">
                        Launch Deployment <ExternalLink className="w-3 h-3" />
                      </a>
                      <button className="flex items-center gap-2 px-6 py-3 bg-neutral-100 text-black/60 rounded-full text-xs font-bold hover:bg-neutral-200 transition-all">
                        Review Source <Github className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}



