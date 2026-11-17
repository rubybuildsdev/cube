import React from 'react';
import { Sparkles, Globe, Heart, ArrowUp } from 'lucide-react';

/**
 * LandingFooter - Minimalist retro neubrutalist footer
 * Features copyright notice, credit to Google DeepMind / Antigravity,
 * quick anchor navigation, language switcher, and 'Buka Studio ⚡' CTA.
 */
export default function LandingFooter({
  onEnterStudio,
  lang = 'id',
  setLang,
  t
}) {
  const tr = (key, fallback) => {
    if (typeof t === 'function') {
      const val = t(key);
      if (val && val !== key) return val;
    }
    return fallback;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F5EFEB] border-t-[2.5px] border-black select-none">
      
      {/* Top Banner CTA Strip */}
      <div className="bg-[#FFE600] border-b-[2.5px] border-black py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-black font-sans tracking-tight">
              {tr('footer.ctaTitle', 'Siap Menyelesaikan Kubus Anda Sekarang?')}
            </h3>
            <p className="text-sm font-medium text-zinc-900 mt-0.5">
              {tr('footer.ctaSubtitle', 'Masuki studio 3D lengkap dengan kontrol interaktif, acak, dan pemecah instan.')}
            </p>
          </div>

          <button
            type="button"
            onClick={onEnterStudio}
            className="brutal-btn brutal-btn-white px-6 py-3 text-base gap-2 shrink-0 shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000]"
          >
            <Sparkles className="w-4 h-4 fill-black text-black" />
            <span>{tr('footer.cta', 'Buka Studio Solver ⚡')}</span>
          </button>
        </div>
      </div>

      {/* Main Footer Navigation & Brand Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              {/* Miniature Yellow Cube Icon */}
              <div className="w-8 h-8 bg-[#FFE600] border-2 border-black p-0.5 flex flex-col justify-between shadow-[2px_2px_0px_#000]">
                <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                  <div className="bg-white border-[0.5px] border-black"></div>
                  <div className="bg-[#FFE600] border-[0.5px] border-black"></div>
                  <div className="bg-[#FF5252] border-[0.5px] border-black"></div>
                  <div className="bg-[#24C789] border-[0.5px] border-black"></div>
                  <div className="bg-[#FFE600] border-[0.5px] border-black"></div>
                  <div className="bg-[#2563EB] border-[0.5px] border-black"></div>
                  <div className="bg-[#FF8A00] border-[0.5px] border-black"></div>
                  <div className="bg-white border-[0.5px] border-black"></div>
                  <div className="bg-[#24C789] border-[0.5px] border-black"></div>
                </div>
              </div>
              <span className="font-black text-xl tracking-tight text-black font-sans">
                CubeSolver 3D
              </span>
            </div>

            <p className="text-sm text-zinc-700 leading-relaxed max-w-md font-medium mb-4">
              {tr(
                'footer.desc',
                'Laboratorium Rubik 3D taktil interaktif dengan simulasi Three.js WebGL, algoritma optimal Kociemba, tutorial Layer-by-Layer terpandu, dan studio kalibrasi stiker.'
              )}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
              <span className="px-2 py-0.5 bg-white border border-black shadow-[1px_1px_0px_#000]">
                v2.0 Tactile Retro
              </span>
              <span className="px-2 py-0.5 bg-white border border-black shadow-[1px_1px_0px_#000]">
                100% Client-Side
              </span>
            </div>
          </div>

          {/* Col 3: Quick Anchor Links */}
          <div>
            <h4 className="font-mono text-xs font-black uppercase text-black tracking-wider mb-4 pb-1 border-b-2 border-black">
              {tr('footer.quickLinks', 'Navigasi')}
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <a href="#features" className="text-zinc-800 hover:text-black hover:underline">
                  {tr('nav.features', 'Fitur Utama')}
                </a>
              </li>
              <li>
                <a href="#algorithms" className="text-zinc-800 hover:text-black hover:underline">
                  {tr('nav.algorithms', 'Perbandingan Algoritma')}
                </a>
              </li>
              <li>
                <a href="#notation" className="text-zinc-800 hover:text-black hover:underline">
                  {tr('nav.notation', 'Kamus Notasi WCA')}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-zinc-800 hover:text-black hover:underline">
                  {tr('nav.faq', 'Pertanyaan Umum')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Language Switcher & Controls */}
          <div>
            <h4 className="font-mono text-xs font-black uppercase text-black tracking-wider mb-4 pb-1 border-b-2 border-black">
              {tr('ui.language', 'Pilihan Bahasa')}
            </h4>

            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setLang && setLang('id')}
                className={`px-3 py-1.5 font-mono text-xs font-bold border-2 border-black transition-all ${
                  lang === 'id'
                    ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-white text-zinc-700 shadow-[1px_1px_0px_#000]'
                }`}
              >
                🇮🇩 Bahasa Indonesia
              </button>

              <button
                type="button"
                onClick={() => setLang && setLang('en')}
                className={`px-3 py-1.5 font-mono text-xs font-bold border-2 border-black transition-all ${
                  lang === 'en'
                    ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-white text-zinc-700 shadow-[1px_1px_0px_#000]'
                }`}
              >
                🇬🇧 English
              </button>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="brutal-btn brutal-btn-white text-xs px-3 py-1.5 gap-1.5 mt-2"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Kembali ke Atas</span>
            </button>
          </div>

        </div>

        {/* Bottom Legal / Copyright Strip */}
        <div className="pt-6 border-t-2 border-black/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-600">
          <div>
            {tr('footer.copyright', '© 2026 CubeSolver 3D. Open source under MIT License.')}
          </div>

          <div className="flex items-center gap-1.5">
            <span>{tr('footer.builtWith', 'Dirancang dengan presisi oleh')}</span>
            <span className="font-bold text-black bg-[#FFE600] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
              {tr('app.author', 'Ruby')}
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
}
