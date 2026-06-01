'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RUNNER_DEFAULTS } from '@/data/runnerWorlds';

export function useRunnerLoop({
  worldWidth,
  viewportWidth,
  enabled = true,
  initialX = RUNNER_DEFAULTS.playerStartX,
  runSpeed = RUNNER_DEFAULTS.runSpeed,
  playerScreenRatio = RUNNER_DEFAULTS.playerScreenRatio,
}) {
  const [playerWorldX, setPlayerWorldX] = useState(initialX);
  const [isMoving, setIsMoving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [direction, setDirection] = useState(1);

  const keysRef = useRef({ left: false, right: false });
  const holdDirectionRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const playerWorldXRef = useRef(initialX);
  const directionRef = useRef(1);

  const playerScreenX = Math.max(80, viewportWidth * playerScreenRatio);

  // Round to whole pixels: a fractional translateX on the world blurs frame
  // text, especially at high mobile device-pixel ratios.
  const cameraX = Math.round(
    Math.max(0, Math.min(playerWorldX - playerScreenX, Math.max(0, worldWidth - viewportWidth)))
  );

  useEffect(() => {
    playerWorldXRef.current = playerWorldX;
  }, [playerWorldX]);

  useEffect(() => {
    setPlayerWorldX(initialX);
    playerWorldXRef.current = initialX;
  }, [initialX]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener('change', updateMotion);
    return () => motionQuery.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
        e.preventDefault();
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
        e.preventDefault();
      }
    };

    const onKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false;
    };

    const onVisibility = () => setIsPaused(document.hidden);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled, reducedMotion]);

  useEffect(() => {
    if (!enabled || reducedMotion || isPaused) {
      setIsMoving(false);
      return;
    }

    const tick = (time) => {
      rafRef.current = requestAnimationFrame(tick);

      const delta =
        lastTimeRef.current === null
          ? 0
          : Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const keyboardDirection =
        (keysRef.current.right ? 1 : 0) - (keysRef.current.left ? 1 : 0);
      const inputDirection = holdDirectionRef.current || keyboardDirection;

      if (inputDirection !== 0 && directionRef.current !== inputDirection) {
        directionRef.current = inputDirection;
        setDirection(inputDirection);
      }

      if (inputDirection !== 0) {
        const next = Math.max(40, Math.min(worldWidth - 40, playerWorldXRef.current + inputDirection * runSpeed * delta));
        const didMove = Math.abs(next - playerWorldXRef.current) > 0.1;
        setIsMoving(didMove);
        playerWorldXRef.current = next;
        setPlayerWorldX(next);
      } else {
        setIsMoving(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [enabled, reducedMotion, isPaused, runSpeed, worldWidth]);

  const setHoldDirection = useCallback((holdingDirection) => {
    holdDirectionRef.current = holdingDirection;
  }, []);

  const moveTo = useCallback(
    (x) => {
      const clamped = Math.max(40, Math.min(worldWidth - 40, x));
      playerWorldXRef.current = clamped;
      setPlayerWorldX(clamped);
    },
    [worldWidth]
  );

  return {
    playerWorldX,
    playerScreenX,
    cameraX,
    isMoving,
    direction,
    reducedMotion,
    setHoldDirection,
    moveTo,
  };
}
