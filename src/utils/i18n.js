/**
 * Internationalization (i18n) dictionary and helper for CubeSolver 3D.
 * Supports English (en) and Bahasa Indonesia (id).
 * Zero external dependencies.
 */

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'EN' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: 'ID' },
];

export const translations = {
  en: {
    header: {
      title: 'CubeSolver 3D',
      subtitle: 'Interactive 3D Rubik\'s Cube Solver & Tutorial',
      optimalTooltip: 'Solves in ~20 moves using Two-Phase Algorithm',
      optimalMode: 'Optimal (~20 Moves)',
      optimalShort: 'Optimal',
      beginnerTooltip: 'Step-by-step Layer-by-Layer Tutorial',
      beginnerMode: 'Beginner (LBL)',
      beginnerShort: 'Beginner',
      toggleLang: 'Toggle Language (ID / EN)',
      unmute: 'Unmute Audio',
      mute: 'Mute Audio',
      shortcuts: 'Keyboard Shortcuts (? or K)',
      tools: 'Tools',
      calibrate: 'Calibrate Cube',
      exitCalibrate: 'Done / Return',
      recenter: 'Recenter View',
      puzzle2x2: '2x2',
      puzzle3x3: '3x3',
      puzzle4x4: '4x4',
      puzzle5x5: '5x5',
      puzzleCustom: 'Custom ⚙',
      puzzleSize: 'Cube Size',
      puzzleGallery: 'Puzzle Gallery',
      puzzleGalleryTitle: 'WCA Puzzle Gallery & Catalog',
      timer: 'Timer',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',
    },
    timer: {
      wcaMode: 'WCA Timer',
      timeAttackMode: 'Time Attack',
      stats: 'Session Statistics',
      statsShort: 'Stats',
      duration: 'Target Duration',
      tapHint: 'Touch & Hold to Ready',
      holdSpace: 'Hold Space to Ready',
      getReady: 'Get Ready...',
      ready: 'READY! Release Space!',
      running: 'Running...',
      stopped: 'Solved! Hold Space to Restart',
      timeUp: "Time's Up!",
      startTap: 'Hold Pad / Space',
      stopTap: 'STOP',
      startAttack: 'Start Time Attack ⚡',
      pb: 'PB',
      ao5: 'Ao5',
      ao12: 'Ao12',
      count: 'Solves',
      historyTitle: 'Session Times History',
      clearConfirm: 'Are you sure you want to reset all timer history data?',
      clearHistory: 'Clear All',
      noSolvesYet: 'No times recorded yet. Solve the cube to log your time!',
    },
    gallery: {
      title: 'Puzzle Catalog & WCA Gallery',
      subtitle: 'Explore standard WCA cubes, shape mods, and custom NxN sandbox.',
      close: 'Close',
      all: 'All Puzzles',
      wcaNxN: 'WCA NxN',
      special: 'Shape Mods & Special',
      readyBadge: 'Ready to Play (3D Active)',
      roadmapBadge: 'Roadmap',
      readyToPlay: 'READY TO PLAY',
      roadmap: 'ROADMAP',
      selectDimension: 'Select Dimension',
      currentlyActive: 'Currently Active',
      playCustom: 'Play Custom ⚡',
      playNow: 'Play Now ⚡',
      inDevelopment: 'In WCA Roadmap',
      footerNote: '📐 Three.js 3D engine supports realtime rendering of all NxN cube sizes.',
    },
    app: {
      title: 'CubeSolver 3D',
      subtitle: 'Interactive 3D Rubik\'s Cube Solver & Tutorial',
      description: 'Explore, learn, and solve the Rubik\'s Cube in stunning interactive 3D. Choose between the super-fast Kociemba optimal algorithm or step-by-step beginner Layer-by-Layer tutorial.',
      tagline: 'Master the Cube in 3D',
      badge: '3D Interactive',
      author: 'Ruby',
      github: 'GitHub',
    },
    modes: {
      optimal: 'Optimal (Kociemba)',
      optimalShort: 'Optimal',
      optimalDesc: 'Solves in ~20 moves using Kociemba\'s two-phase algorithm. Shortest and most efficient solution path.',
      beginner: 'Beginner (Layer-by-Layer)',
      beginnerShort: 'Beginner (LBL)',
      beginnerDesc: 'Human-friendly step-by-step tutorial method explaining the logic of solving layer by layer.',
    },
    controls: {
      play: 'Play',
      pause: 'Pause',
      stepNext: 'Next Step',
      stepPrev: 'Previous Step',
      firstStep: 'First Step',
      lastStep: 'Last Step',
      speed: 'Speed',
      reset: 'Reset Cube',
      scramble: 'Scramble',
      solve: 'Solve Cube',
      solving: 'Solving...',
      paintMode: 'Paint Mode',
      paintModeDesc: 'Click stickers on the cube to customize colors',
      viewMode: 'View Mode',
      viewModeDesc: 'Rotate, inspect, and examine the 3D cube',
      clear: 'Clear',
      autoPlay: 'Auto Play',
      stop: 'Stop',
      soundOn: 'Sound On',
      soundOff: 'Mute Sound',
      shortcuts: 'Keyboard Shortcuts',
      help: 'Help',
      exportState: 'Export State',
      importState: 'Import State',
      copySolution: 'Copy Solution',
      copied: 'Copied to Clipboard!',
      fullscreen: 'Toggle Fullscreen',
      recenter: 'Recenter View',
      paintModeActive: 'Paint Mode: ON',
      manualTurns: 'Face Turns',
      instant: 'Instant',
      moves: 'moves',
      movesOptimal: 'OPTIMAL',
      movesBeginner: 'BEGINNER',
    },
    calibration: {
      title: 'Calibration Studio',
      subtitle: 'Customize facelets, inspect 2D unfolded net, and verify parity.',
      done: 'Done / Return',
      swatches: 'Color Swatches',
      diagnostics: 'Parity & Physical Diagnostics',
      quickActions: 'Quick Actions',
      valid: 'Configuration is physically valid and ready to solve.',
      invalid: 'Configuration is incomplete or contains parity errors.',
      faceletCount: 'Stickers',
      unpainted: 'Unpainted',
    },
    netView: {
      title: '2D Flat Net',
      hint: 'Click any sticker to apply selected color',
    },
    playback: {
      noSolution: 'No active solution. Click "Solve Cube" or scramble to begin.',
    },
    colors: {
      white: 'White',
      yellow: 'Yellow',
      green: 'Green',
      blue: 'Blue',
      red: 'Red',
      orange: 'Orange',
    },
    faces: {
      U: 'Up (White)',
      D: 'Down (Yellow)',
      F: 'Front (Green)',
      B: 'Back (Blue)',
      L: 'Left (Orange)',
      R: 'Right (Red)',
      up: 'Up',
      down: 'Down',
      front: 'Front',
      back: 'Back',
      left: 'Left',
      right: 'Right',
    },
    beginnerPhases: {
      whiteCross: {
        title: 'White Cross',
        desc: 'Form a cross on the white face while matching each edge\'s side color with its neighboring center.',
        tip: 'Daisy method: place 4 white edges around the yellow center first, match their side colors to adjacent centers, then rotate 180° (F2) into the white face.',
      },
      firstLayerCorners: {
        title: 'First Layer Corners',
        desc: 'Insert all four white corner pieces into their correct positions to complete the entire first white layer.',
        tip: 'Place the target corner directly underneath its destination slot, then repeat the algorithm R\' D\' R D until the corner is correctly slotted and oriented.',
      },
      middleLayer: {
        title: 'Middle Layer (Second Layer)',
        desc: 'Insert the four second-layer edge pieces into their correct slots without disturbing the solved white layer.',
        tip: 'Locate a top-layer edge without yellow. Align it with its matching front center, then perform the Left or Right edge insertion algorithm.',
      },
      yellowCross: {
        title: 'Yellow Cross',
        desc: 'Form a yellow cross on the top face without messing up the first two solved layers.',
        tip: 'Observe the top yellow pattern: Dot → 90° \'L\' Angle → Horizontal Line → Cross. Apply F R U R\' U\' F\' at each stage.',
      },
      orientYellow: {
        title: 'Orient Yellow Edges',
        desc: 'Align the side stickers of the yellow cross edges with their corresponding center colors.',
        tip: 'Find two matching adjacent edges, position one at the back and one on the right, then perform the Sune algorithm: R U R\' U R U2 R\'.',
      },
      permuteCorners: {
        title: 'Permute Yellow Corners',
        desc: 'Move yellow corner pieces to their correct physical positions (corner orientation may still be twisted).',
        tip: 'Find a corner already in the correct physical spot. Keep it in the top-front-right position and execute: U R U\' L\' U R\' U\' L.',
      },
      solve: {
        title: 'Orient Corners (Final Solve)',
        desc: 'Twist all remaining yellow corners so their yellow stickers point upward, completing the entire cube!',
        tip: 'Hold the cube firmly in place. Repeat R\' D\' R D on the front-right corner until yellow faces up, then turn ONLY the top layer (U or U\') to bring the next corner forward.',
      },
      whiteCorners: {
        title: 'First Layer Corners',
        desc: 'Insert all four white corner pieces into their correct positions to complete the entire first white layer.',
        tip: 'Place the target corner directly underneath its destination slot, then repeat the algorithm R\' D\' R D until the corner is correctly slotted and oriented.',
      },
      yellowEdges: {
        title: 'Orient Yellow Edges',
        desc: 'Align the side stickers of the yellow cross edges with their corresponding center colors.',
        tip: 'Find two matching adjacent edges, position one at the back and one on the right, then perform the Sune algorithm: R U R\' U R U2 R\'.',
      },
      yellowCorners: {
        title: 'Permute Yellow Corners',
        desc: 'Move yellow corner pieces to their correct physical positions (corner orientation may still be twisted).',
        tip: 'Find a corner already in the correct physical spot. Keep it in the top-front-right position and execute: U R U\' L\' U R\' U\' L.',
      },
      orientYellowCorners: {
        title: 'Orient Corners (Final Solve)',
        desc: 'Twist all remaining yellow corners so their yellow stickers point upward, completing the entire cube!',
        tip: 'Hold the cube firmly in place. Repeat R\' D\' R D on the front-right corner until yellow faces up, then turn ONLY the top layer (U or U\') to bring the next corner forward.',
      },
    },
    validation: {
      valid: 'Cube configuration is valid!',
      readyToSolve: 'Ready to solve',
      missingStickers: 'Missing stickers: {x}',
      centerCanonical: 'Center stickers must remain canonical (White top, Green front, etc.)',
      solved: 'Cube is solved!',
      invalidConfig: 'Invalid configuration',
      colorCountMismatch: 'Color count mismatch: each of the 6 colors must have exactly 9 stickers.',
      parityError: 'Parity error detected: impossible physical cube configuration.',
      edgeParityError: 'Single flipped edge detected (impossible without disassembly).',
      cornerParityError: 'Single twisted corner detected (impossible without disassembly).',
      permutationParityError: 'Impossible permutation parity: two pieces swapped.',
      noSolutionNeeded: 'Cube is already solved! No moves needed.',
      invalidMove: 'Invalid move notation: {move}',
      paintingInstructions: 'Click any sticker to apply the selected color. Center stickers cannot be modified to ensure standard orientation.',
      unsolvable: 'The current cube configuration cannot be solved. Please check your sticker colors.',
      unpaintedStickers: '{count} stickers unpainted. Select a color to fill.',
      blankCount: '{count} unpainted',
    },
    shortcuts: {
      title: 'Keyboard Shortcuts',
      space: 'Play / Pause playback',
      stepNextPrev: 'Next / Previous step (Left / Right Arrow)',
      speedUpDown: 'Increase / decrease speed (Up / Down Arrow)',
      turnsClockwise: 'Turn face clockwise (R, U, F, L, D, B)',
      turnsCounter: 'Turn face counter-clockwise (Shift + R, U, F, L, D, B)',
      scramble: 'Scramble cube (S)',
      solve: 'Solve cube (Enter)',
      paint: 'Toggle Paint Mode (P)',
      view: 'Toggle View Mode (V)',
      reset: 'Reset cube to solved (C or Esc)',
      mute: 'Toggle sound mute (M)',
      help: 'Toggle this shortcuts modal (?)',
      close: 'Close',
    },
    ui: {
      moves: 'Moves',
      step: 'Step {current} of {total}',
      currentStep: 'Current Step',
      totalSteps: 'Total Steps',
      phase: 'Phase {current} of {total}',
      speedValue: '{speed}x',
      time: 'Time',
      algorithm: 'Algorithm',
      solution: 'Solution',
      solutionLength: '{count} moves',
      cameraControls: 'Left-Click Drag to Orbit • Right-Click Drag to Pan • Scroll to Zoom',
      selectColor: 'Select Paint Color',
      customPalette: 'Palette',
      fillFace: 'Fill Face',
      resetToSolved: 'Reset to Solved',
      language: 'Language',
      sound: 'Sound',
      soundActive: 'Audio Enabled',
      soundMuted: 'Audio Muted',
      viewAngles: 'Camera Angle',
      viewTop: 'Top View',
      viewBottom: 'Bottom View',
      viewFront: 'Front View',
      viewIsometric: 'Isometric',
      statusSolved: 'Solved',
      statusScrambled: 'Scrambled',
      statusSolving: 'Solving',
      statusReady: 'Ready',
      statusCustom: 'Custom Painted',
      legend: 'Move Notation Legend',
      legendClockwise: 'Clockwise 90°',
      legendCounter: '\' = Counter-clockwise 90°',
      legendDouble: '2 = 180° Half turn',
      summary: 'Summary',
      solutionFound: 'Solution found in {moves} moves!',
      noMoves: 'No moves recorded yet. Scramble or rotate the cube to begin.',
    },
    nav: {
      brand: 'CubeSolver 3D',
      brandSubtitle: 'Tactile 3D Solver',
      features: 'Features',
      algorithms: 'Algorithms',
      notation: 'Notation',
      faq: 'FAQ',
      launchStudio: 'Open Studio ⚡',
      openStudio: 'Open Studio ⚡',
      enterStudio: 'Enter Studio ⚡',
      toggleLang: 'ID / EN',
      home: 'Home',
    },
    hero: {
      badge: '100% Client-Side 3D Solver',
      badgeInteractive: 'Interactive 3D Stage',
      title: 'Master the Rubik\'s Cube with',
      titleHighlight: 'Tactile 3D Intelligence',
      subtitle: 'Solve any Rubik\'s Cube in ~20 moves with Kociemba\'s Two-Phase optimal engine or learn human-friendly logic with Layer-by-Layer visual guide.',
      ctaPrimary: 'Open Studio Solver ⚡',
      ctaSecondary: 'Explore Features ↓',
      statMoves: '~20 Moves Optimal',
      statSpeed: '< 20ms Calculation',
      statOffline: '100% Offline & Private',
      hint: 'Drag to rotate 3D preview • Scroll to zoom',
    },
    features: {
      badge: 'Engine Capabilities',
      title: 'Built for Speed, Accuracy, and Learning',
      subtitle: 'Tactile retro design meets cutting-edge algorithmic computing on modern paper surfaces.',
      canvas3d: {
        title: '3D Real-Time Canvas',
        desc: 'Interactive Three.js viewport with tactile sticker textures, realistic rotations, orbit camera, and fluid face animations.',
        tag: 'Interactive 3D',
      },
      kociemba: {
        title: 'Kociemba Optimal Engine',
        desc: 'Calculates mathematically optimal solutions in ~20 moves in under 20ms using Herbert Kociemba\'s Two-Phase algorithm.',
        tag: '~20 Moves',
      },
      lbl: {
        title: 'Layer-by-Layer Tutorial',
        desc: 'Pedagogical 7-phase beginner method explaining White Cross, F2L corners, middle layer, yellow cross, and corner orientation.',
        tag: '7 Phases',
      },
      calibration: {
        title: 'Color Calibration & Parity',
        desc: 'Custom paint physical cubes with 2D unfolded nets, live sticker counting, and mathematical parity validation before solving.',
        tag: 'Parity Safe',
      },
      offline: {
        title: '100% Client-Side & Offline',
        desc: 'Zero backend latency, zero telemetry, fully offline capable with snappy mechanical feedback and retro sound effects.',
        tag: 'Zero Latency',
      },
    },
    algorithms: {
      badge: 'Algorithmic Comparison',
      title: 'Two Engines. One Perfect Cube.',
      subtitle: 'Choose between maximum algorithmic efficiency or human-friendly pedagogical step-by-step logic.',
      kociemba: {
        name: 'Kociemba Two-Phase',
        tag: 'Optimal / Speed',
        moves: '~20 Moves (God\'s Number range)',
        speed: '< 20 ms',
        theory: 'Searches coset spaces of subgroup G1 to bring cube to <U,D,R2,L2,F2,B2>, then solves in Phase 2. Guaranteed near-minimal moves.',
        idealFor: 'Speedcubers, minimal move records, optimal demonstration',
        cta: 'Try Optimal Mode ⚡',
      },
      lbl: {
        name: 'Beginner Layer-by-Layer (LBL)',
        tag: 'Pedagogical / Human',
        moves: '~80 - 120 Moves',
        speed: '< 5 ms',
        theory: 'Breaks the puzzle into 7 digestible milestones with human-memorable algorithms like Daisy, Sexy Move, and Sune.',
        idealFor: 'Learners, students, understanding 3D spatial permutation',
        cta: 'Try Beginner Mode ⚡',
      },
      table: {
        title: 'Technical Comparison Matrix',
        metric: 'Evaluation Metric',
        moves: 'Average Moves',
        speed: 'Compute Time',
        mentalComplexity: 'Human Memorability',
        phases: 'Algorithmic Structure',
        target: 'Target Audience',
        pedagogy: 'Physical Learning Value',
      },
    },
    notation: {
      badge: 'WCA Standard',
      title: 'Official Move Notation Cheatsheet',
      subtitle: 'Master standard World Cube Association notation with tactile visual feedback.',
      hint: 'Capital letter = 90° clockwise. Apostrophe (\') = 90° counter-clockwise. Number 2 = 180° half turn.',
      clockwise: 'Clockwise 90°',
      counterClockwise: 'Counter-Clockwise 90° (\')',
      doubleTurn: 'Half Turn 180° (2)',
    },
    faq: {
      badge: 'Common Questions',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about CubeSolver 3D, algorithms, and parity validation.',
      q1: 'What is the Two-Phase Kociemba algorithm?',
      a1: 'Developed by Herbert Kociemba in 1992, the Two-Phase algorithm finds near-optimal solutions (around 20 moves) in milliseconds by reducing the cube to a subgroup where only double turns of F, B, L, and R are needed before finishing.',
      q2: 'Can I solve my real, physical Rubik\'s cube with this app?',
      a2: 'Yes! Click "Calibrate" in Studio Mode to enter the 2D unfolded net view. You can paint each sticker to match your real cube. The app automatically checks for valid color counts and physical parity before solving.',
      q3: 'What happens if my cube has an impossible color combination?',
      a3: 'Our diagnostic engine checks for parity errors like single twisted corners, single flipped edges, or odd permutation swaps that are physically impossible without disassembling the cube, highlighting the exact issue.',
      q4: 'Does this app work offline?',
      a4: 'Yes, 100%! All 3D rendering and solving computations run locally in your browser. No server calls, no APIs, and no internet connection required once loaded.',
      q5: 'How does the Beginner (LBL) method differ from Optimal?',
      a5: 'Optimal finds the fewest possible moves (~20) which is great for speed, but impossible for humans to memorize. The Beginner method uses 7 intuitive phases (White Cross, Corners, Middle Layer, etc.) that any human can understand and memorize.',
      q6: 'Is this app secure and usable offline without internet?',
      a6: '100% secure and offline! All solving computations and Three.js 3D rendering execute locally on your device with zero external telemetry or server dependency.',
    },
    footer: {
      tagline: 'Interactive 3D Rubik\'s Cube Solver & Educational Studio',
      desc: 'Built with React 19, Three.js, and Neubrutalism design principles. Free and open source.',
      quickLinks: 'Quick Links',
      cta: 'Launch Studio ⚡',
      ctaTitle: 'Ready to Solve Your Cube Now?',
      ctaSubtitle: 'Enter the full 3D studio with interactive controls, scramble, and instant solver.',
      copyright: '© 2026 CubeSolver 3D. All rights reserved.',
      builtWith: 'Engineered by',
    },
  },

  id: {
    header: {
      title: 'CubeSolver 3D',
      subtitle: 'Pemecah & Tutorial Rubik 3D Interaktif',
      optimalTooltip: 'Selesai dalam ~20 langkah dengan Algoritma Dua Fase Kociemba',
      optimalMode: 'Optimal (~20 Langkah)',
      optimalShort: 'Optimal',
      beginnerTooltip: 'Tutorial Langkah-demi-Langkah Lapis-demi-Lapis',
      beginnerMode: 'Pemula (LBL)',
      beginnerShort: 'Pemula',
      toggleLang: 'Ganti Bahasa (ID / EN)',
      unmute: 'Nyalakan Suara',
      mute: 'Bisukan Suara',
      shortcuts: 'Pintasan Keyboard (? atau K)',
      tools: 'Alat',
      calibrate: 'Kalibrasi Kubus',
      exitCalibrate: 'Selesai / Kembali',
      recenter: 'Tengahkan Tampilan',
      puzzle2x2: '2x2',
      puzzle3x3: '3x3',
      puzzle4x4: '4x4',
      puzzle5x5: '5x5',
      puzzleCustom: 'Kustom ⚙',
      puzzleSize: 'Ukuran Kubus',
      puzzleGallery: 'Galeri Puzzle',
      puzzleGalleryTitle: 'Galeri & Katalog Puzzle WCA',
      timer: 'Timer',
      themeLight: 'Mode Terang',
      themeDark: 'Mode Gelap',
    },
    timer: {
      wcaMode: 'WCA Timer',
      timeAttackMode: 'Time Attack',
      stats: 'Statistik Sesi',
      statsShort: 'Stats',
      duration: 'Target Durasi',
      tapHint: 'Sentuh & Tahan untuk Bersiap',
      holdSpace: 'Tahan Spasi untuk Siap',
      getReady: 'Bersiap...',
      ready: 'SIAP! Lepas Spasi!',
      running: 'Waktu Berjalan...',
      stopped: 'Selesai! Tahan Spasi untuk Mulai Lagi',
      timeUp: 'Waktu Habis!',
      startTap: 'Tahan Pad / Spasi',
      stopTap: 'BERHENTI (Stop)',
      startAttack: 'Mulai Time Attack ⚡',
      pb: 'PB',
      ao5: 'Ao5',
      ao12: 'Ao12',
      count: 'Solves',
      historyTitle: 'Riwayat Waktu Sesi',
      clearConfirm: 'Yakin ingin mereset seluruh data riwayat timer?',
      clearHistory: 'Hapus Semua',
      noSolvesYet: 'Belum ada waktu tercatat. Selesaikan kubus untuk mencatat waktu!',
    },
    gallery: {
      title: 'Katalog Puzzle & Galeri WCA',
      subtitle: 'Jelajahi berbagai jenis twisty puzzle dari ukuran standar WCA hingga varian bentuk kustom.',
      close: 'Tutup',
      all: 'Semua Puzzle',
      wcaNxN: 'WCA NxN',
      special: 'Shape Mods & Khusus',
      readyBadge: 'Siap Main (3D Active)',
      roadmapBadge: 'Roadmap',
      readyToPlay: 'SIAP MAIN',
      roadmap: 'ROADMAP',
      selectDimension: 'Pilih Dimensi',
      currentlyActive: 'Sedang Aktif',
      playCustom: 'Mainkan Kustom ⚡',
      playNow: 'Mainkan Sekarang ⚡',
      inDevelopment: 'Dalam Roadmap WCA',
      footerNote: '📐 Engine 3D Three.js mendukung render realtime seluruh ukuran kubus NxN.',
    },
    app: {
      title: 'CubeSolver 3D',
      subtitle: 'Pemecah & Tutorial Rubik 3D Interaktif',
      description: 'Jelajahi, pelajari, dan selesaikan Kubus Rubik dalam tampilan 3D yang memukau. Pilih antara algoritma optimal Kociemba super cepat atau tutorial langkah demi langkah pemula (Layer-by-Layer).',
      tagline: 'Kuasai Kubus Rubik dalam 3D',
      badge: '3D Interaktif',
      author: 'Ruby',
      github: 'GitHub',
    },
    modes: {
      optimal: 'Optimal (Kociemba)',
      optimalShort: 'Optimal',
      optimalDesc: 'Menyelesaikan dalam ~20 langkah menggunakan algoritma dua fase Kociemba. Rute tersingkat dan paling efisien.',
      beginner: 'Pemula (Layer-by-Layer)',
      beginnerShort: 'Pemula (LBL)',
      beginnerDesc: 'Metode tutorial ramah pemula yang mengajarkan logika penyelesaian lapis demi lapis.',
    },
    controls: {
      play: 'Putar',
      pause: 'Jeda',
      stepNext: 'Langkah Berikutnya',
      stepPrev: 'Langkah Sebelumnya',
      firstStep: 'Langkah Pertama',
      lastStep: 'Langkah Terakhir',
      speed: 'Kecepatan',
      reset: 'Reset Kubus',
      scramble: 'Acak',
      solve: 'Selesaikan Kubus',
      solving: 'Menyelesaikan...',
      paintMode: 'Mode Cat',
      paintModeDesc: 'Klik stiker pada kubus untuk menyesuaikan warna',
      viewMode: 'Mode Lihat',
      viewModeDesc: 'Putar, periksa, dan telusuri kubus 3D',
      clear: 'Bersihkan',
      autoPlay: 'Putar Otomatis',
      stop: 'Berhenti',
      soundOn: 'Suara Nyala',
      soundOff: 'Bisukan Suara',
      shortcuts: 'Pintasan Keyboard',
      help: 'Bantuan',
      exportState: 'Ekspor Status',
      importState: 'Impor Status',
      copySolution: 'Salin Solusi',
      copied: 'Tersalin ke Clipboard!',
      fullscreen: 'Layar Penuh',
      recenter: 'Tengahkan Tampilan',
      paintModeActive: 'Mode Cat: AKTIF',
      manualTurns: 'Putaran Sisi',
      instant: 'Instan',
      moves: 'gerakan',
      movesOptimal: 'OPTIMAL',
      movesBeginner: 'PEMULA',
    },
    calibration: {
      title: 'Studio Kalibrasi',
      subtitle: 'Sesuaikan stiker, periksa jaring 2D, dan verifikasi paritas.',
      done: 'Selesai / Kembali',
      swatches: 'Pilihan Warna',
      diagnostics: 'Diagnostik Paritas & Fisik',
      quickActions: 'Aksi Cepat',
      valid: 'Konfigurasi fisik valid dan siap diselesaikan.',
      invalid: 'Konfigurasi belum lengkap atau terdapat kesalahan paritas.',
      faceletCount: 'Stiker',
      unpainted: 'Belum Diwarnai',
    },
    netView: {
      title: 'Jaring-jaring 2D',
      hint: 'Klik stiker apa pun untuk menerapkan warna pilihan',
    },
    playback: {
      noSolution: 'Belum ada solusi aktif. Klik "Selesaikan Kubus" atau acak untuk memulai.',
    },
    colors: {
      white: 'Putih',
      yellow: 'Kuning',
      green: 'Hijau',
      blue: 'Biru',
      red: 'Merah',
      orange: 'Oranye',
    },
    faces: {
      U: 'Atas (Putih)',
      D: 'Bawah (Kuning)',
      F: 'Depan (Hijau)',
      B: 'Belakang (Biru)',
      L: 'Kiri (Oranye)',
      R: 'Kanan (Merah)',
      up: 'Atas',
      down: 'Bawah',
      front: 'Depan',
      back: 'Belakang',
      left: 'Kiri',
      right: 'Kanan',
    },
    beginnerPhases: {
      whiteCross: {
        title: 'Palang Putih (White Cross)',
        desc: 'Bentuk tanda tambah (palang) pada sisi putih sekaligus mencocokkan warna sisi tepi (edge) dengan pusat di sebelahnya.',
        tip: 'Metode bunga daisy: kumpulkan 4 tepi putih di sekitar pusat kuning terlebih dahulu, cocokkan warna samping ke pusat, lalu putar 180° (F2) ke sisi putih.',
      },
      firstLayerCorners: {
        title: 'Sudut Lapisan Pertama',
        desc: 'Masukkan keempat bidak sudut putih ke posisi yang tepat untuk menyelesaikan seluruh lapisan pertama secara utuh.',
        tip: 'Posisikan sudut target tepat di bawah slot tujuannya, lalu ulangi algoritma R\' D\' R D hingga sudut masuk sempurna dan terarah benar.',
      },
      middleLayer: {
        title: 'Lapisan Tengah (Lapisan Kedua)',
        desc: 'Tempatkan keempat bidak tepi lapisan tengah ke slot yang tepat tanpa mengacaukan lapisan putih di bawah yang sudah selesai.',
        tip: 'Cari bidak tepi di lapisan atas yang tidak memiliki warna kuning. Sejajarkan dengan pusat depan yang cocok, lalu jalankan algoritma geser Kiri atau Kanan.',
      },
      yellowCross: {
        title: 'Palang Kuning (Yellow Cross)',
        desc: 'Bentuk palang kuning di lapisan atas tanpa merusak dua lapisan bawah yang sudah selesai.',
        tip: 'Perhatikan pola kuning di atas: Titik → Sudut 90° \'L\' → Garis Horizontal → Palang. Terapkan rumus F R U R\' U\' F\' pada setiap tahap.',
      },
      orientYellow: {
        title: 'Orientasikan & Samakan Tepi Kuning',
        desc: 'Sejajarkan stiker samping dari keempat tepi palang kuning dengan warna pusat yang sesuai di sekelilingnya.',
        tip: 'Cari dua tepi bersebelahan yang cocok, posisikan satu di belakang dan satu di kanan, lalu terapkan rumus Sune: R U R\' U R U2 R\'.',
      },
      permuteCorners: {
        title: 'Posisikan Sudut Kuning',
        desc: 'Pindahkan bidak-bidak sudut kuning ke lokasi fisik yang benar (arah stiker boleh belum pas).',
        tip: 'Cari satu sudut yang sudah berada di lokasi yang tepat. Tahan di sudut depan-kanan-atas, lalu gunakan: U R U\' L\' U R\' U\' L.',
      },
      solve: {
        title: 'Orientasikan Sudut (Penyelesaian Akhir)',
        desc: 'Putar orientasi sudut kuning yang tersisa agar stiker kuning menghadap ke atas, menyelesaikan kubus secara sempurna!',
        tip: 'Pegang kubus secara stabil tanpa memutar seluruh kubus. Ulangi R\' D\' R D pada sudut depan-kanan hingga kuning menghadap atas, lalu putar HANYA lapisan atas (U / U\') untuk membawa sudut berikutnya.',
      },
      whiteCorners: {
        title: 'Sudut Lapisan Pertama',
        desc: 'Masukkan keempat bidak sudut putih ke posisi yang tepat untuk menyelesaikan seluruh lapisan pertama secara utuh.',
        tip: 'Posisikan sudut target tepat di bawah slot tujuannya, lalu ulangi algoritma R\' D\' R D hingga sudut masuk sempurna dan terarah benar.',
      },
      yellowEdges: {
        title: 'Orientasikan & Samakan Tepi Kuning',
        desc: 'Sejajarkan stiker samping dari keempat tepi palang kuning dengan warna pusat yang sesuai di sekelilingnya.',
        tip: 'Cari dua tepi bersebelahan yang cocok, posisikan satu di belakang dan satu di kanan, lalu terapkan rumus Sune: R U R\' U R U2 R\'.',
      },
      yellowCorners: {
        title: 'Posisikan Sudut Kuning',
        desc: 'Pindahkan bidak-bidak sudut kuning ke lokasi fisik yang benar (arah stiker boleh belum pas).',
        tip: 'Cari satu sudut yang sudah berada di lokasi yang tepat. Tahan di sudut depan-kanan-atas, lalu gunakan: U R U\' L\' U R\' U\' L.',
      },
      orientYellowCorners: {
        title: 'Orientasikan Sudut (Penyelesaian Akhir)',
        desc: 'Putar orientasi sudut kuning yang tersisa agar stiker kuning menghadap ke atas, menyelesaikan kubus secara sempurna!',
        tip: 'Pegang kubus secara stabil tanpa memutar seluruh kubus. Ulangi R\' D\' R D pada sudut depan-kanan hingga kuning menghadap atas, lalu putar HANYA lapisan atas (U / U\') untuk membawa sudut berikutnya.',
      },
    },
    validation: {
      valid: 'Konfigurasi kubus valid!',
      readyToSolve: 'Siap untuk diselesaikan',
      missingStickers: 'Stiker kurang: {x}',
      centerCanonical: 'Stiker pusat harus tetap kanonikal (Putih atas, Hijau depan, dll.)',
      solved: 'Kubus sudah terpecahkan!',
      invalidConfig: 'Konfigurasi tidak valid',
      colorCountMismatch: 'Jumlah warna tidak sesuai: setiap warna dari 6 warna harus berjumlah tepat 9 stiker.',
      parityError: 'Terdeteksi kesalahan paritas: konfigurasi fisik kubus tidak mungkin diselesaikan.',
      edgeParityError: 'Terdeteksi satu edge terbalik (kondisi fisik mustahil tanpa membongkar kubus).',
      cornerParityError: 'Terdeteksi satu sudut terputar (kondisi fisik mustahil tanpa membongkar kubus).',
      permutationParityError: 'Paritas permutasi mustahil: ada dua bidak tertukar ganjil.',
      noSolutionNeeded: 'Kubus sudah terpecahkan! Tidak memerlukan langkah penyelesaian.',
      invalidMove: 'Notasi gerakan tidak valid: {move}',
      paintingInstructions: 'Klik stiker apa pun untuk menerapkan warna yang dipilih. Stiker pusat tidak dapat diubah agar orientasi standar tetap terjaga.',
      unsolvable: 'Konfigurasi kubus saat ini tidak dapat diselesaikan. Harap periksa warna stiker Anda.',
      unpaintedStickers: '{count} stiker belum diwarnai. Silakan pilih warna untuk melengkapi.',
      blankCount: '{count} belum diwarnai',
    },
    shortcuts: {
      title: 'Pintasan Keyboard',
      space: 'Putar / Jeda pemutaran',
      stepNextPrev: 'Langkah berikutnya / sebelumnya (Panah Kanan / Kiri)',
      speedUpDown: 'Tambah / kurangi kecepatan (Panah Atas / Bawah)',
      turnsClockwise: 'Putar sisi searah jarum jam (R, U, F, L, D, B)',
      turnsCounter: 'Putar sisi berlawanan arah jarum jam (Shift + R, U, F, L, D, B)',
      scramble: 'Acak kubus (S)',
      solve: 'Selesaikan kubus (Enter)',
      paint: 'Beralih Mode Cat (P)',
      view: 'Beralih Mode Lihat (V)',
      reset: 'Kembalikan kubus ke kondisi selesai (C atau Esc)',
      mute: 'Beralih suara senyap (M)',
      help: 'Buka pintasan keyboard (?)',
      close: 'Tutup',
    },
    ui: {
      moves: 'Langkah',
      step: 'Langkah {current} dari {total}',
      currentStep: 'Langkah Saat Ini',
      totalSteps: 'Total Langkah',
      phase: 'Fase {current} dari {total}',
      speedValue: '{speed}x',
      time: 'Waktu',
      algorithm: 'Algoritma',
      solution: 'Solusi',
      solutionLength: '{count} langkah',
      cameraControls: 'Klik Kiri Tarik: Orbit • Klik Kanan Tarik: Geser • Scroll: Zoom',
      selectColor: 'Pilih Warna Cat',
      customPalette: 'Palet Warna',
      fillFace: 'Isi Seluruh Sisi',
      resetToSolved: 'Reset ke Selesai',
      language: 'Bahasa',
      sound: 'Suara',
      soundActive: 'Suara Aktif',
      soundMuted: 'Suara Dibisukan',
      viewAngles: 'Sudut Kamera',
      viewTop: 'Tampak Atas',
      viewBottom: 'Tampak Bawah',
      viewFront: 'Tampak Depan',
      viewIsometric: 'Isometrik',
      statusSolved: 'Selesai',
      statusScrambled: 'Teracak',
      statusSolving: 'Menyelesaikan',
      statusReady: 'Siap',
      statusCustom: 'Kustom Dicat',
      legend: 'Panduan Notasi Gerakan',
      legendClockwise: 'Searah jarum jam 90°',
      legendCounter: '\' = Berlawanan jarum jam 90°',
      legendDouble: '2 = Putaran setengah 180°',
      summary: 'Ringkasan',
      solutionFound: 'Solusi ditemukan dalam {moves} langkah!',
      noMoves: 'Belum ada langkah yang dicatat. Acak atau putar kubus untuk memulai.',
    },
    nav: {
      brand: 'CubeSolver 3D',
      brandSubtitle: 'Solver 3D Taktil',
      features: 'Fitur',
      algorithms: 'Algoritma',
      notation: 'Notasi',
      faq: 'Tanya Jawab',
      launchStudio: 'Buka Studio ⚡',
      openStudio: 'Buka Studio ⚡',
      enterStudio: 'Buka Studio ⚡',
      toggleLang: 'ID / EN',
      home: 'Beranda',
    },
    hero: {
      badge: 'Solver 3D 100% Sisi Klien',
      badgeInteractive: 'Panggung 3D Interaktif',
      title: 'Kuasai Kubus Rubik dengan',
      titleHighlight: 'Kecerdasan 3D Taktil',
      subtitle: 'Pecahkan kubus Rubik apa pun dalam ~20 langkah dengan mesin optimal Dua Fase Kociemba atau pelajari logika manusiawi dengan panduan visual Layer-by-Layer.',
      ctaPrimary: 'Buka Studio Solver ⚡',
      ctaSecondary: 'Pelajari Fitur ↓',
      statMoves: '~20 Langkah Optimal',
      statSpeed: '< 20ms Kalkulasi',
      statOffline: '100% Offline & Privat',
      hint: 'Tarik untuk memutar preview 3D • Scroll untuk zoom',
    },
    features: {
      badge: 'Kemampuan Mesin',
      title: 'Dirancang untuk Kecepatan, Presisi, dan Pembelajaran',
      subtitle: 'Desain retro taktil berpadu dengan komputasi algoritma mutakhir di atas permukaan kertas modern.',
      canvas3d: {
        title: 'Kanvas 3D Real-Time',
        desc: 'Viewport Three.js interaktif dengan tekstur stiker taktil, rotasi realistis, kamera orbit, dan animasi putaran halus.',
        tag: '3D Interaktif',
      },
      kociemba: {
        title: 'Mesin Optimal Kociemba',
        desc: 'Menghitung solusi optimal matematis dalam ~20 langkah dalam waktu kurang dari 20ms memakai Algoritma Dua Fase Kociemba.',
        tag: '~20 Langkah',
      },
      lbl: {
        title: 'Tutorial Layer-by-Layer (LBL)',
        desc: 'Metode pemula pedagogis 7 fase yang menjelaskan Palang Putih, sudut F2L, lapisan tengah, palang kuning, hingga orientasi akhir.',
        tag: '7 Fase',
      },
      calibration: {
        title: 'Kalibrasi Warna & Paritas',
        desc: 'Kustomisasi warna kubus nyata dengan jaring 2D terbentang, penghitung stiker real-time, dan validasi paritas matematis.',
        tag: 'Bebas Masalah Paritas',
      },
      offline: {
        title: '100% Sisi Klien & Offline',
        desc: 'Nol latensi backend, tanpa telemetri, beroperasi penuh secara offline dengan efek suara tombol mekanikal yang responsif.',
        tag: 'Nol Latensi',
      },
    },
    algorithms: {
      badge: 'Perbandingan Algoritma',
      title: 'Dua Mesin. Satu Kubus Sempurna.',
      subtitle: 'Pilih antara efisiensi algoritma maksimal atau logika pedagogis yang ramah pemula langkah demi langkah.',
      kociemba: {
        name: 'Dua Fase Kociemba',
        tag: 'Optimal / Cepat',
        moves: '~20 Langkah (Mendekati Angka Dewa)',
        speed: '< 20 ms',
        theory: 'Mencari ruang koset subgrup G1 untuk membawa kubus ke <U,D,R2,L2,F2,B2>, lalu menyelesaikan di Fase 2. Menjamin jumlah langkah minimal.',
        idealFor: 'Speedcuber, rekor langkah minimal, demonstrasi optimal',
        cta: 'Coba Mode Optimal ⚡',
      },
      lbl: {
        name: 'Layer-by-Layer Pemula (LBL)',
        tag: 'Pedagogis / Manusiawi',
        moves: '~80 - 120 Langkah',
        speed: '< 5 ms',
        theory: 'Membagi teka-teki menjadi 7 tonggak capaian yang mudah dipahami dengan rumus yang mudah diingat seperti Daisy dan Sune.',
        idealFor: 'Pelajar, pemula, memahami permutasi spasial 3D',
        cta: 'Coba Mode Pemula ⚡',
      },
      table: {
        title: 'Matriks Perbandingan Teknis',
        metric: 'Metrik Evaluasi',
        moves: 'Rata-rata Langkah',
        speed: 'Kecepatan Komputasi',
        mentalComplexity: 'Dapat Dihafal Manusia?',
        phases: 'Struktur Logika',
        target: 'Target Pengguna',
        pedagogy: 'Nilai Edukasi Fisik',
      },
    },
    notation: {
      badge: 'Standar WCA',
      title: 'Lembar Panduan Notasi Gerakan Resmi',
      subtitle: 'Kuasai notasi resmi World Cube Association dengan umpan balik visual taktil.',
      hint: 'Huruf kapital = 90° searah jarum jam. Tanda kutip (\') = 90° berlawanan arah jarum jam. Angka 2 = 180° putaran setengah.',
      clockwise: 'Searah jarum jam 90°',
      counterClockwise: 'Berlawanan jarum jam 90° (\')',
      doubleTurn: 'Putaran Setengah 180° (2)',
    },
    faq: {
      badge: 'Pertanyaan Umum',
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Semua yang perlu Anda ketahui tentang CubeSolver 3D, algoritma, dan validasi paritas.',
      q1: 'Apa itu Algoritma Dua Fase Kociemba?',
      a1: 'Dikembangkan oleh Herbert Kociemba pada tahun 1992, algoritma Dua Fase menemukan solusi mendekati optimal (sekitar 20 langkah) dalam hitungan milidetik dengan membagi penyelesaian menjadi dua fase reduksi subgrup matematis.',
      q2: 'Bisakah saya memecahkan kubus fisik nyata saya dengan aplikasi ini?',
      a2: 'Ya! Klik "Kalibrasi" di Studio Mode untuk membuka tampilan jaring 2D terbentang. Anda dapat mewarnai stiker sesuai kubus fisik Anda. Aplikasi otomatis memeriksa jumlah stiker dan validasi paritas sebelum menyelesaikan.',
      q3: 'Bagaimana jika kubus saya memiliki kombinasi warna yang tidak valid?',
      a3: 'Mesin diagnostik kami memeriksa kesalahan paritas seperti sudut terputar tunggal, edge terbalik ganjil, atau permutasi mustahil yang hanya bisa terjadi jika kubus pernah dibongkar pasang.',
      q4: 'Apakah aplikasi ini bisa bekerja secara offline?',
      a4: 'Ya, 100%! Seluruh rendering 3D dan kalkulasi pemecahan berjalan secara lokal di peramban Anda tanpa memerlukan panggilan server atau internet setelah dimuat.',
      q5: 'Apa perbedaan metode Pemula (LBL) dengan Optimal?',
      a5: 'Metode Optimal mencari langkah tersedikit (~20) yang sempurna untuk kecepatan mesin namun sulit dihafal manusia. Metode Pemula menggunakan 7 tahap intuitif (Palang Putih, Sudut, Lapisan Tengah, dll.) yang dirancang untuk mudah dipelajari manusia.',
      q6: 'Apakah aplikasi ini aman dan dapat digunakan secara offline tanpa internet?',
      a6: 'Sangat aman! Seluruh pemrosesan algoritma solver dan simulasi 3D Three.js dieksekusi secara lokal (100% client-side) di perangkat Anda tanpa request server luar.',
    },
    footer: {
      tagline: 'Pemecah & Studio Edukasi Kubus Rubik 3D Interaktif',
      desc: 'Dibuat dengan React 19, Three.js, dan prinsip desain Neubrutalism. Gratis dan sumber terbuka.',
      quickLinks: 'Tautan Cepat',
      cta: 'Buka Studio ⚡',
      ctaTitle: 'Siap Menyelesaikan Kubus Anda Sekarang?',
      ctaSubtitle: 'Masuki studio 3D lengkap dengan kontrol interaktif, acak, dan pemecah instan.',
      copyright: '© 2026 CubeSolver 3D. Hak cipta dilindungi.',
      builtWith: 'Dirancang oleh',
    },
  },
};

