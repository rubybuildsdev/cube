import assert from 'node:assert/strict';
import { createSolvedState, validateCubeState, applyMove } from '../src/solver/cubeState.js';

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (err) {
    console.error(`FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. validateCubeState errorKey mapping
test('validateCubeState returns isValid: true for solved state', () => {
  const res = validateCubeState(createSolvedState());
  assert.equal(res.isValid, true);
});

test('validateCubeState returns invalid_format for malformed input', () => {
  const res = validateCubeState('not-a-valid-cube');
  assert.equal(res.isValid, false);
  assert.equal(res.errorKey, 'invalid_format');
});

test('validateCubeState returns unpainted_stickers when X is present', () => {
  const state = createSolvedState();
  state.U[0] = 'X';
  const res = validateCubeState(state);
  assert.equal(res.isValid, false);
  assert.equal(res.errorKey, 'unpainted_stickers');
  assert.equal(res.blankCount, 1);
});

test('validateCubeState returns invalid_color for unknown color', () => {
  const state = createSolvedState();
  state.U[0] = 'Z';
  const res = validateCubeState(state);
  assert.equal(res.isValid, false);
  assert.equal(res.errorKey, 'invalid_color');
});

test('validateCubeState returns invalid_color_count when counts != 9', () => {
  const state = createSolvedState();
  state.U[0] = 'R';
  const res = validateCubeState(state);
  assert.equal(res.isValid, false);
  assert.equal(res.errorKey, 'invalid_color_count');
});

test('validateCubeState returns corner_twist_error for twisted corner', () => {
  const state = createSolvedState();
  // Twist URF corner (U[8], R[0], F[2])
  const u8 = state.U[8];
  const r0 = state.R[0];
  const f2 = state.F[2];
  state.U[8] = f2;
  state.R[0] = u8;
  state.F[2] = r0;
  const res = validateCubeState(state);
  assert.equal(res.isValid, false);
  assert.equal(res.errorKey, 'corner_twist_error');
});

test('validateCubeState returns edge_flip_error for flipped edge', () => {
  const state = createSolvedState();
  // Flip UF edge (U[7], F[1])
  const tmp = state.U[7];
  state.U[7] = state.F[1];
  state.F[1] = tmp;
  const res = validateCubeState(state);
  assert.equal(res.isValid, false);
  assert.equal(res.errorKey, 'edge_flip_error');
});

test('validateCubeState returns parity_error for single edge swap', () => {
  const state = applyMove(createSolvedState(), 'R');
  // Swap UF (U[7], F[1]) and UL (U[3], L[1]) edges
  const u7 = state.U[7];
  const f1 = state.F[1];
  state.U[7] = state.U[3];
  state.F[1] = state.L[1];
  state.U[3] = u7;
  state.L[1] = f1;
  const res = validateCubeState(state);
  assert.equal(res.isValid, false);
  assert.equal(res.errorKey, 'parity_error');
});

// 2. Ao5 / Ao12 math (matching TimerHUD.jsx)
function calculateAo5(times) {
  if (!times || times.length < 5) return null;
  const last5 = times.slice(-5);
  const sorted = [...last5].sort((a, b) => a - b);
  const mid3 = sorted.slice(1, 4);
  const sum = mid3.reduce((acc, t) => acc + t, 0);
  return Math.round(sum / 3);
}

function calculateAo12(times) {
  if (!times || times.length < 12) return null;
  const last12 = times.slice(-12);
  const sorted = [...last12].sort((a, b) => a - b);
  const mid10 = sorted.slice(1, 11);
  const sum = mid10.reduce((acc, t) => acc + t, 0);
  return Math.round(sum / 10);
}

test('calculateAo5 returns null for < 5 times', () => {
  assert.equal(calculateAo5([1000, 2000, 3000, 4000]), null);
});

test('calculateAo5 drops best and worst and averages middle 3', () => {
  // [1000, 5000, 2000, 3000, 4000] -> sorted [1000, 2000, 3000, 4000, 5000] -> mid3 = 2000, 3000, 4000 -> avg = 3000
  assert.equal(calculateAo5([1000, 5000, 2000, 3000, 4000]), 3000);
});

test('calculateAo12 returns null for < 12 times', () => {
  assert.equal(calculateAo12(Array(11).fill(1000)), null);
});

test('calculateAo12 drops best and worst and averages middle 10', () => {
  const times = [500, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 9999];
  assert.equal(calculateAo12(times), 1000);
});

console.log(`test-hooks.mjs: ${passed} tests passed.`);
