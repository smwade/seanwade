import Image from "next/image";
import ResumeContent from "@/components/ResumeContent";
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
        <ResumeContent />
      </div>
    </div>
  );
}
