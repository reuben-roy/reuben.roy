'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import BrandMark from '@/components/BrandMark';
import SocialLinks from '@/components/SocialLinks';
import RunnerWorld from '@/components/runner/RunnerWorld';
import WallFrame from '@/components/runner/WallFrame';
import { HOME_CORRIDOR } from '@/data/runnerWorlds';

const PHRASES = [
  'Generalist software engineer',
  'Web, data, and mobile builder',
  'A playable portfolio, not a landing page',
];

function AnimatedText({ phrases }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const phrase = phrases[index];

    if (!deleting && text === phrase) {
      const t = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return undefined;
    }

    const t = setTimeout(() => {
      if (!deleting) {
        setText(phrase.slice(0, text.length + 1));
        setSpeed(55);
      } else {
        setText(phrase.slice(0, text.length - 1));
        setSpeed(30);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, speed]);

  return (
    <div className={styles.animatedText}>
      <span className={styles.typingText}>{text}</span>
      <span className={styles.cursor} />
    </div>
  );
}

function IntroContent() {
  return (
    <div className={styles.introContent}>
      <BrandMark mode="hero" className={styles.brand} />
      <h1 className={styles.title}>Play the portfolio.</h1>
      <AnimatedText phrases={PHRASES} />
      <p className={styles.description}>
        I build web apps, data visualizations, and mobile tools. Run the character into a glowing
        door to explore projects, work experience, writing, or background — no scrolling required.
      </p>
      <p className={styles.hintLine}>← → or A / D to run · Enter at a door</p>
      <div className={styles.socialRow}>
        <SocialLinks />
      </div>
    </div>
  );
}

export default function Hero() {
  const intro = HOME_CORRIDOR.introFrame;

  return (
    <RunnerWorld
      worldWidth={HOME_CORRIDOR.worldWidth}
      doors={HOME_CORRIDOR.doors}
      fullPage
      theme={HOME_CORRIDOR.theme}
      hint={HOME_CORRIDOR.hint}
      initialX={HOME_CORRIDOR.playerStartX}
      runSpeed={HOME_CORRIDOR.runSpeed}
      playerScreenRatio={HOME_CORRIDOR.playerScreenRatio}
      mobileContent={
        <div className={styles.mobileIntro}>
          <IntroContent />
        </div>
      }
    >
      <WallFrame id="intro" label="Reuben Roy" x={intro.x} width={intro.width} height={intro.height}>
        <IntroContent />
      </WallFrame>
    </RunnerWorld>
  );
}
