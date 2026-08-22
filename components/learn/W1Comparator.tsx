"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W1 } from "@/data/learn";
import { FieldNote } from "./FieldNote";
import { WidgetShell } from "./WidgetShell";
import { useWidget } from "./useWidget";

export function W1Comparator() {
  const [opened, setOpened] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const { complete } = useWidget(W1.id, W1.xp);

  const done = opened.length === W1.cards.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const open = (id: string) => {
    setActive(active === id ? null : id);
    setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <WidgetShell
      meta={W1}
      progress={opened.length / W1.cards.length}
      done={done}
      closing={W1.closing}
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {W1.cards.map((card) => {
          const isActive = active === card.id;
          return (
            <button
              key={card.id}
              type="button"
              aria-expanded={isActive}
              onClick={() => open(card.id)}
              className={clsx(
                "rounded-xl border p-3 text-left transition-colors duration-200",
                isActive
                  ? "border-purple bg-purple/10"
                  : opened.includes(card.id)
                    ? "border-line bg-lilac/40 hover:border-purple"
                    : "border-line bg-paper hover:border-purple hover:bg-lilac/50",
              )}
            >
              <p className="text-h3 text-ink">{card.term}</p>
              <p className="mt-1 text-caption text-ash">{card.short}</p>
            </button>
          );
        })}
      </div>

      {active
        ? W1.cards
            .filter((c) => c.id === active)
            .map((card) => (
              <div key={card.id} className="mt-3 rounded-xl border border-line p-4">
                <h4 className="mb-2 text-h3 text-ink">{card.term}</h4>
                <p className="mb-3 text-body text-ink">{card.definition}</p>

                <p className="mb-3 rounded-xl bg-lilac/60 p-3 text-body text-navy">
                  <span className="font-semibold">Where it stops: </span>
                  {card.boundary}
                </p>

                <p className="text-caption text-ash">
                  <span className="font-semibold">In practice: </span>
                  {card.inPractice}
                </p>

                {card.note ? <FieldNote note={card.note} /> : null}
              </div>
            ))
        : null}
    </WidgetShell>
  );
}
