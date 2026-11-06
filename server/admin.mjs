import { randomBytes, timingSafeEqual } from "node:crypto";

export const MASCOTS = Object.freeze([
  "clip",
  "robot",
  "terminal",
  "orb",
  "bird",
  "astronaut",
]);
const SESSION_MS = 8 * 60 * 60 * 1000;
const LOGIN_WINDOW = 15 * 60 * 1000;
const COOKIE = "sean_admin";

export function isLocalAdmin(req, { production, origin }) {
  const host = new URL(origin).hostname;
  const peer = req.socket.remoteAddress;
  return (
    !production &&
    ["localhost", "127.0.0.1"].includes(host) &&
    ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(peer)
  );
}

export function createAdminHandler({
  db,
  sign,
  now,
  origin,
  production,
  password,
  model,
  apiKeyConfigured,
  weekStart,
  json,
}) {
  const started = performance.now();
  const secure = new URL(origin).protocol === "https:";
  const passwordReady =
    typeof password === "string" &&
    password.length >= 24 &&
    password.length <= 256;
  // Password changes invalidate signatures without exposing or storing the password.
  const credentialVersion = passwordReady
    ? sign(`admin-password:${password}`)
    : "disabled";
  db.exec(`CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS admin_sessions (id TEXT PRIMARY KEY, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS admin_attempts (at INTEGER NOT NULL, peer TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS admin_attempt_time ON admin_attempts(at);`);
  const setting = db.prepare(
    "SELECT value FROM site_settings WHERE key = 'mascot'",
  );
  const save = db.prepare(
    "INSERT INTO site_settings (key,value) VALUES ('mascot',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
  );
  const getMascot = () => {
    const value = setting.get()?.value;
    return MASCOTS.includes(value) ? value : "clip";
  };
  const sessionSignature = (id) =>
    sign(`admin-session:${credentialVersion}:${id}`);
  function sessionId(req) {
    if (!passwordReady) return null;
    const value = (req.headers.cookie || "")
      .split(";")
      .map((v) => v.trim())
      .find((v) => v.startsWith(`${COOKIE}=`))
      ?.slice(COOKIE.length + 1);
    if (!value || !/^[A-Za-z0-9_-]{43}\.[A-Za-z0-9_-]{43}$/.test(value))
      return null;
    const [id, signature] = value.split(".");
    if (
      !timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(sessionSignature(id)),
      )
    )
      return null;
    const found = db
      .prepare("SELECT expires FROM admin_sessions WHERE id = ?")
      .get(sign(`admin-id:${id}`));
    return found && found.expires > now() ? id : null;
  }
  function cookie(res, value, maxAge) {
    res.setHeader(
      "Set-Cookie",
      `${COOKIE}=${value}; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=${maxAge}${secure ? "; Secure" : ""}`,
    );
  }
  function recordAttempt(req) {
    const time = now();
    const peer = sign(`admin-peer:${req.socket.remoteAddress || "unknown"}`);
    db.exec("BEGIN IMMEDIATE");
    try {
      db.prepare("DELETE FROM admin_attempts WHERE at <= ?").run(
        time - LOGIN_WINDOW,
      );
      db.prepare("DELETE FROM admin_sessions WHERE expires <= ?").run(time);
      const used = db
        .prepare(
          "SELECT COUNT(*) AS total, COALESCE(SUM(peer = ?),0) AS peer FROM admin_attempts",
        )
        .get(peer);
      if (used.peer >= 5 || used.total >= 30) {
        db.exec("ROLLBACK");
        return false;
      }
      db.prepare("INSERT INTO admin_attempts VALUES (?,?)").run(time, peer);
      db.exec("COMMIT");
      return true;
    } catch (error) {
      try {
        db.exec("ROLLBACK");
      } catch {}
      throw error;
    }
  }
  return async function admin(req, res, path) {
    if (
      path !== "/api/site-config" &&
      path !== "/api/admin" &&
      !path.startsWith("/api/admin/")
    )
      return false;
    if (path === "/api/site-config") {
      json(
        res,
        req.method === "GET" ? 200 : 405,
        req.method === "GET" ? { mascot: getMascot() } : { error: "Use GET." },
      );
      return true;
    }
    const write = req.method !== "GET";
    if (write && req.headers.origin !== origin) {
      json(res, 403, { error: "Request not allowed." });
      return true;
    }
    if (path === "/api/admin/login" && req.method === "POST") {
      if (!passwordReady || !secure) {
        json(res, 503, { error: "Admin login is unavailable." });
        return true;
      }
      if (!recordAttempt(req)) {
        json(res, 429, {
          error: "Too many attempts. Try again in 15 minutes.",
        });
        return true;
      }
      let data;
      try {
        data = await readJson(req);
      } catch (error) {
        json(res, error.status || 400, { error: "Invalid request." });
        return true;
      }
      if (
        !exactKeys(data, ["password"]) ||
        typeof data.password !== "string" ||
        data.password.length > 256
      ) {
        json(res, 400, { error: "Invalid request." });
        return true;
      }
      if (
        !timingSafeEqual(
          Buffer.from(sign(`password-check:${data.password}`)),
          Buffer.from(sign(`password-check:${password}`)),
        )
      ) {
        json(res, 401, { error: "Invalid password." });
        return true;
      }
      const id = randomBytes(32).toString("base64url");
      db.prepare("INSERT INTO admin_sessions VALUES (?,?)").run(
        sign(`admin-id:${id}`),
        now() + SESSION_MS,
      );
      cookie(res, `${id}.${sessionSignature(id)}`, SESSION_MS / 1000);
      json(res, 200, { ok: true });
      return true;
    }
    const id = sessionId(req);
    const local = isLocalAdmin(req, { production, origin });
    if (!local && !id) {
      json(res, 401, { error: "Sign in to continue." });
      return true;
    }
    if (path === "/api/admin" && req.method === "GET") {
      const week = weekStart(now());
      const weeklyRequests = db
        .prepare("SELECT COUNT(*) AS total FROM requests WHERE week = ?")
        .get(week).total;
      json(res, 200, {
        settings: { mascot: getMascot() },
        diagnostics: {
          model,
          apiKeyConfigured: Boolean(apiKeyConfigured),
          weeklyRequests,
          weeklyLimit: 500,
          visitorLimit: 10,
          burstLimit: 3,
          weekResetsAt: new Date(week + 7 * 86400000).toISOString(),
          uptimeSeconds: Math.floor((performance.now() - started) / 1000),
          environment: production ? "production" : "development",
        },
      });
    } else if (path === "/api/admin/settings" && req.method === "PUT") {
      let data;
      try {
        data = await readJson(req);
      } catch (error) {
        json(res, error.status || 400, { error: "Invalid request." });
        return true;
      }
      if (!exactKeys(data, ["mascot"]) || !MASCOTS.includes(data.mascot)) {
        json(res, 400, { error: "Choose a valid mascot." });
        return true;
      }
      save.run(data.mascot);
      json(res, 200, { settings: { mascot: getMascot() } });
    } else if (path === "/api/admin/logout" && req.method === "POST") {
      let data;
      try {
        data = await readJson(req);
      } catch (error) {
        json(res, error.status || 400, { error: "Invalid request." });
        return true;
      }
      if (!exactKeys(data, [])) {
        json(res, 400, { error: "Invalid request." });
        return true;
      }
      if (id)
        db.prepare("DELETE FROM admin_sessions WHERE id = ?").run(
          sign(`admin-id:${id}`),
        );
      cookie(res, "", 0);
      json(res, 200, { ok: true });
    } else json(res, 404, { error: "Not found." });
    return true;
  };
}
function exactKeys(value, keys) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === keys.length &&
    keys.every((key) => Object.hasOwn(value, key))
  );
}
async function readJson(req) {
  if (!/^application\/json(?:;|$)/i.test(req.headers["content-type"] || ""))
    throw Object.assign(new Error(), { status: 415 });
  if (Number(req.headers["content-length"]) > 2048)
    throw Object.assign(new Error(), { status: 413 });
  let bytes = 0;
  const chunks = [];
  for await (const chunk of req) {
    bytes += chunk.length;
    if (bytes > 2048) throw Object.assign(new Error(), { status: 413 });
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
