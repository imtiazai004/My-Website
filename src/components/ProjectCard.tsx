import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { trackActivity } from '../services/dataService';
import { PROJECT_LOGO_MAP } from '../constants';

function resolveImage(project: Project): string {
  const url = project.imageUrl?.trim();
  if (url && url !== '#' && !url.startsWith('http://placeholder')) return url;
  return PROJECT_LOGO_MAP[project.title] ?? '';
}

interface ProjectCardProps {
  project: Project;
  index: number;
  key?: string | number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const trackInteraction = (type: string) => {
    trackActivity(type, { projectId: project.id, projectTitle: project.title });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${(y - 0.5) * -16}deg) rotateY(${(x - 0.5) * 16}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.1s ease-out',
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const onMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 0.6s ease-out',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => trackInteraction('PROJECT_VIEW')}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      className="relative group flex flex-col h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] cursor-pointer"
    >
      {/* Mouse-follow ambient glow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(99,102,241,0.14) 0%, transparent 65%)` }}
      />
      {/* Top edge highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d1117]/90 via-[#0d1117]/20 to-transparent" />
        <img
          src={resolveImage(project)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-sm bg-[#0d1117]/30 transition-all duration-500">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={project.demoUrl}
            onClick={() => trackInteraction('DEMO_CLICK')}
            className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-brand-accent hover:text-white transition-colors duration-300"
          >
            <ArrowUpRight className="w-8 h-8" />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow space-y-6 relative z-20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em]">{project.category}</span>
            <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="w-1 h-1 rounded-full bg-brand-accent" />
              <span className="font-mono text-[9px] text-white/60 tracking-widest leading-none">ST_0{index + 1}</span>
            </div>
          </div>
          <h3 className="text-3xl font-display font-medium tracking-tight text-white transition-colors group-hover:text-brand-accent">
            {project.title}
          </h3>
          <p className="text-white/50 text-base font-light leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="mt-auto pt-8 flex flex-wrap gap-2 border-t border-white/5">
          {project.tags?.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={`${tag}-${tagIndex}`}
              className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-bold text-white/40 uppercase tracking-widest group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
