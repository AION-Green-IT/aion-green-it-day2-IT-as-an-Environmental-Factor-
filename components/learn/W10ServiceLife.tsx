"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W10 } from "@/data/learn";
import { FieldNote } from "./FieldNote";
import { WidgetShell } from "./WidgetShell";
import { useWidget } from "./useWidget";

// Lifetime footprint = a fixed manufacturing share + a use share that accrues
// per year. Everything is expressed against the three-year baseline, so no
// absolute figure is ever shown.
const EMBODIED = W10.embodiedShare;
const USE_TOTAL_AT_BASELINE = 100 - EMBODIED;
const USE_PER_YEAR = USE_TOTAL_AT_BASELINE / W10.baselineYears;

const perDeviceYear = (years: number) => (EMBODIED + USE_PER_YEAR * years) / years;
const BASELINE = perDeviceYear(W10.baselineYears);

const indexFor = (years: number) => (perDeviceYear(years) / BASELINE) * 100;

export function W10ServiceLife() {
  const [years, setYears] = useState(W10.baselineYears);
  const [moved, setMoved] = useState(false);
  const { complete } = useWidget(W10.id, W10.xp);

  useEffect(() => {
    if (moved) complete();
  }, [moved, complete]);

  const index = Math.round(indexFor(years));
  const change = index - 100;
  const perDecade = (10 / years).toFixed(1);
  const baselinePerDecade = (10 / W10.baselineYears).toFixed(1);
  const band = W10.bands.find((b) => years <= b.upTo) ?? W10.bands[W10.bands.length - 1];

  return (
    <WidgetShell meta={W10} progress={moved ? 1 : 0} done={moved} closing={W10.closing}>
      <div className="rounded-xl border border-line p-4">
        <label htmlFor="w10-range" className="text-body font-semibold text-ink">
          Refresh cycle
        </label>

        <div className="mb-1 mt-2 flex justify-between text-caption text-ash">
          <span>{W10.minYears} years</span>
          <span>{W10.maxYears} years</span>
        </div>

        <input
          id="w10-range"
          type="range"
          min={W10.minYears}
          max={W10.maxYears}
          step={1}
          value={years}
          onChange={(e) => {
            setYears(Number(e.target.value));
            setMoved(true);
          }}
          aria-valuetext={`${years} years, index ${index}`}
          className="w-full accent-purple"
        />

        <p className="mt-2 text-readout tabular-nums text-purple">{years} years</p>

        {/* Comparison bars: baseline against the current setting. */}
        <div className="mt-4 space-y-3" aria-live="polite">
          <Bar label={`${W10.baselineYears}-year cycle (baseline)`} value={100} tone="baseline" />
          <Bar
            label={`${years}-year cycle`}
            value={index}
            tone={index < 100 ? "better" : index > 100 ? "worse" : "baseline"}
          />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Readout
            title="Footprint per device-year"
            value={`${index}`}
            unit={`index · baseline ${W10.baselineYears} years = 100`}
            caption={
              change === 0
                ? "This is the baseline."
                : change < 0
                  ? `${Math.abs(change)}% lower than the three-year cycle.`
                  : `${change}% higher than the three-year cycle.`
            }
          />
          <Readout
            title="Devices bought per seat, per decade"
            value={perDecade}
            unit={`baseline ${baselinePerDecade}`}
            caption="Every device avoided is a manufacturing footprint never spent."
          />
        </div>

        <p className="mt-3 rounded-xl bg-lilac/60 p-3 text-body text-navy">{band.verdict}</p>

        <p className="mt-3 text-caption text-ash">
          Model: {EMBODIED}% of lifetime footprint is fixed at manufacturing, the rest
          accrues in use. Shown as an index, not as absolute figures — this module is
          deliberately pre-metric.
        </p>
      </div>

      {moved ? <FieldNote note={W10.note} /> : null}
    </WidgetShell>
  );
}

function Bar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "baseline" | "better" | "worse";
}) {
  // 140 is the widest the model reaches, at a two-year cycle.
  const width = Math.min(100, (value / 140) * 100);

  return (
    <div>
      <div className="mb-1 flex justify-between text-caption text-ash">
        <span>{label}</span>
        <span className="tabular-nums">{Math.round(value)}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-lilac">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-300",
            tone === "better" ? "bg-good" : tone === "worse" ? "bg-danger" : "bg-navy",
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function Readout({
  title,
  value,
  unit,
  caption,
}: {
  title: string;
  value: string;
  unit: string;
  caption: string;
}) {
  return (
    <div className="rounded-xl border border-line p-3">
      <p className="text-caption font-semibold uppercase tracking-wide text-ash">{title}</p>
      <p className="mt-1 text-h2 tabular-nums text-ink">{value}</p>
      <p className="text-caption text-ash">{unit}</p>
      <p className="mt-1 text-body text-ink">{caption}</p>
    </div>
  );
}
