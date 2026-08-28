// Case B — NordCom Services GmbH. Task 3, level L2.
// N1: every fact string ships verbatim from the case description.
// N3: nothing here may leak into /learn or /training.

import type { CaseBrief, ContextTile, HeroImage, Hotspot, Zone } from "./case-shared";

export const HERO_IMAGE: HeroImage = {
  src: "/assets/nordcom-hero.jpeg",
  width: 2048,
  height: 1117,
  alt:
    "Case study board for NordCom Services GmbH. On the left, the company: an office building in a city, a diagram joining cloud services and a small internal data centre to decentralised procurement, and a manager holding papers marked cost pressure, supply chain issues and high project load. On the right, six titled panels showing high energy use, rapid device replacement, procurement without green criteria, missing Green IT KPIs, pressure from a large customer, and a demand for quick results rather than symbolic gestures.",
};

export const BRIEF: CaseBrief = {
  name: "NordCom Services GmbH",
  lines: [
    "A mid-size IT service provider with 600 employees. The company runs a hybrid IT structure, uses cloud services, operates a small internal data centre, and procures user devices decentrally.",
    "On the customer side, the demand for evidence of sustainability keeps rising. At the same time there is cost pressure, supply bottlenecks and a high project load.",
  ],
};

/** The pressures drawn on the papers in the manager's hands. Not findings — the setting. */
export const CONTEXT: ContextTile[] = [
  { id: "ctx-cost", text: "Cost pressure." },
  { id: "ctx-supply", text: "Supply bottlenecks." },
  { id: "ctx-projects", text: "High project load." },
];

/** The company block on the left of the board: building, profile tag and city. */
export const COMPANY_ZONE: Zone = {
  id: "zone-company",
  label: "NordCom Services GmbH — company brief and context",
  x: 3,
  y: 15.5,
  w: 20,
  h: 37,
};

/**
 * Nine findings. Six are the titled panels down the right of the board, so the
 * panel itself is the click target. Three are points on the company scene,
 * which is drawn as one continuous illustration and has no panel borders.
 *
 * Order is the contract: the list view and the board share it.
 */
export const HOTSPOTS: Hotspot[] = [
  {
    id: "hs-energy",
    label: "High energy use",
    x: 65.1,
    y: 17.6,
    panel: { x: 53.7, y: 1.1, w: 22.8, h: 33 },
    categories: ["E"],
    fact: "High electricity consumption in internal IT operations.",
    onTheImage:
      "A manager holds an energy bill beside a rising bar chart, with the server room lit behind her.",
  },
  {
    id: "hs-devices",
    label: "Rapid device replacement",
    x: 88.5,
    y: 17.6,
    panel: { x: 77.2, y: 1.1, w: 22.5, h: 33 },
    categories: ["R", "U"],
    fact: "User devices are replaced frequently although they are still technically usable.",
    onTheImage:
      "Stacked laptops tagged for disposal after only two years of use, while a colleague still works on an older one.",
  },
  {
    id: "hs-procurement",
    label: "Procurement without green criteria",
    x: 65.1,
    y: 51.1,
    panel: { x: 53.7, y: 34.8, w: 22.8, h: 32.6 },
    categories: ["G", "R"],
    fact: "Sustainability criteria are absent from IT procurement.",
    onTheImage:
      "Two buyers compare laptops on price and delivery speed, with ecolabels and efficiency set aside.",
  },
  {
    id: "hs-kpi",
    label: "No Green IT KPIs and no accountability",
    x: 88.5,
    y: 51.1,
    panel: { x: 77.2, y: 34.8, w: 22.5, h: 32.6 },
    categories: ["G"],
    fact: "There are no Green IT KPIs and no clear responsibility.",
    onTheImage:
      "A blank whiteboard headed Green IT Report, and nobody in the room able to say who owns it.",
  },
  {
    id: "hs-customer",
    label: "Pressure from a large customer",
    x: 65.1,
    y: 83.7,
    panel: { x: 53.7, y: 68.3, w: 22.8, h: 30.7 },
    categories: ["G"],
    fact:
      "A large customer demands reliable statements about the contribution of IT to sustainability.",
    onTheImage:
      "A customer on a video call asking for clear proof of Green IT, with the alternative named: another vendor.",
  },
  {
    id: "hs-quick-results",
    label: "Quick results, not symbolic politics",
    x: 88.5,
    y: 83.7,
    panel: { x: 77.2, y: 68.3, w: 22.5, h: 30.7 },
    categories: ["G"],
    fact: "Management wants quick results, but not symbolic politics.",
    onTheImage:
      "A manager asking for quick and real results rather than empty public relations.",
  },
  {
    id: "hs-hybrid",
    label: "Hybrid IT structure",
    x: 37.5,
    y: 26,
    categories: ["E", "Em"],
    fact:
      "The company runs a hybrid IT structure: cloud services alongside a small internal data centre.",
    onTheImage:
      "A diagram joining a cloud and a server cabinet, with arrows running into the same small data centre.",
  },
  {
    id: "hs-decentralised",
    label: "Decentralised procurement",
    x: 48,
    y: 27.5,
    categories: ["G"],
    fact: "User devices are procured decentrally.",
    onTheImage:
      "Two colleagues choosing devices at their own desk, drawn as a third input to the same IT structure.",
  },
  {
    id: "hs-demand",
    label: "Rising customer demand",
    x: 31,
    y: 89,
    categories: ["G"],
    fact: "On the customer side, the demand for evidence of sustainability keeps rising.",
    onTheImage:
      "A banner across the foot of the company scene, above a growing stack of customer paperwork.",
  },
];

