"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W2 } from "@/data/learn";
import { FieldNote } from "./FieldNote";
import { WidgetShell } from "./WidgetShell";
import { ConsumerIcon } from "./ConsumerIcon";
import { useWidget } from "./useWidget";

export function W2FlipCards() {
  const [flipped, setFlipped] = useState<string[]>([]);
  const { complete } = useWidget(W2.id, W2.xp);

  const done = flipped.length === W2.cards.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const flip = (id: string) =>
    setFlipped((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  return (
    <WidgetShell
      meta={W2}
      progress={flipped.length / W2.cards.length}
      done={done}
      closing={W2.closing}
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {W2.cards.map((card) => {
          const isFlipped = flipped.includes(card.id);
          return (
            <div
              key={card.id}
              className={clsx(
                "rounded-xl border p-4 transition-colors duration-200",
                isFlipped ? "border-purple bg-paper" : "border-line bg-lilac/40",
              )}
            >
              <button
                type="button"
                aria-expanded={isFlipped}
                onClick={() => flip(card.id)}
                className="flex w-full items-center justify-between gap-3 rounded-lg text-left"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="shrink-0 rounded-lg bg-lilac/70 p-1.5">
                    <ConsumerIcon id={card.id} />
                  </span>
                  <span className="text-h3 text-ink">{card.front}</span>
                </span>
                <span className="shrink-0 rounded-lg border border-line px-2 py-1 text-caption text-ash">
                  {isFlipped ? "Hide" : "Flip"}
                </span>
              </button>

              {isFlipped ? (
                <div className="mt-3 space-y-2">
                  <div className="rounded-lg border-l-4 border-warn bg-warn/10 p-3">
                    <p className="text-caption font-semibold uppercase tracking-wide text-warn">
                      Running cost — energy while it operates
                    </p>
                    <p className="text-body text-ink">{card.cause}</p>
                  </div>

                  <div className="rounded-lg border-l-4 border-navy bg-navy/10 p-3">
                    <p className="text-caption font-semibold uppercase tracking-wide text-navy">
                      Hidden cost — made, cooled, moved, discarded
                    </p>
                    <p className="text-body text-ink">{card.enabler}</p>
                  </div>

                  {card.note ? <FieldNote note={card.note} /> : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
}
