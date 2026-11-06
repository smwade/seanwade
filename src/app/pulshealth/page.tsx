import Image from "next/image";
import { HealthDataFlow } from "@/components/HealthDataFlow";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "PulsHealth — An independent product",
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
          An independent, open-source iPhone app and data platform I designed
          and built. Used by over 1,000 people to explore, export, and do more
          with their Apple Health data.
        </p>
        <div className="actions">
          <a className="button light" href="https://pulshealth.com">
            Visit PulsHealth <span aria-hidden="true">↗</span>
          </a>
          <a className="button" href="https://github.com/PulsHealth/pulshealth">
            Explore the source
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
          <h2>
            There’s a lot of potential
            <br />
            in everyday signals.
          </h2>
        </div>
        <div>
          <p>
            After years working on Health at Apple, I wanted to build with my
            own health data. Getting it into a form I could actually use was
            harder than it should have been.
          </p>
          <p>
            PulsHealth started with that problem. I built the iPhone app, sync
            system, database, web experience, and AI integrations so people
            could do more with the information they already collect.
          </p>
          <p>
            It brings together the things I care about most as an engineer:
            useful data, thoughtful software, and giving people control over
            what they build.
          </p>
        </div>
      </section>
      <section className="case-features" aria-label="What I built">
        <article>
          <h3>An app that opens things up.</h3>
          <p>
            Browse health readings, inspect trends, and export individual
            samples or custom summaries as CSV or JSON. Start on your phone
            without creating an account.
          </p>
          <a className="text-link" href="https://pulshealth.com/features/">
            Explore the app ↗
          </a>
        </article>
        <article>
          <h3>A platform to build on.</h3>
          <p>
            Automatic sync brings Apple Health into PostgreSQL. Explore
            activity, sleep, and workouts in a browser, or build directly on the
            API. Choose hosted sync or run the open-source stack yourself.
          </p>
          <a className="text-link" href="https://pulshealth.com/server/">
            See self-hosting ↗
          </a>
        </article>
        <article>
          <h3>Context for your AI.</h3>
          <p>
            Connect compatible assistants through a read-only MCP server. Give
            your chosen tools useful context from your synced history.
          </p>
          <a className="text-link" href="https://pulshealth.com/docs/ai/">
            See AI connections ↗
          </a>
        </article>
      </section>
      <section className="case-story">
        <div>
          <p className="section-note">From idea to product</p>
          <h2>Built across the whole stack.</h2>
        </div>
        <div>
          <p>
            I’m the solo developer behind the native Swift app, the sync
            protocol, PostgreSQL backend, web dashboard, API, and MCP
            integration. I also maintain the documentation and health-metric
            knowledge base.
          </p>
          <p>
            The app and server are open source. That makes the data flow
            inspectable and gives people a choice about where their history
            lives. The App Store version offers a convenient way to get started,
            with optional Pro purchases.
          </p>
          <p>
            It’s where my background in health machine learning meets the
            everyday work of making something people can actually use.
          </p>
        </div>
      </section>
      <div className="actions">
        <a className="button primary" href="https://app.pulshealth.com">
          Try the web dashboard ↗
        </a>
        <a className="text-link" href="https://pulshealth.com/examples/">
          Explore what people can make ↗
        </a>
      </div>
    </>
  );
}
