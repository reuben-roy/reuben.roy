export const SITE_URL = 'https://reuben-roy.explosion.fun';
export const SITE_DOMAIN = 'reuben-roy.explosion.fun';
export const MAIN_SITE = 'https://www.explosion.fun';
export const PROJECTS_URL = `${MAIN_SITE}/projects/`;
export const BLOG_URL = `${MAIN_SITE}/blog/`;
export const ABOUT_URL = `${MAIN_SITE}/about/`;
export const CV_URL = `${MAIN_SITE}/cv/`;
export const CONTACT_EMAIL = 'hello@explosion.fun';
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;
export const GITHUB_URL = 'https://github.com/reuben-roy';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/reuben-roy';
const YOUTUBE_URL = 'https://www.youtube.com/@reubenroy';

export const NAV_LINKS = [
  { label: 'Work', href: PROJECTS_URL },
  { label: 'Career', href: '/career' },
  { label: 'Writing', href: BLOG_URL },
  { label: 'About', href: ABOUT_URL },
];

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: GITHUB_URL },
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'YouTube', href: YOUTUBE_URL },
];

export const RECENT_ROLES = [
  {
    role: 'AI Engineer (Capstone)',
    company: 'Aligned Rewards',
    note: 'Production RAG, with a local-model fallback path instead of a single provider dependency.',
  },
  {
    role: 'Graduate Teaching Assistant / AI Engineer',
    company: 'Arizona State University',
    note: 'A privacy-first auto-grader that keeps student work on university infrastructure.',
  },
  {
    role: 'Software Engineer',
    company: 'RCKR Software · Trubridge / CPSI',
    note: 'FHIR interoperability services and a 64 TB hospital-data migration.',
  },
];
