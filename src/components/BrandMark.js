'use client';

import { useId } from 'react';
import styles from './BrandMark.module.css';

export default function BrandMark({ mode = 'nav', className = '' }) {
  const gradientId = useId().replace(/:/g, '');

  return (
    <div className={[styles.root, styles[mode], className].filter(Boolean).join(' ')}>
      <span className={styles.iconBadge} aria-hidden="true">
        <svg className={styles.icon} viewBox="0 0 64 64" role="presentation">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7cffb2" />
              <stop offset="100%" stopColor="#4dffa0" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="44" height="44" rx="12" className={styles.iconPlate} />
          <path
            d="M21 49V21.5c0-2.5 2-4.5 4.5-4.5H43c2.2 0 4 1.8 4 4v28"
            className={styles.iconDoor}
          />
          <path d="M34 17v32" className={styles.iconDoor} />
          <circle cx="39.5" cy="35" r="1.85" fill={`url(#${gradientId})`} />
          <path d="M22 46c4.3 0 6.5-4.2 8.1-8.3 1.8-4.5 4.8-8 9.9-11.2" className={styles.iconStride} />
          <circle cx="25.4" cy="28.5" r="3.3" className={styles.iconFigure} />
          <path d="M25.4 31.8v8.3m0-5.8l-5.1 5.7m5.1 0l4.7 5.4" className={styles.iconFigure} />
        </svg>
      </span>

      <span className={styles.copy}>
        <span className={styles.title}>Reuben Roy</span>
        <span className={styles.domain}>reuben.roy</span>
      </span>
    </div>
  );
}
