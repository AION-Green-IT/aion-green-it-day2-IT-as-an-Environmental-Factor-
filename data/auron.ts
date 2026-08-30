// Case C — Artemis Digital Industries. Day 2 Level-3 assignment.
// N1: every fact string ships verbatim from the case description.
// Section 12 — pre-metric: capacity is counted in abstract points, never in
// currency, kWh or CO2. The shortfall is the exercise, not a missing figure.
// The route id stays /case/auron for stable links; the content is Artemis.

import type { CaseBrief, ContextTile, HeroImage, Hotspot, Zone } from "./case-shared";

export const HERO_IMAGE: HeroImage = {
  src: "/assets/artemis-hero.svg",
  width: 2048,
  height: 1117,
  alt:
    "Case study board for Artemis Digital Industries. On the left, the company: a growing skyline of several sites, a hybrid IT structure, decentralised procurement and a meter showing rising operating costs. On the right, six titled panels holding the conditions the decision must survive: differing departmental interests, high availability and performance, incomplete data transparency, budget and short-term expectation, historically grown routines, and a warning that sustainability must not remain symbolic politics.",
  // Compare with an AI illustration: generate from docs/hero-image-prompts.md,
  // save as public/assets/artemis-hero.jpeg, then uncomment the next line.
  // raster: "/assets/artemis-hero.jpeg",
};

export const BRIEF: CaseBrief = {
  name: "Artemis Digital Industries",
  lines: [
    "You take on the role of head of IT strategy / CIO advisor for Artemis Digital Industries. The company is growing, operates hybrid IT structures, procures in a decentralised way, has rising operating costs, and is under increasing pressure to reduce environmental impacts in a comprehensible way without jeopardising the performance of IT.",
    "From here, the decisions are yours: management wants a proposal it can decide on.",
  ],
};

/** What the role is expected to produce. Stated up front so the task is not a guessing game. */
export const DELIVERABLE = "A proposal for management, ready for decision.";

export const CONTEXT: ContextTile[] = [
  { id: "ctx-role", text: "Your role: head of IT strategy / CIO advisor." },
  { id: "ctx-hybrid", text: "Hybrid IT, procured in a decentralised way." },
  { id: "ctx-visible", text: "Sustainability must become visible, not remain symbolic politics." },
];

/** The board's title banner, which names the company and the role. */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "Artemis Digital Industries — the big picture and your role",
  x: 2,
  y: 12.5,
  w: 41,
  h: 6,
};

