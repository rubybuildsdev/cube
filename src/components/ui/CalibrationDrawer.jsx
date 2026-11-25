import React from 'react';
import {
  X,
  RotateCcw,
  Layers,
  Shuffle,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../../utils/audio';

const SWATCHES = [
  { key: 'W', name: 'White', hex: '#F8FAFC', textDark: true },
  { key: 'Y', name: 'Yellow', hex: '#FACC15', textDark: true },
  { key: 'G', name: 'Green', hex: '#16A34A', textDark: false },
  { key: 'B', name: 'Blue', hex: '#2563EB', textDark: false },
  { key: 'R', name: 'Red', hex: '#DC2626', textDark: false },
  { key: 'O', name: 'Orange', hex: '#EA580C', textDark: false },
];

const COLOR_HEX = {
  W: '#F8FAFC',
  Y: '#FACC15',
  G: '#16A34A',
  B: '#2563EB',
  R: '#DC2626',
  O: '#EA580C',
  X: '#E2DBD4',
};

export default function CalibrationDrawer({
  isOpen = false,
  onClose,
  cubeState,
  selectedColor = 'W',
  onSelectColor,
  onStickerClick,
  colorCounts = { W: 9, Y: 9, G: 9, B: 9, R: 9, O: 9 },
  blankCount = 0,
  validation = { isValid: true },
  validationErrorMessage = null,
  onResetSolved,
  onClearBlank,
  onScramble,
  t = (key, fallback) => fallback || key,
}) {
  if (!isOpen) return null;

  const state = cubeState || {
    U: Array(9).fill('W'),
    D: Array(9).fill('Y'),
    F: Array(9).fill('G'),
    B: Array(9).fill('B'),
    L: Array(9).fill('O'),
    R: Array(9).fill('R'),
  };

  const handleCellClick = (faceKey, index) => {
    playClickSound();
    if (onStickerClick) {
      onStickerClick({ face: faceKey, index });
    }
  };

  const handleSelectSwatch = (colorKey) => {
    playClickSound();
    if (onSelectColor) {
      onSelectColor(colorKey);
    }
  };

  const renderFaceGrid = (faceKey) => {
    const stickers = state[faceKey] || Array(9).fill('W');

    return (
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono text-black dark:text-zinc-100 mb-1 uppercase font-black">
          {faceKey}
        </span>
        <div className="grid grid-cols-3 gap-0.5 p-1 bg-[#F5EFEB] dark:bg-[#18181B] rounded-lg border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFE600]">
          {stickers.map((col, idx) => {
            const hex = COLOR_HEX[col] || COLOR_HEX.X;
            const isCenter = idx === 4;

            return (
              <button
                key={`${faceKey}-${idx}`}
                type="button"
                onClick={() => handleCellClick(faceKey, idx)}
                onMouseEnter={playHoverSound}
                title={`${faceKey}[${idx}]: ${col} ${isCenter ? '(Canonical Center)' : ''}`}
                aria-label={`${faceKey} sticker ${idx + 1}: ${col}${isCenter ? ' (Center)' : ''}`}
                style={{ backgroundColor: hex }}
                className={`w-6 h-6 sm:w-5 sm:h-5 rounded-[2px] transition-transform duration-100 relative cursor-pointer hover:scale-110 hover:z-10 border border-black/80 shadow-[0.5px_0.5px_0px_#000] ${
                  isCenter ? 'ring-2 ring-black/80 ring-inset' : ''
                }`}
              >
                {isCenter && (
                  <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-black/60 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[55vh] sm:left-auto sm:top-0 sm:right-0 sm:h-full w-full sm:w-[400px] bg-[#FDFBF7] dark:bg-[#18181B] border-t-[3px] sm:border-t-0 sm:border-l-[3px] border-black dark:border-zinc-700 rounded-t-2xl sm:rounded-none shadow-[0px_-6px_0px_#000] sm:shadow-[-6px_0px_0px_#000] dark:shadow-[0px_-6px_0px_#FFE600] sm:dark:shadow-[-6px_0px_0px_#FFE600] z-50 flex flex-col justify-between text-xs select-none animate-in slide-in-from-bottom sm:slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b-[2.5px] border-black dark:border-zinc-700 bg-[#F5EFEB] dark:bg-[#1E1E22] flex items-center justify-between rounded-t-2xl sm:rounded-none">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#24C789] border-2 border-black shadow-[2px_2px_0px_#000] rounded-lg text-black">
            <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tight text-black dark:text-zinc-100 font-mono">
              {t('calibration.title', 'Calibration Studio')}
            </h2>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono">
              {t('calibration.subtitle', 'Customize facelets, inspect 2D unfolded net, and verify parity.')}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          onMouseEnter={playHoverSound}
          className="brutal-btn brutal-btn-white p-1.5 rounded-lg border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFE600] text-black dark:text-zinc-100 dark:bg-[#1E1E22] transition-colors cursor-pointer"
          title={t('header.exitCalibrate', 'Done / Return')}
          aria-label={t('header.exitCalibrate', 'Done / Return')}
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Main Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Section: 2D Unfolded Net on Technical Grid Paper */}
        <div className="brutal-card bg-white dark:bg-[#1E1E22] bg-graph-grid border-[2.5px] border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600] rounded-xl p-3">
          <div className="text-[11px] font-mono font-bold uppercase text-black dark:text-zinc-100 mb-2 flex items-center justify-between">
            <span>{t('netView.title', '2D Flat Net')} (T-Projection)</span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">{t('netView.hint', 'Click any sticker')}</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            {/* Top row: U */}
            <div className="grid grid-cols-4 gap-1.5">
              <div className="w-14" />
              <div className="w-14 flex justify-center">{renderFaceGrid('U')}</div>
              <div className="w-14" />
              <div className="w-14" />
            </div>

            {/* Middle row: L, F, R, B */}
            <div className="grid grid-cols-4 gap-1.5">
              <div className="w-14 flex justify-center">{renderFaceGrid('L')}</div>
              <div className="w-14 flex justify-center">{renderFaceGrid('F')}</div>
              <div className="w-14 flex justify-center">{renderFaceGrid('R')}</div>
              <div className="w-14 flex justify-center">{renderFaceGrid('B')}</div>
            </div>

            {/* Bottom row: D */}
            <div className="grid grid-cols-4 gap-1.5">
              <div className="w-14" />
              <div className="w-14 flex justify-center">{renderFaceGrid('D')}</div>
              <div className="w-14" />
              <div className="w-14" />
            </div>
          </div>
        </div>

        {/* Section: 6-Color Swatch Selector with Live Counts */}
        <div className="brutal-card bg-white dark:bg-[#1E1E22] border-[2.5px] border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600] rounded-xl p-3">
          <div className="text-[11px] font-mono font-bold uppercase text-black dark:text-zinc-100 mb-2.5">
            {t('calibration.swatches', 'Color Swatches')}
          </div>
          <div className="grid grid-cols-6 gap-2">
            {SWATCHES.map((swatch) => {
              const isSelected = selectedColor === swatch.key;
              const count = colorCounts[swatch.key] ?? 0;
              const isCountExact = count === 9;
              const isCountOver = count > 9;

              return (
                <button
                  key={swatch.key}
                  type="button"
                  onClick={() => handleSelectSwatch(swatch.key)}
                  onMouseEnter={playHoverSound}
                  className={`flex flex-col items-center gap-1.5 p-1.5 rounded-xl border-2 border-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFE600] shadow-[3px_3px_0px_#000] -translate-y-0.5'
                      : 'bg-[#F5EFEB] hover:bg-white shadow-[2px_2px_0px_#000]'
                  }`}
                  title={`${swatch.name}: ${count}/9`}
                >
                  <div
                    style={{ backgroundColor: swatch.hex }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_#000] ${
                      isSelected ? 'ring-2 ring-black' : ''
                    }`}
                  >
                    {isSelected && (
                      <Check
                        className={`w-3.5 h-3.5 stroke-[3] ${
                          swatch.textDark ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-black px-1 rounded border border-black ${
                      isCountExact
                        ? 'text-black bg-[#24C789]'
                        : isCountOver
                        ? 'text-white bg-[#FF5252]'
                        : 'text-black bg-[#FFE600]'
                    }`}
                  >
                    {count}/9
                  </span>
                </button>
              );
            })}
          </div>

          {blankCount > 0 && (
            <div className="mt-2.5 px-2.5 py-1.5 rounded-xl bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] text-black text-[11px] font-mono font-bold flex items-center justify-between">
              <span>{t('calibration.unpainted', 'Unpainted')}</span>
              <span className="font-mono font-extrabold">{blankCount}</span>
            </div>
          )}
        </div>

        {/* Section: Physical Parity Diagnostics Banner */}
        <div className="brutal-card bg-white dark:bg-[#1E1E22] border-[2.5px] border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600] rounded-xl p-3">
          <div className="text-[11px] font-mono font-bold uppercase text-black dark:text-zinc-100 mb-2">
            {t('calibration.diagnostics', 'Parity & Physical Diagnostics')}
          </div>

          {validation.isValid ? (
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#24C789]/20 border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] text-black dark:text-zinc-100 font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-black dark:text-[#24C789] stroke-[2.5]" />
              <span className="text-[11px] leading-tight font-bold">
                {t('calibration.valid', 'Configuration is physically valid and ready to solve.')}
              </span>
            </div>
          ) : (
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#FF5252]/20 border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] text-[#991B1B] dark:text-red-300 font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#DC2626] dark:text-red-400 stroke-[2.5]" />
              <div className="text-[11px] leading-tight">
                <p className="font-extrabold">{validationErrorMessage || t('calibration.invalid', 'Configuration is incomplete or contains parity errors.')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Section: Quick Actions */}
        <div className="brutal-card bg-white dark:bg-[#1E1E22] border-[2.5px] border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600] rounded-xl p-3">
          <div className="text-[11px] font-mono font-bold uppercase text-black dark:text-zinc-100 mb-2">
            {t('calibration.quickActions', 'Quick Actions')}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => { playClickSound(); onResetSolved?.(); }}
              onMouseEnter={playHoverSound}
              className="brutal-btn brutal-btn-white border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] py-1.5 rounded-lg flex items-center justify-center gap-1 font-mono font-bold text-black dark:text-zinc-100 dark:bg-[#18181B]"
              title={t('controls.reset', 'Reset to Solved')}
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.3]" />
              <span className="text-[11px]">{t('controls.reset', 'Reset')}</span>
            </button>

            <button
              type="button"
              onClick={() => { playClickSound(); onClearBlank?.(); }}
              onMouseEnter={playHoverSound}
              className="brutal-btn brutal-btn-yellow border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] py-1.5 rounded-lg flex items-center justify-center gap-1 font-mono font-bold text-black"
              title={t('controls.clear', 'Clear Blank')}
            >
              <Layers className="w-3.5 h-3.5 stroke-[2.3]" />
              <span className="text-[11px]">{t('controls.clear', 'Clear')}</span>
            </button>

            <button
              type="button"
              onClick={() => { playClickSound(); onScramble?.(); }}
              onMouseEnter={playHoverSound}
              className="brutal-btn brutal-btn-white border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] py-1.5 rounded-lg flex items-center justify-center gap-1 font-mono font-bold text-black dark:text-zinc-100 dark:bg-[#18181B]"
              title={t('controls.scramble', 'Scramble')}
            >
              <Shuffle className="w-3.5 h-3.5 stroke-[2.3]" />
              <span className="text-[11px]">{t('controls.scramble', 'Scramble')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer / Done Action */}
      <div className="p-4 border-t-[2.5px] border-black dark:border-zinc-700 bg-[#F5EFEB] dark:bg-[#1E1E22]">
        <button
          type="button"
          onClick={onClose}
          onMouseEnter={playHoverSound}
          className="brutal-btn brutal-btn-green w-full py-2.5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] font-mono font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 text-black cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[3] text-black" />
          <span>{t('calibration.done', 'Done / Return')}</span>
        </button>
      </div>
    </div>
  );
}
