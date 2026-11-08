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
  keyTargetRef,
}) {
  const [playerWorldX, setPlayerWorldX] = useState(initialX);
  const [isMoving, setIsMoving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const keysRef = useRef({ left: false, right: false });
  const holdDirectionRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const playerWorldXRef = useRef(initialX);
  const directionRef = useRef(1);

  const playerScreenX = Math.max(72, viewportWidth * playerScreenRatio);
  const cameraX = Math.round(
    Math.max(
      0,
      Math.min(playerWorldX - playerScreenX, Math.max(0, worldWidth - viewportWidth)),
    ),
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
    if (!enabled) return;

    const target = keyTargetRef?.current;
    if (!target) return;

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        keysRef.current.left = true;
        event.preventDefault();
      }
      if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        keysRef.current.right = true;
        event.preventDefault();
      }
    };

    const onKeyUp = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        keysRef.current.left = false;
      }
      if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        keysRef.current.right = false;
      }
    };

    const onBlur = (event) => {
      if (event.relatedTarget && target.contains(event.relatedTarget)) return;

      keysRef.current.left = false;
      keysRef.current.right = false;
      holdDirectionRef.current = 0;
    };

    const onVisibility = () => setIsPaused(document.hidden);

    target.addEventListener('keydown', onKeyDown);
    target.addEventListener('keyup', onKeyUp);
    target.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      target.removeEventListener('keydown', onKeyDown);
      target.removeEventListener('keyup', onKeyUp);
      target.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled, keyTargetRef]);

  useEffect(() => {
    if (!enabled || isPaused) {
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
        const next = Math.max(
          40,
          Math.min(worldWidth - 40, playerWorldXRef.current + inputDirection * runSpeed * delta),
        );
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
  }, [enabled, isPaused, runSpeed, worldWidth]);

  const setHoldDirection = useCallback((holdingDirection) => {
    holdDirectionRef.current = holdingDirection;
  }, []);

  return {
    playerWorldX,
    cameraX,
    isMoving,
    direction,
    setHoldDirection,
  };
}
