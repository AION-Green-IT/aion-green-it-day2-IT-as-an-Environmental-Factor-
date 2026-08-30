"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { CATEGORIES, CATEGORY_BY_CODE, type CategoryCode } from "@/data/categories";
import {
  hotspotForView,
  zoneForView,
  type CaseBrief,
  type ContextTile,
  type HeroImage,
  type Hotspot,
  type Zone,
} from "@/data/case-shared";
import { useProgress } from "@/lib/store";
import { scopedId } from "@/lib/ids";
import { CategoryChip } from "./CategoryChip";
import { HotspotHero, type Focus } from "./HotspotHero";

const FACT_ZOOM = 2.4;
const PANEL_ZOOM = 1.9;
const COMPANY_ZOOM = 2.1;

type Props = {
  /** Scopes the visited log: "nordcom/energy". */
  caseKey: string;
  image: HeroImage;
  companyZone: Zone;
  hotspots: Hotspot[];
  brief: CaseBrief;
  context: ContextTile[];
  contextHeading?: string;
  /** Shown in the category card. Use where the spread itself teaches something. */
  categoryNote?: string;
};

/**
 * The board shared by Case B and Case C.
 *
 * Both illustrations are drawn the same way: a company scene on the left and
 * titled panels down the right. So findings come in two shapes — panels, whose
 * whole rectangle is clickable, and points on the company scene. Neither
 * artwork has the category arrows Case A has printed on it, so the legend is
 * rendered underneath instead and still rings the markers it covers.
 */
export function CaseBoard({
  caseKey,
  image,
  companyZone,
  hotspots,
  brief,
  context,
  contextHeading = "Context",
  categoryNote,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryCode | null>(null);
  const [opened, setOpened] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const [view, setView] = useState<"img" | "svg">("img");
  const heroRef = useRef<HTMLDivElement>(null);

  const markVisited = useProgress((s) => s.markVisited);

  // Version 1 (default) is the illustration; version 2 is the schematic SVG.
  const useImg = view === "img";
  const hasSchematic = Boolean(image.schematic);
  const heroImage = {
    ...image,
    src: useImg || !image.schematic ? image.src : image.schematic,
  };
  const viewHotspots = hotspots.map((h) => hotspotForView(h, useImg));
  const viewCompanyZone = zoneForView(companyZone, useImg);

  const select = useCallback(
    (id: string) => {
      setSelectedId(id);
      setActiveCategory(null);

      if (id.startsWith("hs-")) {
        setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
        markVisited("hotspots", scopedId(caseKey, id.replace(/^hs-/, "")));
      }
    },
    [caseKey, markVisited],
  );

  const activeFact = hotspots.find((h) => h.id === selectedId) ?? null;
  const activeFactCoords = viewHotspots.find((h) => h.id === selectedId) ?? null;
  const isCompany = selectedId === companyZone.id;

  const focus: Focus = useMemo(() => {
    if (activeFactCoords) {
      return {
        x: activeFactCoords.x,
        y: activeFactCoords.y,
        // A panel is already a readable unit; zooming it as hard as a point
        // marker pushes its own edges out of frame.
        zoom: activeFactCoords.panel ? PANEL_ZOOM : FACT_ZOOM,
      };
    }
    if (isCompany) {
      return {
        x: viewCompanyZone.x + viewCompanyZone.w / 2,
        y: viewCompanyZone.y + viewCompanyZone.h / 2,
        zoom: COMPANY_ZOOM,
      };
    }
    return null;
  }, [activeFactCoords, isCompany, viewCompanyZone]);

  const clear = () => {
    setSelectedId(null);
    setActiveCategory(null);
  };

  const highlight = activeCategory
    ? {
        ids: hotspots.filter((h) => h.categories.includes(activeCategory)).map((h) => h.id),
        hex: CATEGORY_BY_CODE[activeCategory].hex,
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
    const index = hotspots.indexOf(activeFact);
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
          <h3 className="text-h3 text-ink">{brief.name}</h3>
          {closeButton}
        </div>
        {brief.lines.map((line) => (
          <p key={line} className="mb-3 text-body text-ink">
            {line}
          </p>
        ))}
        <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
          {contextHeading}
        </h4>
        <ul className="space-y-2">
          {context.map((tile) => (
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
    const category = CATEGORY_BY_CODE[activeCategory];
    const tagged = hotspots.filter((h) => h.categories.includes(activeCategory));

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

        {tagged.length > 0 ? (
          <>
            <h4 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
              {tagged.length} of {hotspots.length} findings carry this tag
            </h4>
            <ul className="mb-3 space-y-1">
              {tagged.map((spot) => (
                <li key={spot.id}>
                  <button
                    type="button"
                    onClick={() => select(spot.id)}
                    className="w-full rounded-lg px-2 py-1.5 text-left text-body text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
                  >
                    {hotspots.indexOf(spot) + 1}. {spot.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mb-3 rounded-xl bg-lilac px-3 py-2 text-caption text-navy">
            No finding on this board carries this tag. The topic area still belongs
            to the set of five — its absence here is itself worth noting.
          </p>
        )}

        {categoryNote ? (
          <p className="border-t border-line pt-3 text-caption text-ash">{categoryNote}</p>
        ) : null}
      </>
    );
  }

  return (
    <div className="space-y-4">
      <section aria-label="Interactive case board" ref={heroRef}>
        <HotspotHero
          image={heroImage}
          companyZone={viewCompanyZone}
          hotspots={viewHotspots}
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

        {/* The legend Case A has drawn into its artwork. Here it is rendered. */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-caption text-ash">Filter by topic area:</span>
          {CATEGORIES.map((category) => {
            const count = hotspots.filter((h) =>
              h.categories.includes(category.code),
            ).length;
            const isOn = activeCategory === category.code;

            return (
              <button
                key={category.code}
                type="button"
                aria-pressed={isOn}
                onClick={() => {
                  setSelectedId(null);
                  setActiveCategory(isOn ? null : category.code);
                }}
                className={clsx(
                  "flex items-center gap-2 rounded-lg border py-1.5 pl-2 pr-3 text-caption font-semibold transition-colors duration-200",
                  isOn
                    ? "border-purple bg-purple text-paper"
                    : "border-line bg-paper text-navy hover:border-purple hover:bg-lilac",
                )}
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 shrink-0 rounded-sm"
                  style={{ backgroundColor: category.hex }}
                />
                {category.name}
                <span className={clsx("font-normal", isOn ? "text-paper/80" : "text-ash")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-ash">
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-purple bg-paper text-caption font-semibold text-purple">
              1
            </span>
            One finding — {hotspots.length} of them, on panels and on the scene
          </span>

          <span className="flex items-center gap-2">
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-md border border-purple bg-paper px-1 text-[11px] font-semibold leading-none text-purple">
              i
            </span>
            The company block — brief and context
          </span>

          <span className="text-ash">
            {opened.length} of {hotspots.length} findings opened
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
            {showList ? "Hide the list of findings" : "Show all findings as list"}
          </button>

          {showList ? (
            <ol className="mt-3 grid gap-2 md:grid-cols-2">
              {hotspots.map((spot, index) => (
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
    </div>
  );
}
