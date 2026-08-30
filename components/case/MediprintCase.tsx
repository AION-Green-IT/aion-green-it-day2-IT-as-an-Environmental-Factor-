"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  BRIEF,
  CATEGORY_ZONES,
  COMPANY_ZONE,
  CONTEXT,
  HERO_IMAGE,
  HOTSPOTS,
} from "@/data/mediprint";
import { CATEGORY_BY_CODE } from "@/data/categories";
import { hotspotForView, zoneForView } from "@/data/case-shared";
import { TASK1, type BriefingLine } from "@/data/task1";
import { useProgress } from "@/lib/store";
import { scopedId } from "@/lib/ids";
import { CategoryChip } from "./CategoryChip";
import { HotspotHero, type Focus } from "./HotspotHero";

const FACT_ZOOM = 2.6;
const COMPANY_ZOOM = 2.1;

export function MediprintCase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [opened, setOpened] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const [view, setView] = useState<"img" | "svg">("img");
  const heroRef = useRef<HTMLDivElement>(null);

  const markVisited = useProgress((s) => s.markVisited);

  // Version 1 (default) is the illustration; version 2 is the schematic SVG.
  // Each view carries its own marker coordinates, resolved here.
  const useImg = view === "img";
  const hasSchematic = Boolean(HERO_IMAGE.schematic);
  const heroImage = {
    ...HERO_IMAGE,
    src: useImg || !HERO_IMAGE.schematic ? HERO_IMAGE.src : HERO_IMAGE.schematic,
  };
  const hotspots = HOTSPOTS.map((h) => hotspotForView(h, useImg));
  const companyZone = zoneForView(COMPANY_ZONE, useImg);
  const categoryZones = CATEGORY_ZONES.map((z) => ({
    ...zoneForView(z, useImg),
    code: z.code,
  }));

  const select = useCallback(
    (id: string) => {
      setSelectedId(id);

      if (id.startsWith("hs-")) {
        setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
        // Visited log keys are scoped: "mediprint/server-room".
        markVisited("hotspots", scopedId("mediprint", id.replace(/^hs-/, "")));
      }
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

  const activeFact = HOTSPOTS.find((h) => h.id === selectedId) ?? null;
  const activeFactCoords = hotspots.find((h) => h.id === selectedId) ?? null;
  const activeCategory = CATEGORY_ZONES.find((z) => z.id === selectedId) ?? null;
  const isCompany = selectedId === COMPANY_ZONE.id;

  // The arrows stay at full view: their value is seeing the whole illustration.
  const focus: Focus = useMemo(() => {
    if (activeFactCoords) {
      return { x: activeFactCoords.x, y: activeFactCoords.y, zoom: FACT_ZOOM };
    }
    if (isCompany) {
      return {
        x: companyZone.x + companyZone.w / 2,
        y: companyZone.y + companyZone.h / 2,
        zoom: COMPANY_ZOOM,
      };
    }
    return null;
  }, [activeFactCoords, isCompany, companyZone]);

  const clear = () => setSelectedId(null);

  // Selecting an arrow rings the markers carrying that tag, so they stay
  // findable on the artwork while the card lists them.
  const highlight = activeCategory
    ? {
        ids: HOTSPOTS.filter((h) => h.categories.includes(activeCategory.code)).map(
          (h) => h.id,
        ),
        hex: CATEGORY_BY_CODE[activeCategory.code].hex,
      }
    : null;

  const closeButton = (
    <button
      type="button"
      onClick={clear}
      className="shrink-0 rounded-lg border border-line px-2 py-1 text-caption text-ash transition-colors duration-200 hover:bg-lilac hover:text-navy hover:underline"
    >
      Close
    </button>
  );

  // ---------------- detail card ----------------
  let detail: React.ReactNode = null;

  if (activeFact) {
    const index = HOTSPOTS.indexOf(activeFact);
    detail = (
      <>
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple text-caption font-semibold text-paper">
              {index + 1}
            </span>
            <h3 className="text-h3 text-ink">{activeFact.label}</h3>
          </div>
          {closeButton}
        </div>
        <p className="mb-3 text-body text-ink">{activeFact.fact}</p>
        <p className="mb-3 text-caption text-ash">
          On the illustration: {activeFact.onTheImage}
        </p>
        <div className="flex flex-wrap gap-2">
          {activeFact.categories.map((code) => (
            <CategoryChip key={code} code={code} variant="topic" />
          ))}
        </div>
      </>
    );
  } else if (isCompany) {
    detail = (
      <>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-h3 text-ink">{BRIEF.name}</h3>
          {closeButton}
        </div>
        {BRIEF.lines.map((line) => (
          <p key={line} className="mb-4 text-body text-ink">
            {line}
          </p>
        ))}
        <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
          Context
        </h4>
        <ul className="space-y-2">
          {CONTEXT.map((tile) => (
            <li
              key={tile.id}
              id={tile.id}
              className="rounded-xl bg-lilac px-3 py-2 text-caption text-navy"
            >
              {tile.text}
            </li>
          ))}
        </ul>
      </>
    );
  } else if (activeCategory) {
    const category = CATEGORY_BY_CODE[activeCategory.code];
    const tagged = HOTSPOTS.filter((h) => h.categories.includes(activeCategory.code));

    detail = (
      <>
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-4 w-4 shrink-0 rounded"
              style={{ backgroundColor: category.hex }}
            />
            <h3 className="text-h3 text-ink">
              {category.name}{" "}
              <span className="font-normal text-ash">({category.code})</span>
            </h3>
          </div>
          {closeButton}
        </div>

        <p className="mb-3 text-caption text-ash">
          One of the five areas used across the module.
        </p>

        {tagged.length > 0 ? (
          <>
            <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
              Markers carrying this tag
            </h4>
            <ul className="space-y-1">
              {tagged.map((spot) => (
                <li key={spot.id}>
                  <button
                    type="button"
                    onClick={() => select(spot.id)}
                    className="w-full rounded-lg px-2 py-1.5 text-left text-body text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
                  >
                    {HOTSPOTS.indexOf(spot) + 1}. {spot.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="rounded-xl bg-lilac px-3 py-2 text-caption text-navy">
            No marker on this illustration carries this tag. The topic area still
            belongs to the set of five.
          </p>
        )}
      </>
    );
  }

  // ---------------- briefing lines ----------------
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
      <section aria-label="Interactive illustration" ref={heroRef}>
        <HotspotHero
          image={heroImage}
          companyZone={companyZone}
          categoryZones={categoryZones}
          hotspots={hotspots}
          selectedId={selectedId}
          focus={focus}
          visitedIds={opened}
          onSelect={select}
          onClear={clear}
          highlight={highlight}
          detail={detail}
          view={view}
          onSetView={setView}
          hasSchematic={hasSchematic}
        />

        {/* Key to the two kinds of thing that are clickable on the artwork. */}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-ash">
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-purple bg-paper text-caption font-semibold text-purple">
              1
            </span>
            One passage from the description — {HOTSPOTS.length} of them
          </span>

          <span className="flex items-center gap-2">
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-md border border-purple bg-paper px-1 text-[11px] font-semibold leading-none text-purple">
              i
            </span>
            The company banner — brief and context
          </span>

          <span className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              {CATEGORY_ZONES.map((zone) => (
                <span
                  key={zone.id}
                  className="flex h-5 min-w-[20px] items-center justify-center rounded-md border border-purple bg-paper px-1 text-[11px] font-semibold leading-none text-purple"
                >
                  {zone.code}
                </span>
              ))}
            </span>
            The five bands — the areas
          </span>

          <span className="text-ash">
            {opened.length} of {HOTSPOTS.length} passages opened
          </span>
        </div>

        {/* R6 — the same ids, facts and chips, without the image. */}
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
            <ol className="mt-3 grid gap-2 md:grid-cols-2">
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
      <section
        aria-labelledby="task1-title"
        className="mx-auto w-full max-w-4xl card p-5 md:p-6"
      >
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
