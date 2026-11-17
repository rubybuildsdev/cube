/**
 * Standard 3x3 Rubik's Cube state representation and move manipulation.
 *
 * Faces: U (Up), R (Right), F (Front), D (Down), L (Left), B (Back)
 * Canonical Color Scheme:
 *   U: White  ('W')
 *   R: Red    ('R')
 *   F: Green  ('G')
 *   D: Yellow ('Y')
 *   L: Orange ('O')
 *   B: Blue   ('B')
 *
 * Each face has 9 facelets indexed 0..8:
 *   0 1 2
 *   3 4 5
 *   6 7 8
 * (index 4 is the center facelet)
 */

export const FACE_NAMES = ['U', 'R', 'F', 'D', 'L', 'B'];

export const CANONICAL_CENTERS = {
  U: 'W',
  R: 'R',
  F: 'G',
  D: 'Y',
  L: 'O',
  B: 'B',
};

export const COLOR_TO_FACE = {
  W: 'U',
  R: 'R',
  G: 'F',
  Y: 'D',
  O: 'L',
  B: 'B',
};

export const FACE_TO_COLOR = {
  U: 'W',
  R: 'R',
  F: 'G',
  D: 'Y',
  L: 'O',
  B: 'B',
};

export const VALID_MOVES = [
  'U', "U'", 'U2',
  'D', "D'", 'D2',
  'L', "L'", 'L2',
  'R', "R'", 'R2',
  'F', "F'", 'F2',
  'B', "B'", 'B2',
];

/**
 * 54-facelet permutations for base quarter-turn moves (U, D, F, B, L, R).
 * Target facelet i receives from index MOVE_PERMUTATIONS[move][i].
 * Exact Kociemba standard geometry.
 */
export const MOVE_PERMUTATIONS = {
  U: [
    6, 3, 0, 7, 4, 1, 8, 5, 2,
    45, 46, 47, 12, 13, 14, 15, 16, 17,
    9, 10, 11, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35,
    18, 19, 20, 39, 40, 41, 42, 43, 44,
    36, 37, 38, 48, 49, 50, 51, 52, 53,
  ],
  D: [
    0, 1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 24, 25, 26,
    18, 19, 20, 21, 22, 23, 42, 43, 44,
    33, 30, 27, 34, 31, 28, 35, 32, 29,
    36, 37, 38, 39, 40, 41, 51, 52, 53,
    45, 46, 47, 48, 49, 50, 15, 16, 17,
  ],
  F: [
    0, 1, 2, 3, 4, 5, 44, 41, 38,
    6, 10, 11, 7, 13, 14, 8, 16, 17,
    24, 21, 18, 25, 22, 19, 26, 23, 20,
    15, 12, 9, 30, 31, 32, 33, 34, 35,
    36, 37, 27, 39, 40, 28, 42, 43, 29,
    45, 46, 47, 48, 49, 50, 51, 52, 53,
  ],
  B: [
    11, 14, 17, 3, 4, 5, 6, 7, 8,
    9, 10, 35, 12, 13, 34, 15, 16, 33,
    18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 36, 39, 42,
    2, 37, 38, 1, 40, 41, 0, 43, 44,
    51, 48, 45, 52, 49, 46, 53, 50, 47,
  ],
  L: [
    53, 1, 2, 50, 4, 5, 47, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16, 17,
    0, 19, 20, 3, 22, 23, 6, 25, 26,
    18, 28, 29, 21, 31, 32, 24, 34, 35,
    42, 39, 36, 43, 40, 37, 44, 41, 38,
    45, 46, 33, 48, 49, 30, 51, 52, 27,
  ],
  R: [
    0, 1, 20, 3, 4, 23, 6, 7, 26,
    15, 12, 9, 16, 13, 10, 17, 14, 11,
    18, 19, 29, 21, 22, 32, 24, 25, 35,
    27, 28, 51, 30, 31, 48, 33, 34, 45,
    36, 37, 38, 39, 40, 41, 42, 43, 44,
    8, 46, 47, 5, 49, 50, 2, 52, 53,
  ],
};

/**
 * Returns a new solved cube state object.
 */
export function createSolvedState() {
  return {
    U: Array(9).fill('W'),
    R: Array(9).fill('R'),
    F: Array(9).fill('G'),
    D: Array(9).fill('Y'),
    L: Array(9).fill('O'),
    B: Array(9).fill('B'),
  };
}

/**
 * Returns a blank cube state with canonical centers preserved and 48 unpainted stickers ('X').
 */
export function createBlankState() {
  const blank = {
    U: Array(9).fill('X'),
    R: Array(9).fill('X'),
    F: Array(9).fill('X'),
    D: Array(9).fill('X'),
    L: Array(9).fill('X'),
    B: Array(9).fill('X'),
  };
  for (const [face, col] of Object.entries(CANONICAL_CENTERS)) {
    blank[face][4] = col;
  }
  return blank;
}

