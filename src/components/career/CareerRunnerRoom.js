'use client';

import RunnerWorld from '@/components/runner/RunnerWorld';
import WallFrame from '@/components/runner/WallFrame';
import ExperienceSection from '@/components/career/ExperienceSection';
import SkillsSection from '@/components/career/SkillsSection';
import CertificationsSection from '@/components/career/CertificationsSection';
import CareerPortfolioSection from '@/components/career/CareerPortfolioSection';
import { buildCareerWorld, SITE_SECTIONS } from '@/data/runnerWorlds';
import styles from '@/components/runner/runner.module.css';

const careerWorld = buildCareerWorld();

function CareerMobileStack() {
  return (
    <>
      <WallFrame label="Work Experience" mobileStack id="experience">
        <ExperienceSection />
      </WallFrame>
      <WallFrame label="Skills" mobileStack id="skills">
        <SkillsSection />
      </WallFrame>
      <WallFrame label="Certifications" mobileStack id="certifications">
        <CertificationsSection />
      </WallFrame>
      <WallFrame label="Portfolio" mobileStack id="portfolio">
        <CareerPortfolioSection />
      </WallFrame>
    </>
  );
}

export default function CareerRunnerRoom() {
  const intro = (
    <>
      <h2>Work Experience</h2>
      <p>Move through experience, skills, certifications, and selected work in a framed gallery layout.</p>
    </>
  );

  return (
    <RunnerWorld
      worldWidth={careerWorld.worldWidth}
      doors={careerWorld.doors}
      variant="gallery"
      fullPage
      intro={intro}
      mobileContent={<CareerMobileStack />}
      theme={careerWorld.theme}
      sectionNav={SITE_SECTIONS}
      hudLink={careerWorld.hudLink}
      hint={careerWorld.hint}
      initialX={careerWorld.playerStartX}
      runSpeed={careerWorld.runSpeed}
      playerScreenRatio={careerWorld.playerScreenRatio}
      snapPoints={careerWorld.snapPoints}
    >
      <WallFrame label="Work Experience" x={careerWorld.frames[0].x} width={careerWorld.frames[0].width} height={careerWorld.frames[0].height} id="experience">
        <div className={styles.frameScroll}>
          <ExperienceSection />
        </div>
      </WallFrame>
      <WallFrame label="Skills" x={careerWorld.frames[1].x} width={careerWorld.frames[1].width} height={careerWorld.frames[1].height} id="skills">
        <div className={styles.frameScroll}>
          <SkillsSection />
        </div>
      </WallFrame>
      <WallFrame label="Certifications" x={careerWorld.frames[2].x} width={careerWorld.frames[2].width} height={careerWorld.frames[2].height} id="certifications">
        <div className={styles.frameScroll}>
          <CertificationsSection />
        </div>
      </WallFrame>
      <WallFrame label="Portfolio" x={careerWorld.frames[3].x} width={careerWorld.frames[3].width} height={careerWorld.frames[3].height} id="portfolio">
        <div className={styles.frameScroll}>
          <CareerPortfolioSection />
        </div>
      </WallFrame>
    </RunnerWorld>
  );
}
