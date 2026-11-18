# Work list

Below the corridor, the home page repeats every exhibit as a plain scrollable list with flagship marker, category, pitch, and outbound links, plus an "All 16 projects" link to the main-site archive.

## Sub-features

- `work-flagship` marks the Auto-Apply row as the flagship exhibit.
- `work-rows` renders one row per exhibit with category, title, pitch, and links.
- `work-outbound` links each row to its case study, app, or repository.
- `work-archive` links to the full 16-project archive on explosion.fun.

## How to get to it (user POV)

- Open `/` and scroll to "The work, in a list." (`#work`).
- Choose any project link (e.g. "Read the case study", "Open project", "App Store", "View repository").
- Choose "All 16 projects" to reach the full archive.

## Driving it with http-harness

Preconditions:

- Production server is healthy at `http://127.0.0.1:4101`.
- `scripts/doctor.sh` exits `0`.
- Evidence directory `/tmp/reuben-roy-verify-<RUN_ID>/work-list/` exists.

- **Load list.** Fetch home. Run `scripts/capture.sh <RUN_ID> work-list /`. Status `200`.
- **Flagship row.** Assert the flagship marker and title. Run `node -e "const h=require('fs').readFileSync('/tmp/reuben-roy-verify-<RUN_ID>/work-list/response.html','utf8');for(const s of ['Flagship','Auto-Apply','Agentic AI']){if(!h.includes(s)){console.error('MISSING: '+s);process.exit(1)}}console.log('ok')"`. Exit `0`.
- **Rows.** Assert each exhibit title. Run the same Node shape with `Greatness`, `Side-Track`, `YouTube Scholar`, `Lofty`. All present, exit `0`.
- **Outbound links.** Assert destinations are present in markup. Check the saved body for `https://www.explosion.fun/projects/auto-apply/`, `https://apps.apple.com/us/app/side-track/id6755348971`, and `https://github.com/reuben-roy/blistering-barnacles`. All present.
- **Archive link.** Assert `All 16 projects` and `https://www.explosion.fun/projects/` appear in the saved body.
- **Link reachability (optional).** External destinations may be offline; a failed outbound fetch is reported as unreachable, never as a site failure. Record the attempted URL and error.
- **Proof.** `response.html` and `assertions.log` under `/tmp/reuben-roy-verify-<RUN_ID>/work-list/` show the asserted titles and links.

## Gotchas

- The list duplicates corridor content by design — asserting a title proves the list row only when the `#work` section marker is also present.
- Pitch copy lives in `src/data/work.js`; assert rendered HTML, not the data file.
- Do not follow external links as proof of this site; their availability is out of scope.
