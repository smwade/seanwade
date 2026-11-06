"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { href: "/", label: "About" },
  { href: "/pulshealth/", label: "PulsHealth" },
  { href: "/projects/", label: "Project library" },
];
export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="nav-inner">
        <Link href="/" className="wordmark">
          <span className="monogram">sw</span>Sean Wade
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
