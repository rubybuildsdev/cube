/**
 * Comprehensive verification suite for Rubik's Cube Solver:
 * - Cube representation & validation (color counts, centers, parity, twist, flip).
 * - Scramble generation & application.
 * - Herbert Kociemba Two-Phase optimal solver.
 * - 7-phase Layer-by-Layer (LBL) beginner solver.
 */

import {
  createSolvedState,
  cloneState,
  applyMove,
  applyMoves,
  isSolved,
  validateCubeState,
  stateToString,
  stringToState,
  stateToFaceletString,
  faceletStringToState,
} from '../src/solver/cubeState.js';

import {
  generateScramble,
  generateScrambleString,
  applyScramble,
} from '../src/solver/scramble.js';

import {
  initKociemba,
  solveKociemba,
  solveKociembaString,
  isKociembaInitialized,
} from '../src/solver/kociemba.js';

import {
  solveBeginnerLBL,
  solveBeginnerLBLMoves,
  BEGINNER_PHASES,
} from '../src/solver/beginnerLBL.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (!condition) {
    failed++;
    console.error(`❌ FAIL: ${message}`);
    throw new Error(message);
  }
  passed++;
  console.log(`✅ PASS: ${message}`);
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('Running CubeSolver Test Suite (cubeState, scramble, Kociemba, LBL)');
  console.log('='.repeat(60));

  // 1. Solved Cube Recognition
  console.log('\n--- Test 1: Solved State Recognition ---');
  const solved = createSolvedState();
  assert(isSolved(solved) === true, 'Solved cube is recognized as solved');
  const solvedVal = validateCubeState(solved);
  assert(solvedVal.isValid === true, 'Solved cube state passes physical validation');
  assert(solveKociemba(solved).length === 0, 'Kociemba returns empty moves array on solved cube');
  assert(solveBeginnerLBL(solved).length === 0, 'Beginner LBL returns empty steps array on solved cube');

  // 2. State Validation Checks
  console.log('\n--- Test 2: Cube State Validation ---');

  // 2a. Invalid color count (10 Red, 8 White)
  const badColors = cloneState(solved);
  badColors.U[0] = 'R';
  const valBadColors = validateCubeState(badColors);
  assert(
    valBadColors.isValid === false && valBadColors.errorKey === 'invalid_color_count',
    'Flags invalid color count when facelet count != 9 per color'
  );

  // 2b. Invalid centers (swapped White and Yellow centers)
  const badCenters = cloneState(solved);
  badCenters.U[4] = 'Y';
  badCenters.D[4] = 'W';
  const valBadCenters = validateCubeState(badCenters);
  assert(
    valBadCenters.isValid === false && valBadCenters.errorKey === 'invalid_centers',
    'Flags non-canonical center pieces'
  );

  // 2c. Single corner twist error
  const twistState = cloneState(solved);
  const tU = twistState.U[8];
  twistState.U[8] = twistState.R[0];
  twistState.R[0] = twistState.F[2];
  twistState.F[2] = tU;
  const valTwist = validateCubeState(twistState);
  assert(
    valTwist.isValid === false && valTwist.errorKey === 'corner_twist_error',
    'Flags single twisted corner parity error'
  );

  // 2d. Single edge flip error
  const flipState = cloneState(solved);
  const tmpEdge = flipState.U[5];
  flipState.U[5] = flipState.R[1];
  flipState.R[1] = tmpEdge;
  const valFlip = validateCubeState(flipState);
  assert(
    valFlip.isValid === false && valFlip.errorKey === 'edge_flip_error',
    'Flags single flipped edge parity error'
  );

  // 2e. Permutation parity error (swapping two edges only)
  const swapState = cloneState(solved);
  const tU5 = swapState.U[5]; const tR1 = swapState.R[1];
  swapState.U[5] = swapState.U[7]; swapState.R[1] = swapState.F[1];
  swapState.U[7] = tU5; swapState.F[1] = tR1;
  const valSwap = validateCubeState(swapState);
  assert(
    valSwap.isValid === false && valSwap.errorKey === 'parity_error',
    'Flags impossible permutation parity (swap 2 edges without swapping corners)'
  );

  // 2f. Unpainted / Blank Cube State ('X')
  const { createBlankState } = await import('../src/solver/cubeState.js');
  const blankState = createBlankState();
  assert(isSolved(blankState) === false, 'Blank state is not recognized as solved');
  const valBlank = validateCubeState(blankState);
  assert(
    valBlank.isValid === false && valBlank.errorKey === 'unpainted_stickers' && valBlank.blankCount === 48,
    'Flags 48 unpainted stickers in blank state gracefully'
  );

  // 3. Move Representation & Sexy Move Cycle
  console.log('\n--- Test 3: Moves & Permutations ---');
  let sCycle = createSolvedState();
  for (let i = 0; i < 6; i++) {
    sCycle = applyMoves(sCycle, "R U R' U'");
  }
  assert(isSolved(sCycle) === true, '(R U R\' U\') * 6 returns to solved state');

  // 4. WCA Scramble Generation
  console.log('\n--- Test 4: WCA Scramble Generation ---');
  const scramble = generateScramble(20);
  assert(scramble.length === 20, 'Generates exactly 20 moves by default');

  let hasConsecutive = false;
  for (let i = 0; i < scramble.length - 1; i++) {
    if (scramble[i][0] === scramble[i + 1][0]) {
      hasConsecutive = true;
      break;
    }
  }
  assert(!hasConsecutive, 'No two consecutive moves act on the same face');

  const scrambledState = applyScramble(null, scramble);
  assert(isSolved(scrambledState) === false, 'Scrambled cube is not solved');
  const valScramble = validateCubeState(scrambledState);
  assert(valScramble.isValid === true, 'Scrambled cube state is physically valid and solvable');

  // 5. Kociemba Two-Phase Optimal Solver
  console.log('\n--- Test 5: Herbert Kociemba Optimal Solver ---');
  console.time('Kociemba Table Init');
  await initKociemba();
  console.timeEnd('Kociemba Table Init');
  assert(isKociembaInitialized() === true, 'Kociemba lookup tables are initialized');

  const kociembaTrials = 5;
  for (let t = 0; t < kociembaTrials; t++) {
    const scr = generateScramble(20);
    const scrState = applyScramble(null, scr);

    console.time(`Kociemba Trial ${t + 1}`);
    const solution = solveKociemba(scrState);
    console.timeEnd(`Kociemba Trial ${t + 1}`);

    assert(solution.length > 0 && solution.length <= 22, `Kociemba solution length is optimal (${solution.length} moves)`);
    const endState = applyMoves(scrState, solution);
    assert(isSolved(endState) === true, `Kociemba solution properly solves random scramble #${t + 1}`);
  }

  // 6. Beginner Layer-by-Layer (LBL) 7-Phase Solver
  console.log('\n--- Test 6: Beginner Layer-by-Layer (LBL) Solver ---');
  assert(BEGINNER_PHASES.length === 7, 'Beginner LBL defines all 7 sequential pedagogical phases');

  const lblTrials = 3;
  for (let t = 0; t < lblTrials; t++) {
    const scr = generateScramble(20);
    const scrState = applyScramble(null, scr);

    console.time(`LBL Trial ${t + 1}`);
    const steps = solveBeginnerLBL(scrState);
    console.timeEnd(`LBL Trial ${t + 1}`);

    assert(steps.length > 0, `LBL produces solution steps (${steps.length} moves total)`);

    // Verify step object structure
    const firstStep = steps[0];
    assert(
      firstStep.move &&
      typeof firstStep.phaseId === 'number' &&
      typeof firstStep.phaseNameId === 'string' &&
      typeof firstStep.descKey === 'string',
      'Step objects match required format { move, phaseId, phaseNameId, descKey }'
    );

    // Verify phases present
    const phaseIdsSeen = new Set(steps.map((s) => s.phaseId));
    assert(phaseIdsSeen.has(1), 'Solution includes Phase 1 (White Cross)');
    assert(phaseIdsSeen.has(2), 'Solution includes Phase 2 (White Corners)');
    assert(phaseIdsSeen.has(3), 'Solution includes Phase 3 (Middle Layer)');

    // Verify all steps solve the cube
    const movesOnly = steps.map((s) => s.move);
    const endState = applyMoves(scrState, movesOnly);
    assert(isSolved(endState) === true, `Beginner LBL properly solves random scramble #${t + 1}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log(`SUMMARY: ${passed} Passed, ${failed} Failed.`);
  console.log('='.repeat(60));
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
