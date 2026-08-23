// L2 v2 — dilemma cards. A faster shape than the four-quarter story: three
// helpdesk tickets, two options each, and three dashboard metrics that move.
//
// Runs alongside the story rather than replacing it. N3 still applies: the
// company is invented and is not MediPrint, NordCom or Auron.

import type { FieldNote } from "./learn";

export type MetricId = "budget" | "esg" | "feasibility";

export const METRICS: {
  id: MetricId;
  icon: string;
  name: string;
  meaning: string;
  start: number;
}[] = [
  {
    id: "budget",
    icon: "💰",
    name: "Budget",
    meaning: "Headroom left this year. Spending lowers it; a real saving raises it.",
    start: 55,
  },
  {
    id: "esg",
    icon: "🌿",
    name: "ESG score",
    meaning: "What you could actually evidence if a customer or auditor asked today.",
    start: 25,
  },
  {
    id: "feasibility",
    icon: "⚙️",
    name: "Feasibility",
    meaning: "Capacity and authority to deliver what you have committed to.",
    start: 60,
  },
];

export type Option = {
  id: "a" | "b";
  label: string;
  title: string;
  body: string;
  effort: string;
  deltas: Record<MetricId, number>;
  /** What actually happens, named plainly. */
  consequence: string;
  /** The transferable rule. */
  principle: string;
  note?: FieldNote;
};

export type Ticket = {
  id: string;
  from: string;
  role: string;
  subject: string;
  complaint: string;
  /** The tension in one line, so the trade-off is visible before choosing. */
  tension: string;
  options: [Option, Option];
};

