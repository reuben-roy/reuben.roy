# reuben-roy.explosion.fun

The career-and-contact layer of [explosion.fun](https://www.explosion.fun), rebuilt with the
visual language of [mistral.ai](https://mistral.ai): warm cream surfaces, flat borders,
editorial type, and an orange accent.

This subdomain does not duplicate the blog, project archive, CV, or side-project pages.
Those live at explosion.fun. Old URLs are permanently redirected (see `next.config.mjs`).

## Routes

| Route     | What it is                                                        |
| --------- | ----------------------------------------------------------------- |
| `/`       | Editorial home, selected work, interactive corridor, contact      |
| `/career` | Full career page: experience, toolkit, education, certifications  |

Everything else redirects:

| Old path                       | New home                                  |
| ------------------------------ | ----------------------------------------- |
| `/about`                       | `https://www.explosion.fun/about/`        |
| `/blog`, `/blog/*`             | `https://www.explosion.fun/blog/`         |
| `/cv`                          | `https://www.explosion.fun/cv/`           |
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
| `--foreground`    | `#1a1a1e` | Primary text                         |
| `--muted`         | `#6d6d78` | Secondary text                       |
| `--border`        | `#e4e3de` | Hairlines                            |
| `--orange`        | `#ff5229` | CTAs, markers, the runner            |
| `--black`         | `#101013` | Contact band, inverted surfaces      |

Typography pairs Space Grotesk display headlines with Inter body copy and Space Mono
labels. The pixel mark in `src/components/BrandMark.js` is a 2×2 orange/black checker.

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
│   └── SocialLinks.js
└── data/
    ├── career.js        # Experience, skills, education, certifications
    ├── runnerWorlds.js  # Corridor doors and dimensions
    └── site.js          # Nav, socials, selected work, recent roles
```

## License

No LICENSE file. All rights reserved unless otherwise stated.
