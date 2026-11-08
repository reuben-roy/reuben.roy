import { SOCIAL_LINKS } from '@/data/site';
import styles from './SocialLinks.module.css';

export default function SocialLinks() {
  return (
    <div className={styles.row}>
      <span className={styles.label}>Elsewhere</span>
      <ul className={styles.list}>
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={styles.link}>
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