/**
 * Ten findings. Six are the titled panels down the right — the conditions the
 * decision has to survive. Four are points on the company scene, the state of
 * the IT itself.
 *
 * At L3 the findings cut across the five areas rather than sitting inside one:
 * management is above the areas and decides how they trade off. The category
 * filter is meant to show that.
 */
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-interests",
    label: "Differing departmental interests",
    x: 65.5,
    y: 21.5,
    panel: { x: 54.5, y: 7.3, w: 22, h: 28.4 },
    categories: ["Op", "Pr"],
    fact: "Differing interests of IT operations, purchasing, finance and management.",
    onTheImage:
      "A titled panel over four figures pulling the same decision in four directions.",
  },
  {
    id: "hs-availability",
    label: "High availability & performance",
    x: 88.4,
    y: 21.5,
    panel: { x: 77.2, y: 7.3, w: 22.3, h: 28.4 },
    categories: ["Op", "U"],
    fact: "High requirements for availability and performance.",
    onTheImage: "A titled panel over a 24/7 service dial held near its ceiling.",
  },
  {
    id: "hs-data",
    label: "Incomplete data transparency",
    x: 65.5,
    y: 52.3,
    panel: { x: 54.5, y: 36.7, w: 22, h: 31.1 },
    categories: ["Op"],
    fact: "Incomplete data transparency on consumption and inventories.",
    onTheImage: "A titled panel over a dashboard with question marks where values should be.",
  },
  {
    id: "hs-budget",
    label: "Budget & short-term expectation",
    x: 88.4,
    y: 52.3,
    panel: { x: 77.2, y: 36.7, w: 22.3, h: 31.1 },
    categories: ["Pr"],
    fact: "Budget restrictions and the expectation of short-term results.",
    onTheImage: "A titled panel over a small budget with several claims pointing at it.",
  },
  {
    id: "hs-routines",
    label: "Historically grown routines",
    x: 65.5,
    y: 84.1,
    panel: { x: 54.5, y: 68.7, w: 22, h: 30.8 },
    categories: ["Rp", "Pr"],
    fact: "Existing replacement and procurement routines have grown historically.",
    onTheImage: "A titled panel over a worn process diagram nobody has revisited.",
  },
  {
    id: "hs-symbolic",
    label: "Must not remain symbolic",
    x: 88.4,
    y: 84.1,
    panel: { x: 77.2, y: 68.7, w: 22.3, h: 30.8 },
    categories: ["Op"],
    fact: "Sustainability should become visible, but must not remain mere symbolic politics.",
    onTheImage: "A titled panel over a green sticker on a server, and an unconvinced colleague.",
  },
  {
    id: "hs-growth",
    label: "Growing, several sites",
    x: 13,
    y: 80,
    categories: ["Op"],
    fact: "The company is growing and operates across several sites.",
    onTheImage: "A skyline of several buildings still under construction.",
  },
  {
    id: "hs-hybrid",
    label: "Hybrid IT structure",
    x: 20,
    y: 30,
    categories: ["Op"],
    fact: "The company operates hybrid IT structures.",
    onTheImage: "A cloud joined to local infrastructure over the scene.",
  },
  {
    id: "hs-decentralised",
    label: "Decentralised procurement",
    x: 42,
    y: 31,
    categories: ["Pr"],
    fact: "The company procures in a decentralised way.",
    onTheImage: "Separate buying happening at each site, drawn as parallel inputs.",
  },
  {
    id: "hs-costs",
    label: "Rising operating costs",
    x: 29,
    y: 78,
    categories: ["Op"],
    fact: "The company has rising operating costs.",
    onTheImage: "A meter at the centre of the scene, its needle swung well up the dial.",
  },
];

// ---------------------------------------------------------------------------
// The Level-3 assignment printed under the board.
// ---------------------------------------------------------------------------

export const TASK4 = {
  number: "Level 3 · Management decision",
  title: "Developing a management proposal for reducing energy and resource consumption",
  lead:
    "Draw up a proposal for management, ready for decision. The board above holds every condition it has to survive. There is no configuration that satisfies all of them, and the capacity below does not cover the requirement. That is the task, not a fault in it.",
  assignment: [
    {
      id: "t4-1",
      text: "A management view of why energy and resource consumption in IT are strategically relevant.",
      hint: "Strategically, not technically. If your answer would read the same for any company, it is not yet about Artemis.",
    },
    {
      id: "t4-2",
      text: "Name the three most important decision fields for the next twelve months.",
      hint: "Three that only management can settle. Anything the IT department could decide alone does not belong here.",
    },
    {
      id: "t4-3",
      text: "Develop a decision logic according to which measures are to be prioritised.",
      hint: "A logic outlasts a list. It is what the next decision gets judged against once you have left the room.",
    },
    {
      id: "t4-4",
      text: "Analyse the central trade-offs between efficiency, investment, usability, availability and sustainability.",
      hint: "Name a conflict with two legitimate sides. If your sentence resolves itself, you have named a preference, not a conflict.",
    },
    {
      id: "t4-5",
      text: "Recommend a first prioritised line of measures, with justification.",
      hint: "Prioritised means some things sit late on purpose. The allocation panel below is where you commit to that.",
    },
    {
      id: "t4-6",
      text: "Propose responsibilities, management and review mechanisms.",
      hint: "Who decides, who delivers, who reports, and on what rhythm. Expertise without authority produces advice, not steering.",
    },
    {
      id: "t4-7",
      text: "Name at least one decision that should be taken immediately despite an incomplete information situation.",
      hint: "Waiting is also a decision, and it also has a price. If you defer, say what the deferral costs.",
    },
  ],
  seniorHeading: "Senior-level requirement",
  senior:
    "Work not only with individual measures, but with a robust decision architecture. Justify how a prioritisation suitable for management emerges from a multitude of possible measures.",
  objectiveHeading: "Objective",
  objectives: [
    "Think in management logics instead of isolated technical measures.",
    "Understand energy and resource questions as a leadership task.",
    "Take responsibility for trade-offs and priorities.",
    "Shift perspective into the roles of chief officer, architect, department head, manager and consultant.",
    "Move from merely recognising problems towards a viable decision architecture.",
  ],
};