/**
 * Clones a cube state object.
 */
export function cloneState(state) {
  return {
    U: [...state.U],
    R: [...state.R],
    F: [...state.F],
    D: [...state.D],
    L: [...state.L],
    B: [...state.B],
  };
}

/**
 * Converts state object to a 54-character color string (U, R, F, D, L, B order).
 */
export function stateToString(state) {
  return FACE_NAMES.map((f) => state[f].join('')).join('');
}

/**
 * Converts 54-character color string or state object to state object.
 */
export function stringToState(strOrState) {
  if (typeof strOrState === 'object' && strOrState !== null && strOrState.U) {
    return cloneState(strOrState);
  }
  if (typeof strOrState !== 'string' || strOrState.length !== 54) {
    throw new Error('Expected 54-character string or state object');
  }
  return {
    U: strOrState.slice(0, 9).split(''),
    R: strOrState.slice(9, 18).split(''),
    F: strOrState.slice(18, 27).split(''),
    D: strOrState.slice(27, 36).split(''),
    L: strOrState.slice(36, 45).split(''),
    B: strOrState.slice(45, 54).split(''),
  };
}

/**
 * Converts cube state to 54-character facelet notation (U, R, F, D, L, B chars)
 * matching Kociemba standard definition.
 */
export function stateToFaceletString(state) {
  const str = stateToString(state);
  return str.split('').map((c) => COLOR_TO_FACE[c] || c).join('');
}

/**
 * Converts 54-character facelet notation back to color state object.
 */
export function faceletStringToState(faceletStr) {
  const colors = faceletStr.split('').map((f) => FACE_TO_COLOR[f] || f).join('');
  return stringToState(colors);
}

/**
 * Applies a move notation (e.g., 'R', "R'", 'R2') to a cube state.
 * Returns a new state object (does not mutate the original).
 */
export function applyMove(state, move) {
  const trimmed = move.trim();
  if (!trimmed) return cloneState(state);

  const base = trimmed[0];
  const p = MOVE_PERMUTATIONS[base];
  if (!p) {
    throw new Error(`Unknown move face: ${base} in move "${move}"`);
  }

  const modifier = trimmed.slice(1);
  let times = 1;
  if (modifier === '2') times = 2;
  else if (modifier === "'" || modifier === '3') times = 3;

  // Flatten state into 54-element array
  let current = [
    ...state.U,
    ...state.R,
    ...state.F,
    ...state.D,
    ...state.L,
    ...state.B,
  ];

  for (let t = 0; t < times; t++) {
    const next = new Array(54);
    for (let i = 0; i < 54; i++) {
      next[i] = current[p[i]];
    }
    current = next;
  }

  return {
    U: current.slice(0, 9),
    R: current.slice(9, 18),
    F: current.slice(18, 27),
    D: current.slice(27, 36),
    L: current.slice(36, 45),
    B: current.slice(45, 54),
  };
}

/**
 * Applies an array or space-separated string of moves to state.
 */
export function applyMoves(state, moves) {
  const moveList = Array.isArray(moves)
    ? moves
    : moves.trim().split(/\s+/).filter(Boolean);

  let current = cloneState(state);
  for (const m of moveList) {
    current = applyMove(current, m);
  }
  return current;
}

/**
 * Inverts a single move notation (e.g. R -> R', R' -> R, R2 -> R2).
 */
export function invertMove(move) {
  const trimmed = move.trim();
  if (trimmed.endsWith('2')) return trimmed;
  if (trimmed.endsWith("'")) return trimmed.slice(0, -1);
  return `${trimmed}'`;
}

/**
 * Inverts an array of moves (reverses order and inverts each move).
 */
export function invertMoves(moves) {
  return [...moves].reverse().map(invertMove);
}

/**
 * Checks if all 9 facelets on each of the 6 faces share the same color.
 */
export function isSolved(state) {
  for (const f of FACE_NAMES) {
    const face = state[f];
    const first = face[0];
    if (!first || first === 'X') return false;
    for (let i = 1; i < 9; i++) {
      if (face[i] !== first) return false;
    }
  }
  return true;
}

