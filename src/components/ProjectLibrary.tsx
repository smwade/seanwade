"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProjectLibrary.module.css";

const projects = [
  {
    title: "PulsHealth",
    category: "Apps",
    description: "Explore, export, and sync Apple Health data. Open source.",
    href: "/pulshealth/",
    type: "pulse",
    detail: "iPhone · Web · Open source",
    action: "Explore the project",
  },
  {
    title: "Watch Workout Pro",
    category: "Apps",
    description: "Create custom workouts for Apple Watch.",
    href: "https://pulshealth.com/watch-workout-pro/",
    type: "watch",
    detail: "iPhone · Apple Watch",
    action: "Explore the app",
  },
  {
    title: "Friend Flex",
    category: "Apps",
    description: "Fitness challenges scored on personal improvement.",
    href: "https://pulshealth.com/friend-flex/",
    type: "friends",
    detail: "iPhone · Fitness",
    action: "Explore the app",
  },
  {
    title: "Living Window",
    category: "Experiments",
    description:
      "A Raspberry Pi window display and an eye that follows movement.",
    href: "/projects/living-window/",
    type: "window",
    detail: "Hardware · Computer vision",
    action: "Try the demo",
  },
  {
    title: "Health data experiments",
    category: "Experiments",
    description:
      "Visualizations and creative projects built around health data.",
    href: "https://pulshealth.com/examples/",
    type: "healthArt",
    detail: "Data · Visualization",
    action: "Explore the collection",
  },
  {
    title: "MediAug",
    category: "Research",
    description:
      "Medical image augmentation for histology and cytology slides.",
    href: "https://github.com/smwade/MediAug",
    type: "cells",
    detail: "Python · Computer vision",
    action: "View on GitHub",
  },
  {
    title: "Investment calculator",
    category: "Tools",
    description: "Model compound growth, contributions, and inflation.",
    href: "/tools/investment-calculator/",
    type: "growth",
    detail: "Interactive calculator",
    action: "Try the calculator",
  },
  {
    title: "Domains vs. stocks",
    category: "Tools",
    description: "Compare returns, renewal costs, and break-even points.",
    href: "/tools/domain-investing/",
    type: "domains",
    detail: "Interactive calculator",
    action: "Compare scenarios",
  },
  {
    title: "Git worktrees + Claude Code",
    category: "Writing",
    description: "Run parallel coding agents with Git worktrees.",
    href: "/blog/git-worktrees-claude-code/",
    type: "branches",
    detail: "Engineering notes",
    action: "Read the article",
  },
];
const categories = [
  "All",
  "Apps",
  "Research",
  "Tools",
  "Experiments",
  "Writing",
];

function Illustration({ type }: { type: string }) {
  return (
    <div className={`${styles.art} ${styles[type]}`} aria-hidden="true">
      {type === "pulse" && (
        <Image
          src="/images/pulshealth-logo.png"
          alt=""
          width={96}
          height={96}
          className={styles.productIcon}
        />
      )}
      {type === "window" && (
        <div className={styles.windowFrame}>
          <div className={styles.windowEye}>
            <i />
          </div>
        </div>
      )}
      {type === "healthArt" && (
        <svg viewBox="0 0 400 160">
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d={`M${30 + i * 8} 130 C${95 + i * 4} ${20 + i * 6}, ${230 + i * 6} ${160 - i * 8}, ${300 + i * 7} 30`}
            />
          ))}
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
        <h1>Projects</h1>
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
          <h2>More projects</h2>
          <p>Small websites, guides, and experiments.</p>
        </div>
        <a href="/misc/">
          Browse the archive <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </div>
  );
}
