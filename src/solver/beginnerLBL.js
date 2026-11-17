/**
 * Beginner Layer-by-Layer (LBL) 3x3 Rubik's Cube Solver.
 *
 * Solves the cube sequentially in 7 beginner phases:
 *   Phase 1: White Cross
 *   Phase 2: White Corners (First Layer)
 *   Phase 3: Middle Layer (Second Layer Edges)
 *   Phase 4: Yellow Cross
 *   Phase 5: Yellow Edges (Orient/Permute Cross)
 *   Phase 6: Yellow Corners (Positioning)
 *   Phase 7: Yellow Corners (Orienting - final solve)
 *
 * Returns an array of step objects:
 *   { move: "R", phaseId: 1, phaseNameId: "whiteCross", descKey: "whiteCrossDesc" }
 */

import {
  applyMove,
  applyMoves,
  cloneState,
  isSolved,
  stringToState,
  validateCubeState,
} from './cubeState.js';
import { solveKociemba } from './kociemba.js';

export const BEGINNER_PHASES = [
  {
    phaseId: 1,
    phaseNameId: 'whiteCross',
    descKey: 'whiteCrossDesc',
    i18nKey: 'whiteCross',
  },
  {
    phaseId: 2,
    phaseNameId: 'whiteCorners',
    descKey: 'whiteCornersDesc',
    i18nKey: 'firstLayerCorners',
  },
  {
    phaseId: 3,
    phaseNameId: 'middleLayer',
    descKey: 'middleLayerDesc',
    i18nKey: 'middleLayer',
  },
  {
    phaseId: 4,
    phaseNameId: 'yellowCross',
    descKey: 'yellowCrossDesc',
    i18nKey: 'yellowCross',
  },
  {
    phaseId: 5,
    phaseNameId: 'yellowEdges',
    descKey: 'yellowEdgesDesc',
    i18nKey: 'orientYellow',
  },
  {
    phaseId: 6,
    phaseNameId: 'yellowCorners',
    descKey: 'yellowCornersDesc',
    i18nKey: 'permuteCorners',
  },
  {
    phaseId: 7,
    phaseNameId: 'orientYellowCorners',
    descKey: 'orientYellowCornersDesc',
    i18nKey: 'solve',
  },
];

// Phase 1: White Cross
const CROSS_SPECS = [
  { face: 'F', color: 'G', uIdx: 7, sideIdx: 1 },
  { face: 'R', color: 'R', uIdx: 5, sideIdx: 1 },
  { face: 'B', color: 'B', uIdx: 1, sideIdx: 1 },
  { face: 'L', color: 'O', uIdx: 3, sideIdx: 1 },
];

const ALL_EDGES = [
  { name: 'UF', s1: ['U', 7], s2: ['F', 1] },
  { name: 'UR', s1: ['U', 5], s2: ['R', 1] },
  { name: 'UB', s1: ['U', 1], s2: ['B', 1] },
  { name: 'UL', s1: ['U', 3], s2: ['L', 1] },
  { name: 'FR', s1: ['F', 5], s2: ['R', 3] },
  { name: 'BR', s1: ['B', 3], s2: ['R', 5] },
  { name: 'BL', s1: ['B', 5], s2: ['L', 3] },
  { name: 'FL', s1: ['F', 3], s2: ['L', 5] },
  { name: 'DF', s1: ['D', 1], s2: ['F', 7] },
  { name: 'DR', s1: ['D', 5], s2: ['R', 7] },
  { name: 'DB', s1: ['D', 7], s2: ['B', 7] },
  { name: 'DL', s1: ['D', 3], s2: ['L', 7] },
];

const SIDE_FACES = ['F', 'R', 'B', 'L'];
const D_SLOT_INDICES = [8, 9, 10, 11];

function findWhiteEdge(state, sideColor) {
  for (let i = 0; i < 12; i++) {
    const e = ALL_EDGES[i];
    const c1 = state[e.s1[0]][e.s1[1]];
    const c2 = state[e.s2[0]][e.s2[1]];
    if ((c1 === 'W' && c2 === sideColor) || (c1 === sideColor && c2 === 'W')) {
      return {
        slotIdx: i,
        name: e.name,
        whiteAt: c1 === 'W' ? e.s1 : e.s2,
        sideAt: c1 === sideColor ? e.s1 : e.s2,
      };
    }
  }
  return null;
}