// ---------------------------------------------------------------------------
// The allocation. Capacity is deliberately short of the requirement.
// ---------------------------------------------------------------------------

export const CAPACITY_TOTAL = 10;

export type Measure = {
  id: string;
  title: string;
  cost: number;
  /** What funding it buys. */
  buys: string;
  /** What stays open if it is left out. Never a scolding. */
  exposes: string;
};

/** Seven measures costing eighteen against a capacity of ten. Some must go unfunded. */
export const MEASURES: Measure[] = [
  {
    id: "m-owner",
    title: "Appoint a sustainable-IT owner with decision rights",
    cost: 1,
    buys:
      "One named person who can settle a question between IT, purchasing and finance without escalating it.",
    exposes:
      "Every conflict on the board stays unresolved by design. The four functions keep their own definitions of a good decision.",
  },
  {
    id: "m-baseline",
    title: "Baseline across all sites: consumption and device inventory",
    cost: 3,
    buys:
      "A first picture of what is actually running and how old it is, in a landscape that is not uniform.",
    exposes:
      "You keep deciding on the incomplete data the board already shows, and cannot size any later measure or prove any later saving.",
  },
  {
    id: "m-rules",
    title: "Binding energy and usage rules (shutdown and operating)",
    cost: 2,
    buys:
      "The small, visible waste stopped now — devices and infrastructure that run when nobody benefits.",
    exposes:
      "The estate keeps running outside usage hours, and the first result the board asked for does not appear.",
  },
  {
    id: "m-consolidate",
    title: "Consolidate low-utilisation systems and review the operating model",
    cost: 4,
    buys:
      "Work on the largest idle-capacity waste, where the rising operating cost on the board originates.",
    exposes:
      "The biggest energy lever stays untouched, and the cost curve the board shows continues upward through the year.",
  },
  {
    id: "m-servicelife",
    title: "Device service-life extension through repair and reuse",
    cost: 3,
    buys:
      "Longer service life on equipment that already exists — the clearest resource effect available here.",
    exposes:
      "The historically grown replacement routine keeps discarding usable devices on the calendar.",
  },
  {
    id: "m-procurement",
    title: "Procurement criteria with a life-cycle perspective",
    cost: 2,
    buys:
      "A rule that applies at the moment of buying, which is the only moment a device's lifetime is actually set.",
    exposes:
      "Decentralised buying keeps adding to the non-uniform landscape at the same rate as before.",
  },
  {
    id: "m-reporting",
    title: "Integration into ESG and sustainability reporting",
    cost: 3,
    buys:
      "The traceable statement customers and the board are asking for, on the reporting pressure already running.",
    exposes:
      "Sustainability stays a claim rather than a visible, evidenced position — the case's stated failure mode.",
  },
];

/** Read back after allocating. No ranking, no score — consequence only. */
export const ALLOCATION_NOTES = {
  underspent:
    "Capacity is left unused. Unspent capacity is not saved for later in this exercise — it is simply not used.",
  overspent:
    "This is over capacity. The exercise does not let you fund everything, which is the condition management is actually in.",
  complete:
    "Capacity is committed. What you left out is now the substance of your proposal, not an omission from it.",
  noOwner:
    "You funded work without funding anyone to own it. That is a defensible choice under a hard budget, and it is also the case's stated failure mode — say which it is in your justification.",
  ownerOnly:
    "You funded the ability to steer and little else. Management asked for results, so the proposal now has to explain what the first six months produce.",
};

export const POSTPONED_PROMPT = {
  heading: "The measure you consciously postponed",
  intro:
    "Name the one you left out that you expect to be challenged on, and say what the postponement costs. The shortfall was built into this task, so an answer that gives nothing up has not finished it.",
  placeholder:
    "I postponed ... . It costs us ... . I would bring it forward if ... .",
};
