import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import styles from "./home.module.css";
export const metadata = pageMetadata(
  "Sean Wade — Research scientist & engineer",
  "Senior Research Data Scientist at Google, working on LLM evaluation for Search and Discover. Previously Apple Health. Founder of PulsHealth.",
  "/",
);
export default function Home() {
  return (
    <div className={styles.resume}>
      <header className={styles.intro}>
        <div>
          <p className={styles.discipline}>Research scientist & engineer</p>
          <h1>
            Sean Wade<span>.</span>
          </h1>
          <p className={styles.headline}>
            Building better AI.
            <br />
            Making its quality measurable.
          </p>
          <p className={styles.summary}>
            I’m a Senior Research Data Scientist at Google, working on LLM
            evaluation for Search and Discover. Previously, I built machine
            learning systems for Apple Health.
          </p>
          <div className="actions">
            <a
              className="button primary"
              href="/assets/sean_wade_resume_2025_updated.pdf"
              data-analytics-event="resume_download"
            >
              Download résumé <span aria-hidden="true">↓</span>
            </a>
            <a
              className="text-link"
              href="mailto:hello@seanwade.com"
              data-analytics-event="contact_click"
            >
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <aside className={styles.profile}>
          <Image
            src="/images/sean-wade.jpeg"
            alt="Sean Wade"
            width={220}
            height={260}
            priority
          />
          <div>
            <span className={styles.location}>San Francisco Bay Area</span>
            <a href="https://www.linkedin.com/in/sean-wade-linked/">
              LinkedIn ↗
            </a>
            <a href="https://github.com/smwade">GitHub ↗</a>
          </div>
        </aside>
      </header>
      <section className={styles.work} aria-labelledby="experience">
        <div className={styles.sectionTitle}>
          <h2 id="experience">Experience</h2>
          <span>Research through production</span>
        </div>
        <article className={`${styles.role} ${styles.current}`}>
          <div className={styles.roleMeta}>
            <div className={styles.company}>
              <Image
                src="/images/Google_Favicon_2025.svg"
                alt=""
                width={29}
                height={29}
              />
              <h3>Google</h3>
            </div>
            <p>July 2025–present</p>
            <span className={styles.currentTag}>Current role</span>
          </div>
          <div className={styles.roleBody}>
            <h4>Senior Research Data Scientist</h4>
            <p className={styles.team}>Search & Discover</p>
            <p className={styles.roleLead}>
              I build evaluation systems that help teams understand where AI
              works, where it fails, and what to improve.
            </p>
            <ul>
              <li>
                Build production LLM-as-a-judge systems for measuring product
                quality, with automated evaluation workflows and reliable
                metrics.
              </li>
              <li>
                Develop methods for validating AI raters: calibration, prompt
                sensitivity, stability, and disagreement analysis.
              </li>
              <li>
                Design experiments and evaluation strategies for recommender
                systems, connecting model quality to product decisions.
              </li>
              <li>
                Build tools and teach teams how to work effectively with AI.
              </li>
            </ul>
            <div className={styles.tags}>
              <span>LLM evaluation</span>
              <span>Experimentation</span>
              <span>Recommender systems</span>
              <span>Python</span>
            </div>
          </div>
        </article>
        <article className={styles.role}>
          <div className={styles.roleMeta}>
            <div className={styles.company}>
              <Image
                className={styles.apple}
                src="/images/Apple_logo_black.svg"
                alt=""
                width={27}
                height={29}
              />
              <h3>Apple</h3>
            </div>
            <p>December 2019–July 2025</p>
          </div>
          <div className={styles.roleBody}>
            <h4>Senior ML Engineer / Data Scientist</h4>
            <p className={styles.team}>Health</p>
            <ul>
              <li>
                Developed and shipped personalized workout recommendations,
                passive walk detection, and contextual health experiences.
              </li>
              <li>
                Led evaluation of health ML systems, including outcome metrics,
                experiments, and human-feedback datasets.
              </li>
              <li>
                Designed privacy-preserving data collection and measurement for
                LumiHealth, Heartline, and Attain research programs.
              </li>
              <li>
                Built pipelines for large-scale health sensor and medical claims
                data.
              </li>
            </ul>
            <div className={styles.tags}>
              <span>Health ML</span>
              <span>Privacy</span>
              <span>Causal inference</span>
              <span>Data systems</span>
            </div>
          </div>
        </article>
        <article className={styles.role}>
          <div className={styles.roleMeta}>
            <div className={styles.company}>
              <Image
                src="/images/pulshealth-logo.png"
                alt=""
                width={29}
                height={29}
              />
              <h3>PulsHealth</h3>
            </div>
            <p>2024–present</p>
            <span className={styles.independent}>Independent project</span>
          </div>
          <div className={styles.roleBody}>
            <h4>Founder & engineer</h4>
            <p className={styles.team}>
              Open-source health software · 1,000+ users
            </p>
            <p>
              Designed and built an iPhone app and platform for exploring,
              exporting, and syncing Apple Health data. The product spans Swift,
              a database backend, a web dashboard, and read-only AI
              integrations.
            </p>
            <Link href="/pulshealth/" className="text-link">
              Explore PulsHealth <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
        <div className={styles.earlier}>
          <h3>Earlier work</h3>
          <p>
            <strong>Microsoft</strong> · AI platform engineering
            <br />
            <strong>Disney</strong> · Recommender systems
            <br />
            <strong>Loveland Innovations</strong> · Computer vision
          </p>
          <Link href="/resume/" className="text-link">
            Full experience ↗
          </Link>
        </div>
      </section>
      <section className={styles.research} aria-labelledby="research">
        <div className={styles.sectionTitle}>
          <h2 id="research">Education & research</h2>
        </div>
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
            <p>Embedding and clustering medical diagnosis data</p>
            <span aria-hidden="true">↗</span>
          </a>
          <a href="https://arxiv.org/abs/1706.02480">
            <span>Forward Thinking</span>
            <p>Training neural networks one layer at a time</p>
            <span aria-hidden="true">↗</span>
          </a>
          <a href="https://github.com/smwade/MediAug">
            <span>MediAug</span>
            <p>A toolkit for synthetic cancer-cell image generation</p>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className={styles.closing}>
        <div>
          <h2>Outside the day job.</h2>
          <p>
            I build useful apps, explore new ideas, and occasionally turn a
            small experiment into something bigger.
          </p>
        </div>
        <Link href="/projects/" className="text-link">
          Explore the project library ↗
        </Link>
      </section>
    </div>
  );
}