// Mirror landing namespace for nested lookups (e.g. landing.hero.title)
translations.en.landing = {
  nav: translations.en.nav,
  hero: translations.en.hero,
  features: translations.en.features,
  algorithms: translations.en.algorithms,
  notation: translations.en.notation,
  faq: translations.en.faq,
  footer: translations.en.footer,
};

translations.id.landing = {
  nav: translations.id.nav,
  hero: translations.id.hero,
  features: translations.id.features,
  algorithms: translations.id.algorithms,
  notation: translations.id.notation,
  faq: translations.id.faq,
  footer: translations.id.footer,
};

// Aliases mapping flat keys to deep translation paths
const flatKeyAliases = {
  // App
  title: 'app.title',
  subtitle: 'app.subtitle',
  description: 'app.description',

  // Controls
  play: 'controls.play',
  pause: 'controls.pause',
  stepNext: 'controls.stepNext',
  stepPrev: 'controls.stepPrev',
  firstStep: 'controls.firstStep',
  lastStep: 'controls.lastStep',
  speed: 'controls.speed',
  reset: 'controls.reset',
  scramble: 'controls.scramble',
  solve: 'controls.solve',
  paintMode: 'controls.paintMode',
  viewMode: 'controls.viewMode',
  clear: 'controls.clear',

  // Colors
  White: 'colors.white',
  Yellow: 'colors.yellow',
  Green: 'colors.green',
  Blue: 'colors.blue',
  Red: 'colors.red',
  Orange: 'colors.orange',
  white: 'colors.white',
  yellow: 'colors.yellow',
  green: 'colors.green',
  blue: 'colors.blue',
  red: 'colors.red',
  orange: 'colors.orange',

  // Faces
  U: 'faces.U',
  D: 'faces.D',
  F: 'faces.F',
  B: 'faces.B',
  L: 'faces.L',
  R: 'faces.R',

  // Modes
  optimal: 'modes.optimal',
  beginner: 'modes.beginner',

  // Beginner phases
  whiteCross: 'beginnerPhases.whiteCross.title',
  firstLayerCorners: 'beginnerPhases.firstLayerCorners.title',
  middleLayer: 'beginnerPhases.middleLayer.title',
  yellowCross: 'beginnerPhases.yellowCross.title',
  orientYellow: 'beginnerPhases.orientYellow.title',
  permuteCorners: 'beginnerPhases.permuteCorners.title',
  finalSolve: 'beginnerPhases.solve.title',
};

