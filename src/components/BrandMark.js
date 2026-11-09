import { SITE_DOMAIN } from '@/data/site';
import styles from './BrandMark.module.css';

export default function BrandMark() {
  return (
    <span className={styles.brand}>
      <span className={styles.mark} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className={styles.wordmark}>
        <span className={styles.name}>Reuben Roy</span>
        <span className={styles.domain}>{SITE_DOMAIN}</span>
      </span>
    </span>
  );
}
