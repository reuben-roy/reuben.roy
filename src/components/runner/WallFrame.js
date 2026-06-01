'use client';

import styles from './runner.module.css';

export default function WallFrame({
  label,
  x,
  width = 760,
  height = 520,
  children,
  id,
  mobileStack = false,
}) {
  if (mobileStack) {
    return (
      <article className={styles.wallFrameMobile} id={id}>
        {label ? <h3 className={styles.framePlaque}>{label}</h3> : null}
        <div className={styles.frameShell}>
          <div className={styles.frameMat}>
            <div className={styles.frameInner}>{children}</div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={styles.wallFrame}
      style={{
        '--frame-x': `${x}px`,
        '--frame-w-base': `${width}px`,
        '--frame-h': `${height}px`,
      }}
      id={id}
    >
      {label ? <h3 className={styles.framePlaque}>{label}</h3> : null}
      <div className={styles.frameShell}>
        <div className={styles.frameMat}>
          <div className={styles.frameInner}>{children}</div>
        </div>
      </div>
    </article>
  );
}
