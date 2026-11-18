# Redirects and contact

Legacy paths permanently redirect to their new homes on explosion.fun or GitHub, the contact band offers email and LinkedIn actions, auxiliary routes serve sitemap/robots, and unknown paths render a branded 404.

## Sub-features

- `redirects-legacy` permanently redirects old `/about`, `/blog`, `/cv`, `/side-track`, and `/projects/*` paths.
- `contact-actions` exposes the `hello@explosion.fun` mailto and LinkedIn links on `/` and in the footer.
- `aux-routes` serves `/sitemap.xml` and `/robots.txt`.
- `not-found` renders the branded 404 page for unknown paths.

## How to get to it (user POV)

- Open a legacy URL such as `/about`, `/blog`, `/cv`, or `/projects/auto-apply`.
- Scroll to the contact band ("Have a strange idea?") on `/` or the footer email link.
- Open `/sitemap.xml` or `/robots.txt`.
- Open any unknown path such as `/no-such-page-verify`.

## Driving it with http-harness

Preconditions:

- Production server is healthy at `http://127.0.0.1:4101`.
- `scripts/doctor.sh` exits `0`.
- Evidence directory `/tmp/reuben-roy-verify-<RUN_ID>/redirects-contact/` exists.

- **Legacy redirect.** Do not follow it. Run `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://127.0.0.1:4101/about`. Expect `308 https://www.explosion.fun/about/`. Repeat for `/cv` (expect `https://www.explosion.fun/cv/`), `/projects/auto-apply` (expect `https://www.explosion.fun/projects/auto-apply/`), and `/projects/kali` (expect `https://github.com/reuben-roy/kali`).
- **Wildcard redirect.** Run `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://127.0.0.1:4101/blog/some-post`. Expect `308` to `https://www.explosion.fun/blog/some-post/`.
- **Contact actions.** Fetch home. Run `scripts/capture.sh <RUN_ID> redirects-contact /` then check the saved body for `mailto:hello@explosion.fun`, `hello@explosion.fun`, and `https://www.linkedin.com/in/reuben-roy`. All present.
- **Aux routes.** Run `curl -sf http://127.0.0.1:4101/sitemap.xml | grep -c "reuben-roy.explosion.fun"` (expect `>= 1`) and `curl -sf http://127.0.0.1:4101/robots.txt | grep -c "sitemap"` (expect `>= 1`).
- **404 page.** Run `curl -s -w "\n%{http_code}\n" http://127.0.0.1:4101/no-such-page-verify | tail -1` (expect `404`) and fetch the body to a proof file; the body contains `This door doesn` (apostrophe is HTML-escaped, so match the prefix).
- **Proof.** Save each redirect's status/`Location` line and the contact/404 assertions in `/tmp/reuben-roy-verify-<RUN_ID>/redirects-contact/assertions.log` alongside `response.html`.

## Gotchas

- Next.js serves redirects as `308`, not `301` — assert `308`.
- Always inspect `Location` without `-L`; following the redirect proves the other site, not this one.
- External redirect targets may be unreachable from the sandbox; assert the `Location` value, not the destination's status.
- The 404 body escapes the apostrophe (`doesn&#x27;t`), so match `This door doesn` without the trailing quote.
