"use client";

import clsx from "clsx";
import { CATEGORIES, type CategoryCode } from "@/data/categories";
import { BADGE_THRESHOLD, CARDS } from "@/data/training";

type Props = {
  /** All-time counts from the store, which is what lights a badge. */
  correctByCategory: Record<CategoryCode, number>;
  /** This round only, keyed by card id. */
  answers: Record<string, CategoryCode>;
};

/**
 * One line per category saying what to do next. Card numbers were tried here
 * and removed: knowing a card is number 6 tells a learner nothing, and the
 * end-of-round summary already lists missed cards by their actual text.
 */
function nextStep({
  earned,
  matched,
  missed,
  ahead,
  name,
}: {
  earned: boolean;
  matched: number;
  missed: number;
  ahead: number;
  name: string;
}): string {
  if (earned && missed === 0 && ahead === 0) {
    return "All three matched. Nothing to do here.";
  }
  if (missed > 0) {
    return `${missed} of these went into a different category. Finish the round — the summary at the end lists them to re-read.`;
  }
  if (ahead > 0) {
    return `${ahead} ${name} card${ahead === 1 ? "" : "s"} still ahead of you. Keep going through the deck.`;
  }
  return "Answered, but not all matched. Run the stack again to light this one.";
}

export function BadgeShelf({ correctByCategory, answers }: Props) {
  return (
    <div className="card p-4">
      <h2 className="mb-1 text-h3 text-ink">Category badges</h2>
      <p className="mb-3 text-caption text-ash">
        The deck holds {BADGE_THRESHOLD} cards per category. A badge lights when all{" "}
        {BADGE_THRESHOLD} of them matched.
      </p>

      <ul className="space-y-2">
        {CATEGORIES.map((category) => {
          const allTime = correctByCategory[category.code] ?? 0;
          const earned = allTime >= BADGE_THRESHOLD;

          const cards = CARDS.filter((c) => c.correctCategory === category.code);
          const matched = cards.filter((c) => answers[c.id] === category.code).length;
          const missed = cards.filter(
            (c) => answers[c.id] && answers[c.id] !== category.code,
          ).length;
          const ahead = cards.length - matched - missed;

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
                    {Math.min(allTime, BADGE_THRESHOLD)} of {BADGE_THRESHOLD}
                    {earned ? " · earned" : ""}
                  </span>
                </span>
              </div>

              <p
                className={clsx(
                  "mt-2 border-t border-line pt-2 text-caption",
                  missed > 0 ? "text-warn" : earned ? "text-good" : "text-ash",
                )}
              >
                {nextStep({ earned, matched, missed, ahead, name: category.name })}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
