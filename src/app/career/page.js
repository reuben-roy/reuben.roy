import Link from 'next/link';
import { EXPERIENCE, SKILL_GROUPS } from '@/data/career';
import { CV_URL, PROJECTS_URL } from '@/data/site';
import styles from './career.module.css';

export const metadata = {
  title: 'Career',
  description:
    'A short tour of Reuben Roy’s career: AI engineering, backend systems, native apps, and the tools behind them. The full CV lives at explosion.fun.',
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
            <p className="eyebrow">Career / Field notes</p>
            <p className={styles.updated}>Updated 2026</p>
          </div>
          <h1 className={styles.title}>A generalist&apos;s tour of shipped software.</h1>
          <p className={styles.lede}>
            AI engineering, backend services, and product interfaces — often in the same week. A
            short tour of the roles and tools; the full CV lives at explosion.fun.
          </p>
          <div className={styles.headerActions}>
            <a href={CV_URL} className={styles.primary}>
              View CV
              <span aria-hidden="true">↗</span>
            </a>
            <a href={PROJECTS_URL} className={styles.secondary}>
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

      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <p className={`eyebrow ${styles.ctaEyebrow}`}>Next</p>
            <h2 className={styles.ctaTitle}>See the work behind the résumé.</h2>
          </div>
          <div className={styles.ctaActions}>
            <a href={PROJECTS_URL} className={styles.ctaPrimary}>
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
