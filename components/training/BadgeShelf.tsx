"use client";

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

/**
 * The deck holds exactly BADGE_THRESHOLD cards per category, so a badge only
 * lights when every card of that category matched. That makes the shelf a
 * diagnostic: it names the category your instinct is off on.
 *
 * Cards not yet answered are counted but never identified — naming them would
 * reveal their category before the learner has committed to one.
 */
export function BadgeShelf({ correctByCategory, answers, onJump }: Props) {
  return (
    <div className="card p-4">
      <h2 className="mb-1 text-h3 text-ink">Category badges</h2>
      <p className="mb-3 text-caption text-ash">
        The deck holds exactly {BADGE_THRESHOLD} cards per category, so a badge lights
        only when all {BADGE_THRESHOLD} of that category matched.
      </p>

      <ul className="space-y-2">
        {CATEGORIES.map((category) => {
          const allTime = correctByCategory[category.code] ?? 0;
          const earned = allTime >= BADGE_THRESHOLD;

          const cards = CARDS.filter((c) => c.correctCategory === category.code);
          const matched = cards.filter((c) => answers[c.id] === category.code);
          const missed = cards.filter(
            (c) => answers[c.id] && answers[c.id] !== category.code,
          );
          const open = cards.length - matched.length - missed.length;

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
                    {Math.min(allTime, BADGE_THRESHOLD)} / {BADGE_THRESHOLD}
                    {earned ? " · badge earned" : ""}
                  </span>
                </span>
              </div>

              {/* What is standing between you and this badge, this round. */}
              <p className="mt-2 border-t border-line pt-2 text-caption text-ash">
                {matched.length > 0 ? (
                  <span className="text-good">{matched.length} matched</span>
                ) : null}
                {matched.length > 0 && (missed.length > 0 || open > 0) ? " · " : null}
                {missed.length > 0 ? (
                  <span className="text-warn">{missed.length} missed</span>
                ) : null}
                {missed.length > 0 && open > 0 ? " · " : null}
                {open > 0 ? `${open} still somewhere in the deck` : null}
                {matched.length === 0 && missed.length === 0 && open === 0
                  ? "Nothing left in this round."
                  : null}
              </p>

              {missed.length > 0 ? (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-caption text-ash">Reopen:</span>
                  {missed.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onJump(CARDS.indexOf(c))}
                      className="rounded-lg border border-warn px-2 py-0.5 text-caption font-semibold text-warn transition-colors duration-200 hover:bg-warn hover:text-paper"
                    >
                      Card {CARDS.indexOf(c) + 1}
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
