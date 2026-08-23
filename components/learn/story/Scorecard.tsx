"use client";

import clsx from "clsx";
import { CRITERIA, DECISIVE, Q2, SCORECARD } from "@/data/story";

const TONE = {
  "hard-to-defend": "border-danger bg-danger/10",
  defensible: "border-warn bg-warn/10",
  strongest: "border-good bg-good/10",
} as const;

const LABEL = {
  "hard-to-defend": "Hard to defend",
  defensible: "Defensible",
  strongest: "Strongest here",
} as const;

function Cell({ value }: { value: 1 | 2 | 3 }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${value} of 3`}>
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className={clsx(
            "h-1.5 w-3 rounded-full",
            step > value ? "bg-line" : value === 1 ? "bg-danger" : value === 2 ? "bg-warn" : "bg-good",
          )}
        />
      ))}
    </span>
  );
}

/**
 * The whole grid, all three options, so the chosen one is judged in company
 * rather than in isolation. Every score carries the fact behind it.
 */
export function Scorecard({
  chosenId,
  knewDeadline,
}: {
  chosenId: string;
  knewDeadline: boolean;
}) {
  const mine = SCORECARD.find((o) => o.id === chosenId);
  if (!mine) return null;

  const title = (id: string) =>
    Q2.initiatives.find((i) => i.id === id)?.letter ?? id;

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <caption className="p-2 text-caption text-ash">
            Every option on every criterion. Your choice is column{" "}
            <strong className="text-navy">{title(chosenId)}</strong>.
          </caption>
          <thead>
            <tr className="border-y border-line bg-lilac/60">
              <th scope="col" className="p-2 text-caption uppercase tracking-wide text-navy">
                Criterion
              </th>
              {SCORECARD.map((o) => (
                <th
                  key={o.id}
                  scope="col"
                  className={clsx(
                    "p-2 text-caption uppercase tracking-wide",
                    o.id === chosenId ? "bg-purple/15 text-purple" : "text-navy",
                  )}
                >
                  {title(o.id)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CRITERIA.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-b-0">
                <th scope="row" className="p-2 align-top">
                  <span className="block text-body font-semibold text-ink">{c.name}</span>
                  {c.id === DECISIVE.criterion ? (
                    <span className="text-caption font-semibold text-purple">
                      decisive here
                    </span>
                  ) : null}
                </th>
                {SCORECARD.map((o) => (
                  <td
                    key={o.id}
                    className={clsx("p-2 align-top", o.id === chosenId && "bg-purple/10")}
                  >
                    <Cell value={o.scores[c.id].value} />
                    {o.id === chosenId ? (
                      <span className="mt-1 block text-caption text-ink">
                        {o.scores[c.id].why}
                      </span>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-line p-3">
        <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
          {DECISIVE.title}
        </p>
        <p className="text-body text-ink">{DECISIVE.text}</p>
        {!knewDeadline ? (
          <p className="mt-2 rounded-lg border-l-4 border-warn bg-warn/10 p-2 text-caption text-ink">
            {DECISIVE.ifBlind}
          </p>
        ) : null}
      </div>

      <div className={clsx("rounded-xl border-l-4 p-3", TONE[mine.verdict])}>
        <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
          {LABEL[mine.verdict]}
        </p>
        <p className="mb-2 text-h3 text-ink">{mine.headline}</p>
        <ul className="mb-3 list-disc space-y-1 pl-5">
          {mine.reasons.map((r) => (
            <li key={r} className="text-body text-ink">
              {r}
            </li>
          ))}
        </ul>
        <p className="rounded-lg bg-paper/70 p-2 text-caption text-navy">
          <span className="font-semibold">When this becomes the right answer instead: </span>
          {mine.rightWhen}
        </p>
      </div>
    </div>
  );
}
