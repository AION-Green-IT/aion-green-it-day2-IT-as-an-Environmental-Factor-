"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  ALLOCATION_NOTES,
  CAPACITY_TOTAL,
  MEASURES,
  POSTPONED_PROMPT,
} from "@/data/auron";

const REQUIRED = MEASURES.reduce((n, m) => n + m.cost, 0);

/**
 * Task 4, step 7 — the 12-month roadmap, committed as an allocation.
 *
 * There is no answer key here and there is not meant to be one. Seven measures
 * cost more than the capacity of ten, so something is always left out, and what
 * gets left out is the proposal. The read-back names consequences, never a
 * score.
 */
export function AuronAllocation() {
  const [funded, setFunded] = useState<string[]>([]);
  const [committed, setCommitted] = useState(false);
  const [postponed, setPostponed] = useState("");

  const spent = useMemo(
    () =>
      MEASURES.filter((m) => funded.includes(m.id)).reduce((n, m) => n + m.cost, 0),
    [funded],
  );

  const remaining = CAPACITY_TOTAL - spent;
  const unfunded = MEASURES.filter((m) => !funded.includes(m.id));

  const toggle = (id: string, cost: number) => {
    setFunded((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (spent + cost > CAPACITY_TOTAL) return prev; // the ceiling is the point
      return [...prev, id];
    });
  };

  const readBack = () => {
    const notes: string[] = [];
    if (remaining > 0) notes.push(ALLOCATION_NOTES.underspent);
    else notes.push(ALLOCATION_NOTES.complete);
    if (!funded.includes("m-owner") && funded.length > 0)
      notes.push(ALLOCATION_NOTES.noOwner);
    if (funded.length === 1 && funded.includes("m-owner"))
      notes.push(ALLOCATION_NOTES.ownerOnly);
    return notes;
  };

  return (
    <section aria-labelledby="allocation-title" className="card p-5 md:p-6" id="allocation">
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        Level 3 · the prioritised line, as an allocation
      </p>
      <h2 id="allocation-title" className="mb-2 text-h2 text-ink">
        The first prioritised line of measures
      </h2>
      <p className="mb-4 text-body text-ash">
        {MEASURES.length} measures. Together they need{" "}
        <strong className="text-ink">{REQUIRED} points</strong> of capacity, and you
        have <strong className="text-ink">{CAPACITY_TOTAL}</strong>. The shortfall is
        deliberate and is not a fault in the exercise — a prioritised line is one
        where some things sit late on purpose.
      </p>

      {/* Capacity meter */}
      <div className="mb-4 rounded-2xl border border-line p-4">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-caption font-semibold uppercase tracking-wide text-ash">
            Capacity committed
          </span>
          <span className="text-body font-semibold text-ink">
            {spent} of {CAPACITY_TOTAL} points
            {remaining > 0 ? (
              <span className="font-normal text-ash"> · {remaining} unused</span>
            ) : null}
          </span>
        </div>
        <div
          role="img"
          aria-label={`${spent} of ${CAPACITY_TOTAL} capacity points committed`}
          className="flex gap-1"
        >
          {Array.from({ length: CAPACITY_TOTAL }, (_, i) => (
            <span
              key={i}
              className={clsx(
                "h-3 flex-1 rounded-sm",
                i < spent ? "bg-purple" : "bg-line",
              )}
            />
          ))}
        </div>
      </div>

      <ul className="mb-4 space-y-2">
        {MEASURES.map((measure) => {
          const isOn = funded.includes(measure.id);
          const wouldOverrun = !isOn && spent + measure.cost > CAPACITY_TOTAL;

          return (
            <li key={measure.id}>
              <button
                type="button"
                disabled={committed || wouldOverrun}
                aria-pressed={isOn}
                onClick={() => toggle(measure.id, measure.cost)}
                className={clsx(
                  "w-full rounded-2xl border p-4 text-left transition-colors duration-200",
                  isOn
                    ? "border-purple bg-purple/10"
                    : wouldOverrun
                      ? "border-line bg-lilac/30 opacity-60"
                      : "border-line hover:border-purple hover:bg-lilac/60",
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[11px] font-bold",
                      isOn
                        ? "border-purple bg-purple text-paper"
                        : "border-ash bg-paper text-transparent",
                    )}
                  >
                    ✓
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-body font-semibold text-ink">
                        {measure.title}
                      </h3>
                      <span
                        className={clsx(
                          "shrink-0 rounded-lg px-2 py-0.5 text-caption font-semibold",
                          isOn ? "bg-purple text-paper" : "bg-lilac text-navy",
                        )}
                      >
                        {measure.cost} pt
                      </span>
                    </div>
                    <p className="text-caption text-ash">{measure.buys}</p>
                    {wouldOverrun && !committed ? (
                      <p className="mt-2 text-caption font-semibold text-navy">
                        Does not fit in the capacity you have left. Free something
                        up, or leave this one out.
                      </p>
                    ) : null}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {!committed ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={funded.length === 0}
            onClick={() => setCommitted(true)}
            className="rounded-xl bg-navy px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-purple disabled:cursor-not-allowed disabled:opacity-40"
          >
            Commit this roadmap
          </button>
          <span className="text-caption text-ash">
            {funded.length === 0
              ? "Fund at least one measure to continue."
              : "You can still change the allocation until you commit."}
          </span>
        </div>
      ) : (
        <div className="space-y-3" aria-live="polite">
          <div className="rounded-2xl border border-line bg-lilac/50 p-4">
            {readBack().map((note) => (
              <p key={note} className="mb-2 text-body text-ink last:mb-0">
                {note}
              </p>
            ))}
          </div>

          {unfunded.length > 0 ? (
            <div className="rounded-2xl border border-line p-4">
              <h3 className="mb-1 text-h3 text-ink">
                What you left unfunded, and what it leaves open
              </h3>
              <p className="mb-3 text-caption text-ash">
                None of these is a mistake. Each is a position you now have to hold
                in front of management.
              </p>
              <ul className="space-y-3">
                {unfunded.map((measure) => (
                  <li key={measure.id} className="border-l-2 border-line pl-3">
                    <h4 className="text-body font-semibold text-ink">
                      {measure.title}
                    </h4>
                    <p className="text-caption text-ash">{measure.exposes}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-2xl border border-purple/40 p-4">
            <h3 className="mb-1 text-h3 text-ink">{POSTPONED_PROMPT.heading}</h3>
            <p className="mb-3 text-caption text-ash">{POSTPONED_PROMPT.intro}</p>
            <textarea
              value={postponed}
              onChange={(e) => setPostponed(e.target.value)}
              rows={4}
              placeholder={POSTPONED_PROMPT.placeholder}
              className="w-full rounded-xl border border-line bg-paper p-3 text-body text-ink outline-none transition-colors duration-200 focus:border-purple"
            />
            <p className="mt-2 text-caption text-ash">
              {postponed.trim().length === 0
                ? "Still blank. This is the field the group debrief turns on."
                : "Recorded for the debrief. Nothing here is marked — it is what you will be asked to defend."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setCommitted(false);
              setFunded([]);
              setPostponed("");
            }}
            className="rounded-xl border border-line px-3 py-2 text-caption font-semibold text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            Start the allocation again
          </button>
        </div>
      )}
    </section>
  );
}
