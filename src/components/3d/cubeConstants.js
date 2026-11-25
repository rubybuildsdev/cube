/**
 * Cube Constants and State Permutation Engine
 * Accurate 3D mapping and standard 54-facelet Rubik's cube representation.
 */

import {
  createSolvedState,
  stringToState,
  stateToFaceletString,
  applyMove,
} from '../../solver/cubeState.js';

// Color palette mapping as requested:
// #F8FAFC white, #FACC15 yellow, #16A34A green, #2563EB blue, #DC2626 red, #EA580C orange
export const CUBE_COLORS = {
  W: '#F8FAFC', // Up (White)
  Y: '#FACC15', // Down (Yellow)
  G: '#16A34A', // Front (Green)
  B: '#2563EB', // Back (Blue)
  O: '#EA580C', // Left (Orange)
  R: '#DC2626', // Right (Red)
  X: '#1e293b', // Unpainted / Blank (Dark Slate Socket)
};

export const COLOR_NAMES = {
  W: 'White',
  Y: 'Yellow',
  G: 'Green',
  B: 'Blue',
  O: 'Orange',
  R: 'Red',
  X: 'Unpainted',
};

export const INNER_PLASTIC_COLOR = '#121417';
export const HIGHLIGHT_COLOR = '#38BDF8';

export const FACES = ['U', 'D', 'F', 'B', 'L', 'R'];

export const FACE_NAMES = {
  U: 'Up',
  D: 'Down',
  F: 'Front',
  B: 'Back',
  L: 'Left',
  R: 'Right',
};

// Canonical centers for each face (index 4 of each face)
export const CANONICAL_CENTERS = {
  U: 'W',
  D: 'Y',
  F: 'G',
  B: 'B',
  L: 'O',
  R: 'R',
};

/**
 * Creates a clean, solved 54-facelet state
 * Format: { U: ['W',...], D: ['Y',...], F: ['G',...], B: ['B',...], L: ['O',...], R: ['R',...] }
 */
export function getSolvedCubeState() {
  return createSolvedState();
}

/**
 * Normalizes any cubeState input (object, 54-char string, or array)
 * into a standardized { U: string[9], D: string[9], ... } object.
 */
export function normalizeCubeState(input) {
  if (!input) return createSolvedState();
  if (Array.isArray(input) && input.length === 54) {
    return stringToState(input.join(''));
  }
  return stringToState(input);
}

/**
 * Converts a cubeState object to standard 54-char string (U-R-F-D-L-B)
 */
export function cubeStateToString(state) {
  return stateToFaceletString(normalizeCubeState(state));
}

/**
 * 3D Coordinate Mapping:
 * Maps cubie coordinate (cx, cy, cz) and face normal (nx, ny, nz) to { face, index } (0..8)
 */
export function getFaceAndIndex(cx, cy, cz, nx, ny, nz) {
  if (ny > 0.5) return { face: 'U', index: (cz + 1) * 3 + (cx + 1) };
  if (ny < -0.5) return { face: 'D', index: (1 - cz) * 3 + (cx + 1) };
  if (nz > 0.5) return { face: 'F', index: (1 - cy) * 3 + (cx + 1) };
  if (nz < -0.5) return { face: 'B', index: (1 - cy) * 3 + (1 - cx) };
  if (nx < -0.5) return { face: 'L', index: (1 - cy) * 3 + (cz + 1) };
  if (nx > 0.5) return { face: 'R', index: (1 - cy) * 3 + (1 - cz) };
  return null;
}

/**
 * Inverse mapping: Given (face, index), returns { cx, cy, cz, nx, ny, nz }
 */
export function getStickerCoords(face, index) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  let cx = 0, cy = 0, cz = 0;
  let nx = 0, ny = 0, nz = 0;

  switch (face) {
    case 'U':
      cy = 1; ny = 1;
      cz = row - 1;
      cx = col - 1;
      break;
    case 'D':
      cy = -1; ny = -1;
      cz = 1 - row;
      cx = col - 1;
      break;
    case 'F':
      cz = 1; nz = 1;
      cy = 1 - row;
      cx = col - 1;
      break;
    case 'B':
      cz = -1; nz = -1;
      cy = 1 - row;
      cx = 1 - col;
      break;
    case 'L':
      cx = -1; nx = -1;
      cy = 1 - row;
      cz = col - 1;
      break;
    case 'R':
      cx = 1; nx = 1;
      cy = 1 - row;
      cz = 1 - col;
      break;
  }
  return { cx, cy, cz, nx, ny, nz };
}

