"use client";

import { useState } from "react";
import clsx from "clsx";
import { CATEGORIES, type CategoryCode } from "@/data/categories";
import { BADGE_THRESHOLD, CARDS } from "@/data/training";

type Props = {
  /** All-time counts from the store, which is what lights a badge. */
  correctByCategory: Record<CategoryCode, number>;
  /** This round only, keyed by card id. */
  answers: Record<string, CategoryCode>;
  onJump: (index: number) => void;
};

function JumpChip({
  index,
  tone,
  onJump,
}: {
  index: number;
  tone: "warn" | "neutral";
  onJump: (i: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onJump(index)}
      className={clsx(
        "rounded-lg border px-2 py-0.5 text-caption font-semibold transition-colors duration-200",
        tone === "warn"
          ? "border-warn text-warn hover:bg-warn hover:text-paper"
          : "border-line text-navy hover:border-purple hover:bg-purple hover:text-paper",
      )}
    >
      Card {index + 1}
    </button>
  );
}

/**
 * The deck holds exactly BADGE_THRESHOLD cards per category, so a badge only
 * lights when every card of that category matched. That makes the shelf a
 * diagnostic: it names the category where instinct and framework disagree.
 *
 * Cards not yet reached are named only behind an explicit toggle, because
 * naming them tells you a card's category before you have committed to one.
 * The toggle says so, rather than hiding the trade-off.
 */
export function BadgeShelf({ correctByCategory, answers, onJump }: Props) {
  const [revealAhead, setRevealAhead] = useState(false);

  return (
    <div className="card p-4">
      <h2 className="mb-1 text-h3 text-ink">Category badges</h2>
      <p className="mb-3 text-caption text-ash">
        The deck holds exactly {BADGE_THRESHOLD} cards per category, so a badge lights
        only when all {BADGE_THRESHOLD} of that category matched. A badge that will not
        light is naming the category to re-read.
      </p>

      <ul className="space-y-2">
        {CATEGORIES.map((category) => {
          const allTime = correctByCategory[category.code] ?? 0;
          const earned = allTime >= BADGE_THRESHOLD;
          const shortBy = Math.max(0, BADGE_THRESHOLD - allTime);

          const cards = CARDS.filter((c) => c.correctCategory === category.code);
          const matched = cards.filter((c) => answers[c.id] === category.code);
          const missed = cards.filter(
            (c) => answers[c.id] && answers[c.id] !== category.code,
          );
          const ahead = cards.filter((c) => !answers[c.id]);

          return (
            <li
              key={category.code}
              className={clsx(
                "rounded-xl border p-3 transition-colors duration-200",
                earned ? "border-line bg-paper" : "border-dashed border-line bg-lilac/30",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-caption font-semibold",
                    earned ? "text-paper" : "text-ash",
                  )}
                  style={{
                    backgroundColor: earned ? category.hex : "transparent",
                    border: earned ? "none" : "2px dashed currentColor",
                  }}
                >
                  {category.code}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={clsx(
                      "block text-body",
                      earned ? "font-semibold text-ink" : "text-ash",
                    )}
                  >
                    {category.name}
                  </span>
                  <span className="block text-caption text-ash">
                    Badge: {Math.min(allTime, BADGE_THRESHOLD)} / {BADGE_THRESHOLD}
                    {earned
                      ? " · earned"
                      : ` · ${shortBy} more correct answer${shortBy === 1 ? "" : "s"} needed`}
                  </span>
                </span>
              </div>

              <div className="mt-2 border-t border-line pt-2">
                <p className="text-caption text-ash">
                  <span className="font-semibold text-navy">This round: </span>
                  <span className="text-good">{matched.length} matched</span>
                  {", "}
                  <span className={missed.length > 0 ? "text-warn" : undefined}>
                    {missed.length} missed
                  </span>
                  {", "}
                  {ahead.length} not answered yet
                </p>

                {missed.length > 0 ? (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-caption text-ash">
                      Reopen what you missed:
                    </span>
                    {missed.map((c) => (
                      <JumpChip
                        key={c.id}
                        index={CARDS.indexOf(c)}
                        tone="warn"
                        onJump={onJump}
                      />
                    ))}
                  </div>
                ) : null}

                {ahead.length > 0 && revealAhead ? (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-caption text-ash">Still to answer:</span>
                    {ahead.map((c) => (
                      <JumpChip
                        key={c.id}
                        index={CARDS.indexOf(c)}
                        tone="neutral"
                        onJump={onJump}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        aria-pressed={revealAhead}
        onClick={() => setRevealAhead(!revealAhead)}
        className="mt-3 w-full rounded-xl border border-line px-3 py-2 text-caption font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
      >
        {revealAhead
          ? "Hide the cards you have not answered"
          : "Show me which cards are still to answer"}
      </button>
      <p className="mt-1 text-caption text-ash">
        {revealAhead
          ? "These card numbers now show their category before you answer them."
          : "This names them, which tells you their category before you answer them."}
      </p>
    </div>
  );
}
