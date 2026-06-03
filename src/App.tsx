import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { trackActivity, subscribeToSectionSettings } from './services/dataService';
import { AuthProvider } from './context/AuthContext';
import { DEFAULT_SECTION_SETTINGS } from './constants';
import { SectionSettings } from './types';
import Navbar from './components/Navbar';
import { SplineSceneBasic } from './components/SplineSceneBasic';
import ShaderBackground from './components/ui/shader-background';

// Below-fold sections: lazy-loaded so they don't block initial parse
const ClientLogos = lazy(() => import('./components/ClientLogos'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const Services = lazy(() => import('./components/Services'));
const ProjectGrid = lazy(() => import('./components/ProjectGrid'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Skills = lazy(() => import('./components/Skills'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));
const AdminPage = lazy(() => import('./components/AdminPage'));

const ADMIN_PATH = '/sts-x9k2m7p4-console';

function MainSite() {
  const [sections, setSections] = useState<SectionSettings>(DEFAULT_SECTION_SETTINGS);

  useEffect(() => {
    trackActivity('PAGE_VIEW');
    const unsub = subscribeToSectionSettings(setSections);
    return unsub;
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />
      <div className="fixed top-0 left-1/4 w-[1200px] h-[1200px] bg-brand-accent/5 rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse-glow" aria-hidden="true" />
      <div className="fixed bottom-0 right-0 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[160px] translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse-glow" style={{ animationDelay: '-5s' }} aria-hidden="true" />
      <Navbar />
      <main className="relative z-20">
        <SplineSceneBasic />
        <Suspense fallback={null}>
          {sections.clientLogos && <ClientLogos />}
          {sections.about && <AboutSection />}
          {sections.services && <Services />}
          {sections.projects && <ProjectGrid />}
          {sections.whyChooseUs && <WhyChooseUs />}
          {sections.skills && <Skills />}
          {sections.testimonials && <Testimonials />}
          {sections.faq && <FAQ />}
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Analytics />
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route
            path={ADMIN_PATH}
            element={
              <Suspense fallback={
                <div className="min-h-screen bg-brand-bg flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <AdminPage />
              </Suspense>
            }
          />
          <Route path="*" element={<MainSite />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
