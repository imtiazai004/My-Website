import { motion } from 'motion/react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { trackActivity } from '../services/dataService';

interface ProjectCardProps {
  project: Project;
  index: number;
  key?: string | number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const trackInteraction = (type: string) => {
    trackActivity(type, { projectId: project.id, projectTitle: project.title });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }}
      onViewportEnter={() => trackInteraction('PROJECT_VIEW')}
      className="glass-card-light group flex flex-col h-full !p-0 overflow-hidden shadow-sm"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Subtle Overlay Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent opacity-60" />
        
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-110"
          referrerPolicy="no-referrer"
        />

        {/* Hover Action */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-sm bg-brand-bg/20 transition-all duration-500">
          <motion.a 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={project.demoUrl}
            onClick={() => trackInteraction('DEMO_CLICK')}
            className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-brand-accent hover:text-white transition-colors duration-500"
          >
            <ArrowUpRight className="w-8 h-8" />
          </motion.a>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em]">{project.category}</span>
            <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="w-1 h-1 rounded-full bg-brand-accent" />
              <span className="font-mono text-[9px] text-black tracking-widest leading-none">ST_0{index + 1}</span>
            </div>
          </div>
          <h3 className="text-3xl font-display font-medium tracking-tight text-black transition-colors group-hover:text-brand-accent">{project.title}</h3>
          <p className="text-black/60 text-base font-light leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
        
        <div className="mt-auto pt-8 flex flex-wrap gap-2 border-t border-black/5">
          {project.tags?.slice(0, 3).map((tag, tagIndex) => (
            <span key={`${tag}-${tagIndex}`} className="px-3 py-1 bg-black/[0.03] border border-black/10 text-[9px] font-bold text-black/40 uppercase tracking-widest group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
