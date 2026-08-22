"use client";

import clsx from "clsx";
import { CARDS } from "@/data/training";

export type CardResult = "correct" | "missed";

type Props = {
  results: Record<string, CardResult>;
  currentIndex: number;
  onJump: (index: number) => void;
};

/**
 * Where you are and what is left, at a glance. Without this the card stack
 * gives no sense of a round having a shape.
 */
export function RoundTrail({ results, currentIndex, onJump }: Props) {
  const answered = Object.keys(results).length;
  const remaining = CARDS.length - answered;

  return (
    <div className="card p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-h3 text-ink">This round</h2>
        <p className="text-caption text-ash">
          {remaining === 0
            ? "All fifteen answered."
            : `${remaining} still to answer. Select any number to jump.`}
        </p>
      </div>

      <ol className="flex flex-wrap gap-2">
        {CARDS.map((card, index) => {
          const result = results[card.id];
          const isCurrent = index === currentIndex;

          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => onJump(index)}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Card ${index + 1}: ${
                  result === "correct"
                    ? "answered, matched"
                    : result === "missed"
                      ? "answered, did not match"
                      : "not answered yet"
                }`}
                className={clsx(
                  "flex h-8 w-8 items-center justify-center rounded-lg border-2 text-caption font-semibold tabular-nums transition-colors duration-200",
                  isCurrent && "ring-2 ring-purple ring-offset-2",
                  result === "correct"
                    ? "border-good bg-good text-paper"
                    : result === "missed"
                      ? "border-warn bg-warn text-paper"
                      : "border-dashed border-line bg-paper text-ash hover:border-purple hover:text-purple",
                )}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ash">
        <Key className="border-dashed border-line bg-paper" label="Not answered yet" />
        <Key className="border-good bg-good" label="Matched the framework" />
        <Key className="border-warn bg-warn" label="Worth a second look" />
      </div>
    </div>
  );
}

function Key({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden="true" className={clsx("h-3 w-3 rounded border-2", className)} />
      {label}
    </span>
  );
}
