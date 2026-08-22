"use client";

import { useEffect, useState } from "react";
import { W4 } from "@/data/learn";
import { FieldNote } from "./FieldNote";
import { WidgetShell } from "./WidgetShell";
import { useWidget } from "./useWidget";

const START = 50;

export function W4Dials() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(W4.dials.map((d) => [d.id, START])),
  );
  const [moved, setMoved] = useState<string[]>([]);
  const { complete } = useWidget(W4.id, W4.xp);

  const done = moved.length === W4.dials.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const set = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setMoved((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <WidgetShell
      meta={W4}
      progress={moved.length / W4.dials.length}
      done={done}
      closing={W4.closing}
    >
      <div className="space-y-4">
        {W4.dials.map((dial) => {
          const value = values[dial.id];
          const band = value < 34 ? 0 : value < 67 ? 1 : 2;

          return (
            <div key={dial.id} className="rounded-xl border border-line p-4">
              <h4 className="mb-3 text-h3 text-ink">{dial.title}</h4>

              <div className="mb-1 flex justify-between text-caption text-ash">
                <span>{dial.leftLabel}</span>
                <span>{dial.rightLabel}</span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={value}
                onChange={(e) => set(dial.id, Number(e.target.value))}
                aria-label={dial.title}
                aria-valuetext={dial.readouts[band]}
                className="w-full accent-purple"
              />

              <p className="mt-2 text-readout tabular-nums text-purple">{value}%</p>
              <p className="mt-1 text-body text-ink" aria-live="polite">
                {dial.readouts[band]}
              </p>

              <p className="mt-2 rounded-xl bg-lilac/60 p-3 text-caption text-navy">
                <span className="font-semibold">The price on both ends: </span>
                {dial.price}
              </p>

              {moved.includes(dial.id) && dial.note ? <FieldNote note={dial.note} /> : null}
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
}
