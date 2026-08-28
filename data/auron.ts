// Case C — Auron Digital Group. Task 4, level L3.
// N1: every fact string ships verbatim from the case description.
// Section 12 — pre-metric: capacity is counted in abstract points, never in
// currency, kWh or CO2. The shortfall is the exercise, not a missing figure.

import type { CaseBrief, ContextTile, HeroImage, Hotspot, Zone } from "./case-shared";

export const HERO_IMAGE: HeroImage = {
  src: "/assets/auron-hero.jpeg",
  width: 2048,
  height: 1117,
  alt:
    "Case study board for Auron Digital Group. On the left, the company: a growing skyline with several site codes and a construction crane, rising growth arrows, a crowd of customers and board members holding signs, a glowing electricity meter, a pile of mismatched servers in tangled cabling, and Maya, the IT strategy lead. On the right, six titled panels showing a fast-growing business model, conflicting goals across departments, incomplete data, a limited budget, time pressure from a reporting deadline, and a celebration over a server labelled green that is only symbolic.",
};

export const BRIEF: CaseBrief = {
  name: "Auron Digital Group",
  lines: [
    "You take the role of IT strategy leader or CTO consultant for Auron Digital Group. The company is growing fast, has several sites, rising energy costs, a non-uniform IT landscape, and increasing pressure from customers and the supervisory board to address sustainability in a way that can be traced.",
    "Maya, the IT strategy lead drawn at the centre of the board, is the person whose desk this lands on. From here, the decisions are yours.",
  ],
};

/** What the role is expected to produce. Stated up front so the task is not a guessing game. */
export const DELIVERABLE =
  "A management proposal that is ready to be decided on.";

export const CONTEXT: ContextTile[] = [
  { id: "ctx-role", text: "Your role: IT strategy leader / CTO consultant." },
  { id: "ctx-sites", text: "Several sites, drawn as site codes across the skyline." },
  { id: "ctx-trace", text: "Sustainability must be addressed traceably, not asserted." },
];

/** The board's title banner, which names the company and the status. */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "Auron Digital Group — the big picture and your role",
  x: 2,
  y: 12.5,
  w: 41,
  h: 6,
};

/**
 * Ten findings. Six are the titled panels down the right — the framework
 * conditions the decision has to survive. Four are points on the company
 * scene, which carries the state of the IT itself.
 *
 * Most of the panels tag as Organisation & Governance. That is not a tagging
 * failure: at L3 the subject is how decisions get made, not what the hardware
 * draws. The category filter is meant to show that.
 */
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-growth-model",
    label: "Fast-growing business model",
    x: 65.5,
    y: 21.5,
    panel: { x: 54.5, y: 7.3, w: 22, h: 28.4 },
    categories: ["G", "E"],
    fact: "A fast-growing business model.",
    onTheImage:
      "A rising chart on the wall and staff moving at speed, with growth treated as the given condition.",
  },
  {
    id: "hs-conflicting-goals",
    label: "Conflicting goals",
    x: 88.4,
    y: 21.5,
    panel: { x: 77.2, y: 7.3, w: 22.3, h: 28.4 },
    categories: ["G"],
    fact: "Differing interests between IT, purchasing, finance and management.",
    onTheImage:
      "Five people around one table calling for profit, new technology, lower cost and affordability at once, labelled management and purchasing.",
  },
  {
    id: "hs-incomplete-data",
    label: "Incomplete data",
    x: 65.5,
    y: 52.3,
    panel: { x: 54.5, y: 36.7, w: 22, h: 31.1 },
    categories: ["G"],
    fact: "The data situation is incomplete.",
    onTheImage:
      "A half-filled spreadsheet and a dashboard of broken readings, with question marks where the values should be.",
  },
  {
    id: "hs-limited-budget",
    label: "Limited budget",
    x: 88.4,
    y: 52.3,
    panel: { x: 77.2, y: 36.7, w: 22.3, h: 31.1 },
    categories: ["G"],
    fact: "The budget is limited.",
    onTheImage:
      "A safe holding a small amount of money, with competing requests for Green IT, energy and reports pointing at it.",
  },
  {
    id: "hs-time-pressure",
    label: "Time pressure from market demands",
    x: 65.5,
    y: 84.1,
    panel: { x: 54.5, y: 68.7, w: 22, h: 30.8 },
    categories: ["G"],
    fact: "Time pressure from market demands and reporting obligations.",
    onTheImage:
      "A clock beside a sustainability reporting deadline marked as due now.",
  },
  {
    id: "hs-symbolic",
    label: "Quick success and the risk of symbolic action",
    x: 88.4,
    y: 84.1,
    panel: { x: 77.2, y: 68.7, w: 22.3, h: 30.8 },
    categories: ["G"],
    fact:
      "A desire for quick success, together with the danger of symbolic single actions.",
    onTheImage:
      "Confetti over a server with a green label stuck on it, and an unconvinced colleague calling it only symbolic.",
  },
  {
    id: "hs-multi-site",
    label: "Growth across several sites",
    x: 20,
    y: 30,
    categories: ["E", "Em"],
    fact: "The company is growing fast and operates several sites.",
    onTheImage:
      "A skyline still under construction, with site codes floating over it and growth arrows climbing through.",
  },
  {
    id: "hs-stakeholders",
    label: "Customer and board pressure",
    x: 42,
    y: 31,
    categories: ["G"],
    fact:
      "Increasing pressure from customers and the supervisory board to address sustainability in a way that can be traced.",
    onTheImage:
      "A crowd holding signs reading sustainability now and funding for reports, labelled customers and board members.",
  },
  {
    id: "hs-uneven-it",
    label: "Non-uniform IT landscape",
    x: 13,
    y: 80,
    categories: ["R", "U"],
    fact: "The IT landscape is not uniform.",
    onTheImage:
      "A pile of mismatched servers and boxes of different generations, joined by tangled cabling.",
  },
  {
    id: "hs-energy-costs",
    label: "Rising energy costs",
    x: 29,
    y: 78,
    categories: ["E"],
    fact: "Energy costs are rising.",
    onTheImage:
      "A large electricity meter glowing at the centre of the scene, its needle swung well up the dial.",
  },
];

