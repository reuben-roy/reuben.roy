'use client';

import { useState } from 'react';
import styles from './ProjectSection.module.css';

export default function ProjectSection({
    title,
    children,
    defaultOpen = true,
    teaser,
    collapsible = true,
}) {
    const [open, setOpen] = useState(defaultOpen);

    if (!collapsible) {
        return (
            <div className={styles.section}>
                <h4 className={styles.title}>{title}</h4>
                <div className={styles.content}>{children}</div>
            </div>
        );
    }

    return (
        <div className={`${styles.section} ${open ? styles.open : ''}`}>
            <button
                type="button"
                className={styles.header}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                <span className={styles.title}>{title}</span>
                <span className={styles.chevron} aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            {!open && teaser ? <p className={styles.teaser}>{teaser}</p> : null}
            {open ? <div className={styles.content}>{children}</div> : null}
        </div>
    );
}
