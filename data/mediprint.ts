// Case A — DataForm Systems. Day 2 Task 1.
// N1: every string here ships verbatim from the curriculum. Do not paraphrase.
// The route id stays /case/mediprint for stable links; the content is DataForm.

import type { CategoryCode } from "./categories";
import type { ContextTile, Hotspot, Zone } from "./case-shared";

export type { ContextTile, Hotspot, Zone };

export const HERO_IMAGE = {
  src: "/assets/dataform-hero.svg",
  width: 2048,
  height: 1117,
  alt:
    "Schematic board for DataForm Systems. Down the left, a legend of the five areas — Operations, Procurement, Use, Replacement, Storage. Across the top, the company banner. Below it, eight tiles: a server room, test systems, cloud applications, workstations, printers and peripherals, a three-year notebook refresh, unused devices in a store, and a procurement desk — with a ninth, faded tile noting there is no systematic look at energy or resource use.",
  // Compare with an AI illustration: generate from docs/hero-image-prompts.md,
  // save as public/assets/dataform-hero.jpeg, then uncomment the next line.
  // raster: "/assets/dataform-hero.jpeg",
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

// Order is the contract: the list view and the hero share it. Coordinates are
// percentages of the schematic; re-measure if the illustration is replaced.
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-server-room",
    label: "Server room",
    x: 28.8,
    y: 27.8,
    categories: ["Op"],
    lens: "energy",
    fact: "Several older systems with low utilisation exist in the server room.",
    onTheImage: "A rack of servers, drawn with amber activity bars.",
  },
  {
    id: "hs-test-systems",
    label: "Test systems",
    x: 56.5,
    y: 27.8,
    categories: ["Op"],
    lens: "energy",
    fact:
      "Several test systems run alongside the production estate — convenient to leave powered, and easy to forget once the test they were built for is over.",
    onTheImage: "A small tower with a status light, standing apart from the main rack.",
  },
  {
    id: "hs-cloud",
    label: "Cloud applications",
    x: 84.2,
    y: 27.8,
    categories: ["Op"],
    lens: "energy",
    fact:
      "Cloud applications are in growing use. The energy behind them sits on the provider's meter, not tracked here.",
    onTheImage: "A cloud symbol over the estate.",
  },
  {
    id: "hs-workstations",
    label: "Workstations",
    x: 28.8,
    y: 55.4,
    categories: ["U"],
    lens: "energy",
    fact: "Workstation computers often keep running at night as well.",
    onTheImage: "A desktop and monitor left switched on.",
  },
  {
    id: "hs-print",
    label: "Printers & peripherals",
    x: 56.5,
    y: 55.4,
    categories: ["U"],
    lens: "both",
    fact: "Printers and peripherals are distributed across many areas.",
    onTheImage: "A printer with a raised output tray.",
  },
  {
    id: "hs-devices-3yr",
    label: "3-year notebook refresh",
    x: 84.2,
    y: 55.4,
    categories: ["Rp"],
    lens: "resource",
    fact: "Notebooks are replaced by default after three years.",
    onTheImage: "A notebook with a replacement arrow.",
  },
  {
    id: "hs-basement",
    label: "Unused devices in store",
    x: 28.8,
    y: 83.1,
    categories: ["St"],
    lens: "resource",
    fact: "Old monitors and accessories are stored unused.",
    onTheImage: "A short stack of boxed-up monitors.",
  },
  {
    id: "hs-procurement",
    label: "Procurement desk",
    x: 56.5,
    y: 83.1,
    categories: ["Pr"],
    lens: "resource",
    fact: "New devices are often procured without a repair check or reuse assessment.",
    onTheImage: "A delivery box on a procurement desk.",
  },
];

/**
 * Clickable regions drawn into the artwork itself, so the illustration can
 * carry the brief and the legend instead of a sidebar repeating them.
 * All four values are percentages of the image box.
 */
/** The company banner carrying the DataForm name. */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "DataForm Systems — company brief and context",
  x: 15.5,
  y: 3,
  w: 23,
  h: 9,
};

/** The five area bands printed down the left of the artwork. */
export const CATEGORY_ZONES: (Zone & { code: CategoryCode })[] = [
  { id: "zone-cat-op", code: "Op", label: "Area: Operations", x: 1.5, y: 16, w: 11, h: 8 },
  { id: "zone-cat-pr", code: "Pr", label: "Area: Procurement", x: 1.5, y: 26, w: 11, h: 8 },
  { id: "zone-cat-u", code: "U", label: "Area: Use", x: 1.5, y: 36, w: 11, h: 8 },
  { id: "zone-cat-rp", code: "Rp", label: "Area: Replacement", x: 1.5, y: 46, w: 11, h: 8 },
  { id: "zone-cat-st", code: "St", label: "Area: Storage", x: 1.5, y: 56, w: 11, h: 8 },
];
