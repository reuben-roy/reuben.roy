'use client';

import { useRouter } from 'next/navigation';
import { RUNNER_DEFAULTS } from '@/data/runnerWorlds';
import styles from './runner.module.css';

export default function Door({ door, isActive, reducedMotion }) {
  const router = useRouter();
  const { label, href, x, variant = 'entry' } = door;
  const width =
    door.width ||
    (variant === 'return' ? RUNNER_DEFAULTS.returnDoorWidth : RUNNER_DEFAULTS.doorWidth);
  const height = door.height || RUNNER_DEFAULTS.doorHeight;
  const isReturn = variant === 'return';

  const enter = () => router.push(href);

  return (
    <div
      className={`${styles.door} ${isReturn ? styles.doorReturn : ''} ${isActive ? styles.doorActive : ''}`}
      style={{ left: x - width / 2, width, height }}
    >
      <div className={styles.doorSign}>{label}</div>
      <button
        type="button"
        className={styles.doorFrame}
        onClick={enter}
        aria-label={`${isReturn ? 'Return to' : 'Enter'} ${label}`}
      >
        <span className={styles.doorArch} />
        <span className={styles.doorOpening}>{isReturn ? '◂' : '▸'}</span>
      </button>
      {isActive ? (
        <button type="button" className={styles.enterHint} onClick={enter}>
          {isReturn ? '◂ ENTER' : 'ENTER ▸'}
        </button>
      ) : null}
      {reducedMotion ? (
        <a href={href} className={styles.doorFallbackLink}>
          {isReturn ? `Back to ${label}` : `Go to ${label}`}
        </a>
      ) : null}
    </div>
  );
}
