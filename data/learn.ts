// Learn tab content. Section 7 of the build prompt.
// N3: nothing here may come from MediPrint, NordCom or Auron.
// Every example is generic or invented.

import type { CategoryCode } from "./categories";
import type { SourceKey } from "./sources";

/** A checkable fact from the field, so the widget teaches rather than asserts. */
export type FieldNote = { text: string; source?: SourceKey };

export type WidgetMeta = {
  id: string;
  title: string;
  /** One line telling the learner what they are about to do. */
  task: string;
  /** "What's in it for you" — why this is worth your time, in the learner's voice. */
  why: string;
  xp: number;
};

// ---------------------------------------------------------------- L1 · W1

export type RealCase = {
  id: string;
  headline: string;
  what: string;
  lesson: string;
  source: SourceKey;
};

export type ComparatorCard = {
  id: string;
  term: string;
  short: string;
  definition: string;
  boundary: string;
  inPractice: string;
  note?: FieldNote;
  /** Things that actually happened, so the definition is not just a definition. */
  cases?: RealCase[];
};

export const W1: WidgetMeta & { cards: ComparatorCard[]; closing: string } = {
  id: "w1",
  title: "Energy and resources — what the words actually mean",
  task: "Open all four cards. Read each boundary line before moving on.",
  why: "You'll hear “energy” used for four different things today. Once you can tell them apart, you can see which one a proposal actually reduces — and spot the ones that only sound green. This is the vocabulary the rest of the day builds on.",
  xp: 10,
  cards: [
    {
      id: "w1-direct-energy",
      term: "Direct energy",
      short: "Power the IT itself draws",
      definition:
        "Electricity consumed by the devices, servers, storage, network and cooling you operate — the consumption you can point a meter at.",
      boundary:
        "Direct energy stops at your own estate. The energy spent making the device, or running the cloud you rent, is indirect — a different lever entirely.",
      inPractice:
        "Your electricity bill. Levers: utilisation, operating time, setpoints, consolidation, shutdown rules.",
    },
    {
      id: "w1-indirect-energy",
      term: "Indirect energy",
      short: "Energy spent elsewhere on your behalf",
      definition:
        "Energy used to manufacture and transport your devices, and to run the external services — cloud, network — you depend on but do not meter.",
      boundary:
        "Indirect energy is not on your meter, but it is a consequence of your decisions. Most of a laptop's lifetime energy is spent before anyone switches it on.",
      inPractice:
        "Embodied energy, cloud, logistics. Levers: service life, procurement, region choice.",
      note: {
        text: "Manufacturing is roughly 75–85% of a laptop's lifetime carbon — about 80% is the figure usually quoted, against about 14% for use. Buying a more efficient laptop sooner can raise total impact rather than lower it.",
        source: "techCarbon",
      },
    },
    {
      id: "w1-resources",
      term: "Resource consumption",
      short: "The materials, not the power",
      definition:
        "The metals, rare earths, plastics, water and land committed to make, run and dispose of digital hardware across its whole life cycle.",
      boundary:
        "Energy and resources are not the same lever. A device can be cheap to run and expensive to make. Resource questions begin at procurement, not at disposal.",
      inPractice:
        "A life-cycle view, not a usage-phase one. Levers: reuse, refurbishment, longer service life, procurement criteria.",
      note: {
        text: "62 million tonnes of e-waste were generated in 2022, rising toward 82 million by 2030, while under a quarter is formally collected and recycled. The materials leave the economy long before the device stops being useful.",
        source: "ewaste",
      },
    },
    {
      id: "w1-sufficiency",
      term: "Efficiency vs sufficiency",
      short: "Doing it better, vs doing less",
      definition:
        "Efficiency means the same task with less energy or material. Sufficiency asks whether the task, the device or the capacity is needed at all.",
      boundary:
        "Efficiency alone can be cancelled by growth: more efficient devices, bought more often and used more, can consume more in total. Sufficiency is the lever efficiency cannot reach.",
      inPractice:
        "Efficiency is an engineering decision; sufficiency is a management one — retire, consolidate, extend service life, or simply do not buy.",
    },
  ],
  closing:
    "If a proposal cannot say which of these it is pulling on — direct energy, indirect energy, resources, or sufficiency — it cannot say what it will actually reduce.",
};

// ---------------------------------------------------------------- L1 · W2

export type FlipCard = {
  id: string;
  front: string;
  cause: string;
  enabler: string;
  note?: FieldNote;
};

