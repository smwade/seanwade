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