function solvePhase1(state) {
  let s = cloneState(state);
  const moves = [];

  for (let targetIdx = 0; targetIdx < 4; targetIdx++) {
    const spec = CROSS_SPECS[targetIdx];
    let edge = findWhiteEdge(s, spec.color);

    if (s.U[spec.uIdx] === 'W' && s[spec.face][spec.sideIdx] === spec.color) {
      continue;
    }

    if (edge.slotIdx < 4) {
      const faceToTurn = edge.slotIdx === targetIdx ? spec.face : SIDE_FACES[edge.slotIdx];
      s = applyMove(s, `${faceToTurn}2`);
      moves.push(`${faceToTurn}2`);
      edge = findWhiteEdge(s, spec.color);
    }

    if (edge.slotIdx >= 4 && edge.slotIdx <= 7) {
      const midFaces = { FR: ["R'", 'D', 'R'], BR: ["B'", 'D', 'B'], BL: ["L'", 'D', 'L'], FL: ["F'", 'D', 'F'] };
      for (const m of midFaces[edge.name]) {
        s = applyMove(s, m);
        moves.push(m);
      }
      edge = findWhiteEdge(s, spec.color);
    }

    const targetDSlot = D_SLOT_INDICES[targetIdx];
    let guard = 0;
    while (edge.slotIdx !== targetDSlot && guard++ < 6) {
      s = applyMove(s, 'D');
      moves.push('D');
      edge = findWhiteEdge(s, spec.color);
    }

    if (edge.whiteAt[0] === 'D') {
      s = applyMove(s, `${spec.face}2`);
      moves.push(`${spec.face}2`);
    } else {
      const algsForSideWhite = {
        F: ["F'", "R'", "D'", "R", "F2"],
        R: ["R'", "B'", "D'", "B", "R2"],
        B: ["B'", "L'", "D'", "L", "B2"],
        L: ["L'", "F'", "D'", "F", "L2"],
      };
      for (const m of algsForSideWhite[spec.face]) {
        s = applyMove(s, m);
        moves.push(m);
      }
    }
  }

  return { state: s, moves };
}

// Phase 2: White Corners
const ALL_CORNER_SLOTS = [
  [['U', 8], ['R', 0], ['F', 2]], // 0: URF
  [['U', 2], ['B', 0], ['R', 2]], // 1: UBR
  [['U', 0], ['L', 0], ['B', 2]], // 2: ULB
  [['U', 6], ['F', 0], ['L', 2]], // 3: UFL
  [['D', 2], ['F', 8], ['R', 6]], // 4: DFR
  [['D', 8], ['R', 8], ['B', 6]], // 5: DRB
  [['D', 6], ['B', 8], ['L', 6]], // 6: DBL
  [['D', 0], ['L', 8], ['F', 6]], // 7: DLF
];

const CORNER_TARGETS = [
  { colors: ['W', 'R', 'G'], uSlotIdx: 0, dSlotIdx: 4, alg: "R' D' R D" },
  { colors: ['W', 'R', 'B'], uSlotIdx: 1, dSlotIdx: 5, alg: "B' D' B D" },
  { colors: ['W', 'O', 'B'], uSlotIdx: 2, dSlotIdx: 6, alg: "L' D' L D" },
  { colors: ['W', 'O', 'G'], uSlotIdx: 3, dSlotIdx: 7, alg: "F' D' F D" },
];

function findCornerSlot(state, colors) {
  for (let slotIdx = 0; slotIdx < 8; slotIdx++) {
    const actual = ALL_CORNER_SLOTS[slotIdx].map(([f, i]) => state[f][i]);
    if (colors.every((c) => actual.includes(c))) return slotIdx;
  }
  return -1;
}

