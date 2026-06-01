'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ProjectLivePreview.module.css';

export default function ProjectLivePreview({ project, defaultExpanded = false }) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const [iframeFailed, setIframeFailed] = useState(false);

    const previewSrc = project.previewPath || (project.embedAllowed ? project.liveUrl : null);
    const hasPreview = Boolean(previewSrc) && !iframeFailed;
    const primaryLink = project.links?.[0]?.href || project.liveUrl;

    if (!previewSrc) {
        return (
            <div className={styles.fallback}>
                <div className={styles.fallbackIcon}>🌐</div>
                <p className={styles.fallbackTitle}>Live preview not available</p>
                <p className={styles.fallbackText}>
                    This project cannot be embedded here. Open it directly to explore.
                </p>
                {project.links?.length ? (
                    <div className={styles.linkRow}>
                        {project.links.map((link) => (
                            <ExternalOrInternalLink key={link.href} link={link} />
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            {!expanded ? (
                <div className={styles.collapsed}>
                    <p className={styles.collapsedText}>Preview available for {project.title}</p>
                    <button
                        type="button"
                        className={styles.expandButton}
                        onClick={() => setExpanded(true)}
                    >
                        Expand preview
                    </button>
                    {primaryLink ? (
                        <ExternalOrInternalLink link={{ label: 'Open in new tab', href: primaryLink }} />
                    ) : null}
                </div>
            ) : (
                <>
                    {hasPreview ? (
                        <iframe
                            className={styles.frame}
                            src={previewSrc}
                            title={`${project.title} preview`}
                            loading="lazy"
                            onError={() => setIframeFailed(true)}
                        />
                    ) : (
                        <div className={styles.fallback}>
                            <div className={styles.fallbackIcon}>🔒</div>
                            <p className={styles.fallbackTitle}>Embedding blocked</p>
                            <p className={styles.fallbackText}>
                                This site does not allow iframe previews. Use the link below instead.
                            </p>
                        </div>
                    )}
                    <div className={styles.controls}>
                        <button
                            type="button"
                            className={styles.collapseButton}
                            onClick={() => setExpanded(false)}
                        >
                            Collapse preview
                        </button>
                        {primaryLink ? (
                            <ExternalOrInternalLink link={{ label: 'Open live demo ↗', href: primaryLink }} />
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
}

function ExternalOrInternalLink({ link }) {
    const isExternal = link.href.startsWith('http');

    if (isExternal) {
        return (
            <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkButton}
            >
                {link.label}
            </a>
        );
    }

    return (
        <Link href={link.href} className={styles.linkButton}>
            {link.label}
        </Link>
    );
}
