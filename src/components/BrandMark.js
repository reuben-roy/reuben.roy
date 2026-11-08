import styles from './BrandMark.module.css';

export default function BrandMark({ compact = false }) {
  return (
    <span className={`${styles.brand} ${compact ? styles.compact : ''}`}>
      <span className={styles.mark} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className={styles.wordmark}>
        <span className={styles.name}>Reuben Roy</span>
        {!compact && <span className={styles.domain}>reuben-roy.explosion.fun</span>}
      </span>
    </span>
  );
}
