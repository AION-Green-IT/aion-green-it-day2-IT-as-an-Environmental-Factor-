"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { METHOD, Q1, Q2, Q3, Q4, STORY, THEORY, type SignalId } from "@/data/story";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ChapterRail } from "./story/ChapterRail";
import { DeskScene } from "./story/DeskScene";
import { Chapter0 } from "./story/Chapter0";
import { Scorecard } from "./story/Scorecard";
import { Chapter3, type DialPositions } from "./story/Chapter3";
import { Chapter4 } from "./story/Chapter4";
import { SignalIcon } from "./story/SignalIcon";
import { Meter } from "./story/Meter";
import { CustomerAsk } from "./story/CustomerAsk";
import { useWidget } from "./useWidget";

const BUILT_CHAPTERS = 4;

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
  const [page, setPage] = useState(0);
  const [q1Spent, setQ1Spent] = useState(false);
  const [investigated, setInvestigated] = useState<SignalId[]>([]);
  const [choice, setChoice] = useState<string | null>(null);
  const [positions, setPositions] = useState<DialPositions>({});
  const [q3Locked, setQ3Locked] = useState(false);
  const { complete } = useWidget(STORY.id, STORY.xp);

  // A chapter stays open once reached, so a learner can turn back to reread it.
  const unlocked = !q1Spent ? 1 : !choice ? 2 : !q3Locked ? 3 : 4;
  const done = q3Locked && Boolean(choice);

  const moveDial = (id: string, value: number) =>
    setPositions((prev) => ({ ...prev, [id]: value }));
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
    setPage(0);
    setQ1Spent(false);
    setInvestigated([]);
    setChoice(null);
    setPositions({});
    setQ3Locked(false);
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

      {page === 0 ? (
        <Chapter quarter={METHOD.quarter} title={METHOD.title} objective={METHOD.objective}>
          <Chapter0 />
          <button
            type="button"
            onClick={() => setPage(1)}
            className="mt-4 rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
          >
            Start the year: Q1 →
          </button>
        </Chapter>
      ) : null}

      {/* ---------------------------------------------- Q1 */}
      {page === 1 ? (
      <Chapter quarter={Q1.quarter} title={Q1.title} objective={Q1.objective}>
        <button
          type="button"
          onClick={() => setPage(0)}
          className="mb-3 rounded-lg text-caption font-semibold text-purple underline underline-offset-2 hover:text-navy"
        >
          ← Back to the method
        </button>

        {!q1Spent ? (
          <>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-body text-ink">{Q1.brief}</p>
              <p className="text-caption font-semibold text-purple">
                {investigated.length} of {Q1.budget} chosen
              </p>
            </div>

            <DeskScene
              selected={investigated}
              spent={false}
              full={investigated.length >= Q1.budget}
              onToggle={toggle}
            />

            {/* What the objects on the desk cannot say for themselves. */}
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {Q1.signals.map((signal) => {
                const on = investigated.includes(signal.id);
                return (
                  <li
                    key={signal.id}
                    className={clsx(
                      "rounded-xl border p-3",
                      on ? "border-purple bg-purple/10" : "border-line bg-paper",
                    )}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <SignalIcon
                        id={signal.id}
                        className={clsx("h-5 w-5", on ? "text-purple" : "text-navy")}
                      />
                      <span className="text-body font-semibold text-ink">{signal.label}</span>
                    </div>
                    <p className="text-caption text-ash">{signal.teaser}</p>
                    <p className="mt-1 text-caption font-semibold text-navy">
                      {signal.perspective}
                    </p>
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
            <DeskScene
              selected={investigated}
              spent
              full
              onToggle={() => undefined}
            />

            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
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
                        className={clsx("h-5 w-5", on ? "text-good" : "text-warn")}
                      />
                      <span className="text-caption font-semibold uppercase tracking-wide text-ash">
                        {signal.perspective}
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
                  Your choice against the five criteria
                </p>

                <Scorecard
                  chosenId={chosen.id}
                  knewDeadline={investigated.includes("customer")}
                />

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

                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className="rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
                >
                  Next chapter: Q3 →
                </button>

                <div className="hidden rounded-xl border border-line p-4">
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


              </div>
            ) : null}
          </Chapter>
        </div>
      ) : null}

      {/* ---------------------------------------------- Q3 */}
      {page === 3 ? (
        <Chapter quarter={Q3.quarter} title={Q3.title} objective={Q3.objective}>
          <button
            type="button"
            onClick={() => setPage(2)}
            className="mb-3 rounded-lg text-caption font-semibold text-purple underline underline-offset-2 hover:text-navy"
          >
            ← Back to Q2
          </button>

          <Chapter3 positions={positions} onMove={moveDial} />

          <button
            type="button"
            onClick={() => {
              setQ3Locked(true);
              setPage(4);
            }}
            className="mt-4 rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
          >
            Take these positions into December →
          </button>
        </Chapter>
      ) : null}

      {/* ---------------------------------------------- Q4 */}
      {page === 4 && chosen ? (
        <Chapter quarter={Q4.quarter} title={Q4.title} objective={Q4.objective}>
          <button
            type="button"
            onClick={() => setPage(3)}
            className="mb-3 rounded-lg text-caption font-semibold text-purple underline underline-offset-2 hover:text-navy"
          >
            ← Back to Q3
          </button>

          <Chapter4
            chosen={chosen}
            investigated={investigated}
            positions={positions}
          />

          <div className="mt-4 rounded-xl border border-line p-4">
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

          <button
            type="button"
            onClick={restart}
            className="mt-4 rounded-xl border border-line px-4 py-2 text-body font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
          >
            Play the year again, differently
          </button>
        </Chapter>
      ) : null}
    </section>
  );
}
