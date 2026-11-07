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
      {/* Hero */}
      <header className="mb-10">
        <h1 className="sr-only">Sean Wade - Research Scientist &amp; Engineer</h1>
        <div className="flex flex-col gap-4">
          <p className="text-base leading-[1.7] text-text-secondary">
            Research scientist and engineer working in AI and health.
            Currently at Google; previously Apple.
          </p>
          <p className="text-base leading-[1.7] text-text-secondary">
            <a
              href="/assets/sean_wade_resume_2025_updated.pdf"
              download="sean_wade_resume.pdf"
              data-analytics-event="resume_download"
              aria-label="Download Sean Wade's resume in PDF format"
              className="border-b border-transparent text-accent no-underline transition-all duration-200 hover:border-accent hover:text-white"
            >
              Download résumé
            </a>{" "}
            <span aria-hidden="true" className="mx-2">/</span>{" "}
            <a
              href="mailto:hello@seanwade.com"
              data-analytics-event="contact_click"
              aria-label="Email Sean Wade at hello@seanwade.com"
              className="border-b border-transparent text-accent no-underline transition-all duration-200 hover:border-accent hover:text-white"
            >
              hello@seanwade.com
            </a>
          </p>
        </div>
      </header>

      <ResumeContent />
      <p className="mt-12 text-sm text-text-tertiary">
        Agents can start here: {" "}
        <a href="/llms.txt" className="text-accent hover:underline">
          llms.txt
        </a>
      </p>
    </div>
  );
}
