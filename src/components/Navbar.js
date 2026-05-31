'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import BrandMark from './BrandMark';
import styles from './Navbar.module.css';
import ProjectsDropdown from './ProjectsDropdown';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Reuben Roy home">
          <BrandMark mode="nav" />
        </Link>

        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div id="site-navigation" className={`${styles.links} ${isMenuOpen ? styles.active : ''}`}>
          <Link
            href="/blog"
            className={`${styles.link} ${pathname === '/blog' ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            Blog
          </Link>
          <ProjectsDropdown onClose={closeMenu} />
          <Link
            href="/career"
            className={`${styles.link} ${pathname === '/career' ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            Career
          </Link>
          <Link
            href="/about"
            className={`${styles.link} ${pathname === '/about' ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
