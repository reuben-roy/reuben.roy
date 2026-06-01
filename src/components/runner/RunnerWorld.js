'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import StickFigure from './StickFigure';
import Door from './Door';
import { useRunnerLoop } from './useRunnerLoop';
import { RUNNER_DEFAULTS } from '@/data/runnerWorlds';
import styles from './runner.module.css';

function getOverlapDoor(playerWorldX, doors) {
  if (!doors?.length) return null;
  const halfWidth = RUNNER_DEFAULTS.figureWidth;
  return doors.find((door) => {
    const doorWidth =
      door.width ||
      (door.variant === 'return' ? RUNNER_DEFAULTS.returnDoorWidth : RUNNER_DEFAULTS.doorWidth);
    const doorLeft = door.x - doorWidth / 2;
    const doorRight = door.x + doorWidth / 2;
    return playerWorldX + halfWidth > doorLeft && playerWorldX - halfWidth < doorRight;
  });
}

function toThemeVars(theme = {}) {
  const vars = {};
  if (theme.background) vars['--background'] = theme.background;
  if (theme.foreground) vars['--foreground'] = theme.foreground;
  if (theme.accent) vars['--accent'] = theme.accent;
  return vars;
}

export default function RunnerWorld({
  worldWidth,
  doors = [],
  children,
  mobileContent,
  fullPage = false,
  intro,
  pauseLoop = false,
  snapPoints = [],
  theme,
  hudLink,
  hint,
  initialX,
  runSpeed,
  playerScreenRatio,
}) {
  const router = useRouter();
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  const {
    playerWorldX,
    playerScreenX,
    cameraX,
    isMoving,
    direction,
    reducedMotion,
    setHoldDirection,
    moveTo,
  } = useRunnerLoop({
    worldWidth,
    viewportWidth,
    enabled: !pauseLoop,
    initialX,
    runSpeed,
    playerScreenRatio,
  });

  const activeDoor = getOverlapDoor(playerWorldX, doors);
  const playerVisualX = reducedMotion ? playerScreenX : playerWorldX - cameraX;

  // Points of interest the player can head toward (doors + frame snap points).
  const poiXs = [...doors.map((d) => d.x), ...snapPoints.map((p) => p.x)];
  const hasRight = poiXs.some((x) => x > playerWorldX + 70);
  const hasLeft = poiXs.some((x) => x < playerWorldX - 70);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const update = () => setViewportWidth(viewport.clientWidth || 800);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!activeDoor || reducedMotion) return;
    const onKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        router.push(activeDoor.href);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDoor, reducedMotion, router]);

  const handleRunStart = useCallback(
    (nextDirection) => setHoldDirection(nextDirection),
    [setHoldDirection]
  );
  const handleRunEnd = useCallback(() => setHoldDirection(0), [setHoldDirection]);

  const rootClass = [styles.runnerRoot, fullPage ? styles.runnerRootFullPage : '']
    .filter(Boolean)
    .join(' ');

  const reducedMotionDoors = hudLink
    ? doors.filter((door) => door.href !== hudLink.href || door.label !== hudLink.label)
    : doors;

  const runnerHint = hint || 'Use ← → or A / D to run · press Enter at a glowing door';

  // Reduced-motion: drop the animated stage entirely for a readable static layout.
  if (reducedMotion) {
    return (
      <section className={rootClass} aria-label="Interactive corridor" style={toThemeVars(theme)}>
        {mobileContent ? <div className={styles.mobileContentZone}>{mobileContent}</div> : null}
        {reducedMotionDoors.length > 0 || hudLink ? (
          <nav className={styles.reducedMotionNav} aria-label="Quick navigation">
            {hudLink ? (
              <a href={hudLink.href} className={styles.doorFallbackLink}>
                {hudLink.label}
              </a>
            ) : null}
            {reducedMotionDoors.map((door) => (
              <a key={door.id} href={door.href} className={styles.doorFallbackLink}>
                {door.label}
              </a>
            ))}
          </nav>
        ) : null}
      </section>
    );
  }

  return (
    <section className={rootClass} aria-label="Interactive corridor" style={toThemeVars(theme)}>
      <div className={styles.runnerStrip}>
        <div className={styles.viewport} ref={viewportRef}>
          <div className={styles.topFade} aria-hidden="true" />

          {hudLink ? (
            <a href={hudLink.href} className={styles.hudLink}>
              ◂ {hudLink.label}
            </a>
          ) : null}

          <div className={styles.hintBar}>{runnerHint}</div>

          {hasLeft ? (
            <div className={`${styles.edgeArrow} ${styles.edgeArrowLeft}`} aria-hidden="true">
              ◀
            </div>
          ) : null}
          {hasRight ? (
            <div className={`${styles.edgeArrow} ${styles.edgeArrowRight}`} aria-hidden="true">
              ▶
            </div>
          ) : null}

          {snapPoints.length > 0 ? (
            <div className={styles.snapNav}>
              {snapPoints.map((point) => (
                <button
                  key={point.id}
                  type="button"
                  className={styles.projectNavBtn}
                  onClick={() => moveTo(point.x)}
                >
                  {point.label}
                </button>
              ))}
            </div>
          ) : null}

          <div
            className={styles.world}
            style={{ width: worldWidth, transform: `translateX(${-cameraX}px)` }}
          >
            <div className={styles.wall} />
            <div className={styles.parallaxGlow} />
            <div className={styles.floor} />
            <div className={styles.floorLane} />

            {doors.map((door) => (
              <Door
                key={door.id}
                door={door}
                isActive={activeDoor?.id === door.id}
                reducedMotion={reducedMotion}
              />
            ))}

            {children}
          </div>

          <div className={styles.playerSlot} style={{ left: playerVisualX - 42 }}>
            <StickFigure isMoving={isMoving} direction={direction} className={styles.stickCanvas} />
          </div>

          {isMobile ? (
            <div className={styles.mobileControls}>
              <button
                type="button"
                className={styles.runButton}
                onPointerDown={() => handleRunStart(-1)}
                onPointerUp={handleRunEnd}
                onPointerLeave={handleRunEnd}
                onPointerCancel={handleRunEnd}
              >
                ◂
              </button>
              <button
                type="button"
                className={`${styles.runButton} ${styles.runButtonAccent}`}
                onPointerDown={() => handleRunStart(1)}
                onPointerUp={handleRunEnd}
                onPointerLeave={handleRunEnd}
                onPointerCancel={handleRunEnd}
              >
                ▸
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
