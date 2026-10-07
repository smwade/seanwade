import { pageMetadata } from "@/lib/metadata";
import MiscCatalog from "@/components/MiscCatalog";

export const metadata = pageMetadata(
  "Misc",
  "Small websites, practical guides, and experiments by Sean Wade, including a guide to food history and cooking.",
  "/misc/",
);

export default function MiscPage() {
  return (
    <>
      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary max-sm:text-3xl">
          Misc
        </h1>
        <p className="text-lg text-text-secondary">
          Small websites, guides, and experiments made to be shared.
        </p>
      </header>

      <MiscCatalog />
    </>
  );
}
