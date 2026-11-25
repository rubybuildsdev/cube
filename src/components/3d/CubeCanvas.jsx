/**
 * CubeCanvas - Interactive 3D Rubik's Cube Canvas Component
 * Powered by Three.js and OrbitControls.
 * Features studio lighting, smooth damping, contact shadow,
 * sticker raycasting/hover, and seamless slice rotation animations.
 */

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RubiksCubeModel } from './RubiksCubeModel.js';
import {
  CUBE_COLORS,
  normalizeCubeState,
  getSolvedCubeState,
} from './cubeConstants.js';
import { playClickSound } from '../../utils/audio.js';

/**
 * Creates soft circular contact shadow texture via offscreen canvas
 */
function createContactShadowTexture(size = 512) {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const center = size / 2;
  const radius = size / 2;

  const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  gradient.addColorStop(0.2, 'rgba(0, 0, 0, 0.60)');
  gradient.addColorStop(0.45, 'rgba(0, 0, 0, 0.25)');
  gradient.addColorStop(0.75, 'rgba(0, 0, 0, 0.05)');
  gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const CubeCanvas = forwardRef(function CubeCanvas(
  {
    cubeSize = 3,
    cubeState = null,
    isPaintMode = false,
    selectedColor = null,
    onStickerClick = null,
    onStickerHover = null,
    onMoveStart = null,
    onMoveEnd = null,
    playbackSpeed = 1,
    showShadow = true,
    autoRotate = false,
    className = '',
    style = {},
  },
  ref
) {
  const containerRef = useRef(null);

  // References to Three.js engine instances
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const cubeModelRef = useRef(null);
  const shadowMeshRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // References for latest props in event listeners/callbacks
  const propsRef = useRef({
    isPaintMode,
    selectedColor,
    onStickerClick,
    onStickerHover,
    onMoveStart,
    onMoveEnd,
    playbackSpeed,
    autoRotate,
  });

  useEffect(() => {
    propsRef.current = {
      isPaintMode,
      selectedColor,
      onStickerClick,
      onStickerHover,
      onMoveStart,
      onMoveEnd,
      playbackSpeed,
      autoRotate,
    };
  }, [
    isPaintMode,
    selectedColor,
    onStickerClick,
    onStickerHover,
    onMoveStart,
    onMoveEnd,
    playbackSpeed,
    autoRotate,
  ]);

  // Synchronize cube state when prop changes
  useEffect(() => {
    if (cubeModelRef.current && cubeState && cubeSize === 3) {
      cubeModelRef.current.updateStickersFromState(cubeState);
    }
  }, [cubeState, cubeSize]);

  // Synchronize cube size when prop changes
  useEffect(() => {
    if (!sceneRef.current) return;
    if (cubeModelRef.current && cubeModelRef.current.size !== cubeSize) {
      cubeModelRef.current.dispose();
      const newModel = new RubiksCubeModel(sceneRef.current, cubeSize);
      if (cubeSize === 3 && cubeState) {
        newModel.updateStickersFromState(cubeState);
      }
      cubeModelRef.current = newModel;
    }
  }, [cubeSize, cubeState]);

  // Update hover highlight when paint mode or selectedColor toggles
  useEffect(() => {
    if (cubeModelRef.current && cubeModelRef.current.hoveredSticker) {
      cubeModelRef.current.setHoveredSticker(
        cubeModelRef.current.hoveredSticker,
        isPaintMode,
        selectedColor
      );
    }
  }, [isPaintMode, selectedColor]);

  // Expose imperative API through ref
  useImperativeHandle(
    ref,
    () => ({
      executeMove: (move, animated = true) => {
        if (!cubeModelRef.current) return;
        cubeModelRef.current.executeMove(
          move,
          animated,
          propsRef.current.playbackSpeed,
          propsRef.current.onMoveStart,
          propsRef.current.onMoveEnd
        );
      },
      getCubeState: () => {
        if (!cubeModelRef.current) return getSolvedCubeState();
        return cubeModelRef.current.getCubeState();
      },
      setCubeState: (newState) => {
        if (!cubeModelRef.current) return;
        cubeModelRef.current.updateStickersFromState(newState);
      },
      isAnimating: () => {
        if (!cubeModelRef.current) return false;
        return cubeModelRef.current.isAnimating();
      },
      stopAnimation: () => {
        if (!cubeModelRef.current) return;
        cubeModelRef.current.stopAnimation();
      },
      resetCamera: () => {
        if (!cameraRef.current || !controlsRef.current) return;
        cameraRef.current.position.set(4.5, 3.8, 6.0);
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      },
    }),
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera: 45° FOV, 3/4 isometric viewpoint
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(4.5, 3.8, 6.0);
    cameraRef.current = camera;

    // 3. Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls with smooth damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.5;
    controls.maxDistance = 14.0;
    controls.enablePan = false;
    controls.rotateSpeed = 0.85;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 5. Studio Lighting Setup (Neutral Physical Studio Setup)
    // Ambient Light for clean shadow lift
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Neutral Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // Soft Neutral Fill Light (No cold blue tint)
    const fillLight = new THREE.DirectionalLight(0xf1f5f9, 0.6);
    fillLight.position.set(-5, 2, -4);
    scene.add(fillLight);

    // Subtle Overhead Light
    const overheadLight = new THREE.DirectionalLight(0xffffff, 0.4);
    overheadLight.position.set(0, 8, 0);
    scene.add(overheadLight);

    // 6. Subtle Circular Contact Shadow Underneath (Radius 3.2, Opacity 0.42)
    if (showShadow) {
      const shadowGeo = new THREE.PlaneGeometry(6.4, 6.4);
      const shadowTexture = createContactShadowTexture(512);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.y = -1.95;
      scene.add(shadowMesh);
      shadowMeshRef.current = shadowMesh;
    }

    // 7. Instantiate RubiksCubeModel
    const cubeModel = new RubiksCubeModel(scene, cubeSize);
    if (cubeState && cubeSize === 3) {
      cubeModel.updateStickersFromState(cubeState);
    }
    cubeModelRef.current = cubeModel;

    // 8. Raycasting & Pointer Events for Sticker Hover and Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };
    let isPointerDown = false;

    function getIntersectedSticker(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubeModel.stickerMeshes, false);
      if (intersects.length > 0) {
        return intersects[0].object;
      }
      return null;
    }

    const onPointerDown = (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      isPointerDown = true;
    };

    const onPointerMove = (e) => {
      if (isPointerDown) {
        // While dragging the camera around, clear hover highlight so it feels natural
        const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
        if (dist > 5) {
          cubeModel.clearHover();
          renderer.domElement.style.cursor = 'grab';
          propsRef.current.onStickerHover?.(null);
          return;
        }
      }

      const sticker = getIntersectedSticker(e);
      if (sticker) {
        renderer.domElement.style.cursor = 'pointer';
        cubeModel.setHoveredSticker(
          sticker,
          propsRef.current.isPaintMode,
          propsRef.current.selectedColor
        );
        const { face, index } = sticker.userData;
        const color = cubeModel.currentState[face]?.[index];
        propsRef.current.onStickerHover?.({ face, index, color });
      } else {
        renderer.domElement.style.cursor = isPointerDown ? 'grab' : 'default';
        cubeModel.clearHover();
        propsRef.current.onStickerHover?.(null);
      }
    };

    const onPointerUp = (e) => {
      isPointerDown = false;
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      // Only treat as sticker click if movement was minimal (< 6px)
      if (dist < 6) {
        const sticker = getIntersectedSticker(e);
        if (sticker) {
          try {
            playClickSound();
          } catch {
            // Audio fallback
          }
          const { face, index } = sticker.userData;
          const color = cubeModel.currentState[face]?.[index];
          propsRef.current.onStickerClick?.({ face, index, color });
        }
      }
      renderer.domElement.style.cursor = 'default';
    };

    const onPointerLeave = () => {
      isPointerDown = false;
      renderer.domElement.style.cursor = 'default';
      cubeModel.clearHover();
      propsRef.current.onStickerHover?.(null);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('pointerleave', onPointerLeave);

    // 9. ResizeObserver for responsive canvas layout
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 10. IntersectionObserver + Animation render loop
    let isVisible = true;
    const intersectionObserver = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
          },
          { threshold: 0 }
        )
      : null;
    if (intersectionObserver) {
      intersectionObserver.observe(container);
    }

    let lastTime = performance.now();
    const renderLoop = (time) => {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);

      // Update cube slice rotations
      cubeModel.update(time);

      // Auto-rotation when idle if enabled
      if (propsRef.current.autoRotate && !cubeModel.isAnimating()) {
        cubeModel.cubeRootGroup.rotation.y += 0.005;
      }

      // Smooth damping update
      controls.update();

      if (isVisible) {
        renderer.render(scene, camera);
      }
      lastTime = time;
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    // 11. Comprehensive cleanup routine on unmount to prevent leaks
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }

      intersectionObserver?.disconnect();
      resizeObserver.disconnect();

      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('pointerleave', onPointerLeave);

      controls.dispose();
      cubeModel.dispose();

      // Dispose shadow
      if (shadowMeshRef.current) {
        if (shadowMeshRef.current.geometry) shadowMeshRef.current.geometry.dispose();
        if (shadowMeshRef.current.material) {
          if (shadowMeshRef.current.material.map) {
            shadowMeshRef.current.material.map.dispose();
          }
          shadowMeshRef.current.material.dispose();
        }
        scene.remove(shadowMeshRef.current);
      }

      // Dispose lights
      [ambientLight, keyLight, fillLight, overheadLight].forEach((l) => {
        scene.remove(l);
        if (l.dispose) l.dispose();
      });

      renderer.dispose();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }

      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
      cubeModelRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden touch-none ${className}`}
      style={{
        minHeight: '380px',
        ...style,
      }}
    />
  );
});

export default CubeCanvas;
