"use client";

import {
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import styles from "./WindowDemo.module.css";

const limit = (value: number) => Math.max(-1, Math.min(1, value));

export default function WindowDemo() {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  function follow(event: PointerEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setGaze({
      x: limit(((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
      y: limit(((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
    });
  }
  function move(event: KeyboardEvent<HTMLButtonElement>) {
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-0.18, 0],
      ArrowRight: [0.18, 0],
      ArrowUp: [0, -0.18],
      ArrowDown: [0, 0.18],
    };
    const direction = directions[event.key];
    if (direction) {
      event.preventDefault();
      setGaze((current) => ({
        x: limit(current.x + direction[0]),
        y: limit(current.y + direction[1]),
      }));
    } else if (event.key === "Home" || event.key === "Escape") {
      event.preventDefault();
      setGaze({ x: 0, y: 0 });
    }
  }
  return (
    <figure className={styles.demo}>
      <div className={styles.demoHeader}>
        <span>Interactive demo</span>
        <span>Browser only · No camera</span>
      </div>
      <button
        type="button"
        className={styles.stage}
        onPointerMove={follow}
        onPointerDown={follow}
        onPointerLeave={() => setGaze({ x: 0, y: 0 })}
        onKeyDown={move}
        onClick={(event) => {
          if (event.detail === 0) setGaze({ x: 0, y: 0 });
        }}
        aria-label="Move the eye with your pointer or arrow keys. Press Enter to center."
        aria-describedby="window-demo-help"
      >
        <span className={styles.window} aria-hidden="true">
          <span className={styles.eye}>
            <span
              className={styles.iris}
              style={
                {
                  "--gaze-x": `${gaze.x * 25}%`,
                  "--gaze-y": `${gaze.y * 22}%`,
                } as CSSProperties
              }
            >
              <span className={styles.pupil} />
              <span className={styles.glint} />
            </span>
          </span>
        </span>
      </button>
      <figcaption id="window-demo-help">
        Move your pointer or touch the window. Focus it and use the arrow keys;
        Enter resets.
      </figcaption>
    </figure>
  );
}