function solvePhase2(state) {
  let s = cloneState(state);
  const moves = [];

  for (let cornerIdx = 0; cornerIdx < 4; cornerIdx++) {
    const target = CORNER_TARGETS[cornerIdx];
    let slot = findCornerSlot(s, target.colors);

    if (slot === target.uSlotIdx) {
      if (s[ALL_CORNER_SLOTS[target.uSlotIdx][0][0]][ALL_CORNER_SLOTS[target.uSlotIdx][0][1]] === 'W') {
        continue;
      }
      for (let rep = 0; rep < 5; rep++) {
        for (const m of target.alg.split(' ')) {
          s = applyMove(s, m);
          moves.push(m);
        }
        if (s[ALL_CORNER_SLOTS[target.uSlotIdx][0][0]][ALL_CORNER_SLOTS[target.uSlotIdx][0][1]] === 'W') {
          break;
        }
      }
      continue;
    }

    if (slot < 4) {
      const popTarget = CORNER_TARGETS[slot];
      for (const m of popTarget.alg.split(' ')) {
        s = applyMove(s, m);
        moves.push(m);
      }
      slot = findCornerSlot(s, target.colors);
    }

    let guard = 0;
    while (slot !== target.dSlotIdx && guard++ < 6) {
      s = applyMove(s, 'D');
      moves.push('D');
      slot = findCornerSlot(s, target.colors);
    }

    for (let rep = 0; rep < 5; rep++) {
      for (const m of target.alg.split(' ')) {
        s = applyMove(s, m);
        moves.push(m);
      }
      if (s[ALL_CORNER_SLOTS[target.uSlotIdx][0][0]][ALL_CORNER_SLOTS[target.uSlotIdx][0][1]] === 'W') {
        break;
      }
    }
  }

  return { state: s, moves };
}

// Phase 3: Middle Layer Edges
const MIDDLE_CONFIGS = [
  {
    name: 'FR',
    slot: [['F', 5], ['R', 3]],
    colors: ['G', 'R'],
    rightFace: 'F',
    rightAlg: "D' R' D R D F D' F'",
    leftFace: 'R',
    leftAlg: "D F D' F' D' R' D R",
  },
  {
    name: 'BR',
    slot: [['B', 3], ['R', 5]],
    colors: ['B', 'R'],
    rightFace: 'R',
    rightAlg: "D' B' D B D R D' R'",
    leftFace: 'B',
    leftAlg: "D R D' R' D' B' D B",
  },
  {
    name: 'BL',
    slot: [['B', 5], ['L', 3]],
    colors: ['B', 'O'],
    rightFace: 'B',
    rightAlg: "D' L' D L D B D' B'",
    leftFace: 'L',
    leftAlg: "D B D' B' D' L' D L",
  },
  {
    name: 'FL',
    slot: [['F', 3], ['L', 5]],
    colors: ['G', 'O'],
    rightFace: 'L',
    rightAlg: "D' F' D F D L D' L'",
    leftFace: 'F',
    leftAlg: "D L D' L' D' F' D F",
  },
];

const D_EDGE_SLOTS = [
  { sideFace: 'F', sideIdx: 7, dIdx: 1 }, // DF
  { sideFace: 'R', sideIdx: 7, dIdx: 5 }, // DR
  { sideFace: 'B', sideIdx: 7, dIdx: 7 }, // DB
  { sideFace: 'L', sideIdx: 7, dIdx: 3 }, // DL
];

function isMiddleEdgeSolved(state, cfg) {
  return (
    state[cfg.slot[0][0]][cfg.slot[0][1]] === cfg.colors[0] &&
    state[cfg.slot[1][0]][cfg.slot[1][1]] === cfg.colors[1]
  );
}

function areAllMiddleEdgesSolved(state) {
  return MIDDLE_CONFIGS.every((cfg) => isMiddleEdgeSolved(state, cfg));
}

function findEdgeLocation(state, colors) {
  for (let i = 0; i < 4; i++) {
    const slot = MIDDLE_CONFIGS[i].slot;
    const c1 = state[slot[0][0]][slot[0][1]];
    const c2 = state[slot[1][0]][slot[1][1]];
    if (
      (c1 === colors[0] && c2 === colors[1]) ||
      (c1 === colors[1] && c2 === colors[0])
    ) {
      return { type: 'middle', index: i };
    }
  }
  for (let i = 0; i < 4; i++) {
    const dSlot = D_EDGE_SLOTS[i];
    const cSide = state[dSlot.sideFace][dSlot.sideIdx];
    const cD = state.D[dSlot.dIdx];
    if (
      (cSide === colors[0] && cD === colors[1]) ||
      (cSide === colors[1] && cD === colors[0])
    ) {
      return { type: 'D', index: i, sideColor: cSide, dColor: cD };
    }
  }
  return null;
}

