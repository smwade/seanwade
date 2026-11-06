"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import styles from "./AskSean.module.css";

type Answer = {
  title: string;
  terms: string[];
  text: string;
  source: string;
  href: string;
};
const answers: Answer[] = [
  {
    title: "Why did Sean build PulsHealth?",
    terms: ["pulshealth", "founder", "health data", "built", "build"],
    text: "Working on Health at Apple showed Sean how useful wearable data can be. When he wanted to use his own data for side projects, getting it out of Apple Health was harder than it should have been. He built PulsHealth to bridge that gap: an open-source iPhone app and server for exploring, exporting, and syncing health data. It brings together his health ML background and his interest in tools people can build on.",
    source: "PulsHealth project",
    href: "/pulshealth/",
  },
  {
    title: "What does he work on at Google?",
    terms: ["google", "current", "evaluation", "llm", "rater", "ai"],
    text: "Sean is a Senior Research Data Scientist at Google, working on Search and Discover. His work includes LLM-based quality evaluation, testing AI raters, and measuring the quality of recommender systems. A recurring theme is making AI evaluation reliable enough to guide real product decisions, with experiments and validation alongside the models.",
    source: "Experience",
    href: "/#experience",
  },
  {
    title: "Tell me about his time at Apple.",
    terms: ["apple", "workout", "privacy", "machine learning"],
    text: "At Apple, Sean worked on Health as a Senior Machine Learning Engineer / Data Scientist from December 2019 to July 2025. His work ranged from personalized workout recommendations and walk detection to health-data pipelines and privacy-preserving research measurement. He helped take algorithms from research through shipping and ongoing evaluation.",
    source: "Experience",
    href: "/#experience",
  },
  {
    title: "What has he published?",
    terms: [
      "research",
      "publish",
      "publication",
      "school",
      "education",
      "byu",
      "study",
      "studied",
    ],
    text: "Sean studied applied mathematics and computer science at Brigham Young University. His research includes Code2Vec, on representing medical diagnosis data; Forward Thinking, on training neural networks one layer at a time; and MediAug, a toolkit for synthetic cancer-cell image generation. That work connects his interests in mathematical methods, machine learning, and health.",
    source: "MediAug research code",
    href: "https://github.com/smwade/MediAug",
  },
  {
    title: "How can I get in touch?",
    terms: ["contact", "email", "connect", "hire", "collaborat", "reach"],
    text: "You can reach Sean at hello@seanwade.com. For a collaboration, a short note about what you’re building and where you think his experience would help is a good starting point. This preview can describe his background, but it cannot speak for him or make commitments.",
    source: "Email Sean",
    href: "mailto:hello@seanwade.com",
  },
];
type Message = { id: number; question: string; answer?: Answer };

export default function AskSean({ compact = false }: { compact?: boolean }) {
  const inputId = useId();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const latest = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messages.length) latest.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);
  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;
    const normalized = trimmed.toLowerCase();
    const scored = answers
      .map((answer) => ({
        answer,
        score: answer.terms.filter((term) => normalized.includes(term)).length,
      }))
      .sort((a, b) => b.score - a.score);
    const answer =
      answers.find((answer) => answer.title === trimmed) ??
      (scored[0].score ? scored[0].answer : undefined);
    setMessages((previous) => [
      ...previous,
      { id: Date.now(), question: trimmed, answer },
    ]);
    setInput("");
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }
  return (
    <section
      className={`${styles.panel} ${compact ? styles.compact : ""}`}
      aria-label="Ask about Sean preview"
    >
      {!compact && (
        <div className={styles.header}>
          <span className={styles.mark} aria-hidden="true">
            S
          </span>
          <div>
            <strong>A little more context.</strong>
            <p>Career, research, and the thinking behind the projects.</p>
          </div>
        </div>
      )}
      <div className={styles.notice}>
        <span className={styles.dot} /> Interactive preview · Curated answers,
        not live AI. Questions stay in this browser session.
      </div>
      <div
        className={styles.conversation}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Conversation"
      >
        {messages.length === 0 && !compact && (
          <div className={styles.welcome}>
            <h2>Where would you like to start?</h2>
            <p>Explore Sean’s work, or ask what connects the dots.</p>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className={styles.exchange}>
            <p className={styles.question}>
              <span className={styles.srOnly}>You: </span>
              {message.question}
            </p>
            <div className={styles.answer}>
              <span className={styles.label}>From Sean’s background</span>
              <p>
                {message.answer?.text ??
                  "This preview doesn’t have a curated answer for that yet. Try asking about Google, Apple, PulsHealth, research, or getting in touch. A future AI version could answer more freely using a reviewed collection of background notes."}
              </p>
              {message.answer && (
                <a href={message.answer.href}>{message.answer.source} ↗</a>
              )}
            </div>
          </div>
        ))}
        <div ref={latest} />
      </div>
      <div className={styles.suggestions} aria-label="Suggested questions">
        {answers.slice(0, 4).map((answer) => (
          <button
            key={answer.title}
            type="button"
            onClick={() => ask(answer.title)}
          >
            {answer.title}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className={styles.form}>
        <label htmlFor={inputId} className={styles.srOnly}>
          Your question about Sean
        </label>
        <input
          id={inputId}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={500}
          placeholder="Ask about Sean’s work…"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Send question"
        >
          ↑
        </button>
      </form>
      {messages.length > 0 && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => setMessages([])}
        >
          Clear conversation
        </button>
      )}
    </section>
  );
}
