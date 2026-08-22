type IconProps = { className?: string };

const base = "h-5 w-5 shrink-0";

export function LearnIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className ?? base}>
      <path d="M2.5 5.5 10 2.5l7.5 3L10 8.5 2.5 5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5.5 9v4.5c0 1 2 2 4.5 2s4.5-1 4.5-2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TrainingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className ?? base}>
      <circle cx="10" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m7 12-1 5.5 4-2 4 2L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function CaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className ?? base}>
      <rect x="2.5" y="6" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 6V4.5A1.5 1.5 0 0 1 9 3h2a1.5 1.5 0 0 1 1.5 1.5V6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MapIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className ?? base}>
      <path d="M2.5 5 7 3.5v12L2.5 17V5Zm4.5-1.5L13 5.5v12L7 15.5v-12Zm6 2L17.5 4v12L13 17.5v-12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function AionLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 96 24" role="img" aria-label="AION" className={className ?? "h-6 w-24"}>
      <path d="M3 19 9 5l6 14h-3l-1-2.6H7L6 19H3Zm4.9-5h2.2L9 11.2 7.9 14Z" fill="currentColor" />
      <rect x="19" y="5" width="2.6" height="14" fill="currentColor" />
      <path d="M32 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2.6a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Z" fill="currentColor" />
      <path d="M44 19V5h2.5l6 8.7V5H55v14h-2.5l-6-8.7V19H44Z" fill="currentColor" />
    </svg>
  );
}