// Canonical definitions of corners and edges for validation
// Ordered to align with standard Kociemba definitions:
// [U, R, F, D, L, B] with facelet offsets 0, 9, 18, 27, 36, 45
export const CORNER_SLOTS = [
  // 0: URF -> [U8, R0, F2]
  [['U', 8], ['R', 0], ['F', 2]],
  // 1: UFL -> [U6, F0, L2]
  [['U', 6], ['F', 0], ['L', 2]],
  // 2: ULB -> [U0, L0, B2]
  [['U', 0], ['L', 0], ['B', 2]],
  // 3: UBR -> [U2, B0, R2]
  [['U', 2], ['B', 0], ['R', 2]],
  // 4: DFR -> [D2, F8, R6]
  [['D', 2], ['F', 8], ['R', 6]],
  // 5: DLF -> [D0, L8, F6]
  [['D', 0], ['L', 8], ['F', 6]],
  // 6: DBL -> [D6, B8, L6]
  [['D', 6], ['B', 8], ['L', 6]],
  // 7: DRB -> [D8, R8, B6]
  [['D', 8], ['R', 8], ['B', 6]],
];

export const CANONICAL_CORNER_COLORS = [
  ['W', 'R', 'G'], // 0: URF
  ['W', 'G', 'O'], // 1: UFL
  ['W', 'O', 'B'], // 2: ULB
  ['W', 'B', 'R'], // 3: UBR
  ['Y', 'G', 'R'], // 4: DFR
  ['Y', 'O', 'G'], // 5: DLF
  ['Y', 'B', 'O'], // 6: DBL
  ['Y', 'R', 'B'], // 7: DRB
];

export const EDGE_SLOTS = [
  // 0: UR -> [U5, R1]
  [['U', 5], ['R', 1]],
  // 1: UF -> [U7, F1]
  [['U', 7], ['F', 1]],
  // 2: UL -> [U3, L1]
  [['U', 3], ['L', 1]],
  // 3: UB -> [U1, B1]
  [['U', 1], ['B', 1]],
  // 4: DR -> [D5, R7]
  [['D', 5], ['R', 7]],
  // 5: DF -> [D1, F7]
  [['D', 1], ['F', 7]],
  // 6: DL -> [D3, L7]
  [['D', 3], ['L', 7]],
  // 7: DB -> [D7, B7]
  [['D', 7], ['B', 7]],
  // 8: FR -> [F5, R3]
  [['F', 5], ['R', 3]],
  // 9: FL -> [F3, L5]
  [['F', 3], ['L', 5]],
  // 10: BL -> [B5, L3]
  [['B', 5], ['L', 3]],
  // 11: BR -> [B3, R5]
  [['B', 3], ['R', 5]],
];

export const CANONICAL_EDGE_COLORS = [
  ['W', 'R'], // 0: UR
  ['W', 'G'], // 1: UF
  ['W', 'O'], // 2: UL
  ['W', 'B'], // 3: UB
  ['Y', 'R'], // 4: DR
  ['Y', 'G'], // 5: DF
  ['Y', 'O'], // 6: DL
  ['Y', 'B'], // 7: DB
  ['G', 'R'], // 8: FR
  ['G', 'O'], // 9: FL
  ['B', 'O'], // 10: BL
  ['B', 'R'], // 11: BR
];

function getPermutationParity(perm) {
  let inversions = 0;
  for (let i = 0; i < perm.length; i++) {
    for (let j = i + 1; j < perm.length; j++) {
      if (perm[i] > perm[j]) inversions++;
    }
  }
  return inversions % 2;
}

/**
 * Validates a cube state for physical Rubik's cube solvability:
 * a) Exactly 9 facelets for each of the 6 colors (W, Y, G, B, O, R).
 * b) Center pieces (index 4 of each face) are in fixed canonical positions.
 * c) Edge parity and corner parity validation (no impossible twist/swap states).
 *
 * Returns: { isValid: boolean, errorKey?: string, details?: string }
 */
