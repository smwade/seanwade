"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AskSean from "./AskSean";
import Mascot, { isMascot, type MascotName } from "./Mascot";
import styles from "./AssistantLauncher.module.css";

export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState<"idle" | "wave" | "bubble" | "done">("idle");
  const greeted = useRef(false);
  useEffect(() => {
    if (open || greeted.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const key = "ask-sean-greeted";
    try { if (sessionStorage.getItem(key)) return; } catch { /* Storage may be unavailable. */ }
    const wave = window.setTimeout(() => {
      if (document.hidden) return;
      greeted.current = true;
      try { sessionStorage.setItem(key, "1"); } catch { /* Keep the visit-local fallback. */ }
      setIntro("wave");
    }, 1200);
    const bubble = window.setTimeout(() => {
      if (greeted.current && !document.hidden) setIntro("bubble");
    }, 2800);
    const settle = window.setTimeout(() => setIntro("done"), 7200);
    return () => {
      window.clearTimeout(wave);
      window.clearTimeout(bubble);
      window.clearTimeout(settle);
    };
  }, [open]);
  const [mascot, setMascot] = useState<MascotName>("sean");
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
            <div className={styles.identity}>
              <Image
                src="/images/sean-sticker.png"
                alt=""
                width={58}
                height={62}
                className={styles.headerSticker}
              />
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
        onClick={() => {
          greeted.current = true;
          setIntro("done");
          try { sessionStorage.setItem("ask-sean-greeted", "1"); } catch { /* Optional storage. */ }
          if (open) close(); else setOpen(true);
        }}
        className={styles.launcher}
        data-intro={intro}
        aria-label="Ask Sean"
        aria-expanded={open}
        aria-controls={open ? "sean-assistant-panel" : undefined}
      >
        <span className={styles.launcherLabel} aria-hidden="true">Ask me!</span>
        <span className={`${styles.mascot} ${mascot === "sean" ? styles.sticker : ""}`}>
          <Mascot name={mascot} />
        </span>
      </button>
    </div>
  );
}
