"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Q1, Q2, STORY, type SignalId } from "@/data/story";
import { useWidget } from "./useWidget";

type Step = "q1" | "q1-debrief" | "q2" | "q2-debrief";

function ChapterHead({
  quarter,
  title,
  objective,
}: {
  quarter: string;
  title: string;
  objective: string;
}) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-navy px-3 py-1 text-caption font-semibold text-paper">
          {quarter}
        </span>
        <h4 className="text-h3 text-ink">{title}</h4>
      </div>
      <p className="text-caption text-ash">
        <span className="font-semibold text-purple">Curriculum objective: </span>
        {objective}
      </p>
    </div>
  );
}

export function StoryL2() {
  const [step, setStep] = useState<Step>("q1");
  const [investigated, setInvestigated] = useState<SignalId[]>([]);
  const [choice, setChoice] = useState<string | null>(null);
  const { complete } = useWidget(STORY.id, STORY.xp);

  const done = step === "q2-debrief";
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const skipped = Q1.signals
    .map((s) => s.id)
    .filter((id) => !investigated.includes(id));

  const toggle = (id: SignalId) => {
    setInvestigated((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length >= Q1.budget
          ? prev
          : [...prev, id],
    );
  };

  const restart = () => {
    setStep("q1");
    setInvestigated([]);
    setChoice(null);
  };

  const chosen = Q2.initiatives.find((i) => i.id === choice) ?? null;
  // Only the gaps that actually bite this particular choice.
  const gaps = chosen
    ? skipped
        .map((id) => ({ id, text: chosen.weakWithout[id] }))
        .filter((g): g is { id: SignalId; text: string } => Boolean(g.text))
    : [];

  return (
    <section id={STORY.id} aria-labelledby="story-title" className="card p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
            L2 as a story · prototype
          </p>
          <h3 id="story-title" className="text-h3 text-ink">
            {STORY.company} — your first year
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-line px-3 py-1 text-caption text-ash">
          {STORY.standing}
        </span>
      </div>

      <p className="mb-2 text-body text-ink">{STORY.premise}</p>
      <p className="mb-4 text-caption font-semibold text-navy">{STORY.role}</p>

      {/* ------------------------------------------------ Q1 */}
      <div className="rounded-xl border border-line p-4">
        <ChapterHead quarter={Q1.quarter} title={Q1.title} objective={Q1.objective} />
        <p className="mb-3 text-body text-ash">{Q1.brief}</p>

        {step === "q1" ? (
          <>
            <p className="mb-2 text-body font-semibold text-ink">
              {Q1.instruction}{" "}
              <span className="font-normal text-ash">
                ({investigated.length} of {Q1.budget} chosen)
              </span>
            </p>

            <ul className="space-y-2">
              {Q1.signals.map((signal) => {
                const on = investigated.includes(signal.id);
                const full = investigated.length >= Q1.budget && !on;

                return (
                  <li key={signal.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      disabled={full}
                      onClick={() => toggle(signal.id)}
                      className={clsx(
                        "w-full rounded-xl border p-3 text-left transition-colors duration-200",
                        on
                          ? "border-purple bg-purple/10"
                          : full
                            ? "border-line bg-lilac/20 opacity-60"
                            : "border-line bg-paper hover:border-purple hover:bg-lilac/50",
                      )}
                    >
                      <span className="block text-body font-semibold text-ink">
                        {signal.label}
                        {on ? " · investigating" : ""}
                      </span>
                      <span className="mt-1 block text-body text-ash">
                        {signal.teaser}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              disabled={investigated.length !== Q1.budget}
              onClick={() => setStep("q1-debrief")}
              className={clsx(
                "mt-3 rounded-xl px-4 py-2 text-body font-semibold transition-colors duration-200",
                investigated.length === Q1.budget
                  ? "bg-purple text-paper hover:bg-navy"
                  : "cursor-not-allowed border border-line text-ash",
              )}
            >
              Spend the quarter
            </button>
          </>
        ) : (
          <div className="space-y-2">
            {Q1.signals.map((signal) => {
              const on = investigated.includes(signal.id);
              return (
                <div
                  key={signal.id}
                  className={clsx(
                    "rounded-xl border-l-4 p-3",
                    on ? "border-good bg-good/10" : "border-warn bg-warn/10",
                  )}
                >
                  <p className="text-body font-semibold text-ink">
                    {signal.label} — {on ? "investigated" : "left on the pile"}
                  </p>
                  <p className="mt-1 text-body text-ink">
                    {on ? signal.learned : signal.blindSpot}
                  </p>
                </div>
              );
            })}

            <p className="rounded-xl bg-lilac/60 p-3 text-body text-navy">
              {skipped.includes("customer") ? Q1.debrief.skippedCustomer : Q1.debrief.all}
            </p>

            {step === "q1-debrief" ? (
              <button
                type="button"
                onClick={() => setStep("q2")}
                className="rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
              >
                Continue to Q2
              </button>
            ) : null}
          </div>
        )}
      </div>

      {/* ------------------------------------------------ Q2 */}
      {step === "q2" || step === "q2-debrief" ? (
        <div className="mt-4 rounded-xl border border-line p-4">
          <ChapterHead quarter={Q2.quarter} title={Q2.title} objective={Q2.objective} />

          <div className="mb-3 grid gap-2 md:grid-cols-2">
            <div className="rounded-xl border-l-4 border-good bg-good/10 p-3">
              <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
                What you know
              </p>
              <ul className="space-y-1">
                {investigated.map((id) => (
                  <li key={id} className="text-body text-ink">
                    {Q1.signals.find((s) => s.id === id)?.headline}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border-l-4 border-warn bg-warn/10 p-3">
              <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
                Still unknown
              </p>
              <ul className="space-y-1">
                {skipped.map((id) => (
                  <li key={id} className="text-body text-ink">
                    {Q1.signals.find((s) => s.id === id)?.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mb-3 text-body text-ash">{Q2.brief}</p>

          <ul className="space-y-2">
            {Q2.initiatives.map((initiative) => {
              const picked = choice === initiative.id;

              return (
                <li key={initiative.id}>
                  <div
                    className={clsx(
                      "rounded-xl border p-3",
                      picked ? "border-purple bg-purple/10" : "border-line bg-paper",
                    )}
                  >
                    <button
                      type="button"
                      disabled={step === "q2-debrief"}
                      onClick={() => {
                        setChoice(initiative.id);
                        setStep("q2-debrief");
                      }}
                      className={clsx(
                        "w-full text-left",
                        step === "q2-debrief" ? "cursor-default" : "hover:underline",
                      )}
                    >
                      <span className="block text-body font-semibold text-ink">
                        {initiative.title}
                      </span>
                      <span className="mt-1 block text-body text-ash">
                        {initiative.body}
                      </span>
                    </button>

                    {step === "q2-debrief" ? (
                      <div className="mt-3 space-y-2">
                        <p className="rounded-lg border-l-4 border-good bg-good/10 p-2 text-body text-ink">
                          <span className="font-semibold">What it buys: </span>
                          {initiative.buys}
                        </p>
                        <p className="rounded-lg border-l-4 border-warn bg-warn/10 p-2 text-body text-ink">
                          <span className="font-semibold">What it costs: </span>
                          {initiative.costs}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>

          {step === "q2-debrief" && chosen ? (
            <div className="mt-4 space-y-3 border-t border-line pt-4">
              {gaps.length > 0 ? (
                <div className="rounded-xl border-l-4 border-danger bg-danger/10 p-3">
                  <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-danger">
                    What Q1 costs you here
                  </p>
                  <ul className="space-y-2">
                    {gaps.map((gap) => (
                      <li key={gap.id} className="text-body text-ink">
                        {gap.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="rounded-xl border-l-4 border-good bg-good/10 p-3 text-body text-ink">
                  Your Q1 investigation covered everything this choice depends on. That is
                  not luck — the two you looked at are the two this option stands on.
                </p>
              )}

              <p className="rounded-xl bg-lilac/60 p-3 text-body text-navy">
                {Q2.closing}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={restart}
                  className="rounded-xl border border-line px-4 py-2 text-body font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
                >
                  Start the year again, differently
                </button>
                <span className="self-center text-caption text-ash">
                  Q3 and Q4 are not built yet.
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
