"use client";
import Image from "next/image";
import { useState } from "react";
const lenses = [
  {
    name: "AI",
    detail: "How do we know a model is good?",
    caption: "Evaluation, experiments, and reliable systems.",
  },
  {
    name: "Health",
    detail: "What can our everyday data tell us?",
    caption: "Wearable signals, useful tools, and personal agency.",
  },
  {
    name: "Building",
    detail: "What if we just made the thing?",
    caption: "From a curious idea to something you can use.",
  },
];
export default function SignalPortrait() {
  const [lens, setLens] = useState(0);
  return (
    <div className={`portrait-composition lens-${lens}`}>
      <div className="portrait-field">
        <svg viewBox="0 0 460 360" aria-hidden="true">
          {Array.from({ length: 19 }, (_, row) => (
            <path
              key={row}
              d={Array.from(
                { length: 40 },
                (_, col) =>
                  `${col === 0 ? "M" : "L"} ${col * 12} ${75 + row * 12 + Math.sin(col / 5 + row / 8 + lens * 2) * 35 * Math.sin(col / 13)}`,
              ).join(" ")}
            />
          ))}
        </svg>
        <div className="portrait-image">
          <Image
            src="/images/sean-wade.jpeg"
            alt="Sean Wade"
            width={220}
            height={260}
            priority
          />
        </div>
        <span className="portrait-name">Hello, I’m Sean.</span>
      </div>
      <div
        className="lens-controls"
        role="group"
        aria-label="Explore my interests"
      >
        {lenses.map((item, i) => (
          <button
            key={item.name}
            aria-pressed={lens === i}
            onClick={() => setLens(i)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="lens-caption" aria-live="polite">
        <strong>{lenses[lens].detail}</strong>
        <p>{lenses[lens].caption}</p>
      </div>
    </div>
  );
}
