# Ask Sean

The paperclip opens a real OpenAI chat. No canned answers or browser-side API key.

## Run locally

Requires Node 24. Build the static site, then run the companion server:

```sh
npm run build
node --env-file-if-exists=.env.local server/index.mjs
```

Open `http://localhost:4174`. Set `OPENAI_API_KEY` in the ignored `.env.local` file or the process environment. Without it, chat returns a useful unavailable response; the rest of the site works. The old Python static preview cannot serve `/api/ask`.

## Model and context

The server calls the [Responses API](https://developers.openai.com/api/docs/guides/text) using `gpt-5.4-mini-2026-03-17`, standard service tier, no tools, no reasoning, and `store: false`. Answers use `server/context.mjs`: a small, public professional biography with more detail than the homepage. No private knowledge-base directory is read or uploaded. Input conversation is untrusted and never becomes verified biographical context.

The assistant speaks about Sean, not as him, and is instructed to answer briefly and acknowledge missing information. Model instructions reduce mistakes; they are not a guarantee. Plain text output is rendered without executing HTML or accepting model-provided links as application actions.

## Limits

- 10 requests per signed visitor cookie **and** socket network address per Monday–Sunday UTC week.
- 3 requests per minute per visitor/network.
- 500 requests globally per UTC week.
- Up to 7 alternating messages, last message from the visitor, with at most 1,000 characters per visitor message.
- Entire provider request, including instructions and history, bounded to 15,000 UTF-8 bytes; output capped at 1,000 tokens.
- 30-second provider timeout; no automatic retries.

Each call reserves one of 500 weekly slots **before** inference in an atomic SQLite transaction. Each slot is conservatively budgeted at $0.02, making the weekly allowance $10 at the verified model prices. [Published GPT-5.4 Mini pricing](https://developers.openai.com/api/docs/models/gpt-5.4-mini) is $0.75 per million input tokens and $4.50 per million output tokens (checked November 6, 2026). The 15,000-byte bound with a 1,000-token protocol allowance and 1,000 output tokens costs at most about $0.0165 at those prices. This is intentionally conservative, not actual spend accounting. Recheck pricing and bounds before changing the fixed model. Provider pricing changes can invalidate any dollar estimate.

Failed/timeout calls keep their reservation because they may still incur cost. Retries are new requests and consume a new slot. SQLite failures reject requests without calling the model. Quotas survive process restarts. Browser cookies identify browsers, not people; the separate network quota prevents simply clearing a cookie from resetting the allowance. Shared networks also share this limit.

## Retention and privacy

Questions and responses are not logged or stored by this server. They are sent to OpenAI to answer the question; `store: false` disables Responses storage, but does not itself promise zero provider retention. Review [OpenAI's data controls](https://developers.openai.com/api/docs/guides/your-data) for the account's provider retention policy.

SQLite stores request timestamps, week buckets, and HMAC-derived visitor/network identifiers only. No raw address is stored. Network hashes rotate weekly. At the next chat reservation, records older than the previous UTC week are deleted; an idle server can retain older records until the next request. The signed HTTP-only cookie lasts seven days. The frontend holds its conversation in component memory.

## Deployment

This is a single Node service with a persistent local SQLite volume. The existing S3 static deployment alone cannot run it. To launch live, either serve `out/` through this service, or route same-origin `/api/ask` to the service while continuing to serve static files through S3/CloudFront. Production routing is described below.

Production requires:

- `NODE_ENV=production`.
- `CHAT_ORIGIN=https://seanwade.com` (or the actual exact public origin).
- `CHAT_COOKIE_SECRET` with at least 32 cryptographically random characters, kept stable across restarts.
- `OPENAI_API_KEY` in the runtime secret store.
- `CHAT_DATA_DIR` on a persistent, private volume; never under `out/`.
- A TLS proxy that preserves the public `Host`. `HOST` defaults to `127.0.0.1`; set a network bind only when required by your runtime.

The service deliberately ignores forwarded-address headers. Behind a proxy, the network quota applies to that proxy's socket address, potentially limiting all visitors to ten requests weekly. The production CloudFront configuration below uses authenticated trusted-proxy handling with tests. Never blindly trust caller-supplied `X-Forwarded-For`. Keep one service/volume for the global budget; separate replicas with separate databases would each grant their own budget.

Static requests are restricted to files under `out/`, with traversal, dotfiles, and escaping symlinks blocked. API requests must carry the configured Host, exact same Origin, and JSON content type. Origin checks prevent browser cross-origin use, but are not identity/authentication; the durable global budget is the spending backstop.

## Verification

`node --test tests/chat.test.mjs` uses a mock provider, never paid calls. It covers durable quotas/restart, weekly reset, concurrent burst/global admission, failed-provider accounting, request validation/origin checks, missing credentials, and static isolation. A real model smoke test passed locally on November 6, 2026 using the runtime key from the existing home env file. The key was not copied into this project.

## Production topology

The site remains on S3/CloudFront. The `/api/*` behavior uses an uncached HTTPS
origin at `api.seanwade.com`, hosted by Shipyard as `seanwade-api` on grey.
Its named `chat-data` volume preserves quotas and settings. Runtime credentials
are in `~/.shipyard/env/seanwade-api.env` on grey, never the repository.
`/healthz` exposes only health status; every other origin request requires the
CloudFront custom origin secret. Only after authenticating that secret does the
server accept CloudFront's generated viewer address for network quotas. Viewer
Host is not forwarded; the configured proxy hostname is checked instead.

`infra/cloudfront/configure-api.py` adds this origin/behavior and preserves all
existing S3, Misc-router, alias and certificate configuration. It reads
`CHAT_PROXY_SECRET` from the environment and keeps rollback snapshots outside Git.
Main's deploy workflow tests the code, deploys the backend through Shipyard's
signed webhook, then updates S3 and invalidates CloudFront.

Redeploy backend: `ssh seanwade@grey 'shipyard deploy seanwade-api'`.
Logs: `ssh seanwade@grey 'shipyard logs seanwade-api --lines 120'`.
