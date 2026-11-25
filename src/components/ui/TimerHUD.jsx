import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Play, Pause, RotateCcw, X, Volume2, VolumeX, Flame, Trophy, Clock, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { getAudioContext, playClickSound, playHoverSound } from '../../utils/audio';

const STORAGE_KEY_TIMES = 'cubesolver_timer_times_v1';
const STORAGE_KEY_PREFS = 'cubesolver_timer_prefs_v1';

function formatTime(ms) {
  if (ms < 0 || isNaN(ms)) ms = 0;
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const millis = Math.floor(ms % 1000);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
}

function formatShortTime(ms) {
  if (ms === null || ms === undefined || isNaN(ms)) return '--';
  return (ms / 1000).toFixed(2) + 's';
}

function calculateAo5(times) {
  if (!times || times.length < 5) return null;
  const last5 = times.slice(-5);
  const sorted = [...last5].sort((a, b) => a - b);
  // Drop best and worst, average middle 3
  const mid3 = sorted.slice(1, 4);
  const sum = mid3.reduce((acc, t) => acc + t, 0);
  return Math.round(sum / 3);
}

function calculateAo12(times) {
  if (!times || times.length < 12) return null;
  const last12 = times.slice(-12);
  const sorted = [...last12].sort((a, b) => a - b);
  // Drop best and worst, average middle 10
  const mid10 = sorted.slice(1, 11);
  const sum = mid10.reduce((acc, t) => acc + t, 0);
  return Math.round(sum / 10);
}

function playSynthesizedBeep(freq = 600, duration = 0.05, type = 'sine') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio fallback
  }
}

