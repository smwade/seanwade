import Image from "next/image";
import { HealthDataFlow } from "@/components/HealthDataFlow";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "PulsHealth",
  "My open-source Apple Health app and platform, used by over 1,000 people. From iPhone to your database, dashboard, and AI tools.",
  "/pulshealth/",
  "/images/pulshealth-logo.png",
);
export default function PulsHealth() {
  return (
    <>
      <header className="puls-case">
        <div className="product-wordmark">
          <Image
            src="/images/pulshealth-logo.png"
            alt=""
            width={36}
            height={36}
          />
          PulsHealth
        </div>
        <h1>
          Your health data.
          <br />
          Beyond your phone.
        </h1>
        <p className="case-intro">
          An open-source platform that connects Apple Health data to AI tools
          and personal projects.
        </p>
        <div className="actions">
          <a className="button light" href="https://pulshealth.com">
            Visit PulsHealth
          </a>
          <a
            className="button github-button"
            href="https://github.com/PulsHealth/pulshealth"
          >
            <svg
              aria-hidden="true"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.301 1.23a11.52 11.52 0 0 1 6.006 0c2.291-1.553 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297Z" />
            </svg>
            GitHub
          </a>
        </div>
        <HealthDataFlow />
        <div className="case-stats">
          <div>
            <strong>1,000+</strong>
            <span>users</span>
          </div>
          <div>
            <strong>Open source</strong>
            <span>App and server</span>
          </div>
          <div>
            <strong>End to end</strong>
            <span>Independently designed & built</span>
          </div>
        </div>
      </header>
      <section className="case-story">
        <div>
          <p className="section-note">Why I built it</p>
          <h2>Make health data usable.</h2>
        </div>
        <div>
          <p>
            After years working on Health at Apple, I wanted to build with my
            own health data. Getting it into a form I could actually use was
            harder than it should have been.
          </p>
          <p>
            I built the Swift app, sync protocol, PostgreSQL backend, web
            dashboard, and AI integrations. I maintain the documentation and
            health-metric knowledge base, too.
          </p>
        </div>
      </section>
      <section className="case-features" aria-label="What I built">
        <article>
          <h3>Explore and export</h3>
          <p>
            Browse readings and export samples or summaries as CSV or JSON. No
            account needed.
          </p>
          <a className="text-link" href="https://pulshealth.com/features/">
            Explore the app
          </a>
        </article>
        <article>
          <h3>Sync and build</h3>
          <p>
            Sync to PostgreSQL, explore your history in a browser, or build with
            the API. Use hosted sync or your own server.
          </p>
          <a className="text-link" href="https://pulshealth.com/server/">
            See self-hosting
          </a>
        </article>
        <article>
          <h3>Connect your AI</h3>
          <p>
            Give compatible assistants read-only access to your synced history
            through MCP.
          </p>
          <a className="text-link" href="https://pulshealth.com/docs/ai/">
            See AI connections
          </a>
        </article>
      </section>
      <div className="actions">
        <a className="button primary" href="https://app.pulshealth.com">
          Try the web dashboard
        </a>
        <a className="text-link" href="https://pulshealth.com/examples/">
          View examples
        </a>
      </div>
    </>
  );
}
