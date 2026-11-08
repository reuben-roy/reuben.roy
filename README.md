# reuben-roy.explosion.fun

The career-and-contact layer of [explosion.fun](https://www.explosion.fun), rebuilt with the
visual language of [mistral.ai](https://mistral.ai): warm cream surfaces, flat borders,
editorial type, and an orange accent.

This subdomain does not duplicate the blog, project archive, CV, or side-project pages.
Those live at explosion.fun. Old URLs are permanently redirected (see `next.config.mjs`).

## Routes

| Route     | What it is                                                            |
| --------- | --------------------------------------------------------------------- |
| `/`       | Editorial home, selected work, interactive corridor, contact          |
| `/career` | Short career narrative: roles and toolkit. The full CV lives on the main site. |

Everything else redirects:

| Old path                       | New home                                  |
| ------------------------------ | ----------------------------------------- |
| `/about`                       | `https://www.explosion.fun/about/`        |
| `/blog`, `/blog/*`             | `https://www.explosion.fun/blog/` (deep paths keep their path) |
| `/cv`                          | `https://www.explosion.fun/cv/`           |
| `/reuben-roy-cv.pdf`           | `https://www.explosion.fun/reuben-roy-cv.pdf` |
| `/cv.md`                       | `https://www.explosion.fun/cv.md`         |
| `/side-track`, `/side-track/*` | `https://www.explosion.fun/side-track/`   |
| `/projects`, `/projects/*`     | `https://www.explosion.fun/projects/`     |

Specific project paths keep their deep links where explosion.fun has a matching page
(for example `/projects/auto-apply` and `/projects/youtube-scholar`). Projects hosted
elsewhere redirect to their live app or repository.

## Stack

- Next.js 15 App Router, React 19, JavaScript
- CSS Modules with global design tokens in `src/app/globals.css`
- `next/font`: Inter, Space Grotesk, Space Mono
- Vercel Analytics and Speed Insights

No CMS, database, or runtime API routes. All content is local and static.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm run start
```

## Design tokens

| Token             | Value     | Use                                  |
| ----------------- | --------- | ------------------------------------ |
| `--background`    | `#fbfbf8` | Page surface                         |
| `--background-alt`| `#f5f4ef` | Alternating sections                 |
| `--background-deep`| `#ebe9e0` | Deeper neutral surfaces             |
| `--foreground`    | `#1a1a1e` | Primary text                         |
| `--foreground-soft`| `#3d3d43` | Body copy on light surfaces         |
| `--muted`         | `#6d6d78` | Secondary text                       |
| `--border`        | `#e4e3de` | Hairlines                            |
| `--border-strong` | `#c9c9c4` | Emphasized rules and chips           |
| `--orange`        | `#ff5229` | CTAs, markers, the runner            |
| `--orange-strong` | `#fa500f` | Orange borders and hover surfaces    |
| `--orange-ink`    | `#c43d14` | Orange text that must meet contrast  |
| `--orange-soft`   | `#fff0eb` | Tinted surfaces                      |
| `--cream`         | `#fafaf4` | Text on dark surfaces                |
| `--black`         | `#101013` | Contact band, inverted surfaces      |
| `--black-soft`    | `#27272b` | Hover state on black surfaces        |
| `--on-dark-muted` | `#a1a1aa` | Eyebrows on dark surfaces            |
| `--on-dark-soft`  | `#c9c9c4` | Body copy on dark surfaces           |
| `--on-dark-border`| `#3d3d43` | Borders on dark surfaces             |

Spacing, radii, container width, and the nav height are also tokens in
`src/app/globals.css`. Typography pairs Space Grotesk display headlines with Inter body
copy and Space Mono labels. The pixel mark in `src/components/BrandMark.js` is a 2×2
orange/black checker.

## Structure

```text
src/
├── app/
│   ├── career/          # Editorial career page
│   ├── layout.js        # Fonts, metadata, nav, footer, analytics
│   ├── page.js          # Home
│   └── globals.css      # Design tokens and base styles
├── components/
│   ├── runner/          # Home corridor: canvas figure, doors, game loop
│   ├── BrandMark.js
│   ├── Footer.js
│   ├── Navbar.js
│   ├── SiteLink.js
│   └── SocialLinks.js
└── data/
    ├── career.js        # Experience summaries and skill groups
    ├── runnerWorlds.js  # Corridor doors and dimensions
    └── site.js          # Nav, socials, selected work, recent roles
```

## License

No LICENSE file. All rights reserved unless otherwise stated.
