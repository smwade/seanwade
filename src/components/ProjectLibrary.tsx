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
    description: "Build custom workouts on iPhone and schedule them in Apple’s Workout app on Apple Watch.",
    href: "https://apps.apple.com/us/app/watch-workout-pro/id6822902745",
    type: "watch",
    detail: "iPhone · Apple Watch · Available now",
    action: "Download on the App Store",
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
    title: "Friend Flex",
    category: "Apps",
    description: "Social fitness challenges.",
    href: "https://pulshealth.com/friend-flex/",
    type: "friends",
    detail: "iPhone · Fitness",
    action: "Explore the app",
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
    title: "Living Window",
    category: "Experiments",
    description:
      "A programmable window with animated scenes and a camera-tracking eye.",
    href: "/projects/living-window/",
    type: "window",
    detail: "Hardware · Computer vision",
    action: "Explore the project",
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
  return (
    <div className={styles.library}>
      <header className={styles.header}>
        <h1>Projects</h1>
        <p className={styles.intro}>Things I build and explore in my free time.</p>
      </header>
      <div className={styles.grid}>
        {projects.map((project) => (
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

              </a>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
