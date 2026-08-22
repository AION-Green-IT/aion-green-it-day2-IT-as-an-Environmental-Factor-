"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { HOTSPOTS } from "@/data/mediprint";
import { TASK1, type BriefingLine } from "@/data/task1";
import { useProgress } from "@/lib/store";
import { scopedId } from "@/lib/ids";
import { CategoryChip } from "./CategoryChip";
import { HotspotHero } from "./HotspotHero";

export function MediprintCase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [opened, setOpened] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const markVisited = useProgress((s) => s.markVisited);

  const select = useCallback(
    (id: string) => {
      setActiveId(id);
      setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
      // Visited log keys are scoped: "mediprint/server-room".
      markVisited("hotspots", scopedId("mediprint", id.replace(/^hs-/, "")));
    },
    [markVisited],
  );

  const selectFromBriefing = useCallback(
    (id: string) => {
      select(id);
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    [select],
  );

  const active = HOTSPOTS.find((h) => h.id === activeId) ?? null;
  const activeIndex = HOTSPOTS.findIndex((h) => h.id === activeId);

  const renderLine = (line: BriefingLine) => (
    <li key={line.id} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="text-body text-ink">{line.text}</span>
      {line.findIt ? (
        <button
          type="button"
          onClick={() => selectFromBriefing(line.findIt as string)}
          className="rounded text-caption font-semibold text-purple underline underline-offset-2 transition-colors duration-200 hover:text-navy"
        >
          Find it on the illustration →
        </button>
      ) : (
        <span className="text-caption text-ash">(context only)</span>
      )}
    </li>
  );

  return (
    <div className="space-y-6">
      {/* ---------------- Interactive hero ---------------- */}
      <section aria-label="Interactive illustration" ref={heroRef}>
        <HotspotHero
          hotspots={HOTSPOTS}
          activeId={activeId}
          visitedIds={opened}
          onSelect={select}
          onClear={() => setActiveId(null)}
        />

        {/* Detail for the selected marker. */}
        <div
          aria-live="polite"
          className={clsx(
            "mt-3 rounded-2xl border p-4",
            active ? "border-line bg-paper shadow-sm" : "border-dashed border-line bg-lilac/50",
          )}
        >
          {active ? (
            <>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple text-caption font-semibold text-paper">
                  {activeIndex + 1}
                </span>
                <h3 className="text-h3 text-ink">{active.label}</h3>
              </div>

              <p className="mb-3 text-body text-ink">{active.fact}</p>

              <p className="mb-3 text-caption text-ash">
                On the illustration: {active.onTheImage}
              </p>

              <div className="flex flex-wrap gap-2">
                {active.categories.map((code) => (
                  <CategoryChip key={code} code={code} variant="topic" />
                ))}
              </div>
            </>
          ) : (
            <p className="text-body text-ash">
              Nine markers sit on the illustration. Select one to read the passage it
              carries and the topic area it is tagged with. {opened.length} of{" "}
              {HOTSPOTS.length} opened so far.
            </p>
          )}
        </div>

        {/* R6 — the same ids, labels, facts and chips, without the image. */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowList((v) => !v)}
            aria-expanded={showList}
            className="rounded-xl border border-line px-3 py-2 text-caption font-semibold text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            {showList ? "Hide the list of facts" : "Show all facts as list"}
          </button>

          {showList ? (
            <ol className="mt-3 space-y-2">
              {HOTSPOTS.map((spot, index) => (
                <li key={spot.id} id={spot.id} className="card p-4">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-h3 text-ink">
                      {index + 1}. {spot.label}
                    </h3>
                    <code className="text-caption text-ash">{spot.id}</code>
                  </div>
                  <p className="mb-2 text-body text-ink">{spot.fact}</p>
                  <div className="flex flex-wrap gap-2">
                    {spot.categories.map((code) => (
                      <CategoryChip key={code} code={code} variant="topic" />
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </section>

      {/* ---------------- Task briefing ---------------- */}
      <section aria-labelledby="task1-title" className="card p-5 md:p-6">
        <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
          {TASK1.number}
        </p>
        <h2 id="task1-title" className="mb-4 text-h2 text-ink">
          {TASK1.title}
        </h2>

        <p className="mb-5 text-body text-ash">{TASK1.lead}</p>

        <h3 className="mb-2 text-h3 text-ink">In the company description</h3>
        <ul className="mb-6 space-y-2 border-l-2 border-line pl-4">
          {TASK1.leadFacts.map(renderLine)}
        </ul>

        <h3 className="mb-2 text-h3 text-ink">{TASK1.additionalHeading}</h3>
        <ul className="mb-6 space-y-2 border-l-2 border-line pl-4">
          {TASK1.additional.map(renderLine)}
        </ul>

        <h3 className="mb-3 text-h3 text-ink">{TASK1.assignmentHeading}</h3>
        <ol className="mb-6 space-y-3">
          {TASK1.assignment.map((step, index) => (
            <li key={step.id} className="rounded-2xl bg-lilac/60 p-4">
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-caption font-semibold text-paper">
                  {index + 1}
                </span>
                <div>
                  <p className="text-body font-semibold text-ink">{step.text}</p>
                  <p className="mt-1 text-caption text-ash">{step.hint}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-1 text-h3 text-ink">{TASK1.noteHeading}</h3>
            <p className="text-body text-ash">{TASK1.note}</p>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-1 text-h3 text-ink">{TASK1.objectiveHeading}</h3>
            <p className="text-body text-ash">{TASK1.objective}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
