/**
 * Points back from a piece of the site to the worksheet section it answers,
 * so the printed sheet and the app read as one task instead of two guesses.
 * Section letters must match the actual worksheet build scripts
 * (worksheets/build_ws1..4.js) — do not invent one that isn't there.
 */
export function WorksheetTag({
  n,
  section,
  className = "",
}: {
  n: 1 | 2 | 3 | 4;
  section?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border border-purple/40 bg-purple/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple ${className}`}
    >
      Worksheet {n}
      {section ? ` · Sec. ${section}` : ""}
    </span>
  );
}