/**
 * Helper to retrieve a nested property by dot path (e.g. 'app.title').
 * @param {object} obj
 * @param {string} path
 * @returns {any}
 */
function getByPath(obj, path) {
  if (!obj || !path) return undefined;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

/**
 * Translate a key into the specified language with optional parameter interpolation.
 * Falls back to English if the translation is missing in the target language.
 *
 * @param {string} key - The dot-separated translation key (e.g. 'controls.play') or alias (e.g. 'play').
 * @param {string} [lang='en'] - Language code ('en' or 'id').
 * @param {Record<string, any>} [params={}] - Key-value map for placeholder interpolation like {x} or {count}.
 * @returns {string} The translated string with parameters interpolated.
 */
export function t(key, lang = 'en', params = {}) {
  if (!key) return '';

  const activeLang = translations[lang] ? lang : 'en';
  const resolvedKey = flatKeyAliases[key] || key;

  // 1. Try finding in requested language
  let val = getByPath(translations[activeLang], resolvedKey);

  // 2. Fallback to English if missing
  if (val === undefined && activeLang !== 'en') {
    val = getByPath(translations.en, resolvedKey);
  }

  // 3. Fallback to direct key if not found in dictionary
  if (val === undefined) {
    val = key;
  }

  // If the result is an object (e.g. a phase object with title/desc), return it directly
  if (typeof val === 'object' && val !== null) {
    return val;
  }

  // String parameter replacement: {x}, {count}, {speed}, etc.
  if (typeof val === 'string' && params && typeof params === 'object') {
    return val.replace(/\{(\w+)\}/g, (match, paramName) => {
      if (Object.prototype.hasOwnProperty.call(params, paramName)) {
        return String(params[paramName]);
      }
      return match;
    });
  }

  return String(val);
}

/**
 * Get the user's preferred language from localStorage or navigator.
 * @returns {string} 'en' or 'id'
 */
export function getSavedLanguage() {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('cube_solver_lang');
      if (saved && translations[saved]) {
        return saved;
      }
      const navLang = navigator.language || navigator.userLanguage || '';
      if (navLang.toLowerCase().startsWith('id')) {
        return 'id';
      }
    } catch {
      // Ignore localStorage access errors
    }
  }
  return 'en';
}

/**
 * Save user language preference to localStorage.
 * @param {string} lang
 */
export function saveLanguage(lang) {
  if (typeof window !== 'undefined' && translations[lang]) {
    try {
      localStorage.setItem('cube_solver_lang', lang);
    } catch {
      // Ignore localStorage access errors
    }
  }
}

export default {
  languages,
  translations,
  t,
  getSavedLanguage,
  saveLanguage,
};
