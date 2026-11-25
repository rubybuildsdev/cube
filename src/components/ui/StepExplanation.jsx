import React from 'react';
import { BookOpen, Lightbulb } from 'lucide-react';

const LBL_PHASES = [
  { id: 1, key: 'whiteCross', name: 'White Cross' },
  { id: 2, key: 'firstLayerCorners', name: 'First Layer' },
  { id: 3, key: 'middleLayer', name: 'Second Layer' },
  { id: 4, key: 'yellowCross', name: 'Yellow Cross' },
  { id: 5, key: 'orientYellow', name: 'Orient Edges' },
  { id: 6, key: 'permuteCorners', name: 'Permute Corners' },
  { id: 7, key: 'solve', name: 'Final Solve' },
];

const PHASE_ID_TO_KEY = {
  1: 'whiteCross',
  2: 'firstLayerCorners',
  3: 'middleLayer',
  4: 'yellowCross',
  5: 'orientYellow',
  6: 'permuteCorners',
  7: 'solve',
};

export default function StepExplanation({
  currentStep = null,
  currentStepIndex = -1,
  totalSteps = 0,
  solverMode = 'optimal',
  t = (key, fallback) => fallback || key,
}) {
  // If no step is active, do not render
  if (!currentStep && currentStepIndex < 0) {
    return null;
  }

  // Extract info from step object or move string
  const move = typeof currentStep === 'string' ? currentStep : currentStep?.move || '';
  const phaseId = typeof currentStep === 'object' ? currentStep?.phaseId || 1 : 1;
  const rawPhaseKey = typeof currentStep === 'object' ? currentStep?.phaseNameId : null;
  const phaseKey = (phaseId && PHASE_ID_TO_KEY[phaseId]) || rawPhaseKey || 'whiteCross';

  // Retrieve translation values
  const phaseTitle = solverMode === 'beginner' 
    ? t(`beginnerPhases.${phaseKey}.title`, phaseKey)
    : t('modes.optimalShort', 'Optimal Solution');
  const phaseDesc = solverMode === 'beginner'
    ? t(`beginnerPhases.${phaseKey}.desc`, '')
    : t('modes.optimalDesc', '');
  const phaseTip = solverMode === 'beginner'
    ? t(`beginnerPhases.${phaseKey}.tip`, '')
    : '';

  return (
    <div className="w-full brutal-card-paper bg-[#F5EFEB] dark:bg-[#1E1E22] border-[2.5px] border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600] rounded-2xl p-3 sm:p-4 text-black dark:text-zinc-100 transition-all select-none">
      {/* Header with phase badge and current move odometer */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {/* Bold Phase Badge */}
          <div className="brutal-badge bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000] px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 stroke-[2.5] text-black" />
            <span>
              {solverMode === 'beginner' && phaseId ? `Phase ${phaseId}: ` : ''}{phaseTitle}
            </span>
          </div>

          {totalSteps > 0 && (
            <span className="text-[11px] font-mono text-zinc-700 dark:text-zinc-300 font-bold bg-[#ECE5DF] dark:bg-[#18181B] border border-black/40 dark:border-zinc-700 px-1.5 py-0.5 rounded-md">
              {Math.max(0, currentStepIndex + 1)} / {totalSteps}
            </span>
          )}
        </div>

        {/* Current Move Odometer Display */}
        {move && (
          <div className="brutal-card bg-white dark:bg-[#18181B] border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFE600] rounded-xl px-2.5 py-0.5 flex items-center gap-1.5">
            <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono font-black uppercase">TURN:</span>
            <span
              key={currentStepIndex}
              className="font-mono text-sm sm:text-base font-black text-[#2563EB] dark:text-[#60A5FA] inline-block animate-ticker-slide"
            >
              {move}
            </span>
          </div>
        )}
      </div>

      {/* Beginner Mode 7-Phase Progress Tracker */}
      {solverMode === 'beginner' && (
        <div className="grid grid-cols-7 gap-1.5 my-2.5">
          {LBL_PHASES.map((p) => {
            const isCurrent = phaseId === p.id;
            const isCompleted = phaseId > p.id;

            return (
              <div
                key={p.id}
                className="flex flex-col items-center group relative cursor-help"
                title={`Phase ${p.id}: ${p.name}`}
              >
                <div
                  className={`w-full h-2 rounded-full border border-black dark:border-zinc-700 transition-all duration-200 ${
                    isCurrent
                      ? 'bg-[#FFE600] shadow-[1px_1px_0px_#000] border-2 border-black scale-y-110'
                      : isCompleted
                      ? 'bg-[#24C789] border-black'
                      : 'bg-[#ECE5DF] dark:bg-zinc-800 border-black/40 dark:border-zinc-700'
                  }`}
                />
                <span
                  className={`text-[9px] font-mono mt-1 truncate max-w-full hidden md:block ${
                    isCurrent ? 'text-black dark:text-[#FFE600] font-black underline' : isCompleted ? 'text-[#15803D] dark:text-[#24C789] font-bold' : 'text-zinc-500 dark:text-zinc-400 font-medium'
                  }`}
                >
                  {p.id}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Explanation description */}
      {phaseDesc && (
        <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed mt-1 font-sans">
          {phaseDesc}
        </p>
      )}

      {/* Pedagogical Tips Post-it Callout */}
      {phaseTip && (
        <div className="mt-2.5 flex items-start gap-2 p-2.5 rounded-xl bg-[#FFFBEB] dark:bg-[#27272A] border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFE600] text-zinc-900 dark:text-zinc-100 text-[11px] leading-relaxed font-sans">
          <Lightbulb className="w-4 h-4 text-black dark:text-[#FFE600] stroke-[2.5] shrink-0 mt-0.5" />
          <div>
            <span className="font-mono font-black uppercase text-black mr-1.5 px-1 py-0.5 bg-[#FFE600] rounded border border-black text-[9px]">
              TIP
            </span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{phaseTip}</span>
          </div>
        </div>
      )}
    </div>
  );
}
