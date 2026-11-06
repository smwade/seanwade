import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { createServer } from "node:http";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  realpathSync,
  statSync,
  createReadStream,
} from "node:fs";
import { resolve, sep, extname } from "node:path";
import { instructions } from "./context.mjs";

export const MODEL = "gpt-5.4-mini-2026-03-17";
const WEEK = 7 * 86400000;
const MAX_BODY = 16384;
const MAX_INPUT = 15000;
const MAX_OUTPUT = 1000;
export function weekStart(time) {
  const date = new Date(time);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return date.getTime();
}
export function createSiteServer({
  apiKey = process.env.OPENAI_API_KEY,
  secret = process.env.CHAT_COOKIE_SECRET,
  production = process.env.NODE_ENV === "production",
  origin = process.env.CHAT_ORIGIN || "http://localhost:4174",
  dataDir = resolve("server/data"),
  staticDir = resolve("out"),
  fetchImpl = fetch,
  now = Date.now,
} = {}) {
  const allowed = new URL(origin);
  if (
    !["http:", "https:"].includes(allowed.protocol) ||
    allowed.origin !== origin
  )
    throw new Error("CHAT_ORIGIN must be an exact HTTP(S) origin.");
  if (
    production &&
    (allowed.protocol !== "https:" || !secret || secret.length < 32)
  )
    throw new Error(
      "Production requires HTTPS CHAT_ORIGIN and CHAT_COOKIE_SECRET (32+ characters).",
    );
  mkdirSync(dataDir, { recursive: true, mode: 0o700 });
  if (!secret) {
    const keyFile = resolve(dataDir, "cookie-secret");
    try {
      secret = readFileSync(keyFile, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      const candidate = randomBytes(32).toString("hex");
      try {
        writeFileSync(keyFile, candidate, { flag: "wx", mode: 0o600 });
      } catch (writeError) {
        if (writeError.code !== "EEXIST") throw writeError;
      }
      secret = readFileSync(keyFile, "utf8");
    }
  }
  if (secret.length < 32)
    throw new Error("Cookie secret must have at least 32 characters.");
  const db = new DatabaseSync(resolve(dataDir, "usage.sqlite"));
  db.exec(
    "PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS requests (at INTEGER NOT NULL, week INTEGER NOT NULL, visitor TEXT NOT NULL, network TEXT NOT NULL); CREATE INDEX IF NOT EXISTS request_week ON requests(week); CREATE INDEX IF NOT EXISTS request_visitor ON requests(visitor,at); CREATE INDEX IF NOT EXISTS request_network ON requests(network,at);",
  );
  const sign = (value) =>
    createHmac("sha256", secret).update(value).digest("base64url");
  const counts = db.prepare(
    "SELECT COUNT(*) AS total, COALESCE(SUM(visitor = ?),0) AS visitor, COALESCE(SUM(network = ?),0) AS network FROM requests WHERE week = ?",
  );
  const recent = db.prepare(
    "SELECT COUNT(*) AS count FROM requests WHERE at > ? AND (visitor = ? OR network = ?)",
  );
  const insert = db.prepare("INSERT INTO requests VALUES (?,?,?,?)");
  function reserve(visitor, network, time) {
    const week = weekStart(time);
    db.exec("BEGIN IMMEDIATE");
    try {
      db.prepare("DELETE FROM requests WHERE week < ?").run(week - WEEK);
      const used = counts.get(visitor, network, week);
      const burst = recent.get(time - 60000, visitor, network).count;
      if (used.total >= 500 || used.visitor >= 10 || used.network >= 10) {
        db.exec("ROLLBACK");
        return {
          error: "Weekly chat limit reached. Please try again next week.",
          retryAt: new Date(week + WEEK).toISOString(),
        };
      }
      if (burst >= 3) {
        db.exec("ROLLBACK");
        return {
          error: "Please wait a minute before asking again.",
          retryAt: new Date(time + 60000).toISOString(),
        };
      }
      insert.run(time, week, visitor, network);
      db.exec("COMMIT");
      return { remaining: 9 - Math.max(used.visitor, used.network) };
    } catch (error) {
      try {
        db.exec("ROLLBACK");
      } catch {}
      throw error;
    }
  }
  function json(res, status, value) {
    res.writeHead(status, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(JSON.stringify(value));
  }
  const server = createServer(async (req, res) => {
    try {
      if (req.headers.host !== allowed.host)
        return json(res, 403, { error: "Request not allowed." });
      const rawPath = (req.url || "/").split("?")[0];
      if (rawPath !== "/api/ask")
        return serveStatic(req, res, rawPath, staticDir);
      if (req.method !== "POST") return json(res, 405, { error: "Use POST." });
      if (req.headers.origin !== origin)
        return json(res, 403, { error: "Request not allowed." });
      if (!/^application\/json(?:;|$)/i.test(req.headers["content-type"] || ""))
        return json(res, 415, { error: "Use JSON." });
      if (!apiKey)
        return json(res, 503, {
          error: "Chat is unavailable. Try again later.",
        });
      if (Number(req.headers["content-length"]) > MAX_BODY)
        return json(res, 413, { error: "That message is too long." });
      const chunks = [];
      let bytes = 0;
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > MAX_BODY)
          return json(res, 413, { error: "That message is too long." });
        chunks.push(chunk);
      }
      const body = Buffer.concat(chunks).toString("utf8");
      let messages;
      try {
        messages = validateMessages(JSON.parse(body));
      } catch {
        return json(res, 400, { error: "Send a short question about Sean." });
      }
      const payload = {
        model: MODEL,
        instructions,
        input: messages,
        max_output_tokens: MAX_OUTPUT,
        service_tier: "default",
        reasoning: { effort: "none" },
        text: { verbosity: "low" },
        store: false,
      };
      if (Buffer.byteLength(JSON.stringify(payload)) > MAX_INPUT)
        return json(res, 413, {
          error: "Conversation is too long. Start a new chat.",
        });
      const cookie = (req.headers.cookie || "")
        .split(";")
        .map((s) => s.trim())
        .find((s) => s.startsWith("sean_visitor="))
        ?.slice(13);
      let visitor;
      if (cookie && /^[A-Za-z0-9_-]{32}\.[A-Za-z0-9_-]{43}$/.test(cookie)) {
        const [id, signature] = cookie.split(".");
        if (
          timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(sign(`visitor:${id}`)),
          )
        )
          visitor = id;
      }
      if (!visitor) {
        visitor = randomBytes(24).toString("base64url");
        res.setHeader(
          "Set-Cookie",
          `sean_visitor=${visitor}.${sign(`visitor:${visitor}`)}; HttpOnly; SameSite=Strict; Path=/api/ask; Max-Age=604800${allowed.protocol === "https:" ? "; Secure" : ""}`,
        );
      }
      // Network is the socket peer. Forwarded headers are deliberately not trusted.
      const time = now();
      const network = sign(
        `network:${weekStart(time)}:${req.socket.remoteAddress || "unknown"}`,
      );
      let reservation;
      try {
        reservation = reserve(sign(`identity:${visitor}`), network, time);
      } catch {
        return json(res, 503, {
          error: "Chat is unavailable. Try again later.",
        });
      }
      if (reservation.error) return json(res, 429, reservation);
      // A reservation is never refunded: ambiguous failures may still be billable.
      let response;
      try {
        response = await fetchImpl("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(30000),
        });
        if (!response.ok) throw new Error("Provider error");
        const result = await response.json();
        const answer = result.output
          ?.filter((item) => item.type === "message")
          .flatMap((item) => item.content || [])
          .filter(
            (item) =>
              item.type === "output_text" && typeof item.text === "string",
          )
          .map((item) => item.text)
          .join("\n")
          .trim();
        if (result.status !== "completed" || !answer || answer.length > 12000)
          throw new Error("Incomplete response");
        json(res, 200, { answer, remaining: reservation.remaining });
      } catch {
        json(res, 502, {
          error: "Couldn’t get an answer. Please try again later.",
        });
      }
    } catch {
      if (!res.headersSent)
        json(res, 500, { error: "Chat is unavailable. Try again later." });
      else res.end();
    }
  });
  server.on("close", () => db.close());
  server.requestTimeout = 35000;
  server.headersTimeout = 10000;
  return server;
}
function validateMessages(data) {
  if (
    !data ||
    Object.keys(data).some((key) => key !== "messages") ||
    !Array.isArray(data.messages) ||
    data.messages.length < 1 ||
    data.messages.length > 7 ||
    data.messages.length % 2 !== 1
  )
    throw new Error("Invalid messages");
  return data.messages.map((message, i) => {
    if (
      !message ||
      Object.keys(message).some((key) => !["role", "content"].includes(key)) ||
      message.role !== (i % 2 ? "assistant" : "user") ||
      typeof message.content !== "string" ||
      !message.content.trim() ||
      message.content.length > (i % 2 ? 6000 : 1000)
    )
      throw new Error("Invalid message");
    return { role: message.role, content: message.content.trim() };
  });
}
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};
function serveStatic(req, res, rawPath, staticDir) {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405);
    return res.end();
  }
  try {
    const path = decodeURIComponent(rawPath);
    if (
      path.includes("\0") ||
      path.includes("\\") ||
      path.split("/").some((part) => part.startsWith(".") || part === "..")
    )
      throw new Error("Invalid path");
    const root = realpathSync(staticDir);
    let file = resolve(root, `.${path}`);
    if (statSync(file).isDirectory()) file = resolve(file, "index.html");
    file = realpathSync(file);
    if (!file.startsWith(root + sep) || !statSync(file).isFile())
      throw new Error("Outside export");
    res.writeHead(200, {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    });
    if (req.method === "HEAD") return res.end();
    createReadStream(file)
      .on("error", () => res.destroy())
      .pipe(res);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}
