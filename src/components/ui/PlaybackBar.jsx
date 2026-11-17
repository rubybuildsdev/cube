import React, { useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  FastForward,
  RotateCcw,
  Sparkles,
  Loader2,
  AlertCircle,
  Check,
  Shuffle
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../../utils/audio';

const SPEEDS = [0.5, 1, 2, 'instant'];

export default function PlaybackBar({
  solution = [],
  currentStepIndex = -1,
  isPlaying = false,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onResetPlayback,
  onJumpToStep,
  speed = 1,
  onChangeSpeed,
  onScramble,
  onSolve,
  isSolving = false,
  isSolved = false,
  solverMode = 'optimal',
  isValidState = true,
  validationError = null,
  isUnpainted = false,
  t = (key, fallback) => fallback || key,
}) {
  const activePillRef = useRef(null);
  const timelineContainerRef = useRef(null);

  // Auto-scroll timeline to active move
  useEffect(() => {
    if (activePillRef.current) {
      activePillRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentStepIndex]);

  const hasSolution = solution && solution.length > 0;
  const isFinished = hasSolution && currentStepIndex >= solution.length - 1;

  const handlePlayPause = () => {
    playClickSound();
    if (onPlayPause) onPlayPause();
  };

  const handleStepForward = () => {
    playClickSound();
    if (onStepForward) onStepForward();
  };

  const handleStepBackward = () => {
    playClickSound();
    if (onStepBackward) onStepBackward();
  };

  const handleReset = () => {
    playClickSound();
    if (onResetPlayback) onResetPlayback();
  };

  const handleJumpToEnd = () => {
    playClickSound();
    if (hasSolution && onJumpToStep) {
      onJumpToStep(solution.length - 1);
    }
  };

  const handleSpeedChange = (s) => {
    playClickSound();
    if (onChangeSpeed) onChangeSpeed(s);
  };

  const handleSolveClick = () => {
    playClickSound();
    if (onSolve) onSolve();
  };

  const handleScrambleClick = () => {
    playClickSound();
    if (onScramble) onScramble();
  };

  const currentMoveText = currentStepIndex >= 0 && solution[currentStepIndex]
    ? (typeof solution[currentStepIndex] === 'string' ? solution[currentStepIndex] : solution[currentStepIndex].move)
    : null;

  return (
    <div className="w-full max-w-5xl mx-auto px-2 pointer-events-auto">
      <div className="brutal-card-paper border-[2.5px] border-black shadow-[5px_5px_0px_#000] rounded-2xl px-3.5 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs select-none bg-[#F5EFEB]">
        {/* Left Section: Scramble, Solve or Inline Solved Badge, Validation info */}
        <div className="flex items-center gap-2">
          {/* Big Scramble Button */}
          <button
            type="button"
            onClick={handleScrambleClick}
            onMouseEnter={playHoverSound}
            className="brutal-btn brutal-btn-yellow px-3 sm:px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer font-mono"
            title={t('controls.scramble', 'Scramble')}
          >
            <Shuffle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="font-mono">{t('controls.scramble', 'Scramble')}</span>
          </button>

          {/* Big Solve Button OR Inline Solved Badge */}
          {isSolved ? (
            <div className="brutal-badge bg-[#24C789] text-black border-2 border-black shadow-[3px_3px_0px_#000] px-3 py-1.5 rounded-xl font-mono font-black text-xs flex items-center gap-1.5">
              <Check className="w-4 h-4 stroke-[3] text-black" />
              <span>
                ✓ {t('ui.statusSolved', 'SOLVED')} • {solution.length > 0 ? solution.length : 0} {t('controls.moves', 'MOVES')} • {solverMode === 'beginner' ? t('controls.movesBeginner', 'BEGINNER') : t('controls.movesOptimal', 'OPTIMAL')}
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSolveClick}
              onMouseEnter={playHoverSound}
              disabled={isSolving || !isValidState}
              className={`brutal-btn px-3.5 sm:px-4 py-1.5 rounded-xl border-2 border-black font-extrabold text-xs flex items-center gap-1.5 font-mono transition-all ${
                isSolving
                  ? 'bg-zinc-200 text-zinc-600 shadow-[2px_2px_0px_#000] cursor-wait'
                  : !isValidState
                  ? 'bg-zinc-200 text-zinc-400 shadow-[2px_2px_0px_#000] cursor-not-allowed opacity-60'
                  : 'brutal-btn-green shadow-[3px_3px_0px_#000] text-black cursor-pointer'
              }`}
            >
              {isSolving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black stroke-[2.5]" />
                  <span>{t('controls.solving', 'Solving...')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 stroke-[2.5] text-black" />
                  <span>{t('controls.solve', 'Solve Cube')}</span>
                </>
              )}
            </button>
          )}

          {/* Validation Warning when state is invalid */}
          {!isValidState && validationError && (
            <div
              className={`border-2 border-black shadow-[2px_2px_0px_#000] px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold flex items-center gap-1.5 max-w-[200px] sm:max-w-xs truncate ${
                isUnpainted
                  ? 'bg-[#FFE600] text-black'
                  : 'bg-[#FF5252] text-white'
              }`}
              title={validationError}
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
              <span className="truncate">{validationError}</span>
            </div>
          )}
        </div>

        {/* Center Section: Tactile Mechanical Playback Keys + Timeline Scrubber */}
        <div className="flex items-center gap-2">
          {/* Mechanical Keys: [|<] [<<] [▶/❚❚] [>>] [>|] */}
          <div className="flex items-center gap-1">
            {/* [|<] Reset / Restart */}
            <button
              type="button"
              onClick={handleReset}
              onMouseEnter={playHoverSound}
              disabled={!hasSolution}
              className="brutal-btn brutal-btn-white p-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] text-black font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title={t('controls.reset', 'Restart playback')}
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.3]" />
            </button>

            {/* [<<] Step Backward */}
            <button
              type="button"
              onClick={handleStepBackward}
              onMouseEnter={playHoverSound}
              disabled={!hasSolution || currentStepIndex <= -1}
              className="brutal-btn brutal-btn-white p-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] text-black font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title={t('controls.stepPrev', 'Previous move')}
            >
              <SkipBack className="w-3.5 h-3.5 stroke-[2.3]" />
            </button>

            {/* [▶/❚❚] Play / Pause */}
            <button
              type="button"
              onClick={handlePlayPause}
              onMouseEnter={playHoverSound}
              disabled={!hasSolution || isFinished}
              className={`brutal-btn px-3 py-1.5 rounded-xl border-2 border-black shadow-[2.5px_2.5px_0px_#000] font-mono font-black text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all ${
                isPlaying ? 'bg-[#FFE600] text-black' : 'bg-[#24C789] text-black'
              }`}
              title={isPlaying ? t('controls.pause', 'Pause') : t('controls.play', 'Play')}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-black stroke-[2.5]" />
                  <span className="hidden sm:inline">{t('controls.pause', 'Pause')}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-black stroke-[2.5]" />
                  <span className="hidden sm:inline">{t('controls.play', 'Play')}</span>
                </>
              )}
            </button>

            {/* [>>] Step Forward */}
            <button
              type="button"
              onClick={handleStepForward}
              onMouseEnter={playHoverSound}
              disabled={!hasSolution || isFinished}
              className="brutal-btn brutal-btn-white p-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] text-black font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title={t('controls.stepNext', 'Next move')}
            >
              <SkipForward className="w-3.5 h-3.5 stroke-[2.3]" />
            </button>

            {/* [>|] Jump to End */}
            <button
              type="button"
              onClick={handleJumpToEnd}
              onMouseEnter={playHoverSound}
              disabled={!hasSolution || isFinished}
              className="brutal-btn brutal-btn-white p-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] text-black font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title={t('controls.lastStep', 'Jump to end')}
            >
              <FastForward className="w-3.5 h-3.5 stroke-[2.3]" />
            </button>
          </div>

          {/* Move Notation HUD & Timeline Scrubber */}
          {hasSolution ? (
            <div className="flex items-center gap-1.5 pl-1">
              {/* Current Move Odometer Display with micro-slide animation */}
              <div className="brutal-card bg-white border-2 border-black shadow-[2px_2px_0px_#000] rounded-lg px-2 py-0.5 min-w-[34px] text-center overflow-hidden">
                <span
                  key={currentStepIndex}
                  className="inline-block font-mono font-black text-xs sm:text-sm text-black animate-ticker-slide"
                >
                  {currentMoveText || '—'}
                </span>
              </div>

              {/* Step counter */}
              <div className="border border-black/50 bg-[#ECE5DF] px-1.5 py-0.5 rounded-md font-mono text-[11px] font-bold text-black">
                <span className="text-[#2563EB]">{Math.max(0, currentStepIndex + 1)}</span>/{solution.length}
              </div>

              {/* Horizontal Scrollable Timeline Scrubber */}
              <div
                ref={timelineContainerRef}
                className="hidden md:flex items-center gap-1 max-w-[220px] overflow-x-auto py-1 px-1.5 brutal-bay bg-[#ECE5DF] border-2 border-black rounded-lg shadow-[inset_1.5px_1.5px_0px_rgba(0,0,0,0.2)] scrollbar-none"
              >
                {/* Start Marker */}
                <button
                  type="button"
                  onClick={() => { playClickSound(); onJumpToStep?.(-1); }}
                  onMouseEnter={playHoverSound}
                  className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    currentStepIndex === -1
                      ? 'bg-black text-white border border-black shadow-[1px_1px_0px_#000]'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  0
                </button>

                {solution.map((step, idx) => {
                  const moveText = typeof step === 'string' ? step : step.move;
                  const isActive = idx === currentStepIndex;
                  const isPast = idx < currentStepIndex;

                  return (
                    <button
                      key={`${moveText}-${idx}`}
                      ref={isActive ? activePillRef : null}
                      type="button"
                      onClick={() => { playClickSound(); onJumpToStep?.(idx); }}
                      onMouseEnter={playHoverSound}
                      title={`Step ${idx + 1}: ${moveText}`}
                      className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-extrabold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#FFE600] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000] animate-ticker-slide'
                          : isPast
                          ? 'bg-white text-black border border-black/50 hover:bg-[#FFE600]/30'
                          : 'text-zinc-500 hover:text-black'
                      }`}
                    >
                      {moveText}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="hidden sm:block text-[11px] font-mono text-zinc-600 px-2 font-medium">
              {t('playback.noSolution', 'No active solution.')}
            </div>
          )}
        </div>

        {/* Right Section: Speed Selector */}
        <div className="brutal-bay bg-[#ECE5DF] border-2 border-black p-0.5 rounded-xl flex items-center gap-0.5 shadow-[inset_1.5px_1.5px_0px_rgba(0,0,0,0.2)]">
          {SPEEDS.map((s) => {
            const isSelected = speed === s;
            return (
              <button
                key={String(s)}
                type="button"
                onClick={() => handleSpeedChange(s)}
                onMouseEnter={playHoverSound}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFE600] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000]'
                    : 'bg-white text-zinc-700 hover:text-black border border-black/30 hover:border-black'
                }`}
                title={`Speed: ${s === 'instant' ? t('controls.instant', 'Instant') : `${s}x`}`}
              >
                {s === 'instant' ? t('controls.instant', 'Instant') : `${s}x`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
