"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Briefing } from "@/data/meridian";
import type { Phase } from "@/lib/types";
import { BriefingVisual } from "./BriefingVisual";
import { SOURCES } from "@/data/sources";
import { InfoDialog } from "@/components/ui/InfoDialog";

/**
 * How to think about the phase, never which option to take. Short on the page,
 * with the full reasoning and the reading behind a button.
 */
export function PhaseBriefing({
  briefing,
  phase,
}: {
  briefing: Briefing;
  phase: Phase;
}) {
  const [open, setOpen] = useState(false);
  const [asked, setAsked] = useState<string | null>(null);

  return (
    <>
      <div className="rounded-xl border-l-4 border-purple bg-lilac/40 p-3">
        <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-purple">
          Before you decide
        </p>
        <p className="mb-2 text-body text-ink">{briefing.short}</p>

        <div className="mb-3 rounded-xl bg-paper p-2">
          <BriefingVisual phase={phase} />
        </div>

        <p className="mb-1.5 text-caption uppercase tracking-wide text-ash">
          Three questions — select one to see what you are listening for
        </p>

        <ul className="mb-3 space-y-1.5">
          {briefing.questions.map((item) => {
            const isOpen = asked === item.q;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setAsked(isOpen ? null : item.q)}
                  className={clsx(
                    "flex w-full gap-2 rounded-lg p-1.5 text-left text-body transition-colors duration-200",
                    isOpen ? "bg-paper text-ink" : "text-navy hover:bg-paper/70",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-caption font-semibold",
                      isOpen ? "bg-purple text-paper" : "border border-purple text-purple",
                    )}
                  >
                    ?
                  </span>
                  {item.q}
                </button>

                {isOpen ? (
                  <p className="ml-7 mt-1 border-l-2 border-purple pl-3 text-caption text-ink">
                    {item.lookFor}
                  </p>
                ) : null}
              </li>
            );
          })}
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
