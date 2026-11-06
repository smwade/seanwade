# seanwade.com

Personal website built with Next.js and TypeScript.

[Visit the site](https://seanwade.com)

## Website analytics

Cookie-free self-hosted Umami replaces the previous GA4 browser tag. Historical
GA4 reports remain in the existing property. `public/analytics.js` is shared by
the Next.js site and standalone calculators. The published site ID and collector
URL are public configuration, not API credentials.

Collection runs only on the production host, respects Do Not Track and Global
Privacy Control, and excludes query strings, fragments, referrer paths, page
titles, calculator values and user identity. The gateway repeats the filtering.
Pageviews and browser Web Vitals are automatic. Fixed events cover resume
downloads, contact/GitHub/project clicks, tool opens, first tool interaction,
share attempts and export attempts. A click is intent, not proof of an external
conversion. Calculators retain their scenario locally before clearing it from
browser history; no scenario is sent to analytics.

`/privacy/` describes collection. The backend and private analytics credentials
are maintained separately from this site. Run `bun run lint`, `bunx tsc --noEmit`,
`node --test tests/analytics.test.mjs`, and `bun run build` before release.

## Personal site redesign

Branch: `site/personal-redesign`.

- `/`: introduction, interactive portrait, featured PulsHealth project, career summary.
- `/pulshealth/`: product showcase using the real Explore screenshot from pulshealth.com.
- `/projects/`: searchable library; existing `/tools/`, `/misc/`, and `/blog/` remain available.
- `/resume/`: detailed experience and publications; the existing PDF remains downloadable.
- `/ask/`: clearly labeled local conversation preview. No live LLM or paid requests.

See [the chat integration proposal](docs/ask-sean.md) for live API hosting, reviewed
background material, and durable usage/spending limits. The 1,000+ user milestone
is supplied by Sean for this redesign; it is not a live analytics counter.

Build with `npm run build`, then preview the static output with
`python3 -m http.server 4173 --directory out` at http://localhost:4173.
The local Misc archive registry is supplied by the production publishing system;
its existing unavailable state is expected in a standalone static preview.

Visual direction: Manrope type; ink `#172641`, cobalt `#2854d7`, cloud `#f7f9fc`,
muted blue `#526079`, and PulsHealth navy `#0b1625`. A quiet portfolio frame makes
room for product imagery and an interactive mathematical line field. No private
knowledge-base files are bundled with the site.
