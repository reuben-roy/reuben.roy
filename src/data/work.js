import { MAIN_SITE, PROJECTS_URL } from './site';

// The exhibits hung in the corridor and listed below it. Case studies live on
// explosion.fun; this site only pitches them and links out.
export const FLAGSHIP = {
  id: 'auto-apply',
  title: 'Auto-Apply',
  category: 'Agentic AI',
  art: 'autoApply',
  tone: 'amber',
  pitch:
    'A local-first agent that applies to jobs overnight, and knows when not to. Every answer carries a confidence score, and it only submits when it can prove it should.',
  principle: 'The model never drives the browser and never decides to submit. It only answers questions.',
  stats: [
    { value: '21.7k', label: 'lines of Python' },
    { value: '724', label: 'tests' },
    { value: '4', label: 'ATS platforms' },
    { value: '0 B', label: 'of profile data leave the machine' },
  ],
  links: [{ label: 'Read the case study', href: `${PROJECTS_URL}auto-apply/` }],
  note: 'Private repo · walkthrough on request',
};

export const EXHIBITS = [
  {
    id: 'greatness',
    title: 'Greatness',
    category: 'Data product',
    art: 'greatness',
    tone: 'orange',
    pitch:
      'Define what greatness means to you, upload your browsing history, and get a composite score for intentional attention.',
    proof: [
      'Parsed in the browser, so raw history never reaches the server',
      'Self-Actualization 45% · Deep Work 30% · Drift Friction 25%',
      'Opt-in public leaderboard',
    ],
    links: [{ label: 'Open project', href: `${PROJECTS_URL}greatness/` }],
  },
  {
    id: 'side-track',
    title: 'Side-Track',
    category: 'iOS app · Shipped',
    art: 'sideTrack',
    tone: 'mint',
    pitch:
      'A local-first lifting tracker on the App Store, with a per-muscle fatigue engine that picks your next workout.',
    proof: [
      'Fatigue model with per-muscle recovery rates',
      '1RM estimated four ways, updated every qualifying set',
      'HealthKit sync and a global leaderboard',
    ],
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/us/app/side-track/id6755348971' },
      { label: 'Details', href: `${MAIN_SITE}/side-track/` },
    ],
  },
  {
    id: 'youtube-scholar',
    title: 'YouTube Scholar',
    category: 'Data visualisation',
    art: 'youtubeScholar',
    tone: 'rose',
    pitch:
      'An interactive D3 audit of years of watch history: curiosity velocity, channel loyalty, and the shape of a rabbit hole.',
    proof: [
      'Takeout pipeline from raw HTML and CSV exports',
      'Curiosity velocity, loyalty, and topic drift views',
    ],
    links: [{ label: 'Open project', href: `${PROJECTS_URL}youtube-scholar/` }],
  },
  {
    id: 'lofty',
    title: 'Lofty',
    category: 'AI product',
    art: 'lofty',
    tone: 'blue',
    pitch:
      'A real-estate CRM demo with a hybrid onboarding assistant: deterministic guides first, retrieval second, the LLM last.',
    proof: [
      'Guides above 0.75 confidence skip the LLM entirely',
      'Embeddings blended with lexical search over FAQ and tutorials',
      'Nine guided tours driven by DOM overlays',
    ],
    links: [{ label: 'View repository', href: 'https://github.com/reuben-roy/blistering-barnacles' }],
  },
];
