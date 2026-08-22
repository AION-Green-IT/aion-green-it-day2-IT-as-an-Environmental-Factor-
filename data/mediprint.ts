// Case A — MediPrint Solutions. Section 6.A of the build prompt.
// N1: every string here ships verbatim. Do not paraphrase or translate.

import type { CategoryCode } from "./categories";

export const HERO_IMAGE = {
  src: "/assets/mediprint-hero.jpeg",
  width: 2816,
  height: 1536,
  alt:
    "Cutaway illustration of the MediPrint Solutions offices: a server room, a print area, an open-plan workspace, a boardroom, a project presentation room, a basement store of old devices, a procurement sign and a cloud icon, with a category legend down the left side.",
};

export const BRIEF = {
  name: "MediPrint Solutions",
  lines: [
    "280 employees, two sites, own server room, device renewal every three years, high volume of printing, growing cloud use, no sustainability strategy in IT.",
  ],
};

export type ContextTile = { id: string; text: string };

export const CONTEXT: ContextTile[] = [
  { id: "ctx-elec-rising", text: "Electricity costs are rising significantly." },
  {
    id: "ctx-mgmt-asking",
    text:
      "Management is asking for the first time about IT's contribution to sustainability.",
  },
  {
    id: "ctx-projects-fnspd",
    text: "IT projects are assessed only in terms of functionality and speed.",
  },
];

export type Hotspot = {
  id: string;
  label: string;
  /** Horizontal position on the hero, percent of image width. */
  x: number;
  /** Vertical position on the hero, percent of image height. */
  y: number;
  categories: CategoryCode[];
  fact: string;
  /** What is visible at this spot on the illustration. Neutral description. */
  onTheImage: string;
};

// Order is the contract: the list view and the hero share it.
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-server-room",
    label: "Server room",
    x: 62.5,
    y: 29,
    categories: ["E"],
    fact:
      "Own server room on site. Runs continuously; cooling and uptime are the operational priority.",
    onTheImage:
      "Racks lit red behind two large cooling fans, with heat rising from the cabinet on the left.",
  },
  {
    id: "hs-elec-meter",
    label: "Electricity meter",
    x: 73,
    y: 11.5,
    categories: ["E"],
    fact: "Electricity costs are rising significantly.",
    onTheImage: "A wall chart with a red line climbing steeply to the right.",
  },
  {
    id: "hs-cloud",
    label: "Cloud services",
    x: 56.5,
    y: 82.5,
    categories: ["E", "Em"],
    fact:
      "Growing cloud use. Compute and storage are shifting to external providers whose energy mix is not tracked here.",
    onTheImage:
      "A cloud icon above the basement servers, with arrows running between the two.",
  },
  {
    id: "hs-devices-3yr",
    label: "Workplace devices",
    x: 82.5,
    y: 49,
    categories: ["R"],
    fact: "Regular device renewal every three years across the workforce.",
    onTheImage:
      "A speech bubble over the boardroom noting the three-year renewal cycle.",
  },
  {
    id: "hs-basement",
    label: "Basement storage",
    x: 31,
    y: 89,
    categories: ["R"],
    fact: "Many old devices are stored unused in the basement.",
    onTheImage:
      "A pile of old monitors, towers and keyboards under a single hanging lamp.",
  },
  {
    id: "hs-print",
    label: "Print area",
    x: 57.5,
    y: 63,
    categories: ["R", "Em"],
    fact: "High volume of printing.",
    onTheImage:
      "Two copiers beside stacks of paper reaching desk height, with staff feeding them.",
  },
  {
    id: "hs-procurement",
    label: "Procurement desk",
    x: 43,
    y: 86,
    categories: ["G"],
    fact: "There are no rules for procurement or device service life.",
    onTheImage: "A post sign standing at the edge of the basement.",
  },
  {
    id: "hs-boardroom",
    label: "Boardroom",
    x: 85.5,
    y: 64,
    categories: ["G"],
    fact: "No sustainability strategy in IT.",
    onTheImage:
      "Four people around a glass-walled meeting table, one of them presenting.",
  },
  {
    id: "hs-project-lens",
    label: "Project intake board",
    x: 88.5,
    y: 84,
    categories: ["G"],
    fact: "IT projects are assessed only in terms of functionality and speed.",
    onTheImage:
      "A projector screen in the room at the lower right, read out by a presenter.",
  },
];

/**
 * Clickable regions drawn into the artwork itself, so the illustration can
 * carry the brief and the legend instead of a sidebar repeating them.
 * All four values are percentages of the image box.
 */
export type Zone = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

/** The building carrying the MediPrint logo. */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "MediPrint Solutions — company brief and context",
  x: 24,
  y: 9,
  w: 17,
  h: 36,
};

/** The five category arrows already printed down the left of the artwork. */
export const CATEGORY_ZONES: (Zone & { code: CategoryCode })[] = [
  { id: "zone-cat-e", code: "E", label: "Topic area: Energy", x: 2.5, y: 19.5, w: 16, h: 8.5 },
  { id: "zone-cat-r", code: "R", label: "Topic area: Resources", x: 2.5, y: 28, w: 16, h: 8.5 },
  { id: "zone-cat-em", code: "Em", label: "Topic area: Emissions", x: 2.5, y: 37.5, w: 16, h: 8.5 },
  { id: "zone-cat-u", code: "U", label: "Topic area: Use", x: 2.5, y: 47.5, w: 16, h: 8.5 },
  {
    id: "zone-cat-g",
    code: "G",
    label: "Topic area: Organisation & Governance",
    x: 2.5,
    y: 57.5,
    w: 16,
    h: 10,
  },
];
