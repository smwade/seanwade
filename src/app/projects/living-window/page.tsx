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
          I turned the round window outside my house into a programmable display: animated scenes powered
          by a Raspberry Pi, plus a camera-tracked eye that follows movement.
        </p>
      </header>
      <section className={styles.details} aria-label="About the project">
        <div>
          <h2>From a window to a display</h2>
          <p>
            A Raspberry Pi drives a screen behind the window, turning it into a
            canvas for images and looping animations. I built the player and a
            web controller so I can change the scene from my phone.
          </p>
          <p>
            Each scene has its own saved position, zoom, and rotation to fit the
            opening. Playlists keep running when the controller is closed and
            restore their settings after a restart.
          </p>
        </div>
        <div>
          <h2>Making it look back</h2>
          <p>
            I also built a camera-tracking experiment: person detection turns
            movement into target coordinates that steer an animated eye.
            When no target is available, it returns to an idle animation.
          </p>
          <p>
            The project combines hardware, video playback, computer vision, and
            a web interface to make a familiar part of the house feel alive.
          </p>
        </div>
      </section>
      <WindowDemo />
      <div className={styles.tags} aria-label="Built with">
        <span>Raspberry Pi</span>
        <span>Python</span>
        <span>Computer vision</span>
        <span>WebGL</span>
      </div>
    </div>
  );
}
