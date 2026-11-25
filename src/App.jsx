import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Sparkles } from 'lucide-react';

import LandingPage from './components/landing/LandingPage.jsx';
import Header from './components/ui/Header.jsx';
import PlaybackBar from './components/ui/PlaybackBar.jsx';
import { CubeCanvas } from './components/3d/CubeCanvas.jsx';
import TimerHUD from './components/ui/TimerHUD.jsx';

import { useTheme } from './hooks/useTheme.js';
import { useCubeState } from './hooks/useCubeState.js';
import { usePlayback } from './hooks/usePlayback.js';
import { initKociemba } from './solver/kociemba.js';

import {
  playClickSound,
  playVictorySound,
  isMuted as getAudioMuted,
  toggleMute as toggleAudioMute,
} from './utils/audio.js';

import {
  t as translateKey,
  getSavedLanguage,
  saveLanguage,
} from './utils/i18n.js';

// Lazy loaded contextual studio drawers and modals
const CalibrationDrawer = React.lazy(() => import('./components/ui/CalibrationDrawer.jsx'));
const StepExplanation = React.lazy(() => import('./components/ui/StepExplanation.jsx'));
const ShortcutsModal = React.lazy(() => import('./components/ui/ShortcutsModal.jsx'));
const PuzzleGalleryModal = React.lazy(() => import('./components/ui/PuzzleGalleryModal.jsx'));

const ONBOARDING_STORAGE_KEY = 'cube_studio_onboarding_dismissed';

