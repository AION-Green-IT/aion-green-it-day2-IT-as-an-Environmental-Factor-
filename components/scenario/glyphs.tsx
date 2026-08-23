import type { TagKey } from "@/data/meridian";

/** No emoji ships in the DOM (do-not list), so every tag maps to an SVG path. */
const PATHS: Record<TagKey, React.ReactNode> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  wallet: (
    <>
      <rect x="3.5" y="6.5" width="17" height="12" rx="2.5" />
      <path d="M16 12h3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 12l4-4 5 4 5-4 4 4" />
      <path d="M7 12l3 3 4-3" />
    </>
  ),
  doc: (
    <>
      <path d="M6.5 3.5h7l4.5 4.5v12h-11.5z" />
      <path d="M13.5 3.5V8H18" />
    </>
  ),
  chartDown: (
    <>
      <path d="M3.5 7l6 6 4-3 7 7" />
      <path d="M20.5 12v5h-5" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4l12 5V5z" />
      <path d="M16 9.5a3 3 0 0 1 0 5" />
    </>
  ),
  shield: <path d="M12 3.5l7 3v5.5c0 4-3 7-7 8.5-4-1.5-7-4.5-7-8.5V6.5z" />,
  feather: (
    <>
      <path d="M19 5c-6 0-11 4-11 10v4" />
      <path d="M5 19l9-9" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3V14" />
      <circle cx="12.5" cy="16.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  scales: (
    <>
      <path d="M12 4v16M6 8h12" />
      <path d="M6 8l-2.5 5h5zM18 8l-2.5 5h5z" />
    </>
  ),
  dice: (
    <>
      <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
      <circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17-2.5-2.6-2.5-14.4 0-17Z" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="3.5" />
      <path d="M11.5 12H20M17 12v3M20 12v2.5" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4l8.5 15h-17z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="16.6" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3.5c3.5 2.5 5 6 5 9l-5 4-5-4c0-3 1.5-6.5 5-9Z" />
      <path d="M9 17l-2 3.5 3.5-1.5M15 17l2 3.5-3.5-1.5" />
    </>
  ),
  turtle: (
    <>
      <path d="M4.5 15a7.5 7.5 0 0 1 15 0z" />
      <path d="M4.5 15h15M19.5 13l2-1.5" />
    </>
  ),
  brain: (
    <>
      <path d="M9 5.5a3 3 0 0 0-3 3 3 3 0 0 0-1 5.5 3 3 0 0 0 4 4.5V5.5Z" />
      <path d="M15 5.5a3 3 0 0 1 3 3 3 3 0 0 1 1 5.5 3 3 0 0 1-4 4.5V5.5Z" />
    </>
  ),
  recycle: (
    <>
      <path d="M8 6l-3 5 3 1M16 6l3 5-3 1M12 20l-3-4h6z" />
    </>
  ),
  gap: (
    <>
      <path d="M3.5 12h6M14.5 12h6" />
      <path d="M9.5 8.5v7M14.5 8.5v7" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4.5h10v4a5 5 0 0 1-10 0z" />
      <path d="M12 13.5V17M8.5 20h7" />
    </>
  ),
};

export function Glyph({ name, className }: { name: TagKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-4 w-4 shrink-0"}
    >
      {PATHS[name]}
    </svg>
  );
}
