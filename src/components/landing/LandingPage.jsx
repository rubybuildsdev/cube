import React, { lazy, Suspense } from 'react';
import LandingNavbar from './LandingNavbar.jsx';
import LandingHero from './LandingHero.jsx';
import LandingFeatures from './LandingFeatures.jsx';
import LandingFooter from './LandingFooter.jsx';

// Lazy loaded below-the-fold components
const AlgorithmComparison = lazy(() => import('./AlgorithmComparison.jsx'));
const NotationGuide = lazy(() => import('./NotationGuide.jsx'));
const LandingFAQ = lazy(() => import('./LandingFAQ.jsx'));
const LegalContactSection = lazy(() => import('./LegalContactSection.jsx'));

function SectionLoader() {
  return (
    <div className="w-full py-16 flex items-center justify-center">
      <div className="px-4 py-2 bg-white dark:bg-[#1E1E22] border-2 border-black dark:border-zinc-700 shadow-[3px_3px_0px_#000] font-mono text-xs font-bold text-black dark:text-white animate-pulse">
        Memuat modul...
      </div>
    </div>
  );
}

/**
 * LandingPage - Complete Educational Landing Page in Neubrutalism / Tactile Retro style.
 * Assembles Navbar, Hero with 3D stage, Bento Features, Algorithm Comparison,
 * Notation Cheat Sheet, FAQ accordion, Legal & Contact Section, and Footer.
 */
export default function LandingPage({
  onEnterStudio,
  lang = 'id',
  setLang,
  t
}) {
  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#121212] text-[#18181B] dark:text-[#F4F4F5] font-sans flex flex-col transition-colors">
      {/* 1. Neubrutalist Navigation Bar */}
      <LandingNavbar
        onEnterStudio={onEnterStudio}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* 2. Centered 3D Stage Hero with Above-the-fold CTA */}
      <LandingHero
        onEnterStudio={onEnterStudio}
        t={t}
      />

      {/* 3. Bento Grid Features Section */}
      <LandingFeatures
        t={t}
      />

      {/* 4. Side-by-side Algorithm Comparison Matrix (Lazy Loaded) */}
      <Suspense fallback={<SectionLoader />}>
        <AlgorithmComparison
          onEnterStudio={onEnterStudio}
          t={t}
        />
      </Suspense>

      {/* 5. Interactive WCA Notation Cheat Sheet (Lazy Loaded) */}
      <Suspense fallback={<SectionLoader />}>
        <NotationGuide
          t={t}
        />
      </Suspense>

      {/* 6. Neubrutalist FAQ Accordion (Lazy Loaded) */}
      <Suspense fallback={<SectionLoader />}>
        <LandingFAQ
          t={t}
        />
      </Suspense>

      {/* 7. Neubrutalist Legal & Contact Section (Directly Above Footer, Lazy Loaded) */}
      <Suspense fallback={<SectionLoader />}>
        <LegalContactSection
          t={t}
        />
      </Suspense>

      {/* 8. Minimalist Retro Footer */}
      <LandingFooter
        onEnterStudio={onEnterStudio}
        lang={lang}
        setLang={setLang}
        t={t}
      />
    </div>
  );
}
