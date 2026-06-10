'use client';

import { useEffect, useState } from 'react';
import styles from './GithubMatrix.module.css';

const GITHUB_USER = 'reuben-roy';
const ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;

// Module-level cache so both rooms (and remounts) share one fetch.
const cache = {
  data: null,
  timestamp: null,
  ttl: 6 * 60 * 60 * 1000, // 6h
};

// Turn the flat day list into weekday-aligned columns (Sun..Sat), GitHub-style.
function toWeeks(contributions) {
  const weeks = [];
  let week = new Array(7).fill(null);
  contributions.forEach((day) => {
    const weekday = new Date(`${day.date}T00:00:00`).getDay();
    week[weekday] = day;
    if (weekday === 6) {
      weeks.push(week);
      week = new Array(7).fill(null);
    }
  });
  if (week.some(Boolean)) weeks.push(week);
  return weeks;
}

export default function GithubMatrix({ x, clearance = '16rem' }) {
  const [state, setState] = useState({
    weeks: [],
    total: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    const apply = (data) => {
      if (cancelled) return;
      setState({
        weeks: toWeeks(data.contributions || []),
        total: data.total?.lastYear ?? null,
        loading: false,
        error: false,
      });
    };

    const now = Date.now();
    if (cache.data && cache.timestamp && now - cache.timestamp < cache.ttl) {
      apply(cache.data);
      return undefined;
    }

    (async () => {
      try {
        const res = await fetch(ENDPOINT);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        cache.data = data;
        cache.timestamp = now;
        apply(data);
      } catch (err) {
        console.error('GitHub contributions error:', err);
        if (!cancelled) setState((p) => ({ ...p, loading: false, error: true }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Stay out of the way entirely if the fetch failed — it's a decorative panel.
  if (state.error) return null;

  return (
    <div className={styles.matrix} style={{ left: x, '--gm-clearance': clearance }} aria-hidden="true">
      <div className={styles.header}>
        <span className={styles.title}>GITHUB</span>
        <span className={styles.total}>
          {state.loading || state.total == null
            ? 'contribution activity'
            : `${state.total} contributions · last year`}
        </span>
      </div>
      <div className={styles.grid}>
        {state.weeks.map((week, wi) => (
          <div key={wi} className={styles.col}>
            {week.map((day, di) => (
              <span
                key={di}
                className={styles.cell}
                data-level={day ? day.level : 0}
                data-empty={day ? undefined : ''}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
