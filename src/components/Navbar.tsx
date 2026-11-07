"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { href: "/", label: "About" },
  { href: "/pulshealth/", label: "PulsHealth" },
  { href: "/projects/", label: "Projects" },
];
export default function Navbar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <nav
      className="site-nav"
      aria-label="Main navigation"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpenPath(null);
          toggle.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpenPath(null);
      }}
    >
      <div className="nav-inner">
        <Link href="/" className="wordmark" onClick={() => setOpenPath(null)}>
          Sean Wade
        </Link>
        <button
          ref={toggle}
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="site-navigation-links"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
        <div id="site-navigation-links" className="nav-links" data-open={open}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpenPath(null)}
              aria-current={
                pathname.replace(/\/$/, "") === link.href.replace(/\/$/, "")
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
