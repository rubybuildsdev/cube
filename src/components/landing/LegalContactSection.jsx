import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Scale,
  Cpu,
  Database,
  Radio,
  Send
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * LegalContactSection - Neubrutalist Accordion/Tabbed Section
 * Provides:
 * 1. Privacy Policy (100% Client-Side WebGL, zero analytics/trackers, session data stored locally)
 * 2. Terms of Service & Trademarks (MIT License, Rubik's Cube trademark disclaimer)
 * 3. Contact & Feedback (Handled by Ruby, rubykln80@gmail.com, GitHub issue link)
 */
export default function LegalContactSection({ t }) {
  const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' | 'terms' | 'contact'
  const [copiedEmail, setCopiedEmail] = useState(false);

  const tr = (key, fallback) => {
    if (typeof t === 'function') {
      const val = t(key);
      if (val && val !== key) return val;
    }
    return fallback;
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('rubykln80@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="legal" className="relative w-full bg-[#FDFBF7] dark:bg-[#121212] border-b-[2.5px] border-black dark:border-zinc-800 py-16 sm:py-24 select-none transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2563EB] text-white border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span className="font-mono text-xs font-bold uppercase">
              {tr('legal.badge', 'Transparansi, Privasi & Kontak')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white font-sans mb-3">
            {tr('legal.title', 'Integritas, Lisensi & Kontak Langsung')}
          </h2>

          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
            {tr(
              'legal.subtitle',
              'Semua yang perlu Anda ketahui tentang privasi 100% lokal, lisensi sumber terbuka MIT, dan jalur komunikasi terbuka bersama pengembang.'
            )}
          </p>
        </div>

        {/* Tactile Neubrutalist Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`brutal-btn px-4 sm:px-5 py-2.5 text-xs sm:text-sm gap-2 transition-all ${
              activeTab === 'privacy'
                ? 'brutal-btn-yellow shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600]'
                : 'brutal-btn-white dark:bg-[#1E1E22] dark:text-zinc-300 dark:border-zinc-700 shadow-[2px_2px_0px_#000]'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{tr('legal.tabPrivacy', 'Kebijakan Privasi')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`brutal-btn px-4 sm:px-5 py-2.5 text-xs sm:text-sm gap-2 transition-all ${
              activeTab === 'terms'
                ? 'brutal-btn-yellow shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600]'
                : 'brutal-btn-white dark:bg-[#1E1E22] dark:text-zinc-300 dark:border-zinc-700 shadow-[2px_2px_0px_#000]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{tr('legal.tabTerms', 'Syarat Layanan & Lisensi')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`brutal-btn px-4 sm:px-5 py-2.5 text-xs sm:text-sm gap-2 transition-all ${
              activeTab === 'contact'
                ? 'brutal-btn-yellow shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#FFE600]'
                : 'brutal-btn-white dark:bg-[#1E1E22] dark:text-zinc-300 dark:border-zinc-700 shadow-[2px_2px_0px_#000]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>{tr('legal.tabContact', 'Kontak & Masukan')}</span>
          </button>
        </div>

        {/* Tab 1: Privacy Policy Panel */}
        {activeTab === 'privacy' && (
          <div className="brutal-card p-6 sm:p-8 bg-white dark:bg-[#1E1E22] transition-colors">
            {/* Header info */}
            <div className="flex items-center justify-between border-b-2 border-black dark:border-zinc-700 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#24C789] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white font-sans">
                    {tr('legal.privacyTitle', 'Kebijakan Privasi: 100% Client-Side')}
                  </h3>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    STATUS: ZERO TELEMETRY • CLIENT-SIDE PRIVACY GUARANTEE
                  </span>
                </div>
              </div>

              <span className="hidden sm:inline-block font-mono text-xs font-bold px-2.5 py-1 bg-[#F5EFEB] dark:bg-[#27272A] border border-black dark:border-zinc-700 text-black dark:text-white">
                VERSI 1.0
              </span>
            </div>

            {/* Privacy Feature Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-[#F5EFEB] dark:bg-[#27272A] border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 font-bold text-black dark:text-white mb-2 text-sm">
                  <Cpu className="w-4 h-4 text-[#2563EB]" />
                  <span>100% WebGL Lokal</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Seluruh render 3D Three.js dan algoritma Herbert Kociemba diproses langsung di CPU/GPU perangkat Anda tanpa perantara server.
                </p>
              </div>

              <div className="p-4 bg-[#F5EFEB] dark:bg-[#27272A] border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 font-bold text-black dark:text-white mb-2 text-sm">
                  <Radio className="w-4 h-4 text-[#FF5252]" />
                  <span>Tanpa Analitik & Pelacak</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Aplikasi ini bebas dari Google Analytics, cookies iklan pihak ketiga, pelacak piksel, atau telemetri pengguna dalam bentuk apa pun.
                </p>
              </div>

              <div className="p-4 bg-[#F5EFEB] dark:bg-[#27272A] border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 font-bold text-black dark:text-white mb-2 text-sm">
                  <Database className="w-4 h-4 text-[#FFE600]" />
                  <span>Penyimpanan Lokal Saja</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Preferensi bahasa, tema gelap/terang, suara, dan catatan waktu latihan speedcubing disimpan aman hanya di localStorage peramban Anda.
                </p>
              </div>
            </div>

            {/* Detailed text */}
            <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
              <p>
                <strong>CubeSolver 3D</strong> memprioritaskan privasi penuh sebagai standar utama. Tidak ada data masukan konfigurasi stiker kubus Anda, foto kalibrasi, maupun sesi penyelesaian yang dikirim atau disimpan di server eksternal mana pun.
              </p>
              <p>
                Aplikasi ini bekerja sepenuhnya secara <em>offline-capable</em>. Sekali halaman web selesai diunduh oleh peramban Anda, Anda dapat memutuskan koneksi internet dan tetap menikmati seluruh fitur pemecahan, simulasi 3D, dan tutorial tanpa kendala.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Terms of Service & Licensing Panel */}
        {activeTab === 'terms' && (
          <div className="brutal-card p-6 sm:p-8 bg-white dark:bg-[#1E1E22] transition-colors">
            {/* Header info */}
            <div className="flex items-center justify-between border-b-2 border-black dark:border-zinc-700 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
                  <Scale className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white font-sans">
                    {tr('legal.termsTitle', 'Syarat Layanan & Lisensi Terbuka')}
                  </h3>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    MIT LICENSE • TRADEMARK NOTICE • EDUCATIONAL USE
                  </span>
                </div>
              </div>

              <span className="hidden sm:inline-block font-mono text-xs font-bold px-2.5 py-1 bg-[#FFE600] border border-black shadow-[1.5px_1.5px_0px_#000] text-black">
                MIT PERMISSIVE
              </span>
            </div>

            {/* Content blocks */}
            <div className="space-y-5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
              
              {/* MIT License Box */}
              <div className="p-4 bg-[#F5EFEB] dark:bg-[#27272A] border-2 border-black dark:border-zinc-700 font-mono text-xs leading-relaxed shadow-[2px_2px_0px_#000]">
                <div className="font-bold text-black dark:text-white mb-2 uppercase text-xs tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-black dark:text-white" />
                  <span>Lisensi Perangkat Lunak Terbuka (MIT License)</span>
                </div>
                <p className="mb-2">
                  Copyright (c) 2026 Ruby (rubykln80@gmail.com).
                </p>
                <p>
                  Izin diberikan secara cuma-cuma kepada siapa saja yang memperoleh salinan perangkat lunak ini untuk menggunakannya tanpa batasan, termasuk hak untuk menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, dan/atau mendistribusikan salinan perangkat lunak, dengan syarat pemberitahuan hak cipta disertakan.
                </p>
              </div>

              {/* Trademark Disclaimer */}
              <div className="p-4 bg-[#FFFBEB] dark:bg-[#292524] border-2 border-[#F59E0B] text-zinc-900 dark:text-amber-100">
                <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2 text-[#B45309] dark:text-[#FBBF24]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pernyataan Merek Dagang (Trademark Disclaimer)</span>
                </h4>
                <p className="text-xs leading-relaxed">
                  "Rubik's", "Rubik's Cube", dan representasi visual teka-teki kubus putar 3x3 adalah merek dagang terdaftar milik <strong>Spin Master Toys UK Limited</strong>. CubeSolver 3D adalah proyek riset edukatif independen yang dikembangkan untuk pembelajaran algoritma matematika dan pemodelan grafis WebGL. Proyek ini tidak berafiliasi, disponsori, atau didukung secara resmi oleh Spin Master maupun Rubik's Brand Ltd.
                </p>
              </div>

              {/* Educational Disclaimer */}
              <div>
                <h4 className="font-bold text-black dark:text-white text-base mb-1">
                  Penggunaan Edukasi & Penafian Garansi
                </h4>
                <p>
                  Perangkat lunak ini disediakan "sebagaimana adanya" (<em>as is</em>) tanpa jaminan apa pun, baik tersurat maupun tersirat. Algoritma pemecahan kami diuji secara matematis menjamin solusi optimal, namun kami tidak bertanggung jawab atas kerusakan fisik kubus pengguna akibat manipulasi fisik yang keliru.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Contact & Feedback Panel */}
        {activeTab === 'contact' && (
          <div className="brutal-card p-6 sm:p-8 bg-white dark:bg-[#1E1E22] transition-colors">
            {/* Header info */}
            <div className="flex items-center justify-between border-b-2 border-black dark:border-zinc-700 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF5252] text-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white font-sans">
                    {tr('legal.contactTitle', 'Hubungi Pengembang & Berikan Masukan')}
                  </h3>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    MAINTAINER: RUBY • RUBYKLN80@GMAIL.COM • GITHUB ISSUES
                  </span>
                </div>
              </div>

              <span className="hidden sm:inline-block font-mono text-xs font-bold px-2.5 py-1 bg-[#24C789] border border-black shadow-[1.5px_1.5px_0px_#000] text-black">
                RESPON CEPAT
              </span>
            </div>

            {/* Developer Contact Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* Direct Email Card */}
              <div className="p-5 bg-[#F5EFEB] dark:bg-[#27272A] border-2 border-black dark:border-zinc-700 shadow-[3px_3px_0px_#000] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 font-bold text-black dark:text-white">
                    <Mail className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-base">Email Langsung (Direct Email)</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                    Punya pertanyaan, saran fitur baru, atau ingin berkolaborasi? Hubungi Ruby secara langsung melalui email.
                  </p>
                  <div className="bg-white dark:bg-[#18181B] border-2 border-black dark:border-zinc-600 p-2.5 font-mono text-xs font-bold text-black dark:text-zinc-100 flex items-center justify-between">
                    <span>rubykln80@gmail.com</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="ml-2 px-2 py-1 bg-[#FFE600] border border-black text-black hover:bg-yellow-400 text-[11px] font-bold flex items-center gap-1 shadow-[1px_1px_0px_#000]"
                      title="Salin alamat email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
                      <span>{copiedEmail ? 'Tersalin!' : 'Salin'}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <a
                    href="mailto:rubykln80@gmail.com?subject=CubeSolver%203D%20Feedback"
                    className="brutal-btn brutal-btn-yellow text-xs px-3.5 py-2 gap-1.5 w-full justify-center shadow-[2px_2px_0px_#000]"
                  >
                    <Send className="w-3.5 h-3.5 text-black" />
                    <span>Kirim Email Sekarang</span>
                  </a>
                </div>
              </div>

              {/* GitHub Issue Tracker Card */}
              <div className="p-5 bg-[#F5EFEB] dark:bg-[#27272A] border-2 border-black dark:border-zinc-700 shadow-[3px_3px_0px_#000] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 font-bold text-black dark:text-white">
                    <GithubIcon className="w-5 h-5 text-black dark:text-white" />
                    <span className="text-base">GitHub Issue Tracker</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                    Laporkan kutu (bug), usulkan algoritma solver baru, atau kirimkan kontribusi kode (pull request) melalui repositori terbuka kami.
                  </p>
                  <div className="bg-white dark:bg-[#18181B] border-2 border-black dark:border-zinc-600 p-2.5 font-mono text-xs font-bold text-black dark:text-zinc-100 flex items-center justify-between">
                    <span className="truncate">github.com/ruby/cube/issues</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-2" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <a
                    href="https://github.com/ruby/cube/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn brutal-btn-white dark:bg-[#18181B] dark:text-white text-xs px-3.5 py-2 gap-1.5 w-full justify-center shadow-[2px_2px_0px_#000]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Buka GitHub Issues</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Quick Feedback Guidelines */}
            <div className="p-4 bg-[#F5EFEB] dark:bg-[#27272A] border-2 border-black dark:border-zinc-700 font-mono text-xs text-zinc-700 dark:text-zinc-300">
              <div className="font-bold text-black dark:text-white mb-1">💡 Tips Mengirim Laporan Masalah:</div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Sertakan konfigurasi scramblenya atau pola langkah yang menyebabkan kendala.</li>
                <li>Sebutkan peramban (Chrome, Firefox, Safari, Edge) dan jenis perangkat yang Anda gunakan.</li>
                <li>Laporan paritas kubus yang tidak valid dapat langsung disertakan melalui tangkapan layar 2D net.</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
