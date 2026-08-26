"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  DEBRIEF_MESSAGE,
  ENDINGS,
  PHASES,
  SIGNAL_LABELS,
} from "@/data/meridian";
import { computeEnding, computeSignals, type MeridianState, type Phase } from "@/lib/types";
import { EndingArt } from "./ScenarioArt";

const titleOf = (phase: Phase, choiceId: string | null) =>
  PHASES.find((p) => p.id === phase)?.choices.find((c) => c.id === choiceId)?.title ?? "—";

/** NS5 / R4: the only surface where reveal vocabulary is allowed. */
export function Debrief({
  state,
  onReplay,
}: {
  state: MeridianState;
  onReplay: () => void;
}) {
  const [open, setOpen] = useState<string | null>(null);

  const ending = state.ending ?? computeEnding(state.choices, state.weekNow);
  const signals = computeSignals(state.choices);
  const path: Phase[] = ["p1", "p2", "p3", "p4"];

  // Two small perturbations, so the alternatives are legible rather than random.
  const swap = (phase: Phase, letter: string) => {
    const choices = { ...state.choices, [phase]: `${phase}-${letter}` };
    return { id: computeEnding(choices, state.weekNow), phase, letter };
  };

  const whatIfs = [
    swap("p1", state.choices.p1 === "p1-a" ? "b" : "a"),
    swap("p3", state.choices.p3 === "p3-b" ? "a" : "b"),
  ];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <section className="card p-6">
        <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
          Twelve weeks later
        </p>
        <h2 className="mb-3 text-h1 text-ink">{ENDINGS[ending].name}</h2>
        <div className="mb-4 max-w-md">
          <EndingArt ending={ending} />
        </div>
        <p className="mb-4 text-body text-ink">{ENDINGS[ending].body}</p>

        <ol className="space-y-2">
          {ENDINGS[ending].beats.map((beat) => (
            <li key={beat} className="flex gap-3 text-body text-navy">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
              {beat}
            </li>
          ))}
        </ol>
      </section>

      <section className="card p-5">
        <h3 className="mb-3 text-h3 text-ink">The path you took</h3>
        <ol className="flex flex-wrap items-stretch gap-2">
          {path.map((phase, i) => (
            <li key={phase} className="flex min-w-[150px] flex-1 items-center gap-2">
              <div className="min-w-0 flex-1 rounded-xl border border-line p-3">
                <p className="text-caption uppercase tracking-wide text-ash">
                  {phase.toUpperCase()}
                </p>
                <p className="text-body text-ink">{titleOf(phase, state.choices[phase])}</p>
              </div>
              {i < path.length - 1 ? (
                <span aria-hidden="true" className="text-h3 text-ash">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="card p-5">
        <h3 className="mb-3 text-h3 text-ink">Signals</h3>
        <ul className="space-y-2">
          {SIGNAL_LABELS.map(({ key, label }) => {
            const n = signals[key];
            return (
              <li key={key} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-body text-ink">{label}</span>
                <span className="flex flex-1 gap-1" aria-label={`${label}: ${n}`}>
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={clsx(
                        "h-2 flex-1 rounded-full",
                        i < n ? "bg-purple" : "bg-lilac",
                      )}
                    />
                  ))}
                </span>
                <span className="w-6 shrink-0 text-right text-caption tabular-nums text-ash">
                  {n}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-caption text-ash">
          Signals shape endings, not individual choices.
        </p>
      </section>

      <section className="card p-5">
        <h3 className="mb-3 text-h3 text-ink">What if</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {whatIfs.map((w) => {
            const isOpen = open === `${w.phase}-${w.letter}`;
            return (
              <div key={`${w.phase}-${w.letter}`} className="rounded-xl border border-line p-3">
                <p className="mb-1 text-caption text-ash">
                  If {w.phase.toUpperCase()} had been “
                  {titleOf(w.phase, `${w.phase}-${w.letter}`)}”
                </p>
                <p className="mb-2 text-body font-semibold text-ink">{ENDINGS[w.id].name}</p>
                <p className="text-body text-ash">
                  {isOpen
                    ? ENDINGS[w.id].body
                    : `${ENDINGS[w.id].body.split(". ")[0]}.`}
                </p>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : `${w.phase}-${w.letter}`)}
                  className="mt-2 rounded text-caption font-semibold text-purple underline underline-offset-2 hover:text-navy"
                >
                  {isOpen ? "Show less" : "Read it"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card border-l-4 border-purple p-5">
        {DEBRIEF_MESSAGE.map((p) => (
          <p key={p} className="mb-3 text-body text-ink last:mb-0">
            {p}
          </p>
        ))}
      </section>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/learn#l3"
          className="rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
        >
          Continue to L3 · Management decision →
        </Link>
        <Link
          href="/task-map"
          className="rounded-xl border border-line px-4 py-2 text-body font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
        >
          Explore the case tabs
        </Link>
        <button
          type="button"
          onClick={onReplay}
          className="rounded-xl border border-line px-4 py-2 text-body font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
        >
          Reset and replay
        </button>

      </div>
    </div>
  );
}
