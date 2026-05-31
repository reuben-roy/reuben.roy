'use client';

import { useMemo } from 'react';
import RunnerWorld from '@/components/runner/RunnerWorld';
import { PROJECTS } from '@/data/projects';
import { buildProjectsDoorWorld } from '@/data/runnerWorlds';

export default function ProjectWallGallery() {
  const world = useMemo(() => buildProjectsDoorWorld(PROJECTS), []);

  return (
    <RunnerWorld
      worldWidth={world.worldWidth}
      doors={world.doors}
      fullPage
      snapPoints={world.snapPoints}
      theme={world.theme}
      hudLink={world.hudLink}
      hint={world.hint}
      initialX={world.playerStartX}
      runSpeed={world.runSpeed}
      playerScreenRatio={world.playerScreenRatio}
    />
  );
}
