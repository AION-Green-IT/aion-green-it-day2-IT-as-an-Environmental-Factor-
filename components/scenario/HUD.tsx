"use client";

import { useState } from "react";
import clsx from "clsx";
import { MOOD_COLOUR, MOOD_LABEL, STAKEHOLDERS } from "@/data/meridian";
import type { MeridianState, StakeholderKey } from "@/lib/types";
import { StakeholderAvatar } from "./StakeholderAvatar";

const KEYS: StakeholderKey[] = ["marcus", "sabine", "rafael", "elena"];
const TOTAL = 200;

export function HUD({
  state,
  log,
}: {
  state: MeridianState;
  log: { week: number; title: string }[];
}) {
  // One open at a time, so the rail stays a rail.
  const [open, setOpen] = useState<StakeholderKey | null>(null);
  const spentPct = Math.min(100, (state.budgetSpent / TOTAL) * 100);

  return (
    <aside aria-label="Scenario status" className="space-y-3">
      <div className="card p-4">
        <p className="text-caption uppercase tracking-wide text-ash">Week</p>
        <p className="text-h1 tabular-nums text-ink transition-all duration-200">
          {state.weekNow}
          <span className="text-body text-ash"> of 12</span>
        </p>
        <div className="mt-2 flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className={clsx(
                "h-1.5 flex-1 rounded-full",
                i < state.weekNow ? "bg-purple" : "bg-lilac",
              )}
            />
          ))}
        </div>
      </div>

      <div className="card p-4">
        <p className="mb-1 text-caption uppercase tracking-wide text-ash">Budget</p>
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-lilac"
          role="progressbar"
          aria-valuenow={Math.round(spentPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Budget spent"
        >
          <div
            className={clsx(
              "h-full rounded-full transition-all duration-300",
              spentPct >= 100 ? "bg-danger" : spentPct >= 80 ? "bg-warn" : "bg-purple",
            )}
            style={{ width: `${spentPct}%` }}
          />
        </div>
        <p className="mt-1.5 text-caption tabular-nums text-ash">
          €{state.budgetSpent}k spent · €{Math.max(0, TOTAL - state.budgetSpent)}k left
        </p>
      </div>

      <div className="card p-4">
        <p className="text-caption uppercase tracking-wide text-ash">Stakeholders</p>
        <p className="mb-2 text-caption text-ash">
          Select a name to see what they want and what they control.
        </p>
        <ul className="space-y-1">
          {KEYS.map((key) => {
            const mood = state.moods[key];
            const person = STAKEHOLDERS[key];
            const isOpen = open === key;

            return (
              <li key={key}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`who-${key}`}
                  onClick={() => setOpen(isOpen ? null : key)}
                  className={clsx(
                    "flex w-full items-center gap-2 rounded-lg p-1 text-left transition-colors duration-200",
                    isOpen ? "bg-lilac" : "hover:bg-lilac/60",
                  )}
                >
                  <StakeholderAvatar who={key} size={24} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-caption font-semibold text-ink">
                      {person.name}
                    </span>
                    <span className="block truncate text-caption text-ash">
                      {person.role}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: MOOD_COLOUR[mood] }}
                    />
                    <span className="text-caption text-navy">{MOOD_LABEL[mood]}</span>
                  </span>
                </button>

                {isOpen ? (
                  <dl
                    id={`who-${key}`}
                    className="mt-1 space-y-1.5 rounded-lg border-l-2 border-purple bg-lilac/40 p-2.5"
                  >
                    <div>
                      <dt className="text-caption font-semibold text-purple">Wants</dt>
                      <dd className="text-caption text-ink">{person.wants}</dd>
                    </div>
                    <div>
                      <dt className="text-caption font-semibold text-purple">Controls</dt>
                      <dd className="text-caption text-ink">{person.controls}</dd>
                    </div>
                    <div>
                      <dt className="text-caption font-semibold text-purple">Why</dt>
                      <dd className="text-caption text-ink">{person.why}</dd>
                    </div>
                  </dl>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="card p-4">
        <p className="mb-2 text-caption uppercase tracking-wide text-ash">Decision log</p>
        {log.length === 0 ? (
          <p className="text-caption text-ash">No decisions yet.</p>
        ) : (
          <ol className="space-y-1.5">
            {log.map((entry, i) => (
              <li
                key={`${entry.week}-${entry.title}`}
                className={clsx(
                  "pl-2 text-caption",
                  i === log.length - 1
                    ? "border-l-2 border-purple font-semibold text-ink"
                    : "border-l-2 border-line text-ash",
                )}
              >
                Week {entry.week} · {entry.title}
              </li>
            ))}
          </ol>
        )}
      </div>
    </aside>
  );
}