export default function App() {
  // Two-View Architecture: 'landing' vs 'studio' (defaults to 'landing')
  const [viewMode, setViewMode] = useState('landing');

  // Two-State Application Machine in Studio: 'solve' vs 'calibrate'
  const [appMode, setAppMode] = useState('solve');
  const isPaintMode = appMode === 'calibrate';

  // App Settings
  const [solverMode, setSolverMode] = useState('optimal'); // 'optimal' | 'beginner'
  const [lang, setLang] = useState(() => getSavedLanguage());
  const [isMuted, setIsMuted] = useState(() => getAudioMuted());
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  // First-time Studio onboarding tooltip state
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(ONBOARDING_STORAGE_KEY) !== 'true';
    } catch {
      return false;
    }
  });

  const dismissOnboarding = useCallback(() => {
    setShowOnboarding(false);
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Unified Light / Dark Theme
  const { theme, toggleTheme } = useTheme();
  const handleToggleTheme = useCallback(() => {
    playClickSound();
    toggleTheme();
  }, [toggleTheme]);

  // Victory Celebration Rubber Stamp State
  const [showVictoryStamp, setShowVictoryStamp] = useState(false);
  const victoryTimerRef = useRef(null);

  // 3D Canvas & cross-hook refs
  const cubeCanvasRef = useRef(null);
  const resetPlaybackRef = useRef(null);
  const [speed, setSpeed] = useState(1);

  const t = useCallback((key, fallback, params) => {
    const val = translateKey(key, lang, params);
    return (val && val !== key) ? val : (fallback || key);
  }, [lang]);

  const handleSetLang = useCallback((newLang) => {
    setLang(newLang);
    saveLanguage(newLang);
  }, []);

  const handleToggleMute = useCallback(() => {
    const nextMuted = toggleAudioMute();
    setIsMuted(nextMuted);
  }, []);

  const handleSolved = useCallback(() => {
    playVictorySound();
    cubeCanvasRef.current?.resetCamera?.();
    setShowVictoryStamp(true);
    if (victoryTimerRef.current) {
      clearTimeout(victoryTimerRef.current);
    }
    victoryTimerRef.current = setTimeout(() => {
      setShowVictoryStamp(false);
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (victoryTimerRef.current) {
        clearTimeout(victoryTimerRef.current);
      }
    };
  }, []);

  // Pre-warm Kociemba solver tables when entering Studio mode
  useEffect(() => {
    if (viewMode === 'studio') {
      initKociemba();
    }
  }, [viewMode]);

  const {
    cubeState,
    setCubeState,
    selectedColor,
    setSelectedColor,
    puzzleSize,
    colorCounts,
    blankCount,
    validation,
    isUnpainted,
    validationErrorMessage,
    isCubeSolved,
    handleSetPuzzleSize,
    handleScramble,
    handleResetSolved,
    handleClearBlank,
    handleStickerClick,
    handleApplyMove,
  } = useCubeState({
    cubeCanvasRef,
    appMode,
    setAppMode,
    t,
    onResetPlaybackState: useCallback(() => resetPlaybackRef.current?.(), []),
    onSolved: handleSolved,
    speed,
  });

  const {
    solution,
    currentStepIndex,
    isPlaying,
    setIsPlaying,
    isSolving,
    activeStep,
    resetPlaybackState,
    handleSolve,
    handleStepForward,
    handleStepBackward,
    handleResetPlayback,
    handleJumpToStep,
  } = usePlayback({
    cubeCanvasRef,
    cubeState,
    setCubeState,
    puzzleSize,
    solverMode,
    validation,
    isCubeSolved,
    speed,
    onSolved: handleSolved,
  });

  resetPlaybackRef.current = resetPlaybackState;

  // Keyboard Shortcuts Listener (active only in Studio Mode)
  useEffect(() => {
    if (viewMode !== 'studio') return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key;
      const code = e.code;

      if (key === 'Escape') {
        setIsShortcutsOpen(false);
        setIsGalleryOpen(false);
        setAppMode('solve');
        return;
      }

      if (appMode === 'calibrate' || isTimerOpen || isShortcutsOpen || isGalleryOpen) {
        return;
      }

      if (code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (code === 'ArrowRight') {
        e.preventDefault();
        handleStepForward();
      } else if (code === 'ArrowLeft') {
        e.preventDefault();
        handleStepBackward();
      } else if (code === 'Enter') {
        e.preventDefault();
        handleSolve();
      } else if (key === 's' || key === 'S') {
        e.preventDefault();
        handleScramble();
      } else if (key === 'p' || key === 'P') {
        e.preventDefault();
        setAppMode((prev) => (prev === 'solve' ? 'calibrate' : 'solve'));
      } else if (key === 'm' || key === 'M') {
        e.preventDefault();
        handleToggleMute();
      } else if (key === 'c' || key === 'C') {
        e.preventDefault();
        handleResetSolved();
      } else if (key === '?' || key === '/' || key === 'k' || key === 'K') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (key === 'Escape') {
        setIsShortcutsOpen(false);
        setAppMode('solve');
      } else if (['u', 'd', 'l', 'r', 'f', 'b'].includes(key.toLowerCase())) {
        const face = key.toUpperCase();
        const move = e.shiftKey ? `${face}'` : face;
        handleApplyMove(move);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    viewMode,
    appMode,
    isTimerOpen,
    isShortcutsOpen,
    isGalleryOpen,
    setIsPlaying,
    handleStepForward,
    handleStepBackward,
    handleSolve,
    handleScramble,
    handleToggleMute,
    handleResetSolved,
    handleApplyMove,
  ]);

  // VIEW 1: Educational Landing Page
  if (viewMode === 'landing') {
    return (
      <LandingPage
        onEnterStudio={(targetMode) => {
          if (typeof targetMode === 'string' && (targetMode === 'optimal' || targetMode === 'beginner')) {
            setSolverMode(targetMode);
          }
          setViewMode('studio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        setLang={handleSetLang}
        t={t}
      />
    );
  }

  // VIEW 2: Fullscreen Focused Studio Mode
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FDFBF7] dark:bg-[#121212] text-[#18181B] dark:text-zinc-100 flex flex-col select-none">
      {/* Top Header */}
      <Header
        solverMode={solverMode}
        setSolverMode={setSolverMode}
        appMode={appMode}
        onToggleAppMode={() => setAppMode((prev) => (prev === 'solve' ? 'calibrate' : 'solve'))}
        lang={lang}
        setLang={handleSetLang}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onRecenter={() => cubeCanvasRef.current?.resetCamera?.()}
        onBackToHome={() => setViewMode('landing')}
        puzzleSize={puzzleSize}
        onChangePuzzleSize={handleSetPuzzleSize}
        onOpenGallery={() => setIsGalleryOpen(true)}
        isTimerOpen={isTimerOpen}
        onToggleTimer={() => setIsTimerOpen((prev) => !prev)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        t={t}
      />

      {/* Speedcubing Timer Floating Top-Center HUD */}
      <TimerHUD
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        isCubeSolved={isCubeSolved}
        lang={lang}
        t={t}
      />

      {/* Main 3D Viewport & Interactive Overlays */}
      <main className="relative flex-1 w-full overflow-hidden flex flex-col bg-graph-grid">
        {/* Three.js 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <CubeCanvas
            ref={cubeCanvasRef}
            cubeSize={puzzleSize}
            cubeState={cubeState}
            isPaintMode={isPaintMode && puzzleSize === 3}
            selectedColor={selectedColor}
            onStickerClick={handleStickerClick}
            playbackSpeed={speed === 'instant' ? 4 : speed}
            className="w-full h-full"
          />
        </div>

        {/* Dismissible First-Time Studio Onboarding Tooltip */}
        {showOnboarding && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4 pointer-events-auto">
            <div className="flex items-start gap-3 bg-[#FFE600] dark:bg-[#1E1E22] text-black dark:text-zinc-100 border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#3F3F46] px-3.5 py-2.5 text-xs font-mono">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-black dark:text-[#FFE600]" />
              <div className="flex-1 leading-relaxed">
                {lang === 'id'
                  ? 'Seret kubus 3D untuk memutar sudut pandang, klik Acak lalu Pecahkan, atau tekan ? untuk pintasan keyboard.'
                  : 'Drag the 3D cube to orbit, click Scramble then Solve, or press ? for keyboard shortcuts.'}
              </div>
              <button
                type="button"
                onClick={dismissOnboarding}
                aria-label={lang === 'id' ? 'Tutup panduan' : 'Dismiss tip'}
                className="shrink-0 p-0.5 border border-black dark:border-zinc-600 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Studio Overlays */}
        <div className="relative z-10 w-full h-full pointer-events-none p-3 sm:p-4 flex flex-col justify-end">
          {(solverMode === 'beginner' || activeStep) && solution.length > 0 && currentStepIndex >= 0 && (
            <div className="w-full max-w-2xl mx-auto mb-2 pointer-events-auto">
              <React.Suspense fallback={null}>
                <StepExplanation
                  currentStep={activeStep}
                  currentStepIndex={currentStepIndex}
                  totalSteps={solution.length}
                  solverMode={solverMode}
                  t={t}
                />
              </React.Suspense>
            </div>
          )}

          {/* Unified Bottom Command Dock */}
          <PlaybackBar
            solution={solution}
            currentStepIndex={currentStepIndex}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onResetPlayback={handleResetPlayback}
            onJumpToStep={handleJumpToStep}
            speed={speed}
            onChangeSpeed={setSpeed}
            onScramble={handleScramble}
            onSolve={handleSolve}
            isSolving={isSolving}
            isSolved={isCubeSolved}
            solverMode={solverMode}
            isValidState={validation.isValid}
            validationError={validationErrorMessage}
            isUnpainted={isUnpainted}
            t={t}
          />
        </div>
      </main>

      {/* Calibration Studio Drawer (Contextual Mode B, Lazy Loaded) */}
      <React.Suspense fallback={null}>
        {appMode === 'calibrate' && (
          <CalibrationDrawer
            isOpen={appMode === 'calibrate'}
            onClose={() => setAppMode('solve')}
            cubeState={cubeState}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            onStickerClick={handleStickerClick}
            colorCounts={colorCounts}
            blankCount={blankCount}
            validation={validation}
            validationErrorMessage={validationErrorMessage}
            onResetSolved={handleResetSolved}
            onClearBlank={handleClearBlank}
            onScramble={handleScramble}
            t={t}
          />
        )}
      </React.Suspense>

      {/* Keyboard Shortcuts Modal (Lazy Loaded) */}
      <React.Suspense fallback={null}>
        {isShortcutsOpen && (
          <ShortcutsModal
            isOpen={isShortcutsOpen}
            onClose={() => setIsShortcutsOpen(false)}
            t={t}
          />
        )}
      </React.Suspense>

      {/* Puzzle Catalog & Gallery Modal (Lazy Loaded) */}
      <React.Suspense fallback={null}>
        {isGalleryOpen && (
          <PuzzleGalleryModal
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            currentSize={puzzleSize}
            onSelectPuzzle={handleSetPuzzleSize}
            lang={lang}
            t={t}
          />
        )}
      </React.Suspense>

      {/* Victory Celebration Rubber Stamp */}
      {showVictoryStamp && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="border-4 border-dashed border-[#EF4444] dark:border-[#FF6B6B] text-[#EF4444] dark:text-[#FF6B6B] font-mono font-black rotate-[-8deg] px-6 py-2 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#3F3F46] bg-[#FDFBF7] dark:bg-[#1E1E22] text-4xl sm:text-6xl tracking-widest animate-slam-down select-none">
            {lang === 'id' ? 'SELESAI' : 'SOLVED'}
          </div>
        </div>
      )}
    </div>
  );
}
