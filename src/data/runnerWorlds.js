export const RUNNER_DEFAULTS = {
  playerStartX: 200,
  runSpeed: 520,
  playerScreenRatio: 0.18,
  figureWidth: 32,
  doorWidth: 132,
  doorHeight: 208,
};

export const HOME_CORRIDOR = {
  worldWidth: 1880,
  playerStartX: 200,
  runSpeed: 520,
  playerScreenRatio: 0.18,
  hint: 'Run with ← → or the buttons. Stop at a door to open it.',
  doors: [
    {
      id: 'work',
      label: 'Work',
      blurb: 'The project index',
      href: 'https://www.explosion.fun/projects/',
      external: true,
      x: 560,
    },
    {
      id: 'career',
      label: 'Career',
      blurb: 'The long version',
      href: '/career',
      external: false,
      x: 900,
    },
    {
      id: 'writing',
      label: 'Writing',
      blurb: 'Essays & reviews',
      href: 'https://www.explosion.fun/blog/',
      external: true,
      x: 1240,
    },
    {
      id: 'about',
      label: 'About',
      blurb: 'The story',
      href: 'https://www.explosion.fun/about/',
      external: true,
      x: 1580,
    },
  ],
};
