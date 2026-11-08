import Link from 'next/link';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  INTERNSHIPS,
  SKILL_GROUPS,
} from '@/data/career';
import styles from './career.module.css';

export const metadata = {
  title: 'Career',
  description:
    'The long version of Reuben Roy’s career: AI engineering, backend systems, native apps, and the work between.',
  alternates: {
    canonical: '/career',
  },
};

export default function CareerPage() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerTop}>
            <p className="eyebrow">Career / The long version</p>
            <p className={styles.updated}>Updated 2026</p>
          </div>
          <h1 className={styles.title}>A generalist&apos;s tour of shipped software.</h1>
          <p className={styles.lede}>
            AI engineering, backend services, and product interfaces — often in the same week.
            Below is the work, the tools, and the proof that it shipped.
          </p>
          <div className={styles.headerActions}>
            <a href="https://www.explosion.fun/cv/" className={styles.primary}>
              View CV
              <span aria-hidden="true">↗</span>
            </a>
            <a href="https://www.explosion.fun/projects/" className={styles.secondary}>
              Project index
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={`container ${styles.sectionGrid}`}>
          <div className={styles.sectionLabel}>
            <p className="eyebrow">01 / Experience</p>
            <h2 className={styles.labelTitle}>Where the work happened.</h2>
          </div>

          <ol className={styles.roles}>
            {EXPERIENCE.map((role, index) => (
              <li key={`${role.company}-${role.role}`} className={styles.role}>
                <div className={styles.roleHead}>
                  <span className={styles.roleIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <div className={styles.roleIdentity}>
                    <h3 className={styles.roleName}>{role.role}</h3>
                    <p className={styles.company}>{role.company}</p>
                  </div>
                  <span className={styles.period}>{role.period}</span>
                </div>
                <p className={styles.summary}>{role.summary}</p>
                <ul className={styles.highlights}>
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <ul className={styles.stack} aria-label={`${role.role} tools`}>
                  {role.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`container ${styles.sectionGrid}`}>
          <div className={styles.sectionLabel}>
            <p className="eyebrow">02 / Toolkit</p>
            <h2 className={styles.labelTitle}>The tools I reach for.</h2>
          </div>

          <div className={styles.skillGroups}>
            {SKILL_GROUPS.map((group) => (
              <div key={group.label} className={styles.skillGroup}>
                <h3 className={styles.groupTitle}>{group.label}</h3>
                <ul className={styles.skillList}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.sectionGrid}`}>
          <div className={styles.sectionLabel}>
            <p className="eyebrow">03 / Education</p>
            <h2 className={styles.labelTitle}>The formal part.</h2>
          </div>

          <div className={styles.educationList}>
            {EDUCATION.map((entry) => (
              <div key={entry.school} className={styles.educationItem}>
                <div>
                  <h3 className={styles.educationSchool}>{entry.school}</h3>
                  <p className={styles.educationQualification}>{entry.qualification}</p>
                </div>
                <span className={styles.period}>{entry.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`container ${styles.sectionGrid}`}>
          <div className={styles.sectionLabel}>
            <p className="eyebrow">04 / Certifications</p>
            <h2 className={styles.labelTitle}>The paper trail.</h2>
          </div>

          <ul className={styles.certList}>
            {CERTIFICATIONS.map((certification) => (
              <li key={certification.title} className={styles.certItem}>
                <div>
                  <h3 className={styles.certTitle}>{certification.title}</h3>
                  <p className={styles.certOrg}>{certification.organization}</p>
                </div>
                {certification.href ? (
                  <a href={certification.href} className={styles.certLink}>
                    View
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className={styles.certMuted}>Workshop</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.sectionGrid}`}>
          <div className={styles.sectionLabel}>
            <p className="eyebrow">05 / Internships</p>
            <h2 className={styles.labelTitle}>Before the first full-time role.</h2>
          </div>

          <div className={styles.internGrid}>
            {INTERNSHIPS.map((internship) => (
              <article key={internship.organization} className={styles.internItem}>
                <p className={styles.internPeriod}>
                  {internship.period} · {internship.location}
                </p>
                <h3 className={styles.internOrg}>{internship.organization}</h3>
                <p className={styles.internCopy}>{internship.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <p className={`eyebrow ${styles.ctaEyebrow}`}>Next</p>
            <h2 className={styles.ctaTitle}>See the work behind the résumé.</h2>
          </div>
          <div className={styles.ctaActions}>
            <a href="https://www.explosion.fun/projects/" className={styles.ctaPrimary}>
              Browse projects
              <span aria-hidden="true">↗</span>
            </a>
            <Link href="/" className={styles.ctaSecondary}>
              Back home
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