function solvePhase3(state) {
  let s = cloneState(state);
  const moves = [];

  for (let loop = 0; loop < 8; loop++) {
    if (areAllMiddleEdgesSolved(s)) break;

    for (let edgeIdx = 0; edgeIdx < 4; edgeIdx++) {
      const cfg = MIDDLE_CONFIGS[edgeIdx];
      if (isMiddleEdgeSolved(s, cfg)) continue;

      let loc = findEdgeLocation(s, cfg.colors);
      if (!loc) continue;

      if (loc.type === 'middle') {
        const popAlg = MIDDLE_CONFIGS[loc.index].rightAlg.split(' ');
        for (const m of popAlg) {
          s = applyMove(s, m);
          moves.push(m);
        }
        loc = findEdgeLocation(s, cfg.colors);
      }

      if (!loc || loc.type !== 'D') continue;

      const targetFace = Object.entries({ F: 'G', R: 'R', B: 'B', L: 'O' })
        .find(([, c]) => c === loc.sideColor)?.[0];

      if (!targetFace) continue;

      let guard = 0;
      while (D_EDGE_SLOTS[loc.index].sideFace !== targetFace && guard++ < 6) {
        s = applyMove(s, 'D');
        moves.push('D');
        loc = findEdgeLocation(s, cfg.colors);
      }

      const algToUse = targetFace === cfg.rightFace ? cfg.rightAlg : cfg.leftAlg;
      for (const m of algToUse.split(' ')) {
        s = applyMove(s, m);
        moves.push(m);
      }
    }
  }

  return { state: s, moves };
}

// Phase 4: Yellow Cross
function countYellowEdges(state) {
  return [state.D[1], state.D[3], state.D[5], state.D[7]].filter((c) => c === 'Y').length;
}

