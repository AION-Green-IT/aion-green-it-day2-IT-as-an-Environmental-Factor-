// Task 2 — sits under the DataForm hero. Worksheet wording is reproduced as
// issued; the assessments and guidance are the coaching layer, revealed after
// the learner commits to a priority.

export type Rating = "strong" | "mixed" | "weak";

export type Criterion = {
  key: string;
  label: string;
  rating: Rating;
  note: string;
};

export type Measure = {
  id: string;
  letter: "A" | "B" | "C";
  title: string;
  summary: string;
  criteria: Criterion[];
  verdict: string;
  /** The conditions under which this weaker choice becomes the right one. */
  whenRight: string;
};

export const TASK2 = {
  number: "Task 2",
  title: "Which measure reduces the environmental impact most sensibly?",
  lead: "In the short term, a company can implement only one of three measures.",

  measures: [
    {
      id: "measure-a",
      letter: "A",
      title: "Replace old workplace devices with new, more energy-efficient models",
      summary:
        "Swap the current workplace fleet for newer hardware that draws less power in use.",
      criteria: [
        {
          key: "impact",
          label: "Environmental impact",
          rating: "mixed",
          note: "Lower use-phase energy, but the manufacturing footprint of a whole new fleet is spent up front — and can outweigh the energy saved.",
        },
        {
          key: "viability",
          label: "Economic viability",
          rating: "weak",
          note: "The largest capital outlay of the three, against a limited budget.",
        },
        {
          key: "feasibility",
          label: "Feasibility",
          rating: "strong",
          note: "Buying and rolling out devices is a well-understood process.",
        },
        {
          key: "risk",
          label: "Risk",
          rating: "mixed",
          note: "Low operationally, high on footprint: replacing working devices early is the common well-meant mistake.",
        },
        {
          key: "time",
          label: "Time required",
          rating: "mixed",
          note: "Procurement and rollout take a quarter or two.",
        },
        {
          key: "strategic",
          label: "Strategic significance",
          rating: "weak",
          note: "Changes nothing about how devices are run, bought or retired — the same cycle repeats next time.",
        },
      ],
      verdict: "Visible and easy to approve, but the weakest environmental case.",
      whenRight:
        "Right when devices are genuinely at end of life, or so inefficient that the use-phase saving clears the embodied cost of building new ones.",
    },
    {
      id: "measure-b",
      letter: "B",
      title:
        "Consolidate servers with low utilisation and introduce binding shutdown and operating rules",
      summary:
        "Remove idle and duplicated capacity, and set rules for when systems and devices run.",
      criteria: [
        {
          key: "impact",
          label: "Environmental impact",
          rating: "strong",
          note: "Idle and duplicated capacity is pure waste; removing it cuts energy immediately.",
        },
        {
          key: "viability",
          label: "Economic viability",
          rating: "strong",
          note: "Little capital, and it lowers the energy bill from the first month.",
        },
        {
          key: "feasibility",
          label: "Feasibility",
          rating: "mixed",
          note: "Consolidation needs a look at what runs where; the operating rules are mostly a decision.",
        },
        {
          key: "risk",
          label: "Risk",
          rating: "mixed",
          note: "Availability is the concern — stage it, and keep a rollback for anything customer-facing.",
        },
        {
          key: "time",
          label: "Time required",
          rating: "strong",
          note: "Rules can start now; consolidation follows the review.",
        },
        {
          key: "strategic",
          label: "Strategic significance",
          rating: "strong",
          note: "Builds the transparency and baseline every later decision depends on.",
        },
      ],
      verdict:
        "The strongest first move: short-term, low-cost, and it creates the data the others need.",
      whenRight:
        "Right first in almost every case where consumption data is thin — which is exactly this one.",
    },
    {
      id: "measure-c",
      letter: "C",
      title:
        "Extend device service life through repair, reuse and changed procurement criteria",
      summary:
        "Keep devices in service longer, and change what gets bought and how it is retired.",
      criteria: [
        {
          key: "impact",
          label: "Environmental impact",
          rating: "strong",
          note: "Attacks the embodied cost directly by spreading it over more years of service.",
        },
        {
          key: "viability",
          label: "Economic viability",
          rating: "strong",
          note: "Fewer purchases over time, though repair and reuse need setting up.",
        },
        {
          key: "feasibility",
          label: "Feasibility",
          rating: "mixed",
          note: "Needs procurement criteria and a repair/reuse route — a change of rules, not a one-off project.",
        },
        {
          key: "risk",
          label: "Risk",
          rating: "mixed",
          note: "Support windows, security updates and battery wear are the real objections, not carbon.",
        },
        {
          key: "time",
          label: "Time required",
          rating: "weak",
          note: "It only bites at the next refresh decision, so the payback is medium to long term.",
        },
        {
          key: "strategic",
          label: "Strategic significance",
          rating: "strong",
          note: "Changes how devices are bought and retired for good.",
        },
      ],
      verdict:
        "The highest resource lever, but it pays back over years, not this quarter.",
      whenRight:
        "Right as the structural follow-on to B, once a baseline exists to aim it with.",
    },
  ] satisfies Measure[],

  conditionsHeading: "General conditions",
  conditions: [
    "The investment budget is limited",
    "Precise consumption data is only partly available",
    "The board expects results that are visible in the short term",
    "IT wants to avoid operating risks",
    "The departments want high availability and little disruption",
  ],

  assignmentHeading: "Work assignment",
  assignment: [
    "Assess each measure in terms of environmental impact, economic viability, feasibility, risk, time required and strategic significance.",
    "Make a prioritisation decision.",
    "Justify why your decision is viable even with an incomplete data situation.",
    "Name at least three pieces of information that would be helpful for an even better decision.",
    "Formulate which trade-offs become visible in your decision.",
  ],

  helpfulInfoHeading: "Information that would sharpen the decision",
  helpfulInfo: [
    "Actual utilisation of each server, so consolidation targets are real rather than guessed.",
    "Per-area or per-device energy figures, to separate IT from the building load.",
    "The true condition and remaining support window of the current device fleet.",
    "Which systems are customer-facing, so operating rules can spare them.",
  ],

  tradeoffsHeading: "Trade-offs that become visible",
  tradeoffs: [
    "Short-term visibility (A) versus long-term impact (B and C).",
    "Spending capital now (A) versus spending attention and rules now (B, C).",
    "The availability departments want versus the operating rules that cut waste.",
    "Energy efficiency (A) versus resource conservation (C) — different levers, not the same one.",
  ],

  guidanceHeading: "A defensible priority under incomplete data",
  guidance:
    "Under a limited budget and thin data, the strongest first move is usually B: consolidation plus binding shutdown and operating rules. It is cheap, visible within a quarter, carries the least capital risk, and — crucially — produces the consumption baseline the other two decisions need. A is the well-meant mistake: replacing working devices early spends their embodied footprint again. C is the highest resource lever, but it pays back over years, so it belongs after B, not instead of it. The point of Task 2 is not to find the one right box — it is to defend a priority under incomplete data, and to name what you traded away.",

  noteHeading: "Didactic note",
  note: "The task deliberately practises dealing with uncertainty, budget restrictions and trade-offs.",

  objectiveHeading: "Objective",
  objective:
    "Preparing decisions not only from a technical perspective, but from a management point of view.",
};
