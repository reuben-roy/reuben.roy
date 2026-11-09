'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isExternalHref } from '@/components/SiteLink';
import PixelArt from '@/components/pixel/PixelArt';
import StickFigure from './StickFigure';
import Door from './Door';
import { useRunnerLoop } from './useRunnerLoop';
import styles from './runner.module.css';

const FIGURE_HALF = 26;
const DOOR_HALF = 60;

// Turns the station list into world coordinates for the current viewport, so
// one frame always fits on screen, from a phone up to a wide monitor.
function layoutWorld(stations, viewportWidth) {
  const compact = viewportWidth < 640;
  const margin = compact ? 20 : 48;
  const gap = compact ? 150 : 260;
  const doorSpacing = compact ? 150 : 210;
  const playerScreenX = Math.max(72, viewportWidth * 0.18);
  const centerOn = (x) => x - viewportWidth / 2 + playerScreenX;

  const frames = [];
  const doors = [];
  const props = [];
  const chapters = [];
  let cursor = null;

  stations.forEach((station, index) => {
    if (station.kind === 'frame') {
      const width = Math.min(station.width, viewportWidth - margin * 2);
      if (cursor === null) cursor = Math.max(margin, (viewportWidth - width) / 2);
      const x = cursor + width / 2;
      frames.push({ ...station, x, width });
      chapters.push({ id: station.id, label: station.chapter, target: index === 0 ? null : centerOn(x) });
      cursor += width;
    } else if (station.kind === 'doors') {
      const start = cursor + doorSpacing * 0.6;
      station.doors.forEach((door, i) => doors.push({ ...door, x: start + i * doorSpacing }));
      const groupCenter = start + ((station.doors.length - 1) * doorSpacing) / 2;
      chapters.push({ id: station.id, label: station.chapter, target: centerOn(groupCenter) });
      cursor = start + (station.doors.length - 1) * doorSpacing + doorSpacing * 0.6;
    }

    const next = stations[index + 1];
    if (next) {
      if (station.prop) props.push({ id: `${station.id}-prop`, sprite: station.prop, x: cursor + gap / 2 });
      cursor += next.kind === 'doors' ? gap / 2 : gap;
    }
  });

  const last = frames[frames.length - 1];
  const worldWidth = Math.max(cursor + margin, last ? last.x + viewportWidth / 2 : 0);
  return { worldWidth, frames, doors, props, chapters, playerStart: playerScreenX };
}

function findDoor(x, doors) {
  return doors.find((door) => Math.abs(door.x - x) < DOOR_HALF + FIGURE_HALF * 0.4) || null;
}