/**
 * 3D Move Specs:
 * Defines slice coordinate, axis of rotation, and angle in radians
 */
export const MOVE_SPECS = {
  U:   { face: 'U', axis: 'y', sliceCoord: 'y', sliceVal: 1,  angle: -Math.PI / 2 },
  "U'": { face: 'U', axis: 'y', sliceCoord: 'y', sliceVal: 1,  angle: Math.PI / 2 },
  U2:  { face: 'U', axis: 'y', sliceCoord: 'y', sliceVal: 1,  angle: -Math.PI },

  D:   { face: 'D', axis: 'y', sliceCoord: 'y', sliceVal: -1, angle: Math.PI / 2 },
  "D'": { face: 'D', axis: 'y', sliceCoord: 'y', sliceVal: -1, angle: -Math.PI / 2 },
  D2:  { face: 'D', axis: 'y', sliceCoord: 'y', sliceVal: -1, angle: Math.PI },

  F:   { face: 'F', axis: 'z', sliceCoord: 'z', sliceVal: 1,  angle: -Math.PI / 2 },
  "F'": { face: 'F', axis: 'z', sliceCoord: 'z', sliceVal: 1,  angle: Math.PI / 2 },
  F2:  { face: 'F', axis: 'z', sliceCoord: 'z', sliceVal: 1,  angle: -Math.PI },

  B:   { face: 'B', axis: 'z', sliceCoord: 'z', sliceVal: -1, angle: Math.PI / 2 },
  "B'": { face: 'B', axis: 'z', sliceCoord: 'z', sliceVal: -1, angle: -Math.PI / 2 },
  B2:  { face: 'B', axis: 'z', sliceCoord: 'z', sliceVal: -1, angle: Math.PI },

  R:   { face: 'R', axis: 'x', sliceCoord: 'x', sliceVal: 1,  angle: -Math.PI / 2 },
  "R'": { face: 'R', axis: 'x', sliceCoord: 'x', sliceVal: 1,  angle: Math.PI / 2 },
  R2:  { face: 'R', axis: 'x', sliceCoord: 'x', sliceVal: 1,  angle: -Math.PI },

  L:   { face: 'L', axis: 'x', sliceCoord: 'x', sliceVal: -1, angle: Math.PI / 2 },
  "L'": { face: 'L', axis: 'x', sliceCoord: 'x', sliceVal: -1, angle: -Math.PI / 2 },
  L2:  { face: 'L', axis: 'x', sliceCoord: 'x', sliceVal: -1, angle: Math.PI },
};

// Generate the 54 sticker metadata array
export const ALL_STICKERS = [];
for (const x of [-1, 0, 1]) {
  for (const y of [-1, 0, 1]) {
    for (const z of [-1, 0, 1]) {
      if (y === 1) ALL_STICKERS.push({ pos: { x, y, z }, normal: { x: 0, y: 1, z: 0 }, ...getFaceAndIndex(x, y, z, 0, 1, 0) });
      if (y === -1) ALL_STICKERS.push({ pos: { x, y, z }, normal: { x: 0, y: -1, z: 0 }, ...getFaceAndIndex(x, y, z, 0, -1, 0) });
      if (z === 1) ALL_STICKERS.push({ pos: { x, y, z }, normal: { x: 0, y: 0, z: 1 }, ...getFaceAndIndex(x, y, z, 0, 0, 1) });
      if (z === -1) ALL_STICKERS.push({ pos: { x, y, z }, normal: { x: 0, y: 0, z: -1 }, ...getFaceAndIndex(x, y, z, 0, 0, -1) });
      if (x === -1) ALL_STICKERS.push({ pos: { x, y, z }, normal: { x: -1, y: 0, z: 0 }, ...getFaceAndIndex(x, y, z, -1, 0, 0) });
      if (x === 1) ALL_STICKERS.push({ pos: { x, y, z }, normal: { x: 1, y: 0, z: 0 }, ...getFaceAndIndex(x, y, z, 1, 0, 0) });
    }
  }
}

/**
 * Applies a move notation string (e.g. "R", "U'", "F2") to a cubeState object
 */
export function applyMoveToState(state, moveStr) {
  return applyMove(normalizeCubeState(state), moveStr);
}
