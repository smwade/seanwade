"use client";

import { useState } from "react";
import styles from "./ProjectLibrary.module.css";

const projects = [
  {
    title: "PulsHealth",
    category: "Apps",
    description:
      "An open-source home for your Apple Health data. Explore, export, sync, and build with it.",
    href: "/pulshealth/",
    type: "pulse",
    detail: "iPhone · Web · Open source",
    action: "Explore the project",
  },
  {
    title: "Watch Workout Pro",
    category: "Apps",
    description:
      "Create custom workouts and take them with you on Apple Watch.",
    href: "https://pulshealth.com/watch-workout-pro/",
    type: "watch",
    detail: "iPhone · Apple Watch",
    action: "Explore the app",
  },
  {
    title: "Friend Flex",
    category: "Apps",
    description:
      "Fitness challenges with friends, scored on improvement from your own starting point.",
    href: "https://pulshealth.com/friend-flex/",
    type: "friends",
    detail: "iPhone · Fitness",
    action: "Explore the app",
  },
  {
    title: "MediAug",
    category: "Research",
    description:
      "A Python toolkit for medical image augmentation, built for histology and cytology slides.",
    href: "https://github.com/smwade/MediAug",
    type: "cells",
    detail: "Python · Computer vision",
    action: "View on GitHub",
  },
  {
    title: "Investment calculator",
    category: "Tools",
    description:
      "Explore compound growth, contributions, and inflation across different scenarios.",
    href: "/tools/investment-calculator/",
    type: "growth",
    detail: "Interactive calculator",
    action: "Try the calculator",
  },
  {
    title: "Domains vs. stocks",
    category: "Tools",
    description:
      "Compare investment scenarios with renewal costs, commissions, and break-even analysis.",
    href: "/tools/domain-investing/",
    type: "domains",
    detail: "Interactive calculator",
    action: "Compare scenarios",
  },
  {
    title: "Git worktrees + Claude Code",
    category: "Writing",
    description:
      "Notes on working with parallel coding agents without constantly switching branches.",
    href: "/blog/git-worktrees-claude-code/",
    type: "branches",
    detail: "Engineering notes",
    action: "Read the article",
  },
];
const categories = ["All", "Apps", "Research", "Tools", "Writing"];

function Illustration({ type }: { type: string }) {
  return (
    <div className={`${styles.art} ${styles[type]}`} aria-hidden="true">
      {type === "pulse" && (
        <svg viewBox="0 0 400 160">
          <path d="M0 85H80L105 60 126 112 157 30 185 134 213 85H400" />
        </svg>
      )}
      {type === "watch" && (
        <div className={styles.watchFace}>
          <span>Run / walk</span>
          <strong>03:00</strong>
          <span>Run interval</span>
          <div />
        </div>
      )}
      {type === "friends" && (
        <div className={styles.podium}>
          <i>+18%</i>
          <i>+32%</i>
          <i>+24%</i>
        </div>
      )}
      {type === "cells" && Array.from({ length: 9 }, (_, i) => <i key={i} />)}
      {type === "growth" && (
        <svg viewBox="0 0 400 160">
          <path className={styles.baseline} d="M30 135H370M30 25V135" />
          <path d="M30 128C100 127 210 119 365 25" />
          <path
            className={styles.secondaryLine}
            d="M30 128C100 125 220 110 365 85"
          />
        </svg>
      )}
      {type === "domains" && (
        <div className={styles.domainLabels}>
          <span>ideas.com</span>
          <span>Renew. Build. Compare.</span>
        </div>
      )}
      {type === "branches" && (
        <svg viewBox="0 0 400 160">
          <path d="M55 80H345M130 80Q160 80 160 45H300M210 80Q235 80 235 125H345" />
          <circle cx="80" cy="80" r="8" />
          <circle cx="300" cy="45" r="8" />
          <circle cx="345" cy="125" r="8" />
        </svg>
      )}
    </div>
  );
}

export default function ProjectLibrary() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = projects.filter(
    (project) =>
      (category === "All" || project.category === category) &&
      `${project.title} ${project.description} ${project.detail}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className={styles.library}>
      <header className={styles.header}>
        <h1>Things I’ve made.</h1>
        <p>
          Useful apps, research, and ideas that turned into something you can
          try. A few big projects. Plenty of small experiments.
        </p>
      </header>
      <div className={styles.controls}>
        <div className={styles.filters} aria-label="Filter projects">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <span className={styles.srOnly}>Search projects</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10" cy="10" r="6" />
            <path d="m15 15 5 5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a project…"
          />
        </label>
      </div>
      <p className={styles.count} role="status">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>
      <div className={styles.grid}>
        {filtered.map((project) => (
          <article key={project.title} className={styles.card}>
            <Illustration type={project.type} />
            <div className={styles.body}>
              <span className={styles.detail}>{project.detail}</span>
              <h2>
                <a href={project.href}>{project.title}</a>
              </h2>
              <p>{project.description}</p>
              <a className={styles.action} href={project.href}>
                {project.action}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className={styles.empty}>
          <h2>No projects found</h2>
          <p>Try another search or browse the full collection.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Show all projects
          </button>
        </div>
      )}
      <aside className={styles.archive}>
        <div>
          <h2>The experiment shelf</h2>
          <p>
            More small websites, practical guides, and things made out of
            curiosity.
          </p>
        </div>
        <a href="/misc/">
          Browse the archive <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </div>
  );
}
