"use client";

import { useMemo, useState } from "react";
import { GLOSSARY } from "@/data/glossary";

/** The whole vocabulary in one place, for a participant who wants to look ahead. */
export function GlossaryReference() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
    if (!q) return sorted;
    return sorted.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.plain.toLowerCase().includes(q) ||
        (e.soWhat ?? "").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section aria-labelledby="glossary-title" className="card mt-6 overflow-hidden">
      <h2 id="glossary-title">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors duration-200 hover:bg-lilac/60"
        >
          <span>
            <span className="block text-h3 text-ink">Glossary</span>
            <span className="block text-caption text-ash">
              {GLOSSARY.length} terms in plain language, with why each one matters
            </span>
          </span>
          <span aria-hidden="true" className="text-h3 text-purple">
            {open ? "−" : "+"}
          </span>
        </button>
      </h2>

      {open ? (
        <div className="border-t border-line p-4">
          <label htmlFor="glossary-search" className="text-caption text-ash">
            Filter
          </label>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. HVAC, baseline, Scope 3"
            className="mb-4 mt-1 w-full rounded-xl border border-line px-3 py-2 text-body text-ink placeholder:text-ash"
          />

          {entries.length === 0 ? (
            <p className="text-body text-ash">No term matches “{query}”.</p>
          ) : (
            <dl className="grid gap-3 md:grid-cols-2">
              {entries.map((entry) => (
                <div key={entry.id} id={`glossary-${entry.id}`} className="rounded-xl border border-line p-3">
                  <dt className="text-body font-semibold text-ink">{entry.term}</dt>
                  <dd className="mt-1 text-body text-ash">{entry.plain}</dd>
                  {entry.soWhat ? (
                    <dd className="mt-2 border-t border-line pt-2 text-caption text-navy">
                      <span className="font-semibold">Why it matters: </span>
                      {entry.soWhat}
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          )}
        </div>
      ) : null}
    </section>
  );
}
