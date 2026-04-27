import React, { useState, useEffect } from 'react';
import { trackActivity } from './services/dataService';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { SplineSceneBasic } from './components/SplineSceneBasic';
import ProjectGrid from './components/ProjectGrid';
import Skills from './components/Skills';
import { EtheralShadow } from './components/ui/etheral-shadow';
import ShaderBackground from './components/ui/shader-background';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    trackActivity('PAGE_VIEW');
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
        <ShaderBackground />
        <div className="grain-bg" />
        <div className="grid-texture" />
        <div className="soft-vignette" />
        
        {/* Cinematic Lighting Layers */}
        <div className="fixed top-0 left-1/4 w-[1200px] h-[1200px] bg-brand-accent/5 rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse-glow" aria-hidden="true" />
        <div className="fixed bottom-0 right-0 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[160px] translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse-glow" style={{ animationDelay: '-5s' }} aria-hidden="true" />
        
        <Navbar onAction={() => setIsAdminOpen(true)} />
        <main className="relative z-20">
          <SplineSceneBasic />
          <ProjectGrid />
          <Skills />
          <Testimonials />
        </main>
        <Footer onAction={() => setIsAdminOpen(true)} />
        
        <AnimatePresence>
          {isAdminOpen && (
            <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
}



