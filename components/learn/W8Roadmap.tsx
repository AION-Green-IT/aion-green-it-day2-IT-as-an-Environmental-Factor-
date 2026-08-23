"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  W8,
  W8_PROFILES,
  W8_REFERENCE,
  W8_TRADEOFFS,
  type RoadmapProfile,
} from "@/data/learn";
import { WidgetShell } from "./WidgetShell";
import { PlacementBoard, type Verdict } from "./PlacementBoard";
import { useWidget } from "./useWidget";

const TONE: Record<RoadmapProfile["tone"], string> = {
  good: "border-good bg-good/10",
  warn: "border-warn bg-warn/10",
  danger: "border-danger bg-danger/10",
};

const label = (id: string) => W8.measures.find((m) => m.id === id)?.text ?? id;

export function W8Roadmap() {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [showTradeoffs, setShowTradeoffs] = useState(false);
  const { complete } = useWidget(W8.id, W8.xp);

  const placedCount = Object.keys(placements).length;
  const done = placedCount === W8.measures.length;

  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const place = (itemId: string, targetId: string) => {
    setSelected(null);
    setShowTradeoffs(false);
    setPlacements((prev) => {
      if (!targetId) {
        const { [itemId]: _dropped, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: targetId };
    });
  };

  const quarterIndex = (id: string | undefined) => (id ? W8.quarters.indexOf(id) : -1);

  // Ordering, not correctness: a measure placed before its prerequisite is a
  // re-run waiting to happen, and the widget says so rather than scoring it.
  const verdicts: Record<string, Verdict> = {};
  for (const measure of W8.measures) {
    const own = quarterIndex(placements[measure.id]);
    if (own < 0) continue;

    if (!measure.requires) {
      verdicts[measure.id] = { tone: "neutral", message: measure.requiresLabel };
      continue;
    }

    const prereq = W8.measures.find((m) => m.id === measure.requires);
    const prereqQuarter = quarterIndex(placements[measure.requires]);

    if (prereqQuarter < 0) {
      verdicts[measure.id] = {
        tone: "warn",
        message: `${measure.requiresLabel} — not placed yet.`,
      };
    } else if (prereqQuarter > own) {
      verdicts[measure.id] = {
        tone: "danger",
        message: `Runs before “${prereq?.text}”, which it depends on. Expect to redo this one.`,
      };
    } else if (prereqQuarter === own) {
      verdicts[measure.id] = {
        tone: "warn",
        message: `${measure.requiresLabel} — same quarter, so no room between them.`,
      };
    } else {
      verdicts[measure.id] = {
        tone: "good",
        message: `${measure.requiresLabel} — in place by then.`,
      };
    }
  }

  const analysis = useMemo(() => {
    if (!done) return null;

    const perQuarter = W8.quarters.map(
      (q) => W8.measures.filter((m) => placements[m.id] === q).length,
    );

    const violations = W8.measures.filter((m) => {
      if (!m.requires) return false;
      return quarterIndex(placements[m.requires]) > quarterIndex(placements[m.id]);
    });

    const stacked = W8.measures.filter((m) => {
      if (!m.requires) return false;
      return quarterIndex(placements[m.requires]) === quarterIndex(placements[m.id]);
    });

    // Late means the second half of the year, where a measure stops steering
    // anything within the year it was planned for.
    const late = W8.measures.filter((m) => quarterIndex(placements[m.id]) >= 2);
    const firstHalf = perQuarter[0] + perQuarter[1];

    let profileId = "evenly-paced";
    if (violations.length > 0) profileId = "out-of-sequence";
    else if (perQuarter.some((n) => n === W8.measures.length)) profileId = "all-at-once";
    else if (firstHalf <= 1) profileId = "back-loaded";
    else if (perQuarter[0] >= 4) profileId = "front-loaded";
    else if (
      quarterIndex(placements["w8-owner"]) === 0 &&
      quarterIndex(placements["w8-report"]) >= 2 &&
      stacked.length <= 1
    )
      profileId = "foundation-first";

    const profile =
      W8_PROFILES.find((p) => p.id === profileId) ?? W8_PROFILES[W8_PROFILES.length - 1];

    // One line per measure: what this particular placement costs, or earns.
    const notes = W8.measures.map((m) => {
      const tradeoff = W8_TRADEOFFS.find((t) => t.id === m.id);
      const own = quarterIndex(placements[m.id]);
      const isStacked = stacked.some((s) => s.id === m.id);
      const isLate = own >= 2;

      if (!tradeoff) return null;
      if (isStacked && tradeoff.ifStacked) {
        return { id: m.id, tone: "warn" as const, text: tradeoff.ifStacked };
      }
      if (isLate && m.id !== "w8-report") {
        return { id: m.id, tone: "warn" as const, text: tradeoff.ifLate };
      }
      return { id: m.id, tone: "good" as const, text: tradeoff.wellPlaced };
    });

    return { profile, notes: notes.filter(Boolean), violations, late };
  }, [done, placements]);

  return (
    <WidgetShell
      meta={W8}
      progress={placedCount / W8.measures.length}
      done={done}
      closing={W8.closing}
    >
      <PlacementBoard
        items={W8.measures.map((m) => ({
          id: m.id,
          text: m.text,
          trailing: m.requiresLabel,
        }))}
        targets={W8.quarters.map((q) => ({ id: q, label: q }))}
        placements={placements}
        verdicts={verdicts}
        selectedId={selected}
        onSelectItem={setSelected}
        onPlace={place}
        targetGrid="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
      />

      {done ? (
        <div className="mt-4 border-t border-line pt-4">
          <button
            type="button"
            aria-expanded={showTradeoffs}
            onClick={() => setShowTradeoffs(!showTradeoffs)}
            className="rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
          >
            {showTradeoffs
              ? "Hide the trade-offs"
              : "What does this ordering cost me?"}
          </button>

          {showTradeoffs && analysis ? (
            <div className="mt-3 space-y-3">
              <div className={clsx("rounded-xl border-l-4 p-4", TONE[analysis.profile.tone])}>
                <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
                  Your plan reads as
                </p>
                <h4 className="mb-2 text-h3 text-ink">{analysis.profile.label}</h4>
                <p className="mb-2 text-body text-ink">{analysis.profile.what}</p>
                <p className="text-body text-navy">
                  <span className="font-semibold">What it costs: </span>
                  {analysis.profile.cost}
                </p>
              </div>

              <div>
                <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                  Measure by measure
                </p>
                <ul className="space-y-2">
                  {analysis.notes.map((note) =>
                    note ? (
                      <li
                        key={note.id}
                        className={clsx(
                          "rounded-xl border-l-4 p-3",
                          note.tone === "good"
                            ? "border-good bg-good/10"
                            : "border-warn bg-warn/10",
                        )}
                      >
                        <p className="text-body font-semibold text-ink">
                          {label(note.id)}{" "}
                          <span className="font-normal text-ash">
                            · {placements[note.id]}
                          </span>
                        </p>
                        <p className="mt-1 text-body text-ink">{note.text}</p>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>

              <div className="rounded-xl border border-line p-4">
                <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
                  For comparison
                </p>
                <p className="mb-3 text-body text-ash">
                  Not a correct answer — the order most programmes converge on, and the
                  reason each step sits where it does.
                </p>
                <ol className="space-y-2">
                  {W8_REFERENCE.map((step) => (
                    <li key={step.quarter} className="rounded-xl bg-lilac/50 p-3">
                      <p className="text-body font-semibold text-ink">
                        {step.quarter} — {step.measures.map(label).join(" · ")}
                      </p>
                      <p className="mt-1 text-caption text-navy">{step.why}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </WidgetShell>
  );
}