export const W2: WidgetMeta & { cards: FlipCard[]; closing: string } = {
  id: "w2",
  title: "Where the energy and resources actually go",
  task: "Flip all six. Each has a running cost and a hidden cost — read both.",
  why: "If you had to point to where your organisation's IT energy goes, where would you point? Most people say the data centre and miss the two biggest: the device in front of you and the cooling around the servers. After this you'll know where to look before you try to save anything.",
  xp: 10,
  cards: [
    {
      id: "w2-end-devices",
      front: "End-user devices",
      cause:
        "Laptops, desktops and monitors draw modestly each — but multiplied by every desk, and by every hour they are left powered on.",
      enabler:
        "Most of a device's lifetime energy and nearly all its material are spent before first login. Manufacturing dominates; the desk is the small part.",
      note: {
        text: "Manufacturing is roughly 75–85% of a laptop's lifetime carbon, against about 14% for use. Four subassemblies — mainboard, display, chassis, battery — carry about 95% of the manufacturing share.",
        source: "techCarbon",
      },
    },
    {
      id: "w2-servers",
      front: "Servers",
      cause:
        "Draw continuously, and often at low utilisation — a half-idle server still pulls most of its peak power.",
      enabler:
        "Each one carries embodied manufacturing cost, and every watt it draws returns as heat the cooling system must then remove.",
    },
    {
      id: "w2-storage",
      front: "Storage",
      cause:
        "Capacity kept live and replicated draws power whether or not the data is ever read again.",
      enabler:
        "Sprawl is invisible until it is re-bought as hardware at the next refresh. Deleting nothing today buys disks tomorrow.",
    },
    {
      id: "w2-network",
      front: "Network",
      cause:
        "Switches, routers and Wi-Fi run around the clock. Per bit the energy is small, but it is constant.",
      enabler:
        "The transport most people blame is only a few percent of streaming energy — the device at each end dominates. Blaming the network aims the fix at the wrong place.",
      note: {
        text: "Viewing devices are about 72% of streaming energy, transmission 23%, data centres 5%. Figures that blamed the network were overstated by up to 50x. A lower default resolution touches the 72%.",
        source: "ieaStreaming",
      },
    },
    {
      id: "w2-data-centre",
      front: "Data centres & cloud",
      cause:
        "Compute plus the overhead to power and cool it. The ratio between the two is exactly what PUE measures.",
      enabler:
        "Move a workload to the cloud and its energy shifts onto the provider's meter — a reporting change, not a saving, unless utilisation or the region's energy mix actually improves.",
    },
    {
      id: "w2-cooling",
      front: "Cooling & facilities",
      cause:
        "Often the second-largest meter in a server room — sometimes nearly as much as the computing it protects.",
      enabler:
        "Over-cooling and redundancy “just in case” spend energy on risk that may never arrive. Setpoint and airflow are the levers, and they cost nothing to turn.",
    },
  ],
  closing:
    "The biggest number is rarely the one people look at. Most of a device's footprint is spent before it is switched on, and much of a server room's is spent keeping it cool.",
};

// ---------------------------------------------------------------- L1 · W3

export type SorterSnippet = {
  id: string;
  text: string;
  answer: CategoryCode;
  why: string;
};

export const W3: WidgetMeta & { snippets: SorterSnippet[]; closing: string } = {
  id: "w3",
  title: "Area sorter",
  task: "Put each observation into one of the five areas. Keyboard: focus a snippet and press 1–5.",
  why: "These five areas are the labels you'll use in every case today. Getting them exactly “right” isn't the point — noticing why a case sits on the border between two areas is, because that border is usually where the real decision hides.",
  xp: 15,
  snippets: [
    {
      id: "w3-01",
      text: "A batch of servers sits at low utilisation but is powered day and night.",
      answer: "Op",
      why: "The kit is justified; what wastes energy is how it is run. The lever is the operating model — consolidate, or set a shutdown rule.",
    },
    {
      id: "w3-02",
      text: "New laptops are ordered without any check on whether the old ones could be repaired.",
      answer: "Pr",
      why: "Nothing is running here yet. What is missing is a criterion at the point of buying — a repair-and-reuse check.",
    },
    {
      id: "w3-03",
      text: "Desktop PCs are left switched on overnight because the default was never changed.",
      answer: "U",
      why: "The equipment is fine; a habit and a default setting drive the draw. Change the default, not the device.",
    },
    {
      id: "w3-04",
      text: "Notebooks are swapped for new ones every three years regardless of their condition.",
      answer: "Rp",
      why: "The trigger is the calendar, not the device. The lever is condition-based replacement.",
    },
    {
      id: "w3-05",
      text: "A cupboard holds twenty working monitors nobody has re-deployed.",
      answer: "St",
      why: "Their manufacturing cost is already spent; leaving them idle wastes it. The lever is reuse.",
    },
    {
      id: "w3-06",
      text: "The server room is over-cooled: the setpoint is 18 °C when 22 °C would be safe.",
      answer: "Op",
      why: "Cooling is the second meter in operations. Setpoint is the classic operating lever.",
    },
    {
      id: "w3-07",
      text: "Devices are bought on lowest unit price; life-cycle cost never enters the evaluation.",
      answer: "Pr",
      why: "A purchasing rule applied before anything runs. The criterion is the lever — procurement, not operations.",
    },
    {
      id: "w3-08",
      text: "Staff keep video calls at 4K when audio-only would do.",
      answer: "U",
      why: "The infrastructure is justified; the behaviour and the default inflate the load. Use.",
    },
    {
      id: "w3-09",
      text: "Retired phones are thrown out rather than refurbished or passed on internally.",
      answer: "St",
      why: "This is what happens after active service. Reuse or responsible disposal is the lever.",
    },
    {
      id: "w3-10",
      text: "A three-year-old fleet is replaced early to save energy, though the old devices still work.",
      answer: "Rp",
      why: "Replacement driven by an energy argument that ignores the embodied cost already spent. The lever is the refresh decision itself.",
    },
  ],
  closing:
    "Several of these could carry two tags. The useful question is not “which box is correct” but “which lever would you actually pull” — the area follows the lever.",
};

