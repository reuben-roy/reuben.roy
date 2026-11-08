import Link from 'next/link';
import BrandMark from './BrandMark';
import styles from './Footer.module.css';

const EXPLORE_LINKS = [
  { label: 'Work', href: 'https://www.explosion.fun/projects/', external: true },
  { label: 'Writing', href: 'https://www.explosion.fun/blog/', external: true },
  { label: 'About', href: 'https://www.explosion.fun/about/', external: true },
  { label: 'CV', href: 'https://www.explosion.fun/cv/', external: true },
];

const SITE_LINKS = [
  { label: 'Home', href: '/', external: false },
  { label: 'Career', href: '/career', external: false },
];

const ELSEWHERE_LINKS = [
  { label: 'GitHub', href: 'https://github.com/reuben-roy', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/reuben-roy', external: true },
  { label: 'YouTube', href: 'https://www.youtube.com/@reubenroy', external: true },
  { label: 'Email', href: 'mailto:hello@explosion.fun', external: false },
];

function FooterColumn({ title, links }) {
  return (
    <div className={styles.column}>
      <h2 className={styles.columnTitle}>{title}</h2>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a href={link.href} className={styles.link}>
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandColumn}>
          <BrandMark />
          <p className={styles.note}>
            A small subdomain for the career-and-contact layer. The projects, writing, and
            experiments live at explosion.fun.
          </p>
          <a href="mailto:hello@explosion.fun" className={styles.email}>
            hello@explosion.fun
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <FooterColumn title="Explore" links={EXPLORE_LINKS} />
        <FooterColumn title="This site" links={SITE_LINKS} />
        <FooterColumn title="Elsewhere" links={ELSEWHERE_LINKS} />
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} Reuben Roy</p>
        <p>Built with Next.js. Hosted at reuben-roy.explosion.fun.</p>
        <a href="#top" className={styles.backToTop}>
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
