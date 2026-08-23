"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Q1, Q2, STORY, THEORY, type SignalId } from "@/data/story";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ChapterRail } from "./story/ChapterRail";
import { SignalIcon } from "./story/SignalIcon";
import { Meter } from "./story/Meter";
import { CustomerAsk } from "./story/CustomerAsk";
import { useWidget } from "./useWidget";

const BUILT_CHAPTERS = 2;

function Chapter({
  quarter,
  title,
  objective,
  children,
}: {
  quarter: string;
  title: string;
  objective: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-paper p-4">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-navy px-2.5 py-0.5 text-caption font-semibold text-paper">
          {quarter}
        </span>
        <h4 className="text-h3 text-ink">{title}</h4>
      </div>
      <p className="mb-4 text-caption text-ash">
        <span className="font-semibold text-purple">Objective: </span>
        {objective}
      </p>
      {children}
    </section>
  );
}

export function StoryL2() {
  const [page, setPage] = useState(1);
  const [q1Spent, setQ1Spent] = useState(false);
  const [investigated, setInvestigated] = useState<SignalId[]>([]);
  const [choice, setChoice] = useState<string | null>(null);
  const { complete } = useWidget(STORY.id, STORY.xp);

  // A chapter stays open once reached, so a learner can turn back to reread it.
  const unlocked = q1Spent ? 2 : 1;
  const done = Boolean(choice);
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const skipped = Q1.signals.map((s) => s.id).filter((id) => !investigated.includes(id));

  const toggle = (id: SignalId) =>
    setInvestigated((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length >= Q1.budget
          ? prev
          : [...prev, id],
    );

  const restart = () => {
    setPage(1);
    setQ1Spent(false);
    setInvestigated([]);
    setChoice(null);
  };

  const chosen = Q2.initiatives.find((i) => i.id === choice) ?? null;
  const gaps = chosen
    ? skipped
        .map((id) => ({ id, text: chosen.weakWithout[id] }))
        .filter((g): g is { id: SignalId; text: string } => Boolean(g.text))
    : [];

  return (
    <section id={STORY.id} aria-labelledby="story-title" className="card p-5">
      {/* ---------------------------------------------- header */}
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-caption font-semibold uppercase tracking-wide text-purple">
            L2 as a story · prototype
          </p>
          <h3 id="story-title" className="text-h3 text-ink">
            {STORY.company} — your first year
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-line px-3 py-1 text-caption text-ash">
          {STORY.month}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {STORY.facts.map((fact) => (
          <span
            key={fact}
            className="rounded-full bg-lilac px-3 py-1 text-caption text-navy"
          >
            {fact}
          </span>
        ))}
      </div>

      <p className="mb-1 text-body text-ink">{STORY.premise}</p>
      <p className="mb-4 text-caption font-semibold text-navy">{STORY.role}</p>

      <div className="mb-5">
        <ChapterRail
          page={page}
          unlocked={unlocked}
          built={BUILT_CHAPTERS}
          onJump={setPage}
        />
      </div>

      {/* ---------------------------------------------- Q1 */}
      {page === 1 ? (
      <Chapter quarter={Q1.quarter} title={Q1.title} objective={Q1.objective}>
        {!q1Spent ? (
          <>
            <div className="mb-4">
              <ImagePlaceholder
                file={Q1.illustration.file}
                alt={Q1.illustration.alt}
                prompt={Q1.illustration.prompt}
              />
            </div>

            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-body text-ink">{Q1.brief}</p>
              <p className="text-caption font-semibold text-purple">
                {investigated.length} of {Q1.budget} chosen
              </p>
            </div>

            <ul className="grid gap-2 md:grid-cols-3">
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
                        "flex h-full w-full flex-col rounded-xl border p-3 text-left transition-colors duration-200",
                        on
                          ? "border-purple bg-purple/10"
                          : full
                            ? "border-line bg-lilac/20 opacity-50"
                            : "border-line bg-paper hover:border-purple hover:bg-lilac/40",
                      )}
                    >
                      <SignalIcon
                        id={signal.id}
                        className={clsx("mb-2 h-8 w-8", on ? "text-purple" : "text-navy")}
                      />
                      <span className="text-body font-semibold text-ink">{signal.label}</span>
                      <span className="mt-1 text-caption text-ash">{signal.teaser}</span>
                      <span
                        className={clsx(
                          "mt-2 text-caption font-semibold",
                          on ? "text-purple" : "text-ash",
                        )}
                      >
                        {on ? "✓ Investigating" : full ? "No capacity left" : "Select"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              disabled={investigated.length !== Q1.budget}
              onClick={() => setQ1Spent(true)}
              className={clsx(
                "mt-4 rounded-xl px-4 py-2 text-body font-semibold transition-colors duration-200",
                investigated.length === Q1.budget
                  ? "bg-purple text-paper hover:bg-navy"
                  : "cursor-not-allowed border border-line text-ash",
              )}
            >
              Spend the quarter
            </button>
          </>
        ) : (
          <>
            <ul className="grid gap-2 md:grid-cols-3">
              {Q1.signals.map((signal) => {
                const on = investigated.includes(signal.id);
                return (
                  <li
                    key={signal.id}
                    className={clsx(
                      "rounded-xl border-l-4 p-3",
                      on ? "border-good bg-good/10" : "border-warn bg-warn/10",
                    )}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <SignalIcon
                        id={signal.id}
                        className={clsx("h-6 w-6", on ? "text-good" : "text-warn")}
                      />
                      <span
                        className={clsx(
                          "text-caption font-semibold uppercase tracking-wide",
                          on ? "text-good" : "text-warn",
                        )}
                      >
                        {on ? "Investigated" : "Left on the pile"}
                      </span>
                    </div>
                    <p className="text-body font-semibold text-ink">{signal.label}</p>
                    <p className="mt-1 text-caption text-ink">
                      {on ? signal.learned : signal.blindSpot}
                    </p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 rounded-xl bg-lilac/60 p-3 text-body text-navy">
              {skipped.includes("customer") ? Q1.debrief.skippedCustomer : Q1.debrief.all}
            </p>

            <div className="mt-3 rounded-xl border-l-4 border-navy bg-lilac/50 p-3">
              <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-navy">
                And the one that sent nothing: {Q1.missingPerspective.label}
              </p>
              <p className="text-body text-ink">{Q1.missingPerspective.text}</p>
            </div>

            <button
              type="button"
              onClick={() => setPage(2)}
              className="mt-3 rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
            >
              Next chapter: Q2 →
            </button>
          </>
        )}
      </Chapter>
      ) : null}

      {/* ---------------------------------------------- Q2 */}
      {page === 2 ? (
        <div>
          <Chapter quarter={Q2.quarter} title={Q2.title} objective={Q2.objective}>
            <button
              type="button"
              onClick={() => setPage(1)}
              className="mb-3 rounded-lg text-caption font-semibold text-purple underline underline-offset-2 hover:text-navy"
            >
              ← Back to Q1
            </button>

            {/* What you carry in, as chips rather than lists. */}
            <div className="mb-4 flex flex-wrap gap-2">
              {Q1.signals.map((signal) => {
                const on = investigated.includes(signal.id);
                return (
                  <span
                    key={signal.id}
                    title={on ? signal.headline : signal.blindSpot}
                    className={clsx(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption",
                      on
                        ? "border-good bg-good/10 text-ink"
                        : "border-warn bg-warn/10 text-ink",
                    )}
                  >
                    <SignalIcon
                      id={signal.id}
                      className={clsx("h-4 w-4", on ? "text-good" : "text-warn")}
                    />
                    {signal.label}
                    <span className="font-semibold">{on ? "known" : "unknown"}</span>
                  </span>
                );
              })}
            </div>

            <p className="mb-3 text-body text-ink">{Q2.brief}</p>

            <ul className="grid gap-3 lg:grid-cols-3">
              {Q2.initiatives.map((initiative) => {
                const picked = choice === initiative.id;
                const dimmed = Boolean(choice) && !picked;

                return (
                  <li key={initiative.id}>
                    <div
                      className={clsx(
                        "flex h-full flex-col rounded-xl border p-3 transition-colors duration-200",
                        picked
                          ? "border-purple bg-purple/10"
                          : dimmed
                            ? "border-line bg-paper opacity-60"
                            : "border-line bg-paper",
                      )}
                    >
                      <button
                        type="button"
                        disabled={Boolean(choice)}
                        onClick={() => setChoice(initiative.id)}
                        className={clsx(
                          "text-left",
                          choice ? "cursor-default" : "hover:underline",
                        )}
                      >
                        <span className="mb-1 flex items-center gap-2">
                          <span
                            className={clsx(
                              "flex h-6 w-6 items-center justify-center rounded-md text-caption font-semibold",
                              picked ? "bg-purple text-paper" : "bg-navy text-paper",
                            )}
                          >
                            {initiative.letter}
                          </span>
                          <span className="text-body font-semibold text-ink">
                            {initiative.title}
                          </span>
                        </span>
                        <span className="block text-caption text-ash">{initiative.body}</span>
                      </button>

                      <div className="mt-3 space-y-2">
                        <Meter label={Q2.meters.visible} value={initiative.visible} tone="good" />
                        <Meter label={Q2.meters.lasting} value={initiative.lasting} tone="good" />
                        <Meter
                          label={Q2.meters.resistance}
                          value={initiative.resistance}
                          tone="warn"
                        />
                      </div>

                      {picked ? (
                        <div className="mt-3 space-y-2 border-t border-line pt-3">
                          <p className="text-caption text-ink">
                            <span className="font-semibold text-good">Buys: </span>
                            {initiative.buys}
                          </p>
                          <p className="text-caption text-ink">
                            <span className="font-semibold text-warn">Costs: </span>
                            {initiative.costs}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>

            {chosen ? (
              <div className="mt-4 space-y-3 border-t border-line pt-4">
                <p className="text-caption font-semibold uppercase tracking-wide text-purple">
                  December, under your choice
                </p>

                <div className="grid gap-3 lg:grid-cols-2">
                  <ImagePlaceholder
                    file={chosen.outcome.file}
                    alt={chosen.outcome.alt}
                    prompt={chosen.outcome.prompt}
                  />
                  <CustomerAsk
                    delivers={chosen.delivers}
                    deadlineKnown={investigated.includes("customer")}
                  />
                </div>

                {gaps.length > 0 ? (
                  <div className="rounded-xl border-l-4 border-danger bg-danger/10 p-3">
                    <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-danger">
                      What Q1 costs you here
                    </p>
                    <ul className="space-y-2">
                      {gaps.map((gap) => (
                        <li key={gap.id} className="flex gap-2 text-caption text-ink">
                          <SignalIcon id={gap.id} className="h-5 w-5 shrink-0 text-danger" />
                          {gap.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="rounded-xl border-l-4 border-good bg-good/10 p-3 text-caption text-ink">
                    Your Q1 covered everything this choice stands on. Not luck — those are
                    the two it depends on.
                  </p>
                )}

                <p className="rounded-xl bg-lilac/60 p-3 text-body text-navy">{Q2.closing}</p>

                <div className="rounded-xl border border-line p-4">
                  <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
                    {THEORY.title}
                  </p>
                  <p className="mb-3 text-body text-ash">{THEORY.intro}</p>

                  <ol className="space-y-2">
                    {THEORY.principles.map((principle, i) => (
                      <li key={principle.name} className="rounded-xl bg-lilac/50 p-3">
                        <p className="text-body font-semibold text-ink">
                          {i + 1}. {principle.name}
                        </p>
                        <p className="mt-1 text-caption text-navy">{principle.text}</p>
                      </li>
                    ))}
                  </ol>

                  <p className="mt-3 text-caption text-ash">{THEORY.closing}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={restart}
                    className="rounded-xl border border-line px-4 py-2 text-body font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
                  >
                    Play the year again, differently
                  </button>
                  <span className="text-caption text-ash">Q3 and Q4 are not built yet.</span>
                </div>
              </div>
            ) : null}
          </Chapter>
        </div>
      ) : null}
    </section>
  );
}
