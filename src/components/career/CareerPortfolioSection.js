import { careerPortfolio } from '@/data/careerPortfolio';
import styles from './career.module.css';

export default function CareerPortfolioSection() {
    return (
        <section id="portfolio" className={styles.section}>
            <h2>Previous Web Projects</h2>
            <hr className={styles.divider} />

            {careerPortfolio.map((proj) => (
                <div key={proj.title} className={styles.portfolioProject}>
                    <h3>{proj.title}</h3>
                    {proj.overview.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}

                    <h4>Feature Highlights</h4>

                    <div className={styles.featuresGrid}>
                        {proj.features.map((group) => (
                            <div key={group.title} className={styles.featureGroup}>
                                <h5>{group.title}</h5>
                                <ul className={styles.featureList}>
                                    {group.items.map((item) => (
                                        <li key={item} className={styles.featureItem}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {proj.url && (
                        <iframe
                            className={styles.portfolioFrame}
                            src={proj.url}
                            height="450"
                            width="100%"
                            title={proj.title}
                        />
                    )}

                    {proj.interactivePreviews && (
                        <div className={styles.interactivePreviews}>
                            {proj.interactivePreviews.map((preview) => (
                                <div key={preview.url} className={styles.previewItem}>
                                    <h4 className={styles.previewTitle}>
                                        <a href={preview.url} target="_blank" rel="noopener noreferrer">
                                            {preview.title} ↗
                                        </a>
                                    </h4>
                                    <iframe
                                        className={styles.portfolioFrame}
                                        src={preview.url}
                                        height={preview.height || 450}
                                        width="100%"
                                        title={preview.title}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {proj.urls && (
                        <div className={styles.projectLinks}>
                            {proj.urls.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.projectLink}
                                >
                                    {link.name} ↗
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}
