import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import CertificationsSection from './CertificationsSection';
import styles from './career.module.css';

export default function CareerSections({ compact = false, className = '' }) {
    return (
        <div className={`${compact ? '' : styles.careerSections} ${className}`.trim()}>
            <SkillsSection />
            <ExperienceSection />
            <CertificationsSection />
        </div>
    );
}
