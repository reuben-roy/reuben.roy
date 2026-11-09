import Link from 'next/link';
import { PROJECTS_URL } from '@/data/site';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">404 / Lost</p>
        <h1 className={styles.title}>This door doesn&apos;t open.</h1>
        <p className={styles.copy}>
          The page may have moved. The work, writing, and project archive live at
          explosion.fun — or you can head back to the corridor.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            Back home
            <span aria-hidden="true">→</span>
          </Link>
          <a href={PROJECTS_URL} className={styles.secondary}>
            Browse projects
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
