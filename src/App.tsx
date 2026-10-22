import { lazy, Suspense, useState, useEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { DEFAULT_SECTION_SETTINGS } from './constants';
import { SectionSettings } from './types';
import Navbar from './components/Navbar';
import { SplineSceneBasic } from './components/SplineSceneBasic';
import ShaderBackground from './components/ui/shader-background';
import BusinessDisclosureFooter from './components/BusinessDisclosureFooter';
import { usePageSeo } from './lib/seo';
import { HOME_JSONLD, HOME_SEO } from './lib/homeSeo';

// Below-fold sections: lazy-loaded so they don't block initial parse
const ClientLogos = lazy(() => import('./components/ClientLogos'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const Services = lazy(() => import('./components/Services'));
const ProjectGrid = lazy(() => import('./components/ProjectGrid'));
const DemosSection = lazy(() => import('./components/DemosSection'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const LatestPosts = lazy(() => import('./components/LatestPosts'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const ProfitScoutPage = lazy(() => import('./components/ProfitScoutPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
const SubmitTestimonial = lazy(() => import('./components/SubmitTestimonial'));
const ChatWidget = lazy(() => import('./components/ChatWidget'));
const BlueprintLibrary = lazy(() => import('./components/BlueprintLibrary'));
const BlueprintDetail = lazy(() => import('./components/BlueprintDetail'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));
const WebsitePrivacyPolicy = lazy(() => import('./components/WebsitePrivacyPolicy'));
const AgencyVsFreelancer = lazy(() => import('./components/AgencyVsFreelancer'));
const TikFulfillGuidePage = lazy(() => import('./components/TikFulfillGuidePage'));
const GuidesLibraryPage = lazy(() => import('./components/GuidesLibraryPage'));
const SellerCopilotGuidePage = lazy(() => import('./components/SellerCopilotGuidePage'));
const AgentSafetyAuditGuidePage = lazy(() => import('./components/AgentSafetyAuditGuidePage'));
const TikTokShopOutreachSellerGuidePage = lazy(() => import('./components/TikTokShopOutreachSellerGuidePage'));
const PromptPackGuidePage = lazy(() => import('./components/PromptPackGuidePage'));
const SellerRadarPart1GuidePage = lazy(() => import('./components/SellerRadarPart1GuidePage'));
const ClaimbackGuidePage = lazy(() => import('./components/ClaimbackGuidePage'));
const DemosPage = lazy(() => import('./components/DemosPage'));
const WorkPage = lazy(() => import('./components/WorkPage'));
const NotFound = lazy(() => import('./components/NotFound'));

export const ADMIN_PATH = '/sts-x9k2m7p4-console';

function PublicBusinessDisclosure() {
  const { pathname } = useLocation();
  return pathname === ADMIN_PATH ? null : <BusinessDisclosureFooter />;
}

function MainSite() {
  const [sections, setSections] = useState<SectionSettings>(DEFAULT_SECTION_SETTINGS);
  const { hash } = useLocation();

  usePageSeo({ ...HOME_SEO, jsonLd: HOME_JSONLD });

  // Firebase is loaded after first paint, so it never blocks the hero.
  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;
    import('./services/dataService').then(({ trackActivity, subscribeToSectionSettings }) => {
      if (cancelled) return;
      trackActivity('PAGE_VIEW');
      unsub = subscribeToSectionSettings((s) => setSections({ ...DEFAULT_SECTION_SETTINGS, ...s }));
    });
    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  // Arriving from another page with /#section: wait for the lazy section, then scroll to it.
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (el || ++tries > 30) {
        clearInterval(timer);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    return () => clearInterval(timer);
  }, [hash]);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />
      <Navbar />
      <main className="relative z-20">
        <SplineSceneBasic />
        <Suspense fallback={null}>
          {sections.clientLogos && <ClientLogos />}
          {sections.about && <AboutSection />}
          {sections.services && <Services />}
          {sections.projects && <ProjectGrid />}
          <DemosSection />
          {sections.whyChooseUs && <WhyChooseUs />}
          {sections.testimonials && <Testimonials />}
          <LatestPosts />
          {sections.faq && <FAQ />}
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

const LoadingSpinner = (
  <div className="min-h-screen bg-brand-bg flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const page = (el: ReactNode) => <Suspense fallback={LoadingSpinner}>{el}</Suspense>;

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path={ADMIN_PATH} element={page(<AdminRoute />)} />
        <Route path="/work" element={page(<WorkPage />)} />
        <Route path="/demos" element={page(<DemosPage />)} />
        <Route path="/profitscout" element={page(<ProfitScoutPage />)} />
        <Route path="/profitscout-privacy" element={page(<PrivacyPolicy />)} />
        <Route path="/privacy" element={page(<WebsitePrivacyPolicy />)} />
        <Route path="/terms" element={page(<TermsAndConditions />)} />
        <Route path="/compare/agency-vs-freelancer" element={page(<AgencyVsFreelancer />)} />
        <Route path="/guides" element={page(<GuidesLibraryPage />)} />
        <Route path="/guides/tikfulfill-build-guide" element={page(<TikFulfillGuidePage />)} />
        <Route path="/guides/build-your-own-ai-seller-copilot" element={page(<SellerCopilotGuidePage />)} />
        <Route path="/guides/ai-agent-safety-audit" element={page(<AgentSafetyAuditGuidePage />)} />
        <Route path="/guides/tiktok-shop-outreach-seller-guide" element={page(<TikTokShopOutreachSellerGuidePage />)} />
        <Route path="/guides/client-website-prompt-pack" element={page(<PromptPackGuidePage />)} />
        <Route path="/guides/sellerradar-part-1" element={page(<SellerRadarPart1GuidePage />)} />
        <Route path="/guides/claimback" element={page(<ClaimbackGuidePage />)} />
        <Route path="/blog" element={page(<BlogPage />)} />
        <Route path="/blog/:slug" element={page(<BlogPostPage />)} />
        <Route path="/submit-testimonial" element={page(<SubmitTestimonial />)} />
        <Route
          path="/blueprint-library"
          element={<Suspense fallback={<div className="min-h-screen bg-[#030712]" />}><BlueprintLibrary /></Suspense>}
        />
        <Route
          path="/blueprint-library/:id"
          element={<Suspense fallback={<div className="min-h-screen bg-[#030712]" />}><BlueprintDetail /></Suspense>}
        />
        <Route path="*" element={page(<NotFound />)} />
      </Routes>
      <PublicBusinessDisclosure />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </BrowserRouter>
  );
}
