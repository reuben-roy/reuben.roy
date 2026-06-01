'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import MermaidDiagram from './MermaidDiagram';
import styles from './DiagramCarousel.module.css';

const AUTOPLAY_MS = 4000;

export default function DiagramCarousel({ diagrams }) {
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(null);
    const rafRef = useRef(null);
    const startRef = useRef(null);
    const playingRef = useRef(false);
    const total = diagrams.length;

    const goTo = useCallback((raw) => {
        const idx = ((raw % total) + total) % total;
        setCurrent(idx);
        setProgress(0);
        if (playingRef.current) startRef.current = Date.now();
    }, [total]);

    // Keyboard: number keys 1–9 jump to diagram, P toggles play
    useEffect(() => {
        function onKey(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            const n = parseInt(e.key, 10);
            if (!isNaN(n) && n >= 1 && n <= total) {
                goTo(n - 1);
                return;
            }
            if (e.key === 'p' || e.key === 'P') {
                setPlaying((p) => !p);
            }
        }
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [goTo, total]);

    // Auto-play: interval advances index, rAF drives progress bar
    useEffect(() => {
        playingRef.current = playing;
        clearInterval(timerRef.current);
        cancelAnimationFrame(rafRef.current);

        if (!playing) {
            setProgress(0);
            return;
        }

        startRef.current = Date.now();

        function tick() {
            const elapsed = Date.now() - startRef.current;
            setProgress(Math.min(elapsed / AUTOPLAY_MS, 1));
            rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);

        timerRef.current = setInterval(() => {
            setCurrent((c) => (c + 1) % total);
            setProgress(0);
            startRef.current = Date.now();
        }, AUTOPLAY_MS);

        return () => {
            clearInterval(timerRef.current);
            cancelAnimationFrame(rafRef.current);
        };
    }, [playing, total]);

    return (
        <div className={styles.carousel}>
            {/* Number pill selector + play button */}
            <div className={styles.topBar}>
                <div className={styles.pills}>
                    {diagrams.map((d, i) => (
                        <button
                            key={i}
                            className={`${styles.pill} ${i === current ? styles.pillActive : ''}`}
                            onClick={() => goTo(i)}
                            title={d.label}
                            aria-label={`Diagram ${i + 1}: ${d.label}`}
                        >
                            <span className={styles.pillNum}>{i + 1}</span>
                            {playing && i === current && (
                                <span
                                    className={styles.pillBar}
                                    style={{ width: `${progress * 100}%` }}
                                />
                            )}
                        </button>
                    ))}
                </div>
                <button
                    className={`${styles.playBtn} ${playing ? styles.playBtnActive : ''}`}
                    onClick={() => setPlaying((p) => !p)}
                    title={playing ? 'Pause (P)' : 'Play through (P)'}
                    aria-label={playing ? 'Pause slideshow' : 'Play through all diagrams'}
                >
                    {playing ? '⏸ Pause' : '▶ Play'}
                </button>
            </div>

            {/* Current diagram label + position */}
            <div className={styles.meta}>
                <span className={styles.diagramLabel}>{diagrams[current].label}</span>
                <span className={styles.counter}>{current + 1} / {total}</span>
            </div>

            {/* Diagram area — key forces fresh mount on each switch */}
            <div className={styles.viewer}>
                <MermaidDiagram key={current} chart={diagrams[current].chart} />
            </div>

            {/* Prev / Next + keyboard hint */}
            <div className={styles.navRow}>
                <button
                    className={styles.navBtn}
                    onClick={() => goTo(current - 1)}
                    aria-label="Previous diagram"
                >
                    ◂ Prev
                </button>
                <span className={styles.hint}>keys 1–{total} to jump · P to play</span>
                <button
                    className={styles.navBtn}
                    onClick={() => goTo(current + 1)}
                    aria-label="Next diagram"
                >
                    Next ▸
                </button>
            </div>
        </div>
    );
}
