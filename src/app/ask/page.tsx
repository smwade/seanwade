import AskSean from "@/components/AskSean";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Ask about Sean",
  "Explore Sean Wade’s background, research, and the thinking behind his projects through an interactive conversation preview.",
  "/ask/",
);

export default function AskPage() {
  return (
    <div style={{ paddingTop: 30, paddingBottom: 40 }}>
      <header style={{ maxWidth: 720, margin: "0 auto 40px" }}>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Beyond the résumé.
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: "#56647c",
            maxWidth: 590,
          }}
        >
          A different way to get to know my work. Ask about the projects, the
          research, or how it all fits together.
        </p>
      </header>
      <AskSean />
    </div>
  );
}