// ---------------------------------------------------------------- L2 · W4

export type Dial = {
  id: string;
  title: string;
  leftLabel: string;
  rightLabel: string;
  /** Readouts for low / middle / high positions. */
  readouts: [string, string, string];
  price: string;
  note?: FieldNote;
};

export const W4: WidgetMeta & { dials: Dial[]; closing: string } = {
  id: "w4",
  title: "Trade-off dial",
  task: "Move all three dials. Watch the readout — there is no setting without a price.",
  why: "Executives do not reject Green IT because they dislike it. They reject proposals that pretend the trade-off is free. Naming the price is what makes a proposal credible.",
  xp: 15,
  dials: [
    {
      id: "w4-a",
      title: "Dial A — Performance vs energy efficiency",
      leftLabel: "Maximise performance",
      rightLabel: "Maximise efficiency",
      readouts: [
        "Headroom everywhere, efficiency is whatever is left over. Predictable, and the energy bill is the residual.",
        "Efficiency targets exist but yield to performance whenever the two collide. The common real-world setting.",
        "Efficiency is a hard constraint. Peaks are shaved, some latency is accepted, capacity planning gets harder.",
      ],
      price:
        "Left: you pay in energy and, in Germany, in regulatory exposure. Right: you pay in headroom, and someone will feel it on a bad day.",
      note: {
        text: "In Germany this dial is no longer purely voluntary. Under the Energy Efficiency Act, existing data centres must reach an annual PUE of 1.5 by July 2027 and 1.3 by July 2030, and new ones start at 1.2. A draft amendment from April 2026 would ease these to 1.6, 1.4 and 1.3. Centres from July 2026 must also reuse a share of their waste heat.",
        source: "enefg",
      },
    },
    {
      id: "w4-b",
      title: "Dial B — Purchase cost vs sustainability",
      leftLabel: "Lowest purchase price",
      rightLabel: "Lowest lifetime impact",
      readouts: [
        "Cheapest unit price wins. Fast to approve, and the disposal and energy costs land in someone else's budget.",
        "Environmental criteria are scored but can be outvoted by price. Most procurement templates sit here.",
        "Lifetime impact and total cost decide. Slower approvals, fewer suppliers, longer service life.",
      ],
      price:
        "Left: you pay later, in a different cost centre. Right: you pay now, visibly, and have to defend it.",
      note: {
        text: "The Blue Angel criteria for data centres require total cost of ownership to be calculated at purchase, and labels such as Energy Star, TCO Certified and EPEAT to be weighed. Blue Angel requirements are moving towards mandatory for German federal IT procurement — for public bodies this dial is being set by law.",
        source: "blueAngel",
      },
    },
    {
      id: "w4-c",
      title: "Dial C — Quick win vs strategic leverage",
      leftLabel: "Visible this quarter",
      rightLabel: "Changes how decisions are made",
      readouts: [
        "Something to show the board in weeks. Buys credibility, and buys nothing else.",
        "A mix: one visible measure funds the patience for a structural one. The setting most programmes survive on.",
        "Baseline, ownership and rules first. Nothing to show for two quarters, and every later decision gets easier.",
      ],
      price:
        "Left: you may optimise the wrong thing, confidently. Right: you must spend political capital before you have results.",
      note: {
        text: "One measure sits on both ends at once: shifting deferrable workloads to cleaner hours or regions. Reported reductions run from 2x to 10x with no application change. When you can find a measure like this, spend it on buying time for the structural work.",
        source: "sci",
      },
    },
  ],
  closing:
    "A proposal that names its own price is harder to reject than one that promises none. Say the cost out loud before someone else finds it.",
};

// ---------------------------------------------------------------- L2 · W5

export type MatrixCard = {
  id: string;
  text: string;
  /** Where experience usually puts it, revealed after the learner places it. */
  hint: string;
};

export type Quadrant = {
  id: "hi-hf" | "hi-lf" | "li-hf" | "li-lf";
  title: string;
  consequence: string;
};

