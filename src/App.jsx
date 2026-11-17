import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import LandingPage from './components/landing/LandingPage.jsx';
import Header from './components/ui/Header.jsx';
import PlaybackBar from './components/ui/PlaybackBar.jsx';
import { CubeCanvas } from './components/3d/CubeCanvas.jsx';

// Lazy loaded contextual studio drawers and modals
const CalibrationDrawer = React.lazy(() => import('./components/ui/CalibrationDrawer.jsx'));
const StepExplanation = React.lazy(() => import('./components/ui/StepExplanation.jsx'));
const ShortcutsModal = React.lazy(() => import('./components/ui/ShortcutsModal.jsx'));
const PuzzleGalleryModal = React.lazy(() => import('./components/ui/PuzzleGalleryModal.jsx'));
import TimerHUD from './components/ui/TimerHUD.jsx';

import {
  createSolvedState,
  createBlankState,
  cloneState,
  applyMove,
  applyMoves,
  validateCubeState,
  isSolved,
  invertMove,
  CANONICAL_CENTERS,
  FACE_NAMES
} from './solver/cubeState.js';

import { generateScramble, applyScramble } from './solver/scramble.js';
import { solveKociemba } from './solver/kociemba.js';
import { solveBeginnerLBL } from './solver/beginnerLBL.js';

import {
  playTurnSound,
  playClickSound,
  playVictorySound,
  playScrambleSound,
  playErrorSound,
  isMuted as getAudioMuted,
  toggleMute as toggleAudioMute
} from './utils/audio.js';

import {
  t as translateKey,
  getSavedLanguage,
  saveLanguage
} from './utils/i18n.js';

