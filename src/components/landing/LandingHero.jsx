import React from 'react';
import { Sparkles, ArrowDown, Move, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { CubeCanvas } from '../3d/CubeCanvas.jsx';

/**
 * LandingHero - Neubrutalist Hero Section with Centered 3D Stage
 * Features centered headline, immediate above-the-fold CTA buttons,
 * pure flat paper tone 3D Three.js interactive preview,
 * adjacent stage action controls, and quick performance metrics.
 */
export default function LandingHero({ onEnterStudio, t }) {
  const tr = (key, fallback) => {
    if (typeof t === 'function') {
      const val = t(key);
      if (val && val !== key) return val;
    }
    return fallback;
  };

  const handleScrollToFeatures = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#features';
    }
  };

  return (
    <section className="relative w-full bg-[#FDFBF7] dark:bg-[#121212] bg-graph-grid border-b-[2.5px] border-black dark:border-zinc-800 pt-8 pb-14 sm:pt-12 sm:pb-20 overflow-hidden transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Top Centered Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFE600] border-2 border-black shadow-[2.5px_2.5px_0px_#000] mb-5">
          <Zap className="w-4 h-4 fill-black text-black" />
          <span className="font-mono text-xs font-bold uppercase tracking-wide text-black">
            {tr('hero.badge', '100% Client-Side WebGL • Kociemba 2-Phase Engine')}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white leading-[1.1] max-w-4xl mb-4 font-sans">
          {tr('hero.title', 'Kuasai Kubus Rubik dalam')}{' '}
          <span className="inline-block relative px-2.5 py-0.5 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-1deg] text-black">
            {tr('hero.titleHighlight', '3D Interaktif')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl font-medium leading-relaxed mb-6">
          {tr(
            'hero.subtitle',
            'Pecahkan kubus acak hanya dalam ~20 langkah dengan algoritma optimal Kociemba, atau pelajari logika penyelesaian lapis-demi-lapis (LBL) secara visual langkah demi langkah.'
          )}
        </p>

        {/* 1. ABOVE-THE-FOLD PRIMARY & SECONDARY CTA (Directly below subtitle) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-8">
          <button
            type="button"
            onClick={onEnterStudio}
            className="brutal-btn brutal-btn-yellow w-full sm:w-auto px-7 py-3.5 text-base sm:text-lg gap-2.5 shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000]"
          >
            <Sparkles className="w-5 h-5 fill-black text-black" />
            <span>{tr('hero.ctaPrimary', 'Buka Studio Solver ⚡')}</span>
          </button>

          <a
            href="#features"
            onClick={handleScrollToFeatures}
            className="brutal-btn brutal-btn-white dark:bg-[#1E1E22] dark:text-white w-full sm:w-auto px-6 py-3.5 text-base sm:text-lg gap-2 shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000]"
          >
            <ArrowDown className="w-5 h-5 text-black dark:text-white" />
            <span>{tr('hero.ctaSecondary', 'Pelajari Fitur ↓')}</span>
          </a>
        </div>

        {/* CENTERED 3D STAGE CONTAINER */}
        <div className="w-full max-w-2xl mx-auto mb-6">
          <div className="brutal-card overflow-hidden bg-white dark:bg-[#1E1E22]">
            
            {/* Stage Hardware Instrument Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#F5EFEB] dark:bg-[#27272A] border-b-2 border-black dark:border-zinc-700 select-none">
              <div className="flex items-center gap-2">
                {/* Vintage Hardware LED Indicators */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5252] border border-black"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] border border-black"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#24C789] border border-black"></span>
                </div>
                <span className="font-mono text-[11px] font-bold text-zinc-800 dark:text-zinc-200 ml-1">
                  STAGE // REAL-TIME 3D PREVIEW
                </span>
              </div>

              {/* Stage Adjacent Action Controls */}
              <div className="flex items-center gap-2">
                {/* Quick Studio CTA adjacent to 3D stage */}
                <button
                  type="button"
                  onClick={onEnterStudio}
                  className="hidden sm:inline-flex brutal-btn brutal-btn-yellow text-xs px-2.5 py-1 gap-1 shadow-[2px_2px_0px_#000]"
                  title="Masuk Studio Solver"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black text-black" />
                  <span className="font-mono font-bold">{tr('hero.ctaPrimary', 'Buka Studio Solver ⚡')}</span>
                </button>

                {/* Interactive Cue Badge */}
                <div className="flex items-center gap-1.5 bg-white dark:bg-[#1E1E22] border border-black dark:border-zinc-700 px-2 py-0.5 shadow-[1.5px_1.5px_0px_#000]">
                  <Move className="w-3 h-3 text-black dark:text-white" />
                  <span className="font-mono text-[10px] font-bold uppercase text-black dark:text-white">
                    {tr('hero.badgeInteractive', 'Tarik untuk Memutar')}
                  </span>
                </div>
              </div>
            </div>

            {/* 3D Cube Canvas Viewport - Pure flat paper tone, zero gradient */}
            <div className="relative w-full h-[320px] sm:h-[380px] bg-[#FDFBF7] dark:bg-[#121212] flex items-center justify-center">
              <CubeCanvas
                autoRotate={true}
                showShadow={true}
                className="w-full h-full"
              />
            </div>

            {/* Stage Footer Status Strip */}
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#F5EFEB] dark:bg-[#27272A] border-t-2 border-black dark:border-zinc-700 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#24C789] animate-pulse"></span>
                THREE.JS WEBGL ENGINE
              </span>
              <span className="hidden sm:inline text-zinc-500 dark:text-zinc-400">
                ORBIT CONTROLS ACTIVE • 60 FPS
              </span>
              <span className="font-bold text-black dark:text-white">
                STATUS: SOLVED
              </span>
            </div>
          </div>
        </div>

        {/* ADJACENT UNDERNEATH 3D STAGE: Primary CTA Button & Secondary Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-10">
          <button
            type="button"
            onClick={onEnterStudio}
            className="brutal-btn brutal-btn-yellow w-full sm:w-auto px-7 py-3 text-base sm:text-lg gap-2.5 shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000]"
          >
            <Sparkles className="w-5 h-5 fill-black text-black" />
            <span>{tr('hero.ctaPrimary', 'Buka Studio Solver ⚡')}</span>
          </button>

          <a
            href="#features"
            onClick={handleScrollToFeatures}
            className="brutal-btn brutal-btn-white dark:bg-[#1E1E22] dark:text-white w-full sm:w-auto px-6 py-3 text-base sm:text-lg gap-2 shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000]"
          >
            <ArrowDown className="w-5 h-5 text-black dark:text-white" />
            <span>{tr('hero.ctaSecondary', 'Pelajari Fitur ↓')}</span>
          </a>
        </div>

        {/* Quick Highlights / Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
          <div className="brutal-card p-3 flex items-center gap-3 bg-white dark:bg-[#1E1E22]">
            <div className="w-9 h-9 bg-[#FFE600] border-2 border-black flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div className="text-left">
              <div className="font-black text-sm text-black dark:text-white">~20 {tr('hero.statMoves', 'Langkah')}</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">Kociemba Two-Phase</div>
            </div>
          </div>

          <div className="brutal-card p-3 flex items-center gap-3 bg-white dark:bg-[#1E1E22]">
            <div className="w-9 h-9 bg-[#24C789] border-2 border-black flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-black" />
            </div>
            <div className="text-left">
              <div className="font-black text-sm text-black dark:text-white">&lt; 20ms {tr('hero.statSpeed', 'Kalkulasi')}</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">Zero Latency</div>
            </div>
          </div>

          <div className="brutal-card p-3 flex items-center gap-3 bg-white dark:bg-[#1E1E22]">
            <div className="w-9 h-9 bg-[#2563EB] text-white border-2 border-black flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-black text-sm text-black dark:text-white">100% Offline</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">{tr('hero.statOffline', 'Client-Side Aman')}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
