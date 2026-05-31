'use client';

import { useState } from 'react';
import { skillCategories } from '@/data/career';
import styles from './career.module.css';

export default function SkillsSection() {
    const [expanded, setExpanded] = useState([]);

    const toggleCategory = (index) => {
        setExpanded((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <section id="skills" className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2>Skills</h2>
                <p className={styles.subtitle}>
                    A person is more than the list of technologies they used to get work done
                </p>
                <p className={styles.subtext}>
                    But these are the technologies I am familiar with
                </p>
            </div>

            <div className={styles.skillsAccordion}>
                {skillCategories.map((cat, index) => {
                    const isOpen = expanded.includes(index);
                    return (
                        <div
                            key={cat.name}
                            className={`${styles.skillCategory} ${isOpen ? styles.open : ''}`}
                        >
                            <button
                                type="button"
                                className={styles.skillHeader}
                                aria-expanded={isOpen}
                                aria-controls={`skill-cat-${index}`}
                                onClick={() => toggleCategory(index)}
                            >
                                <span>{cat.name}</span>
                                <div className={styles.skillHeaderMeta}>
                                    <span className={styles.skillCount}>{cat.items.length}</span>
                                    <span className={styles.skillToggleIcon} aria-hidden="true" />
                                </div>
                            </button>

                            <div id={`skill-cat-${index}`} className={styles.skillContent}>
                                <div className={styles.pillsWrap}>
                                    {cat.items.map((item) => (
                                        <span key={item} className={styles.skillPill}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
