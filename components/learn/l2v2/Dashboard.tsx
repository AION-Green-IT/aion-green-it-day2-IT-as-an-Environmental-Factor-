"use client";

import clsx from "clsx";
import { METRICS, type MetricId } from "@/data/l2v2";

const clamp = (n: number) => Math.max(0, Math.min(100, n));

/** Three dials, always visible, so a choice is made with the cost in sight. */
export function Dashboard({
  values,
  pending,
}: {
  values: Record<MetricId, number>;
  /** Deltas previewed while an option is hovered or just applied. */
  pending?: Record<MetricId, number> | null;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {METRICS.map((metric) => {
        const value = clamp(values[metric.id]);
        const delta = pending?.[metric.id] ?? 0;

        return (
          <div key={metric.id} className="rounded-xl border border-line p-3">
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="text-body font-semibold text-ink">
                <span aria-hidden="true">{metric.icon}</span> {metric.name}
              </span>
              <span className="flex items-baseline gap-1">
                <span className="text-readout tabular-nums text-ink">{value}</span>
                {delta !== 0 ? (
                  <span
                    className={clsx(
                      "text-caption font-semibold tabular-nums",
                      delta > 0 ? "text-good" : "text-danger",
                    )}
                  >
                    {delta > 0 ? `+${delta}` : delta}
                  </span>
                ) : null}
              </span>
            </div>

            <div
              className="h-2 w-full overflow-hidden rounded-full bg-lilac"
              role="progressbar"
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={metric.name}
            >
              <div
                className={clsx(
                  "h-full rounded-full transition-all duration-500",
                  value >= 55 ? "bg-good" : value >= 35 ? "bg-warn" : "bg-danger",
                )}
                style={{ width: `${value}%` }}
              />
            </div>

            <p className="mt-1 text-caption text-ash">{metric.meaning}</p>
          </div>
        );
      })}
    </div>
  );
}
