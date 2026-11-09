import SiteLink, { isExternalHref } from '@/components/SiteLink';
import styles from './runner.module.css';

export default function Door({ door, isActive }) {
  const { label, href, x, blurb } = door;
  const external = isExternalHref(href);

  return (
    <div className={`${styles.door} ${isActive ? styles.doorActive : ''}`} style={{ left: x }}>
      <span className={styles.doorSign}>{label}</span>
      <SiteLink href={href} className={styles.doorFrame} aria-label={`${label}: ${blurb}`}>
        <span className={styles.doorPanel} aria-hidden="true" />
        <span className={styles.doorPanel} aria-hidden="true" />
        <span className={styles.doorKnob} aria-hidden="true" />
        <span className={styles.doorArrow} aria-hidden="true">
          {external ? '↗' : '→'}
        </span>
      </SiteLink>
      <span className={styles.doorBlurb}>{blurb}</span>
      <span className={styles.enterHint} aria-hidden="true">
        Enter ↵
      </span>
    </div>
  );
}
