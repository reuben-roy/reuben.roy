'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MermaidDiagram.module.css';

export default function MermaidDiagram({ chart, fallback }) {
    const containerRef = useRef(null);
    const [error, setError] = useState(null);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        if (!chart || !containerRef.current) return;

        let cancelled = false;

        async function renderChart() {
            try {
                const mermaid = (await import('mermaid')).default;
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'dark',
                    securityLevel: 'strict',
                });

                const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);

                if (!cancelled && containerRef.current) {
                    containerRef.current.innerHTML = svg;
                    setRendered(true);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to render diagram');
                }
            }
        }

        renderChart();

        return () => {
            cancelled = true;
        };
    }, [chart]);

    if (!chart) {
        return (
            <div className={styles.placeholder}>
                <p className={styles.placeholderTitle}>Architecture diagram coming soon</p>
                {fallback ? <p className={styles.placeholderText}>{fallback}</p> : null}
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            {error ? (
                <div className={styles.placeholder}>
                    <p className={styles.placeholderTitle}>Could not render diagram</p>
                    <p className={styles.placeholderText}>{error}</p>
                </div>
            ) : null}
            <div
                ref={containerRef}
                className={`${styles.diagram} ${rendered ? styles.visible : ''}`}
                aria-hidden={!!error}
            />
        </div>
    );
}
