# 🧊 CubeSolver 3D

<div align="center">

![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-r182-black?style=for-the-badge&logo=threedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-128%2B%20Passing-24C789?style=for-the-badge&logo=vitest&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-FFE600?style=for-the-badge&logo=open-source-initiative&logoColor=black)

**A high-performance, tactile retro 3D Rubik's Cube simulator, speedcubing workspace, and dual-engine solver built with React 19, Three.js WebGL, and Tailwind CSS v4.**

[Fitur Utama](#-fitur-utama--key-features) • [Panduan Notasi WCA](#-panduan-notasi-wca--wca-notation-guide) • [Pintasan Keyboard](#-pintasan-keyboard--keyboard-shortcuts) • [Memulai](#-memulai--getting-started) • [Lisensi](#-lisensi--license)

</div>

---

## 📖 Ringkasan Proyek / Project Overview

### 🇮🇩 Bahasa Indonesia
**CubeSolver 3D** adalah platform simulasi, tutorial interaktif, dan pemecah Rubik 3D berbasis WebGL dengan estetika **Neubrutalism / Tactile Retro**. Dirancang dari nol untuk memberikan pengalaman bermain rubik yang memuaskan secara visual dan audio, CubeSolver 3D menggabungkan dua algoritma pemecahan tingkat industri:
1. **Herbert Kociemba Two-Phase Optimal Solver**: Algoritma matematis berkecepatan tinggi yang menghasilkan solusi optimal (~20 hingga 22 gerakan) dalam hitungan milidetik secara instan di browser.
2. **Beginner Layer-by-Layer (LBL) 7-Phase Pedagogical Tutorial**: Panduan belajar tahap demi tahap yang mudah dipahami bagi siapa saja yang ingin belajar menyelesaikan kubus rubik dari nol.

Aplikasi ini hadir dengan arsitektur dua tampilan (**Landing Page Edukatif** dan **Studio Solver Interaktif**), dukungan puzzle multi-ukuran (2x2 hingga 7x7 custom NxN), timer speedcubing ganda (WCA & Time Attack), serta pemeriksa paritas dan kalibrasi warna yang akurat—semuanya berjalan **100% Client-Side dan Offline** tanpa ketergantungan server atau analitik eksternal.

### 🇬🇧 English
**CubeSolver 3D** is a high-performance, browser-based WebGL Rubik's cube simulator, speedcubing trainer, and dual-algorithm solver platform wrapped in a tactile **Neubrutalism / Retro-Instrument** aesthetic. Designed for cubers, learners, and speedsolving enthusiasts, CubeSolver 3D brings together two complementary solving paradigms:
1. **Herbert Kociemba Two-Phase Optimal Engine**: A mathematical solver finding near-optimal solutions (~20-22 moves) in sub-20 milliseconds directly on the client thread.
2. **Beginner Layer-by-Layer (LBL) 7-Phase Tutorial**: A step-by-step educational guide designed to teach cubing logic progressively from White Cross to final corners.

Featuring a seamless **Two-View Architecture** (Educational Showcase Landing Page & Interactive Studio Workspace), multi-puzzle scaling (2x2, 3x3, 4x4, 5x5, and custom NxN), dual-mode speedcubing timer (WCA competition & Countdown Time Attack), physical sticker calibration with mathematical parity validation, and light/dark theme switches—running **100% offline and client-side** with zero tracking or backend requirements.

---

## ✨ Fitur Utama / Key Features

| Fitur | Deskripsi |
| :--- | :--- |
| 🎨 **Neubrutalism Tactile Retro Design** | Border hitam tebal (2.5px–3px), bayangan offset balok (`4px 4px 0 #000`), palet kertas hangat (`#FDFBF7`, `#F5EFEB`), dan respons tombol mekanikal yang nyata. Didukung efek audio prosedural Web Audio API (klik tactile, whoosh, clack, dan solved fanfare). |
| 🪟 **Two-View Architecture** | Transisi mulus antara **Landing Page Edukatif** (showcase interaktif, komparasi algoritma, galeri puzzle, WCA cheat sheet, FAQ) dan **Interactive Studio Solver** (workspace manipulasi kubus dan pemutaran solusi penuh). |
| 🧊 **Centered 3D WebGL Canvas** | Viewport Three.js terpusat dengan orbit controls, highlight stiker interaktif saat di-hover, animasi rotasi irisan (slice turn) halus, serta rendering material fisik berkualitas tinggi tanpa distorsi tampilan. |
| ⚡ **Kociemba Two-Phase Solver** | Algoritma pemecah optimal dua fase oleh Herbert Kociemba. Mampu memecahkan kubus teracak dalam **~20 hingga 22 gerakan** dengan waktu komputasi **< 20 milidetik** di sisi browser. |
| 📚 **Beginner LBL 7-Phase Tutorial** | Tutorial pemula 7 tahap berurutan: *White Cross → White Corners → Middle Layer → Yellow Cross → Orient Yellow Edges → Position Yellow Corners → Orient Yellow Corners*. Dilengkapi penjelasan bahasa manusia dan penanda fase visual. |
| ⏱️ **Dual-Mode Speedcubing Timer** | **Mode WCA**: Mekanisme tahan spasi (merah → hijau), inspeksi 15 detik opsional, auto-stop saat kubus terpecahkan, dan pencatatan statistik sesi (PB, Ao5, Ao12).<br>**Mode Time Attack**: Countdown waktu (30s / 60s / 120s) dengan efek audio ketukan ritmis. |
| 🧩 **Multi-Puzzle & Custom NxN** | Dukungan ukuran kubus 2x2 (Pocket Cube), 3x3 (Rubik's Cube), 4x4 (Revenge), 5x5 (Professor), dan slider dinamis custom NxN (2 hingga 7). Dilengkapi **Galeri Puzzle Modal** untuk puzzle klasik dan eksotik (Megaminx, Pyraminx, Skewb, Mirror Cube, Ghost Cube). |
| 🎯 **Color Calibration & Parity Checking** | Baki kalibrasi warna (Calibration Drawer) dengan net 2D datar, palet warna fisik (Putih, Kuning, Hijau, Biru, Merah, Jingga) dan validasi paritas fisik (mendeteksi *twisted corner*, *flipped edge*, *swap parity*, dan orientasi tengah yang ilegal). |
| 🌓 **Light & Dark Mode Switch** | Beralih instan antara Paper Canvas (`#FDFBF7`) dan Dark Brutalism (`#121212` / `#18181B`) dengan preferensi yang tersimpan secara lokal di `localStorage`. |
| 🔒 **100% Client-Side & Offline First** | Berjalan sepenuhnya di perangkat pengguna. Bebas pelacak (no analytics), bebas backend, tanpa pengiriman data pribadi, dan dapat dioperasikan secara penuh tanpa koneksi internet. |

---

## 🛠️ Tech Stack & Arsitektur

```
CubeSolver 3D
├── UI Layer           : React 19 (Hooks, Context, Concurrent Mode)
├── Styling & Design   : Tailwind CSS v4 (@theme tokens, Neubrutalist utilities)
├── 3D Engine          : Three.js (r182) + Custom Quaternion Slice Rotation Engine
├── Solvers            : CubeJS (Herbert Kociemba Two-Phase) & Custom Layer-by-Layer Engine
├── Sound Synthesis    : Procedural Web Audio API (Zero audio assets downloaded)
├── Icons              : Lucide React
├── Bundler            : Vite 6 (Lightning-fast HMR & ESM builds)
└── Testing            : Custom Unit & Integration Suites (State, Parity, 3D Bijection, i18n)
```

---

## 🧭 Panduan Notasi WCA / WCA Notation Guide

CubeSolver 3D menggunakan standar notasi internasional **World Cube Association (WCA)**:

| Notasi | Sisi (Face) | Arah Putaran | Deskripsi Gerakan |
| :---: | :---: | :---: | :--- |
| **U** | Up (Atas / Putih) | Searah Jarum Jam (90°) | Putar lapisan atas dari kanan ke kiri |
| **U'** | Up (Atas / Putih) | Berlawanan Jarum Jam (90°) | Putar lapisan atas dari kiri ke kanan (Prime) |
| **U2** | Up (Atas / Putih) | Setengah Putaran (180°) | Putar lapisan atas 180° |
| **D** | Down (Bawah / Kuning) | Searah Jarum Jam (90°) | Putar lapisan bawah dari kiri ke kanan |
| **D'** | Down (Bawah / Kuning) | Berlawanan Jarum Jam (90°) | Putar lapisan bawah dari kanan ke kiri (Prime) |
| **D2** | Down (Bawah / Kuning) | Setengah Putaran (180°) | Putar lapisan bawah 180° |
| **F** | Front (Depan / Hijau) | Searah Jarum Jam (90°) | Putar sisi depan searah jarum jam (seperti setir mobil ke kanan) |
| **F'** | Front (Depan / Hijau) | Berlawanan Jarum Jam (90°) | Putar sisi depan berlawanan jarum jam (seperti setir mobil ke kiri) |
| **F2** | Front (Depan / Hijau) | Setengah Putaran (180°) | Putar sisi depan 180° |
| **B** | Back (Belakang / Biru) | Searah Jarum Jam (90°) | Putar sisi belakang searah jarum jam |
| **B'** | Back (Belakang / Biru) | Berlawanan Jarum Jam (90°) | Putar sisi belakang berlawanan jarum jam |
| **B2** | Back (Belakang / Biru) | Setengah Putaran (180°) | Putar sisi belakang 180° |
| **L** | Left (Kiri / Jingga) | Searah Jarum Jam (90°) | Putar sisi kiri ke bawah / mendekat ke Anda |
| **L'** | Left (Kiri / Jingga) | Berlawanan Jarum Jam (90°) | Putar sisi kiri ke atas / menjauhi Anda |
| **L2** | Left (Kiri / Jingga) | Setengah Putaran (180°) | Putar sisi kiri 180° |
| **R** | Right (Kanan / Merah) | Searah Jarum Jam (90°) | Putar sisi kanan ke atas / menjauhi Anda |
| **R'** | Right (Kanan / Merah) | Berlawanan Jarum Jam (90°) | Putar sisi kanan ke bawah / mendekat ke Anda |
| **R2** | Right (Kanan / Merah) | Setengah Putaran (180°) | Putar sisi kanan 180° |

---

## ⌨️ Pintasan Keyboard / Keyboard Shortcuts

Kendalikan kubus 3D dan pemutar solusi langsung dari keyboard Anda:

### 🎮 Kontrol Pemutaran & Solusi (Playback & Solving)
| Tombol (Key) | Fungsi |
| :---: | :--- |
| <kbd>Space</kbd> | Putar / Jeda playback solusi *(atau tahan untuk mulai Timer di mode Speedcubing)* |
| <kbd>←</kbd> | Langkah mundur satu gerakan (Previous Step) |
| <kbd>→</kbd> | Langkah maju satu gerakan (Next Step) |
| <kbd>Enter</kbd> | Eksekusi pemecahan kubus (Solve Cube) |

### 🛠️ Aksi Interaktif (Interactive Actions)
| Tombol (Key) | Fungsi |
| :---: | :--- |
| <kbd>S</kbd> | Buat acakan acak 20 gerakan standar WCA (Random Scramble) |
| <kbd>P</kbd> | Buka / tutup laci kalibrasi stiker warna (Paint Mode) |
| <kbd>M</kbd> | Matikan / nyalakan efek suara (Audio Mute Toggle) |
| <kbd>C</kbd> | Reset kubus ke kondisi awal terpecahkan (Reset Solved) |
| <kbd>?</kbd> | Buka / tutup panduan pintasan keyboard ini (Help / Shortcuts) |

### 🔄 Pemutaran Sisi Kubus 3D (Face Rotations)
| Tombol (Key) | Fungsi |
| :---: | :--- |
| <kbd>U</kbd>, <kbd>D</kbd>, <kbd>L</kbd>, <kbd>R</kbd>, <kbd>F</kbd>, <kbd>B</kbd> | Putar sisi terkait sebesar 90° searah jarum jam (Clockwise) |
| <kbd>Shift</kbd> + <kbd>U</kbd>, <kbd>D</kbd>, <kbd>L</kbd>, <kbd>R</kbd>, <kbd>F</kbd>, <kbd>B</kbd> | Putar sisi terkait sebesar 90° berlawanan arah jarum jam (Prime `'`) |

---

## 🚀 Memulai / Getting Started

### Prasyarat (Prerequisites)
Pastikan komputer Anda telah terinstal:
- [Node.js](https://nodejs.org/) versi 18.0.0 atau yang lebih baru.
- Manajer paket `npm` (disertakan bersama Node.js).

### Instalasi & Menjalankan Aplikasi

1. **Clone repositori**:
   ```bash
   git clone https://github.com/rubykln/cubesolver-3d.git
   cd cubesolver-3d
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka browser Anda di `http://localhost:5173`.

4. **Kompilasi build produksi**:
   ```bash
   npm run build
   ```

5. **Pratinjau build produksi**:
   ```bash
   npm run preview
   ```

---

## 🧪 Pengujian / Test Suite

CubeSolver 3D dilengkapi pengujian otomatis yang memvalidasi kondisi kubus, algoritma pemecah, pemetaan bijeksi 3D, dan integritas translasi:

```bash
# Menjalankan seluruh rangkaian tes (i18n, solver logic, 3D bijection)
npm run test

# Menjalankan tes logika pemecah (Kociemba, LBL, Paritas, Scramble)
npm run test:solver

# Menjalankan tes visual & koordinat 3D Three.js
npm run test:3d

# Menjalankan audit kelengkapan kamus i18n
npm run test:i18n
```

---

## 📁 Struktur Direktori / Directory Layout

```
cube/
├── public/                 # Aset statis web
├── scripts/
│   ├── audit-i18n.js       # Validasi kelengkapan kamus bahasa (ID & EN)
│   ├── test-solver.js      # Pengujian unit Kociemba, LBL, paritas, dan scramble
│   └── test-3d.mjs         # Pengujian bijeksi stiker Three.js & model rotasi 3D
├── src/
│   ├── components/
│   │   ├── 3d/             # Komponen WebGL Three.js (CubeCanvas, RubiksCubeModel)
│   │   ├── landing/        # Komponen Landing Page (Hero, Features, Algorithms, FAQ, dll)
│   │   └── ui/             # Komponen Studio Mode (Header, PlaybackBar, TimerHUD, dll)
│   ├── solver/             # Algoritma (Kociemba, Beginner LBL, CubeState, Scrambler)
│   ├── utils/              # Audio synthesizer, sistem translasi i18n
│   ├── App.jsx             # Root controller (state management, view switcher)
│   ├── index.css           # Konfigurasi Tailwind CSS v4 & token Neubrutalism
│   └── main.jsx            # Entry point React 19
├── index.html              # Template HTML utama
├── package.json            # Konfigurasi proyek & dependensi
├── vite.config.js          # Konfigurasi bundler Vite
└── README.md               # Dokumentasi lengkap proyek
```

---

## 👤 Pembuat / Author

**Ruby**
- Email: [rubykln80@gmail.com](mailto:rubykln80@gmail.com)
- GitHub: [@rubykln](https://github.com/rubykln)

---

## 📄 Lisensi / License

Proyek ini dilisensikan di bawah lisensi **MIT License** — Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode ini untuk keperluan pribadi maupun komersial.

*Disclaimer: Rubik's Cube® adalah merek dagang terdaftar milik Spin Master Toys UK Limited. Proyek ini merupakan aplikasi edukasi independen tanpa afiliasi resmi dengan pemilik merek.*
