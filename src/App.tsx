import React, { useState, useEffect } from 'react';
import { trackActivity } from './services/dataService';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Skills from './components/Skills';
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
      <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative">
        <Navbar onAction={() => setIsAdminOpen(true)} />
        <main>
          <Hero />
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
        
        {/* Visual background noise/texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>
    </AuthProvider>
  );
}



