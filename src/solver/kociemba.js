/**
 * High-performance client-side 3x3 Rubik's Cube solver based on
 * Herbert Kociemba's Two-Phase Algorithm.
 *
 * Typically finds solutions in ~20-22 moves within milliseconds.
 */

import Cube from 'cubejs';
import {
  isSolved,
  stateToFaceletString,
  stringToState,
  validateCubeState,
} from './cubeState.js';

let isInitialized = false;
let initPromise = null;

/**
 * Initializes Kociemba's move and pruning lookup tables.
 * This takes ~2-3 seconds on first call and is cached permanently.
 */
export function initKociemba() {
  if (isInitialized) return Promise.resolve();
  if (initPromise) return initPromise;

  initPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!isInitialized) {
          Cube.initSolver();
          isInitialized = true;
        }
        resolve();
      } catch (err) {
        initPromise = null;
        reject(err);
      }
    }, 0);
  });

  return initPromise;
}

/**
 * Synchronous initialization if already running in an environment where
 * blocking is acceptable (or pre-warming on worker startup).
 */
export function initKociembaSync() {
  if (!isInitialized) {
    Cube.initSolver();
    isInitialized = true;
  }
}

/**
 * Returns true if Kociemba pruning tables are ready.
 */
export function isKociembaInitialized() {
  return isInitialized;
}

/**
 * Solves any valid 3x3 Rubik's Cube state using Kociemba's Two-Phase Algorithm.
 *
 * @param {object|string} stateInput State object { U, R, F, D, L, B } or 54-char string
 * @param {number} maxDepth Maximum solution depth (default: 22)
 * @returns {string[]} Array of move notations (e.g. ['U', "R'", 'F2', ...])
 */
export function solveKociemba(stateInput, maxDepth = 22) {
  // Synchronously initialize if not already done
  initKociembaSync();

  const state = typeof stateInput === 'string'
    ? stringToState(stateInput)
    : stateInput;

  // If already solved, return empty array immediately
  if (isSolved(state)) {
    return [];
  }

  // Validate state
  const validation = validateCubeState(state);
  if (!validation.isValid) {
    throw new Error(
      `Cannot solve invalid cube state: [${validation.errorKey}] ${validation.details || ''}`
    );
  }

  const faceletStr = stateToFaceletString(state);
  const cube = Cube.fromString(faceletStr);
  const solutionStr = cube.solve(maxDepth);

  if (!solutionStr) {
    return [];
  }

  return solutionStr.trim().split(/\s+/).filter(Boolean);
}

/**
 * Solves cube state and returns solution as a single space-separated string.
 *
 * @param {object|string} stateInput
 * @param {number} maxDepth
 * @returns {string} Space-separated move string (e.g. "U R' F2 ...")
 */
export function solveKociembaString(stateInput, maxDepth = 22) {
  return solveKociemba(stateInput, maxDepth).join(' ');
}
