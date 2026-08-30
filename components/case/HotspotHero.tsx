"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { CategoryCode } from "@/data/categories";
import type { HeroImage, Hotspot, Zone } from "@/data/case-shared";

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

type Anchor = "top-right" | "centre-right" | "top-left";

const ANCHOR_CLASS: Record<Anchor, string> = {
  "top-right": "items-start justify-end",
  "centre-right": "items-center justify-end",
  "top-left": "items-start justify-start",
};

const ANCHOR_ORIGIN: Record<Anchor, string> = {
  "top-right": "right top",
  "centre-right": "right center",
  "top-left": "left top",
};

/**
 * A clickable rectangle of the artwork, carrying a badge in one corner.
 *
 * Square badges mark regions that are not findings — the company block and, on
 * Case A, the five category arrows drawn into the picture. Round badges mark
 * findings, so a panel on Cases B and C reads as the same kind of thing as a
 * numbered point marker on Case A.
 */
function ZoneButton({
  zone,
  badge,
  shape,
  anchor,
  active,
  visited,
  ringHex,
  inverse,
  onToggle,
}: {
  zone: Zone;
  badge: string;
  shape: "square" | "round";
  anchor: Anchor;
  active: boolean;
  visited?: boolean;
  ringHex?: string;
  inverse: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={zone.label}
      aria-pressed={active}
      onClick={onToggle}
      className={clsx(
        "absolute flex rounded-xl border border-dashed p-0.5 transition-colors duration-200 md:p-1",
        ANCHOR_CLASS[anchor],
        active
          ? "border-solid border-purple bg-purple/15"
          : "border-purple/60 bg-paper/5 hover:border-solid hover:border-purple hover:bg-purple/10",
      )}
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: `${zone.w}%`,
        height: `${zone.h}%`,
      }}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "flex items-center justify-center border font-semibold leading-none shadow-sm",
          shape === "round"
            ? "h-7 w-7 rounded-full border-2 text-caption md:h-9 md:w-9 md:text-body"
            : // Sized to sit inside an arrow band, only ~16px tall on a phone.
              "h-4 min-w-[16px] rounded px-1 text-[9px] md:h-5 md:min-w-[20px] md:rounded-md md:text-[11px]",
          active
            ? "border-paper bg-purple text-paper"
            : visited
              ? "border-paper bg-navy text-paper"
              : "border-purple bg-paper text-purple",
        )}
        // Counter-scale so the badge keeps its size while the art grows.
        style={{
          transform: inverse,
          transformOrigin: ANCHOR_ORIGIN[anchor],
          boxShadow: ringHex
            ? `0 0 0 5px ${ringHex}, 0 0 0 7px rgba(255,255,255,0.9)`
            : undefined,
        }}
      >
        {badge}
      </span>
    </button>
  );
}

type Props = {
  image: HeroImage;
  /** The company block. Opens the brief; never a finding. */
  companyZone: Zone;
  /** Category arrows drawn into the artwork. Case A only; empty elsewhere. */
  categoryZones?: (Zone & { code: CategoryCode })[];
  hotspots: Hotspot[];
  selectedId: string | null;
  focus: Focus;
  visitedIds: string[];
  onSelect: (id: string) => void;
  onClear: () => void;
  /** Findings to ring, and the colour to ring them in. */
  highlight: { ids: string[]; hex: string } | null;
  /** Rendered in the detail card. Null hides the card. */
  detail: ReactNode | null;
  /** Which version is showing, and whether a v2 SVG exists to toggle to. */
  view: "img" | "svg";
  onSetView: (v: "img" | "svg") => void;
  hasSchematic: boolean;
};

export function HotspotHero({
  image,
  companyZone,
  categoryZones = [],
  hotspots,
  selectedId,
  focus,
  visitedIds,
  onSelect,
  onClear,
  highlight,
  detail,
  view,
  onSetView,
  hasSchematic,
}: Props) {
  const { transform, scale } = transformFor(focus);
  const inverse = `scale(${1 / scale})`;

  const toggle = (id: string) => () =>
    selectedId === id ? onClear() : onSelect(id);

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-lilac"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
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
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={85}
            // Roughly the zoom factor times the layout width, so zooming stays sharp.
            sizes="(max-width: 1024px) 200vw, 2048px"
            className="select-none object-cover"
          />

          {/* The company block — the brief and the context tiles. */}
          <ZoneButton
            zone={companyZone}
            badge="i"
            shape="square"
            anchor="top-right"
            active={selectedId === companyZone.id}
            inverse={inverse}
            onToggle={toggle(companyZone.id)}
          />

          {/* Category arrows printed on the artwork, where the artwork has them. */}
          {categoryZones.map((zone) => (
            <ZoneButton
              key={zone.id}
              zone={zone}
              badge={zone.code}
              shape="square"
              anchor="centre-right"
              active={selectedId === zone.id}
              inverse={inverse}
              onToggle={toggle(zone.id)}
            />
          ))}

          {/* The findings. A panel becomes a rectangle, a point becomes a marker. */}
          {hotspots.map((spot, index) => {
            const isActive = spot.id === selectedId;
            const isVisited = visitedIds.includes(spot.id);
            const ringHex = highlight?.ids.includes(spot.id)
              ? highlight.hex
              : undefined;

            if (spot.panel) {
              return (
                <ZoneButton
                  key={spot.id}
                  zone={{ id: spot.id, label: spot.label, ...spot.panel }}
                  badge={String(index + 1)}
                  shape="round"
                  anchor="top-left"
                  active={isActive}
                  visited={isVisited}
                  ringHex={ringHex}
                  inverse={inverse}
                  onToggle={toggle(spot.id)}
                />
              );
            }

            return (
              <button
                key={spot.id}
                type="button"
                aria-pressed={isActive}
                onClick={toggle(spot.id)}
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
                  boxShadow: ringHex
                    ? `0 0 0 5px ${ringHex}, 0 0 0 7px rgba(255,255,255,0.9)`
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

        {/* Small version toggle in the corner: illustration (v1) vs SVG (v2).
            Bottom-right so it never sits over the detail card's Close button. */}
        {hasSchematic ? (
          <div
            className="absolute bottom-3 right-3 z-10 inline-flex overflow-hidden rounded-lg border border-line bg-paper/95 text-[11px] font-semibold shadow-lg"
            aria-label="Hero version"
          >
            <button
              type="button"
              aria-pressed={view === "img"}
              onClick={() => onSetView("img")}
              className={clsx(
                "px-2 py-1 transition-colors duration-200",
                view === "img" ? "bg-navy text-paper" : "text-navy hover:bg-lilac",
              )}
            >
              IMG
            </button>
            <button
              type="button"
              aria-pressed={view === "svg"}
              onClick={() => onSetView("svg")}
              className={clsx(
                "px-2 py-1 transition-colors duration-200",
                view === "svg" ? "bg-navy text-paper" : "text-navy hover:bg-lilac",
              )}
            >
              SVG
            </button>
          </div>
        ) : null}
      </div>

      {/* Sits over the artwork from lg up, and below it on narrower screens. */}
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
