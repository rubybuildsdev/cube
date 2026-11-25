import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Plus, Minus } from 'lucide-react';

/**
 * LandingFAQ - Neubrutalist accordion FAQ for common cubing,
 * algorithm, parity, and performance questions.
 */
export default function LandingFAQ({ t }) {
  const [openIndex, setOpenIndex] = useState(0);

  const tr = (key, fallback) => {
    if (typeof t === 'function') {
      const val = t(key);
      if (val && val !== key) return val;
    }
    return fallback;
  };

  const faqItems = [
    {
      q: tr('faq.q1', 'Apakah saya harus menginstal aplikasi atau plugin tertentu?'),
      a: tr(
        'faq.a1',
        'Tidak sama sekali! CubeSolver 3D berjalan 100% di browser modern dengan akselerasi hardware WebGL Three.js. Anda cukup membuka website dan langsung mulai memutar, mengacak, atau memecahkan kubus.'
      ),
    },
    {
      q: tr('faq.q2', 'Apa perbedaan antara Mode Optimal (Kociemba) dan Mode Pemula (LBL)?'),
      a: tr(
        'faq.a2',
        'Mode Optimal menggunakan algoritma matematika dua-fase Kociemba untuk menemukan rute penyelesaian terpendek (~20 langkah). Sedangkan mode Pemula (Layer-by-Layer) mengajarkan 7 tahapan bertahap yang mudah dihafal dan dipraktikkan langsung pada kubus fisik.'
      ),
    },
    {
      q: tr('faq.q3', 'Bagaimana jika kubus fisik saya terputar sudutnya (corner twist / parity error)?'),
      a: tr(
        'faq.a3',
        'CubeSolver 3D dilengkapi Studio Kalibrasi dengan diagnostik paritas fisik otomatis. Sistem akan langsung memperingatkan Anda jika ada satu sudut terputar (corner twist) atau satu tepi terbalik (flipped edge) yang secara fisik mustahil diselesaikan.'
      ),
    },
    {
      q: tr('faq.q4', 'Apakah notasi gerakan di sini mengikuti standar resmi kompetisi WCA?'),
      a: tr(
        'faq.a4',
        'Ya! Kami sepenuhnya mematuhi notasi Singmaster standar resmi World Cube Association (WCA) termasuk gerakan searah jarum jam (R, U, F, L, D, B), prime / berlawanan jarum jam (R\', U\', F\'), dan putaran ganda (R2, U2, F2).'
      ),
    },
    {
      q: tr('faq.q5', 'Bisakah saya mengendalikan kubus menggunakan keyboard di desktop?'),
      a: tr(
        'faq.a5',
        'Tentu saja! Tekan tombol R, U, F, L, D, B untuk memutar sisi searah jarum jam, dan tahan Shift untuk memutar berlawanan arah jarum jam. Tekan tombol Spasi untuk play/pause, S untuk acak (scramble), dan ? untuk panduan pintasan lengkap.'
      ),
    },
    {
      q: tr('faq.q6', 'Apakah aplikasi ini aman dan dapat digunakan secara offline tanpa internet?'),
      a: tr(
        'faq.a6',
        'Sangat aman! Seluruh pemrosesan algoritma solver dan simulasi 3D Three.js dieksekusi secara lokal (100% client-side) di perangkat Anda tanpa request server luar.'
      ),
    },
  ];

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="relative w-full bg-[#FDFBF7] dark:bg-[#18181B] border-b-[2.5px] border-black dark:border-zinc-700 py-16 sm:py-24 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF8A00] text-black border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
            <HelpCircle className="w-4 h-4 text-black" />
            <span className="font-mono text-xs font-bold uppercase text-black">
              {tr('faq.badge', 'Pertanyaan Umum')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-zinc-100 font-sans mb-4">
            {tr('faq.title', 'Hal yang Sering Ditanyakan')}
          </h2>

          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
            {tr(
              'faq.subtitle',
              'Jawaban ringkas seputar cara kerja algoritma, diagnostik kalibrasi stiker, dan kompatibilitas perangkat.'
            )}
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="brutal-card transition-all overflow-hidden bg-white border-[2.5px] border-black shadow-[4px_4px_0px_#000]"
              >
                {/* Header / Question Button */}
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors ${
                    isOpen ? 'bg-[#F5EFEB]' : 'bg-white hover:bg-[#FDFBF7]'
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-7 h-7 bg-[#FFE600] border-2 border-black font-mono font-bold text-xs flex items-center justify-center shrink-0 text-black shadow-[1.5px_1.5px_0px_#000]">
                      Q{idx + 1}
                    </span>
                    <span className="font-bold text-base sm:text-lg text-black font-sans">
                      {item.q}
                    </span>
                  </div>

                  <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#000]">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-black" />
                    ) : (
                      <Plus className="w-4 h-4 text-black" />
                    )}
                  </div>
                </button>

                {/* Body / Answer */}
                {isOpen && (
                  <div className="p-5 sm:p-6 bg-white border-t-2 border-black text-sm sm:text-base text-zinc-700 font-medium leading-relaxed animate-fadeIn">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
