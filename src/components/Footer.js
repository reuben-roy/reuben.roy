import BrandMark from './BrandMark';
import SiteLink, { isExternalHref } from './SiteLink';
import {
  ABOUT_URL,
  BLOG_URL,
  CONTACT_EMAIL,
  CONTACT_HREF,
  CV_URL,
  PROJECTS_URL,
  SITE_DOMAIN,
  SOCIAL_LINKS,
} from '@/data/site';
import styles from './Footer.module.css';

const EXPLORE_LINKS = [
  { label: 'Work', href: PROJECTS_URL },
  { label: 'Writing', href: BLOG_URL },
  { label: 'About', href: ABOUT_URL },
  { label: 'CV', href: CV_URL },
];

const SITE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Career', href: '/career' },
];

const ELSEWHERE_LINKS = [...SOCIAL_LINKS, { label: 'Email', href: CONTACT_HREF }];

function FooterColumn({ title, links }) {
  return (
    <div className={styles.column}>
      <h2 className={styles.columnTitle}>{title}</h2>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.label}>
            <SiteLink href={link.href} className={styles.link}>
              {link.label}
              {isExternalHref(link.href) ? <span aria-hidden="true">↗</span> : null}
            </SiteLink>
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
          <a href={CONTACT_HREF} className={styles.email}>
            {CONTACT_EMAIL}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <FooterColumn title="Explore" links={EXPLORE_LINKS} />
        <FooterColumn title="This site" links={SITE_LINKS} />
        <FooterColumn title="Elsewhere" links={ELSEWHERE_LINKS} />
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} Reuben Roy</p>
        <p>Built with Next.js. Hosted at {SITE_DOMAIN}.</p>
        <a href="#top" className={styles.backToTop}>
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
