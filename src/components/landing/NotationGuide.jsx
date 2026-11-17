import React, { useState } from 'react';
import { RotateCw, RotateCcw, Repeat, Info, Sparkles } from 'lucide-react';

/**
 * NotationGuide - Interactive visual cheat sheet for standard WCA moves
 * (U, U', D, D', L, L', R, R', F, F', B, B' plus double turns).
 * Highlights clockwise vs counter-clockwise indicators with tactile feedback.
 */
export default function NotationGuide({ t }) {
  const [selectedMove, setSelectedMove] = useState('R');

  const tr = (key, fallback) => {
    if (typeof t === 'function') {
      const val = t(key);
      if (val && val !== key) return val;
    }
    return fallback;
  };

  const movesData = {
    R: {
      face: 'Right (Kanan)',
      color: '#FF5252',
      colorName: 'Merah / Red',
      type: 'clockwise',
      angle: '90° Clockwise',
      descId: 'Putar sisi KANAN searah jarum jam (ke atas / menjauhi Anda).',
      descEn: 'Turn the RIGHT face 90° clockwise (upwards / away from you).',
      cue: 'Jari telunjuk kanan mendorong ke atas.',
    },
    "R'": {
      face: 'Right (Kanan)',
      color: '#FF5252',
      colorName: 'Merah / Red',
      type: 'counter',
      angle: "90° Counter-Clockwise (Prime ')",
      descId: 'Putar sisi KANAN berlawanan arah jarum jam (ke bawah / mendekat ke Anda).',
      descEn: 'Turn the RIGHT face 90° counter-clockwise (downwards / towards you).',
      cue: 'Ibu jari kanan menarik ke bawah.',
    },
    R2: {
      face: 'Right (Kanan)',
      color: '#FF5252',
      colorName: 'Merah / Red',
      type: 'double',
      angle: '180° Double Turn',
      descId: 'Putar sisi KANAN setengah putaran penuh (180°). Arah putar bebas.',
      descEn: 'Turn the RIGHT face 180° half-turn. Rotation direction does not matter.',
      cue: 'Dua putaran berturut-turut.',
    },

    U: {
      face: 'Up (Atas)',
      color: '#FFFFFF',
      colorName: 'Putih / White',
      type: 'clockwise',
      angle: '90° Clockwise',
      descId: 'Putar sisi ATAS searah jarum jam (dari kanan ke kiri).',
      descEn: 'Turn the UP face 90° clockwise (from right to left).',
      cue: 'Telunjuk kanan menjentik ke kiri.',
    },
    "U'": {
      face: 'Up (Atas)',
      color: '#FFFFFF',
      colorName: 'Putih / White',
      type: 'counter',
      angle: "90° Counter-Clockwise (Prime ')",
      descId: 'Putar sisi ATAS berlawanan arah jarum jam (dari kiri ke kanan).',
      descEn: 'Turn the UP face 90° counter-clockwise (from left to right).',
      cue: 'Telunjuk kiri menjentik ke kanan.',
    },
    U2: {
      face: 'Up (Atas)',
      color: '#FFFFFF',
      colorName: 'Putih / White',
      type: 'double',
      angle: '180° Double Turn',
      descId: 'Putar sisi ATAS 180° setengah putaran penuh.',
      descEn: 'Turn the UP face 180° half-turn.',
      cue: 'Jentikan ganda telunjuk.',
    },

    F: {
      face: 'Front (Depan)',
      color: '#24C789',
      colorName: 'Hijau / Green',
      type: 'clockwise',
      angle: '90° Clockwise',
      descId: 'Putar sisi DEPAN searah jarum jam (seperti memutar setir mobil ke kanan).',
      descEn: 'Turn the FRONT face 90° clockwise (like steering right).',
      cue: 'Telunjuk kanan menekan sisi depan ke bawah.',
    },
    "F'": {
      face: 'Front (Depan)',
      color: '#24C789',
      colorName: 'Hijau / Green',
      type: 'counter',
      angle: "90° Counter-Clockwise (Prime ')",
      descId: 'Putar sisi DEPAN berlawanan arah jarum jam (seperti memutar setir mobil ke kiri).',
      descEn: 'Turn the FRONT face 90° counter-clockwise (like steering left).',
      cue: 'Ibu jari kanan mendorong ke atas.',
    },
    F2: {
      face: 'Front (Depan)',
      color: '#24C789',
      colorName: 'Hijau / Green',
      type: 'double',
      angle: '180° Double Turn',
      descId: 'Putar sisi DEPAN 180° setengah putaran penuh.',
      descEn: 'Turn the FRONT face 180° half-turn.',
      cue: 'Putaran ganda sisi depan.',
    },

    L: {
      face: 'Left (Kiri)',
      color: '#FF8A00',
      colorName: 'Oranye / Orange',
      type: 'clockwise',
      angle: '90° Clockwise',
      descId: 'Putar sisi KIRI searah jarum jam (ke bawah / mendekat ke Anda).',
      descEn: 'Turn the LEFT face 90° clockwise (downwards / towards you).',
      cue: 'Ibu jari kiri menarik ke bawah.',
    },
    "L'": {
      face: 'Left (Kiri)',
      color: '#FF8A00',
      colorName: 'Oranye / Orange',
      type: 'counter',
      angle: "90° Counter-Clockwise (Prime ')",
      descId: 'Putar sisi KIRI berlawanan arah jarum jam (ke atas / menjauhi Anda).',
      descEn: 'Turn the LEFT face 90° counter-clockwise (upwards / away from you).',
      cue: 'Telunjuk kiri mendorong ke atas.',
    },
    L2: {
      face: 'Left (Kiri)',
      color: '#FF8A00',
      colorName: 'Oranye / Orange',
      type: 'double',
      angle: '180° Double Turn',
      descId: 'Putar sisi KIRI 180° setengah putaran penuh.',
      descEn: 'Turn the LEFT face 180° half-turn.',
      cue: 'Putaran ganda sisi kiri.',
    },

    D: {
      face: 'Down (Bawah)',
      color: '#FFE600',
      colorName: 'Kuning / Yellow',
      type: 'clockwise',
      angle: '90° Clockwise',
      descId: 'Putar sisi BAWAH searah jarum jam (dari kiri ke kanan saat dilihat dari depan).',
      descEn: 'Turn the DOWN face 90° clockwise (from left to right viewed from front).',
      cue: 'Jari manis kiri menjentik ke kanan.',
    },
    "D'": {
      face: 'Down (Bawah)',
      color: '#FFE600',
      colorName: 'Kuning / Yellow',
      type: 'counter',
      angle: "90° Counter-Clockwise (Prime ')",
      descId: 'Putar sisi BAWAH berlawanan arah jarum jam (dari kanan ke kiri).',
      descEn: 'Turn the DOWN face 90° counter-clockwise (from right to left).',
      cue: 'Jari manis kanan menjentik ke kiri.',
    },
    D2: {
      face: 'Down (Bawah)',
      color: '#FFE600',
      colorName: 'Kuning / Yellow',
      type: 'double',
      angle: '180° Double Turn',
      descId: 'Putar sisi BAWAH 180° setengah putaran penuh.',
      descEn: 'Turn the DOWN face 180° half-turn.',
      cue: 'Putaran ganda sisi dasar.',
    },

    B: {
      face: 'Back (Belakang)',
      color: '#2563EB',
      colorName: 'Biru / Blue',
      type: 'clockwise',
      angle: '90° Clockwise',
      descId: 'Putar sisi BELAKANG searah jarum jam (dari kiri ke kanan di atas).',
      descEn: 'Turn the BACK face 90° clockwise (viewed directly from the back).',
      cue: 'Jari telunjuk memutar sisi belakang.',
    },
    "B'": {
      face: 'Back (Belakang)',
      color: '#2563EB',
      colorName: 'Biru / Blue',
      type: 'counter',
      angle: "90° Counter-Clockwise (Prime ')",
      descId: 'Putar sisi BELAKANG berlawanan arah jarum jam.',
      descEn: 'Turn the BACK face 90° counter-clockwise.',
      cue: 'Jari telunjuk membalik sisi belakang.',
    },
    B2: {
      face: 'Back (Belakang)',
      color: '#2563EB',
      colorName: 'Biru / Blue',
      type: 'double',
      angle: '180° Double Turn',
      descId: 'Putar sisi BELAKANG 180° setengah putaran penuh.',
      descEn: 'Turn the BACK face 180° half-turn.',
      cue: 'Putaran ganda sisi belakang.',
    },
  };

  const currentMove = movesData[selectedMove] || movesData['R'];

  const moveCategories = [
    { title: 'Right (R)', moves: ['R', "R'", 'R2'] },
    { title: 'Up (U)', moves: ['U', "U'", 'U2'] },
    { title: 'Front (F)', moves: ['F', "F'", 'F2'] },
    { title: 'Left (L)', moves: ['L', "L'", 'L2'] },
    { title: 'Down (D)', moves: ['D', "D'", 'D2'] },
    { title: 'Back (B)', moves: ['B', "B'", 'B2'] },
  ];

  return (
    <section id="notation" className="relative w-full bg-[#F5EFEB] border-b-[2.5px] border-black py-16 sm:py-24 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2563EB] text-white border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="font-mono text-xs font-bold uppercase text-white">
              {tr('notation.badge', 'Standar WCA Resmi')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black font-sans mb-4">
            {tr('notation.title', 'Kamus Notasi Gerakan Rubik')}
          </h2>

          <p className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed">
            {tr(
              'notation.subtitle',
              'Kuasai notasi Singmaster resmi World Cube Association. Klik notasi untuk memeriksa arah jarum jam dan cue gerakan fisiknya.'
            )}
          </p>
        </div>

        {/* Interactive Move Selector & Detail Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* LEFT: Move Selector Grid (7 cols) */}
          <div className="lg:col-span-7 brutal-card p-6 sm:p-8 bg-white">
            <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-black">
              <span className="font-mono text-xs font-black uppercase text-black">
                {tr('notation.hint', 'Pilih Notasi Gerakan')}
              </span>
              <span className="font-mono text-xs text-zinc-500">
                12 STANDARD + 6 DOUBLE TURNS
              </span>
            </div>

            {/* Move Button Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {moveCategories.map((cat) => (
                <div key={cat.title} className="p-3 bg-[#FDFBF7] border-2 border-black flex flex-col gap-2">
                  <div className="font-mono text-xs font-bold text-zinc-700 pb-1 border-b border-black/10">
                    {cat.title}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {cat.moves.map((m) => {
                      const isSelected = selectedMove === m;
                      const isPrime = m.includes("'");
                      const isDouble = m.includes('2');

                      let bgClass = 'bg-white hover:bg-[#F5EFEB]';
                      if (isSelected) {
                        bgClass = isPrime ? 'bg-[#FF5252] text-white' : isDouble ? 'bg-[#2563EB] text-white' : 'bg-[#FFE600] text-black';
                      }

                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setSelectedMove(m)}
                          className={`flex-1 py-1.5 font-mono font-black text-sm border-2 border-black transition-all ${bgClass} ${
                            isSelected
                              ? 'shadow-[2px_2px_0px_#000] -translate-y-0.5'
                              : 'shadow-[1.5px_1.5px_0px_#000]'
                          }`}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Helper Notes */}
            <div className="mt-6 pt-4 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#FFE600] border border-black inline-block"></span>
                <span>Normal = 90° Searah Jarum Jam</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#FF5252] border border-black inline-block"></span>
                <span>Aksen (') = 90° Berlawanan Jarum Jam</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#2563EB] border border-black inline-block"></span>
                <span>Angka (2) = 180° Putaran Penuh</span>
              </span>
            </div>
          </div>

          {/* RIGHT: Selected Move Visual Inspector (5 cols) */}
          <div className="lg:col-span-5 brutal-card p-6 sm:p-8 bg-white border-[2.5px] border-black shadow-[6px_6px_0px_#000] relative">
            
            {/* Top Indicator Strip */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-black">
              <span className="font-mono text-xs font-bold text-zinc-600 uppercase">
                INSPEKTOR GERAKAN
              </span>
              <span
                className="font-mono text-xs font-bold px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0px_#000]"
                style={{ backgroundColor: currentMove.color, color: currentMove.color === '#FFFFFF' ? '#000' : '#FFF' }}
              >
                {currentMove.face}
              </span>
            </div>

            {/* Giant Move Monogram with Direction Icon */}
            <div className="flex items-center justify-between mb-6 bg-[#FDFBF7] p-5 border-2 border-black shadow-[3px_3px_0px_#000]">
              <div>
                <span className="font-mono font-black text-6xl sm:text-7xl text-black tracking-tight">
                  {selectedMove}
                </span>
                <div className="font-mono text-xs text-zinc-600 mt-1">
                  {currentMove.colorName}
                </div>
              </div>

              {/* Rotational Indicator Icon */}
              <div className="w-18 h-18 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
                {currentMove.type === 'counter' ? (
                  <RotateCcw className="w-10 h-10 text-[#FF5252] stroke-[2.5]" />
                ) : currentMove.type === 'double' ? (
                  <Repeat className="w-10 h-10 text-[#2563EB] stroke-[2.5]" />
                ) : (
                  <RotateCw className="w-10 h-10 text-[#24C789] stroke-[2.5]" />
                )}
              </div>
            </div>

            {/* Rotational Direction Details */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="font-mono text-xs uppercase text-zinc-500 font-bold mb-1">
                  Arah Rotasi
                </div>
                <div className="font-bold text-base text-black flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      currentMove.type === 'counter'
                        ? 'bg-[#FF5252]'
                        : currentMove.type === 'double'
                        ? 'bg-[#2563EB]'
                        : 'bg-[#24C789]'
                    }`}
                  ></span>
                  {currentMove.angle}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs uppercase text-zinc-500 font-bold mb-1">
                  Instruksi Fisik
                </div>
                <p className="text-sm text-zinc-800 leading-relaxed font-medium bg-[#F5EFEB] p-3 border border-black">
                  {currentMove.descId}
                </p>
              </div>

              <div>
                <div className="font-mono text-xs uppercase text-zinc-500 font-bold mb-1">
                  Fingertrick Cue
                </div>
                <div className="text-xs font-mono text-zinc-700 bg-white p-2.5 border border-dashed border-black">
                  💡 {currentMove.cue}
                </div>
              </div>
            </div>

            {/* Info note */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-3 border-t-2 border-black/10">
              <Info className="w-4 h-4 text-black shrink-0" />
              <span>Tekan tombol keyboard yang sesuai di Studio untuk memutar instan.</span>
            </div>

          </div>

        </div>

        {/* Notation Legend 3-Column Pill Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="brutal-card p-4 bg-white flex items-center gap-3">
            <div className="w-10 h-10 bg-[#24C789] border-2 border-black flex items-center justify-center font-mono font-black text-lg text-black">
              R
            </div>
            <div>
              <div className="font-black text-sm text-black">Huruf Polos (Clockwise)</div>
              <div className="text-xs text-zinc-600 font-mono">90° Searah jarum jam</div>
            </div>
          </div>

          <div className="brutal-card p-4 bg-white flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF5252] border-2 border-black flex items-center justify-center font-mono font-black text-lg text-white">
              R'
            </div>
            <div>
              <div className="font-black text-sm text-black">Aksen / Prime (Counter)</div>
              <div className="text-xs text-zinc-600 font-mono">90° Berlawanan jarum jam</div>
            </div>
          </div>

          <div className="brutal-card p-4 bg-white flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] border-2 border-black flex items-center justify-center font-mono font-black text-lg text-white">
              R2
            </div>
            <div>
              <div className="font-black text-sm text-black">Angka 2 (Half-turn)</div>
              <div className="text-xs text-zinc-600 font-mono">180° Putaran ganda</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
