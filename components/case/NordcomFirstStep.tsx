"use client";

import { useState } from "react";
import clsx from "clsx";
import { ACTION_AREAS, KEY } from "@/data/nordcom";
import { HorizonTimeline } from "./HorizonTimeline";

/**
 * Task 3, step 4 — which action area runs first.
 *
 * Two stages on purpose: the trade-off of your own choice is shown before the
 * key, so the key reads as a comparison rather than a verdict. Every option
 * carries a real cost, including the one the key names.
 */
export function NordcomFirstStep() {
  const [picked, setPicked] = useState<string | null>(null);
  const [committed, setCommitted] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);

  const chosen = ACTION_AREAS.find((a) => a.id === committed) ?? null;
  const isKeyChoice = committed === "aa-consolidate";

  return (
    <section
      aria-labelledby="first-step-title"
      className="card p-5 md:p-6"
      id="first-step"
    >
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        Case study · first move
      </p>
      <h2 id="first-step-title" className="mb-2 text-h2 text-ink">
        Which measure is implemented first?
      </h2>
      <p className="mb-5 text-body text-ash">
        Four levers, drawn from the findings above. All four belong in the
        recommendation. Only one can start first, and the order is the decision
        management is actually asking you for.
      </p>

      <div className="mb-4 grid gap-3 md:grid-cols-2">
        {ACTION_AREAS.map((area) => {
          const isPicked = picked === area.id;
          const isCommitted = committed === area.id;

          return (
            <button
              key={area.id}
              type="button"
              disabled={Boolean(committed)}
              aria-pressed={isPicked}
              onClick={() => setPicked(area.id)}
              className={clsx(
                "rounded-2xl border p-4 text-left transition-colors duration-200",
                isCommitted
                  ? "border-purple bg-purple/10"
                  : isPicked
                    ? "border-purple bg-lilac"
                    : "border-line hover:border-purple hover:bg-lilac/60",
                committed && !isCommitted && "opacity-50",
              )}
            >
              <div className="mb-1 flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className={clsx(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                    isPicked || isCommitted
                      ? "border-purple bg-purple"
                      : "border-ash bg-paper",
                  )}
                >
                  {isPicked || isCommitted ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                  ) : null}
                </span>
                <h3 className="text-body font-semibold text-ink">{area.title}</h3>
              </div>
              <p className="pl-6 text-caption text-ash">{area.summary}</p>
            </button>
          );
        })}
      </div>

      {!committed ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!picked}
            onClick={() => setCommitted(picked)}
            className="rounded-xl bg-navy px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-purple disabled:cursor-not-allowed disabled:opacity-40"
          >
            Commit to this as the first step
          </button>
          <span className="text-caption text-ash">
            {picked
              ? "You can still change your mind until you commit."
              : "Pick one to continue."}
          </span>
        </div>
      ) : null}

      {chosen ? (
        <div className="space-y-3" aria-live="polite">
          <div className="rounded-2xl border border-line bg-lilac/50 p-4">
            <h3 className="mb-2 text-h3 text-ink">You chose: {chosen.title}</h3>

            <h4 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
              What this buys you
            </h4>
            <p className="mb-3 text-body text-ink">{chosen.strength}</p>

            <h4 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
              What it costs you
            </h4>
            <p className="text-body text-ink">{chosen.tradeoff}</p>
          </div>

          {!showKey ? (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowKey(true)}
                className="rounded-xl border border-purple px-4 py-2 text-body font-semibold text-purple transition-colors duration-200 hover:bg-purple hover:text-paper"
              >
                Show the answer key
              </button>
              <span className="text-caption text-ash">
                Write your justification first — impact, risk, feasibility. The key
                is easier to agree with than to have arrived at.
              </span>
            </div>
          ) : null}

          {showKey ? (
            <div className="rounded-2xl border border-purple/40 bg-paper p-4">
              <h3 className="mb-3 text-h3 text-ink">Answer key</h3>

              <p className="mb-4 border-l-2 border-purple pl-3 text-body italic text-ink">
                {KEY.core}
              </p>

              <h4 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
                The prioritised first step
              </h4>
              <p className="mb-2 text-body text-ink">{KEY.firstStep}</p>

              <div
                className={clsx(
                  "mb-4 rounded-xl px-3 py-2 text-caption",
                  isKeyChoice ? "bg-lilac text-navy" : "bg-lilac/60 text-navy",
                )}
              >
                {isKeyChoice
                  ? "This is the area you committed to. The trade-off above still stands — it is the price of the recommended step, not a reason against it."
                  : "This is not the area you committed to. That does not make your choice wrong; it makes it a choice you now have to defend against this one."}
              </div>

              <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                Why it goes first
              </h4>
              <ul className="mb-4 space-y-1">
                {KEY.reasons.map((reason) => (
                  <li key={reason} className="flex gap-2 text-body text-ink">
                    <span aria-hidden="true" className="text-purple">
                      &middot;
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>

              <HorizonTimeline />
              <div className="mb-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-line p-3">
                  <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                    Short-term
                  </h4>
                  <ul className="space-y-1">
                    {KEY.shortTerm.map((step) => (
                      <li key={step} className="text-caption text-ink">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-line p-3">
                  <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                    Medium-term
                  </h4>
                  <ul className="space-y-1">
                    {KEY.mediumTerm.map((step) => (
                      <li key={step} className="text-caption text-ink">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-line p-3">
                  <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                    Structural
                  </h4>
                  <ul className="space-y-1">
                    {KEY.structural.map((step) => (
                      <li key={step} className="text-caption text-ink">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="border-t border-line pt-3 text-caption text-ash">
                {KEY.honesty}
              </p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => {
              setCommitted(null);
              setPicked(null);
              setShowKey(false);
            }}
            className="rounded-xl border border-line px-3 py-2 text-caption font-semibold text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            Choose again
          </button>
        </div>
      ) : null}
    </section>
  );
}