// ---------------------------------------------------------------------------
// Task 4 — the assignment printed under the board.
// ---------------------------------------------------------------------------

export const TASK4 = {
  number: "Task 4 · Level 3 — Management decision",
  title: "Building a Green IT decision architecture for a growing company",
  lead:
    "Draw up a management proposal that is ready to be decided on. The board above holds every condition it has to survive. There is no configuration that satisfies all of them, and the capacity below does not cover the requirement. That is the task, not a fault in it.",
  assignment: [
    {
      id: "t4-1",
      text: "Why is Green IT strategically relevant for this company?",
      hint: "Strategically, not technically. If your answer would read the same for any company, it is not yet about Auron.",
    },
    {
      id: "t4-2",
      text: "By what criteria should Green IT decisions be taken in future?",
      hint: "Criteria outlast measures. These are what the next decision gets judged against once you have left the room.",
    },
    {
      id: "t4-3",
      text: "Which three core decisions must management take?",
      hint: "Three that only management can take. Anything the IT department could decide alone does not belong here.",
    },
    {
      id: "t4-4",
      text: "Where do the most important goal conflicts lie between sustainability, economic value, speed and user demands?",
      hint: "Name a conflict with two legitimate sides. If your sentence resolves itself, you have named a preference, not a conflict.",
    },
    {
      id: "t4-5",
      text: "Which decision must be taken now despite incomplete information?",
      hint: "Waiting is also a decision, and it also has a price. If you defer, say what the deferral costs.",
    },
    {
      id: "t4-6",
      text: "How should responsibility be divided organisationally?",
      hint: "Who decides, who delivers, who reports. Expertise without authority produces advice, not steering.",
    },
    {
      id: "t4-7",
      text: "What does a prioritised 12-month roadmap look like?",
      hint: "Prioritised means some things sit late on purpose. The allocation panel below is where you commit to that.",
    },
  ],
  seniorHeading: "Senior-level requirement",
  senior:
    "Take at least one decision that you consciously answer for under incomplete information, and explain it from a management perspective.",
  objectiveHeading: "Objective",
  objectives: [
    "Think in the logic of steering, not in single measures.",
    "Take responsibility for goal conflicts.",
    "Justify decisions in a way that is fit for management.",
    "Shift perspective into the roles of chief officer, architect, department head, manager and consultant.",
    "Move from memorised knowledge towards decision architecture and accountability.",
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

/** Six measures costing sixteen against a capacity of ten. Six must go unfunded. */
export const MEASURES: Measure[] = [
  {
    id: "m-owner",
    title: "Appoint a Green IT owner with decision rights",
    cost: 1,
    buys:
      "One named person who can settle a question between IT, purchasing and finance without escalating it.",
    exposes:
      "Every conflict on the board stays unresolved by design. The four departments keep their own definitions of what counts as a good decision.",
  },
  {
    id: "m-baseline",
    title: "Baseline across all sites: energy and device inventory",
    cost: 3,
    buys:
      "A first picture of what is actually running and how old it is, in a landscape that is not uniform.",
    exposes:
      "You continue to decide on the incomplete data the board already shows, and you cannot size any later measure or prove any later saving.",
  },
  {
    id: "m-procurement",
    title: "Procurement criteria and supplier requirements",
    cost: 2,
    buys:
      "A rule that applies at the moment of buying, which is the only moment a device's lifetime is actually set.",
    exposes:
      "Growth keeps adding to the non-uniform landscape at the same rate as before. The problem gets larger while you work on it.",
  },
  {
    id: "m-lifetime",
    title: "Device lifetime extension programme",
    cost: 3,
    buys:
      "Longer service life on equipment that already exists, which is the clearest resource effect available here.",
    exposes:
      "The most visible waste on the board goes unaddressed, and it is the one your own staff can see every day.",
  },
  {
    id: "m-infrastructure",
    title: "Infrastructure and cloud optimisation",
    cost: 4,
    buys:
      "Work on the consumption itself, where the rising energy cost on the board originates.",
    exposes:
      "The largest energy lever stays untouched, and the cost curve the board shows continues upward through the year.",
  },
  {
    id: "m-reporting",
    title: "Integration into ESG and sustainability reporting",
    cost: 3,
    buys:
      "The traceable statement the customers and the supervisory board are asking for, on the reporting deadline that is already running.",
    exposes:
      "The deadline in panel five arrives with nothing behind it. The pressure that started this work is the pressure you have not answered.",
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