export const W5: WidgetMeta & {
  cards: MatrixCard[];
  quadrants: Quadrant[];
  closing: string;
} = {
  id: "w5",
  title: "Priority matrix — impact × feasibility",
  task: "Place all eight measures. Keyboard: focus a card and press 1–4.",
  why: "There is no scoring here. The matrix exists so that when you later defend a ranking, you can say which axis decided it.",
  xp: 15,
  quadrants: [
    {
      id: "hi-hf",
      title: "High impact · high feasibility",
      consequence:
        "Do it now, and use it to buy credibility for everything in the quadrant above.",
    },
    {
      id: "hi-lf",
      title: "High impact · low feasibility",
      consequence:
        "Needs leadership sponsorship or it dies quietly. Never assign it to a team without air cover.",
    },
    {
      id: "li-hf",
      title: "Low impact · high feasibility",
      consequence:
        "Cheap to do. Dangerous to report as progress — this is where symbolic action lives.",
    },
    {
      id: "li-lf",
      title: "Low impact · low feasibility",
      consequence:
        "Say no in writing, with a reason. An unrefused item comes back every quarter.",
    },
  ],
  cards: [
    {
      id: "w5-lifetime",
      text: "Extend laptop service life from three to five years",
      hint: "High impact, and feasibility is mostly a policy question rather than a technical one.",
    },
    {
      id: "w5-setpoint",
      text: "Raise the server-room setpoint after a thermal survey",
      hint: "Real energy impact, and feasible once the survey exists. The survey is the actual work.",
    },
    {
      id: "w5-owner",
      text: "Name one accountable owner for Green IT metrics",
      hint: "Costs almost nothing and unblocks everything downstream. Feasibility depends on one conversation.",
    },
    {
      id: "w5-replace-all",
      text: "Replace every workplace device with a new energy-efficient model",
      hint: "Large budget, and the embedded manufacturing carbon can outweigh the energy saved.",
    },
    {
      id: "w5-procurement",
      text: "Add environmental criteria to the procurement template",
      hint: "Compounding impact — it applies to every future purchase, not one.",
    },
    {
      id: "w5-batch",
      text: "Move overnight batch jobs to lower-carbon hours",
      hint: "Technically feasible for deferrable work. Impact depends entirely on how variable your grid is.",
    },
    {
      id: "w5-dashboard",
      text: "Buy and publish a Green IT dashboard",
      hint: "Easy to buy. Impact is zero until somebody is accountable for the numbers on it.",
    },
    {
      id: "w5-baseline",
      text: "Build an energy and device baseline for IT",
      hint: "Not visible to anyone outside IT, and every later decision is guesswork without it.",
    },
  ],
  closing:
    "Note how many of these are rules and roles rather than equipment. That ratio is the difference between a Green IT programme and a shopping list.",
};

// ---------------------------------------------------------------- L2 · W6

export type EvidenceTile = {
  id: string;
  label: string;
  content: string;
  covered: boolean;
};

export type DecisionOption = {
  id: string;
  label: string;
  immediate: string;
  /** What the covered evidence does to this choice once revealed. */
  afterReveal: string;
};

export const W6: WidgetMeta & {
  scenario: string;
  tiles: EvidenceTile[];
  options: DecisionOption[];
  message: string;
  closing: string;
} = {
  id: "w6",
  title: "Decision under incomplete information",
  task: "Two evidence tiles are open, three are covered. Choose anyway — then see what you could not see.",
  why: "Waiting for complete data is the most common way a Green IT programme dies. This widget makes the cost of waiting visible.",
  xp: 15,
  scenario:
    "Your board has asked for one Green IT decision this quarter. Budget covers exactly one of the three options below.",
  tiles: [
    {
      id: "w6-t1",
      label: "Device inventory",
      content:
        "About 1,900 workplace devices. Average age 2.6 years. Renewal is contractual, not condition-based.",
      covered: false,
    },
    {
      id: "w6-t2",
      label: "Energy data",
      content:
        "One meter for the whole building. IT cannot be separated from lighting and HVAC.",
      covered: false,
    },
    {
      id: "w6-t3",
      label: "Supplier terms",
      content:
        "The device contract has a 14-month break clause. Renegotiating before then costs nothing.",
      covered: true,
    },
    {
      id: "w6-t4",
      label: "Staff capacity",
      content:
        "The two people who would run a baseline are already committed to a migration until Q3.",
      covered: true,
    },
    {
      id: "w6-t5",
      label: "Customer pressure",
      content:
        "Two key accounts have asked for IT sustainability evidence in the next tender round, due in five months.",
      covered: true,
    },
  ],
  options: [
    {
      id: "w6-o1",
      label: "Buy sub-metering and build the energy baseline",
      immediate:
        "Attacks the visible gap: you cannot separate IT energy from the building.",
      afterReveal:
        "The staff tile hurts this one. The two people who would run it are unavailable until Q3, so the baseline lands after the tender deadline the customer tile reveals.",
    },
    {
      id: "w6-o2",
      label: "Rewrite the device policy and renegotiate the contract",
      immediate:
        "Attacks the largest known quantity: 1,900 devices on a contractual rather than condition-based cycle.",
      afterReveal:
        "The supplier tile makes this cheap right now — a 14-month break clause with no penalty. The capacity tile does not block it, because this is a procurement task, not an IT-operations one.",
    },
    {
      id: "w6-o3",
      label: "Wait one quarter until the data situation improves",
      immediate: "Avoids committing budget to a decision made half-blind.",
      afterReveal:
        "The customer tile prices this choice. The tender is in five months; a quarter of waiting spends most of the runway and produces no evidence to submit.",
    },
  ],
  message:
    "Deferring the decision until every tile is open is itself a decision — and it is priced in time.",
  closing:
    "Notice what actually decided it: not the missing energy data, but a contract date and a customer deadline. Ask which missing fact would change your action, not which facts are missing.",
};

// ---------------------------------------------------------------- L3 · W7

export type GovernanceNode = {
  id: string;
  role: string;
  decidesAlone: string;
  mustEscalate: string;
  cannotDelegate: string;
};

