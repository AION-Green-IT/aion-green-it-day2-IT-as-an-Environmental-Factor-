"use client";

import { useState } from "react";
import clsx from "clsx";
import { Q2, Q3, Q4, type Initiative, type SignalId } from "@/data/story";
import { FieldNote } from "../FieldNote";
import { CustomerAsk } from "./CustomerAsk";
import { bandOf, type DialPositions } from "./Chapter3";

/** The regulated question, met whether or not the learner can answer it. */
function PueInstrument({ canAnswer }: { canAnswer: boolean }) {
  const [overhead, setOverhead] = useState(50);
  const pue = 1 + overhead / 100;

  return (
    <div className="rounded-xl border border-line p-4">
      <p className="mb-1 text-body font-semibold text-ink">{Q4.pue.question}</p>
      <p
        className={clsx(
          "mb-3 rounded-lg border-l-4 p-2 text-caption",
          canAnswer ? "border-good bg-good/10 text-ink" : "border-warn bg-warn/10 text-ink",
        )}
      >
        {canAnswer ? Q4.pue.canAnswer : Q4.pue.cannotAnswer}
      </p>

      <label htmlFor="q4-pue" className="text-caption text-ash">
        Facility overhead on top of the computing load
      </label>
      <input
        id="q4-pue"
        type="range"
        min={0}
        max={100}
        value={overhead}
        onChange={(e) => setOverhead(Number(e.target.value))}
        aria-valuetext={`PUE ${pue.toFixed(2)}`}
        className="mt-1 w-full accent-purple"
      />

      <p className="mt-2 text-h2 tabular-nums text-ink">PUE {pue.toFixed(2)}</p>
      <p className="mb-3 text-caption text-ash">
        For every 10 units doing computing, {(overhead / 10).toFixed(1)} go to cooling,
        conversion and the building.
      </p>

      <div className="space-y-2">
        {Q4.pue.thresholds.map((t) => {
          const clears = pue <= t.limit;
          return (
            <div
              key={t.id}
              className={clsx(
                "flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border-l-4 p-2",
                clears ? "border-good bg-good/10" : "border-danger bg-danger/10",
              )}
            >
              <span
                className={clsx(
                  "shrink-0 rounded-full px-2 py-0.5 text-caption font-semibold text-paper",
                  clears ? "bg-good" : "bg-danger",
                )}
              >
                {clears ? "Clears" : "Misses"}
              </span>
              <span className="text-caption font-semibold text-ink">{t.label}</span>
              <span className="w-full text-caption text-ash">{t.applies}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-2 rounded-lg bg-lilac/60 p-2 text-caption text-navy">
        {Q4.pue.draftNote}
      </p>
      <FieldNote note={Q4.pue.note} />
      <p className="mt-2 text-caption text-ash">{Q4.pue.closing}</p>
    </div>
  );
}

export function Chapter4({
  chosen,
  investigated,
  positions,
}: {
  chosen: Initiative;
  investigated: SignalId[];
  positions: DialPositions;
}) {
  const [showOther, setShowOther] = useState<string | null>(null);

  const canAnswerPue =
    investigated.includes("energy") || chosen.id === "baseline";

  // Who ends up speaking for you, from where the dials landed.
  const support = Q3.dials.map((dial) => {
    const band = dial.bands[bandOf(positions[dial.id] ?? 50)];
    return { question: dial.question, backs: band.backs, objects: band.objects };
  });

  const verdict =
    chosen.delivers.length >= 2
      ? Q4.verdicts.strong
      : chosen.delivers.length === 1
        ? Q4.verdicts.mixed
        : Q4.verdicts.thin;

  const others = Q2.initiatives.filter((i) => i.id !== chosen.id);
  const other = others.find((o) => o.id === showOther) ?? null;

  return (
    <>
      <p className="mb-4 text-body text-ink">{Q4.brief}</p>

      <div className="mb-4 grid gap-3 lg:grid-cols-2">
        <CustomerAsk
          delivers={chosen.delivers}
          deadlineKnown={investigated.includes("customer")}
        />
        <PueInstrument canAnswer={canAnswerPue} />
      </div>

      <div className="mb-4 rounded-xl border border-line p-4">
        <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
          Who speaks for you
        </p>
        <ul className="space-y-2">
          {support.map((s) => (
            <li key={s.question} className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-body text-ink">{s.question}</span>
              <span className="rounded-full bg-good/15 px-2 py-0.5 text-caption text-ink">
                backs: {s.backs}
              </span>
              <span className="rounded-full bg-warn/15 px-2 py-0.5 text-caption text-ink">
                objects: {s.objects}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-4 rounded-xl border-l-4 border-purple bg-lilac/50 p-3 text-body text-navy">
        {verdict}
      </p>

      {/* The counterfactual — a trade-off is only visible against the road not taken. */}
      <div className="rounded-xl border border-line p-4">
        <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
          {Q4.counterfactual.title}
        </p>
        <p className="mb-3 text-caption text-ash">{Q4.counterfactual.intro}</p>

        <div className="mb-3 flex flex-wrap gap-2">
          {others.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={showOther === o.id}
              onClick={() => setShowOther(showOther === o.id ? null : o.id)}
              className={clsx(
                "rounded-xl border px-3 py-1.5 text-caption font-semibold transition-colors duration-200",
                showOther === o.id
                  ? "border-purple bg-purple text-paper"
                  : "border-line text-navy hover:border-purple hover:bg-lilac",
              )}
            >
              If you had chosen {o.letter}
            </button>
          ))}
        </div>

        {other ? (
          <div className="space-y-2">
            <p className="text-body font-semibold text-ink">{other.title}</p>
            <CustomerAsk
              delivers={other.delivers}
              deadlineKnown={investigated.includes("customer")}
            />
            <p className="text-caption text-ink">
              <span className="font-semibold text-warn">The cost you would have paid: </span>
              {other.costs}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
