# reuben.roy verification map

This directory is the maintained source for verifying the user-facing behavior of the reuben.roy portfolio site. Read the index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- Serve the production build at `http://127.0.0.1:4101` (`npm run build`, then `npx next start -p 4101`).
- Base URL for every recipe is `http://127.0.0.1:4101` unless the recipe says otherwise.
- Run `scripts/doctor.sh` and require exit `0` before driving anything.
- Never drive an instance that was not started by this verification run.
- Evidence goes to `/tmp/reuben-roy-verify-<RUN_ID>/<feature>/` and survives cleanup.

## Driving conventions

- Start every recipe from the baseline state unless its preconditions say otherwise.
- Prefer user-visible strings (headings, link labels, email) over CSS selectors or DOM position.
- Treat every command as literal. Keep quoted strings and flags unchanged.
- Run health checks through `scripts/doctor.sh`.
- Run route fetches through `scripts/capture.sh <RUN_ID> <feature> <path>`.
- Do not remove proof artifacts during cleanup.

## Proof and skip reporting

- Capture the user action and the resulting state, not only a status code.
- HTTP proof includes the command, status code, `Location` header where relevant, saved body, and assertion log.
- Mutation proof does not apply: the site has no mutations. Redirect proof includes the `Location` value asserted against `next.config.mjs`.
- Record the feature ID and entry point used with every artifact.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with http-harness` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands, and observable proof.

## Features

- [Home corridor](./home-corridor.md) covers the playable corridor intro, exhibit stops, door links, and the skip-to-list path.
- [Work list](./work-list.md) covers the scrollable project list below the corridor, flagship row, and outbound project links.
- [Career page](./career.md) covers the `/career` narrative, experience entries, and CV/project-index links.
- [Redirects and contact](./redirects-contact.md) covers legacy URL redirects, contact actions, sitemap/robots, and the 404 page.
