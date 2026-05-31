'use client';

import { useMemo } from 'react';
import RunnerWorld from '@/components/runner/RunnerWorld';
import WallFrame from '@/components/runner/WallFrame';
import { ProjectFrameContent } from '@/components/home/ProjectFrameContent';
import { buildProjectRoomWorld } from '@/data/runnerWorlds';
import galleryStyles from './ProjectWallGallery.module.css';

export default function ProjectRoom({ project }) {
  const world = useMemo(() => buildProjectRoomWorld(project), [project]);

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
    >
      {world.frames.map((frame) => (
        <WallFrame
          key={frame.id}
          id={frame.id}
          label={frame.type === 'header' ? project.title : frame.label}
          x={frame.x}
          width={frame.width}
          height={frame.height}
        >
          <div className={frame.type === 'live' ? galleryStyles.liveFrame : undefined}>
            <ProjectFrameContent project={project} type={frame.type} />
          </div>
        </WallFrame>
      ))}
    </RunnerWorld>
  );
}
