import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description: "Standalone mini-tools and calculators.",
};

const tools = [
  {
    title: "Investment Calculator",
    description:
      "Model compound growth, contributions, and inflation to project long-term investment outcomes.",
    href: "/tools/investment-calculator/",
  },
  {
    title: "Domain vs Stocks Calculator",
    description:
      "Compare domain investing returns against stock market performance with commission, renewal fees, and break-even analysis.",
    href: "/tools/domain-investing/",
  },
];

export default function ToolsPage() {
  return (
    <>
      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary max-sm:text-3xl">
          Tools
        </h1>
        <p className="text-lg text-text-secondary">
          Standalone mini-tools and calculators.
        </p>
      </header>

      <section>
        <div className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Available Tools
        </div>
        <div className="flex flex-col gap-4">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group block rounded-lg border border-border-subtle bg-bg-secondary p-5 no-underline transition-colors duration-200 hover:border-accent/40"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                  {tool.title}
                </span>
                <span className="text-sm text-accent">Open Tool →</span>
              </div>
              <p className="text-sm text-text-secondary">{tool.description}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
