"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W11 } from "@/data/learn";
import { FieldNote } from "./FieldNote";
import { WidgetShell } from "./WidgetShell";
import { useWidget } from "./useWidget";

// PUE = total facility power / IT power. Expressed here as the overhead the
// building adds on top of the computing, so it stays a ratio throughout.
const START_OVERHEAD = 50;

export function W11Pue() {
  const [overhead, setOverhead] = useState(START_OVERHEAD);
  const [moved, setMoved] = useState(false);
  const { complete } = useWidget(W11.id, W11.xp);

  useEffect(() => {
    if (moved) complete();
  }, [moved, complete]);

  const pue = 1 + overhead / 100;
  const perTen = (overhead / 10).toFixed(1);
  const usefulShare = Math.round((1 / pue) * 100);

  return (
    <WidgetShell meta={W11} progress={moved ? 1 : 0} done={moved} closing={W11.closing}>
      <div className="rounded-xl border border-line p-4">
        <label htmlFor="w11-range" className="text-body font-semibold text-ink">
          Facility overhead on top of the computing load
        </label>

        <div className="mb-1 mt-2 flex justify-between text-caption text-ash">
          <span>No overhead (PUE 1.0)</span>
          <span>Doubles it (PUE 2.0)</span>
        </div>

        <input
          id="w11-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={overhead}
          onChange={(e) => {
            setOverhead(Number(e.target.value));
            setMoved(true);
          }}
          aria-valuetext={`PUE ${pue.toFixed(2)}`}
          className="w-full accent-purple"
        />

        <div className="mt-4 grid gap-3 md:grid-cols-2" aria-live="polite">
          <div className="rounded-xl border border-line p-3">
            <p className="text-caption font-semibold uppercase tracking-wide text-ash">
              Resulting PUE
            </p>
            <p className="mt-1 text-h1 tabular-nums text-ink">{pue.toFixed(2)}</p>
            <p className="text-body text-ash">
              For every 10 units of power doing computing work, {perTen} go to cooling,
              power conversion and the building.
            </p>
          </div>

          <div className="rounded-xl border border-line p-3">
            <p className="text-caption font-semibold uppercase tracking-wide text-ash">
              Share reaching the computing
            </p>
            <p className="mt-1 text-h1 tabular-nums text-ink">{usefulShare}%</p>
            <p className="text-body text-ash">
              The rest is the cost of keeping the room able to host it.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-ash">
            German Energy Efficiency Act
          </p>

          {W11.thresholds.map((threshold) => {
            const clears = pue <= threshold.limit;
            return (
              <div
                key={threshold.id}
                className={clsx(
                  "flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-l-4 p-3",
                  clears ? "border-good bg-good/10" : "border-danger bg-danger/10",
                )}
              >
                <span
                  className={clsx(
                    "shrink-0 rounded-full px-2 py-0.5 text-caption font-semibold text-paper",
                    clears ? "bg-good" : "bg-danger",
                  )}
                >
                  {clears ? "Clears" : "Misses"}
                </span>
                <span className="text-body font-semibold text-ink">{threshold.label}</span>
                <span className="w-full text-caption text-ash">{threshold.applies}</span>
              </div>
            );
          })}

          <p className="rounded-xl bg-lilac/60 p-3 text-caption text-navy">
            {W11.draftNote}
          </p>
        </div>
      </div>

      {moved ? <FieldNote note={W11.note} /> : null}
    </WidgetShell>
  );
}
