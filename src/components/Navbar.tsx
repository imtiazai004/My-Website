import { motion } from 'motion/react';
import { Terminal, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onAction?: () => void;
}

export default function Navbar({ onAction }: NavbarProps) {
  const { user, isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center font-bold text-xl text-white">S</div>
          <span className="font-sans font-black tracking-tighter text-2xl uppercase">Soft Tech Solution</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-brand-text-muted">
          <a href="#work" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Portfolio</a>
          <a href="#skills" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Stack</a>
          <a href="#testimonials" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Process</a>
          {isAdmin && (
            <button 
              onClick={onAction}
              className="flex items-center gap-2 text-brand-accent hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold"
            >
              <Settings className="w-3 h-3" />
              Admin Console
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {isAdmin && (
            <div className="flex items-center gap-2 text-[10px] text-green-500 font-mono animate-pulse mr-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              LIVE_SYNC
            </div>
          )}
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            START A PROJECT
          </motion.button>
        </div>
      </div>
    </nav>
  );
}


