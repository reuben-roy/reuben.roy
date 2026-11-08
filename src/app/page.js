import Link from 'next/link';
import { SpeedInsights } from '@vercel/speed-insights/next';
import SocialLinks from '@/components/SocialLinks';
import RunnerWorld from '@/components/runner/RunnerWorld';
import { HOME_CORRIDOR } from '@/data/runnerWorlds';
import {
  CONTACT_EMAIL,
  CONTACT_HREF,
  LINKEDIN_URL,
  PROJECTS_URL,
  RECENT_ROLES,
  SELECTED_WORK,
} from '@/data/site';
import styles from './page.module.css';

const TICKER = [
  'Agentic systems',
  'Data products',
  'Native apps',
  'Backend services',
  'Interactive interfaces',
  'Technical writing',
];

export default function Home() {
  return (
    <>
      <SpeedInsights />

      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={`eyebrow ${styles.heroEyebrow}`}>Reuben Roy / Generalist software engineer</p>
            <h1 className={styles.title}>
              I build agents, interfaces, and the data stories between them.
            </h1>
            <p className={styles.lede}>
              Full-stack engineer working across agentic systems, backend services, and native
              apps. I care about software that can explain what it did — and fail loudly when it
              cannot.
            </p>
            <div className={styles.actions}>
              <a href={PROJECTS_URL} className={styles.primary}>
                See the work
                <span aria-hidden="true">↗</span>
              </a>
              <Link href="/career" className={styles.secondary}>
                Career, in detail
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <SocialLinks />
          </div>

          <aside className={styles.notes} aria-label="At a glance">
            <div className={styles.notesHead}>
              <span className="eyebrow">At a glance</span>
              <span className={styles.notesDot} aria-hidden="true" />
            </div>
            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt>Focus</dt>
                <dd>Agentic systems, data products, and native apps.</dd>
              </div>
              <div className={styles.fact}>
                <dt>Now</dt>
                <dd>MS Software Engineering, Arizona State University.</dd>
              </div>
              <div className={styles.fact}>
                <dt>Approach</dt>
                <dd>Build the failure path first, then make the happy path obvious.</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <div className={styles.ticker} aria-hidden="true">
        <div className={`container ${styles.tickerInner}`}>
          {TICKER.map((item) => (
            <span key={item} className={styles.tickerItem}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className={styles.work}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Selected work / 01</p>
              <h2 className={styles.sectionTitle}>Shipped, not shelved.</h2>
            </div>
            <a href={PROJECTS_URL} className={styles.textLink}>
              All projects
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className={styles.workGrid}>
            {SELECTED_WORK.map((project) => (
              <a key={project.title} href={project.href} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardIndex}>{project.index}</span>
                  <span className={styles.cardCategory}>{project.category}</span>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardCopy}>{project.description}</p>
                <span className={styles.cardLink}>
                  Open project
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.corridorSection}>
        <div className="container">
          <div className={styles.corridorHead}>
            <div>
              <p className="eyebrow">The index / 02</p>
              <h2 className={styles.sectionTitle}>Pick a door.</h2>
            </div>
            <p className={styles.corridorCopy}>
              A small index you can run through. Use the arrow keys, or take the direct links.
              Every door leads somewhere real.
            </p>
          </div>
          <div className={styles.corridorBody}>
            <RunnerWorld {...HOME_CORRIDOR} />
          </div>
        </div>
      </section>

      <section className={styles.career}>
        <div className={`container ${styles.careerGrid}`}>
          <div className={styles.careerIntro}>
            <p className="eyebrow">Career / 03</p>
            <h2 className={styles.sectionTitle}>
              Equal parts backend, interface, and shipped.
            </h2>
            <p className={styles.careerCopy}>
              Roles across production AI, university teaching, and healthcare data. The
              through-line is systems that stay understandable after launch.
            </p>
            <Link href="/career" className={styles.textLink}>
              Read the full career
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ol className={styles.roles}>
            {RECENT_ROLES.map((role, index) => (
              <li key={role.role} className={styles.role}>
                <span className={styles.roleIndex}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={styles.roleName}>{role.role}</h3>
                  <p className={styles.roleCompany}>{role.company}</p>
                  <p className={styles.roleNote}>{role.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.contact}>
        <div className={`container ${styles.contactInner}`}>
          <div>
            <p className={`eyebrow ${styles.contactEyebrow}`}>Contact / 04</p>
            <h2 className={styles.contactTitle}>
              Have a strange idea?
              <br />
              Let&apos;s build it.
            </h2>
          </div>
          <div className={styles.contactSide}>
            <p className={styles.contactCopy}>
              Open to roles, collaborations, and hard problems. The fastest way in is email.
            </p>
            <div className={styles.contactActions}>
              <a href={CONTACT_HREF} className={styles.contactCta}>
                {CONTACT_EMAIL}
                <span aria-hidden="true">↗</span>
              </a>
              <a href={LINKEDIN_URL} className={styles.contactLink}>
                LinkedIn
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
