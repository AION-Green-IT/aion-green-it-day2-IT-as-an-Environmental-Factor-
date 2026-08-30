const NAVY = "#231A45";
const AMBER = "#F1B24A";

/** A small glyph anchoring each energy consumer in W2. Stroke-based, 30x30. */
export function ConsumerIcon({ id }: { id: string }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 30 30",
    fill: "none",
    stroke: NAVY,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "w2-end-devices":
      return (
        <svg {...common}>
          <rect x="6" y="7" width="18" height="12" rx="1.5" />
          <path d="M4 23 h22" />
          <path d="M12 19 h6" />
        </svg>
      );
    case "w2-servers":
      return (
        <svg {...common}>
          <rect x="7" y="5" width="16" height="7" rx="1.5" />
          <rect x="7" y="14" width="16" height="7" rx="1.5" />
          <circle cx="11" cy="8.5" r="0.9" fill={AMBER} stroke="none" />
          <circle cx="11" cy="17.5" r="0.9" fill={AMBER} stroke="none" />
          <path d="M15 8.5 h5 M15 17.5 h5" />
        </svg>
      );
    case "w2-storage":
      return (
        <svg {...common}>
          <ellipse cx="15" cy="8" rx="8" ry="3" />
          <path d="M7 8 v6 c0 1.7 3.6 3 8 3 s8-1.3 8-3 V8" />
          <path d="M7 14 v6 c0 1.7 3.6 3 8 3 s8-1.3 8-3 v-6" />
        </svg>
      );
    case "w2-network":
      return (
        <svg {...common}>
          <circle cx="15" cy="15" r="3" />
          <circle cx="6" cy="7" r="2" />
          <circle cx="24" cy="7" r="2" />
          <circle cx="15" cy="25" r="2" />
          <path d="M13 13 L7.5 8.5 M17 13 L22.5 8.5 M15 18 v5" />
        </svg>
      );
    case "w2-data-centre":
      return (
        <svg {...common}>
          <path d="M9 20 q-4 0 -4 -3.5 q0 -3 3.5 -3.2 q0.8 -3.3 4.5 -3.3 q3.6 0 4.5 3.3 q3.5 0.2 3.5 3.2 q0 3.5 -4 3.5 z" />
          <path d="M11 24 h8 M13 20 v4 M17 20 v4" />
        </svg>
      );
    case "w2-cooling":
      return (
        <svg {...common}>
          <circle cx="15" cy="15" r="2" />
          <path d="M15 13 C15 8 12 6 10 7 C12 9 13 11 15 13" />
          <path d="M17 15 C22 15 24 12 23 10 C21 12 19 13 17 15" />
          <path d="M15 17 C15 22 18 24 20 23 C18 21 17 19 15 17" />
          <path d="M13 15 C8 15 6 18 7 20 C9 18 11 17 13 15" />
        </svg>
      );
    default:
      return null;
  }
}
