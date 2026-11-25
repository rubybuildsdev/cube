import React from 'react';
import { Zap, BookOpen, Check, ArrowRight, Brain, Clock, Award } from 'lucide-react';

/**
 * AlgorithmComparison - Side-by-side comparison cards and matrix comparing
 * Kociemba Two-Phase Algorithm vs Beginner Layer-by-Layer (LBL) method.
 */
export default function AlgorithmComparison({ onEnterStudio, t }) {
  const tr = (key, fallback) => {
    if (typeof t === 'function') {
      const val = t(key);
      if (val && val !== key) return val;
    }
    return fallback;
  };

  const comparisonRows = [
    {
      metric: tr('algorithms.table.moves', 'Rata-rata Langkah'),
      kociemba: '~20 Langkah (God\'s Number)',
      lbl: '~80 – 120 Langkah',
      highlightKociemba: true,
    },
    {
      metric: tr('algorithms.table.speed', 'Kecepatan Komputasi'),
      kociemba: '< 20 milidetik (Instan)',
      lbl: 'Langkah per langkah terpandu',
      highlightKociemba: true,
    },
    {
      metric: tr('algorithms.table.mentalComplexity', 'Dapat Dihafal Manusia?'),
      kociemba: 'Sangat Sulit (Pruning Tables)',
      lbl: 'Ya, Sangat Mudah (7 Rumus Intuitif)',
      highlightLbl: true,
    },
    {
      metric: tr('algorithms.table.phases', 'Struktur Logika'),
      kociemba: '2 Fase Teori Grup (G0 &rarr; G1 &rarr; Solved)',
      lbl: '7 Fase Bertahap (White Cross s/d Final Corners)',
      highlightLbl: false,
    },
    {
      metric: tr('algorithms.table.target', 'Target Pengguna'),
      kociemba: 'Speedcuber & Penganalisis Komputer',
      lbl: 'Pemula & Pembelajar Mandiri',
      highlightLbl: true,
    },
    {
      metric: tr('algorithms.table.pedagogy', 'Nilai Edukasi Fisik'),
      kociemba: 'Rute Terpendek Matematika',
      lbl: 'Tinggi (Bisa Diterapkan ke Kubus Nyata)',
      highlightLbl: true,
    },
  ];

  return (
    <section id="algorithms" className="relative w-full bg-[#FDFBF7] dark:bg-[#18181B] border-b-[2.5px] border-black dark:border-zinc-700 py-16 sm:py-24 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
            <Brain className="w-4 h-4 text-black" />
            <span className="font-mono text-xs font-bold uppercase text-black">
              {tr('algorithms.badge', 'Perbandingan Algoritma')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-zinc-100 font-sans mb-4">
            {tr('algorithms.title', 'Dua Metode untuk Dua Kebutuhan Berbeda')}
          </h2>

          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
            {tr(
              'algorithms.subtitle',
              'Apakah Anda menginginkan rute terpendek yang efisien secara matematis, atau ingin menguasai langkah-langkah logika untuk memecahkan kubus dengan tangan sendiri?'
            )}
          </p>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* CARD 1: Kociemba Two-Phase */}
          <div className="brutal-card p-6 sm:p-8 bg-white flex flex-col justify-between border-[2.5px] border-black shadow-[5px_5px_0px_#000] relative">
            <div>
              {/* Badge & Mode Tag */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs font-black uppercase px-2.5 py-1 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] text-black">
                  {tr('algorithms.kociemba.tag', 'Optimal Engine')}
                </span>
                <span className="font-mono text-xs font-bold text-zinc-600">
                  Herbert Kociemba (1992)
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-black font-sans mb-2">
                {tr('algorithms.kociemba.name', 'Algoritma Dua-Fase Kociemba')}
              </h3>

              <p className="text-sm text-zinc-700 leading-relaxed mb-6 font-medium">
                {tr(
                  'algorithms.kociemba.theory',
                  'Mereduksi konfigurasi acak kubus ke dalam subgrup G1 melalui Fase 1, lalu menyelesaikannya hanya menggunakan putaran setengah dan sisi bebas pada Fase 2.'
                )}
              </p>

              {/* Stat Pillars */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-[#F5EFEB] border-2 border-black">
                  <div className="text-xs font-mono text-zinc-600 uppercase">Jumlah Langkah</div>
                  <div className="text-xl font-black text-black font-mono">~20 Moves</div>
                </div>
                <div className="p-3 bg-[#F5EFEB] border-2 border-black">
                  <div className="text-xs font-mono text-zinc-600 uppercase">Waktu Komputasi</div>
                  <div className="text-xl font-black text-black font-mono">&lt; 20 ms</div>
                </div>
              </div>

              {/* Key Bullet Points */}
              <ul className="space-y-2.5 mb-8 text-sm text-zinc-800">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-none bg-[#FFE600] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span>Solusi paling efisien dan mendekati batas teoretis God's Number</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-none bg-[#FFE600] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span>Menggunakan dekomposisi ruang koset dan pruning tables</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-none bg-[#FFE600] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span>Sangat cocok untuk simulasi instan dan speedcubing benchmark</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onEnterStudio?.('optimal')}
              className="brutal-btn brutal-btn-yellow w-full py-3.5 text-base gap-2"
            >
              <Zap className="w-4 h-4 fill-black text-black" />
              <span>{tr('algorithms.kociemba.cta', 'Coba Mode Optimal ⚡')}</span>
            </button>
          </div>

          {/* CARD 2: Beginner Layer-by-Layer (LBL) */}
          <div className="brutal-card p-6 sm:p-8 bg-white flex flex-col justify-between border-[2.5px] border-black shadow-[5px_5px_0px_#000] relative">
            <div>
              {/* Badge & Mode Tag */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs font-black uppercase px-2.5 py-1 bg-[#24C789] border-2 border-black shadow-[2px_2px_0px_#000] text-black">
                  {tr('algorithms.lbl.tag', 'Pedagogical Guide')}
                </span>
                <span className="font-mono text-xs font-bold text-zinc-600">
                  Singmaster / CFOP Dasar
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-black font-sans mb-2">
                {tr('algorithms.lbl.name', 'Metode Pemula (Layer-by-Layer)')}
              </h3>

              <p className="text-sm text-zinc-700 leading-relaxed mb-6 font-medium">
                {tr(
                  'algorithms.lbl.theory',
                  'Menyelesaikan kubus secara sistematis lapis demi lapis dari bawah ke atas. Setiap fase memiliki tujuan visual yang jelas dan pola rumus yang dapat dihafal.'
                )}
              </p>

              {/* Stat Pillars */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-[#F5EFEB] border-2 border-black">
                  <div className="text-xs font-mono text-zinc-600 uppercase">Jumlah Langkah</div>
                  <div className="text-xl font-black text-black font-mono">~80 - 120 Moves</div>
                </div>
                <div className="p-3 bg-[#F5EFEB] border-2 border-black">
                  <div className="text-xs font-mono text-zinc-600 uppercase">Tahapan Belajar</div>
                  <div className="text-xl font-black text-black font-mono">7 Fase Bertahap</div>
                </div>
              </div>

              {/* Key Bullet Points */}
              <ul className="space-y-2.5 mb-8 text-sm text-zinc-800">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-none bg-[#24C789] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span>Mudah dipelajari dan langsung dapat dipraktikkan pada kubus fisik</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-none bg-[#24C789] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span>Dilengkapi tips rumus legendaris (Daisy, Sune, R\' D\' R D)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-none bg-[#24C789] border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </span>
                  <span>Fondasi utama sebelum melangkah ke teknik lanjutan (CFOP / Roux)</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onEnterStudio?.('beginner')}
              className="brutal-btn brutal-btn-green w-full py-3.5 text-base gap-2"
            >
              <BookOpen className="w-4 h-4 text-black" />
              <span>{tr('algorithms.lbl.cta', 'Pelajari Metode LBL 🎓')}</span>
            </button>
          </div>

        </div>

        {/* Comparison Matrix Table */}
        <div className="brutal-card overflow-hidden bg-white">
          <div className="px-5 py-3.5 bg-[#F5EFEB] border-b-2 border-black flex items-center justify-between">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
              {tr('algorithms.table.title', 'Tabel Perbandingan Teknis')}
            </span>
            <span className="font-mono text-xs text-zinc-600 hidden sm:inline">
              KOCIEMBA VS LAYER-BY-LAYER
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-black bg-white font-mono text-xs text-black">
                  <th className="py-3 px-4 sm:px-6 font-black uppercase w-1/3">
                    {tr('algorithms.table.metric', 'Parameter')}
                  </th>
                  <th className="py-3 px-4 sm:px-6 font-black uppercase w-1/3 bg-[#FFE600]/25 border-x-2 border-black">
                    Kociemba Two-Phase
                  </th>
                  <th className="py-3 px-4 sm:px-6 font-black uppercase w-1/3 bg-[#24C789]/25">
                    Beginner Layer-by-Layer
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-black font-sans">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-black border-b border-black/15">
                      {row.metric}
                    </td>
                    <td
                      className={`py-3.5 px-4 sm:px-6 font-mono text-xs sm:text-sm border-x-2 border-black border-b border-black/15 ${
                        row.highlightKociemba ? 'font-bold text-black bg-[#FFE600]/10' : 'text-zinc-700'
                      }`}
                      dangerouslySetInnerHTML={{ __html: row.kociemba }}
                    />
                    <td
                      className={`py-3.5 px-4 sm:px-6 font-mono text-xs sm:text-sm border-b border-black/15 ${
                        row.highlightLbl ? 'font-bold text-black bg-[#24C789]/10' : 'text-zinc-700'
                      }`}
                    >
                      {row.lbl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
