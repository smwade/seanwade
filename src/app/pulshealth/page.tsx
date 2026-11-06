import Image from "next/image";
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
          An independent, open-source product I built to make Apple Health data
          easier to explore and use.
        </p>
        <div className="actions">
          <a className="button light" href="https://pulshealth.com">
            Visit PulsHealth <span aria-hidden="true">↗</span>
          </a>
          <a className="button" href="https://github.com/PulsHealth/pulshealth">
            Explore the source
          </a>
        </div>
        <div className="featured-visual">
          <div className="data-label label-left">
            Export files
            <br />
            CSV · JSON
          </div>
          <Image
            className="puls-phone"
            src="/images/pulshealth-explore.webp"
            alt="PulsHealth iPhone app showing health categories in Explore"
            width={390}
            height={844}
            priority
          />
          <div className="data-label label-right">
            Your database
            <br />
            Your dashboard
            <br />
            Your AI
          </div>
          <svg className="data-lines" viewBox="0 0 650 500" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                d={`M0 ${150 + i * 30} C220 ${70 + i * 60}, 420 ${400 - i * 30}, 650 ${180 + i * 25}`}
              />
            ))}
          </svg>
        </div>
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
            Explore and export Apple Health readings from iPhone. Start with a
            file, or keep data flowing into a database.
          </p>
          <a className="text-link" href="https://pulshealth.com/features/">
            Explore the app ↗
          </a>
        </article>
        <article>
          <h3>A platform to build on.</h3>
          <p>
            A PostgreSQL backend, web dashboard, and API. Use hosted sync or run
            the open-source stack on your own server.
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
          <a className="text-link" href="https://pulshealth.com/docs/">
            Read the documentation ↗
          </a>
        </article>
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