export default function TimerHUD({
  isOpen = false,
  onClose,
  isCubeSolved = false,
  lang = 'en',
  t = (key, fallback) => fallback || key,
}) {
  // Modes: 'wca' | 'timeAttack'
  const [timerMode, setTimerMode] = useState('wca');

  // WCA Timer States: 'idle' | 'holding' | 'ready' | 'inspecting' | 'running' | 'stopped'
  const [wcaState, setWcaState] = useState('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [inspectionSeconds, setInspectionSeconds] = useState(15);
  const [useInspection, setUseInspection] = useState(false);

  // Time Attack Settings: 30s, 60s, 120s
  const [attackDuration, setAttackDuration] = useState(60); // in seconds
  const [attackRemainingMs, setAttackRemainingMs] = useState(60000);
  const [isAttackRunning, setIsAttackRunning] = useState(false);
  const [attackEnded, setAttackEnded] = useState(false);

  // Solves History & Stats
  const [solves, setSolves] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TIMES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showStatsDrawer, setShowStatsDrawer] = useState(false);

  // Internal Timing Refs
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const holdTimerRef = useRef(null);
  const inspectionTimerRef = useRef(null);
  const lastTickSecondRef = useRef(null);
  const wasSolvedRef = useRef(isCubeSolved);

  // Save solves to localStorage
  const saveSolvesToStorage = useCallback((newSolves) => {
    setSolves(newSolves);
    try {
      localStorage.setItem(STORAGE_KEY_TIMES, JSON.stringify(newSolves));
    } catch {
      // Storage fallback
    }
  }, []);

  // Compute stats
  const stats = useMemo(() => {
    if (!solves.length) {
      return { count: 0, pb: null, ao5: null, ao12: null };
    }
    const pb = Math.min(...solves);
    const ao5 = calculateAo5(solves);
    const ao12 = calculateAo12(solves);
    return {
      count: solves.length,
      pb,
      ao5,
      ao12,
    };
  }, [solves]);

  // Clean up all timers
  const clearAllTimers = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (inspectionTimerRef.current) {
      clearInterval(inspectionTimerRef.current);
      inspectionTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Handle Mode Change
  const handleSwitchMode = (mode) => {
    playClickSound();
    clearAllTimers();
    setTimerMode(mode);
    setWcaState('idle');
    setElapsedMs(0);
    setIsAttackRunning(false);
    setAttackEnded(false);
    setAttackRemainingMs(attackDuration * 1000);
  };

  // Start WCA Timer
  const startWcaRunning = useCallback(() => {
    clearAllTimers();
    setWcaState('running');
    startTimeRef.current = performance.now();
    playSynthesizedBeep(1000, 0.05, 'sine');

    const updateLoop = () => {
      const now = performance.now();
      setElapsedMs(Math.round(now - startTimeRef.current));
      animFrameRef.current = requestAnimationFrame(updateLoop);
    };
    animFrameRef.current = requestAnimationFrame(updateLoop);
  }, [clearAllTimers]);

  // Stop WCA Timer
  const stopWcaRunning = useCallback(() => {
    clearAllTimers();
    const finalElapsed = Math.round(performance.now() - (startTimeRef.current || performance.now()));
    setElapsedMs(finalElapsed);
    setWcaState('stopped');
    playSynthesizedBeep(600, 0.1, 'triangle');

    // Add to solves list
    saveSolvesToStorage([...solves, finalElapsed]);
  }, [clearAllTimers, solves, saveSolvesToStorage]);

  // Start Time Attack
  const startAttackRunning = useCallback(() => {
    clearAllTimers();
    setIsAttackRunning(true);
    setAttackEnded(false);
    startTimeRef.current = performance.now();
    lastTickSecondRef.current = attackDuration;
    playSynthesizedBeep(900, 0.08, 'sine');

    const totalMs = attackDuration * 1000;

    const updateLoop = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const remaining = Math.max(0, totalMs - elapsed);
      setAttackRemainingMs(Math.round(remaining));

      const secRemaining = Math.ceil(remaining / 1000);
      if (secRemaining !== lastTickSecondRef.current && remaining > 0) {
        lastTickSecondRef.current = secRemaining;
        const isUrgent = secRemaining <= 5;
        playSynthesizedBeep(isUrgent ? 920 : 440, 0.03, isUrgent ? 'square' : 'sine');
      }

      if (remaining <= 0) {
        cancelAnimationFrame(animFrameRef.current);
        setIsAttackRunning(false);
        setAttackEnded(true);
        // Play final time's up buzzer
        playSynthesizedBeep(260, 0.4, 'sawtooth');
      } else {
        animFrameRef.current = requestAnimationFrame(updateLoop);
      }
    };
    animFrameRef.current = requestAnimationFrame(updateLoop);
  }, [clearAllTimers, attackDuration]);

  // Stop Time Attack
  const stopAttackRunning = useCallback(() => {
    clearAllTimers();
    setIsAttackRunning(false);
    playSynthesizedBeep(500, 0.08, 'triangle');
  }, [clearAllTimers]);

  // Reset Time Attack
  const resetAttack = useCallback(() => {
    clearAllTimers();
    setIsAttackRunning(false);
    setAttackEnded(false);
    setAttackRemainingMs(attackDuration * 1000);
    playClickSound();
  }, [clearAllTimers, attackDuration]);

  // Auto-stop timer when cube solve is detected
  useEffect(() => {
    if (!wasSolvedRef.current && isCubeSolved) {
      if (timerMode === 'wca' && wcaState === 'running') {
        stopWcaRunning();
      } else if (timerMode === 'timeAttack' && isAttackRunning) {
        stopAttackRunning();
      }
    }
    wasSolvedRef.current = isCubeSolved;
  }, [isCubeSolved, timerMode, wcaState, isAttackRunning, stopWcaRunning, stopAttackRunning]);

  // Global Keydown & Keyup Listeners for Spacebar hold-to-ready
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();

        if (timerMode === 'wca') {
          if (wcaState === 'running') {
            stopWcaRunning();
          } else if (wcaState === 'idle' || wcaState === 'stopped') {
            if (holdTimerRef.current === null && wcaState !== 'ready') {
              setWcaState('holding');
              playSynthesizedBeep(450, 0.04, 'sine');
              holdTimerRef.current = setTimeout(() => {
                setWcaState('ready');
                playSynthesizedBeep(880, 0.08, 'sine');
              }, 500); // 500ms hold threshold
            }
          }
        } else if (timerMode === 'timeAttack') {
          if (isAttackRunning) {
            stopAttackRunning();
          } else {
            startAttackRunning();
          }
        }
      }
    };

    const handleKeyUp = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();

        if (timerMode === 'wca') {
          if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
          }

          if (wcaState === 'ready') {
            startWcaRunning();
          } else if (wcaState === 'holding') {
            // Cancelled early before 500ms threshold
            setWcaState('idle');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    isOpen,
    timerMode,
    wcaState,
    isAttackRunning,
    stopWcaRunning,
    startWcaRunning,
    startAttackRunning,
    stopAttackRunning,
  ]);

  // Pointer touch handlers for mobile / clickable pad
  const handleTouchHoldStart = () => {
    if (timerMode === 'wca') {
      if (wcaState === 'running') {
        stopWcaRunning();
      } else if (wcaState === 'idle' || wcaState === 'stopped') {
        setWcaState('holding');
        playSynthesizedBeep(450, 0.04, 'sine');
        holdTimerRef.current = setTimeout(() => {
          setWcaState('ready');
          playSynthesizedBeep(880, 0.08, 'sine');
        }, 500);
      }
    }
  };

  const handleTouchHoldEnd = () => {
    if (timerMode === 'wca') {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      if (wcaState === 'ready') {
        startWcaRunning();
      } else if (wcaState === 'holding') {
        setWcaState('idle');
      }
    }
  };

  if (!isOpen) return null;

  // Determine display time and indicator color
  let displayDigits = '00:00.000';
  let statusText = t('timer.holdSpace', 'Tahan Spasi untuk Siap');
  let statusColorClass = 'text-zinc-800 dark:text-zinc-200';

  if (timerMode === 'wca') {
    displayDigits = formatTime(elapsedMs);
    if (wcaState === 'holding') {
      statusText = t('timer.getReady', 'Bersiap...');
      statusColorClass = 'text-[#FF5252] dark:text-[#FF5252] animate-pulse';
    } else if (wcaState === 'ready') {
      statusText = t('timer.ready', 'SIAP! Lepas Spasi!');
      statusColorClass = 'text-[#24C789] dark:text-[#24C789]';
    } else if (wcaState === 'running') {
      statusText = t('timer.running', 'Waktu Berjalan... (Spasi / Selesaikan untuk Berhenti)');
      statusColorClass = 'text-[#2563EB] dark:text-[#60A5FA]';
    } else if (wcaState === 'stopped') {
      statusText = t('timer.stopped', 'Selesai! Tahan Spasi untuk Mulai Lagi');
      statusColorClass = 'text-[#24C789] dark:text-[#24C789]';
    }
  } else {
    // Time Attack
    displayDigits = formatTime(attackRemainingMs);
    if (isAttackRunning) {
      statusText = t('timer.running', 'Hitung Mundur Waktu!');
      statusColorClass = attackRemainingMs <= 10000 ? 'text-[#FF5252] animate-pulse' : 'text-[#FF8A00]';
    } else if (attackEnded) {
      statusText = t('timer.timeUp', 'Waktu Habis!');
      statusColorClass = 'text-[#FF5252] font-black';
    } else {
      statusText = t('timer.startTap', 'Tekan Mulai atau Spasi');
      statusColorClass = 'text-zinc-700 dark:text-zinc-300';
    }
  }

  return (
    <div className="fixed top-14 sm:top-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-3 pointer-events-none select-none">
      <div className="brutal-card bg-[#FDFBF7] dark:bg-[#1E1E22] border-[3px] border-black dark:border-zinc-700 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#FFE600] rounded-xl p-3 sm:p-4 pointer-events-auto flex flex-col gap-2.5 transition-all">
        {/* Top Control Bar: Mode Pills + Header Utilities */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-black/10 dark:border-zinc-700/60 pb-2">
          {/* Mode Switcher Segmented Pills */}
          <div className="flex items-center gap-1 brutal-bay p-0.5 rounded-lg bg-[#ECE5DF] dark:bg-[#18181B] border border-black dark:border-zinc-700">
            <button
              type="button"
              onClick={() => handleSwitchMode('wca')}
              onMouseEnter={playHoverSound}
              className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all cursor-pointer ${
                timerMode === 'wca'
                  ? 'bg-[#FFE600] text-black border border-black shadow-[1.5px_1.5px_0px_#000]'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1">
                <Trophy className="w-3 h-3 stroke-[2.5]" />
                {t('timer.wcaMode', 'WCA Timer')}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchMode('timeAttack')}
              onMouseEnter={playHoverSound}
              className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all cursor-pointer ${
                timerMode === 'timeAttack'
                  ? 'bg-[#FF8A00] text-black border border-black shadow-[1.5px_1.5px_0px_#000]'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 stroke-[2.5]" />
                {t('timer.timeAttackMode', 'Time Attack')}
              </span>
            </button>
          </div>

          {/* Right Action Icons: Stats Toggle + Close */}
          <div className="flex items-center gap-1">
            {timerMode === 'wca' && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowStatsDrawer((prev) => !prev);
                }}
                className={`brutal-btn px-2 py-0.5 rounded text-[11px] font-mono font-bold border border-black ${
                  showStatsDrawer ? 'bg-[#24C789] text-black' : 'bg-white dark:bg-[#27272A] text-black dark:text-zinc-100'
                }`}
                title={t('timer.stats', 'Statistik Sesi')}
              >
                {t('timer.statsShort', 'Stats')} ({stats.count})
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playClickSound();
                clearAllTimers();
                if (onClose) onClose();
              }}
              onMouseEnter={playHoverSound}
              className="brutal-btn brutal-btn-white p-1 rounded border border-black shadow-[1.5px_1.5px_0px_#000] text-black dark:text-zinc-100 dark:bg-[#27272A] cursor-pointer"
              title={t('controls.clear', 'Tutup Timer')}
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Time Attack Duration Selector (when in Time Attack mode) */}
        {timerMode === 'timeAttack' && (
          <div className="flex items-center justify-center gap-2 py-1">
            <span className="text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-400">
              {t('timer.duration', 'Target Durasi')}:
            </span>
            {[30, 60, 120].map((dur) => (
              <button
                key={dur}
                type="button"
                disabled={isAttackRunning}
                onClick={() => {
                  playClickSound();
                  setAttackDuration(dur);
                  setAttackRemainingMs(dur * 1000);
                  setAttackEnded(false);
                }}
                className={`px-2 py-0.5 rounded text-xs font-mono font-bold border border-black transition-all cursor-pointer ${
                  attackDuration === dur
                    ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]'
                    : 'bg-white dark:bg-[#27272A] text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {dur}s
              </button>
            ))}
          </div>
        )}

        {/* Main Digital Chronometer Display in Space Mono */}
        <div
          onPointerDown={handleTouchHoldStart}
          onPointerUp={handleTouchHoldEnd}
          className={`relative w-full py-4 px-3 rounded-lg border-2 border-black dark:border-zinc-700 text-center transition-colors cursor-pointer select-none flex flex-col items-center justify-center ${
            wcaState === 'ready'
              ? 'bg-[#24C789]/20 border-[#24C789]'
              : wcaState === 'holding'
              ? 'bg-[#FF5252]/20 border-[#FF5252]'
              : 'bg-[#F5EFEB] dark:bg-[#121212]'
          }`}
          title={t('timer.tapHint', 'Sentuh & Tahan untuk Bersiap')}
        >
          <div className={`font-mono text-4xl sm:text-6xl font-black tracking-tight leading-none ${statusColorClass}`}>
            {displayDigits}
          </div>

          <div className="mt-2 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-center gap-1.5">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full border border-black ${
                wcaState === 'ready'
                  ? 'bg-[#24C789]'
                  : wcaState === 'holding'
                  ? 'bg-[#FF5252]'
                  : wcaState === 'running' || isAttackRunning
                  ? 'bg-[#2563EB] animate-ping'
                  : 'bg-zinc-400'
              }`}
            />
            <span>{statusText}</span>
          </div>
        </div>

        {/* Bottom Tactile Action Buttons (Touch / Mouse Friendly) */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {timerMode === 'wca' ? (
            <>
              <button
                type="button"
                onPointerDown={handleTouchHoldStart}
                onPointerUp={handleTouchHoldEnd}
                className={`brutal-btn flex-1 py-1.5 rounded-lg border-2 border-black text-xs font-mono font-bold transition-all ${
                  wcaState === 'running'
                    ? 'bg-[#FF5252] text-white hover:bg-[#EF4444]'
                    : wcaState === 'ready'
                    ? 'bg-[#24C789] text-black hover:bg-[#10B981]'
                    : 'bg-[#FFE600] text-black hover:bg-[#FACC15]'
                }`}
              >
                {wcaState === 'running'
                  ? t('timer.stopTap', 'BERHENTI (Stop)')
                  : t('timer.startTap', 'Tahan Pad / Spasi')}
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  clearAllTimers();
                  setWcaState('idle');
                  setElapsedMs(0);
                }}
                className="brutal-btn brutal-btn-white px-3 py-1.5 rounded-lg border-2 border-black text-xs font-mono font-bold text-black dark:text-zinc-100 dark:bg-[#27272A]"
                title={t('controls.reset', 'Reset Timer')}
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  if (isAttackRunning) {
                    stopAttackRunning();
                  } else {
                    startAttackRunning();
                  }
                }}
                className={`brutal-btn flex-1 py-1.5 rounded-lg border-2 border-black text-xs font-mono font-bold ${
                  isAttackRunning
                    ? 'bg-[#FF5252] text-white'
                    : 'bg-[#FF8A00] text-black'
                }`}
              >
                {isAttackRunning
                  ? t('timer.stopTap', 'Berhenti')
                  : t('timer.startAttack', 'Mulai Time Attack ⚡')}
              </button>

              <button
                type="button"
                onClick={resetAttack}
                className="brutal-btn brutal-btn-white px-3 py-1.5 rounded-lg border-2 border-black text-xs font-mono font-bold text-black dark:text-zinc-100 dark:bg-[#27272A]"
                title={t('controls.reset', 'Reset')}
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </>
          )}
        </div>

        {/* Quick Session Stats Bar */}
        {timerMode === 'wca' && (
          <div className="flex items-center justify-between text-[11px] font-mono font-bold bg-[#ECE5DF] dark:bg-[#18181B] border border-black dark:border-zinc-700 px-3 py-1.5 rounded-lg text-zinc-800 dark:text-zinc-200">
            <div>
              <span className="text-zinc-500">{t('timer.pb', 'PB')}: </span>
              <span className="text-[#2563EB] dark:text-[#60A5FA] font-black">{formatShortTime(stats.pb)}</span>
            </div>
            <div>
              <span className="text-zinc-500">{t('timer.ao5', 'Ao5')}: </span>
              <span className="font-black">{formatShortTime(stats.ao5)}</span>
            </div>
            <div>
              <span className="text-zinc-500">{t('timer.ao12', 'Ao12')}: </span>
              <span className="font-black">{formatShortTime(stats.ao12)}</span>
            </div>
            <div>
              <span className="text-zinc-500">{t('timer.count', 'Solves')}: </span>
              <span className="font-black">{stats.count}</span>
            </div>
          </div>
        )}

        {/* Collapsible Session Stats & History Drawer */}
        {showStatsDrawer && timerMode === 'wca' && (
          <div className="border-t-2 border-black/15 dark:border-zinc-700/60 pt-2 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                {t('timer.historyTitle', 'Riwayat Waktu Sesi')}
              </span>
              {solves.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    if (window.confirm(t('timer.clearConfirm', 'Yakin ingin mereset seluruh data riwayat timer?'))) {
                      saveSolvesToStorage([]);
                    }
                  }}
                  className="text-[10px] text-red-600 hover:text-red-700 font-mono font-bold underline cursor-pointer"
                >
                  {t('timer.clearHistory', 'Hapus Semua')}
                </button>
              )}
            </div>

            {solves.length === 0 ? (
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono py-2 text-center">
                {t('timer.noSolvesYet', 'Belum ada waktu tercatat. Selesaikan kubus untuk mencatat waktu!')}
              </div>
            ) : (
              <div className="max-h-28 overflow-y-auto flex flex-wrap gap-1.5 p-1 bg-white dark:bg-[#18181B] border border-black/20 dark:border-zinc-700 rounded">
                {solves.map((timeMs, idx) => (
                  <span
                    key={idx}
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                      timeMs === stats.pb
                        ? 'bg-[#FFE600] text-black font-black border-black'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700'
                    }`}
                  >
                    #{idx + 1}: {formatShortTime(timeMs)}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