// ---------------------------------------------------------------------------
// Task 3 — the assignment printed under the board.
// ---------------------------------------------------------------------------

export const TASK3 = {
  number: "Task 3 · Level 2 — Application",
  title: "Green IT between cost pressure and competitiveness",
  lead:
    "You advise the management of NordCom Services GmbH. Everything you need is on the board above: nine findings and the setting they sit in. Nothing else is given, and nothing else is needed.",
  assignment: [
    {
      id: "t3-1",
      text: "Analyse the initial situation from the perspectives of operations, procurement, use, governance and competitiveness.",
      hint: "Five perspectives, nine findings. A finding may belong to more than one, and one perspective may hold several.",
    },
    {
      id: "t3-2",
      text: "Identify four action areas that become priorities.",
      hint: "Group the findings. Four areas, not nine measures — if you end up with nine you have listed symptoms, not areas.",
    },
    {
      id: "t3-3",
      text: "Draw up an initial Green IT recommendation for management, with short-term and medium-term steps.",
      hint: "Short-term means startable now with the people already here. Medium-term means it needs a decision, a budget or a supplier.",
    },
    {
      id: "t3-4",
      text: "Decide which step should be carried out first.",
      hint: "One step. The panel below records your choice and answers back before you see the key.",
    },
    {
      id: "t3-5",
      text: "Justify your decision with regard to impact, risk and feasibility.",
      hint: "All three. A step with high impact and no feasibility is a wish, not a decision.",
    },
    {
      id: "t3-6",
      text: "Formulate a proposal for anchoring responsibility and control organisationally.",
      hint: "Who decides, who reports, and on what rhythm. A name without a reporting line is not an anchor.",
    },
  ],
  objectiveHeading: "Objective",
  objective:
    "Participants learn to analyse Green IT in a way that is fit for management, not merely to review it technically.",
};

/** The four action areas the key proposes. The learner picks which runs first. */
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
    id: "aa-governance",
    title: "Establish Green IT governance with clear roles and a target picture",
    summary:
      "Appoint someone responsible, define minimum indicators, and agree what the company is steering towards.",
    strength:
      "It creates the basis on which every later decision is made, and it is the only measure here that costs almost nothing to start.",
    tradeoff:
      "It produces no visible saving in the first weeks. Management asked for quick results, and a role description does not look like one. If you choose this, attach the baseline to it so your first deliverable is a number rather than an org chart.",
  },
  {
    id: "aa-transparency",
    title: "Create transparency over energy and resource use",
    summary:
      "Record what the internal data centre draws, and what devices exist across the sites and how old they are.",
    strength:
      "It answers the customer with evidence instead of intent, and it is what turns every later claim into a defensible one.",
    tradeoff:
      "Numbers with no owner land on nobody's desk. Without the roles agreed alongside, a baseline gets collected once, is read by the person who collected it, and is out of date before anyone acts on it.",
  },
  {
    id: "aa-procurement",
    title: "Prepare sustainable procurement and extend device life cycles",
    summary:
      "Draft procurement guidelines, and set a lifetime strategy for devices that are replaced while still usable.",
    strength:
      "It addresses the most visible waste on the board, and device lifetime is the lever with the clearest resource effect.",
    tradeoff:
      "Procurement here is decentralised. A guideline issued into that structure is a document, not a control — until someone holds the authority to apply it, each team keeps buying the way it already buys.",
  },
  {
    id: "aa-infrastructure",
    title: "Optimise infrastructure and cloud use step by step",
    summary:
      "Work through the hybrid structure: what runs in the small data centre, what runs in the cloud, and what runs twice.",
    strength:
      "This is where the energy consumption on the board actually sits, so the ceiling on what can be saved is highest here.",
    tradeoff:
      "It is an investment decision, and you have no baseline to size it against. Choosing this first is exactly the hurried single investment the case warns about: if it works you cannot prove it, and if it misses you cannot say by how much.",
  },
];

export const KEY = {
  core:
    "The greatest leverage does not lie in a single hurried investment, but first in building the ability to steer.",
  firstStep:
    "Build Green IT governance together with baseline collection, before larger investments are made.",
  reasons: [
    "It creates a basis for decisions.",
    "It prevents misinvestment.",
    "It makes it possible to set priorities.",
    "It improves the ability to argue internally and externally.",
  ],
  shortTerm: [
    "Appoint someone responsible.",
    "Define minimum indicators.",
    "Record the device inventory and service lives.",
    "Draft procurement guidelines.",
  ],
  mediumTerm: [
    "A lifetime strategy for devices.",
    "Energy optimisation in IT operations.",
    "Integration into ESG and sustainability reporting.",
    "An investment roadmap for the prioritised measures.",
  ],
  /** Said out loud so the key is not read as a verdict on the other three. */
  honesty:
    "The other three areas are not wrong, and two of them carry more measurable effect than this one. They are not first because none of them can be sized, defended or enforced until this one exists.",
};
