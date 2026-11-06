import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import WindowDemo from "@/components/WindowDemo";
import styles from "@/components/WindowDemo.module.css";

export const metadata = pageMetadata(
  "Living Window",
  "A Raspberry Pi window display with a phone controller, saved scenes, and an experimental camera-tracked eye. Try the interactive browser demo.",
  "/projects/living-window/",
);

export default function LivingWindowPage() {
  return (
    <div className={styles.page}>
      <Link href="/projects/" className={styles.back}>
        ‹ Projects
      </Link>
      <header className={styles.header}>
        <h1>Living Window</h1>
        <p>
          A window display that looks back. A Raspberry Pi, a phone controller,
          and an experiment in making a screen feel alive.
        </p>
      </header>
      <WindowDemo />
      <section className={styles.details} aria-label="About the project">
        <div>
          <h2>A screen made for a window.</h2>
          <p>
            I built a Raspberry Pi 4 video display with a phone-friendly
            controller. Upload scenes, arrange playlists, and save each video’s
            position, scale, and rotation to fit the window.
          </p>
          <p>
            Playback runs independently of the phone, with saved layouts
            restored between scenes and restarts.
          </p>
        </div>
        <div>
          <h2>An eye that follows movement.</h2>
          <p>
            The tracking experiment connects camera-based person detection to an
            animated eye. Temporary target coordinates steer its gaze; when a
            target disappears, the eye returns to its idle animation.
          </p>
          <p>
            The demo above recreates the idea with your pointer. It uses no
            camera and is separate from the hardware.
          </p>
        </div>
      </section>
      <div className={styles.tags} aria-label="Built with">
        <span>Raspberry Pi</span>
        <span>Python</span>
        <span>Computer vision</span>
        <span>WebGL</span>
      </div>
    </div>
  );
}
