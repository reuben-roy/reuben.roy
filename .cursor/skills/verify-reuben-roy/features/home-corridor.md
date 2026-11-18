# Home corridor

The home page opens on a playable side-scrolling corridor where each frame on the wall is a shipped project exhibit and doors at the end lead to the projects index, career, writing, and about pages.

## Sub-features

- `corridor-intro` renders the intro frame with the "Play the portfolio." headline.
- `corridor-run` exposes keyboard, on-screen arrow, swipe, and rail controls for moving through exhibits.
- `corridor-doors` links each end-of-corridor door to its destination.
- `corridor-skip` offers the same exhibits as a plain scrollable list for visitors who would rather scroll.

## How to get to it (user POV)

- Open `/` in a browser.
- Use `Tab` to move focus into a corridor frame (camera follows).
- Press `←`/`→` or `A`/`D`, hold the on-screen arrows, swipe, use a horizontal trackpad gesture, or jump from the bottom rail.
- Scroll past the corridor to `#work` for the plain list.

## Driving it with http-harness

Preconditions:

- Production server is healthy at `http://127.0.0.1:4101`.
- `scripts/doctor.sh` exits `0`.
- Evidence directory `/tmp/reuben-roy-verify-<RUN_ID>/home-corridor/` exists.

- **Load home.** Fetch the page. Run `scripts/capture.sh <RUN_ID> home-corridor /`. Status `200` and the saved body contains `Play the portfolio.`.
- **Intro frame.** Assert the intro copy. Run `node -e "const h=require('fs').readFileSync('/tmp/reuben-roy-verify-<RUN_ID>/home-corridor/response.html','utf8');for(const s of ['Play the portfolio.','Start with the flagship']){if(!h.includes(s)){console.error('MISSING: '+s);process.exit(1)}}console.log('ok')"`. Exit `0` with `ok`.
- **Exhibit stops.** Assert flagship and exhibit titles render server-side. Run the same Node shape with `Auto-Apply`, `Greatness`, `Side-Track`, `YouTube Scholar`. All present, exit `0`.
- **Corridor controls.** Assert the runner affordances exist in markup. Check for `aria-label` rail/stop controls and the `Start with the flagship` button in the saved body. Present means the drive path renders; interactive key/pointer motion itself needs a browser and is reported as skipped by this harness.
- **Skip path.** Assert the plain list anchor. Saved body contains `id="work"` and `The work, in a list.`.
- **Proof.** The `capture.sh` run leaves `response.html` and `assertions.log` under `/tmp/reuben-roy-verify-<RUN_ID>/home-corridor/`. Both name the feature and show the asserted strings.

## Gotchas

- The corridor is a client component; exhibit titles also render in the server list below, so assert on list copy, not canvas pixels.
- Keyboard `n` or `/` shortcuts do not exist here — do not press them expecting navigation.
- Interactive motion (arrow keys, swipe) cannot be proven over HTTP; report it as skipped, not verified, when using this harness.
- `npm run dev` uses Turbopack on port `3000`; verification must use the production build on `4101` so results match what ships.