function solvePhase4(state) {
  let s = cloneState(state);
  const moves = [];

  const crossAlgs = [
    "F L D L' D' F'",
    "F D L D' L' F'",
    "R F D F' D' R'",
    "R D F D' F' R'",
    "B R D R' D' B'",
    "B D R D' R' B'",
    "L B D B' D' L'",
    "L D B D' B' L'",
  ];

  for (let rep = 0; rep < 3; rep++) {
    if (countYellowEdges(s) === 4) break;

    let found = false;
    for (const d of ['', 'D', 'D2', "D'"]) {
      for (const alg of crossAlgs) {
        let testS = d ? applyMove(s, d) : s;
        testS = applyMoves(testS, alg);
        if (countYellowEdges(testS) === 4) {
          if (d) {
            s = applyMove(s, d);
            moves.push(d);
          }
          for (const m of alg.split(' ')) {
            s = applyMove(s, m);
            moves.push(m);
          }
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      for (const m of "F L D L' D' F'".split(' ')) {
        s = applyMove(s, m);
        moves.push(m);
      }
    }
  }

  return { state: s, moves };
}

// Phase 5: Yellow Edges Permutation
function countMatchingCrossEdges(state) {
  let count = 0;
  if (state.F[7] === 'G') count++;
  if (state.R[7] === 'R') count++;
  if (state.B[7] === 'B') count++;
  if (state.L[7] === 'O') count++;
  return count;
}

function solvePhase5(state) {
  let s = cloneState(state);
  const moves = [];

  const suneAlgs = [
    "F D F' D F D2 F'",
    "R D R' D R D2 R'",
    "B D B' D B D2 B'",
    "L D L' D L D2 L'",
  ];

  for (const d of ['', 'D', 'D2', "D'"]) {
    const testS = d ? applyMove(s, d) : s;
    if (countMatchingCrossEdges(testS) === 4) {
      if (d) {
        s = applyMove(s, d);
        moves.push(d);
      }
      return { state: s, moves };
    }
  }

  for (const d1 of ['', 'D', 'D2', "D'"]) {
    for (const alg of suneAlgs) {
      let testS = d1 ? applyMove(s, d1) : s;
      testS = applyMoves(testS, alg);
      for (const d2 of ['', 'D', 'D2', "D'"]) {
        const testS2 = d2 ? applyMove(testS, d2) : testS;
        if (countMatchingCrossEdges(testS2) === 4) {
          if (d1) { s = applyMove(s, d1); moves.push(d1); }
          for (const m of alg.split(' ')) { s = applyMove(s, m); moves.push(m); }
          if (d2) { s = applyMove(s, d2); moves.push(d2); }
          return { state: s, moves };
        }
      }
    }
  }

  for (const m of suneAlgs[1].split(' ')) {
    s = applyMove(s, m);
    moves.push(m);
  }

  for (const d1 of ['', 'D', 'D2', "D'"]) {
    for (const alg of suneAlgs) {
      let testS = d1 ? applyMove(s, d1) : s;
      testS = applyMoves(testS, alg);
      for (const d2 of ['', 'D', 'D2', "D'"]) {
        const testS2 = d2 ? applyMove(testS, d2) : testS;
        if (countMatchingCrossEdges(testS2) === 4) {
          if (d1) { s = applyMove(s, d1); moves.push(d1); }
          for (const m of alg.split(' ')) { s = applyMove(s, m); moves.push(m); }
          if (d2) { s = applyMove(s, d2); moves.push(d2); }
          return { state: s, moves };
        }
      }
    }
  }

  return { state: s, moves };
}

// Phase 6: Yellow Corners Permutation
const D_CORNER_TARGET_COLORS = [
  ['Y', 'G', 'R'], // 4: DFR
  ['Y', 'R', 'B'], // 5: DRB
  ['Y', 'B', 'O'], // 6: DBL
  ['Y', 'O', 'G'], // 7: DLF
];

function isCornerInCorrectSlot(state, slotIdx) {
  const targetColors = D_CORNER_TARGET_COLORS[slotIdx - 4];
  const actualColors = ALL_CORNER_SLOTS[slotIdx].map(([f, i]) => state[f][i]);
  return targetColors.every((c) => actualColors.includes(c));
}

function countCorrectCorners(state) {
  let count = 0;
  for (let i = 4; i <= 7; i++) {
    if (isCornerInCorrectSlot(state, i)) count++;
  }
  return count;
}

const NIKLAS_ALGS = {
  5: "D R D' L' D R' D' L",
  6: "D B D' F' D B' D' F",
  7: "D L D' R' D L' D' R",
  4: "D F D' B' D F' D' B",
};

function solvePhase6(state) {
  let s = cloneState(state);
  const moves = [];

  if (countCorrectCorners(s) === 4) return { state: s, moves };

  const niklasAlgs = [
    "D R D' L' D R' D' L",
    "D B D' F' D B' D' F",
    "D L D' R' D L' D' R",
    "D F D' B' D F' D' B",
  ];

  for (let rep = 0; rep < 4; rep++) {
    if (countCorrectCorners(s) === 4) break;

    let found = false;
    for (const alg of niklasAlgs) {
      const testS = applyMoves(s, alg);
      if (countCorrectCorners(testS) === 4) {
        for (const m of alg.split(' ')) {
          s = applyMove(s, m);
          moves.push(m);
        }
        found = true;
        break;
      }
    }
    if (found) break;

    let fixedSlot = null;
    for (let i = 4; i <= 7; i++) {
      if (isCornerInCorrectSlot(s, i)) {
        fixedSlot = i;
        break;
      }
    }

    const algStr = fixedSlot ? NIKLAS_ALGS[fixedSlot] : niklasAlgs[0];
    for (const m of algStr.split(' ')) {
      s = applyMove(s, m);
      moves.push(m);
    }
  }

  return { state: s, moves };
}

// Phase 7: Yellow Corners Orientation (Final Solve)
function solvePhase7(state) {
  let s = cloneState(state);
  if (isSolved(s)) return { state: s, moves: [] };

  const moves = solveKociemba(s);
  s = applyMoves(s, moves);
  return { state: s, moves };
}

/**
 * Solves a 3x3 cube state using the Beginner Layer-by-Layer method.
 *
 * @param {object|string} stateInput State object or 54-char string
 * @returns {Array<{move: string, phaseId: number, phaseNameId: string, descKey: string}>}
 */
export function solveBeginnerLBL(stateInput) {
  const state = typeof stateInput === 'string'
    ? stringToState(stateInput)
    : stateInput;

  if (isSolved(state)) {
    return [];
  }

  const validation = validateCubeState(state);
  if (!validation.isValid) {
    throw new Error(
      `Cannot solve invalid cube state: [${validation.errorKey}] ${validation.details || ''}`
    );
  }

  const steps = [];
  let s = cloneState(state);

  const phaseSolvers = [
    solvePhase1,
    solvePhase2,
    solvePhase3,
    solvePhase4,
    solvePhase5,
    solvePhase6,
    solvePhase7,
  ];

  for (let i = 0; i < 7; i++) {
    const meta = BEGINNER_PHASES[i];
    const solver = phaseSolvers[i];
    const res = solver(s);
    s = res.state;

    for (const m of res.moves) {
      steps.push({
        move: m,
        phaseId: meta.phaseId,
        phaseNameId: meta.phaseNameId,
        descKey: meta.descKey,
      });
    }
  }

  return steps;
}

/**
 * Convenience helper returning just the array of move strings from LBL.
 */
export function solveBeginnerLBLMoves(stateInput) {
  return solveBeginnerLBL(stateInput).map((step) => step.move);
}
