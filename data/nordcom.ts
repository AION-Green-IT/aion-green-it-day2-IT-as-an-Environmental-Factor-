// Case B — NetCore Manufacturing Services GmbH. Day 2 case study (L2 -> L3).
// N1: every fact string ships verbatim from the case description.
// N3: nothing here may leak into /learn or /training.
// The route id stays /case/nordcom for stable links; the content is NetCore.

import type { CaseBrief, ContextTile, HeroImage, Hotspot, Zone } from "./case-shared";

export const HERO_IMAGE: HeroImage = {
  src: "/assets/netcore-hero.jpeg",
  width: 2752,
  height: 1536,
  alt:
    "Illustrated case-study board for NetCore Manufacturing Services GmbH. On the left, the company across three sites, joined by a cloud, with a 24/7 shield for availability. On the right, six panels: servers at low utilisation, monitors left on in a dark office, a calendar swapping laptops, a pile of retired devices, a buyer with price tags, and a blank dashboard.",
  // Version 2: the schematic SVG, reachable from the IMG/SVG toggle.
  schematic: "/assets/netcore-hero.svg",
};

export const BRIEF: CaseBrief = {
  name: "NetCore Manufacturing Services GmbH",
  lines: [
    "A medium-sized industrial company with 900 employees at three sites. The IT landscape has grown strongly in recent years: many workplace devices, several local server systems, increasing cloud use, high availability requirements and a growing rate of end-device replacement.",
    "Management notices rising IT costs, but has so far not developed a systematic view of environmental impacts. It requires a proposal on how IT costs and environmental impact can be improved together.",
  ],
};

/** The setting that frames the findings — not findings themselves. */
export const CONTEXT: ContextTile[] = [
  { id: "ctx-costs", text: "IT costs are rising." },
  { id: "ctx-availability", text: "High availability requirements." },
  { id: "ctx-mandate", text: "Management wants IT cost and environmental impact improved together." },
];

/** The company block on the left of the board. */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "NetCore Manufacturing Services GmbH — company brief and context",
  x: 3,
  y: 15.5,
  w: 20,
  h: 37,
  imgX: 6,
  imgY: 20,
  imgW: 17,
  imgH: 28,
};

