"use client";

import clsx from "clsx";

const CHAPTERS = [
  { n: 1, q: "Q1", title: "Where to look" },
  { n: 2, q: "Q2", title: "One thing" },
  { n: 3, q: "Q3", title: "The room disagrees" },
  { n: 4, q: "Q4", title: "The review" },
] as const;

/** Page-turner rail: you can always go back to a chapter you have reached. */
export function ChapterRail({
  page,
  unlocked,
  built,
  onJump,
}: {
  page: number;
  unlocked: number;
  built: number;
  onJump: (n: number) => void;
}) {
  return (
    <nav aria-label="Chapters">
      <ol className="flex items-stretch gap-1">
        {CHAPTERS.map((c) => {
          const reachable = c.n <= unlocked;
          const exists = c.n <= built;
          const active = c.n === page;

          return (
            <li key={c.n} className="min-w-0 flex-1">
              <button
                type="button"
                disabled={!reachable || !exists}
                aria-current={active ? "step" : undefined}
                onClick={() => onJump(c.n)}
                className={clsx(
                  "w-full rounded-lg px-1 pb-1 pt-2 text-left transition-colors duration-200",
                  reachable && exists && !active && "hover:bg-lilac",
                  !exists && "cursor-not-allowed",
                )}
              >
                <span
                  className={clsx(
                    "block h-1.5 rounded-full",
                    active
                      ? "bg-purple"
                      : c.n < page
                        ? "bg-good"
                        : exists
                          ? "bg-line"
                          : "bg-line/50",
                  )}
                />
                <span
                  className={clsx(
                    "mt-1.5 block truncate text-caption",
                    active ? "font-semibold text-purple" : "text-ash",
                  )}
                >
                  <span className="font-semibold">{c.q}</span>
                  <span className="hidden sm:inline"> · {c.title}</span>
                  {!exists ? <span className="hidden md:inline"> (soon)</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
