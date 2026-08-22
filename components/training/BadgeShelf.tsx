"use client";

import clsx from "clsx";
import { CATEGORIES, type CategoryCode } from "@/data/categories";
import { BADGE_THRESHOLD } from "@/data/training";

export function BadgeShelf({
  correctByCategory,
}: {
  correctByCategory: Record<CategoryCode, number>;
}) {
  return (
    <div className="card p-4">
      <h2 className="mb-1 text-h3 text-ink">Category badges</h2>
      <p className="mb-3 text-caption text-ash">
        {BADGE_THRESHOLD} correct in a category lights its badge.
      </p>

      <ul className="space-y-2">
        {CATEGORIES.map((category) => {
          const count = correctByCategory[category.code] ?? 0;
          const earned = count >= BADGE_THRESHOLD;

          return (
            <li
              key={category.code}
              className={clsx(
                "flex items-center gap-3 rounded-xl border p-2 transition-colors duration-200",
                earned ? "border-line bg-paper" : "border-dashed border-line bg-lilac/30",
              )}
            >
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
                  {Math.min(count, BADGE_THRESHOLD)} / {BADGE_THRESHOLD}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