export default function App() {
  // Two-View Architecture: 'landing' vs 'studio' (defaults to 'landing')
  const [viewMode, setViewMode] = useState('landing');

  // Core Cube State (54 facelets in 6 faces: U, R, F, D, L, B)
  const [cubeState, setCubeState] = useState(() => createSolvedState());
  const [selectedColor, setSelectedColor] = useState('W');

  // Two-State Application Machine in Studio: 'solve' vs 'calibrate'
  const [appMode, setAppMode] = useState('solve');
  const isPaintMode = appMode === 'calibrate';

  // App Settings
  const [solverMode, setSolverMode] = useState('optimal'); // 'optimal' | 'beginner'
  const [lang, setLang] = useState(() => getSavedLanguage());
  const [isMuted, setIsMuted] = useState(() => getAudioMuted());
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Multi-Puzzle & Custom NxN State (default 3x3)
  const [puzzleSize, setPuzzleSize] = useState(3);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Speedcubing Timer State
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  // Light / Dark Theme State with localStorage persistence
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cube_theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch {
        return 'light';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    try {
      localStorage.setItem('theme', theme);
      localStorage.setItem('cubesolver_theme', theme);
      localStorage.setItem('cube_theme', theme);
      window.dispatchEvent(new CustomEvent('theme-change', { detail: { isDark: theme === 'dark' } }));
    } catch {
      // Storage fallback
    }
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    playClickSound();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Victory Celebration Rubber Stamp State
  const [showVictoryStamp, setShowVictoryStamp] = useState(false);
  const victoryTimerRef = useRef(null);

  // Playback & Solution State
  const [solution, setSolution] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isSolving, setIsSolving] = useState(false);
  const [initialStateBeforeSolve, setInitialStateBeforeSolve] = useState(null);

  // 3D Canvas Reference
  const cubeCanvasRef = useRef(null);
  const playbackTimerRef = useRef(null);

  // Translation helper wrapper
  const t = useCallback((key, fallback, params) => {
    return translateKey(key, lang, params) || fallback || key;
  }, [lang]);

  // Handle language switch and persistence
  const handleSetLang = useCallback((newLang) => {
    setLang(newLang);
    saveLanguage(newLang);
  }, []);

  // Handle audio mute switch
  const handleToggleMute = useCallback(() => {
    const nextMuted = toggleAudioMute();
    setIsMuted(nextMuted);
  }, []);

  // Compute color counts for validation & palette display
  const colorCounts = useMemo(() => {
    const counts = { W: 0, Y: 0, G: 0, B: 0, R: 0, O: 0 };
    for (const f of FACE_NAMES) {
      if (cubeState[f]) {
        for (let i = 0; i < 9; i++) {
          const c = cubeState[f][i];
          if (counts[c] !== undefined) {
            counts[c]++;
          }
        }
      }
    }
    return counts;
  }, [cubeState]);

  // Compute unpainted/blank stickers count
  const blankCount = useMemo(() => {
    let count = 0;
    for (const f of FACE_NAMES) {
      if (cubeState[f]) {
        for (let i = 0; i < 9; i++) {
          if (cubeState[f][i] === 'X' || !cubeState[f][i]) {
            count++;
          }
        }
      }
    }
    return count;
  }, [cubeState]);

  // Real-time state validation
  const validation = useMemo(() => {
    return validateCubeState(cubeState);
  }, [cubeState]);

  const isUnpainted = validation.errorKey === 'unpainted_stickers';

  const validationErrorMessage = useMemo(() => {
    if (validation.isValid) return null;
    if (validation.errorKey === 'unpainted_stickers') {
      return t('validation.unpaintedStickers', `${validation.blankCount} stiker belum diwarnai. Silakan pilih warna untuk melengkapi.`, { count: validation.blankCount });
    }
    if (validation.errorKey === 'invalid_color_count') {
      return validation.details || t('validation.colorCountMismatch', 'Jumlah warna tidak sesuai');
    }
    if (validation.errorKey === 'invalid_centers') {
      return t('validation.centerCanonical', 'Stiker pusat harus tetap kanonikal');
    }
    if (validation.errorKey === 'corner_parity_error') {
      return t('validation.cornerParityError', 'Terdeteksi satu sudut terputar');
    }
    if (validation.errorKey === 'edge_flip_error') {
      return t('validation.edgeParityError', 'Terdeteksi satu edge terbalik');
    }
    if (validation.errorKey === 'parity_error') {
      return t('validation.parityError', 'Terdeteksi kesalahan paritas');
    }
    return validation.details || t('validation.invalidConfig', 'Konfigurasi tidak valid');
  }, [validation, t]);

  // Check if cube is solved
  const isCubeSolved = useMemo(() => {
    return isSolved(cubeState);
  }, [cubeState]);

  // Precision solved confirmation & victory celebration rubber stamp
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

  // Clean up victory celebration timer on unmount
  useEffect(() => {
    return () => {
      if (victoryTimerRef.current) {
        clearTimeout(victoryTimerRef.current);
      }
    };
  }, []);

  // Stop active playback animation
  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
  }, []);

  // Handle Puzzle Size Switch (2x2, 3x3, 4x4, 5x5, Custom 2..7)
  const handleSetPuzzleSize = useCallback((newSize) => {
    const validSize = Math.max(2, Math.min(7, parseInt(newSize, 10) || 3));
    setPuzzleSize(validSize);
    stopPlayback();
    setSolution([]);
    setCurrentStepIndex(-1);
    setInitialStateBeforeSolve(null);
    if (validSize === 3) {
      const solved = createSolvedState();
      setCubeState(solved);
      if (cubeCanvasRef.current?.setCubeState) {
        cubeCanvasRef.current.setCubeState(solved);
      }
    }
  }, [stopPlayback]);

  // Handle Scramble Action
  const handleScramble = useCallback(() => {
    stopPlayback();
    playScrambleSound();
    const scrambleMoves = generateScramble(20);
    const scrambled = applyScramble(createSolvedState(), scrambleMoves);
    setCubeState(scrambled);
    setSolution([]);
    setCurrentStepIndex(-1);
    setInitialStateBeforeSolve(null);

    if (cubeCanvasRef.current?.setCubeState) {
      cubeCanvasRef.current.setCubeState(scrambled);
    }
  }, [stopPlayback]);

  // Handle Reset to Solved
  const handleResetSolved = useCallback(() => {
    stopPlayback();
    playClickSound();
    const solved = createSolvedState();
    setCubeState(solved);
    setSolution([]);
    setCurrentStepIndex(-1);
    setInitialStateBeforeSolve(null);

    if (cubeCanvasRef.current?.setCubeState) {
      cubeCanvasRef.current.setCubeState(solved);
    }
  }, [stopPlayback]);

  // Handle Clear Stickers to Blank for manual input
  const handleClearBlank = useCallback(() => {
    stopPlayback();
    playClickSound();
    const blank = createBlankState();
    setCubeState(blank);
    setSolution([]);
    setCurrentStepIndex(-1);
    setInitialStateBeforeSolve(null);
    setAppMode('calibrate');

    if (cubeCanvasRef.current?.setCubeState) {
      cubeCanvasRef.current.setCubeState(blank);
    }
  }, [stopPlayback]);

  // Handle Sticker Click (From 3D Canvas or Calibration Drawer 2D Net)
  const handleStickerClick = useCallback(({ face, index }) => {
    if (!face || index === undefined) return;

    if (appMode === 'calibrate') {
      // Centers are canonical and define the cube's orientation
      if (index === 4 && selectedColor !== CANONICAL_CENTERS[face]) {
        playErrorSound();
        return;
      }

      setCubeState((prev) => {
        const next = { ...prev, [face]: [...prev[face]] };
        next[face][index] = selectedColor;
        return next;
      });

      // State changed: invalidate ongoing playback
      stopPlayback();
      setSolution([]);
      setCurrentStepIndex(-1);
      setInitialStateBeforeSolve(null);
    }
  }, [appMode, selectedColor, stopPlayback]);

  // Handle Direct Face Move (from keyboard shortcuts)
  const handleApplyMove = useCallback((move) => {
    if (!move) return;
    stopPlayback();

    const isInstant = speed === 'instant';

    // Animate move in 3D canvas
    if (cubeCanvasRef.current?.executeMove) {
      cubeCanvasRef.current.executeMove(move, !isInstant);
    }

    setCubeState((prev) => {
      const next = applyMove(prev, move);
      playTurnSound(isInstant ? 4 : speed);
      if (isSolved(next)) {
        setTimeout(handleSolved, 250);
      }
      return next;
    });

    setSolution([]);
    setCurrentStepIndex(-1);
    setInitialStateBeforeSolve(null);
  }, [stopPlayback, speed, handleSolved]);

  // Solve Cube Action
  const handleSolve = useCallback(async () => {
    stopPlayback();

    if (!validation.isValid) {
      playErrorSound();
      return;
    }

    if (isCubeSolved) {
      handleSolved();
      return;
    }

    setIsSolving(true);
    playClickSound();

    try {
      let movesList = [];

      if (solverMode === 'beginner') {
        movesList = solveBeginnerLBL(cubeState);
      } else {
        // Optimal Kociemba Algorithm (~20 moves)
        const optimalMoves = solveKociemba(cubeState);
        movesList = optimalMoves.map((m) => ({
          move: m,
          phaseId: null,
          phaseNameId: null,
        }));
      }

      setInitialStateBeforeSolve(cloneState(cubeState));
      setSolution(movesList);
      setCurrentStepIndex(-1);
      setIsSolving(false);

      // Auto start playback
      setIsPlaying(true);
    } catch (err) {
      console.error('Solve error:', err);
      setIsSolving(false);
      playErrorSound();
    }
  }, [stopPlayback, validation, isCubeSolved, handleSolved, solverMode, cubeState]);

  // Playback Auto-Advance Loop
  useEffect(() => {
    if (!isPlaying || !solution.length) return;

    // Check if solution already finished
    if (currentStepIndex >= solution.length - 1) {
      setIsPlaying(false);
      if (isSolved(cubeState)) {
        handleSolved();
      }
      return;
    }

    const nextIndex = currentStepIndex + 1;
    const step = solution[nextIndex];
    const move = typeof step === 'string' ? step : step.move;
    const isInstant = speed === 'instant';
    const duration = isInstant ? 20 : Math.max(80, Math.floor(220 / speed));

    playbackTimerRef.current = setTimeout(() => {
      if (cubeCanvasRef.current?.executeMove) {
        cubeCanvasRef.current.executeMove(move, !isInstant);
      }

      setCubeState((prev) => {
        const next = applyMove(prev, move);
        playTurnSound(isInstant ? 4 : speed);
        return next;
      });

      setCurrentStepIndex(nextIndex);
    }, duration + (isInstant ? 10 : 40));

    return () => {
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, solution, speed, cubeState, handleSolved]);

  // Step Forward Single Move
  const handleStepForward = useCallback(() => {
    stopPlayback();
    if (!solution.length || currentStepIndex >= solution.length - 1) return;

    const nextIndex = currentStepIndex + 1;
    const step = solution[nextIndex];
    const move = typeof step === 'string' ? step : step.move;
    const isInstant = speed === 'instant';

    if (cubeCanvasRef.current?.executeMove) {
      cubeCanvasRef.current.executeMove(move, !isInstant);
    }

    setCubeState((prev) => {
      const next = applyMove(prev, move);
      playTurnSound(isInstant ? 4 : speed);
      if (nextIndex === solution.length - 1 && isSolved(next)) {
        setTimeout(handleSolved, 250);
      }
      return next;
    });

    setCurrentStepIndex(nextIndex);
  }, [stopPlayback, solution, currentStepIndex, speed, handleSolved]);

  // Step Backward Single Move
  const handleStepBackward = useCallback(() => {
    stopPlayback();
    if (!solution.length || currentStepIndex < 0) return;

    const currentStep = solution[currentStepIndex];
    const move = typeof currentStep === 'string' ? currentStep : currentStep.move;
    const inverted = invertMove(move);
    const isInstant = speed === 'instant';

    if (cubeCanvasRef.current?.executeMove) {
      cubeCanvasRef.current.executeMove(inverted, !isInstant);
    }

    setCubeState((prev) => {
      const next = applyMove(prev, inverted);
      playTurnSound(isInstant ? 4 : speed);
      return next;
    });

    setCurrentStepIndex(currentStepIndex - 1);
  }, [stopPlayback, solution, currentStepIndex, speed]);

  // Reset Playback to Beginning of Solution
  const handleResetPlayback = useCallback(() => {
    stopPlayback();
    playClickSound();
    if (!initialStateBeforeSolve) return;

    setCubeState(cloneState(initialStateBeforeSolve));
    setCurrentStepIndex(-1);

    if (cubeCanvasRef.current?.setCubeState) {
      cubeCanvasRef.current.setCubeState(initialStateBeforeSolve);
    }
  }, [stopPlayback, initialStateBeforeSolve]);

  // Jump Directly to Step in Timeline
  const handleJumpToStep = useCallback((targetIndex) => {
    stopPlayback();
    playClickSound();

    const base = initialStateBeforeSolve || createSolvedState();
    let targetState;

    if (targetIndex === -1) {
      targetState = cloneState(base);
    } else {
      const movesToApply = solution
        .slice(0, targetIndex + 1)
        .map((s) => (typeof s === 'string' ? s : s.move));
      targetState = applyMoves(base, movesToApply);
    }

    setCubeState(targetState);
    setCurrentStepIndex(targetIndex);

    if (cubeCanvasRef.current?.setCubeState) {
      cubeCanvasRef.current.setCubeState(targetState);
    }

    if (targetIndex === solution.length - 1 && isSolved(targetState)) {
      handleSolved();
    }
  }, [stopPlayback, initialStateBeforeSolve, solution, handleSolved]);

  // Keyboard Shortcuts Listener (active only in Studio Mode)
  useEffect(() => {
    if (viewMode !== 'studio') return;

    const handleKeyDown = (e) => {
      // Ignore if user is inside an input or typing in dialog
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key;
      const code = e.code;

      if (code === 'Space') {
        if (isTimerOpen) {
          // TimerHUD owns Spacebar when timer is active
          return;
        }
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
    isTimerOpen,
    handleStepForward,
    handleStepBackward,
    handleSolve,
    handleScramble,
    handleToggleMute,
    handleResetSolved,
    handleApplyMove
  ]);

  const activeStep = solution[currentStepIndex] || null;

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

        {/* Studio Overlays */}
        <div className="relative z-10 w-full h-full pointer-events-none p-3 sm:p-4 flex flex-col justify-end">
          {/* Step Explanation Card (Rendered only when active step in Beginner or active step) */}
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
          <div className="border-4 border-dashed border-[#EF4444] text-[#EF4444] font-mono font-black rotate-[-8deg] px-6 py-2 shadow-[6px_6px_0px_#000] bg-[#FDFBF7] text-4xl sm:text-6xl tracking-widest animate-slam-down select-none">
            {lang === 'id' ? 'SELESAI' : 'SOLVED'}
          </div>
        </div>
      )}
    </div>
  );
}
