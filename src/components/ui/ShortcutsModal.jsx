import React, { useEffect } from 'react';
import { Keyboard, X } from 'lucide-react';
import { playClickSound, playHoverSound } from '../../utils/audio';

const SHORTCUT_GROUPS = [
  {
    category: 'Playback & Solving',
    items: [
      { key: 'Space', descKey: 'shortcuts.space', defaultDesc: 'Play / Pause playback' },
      { key: '← / →', descKey: 'shortcuts.stepNextPrev', defaultDesc: 'Previous / Next step' },
      { key: 'Enter', descKey: 'shortcuts.solve', defaultDesc: 'Trigger cube solve' },
    ],
  },
  {
    category: 'Interactive Actions',
    items: [
      { key: 'S', descKey: 'shortcuts.scramble', defaultDesc: 'Generate random scramble' },
      { key: 'P', descKey: 'shortcuts.paint', defaultDesc: 'Toggle Paint Mode' },
      { key: 'M', descKey: 'shortcuts.mute', defaultDesc: 'Toggle audio sound mute' },
      { key: 'C', descKey: 'shortcuts.reset', defaultDesc: 'Reset cube to solved' },
      { key: '?', descKey: 'shortcuts.help', defaultDesc: 'Open / close this guide' },
    ],
  },
  {
    category: 'Cube Rotations (Standard Notation)',
    items: [
      { key: 'U, D, L, R, F, B', descKey: 'shortcuts.turnsClockwise', defaultDesc: 'Turn face clockwise (90°)' },
      { key: 'Shift + (Face)', descKey: 'shortcuts.turnsCounter', defaultDesc: 'Turn face counter-clockwise (Prime \')' },
    ],
  },
];

export default function ShortcutsModal({
  isOpen = false,
  onClose,
  t = (key, fallback) => fallback || key,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    playClickSound();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-[#FDFBF7] border-[3px] border-black shadow-[8px_8px_0px_#000] rounded-2xl p-5 text-black relative overflow-hidden select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b-[2.5px] border-black">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFE600] text-black rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <Keyboard className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base font-black text-black font-mono tracking-tight">
                {t('shortcuts.title', 'Keyboard Shortcuts')}
              </h2>
              <p className="text-xs text-zinc-600 font-mono">
                Quick commands to control the 3D cube and solver
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            onMouseEnter={playHoverSound}
            className="brutal-btn brutal-btn-white p-1.5 text-black rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
            aria-label="Close shortcuts modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Content list */}
        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {SHORTCUT_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <h3 className="text-[11px] font-mono font-black uppercase tracking-wider text-black px-1">
                {group.category}
              </h3>
              <div className="brutal-card bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] divide-y-2 divide-black/10 overflow-hidden">
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between px-3 py-2 text-xs"
                  >
                    <span className="font-medium text-zinc-800">
                      {t(item.descKey, item.defaultDesc)}
                    </span>
                    <kbd className="px-2.5 py-1 bg-[#F5EFEB] border-2 border-black shadow-[2px_2px_0px_#000] text-black font-mono text-[11px] font-black rounded-md">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pt-3.5 border-t-[2.5px] border-black flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            onMouseEnter={playHoverSound}
            className="brutal-btn brutal-btn-yellow px-4 py-2 text-black rounded-xl text-xs font-mono font-black border-2 border-black shadow-[3px_3px_0px_#000] transition-all cursor-pointer"
          >
            {t('shortcuts.close', 'Close Guide')}
          </button>
        </div>
      </div>
    </div>
  );
}
