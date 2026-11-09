'use client';

import RunnerWorld from '@/components/runner/RunnerWorld';
import PixelArt from '@/components/pixel/PixelArt';
import PixelMosaic from '@/components/pixel/PixelMosaic';
import { isExternalHref } from '@/components/SiteLink';
import GithubMatrix from './GithubMatrix';
import {
  ABOUT_URL,
  BLOG_URL,
  CONTACT_EMAIL,
  CONTACT_HREF,
  GITHUB_URL,
  LINKEDIN_URL,
  PROJECTS_URL,
  SOCIAL_LINKS,
} from '@/data/site';
import { EXHIBITS, FLAGSHIP } from '@/data/work';
import styles from './corridor.module.css';

function Arrow({ href }) {
  return <span aria-hidden="true">{isExternalHref(href) ? '↗' : '→'}</span>;
}

function ArtPanel({ art, tone, seed, className = '' }) {
  return (
    <div className={`${styles.artPanel} ${className}`}>
      <PixelMosaic tone={tone} seed={seed} className={styles.mosaic} />
      <PixelArt name={art} className={styles.sticker} />
    </div>
  );
}

function IntroFrame({ goTo }) {
  return (
    <div className={styles.intro}>
      <div className={styles.introMain}>
        <p className={styles.kicker}>
          <span className={styles.kickerDot} aria-hidden="true" />
          Reuben Roy · Generalist software engineer
        </p>
        <h1 className={styles.introTitle}>Play the portfolio.</h1>
        <p className={styles.introLede}>
          I build agents, interfaces, and the data stories between them. Each frame on this wall is
          something I shipped. Each door leads to the rest.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={() => goTo(FLAGSHIP.id)}>
            Start with the flagship <span aria-hidden="true">→</span>
          </button>
          <a href="#work" className={styles.secondary}>
            Skip the game <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <dl className={styles.facts}>
        <div>
          <dt>Focus</dt>
          <dd>Agentic systems, data products, native apps</dd>
        </div>
        <div>
          <dt>Approach</dt>
          <dd>Build the failure path first, then make the happy path obvious</dd>
        </div>
        <div>
          <dt>Elsewhere</dt>
          <dd className={styles.factLinks}>
            {SOCIAL_LINKS.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function FlagshipFrame() {
  return (
    <div className={styles.flagship}>
      <ArtPanel art={FLAGSHIP.art} tone={FLAGSHIP.tone} seed={FLAGSHIP.id} className={styles.flagshipArt} />
      <div className={styles.flagshipCopy}>
        <p className={styles.tagRow}>
          <span className={styles.tagFlag}>Flagship</span>
          <span className={styles.tag}>{FLAGSHIP.category}</span>
        </p>
        <h2 className={styles.exhibitTitle}>{FLAGSHIP.title}</h2>
        <p className={styles.pitch}>{FLAGSHIP.pitch}</p>
        <blockquote className={styles.principle}>{FLAGSHIP.principle}</blockquote>
        <dl className={styles.stats}>
          {FLAGSHIP.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.exhibitFoot}>
          {FLAGSHIP.links.map((link) => (
            <a key={link.href} href={link.href} className={styles.primary}>
              {link.label} <Arrow href={link.href} />
            </a>
          ))}
          <span className={styles.footNote}>{FLAGSHIP.note}</span>
        </div>
      </div>
    </div>
  );
}

function ExhibitFrame({ exhibit }) {
  const [primary, ...rest] = exhibit.links;

  return (
    <div className={styles.exhibit}>
      <ArtPanel art={exhibit.art} tone={exhibit.tone} seed={exhibit.id} className={styles.exhibitArt} />
      <div className={styles.exhibitCopy}>
        <p className={styles.tagRow}>
          <span className={styles.tag}>{exhibit.category}</span>
        </p>
        <h2 className={styles.exhibitTitle}>{exhibit.title}</h2>
        <p className={styles.pitch}>{exhibit.pitch}</p>
        <ul className={styles.proof}>
          {exhibit.proof.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className={styles.exhibitFoot}>
          <a href={primary.href} className={styles.primary}>
            {primary.label} <Arrow href={primary.href} />
          </a>
          {rest.map((link) => (
            <a key={link.href} href={link.href} className={styles.textLink}>
              {link.label} <Arrow href={link.href} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityFrame() {
  return (
    <div className={styles.activity}>
      <p className={styles.tagRow}>
        <span className={styles.tag}>Built in public</span>
      </p>
      <h2 className={styles.exhibitTitle}>Shipping, most days.</h2>
      <p className={styles.pitch}>
        Sixteen projects and counting: agents, data toys, native apps, and the tooling that keeps
        this site and CV up to date on their own.
      </p>
      <GithubMatrix />
      <div className={styles.exhibitFoot}>
        <a href={PROJECTS_URL} className={styles.primary}>
          Browse all projects <Arrow href={PROJECTS_URL} />
        </a>
        <a href={GITHUB_URL} className={styles.textLink}>
          GitHub <Arrow href={GITHUB_URL} />
        </a>
      </div>
    </div>
  );
}

function ContactFrame() {
  return (
    <div className={styles.contact}>
      <PixelArt name="mailbox" className={styles.contactArt} />
      <p className={styles.tagRow}>
        <span className={styles.tag}>End of the corridor</span>
      </p>
      <h2 className={styles.contactTitle}>
        Have a strange idea? <span>Let&apos;s build it.</span>
      </h2>
      <p className={styles.pitch}>Open to roles, collaborations, and hard problems. Email is the fastest way in.</p>
      <div className={styles.exhibitFoot}>
        <a href={CONTACT_HREF} className={styles.primary}>
          {CONTACT_EMAIL} <span aria-hidden="true">↗</span>
        </a>
        <a href={LINKEDIN_URL} className={styles.textLink}>
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

const PROPS = ['plant', 'server', 'mug', 'books', 'plant'];

const STATIONS = [
  { kind: 'frame', id: 'intro', chapter: 'Intro', plaque: 'Hello', width: 980, prop: 'plant', content: (api) => <IntroFrame {...api} /> },
  { kind: 'frame', id: FLAGSHIP.id, chapter: FLAGSHIP.title, plaque: `${FLAGSHIP.title} · Flagship`, width: 1040, prop: 'server', content: <FlagshipFrame /> },
  ...EXHIBITS.map((exhibit, index) => ({
    kind: 'frame',
    id: exhibit.id,
    chapter: exhibit.title,
    plaque: exhibit.title,
    width: 820,
    prop: PROPS[(index + 2) % PROPS.length],
    content: <ExhibitFrame exhibit={exhibit} />,
  })),
  { kind: 'frame', id: 'activity', chapter: 'Activity', plaque: 'Activity', width: 760, content: <ActivityFrame /> },
  {
    kind: 'doors',
    id: 'doors',
    chapter: 'Doors',
    doors: [
      { id: 'work', label: 'All work', blurb: '16 projects', href: PROJECTS_URL },
      { id: 'career', label: 'Career', blurb: 'Roles & toolkit', href: '/career' },
      { id: 'writing', label: 'Writing', blurb: 'Essays & reviews', href: BLOG_URL },
      { id: 'about', label: 'About', blurb: 'The story', href: ABOUT_URL },
    ],
  },
  { kind: 'frame', id: 'contact', chapter: 'Say hello', plaque: 'Say hello', width: 720, content: <ContactFrame /> },
];

export default function HomeCorridor() {
  return <RunnerWorld stations={STATIONS} label="Portfolio corridor: run through Reuben's projects" />;
}
