import React from 'react';
import {
  Box,
  Cpu,
  GraduationCap,
  Palette,
  WifiOff,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldAlert
} from 'lucide-react';

/**
 * LandingFeatures - Bento Grid layout showcasing the 5 core features of CubeSolver 3D:
 * 1. 3D Real-time WebGL Canvas
 * 2. Kociemba Optimal Engine (~20 moves)
 * 3. Layer-by-Layer Pedagogical Tutorial
 * 4. Color Calibration & Parity Checking
 * 5. 100% Client-Side Offline Execution
 */
export default function LandingFeatures({ t }) {
  const tr = (key, fallback) => {
    if (typeof t === 'function') {
      const val = t(key);
      if (val && val !== key) return val;
    }
    return fallback;
  };

  return (
    <section id="features" className="relative w-full bg-[#F5EFEB] border-b-[2.5px] border-black py-16 sm:py-24 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#24C789] border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
            <Sparkles className="w-4 h-4 text-black fill-black" />
            <span className="font-mono text-xs font-bold uppercase text-black">
              {tr('features.badge', 'Fitur Utama')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black font-sans mb-4">
            {tr('features.title', 'Teknologi Canggih untuk Pembelajar & Speedcuber')}
          </h2>

          <p className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed">
            {tr(
              'features.subtitle',
              'Dari simulasi grafis Three.js berkecepatan tinggi hingga teori grup matematika, dirancang khusus untuk pembelajaran visual dan pemecahan instan.'
            )}
          </p>
        </div>

        {/* Bento Grid: 5 Neubrutalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1: 3D Real-Time Canvas (Span 2) */}
          <div className="md:col-span-2 brutal-card p-6 sm:p-8 bg-white flex flex-col justify-between relative overflow-hidden group">
            {/* Corner Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-[#2563EB] text-white border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#F5EFEB] border border-black shadow-[1.5px_1.5px_0px_#000] text-black">
                {tr('features.canvas3d.tag', 'Three.js • OrbitControls • 60 FPS')}
              </span>
            </div>

            <div className="mb-6 z-10">
              <h3 className="text-2xl font-black text-black mb-2.5 font-sans">
                {tr('features.canvas3d.title', '3D Real-Time WebGL Canvas')}
              </h3>
              <p className="text-zinc-700 text-sm sm:text-base leading-relaxed max-w-xl">
                {tr(
                  'features.canvas3d.desc',
                  'Simulasi 3D presisi dengan pencahayaan studio netral, bayangan kontak lembut (contact shadow), animasi putaran irisan halus, serta raycasting untuk memilih dan mewarnai stiker langsung.'
                )}
              </p>
            </div>

            {/* Interactive Decorative Visual: Miniature 3x3 Rubik Matrix */}
            <div className="mt-4 pt-4 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-3 gap-1 p-2 bg-[#F5EFEB] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="w-4 h-4 bg-white border border-black"></div>
                  <div className="w-4 h-4 bg-[#FFE600] border border-black"></div>
                  <div className="w-4 h-4 bg-[#FF5252] border border-black"></div>
                  <div className="w-4 h-4 bg-[#24C789] border border-black"></div>
                  <div className="w-4 h-4 bg-[#2563EB] border border-black"></div>
                  <div className="w-4 h-4 bg-[#FF8A00] border border-black"></div>
                  <div className="w-4 h-4 bg-white border border-black"></div>
                  <div className="w-4 h-4 bg-[#24C789] border border-black"></div>
                  <div className="w-4 h-4 bg-[#FFE600] border border-black"></div>
                </div>
                <div className="font-mono text-xs text-zinc-600">
                  <span className="font-bold text-black block">54 Facelets Model</span>
                  <span>Smooth Raycaster Hover</span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-zinc-600">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#24C789]" /> Orbit Damping
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#24C789]" /> Touch Support
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2: Kociemba Optimal Engine (Span 1) */}
          <div className="md:col-span-1 brutal-card p-6 sm:p-8 bg-white flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-[#FFE600] text-black border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-black" />
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#FFE600] border border-black shadow-[1.5px_1.5px_0px_#000] text-black">
                  ~20 Moves
                </span>
              </div>

              <h3 className="text-2xl font-black text-black mb-2.5 font-sans">
                {tr('features.kociemba.title', 'Mesin Optimal Kociemba')}
              </h3>
              <p className="text-zinc-700 text-sm leading-relaxed mb-4">
                {tr(
                  'features.kociemba.desc',
                  'Algoritma Dua Fase berbasis teori grup matematika menyelesaikan konfigurasi acak apa pun dalam rata-rata ~20 langkah (God\'s Number tier) dalam waktu <20ms.'
                )}
              </p>
            </div>

            <div className="pt-4 border-t-2 border-black/10 font-mono text-xs text-zinc-600 flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span>Phase 1 (G0 &rarr; G1)</span>
                <span className="font-bold text-black">&lt; 12 moves</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Phase 2 (G1 &rarr; Solved)</span>
                <span className="font-bold text-black">&lt; 10 moves</span>
              </div>
            </div>
          </div>

          {/* CARD 3: Layer-by-Layer Tutorial (Span 1) */}
          <div className="md:col-span-1 brutal-card p-6 sm:p-8 bg-white flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-[#24C789] text-black border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-black" />
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#F5EFEB] border border-black shadow-[1.5px_1.5px_0px_#000] text-black">
                  7 Phases
                </span>
              </div>

              <h3 className="text-2xl font-black text-black mb-2.5 font-sans">
                {tr('features.lbl.title', 'Tutorial Layer-by-Layer')}
              </h3>
              <p className="text-zinc-700 text-sm leading-relaxed mb-4">
                {tr(
                  'features.lbl.desc',
                  'Metode pemula yang ramah dipelajari manusia. Memandu pemecahan kubus lapis demi lapis dengan penjelasan logika dan tips rumus di setiap langkahnya.'
                )}
              </p>
            </div>

            <div className="pt-4 border-t-2 border-black/10 flex items-center gap-1.5 font-mono text-xs text-zinc-600 flex-wrap">
              <span className="px-1.5 py-0.5 bg-[#F5EFEB] border border-black">White Cross</span>
              <span className="px-1.5 py-0.5 bg-[#F5EFEB] border border-black">F2L Corners</span>
              <span className="px-1.5 py-0.5 bg-[#F5EFEB] border border-black">Sune</span>
            </div>
          </div>

          {/* CARD 4: Color Calibration & Parity Checking (Span 2) */}
          <div className="md:col-span-2 brutal-card p-6 sm:p-8 bg-white flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-[#FF5252] text-white border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#F5EFEB] border border-black shadow-[1.5px_1.5px_0px_#000] text-black">
                {tr('features.calibration.tag', 'Jaring Datar 2D • Deteksi Paritas')}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-black mb-2.5 font-sans">
                {tr('features.calibration.title', 'Studio Kalibrasi & Pemeriksa Paritas')}
              </h3>
              <p className="text-zinc-700 text-sm sm:text-base leading-relaxed max-w-xl">
                {tr(
                  'features.calibration.desc',
                  'Punya kubus fisik yang ingin dipecahkan? Warnai kubus Anda melalui jaring 2D atau kanvas 3D. Engine kami otomatis mendiagnosis kondisi mustahil (edge terbalik atau corner terputar) sebelum memproses solusi.'
                )}
              </p>
            </div>

            {/* Mini Unfolded Net Visual Representation */}
            <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between flex-wrap gap-4 font-mono text-xs text-zinc-700">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#FF5252]" />
                <span className="font-bold text-black">Physical Parity Engine:</span>
                <span>Edge Flips, Corner Twists, Permutation Parity</span>
              </div>
              <span className="bg-[#24C789]/20 text-emerald-800 font-bold px-2 py-0.5 border border-black">
                Validasi Otomatis
              </span>
            </div>
          </div>

          {/* CARD 5: 100% Client-Side Offline (Span 3 - Full Width) */}
          <div className="md:col-span-3 brutal-card p-6 sm:p-8 bg-[#FFE600] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center shrink-0">
                <WifiOff className="w-7 h-7 text-black" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold uppercase bg-black text-white px-2 py-0.5">
                    ZERO TELEMETRY
                  </span>
                  <span className="font-mono text-xs font-bold text-black">
                    {tr('features.offline.tag', 'PWA Ready • Zero Latency')}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-black font-sans">
                  {tr('features.offline.title', '100% Client-Side & Bekerja Tanpa Internet')}
                </h3>
                <p className="text-zinc-900 text-sm sm:text-base font-medium mt-1 max-w-3xl">
                  {tr(
                    'features.offline.desc',
                    'Semua kalkulasi dilakukan lokal di CPU browser Anda menggunakan WebGL Three.js dan JavaScript murni. Tanpa request server lambat, tanpa iklan, dan privasi terjamin.'
                  )}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
              <div className="bg-white border-2 border-black px-3 py-1 font-mono font-bold text-xs text-black shadow-[2px_2px_0px_#000]">
                LATENCY: 0 ms
              </div>
              <div className="bg-white border-2 border-black px-3 py-1 font-mono font-bold text-xs text-black shadow-[2px_2px_0px_#000]">
                STORAGE: LOCAL
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
