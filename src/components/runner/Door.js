'use client';

import Link from 'next/link';
import { RUNNER_DEFAULTS } from '@/data/runnerWorlds';
import styles from './runner.module.css';

export default function Door({ door, isActive }) {
  const { label, href, x, blurb, external = false } = door;
  const width = door.width || RUNNER_DEFAULTS.doorWidth;
  const height = door.height || RUNNER_DEFAULTS.doorHeight;
  const Frame = external ? 'a' : Link;

  return (
    <div
      className={`${styles.door} ${isActive ? styles.doorActive : ''}`}
      style={{ left: x - width / 2, width, '--door-height': `${height}px` }}
    >
      <span className={styles.doorSign}>{label}</span>

      <Frame
        href={href}
        className={styles.doorFrame}
        aria-label={external ? `Open ${label} at explosion.fun` : `Open ${label}`}
      >
        <span className={styles.doorArrow} aria-hidden="true">
          {external ? '↗' : '→'}
        </span>
        <span className={styles.doorAction} aria-hidden="true">
          Open
        </span>
        <span className={styles.doorHandle} aria-hidden="true" />
      </Frame>

      {blurb ? <span className={styles.doorBlurb}>{blurb}</span> : null}
      {isActive ? (
        <span className={styles.enterHint} aria-hidden="true">
          Enter ↵
        </span>
      ) : null}
    </div>
  );
}
