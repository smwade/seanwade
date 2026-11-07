"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import styles from "./AskSean.module.css";

type Message = { role: "user" | "assistant"; content: string };
const suggestions = [
  "Has Sean ever worked on health AI?",
  "What tools does Sean use for LLM evaluation?",
  "What does Sean work on at Google?",
  "How did Sean build PulsHealth?",
  "Has Sean taken ML models from research to production?",
  "What does Sean build outside of work?",
];

export default function AskSean({ compact = false }: { compact?: boolean }) {
  const inputId = useId();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState("");
  const [error, setError] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsFading, setSuggestionsFading] = useState(false);
  const [suggestionsPaused, setSuggestionsPaused] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (suggestionsPaused || input || pending || messages.length) return;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    const timer = window.setInterval(() => {
      if (motion.matches || document.hidden) return;
      setSuggestionsFading(true);
      fadeTimer = setTimeout(() => {
        setSuggestionIndex((index) => (index + 2) % suggestions.length);
        setSuggestionsFading(false);
      }, 220);
    }, 6000);
    return () => {
      window.clearInterval(timer);
      clearTimeout(fadeTimer);
      setSuggestionsFading(false);
    };
  }, [suggestionsPaused, input, pending, messages.length]);
  const request = useRef<AbortController | null>(null);
  const conversation = useRef<HTMLDivElement>(null);
  const inputElement = useRef<HTMLInputElement>(null);
  useEffect(
    () => () => {
      request.current?.abort();
      request.current = null;
    },
    [],
  );
  useEffect(() => {
    const element = conversation.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, pending, error]);

  async function ask(question: string) {
    const content = question.trim();
    if (!content || request.current) return;
    const controller = new AbortController();
    request.current = controller;
    setPending(content);
    setError("");
    setInput("");
    const userMessage: Message = { role: "user", content };
    const timeout = window.setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages
              .slice(-6)
              .map((message) => ({
                ...message,
                content:
                  message.role === "assistant"
                    ? message.content.slice(0, 1800)
                    : message.content,
              })),
            userMessage,
          ],
        }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        let detail =
          response.status === 429
            ? "Chat limit reached. Try again later."
            : "Chat is unavailable right now. Please try again later.";
        if (data && typeof data.error === "string" && data.error.trim())
          detail = data.error.slice(0, 240);
        if (response.status === 404 || response.status === 405)
          detail = "Chat is unavailable right now. Please try again later.";
        if (typeof data?.retryAt === "string") {
          const retry = new Date(data.retryAt);
          if (Number.isFinite(retry.getTime()))
            detail += ` Try after ${retry.toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}.`;
        }
        throw new Error(detail);
      }
      if (typeof data?.answer !== "string" || !data.answer.trim())
        throw new Error(
          "Chat is unavailable right now. Please try again later.",
        );
      if (request.current !== controller) return;
      setMessages((previous) => [
        ...previous,
        userMessage,
        { role: "assistant", content: data.answer },
      ]);
    } catch (cause) {
      if (request.current !== controller) return;
      setInput(content);
      setError(
        controller.signal.aborted
          ? "The reply took too long. Please try again."
          : cause instanceof TypeError
            ? "Couldn’t connect. Check your connection and try again."
            : cause instanceof Error
              ? cause.message
              : "Chat is unavailable right now. Please try again later.",
      );
    } finally {
      window.clearTimeout(timeout);
      if (request.current === controller) {
        request.current = null;
        setPending("");
      }
    }
  }
  function clear() {
    request.current?.abort();
    request.current = null;
    setMessages([]);
    setPending("");
    setInput("");
    setError("");
    inputElement.current?.focus();
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }
  return (
    <section
      className={`${styles.panel} ${compact ? styles.compact : ""}`}
      aria-label="Ask Sean"
    >
      {!compact && <h2 className={styles.title}>Ask Sean</h2>}
      {(messages.length > 0 || pending) && (
        <div
          ref={conversation}
          className={styles.conversation}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Conversation"
        >
          {messages.map((message, index) => (
            <p
              key={index}
              className={
                message.role === "user" ? styles.question : styles.answer
              }
            >
              <span className={styles.srOnly}>
                {message.role === "user" ? "You: " : "AI: "}
              </span>
              {message.content}
            </p>
          ))}
          {pending && (
            <>
              <p className={styles.question}>
                <span className={styles.srOnly}>You: </span>
                {pending}
              </p>
              <p className={styles.loading}>Thinking…</p>
            </>
          )}
        </div>
      )}
      {messages.length === 0 && !pending && (
        <div
          className={styles.suggestions}
          aria-label="Suggested questions"
          data-fading={suggestionsFading}
          onMouseEnter={() => setSuggestionsPaused(true)}
          onMouseLeave={(event) => {
            if (!event.currentTarget.contains(document.activeElement))
              setSuggestionsPaused(false);
          }}
          onFocus={() => setSuggestionsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget) &&
                !event.currentTarget.matches(":hover"))
              setSuggestionsPaused(false);
          }}
        >
          {[0, 1].map((offset) => {
            const question = suggestions[(suggestionIndex + offset) % suggestions.length];
            return (
              <button type="button" key={offset} onClick={() => void ask(question)}>
                {question}
              </button>
            );
          })}
        </div>
      )}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <form onSubmit={submit} className={styles.form}>
        <label htmlFor={inputId} className={styles.srOnly}>
          Your question about Sean
        </label>
        <input
          ref={inputElement}
          id={inputId}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={1000}
          placeholder="Ask a question…"
          autoComplete="off"
          readOnly={Boolean(pending)}
        />
        <button
          type="submit"
          disabled={!input.trim() || Boolean(pending)}
          aria-label="Send question"
        >
          ↑
        </button>
      </form>
      {(messages.length > 0 || pending || error) && (
        <div className={styles.footer}>
          <button type="button" onClick={clear}>Clear</button>
        </div>
      )}
    </section>
  );
}
