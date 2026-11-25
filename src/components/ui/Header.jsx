import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Volume2,
  VolumeX,
  Languages,
  Compass,
  Palette,
  Check,
  ArrowLeft,
  Timer,
  Sun,
  Moon,
  LayoutGrid,
  Sliders,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../../utils/audio';

export default function Header({
  solverMode = 'optimal',
  setSolverMode,
  appMode = 'solve',
  onToggleAppMode,
  lang = 'en',
  setLang,
  isMuted = false,
  onToggleMute,
  onOpenShortcuts,
  onRecenter,
  onBackToHome,
  puzzleSize = 3,
  onChangePuzzleSize,
  onOpenGallery,
  isTimerOpen = false,
  onToggleTimer,
  theme = 'light',
  onToggleTheme,
  t = (key, fallback) => fallback || key,
}) {
  const [showCustomSlider, setShowCustomSlider] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const customSliderRef = useRef(null);
  const toolsMenuRef = useRef(null);

  // Close custom slider popup on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (customSliderRef.current && !customSliderRef.current.contains(event.target)) {
        setShowCustomSlider(false);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setShowToolsMenu(false);
      }
    }
    if (showCustomSlider || showToolsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCustomSlider, showToolsMenu]);

  const handleModeChange = (mode) => {
    playClickSound();
    if (setSolverMode) setSolverMode(mode);
  };

  const handleLangToggle = () => {
    playClickSound();
    if (setLang) setLang(lang === 'en' ? 'id' : 'en');
  };

  const handleMuteToggle = () => {
    playClickSound();
    if (onToggleMute) onToggleMute();
  };

  const handleShortcutsOpen = () => {
    playClickSound();
    if (onOpenShortcuts) onOpenShortcuts();
  };

  const handleRecenter = () => {
    playClickSound();
    if (onRecenter) onRecenter();
  };

  const handleToggleMode = () => {
    playClickSound();
    if (onToggleAppMode) onToggleAppMode();
  };

  const handleBackToHome = () => {
    playClickSound();
    if (onBackToHome) onBackToHome();
  };

  const handlePuzzleSelect = (size) => {
    playClickSound();
    if (onChangePuzzleSize) onChangePuzzleSize(size);
    setShowCustomSlider(false);
  };

  const handleTimerToggle = () => {
    playClickSound();
    if (onToggleTimer) onToggleTimer();
  };

  const handleThemeToggle = () => {
    playClickSound();
    if (onToggleTheme) onToggleTheme();
  };

  const handleGalleryOpen = () => {
    playClickSound();
    if (onOpenGallery) onOpenGallery();
  };

  return (
    <header className="w-full bg-[#F5EFEB] dark:bg-[#1E1E22] border-b-[3px] border-black dark:border-zinc-700 sticky top-0 z-40 px-3 sm:px-5 py-2 transition-colors select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Section: Back Button + Instrument Plate Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onBackToHome && (
            <button
              type="button"
              onClick={handleBackToHome}
              onMouseEnter={playHoverSound}
              className="brutal-btn brutal-btn-white px-2.5 py-1.5 rounded-lg border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFE600] text-xs font-bold font-mono flex items-center gap-1.5 text-black dark:text-zinc-100 hover:bg-[#FFE600] dark:hover:bg-[#FFE600] dark:hover:text-black transition-colors cursor-pointer"
              title={lang === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="font-mono hidden xs:inline">{lang === 'id' ? 'Beranda' : 'Home'}</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] rounded-lg text-black">
              <Box className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-black dark:text-zinc-100 font-mono">
                {t('header.title', 'CubeSolver 3D')}
              </h1>
              <span className="hidden xl:inline-block text-[11px] text-zinc-600 dark:text-zinc-400 font-mono border-l-2 border-black/30 dark:border-zinc-600 pl-2 font-medium">
                {t('header.subtitle', "Interactive 3D Rubik's Cube Solver & Tutorial")}
              </span>
            </div>
          </div>
        </div>

        {/* Center-Left Section: Quick Puzzle Switcher Pills + Gallery Button */}
        <div className="flex items-center gap-1.5">
          {/* Quick NxN Pills */}
          <div className="brutal-bay p-0.5 rounded-xl flex items-center gap-1 bg-[#ECE5DF] dark:bg-[#18181B] border-2 border-black dark:border-zinc-700">
            {[2, 3, 4, 5].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handlePuzzleSelect(size)}
                onMouseEnter={playHoverSound}
                className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  puzzleSize === size
                    ? 'bg-[#FFE600] text-black border border-black shadow-[1.5px_1.5px_0px_#000]'
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
                }`}
                title={t(`header.puzzle${size}x${size}`, `${size}x${size}`)}
              >
                {size}x{size}
              </button>
            ))}

            {/* Custom ⚙ Pill with Popover Slider */}
            <div className="relative" ref={customSliderRef}>
              <button
                type="button"
                onClick={() => setShowCustomSlider((prev) => !prev)}
                onMouseEnter={playHoverSound}
                className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  puzzleSize > 5 || showCustomSlider
                    ? 'bg-[#FF8A00] text-black border border-black shadow-[1.5px_1.5px_0px_#000]'
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
                }`}
                title={t('header.puzzleCustom', 'Custom ⚙')}
              >
                <Sliders className="w-3 h-3 stroke-[2.2]" />
                <span className="hidden sm:inline">{t('header.puzzleCustom', 'Custom ⚙')}</span>
                {puzzleSize > 5 && <span>({puzzleSize}x{puzzleSize})</span>}
              </button>

              {/* Popover Slider */}
              {showCustomSlider && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-3 bg-white dark:bg-[#1E1E22] border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600] rounded-xl z-50 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-black dark:text-zinc-100">
                    <span>{t('header.puzzleSize', 'Ukuran Kubus')}:</span>
                    <span className="bg-[#FFE600] text-black px-1.5 py-0.5 rounded border border-black font-black">
                      {puzzleSize}x{puzzleSize}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="7"
                    step="1"
                    value={puzzleSize}
                    onChange={(e) => handlePuzzleSelect(parseInt(e.target.value, 10))}
                    className="w-full accent-black cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>2x2</span>
                    <span>3x3</span>
                    <span>5x5</span>
                    <span>7x7</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Galeri Puzzle Button */}
          <button
            type="button"
            onClick={handleGalleryOpen}
            onMouseEnter={playHoverSound}
            className="brutal-btn brutal-btn-white px-2.5 py-1 rounded-lg border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFE600] text-xs font-mono font-bold flex items-center gap-1.5 text-black dark:text-zinc-100 hover:bg-[#FFE600] dark:hover:bg-[#FFE600] dark:hover:text-black transition-all cursor-pointer"
            title={t('header.puzzleGalleryTitle', 'Galeri & Katalog Puzzle WCA')}
          >
            <LayoutGrid className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="hidden md:inline">{t('header.puzzleGallery', 'Galeri Puzzle')}</span>
          </button>
        </div>

        {/* Center Section: Solver Mode Switcher (Tactile Sunken Bay - active for 3x3) */}
        {puzzleSize === 3 ? (
          <div className="brutal-bay p-1 rounded-xl flex items-center gap-1 bg-[#ECE5DF] dark:bg-[#18181B] border-2 border-black dark:border-zinc-700 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.25)]">
            <button
              type="button"
              onClick={() => handleModeChange('optimal')}
              onMouseEnter={playHoverSound}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                solverMode === 'optimal'
                  ? 'bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white border-2 border-transparent hover:bg-black/5'
              }`}
              title={t('header.optimalTooltip', 'Solves in ~20 moves using Two-Phase Algorithm')}
            >
              <span className="hidden sm:inline">{t('header.optimalMode', 'Optimal (~20 Moves)')}</span>
              <span className="sm:hidden">{t('header.optimalShort', 'Optimal')}</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('beginner')}
              onMouseEnter={playHoverSound}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                solverMode === 'beginner'
                  ? 'bg-[#24C789] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white border-2 border-transparent hover:bg-black/5'
              }`}
              title={t('header.beginnerTooltip', 'Step-by-step Layer-by-Layer Tutorial')}
            >
              <span className="hidden sm:inline">{t('header.beginnerMode', 'Beginner (LBL)')}</span>
              <span className="sm:hidden">{t('header.beginnerShort', 'Beginner')}</span>
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 brutal-badge bg-[#FFE600] text-black px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-mono font-bold">
            <span>{puzzleSize}x{puzzleSize} Sandbox</span>
            <button
              type="button"
              onClick={() => handlePuzzleSelect(3)}
              className="underline hover:text-blue-700 ml-1 cursor-pointer"
              title="Aktifkan Solver 3x3"
            >
              (Solver 3x3)
            </button>
          </div>
        )}

        {/* Right Section: Tactile Utility Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Calibrate Mode Toggle (Active only for 3x3) */}
          {puzzleSize === 3 && (
            <button
              type="button"
              onClick={handleToggleMode}
              onMouseEnter={playHoverSound}
              className={`brutal-btn px-2.5 py-1.5 rounded-lg text-xs font-bold border-2 border-black dark:border-zinc-700 transition-all cursor-pointer flex items-center gap-1.5 ${
                appMode === 'calibrate'
                  ? 'bg-[#24C789] text-black shadow-[2px_2px_0px_#000]'
                  : 'bg-white dark:bg-[#1E1E22] hover:bg-[#FDFBF7] text-black dark:text-zinc-100 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFE600]'
              }`}
              title={appMode === 'calibrate' ? t('header.exitCalibrate', 'Done / Return') : t('header.calibrate', 'Calibrate Cube')}
            >
              {appMode === 'calibrate' ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <Palette className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
              <span className="hidden lg:inline font-mono">
                {appMode === 'calibrate' ? t('header.exitCalibrate', 'Done / Return') : t('header.calibrate', 'Calibrate Cube')}
              </span>
            </button>
          )}

          {/* Recenter Camera */}
          <button
            type="button"
            onClick={handleRecenter}
            onMouseEnter={playHoverSound}
            className="brutal-btn brutal-btn-white p-1.5 rounded-lg border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFE600] text-black dark:text-zinc-100 dark:bg-[#1E1E22] transition-all cursor-pointer"
            title={t('controls.recenter', 'Recenter View')}
            aria-label={t('controls.recenter', 'Recenter View')}
          >
            <Compass className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Settings / Tools Dropdown */}
          <div className="relative" ref={toolsMenuRef}>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setShowToolsMenu((prev) => !prev);
              }}
              onMouseEnter={playHoverSound}
              aria-expanded={showToolsMenu}
              aria-haspopup="true"
              aria-label={t('header.tools', 'Settings & Tools')}
              title={t('header.tools', 'Settings & Tools')}
              className={`brutal-btn px-2.5 py-1.5 rounded-lg text-xs font-bold font-mono border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFE600] transition-all cursor-pointer flex items-center gap-1.5 ${
                showToolsMenu || isTimerOpen
                  ? 'bg-[#FFE600] text-black'
                  : 'bg-white dark:bg-[#1E1E22] text-black dark:text-zinc-100 hover:bg-[#FDFBF7]'
              }`}
            >
              <Settings className="w-3.5 h-3.5 stroke-[2.3]" />
              <span className="hidden sm:inline">{t('header.tools', 'Tools')}</span>
              <ChevronDown className={`w-3 h-3 stroke-[2.5] transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} />
            </button>

            {showToolsMenu && (
              <div
                role="menu"
                aria-label={t('header.tools', 'Settings & Tools')}
                className="absolute top-full right-0 mt-2 w-56 p-2 bg-white dark:bg-[#1E1E22] border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600] rounded-xl z-50 flex flex-col gap-1"
              >
                {/* Speedcubing Timer */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    handleTimerToggle();
                    setShowToolsMenu(false);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-full px-2.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    isTimerOpen
                      ? 'bg-[#24C789] text-black border border-black'
                      : 'text-black dark:text-zinc-100 hover:bg-[#F5EFEB] dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Timer className="w-3.5 h-3.5 stroke-[2.3]" />
                    {t('header.timer', 'Timer')}
                  </span>
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded border border-black/30 dark:border-zinc-600 bg-white/70 dark:bg-zinc-900">
                    {isTimerOpen ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* Theme Switcher */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleThemeToggle}
                  onMouseEnter={playHoverSound}
                  className="w-full px-2.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between text-black dark:text-zinc-100 hover:bg-[#F5EFEB] dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? (
                      <Sun className="w-3.5 h-3.5 stroke-[2.2] text-[#FFE600]" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 stroke-[2.2]" />
                    )}
                    {theme === 'dark' ? t('header.themeLight', 'Mode Terang') : t('header.themeDark', 'Mode Gelap')}
                  </span>
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded border border-black/30 dark:border-zinc-600 bg-[#ECE5DF] dark:bg-zinc-900">
                    {theme}
                  </span>
                </button>

                {/* Audio Mute Toggle */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleMuteToggle}
                  onMouseEnter={playHoverSound}
                  className="w-full px-2.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between text-black dark:text-zinc-100 hover:bg-[#F5EFEB] dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5 stroke-[2.2] text-[#FF5252]" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 stroke-[2.2] text-[#24C789]" />
                    )}
                    {isMuted ? t('header.unmute', 'Unmute Audio') : t('header.mute', 'Mute Audio')}
                  </span>
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded border border-black/30 dark:border-zinc-600 bg-[#ECE5DF] dark:bg-zinc-900">
                    {isMuted ? 'MUTED' : 'ON'}
                  </span>
                </button>

                {/* Language Toggle */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLangToggle}
                  onMouseEnter={playHoverSound}
                  className="w-full px-2.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between text-black dark:text-zinc-100 hover:bg-[#F5EFEB] dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Languages className="w-3.5 h-3.5 stroke-[2.2]" />
                    {t('header.toggleLang', 'Language')}
                  </span>
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded border border-black/30 dark:border-zinc-600 bg-[#FFE600] text-black font-black">
                    {lang}
                  </span>
                </button>

                {/* Shortcuts Guide */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    handleShortcutsOpen();
                    setShowToolsMenu(false);
                  }}
                  onMouseEnter={playHoverSound}
                  className="w-full px-2.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between text-black dark:text-zinc-100 hover:bg-[#F5EFEB] dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 inline-flex items-center justify-center font-black">?</span>
                    {t('header.shortcuts', 'Keyboard Shortcuts')}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded border border-black/30 dark:border-zinc-600 bg-[#ECE5DF] dark:bg-zinc-900">
                    ? / K
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
