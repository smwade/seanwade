import styles from "./Mascot.module.css";

export const mascotOptions = [
  "clip",
  "robot",
  "terminal",
  "orb",
  "bird",
  "astronaut",
] as const;
export type MascotName = (typeof mascotOptions)[number];
export function isMascot(value: unknown): value is MascotName {
  return mascotOptions.includes(value as MascotName);
}
export default function Mascot({ name = "clip" }: { name?: MascotName }) {
  return (
    <svg
      className={styles.character}
      viewBox="0 0 72 80"
      fill="none"
      aria-hidden="true"
    >
      {name === "clip" && (
        <>
          <path
            d="M25 56V25c0-10 7-16 15-16s14 6 14 15v32c0 9-7 15-15 15S24 65 24 56"
            stroke="#263d62"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M23 54V25c0-9 6-15 14-15s14 6 14 15v31c0 8-6 14-14 14s-14-6-14-14V32c0-5 3-8 8-8s8 3 8 8v23"
            stroke="#8eb5ff"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse cx="30" cy="33" rx="7" ry="9" fill="#edf2fa" />
          <ellipse cx="45" cy="31" rx="7" ry="9" fill="#edf2fa" />
          <ellipse cx="32" cy="35" rx="2.6" ry="4" fill="#0b0e14" />
          <ellipse cx="47" cy="33" rx="2.6" ry="4" fill="#0b0e14" />
          <path
            d="M33 47q6 5 11-1m-26 12-6 5m40-8 6 2"
            stroke="#8eb5ff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      )}
      {name === "robot" && (
        <>
          <path d="M36 19V12" stroke="#8eb5ff" strokeWidth="3" />
          <circle cx="36" cy="9" r="4" fill="#a8efcd" />
          <rect
            x="13"
            y="22"
            width="46"
            height="35"
            rx="12"
            fill="#24374f"
            stroke="#8eb5ff"
            strokeWidth="2"
          />
          <rect x="20" y="29" width="32" height="16" rx="6" fill="#0b0e14" />
          <path
            d="M27 35v4m18-4v4"
            stroke="#a8efcd"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M30 50h12"
            stroke="#8eb5ff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="23" y="59" width="26" height="10" rx="5" fill="#526e93" />
          <path
            d="m11 39-5 8m55-8 5 8m-38 23-2 5m18-5 2 5"
            stroke="#8eb5ff"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}
      {name === "terminal" && (
        <>
          <rect
            x="7"
            y="19"
            width="58"
            height="43"
            rx="9"
            fill="#172331"
            stroke="#8eb5ff"
            strokeWidth="2"
          />
          <path d="M8 29h56" stroke="#3d5571" />
          <circle cx="15" cy="24" r="2" fill="#efaf9c" />
          <circle cx="22" cy="24" r="2" fill="#f5dc93" />
          <path
            d="m18 38 7 6-7 6m17 0h14"
            stroke="#a8efcd"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 63v7m22-7v7m-29 1h12m12 0h12"
            stroke="#8eb5ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
      {name === "orb" && (
        <>
          <ellipse cx="36" cy="64" rx="19" ry="4" fill="#21324b" />
          <circle
            cx="36"
            cy="36"
            r="24"
            fill="#263c61"
            stroke="#8eb5ff"
            strokeWidth="2"
          />
          <path
            d="M19 28c4-9 14-12 23-9"
            stroke="#b7ceff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="36"
            cy="42"
            rx="32"
            ry="9"
            stroke="#aaa0f0"
            strokeWidth="2"
            transform="rotate(-20 36 42)"
          />
          <ellipse cx="30" cy="35" rx="3" ry="5" fill="#edf2fa" />
          <ellipse cx="43" cy="35" rx="3" ry="5" fill="#edf2fa" />
          <path
            d="M33 45q4 3 8-1"
            stroke="#edf2fa"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="m61 9 1 4 4 1-4 1-1 4-1-4-4-1 4-1z" fill="#a8efcd" />
        </>
      )}
      {name === "bird" && (
        <>
          <path
            d="M18 47C5 42 8 24 20 24c-1-12 19-17 29-7 12 12 10 40-8 44-13 4-23-3-23-14Z"
            fill="#7ca9d9"
          />
          <path d="M18 39c-4 6 0 17 13 18 10-4 11-12 8-18" fill="#bed9f3" />
          <path d="m53 29 13 6-13 5" fill="#edbe7e" />
          <circle cx="45" cy="27" r="4" fill="#0b0e14" />
          <circle cx="46" cy="26" r="1" fill="white" />
          <path
            d="M28 62v9m13-9v9m-18 0h10m3 0h10"
            stroke="#edbe7e"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="m13 45-7 9 14-1" fill="#4b73a3" />
        </>
      )}
      {name === "astronaut" && (
        <>
          <rect x="17" y="35" width="38" height="31" rx="9" fill="#617c9b" />
          <path d="m23 60-3 12h13l3-10 3 10h13l-3-12" fill="#cbd9e8" />
          <circle cx="36" cy="29" r="22" fill="#d8e5f2" />
          <rect
            x="18"
            y="18"
            width="36"
            height="25"
            rx="12"
            fill="#1c3652"
            stroke="#8eb5ff"
            strokeWidth="2"
          />
          <path
            d="m24 24 5-2"
            stroke="#8eb5ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="30" cy="31" r="2.5" fill="#edf2fa" />
          <circle cx="43" cy="31" r="2.5" fill="#edf2fa" />
          <path
            d="m17 48-8 7m46-7 8 7"
            stroke="#cbd9e8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <rect x="27" y="52" width="18" height="9" rx="2" fill="#263c61" />
          <circle cx="32" cy="56" r="2" fill="#a8efcd" />
        </>
      )}
    </svg>
  );
}
