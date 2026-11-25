import React, { useState } from 'react';
import { Menu, X, Sparkles, Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';

/**
 * LandingNavbar - Neubrutalist tactile top navigation bar
 * Features brandplate with yellow cube icon, anchor links, language switch,
 * tactile theme toggle switch (Sun / Moon) persisted in localStorage,
 * and high-contrast 'Buka Studio ⚡' CTA button.
 */
export default function LandingNavbar({
  onEnterStudio,
  lang = 'id',
  setLang,
  t
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const tr = (key, fallback) => {
    if (typeof t === 'function') {
      const val = t(key);
      if (val && val !== key) return val;
    }
    return fallback;
  };

  const navLinks = [
    { href: '#features', label: tr('nav.features', 'Fitur') },
    { href: '#algorithms', label: tr('nav.algorithms', 'Algoritma') },
    { href: '#notation', label: tr('nav.notation', 'Notasi') },
    { href: '#faq', label: tr('nav.faq', 'FAQ') },
    { href: '#legal', label: tr('nav.legal', 'Legal & Kontak') },
  ];

  const toggleLanguage = () => {
    if (setLang) {
      setLang(lang === 'id' ? 'en' : 'id');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FDFBF7] dark:bg-[#18181B] border-b-[2.5px] border-black dark:border-zinc-800 select-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brandplate */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
          title="CubeSolver 3D Home"
        >
          {/* Miniature 3x3 Rubik Cube Icon */}
          <div className="w-10 h-10 bg-[#FFE600] border-[2.5px] border-black shadow-[3px_3px_0px_#000] p-1 flex flex-col justify-between group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_#000] transition-transform">
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

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-black dark:text-white font-sans">
                CubeSolver
              </span>
              <span className="bg-[#2563EB] text-white text-xs font-mono font-bold px-1.5 py-0.5 border border-black shadow-[1.5px_1.5px_0px_#000]">
                3D
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 hidden sm:inline-block leading-none">
              {tr('nav.brandSubtitle', 'Laboratorium & Solver Rubik')}
            </span>
          </div>
        </a>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm font-bold text-black dark:text-zinc-200 hover:bg-[#F5EFEB] dark:hover:bg-[#27272A] border border-transparent hover:border-black dark:hover:border-zinc-700 rounded-none transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Controls: Theme Switcher, Language Switcher & Studio CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Tactile Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="brutal-btn brutal-btn-white dark:bg-[#1E1E22] dark:border-zinc-700 text-xs p-2 shadow-[2.5px_2.5px_0px_#000]"
            title={isDark ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
            aria-label="Toggle dark / light theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#FFE600] fill-[#FFE600]" />
            ) : (
              <Moon className="w-4 h-4 text-black fill-black" />
            )}
          </button>

          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="brutal-btn brutal-btn-white dark:bg-[#1E1E22] dark:text-white dark:border-zinc-700 text-xs px-2.5 py-1.5 gap-1.5 shadow-[2.5px_2.5px_0px_#000]"
            title="Ganti Bahasa / Switch Language"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-mono font-bold uppercase">{lang}</span>
            <span className="text-zinc-400">|</span>
            <span className="text-zinc-500 text-[10px] uppercase font-mono">
              {lang === 'id' ? 'EN' : 'ID'}
            </span>
          </button>

          {/* Prominent Tactile CTA Button */}
          <button
            type="button"
            onClick={onEnterStudio}
            className="brutal-btn brutal-btn-yellow px-4 py-2 text-sm gap-2"
          >
            <Sparkles className="w-4 h-4 fill-black text-black" />
            <span>{tr('nav.launchStudio', 'Buka Studio ⚡')}</span>
          </button>
        </div>

        {/* Mobile Controls: Theme, Language & Hamburger */}
        <div className="flex md:hidden items-center gap-1.5">
          {/* Mobile Theme Switch Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="brutal-btn brutal-btn-white dark:bg-[#1E1E22] dark:border-zinc-700 text-xs p-2"
            aria-label="Toggle dark / light theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#FFE600] fill-[#FFE600]" />
            ) : (
              <Moon className="w-4 h-4 text-black fill-black" />
            )}
          </button>

          {/* Mobile Language Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="brutal-btn brutal-btn-white dark:bg-[#1E1E22] dark:text-white dark:border-zinc-700 text-xs px-2 py-1.5"
            aria-label="Toggle language"
          >
            <span className="font-mono font-bold uppercase">{lang}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="brutal-btn brutal-btn-white dark:bg-[#1E1E22] dark:text-white dark:border-zinc-700 p-2"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-[2.5px] border-black dark:border-zinc-800 bg-[#F5EFEB] dark:bg-[#1E1E22] px-4 py-5 flex flex-col gap-3 transition-colors">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 bg-white dark:bg-[#27272A] border-2 border-black dark:border-zinc-700 font-bold text-sm text-black dark:text-white shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onEnterStudio) onEnterStudio();
            }}
            className="brutal-btn brutal-btn-yellow w-full py-3 text-base gap-2 mt-2"
          >
            <Sparkles className="w-4 h-4 fill-black text-black" />
            <span>{tr('nav.launchStudio', 'Buka Studio ⚡')}</span>
          </button>
        </div>
      )}
    </header>
  );
}
