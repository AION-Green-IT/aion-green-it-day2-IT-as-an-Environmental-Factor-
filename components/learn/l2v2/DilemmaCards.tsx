"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { L2V2, METRICS, type MetricId, type Option } from "@/data/l2v2";
import { FieldNote } from "../FieldNote";
import { useWidget } from "../useWidget";
import { Dashboard } from "./Dashboard";

const START = Object.fromEntries(METRICS.map((m) => [m.id, m.start])) as Record<
  MetricId,
  number
>;

function DeltaChips({ deltas }: { deltas: Record<MetricId, number> }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {METRICS.map((m) => {
        const d = deltas[m.id];
        return (
          <span
            key={m.id}
            className={clsx(
              "rounded-full px-2 py-0.5 text-caption font-semibold tabular-nums",
              d > 0 ? "bg-good/15 text-good" : d < 0 ? "bg-danger/15 text-danger" : "bg-lilac text-ash",
            )}
          >
            <span aria-hidden="true">{m.icon}</span> {d > 0 ? `+${d}` : d}
          </span>
        );
      })}
    </div>
  );
}

export function DilemmaCards() {
  const [answers, setAnswers] = useState<Record<string, "a" | "b">>({});
  const [preview, setPreview] = useState<Record<MetricId, number> | null>(null);
  const { complete } = useWidget(L2V2.id, L2V2.xp);

  const done = Object.keys(answers).length === L2V2.tickets.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  // Metrics are just the start plus everything chosen so far.
  const values = L2V2.tickets.reduce(
    (acc, ticket) => {
      const pick = answers[ticket.id];
      if (!pick) return acc;
      const option = ticket.options.find((o) => o.id === pick);
      if (!option) return acc;
      for (const m of METRICS) acc[m.id] += option.deltas[m.id];
      return acc;
    },
    { ...START },
  );

  const profile = L2V2.profiles.find((p) => p.test(values)) ?? L2V2.profiles.at(-1);

  return (
    <section id={L2V2.id} aria-labelledby="l2v2-title" className="card p-5">
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        A shorter alternative · dilemma cards
      </p>
      <h3 id="l2v2-title" className="mb-1 text-h3 text-ink">
        {L2V2.company} — three open tickets
      </h3>
      <p className="mb-3 text-caption text-ash">
        <span className="font-semibold text-purple">Objective: </span>
        {L2V2.objective}
      </p>

      {L2V2.hook.map((para) => (
        <p key={para} className="mb-2 text-body text-ink">
          {para}
        </p>
      ))}

      <div className="my-4">
        <Dashboard values={values} pending={preview} />
      </div>

      <ol className="space-y-3">
        {L2V2.tickets.map((ticket, index) => {
          const picked = answers[ticket.id];

          return (
            <li key={ticket.id} className="rounded-2xl border border-line p-4">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-caption font-semibold uppercase tracking-wide text-ash">
                  Ticket {index + 1} of {L2V2.tickets.length} · from {ticket.from}
                </p>
                <p className="text-caption text-ash">{ticket.role}</p>
              </div>

              <h4 className="mb-2 text-h3 text-ink">{ticket.subject}</h4>

              <blockquote className="mb-2 rounded-xl border-l-4 border-navy bg-lilac/40 p-3 text-body text-ink">
                “{ticket.complaint}”
              </blockquote>

              <p className="mb-3 text-caption text-navy">
                <span className="font-semibold">The tension: </span>
                {ticket.tension}
              </p>

              <div className="grid gap-2 md:grid-cols-2">
                {ticket.options.map((option: Option) => {
                  const isPicked = picked === option.id;
                  const dimmed = Boolean(picked) && !isPicked;

                  return (
                    <div
                      key={option.id}
                      className={clsx(
                        "flex flex-col rounded-xl border p-3 transition-colors duration-200",
                        isPicked
                          ? "border-purple bg-purple/10"
                          : dimmed
                            ? "border-line bg-paper opacity-60"
                            : "border-line bg-paper",
                      )}
                    >
                      <button
                        type="button"
                        disabled={Boolean(picked)}
                        onMouseEnter={() => !picked && setPreview(option.deltas)}
                        onMouseLeave={() => setPreview(null)}
                        onFocus={() => !picked && setPreview(option.deltas)}
                        onBlur={() => setPreview(null)}
                        onClick={() => {
                          setPreview(null);
                          setAnswers((prev) => ({ ...prev, [ticket.id]: option.id }));
                        }}
                        className={clsx("text-left", picked ? "cursor-default" : "hover:underline")}
                      >
                        <span className="mb-1 flex items-center gap-2">
                          <span
                            className={clsx(
                              "flex h-6 w-6 items-center justify-center rounded-md text-caption font-semibold text-paper",
                              isPicked ? "bg-purple" : "bg-navy",
                            )}
                          >
                            {option.label}
                          </span>
                          <span className="text-body font-semibold text-ink">
                            {option.title}
                          </span>
                        </span>
                        <span className="block text-caption text-ash">{option.body}</span>
                      </button>

                      <p className="mt-2 text-caption text-ash">
                        <span className="font-semibold">Effort: </span>
                        {option.effort}
                      </p>

                      <div className="mt-2">
                        <DeltaChips deltas={option.deltas} />
                      </div>

                      {isPicked ? (
                        <div className="mt-3 space-y-2 border-t border-line pt-3">
                          <p className="text-body text-ink">{option.consequence}</p>
                          <p className="rounded-lg bg-lilac/60 p-2 text-caption text-navy">
                            <span className="font-semibold">Take this with you: </span>
                            {option.principle}
                          </p>
                          {option.note ? <FieldNote note={option.note} /> : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>

      {done && profile ? (
        <div className="mt-4 space-y-3 border-t border-line pt-4">
          <div className="rounded-2xl border-l-4 border-purple bg-lilac/50 p-4">
            <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
              Where you ended up
            </p>
            <h4 className="mb-2 text-h3 text-ink">{profile.title}</h4>
            <p className="text-body text-ink">{profile.text}</p>
          </div>

          <p className="rounded-xl bg-lilac/60 p-3 text-body font-semibold text-navy">
            {L2V2.closing}
          </p>

          <button
            type="button"
            onClick={() => setAnswers({})}
            className="rounded-xl border border-line px-4 py-2 text-body font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
          >
            Clear the queue and try other calls
          </button>
        </div>
      ) : null}
    </section>
  );
}
