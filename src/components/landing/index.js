/**
 * Landing Page Component Module for CubeSolver 3D
 * Neubrutalism & Tactile Retro Educational System
 */

export { default as LandingNavbar } from './LandingNavbar.jsx';
export { default as LandingHero } from './LandingHero.jsx';
export { default as LandingFeatures } from './LandingFeatures.jsx';
export { default as AlgorithmComparison } from './AlgorithmComparison.jsx';
export { default as NotationGuide } from './NotationGuide.jsx';
export { default as LandingFAQ } from './LandingFAQ.jsx';
export { default as LegalContactSection } from './LegalContactSection.jsx';
export { default as LandingFooter } from './LandingFooter.jsx';
export { default as LandingPage } from './LandingPage.jsx';

export default {
  LandingNavbar: () => import('./LandingNavbar.jsx'),
  LandingHero: () => import('./LandingHero.jsx'),
  LandingFeatures: () => import('./LandingFeatures.jsx'),
  AlgorithmComparison: () => import('./AlgorithmComparison.jsx'),
  NotationGuide: () => import('./NotationGuide.jsx'),
  LandingFAQ: () => import('./LandingFAQ.jsx'),
  LegalContactSection: () => import('./LegalContactSection.jsx'),
  LandingFooter: () => import('./LandingFooter.jsx'),
  LandingPage: () => import('./LandingPage.jsx'),
};