/**
 * Eight findings. Six are titled panels down the right of the board, so the
 * panel itself is the click target. Two are points on the company scene.
 * Order is the contract: the list view and the board share it.
 */
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-lowutil",
    label: "Servers at low utilisation",
    x: 65.1,
    y: 17.6,
    panel: { x: 53.7, y: 1.1, w: 22.8, h: 33 },
    imgX: 62.3,
    imgY: 18.4,
    imgPanel: { x: 51.7, y: 3, w: 21.5, h: 30 },
    categories: ["Op"],
    lens: "energy",
    fact: "Numerous servers run with low utilisation.",
    onTheImage: "Top-left panel: a rack of servers with most activity lights dim.",
  },
  {
    id: "hs-afterhours",
    label: "Devices left on after hours",
    x: 88.5,
    y: 17.6,
    panel: { x: 77.2, y: 1.1, w: 22.5, h: 33 },
    imgX: 85.6,
    imgY: 18.8,
    imgPanel: { x: 76.7, y: 3, w: 21.5, h: 30 },
    categories: ["U"],
    lens: "energy",
    fact: "Workstation computers and monitors often remain in operation outside usage hours.",
    onTheImage: "Top-right panel: monitors still glowing in a dark, empty office.",
  },
  {
    id: "hs-fixedcycles",
    label: "Fixed replacement cycles",
    x: 65.1,
    y: 51.1,
    panel: { x: 53.7, y: 34.8, w: 22.8, h: 32.6 },
    imgX: 62.3,
    imgY: 51.1,
    imgPanel: { x: 51.7, y: 36.7, w: 21.5, h: 24.3 },
    categories: ["Rp"],
    lens: "resource",
    fact: "Devices are replaced in fixed cycles, regardless of their actual condition.",
    onTheImage: "Middle-left panel: a calendar swapping out laptops on a timer.",
  },
  {
    id: "hs-noreuse",
    label: "No repair or reuse concept",
    x: 88.5,
    y: 51.1,
    panel: { x: 77.2, y: 34.8, w: 22.5, h: 32.6 },
    imgX: 85.6,
    imgY: 51.5,
    imgPanel: { x: 76.7, y: 36.7, w: 21.5, h: 24.3 },
    categories: ["St"],
    lens: "resource",
    fact: "There is no repair or reuse concept.",
    onTheImage: "Middle-right panel: a pile of retired devices with no route onward.",
  },
  {
    id: "hs-priceonly",
    label: "Procurement on price alone",
    x: 65.1,
    y: 83.7,
    panel: { x: 53.7, y: 68.3, w: 22.8, h: 30.7 },
    imgX: 62.5,
    imgY: 80.2,
    imgPanel: { x: 51.7, y: 65, w: 21.5, h: 24.5 },
    categories: ["Pr"],
    lens: "resource",
    fact:
      "Procurement decisions are based almost exclusively on price, performance and availability of supply.",
    onTheImage: "Bottom-left panel: a buyer comparing price tags and a stopwatch.",
  },
  {
    id: "hs-nodata",
    label: "Sustainability data hardly available",
    x: 88.5,
    y: 83.7,
    panel: { x: 77.2, y: 68.3, w: 22.5, h: 30.7 },
    imgX: 85.6,
    imgY: 80.2,
    imgPanel: { x: 76.7, y: 65, w: 21.5, h: 24.5 },
    categories: ["Op"],
    lens: "both",
    fact: "Sustainability data on IT systems is hardly available.",
    onTheImage: "Bottom-right panel: a blank dashboard window with no figures.",
  },
  {
    id: "hs-cloud",
    label: "Increasing cloud use",
    x: 38,
    y: 24,
    imgX: 22.7,
    imgY: 49.7,
    categories: ["Op"],
    lens: "energy",
    fact: "Cloud use is increasing across the three sites.",
    onTheImage: "The cloud at the centre of the company scene, joining the sites.",
  },
  {
    id: "hs-availability",
    label: "High availability requirements",
    x: 44,
    y: 44,
    imgX: 46,
    imgY: 81,
    categories: ["Op"],
    lens: "energy",
    fact: "High availability requirements shape how the estate is run.",
    onTheImage: "The 24/7 shield on the company scene, lower centre.",
  },
];

// ---------------------------------------------------------------------------
// The case-study assignment printed under the board.
// ---------------------------------------------------------------------------

export const TASK3 = {
  number: "Case study · Level 2 → Management",
  title: "Energy and resource consumption in a growing IT landscape",
  lead:
    "You advise the management of NetCore Manufacturing Services GmbH. Everything you need is on the board above: eight findings and the setting they sit in. Management wants a proposal that improves IT costs and environmental impact together.",
  assignment: [
    {
      id: "t3-1",
      text: "Analyse the initial position along the perspectives of energy consumption, resource consumption, service life, operating model, procurement and management.",
      hint: "Six perspectives, eight findings. A finding may belong to more than one, and one perspective may hold several.",
    },
    {
      id: "t3-2",
      text: "Identify the four biggest levers for improvement.",
      hint: "Group the findings. Four levers, not eight measures — if you end up with eight you have listed symptoms, not levers.",
    },
    {
      id: "t3-3",
      text: "Develop a prioritised recommendation of measures for management.",
      hint: "A ranked recommendation, not an unconnected catalogue. The ranking is the point.",
    },
    {
      id: "t3-4",
      text: "Distinguish between short-term, medium-term and structural measures.",
      hint: "Short-term: startable now with the people here. Medium-term: needs a decision, budget or supplier. Structural: changes how decisions are made.",
    },
    {
      id: "t3-5",
      text: "Decide which measure should be implemented first, and justify this from a management point of view.",
      hint: "One measure. The panel below records your choice and answers back before you see the key.",
    },
    {
      id: "t3-6",
      text: "Formulate which data should be added later, but which decision can already be taken responsibly now.",
      hint: "Name what is missing and why you can still act — the whole case is a decision under incomplete data.",
    },
  ],
  objectiveHeading: "Objective",
  objective:
    "Participants learn to analyse and prioritise energy and resource consumption as integral parts of IT management.",
};

