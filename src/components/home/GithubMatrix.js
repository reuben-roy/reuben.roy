'use client';

import { useEffect, useState } from 'react';
import styles from './corridor.module.css';

const ENDPOINT = 'https://github-contributions-api.jogruber.de/v4/reuben-roy?y=last';

// Weekday-aligned columns (Sun..Sat), GitHub-style.
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

export default function GithubMatrix() {
  const [state, setState] = useState({ weeks: [], total: null, failed: false });

  useEffect(() => {
    let cancelled = false;
    fetch(ENDPOINT)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (!cancelled) {
          setState({ weeks: toWeeks(data.contributions || []), total: data.total?.lastYear ?? null, failed: false });
        }
      })
      .catch(() => {
        if (!cancelled) setState((prev) => ({ ...prev, failed: true }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const placeholder = state.weeks.length === 0;
  const weeks = placeholder ? Array.from({ length: 53 }, () => new Array(7).fill(null)) : state.weeks;

  return (
    <div className={styles.matrixWrap}>
      <p className={styles.matrixTotal}>
        {state.total != null ? (
          <>
            <strong>{state.total.toLocaleString('en-US')}</strong> contributions in the last year
          </>
        ) : state.failed ? (
          'Contribution history on GitHub'
        ) : (
          'Loading contributions…'
        )}
      </p>
      <div className={styles.matrix} aria-hidden="true">
        {weeks.map((week, wi) => (
          <div key={wi} className={styles.matrixCol}>
            {week.map((day, di) => (
              <span key={di} className={styles.matrixCell} data-level={day ? day.level : 0} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
