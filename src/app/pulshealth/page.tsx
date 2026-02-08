import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PulsHealth",
  description: "PulsHealth — making wearable health data reliable, normalized, and privacy-safe for AI.",
};

export default function ProjectsPage() {
  return (
    <>
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/images/pulshealth-logo.png"
            alt="Puls Health logo"
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
            While working at Apple I saw firsthand the power of the health data the Apple Watch collects. Heart rate trends, blood oxygen, sleep stages, respiratory rate &mdash; it could catch early warning signs, personalize treatment plans, and fundamentally change how people understand their own health.
          </p>
          <p>
            But almost none of that potential was being realized. The data stayed locked on-device, siloed across platforms, and difficult for AI systems to ingest.
          </p>
          <p>
            I created PulsHealth to solve this. It unlocks the value of wearable health data by normalizing it across platforms, enforcing privacy at every step, and making it accessible to AI agents &mdash; turning raw sensor readings into real, personalized health guidance.
          </p>
        </div>
      </header>

      {/* What I'm Building */}
      <section className="mb-10">
        <div className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          What It Does
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-border-subtle bg-bg-card p-8 max-sm:p-5">
            <h2 className="mb-2 text-xl font-semibold text-text-primary">
              AI Health Agent
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              A general-purpose health agent that is deeply personalized to you.
              It uses your wearable data, health history, and context to answer
              questions, surface insights, and create personalized workout programs.
            </p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-bg-card p-8 max-sm:p-5">
            <h2 className="mb-2 text-xl font-semibold text-text-primary">
              PulsHealthSync
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Real-time collection and sync of wearable health data across
              devices. Handles encryption, consent, and the quirks of each
              platform. Available as a fully managed hosted solution or as a
              package that points at your own infrastructure.
            </p>
          </div>

          <div className="rounded-xl border border-border-subtle bg-bg-card p-8 max-sm:p-5">
            <h2 className="mb-2 text-xl font-semibold text-text-primary">
              Wearable Knowledge Base
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Detailed technical and clinical context for every health metric
              &mdash; sampling rates, typical ranges, device-specific accuracy,
              and clinical significance. Distills expertise from clinicians,
              ex-Apple Health and Google Research scientists into a format AI
              agents can use directly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
