import { test } from "node:test";
import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { once } from "node:events";
import { createSiteServer, MODEL } from "../server/app.mjs";
import { isLocalAdmin, MASCOTS } from "../server/admin.mjs";

const password = "private-admin-password-for-test-only";
async function fixture(t, options = {}) {
  const root = mkdtempSync(join(tmpdir(), "sean-admin-"));
  const out = join(root, "out");
  mkdirSync(out);
  const origin = options.origin || "http://localhost:4174";
  let time = Date.UTC(2026, 10, 6, 12);
  const config = {
    apiKey: "secret-model-key-never-display",
    secret: "secret-cookie-key-never-display".repeat(2),
    adminPassword: password,
    origin,
    dataDir: join(root, "data"),
    staticDir: out,
    now: () => time,
    ...options,
  };
  let server;
  async function start() {
    server = createSiteServer(config);
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
  }
  await start();
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    rmSync(root, { recursive: true, force: true });
  });
  const request = (path, { method = "GET", body, headers = {} } = {}) =>
    new Promise((resolve, reject) => {
      const outgoing = httpRequest(
        {
          hostname: "127.0.0.1",
          port: server.address().port,
          path,
          method,
          headers: {
            Host: new URL(origin).host,
            Origin: origin,
            "Content-Type": "application/json",
            ...headers,
          },
        },
        (incoming) => {
          const chunks = [];
          incoming.on("data", (chunk) => chunks.push(chunk));
          incoming.on("end", () =>
            resolve(
              new Response(Buffer.concat(chunks), {
                status: incoming.statusCode,
                headers: incoming.headers,
              }),
            ),
          );
        },
      );
      outgoing.on("error", reject);
      outgoing.end(
        body === undefined
          ? undefined
          : typeof body === "string"
            ? body
            : JSON.stringify(body),
      );
    });
  return {
    request,
    advance: (ms) => {
      time += ms;
    },
    restart: async () => {
      await new Promise((resolve) => server.close(resolve));
      await start();
    },
  };
}
const production = { production: true, origin: "https://seanwade.com" };
async function login(f) {
  const r = await f.request("/api/admin/login", {
    method: "POST",
    body: { password },
  });
  assert.equal(r.status, 200);
  return r.headers.get("set-cookie").split(";")[0];
}

test("local access exposes exact safe diagnostics and persists allowed mascot settings", async (t) => {
  const f = await fixture(t);
  const r = await f.request("/api/admin");
  assert.equal(r.status, 200);
  const text = await r.text();
  const body = JSON.parse(text);
  assert.deepEqual(Object.keys(body).sort(), ["diagnostics", "settings"]);
  assert.equal(body.settings.mascot, "clip");
  assert.equal(body.diagnostics.model, MODEL);
  assert.equal(body.diagnostics.weeklyRequests, 0);
  assert.equal(body.diagnostics.weeklyLimit, 500);
  assert.equal(body.diagnostics.apiKeyConfigured, true);
  assert.equal(body.diagnostics.environment, "development");
  assert.doesNotMatch(
    text,
    /secret-model|secret-cookie|private-admin|dataDir|OPENAI_API_KEY|ADMIN_PASSWORD/,
  );
  for (const mascot of MASCOTS) {
    const result = await f.request("/api/admin/settings", {
      method: "PUT",
      body: { mascot },
    });
    assert.deepEqual(await result.json(), { settings: { mascot } });
  }
  await f.restart();
  const publicConfig = await f.request("/api/site-config");
  assert.equal(publicConfig.headers.get("cache-control"), "no-store");
  assert.deepEqual(await publicConfig.json(), { mascot: "astronaut" });
});

test("local admin requires actual loopback socket and trusted configured hostname", () => {
  const req = {
    socket: { remoteAddress: "198.51.100.5" },
    headers: {
      "x-forwarded-for": "127.0.0.1",
      "x-forwarded-host": "localhost",
    },
  };
  assert.equal(
    isLocalAdmin(req, { production: false, origin: "http://localhost:4174" }),
    false,
  );
  req.socket.remoteAddress = "127.0.0.1";
  assert.equal(
    isLocalAdmin(req, { production: true, origin: "https://localhost" }),
    false,
  );
  assert.equal(
    isLocalAdmin(req, { production: false, origin: "https://seanwade.com" }),
    false,
  );
  assert.equal(
    isLocalAdmin(req, { production: false, origin: "http://127.0.0.1:4174" }),
    true,
  );
});

