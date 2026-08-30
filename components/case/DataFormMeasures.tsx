"use client";

import { useState } from "react";
import clsx from "clsx";
import { TASK2, type Measure, type Rating } from "@/data/task2";
import { useProgress } from "@/lib/store";
import { scopedId } from "@/lib/ids";

const RATING_CLASS: Record<Rating, string> = {
  strong: "bg-good/15 text-good border-good/40",
  mixed: "bg-warn/15 text-warn border-warn/40",
  weak: "bg-danger/15 text-danger border-danger/40",
};

const RATING_LABEL: Record<Rating, string> = {
  strong: "Strong",
  mixed: "Mixed",
  weak: "Weak",
};

const CELL: Record<Rating, string> = {
  strong: "bg-good",
  mixed: "bg-warn",
  weak: "bg-danger",
};

const SHORT: Record<string, string> = {
  impact: "Impact",
  viability: "Cost",
  feasibility: "Feasible",
  risk: "Risk",
  time: "Time",
  strategic: "Strategy",
};

function MeasureCard({
  measure,
  chosen,
  revealed,
  onChoose,
}: {
  measure: Measure;
  chosen: boolean;
  revealed: boolean;
  onChoose: () => void;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border p-4 transition-colors duration-200",
        chosen ? "border-purple bg-lilac/40" : "border-line bg-paper",
      )}
    >
      <div className="mb-2 flex items-start gap-3">
        <span
          className={clsx(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-body font-semibold",
            chosen ? "bg-purple text-paper" : "bg-navy text-paper",
          )}
        >
          {measure.letter}
        </span>
        <div>
          <h4 className="text-h3 text-ink">{measure.title}</h4>
          <p className="mt-1 text-caption text-ash">{measure.summary}</p>
        </div>
      </div>

      <button
        type="button"
        aria-pressed={chosen}
        onClick={onChoose}
        className={clsx(
          "mt-1 w-full rounded-xl border px-3 py-2 text-caption font-semibold transition-colors duration-200",
          chosen
            ? "border-purple bg-purple text-paper"
            : "border-line text-navy hover:bg-lilac hover:underline",
        )}
      >
        {chosen ? "Your priority" : "Prioritise this measure"}
      </button>

      {revealed ? (
        <div className="mt-3 space-y-2 border-t border-line pt-3">
          <dl className="space-y-1.5">
            {measure.criteria.map((c) => (
              <div key={c.key} className="flex flex-wrap items-baseline gap-2">
                <dt className="w-40 shrink-0 text-caption font-semibold text-ink">
                  {c.label}
                </dt>
                <dd className="flex flex-1 flex-wrap items-baseline gap-2">
                  <span
                    className={clsx(
                      "rounded-md border px-1.5 py-0.5 text-[11px] font-semibold",
                      RATING_CLASS[c.rating],
                    )}
                  >
                    {RATING_LABEL[c.rating]}
                  </span>
                  <span className="flex-1 text-caption text-ash">{c.note}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-caption text-ink">
            <span className="font-semibold">Verdict: </span>
            {measure.verdict}
          </p>
          <p className="text-caption text-ash">
            <span className="font-semibold">Would be right when: </span>
            {measure.whenRight}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function DataFormMeasures() {
  const [chosen, setChosen] = useState<string | null>(null);
  const markVisited = useProgress((s) => s.markVisited);
  const addXp = useProgress((s) => s.addXp);
  const visited = useProgress((s) => s.visited.hotspots);
  const doneId = scopedId("mediprint", "task2");

  const choose = (id: string) => {
    setChosen(id);
    if (!visited.includes(doneId)) {
      addXp(15);
      markVisited("hotspots", doneId);
    }
  };

  const revealed = chosen !== null;

  return (
    <section
      aria-labelledby="task2-title"
      className="mx-auto w-full max-w-4xl card p-5 md:p-6"
    >
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        {TASK2.number}
      </p>
      <h2 id="task2-title" className="mb-2 text-h2 text-ink">
        {TASK2.title}
      </h2>
      <p className="mb-4 text-body text-ash">{TASK2.lead}</p>

      {/* General conditions */}
      <h3 className="mb-2 text-h3 text-ink">{TASK2.conditionsHeading}</h3>
      <ul className="mb-5 flex flex-wrap gap-2">
        {TASK2.conditions.map((c) => (
          <li
            key={c}
            className="rounded-full bg-lilac px-3 py-1 text-caption text-navy"
          >
            {c}
          </li>
        ))}
      </ul>

      {/* Work assignment */}
      <h3 className="mb-2 text-h3 text-ink">{TASK2.assignmentHeading}</h3>
      <ol className="mb-5 list-decimal space-y-1 pl-5">
        {TASK2.assignment.map((step) => (
          <li key={step} className="text-body text-ink">
            {step}
          </li>
        ))}
      </ol>

      <p className="mb-3 rounded-xl border-l-4 border-purple bg-lilac/60 p-3 text-body text-navy">
        Form your own assessment of all three first. Then commit to one priority —
        the comparison and the trade-offs open once you do.
      </p>

      {/* The three measures */}
      <div className="space-y-3">
        {TASK2.measures.map((m) => (
          <MeasureCard
            key={m.id}
            measure={m}
            chosen={chosen === m.id}
            revealed={revealed}
            onChoose={() => choose(m.id)}
          />
        ))}
      </div>

      {/* Revealed after a choice */}
      {revealed ? (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-2 text-h3 text-ink">How the three compare at a glance</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-caption">
                <thead>
                  <tr>
                    <th className="p-1 text-left" />
                    {TASK2.measures[0].criteria.map((c) => (
                      <th key={c.key} className="p-1 text-center font-semibold text-ash">
                        {SHORT[c.key] ?? c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TASK2.measures.map((m) => (
                    <tr key={m.id}>
                      <td className="p-1 pr-2 font-semibold text-ink">{m.letter}</td>
                      {m.criteria.map((c) => (
                        <td key={c.key} className="p-1">
                          <span
                            title={`${m.letter} · ${c.label}: ${RATING_LABEL[c.rating]} — ${c.note}`}
                            aria-label={`Measure ${m.letter}, ${c.label}: ${RATING_LABEL[c.rating]}`}
                            className={clsx(
                              "block h-5 min-w-[36px] rounded",
                              CELL[c.rating],
                            )}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-caption text-ash">
              <span className="flex items-center gap-1">
                <span className="inline-block h-3 w-3 rounded bg-good" /> Strong
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-3 w-3 rounded bg-warn" /> Mixed
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-3 w-3 rounded bg-danger" /> Weak
              </span>
              <span className="text-ash">
                B is mostly green, A carries the reds — that pattern is the decision.
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-1 text-h3 text-ink">{TASK2.guidanceHeading}</h3>
            <p className="text-body text-ash">{TASK2.guidance}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-line p-4">
              <h3 className="mb-2 text-h3 text-ink">{TASK2.tradeoffsHeading}</h3>
              <ul className="list-disc space-y-1 pl-5">
                {TASK2.tradeoffs.map((t) => (
                  <li key={t} className="text-caption text-ash">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-4">
              <h3 className="mb-2 text-h3 text-ink">{TASK2.helpfulInfoHeading}</h3>
              <ul className="list-disc space-y-1 pl-5">
                {TASK2.helpfulInfo.map((t) => (
                  <li key={t} className="text-caption text-ash">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-line p-4">
              <h3 className="mb-1 text-h3 text-ink">{TASK2.noteHeading}</h3>
              <p className="text-body text-ash">{TASK2.note}</p>
            </div>
            <div className="rounded-2xl border border-line p-4">
              <h3 className="mb-1 text-h3 text-ink">{TASK2.objectiveHeading}</h3>
              <p className="text-body text-ash">{TASK2.objective}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
