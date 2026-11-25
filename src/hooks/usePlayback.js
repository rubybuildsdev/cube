import { useState, useEffect, useRef, useCallback } from 'react';
import {
  createSolvedState,
  cloneState,
  applyMove,
  applyMoves,
  isSolved,
  invertMove,
} from '../solver/cubeState.js';
import { solveKociemba } from '../solver/kociemba.js';
import { solveBeginnerLBL } from '../solver/beginnerLBL.js';
import {
  playTurnSound,
  playClickSound,
  playErrorSound,
} from '../utils/audio.js';

/**
 * Manages solver execution and step-by-step playback state & controls.
 */
export function usePlayback({
  cubeCanvasRef,
  cubeState,
  setCubeState,
  puzzleSize = 3,
  solverMode,
  validation,
  isCubeSolved,
  speed,
  onSolved,
}) {
  const [solution, setSolution] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [initialStateBeforeSolve, setInitialStateBeforeSolve] = useState(null);

  const playbackTimerRef = useRef(null);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
    cubeCanvasRef.current?.stopAnimation?.();
  }, [cubeCanvasRef]);

  const resetPlaybackState = useCallback(() => {
    stopPlayback();
    setSolution([]);
    setCurrentStepIndex(-1);
    setInitialStateBeforeSolve(null);
  }, [stopPlayback]);

  const handleSolve = useCallback(async () => {
    if (puzzleSize !== 3) return;
    stopPlayback();

    if (!validation.isValid) {
      playErrorSound();
      return;
    }

    if (isCubeSolved) {
      onSolved?.();
      return;
    }

    setIsSolving(true);
    playClickSound();

    try {
      let movesList = [];
      if (solverMode === 'beginner') {
        movesList = solveBeginnerLBL(cubeState);
      } else {
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
      setIsPlaying(true);
    } catch (err) {
      console.error('Solve error:', err);
      setIsSolving(false);
      playErrorSound();
    }
    }, [stopPlayback, puzzleSize, validation, isCubeSolved, onSolved, solverMode, cubeState]);

  useEffect(() => {
    if (!isPlaying || !solution.length) return;

    if (currentStepIndex >= solution.length - 1) {
      setIsPlaying(false);
      if (isSolved(cubeState)) {
        onSolved?.();
      }
      return;
    }

    const nextIndex = currentStepIndex + 1;
    const step = solution[nextIndex];
    const move = typeof step === 'string' ? step : step.move;
    const isInstant = speed === 'instant';
    const duration = isInstant ? 20 : Math.max(80, Math.floor(220 / speed));

    playbackTimerRef.current = setTimeout(() => {
      cubeCanvasRef.current?.executeMove?.(move, !isInstant);

      setCubeState((prev) => {
        const next = applyMove(prev, move);
        if (isInstant) {
          playTurnSound(4);
        }
        return next;
      });

      setCurrentStepIndex(nextIndex);
    }, duration + (isInstant ? 10 : 40));

    return () => {
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, solution, speed, cubeState, setCubeState, cubeCanvasRef, onSolved]);

  const handleStepForward = useCallback(() => {
    stopPlayback();
    if (!solution.length || currentStepIndex >= solution.length - 1) return;

    const nextIndex = currentStepIndex + 1;
    const step = solution[nextIndex];
    const move = typeof step === 'string' ? step : step.move;
    const isInstant = speed === 'instant';

    cubeCanvasRef.current?.executeMove?.(move, !isInstant);

    setCubeState((prev) => {
      const next = applyMove(prev, move);
      if (isInstant) {
        playTurnSound(4);
      }
      if (nextIndex === solution.length - 1 && isSolved(next)) {
        setTimeout(() => onSolved?.(), 250);
      }
      return next;
    });

    setCurrentStepIndex(nextIndex);
  }, [stopPlayback, solution, currentStepIndex, speed, cubeCanvasRef, setCubeState, onSolved]);

  const handleStepBackward = useCallback(() => {
    stopPlayback();
    if (!solution.length || currentStepIndex < 0) return;

    const currentStep = solution[currentStepIndex];
    const move = typeof currentStep === 'string' ? currentStep : currentStep.move;
    const inverted = invertMove(move);
    const isInstant = speed === 'instant';

    cubeCanvasRef.current?.executeMove?.(inverted, !isInstant);

    setCubeState((prev) => {
      const next = applyMove(prev, inverted);
      if (isInstant) {
        playTurnSound(4);
      }
      return next;
    });

    setCurrentStepIndex(currentStepIndex - 1);
  }, [stopPlayback, solution, currentStepIndex, speed, cubeCanvasRef, setCubeState]);

  const handleResetPlayback = useCallback(() => {
    stopPlayback();
    playClickSound();
    if (!initialStateBeforeSolve) return;

    setCubeState(cloneState(initialStateBeforeSolve));
    setCurrentStepIndex(-1);
    cubeCanvasRef.current?.setCubeState?.(initialStateBeforeSolve);
  }, [stopPlayback, initialStateBeforeSolve, setCubeState, cubeCanvasRef]);

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
    cubeCanvasRef.current?.setCubeState?.(targetState);

    if (targetIndex === solution.length - 1 && isSolved(targetState)) {
      onSolved?.();
    }
  }, [stopPlayback, initialStateBeforeSolve, solution, setCubeState, cubeCanvasRef, onSolved]);

  const activeStep = solution[currentStepIndex] || null;

  return {
    solution,
    currentStepIndex,
    isPlaying,
    setIsPlaying,
    isSolving,
    activeStep,
    stopPlayback,
    resetPlaybackState,
    handleSolve,
    handleStepForward,
    handleStepBackward,
    handleResetPlayback,
    handleJumpToStep,
  };
}
