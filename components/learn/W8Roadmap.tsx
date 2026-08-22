"use client";

import { useEffect, useState } from "react";
import { W8 } from "@/data/learn";
import { WidgetShell } from "./WidgetShell";
import { PlacementBoard, type Verdict } from "./PlacementBoard";
import { useWidget } from "./useWidget";

export function W8Roadmap() {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const { complete } = useWidget(W8.id, W8.xp);

  const done = Object.keys(placements).length === W8.measures.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const place = (itemId: string, targetId: string) => {
    setSelected(null);
    setPlacements((prev) => {
      if (!targetId) {
        const { [itemId]: _dropped, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: targetId };
    });
  };

  const quarterIndex = (id: string | undefined) =>
    id ? W8.quarters.indexOf(id) : -1;

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
    } else {
      verdicts[measure.id] = {
        tone: "good",
        message: `${measure.requiresLabel} — in place by then.`,
      };
    }
  }

  return (
    <WidgetShell
      meta={W8}
      progress={Object.keys(placements).length / W8.measures.length}
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
    </WidgetShell>
  );
}
