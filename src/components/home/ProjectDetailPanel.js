'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectSection from './ProjectSection';
import ProjectLivePreview from './ProjectLivePreview';
import MermaidDiagram from './MermaidDiagram';
import DiagramCarousel from './DiagramCarousel';
import styles from './ProjectDetailPanel.module.css';

const TABS = [
    { id: 'live', label: 'Live' },
    { id: 'how', label: 'How it works' },
    { id: 'why', label: 'Why' },
    { id: 'details', label: 'Details' },
];

function getWhyTeaser(why) {
    const text = Array.isArray(why) ? why.join(' ') : why;
    return text.length > 120 ? `${text.slice(0, 120)}…` : text;
}

export default function ProjectDetailPanel({ project, isMobile }) {
    const [activeTab, setActiveTab] = useState('live');

    useEffect(() => {
        setActiveTab('live');
    }, [project.id]);

    if (isMobile) {
        return (
            <div className={styles.panel}>
                <header className={styles.header}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.tagline}>{project.tagline}</p>
                </header>

                <div className={styles.accordionStack}>
                    <ProjectSection title="Live preview" defaultOpen={false} teaser="Tap to load project preview">
                        <ProjectLivePreview project={project} defaultExpanded={false} />
                    </ProjectSection>

                    <ProjectSection title="How it works" defaultOpen={false} teaser="Architecture diagrams">
                        {project.diagrams?.length > 0
                            ? <DiagramCarousel diagrams={project.diagrams} />
                            : <MermaidDiagram chart={project.mermaid} fallback={project.architectureFallback} />
                        }
                    </ProjectSection>

                    <ProjectSection
                        title="Why this project exists"
                        defaultOpen={true}
                        teaser={getWhyTeaser(project.why)}
                    >
                        <WhyContent why={project.why} />
                    </ProjectSection>

                    <ProjectSection title="Details" defaultOpen={false} teaser="Tech stack, links, and highlights">
                        <DetailsContent project={project} />
                    </ProjectSection>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.panel}>
            <header className={styles.header}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.tagline}>{project.tagline}</p>
            </header>

            <div className={styles.tabs} role="tablist">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.tabContent} role="tabpanel">
                {activeTab === 'live' && (
                    <ProjectLivePreview project={project} defaultExpanded={true} />
                )}
                {activeTab === 'how' && (
                    project.diagrams?.length > 0
                        ? <DiagramCarousel diagrams={project.diagrams} />
                        : <MermaidDiagram chart={project.mermaid} fallback={project.architectureFallback} />
                )}
                {activeTab === 'why' && <WhyContent why={project.why} />}
                {activeTab === 'details' && <DetailsContent project={project} />}
            </div>
        </div>
    );
}

export function WhyContent({ why }) {
    const paragraphs = Array.isArray(why) ? why : [why];

    return (
        <div className={styles.prose}>
            {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
    );
}

export function DetailsContent({ project }) {
    return (
        <div className={styles.details}>
            {project.awards?.length > 0 ? (
                <div className={styles.awards}>
                    {project.awards.map((award) => (
                        <span key={award.label || award.event} className={styles.awardBadge}>
                            {award.label}{award.event ? ` — ${award.event}` : ''}
                        </span>
                    ))}
                </div>
            ) : null}

            {project.highlights?.length > 0 ? (
                <div className={styles.block}>
                    <h5 className={styles.blockTitle}>Highlights</h5>
                    <ul className={styles.list}>
                        {project.highlights.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {project.techStack?.length > 0 ? (
                <div className={styles.block}>
                    <h5 className={styles.blockTitle}>Tech stack</h5>
                    <div className={styles.pills}>
                        {project.techStack.map((tech) => (
                            <span key={tech} className={styles.pill}>{tech}</span>
                        ))}
                    </div>
                </div>
            ) : null}

            {project.links?.length > 0 ? (
                <div className={styles.block}>
                    <h5 className={styles.blockTitle}>Links</h5>
                    <div className={styles.linkRow}>
                        {project.links.map((link) => (
                            <ProjectLink key={link.href} link={link} />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function ProjectLink({ link }) {
    const isExternal = link.href.startsWith('http');

    if (isExternal) {
        return (
            <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
            >
                {link.label} ↗
            </a>
        );
    }

    return (
        <Link href={link.href} className={styles.link}>
            {link.label} →
        </Link>
    );
}
