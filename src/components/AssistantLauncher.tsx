"use client";

import { useEffect, useRef, useState } from "react";
import AskSean from "./AskSean";
import styles from "./AssistantLauncher.module.css";

function ClipMascot() {
  return (
    <svg viewBox="0 0 64 72" fill="none" aria-hidden="true">
      <path
        className={styles.clipShadow}
        d="M24 54V23c0-10 7-16 15-16s14 6 14 15v32c0 9-7 15-15 15S23 63 23 54"
      />
      <path
        className={styles.clipWire}
        d="M21 50V21c0-9 6-15 14-15s14 6 14 15v31c0 8-6 14-14 14s-14-6-14-14V28c0-5 3-8 8-8s8 3 8 8v23"
      />
      <ellipse cx="28" cy="29" rx="7" ry="9" fill="#edf2fa" />
      <ellipse cx="43" cy="27" rx="7" ry="9" fill="#edf2fa" />
      <ellipse cx="30" cy="31" rx="2.6" ry="4" fill="#0b0e14" />
      <ellipse cx="45" cy="29" rx="2.6" ry="4" fill="#0b0e14" />
      <path
        d="M31 43q6 5 11-1"
        stroke="#edf2fa"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <path
        d="m16 54-6 5m40-8 6 2"
        stroke="#8eb5ff"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);
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
              <h2 id="sean-assistant-title">Ask about Sean</h2>
              <p>A small guide to the person behind the work.</p>
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
        aria-label="Ask about Sean"
        aria-expanded={open}
        aria-controls={open ? "sean-assistant-panel" : undefined}
      >
        <span className={styles.launcherLabel}>Ask about Sean</span>
        <span className={styles.mascot}>
          <ClipMascot />
        </span>
      </button>
    </div>
  );
}
