import { certifications } from '@/data/career';
import styles from './career.module.css';

export default function CertificationsSection() {
    return (
        <section id="certifications" className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2>Certifications and Workshops</h2>
            </div>

            <div className={styles.certificationsGrid}>
                {certifications.map((cert, index) => (
                    <div key={index} className={styles.certCard}>
                        {cert.link ? (
                            <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                {cert.title}
                            </a>
                        ) : (
                            <span>{cert.title}</span>
                        )}
                        <p>{cert.organization}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