export const L2V2 = {
  id: "l2-v2",
  xp: 20,
  company: "Marchgate Supply",
  objective:
    "Recognise fields of action, set priorities, and analyse the conflict between economics, sustainability and feasibility",
  hook: [
    "Marchgate Supply is a mid-sized retail distributor: eleven regional depots, one central warehouse, and about 900 people. Fourteen months ago it moved its core systems to the cloud on the promise of lower costs. The bill has gone up every quarter since, and nobody can say which workload is responsible. Meanwhile the warehouse has accumulated roughly three hundred retired barcode scanners in a corner nobody will sign a disposal form for.",
    "You are the IT Manager. Three tickets are open, each from someone who wants their own problem solved this week. Every fix costs something on one of the three dials you are measured on — and no option pays all three. Choose, and watch the dashboard.",
  ],
  tickets: [
    {
      id: "t-finance",
      from: "Finance",
      role: "Head of Finance",
      subject: "Cloud spend — this has to come down",
      complaint:
        "Our cloud spend is up more than a third on last year, and the business case for moving promised the opposite. I need it cut before the next board pack. I do not need a project — I need a number that is smaller.",
      tension:
        "The fast fix and the real fix point in different directions, and only one of them fits in the time available.",
      options: [
        {
          id: "a",
          label: "A",
          title: "Audit the workloads and right-size properly",
          body:
            "Find what is actually running: orphaned storage, oversized instances, test environments nobody owns. Then right-size, commit the stable workloads, and move batch jobs to off-peak hours.",
          effort: "A quarter of work, and two people you do not currently have free.",
          deltas: { budget: 16, esg: 14, feasibility: -22 },
          consequence:
            "It works, and it is the only option that changes why the bill grows rather than what it is this month. It also lands after the board pack, and the two people it needs are committed elsewhere — so you are promising something you cannot yet staff.",
          principle:
            "The right answer you cannot deliver is worth less than the adequate one you can. Check capacity before you commit, not after.",
        },
        {
          id: "b",
          label: "B",
          title: "Switch off dev and test outside working hours",
          body:
            "One scheduled job, applied to every non-production environment. Nothing else changes.",
          effort: "An afternoon.",
          deltas: { budget: 8, esg: 5, feasibility: 6 },
          consequence:
            "The bill drops, Finance is satisfied, and you have bought yourself credibility cheaply. Nothing has changed about how workloads get provisioned, so the growth resumes next quarter from a slightly lower base.",
          principle:
            "A symptom fix is legitimate when it buys time for the structural one — and only if you then use the time. Say out loud which of the two you are doing.",
        },
      ],
    },
    {
      id: "t-ops",
      from: "Operations",
      role: "Warehouse Manager",
      subject: "Scanners keep dying mid-shift",
      complaint:
        "Pickers are losing half an hour a shift to scanners that freeze or lose charge. I want two hundred new units. And while you are here — there are three hundred old ones in the back of the warehouse that nobody will let me get rid of.",
      tension:
        "The obvious purchase is the expensive one, and the pile in the corner is a liability whichever way you go.",
      options: [
        {
          id: "a",
          label: "A",
          title: "Triage, refurbish, and change the replacement rule",
          body:
            "Test the fleet and replace only genuine failures. Refurbish what works, batteries first. Send the rest to a certified WEEE recycler with documentation. Move the supply contract from annual swap to condition-based.",
          effort: "Three months, and Procurement has to agree to reopen the contract.",
          deltas: { budget: 12, esg: 22, feasibility: -16 },
          consequence:
            "You buy perhaps sixty units instead of two hundred, the pile becomes documented recycling rather than a liability, and the contract stops replacing working equipment on a date. Procurement will push back, because it narrows their supplier field without giving them staff.",
          principle:
            "Most refresh cycles are inherited from a contract nobody has reread. The renewal date, not the device, is the intervention point.",
          note: {
            text: "62 million tonnes of e-waste were generated globally in 2022 and only about 22% was formally collected and recycled. A pile of working scanners in a warehouse corner is that statistic, one company at a time.",
            source: "ewaste",
          },
        },
        {
          id: "b",
          label: "B",
          title: "Buy the two hundred, clear the corner",
          body:
            "New units on the floor next month. The old ones go out with the general waste during the depot clear-out.",
          effort: "Two weeks and a purchase order.",
          deltas: { budget: -20, esg: -16, feasibility: 14 },
          consequence:
            "The shift problem disappears immediately and Operations stops calling. You have also spent a fifth of the year's budget, thrown away three hundred devices whose manufacturing footprint was already paid for, and put undocumented electronics into general waste — which is the part that becomes a problem if anyone audits it.",
          principle:
            "Speed is a real benefit and disposal is a real risk. The mistake is not choosing speed; it is choosing it without pricing what leaves the building.",
        },
      ],
    },
    {
      id: "t-marketing",
      from: "Marketing",
      role: "Head of Marketing",
      subject: "We need green credentials — fast",
      complaint:
        "One of our largest retail customers has added a sustainability section to their supplier portal. There is a deadline. Can we get some kind of certification or badge this quarter so I can fill it in?",
      tension:
        "What Marketing is asking for and what the customer is asking for are not the same thing.",
      options: [
        {
          id: "a",
          label: "A",
          title: "Answer what the portal actually asks",
          body:
            "Read the questions. Publish the figures you have, state plainly what you cannot yet measure, attach the device lifecycle rule, and name an accountable contact.",
          effort: "Four weeks, and an uncomfortable conversation about the gaps.",
          deltas: { budget: -4, esg: 20, feasibility: -4 },
          consequence:
            "You submit something incomplete but true, with a named owner and a date against each gap. Buyers accept that far more often than people expect, because it is auditable — and an admitted gap with a plan reads as control, not weakness.",
          principle:
            "A supplier questionnaire is not a marketing surface. It asks for evidence, and evidence you have to qualify still beats a claim you cannot support.",
        },
        {
          id: "b",
          label: "B",
          title: "Buy offsets and put the badge on the site",
          body:
            "Purchase carbon offsets covering estimated IT emissions, take the accompanying logo, and add a sustainability page this month.",
          effort: "Two weeks and an invoice.",
          deltas: { budget: -14, esg: 4, feasibility: 10 },
          consequence:
            "Marketing is delighted and the portal field gets filled. The customer asked for evidence about your operations and received a claim about someone else's — offsets do not move an intensity metric, and the questions underneath remain unanswered. You have also created a public statement you now have to be able to defend.",
          principle:
            "The exposure is never having a weak position. It is publishing a position you cannot evidence.",
          note: {
            text: "In April 2025 the Frankfurt public prosecutor fined DWS, Deutsche Bank's asset manager, €25 million after a three-year investigation: its marketing claims about ESG did not match what its processes actually did. The claim was the liability, not the performance.",
            source: "dws",
          },
        },
      ],
    },
  ] satisfies Ticket[],

  /** Read from where the three metrics land. */
  profiles: [
    {
      id: "guardian",
      test: (m: Record<MetricId, number>) => m.budget >= 60 && m.esg < 40,
      title: "You protected the budget and answered nothing",
      text: "Every metric that Finance watches is healthy and the customer question is still open. This survives one review and is hard to fund at the next, because nothing you did is visible to anyone outside IT.",
    },
    {
      id: "overcommitted",
      test: (m: Record<MetricId, number>) => m.esg >= 55 && m.feasibility < 40,
      title: "You chose well and may not be able to deliver",
      text: "The decisions are the right ones and you have committed more than your capacity and authority can carry. This is the most common way a good Green IT programme fails — not rejected, just quietly late until it is cancelled.",
    },
    {
      id: "balanced",
      test: (m: Record<MetricId, number>) => m.esg >= 45 && m.feasibility >= 45,
      title: "Defensible on all three",
      text: "Nothing here is spectacular, and all of it can be evidenced, staffed and paid for. That is what an executive means by a credible plan.",
    },
    {
      id: "reactive",
      test: () => true,
      title: "You solved three complaints and built nothing",
      text: "Each ticket is closed and the person who raised it is satisfied. None of the three changed a rule, so all three return — and the year produced service rather than progress.",
    },
  ],

  closing:
    "Three tickets, three trade-offs, and no option that paid all three dials. That is the ordinary condition of the job — the skill is not finding the free choice, it is being able to say which dial you chose to pay from and why.",
};
