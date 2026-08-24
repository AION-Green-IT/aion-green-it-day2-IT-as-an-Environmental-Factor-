"use client";

import { useState } from "react";
import type { Briefing } from "@/data/meridian";
import { SOURCES } from "@/data/sources";
import { InfoDialog } from "@/components/ui/InfoDialog";

/**
 * How to think about the phase, never which option to take. Short on the page,
 * with the full reasoning and the reading behind a button.
 */
export function PhaseBriefing({ briefing }: { briefing: Briefing }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl border-l-4 border-purple bg-lilac/40 p-3">
        <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-purple">
          Before you decide
        </p>
        <p className="mb-2 text-body text-ink">{briefing.short}</p>

        <ul className="mb-3 space-y-1">
          {briefing.questions.map((q) => (
            <li key={q} className="flex gap-2 text-body text-navy">
              <span aria-hidden="true" className="text-purple">
                ?
              </span>
              {q}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl border border-line bg-paper px-3 py-1.5 text-caption font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
        >
          Read more on how to weigh this →
        </button>
      </div>

      <InfoDialog open={open} title={briefing.more.title} onClose={() => setOpen(false)}>
        {briefing.more.paragraphs.map((p) => (
          <p key={p} className="mb-3 text-body text-ink">
            {p}
          </p>
        ))}

        <div className="mt-4 border-t border-line pt-4">
          <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
            If you want to go further
          </p>
          <ul className="space-y-2">
            {briefing.more.links.map((link) => (
              <li key={link.label} className="rounded-xl border border-line p-3">
                <a
                  href={SOURCES[link.source].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded text-body font-semibold text-purple underline underline-offset-2 hover:text-navy"
                >
                  {link.label} ↗
                </a>
                <p className="mt-1 text-caption text-ash">{link.note}</p>
                <p className="text-caption text-ash">{SOURCES[link.source].label}</p>
              </li>
            ))}
          </ul>
        </div>
      </InfoDialog>
    </>
  );
}
