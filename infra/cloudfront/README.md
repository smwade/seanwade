# CloudFront routing and caching

The existing `E20VQTC0TY7DFQ` distribution serves the S3 website origin. Its
viewer-request function `sw-misc-router` uses the existing KeyValueStore for
aliases and independently published Misc projects. Keep those associations when
updating the function; the portfolio workflow must continue excluding `misc/*`.

`router.js` redirects public `index.html` aliases before internal object rewrites,
preserves encoded query strings, and redirects registered project roots to their
trailing-slash URL. Run `node --test infra/cloudfront/router.test.mjs` to verify
that these redirects preserve the existing alias, project, and asset routing.

`cache-policy.json` replaces the distribution's legacy cache settings, keeping
cookies and query strings out of the cache key as before. Both gzip and Brotli
are enabled; the distribution must also set `Compress: true`. The zero minimum
TTL lets S3 cache headers control freshness. The default TTL is five minutes;
the maximum permits one year for hashed assets.

The GitHub deployment uploads hashed `_next/static` assets first with
`public,max-age=31536000,immutable`, then uploads HTML and other mutable files
with `public,max-age=0,s-maxage=300,must-revalidate`. Old hashed assets are retained
so open tabs and cached HTML can still load the previous build's chunks. Misc
projects remain owned by their independent publisher.

For an infrastructure update, first save the live distribution configuration,
function configuration, and LIVE and DEVELOPMENT function code. Create or update
the named cache policy, update and test the function in DEVELOPMENT with its
current ETag, then publish it. Update the distribution with its current ETag,
setting `DefaultCacheBehavior.CachePolicyId`, setting `Compress: true`, and
removing `ForwardedValues`, `MinTTL`, `DefaultTTL`, and `MaxTTL` from that behavior.
Preserve every unrelated distribution field and the function's KeyValueStore.
Wait for deployment and invalidate cached content before checking compression.

Rollback uses the saved configuration and function code with fresh ETags. Do
not restore stale ETags or change DNS, the origin, aliases, certificates, or
independently published Misc objects to perform a rollback.
