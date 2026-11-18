# Career page

The `/career` route is a short editorial career narrative — roles and toolkit summaries — that points to the full CV on the main site instead of duplicating it.

## Sub-features

- `career-narrative` renders the lede and section headings.
- `career-experience` lists each experience entry with role, company, period, and summary.
- `career-toolkit` lists skill groups.
- `career-outbound` links to the full CV and the project index.

## How to get to it (user POV)

- Open `/career` directly.
- Choose "Career" in the navbar (desktop) or the mobile menu.
- Choose "Read the full career" in the home page career teaser (`/`, section "Career / 02").

## Driving it with http-harness

Preconditions:

- Production server is healthy at `http://127.0.0.1:4101`.
- `scripts/doctor.sh` exits `0`.
- Evidence directory `/tmp/reuben-roy-verify-<RUN_ID>/career/` exists.

- **Load career.** Fetch the route. Run `scripts/capture.sh <RUN_ID> career /career`. Status `200` and the saved body contains `A generalist`.
- **Narrative.** Assert headings. Run `node -e "const h=require('fs').readFileSync('/tmp/reuben-roy-verify-<RUN_ID>/career/response.html','utf8');for(const s of ['Where the work happened.','Experience']){if(!h.includes(s)){console.error('MISSING: '+s);process.exit(1)}}console.log('ok')"`. Exit `0`.
- **Experience rows.** Assert employers render. Run the same Node shape with `Aligned Rewards`, `Arizona State University`, `RCKR Software`. All present, exit `0`.
- **Outbound links.** Assert the CV and project-index links. Check the saved body for `https://www.explosion.fun/cv/` and `https://www.explosion.fun/projects/`. Both present.
- **Navbar entry.** Assert the navbar reaches career. Fetch `/` and check the saved body for `href="/career"` alongside `Career`. Present means the entry point exists.
- **Proof.** `response.html` and `assertions.log` under `/tmp/reuben-roy-verify-<RUN_ID>/career/` show the career copy and link targets.

## Gotchas

- The full CV lives at explosion.fun by design — its absence here is correct, not a gap.
- The career teaser on `/` ("Equal parts backend, interface, and shipped.") duplicates the lede; assert the `/career` body, not just the teaser.
- Canonical URL is `/career`; do not assert a trailing-slash variant.
