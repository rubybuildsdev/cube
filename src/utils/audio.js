/**
 * Web Audio API Sound Synthesizer for CubeSolver 3D
 * Generates crisp mechanical turns, tactile clicks, gentle hovers,
 * and joyful celebratory victory fanfares with zero external audio assets.
 */

const STORAGE_KEY = 'cube_solver_muted';

let audioCtx = null;

// Initialize mute state safely with localStorage
let mutedState = false;
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      mutedState = saved === 'true';
    }
  } catch {
    mutedState = false;
  }
}

/**
 * Returns or creates the AudioContext instance safely.
 */
export function getAudioContext() {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

// Attach user gesture listeners to unlock AudioContext on first interaction
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  };

  ['pointerdown', 'keydown', 'touchstart', 'click'].forEach(evt => {
    window.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });
}

/**
 * Check if audio is currently muted.
 * @returns {boolean}
 */
export function isMuted() {
  return mutedState;
}

/**
 * Set mute state explicitly and persist to localStorage.
 * @param {boolean} val
 * @returns {boolean}
 */
export function setMuted(val) {
  mutedState = Boolean(val);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, String(mutedState));
    } catch {
      // Ignore localStorage errors (e.g. private browsing mode)
    }
  }
  return mutedState;
}

/**
 * Toggle mute state and persist to localStorage.
 * @returns {boolean} New muted state
 */
export function toggleMute() {
  return setMuted(!mutedState);
}

/**
 * Play realistic mechanical speedcube snap (magnetic snap + body cavity resonance)
 * Adapts duration and frequency based on playback speed.
 * @param {number} [speed=1] Playback speed multiplier (e.g. 0.5, 1, 2, 4)
 */
export function playTurnSound(speed = 1) {
  if (mutedState) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const safeSpeed = Math.max(0.5, Math.min(speed || 1, 4));
  const durationFactor = 1 / Math.sqrt(safeSpeed);
  // Natural pitch variation for mechanical realism
  const pitchVar = 0.95 + Math.random() * 0.10;

  // 1. High-frequency magnetic snap transient (noise burst with steep bandpass)
  const snapDuration = Math.min(0.016, 0.014 * durationFactor);
  const bufferSize = Math.floor(ctx.sampleRate * snapDuration);
  if (bufferSize > 0) {
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(3800 * pitchVar, now);
    noiseFilter.Q.setValueAtTime(2.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.24, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + snapDuration);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + snapDuration);
  }

  // 2. Damped ABS plastic body resonance (low-mid impulse)
  const bodyDuration = Math.min(0.026, 0.022 * durationFactor);
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220 * pitchVar, now);
  osc.frequency.exponentialRampToValueAtTime(90 * pitchVar, now + bodyDuration);

  oscGain.gain.setValueAtTime(0.18, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + bodyDuration);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + bodyDuration);
}

/**
 * Clean tactile micro-switch click (replacing sine sweep).
 */
export function playClickSound() {
  if (mutedState) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1800, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.008);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.010);
}

/**
 * Very gentle soft tick for button hovers.
 */
export function playHoverSound() {
  if (mutedState) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(950, now);

  gain.gain.setValueAtTime(0.025, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.014);
}

/**
 * Subtle dual-tone precision victory confirmation (replacing loud 1.15s fanfare).
 */
export function playVictorySound() {
  if (mutedState) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  // Damped dual-harmonic precision tone (880Hz & 1320Hz)
  [880, 1320].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = idx * 0.05;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + delay);

    gain.gain.setValueAtTime(0.0001, now + delay);
    gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + 0.13);
  });
}

/**
 * Playful quick mechanical sweep for scrambling.
 */
export function playScrambleSound() {
  if (mutedState) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

/**
 * Soft warning tone for invalid moves or invalid state.
 */
export function playErrorSound() {
  if (mutedState) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;

  [0, 0.09].forEach(offset => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now + offset);

    gain.gain.setValueAtTime(0.12, now + offset);
    gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + offset);
    osc.stop(now + offset + 0.08);
  });
}

export default {
  playTurnSound,
  playClickSound,
  playHoverSound,
  playVictorySound,
  playScrambleSound,
  playErrorSound,
  isMuted,
  setMuted,
  toggleMute,
  getAudioContext,
};
