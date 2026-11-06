import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website privacy | Sean Wade",
  description:
    "Cookie-free, self-hosted website analytics and what this site collects.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <article className="space-y-6 text-text-secondary leading-relaxed">
      <h1 className="text-3xl font-semibold text-text-primary">
        Website privacy
      </h1>
      <p>
        This site uses self-hosted Umami to understand page traffic, fixed
        action counts such as resume downloads and calculator use, and browser
        loading, interaction and layout performance.
      </p>
      <p>
        There are no analytics cookies, advertising identifiers, cross-site user
        IDs, session recordings or heatmaps. URL query strings and fragments,
        referrer paths, page titles, calculator values, shared scenarios and
        form contents are excluded in the browser and again at the collection
        gateway. Do Not Track and Global Privacy Control are respected.
      </p>
      <p>
        Anonymous visitor estimates use technical browser information and IP
        addresses transiently to derive identifiers that rotate daily. Raw IP
        addresses are not stored in the analytics database. Network providers
        can process request addresses under their own policies. Authorized AI
        assistants may read aggregate website statistics to help monitor and
        improve the site.
      </p>
      <section id="chat" className="space-y-3">
        <h2 className="text-xl font-semibold text-text-primary">AI chat</h2>
        <p>
          When you send a message, your question and recent conversation are
          sent to OpenAI to generate a reply using Sean’s professional
          background. AI answers can be wrong. Don’t include sensitive
          information.
        </p>
        <p>
          The site does not save conversation text or send it to analytics.
          OpenAI may retain requests under its API data policies; response
          storage is disabled.
        </p>
        <p>
          Chat uses an HTTP-only cookie and a hashed network address to enforce
          usage limits. Usage records older than the current and previous week
          are deleted when chat is next used. Clearing the conversation removes
          it from this browser session.
        </p>
      </section>
      <p>
        Analytics are hosted by the site operator. Questions about privacy can
        be sent to{" "}
        <a className="underline" href="mailto:hello@seanwade.com">
          hello@seanwade.com
        </a>
        .
      </p>
    </article>
  );
}
