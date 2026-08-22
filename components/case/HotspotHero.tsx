"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  CATEGORY_ZONES,
  COMPANY_ZONE,
  HERO_IMAGE,
  type Hotspot,
} from "@/data/mediprint";

/** Where the selected point should land inside the frame. */
const FOCUS_X = 0.35; // left of centre, so the detail card keeps the right clear
const FOCUS_Y = 0.5;

export type Focus = { x: number; y: number; zoom: number } | null;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function transformFor(focus: Focus) {
  if (!focus) return { transform: "translate(0%, 0%) scale(1)", scale: 1 };

  const s = focus.zoom;
  // Pull the frame back inside the artwork so no blank edge is ever exposed.
  const tx = clamp((FOCUS_X - (s * focus.x) / 100) * 100, (1 - s) * 100, 0);
  const ty = clamp((FOCUS_Y - (s * focus.y) / 100) * 100, (1 - s) * 100, 0);

  return { transform: `translate(${tx}%, ${ty}%) scale(${s})`, scale: s };
}

type Props = {
  hotspots: Hotspot[];
  selectedId: string | null;
  focus: Focus;
  visitedIds: string[];
  onSelect: (id: string) => void;
  onClear: () => void;
  /** Markers to ring, and the colour to ring them in. */
  highlight: { ids: string[]; hex: string } | null;
  /** Rendered in the detail card. Null hides the card. */
  detail: ReactNode | null;
};

export function HotspotHero({
  hotspots,
  selectedId,
  focus,
  visitedIds,
  onSelect,
  onClear,
  highlight,
  detail,
}: Props) {
  const { transform, scale } = transformFor(focus);
  const inverse = `scale(${1 / scale})`;

  // Shared look for the two invisible-until-touched regions.
  const zoneClass = (active: boolean) =>
    clsx(
      "absolute rounded-xl border-2 transition-colors duration-200",
      active
        ? "border-purple bg-purple/15"
        : "border-transparent hover:border-purple hover:bg-paper/20",
    );

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-lilac"
        style={{ aspectRatio: `${HERO_IMAGE.width} / ${HERO_IMAGE.height}` }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && selectedId) {
            e.stopPropagation();
            onClear();
          }
        }}
      >
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform, transformOrigin: "0 0" }}
        >
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            quality={85}
            // Roughly the zoom factor times the layout width, so zooming stays sharp.
            sizes="(max-width: 1024px) 200vw, 2048px"
            className="select-none object-cover"
          />

          {/* The building — opens the brief and the context tiles. */}
          <button
            type="button"
            aria-label={COMPANY_ZONE.label}
            aria-pressed={selectedId === COMPANY_ZONE.id}
            onClick={() =>
              selectedId === COMPANY_ZONE.id ? onClear() : onSelect(COMPANY_ZONE.id)
            }
            className={zoneClass(selectedId === COMPANY_ZONE.id)}
            style={{
              left: `${COMPANY_ZONE.x}%`,
              top: `${COMPANY_ZONE.y}%`,
              width: `${COMPANY_ZONE.w}%`,
              height: `${COMPANY_ZONE.h}%`,
            }}
          />

          {/* The five category arrows already printed on the artwork. */}
          {CATEGORY_ZONES.map((zone) => (
            <button
              key={zone.id}
              type="button"
              aria-label={zone.label}
              aria-pressed={selectedId === zone.id}
              onClick={() =>
                selectedId === zone.id ? onClear() : onSelect(zone.id)
              }
              className={zoneClass(selectedId === zone.id)}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.w}%`,
                height: `${zone.h}%`,
              }}
            />
          ))}

          {/* The nine facts. */}
          {hotspots.map((spot, index) => {
            const isActive = spot.id === selectedId;
            const isVisited = visitedIds.includes(spot.id);
            const isRinged = highlight?.ids.includes(spot.id) ?? false;

            return (
              <button
                key={spot.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => (isActive ? onClear() : onSelect(spot.id))}
                title={spot.label}
                className={clsx(
                  "absolute flex items-center justify-center rounded-full border-2 font-semibold shadow-lg transition-colors duration-200",
                  // Small enough not to swamp the art on a phone, still a 28px target.
                  "h-7 w-7 text-caption md:h-9 md:w-9 md:text-body",
                  isActive
                    ? "border-paper bg-purple text-paper"
                    : isVisited
                      ? "border-paper bg-navy text-paper hover:bg-purple"
                      : "border-purple bg-paper text-purple hover:bg-purple hover:text-paper",
                )}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  // Counter-scale so markers keep their size while the art grows.
                  transform: `translate(-50%, -50%) ${inverse}`,
                  boxShadow: isRinged
                    ? `0 0 0 5px ${highlight?.hex}, 0 0 0 7px rgba(255,255,255,0.9)`
                    : undefined,
                }}
              >
                <span aria-hidden="true">{index + 1}</span>
                <span className="sr-only">
                  {spot.label}
                  {isVisited ? " (opened)" : ""}
                </span>
              </button>
            );
          })}
        </div>

        {focus ? (
          <button
            type="button"
            onClick={onClear}
            className="absolute left-3 top-3 rounded-xl bg-paper px-3 py-1.5 text-caption font-semibold text-navy shadow-lg transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            Zoom out
          </button>
        ) : null}
      </div>

      {/* Sits over the artwork from md up, and below it on a phone. */}
      {detail ? (
        <div
          aria-live="polite"
          className="card mt-3 max-h-[70vh] overflow-y-auto p-4 shadow-lg lg:absolute lg:bottom-4 lg:right-4 lg:top-4 lg:mt-0 lg:max-h-none lg:w-[38%] lg:min-w-[264px] lg:max-w-sm"
        >
          {detail}
        </div>
      ) : null}
    </div>
  );
}
