import clsx from "clsx";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"] as const;

const TITLES: Record<string, string> = {
  Q1: "Where to look",
  Q2: "One thing",
  Q3: "The room disagrees",
  Q4: "The review",
};

/** Where you are in the year, at a glance. */
export function YearTimeline({
  current,
  built = 2,
}: {
  current: 1 | 2 | 3 | 4;
  built?: number;
}) {
  return (
    <ol className="flex items-stretch gap-1" aria-label="Progress through the year">
      {QUARTERS.map((q, i) => {
        const index = i + 1;
        const state =
          index < current ? "done" : index === current ? "now" : index <= built ? "next" : "locked";

        return (
          <li key={q} className="min-w-0 flex-1">
            <div
              aria-current={state === "now" ? "step" : undefined}
              className={clsx(
                "h-1.5 rounded-full",
                state === "done" && "bg-good",
                state === "now" && "bg-purple",
                state === "next" && "bg-line",
                state === "locked" && "bg-line/50",
              )}
            />
            <p
              className={clsx(
                "mt-1.5 truncate text-caption",
                state === "now" ? "font-semibold text-purple" : "text-ash",
              )}
            >
              <span className="font-semibold">{q}</span>
              <span className="hidden sm:inline"> · {TITLES[q]}</span>
              {state === "locked" ? (
                <span className="hidden md:inline"> (not built)</span>
              ) : null}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