export default function RunnerWorld({ stations, label = 'Interactive portfolio corridor' }) {
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const railRef = useRef(null);
  const visibleRef = useRef(true);
  const router = useRouter();
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [ready, setReady] = useState(false);

  const world = useMemo(() => layoutWorld(stations, viewportWidth), [stations, viewportWidth]);

  const isActiveRef = useRef(() => false);
  isActiveRef.current = () => {
    if (!visibleRef.current) return false;
    const active = document.activeElement;
    return !active || active === document.body || rootRef.current?.contains(active);
  };

  const { playerWorldX, cameraX, isMoving, direction, setHoldDirection, glideTo, nudge } = useRunnerLoop({
    worldWidth: world.worldWidth,
    viewportWidth,
    initialX: world.playerStart,
    runSpeed: viewportWidth < 640 ? 420 : 560,
    playerScreenRatio: 0.18,
    isActiveRef,
  });

  const activeDoor = findDoor(playerWorldX, world.doors);
  const chapterIndex = world.chapters.reduce(
    (found, chapter, index) => ((chapter.target ?? 0) <= playerWorldX + 60 ? index : found),
    0,
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const update = () => setViewportWidth(viewport.clientWidth || 1280);
    update();
    setReady(true);
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  // A resize re-lays the world out; keep the visitor at the same stop.
  const chapterRef = useRef(0);
  chapterRef.current = chapterIndex;
  useEffect(() => {
    const current = world.chapters[chapterRef.current];
    glideTo(current?.target ?? world.playerStart, { instant: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportWidth]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.intersectionRatio >= 0.4;
      },
      { threshold: [0, 0.4, 1] },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const openDoor = useCallback(
    (door) => {
      if (isExternalHref(door.href)) window.location.assign(door.href);
      else router.push(door.href);
    },
    [router],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Enter' || !activeDoor || !isActiveRef.current()) return;
      const active = document.activeElement;
      if (active && active !== document.body && active !== viewportRef.current) return;
      event.preventDefault();
      openDoor(activeDoor);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeDoor, openDoor]);

  // Horizontal trackpad swipes run the corridor; vertical scroll stays the page's.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      nudge(event.deltaX);
    };
    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [nudge]);

  // Touch drag: pull the corridor like a strip of film.
  const dragRef = useRef(null);
  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse') return;
    dragRef.current = { x: event.clientX, y: event.clientY, horizontal: null };
  };
  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (drag.horizontal === null && Math.hypot(dx, dy) > 8) drag.horizontal = Math.abs(dx) > Math.abs(dy);
    if (!drag.horizontal) return;
    nudge(-dx * 1.3);
    drag.x = event.clientX;
    drag.y = event.clientY;
  };
  const endDrag = () => {
    dragRef.current = null;
  };

  const goToChapter = (chapter) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    glideTo(chapter.target ?? world.playerStart, { instant: reduce });
  };

  const goToStop = (id) => {
    const stop = world.chapters.find((item) => item.id === id);
    if (stop) goToChapter(stop);
  };

  // Keep the active chapter visible in the rail without moving the page.
  useEffect(() => {
    const rail = railRef.current;
    const button = rail?.querySelector('[aria-current="step"]');
    if (!rail || !button) return;
    const left = button.offsetLeft - rail.clientWidth / 2 + button.clientWidth / 2;
    rail.scrollTo({ left, behavior: 'smooth' });
  }, [chapterIndex]);

  const holdProps = (dir) => ({
    onPointerDown: (event) => {
      event.preventDefault();
      setHoldDirection(dir);
    },
    onPointerUp: () => setHoldDirection(0),
    onPointerLeave: () => setHoldDirection(0),
    onPointerCancel: () => setHoldDirection(0),
    onKeyDown: (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        nudge(dir * 120);
      }
    },
  });

  const chapter = world.chapters[chapterIndex];

  return (
    <section ref={rootRef} className={styles.root} aria-label={label} data-ready={ready || undefined}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onScroll={(event) => {
          event.currentTarget.scrollLeft = 0;
          event.currentTarget.scrollTop = 0;
        }}
      >
        <div className={styles.backdrop} style={{ backgroundPositionX: `${-cameraX * 0.35}px` }} aria-hidden="true" />

        <div className={styles.world} style={{ width: world.worldWidth, transform: `translate3d(${-cameraX}px,0,0)` }}>
          {world.frames.map((frame, index) => (
            <article
              key={frame.id}
              id={`station-${frame.id}`}
              className={`${styles.frame} ${index === chapterIndex ? styles.frameCurrent : ''}`}
              style={{ left: frame.x - frame.width / 2, width: frame.width }}
              aria-labelledby={`plaque-${frame.id}`}
              onFocus={() => {
                const target = world.chapters.find((c) => c.id === frame.id)?.target;
                glideTo(target ?? world.playerStart, { instant: true });
              }}
            >
              <p className={styles.plaque} id={`plaque-${frame.id}`}>
                <span className={styles.plaqueIndex}>{String(index + 1).padStart(2, '0')}</span>
                {frame.plaque}
              </p>
              <div className={styles.frameBody}>
                {typeof frame.content === 'function' ? frame.content({ goTo: goToStop }) : frame.content}
              </div>
            </article>
          ))}

          {world.props.map((prop) => (
            <PixelArt key={prop.id} name={prop.sprite} className={styles.prop} style={{ left: prop.x }} />
          ))}

          {world.doors.map((door) => (
            <Door key={door.id} door={door} isActive={activeDoor?.id === door.id} />
          ))}

          <div className={styles.ground} aria-hidden="true" />
        </div>

        <div
          className={styles.player}
          style={{ transform: `translate3d(${playerWorldX - cameraX - FIGURE_HALF}px,0,0)` }}
          aria-hidden="true"
        >
          <StickFigure isMoving={isMoving} direction={direction} className={styles.figure} />
        </div>

        <div className={styles.hud}>
          <p className={styles.hint}>
            <span className={styles.keys} aria-hidden="true">
              <kbd>←</kbd>
              <kbd>→</kbd>
            </span>
            <span className={styles.hintDesktop}>Run the corridor. Enter at a door.</span>
            <span className={styles.hintTouch}>Swipe or hold the arrows.</span>
          </p>
          <p className={styles.counter} aria-hidden="true">
            <span>{String(chapterIndex + 1).padStart(2, '0')}</span>
            <span className={styles.counterTotal}>/ {String(world.chapters.length).padStart(2, '0')}</span>
          </p>
        </div>

        <p className="srOnly" aria-live="polite">
          {activeDoor ? `At the ${activeDoor.label} door. Press Enter to open.` : chapter ? `${chapter.label}` : ''}
        </p>
      </div>

      <nav className={styles.rail} aria-label="Corridor stops">
        <button type="button" className={styles.runButton} aria-label="Run left" {...holdProps(-1)}>
          ←
        </button>
        <ol ref={railRef} className={styles.chapters}>
          {world.chapters.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.chapter}
                aria-current={index === chapterIndex ? 'step' : undefined}
                onClick={() => goToChapter(item)}
              >
                <span className={styles.chapterIndex}>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className={`${styles.runButton} ${styles.runButtonAccent}`} aria-label="Run right" {...holdProps(1)}>
          →
        </button>
      </nav>
    </section>
  );
}
