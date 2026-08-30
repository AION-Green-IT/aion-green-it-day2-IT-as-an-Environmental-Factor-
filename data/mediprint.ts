// Case A — DataForm Systems. Day 2 Task 1.
// N1: every string here ships verbatim from the curriculum. Do not paraphrase.
// The route id stays /case/mediprint for stable links; the content is DataForm.

import type { CategoryCode } from "./categories";
import type { ContextTile, Hotspot, Zone } from "./case-shared";

export type { ContextTile, Hotspot, Zone };

export const HERO_IMAGE = {
  src: "/assets/dataform-hero.jpeg",
  width: 2752,
  height: 1536,
  alt:
    "Illustrated cutaway of the DataForm Systems building. Down the left, five area arrows — Operations, Procurement, Use, Replacement, Storage. Across three floors: a server room and a standalone test tower with a cloud outside on the top floor; a workstation desk, a printer and a laptop being swapped on a refresh cycle in the middle; and a store of boxed-up devices, a procurement desk and a quiet office corner below.",
  // Version 2: the schematic SVG, reachable from the IMG/SVG toggle.
  schematic: "/assets/dataform-hero.svg",
};

export const BRIEF = {
  name: "DataForm Systems",
  lines: [
    "420 employees. The company operates a mix of office workstations, mobile devices, printers, a local server room, cloud applications and several test systems.",
    "Devices are replaced regularly, although many would still be technically usable. There is no systematic examination of energy or resource consumption.",
  ],
};

export const CONTEXT: ContextTile[] = [
  {
    id: "ctx-replace",
    text: "Devices are replaced regularly, although many would still be technically usable.",
  },
  {
    id: "ctx-nosystem",
    text: "There is no systematic examination of energy or resource consumption.",
  },
];

// Order is the contract: the list view and the hero share it. `x`/`y` are the
// schematic-SVG coordinates (v2); `imgX`/`imgY` are measured off the illustration
// (v1, default). Percentages of the image box in both cases.
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-server-room",
    label: "Server room",
    x: 28.8,
    y: 27.8,
    imgX: 50.5,
    imgY: 25.8,
    categories: ["Op"],
    lens: "energy",
    fact: "Several older systems with low utilisation exist in the server room.",
    onTheImage: "The rack of servers on the top floor, by the white marker.",
  },
  {
    id: "hs-test-systems",
    label: "Test systems",
    x: 56.5,
    y: 27.8,
    imgX: 66.3,
    imgY: 24.4,
    categories: ["Op"],
    lens: "energy",
    fact:
      "Several test systems run alongside the production estate — convenient to leave powered, and easy to forget once the test they were built for is over.",
    onTheImage: "The standalone tower to the right of the racks, top floor.",
  },
  {
    id: "hs-cloud",
    label: "Cloud applications",
    x: 84.2,
    y: 27.8,
    imgX: 86,
    imgY: 22,
    categories: ["Op"],
    lens: "energy",
    fact:
      "Cloud applications are in growing use. The energy behind them sits on the provider's meter, not tracked here.",
    onTheImage: "The cloud outside the building, top right, wired in by a cable.",
  },
  {
    id: "hs-workstations",
    label: "Workstations",
    x: 28.8,
    y: 55.4,
    imgX: 50.3,
    imgY: 47.5,
    categories: ["U"],
    lens: "energy",
    fact: "Workstation computers often keep running at night as well.",
    onTheImage: "The desk with a monitor and two people, middle floor left.",
  },
  {
    id: "hs-print",
    label: "Printers & peripherals",
    x: 56.5,
    y: 55.4,
    imgX: 69.3,
    imgY: 49.6,
    categories: ["U"],
    lens: "both",
    fact: "Printers and peripherals are distributed across many areas.",
    onTheImage: "The printer with a stack of paper, middle floor.",
  },
  {
    id: "hs-devices-3yr",
    label: "3-year notebook refresh",
    x: 84.2,
    y: 55.4,
    imgX: 82.8,
    imgY: 48.4,
    categories: ["Rp"],
    lens: "resource",
    fact: "Notebooks are replaced by default after three years.",
    onTheImage: "The laptop by the green refresh arrows, middle floor right.",
  },
  {
    id: "hs-basement",
    label: "Unused devices in store",
    x: 28.8,
    y: 83.1,
    imgX: 54.5,
    imgY: 79.7,
    categories: ["St"],
    lens: "resource",
    fact: "Old monitors and accessories are stored unused.",
    onTheImage: "The shelving of boxed-up devices, lower floor left.",
  },
  {
    id: "hs-procurement",
    label: "Procurement desk",
    x: 56.5,
    y: 83.1,
    imgX: 67.6,
    imgY: 75.7,
    categories: ["Pr"],
    lens: "resource",
    fact: "New devices are often procured without a repair check or reuse assessment.",
    onTheImage: "The desk with a delivery box and staff, lower floor centre.",
  },
];

/**
 * Clickable regions drawn into the artwork itself, so the illustration can
 * carry the brief and the legend instead of a sidebar repeating them.
 * All four values are percentages of the image box.
 */
/** The company title block (illustration) / banner (schematic). */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "DataForm Systems — company brief and context",
  x: 15.5,
  y: 3,
  w: 23,
  h: 9,
  imgX: 3,
  imgY: 5,
  imgW: 26,
  imgH: 12,
};

/** The five area arrows down the left of the artwork. */
export const CATEGORY_ZONES: (Zone & { code: CategoryCode })[] = [
  { id: "zone-cat-op", code: "Op", label: "Area: Operations", x: 1.5, y: 16, w: 11, h: 8, imgX: 2.5, imgY: 31, imgW: 24, imgH: 10 },
  { id: "zone-cat-pr", code: "Pr", label: "Area: Procurement", x: 1.5, y: 26, w: 11, h: 8, imgX: 2.5, imgY: 43.5, imgW: 24, imgH: 10 },
  { id: "zone-cat-u", code: "U", label: "Area: Use", x: 1.5, y: 36, w: 11, h: 8, imgX: 2.5, imgY: 55, imgW: 24, imgH: 10 },
  { id: "zone-cat-rp", code: "Rp", label: "Area: Replacement", x: 1.5, y: 46, w: 11, h: 8, imgX: 2.5, imgY: 67.5, imgW: 24, imgH: 10 },
  { id: "zone-cat-st", code: "St", label: "Area: Storage", x: 1.5, y: 56, w: 11, h: 8, imgX: 2.5, imgY: 79.5, imgW: 24, imgH: 10 },
];
