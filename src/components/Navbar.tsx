import { motion } from 'motion/react';
import { Terminal, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onAction?: () => void;
}

export default function Navbar({ onAction }: NavbarProps) {
  const { user, isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-700 border-b border-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-5 group cursor-pointer">
          <div className="w-11 h-11 bg-white text-black rounded-none flex items-center justify-center font-display font-black text-2xl transition-all duration-700 group-hover:bg-brand-accent group-hover:text-white group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-display font-medium tracking-tighter text-2xl uppercase leading-none text-white">Soft Tech</span>
            <span className="text-[9px] font-mono text-white/40 font-bold tracking-[0.5em] uppercase mt-1">PROTOCOL_ACTIVE</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-14">
          {[
            { label: 'Work', href: '#work' },
            { label: 'Stack', href: '#skills' },
            { label: 'Process', href: '#testimonials' }
          ].map((link) => (
            <motion.a 
              key={link.label}
              href={link.href}
              whileHover={{ y: -1 }}
              className="relative text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all duration-500 group"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </motion.a>
          ))}
        </div>
        
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-white transition-all duration-500"
          >
            START_MISSION
          </motion.button>
        </div>
      </div>
    </nav>
  );
}


