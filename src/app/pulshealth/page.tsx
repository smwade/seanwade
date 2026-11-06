import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";

export const metadata = pageMetadata(
  "PulsHealth",
  "PulsHealth is my open-source project for exploring, exporting, and syncing Apple Health data to your own database and AI tools.",
  "/pulshealth/",
  "/images/pulshealth-logo.png",
);

export default function ProjectsPage() {
  return (
    <>
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/images/pulshealth-logo.png"
            alt="PulsHealth logo"
            width={56}
            height={56}
            className="rounded-lg"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary max-sm:text-3xl">
              PulsHealth
            </h1>
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
        <div className="space-y-4 text-[1.1rem] leading-[1.8] text-text-secondary">
          <p>
            Working on Health at Apple showed me how much useful information we
            collect about ourselves. But when I wanted to use my own data for
            side projects, getting it out of Apple Health and into something I
            could build with was harder than it should have been.
          </p>
          <p>
            I built PulsHealth to make that easier. It&apos;s an open-source
            iPhone app and server for exploring, exporting, and syncing Apple
            Health data. You can start with a file export or keep your history
            in a database you control.
          </p>
          <p>
            My goal is to make health data useful beyond the phone, whether
            you&apos;re building a personal dashboard, trying an idea, or
            connecting an AI assistant you already use.
          </p>
        </div>
      </header>

      {/* Current product */}
      <section className="mb-10">
        <div className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          What It Does
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-border-subtle bg-bg-card p-8 max-sm:p-5">
            <h2 className="mb-2 text-xl font-semibold text-text-primary">
              Explore &amp; Export
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Browse your health data on iPhone and export individual readings
              or custom summaries. Exploring and exporting need no account.
              The App Store app is free to start, with optional Pro purchases.
            </p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-bg-card p-8 max-sm:p-5">
            <h2 className="mb-2 text-xl font-semibold text-text-primary">
              Your Database &amp; Dashboard
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Sync to PostgreSQL on your own server, then explore your history
              through a web dashboard or build with the API. The app and server
              are open source, and the server is free to self-host.
            </p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-bg-card p-8 max-sm:p-5">
            <h2 className="mb-2 text-xl font-semibold text-text-primary">
              Connect Your AI
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              An MCP server gives compatible AI assistants read-only access to
              your synced data. Bring the assistant you prefer and choose what
              to connect.
            </p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-bg-card p-8 max-sm:p-5">
            <h2 className="mb-2 text-xl font-semibold text-text-primary">
              Knowledge Base &amp; Examples
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Reference material explains health metrics and wearable data.
              Example projects show what you can make with your own history,
              from a year in review to workout visualizations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
