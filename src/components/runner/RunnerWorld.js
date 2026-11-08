'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StickFigure from './StickFigure';
import Door from './Door';
import { useRunnerLoop } from './useRunnerLoop';
import { RUNNER_DEFAULTS } from '@/data/runnerWorlds';
import styles from './runner.module.css';

function getOverlapDoor(playerWorldX, doors) {
  if (!doors?.length) return null;

  return doors.find((door) => {
    const width = door.width || RUNNER_DEFAULTS.doorWidth;
    const left = door.x - width / 2;
    const right = door.x + width / 2;
    return playerWorldX + RUNNER_DEFAULTS.figureWidth > left && playerWorldX - RUNNER_DEFAULTS.figureWidth < right;
  });
}

export default function RunnerWorld({
  worldWidth,
  doors = [],
  hint,
  initialX,
  runSpeed,
  playerScreenRatio,
}) {
  const viewportRef = useRef(null);
  const router = useRouter();
  const [viewportWidth, setViewportWidth] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  const {
    playerWorldX,
    cameraX,
    isMoving,
    direction,
    setHoldDirection,
  } = useRunnerLoop({
    worldWidth,
    viewportWidth,
    initialX,
    runSpeed,
    playerScreenRatio,
    keyTargetRef: viewportRef,
  });

  const activeDoor = getOverlapDoor(playerWorldX, doors);
  const playerVisualX = playerWorldX - cameraX;
  const hasRight = doors.some((door) => door.x > playerWorldX + 70);
  const hasLeft = doors.some((door) => door.x < playerWorldX - 70);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => setViewportWidth(viewport.clientWidth || 800);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const handleRunStart = useCallback(
    (nextDirection) => setHoldDirection(nextDirection),
    [setHoldDirection],
  );

  const handleRunEnd = useCallback(() => setHoldDirection(0), [setHoldDirection]);

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' || !activeDoor) return;
    if (event.target !== event.currentTarget) return;

    event.preventDefault();

    if (activeDoor.external) {
      window.location.assign(activeDoor.href);
      return;
    }

    router.push(activeDoor.href);
  };

  const runnerHint = hint || 'Run with ← → or the buttons. Stop at a door to open it.';

  return (
    <div className={styles.runnerRoot}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        tabIndex={0}
        role="region"
        aria-label="Interactive index: run to a door to open it"
        aria-describedby="runner-hint"
        onKeyDown={handleKeyDown}
        onPointerDown={() => viewportRef.current?.focus({ preventScroll: true })}
      >
        <p className={styles.hintBar} id="runner-hint">
          {runnerHint}
        </p>

        {hasLeft ? (
          <span className={`${styles.edgeArrow} ${styles.edgeArrowLeft}`} aria-hidden="true">
            ←
          </span>
        ) : null}
        {hasRight ? (
          <span className={`${styles.edgeArrow} ${styles.edgeArrowRight}`} aria-hidden="true">
            →
          </span>
        ) : null}

        <div
          className={styles.world}
          style={{ width: worldWidth, transform: `translateX(${-cameraX}px)` }}
        >
          <div className={styles.wall} aria-hidden="true" />
          <div className={styles.floor} aria-hidden="true" />

          {doors.map((door) => (
            <Door key={door.id} door={door} isActive={activeDoor?.id === door.id} />
          ))}
        </div>

        <div className={styles.playerSlot} style={{ left: playerVisualX - 42 }}>
          <StickFigure isMoving={isMoving} direction={direction} className={styles.stickCanvas} />
        </div>

        {isMobile ? (
          <div className={styles.mobileControls}>
            <button
              type="button"
              className={styles.runButton}
              aria-label="Run left"
              onPointerDown={(event) => {
                event.preventDefault();
                handleRunStart(-1);
              }}
              onPointerUp={handleRunEnd}
              onPointerLeave={handleRunEnd}
              onPointerCancel={handleRunEnd}
            >
              ←
            </button>
            <button
              type="button"
              className={`${styles.runButton} ${styles.runButtonAccent}`}
              aria-label="Run right"
              onPointerDown={(event) => {
                event.preventDefault();
                handleRunStart(1);
              }}
              onPointerUp={handleRunEnd}
              onPointerLeave={handleRunEnd}
              onPointerCancel={handleRunEnd}
            >
              →
            </button>
          </div>
        ) : null}

        <span className="srOnly" aria-live="polite">
          {activeDoor ? `At the ${activeDoor.label} door.` : ''}
        </span>
      </div>

      <div className={styles.directory}>
        <span className={styles.directoryLabel}>Or jump straight there</span>
        <div className={styles.directoryLinks}>
          {doors.map((door) =>
            door.external ? (
              <a key={door.id} href={door.href} className={styles.directoryLink}>
                {door.label}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link key={door.id} href={door.href} className={styles.directoryLink}>
                {door.label}
                <span aria-hidden="true">→</span>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
