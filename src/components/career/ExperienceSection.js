import { workExperience, internships } from '@/data/career';
import styles from './career.module.css';

export default function ExperienceSection() {
    return (
        <section id="experience" className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2>Work Experience</h2>
            </div>

            <div className={styles.experienceContainer}>
                <div className={styles.experienceSection}>
                    <h3 className={styles.sectionTitle}>Work History</h3>

                    {workExperience.map((job, index) => (
                        <div key={index} className={styles.experienceCard}>
                            <h4>{job.title}</h4>
                            <p className={styles.experienceDescription}>{job.description}</p>
                            {job.skills?.length ? (
                                <div className={styles.jobSkills}>
                                    <div className={styles.jobSkillsHeader}>Skills</div>
                                    <div className={styles.pillsWrap}>
                                        {job.skills.map((s) => (
                                            <span key={s} className={styles.skillPill}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>

                <div className={styles.experienceSection}>
                    <h3 className={styles.sectionTitle}>Internships</h3>

                    {internships.map((internship, index) => (
                        <div key={index} className={styles.experienceCard}>
                            <h4>{internship.title}</h4>
                            <p className={styles.experienceDate}>{internship.date}</p>
                            <p className={styles.experienceDescription}>{internship.description}</p>
                            {internship.skills?.length ? (
                                <div className={styles.jobSkills}>
                                    <div className={styles.jobSkillsHeader}>Skills</div>
                                    <div className={styles.pillsWrap}>
                                        {internship.skills.map((s) => (
                                            <span key={s} className={styles.skillPill}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
