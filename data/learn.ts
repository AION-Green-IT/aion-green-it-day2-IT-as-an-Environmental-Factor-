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
  /** What the widget is for — the mentor's framing. */
  why: string;
  xp: number;
};

// ---------------------------------------------------------------- L1 · W1

export type ComparatorCard = {
  id: string;
  term: string;
  short: string;
  definition: string;
  boundary: string;
  inPractice: string;
  note?: FieldNote;
};

export const W1: WidgetMeta & { cards: ComparatorCard[]; closing: string } = {
  id: "w1",
  title: "What Green IT is — and what it is not",
  task: "Open all four cards. Read each boundary line before moving on.",
  why: "Most Green IT programmes stall because the room is using one word for four different things. Sorting the vocabulary first saves an hour of argument later.",
  xp: 10,
  cards: [
    {
      id: "w1-green-it",
      term: "Green IT",
      short: "The footprint of the IT you run",
      definition:
        "Reducing the environmental impact of the IT estate itself: the energy it draws, the hardware it consumes, the materials inside it and what happens at disposal.",
      boundary:
        "Green IT stops at the IT estate. The moment the question becomes “how does IT help the rest of the business emit less”, you have crossed into Green by IT.",
      inPractice:
        "Owned by IT. Measured in kWh, devices, service life, PUE, procurement rules.",
      note: {
        text: "German practice splits the term in two: Green in der IT (making IT itself greener) and Green durch IT (using IT to make everything else greener). Programmes that mix the two end up with targets nobody can be held to.",
      },
    },
    {
      id: "w1-digital-sustainability",
      term: "Digital Sustainability",
      short: "Whether the digital service should exist at all",
      definition:
        "The wider question of whether digital products and services hold up over time — data minimalism, software longevity, accessibility, maintainability, digital sovereignty.",
      boundary:
        "Digital sustainability contains Green IT and adds durability and social questions. Green IT alone never asks whether the service is worth running.",
      inPractice:
        "Shared between IT, product and legal. Shows up in architecture and design reviews, not in the energy bill.",
    },
    {
      id: "w1-esg",
      term: "ESG",
      short: "The reporting and investor lens",
      definition:
        "Environmental, Social, Governance. A disclosure framework: regulated, numeric, audited, aimed at investors and regulators.",
      boundary:
        "ESG is where your Green IT numbers have to survive an auditor. Green IT produces the data; ESG consumes it.",
      inPractice:
        "Owned by finance or a sustainability function. IT is a data supplier, and usually a late one.",
      note: {
        text: "Under CSRD the reporting company must disclose Scope 3 — its value chain. That is why suppliers well below the reporting threshold still receive emissions questionnaires from customers: they are somebody else's Scope 3.",
        source: "csrd",
      },
    },
    {
      id: "w1-csr",
      term: "CSR",
      short: "Voluntary responsibility and narrative",
      definition:
        "Corporate Social Responsibility: voluntary commitments, community and reputation work, communicated by the company on its own terms.",
      boundary:
        "CSR is voluntary and narrative. ESG is mandatory and numeric. Treating Green IT as CSR is how it ends up in communications instead of in IT steering.",
      inPractice:
        "Owned by communications. No binding target, no auditor, no budget line in IT.",
    },
  ],
  closing:
    "If a Green IT proposal cannot say which of these four it belongs to, it will be funded by none of them.",
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
  title: "IT as cause and enabler",
  task: "Flip all six cards. Each has a cost side and a leverage side — read both.",
  why: "Arguing only the cost side makes IT look like a problem to be shrunk. Arguing only the leverage side makes Green IT look like marketing. Leaders need both numbers in the same sentence.",
  xp: 10,
  cards: [
    {
      id: "w2-video",
      front: "Video conferencing",
      cause:
        "Draws energy at three places: the endpoint device, the network, and the data centre.",
      enabler:
        "Removes travel. A single avoided short-haul flight outweighs years of the same team's call energy.",
      note: {
        text: "The split is the opposite of what most people guess: viewing devices are about 72% of streaming energy, transmission 23%, and data centres 5%. Widely repeated figures that blamed the network were overstated by up to 50x. Setting a lower default resolution touches the 72%.",
        source: "ieaStreaming",
      },
    },
    {
      id: "w2-ai",
      front: "An AI training run",
      cause:
        "Concentrated compute in one place over days. Energy, cooling and dedicated accelerator hardware.",
      enabler:
        "Forecasting, route and load optimisation, predictive maintenance, grid balancing — each avoiding physical waste elsewhere.",
      note: {
        text: "Electricity use by AI-focused data centres rose about 50% in 2025. Data centres overall sit near 1.5% of global electricity and are projected to reach just under 3% by 2030. Large in growth rate, still small in share — quote both numbers or you will be corrected.",
        source: "ieaEnergyAi",
      },
    },
    {
      id: "w2-building",
      front: "Smart building controls",
      cause: "Sensors, gateways and a network that must stay awake continuously.",
      enabler:
        "Setbacks on heating, cooling and lighting — usually the largest controllable energy line in an office building.",
    },
    {
      id: "w2-cloud",
      front: "A cloud migration",
      cause:
        "The workload does not disappear; it moves onto someone else's meter, where the energy mix is chosen by the provider and the region.",
      enabler:
        "Higher utilisation, newer hardware, and the ability to pick a region by carbon intensity instead of by price alone.",
      note: {
        text: "Once the workload is external it becomes your Scope 3, not your Scope 2. That is a reporting change, not a reduction — a point auditors raise often.",
        source: "csrd",
      },
    },
    {
      id: "w2-storage",
      front: "Company file storage",
      cause:
        "Capacity kept live and replicated. Sprawl is invisible until it is re-bought at the next refresh.",
      enabler:
        "A retention rule cuts the hardware demand and the backup window at the same time. One decision, two budgets.",
    },
    {
      id: "w2-laptop",
      front: "An employee laptop",
      cause:
        "Most of its lifetime emissions are already spent before anyone logs in for the first time.",
      enabler:
        "Every extra year of service life spreads that fixed cost further. This is the largest lever an IT department controls on its own.",
      note: {
        text: "Manufacturing is roughly 75–85% of a laptop's lifetime carbon — around 80% is the figure usually quoted, against about 14% for use. Four subassemblies carry about 95% of it: mainboard, display, chassis, battery. Buying a more efficient laptop sooner can raise total emissions.",
        source: "techCarbon",
      },
    },
  ],
  closing:
    "Cause and enabler are not opposites. The same laptop is both — which one you argue depends on who is in the room.",
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
  title: "Category sorter",
  task: "Put each observation into one of the five categories. Keyboard: focus a snippet and press 1–5.",
  why: "The five categories are the shared language for the rest of the module. Sorting is not the goal — noticing why a case is borderline is.",
  xp: 15,
  snippets: [
    {
      id: "w3-01",
      text: "A finance team's monthly report is printed on paper and archived in binders.",
      answer: "R",
      why: "Paper and toner are consumed materials. The printing energy is real but small next to what is used up.",
    },
    {
      id: "w3-02",
      text: "The office lights, screens and desktops are left on over the weekend.",
      answer: "E",
      why: "A standing electrical draw with no output. Nothing is consumed or emitted directly — it is pure energy.",
    },
    {
      id: "w3-03",
      text: "A vendor is chosen on price alone; no environmental criteria enter the evaluation.",
      answer: "G",
      why: "Nothing physical happened yet. What is missing is a rule — and a missing rule is governance, not energy.",
    },
    {
      id: "w3-04",
      text: "A company runs its dev/test workloads on a cloud region powered largely by coal.",
      answer: "Em",
      why: "The compute would run anyway. What changes with the region is the carbon per kWh, so the category is emissions.",
    },
    {
      id: "w3-05",
      text: "Colleagues stream 4K video calls when audio-only would do.",
      answer: "U",
      why: "The infrastructure is fine. It is the behaviour and the default setting that inflate the load.",
    },
    {
      id: "w3-06",
      text: "Old laptops are stockpiled in a cupboard instead of being reused or refurbished.",
      answer: "R",
      why: "The embedded manufacturing carbon is already spent. Leaving it idle wastes it — a resources question.",
    },
    {
      id: "w3-07",
      text: "The server room is over-cooled: the setpoint is 18 °C when 22 °C would be safe.",
      answer: "E",
      why: "Cooling is the second meter in every server room. Setpoint is the classic energy lever.",
    },
    {
      id: "w3-08",
      text: "There is no owner in the org chart for Green IT metrics.",
      answer: "G",
      why: "An unowned metric is not measured, and an unmeasured metric is not steered. Governance.",
    },
    {
      id: "w3-09",
      text: "A team keeps a dashboard open on 12 wall-mounted screens 24/7 when only one is watched.",
      answer: "U",
      why: "The equipment is justified; the usage pattern is not. Category follows the thing you would change.",
    },
    {
      id: "w3-10",
      text: "The corporate travel policy defaults to flights for meetings that could be video calls.",
      answer: "Em",
      why: "This is IT as enabler. The emissions sit outside IT, but the digital alternative is IT's to offer.",
    },
  ],
  closing:
    "Several of these could carry two tags. The useful question is not “which box is correct” but “which lever would you actually pull” — the category follows the lever.",
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
  why: "Green IT stalls at the boundary between roles, not inside them. Knowing who cannot hand a decision on is how you find the person who has to sign.",
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
  why: "There is no correct roadmap. There is an order that works and an order that produces an expensive re-run — this shows you which is which.",
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
  task: "Tag each of the five statements, then read why. This is the test you will apply to your own slides.",
  why: "Boards do not punish small measures. They punish small measures presented as strategy. Being able to label your own work correctly is what keeps you credible.",
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
  why: "This is the calculation to have ready when someone proposes replacing a fleet early to save energy. It is the most common well-meant mistake in Green IT, and one slider settles it.",
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
  { level: "L2 · Application", widgets: [W4, W11, W5, W6] },
  { level: "L3 · Management decision", widgets: [W7, W8, W9] },
];

export const ALL_WIDGETS: WidgetMeta[] = WIDGET_INDEX.flatMap((l) => l.widgets);