export const W7: WidgetMeta & {
  nodes: GovernanceNode[];
  flows: string[];
  closing: string;
} = {
  id: "w7",
  title: "Governance mini org-chart",
  task: "Open all five roles. For each, read what it cannot delegate — that line is the whole point.",
  why: "When one of these decisions stalls, it's usually stuck between two roles, not inside one. This shows you who cannot pass a decision on — which is how you find the person who actually has to sign it.",
  xp: 20,
  nodes: [
    {
      id: "w7-board",
      role: "Board",
      decidesAlone:
        "Whether Green IT is a target with budget, or a topic with goodwill.",
      mustEscalate:
        "Nothing internally — but must answer to owners, regulators and key customers.",
      cannotDelegate:
        "Setting the level of ambition, and accepting the trade-off between short-term results and structural change. Delegating this produces a programme with no authority.",
    },
    {
      id: "w7-cto",
      role: "CTO",
      decidesAlone:
        "Technical standards, architecture direction, and which platforms are in scope.",
      mustEscalate:
        "Anything that changes the investment envelope or the customer-facing service level.",
      cannotDelegate:
        "Declaring what the technology strategy is for. If sustainability is absent from that statement, no team below will prioritise it.",
    },
    {
      id: "w7-head-it",
      role: "Head of IT",
      decidesAlone:
        "Operating parameters, service life in practice, and how capacity is run day to day.",
      mustEscalate:
        "Anything touching contracts, headcount, or a service level the business has been promised.",
      cannotDelegate:
        "Owning the operational numbers. When the report is questioned, this is the role that must recognise its own data.",
    },
    {
      id: "w7-sustainability",
      role: "Sustainability Officer",
      decidesAlone:
        "Reporting method, boundary definitions, and what counts as evidence.",
      mustEscalate:
        "Any target that requires IT to change how it operates or buys.",
      cannotDelegate:
        "Defending the numbers externally. This role carries the credibility risk if IT's figures do not hold up.",
    },
    {
      id: "w7-procurement",
      role: "Procurement Lead",
      decidesAlone:
        "Supplier selection inside an agreed framework, and how criteria are weighted in an evaluation.",
      mustEscalate:
        "New mandatory criteria, and anything that narrows the supplier field or raises unit price.",
      cannotDelegate:
        "Writing the criteria into the template. Until they are in the document, environmental requirements are advice, not requirements.",
    },
  ],
  flows: [
    "Board → CTO: ambition and budget envelope",
    "CTO → Head of IT: standards and scope",
    "Head of IT → Sustainability Officer: operational data",
    "Sustainability Officer → Board: external exposure",
    "Procurement Lead ↔ Head of IT: what can actually be bought",
  ],
  closing:
    "Read the five “cannot delegate” lines in order. That sequence is the shortest description of a working Green IT governance there is.",
};

// ---------------------------------------------------------------- L3 · W8

export type RoadmapMeasure = {
  id: string;
  text: string;
  /** id of the measure that must be placed in an earlier or equal quarter. */
  requires: string | null;
  requiresLabel: string;
};

export const W8: WidgetMeta & {
  measures: RoadmapMeasure[];
  quarters: string[];
  closing: string;
} = {
  id: "w8",
  title: "Roadmap sequencer",
  task: "Place all six measures across the year. Keyboard: focus a measure and press 1–4.",
  why: "There's no single correct roadmap — but there's an order that works and an order that makes you redo expensive work. Try your own sequence here and see what each ordering would cost, before it costs you for real.",
  xp: 20,
  quarters: ["Q1", "Q2", "Q3", "Q4"],
  measures: [
    {
      id: "w8-owner",
      text: "Name an accountable owner for Green IT",
      requires: null,
      requiresLabel: "requires: nothing",
    },
    {
      id: "w8-baseline",
      text: "Build an energy and device baseline",
      requires: "w8-owner",
      requiresLabel: "requires: a named owner",
    },
    {
      id: "w8-kpi",
      text: "Agree a minimum set of KPIs",
      requires: "w8-baseline",
      requiresLabel: "requires: baseline data",
    },
    {
      id: "w8-procurement",
      text: "Rewrite the procurement criteria",
      requires: "w8-owner",
      requiresLabel: "requires: a named owner",
    },
    {
      id: "w8-lifetime",
      text: "Move to a condition-based device service life",
      requires: "w8-procurement",
      requiresLabel: "requires: procurement criteria",
    },
    {
      id: "w8-report",
      text: "Feed IT figures into sustainability reporting",
      requires: "w8-kpi",
      requiresLabel: "requires: agreed KPIs",
    },
  ],
  closing:
    "Every arrow here points back to the same two things: an owner and a baseline. Programmes that start anywhere else pay for them later anyway.",
};

// ---------------------------------------------------------------- L3 · W9

export type StatementTag = "symbolic" | "operational" | "strategic";

export type Statement = {
  id: string;
  text: string;
  answer: StatementTag;
  why: string;
};

