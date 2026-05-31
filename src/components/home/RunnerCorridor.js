'use client';

import BrandMark from '@/components/BrandMark';
import RunnerWorld from '@/components/runner/RunnerWorld';
import { HOME_CORRIDOR } from '@/data/runnerWorlds';
import styles from './RunnerCorridor.module.css';

export default function RunnerCorridor() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Lobby</span>
        <h2 className={styles.title}>Choose a room and keep running.</h2>
        <p className={styles.subtitle}>
          Projects, work history, writing, and context all branch from the corridor below.
        </p>
        <BrandMark className={styles.mark} />
      </header>
      <RunnerWorld
        worldWidth={HOME_CORRIDOR.worldWidth}
        doors={HOME_CORRIDOR.doors}
        variant="corridor"
        theme={HOME_CORRIDOR.theme}
        hint={HOME_CORRIDOR.hint}
        initialX={HOME_CORRIDOR.playerStartX}
        runSpeed={HOME_CORRIDOR.runSpeed}
        playerScreenRatio={HOME_CORRIDOR.playerScreenRatio}
      />
    </div>
  );
}
