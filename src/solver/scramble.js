/**
 * WCA-compliant scramble generator and applicator for 3x3 Rubik's Cube.
 */

import { createSolvedState, applyMoves } from './cubeState.js';

const FACES = ['U', 'D', 'F', 'B', 'L', 'R'];
const MODIFIERS = ['', "'", '2'];

const AXES = {
  U: 0,
  D: 0,
  F: 1,
  B: 1,
  L: 2,
  R: 2,
};

/**
 * Generates a valid WCA scramble sequence as an array of move strings.
 * Avoids:
 * 1) Consecutive moves on the same face (e.g. R R').
 * 2) Commutative redundancies on opposing faces along the same axis (e.g. U D U).
 *
 * @param {number} length Default 20 moves (standard WCA length)
 * @returns {string[]} Array of move notations, e.g. ["R", "U'", "F2", ...]
 */
export function generateScramble(length = 20) {
  if (length <= 0) return [];

  const moves = [];
  let lastFace = null;
  let secondLastFace = null;

  for (let i = 0; i < length; i++) {
    const candidates = FACES.filter((f) => {
      // Cannot repeat the same face consecutively
      if (f === lastFace) return false;

      // If previous move was on the same axis, cannot pick another move on this axis
      if (lastFace !== null && AXES[f] === AXES[lastFace]) {
        if (secondLastFace !== null && AXES[f] === AXES[secondLastFace]) {
          return false;
        }
      }

      return true;
    });

    const chosenFace = candidates[Math.floor(Math.random() * candidates.length)];
    const chosenMod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
    const move = `${chosenFace}${chosenMod}`;

    moves.push(move);
    secondLastFace = lastFace;
    lastFace = chosenFace;
  }

  return moves;
}

/**
 * Generates a scramble as a space-separated string (e.g. "R U' F2 ...").
 */
export function generateScrambleString(length = 20) {
  return generateScramble(length).join(' ');
}

/**
 * Applies a scramble to a cube state (or solved cube if none provided).
 *
 * @param {object|null} state Initial cube state (defaults to solved cube)
 * @param {string[]|string} scramble Array of moves or space-separated string
 * @returns {object} Scrambled cube state
 */
export function applyScramble(state, scramble) {
  const baseState = state || createSolvedState();
  const moveList = Array.isArray(scramble)
    ? scramble
    : typeof scramble === 'string'
      ? scramble.trim().split(/\s+/).filter(Boolean)
      : [];

  return applyMoves(baseState, moveList);
}
