export const SITE_URL = 'https://reuben-roy.explosion.fun';
export const SITE_DOMAIN = 'reuben-roy.explosion.fun';
export const MAIN_SITE = 'https://www.explosion.fun';
export const PROJECTS_URL = `${MAIN_SITE}/projects/`;
export const BLOG_URL = `${MAIN_SITE}/blog/`;
export const ABOUT_URL = `${MAIN_SITE}/about/`;
export const CV_URL = `${MAIN_SITE}/cv/`;
const SIDE_TRACK_URL = `${MAIN_SITE}/side-track/`;
export const CONTACT_EMAIL = 'hello@explosion.fun';
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;
const GITHUB_URL = 'https://github.com/reuben-roy';
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

export const SELECTED_WORK = [
  {
    index: '01',
    title: 'Auto-Apply',
    category: 'Agentic AI',
    description:
      'A local-first agent that fills and verifies job applications overnight, and stops when it is not sure.',
    href: `${PROJECTS_URL}auto-apply/`,
  },
  {
    index: '02',
    title: 'Greatness',
    category: 'Data app',
    description:
      'Self-actualization scoring built from your own browsing data, with a public leaderboard.',
    href: `${PROJECTS_URL}greatness/`,
  },
  {
    index: '03',
    title: 'YouTube Scholar',
    category: 'Visualisation',
    description:
      'An interactive D3 audit of years of watch history: curiosity velocity, channel loyalty, and rabbit holes.',
    href: `${PROJECTS_URL}youtube-scholar/`,
  },
  {
    index: '04',
    title: 'Side-Track',
    category: 'iOS app',
    description:
      'A lifting tracker with a random workout picker, fatigue tracking, and local rankings.',
    href: SIDE_TRACK_URL,
  },
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
