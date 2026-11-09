import Link from 'next/link';
import { SpeedInsights } from '@vercel/speed-insights/next';
import HomeCorridor from '@/components/home/HomeCorridor';
import PixelArt from '@/components/pixel/PixelArt';
import PixelMosaic from '@/components/pixel/PixelMosaic';
import { CONTACT_EMAIL, CONTACT_HREF, LINKEDIN_URL, PROJECTS_URL, RECENT_ROLES } from '@/data/site';
import { EXHIBITS, FLAGSHIP } from '@/data/work';
import styles from './page.module.css';

const WORK = [{ ...FLAGSHIP, flagship: true }, ...EXHIBITS];

export default function Home() {
  return (
    <>
      <SpeedInsights />

      <HomeCorridor />

      <section className={styles.work} id="work" aria-labelledby="work-title">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Prefer to scroll? / 01</p>
              <h2 className={styles.sectionTitle} id="work-title">
                The work, in a list.
              </h2>
            </div>
            <a href={PROJECTS_URL} className={styles.textLink}>
              All 16 projects
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ol className={styles.workList}>
            {WORK.map((item) => (
              <li key={item.id} className={styles.workRow}>
                <div className={styles.workThumb}>
                  <PixelMosaic tone={item.tone} seed={item.id} cols={6} rows={6} className={styles.workMosaic} />
                  <PixelArt name={item.art} className={styles.workSprite} />
                </div>
                <div>
                  <p className={styles.workMeta}>
                    {item.flagship ? <span className={styles.workFlag}>Flagship</span> : null}
                    {item.category}
                  </p>
                  <h3 className={styles.workTitle}>{item.title}</h3>
                </div>
                <p className={styles.workPitch}>{item.pitch}</p>
                <div className={styles.workLinks}>
                  {item.links.map((link) => (
                    <a key={link.href} href={link.href} className={styles.workLink}>
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.career} aria-labelledby="career-title">
        <div className={`container ${styles.careerGrid}`}>
          <div className={styles.careerIntro}>
            <p className="eyebrow">Career / 02</p>
            <h2 className={styles.sectionTitle} id="career-title">
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

      <section className={styles.contact} aria-labelledby="contact-title">
        <div className={`container ${styles.contactInner}`}>
          <div>
            <p className={`eyebrow ${styles.contactEyebrow}`}>Contact / 03</p>
            <h2 className={styles.contactTitle} id="contact-title">
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
