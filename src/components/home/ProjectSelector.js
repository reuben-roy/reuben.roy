'use client';

import styles from './ProjectSelector.module.css';

export default function ProjectSelector({ projects, selectedId, onSelect }) {
    return (
        <>
            <nav className={styles.verticalNav} aria-label="Projects">
                {projects.map((project) => (
                    <button
                        key={project.id}
                        type="button"
                        className={`${styles.verticalItem} ${selectedId === project.id ? styles.active : ''}`}
                        onClick={() => onSelect(project.id)}
                        aria-current={selectedId === project.id ? 'true' : undefined}
                    >
                        <span className={styles.itemTitle}>{project.title}</span>
                        <span className={styles.itemTagline}>{project.tagline}</span>
                    </button>
                ))}
            </nav>

            <div className={styles.mobileNav} aria-label="Projects">
                {projects.map((project) => (
                    <button
                        key={project.id}
                        type="button"
                        className={`${styles.pill} ${selectedId === project.id ? styles.active : ''}`}
                        onClick={() => onSelect(project.id)}
                        aria-current={selectedId === project.id ? 'true' : undefined}
                    >
                        {project.title}
                    </button>
                ))}
            </div>
        </>
    );
}