export const W9: WidgetMeta & {
  statements: Statement[];
  tags: { id: StatementTag; label: string; hint: string }[];
  closing: string;
} = {
  id: "w9",
  title: "Symbolic vs strategic check",
  task: "Tag each of the five statements, then read why. This is the test you'll apply to your own slides.",
  why: "A small measure isn't the problem — calling a small measure “strategy” is. Being able to label your own proposal honestly (symbolic, operational, or strategic) is what keeps people trusting the next thing you say.",
  xp: 20,
  tags: [
    {
      id: "symbolic",
      label: "Symbolic",
      hint: "Visible, cheap, and changes no decision that follows it.",
    },
    {
      id: "operational",
      label: "Operational improvement",
      hint: "Real and measurable, but bounded — it improves a thing, not the way things are chosen.",
    },
    {
      id: "strategic",
      label: "Strategic decision",
      hint: "Changes who decides, on what criteria, or with what authority. Effects compound.",
    },
  ],
  statements: [
    {
      id: "w9-01",
      text: "“We have switched our intranet homepage to a dark theme to save energy.”",
      answer: "symbolic",
      why: "Measurable only on OLED screens, and even then negligible at company scale. Nothing downstream changes. Announcing it invites the audience to discount everything else you say.",
    },
    {
      id: "w9-02",
      text: "“From next quarter, every IT tender must score environmental criteria at 20% of the total.”",
      answer: "strategic",
      why: "It changes the decision rule, not one decision. Every future purchase inherits it, and procurement now has authority to reject on those grounds.",
    },
    {
      id: "w9-03",
      text: "“We raised the server-room setpoint by 3 °C after a thermal survey.”",
      answer: "operational",
      why: "Genuine, measurable and defensible — a real reduction with evidence behind it. But it improves one room; it does not change how the next room is designed.",
    },
    {
      id: "w9-04",
      text: "“We have appointed a Head of Sustainable IT reporting to the CTO, with a budget line and quarterly targets.”",
      answer: "strategic",
      why: "Ownership, authority and money in one move. This is the change that makes the operational improvements repeatable instead of accidental.",
    },
    {
      id: "w9-05",
      text: "“We planted 5,000 trees to offset the emissions of our data centre.”",
      answer: "symbolic",
      why: "Nothing about the data centre changed. Offsetting also does not move an intensity metric: the SCI standard deliberately excludes offsets so the score can only improve through real engineering work.",
    },
  ],
  closing:
    "Symbolic is not forbidden — it is forbidden to file it under strategy. Label it correctly and it can still buy you attention.",
};


// --------------------------------------------------- L1 · W10 (simulator)

/**
 * Relative model only. Section 12 forbids absolute CO2, kWh and currency
 * figures in this module, so the simulator works in ratios and an index
 * against a three-year baseline — which is also the number a board argues
 * about anyway.
 */
export const W10: WidgetMeta & {
  minYears: number;
  maxYears: number;
  baselineYears: number;
  /** Share of lifetime footprint fixed at manufacturing, in percent. */
  embodiedShare: number;
  bands: { upTo: number; verdict: string }[];
  closing: string;
  note: FieldNote;
} = {
  id: "w10",
  title: "Service-life simulator — what one extra year does",
  task: "Drag the refresh cycle. Watch what happens to the footprint carried by each device-year.",
  why: "Next time someone says “let's replace the old laptops early, the new ones use less power,” you'll be able to check whether that actually helps or quietly backfires. It's the most common well-meant mistake here — and one slider settles it.",
  xp: 15,
  minYears: 2,
  maxYears: 7,
  baselineYears: 3,
  embodiedShare: 80,
  bands: [
    {
      upTo: 2,
      verdict:
        "A two-year cycle spends the manufacturing footprint twice as often as a three-year one. Almost nothing you do in operations can offset that.",
    },
    {
      upTo: 3,
      verdict:
        "The common contractual cycle, and the baseline everything else is measured against. Chosen by a contract far more often than by condition.",
    },
    {
      upTo: 4,
      verdict:
        "One extra year already removes about a fifth of the annual burden — with no purchase, no project and no new tooling.",
    },
    {
      upTo: 5,
      verdict:
        "The usual sweet spot in practice. Roughly a third off, and still inside most warranty and security-support windows.",
    },
    {
      upTo: 7,
      verdict:
        "Beyond five years the curve flattens while support risk, battery wear and helpdesk load climb. Extending further is a service decision, not a footprint one.",
    },
  ],
  note: {
    text: "Manufacturing is roughly 75–85% of a laptop's lifetime carbon, against about 14% for use. Four subassemblies — mainboard, display, chassis, battery — carry about 95% of the manufacturing share. This is why swapping a working fleet for a more efficient one can raise total emissions rather than lower them.",
    source: "techCarbon",
  },
  closing:
    "Extending service life is the rare measure that reduces footprint and spend at the same time. The objections it meets are about support and security — prepare those answers, not the carbon argument.",
};

// --------------------------------------------------- L2 · W11 (simulator)

export type PueThreshold = {
  id: string;
  label: string;
  limit: number;
  applies: string;
};

