"use client";

import { useEffect, useState } from "react";
import { W5 } from "@/data/learn";
import { WidgetShell } from "./WidgetShell";
import { PlacementBoard, type Verdict } from "./PlacementBoard";
import { useWidget } from "./useWidget";

export function W5Matrix() {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const { complete } = useWidget(W5.id, W5.xp);

  const done = Object.keys(placements).length === W5.cards.length;
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

  // No scoring here — the widget shows what each quadrant commits you to.
  const verdicts: Record<string, Verdict> = {};
  for (const card of W5.cards) {
    if (!placements[card.id]) continue;
    verdicts[card.id] = { tone: "neutral", message: card.hint };
  }

  return (
    <WidgetShell
      meta={W5}
      progress={Object.keys(placements).length / W5.cards.length}
      done={done}
      closing={W5.closing}
    >
      <PlacementBoard
        items={W5.cards.map((c) => ({ id: c.id, text: c.text }))}
        targets={W5.quadrants.map((q) => ({
          id: q.id,
          label: q.title,
          hint: q.consequence,
        }))}
        placements={placements}
        verdicts={verdicts}
        selectedId={selected}
        onSelectItem={setSelected}
        onPlace={place}
      />
    </WidgetShell>
  );
}
