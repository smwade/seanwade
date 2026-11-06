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

- `/`: résumé-style introduction highlighting current Google work, Apple Health experience, independent work, and research.
- `/pulshealth/`: product details and the actual animated data-flow component adapted from pulshealth.com, with pause and reduced-motion support.
- `/projects/`: searchable library; existing `/tools/`, `/misc/`, and `/blog/` remain available.
- `/resume/`: detailed experience and publications; the existing PDF remains downloadable.
- A bottom-corner paperclip opens live AI chat using a server-side OpenAI connection.

See [chat setup](docs/ask-sean.md) for the server, background material, and durable usage limits. The 1,000+ user milestone
is supplied by Sean for this redesign; it is not a live analytics counter.

Use Node 24+. Build with `npm run build`, set `OPENAI_API_KEY` server-side, then
run `npm run serve` at http://localhost:4174. The static-only Python preview
does not include `/api/ask`.
The local Misc archive registry is supplied by the production publishing system;
its existing unavailable state is expected in a standalone static preview.

Visual direction: Manrope type; charcoal `#0b0e14`, slate `#141a24`, soft white
`#edf2fa`, muted text `#a3afc2`, and blue `#8eb5ff`. The résumé leads with current
Google work; interactive product storytelling lives in the PulsHealth tab.
The project library keeps its filters and illustrations in a dark palette.
No private knowledge-base files are bundled with the site.