/** PUE is a ratio by definition, so this stays inside the pre-metric rule. */
export const W11: WidgetMeta & {
  thresholds: PueThreshold[];
  draftNote: string;
  closing: string;
  note: FieldNote;
} = {
  id: "w11",
  title: "PUE check — the German thresholds",
  task: "Set how much power the building spends for every unit the computing spends. Watch which legal thresholds you clear.",
  why: "In Germany this stopped being a best-practice metric and became a statutory duty with dates attached. A leader who cannot say roughly where their data centre sits is exposed.",
  xp: 15,
  thresholds: [
    {
      id: "pue-2027",
      label: "PUE ≤ 1.5 from July 2027",
      limit: 1.5,
      applies: "Data centres already in operation before July 2026.",
    },
    {
      id: "pue-2030",
      label: "PUE ≤ 1.3 from July 2030",
      limit: 1.3,
      applies: "The same existing data centres, three years later.",
    },
    {
      id: "pue-new",
      label: "PUE ≤ 1.2 for new build",
      limit: 1.2,
      applies: "Data centres starting operation from July 2026.",
    },
  ],
  draftNote:
    "A draft amendment published in April 2026 would relax these to 1.6, 1.4 and 1.3. Treat the stricter numbers as the planning assumption until it is law.",
  note: {
    text: "The Energy Efficiency Act also requires data centres to match 50% of their electricity with renewables, to run a certified energy or environmental management system from 1 MW, and — for centres commissioned from July 2026 — to reuse a share of their waste heat, rising from 15% to 20% from July 2028.",
    source: "enefg",
  },
  closing:
    "PUE says nothing about whether the computing itself was worth doing. A half-empty data centre can post an excellent PUE. Read it alongside utilisation, never alone.",
};

/**
 * The running order, and the single source of truth for what "all widgets
 * done" means. The page renders from this, and so does the progress model.
 */
export const WIDGET_INDEX: { level: string; widgets: WidgetMeta[] }[] = [
  { level: "L1 · Knowledge", widgets: [W1, W2, W10, W3] },
  // L2 is delivered as the Meridian case study at /scenario/meridian.
  { level: "L2 · Application", widgets: [] },
  { level: "L3 · Management decision", widgets: [W7, W8, W9] },
];

export const ALL_WIDGETS: WidgetMeta[] = WIDGET_INDEX.flatMap((l) => l.widgets);

// ------------------------------------------------- The five categories

export type CategoryPrimerEntry = {
  code: CategoryCode;
  /** One sentence, no jargon. */
  meaning: string;
  /** The question that identifies this category in the wild. */
  question: string;
  example: string;
  /** What you would change if the answer is this category. */
  lever: string;
};

/**
 * Read before the sorter. The sorter tests a distinction the room has not been
 * taught yet unless this comes first.
 */
export const CATEGORY_PRIMER: {
  title: string;
  intro: string;
  entries: CategoryPrimerEntry[];
  rule: string;
  note: FieldNote;
} = {
  title: "The five areas, before you sort anything",
  intro:
    "Every observation in this module gets filed under one of five areas. They are not five kinds of technology — they are the five points in a device's life where energy and resources are won or lost. The same laptop appears under several, depending on the question you ask.",
  entries: [
    {
      code: "Op",
      meaning: "How the estate is run while it is in service.",
      question: "Is this consuming while nobody benefits — running, idling, or over-cooled?",
      example: "Low-utilisation servers kept powered day and night.",
      lever: "Shutdown and operating rules, consolidation, setpoints, retiring idle capacity.",
    },
    {
      code: "Pr",
      meaning: "How devices and services enter — the criteria they are bought on.",
      question: "On what basis was this bought, and was repair or reuse considered first?",
      example: "New devices procured without a repair check or reuse assessment.",
      lever: "Procurement criteria (life cycle, not price alone), repair- and reuse-first rules.",
    },
    {
      code: "U",
      meaning: "The daily habits and default settings people apply to what already exists.",
      question:
        "The equipment is justified — is it the habit, or the default setting, that costs?",
      example: "Workstations left running overnight because nobody changed the setting.",
      lever: "Defaults, usage rules, sleep and shutdown policies, awareness.",
    },
    {
      code: "Rp",
      meaning: "When and why a device is swapped out.",
      question: "Is this replaced by the calendar, or by its actual condition?",
      example: "Notebooks replaced by default after three years though many are still usable.",
      lever: "Condition-based replacement, service-life extension, the refresh policy itself.",
    },
    {
      code: "St",
      meaning: "What happens to devices once they leave active service.",
      question: "Where do retired devices go — reuse, refurbishment, or a cupboard?",
      example: "Old monitors and accessories stored unused instead of being re-deployed.",
      lever: "Reuse and refurbishment, internal re-deployment, responsible disposal.",
    },
  ],
  rule:
    "When two areas both seem to fit, ask which lever you would actually pull. The area follows the lever, not the object.",
  note: {
    text: "Energy is spent mostly in Operations and Use; resources are committed in Procurement and wasted in Replacement and Storage. A device with no problem in operation can still be a resource problem three years too early.",
  },
};

// ------------------------------------- W8: judging a roadmap, not scoring it

/** What placing this measure late, or on top of its prerequisite, costs you. */
export type MeasureTradeoff = {
  id: string;
  ifLate: string;
  ifStacked?: string;
  wellPlaced: string;
};

export type RoadmapProfile = {
  id: string;
  label: string;
  tone: "good" | "warn" | "danger";
  what: string;
  cost: string;
};