test("production diagnostics/writes remain private including spoofed forwarding headers", async (t) => {
  const f = await fixture(t, production);
  assert.equal((await f.request("/api/admin")).status, 401);
  assert.equal(
    (
      await f.request("/api/admin", {
        headers: {
          "X-Forwarded-For": "127.0.0.1",
          "X-Forwarded-Host": "localhost",
        },
      })
    ).status,
    401,
  );
  assert.equal(
    (
      await f.request("/api/admin/settings", {
        method: "PUT",
        body: { mascot: "robot" },
      })
    ).status,
    401,
  );
  const config = await f.request("/api/site-config");
  assert.deepEqual(await config.json(), { mascot: "clip" });
});

test("production cookie authentication, expiration, signature and logout revocation", async (t) => {
  const f = await fixture(t, production);
  const r = await f.request("/api/admin/login", {
    method: "POST",
    body: { password },
  });
  assert.equal(r.status, 200);
  const cookie = r.headers.get("set-cookie");
  assert.match(cookie, /HttpOnly; SameSite=Strict/);
  assert.match(cookie, /; Secure/);
  assert.doesNotMatch(cookie, new RegExp(password));
  const token = cookie.split(";")[0];
  assert.equal(
    (await f.request("/api/admin", { headers: { Cookie: token } })).status,
    200,
  );
  assert.equal(
    (await f.request("/api/admin", { headers: { Cookie: token + "x" } }))
      .status,
    401,
  );
  assert.equal(
    (
      await f.request("/api/admin/logout", {
        method: "POST",
        headers: { Cookie: token },
        body: {},
      })
    ).status,
    200,
  );
  assert.equal(
    (await f.request("/api/admin", { headers: { Cookie: token } })).status,
    401,
  );
  const next = await login(f);
  f.advance(8 * 60 * 60 * 1000 + 1);
  assert.equal(
    (await f.request("/api/admin", { headers: { Cookie: next } })).status,
    401,
  );
});

test("all writes reject cross-origin requests and settings reject invalid or unknown keys", async (t) => {
  const f = await fixture(t);
  for (const [path, method, body] of [
    ["/api/admin/settings", "PUT", { mascot: "robot" }],
    ["/api/admin/login", "POST", { password }],
    ["/api/admin/logout", "POST", {}],
  ]) {
    assert.equal(
      (
        await f.request(path, {
          method,
          body,
          headers: { Origin: "https://attacker.example" },
        })
      ).status,
      403,
    );
    assert.equal(
      (await f.request(path, { method, body, headers: { Origin: "" } })).status,
      403,
    );
  }
  for (const body of [
    { mascot: "evil" },
    { mascot: "clip", apiKey: "overwrite" },
    { mascot: null },
    ["robot"],
    {},
  ])
    assert.equal(
      (await f.request("/api/admin/settings", { method: "PUT", body })).status,
      400,
    );
  assert.equal(
    (
      await f.request("/api/admin/settings", {
        method: "PUT",
        body: "x".repeat(3000),
      })
    ).status,
    413,
  );
  assert.deepEqual(await (await f.request("/api/site-config")).json(), {
    mascot: "clip",
  });
});

test("login rate limits persist across restart, unknown fields rejected, weak password disables login", async (t) => {
  const f = await fixture(t, production);
  assert.equal(
    (
      await f.request("/api/admin/login", {
        method: "POST",
        body: { password, extra: 1 },
      })
    ).status,
    400,
  );
  for (let i = 0; i < 4; i++)
    assert.equal(
      (
        await f.request("/api/admin/login", {
          method: "POST",
          body: { password: "wrong" },
        })
      ).status,
      401,
    );
  await f.restart();
  assert.equal(
    (
      await f.request("/api/admin/login", {
        method: "POST",
        body: { password },
      })
    ).status,
    429,
  );
  f.advance(15 * 60 * 1000 + 1);
  assert.ok(await login(f));
  const weak = await fixture(t, { ...production, adminPassword: "short" });
  assert.equal((await weak.request("/api/admin")).status, 401);
  assert.equal(
    (
      await weak.request("/api/admin/login", {
        method: "POST",
        body: { password: "short" },
      })
    ).status,
    503,
  );
});
