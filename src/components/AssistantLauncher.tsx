"use client";

import { useEffect, useRef, useState } from "react";
import AskSean from "./AskSean";
import Mascot, { isMascot, type MascotName } from "./Mascot";
import styles from "./AssistantLauncher.module.css";

export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [mascot, setMascot] = useState<MascotName>("clip");
  useEffect(() => {
    let active = true;
    let revision = 0;
    const controller = new AbortController();
    async function refresh() {
      const current = ++revision;
      try {
        const response = await fetch("/api/site-config", {
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const config = await response.json();
        if (active && current === revision && isMascot(config.mascot))
          setMascot(config.mascot);
      } catch {
        /* The default character remains usable without the API. */
      }
    }
    function changed(event: Event) {
      const config = (event as CustomEvent).detail;
      if (isMascot(config?.mascot)) {
        revision++;
        setMascot(config.mascot);
      } else void refresh();
    }
    void refresh();
    window.addEventListener("site-config-changed", changed);
    return () => {
      active = false;
      controller.abort();
      window.removeEventListener("site-config-changed", changed);
    };
  }, []);
  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  function close() {
    setOpen(false);
    launcher.current?.focus();
  }
  useEffect(() => {
    if (!open) return;
    panel.current
      ?.querySelector<HTMLInputElement>("input")
      ?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcher.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);
  return (
    <div className={styles.root}>
      {open && (
        <div
          ref={panel}
          id="sean-assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="sean-assistant-title"
          className={styles.panel}
        >
          <div className={styles.heading}>
            <div>
              <h2 id="sean-assistant-title">Ask Sean</h2>
            </div>
            <button
              type="button"
              onClick={close}
              className={styles.close}
              aria-label="Close assistant"
            >
              ×
            </button>
          </div>
          <AskSean compact />
        </div>
      )}
      <button
        ref={launcher}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        className={styles.launcher}
        aria-label="Ask Sean"
        aria-expanded={open}
        aria-controls={open ? "sean-assistant-panel" : undefined}
      >
        <span className={styles.launcherLabel}>Ask Sean</span>
        <span className={styles.mascot}>
          <Mascot name={mascot} />
        </span>
      </button>
    </div>
  );
}
