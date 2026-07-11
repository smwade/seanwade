"use client";

import { useEffect, useState } from "react";

type MiscPage = {
  title: string;
  url: string;
  project: string;
  publishedAt: string;
};

type Catalog = {
  pages: MiscPage[];
};

export default function MiscCatalog() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/misc/.registry/index.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
        return response.json();
      })
      .then((data: Catalog) => setCatalog(data))
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return <p className="text-sm text-text-secondary">The project list is temporarily unavailable.</p>;
  }

  if (!catalog) {
    return <p className="text-sm text-text-secondary">Loading projects…</p>;
  }

  if (catalog.pages.length === 0) {
    return <p className="text-sm text-text-secondary">Nothing published yet.</p>;
  }

  return (
    <section>
      <div className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
        Published projects
      </div>
      <div className="flex flex-col gap-4">
        {catalog.pages.map((page) => (
          <a
            key={page.url}
            href={page.url}
            className="group block rounded-lg border border-border-subtle bg-bg-secondary p-5 no-underline transition-colors duration-200 hover:border-accent/40"
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <span className="text-base font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
                {page.title}
              </span>
              <span className="shrink-0 text-sm text-accent">Open →</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs text-text-tertiary">
              <span className="uppercase tracking-wider">{page.project}</span>
              <span className="truncate font-mono">{page.url}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
