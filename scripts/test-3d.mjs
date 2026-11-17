/**
 * Test Suite for 3D Rubik's Cube Engine
 */

import * as THREE from 'three';
import {
  CUBE_COLORS,
  INNER_PLASTIC_COLOR,
  HIGHLIGHT_COLOR,
  FACES,
  MOVE_SPECS,
  ALL_STICKERS,
  getSolvedCubeState,
  normalizeCubeState,
  cubeStateToString,
  getFaceAndIndex,
  getStickerCoords,
  applyMoveToState,
} from '../src/components/3d/cubeConstants.js';
import { RubiksCubeModel } from '../src/components/3d/RubiksCubeModel.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('--- 1. Testing Color Palette & Constants ---');
assert(CUBE_COLORS.W === '#F8FAFC', 'White is #F8FAFC');
assert(CUBE_COLORS.Y === '#FACC15', 'Yellow is #FACC15');
assert(CUBE_COLORS.G === '#16A34A', 'Green is #16A34A');
assert(CUBE_COLORS.B === '#2563EB', 'Blue is #2563EB');
assert(CUBE_COLORS.R === '#DC2626', 'Red is #DC2626');
assert(CUBE_COLORS.O === '#EA580C', 'Orange is #EA580C');
assert(INNER_PLASTIC_COLOR === '#121417', 'Inner plastic is #121417');
assert(HIGHLIGHT_COLOR === '#38BDF8', 'Highlight color is #38BDF8');

console.log('\n--- 2. Testing Cube State Normalization & Serialization ---');
const solved = getSolvedCubeState();
assert(solved.U.every(c => c === 'W') && solved.U.length === 9, 'Solved U has 9 White stickers');
assert(solved.D.every(c => c === 'Y') && solved.D.length === 9, 'Solved D has 9 Yellow stickers');
assert(solved.F.every(c => c === 'G') && solved.F.length === 9, 'Solved F has 9 Green stickers');
assert(solved.B.every(c => c === 'B') && solved.B.length === 9, 'Solved B has 9 Blue stickers');
assert(solved.L.every(c => c === 'O') && solved.L.length === 9, 'Solved L has 9 Orange stickers');
assert(solved.R.every(c => c === 'R') && solved.R.length === 9, 'Solved R has 9 Red stickers');

const strSolved = cubeStateToString(solved);
assert(strSolved.length === 54, `String length is 54 (got ${strSolved.length})`);
assert(strSolved.startsWith('WWWWWWWWW'), 'String starts with U face');

const reNormalized = normalizeCubeState(strSolved);
assert(cubeStateToString(reNormalized) === strSolved, 'Round-trip normalize(cubeStateToString()) matches');

console.log('\n--- 3. Testing 3D Coordinate Bijection ---');
assert(ALL_STICKERS.length === 54, `Exactly 54 stickers generated (got ${ALL_STICKERS.length})`);

for (const face of FACES) {
  const stickersOnFace = ALL_STICKERS.filter(s => s.face === face);
  assert(stickersOnFace.length === 9, `Face ${face} has 9 stickers`);
  const indices = stickersOnFace.map(s => s.index).sort((a, b) => a - b);
  assert(indices.join(',') === '0,1,2,3,4,5,6,7,8', `Face ${face} contains all indices 0..8 without duplicates`);

  for (let idx = 0; idx < 9; idx++) {
    const coords = getStickerCoords(face, idx);
    const mapped = getFaceAndIndex(coords.cx, coords.cy, coords.cz, coords.nx, coords.ny, coords.nz);
    assert(
      mapped && mapped.face === face && mapped.index === idx,
      `Bijective mapping preserved for ${face}[${idx}]`
    );
  }
}

console.log('\n--- 4. Testing Slice Moves & Permutations ---');
function isCubeSolved(s) {
  for (const f of FACES) {
    const expected = s[f][0];
    for (let i = 1; i < 9; i++) {
      if (s[f][i] !== expected) return false;
    }
  }
  return true;
}