export const W8_TRADEOFFS: MeasureTradeoff[] = [
  {
    id: "w8-owner",
    ifLate:
      "Everything else waits on this. Naming the owner in the second half means the year mostly produces a plan to start next year.",
    wellPlaced:
      "Early, where it belongs. It costs almost nothing and unblocks every measure after it.",
  },
  {
    id: "w8-baseline",
    ifLate:
      "Without a baseline nothing later can be shown to have improved. Started in Q4, the first credible number arrives next year — and every claim made before it is unevidenced.",
    ifStacked:
      "Starting the baseline in the same quarter the owner is named leaves no time to scope it. Expect the first attempt to be redone.",
    wellPlaced:
      "Early enough that later measures have something to be measured against.",
  },
  {
    id: "w8-kpi",
    ifLate:
      "KPIs agreed in Q4 govern nothing this year. The reporting cycle, the budget round and the supplier reviews all pass before the first measurement exists, so the year's decisions are taken on the old criteria.",
    ifStacked:
      "Agreeing KPIs in the same quarter the baseline starts means setting targets against data you have not seen. They will move once it arrives.",
    wellPlaced:
      "After the baseline and before the reporting cycle — the only window where a KPI can actually steer something this year.",
  },
  {
    id: "w8-procurement",
    ifLate:
      "Every purchase made before the criteria change is locked in for the length of its contract. Rewritten in Q4, the whole year's buying happened under the old rules.",
    wellPlaced:
      "Early enough that a meaningful share of the year's purchases pass through the new criteria.",
  },
  {
    id: "w8-lifetime",
    ifLate:
      "Service life only changes at the next refresh decision. Late here means the change first bites a year after the date on the roadmap suggests.",
    ifStacked:
      "Changing service life in the same quarter the procurement criteria are written means the rule is being applied before it is agreed.",
    wellPlaced:
      "Behind the procurement criteria, which is what gives it authority.",
  },
  {
    id: "w8-report",
    ifLate:
      "Late is the natural place for this one — reporting consumes what the earlier steps produce.",
    ifStacked:
      "Reporting in the same quarter the KPIs are agreed leaves no cycle to collect anything against them.",
    wellPlaced: "At the end, consuming what the rest of the year produced.",
  },
];

export const W8_PROFILES: RoadmapProfile[] = [
  {
    id: "out-of-sequence",
    label: "Out of sequence",
    tone: "danger",
    what: "At least one measure runs before something it depends on.",
    cost: "The dependent work gets done twice: once on assumptions, once again on the real thing. Budget is spent, and confidence in the programme is spent with it.",
  },
  {
    id: "all-at-once",
    label: "Everything at once",
    tone: "danger",
    what: "All six measures sit in a single quarter.",
    cost: "No IT department has this capacity spare. In practice two get done, four slip quietly, and nobody decided which four — the sequence was chosen by whoever was busiest.",
  },
  {
    id: "back-loaded",
    label: "Back-loaded",
    tone: "danger",
    what: "The weight of the year sits in Q3 and Q4, with little or nothing early.",
    cost: "There is nothing to show at the mid-year review, which is when programmes lose their budget. Everything also depends on the last quarter going perfectly — and Q4 is the quarter with holidays, year-end close and a change freeze.",
  },
  {
    id: "front-loaded",
    label: "Front-loaded",
    tone: "warn",
    what: "Most of the year is compressed into Q1 and Q2.",
    cost: "Defensible only if you have people dedicated to it. Otherwise this is the same capacity collision as doing everything at once, just spread over two quarters instead of one.",
  },
  {
    id: "foundation-first",
    label: "Foundation first",
    tone: "good",
    what: "Ownership and the baseline come early, the rules follow, reporting lands last.",
    cost: "The honest cost is patience: for one or two quarters there is nothing visible to show, and you will be asked about it. What you buy is that every later decision is made on evidence rather than argument.",
  },
  {
    id: "evenly-paced",
    label: "Evenly paced",
    tone: "warn",
    what: "The measures are spread fairly evenly and the dependencies hold.",
    cost: "Nothing here will fail. But spreading work evenly is not the same as sequencing it — check that the early quarters carry the measures everything else depends on, not just the easy ones.",
  },
];

/** Not "the answer" — the order most programmes converge on, with the reason. */
export const W8_REFERENCE: { quarter: string; measures: string[]; why: string }[] = [
  {
    quarter: "Q1",
    measures: ["w8-owner"],
    why: "Cheapest possible move, and nothing else can start without it. One conversation, one name.",
  },
  {
    quarter: "Q2",
    measures: ["w8-baseline", "w8-procurement"],
    why: "Both need only the owner. Procurement rules start protecting purchases immediately; the baseline starts accumulating the evidence everything later depends on.",
  },
  {
    quarter: "Q3",
    measures: ["w8-kpi", "w8-lifetime"],
    why: "The baseline now has real data to set KPIs against, and the procurement criteria give the service-life change something to stand on.",
  },
  {
    quarter: "Q4",
    measures: ["w8-report"],
    why: "Reporting consumes what the year produced. Putting it earlier means reporting numbers you cannot yet defend.",
  },
];