export function validateCubeState(stateInput) {
  let state;
  try {
    state = typeof stateInput === 'string' ? stringToState(stateInput) : stateInput;
  } catch (err) {
    return {
      isValid: false,
      errorKey: 'invalid_format',
      details: err.message,
    };
  }

  // 1. Check face structure
  for (const f of FACE_NAMES) {
    if (!state[f] || !Array.isArray(state[f]) || state[f].length !== 9) {
      return {
        isValid: false,
        errorKey: 'invalid_format',
        details: `Face ${f} must be an array of length 9.`,
      };
    }
  }

  // 1.5 Check for unpainted / blank facelets ('X')
  let blankCount = 0;
  for (const f of FACE_NAMES) {
    for (let i = 0; i < 9; i++) {
      if (state[f][i] === 'X' || !state[f][i]) {
        blankCount++;
      }
    }
  }

  if (blankCount > 0) {
    return {
      isValid: false,
      errorKey: 'unpainted_stickers',
      blankCount,
      details: `${blankCount} stickers remaining to be painted.`,
    };
  }

  // 2. Color counts
  const colorCounts = { W: 0, Y: 0, G: 0, B: 0, O: 0, R: 0 };
  for (const f of FACE_NAMES) {
    for (let i = 0; i < 9; i++) {
      const c = state[f][i];
      if (colorCounts[c] === undefined) {
        return {
          isValid: false,
          errorKey: 'invalid_color',
          details: `Unrecognized color '${c}' at face ${f}, index ${i}.`,
        };
      }
      colorCounts[c]++;
    }
  }

  for (const [col, count] of Object.entries(colorCounts)) {
    if (count !== 9) {
      return {
        isValid: false,
        errorKey: 'invalid_color_count',
        details: `Color '${col}' has ${count} facelets (expected 9).`,
      };
    }
  }

  // 3. Center pieces canonical check
  for (const [face, expectedColor] of Object.entries(CANONICAL_CENTERS)) {
    if (state[face][4] !== expectedColor) {
      return {
        isValid: false,
        errorKey: 'invalid_centers',
        details: `Center piece for face ${face} is '${state[face][4]}', expected '${expectedColor}'.`,
      };
    }
  }

  // 4. Corners check and twist validation
  const cornerPerm = [];
  let totalCornerTwist = 0;

  for (let slotIdx = 0; slotIdx < 8; slotIdx++) {
    const slots = CORNER_SLOTS[slotIdx];
    const actualColors = slots.map(([face, idx]) => state[face][idx]);

    // Find which canonical corner this piece is
    let matchedCorner = -1;
    let twist = -1;

    for (let canIdx = 0; canIdx < 8; canIdx++) {
      const canColors = CANONICAL_CORNER_COLORS[canIdx];
      // Check if actualColors is a cyclic shift of canColors
      for (let shift = 0; shift < 3; shift++) {
        if (
          actualColors[shift] === canColors[0] &&
          actualColors[(shift + 1) % 3] === canColors[1] &&
          actualColors[(shift + 2) % 3] === canColors[2]
        ) {
          matchedCorner = canIdx;
          twist = shift;
          break;
        }
      }
      if (matchedCorner !== -1) break;
    }

    if (matchedCorner === -1) {
      return {
        isValid: false,
        errorKey: 'invalid_corners',
        details: `Invalid corner piece found at position ${slotIdx}: colors [${actualColors.join(', ')}].`,
      };
    }

    if (cornerPerm.includes(matchedCorner)) {
      return {
        isValid: false,
        errorKey: 'invalid_corners',
        details: `Duplicate corner piece #${matchedCorner} at position ${slotIdx}.`,
      };
    }

    cornerPerm.push(matchedCorner);
    totalCornerTwist += twist;
  }

  if (totalCornerTwist % 3 !== 0) {
    return {
      isValid: false,
      errorKey: 'corner_twist_error',
      details: `Corner twist parity error (total twist mod 3 = ${totalCornerTwist % 3}).`,
    };
  }

  // 5. Edges check and flip validation
  const edgePerm = [];
  let totalEdgeFlip = 0;

  for (let slotIdx = 0; slotIdx < 12; slotIdx++) {
    const slots = EDGE_SLOTS[slotIdx];
    const actualColors = slots.map(([face, idx]) => state[face][idx]);

    let matchedEdge = -1;
    let flip = -1;

    for (let canIdx = 0; canIdx < 12; canIdx++) {
      const canColors = CANONICAL_EDGE_COLORS[canIdx];
      if (actualColors[0] === canColors[0] && actualColors[1] === canColors[1]) {
        matchedEdge = canIdx;
        flip = 0;
        break;
      }
      if (actualColors[0] === canColors[1] && actualColors[1] === canColors[0]) {
        matchedEdge = canIdx;
        flip = 1;
        break;
      }
    }

    if (matchedEdge === -1) {
      return {
        isValid: false,
        errorKey: 'invalid_edges',
        details: `Invalid edge piece found at position ${slotIdx}: colors [${actualColors.join(', ')}].`,
      };
    }

    if (edgePerm.includes(matchedEdge)) {
      return {
        isValid: false,
        errorKey: 'invalid_edges',
        details: `Duplicate edge piece #${matchedEdge} at position ${slotIdx}.`,
      };
    }

    edgePerm.push(matchedEdge);
    totalEdgeFlip += flip;
  }

  if (totalEdgeFlip % 2 !== 0) {
    return {
      isValid: false,
      errorKey: 'edge_flip_error',
      details: `Edge flip parity error (total flip mod 2 = ${totalEdgeFlip % 2}).`,
    };
  }

  // 6. Permutation parity check (corners parity must match edges parity)
  const cornerParity = getPermutationParity(cornerPerm);
  const edgeParity = getPermutationParity(edgePerm);

  if (cornerParity !== edgeParity) {
    return {
      isValid: false,
      errorKey: 'parity_error',
      details: `Permutation parity error: corner parity (${cornerParity}) does not match edge parity (${edgeParity}).`,
    };
  }

  return { isValid: true };
}
