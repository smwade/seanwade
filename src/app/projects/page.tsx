import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Sean Wade — Puls Health and more.",
};

export default function ProjectsPage() {
  return (
    <>
      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary max-sm:text-3xl">
          Projects
        </h1>
        <p className="text-lg text-text-secondary">
          Things I&apos;ve built outside of work.
        </p>
      </header>

      {/* Puls Health */}
      <section className="rounded-xl border border-border-subtle bg-bg-card p-8 max-sm:p-5">
        <div className="mb-6 flex items-center gap-4">
          <Image
            src="/images/pulshealth-logo.png"
            alt="Puls Health logo"
            width={48}
            height={48}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">
              Puls Health
            </h2>
            <a
              href="https://pulshealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent no-underline transition-colors duration-200 hover:text-white"
            >
              pulshealth.com ↗
            </a>
          </div>
        </div>

        <p className="mb-4 text-base leading-relaxed text-text-secondary">
          Puls Health is a personalized health platform that helps users
          understand and improve their health through data-driven insights. It
          combines wearable data, health records, and AI to deliver actionable
          recommendations tailored to each individual.
        </p>

        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Highlights
        </h3>
        <ul className="mb-6 list-none">
          <li className="relative mb-2 pl-4 text-base text-text-secondary before:absolute before:left-0 before:text-[0.9rem] before:text-text-tertiary before:content-['•']">
            Personalized health insights powered by machine learning models
          </li>
          <li className="relative mb-2 pl-4 text-base text-text-secondary before:absolute before:left-0 before:text-[0.9rem] before:text-text-tertiary before:content-['•']">
            Integration with Apple Health and wearable devices
          </li>
          <li className="relative mb-2 pl-4 text-base text-text-secondary before:absolute before:left-0 before:text-[0.9rem] before:text-text-tertiary before:content-['•']">
            Privacy-first architecture — data stays on device
          </li>
          <li className="relative mb-2 pl-4 text-base text-text-secondary before:absolute before:left-0 before:text-[0.9rem] before:text-text-tertiary before:content-['•']">
            Built as a native iOS app with SwiftUI
          </li>
        </ul>

        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Swift",
            "SwiftUI",
            "Core ML",
            "HealthKit",
            "Python",
            "FastAPI",
            "PostgreSQL",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border-subtle bg-bg-primary px-3 py-1 text-xs text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
