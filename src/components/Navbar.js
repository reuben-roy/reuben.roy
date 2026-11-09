'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';
import SiteLink, { isExternalHref } from './SiteLink';
import { CONTACT_HREF, CV_URL, NAV_LINKS } from '@/data/site';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <BrandMark />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const external = isExternalHref(link.href);
            const active = !external && pathname === link.href;

            return (
              <SiteLink
                key={link.label}
                href={link.href}
                className={`${styles.link} ${active ? styles.active : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
                {external ? (
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                ) : null}
              </SiteLink>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <SiteLink href={CV_URL} className={styles.cv}>
            CV
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </SiteLink>
          <SiteLink href={CONTACT_HREF} className={styles.cta}>
            Say hello
          </SiteLink>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.menuLabel}>{open ? 'Close' : 'Menu'}</span>
          <span className={`${styles.menuIcon} ${open ? styles.menuIconOpen : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      {open && (
        <div className={styles.mobilePanel} id="mobile-menu">
          <nav className={styles.mobileNav} aria-label="Mobile primary">
            {NAV_LINKS.map((link) => {
              const external = isExternalHref(link.href);
              const active = !external && pathname === link.href;

              return (
                <SiteLink
                  key={link.label}
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {external ? <span aria-hidden="true">↗</span> : null}
                </SiteLink>
              );
            })}
          </nav>
          <div className={styles.mobileActions}>
            <SiteLink href={CV_URL} className={styles.mobileSecondary}>
              View CV <span aria-hidden="true">↗</span>
            </SiteLink>
            <SiteLink href={CONTACT_HREF} className={styles.mobileCta}>
              Say hello
            </SiteLink>
          </div>
        </div>
      )}
    </header>
  );
}
