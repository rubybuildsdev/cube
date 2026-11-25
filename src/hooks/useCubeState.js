import { useState, useMemo, useCallback } from 'react';
import {
  createSolvedState,
  createBlankState,
  applyMove,
  validateCubeState,
  isSolved,
  CANONICAL_CENTERS,
  FACE_NAMES,
} from '../solver/cubeState.js';
import { generateScramble, applyScramble } from '../solver/scramble.js';
import {
  playTurnSound,
  playClickSound,
  playScrambleSound,
  playErrorSound,
} from '../utils/audio.js';

/**
 * Manages the 3x3 cube state, puzzle size, sticker calibration,
 * validation, and direct move/scramble/reset actions.
 */
export function useCubeState({
  cubeCanvasRef,
  appMode,
  setAppMode,
  t,
  onResetPlaybackState,
  onSolved,
  speed = 1,
}) {
  const [cubeState, setCubeState] = useState(() => createSolvedState());
  const [selectedColor, setSelectedColor] = useState('W');
  const [puzzleSize, setPuzzleSize] = useState(3);

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

  const validation = useMemo(() => validateCubeState(cubeState), [cubeState]);
  const isUnpainted = validation.errorKey === 'unpainted_stickers';

  const validationErrorMessage = useMemo(() => {
    if (validation.isValid) return null;
    if (validation.errorKey === 'unpainted_stickers') {
      return t(
        'validation.unpaintedStickers',
        `${validation.blankCount} stiker belum diwarnai. Silakan pilih warna untuk melengkapi.`,
        { count: validation.blankCount }
      );
    }
    if (validation.errorKey === 'invalid_color_count') {
      return validation.details || t('validation.colorCountMismatch', 'Jumlah warna tidak sesuai');
    }
    if (validation.errorKey === 'invalid_centers') {
      return t('validation.centerCanonical', 'Stiker pusat harus tetap kanonikal');
    }
    if (validation.errorKey === 'corner_twist_error') {
      return t('validation.cornerParityError', 'Terdeteksi satu sudut terputar');
    }
    if (validation.errorKey === 'edge_flip_error') {
      return t('validation.edgeParityError', 'Terdeteksi satu edge terbalik');
    }
    if (validation.errorKey === 'invalid_corners' || validation.errorKey === 'invalid_edges') {
      return validation.details || t('validation.invalidConfig', 'Konfigurasi tidak valid');
    }
    if (validation.errorKey === 'parity_error') {
      return t('validation.parityError', 'Terdeteksi kesalahan paritas');
    }
    return validation.details || t('validation.invalidConfig', 'Konfigurasi tidak valid');
  }, [validation, t]);

  const isCubeSolved = useMemo(() => isSolved(cubeState), [cubeState]);

  const handleSetPuzzleSize = useCallback((newSize) => {
    const validSize = Math.max(2, Math.min(7, parseInt(newSize, 10) || 3));
    setPuzzleSize(validSize);
    onResetPlaybackState?.();
    if (validSize === 3) {
      const solved = createSolvedState();
      setCubeState(solved);
      cubeCanvasRef.current?.setCubeState?.(solved);
    }
  }, [cubeCanvasRef, onResetPlaybackState]);

  const handleScramble = useCallback(() => {
    if (puzzleSize !== 3) return;
    onResetPlaybackState?.();
    playScrambleSound();
    const scrambleMoves = generateScramble(20);
    const scrambled = applyScramble(createSolvedState(), scrambleMoves);
    setCubeState(scrambled);
    cubeCanvasRef.current?.setCubeState?.(scrambled);
  }, [puzzleSize, cubeCanvasRef, onResetPlaybackState]);

  const handleResetSolved = useCallback(() => {
    onResetPlaybackState?.();
    playClickSound();
    const solved = createSolvedState();
    setCubeState(solved);
    cubeCanvasRef.current?.setCubeState?.(solved);
  }, [cubeCanvasRef, onResetPlaybackState]);

  const handleClearBlank = useCallback(() => {
    onResetPlaybackState?.();
    playClickSound();
    const blank = createBlankState();
    setCubeState(blank);
    setAppMode('calibrate');
    cubeCanvasRef.current?.setCubeState?.(blank);
  }, [cubeCanvasRef, onResetPlaybackState, setAppMode]);

  const handleStickerClick = useCallback(({ face, index }) => {
    if (!face || index === undefined) return;
    if (appMode === 'calibrate') {
      if (index === 4 && selectedColor !== CANONICAL_CENTERS[face]) {
        playErrorSound();
        return;
      }
      setCubeState((prev) => {
        const next = { ...prev, [face]: [...prev[face]] };
        next[face][index] = selectedColor;
        return next;
      });
      onResetPlaybackState?.();
    }
  }, [appMode, selectedColor, onResetPlaybackState]);

  const handleApplyMove = useCallback((move) => {
    if (!move || puzzleSize !== 3) return;
    onResetPlaybackState?.();
    const isInstant = speed === 'instant';
    cubeCanvasRef.current?.executeMove?.(move, !isInstant);

    setCubeState((prev) => {
      const next = applyMove(prev, move);
      if (isInstant) {
        playTurnSound(4);
      }
      if (isSolved(next)) {
        setTimeout(() => onSolved?.(), 250);
      }
      return next;
    });
  }, [puzzleSize, cubeCanvasRef, onResetPlaybackState, speed, onSolved]);

  return {
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
  };
}
