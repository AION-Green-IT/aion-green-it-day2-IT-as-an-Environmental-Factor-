"use client";

import Image from "next/image";
import clsx from "clsx";
import { HERO_IMAGE, type Hotspot } from "@/data/mediprint";

const ZOOM = 2.6;

/** Clamp so a zoomed image never exposes a blank edge. */
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function transformFor(spot: Hotspot | null) {
  if (!spot) return { transform: "translate(0%, 0%) scale(1)", scale: 1 };

  // Centre the marker, then pull the frame back inside the image bounds.
  const tx = clamp((0.5 - (ZOOM * spot.x) / 100) * 100, (1 - ZOOM) * 100, 0);
  const ty = clamp((0.5 - (ZOOM * spot.y) / 100) * 100, (1 - ZOOM) * 100, 0);

  return { transform: `translate(${tx}%, ${ty}%) scale(${ZOOM})`, scale: ZOOM };
}

type Props = {
  hotspots: Hotspot[];
  activeId: string | null;
  visitedIds: string[];
  onSelect: (id: string) => void;
  onClear: () => void;
};

export function HotspotHero({
  hotspots,
  activeId,
  visitedIds,
  onSelect,
  onClear,
}: Props) {
  const active = hotspots.find((h) => h.id === activeId) ?? null;
  const { transform, scale } = transformFor(active);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-line bg-lilac"
      style={{ aspectRatio: `${HERO_IMAGE.width} / ${HERO_IMAGE.height}` }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && active) {
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
          // Asks for roughly ZOOM x the layout width so the zoomed view stays sharp.
          sizes="(max-width: 1024px) 200vw, 2048px"
          className="select-none object-cover"
        />

        {hotspots.map((spot, index) => {
          const isActive = spot.id === activeId;
          const isVisited = visitedIds.includes(spot.id);

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
                // Counter-scale so the marker keeps its size while the art zooms.
                transform: `translate(-50%, -50%) scale(${1 / scale})`,
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

      {/* Kept clear of the markers: top-right is empty art in this illustration. */}
      {active ? (
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <span className="rounded-xl bg-navy/90 px-3 py-1.5 text-caption text-paper">
            {active.label}
          </span>
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl bg-paper px-3 py-1.5 text-caption font-semibold text-navy shadow-sm transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            Zoom out
          </button>
        </div>
      ) : null}
    </div>
  );
}
