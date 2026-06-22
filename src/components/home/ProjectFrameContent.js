'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectLivePreview from '@/components/home/ProjectLivePreview';
import MermaidDiagram from '@/components/home/MermaidDiagram';
import DiagramCarousel from '@/components/home/DiagramCarousel';
import { WhyContent, DetailsContent } from '@/components/home/ProjectDetailPanel';
import runnerStyles from '@/components/runner/runner.module.css';
import styles from './ProjectWallGallery.module.css';

function LazyFrameContent({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={runnerStyles.frameScroll}>
      {visible ? children : <p className={styles.loading}>Approach to load…</p>}
    </div>
  );
}

export function ProjectFrameContent({ project, type }) {
  if (type === 'header') {
    return (
      <div className={styles.headerFrame}>
        <h3>{project.title}</h3>
        <p>{project.tagline}</p>
      </div>
    );
  }

  if (type === 'live') {
    return (
      <LazyFrameContent>
        <ProjectLivePreview project={project} defaultExpanded={true} />
      </LazyFrameContent>
    );
  }

  if (type === 'why') {
    return (
      <LazyFrameContent>
        <WhyContent why={project.why} />
      </LazyFrameContent>
    );
  }

  if (type === 'how') {
    return (
      <LazyFrameContent>
        {project.diagrams?.length > 0
          ? <DiagramCarousel diagrams={project.diagrams} />
          : <MermaidDiagram chart={project.mermaid} fallback={project.architectureFallback} />
        }
      </LazyFrameContent>
    );
  }

  if (type === 'details') {
    return (
      <LazyFrameContent>
        <DetailsContent project={project} />
      </LazyFrameContent>
    );
  }

  return null;
}
