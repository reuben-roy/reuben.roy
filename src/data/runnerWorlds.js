// Single black + neon "pixel arcade" theme. Everything reads off the global
// --background / --foreground / --accent tokens; these vars are the per-runner
// overrides consumed by runner.module.css via toThemeVars().
export const THEME = {
  skyTop: '#050506',
  skyBottom: '#050506',
  wallTop: '#070708',
  wallBottom: '#050506',
  wainscot: '#0c0c0f',
  trim: 'var(--accent)',
  glow: 'var(--accent-glow)',
  lane: 'var(--accent)',
  floorTop: '#08080a',
  floorBottom: '#050506',
  frameOuter: '#0d0d10',
  frameInner: '#070709',
  frameMat: '#0a0a0c',
  contentSurface: '#08080b',
  plaque: '#0c0c10',
  plaqueText: 'var(--foreground)',
};

export const RUNNER_DEFAULTS = {
  playerStartX: 200,
  runSpeed: 650,
  playerScreenRatio: 0.24,
  figureWidth: 32,
  doorWidth: 150,
  doorHeight: 230,
  returnDoorWidth: 130,
};

// Primary cross-page navigation surfaced inside every runner world, so visitors
// can jump between sections without running the character to a door.
export const SITE_SECTIONS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'career', label: 'Work Experience', href: '/career' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'about', label: 'About', href: '/about' },
];

export const HOME_CORRIDOR = {
  worldWidth: 3320,
  playerStartX: 220,
  runSpeed: 650,
  playerScreenRatio: 0.22,
  theme: THEME,
  hint: 'Use ← → or A / D to run · press Enter at a glowing door',
  // The intro/headline frame (rendered by Hero) sits at this x.
  introFrame: { id: 'intro', x: 470, width: 820, height: 560 },
  // A second frame with the live "now" widgets (Spotify + Habitica).
  liveFrame: { id: 'now', x: 1180, width: 470, height: 470 },
  doors: [
    { id: 'projects', label: 'Projects', href: '/projects', x: 1700 },
    { id: 'career', label: 'Work Experience', href: '/career', x: 2160 },
    { id: 'blog', label: 'Blog', href: '/blog', x: 2620 },
    { id: 'about', label: 'About', href: '/about', x: 3080 },
  ],
};

export function buildProjectsDoorWorld(projects) {
  const startX = 700;
  const spacing = 330;
  const doors = projects.map((project, i) => ({
    id: project.id,
    label: project.title,
    blurb: project.tagline,
    href: `/projects/${project.id}`,
    x: startX + i * spacing,
    height: 300,
  }));

  return {
    worldWidth: startX + projects.length * spacing + 240,
    playerStartX: 220,
    runSpeed: 650,
    playerScreenRatio: 0.22,
    theme: THEME,
    returnHref: '/',
    hudLink: { href: '/', label: 'Home' },
    hint: 'Run to a project door and press Enter · run left to go home',
    doors: [
      { id: 'projects-home', label: 'Home', href: '/', x: 240, variant: 'return' },
      ...doors,
    ],
    snapPoints: doors.map((d) => ({ id: d.id, label: d.label, x: d.x - 200 })),
  };
}

const PROJECT_FRAME_LAYOUT = [
  { type: 'header', label: 'Overview', width: 760, height: 520 },
  { type: 'live', label: 'Live', width: 980, height: 560 },
  { type: 'why', label: 'Why', width: 760, height: 520 },
  { type: 'how', label: 'How', width: 920, height: 660 },
  { type: 'details', label: 'Details', width: 800, height: 540 },
];

export function buildProjectRoomWorld(project) {
  const startX = 700;
  const gap = 360;
  const frames = [];
  let x = startX;

  PROJECT_FRAME_LAYOUT.forEach((item) => {
    // Skip the live frame when there's nothing to embed/link.
    if (item.type === 'live' && !project.previewPath && !project.liveUrl) return;
    if (item.type === 'how' && !project.mermaid && !project.architectureFallback && !project.diagrams?.length) return;
    frames.push({
      id: `${project.id}-${item.type}`,
      label: item.label,
      type: item.type,
      x: x + item.width / 2,
      width: item.width,
      height: item.height,
    });
    x += item.width + gap;
  });

  return {
    worldWidth: x + 240,
    playerStartX: 220,
    runSpeed: 650,
    playerScreenRatio: 0.18,
    theme: THEME,
    returnHref: '/projects',
    hudLink: { href: '/projects', label: 'Projects' },
    hint: 'Run right through the frames · run left to exit',
    doors: [{ id: 'project-back', label: 'Projects', href: '/projects', x: 240, variant: 'return' }],
    frames,
    snapPoints: frames.map((f) => ({ id: f.id, label: f.label, x: f.x - 200 })),
  };
}

export function buildCareerWorld() {
  const layout = [
    { id: 'experience', label: 'Work Experience', width: 940, height: 560 },
    { id: 'skills', label: 'Skills', width: 880, height: 540 },
    { id: 'certifications', label: 'Certifications', width: 820, height: 520 },
    { id: 'portfolio', label: 'Portfolio', width: 900, height: 560 },
  ];

  const startX = 700;
  const gap = 360;
  const frames = [];
  let x = startX;
  layout.forEach((item) => {
    frames.push({ ...item, x: x + item.width / 2 });
    x += item.width + gap;
  });

  return {
    worldWidth: x + 240,
    playerStartX: 220,
    runSpeed: 650,
    playerScreenRatio: 0.18,
    theme: THEME,
    returnHref: '/',
    hudLink: { href: '/', label: 'Home' },
    hint: 'Run right through the gallery · run left to go home',
    doors: [{ id: 'career-home', label: 'Home', href: '/', x: 240, variant: 'return' }],
    frames,
    snapPoints: frames.map((f) => ({ id: f.id, label: f.label, x: f.x - 200 })),
  };
}
