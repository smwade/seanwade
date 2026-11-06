# Private site admin

The admin API changes the chat mascot and exposes a small diagnostics summary. It never returns API keys, passwords, cookie secrets, tokens, environment paths, or question text.

## Access

On the local preview, admin access is automatic only when all three conditions hold: the server is not in production mode, its configured `CHAT_ORIGIN` hostname is `localhost` or `127.0.0.1`, and the actual socket peer is loopback. Forwarded headers cannot grant local access. Do not expose a local preview through a tunnel or proxy preserving the localhost Host; use production settings for remote access.

Production requires the existing HTTPS origin and cookie-secret configuration plus `ADMIN_PASSWORD` with 24–256 characters. Use a long randomly generated password in the runtime secret store. Without it, the admin API remains locked. Login issues an eight-hour signed HttpOnly, SameSite=Strict, Secure cookie scoped to `/api/admin`. Session IDs are stored only as hashes in SQLite. Logout revokes that session. Password changes invalidate existing cookies; changing `CHAT_COOKIE_SECRET` also does so.

Login allows five attempts per socket network address, and 30 overall, per 15 minutes. Counters persist across restart. Forwarded-address headers are ignored. Attempts older than 15 minutes and expired sessions are removed on the next login attempt. Sessions contain no username or password.

## API

All responses use `Cache-Control: no-store`. Every write requires the exact configured `Origin` and JSON content type. Request bodies are capped at 2 KiB and unknown object keys are rejected.

- `GET /api/site-config` is public and returns only `{ "mascot": "clip" }`.
- `GET /api/admin` returns `{ settings: { mascot }, diagnostics: { model, apiKeyConfigured, weeklyRequests, weeklyLimit: 500, visitorLimit: 10, burstLimit: 3, weekResetsAt, uptimeSeconds, environment } }`. Unauthenticated requests receive 401.
- `PUT /api/admin/settings` accepts `{ "mascot": "robot" }` and returns `{ "settings": { "mascot": "robot" } }`.
- `POST /api/admin/login` accepts `{ "password": "…" }`, sets the session cookie, and returns `{ "ok": true }`.
- `POST /api/admin/logout` accepts `{}`, clears/revokes the cookie, and returns `{ "ok": true }`.

Allowed mascots: `clip`, `robot`, `terminal`, `orb`, `bird`, `astronaut`. Selection is persisted in the existing private SQLite database and survives server restart. The default is `clip`. Neither settings nor admin diagnostics alter chat quotas or accounting.

A logout on the local preview clears any password session but does not disable the intentional loopback auto-access rule. Production logout removes access until another login.

Run `node --test tests/admin.test.mjs tests/chat.test.mjs` to verify auth, CSRF checks, persistence, input validation, secret omission, and existing chat behavior without paid model calls.
