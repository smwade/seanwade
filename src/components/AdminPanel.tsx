"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Mascot, { isMascot, mascotOptions, type MascotName } from "./Mascot";
import styles from "./AdminPanel.module.css";

type AdminState = {
  turns: { id: number; conversation: string; at: number; question: string; answer: string | null; status: string }[];
  settings: { mascot: MascotName };
  diagnostics: {
    model: string;
    apiKeyConfigured: boolean;
    weeklyRequests: number;
    weeklyLimit: number;
    visitorLimit: number;
    burstLimit: number;
    weekResetsAt: string;
    uptimeSeconds: number;
    environment: string;
  };
};
async function api(path: string, method = "GET", body?: object) {
  const response = await fetch(path, {
    method,
    credentials: "same-origin",
    cache: "no-store",
    ...(body
      ? {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      : {}),
  });
  const data = await response.json().catch(() => null);
  return { response, data };
}
function errorMessage(data: unknown, fallback: string) {
  return data &&
    typeof data === "object" &&
    "error" in data &&
    typeof data.error === "string"
    ? data.error.slice(0, 200)
    : fallback;
}

export default function AdminPanel() {
  const [state, setState] = useState<AdminState | null>(null);
  const [selected, setSelected] = useState<MascotName>("sean");
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    const { response, data } = await api("/api/admin");
    if (response.status === 401) {
      setState(null);
      setLocked(true);
      return;
    }
    if (!response.ok || !isMascot(data?.settings?.mascot) || !data?.diagnostics)
      throw new Error(
        errorMessage(
          data,
          "Admin is unavailable. Start the site server and try again.",
        ),
      );
    setState(data);
    setSelected(data.settings.mascot);
    setLocked(false);
  }, []);
  useEffect(() => {
    load()
      .catch((cause) => setError(cause.message))
      .finally(() => setBusy(false));
  }, [load]);
  async function refresh() {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await load();
    } catch {
      setError("Couldn’t refresh. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const { response, data } = await api("/api/admin/login", "POST", {
        password,
      });
      setPassword("");
      if (!response.ok)
        throw new Error(errorMessage(data, "Couldn’t sign in. Try again."));
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn’t connect.");
    } finally {
      setBusy(false);
    }
  }
  async function save() {
    if (busy || !state) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { response, data } = await api("/api/admin/settings", "PUT", {
        mascot: selected,
      });
      if (response.status === 401) {
        setState(null);
        setLocked(true);
        throw new Error("Session expired. Sign in again.");
      }
      if (!response.ok)
        throw new Error(errorMessage(data, "Couldn’t save. Try again."));
      const saved = isMascot(data?.settings?.mascot)
        ? data.settings.mascot
        : isMascot(data?.mascot)
          ? data.mascot
          : selected;
      setState((previous) =>
        previous ? { ...previous, settings: { mascot: saved } } : previous,
      );
      setSelected(saved);
      window.dispatchEvent(
        new CustomEvent("site-config-changed", { detail: { mascot: saved } }),
      );
      setNotice("Character saved.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn’t connect.");
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { response, data } = await api("/api/admin/logout", "POST");
      if (!response.ok)
        throw new Error(errorMessage(data, "Couldn’t sign out."));
      setState(null);
      setLocked(true);
      setPassword("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn’t connect.");
    } finally {
      setBusy(false);
    }
  }
  const diagnostics = state?.diagnostics;
  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <div>
          <h1>Site admin</h1>
          <p>Character & development status</p>
        </div>
        {state && state.diagnostics.environment !== "development" && (
          <button onClick={logout} disabled={busy} type="button">
            Sign out
          </button>
        )}
      </header>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className={styles.notice}>
          {notice}
        </p>
      )}
      {!state && !locked && (
        <div className={styles.loading}>
          {busy ? (
            "Loading admin…"
          ) : (
            <button onClick={refresh} type="button">
              Try again
            </button>
          )}
        </div>
      )}
      {locked && (
        <form className={styles.login} onSubmit={login}>
          <label htmlFor="admin-password">Admin password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            maxLength={256}
          />
          <button
            className={styles.primary}
            disabled={busy || !password}
            type="submit"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      )}
      {state && (
        <>
          <section className={styles.section}>
            <div className={styles.sectionHeading}>
              <h2>Assistant character</h2>
              <span>Current: {state.settings.mascot}</span>
            </div>
            <fieldset className={styles.choices}>
              <legend className={styles.srOnly}>
                Choose assistant character
              </legend>
              {mascotOptions.map((name) => (
                <label key={name} className={styles.choice}>
                  <input
                    type="radio"
                    name="mascot"
                    value={name}
                    checked={selected === name}
                    onChange={() => {
                      setSelected(name);
                      setNotice("");
                    }}
                    disabled={busy}
                  />
                  <span className={styles.choiceBody}>
                    <span className={styles.character}>
                      <Mascot name={name} />
                    </span>
                    <span>{name}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <div className={styles.saveRow}>
              <button
                className={styles.primary}
                disabled={busy || selected === state.settings.mascot}
                onClick={save}
                type="button"
              >
                {busy ? "Working…" : "Save character"}
              </button>
              <span>
                {selected === state.settings.mascot
                  ? "The corner assistant uses your saved character."
                  : "Unsaved selection"}
              </span>
            </div>
          </section>
          {diagnostics && (
            <section className={styles.section}>
              <div className={styles.sectionHeading}>
                <h2>Development status</h2>
                <button onClick={refresh} disabled={busy} type="button">
                  Refresh
                </button>
              </div>
              <dl className={styles.diagnostics}>
                <div>
                  <dt>Model</dt>
                  <dd>{diagnostics.model}</dd>
                </div>
                <div>
                  <dt>API key</dt>
                  <dd>
                    {diagnostics.apiKeyConfigured
                      ? "Configured"
                      : "Not configured"}
                  </dd>
                </div>
                <div>
                  <dt>Weekly requests</dt>
                  <dd>
                    {diagnostics.weeklyRequests} / {diagnostics.weeklyLimit}
                  </dd>
                </div>
                <div>
                  <dt>Visitor allowance</dt>
                  <dd>{diagnostics.visitorLimit} / week</dd>
                </div>
                <div>
                  <dt>Burst allowance</dt>
                  <dd>{diagnostics.burstLimit} / minute</dd>
                </div>
                <div>
                  <dt>Resets</dt>
                  <dd>{new Date(diagnostics.weekResetsAt).toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Uptime</dt>
                  <dd>{Math.floor(diagnostics.uptimeSeconds / 60)} minutes</dd>
                </div>
                <div>
                  <dt>Environment</dt>
                  <dd>{diagnostics.environment}</dd>
                </div>
              </dl>
            </section>
          )}
          <section className={styles.section}>
            <h2>Recent conversations</h2>
            <p>Latest 100 turns, newest conversations first. Messages are visitor input, not verified facts.</p>
            {!state.turns.length && <p>No saved conversations yet.</p>}
            {[...new Set(state.turns.map((turn) => turn.conversation))].map((id) => {
              const turns = state.turns.filter((turn) => turn.conversation === id).reverse();
              return <details key={id}>
                <summary>{new Date(turns[0].at).toLocaleString()} — {turns[0].question.slice(0, 100)}</summary>
                {turns.map((turn) => <div key={turn.id} style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", marginBlock: "1rem" }}>
                  <p><strong>Visitor:</strong> {turn.question}</p>
                  <p><strong>Assistant:</strong> {turn.answer ?? (turn.status === "failed" ? "Reply failed" : "No completed reply recorded")}</p>
                </div>)}
              </details>;
            })}
          </section>
          <nav className={styles.previews} aria-label="Page previews">
            <span>Preview</span>
            <Link href="/">About</Link>
            <Link href="/pulshealth/">PulsHealth</Link>
            <Link href="/projects/">Projects</Link>
          </nav>
        </>
      )}
    </div>
  );
}
