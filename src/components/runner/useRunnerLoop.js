'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const LEFT_KEYS = new Set(['ArrowLeft', 'a', 'A']);
const RIGHT_KEYS = new Set(['ArrowRight', 'd', 'D']);

function isTypingTarget(target) {
  if (!target || !(target instanceof HTMLElement)) return false;
  return target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
}

// Drives the corridor: keyboard runs the player, `glideTo` walks it to a
// station (chapter rail, focus), and `nudge` moves it directly (swipe, wheel).
// Keys are read at window level while `isActiveRef` says the corridor owns them.
export function useRunnerLoop({
  worldWidth,
  viewportWidth,
  initialX,
  runSpeed,
  playerScreenRatio,
  isActiveRef,
}) {
  const [playerWorldX, setPlayerWorldX] = useState(initialX);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState(1);

  const keysRef = useRef({ left: false, right: false });
  const holdDirectionRef = useRef(0);
  const targetRef = useRef(null);
  const xRef = useRef(initialX);
  const directionRef = useRef(1);
  const worldRef = useRef(worldWidth);
  worldRef.current = worldWidth;

  const playerScreenX = Math.max(72, viewportWidth * playerScreenRatio);
  const maxCamera = Math.max(0, worldWidth - viewportWidth);
  const cameraX = Math.round(Math.max(0, Math.min(playerWorldX - playerScreenX, maxCamera)));

  const clamp = useCallback((x) => Math.max(40, Math.min(worldRef.current - 40, x)), []);

  const face = useCallback((next) => {
    if (next === 0 || directionRef.current === next) return;
    directionRef.current = next;
    setDirection(next);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!isActiveRef.current?.() || isTypingTarget(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (LEFT_KEYS.has(event.key)) keysRef.current.left = true;
      else if (RIGHT_KEYS.has(event.key)) keysRef.current.right = true;
      else return;
      targetRef.current = null;
      event.preventDefault();
    };

    const onKeyUp = (event) => {
      if (LEFT_KEYS.has(event.key)) keysRef.current.left = false;
      if (RIGHT_KEYS.has(event.key)) keysRef.current.right = false;
    };

    const release = () => {
      keysRef.current = { left: false, right: false };
      holdDirectionRef.current = 0;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', release);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', release);
    };
  }, [isActiveRef]);

  useEffect(() => {
    let frame = null;
    let last = null;

    const tick = (time) => {
      frame = requestAnimationFrame(tick);
      const delta = last === null ? 0 : Math.min((time - last) / 1000, 0.05);
      last = time;

      const keyDirection = (keysRef.current.right ? 1 : 0) - (keysRef.current.left ? 1 : 0);
      const input = holdDirectionRef.current || keyDirection;
      let next = xRef.current;

      if (input !== 0) {
        targetRef.current = null;
        face(input);
        next = clamp(xRef.current + input * runSpeed * delta);
      } else if (targetRef.current !== null) {
        const distance = targetRef.current - xRef.current;
        const step = Math.max(runSpeed * 1.8, Math.abs(distance) * 2.4) * delta;
        face(Math.sign(distance));
        if (Math.abs(distance) <= step) {
          next = targetRef.current;
          targetRef.current = null;
        } else {
          next = xRef.current + Math.sign(distance) * step;
        }
      }

      const moved = Math.abs(next - xRef.current) > 0.1;
      setIsMoving(moved);
      if (moved) {
        xRef.current = next;
        setPlayerWorldX(next);
      }
    };

    const start = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      last = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [clamp, face, runSpeed]);

  const setHoldDirection = useCallback((next) => {
    holdDirectionRef.current = next;
    if (next !== 0) targetRef.current = null;
  }, []);

  const glideTo = useCallback(
    (x, { instant = false } = {}) => {
      const target = clamp(x);
      if (instant) {
        targetRef.current = null;
        xRef.current = target;
        setPlayerWorldX(target);
        return;
      }
      targetRef.current = target;
    },
    [clamp],
  );

  const nudge = useCallback(
    (dx) => {
      targetRef.current = null;
      face(Math.sign(dx));
      xRef.current = clamp(xRef.current + dx);
      setPlayerWorldX(xRef.current);
    },
    [clamp, face],
  );

  return { playerWorldX, cameraX, playerScreenX, isMoving, direction, setHoldDirection, glideTo, nudge };
}
