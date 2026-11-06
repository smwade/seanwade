import Link from "next/link";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="wordmark" href="/">
          Sean Wade.
        </Link>
        <p>Research, engineering, and things worth making.</p>
      </div>
      <div className="footer-links">
        <a
          href="mailto:hello@seanwade.com"
          data-analytics-event="contact_click"
        >
          Say hello
        </a>
        <Link href="/blog/">Writing</Link>
        <Link href="/privacy/">Privacy</Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
