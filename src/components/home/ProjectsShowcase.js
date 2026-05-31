'use client';

import { useEffect, useState } from 'react';
import { PROJECTS } from '@/data/projects';
import ProjectSelector from './ProjectSelector';
import ProjectDetailPanel from './ProjectDetailPanel';
import styles from './ProjectsShowcase.module.css';

export default function ProjectsShowcase() {
    const [selectedId, setSelectedId] = useState(PROJECTS[0]?.id);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 767px)');

        const update = () => setIsMobile(media.matches);
        update();
        media.addEventListener('change', update);

        return () => media.removeEventListener('change', update);
    }, []);

    const selectedProject = PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];

    return (
        <section id="projects" className={styles.section}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <div className={styles.titleRow}>
                        <h2 className={styles.title}>Projects</h2>
                        <span className={styles.count}>{PROJECTS.length}</span>
                    </div>
                    <p className={styles.subtitle}>
                        Things I&apos;ve built — explore live demos, architecture, and motivation
                    </p>
                </header>

                <div className={styles.mobileSelectorWrap}>
                    <ProjectSelector
                        projects={PROJECTS}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                </div>

                <div className={styles.layout}>
                    <aside className={styles.sidebar}>
                        <ProjectSelector
                            projects={PROJECTS}
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                        />
                    </aside>

                    {selectedProject ? (
                        <ProjectDetailPanel project={selectedProject} isMobile={isMobile} />
                    ) : null}
                </div>
            </div>
        </section>
    );
}
