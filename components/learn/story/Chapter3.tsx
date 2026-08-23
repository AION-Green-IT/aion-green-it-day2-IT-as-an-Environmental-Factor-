"use client";

import clsx from "clsx";
import { Q3 } from "@/data/story";

export type DialPositions = Record<string, number>;

export const bandOf = (value: number) => (value < 34 ? 0 : value < 67 ? 1 : 2);

/**
 * The trade-off dials, made concrete: every position has a named person on the
 * losing end and a sentence they will say in December.
 */
export function Chapter3({
  positions,
  onMove,
}: {
  positions: DialPositions;
  onMove: (id: string, value: number) => void;
}) {
  return (
    <>
      <p className="mb-4 text-body text-ink">{Q3.brief}</p>

      <div className="space-y-3">
        {Q3.dials.map((dial) => {
          const value = positions[dial.id] ?? 50;
          const band = dial.bands[bandOf(value)];

          return (
            <div key={dial.id} className="rounded-xl border border-line p-4">
              <h5 className="mb-3 text-h3 text-ink">{dial.question}</h5>

              <div className="mb-2 grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg bg-lilac/50 p-2">
                  <p className="text-caption font-semibold text-navy">{dial.left.who}</p>
                  <p className="text-caption text-ash">{dial.left.wants}</p>
                </div>
                <div className="rounded-lg bg-lilac/50 p-2 sm:text-right">
                  <p className="text-caption font-semibold text-navy">{dial.right.who}</p>
                  <p className="text-caption text-ash">{dial.right.wants}</p>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => onMove(dial.id, Number(e.target.value))}
                aria-label={dial.question}
                aria-valuetext={band.readout}
                className="w-full accent-purple"
              />

              <p className="mt-2 text-body text-ink" aria-live="polite">
                {band.readout}
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg border-l-4 border-good bg-good/10 p-2">
                    <p className="text-caption font-semibold uppercase tracking-wide text-good">
                      Backs you
                    </p>
                    <p className="text-body text-ink">{band.backs}</p>
                  </div>
                <div className="rounded-lg border-l-4 border-warn bg-warn/10 p-2">
                  <p className="text-caption font-semibold uppercase tracking-wide text-warn">
                    Objects — {band.objects}
                  </p>
                  <p className="text-body text-ink">{band.line}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 rounded-xl bg-lilac/60 p-3 text-body font-semibold text-navy">
        {Q3.closing}
      </p>
    </>
  );
}
