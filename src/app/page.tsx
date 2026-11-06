import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import SignalPortrait from "@/components/SignalPortrait";
export const metadata = pageMetadata(
  "Sean Wade — Research & engineering",
  "I build AI evaluation systems, health software, and useful things. Research at Google, previously Apple Health, founder of PulsHealth.",
  "/",
);
export default function Home() {
  return (
    <>
      <header className="home-hero">
        <div className="hero-copy">
          <p className="intro-line">
            <span className="status-dot" /> Research scientist & engineer
          </p>
          <h1>
            Curiosity,
            <br />
            put to work.
          </h1>
          <p className="hero-description">
            I’m Sean. I build AI systems, make health data useful, and turn
            interesting questions into things people can use.
          </p>
          <p className="hero-context">
            Now at <strong>Google</strong>. Previously{" "}
            <strong>Apple Health</strong>.<br />
            Independently building <Link href="/pulshealth/">PulsHealth</Link>.
          </p>
          <div className="actions">
            <Link className="button primary" href="/projects/">
              Explore my work <span aria-hidden="true">↗</span>
            </Link>
            <a
              className="text-link"
              href="/assets/sean_wade_resume_2025_updated.pdf"
              data-analytics-event="resume_download"
            >
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <SignalPortrait />
      </header>
      <section className="featured-project" aria-labelledby="puls-title">
        <div className="featured-copy">
          <div className="product-wordmark">
            <Image
              src="/images/pulshealth-logo.png"
              alt=""
              width={32}
              height={32}
            />
            PulsHealth <span>Independent project</span>
          </div>
          <h2 id="puls-title">
            Your health data.
            <br />A world of possibilities.
          </h2>
          <p>
            An open-source app and platform that takes Apple Health beyond your
            phone. Built from the first line of Swift to the database,
            dashboard, and AI integrations.
          </p>
          <div className="puls-proof">
            <strong>1,000+</strong>
            <span>users</span>
            <span className="proof-divider" />
            <span>
              Open source
              <br />
              Built independently
            </span>
          </div>
          <Link href="/pulshealth/" className="button light">
            Explore PulsHealth <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="featured-visual">
          <div className="data-label label-left">Apple Health</div>
          <Image
            src="/images/pulshealth-explore.webp"
            alt="PulsHealth Explore screen with activity, heart, sleep, and workout categories"
            width={390}
            height={844}
            className="puls-phone"
          />
          <div className="data-label label-right">
            Your data.
            <br />
            Your database.
            <br />
            Your AI.
          </div>
          <svg className="data-lines" viewBox="0 0 500 420" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M 0 ${160 + i * 22} C 180 ${80 + i * 60}, 320 ${340 - i * 60}, 500 ${130 + i * 32}`}
              />
            ))}
          </svg>
        </div>
      </section>
      <section className="experience-section" aria-labelledby="experience">
        <div className="section-heading">
          <div>
            <p className="section-note">The work so far</p>
            <h2 id="experience">Research meets real life.</h2>
          </div>
          <Link href="/resume/" className="text-link">
            Full experience <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="career-row">
          <Image
            src="/images/Google_Favicon_2025.svg"
            alt=""
            width={34}
            height={34}
          />
          <div>
            <h3>Google</h3>
            <span>Senior Research Data Scientist</span>
          </div>
          <p>
            Building evaluation systems for LLMs in Search and Discover. Making
            model quality measurable, reliable, and useful.
          </p>
          <span className="career-date">2025–present</span>
        </div>
        <div className="career-row">
          <Image
            src="/images/Apple_logo_black.svg"
            alt=""
            width={34}
            height={34}
          />
          <div>
            <h3>Apple</h3>
            <span>ML Engineer & Data Scientist</span>
          </div>
          <p>
            Turning wearable signals into better health experiences, from
            workout recommendations to privacy-preserving research.
          </p>
          <span className="career-date">2019–2025</span>
        </div>
        <div className="career-row">
          <Image
            src="/images/BYU_Cougars_logo.svg"
            alt=""
            width={34}
            height={34}
          />
          <div>
            <h3>Brigham Young University</h3>
            <span>Computer Science & Applied Math</span>
          </div>
          <p>
            Research in generative models, medical data embeddings, and new ways
            to train neural networks.
          </p>
          <span className="career-date">BS ’17 · MS ’19</span>
        </div>
      </section>
      <section className="about-bottom">
        <div>
          <p className="section-note">Away from the keyboard</p>
          <h2>
            Always finding
            <br />
            something to explore.
          </h2>
          <p>
            Running, cycling, a good board game, or learning something new. I
            like the process of figuring things out as much as the finished
            thing.
          </p>
          <a
            href="mailto:hello@seanwade.com"
            className="text-link"
            data-analytics-event="contact_click"
          >
            hello@seanwade.com
          </a>
        </div>
        <Link href="/ask/" className="ask-invitation">
          <span className="ask-symbol" aria-hidden="true">
            ✳
          </span>
          <h3>There’s more to the story.</h3>
          <p>
            Explore my background, projects, and how I approach building things.
          </p>
          <span className="text-link">
            Ask about me <span aria-hidden="true">↗</span>
          </span>
          <small>Interactive preview</small>
        </Link>
      </section>
    </>
  );
}
