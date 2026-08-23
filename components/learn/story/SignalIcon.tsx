import type { SignalId } from "@/data/story";

const PATHS: Record<SignalId, React.ReactNode> = {
  // A meter with a climbing needle.
  energy: (
    <>
      <circle cx="24" cy="26" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 26 L33 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 26a12 12 0 0 1 24 0" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.35" />
      <path d="M36 12l4-4m0 0h-4m4 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  // A laptop with a warning.
  devices: (
    <>
      <rect x="9" y="13" width="30" height="20" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M5 37h38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 19v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="29" r="1.4" fill="currentColor" />
    </>
  ),
  // A sealed envelope.
  customer: (
    <>
      <rect x="7" y="13" width="34" height="23" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M7 16l17 12 17-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
};

export function SignalIcon({ id, className }: { id: SignalId; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className ?? "h-8 w-8"}>
      {PATHS[id]}
    </svg>
  );
}
