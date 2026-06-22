'use client';

import Link from 'next/link';
import styles from './ProjectDetailPanel.module.css';

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