/** The four levers the key proposes. The learner picks which runs first. */
export type ActionArea = {
  id: string;
  title: string;
  summary: string;
  /** What the choice buys, stated without praise. */
  strength: string;
  /** What it costs or leaves open. Every option has one. */
  tradeoff: string;
};

export const ACTION_AREAS: ActionArea[] = [
  {
    id: "aa-consolidate",
    title: "Consolidate low-utilisation systems and review the operating model",
    summary:
      "Remove idle and duplicated capacity, and — with simple usage and shutdown rules — set when systems and devices run.",
    strength:
      "It attacks the energy on the board directly, costs little, shows a result within a quarter, and produces the transparency every later decision needs.",
    tradeoff:
      "Availability is the live concern: stage it, and keep a rollback for anything customer-facing. Consolidation also needs a first look at what actually runs where.",
  },
  {
    id: "aa-rules",
    title: "Introduce binding energy and usage rules for end devices and infrastructure",
    summary:
      "Agree shutdown, sleep and operating rules for workstations, monitors and infrastructure across the three sites.",
    strength:
      "Startable now, visible on the next bill, and it needs almost no capital — mostly a decision that sticks.",
    tradeoff:
      "Rules without the consolidation and baseline beside them cut the small, visible waste while the large, idle-capacity waste keeps running unmeasured.",
  },
  {
    id: "aa-servicelife",
    title: "Extend device service life through repair, reuse and condition-based replacement",
    summary:
      "Replace the fixed cycle with condition-based renewal, and set up a repair and reuse route for devices that still work.",
    strength:
      "Device service life is the lever with the clearest resource effect — it spends the embodied footprint over more years.",
    tradeoff:
      "It only bites at the next refresh decision, so the payback is medium-term. Support windows and battery wear are the real objections to answer.",
  },
  {
    id: "aa-procurement",
    title: "Adapt procurement criteria to include life cycle and sustainability aspects",
    summary:
      "Rewrite what devices and services are bought on, so life cycle and sustainability sit beside price, performance and supply.",
    strength:
      "It compounds: every future purchase inherits the new criteria rather than one.",
    tradeoff:
      "A criterion with no baseline behind it is hard to defend, and until someone holds authority to apply it, each site keeps buying the way it already buys.",
  },
];

export const KEY = {
  core:
    "The central task is not to optimise individual devices or systems in isolation, but to build a management model that integrates energy and resource efficiency into operating and procurement decisions.",
  firstStep:
    "As a first measure, run a transparency and consolidation initiative in ongoing operations, combined with simple usage and shutdown rules.",
  reasons: [
    "Effective in the short term.",
    "Comparatively easy to implement.",
    "Lower cost and risk than a blanket replacement of devices.",
    "Creates a basis for later, better investment decisions.",
    "Combines the cost and environmental perspectives.",
  ],
  shortTerm: [
    "Record essential consumption and inventory data.",
    "Shutdown and operating rules for end devices and infrastructure.",
    "Identify idle time, excess capacity and duplicate structures.",
  ],
  mediumTerm: [
    "Procurement guidelines with a life-cycle perspective.",
    "Extend usage cycles for suitable devices.",
    "Reuse and internal re-deployment.",
  ],
  structural: [
    "Anchor energy and resource criteria in IT architecture and investment decisions.",
    "Build management metrics and responsibilities.",
  ],
  /** Said out loud so the key is not read as a verdict on the other three. */
  honesty:
    "The other three levers are not wrong, and the service-life lever carries a larger resource effect than this one. They are not first because none of them can be sized, defended or enforced until transparency and consolidation exist.",
};
