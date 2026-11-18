---
name: verify-reuben-roy
description: Drive and prove the reuben.roy portfolio site (static Next.js web UI: corridor home, work list, career page, redirects, contact links). Use to launch the production build locally, doctor the instance, drive a user-facing feature over HTTP, and capture proof artifacts.
---

# Verify reuben.roy

Static Next.js 15 portfolio site. No CMS, database, or runtime API routes.
All content is local and static. Verification drives the production build
over plain HTTP with `curl` and small Node assertions — no browser required.

- Repo: `/Users/reuben/github/hobby/reuben.roy`
- App: `reuben.roy` (`reuben-roy.explosion.fun`), the career-and-contact layer.
- Surface: web UI only. Routes: `/` (corridor + work list + career teaser + contact),
  `/career`, plus legacy redirects defined in `next.config.mjs`.
- Port: verification uses `4101` (`http://127.0.0.1:4101`) so it never collides
  with `npm run dev` on port `3000`. Two instances side by side are supported
  only on different ports; never drive an instance you did not start.

## Launch

Build once, then start the production server in the background:

```bash
cd /Users/reuben/github/hobby/reuben.roy
npm run build
PORT=4101 npx next start -p 4101 > /tmp/reuben-roy-verify-server.log 2>&1 &
echo $! > /tmp/reuben-roy-verify.pid
```

Ready means all three pass:

```bash
curl -sf http://127.0.0.1:4101/ -o /dev/null
curl -sf http://127.0.0.1:4101/career -o /dev/null
grep -c "Play the portfolio." /tmp/reuben-roy-verify-home.html 2>/dev/null || \
  curl -sf http://127.0.0.1:4101/ | grep -c "Play the portfolio."
```

Expected: both `curl` calls exit `0`; the home markup contains
`Play the portfolio.` If the port is already taken by a process you did not
start, stop and pick another port — do not kill it.

Teardown (kill only what this run started):

```bash
kill "$(cat /tmp/reuben-roy-verify.pid)" && rm /tmp/reuben-roy-verify.pid
```

Or via helper: `./scripts/cleanup.sh` (see Helpers). Cleanup removes the
server and scratch files, never the evidence directory.

## Doctor

One read-only check. Run it first whenever anything looks off:

```bash
./scripts/doctor.sh
# or: ./scripts/doctor.sh --port 4101 --base http://127.0.0.1:4101
```

Doctor asserts: the PID file (if present) is alive, the port answers,
`/` returns 200 and contains the corridor marker `Play the portfolio.`,
`/career` returns 200 and contains `A generalist`, and a sample legacy
redirect (`/about`) returns 308/301 to `explosion.fun`. Non-zero exit means
the instance is not worth driving — relaunch instead of retrying the drive.

## Drive

The harness is plain HTTP: `curl` for fetching, Node one-liners for
assertions, helper scripts for the repeated shapes. No test-only endpoints
exist and none are used; every check exercises the real user path.

```bash
# Fetch a page the way a visitor loads it
curl -s http://127.0.0.1:4101/ -o /tmp/reuben-roy-verify-home.html
# Assert visible copy is present (real user path, not internals)
node -e "const fs=require('fs');const h=fs.readFileSync('/tmp/reuben-roy-verify-home.html','utf8');for(const s of process.argv.slice(1)){if(!h.includes(s)){console.error('MISSING: '+s);process.exit(1)}}console.log('ok')" "Play the portfolio." "The work, in a list."
# Check a redirect without following it
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://127.0.0.1:4101/about
```

Prefer stable user-visible strings (headings, link labels, email address)
over CSS class names or DOM position. See `features/` for per-feature
recipes with exact commands and expected observable results.

## Evidence

Proof artifacts live outside the repo so cleanup can never eat them:

```
/tmp/reuben-roy-verify-<RUN_ID>/<feature>/response.html
/tmp/reuben-roy-verify-<RUN_ID>/<feature>/assertions.log
```

`<RUN_ID>` is a short run label, e.g. `proof-20261118`. For each driven
feature capture:

- the action (exact `curl` command, status code, `Location` header where relevant),
- the resulting state (saved response body plus the assertion log showing
  which user-visible strings were found),
- side effects where they exist (redirect targets, sitemap/robots bodies).

Proof standards: exercise the real user path (`/`, `/career`, legacy URLs);
capture the command and the resulting state, not just a final screenshot;
verify side effects (redirect `Location` values, `sitemap.xml` entries)
alongside visible copy. There are no mocks anywhere in this stack and no
dry-run mode — every request hits the real production build.

## Cleanup

```bash
./scripts/cleanup.sh
# or: ./scripts/cleanup.sh --port 4101
```

Kills only the PID recorded in `/tmp/reuben-roy-verify.pid` (never by process
name), removes the server log and fetched scratch HTML in `/tmp`, and leaves
`/tmp/reuben-roy-verify-<RUN_ID>/` evidence intact. After cleanup, confirm the
evidence directory still exists — a cleanup that eats the proof fails the run.

## Helpers

Executable scripts shipped in `scripts/` (invocation shown above in context):

- `scripts/doctor.sh [--port 4101] [--base URL]` — read-only health check.
- `scripts/capture.sh <RUN_ID> <feature> <path>` — fetches a route, saves
  `response.html`, records status/headers in `assertions.log`.
- `scripts/cleanup.sh [--port 4101]` — tears down only this run's server.

## Feature map

Read `features/README.md` before driving. It indexes every user-facing
feature; each feature file is the recipe for that feature. A proof that
drives one convenient entry point is incomplete when the map lists others —
report uncovered entry points as skipped, never as verified.
