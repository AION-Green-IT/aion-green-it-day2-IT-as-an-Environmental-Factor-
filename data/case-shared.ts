// Shared shapes for the three case illustrations (A MediPrint, B NordCom, C Auron).
// N4: the five categories are fixed; nothing here may introduce a sixth.

import type { CategoryCode } from "./categories";

export type HeroImage = {
  /** Version 1 (default) — the AI illustration. Aspect must match width/height. */
  src: string;
  width: number;
  height: number;
  alt: string;
  /**
   * Version 2 — the schematic SVG kept as an alternate. When set, the hero shows
   * a small IMG / SVG toggle in the corner; the illustration (`src`) is default.
   * The two views can use different marker coordinates (see `imgX`/`imgY` below):
   * hotspots and zones carry their SVG coordinates in `x`/`y`, and the
   * illustration coordinates in `imgX`/`imgY`.
   */
  schematic?: string;
};

/**
 * A clickable rectangle drawn over the artwork. All four values are
 * percentages of the image box, so they survive any render size.
 */
export type Zone = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Illustration-view coordinates (v1). Fall back to x/y/w/h when absent. */
  imgX?: number;
  imgY?: number;
  imgW?: number;
  imgH?: number;
};

/**
 * One passage of the case description, anchored to the illustration.
 *
 * Case A is a continuous cutaway, so its findings are points: `x`/`y` mark the
 * spot and the marker sits on it. Cases B and C are drawn as titled comic
 * panels, so their findings carry `panel` as well — the whole panel becomes the
 * target and the number rides in its corner. `x`/`y` still drive the zoom, so
 * every finding focuses the same way regardless of which shape it uses.
 */
export type Hotspot = {
  id: string;
  label: string;
  /** Focus point for the zoom, percent of image width/height (SVG view / v2). */
  x: number;
  y: number;
  /** When present, the whole rectangle is clickable instead of a point. */
  panel?: { x: number; y: number; w: number; h: number };
  /** Illustration-view coordinates (v1, default). Fall back to x/y when absent. */
  imgX?: number;
  imgY?: number;
  imgPanel?: { x: number; y: number; w: number; h: number };
  categories: CategoryCode[];
  /**
   * The curriculum's second lens (Task 1 steps 1-2): does this point show
   * energy consumption, resource/material burden, or both? Optional so a case
   * that does not use the lens stays valid.
   */
  lens?: "energy" | "resource" | "both";
  fact: string;
  /** What is visible at this spot. Neutral description, no interpretation. */
  onTheImage: string;
};

export type ContextTile = { id: string; text: string };

export type CaseBrief = {
  name: string;
  lines: string[];
};

/** Resolve a hotspot's coordinates for the active view (v1 illustration or v2 SVG). */
export function hotspotForView(h: Hotspot, useImg: boolean): Hotspot {
  if (!useImg) return h;
  return { ...h, x: h.imgX ?? h.x, y: h.imgY ?? h.y, panel: h.imgPanel ?? h.panel };
}

/** Resolve a zone's coordinates for the active view. */
export function zoneForView(z: Zone, useImg: boolean): Zone {
  if (!useImg) return z;
  return {
    ...z,
    x: z.imgX ?? z.x,
    y: z.imgY ?? z.y,
    w: z.imgW ?? z.w,
    h: z.imgH ?? z.h,
  };
}
