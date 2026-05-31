'use client';

import { useRef } from 'react';
import Navbar from '../../components/Navbar';
import CareerSections from '../../components/career/CareerSections';
import CareerPortfolioSection from '../../components/career/CareerPortfolioSection';
import styles from '../../components/career/career.module.css';

export default function Career() {
    const canvasRef = useRef(null);

    return (
        <>
            <Navbar />
            <canvas ref={canvasRef} className={styles.backgroundCanvas} />

            <div className={styles.page}>
                <main className={styles.main}>
                    <CareerSections compact />
                    <CareerPortfolioSection />
                </main>
            </div>
        </>
    );
}
