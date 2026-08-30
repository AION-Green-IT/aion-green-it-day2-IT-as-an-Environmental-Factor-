"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { W1 } from "@/data/learn";
import { SOURCES } from "@/data/sources";
import { FieldNote } from "./FieldNote";
import { WidgetShell } from "./WidgetShell";
import { EnergyResourceDiagram } from "./EnergyResourceDiagram";
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

  // When a part of the diagram (or a card) is selected, bring the explanation
  // into view so the click, the zoom and the words stay connected.
  const detailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (active) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [active]);

  return (
    <WidgetShell
      meta={W1}
      progress={opened.length / W1.cards.length}
      done={done}
      closing={W1.closing}
    >
      <div className="mb-4">
        <p className="mb-2 text-caption text-ash">
          The picture first — tap a part to zoom in and read it, or open a card below.
        </p>
        <EnergyResourceDiagram activeId={active} onSelect={open} />
      </div>

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

      <div ref={detailRef}>
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

                {card.cases?.length ? (
                  <div className="mt-3">
                    <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-purple">
                      This actually happened
                    </p>
                    <ul className="space-y-3">
                      {card.cases.map((item) => (
                        <li
                          key={item.id}
                          className="rounded-xl border border-line p-3"
                        >
                          <h5 className="mb-1 text-body font-semibold text-ink">
                            {item.headline}
                          </h5>
                          <p className="mb-2 text-body text-ash">{item.what}</p>
                          <p className="text-body text-navy">
                            <span className="font-semibold">What it teaches: </span>
                            {item.lesson}
                          </p>
                          <p className="mt-2 text-caption text-ash">
                            Source:{" "}
                            <a
                              href={SOURCES[item.source].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded text-purple underline underline-offset-2 hover:text-navy"
                            >
                              {SOURCES[item.source].label}
                            </a>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))
        : null}
      </div>
    </WidgetShell>
  );
}
