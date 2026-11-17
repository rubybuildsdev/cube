/**
 * RubiksCubeModel - Three.js 3D Rubik's Cube Model & Animation Engine
 * Manages the 27 cubies, 54 vinyl stickers, slice rotations, easing,
 * hover glow highlights, and raycasting.
 */

import * as THREE from 'three';
import {
  CUBE_COLORS,
  INNER_PLASTIC_COLOR,
  HIGHLIGHT_COLOR,
  FACES,
  MOVE_SPECS,
  ALL_STICKERS,
  normalizeCubeState,
  applyMoveToState,
  getFaceAndIndex,
} from './cubeConstants.js';
import { playTurnSound } from '../../utils/audio.js';

/**
 * Cubic easeInOut for realistic mechanical movement
 */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Creates rounded rectangle sticker geometry with extruded bevel
 */
function createStickerGeometry(width = 0.83, height = 0.83, radius = 0.08, depth = 0.012) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return new THREE.ExtrudeGeometry(shape, {
    depth: depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.007,
    bevelThickness: 0.007,
  });
}

export class RubiksCubeModel {
  constructor(scene, size = 3) {
    this.scene = scene;
    this.size = Math.max(2, Math.min(7, parseInt(size, 10) || 3));

    // Main root group containing all cubies
    this.cubeRootGroup = new THREE.Group();
    this.cubeRootGroup.name = 'RubiksCubeRoot';
    this.scene.add(this.cubeRootGroup);

    // Pivot group for animating slice rotations
    this.pivotGroup = new THREE.Group();
    this.pivotGroup.name = 'RubiksCubePivot';
    this.scene.add(this.pivotGroup);

    // Shared geometries and inner plastic material
    this.cubieGeometry = new THREE.BoxGeometry(0.94, 0.94, 0.94);
    this.cubieMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(INNER_PLASTIC_COLOR),
      roughness: 0.48,
      metalness: 0.02,
    });
    this.stickerGeometry = createStickerGeometry();

    // Map: 'U_0' -> sticker Mesh
    this.stickersMap = new Map();
    // Array of all sticker meshes for fast raycasting
    this.stickerMeshes = [];
    // Array of cubie meshes
    this.cubieMeshes = [];

    // State tracking
    this.currentState = normalizeCubeState(null);
    this.moveQueue = [];
    this.currentAnimation = null;
    this.hoveredSticker = null;

    this.buildCube();
  }

  buildNxNCube() {
    const N = this.size;
    const half = (N - 1) / 2;
    const coords = [];
    for (let i = 0; i < N; i++) {
      coords.push(i - half);
    }
    const EPS = 0.01;

    for (const x of coords) {
      for (const y of coords) {
        for (const z of coords) {
          const isOuter = (
            Math.abs(Math.abs(x) - half) < EPS ||
            Math.abs(Math.abs(y) - half) < EPS ||
            Math.abs(Math.abs(z) - half) < EPS
          );
          if (!isOuter) continue;

          const cubie = new THREE.Mesh(this.cubieGeometry, this.cubieMaterial);
          cubie.position.set(x, y, z);
          cubie.userData = {
            initialX: x,
            initialY: y,
            initialZ: z,
            isCubie: true,
          };
          this.cubieMeshes.push(cubie);
          this.cubeRootGroup.add(cubie);

          // Outer face stickers
          const facesToAdd = [];
          if (Math.abs(y - half) < EPS) facesToAdd.push({ face: 'U', color: CUBE_COLORS.W });
          if (Math.abs(y - (-half)) < EPS) facesToAdd.push({ face: 'D', color: CUBE_COLORS.Y });
          if (Math.abs(z - half) < EPS) facesToAdd.push({ face: 'F', color: CUBE_COLORS.G });
          if (Math.abs(z - (-half)) < EPS) facesToAdd.push({ face: 'B', color: CUBE_COLORS.B });
          if (Math.abs(x - (-half)) < EPS) facesToAdd.push({ face: 'L', color: CUBE_COLORS.O });
          if (Math.abs(x - half) < EPS) facesToAdd.push({ face: 'R', color: CUBE_COLORS.R });

          for (const item of facesToAdd) {
            const stickerMat = new THREE.MeshStandardMaterial({
              color: new THREE.Color(item.color),
              roughness: 0.35,
              metalness: 0.01,
              emissive: new THREE.Color(0x000000),
              emissiveIntensity: 0,
            });
            const stickerMesh = new THREE.Mesh(this.stickerGeometry, stickerMat);
            stickerMesh.userData = {
              isSticker: true,
              face: item.face,
              cubie: cubie,
            };

            const offset = 0.471;
            switch (item.face) {
              case 'U':
                stickerMesh.rotation.x = -Math.PI / 2;
                stickerMesh.position.set(0, offset, 0);
                break;
              case 'D':
                stickerMesh.rotation.x = Math.PI / 2;
                stickerMesh.position.set(0, -offset, 0);
                break;
              case 'F':
                stickerMesh.rotation.set(0, 0, 0);
                stickerMesh.position.set(0, 0, offset);
                break;
              case 'B':
                stickerMesh.rotation.y = Math.PI;
                stickerMesh.position.set(0, 0, -offset);
                break;
              case 'L':
                stickerMesh.rotation.y = -Math.PI / 2;
                stickerMesh.position.set(-offset, 0, 0);
                break;
              case 'R':
                stickerMesh.rotation.y = Math.PI / 2;
                stickerMesh.position.set(offset, 0, 0);
                break;
            }
            cubie.add(stickerMesh);
            this.stickerMeshes.push(stickerMesh);
          }
        }
      }
    }

    const scaleFactor = 3 / N;
    this.cubeRootGroup.scale.setScalar(scaleFactor);
    this.pivotGroup.scale.setScalar(scaleFactor);
  }

  buildCube() {
    if (this.size !== 3) {
      this.buildNxNCube();
      return;
    }

    this.cubeRootGroup.scale.setScalar(1);
    this.pivotGroup.scale.setScalar(1);
    for (const x of [-1, 0, 1]) {
      for (const y of [-1, 0, 1]) {
        for (const z of [-1, 0, 1]) {
          const cubie = new THREE.Mesh(this.cubieGeometry, this.cubieMaterial);
          cubie.position.set(x, y, z);
          cubie.userData = {
            initialX: x,
            initialY: y,
            initialZ: z,
            isCubie: true,
          };
          this.cubieMeshes.push(cubie);
          this.cubeRootGroup.add(cubie);

          // Attach outer stickers
          this.attachStickersToCubie(cubie, x, y, z);
        }
      }
    }
    this.updateStickersFromState(this.currentState);
  }

  attachStickersToCubie(cubie, x, y, z) {
    const facesToAdd = [];
    if (y === 1) facesToAdd.push({ face: 'U', normal: { x: 0, y: 1, z: 0 } });
    if (y === -1) facesToAdd.push({ face: 'D', normal: { x: 0, y: -1, z: 0 } });
    if (z === 1) facesToAdd.push({ face: 'F', normal: { x: 0, y: 0, z: 1 } });
    if (z === -1) facesToAdd.push({ face: 'B', normal: { x: 0, y: 0, z: -1 } });
    if (x === -1) facesToAdd.push({ face: 'L', normal: { x: -1, y: 0, z: 0 } });
    if (x === 1) facesToAdd.push({ face: 'R', normal: { x: 1, y: 0, z: 0 } });

    for (const item of facesToAdd) {
      const info = getFaceAndIndex(x, y, z, item.normal.x, item.normal.y, item.normal.z);
      if (!info) continue;

      const initialColor = this.currentState[info.face][info.index] || 'W';
      const hexColor = CUBE_COLORS[initialColor] || CUBE_COLORS.W;

      const stickerMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(hexColor),
        roughness: 0.35,
        metalness: 0.01,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
      });

      const stickerMesh = new THREE.Mesh(this.stickerGeometry, stickerMat);
      stickerMesh.userData = {
        isSticker: true,
        face: info.face,
        index: info.index,
        cubie: cubie,
      };

      // Position sticker slightly above cubie face (0.471)
      const offset = 0.471;
      switch (info.face) {
        case 'U':
          stickerMesh.rotation.x = -Math.PI / 2;
          stickerMesh.position.set(0, offset, 0);
          break;
        case 'D':
          stickerMesh.rotation.x = Math.PI / 2;
          stickerMesh.position.set(0, -offset, 0);
          break;
        case 'F':
          stickerMesh.rotation.set(0, 0, 0);
          stickerMesh.position.set(0, 0, offset);
          break;
        case 'B':
          stickerMesh.rotation.y = Math.PI;
          stickerMesh.position.set(0, 0, -offset);
          break;
        case 'L':
          stickerMesh.rotation.y = -Math.PI / 2;
          stickerMesh.position.set(-offset, 0, 0);
          break;
        case 'R':
          stickerMesh.rotation.y = Math.PI / 2;
          stickerMesh.position.set(offset, 0, 0);
          break;
      }

      cubie.add(stickerMesh);
      const key = `${info.face}_${info.index}`;
      this.stickersMap.set(key, stickerMesh);
      this.stickerMeshes.push(stickerMesh);
    }
  }

  /**
   * Synchronizes sticker materials with given cubeState
   */
  updateStickersFromState(state) {
    if (this.size !== 3) return;
    this.currentState = normalizeCubeState(state);
    for (const face of FACES) {
      const facelets = this.currentState[face];
      for (let i = 0; i < 9; i++) {
        const key = `${face}_${i}`;
        const mesh = this.stickersMap.get(key);
        if (mesh && mesh.material) {
          const colorKey = facelets[i] || 'W';
          const hex = CUBE_COLORS[colorKey] || colorKey;
          mesh.material.color.set(hex);
          if (colorKey === 'X') {
            mesh.material.roughness = 0.85;
            mesh.material.metalness = 0.0;
          } else {
            mesh.material.roughness = 0.35;
            mesh.material.metalness = 0.01;
          }
        }
      }
    }
  }

  /**
   * Sets glowing hover highlight on a sticker
   */
  setHoveredSticker(stickerMesh, isPaintMode = false, selectedColor = null) {
    if (this.hoveredSticker === stickerMesh) return;

    // Reset previous sticker highlight
    if (this.hoveredSticker && this.hoveredSticker.material) {
      this.hoveredSticker.material.emissive.setHex(0x000000);
      this.hoveredSticker.material.emissiveIntensity = 0;
    }

    this.hoveredSticker = stickerMesh;

    if (stickerMesh && stickerMesh.material) {
      if (isPaintMode && selectedColor) {
        const hex = CUBE_COLORS[selectedColor] || selectedColor;
        stickerMesh.material.emissive.set(hex);
        stickerMesh.material.emissiveIntensity = 0.40;
      } else {
        stickerMesh.material.emissive.set(0xffffff);
        stickerMesh.material.emissiveIntensity = 0.25;
      }
    }
  }

  clearHover() {
    if (this.hoveredSticker && this.hoveredSticker.material) {
      this.hoveredSticker.material.emissive.setHex(0x000000);
      this.hoveredSticker.material.emissiveIntensity = 0;
    }
    this.hoveredSticker = null;
  }

  /**
   * Finds the 9 cubies in the specified slice
   */
  getCubiesInSlice(sliceCoord, sliceVal) {
    const list = [];
    for (const cubie of this.cubieMeshes) {
      if (Math.round(cubie.position[sliceCoord]) === sliceVal) {
        list.push(cubie);
      }
    }
    return list;
  }

  /**
   * Executes a move notation (e.g. "R", "U'", "F2")
   */
  executeMove(move, animated = true, playbackSpeed = 1, onMoveStart = null, onMoveEnd = null) {
    let movesList = [];
    if (Array.isArray(move)) {
      movesList = move;
    } else if (typeof move === 'string') {
      movesList = move.trim().split(/\s+/).filter(Boolean);
    }

    if (movesList.length === 0) return;

    if (!animated) {
      // Instant snap execution: cancel any running animation, apply all moves immediately
      if (this.currentAnimation) {
        this.finishCurrentAnimation(false);
      }
      for (const m of movesList) {
        this.currentState = applyMoveToState(this.currentState, m);
      }
      this.updateStickersFromState(this.currentState);
      if (onMoveEnd) {
        onMoveEnd(movesList[movesList.length - 1], this.currentState);
      }
      return;
    }

    // Push moves to queue
    for (let i = 0; i < movesList.length; i++) {
      this.moveQueue.push({
        move: movesList[i],
        playbackSpeed,
        onMoveStart: i === 0 ? onMoveStart : null,
        onMoveEnd: i === movesList.length - 1 ? onMoveEnd : null,
      });
    }

    if (!this.currentAnimation) {
      this.processNextMoveInQueue();
    }
  }

  processNextMoveInQueue() {
    if (this.moveQueue.length === 0) return;

    const item = this.moveQueue.shift();
    const spec = MOVE_SPECS[item.move];
    if (!spec) {
      this.processNextMoveInQueue();
      return;
    }

    const speed = Math.max(0.25, Math.min(item.playbackSpeed || 1, 6));
    const isDouble = item.move.includes('2');
    const baseDuration = isDouble ? 270 : 210;
    const duration = baseDuration / speed;

    try {
      playTurnSound(speed);
    } catch {
      // Audio fallback
    }

    if (item.onMoveStart) {
      item.onMoveStart(item.move);
    }

    // Collect 9 cubies in slice
    const sliceCubies = this.getCubiesInSlice(spec.sliceCoord, spec.sliceVal);

    // Reset pivot
    this.pivotGroup.position.set(0, 0, 0);
    this.pivotGroup.rotation.set(0, 0, 0);
    this.pivotGroup.updateMatrixWorld(true);

    // Attach cubies to pivot group preserving world matrix
    for (const cubie of sliceCubies) {
      this.pivotGroup.attach(cubie);
    }

    this.currentAnimation = {
      move: item.move,
      spec,
      duration,
      startTime: performance.now(),
      sliceCubies,
      onMoveEnd: item.onMoveEnd,
      playbackSpeed: item.playbackSpeed,
    };
  }

  finishCurrentAnimation(triggerCallback = true) {
    if (!this.currentAnimation) return;

    const anim = this.currentAnimation;
    this.currentAnimation = null;

    // Snap pivot to target angle
    this.pivotGroup.rotation[anim.spec.axis] = anim.spec.angle;
    this.pivotGroup.updateMatrixWorld(true);

    // Detach cubies back to root group
    for (const cubie of anim.sliceCubies) {
      this.cubeRootGroup.attach(cubie);
    }

    // Apply move permutation to internal 54-facelet state
    this.currentState = applyMoveToState(this.currentState, anim.move);

    // Reset all 27 cubies to canonical unrotated positions
    for (const cubie of this.cubieMeshes) {
      cubie.position.set(
        cubie.userData.initialX,
        cubie.userData.initialY,
        cubie.userData.initialZ
      );
      cubie.rotation.set(0, 0, 0);
      cubie.updateMatrixWorld(true);
    }

    // Sync stickers to updated colors
    this.updateStickersFromState(this.currentState);

    // Reset pivot
    this.pivotGroup.rotation.set(0, 0, 0);
    this.pivotGroup.updateMatrixWorld(true);

    if (triggerCallback && anim.onMoveEnd) {
      anim.onMoveEnd(anim.move, this.currentState);
    }

    // Process next queued move if any
    if (this.moveQueue.length > 0) {
      this.processNextMoveInQueue();
    }
  }

  /**
   * Called on every render frame
   */
  update(time = performance.now()) {
    if (this.currentAnimation) {
      const anim = this.currentAnimation;
      const elapsed = time - anim.startTime;
      const t = Math.min(1.0, elapsed / anim.duration);
      const ease = easeInOutCubic(t);

      this.pivotGroup.rotation[anim.spec.axis] = ease * anim.spec.angle;

      if (t >= 1.0) {
        this.finishCurrentAnimation(true);
      }
    }
  }

  isAnimating() {
    return Boolean(this.currentAnimation || this.moveQueue.length > 0);
  }

  stopAnimation() {
    this.moveQueue = [];
    if (this.currentAnimation) {
      this.finishCurrentAnimation(false);
    }
  }

  getCubeState() {
    return {
      U: [...this.currentState.U],
      D: [...this.currentState.D],
      F: [...this.currentState.F],
      B: [...this.currentState.B],
      L: [...this.currentState.L],
      R: [...this.currentState.R],
    };
  }

  /**
   * Disposes all geometries, materials, and references for leak-free unmount
   */
  dispose() {
    this.stopAnimation();

    // Dispose sticker materials and geometries
    for (const sticker of this.stickerMeshes) {
      if (sticker.material) {
        sticker.material.dispose();
      }
    }
    this.stickerMeshes = [];
    this.stickersMap.clear();

    if (this.stickerGeometry) {
      this.stickerGeometry.dispose();
    }

    if (this.cubieMaterial) {
      this.cubieMaterial.dispose();
    }
    if (this.cubieGeometry) {
      this.cubieGeometry.dispose();
    }

    this.cubieMeshes = [];

    if (this.cubeRootGroup) {
      this.scene.remove(this.cubeRootGroup);
    }
    if (this.pivotGroup) {
      this.scene.remove(this.pivotGroup);
    }
  }
}

export default RubiksCubeModel;
