import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import styles from "./home.module.css";
export const metadata = pageMetadata(
  "Sean Wade — Research scientist & engineer",
  "Senior Research Data Scientist at Google. LLM evaluation for Search and Discover. Previously Apple Health. Founder of PulsHealth.",
  "/",
);
export default function Home() {
  return (
    <div className={styles.resume}>
      <header className={styles.profile}>
        <Image
          className={styles.portrait}
          src="/images/sean-wade.jpeg"
          alt="Sean Wade"
          width={128}
          height={144}
          priority
        />
        <h1>Sean Wade</h1>
        <p className={styles.title}>
          Research scientist
          <br />& engineer
        </p>
        <p className={styles.location}>San Francisco Bay Area</p>
        <a
          className={styles.resumeLink}
          href="/assets/sean_wade_resume_2025_updated.pdf"
          data-analytics-event="resume_download"
        >
          Résumé <span aria-hidden="true">↓</span>
        </a>
        <div className={styles.links}>
          <a
            href="mailto:hello@seanwade.com"
            data-analytics-event="contact_click"
          >
            Email ↗
          </a>
          <a href="https://www.linkedin.com/in/sean-wade-linked/">LinkedIn ↗</a>
          <a href="https://github.com/smwade">GitHub ↗</a>
        </div>
      </header>
      <div className={styles.content}>
        <section aria-labelledby="experience">
          <h2 id="experience" className={styles.sectionTitle}>
            Experience
          </h2>
          <article className={`${styles.role} ${styles.current}`}>
            <div className={styles.roleHeading}>
              <div className={styles.company}>
                <Image
                  src="/images/Google_Favicon_2025.svg"
                  alt=""
                  width={28}
                  height={28}
                />
                <h3>Google</h3>
              </div>
              <span>2025–present</span>
            </div>
            <h4>Senior Research Data Scientist</h4>
            <p className={styles.team}>Search & Discover</p>
            <p className={styles.lead}>
              Building evaluation systems for large-scale AI products.
            </p>
            <ul>
              <li>
                Production LLM-as-a-judge systems and automated quality metrics.
              </li>
              <li>
                AI rater validation: calibration, sensitivity, stability, and
                disagreement.
              </li>
              <li>Experiment design and evaluation for recommender systems.</li>
            </ul>
          </article>
          <article className={styles.role}>
            <div className={styles.roleHeading}>
              <div className={styles.company}>
                <Image
                  className={styles.apple}
                  src="/images/Apple_logo_black.svg"
                  alt=""
                  width={25}
                  height={28}
                />
                <h3>Apple</h3>
              </div>
              <span>2019–2025</span>
            </div>
            <h4>Senior ML Engineer / Data Scientist</h4>
            <p className={styles.team}>Health</p>
            <ul>
              <li>
                Shipped workout recommendations and passive walk detection.
              </li>
              <li>
                Led health ML evaluation, experiments, and human-feedback
                datasets.
              </li>
              <li>
                Designed privacy-preserving measurement for LumiHealth,
                Heartline, and Attain.
              </li>
            </ul>
          </article>
          <article className={styles.role}>
            <div className={styles.roleHeading}>
              <div className={styles.company}>
                <Image
                  src="/images/pulshealth-logo.png"
                  alt=""
                  width={28}
                  height={28}
                />
                <h3>PulsHealth</h3>
              </div>
              <span>2024–present</span>
            </div>
            <h4>Founder & engineer</h4>
            <p className={styles.team}>Open source · 1,000+ users</p>
            <p>
              Built the iPhone app, sync backend, dashboard, and AI integrations
              for using Apple Health data beyond the phone.
            </p>
            <Link className="text-link" href="/pulshealth/">
              PulsHealth ↗
            </Link>
          </article>
          <div className={styles.earlier}>
            <p>
              <strong>Previously</strong> Microsoft · Disney · Loveland
              Innovations
            </p>
            <Link href="/resume/">Full experience ↗</Link>
          </div>
        </section>
        <section className={styles.research} aria-labelledby="research">
          <h2 id="research" className={styles.sectionTitle}>
            Education & research
          </h2>
          <div className={styles.education}>
            <h3>Brigham Young University</h3>
            <p>
              MS Computer Science, 2019
              <br />
              BS Applied Mathematics, 2017
            </p>
          </div>
          <div className={styles.publications}>
            <a href="https://ieeexplore.ieee.org/document/8031179">
              <span>Code2Vec</span>
              <span>Medical diagnosis embeddings</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href="https://arxiv.org/abs/1706.02480">
              <span>Forward Thinking</span>
              <span>Layer-by-layer neural network training</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href="https://github.com/smwade/MediAug">
              <span>MediAug</span>
              <span>Synthetic cancer-cell images</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
