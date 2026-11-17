import React, { useState } from 'react';
import { X, Check, Box, Sliders, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { playClickSound, playHoverSound } from '../../utils/audio';

export default function PuzzleGalleryModal({
  isOpen = false,
  onClose,
  currentSize = 3,
  onSelectPuzzle,
  lang = 'en',
  t = (key, fallback) => fallback || key,
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'wca' | 'special'
  const [customSliderSize, setCustomSliderSize] = useState(currentSize || 3);

  if (!isOpen) return null;

  const catalog = [
    {
      id: '3x3',
      name: "Rubik's Cube 3x3",
      subtitle: "The Legendary Classic",
      size: 3,
      category: 'wca',
      status: 'ready',
      desc: lang === 'id'
        ? 'Kubus klasik paling terkenal di dunia. Dilengkapi solver Kociemba 2-phase (~20 gerakan) dan tutorial Layer-by-Layer 7 langkah.'
        : 'The world\'s most famous cube. Features two-phase Kociemba optimal solver (~20 moves) and 7-phase Layer-by-Layer beginner tutorial.',
      tags: ['WCA Standard', 'Kociemba Optimal', 'LBL Tutorial'],
      accentColor: '#FFE600',
    },
    {
      id: '2x2',
      name: "Pocket Cube 2x2",
      subtitle: "Mini Speedcubing",
      size: 2,
      category: 'wca',
      status: 'ready',
      desc: lang === 'id'
        ? 'Kubus mini 8 sudut tanpa edge atau center. Putaran sangat lincah, ideal untuk melatih algoritma Ortega dan CLL.'
        : 'Mini 8-corner cube without edges or centers. Blazing fast turns, ideal for practicing Ortega and CLL algorithms.',
      tags: ['WCA Standard', 'Corner-Only', 'Speedcubing'],
      accentColor: '#24C789',
    },
    {
      id: '4x4',
      name: "Rubik's Revenge 4x4",
      subtitle: "The Parity Beast",
      size: 4,
      category: 'wca',
      status: 'ready',
      desc: lang === 'id'
        ? 'Kubus 4x4 berukuran genap dengan pusat bergerak bebas dan paritas OLL/PLL unik yang menantang akal.'
        : 'Even-layered 4x4 cube with floating centers and unique OLL/PLL parity algorithms that challenge cubers.',
      tags: ['WCA Standard', 'Big Cube', 'Parity Challenge'],
      accentColor: '#2563EB',
    },
    {
      id: '5x5',
      name: "Professor's Cube 5x5",
      subtitle: "The Master Big Cube",
      size: 5,
      category: 'wca',
      status: 'ready',
      desc: lang === 'id'
        ? 'Kubus 5x5 dengan 98 bidak, pusat tetap kanonikal, dan teknik reduksi edge pairing yang sangat memuaskan.'
        : '5x5 cube featuring 98 pieces, fixed canonical centers, and deeply satisfying edge pairing reduction technique.',
      tags: ['WCA Standard', 'Big Cube', 'Reduction Method'],
      accentColor: '#FF8A00',
    },
    {
      id: 'nxn',
      name: "Custom NxN Sandbox",
      subtitle: "Slider 2x2 s/d 7x7",
      size: 'custom',
      category: 'wca',
      status: 'ready',
      desc: lang === 'id'
        ? 'Pilih ukuran dimensi kubus sesuka Anda mulai dari 2x2, 6x6, hingga 7x7 menggunakan slider presisi interaktif.'
        : 'Choose custom cube dimensions from 2x2, 6x6, up to 7x7 using interactive precision slider.',
      tags: ['Custom Sandbox', '3D WebGL', '2x2..7x7'],
      accentColor: '#EC4899',
    },
    {
      id: 'pyraminx',
      name: "Pyraminx",
      subtitle: "Tetrahedral Puzzle",
      category: 'special',
      status: 'roadmap',
      desc: lang === 'id'
        ? 'Puzzle piramida 4 sisi segitiga dengan putaran ujung (tips) dan sistem notasi WCA tersendiri.'
        : 'Tetrahedral 4-faced pyramid puzzle with turning tips and distinct WCA competition notation.',
      tags: ['WCA Official', 'Tetrahedron', 'Non-Cubic'],
      accentColor: '#FFE600',
    },
    {
      id: 'megaminx',
      name: "Megaminx",
      subtitle: "12-Faced Dodecahedron",
      category: 'special',
      status: 'roadmap',
      desc: lang === 'id'
        ? 'Puzzle 12 sisi berbentuk dodekahedron dengan 50 bidak bergerak dan tantangan star-pattern spektakuler.'
        : '12-faced dodecahedron puzzle with 50 movable pieces and spectacular star-pattern challenges.',
      tags: ['WCA Official', 'Dodecahedron', '50 Pieces'],
      accentColor: '#8B5CF6',
    },
    {
      id: 'skewb',
      name: "Skewb",
      subtitle: "Corner-Turning Mechanism",
      category: 'special',
      status: 'roadmap',
      desc: lang === 'id'
        ? 'Puzzle putaran sudut deep-cut axis yang mengubah orientasi 4 pusat sekaligus tiap satu kali belokan.'
        : 'Corner-turning deep-cut axis puzzle that shifts 4 centers simultaneously on each twist.',
      tags: ['WCA Official', 'Deep-Cut Axis', 'Corner-Turn'],
      accentColor: '#06B6D4',
    },
    {
      id: 'square1',
      name: "Square-1 (SQ-1)",
      subtitle: "Shape Shifting Beast",
      category: 'special',
      status: 'roadmap',
      desc: lang === 'id'
        ? 'Puzzle pengubah bentuk yang bisa terkunci (bandaged) saat diputar pada lapisan tengah dengan notasi derajat sudut.'
        : 'Shape-shifting puzzle that can bandage during mid-slice turns with unique degree-angle notation.',
      tags: ['WCA Official', 'Shape-Shifter', 'Bandaged'],
      accentColor: '#10B981',
    },
    {
      id: 'mirror',
      name: "Mirror Blocks 3x3",
      subtitle: "Bump Cube Monokrom",
      category: 'special',
      status: 'roadmap',
      desc: lang === 'id'
        ? 'Modifikasi 3x3 monokrom perak/emas yang diselesaikan murni berdasarkan bentuk dan ketebalan balok, bukan warna.'
        : 'Monochrome silver/gold 3x3 shape mod solved purely by block shapes and thicknesses rather than colors.',
      tags: ['Shape Mod', 'Monochrome', 'Tactile Recognition'],
      accentColor: '#64748B',
    },
    {
      id: 'ghost',
      name: "Ghost Cube",
      subtitle: "Extreme Asymmetry",
      category: 'special',
      status: 'roadmap',
      desc: lang === 'id'
        ? 'Modifikasi kubus tersulit dengan pemotongan lapisan miring (misaligned) dan bentuk asimetris tingkat dewa.'
        : 'Hardcore cube modification with misaligned layers and extreme asymmetric geometry.',
      tags: ['Hardcore Mod', 'Asymmetric', 'Expert Level'],
      accentColor: '#475569',
    },
    {
      id: 'clock',
      name: "Rubik's Clock",
      subtitle: "Double-Sided Mechanical",
      category: 'special',
      status: 'roadmap',
      desc: lang === 'id'
        ? 'Puzzle mekanikal dua sisi dengan 18 jam jarum dan 4 pin pendorong untuk menyelaraskan jarum jam ke angka 12.'
        : 'Two-sided mechanical puzzle with 18 clock faces and 4 push pins to synchronize all hands to 12 o\'clock.',
      tags: ['WCA Official', 'Mechanical', 'Dual-Sided'],
      accentColor: '#0284C7',
    },
  ];

  const filteredItems = catalog.filter((item) => {
    if (activeFilter === 'wca') return item.category === 'wca';
    if (activeFilter === 'special') return item.category === 'special';
    return true;
  });

  const handleSelect = (item) => {
    playClickSound();
    if (item.status !== 'ready') return;

    if (item.id === 'nxn') {
      if (onSelectPuzzle) onSelectPuzzle(customSliderSize);
    } else {
      if (onSelectPuzzle) onSelectPuzzle(item.size);
    }
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 select-none animate-fadeIn">
      <div className="brutal-card bg-[#FDFBF7] dark:bg-[#1E1E22] border-[3px] border-black dark:border-zinc-700 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#FFE600] rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b-[3px] border-black dark:border-zinc-700 bg-[#F5EFEB] dark:bg-[#27272A] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] rounded-lg text-black">
              <Box className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-mono tracking-tight text-black dark:text-zinc-100">
                {t('gallery.title', 'Katalog Puzzle & Galeri WCA')}
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                {t('gallery.subtitle', 'Jelajahi berbagai jenis twisty puzzle dari ukuran standar WCA hingga varian bentuk kustom.')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              if (onClose) onClose();
            }}
            onMouseEnter={playHoverSound}
            className="brutal-btn brutal-btn-white p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] text-black dark:text-zinc-100 dark:bg-[#1E1E22] hover:bg-[#FF5252] hover:text-white transition-colors cursor-pointer"
            title={t('gallery.close', 'Tutup')}
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="px-5 py-3 border-b-2 border-black/10 dark:border-zinc-700/60 bg-white dark:bg-[#18181B] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 brutal-bay p-1 rounded-xl bg-[#ECE5DF] dark:bg-[#27272A] border-2 border-black dark:border-zinc-700">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveFilter('all');
              }}
              onMouseEnter={playHoverSound}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {t('gallery.all', 'Semua Puzzle')} ({catalog.length})
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveFilter('wca');
              }}
              onMouseEnter={playHoverSound}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                activeFilter === 'wca'
                  ? 'bg-[#24C789] text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {t('gallery.wcaNxN', 'WCA NxN')} (5)
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveFilter('special');
              }}
              onMouseEnter={playHoverSound}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                activeFilter === 'special'
                  ? 'bg-[#2563EB] text-white border-2 border-black shadow-[2px_2px_0px_#000]'
                  : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
              }`}
            >
              {t('gallery.special', 'Shape Mods & Khusus')} (7)
            </button>
          </div>

          <div className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#24C789] border border-black" />
              {t('gallery.readyBadge', 'Siap Main (3D Active)')}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] border border-black" />
              {t('gallery.roadmapBadge', 'Roadmap')}
            </span>
          </div>
        </div>

        {/* Puzzle Cards Grid View */}
        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-graph-grid">
          {filteredItems.map((item) => {
            const isReady = item.status === 'ready';
            const isCurrentActive = isReady && item.id !== 'nxn' && item.size === currentSize;

            return (
              <div
                key={item.id}
                className={`brutal-card rounded-xl p-4 flex flex-col justify-between transition-all ${
                  isCurrentActive
                    ? 'ring-3 ring-[#24C789] bg-[#F5EFEB] dark:bg-[#27272A]'
                    : 'bg-white dark:bg-[#1E1E22]'
                } border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600] hover:-translate-y-1`}
              >
                <div>
                  {/* Card Header: Title & Badges */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-sm font-extrabold font-mono text-black dark:text-zinc-100">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Status Badge */}
                    {isReady ? (
                      <span className="brutal-badge bg-[#24C789] text-black text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000]">
                        {t('gallery.readyToPlay', 'SIAP MAIN')}
                      </span>
                    ) : (
                      <span className="brutal-badge bg-[#FFE600] text-black text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000]">
                        {t('gallery.roadmap', 'ROADMAP')}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed mb-3">
                    {item.desc}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded border border-black/20 dark:border-zinc-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Slider Control for Custom NxN */}
                  {item.id === 'nxn' && (
                    <div className="p-2.5 rounded-lg bg-[#F5EFEB] dark:bg-[#27272A] border border-black dark:border-zinc-700 mb-3 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-black dark:text-zinc-100">
                        <span>{t('gallery.selectDimension', 'Pilih Dimensi')}:</span>
                        <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded border border-black text-xs font-black">
                          {customSliderSize}x{customSliderSize}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="7"
                        step="1"
                        value={customSliderSize}
                        onChange={(e) => setCustomSliderSize(parseInt(e.target.value, 10))}
                        className="w-full accent-black cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                        <span>2x2</span>
                        <span>3x3</span>
                        <span>4x4</span>
                        <span>5x5</span>
                        <span>6x6</span>
                        <span>7x7</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div>
                  {isReady ? (
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      onMouseEnter={playHoverSound}
                      className={`w-full brutal-btn py-2 rounded-lg text-xs font-mono font-bold transition-all border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5 cursor-pointer ${
                        isCurrentActive
                          ? 'bg-[#24C789] text-black hover:bg-[#10B981]'
                          : 'bg-[#FFE600] text-black hover:bg-[#FACC15]'
                      }`}
                    >
                      {isCurrentActive ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>{t('gallery.currentlyActive', 'Sedang Aktif')}</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {item.id === 'nxn'
                              ? t('gallery.playCustom', `Mainkan ${customSliderSize}x${customSliderSize} ⚡`)
                              : t('gallery.playNow', `Mainkan ${item.name} ⚡`)}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2 rounded-lg text-xs font-mono font-bold border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t('gallery.inDevelopment', 'Dalam Roadmap WCA')}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer Note */}
        <div className="px-5 py-3 border-t-2 border-black dark:border-zinc-700 bg-[#F5EFEB] dark:bg-[#27272A] flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400">
          <span>{t('gallery.footerNote', '📐 Engine 3D Three.js mendukung render realtime seluruh ukuran kubus NxN.')}</span>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              if (onClose) onClose();
            }}
            className="brutal-btn brutal-btn-white px-3 py-1 rounded-lg border-2 border-black text-xs font-bold font-mono text-black dark:text-zinc-100 dark:bg-[#1E1E22] cursor-pointer"
          >
            {t('gallery.close', 'Tutup')}
          </button>
        </div>
      </div>
    </div>
  );
}