// 4a. Move inverses
for (const face of ['U', 'D', 'F', 'B', 'R', 'L']) {
  let s = getSolvedCubeState();
  s = applyMoveToState(s, face);
  assert(!isCubeSolved(s), `Move ${face} alters cube state`);
  s = applyMoveToState(s, `${face}'`);
  assert(isCubeSolved(s), `Move ${face} + ${face}' restores solved state`);

  s = applyMoveToState(s, `${face}2`);
  assert(!isCubeSolved(s), `Move ${face}2 alters cube state`);
  s = applyMoveToState(s, `${face}2`);
  assert(isCubeSolved(s), `Move ${face}2 + ${face}2 restores solved state`);
}

// 4b. 4 * Single Move
for (const face of ['U', 'D', 'F', 'B', 'R', 'L']) {
  let s = getSolvedCubeState();
  for (let i = 0; i < 4; i++) s = applyMoveToState(s, face);
  assert(isCubeSolved(s), `Move ${face} * 4 restores solved state`);
}

// 4c. Canonical Algorithms
// Algorithm 1: (R U R' U') * 6
let alg1 = getSolvedCubeState();
for (let i = 0; i < 6; i++) {
  alg1 = applyMoveToState(alg1, 'R');
  alg1 = applyMoveToState(alg1, 'U');
  alg1 = applyMoveToState(alg1, "R'");
  alg1 = applyMoveToState(alg1, "U'");
}
assert(isCubeSolved(alg1), `(R U R' U') * 6 restores solved state`);

// Algorithm 2: (R' D' R D) * 6
let alg2 = getSolvedCubeState();
for (let i = 0; i < 6; i++) {
  alg2 = applyMoveToState(alg2, "R'");
  alg2 = applyMoveToState(alg2, "D'");
  alg2 = applyMoveToState(alg2, 'R');
  alg2 = applyMoveToState(alg2, 'D');
}
assert(isCubeSolved(alg2), `(R' D' R D) * 6 restores solved state`);

// Algorithm 3: (F R U R' U' F') * 6
let alg3 = getSolvedCubeState();
for (let i = 0; i < 6; i++) {
  alg3 = applyMoveToState(alg3, 'F');
  alg3 = applyMoveToState(alg3, 'R');
  alg3 = applyMoveToState(alg3, 'U');
  alg3 = applyMoveToState(alg3, "R'");
  alg3 = applyMoveToState(alg3, "U'");
  alg3 = applyMoveToState(alg3, "F'");
}
assert(isCubeSolved(alg3), `(F R U R' U' F') * 6 restores solved state`);

console.log('\n--- 5. Testing RubiksCubeModel Three.js Lifecycle ---');
const scene = new THREE.Scene();
const model = new RubiksCubeModel(scene);

assert(model.cubieMeshes.length === 27, `Model has 27 cubies (got ${model.cubieMeshes.length})`);
assert(model.stickerMeshes.length === 54, `Model has 54 stickers (got ${model.stickerMeshes.length})`);
assert(model.stickersMap.size === 54, `Model stickers map size is 54 (got ${model.stickersMap.size})`);

// Test instant snap move via model
model.executeMove('R', false);
const afterR = model.getCubeState();
assert(!isCubeSolved(afterR), 'Model state after instant R is not solved');

model.executeMove("R'", false);
const afterRPrime = model.getCubeState();
assert(isCubeSolved(afterRPrime), 'Model state after instant R + R\' is solved');

// Test hover highlight
const stickerU4 = model.stickersMap.get('U_4');
assert(stickerU4 !== undefined, 'Sticker U_4 exists');
model.setHoveredSticker(stickerU4, false);
assert(stickerU4.material.emissiveIntensity > 0, 'Hovered sticker emissive intensity is active');
model.clearHover();
assert(stickerU4.material.emissiveIntensity === 0, 'Cleared hover resets emissive intensity');

// Test cleanup / disposal
model.dispose();
assert(model.cubieMeshes.length === 0, 'Model cubies array cleaned on dispose');
assert(model.stickerMeshes.length === 0, 'Model stickers array cleaned on dispose');
assert(model.stickersMap.size === 0, 'Model stickers map cleared on dispose');

console.log(`\n========================================`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL 3D TESTS PASSED PERFECTLY!\n');
}
