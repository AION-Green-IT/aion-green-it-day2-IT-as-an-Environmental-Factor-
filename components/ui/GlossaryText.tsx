"use client";

import { Fragment, type ReactNode } from "react";
import { GLOSSARY_BY_ID, type GlossaryEntry } from "@/data/glossary";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Every string a term should link on, longest first so "shop floor" wins over "shop". */
const phrasesFor = (entry: GlossaryEntry) =>
  [entry.match, ...(entry.also ?? [])].sort((a, b) => b.length - a.length);

type Hit = { start: number; end: number; id: string };

/**
 * Links only the terms a card explicitly declares, so no unrelated word is
 * ever caught by accident. The first occurrence of each term is linked once —
 * marking every repeat turns the sentence into noise.
 */
function findHits(text: string, termIds: string[]): Hit[] {
  const hits: Hit[] = [];

  for (const id of termIds) {
    const entry = GLOSSARY_BY_ID[id];
    if (!entry) continue;

    for (const phrase of phrasesFor(entry)) {
      const re = new RegExp(`(^|[^\\p{L}\\p{N}-])(${escape(phrase)})(?![\\p{L}\\p{N}])`, "iu");
      const m = re.exec(text);
      if (!m || m.index === undefined) continue;

      const start = m.index + m[1].length;
      const end = start + m[2].length;

      // Skip anything overlapping a term already matched.
      if (hits.some((h) => start < h.end && end > h.start)) continue;

      hits.push({ start, end, id });
      break;
    }
  }

  return hits.sort((a, b) => a.start - b.start);
}

type Props = {
  text: string;
  termIds: string[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function GlossaryText({ text, termIds, activeId, onSelect }: Props) {
  const hits = findHits(text, termIds);
  if (hits.length === 0) return <>{text}</>;

  const parts: ReactNode[] = [];
  let cursor = 0;

  hits.forEach((hit, i) => {
    if (hit.start > cursor) parts.push(text.slice(cursor, hit.start));

    parts.push(
      <button
        key={`${hit.id}-${i}`}
        type="button"
        onClick={() => onSelect(hit.id)}
        aria-pressed={activeId === hit.id}
        title={`What is ${GLOSSARY_BY_ID[hit.id].term}?`}
        className={
          activeId === hit.id
            ? "rounded bg-purple/15 font-semibold text-purple decoration-purple decoration-dotted underline-offset-4 underline"
            : "rounded font-semibold text-navy decoration-purple decoration-dotted underline-offset-4 underline transition-colors duration-200 hover:bg-lilac hover:text-purple"
        }
      >
        {text.slice(hit.start, hit.end)}
      </button>,
    );

    cursor = hit.end;
  });

  if (cursor < text.length) parts.push(text.slice(cursor));

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}

/** The expanded definition for whichever term is open. */
export function TermPanel({
  termId,
  onClose,
}: {
  termId: string;
  onClose: () => void;
}) {
  const entry = GLOSSARY_BY_ID[termId];
  if (!entry) return null;

  return (
    <div className="mt-3 rounded-xl border border-purple bg-lilac/50 p-3" aria-live="polite">
      <div className="mb-1 flex items-start justify-between gap-2">
        <p className="text-h3 text-ink">{entry.term}</p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg border border-line bg-paper px-2 py-1 text-caption text-ash transition-colors duration-200 hover:text-navy hover:underline"
        >
          Close
        </button>
      </div>

      <p className="text-body text-ink">{entry.plain}</p>

      {entry.soWhat ? (
        <p className="mt-2 border-t border-line pt-2 text-body text-navy">
          <span className="font-semibold">Why it matters: </span>
          {entry.soWhat}
        </p>
      ) : null}
    </div>
  );
}
