// L2 experiential scenario — Meridian Logistics AG (Day 2 reframe).
//
// Day 2 L2 objective: analyse the drivers of energy and resource consumption,
// identify levers for reduction, and assess measures under economic and
// organisational conditions — weighing the goal conflicts. The engine (phases,
// stakeholders, HUD, inbox, endings) is unchanged; the story is Day 2.
//
// NS1: Meridian is a fictional company; nothing here references DataForm,
// NetCore or Artemis, and nothing here leaks into /learn or /training.
// NS2: at pick time every option is valid; tags are factual.
// NS3: consequences arrive as world state, never as verdicts.
// NS5: reveal vocabulary is permitted only in the debrief.
// Choice LETTERS keep their strategic meaning across phases so lib/types.ts
// computeSignals / computeEnding still classify the sequence correctly.

import type { CategoryCode } from "./categories";
import type { SourceKey } from "./sources";
import type { EndingId, Mood, Phase, StakeholderKey } from "@/lib/types";

export const STAKEHOLDERS: Record<
  StakeholderKey,
  {
    name: string;
    role: string;
    tint: string;
    /** What they are pushing for. */
    wants: string;
    /** The lever they actually hold over you. */
    controls: string;
    /** Why they behave that way — none of them is an obstacle by temperament. */
    why: string;
  }
> = {
  marcus: {
    name: "Marcus Vogel",
    role: "CIO",
    tint: "#6E8DC1",
    wants: "Quick wins he can carry into the quarterly board meeting.",
    controls: "Your objectives, your budget request, and what the board hears about you.",
    why: "He is your boss and not an obstacle. It is his own position that is exposed if the board's request produces nothing it can see.",
  },
  sabine: {
    name: "Sabine Keller",
    role: "Head of Procurement",
    tint: "#F1B24A",
    wants: "No drama. Three tenders close this quarter and she is already at capacity.",
    controls: "The vendor list and the buying criteria. Nothing is bought outside them, and she decides what goes on them.",
    why: "Fifteen years at Meridian. She has watched IT arrive with a new priority before, and watched it leave again.",
  },
  rafael: {
    name: "Rafael Costa",
    role: "Head of Operations",
    tint: "#6FB56A",
    wants: "IT that does not move. Every disruption is a delayed order and an unhappy customer.",
    controls: "Warehouse change windows. Nothing is switched off, consolidated or rescheduled without his sign-off.",
    why: "He is measured on orders shipped, not on energy. Availability is not caution for him, it is the job.",
  },
  elena: {
    name: "Elena",
    role: "CFO",
    tint: "#B389D6",
    wants: "A concrete return she can set against the line item.",
    controls: "Budget approval. She does not sit in your meetings; she reads the numbers afterwards.",
    why: "She has not appeared yet, which is why her position starts as unknown. You will hear from her the moment a figure needs justifying.",
  },
};

export const MOOD_LABEL: Record<Mood, string> = {
  unknown: "Unknown",
  hostile: "Hostile",
  skeptical: "Sceptical",
  wary: "Wary",
  neutral: "Neutral",
  warming: "Warming",
  ally: "Ally",
};

export const MOOD_COLOUR: Record<Mood, string> = {
  hostile: "#B33A3A",
  skeptical: "#C0721D",
  wary: "#D9A24A",
  unknown: "#9994A3",
  neutral: "#5F7A8E",
  warming: "#68A48A",
  ally: "#2F9E5A",
};

// ---------------------------------------------------------------- artifacts

export type FigureArt =
  | "audit-preview"
  | "laptop-photo"
  | "workshop-notes"
  | "consultant-report"
  | "fleet-dashboard"
  | "cloud-savings";

export type Artifact =
  | { id: string; kind: "email"; from: StakeholderKey | "external"; fromName: string; role: string; to?: string; time: string; subject: string; body: string[]; forwarded?: boolean }
  | { id: string; kind: "slack"; channel: string; from: StakeholderKey | "external"; fromName: string; role: string; time: string; message: string }
  | { id: string; kind: "memo"; from: StakeholderKey; fromName: string; to: string; date: string; subject: string; body: string[] }
  | { id: string; kind: "calendar"; title: string; day: string; time: string; attendees: string[]; urgent?: boolean }
  | { id: string; kind: "dashboard"; title: string; segments: { label: string; value: number; category: CategoryCode }[]; caption: string; details: { label: string; points: string[] }[] }
  | { id: string; kind: "slide"; template: "nordvind-draft" }
  | { id: string; kind: "orgchart"; highlightNodeId: string }
  | { id: string; kind: "figure"; title: string; desc: string; art: FigureArt; caption?: string };

export const ARTIFACTS: Record<string, Artifact> = {
  "meridian/email-marcus-opening": {
    id: "meridian/email-marcus-opening",
    kind: "email",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    to: "Nadia Rahmani",
    time: "08:47",
    subject: "IT energy & cost — the board wants a plan",
    body: [
      "Nadia — the board has noticed our IT electricity and operating cost climbing every quarter, faster than headcount. They want a first plan to bring energy and resource use down — and the cost that rides with it — without breaking the warehouses.",
      "Board meeting is in 12 weeks. They want to see your plan.",
      "Handle this.",
      "— M",
    ],
  },
  "meridian/slack-sabine-heads-up": {
    id: "meridian/slack-sabine-heads-up",
    kind: "slack",
    channel: "DM",
    from: "sabine",
    fromName: "Sabine Keller",
    role: "Head of Procurement",
    time: "09:12",
    message:
      "heard about the “green IT” push. please don't turn this into new buying rules mid-quarter — three tenders close and i'm at capacity.",
  },
  "meridian/email-rafael-cold": {
    id: "meridian/email-rafael-cold",
    kind: "email",
    from: "rafael",
    fromName: "Rafael Costa",
    role: "Head of Operations",
    time: "09:34",
    subject: "Re: energy plan — a warning",
    forwarded: true,
    body: [
      "If this touches anything in the warehouses — shutting systems down, consolidating servers, changing schedules — I need two weeks' notice and a fallback. Every hour of downtime is a delayed order.",
    ],
  },

  // --- Phase 1 outcomes
  "meridian/artifact-audit-preview": {
    id: "meridian/artifact-audit-preview",
    kind: "figure",
    title: "Energy & inventory audit — partial results",
    desc: "A dashboard part-filled with data, three panels populated and two still empty.",
    art: "audit-preview",
  },
  "meridian/calendar-urgent-marcus": {
    id: "meridian/calendar-urgent-marcus",
    kind: "calendar",
    title: "URGENT — board is asking, what am I telling them?",
    day: "Thursday",
    time: "16:30",
    attendees: ["Marcus Vogel", "Nadia Rahmani"],
    urgent: true,
  },
  "meridian/slack-marcus-doorway": {
    id: "meridian/slack-marcus-doorway",
    kind: "slack",
    channel: "DM",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    time: "09:20",
    message:
      "came by, you were in the audit review. board wants an update next week. what am I telling them?",
  },
  "meridian/artifact-laptop-photo": {
    id: "meridian/artifact-laptop-photo",
    kind: "figure",
    title: "Fifty new laptops, staged in the warehouse",
    desc: "Stacked boxes of new laptops on a warehouse pallet, photographed for reporting.",
    art: "laptop-photo",
  },
  "meridian/email-sabine-complaint": {
    id: "meridian/email-sabine-complaint",
    kind: "email",
    from: "sabine",
    fromName: "Sabine Keller",
    role: "Head of Procurement",
    to: "Marcus Vogel · cc People & Culture",
    time: "16:55",
    subject: "Procurement process — the laptop order",
    body: [
      "Marcus — fifty units went through on a fast-track authorisation without passing procurement. I found out when the invoice arrived.",
      "I am not objecting to the devices. I am objecting to being told afterwards. If the energy programme is going to work this way, say so now and I will plan around it.",
    ],
  },
  "meridian/email-audit-late": {
    id: "meridian/email-audit-late",
    kind: "email",
    from: "external",
    fromName: "Facilities",
    role: "Energy reporting",
    time: "11:20",
    subject: "Energy breakdown — first pass",
    body: [
      "First pass at the IT breakdown you asked for. The on-prem data centre is the dominant line, running at low utilisation. The laptop fleet comes out at roughly 12% of the IT footprint — the one you just spent on.",
    ],
  },
  "meridian/artifact-workshop-notes": {
    id: "meridian/artifact-workshop-notes",
    kind: "figure",
    title: "Workshop whiteboard",
    desc: "A whiteboard divided into columns by function, each with sticky notes and one name written at the top.",
    art: "workshop-notes",
  },
  "meridian/slack-marcus-nervous": {
    id: "meridian/slack-marcus-nervous",
    kind: "slack",
    channel: "DM",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    time: "17:05",
    message: "any movement I can point at?",
  },
  "meridian/artifact-consultant-report": {
    id: "meridian/artifact-consultant-report",
    kind: "figure",
    title: "External assessment — 47 pages",
    desc: "The cover of a thick bound consultancy report with a page count on the spine.",
    art: "consultant-report",
    caption:
      "Benchmarks, sector averages and a maturity model. Nothing in it names a Meridian system, a Meridian site or a Meridian person.",
  },
  "meridian/memo-elena-questions": {
    id: "meridian/memo-elena-questions",
    kind: "memo",
    from: "elena",
    fromName: "Elena",
    to: "Nadia Rahmani",
    date: "Week 5",
    subject: "Advisory engagement — cost breakdown",
    body: [
      "Please break down the €45k against expected outcomes. I need to show the line against something.",
    ],
  },

  // --- Phase 2
  "meridian/dashboard-footprint-preview": {
    id: "meridian/dashboard-footprint-preview",
    kind: "dashboard",
    title: "Where Meridian's IT energy goes",
    segments: [
      { label: "Data centre on-prem", value: 42, category: "Op" },
      { label: "Cloud sprawl (3 providers)", value: 25, category: "Op" },
      { label: "Laptop fleet (800 units, avg 5.8y)", value: 18, category: "Rp" },
      { label: "Other (network, print, misc)", value: 15, category: "U" },
    ],
    caption:
      "PUE 2.1 · fleet avg 5.8y with a refresh backlog · idle cloud resources never consolidated.",
    details: [
      {
        label: "Data centre on-prem",
        points: [
          "Installed in 2016 and never re-planned.",
          "PUE 2.1 — for every unit reaching the computing, 1.1 more goes to cooling, conversion and the building.",
          "Many systems at low utilisation, and the one Rafael's warehouses depend on.",
        ],
      },
      {
        label: "Cloud sprawl",
        points: [
          "Three providers, adopted separately.",
          "Cost up 60% year on year.",
          "Idle resources never consolidated; nothing bought on a life-cycle criterion.",
        ],
      },
      {
        label: "Laptop fleet",
        points: [
          "800 units, average age 5.8 years.",
          "A three-year refresh cycle on paper, with a backlog that puts most of the fleet past it.",
          "The most visible area to employees, and the smallest of the three drivers.",
        ],
      },
    ],
  },
  "meridian/email-rafael-warning": {
    id: "meridian/email-rafael-warning",
    kind: "email",
    from: "rafael",
    fromName: "Rafael Costa",
    role: "Head of Operations",
    time: "07:55",
    subject: "Consolidation windows",
    body: [
      "A consolidation of that size touches every warehouse system. I want the cutover plan in writing before anything is switched off, and I want the fallback in the same document.",
    ],
  },
  "meridian/artifact-fleet-dashboard": {
    id: "meridian/artifact-fleet-dashboard",
    kind: "figure",
    title: "Fleet life-cycle tracker",
    desc: "A tracker showing device ages grouped into bands, with a refurbishment queue alongside.",
    art: "fleet-dashboard",
  },
  "meridian/artifact-cloud-savings": {
    id: "meridian/artifact-cloud-savings",
    kind: "figure",
    title: "Cloud consolidation — running total",
    desc: "A descending line chart with idle resources marked as they are switched off.",
    art: "cloud-savings",
  },
  "meridian/slack-team-confusion": {
    id: "meridian/slack-team-confusion",
    kind: "slack",
    channel: "#greenit-delivery",
    from: "external",
    fromName: "Delivery team",
    role: "IT",
    time: "10:41",
    message: "which workstream is the priority this sprint?",
  },

  // --- Phase 3 (the goal conflict)
  "meridian/memo-rafael-block": {
    id: "meridian/memo-rafael-block",
    kind: "memo",
    from: "rafael",
    fromName: "Rafael Costa",
    to: "Nadia Rahmani",
    date: "Week 10",
    subject: "Change window request — my answer",
    body: [
      "You want shutdown and consolidation across all three sites this quarter. I can give you ONE site's change window, with a rollback written into the same plan.",
      "All three at once, in peak season, I can't sign. If a warehouse's scanners drop for even thirty minutes, that is hundreds of delayed orders.",
    ],
  },
  "meridian/memo-elena-roi": {
    id: "meridian/memo-elena-roi",
    kind: "memo",
    from: "elena",
    fromName: "Elena",
    to: "Nadia Rahmani",
    date: "Week 10",
    subject: "Before the rest of the budget",
    body: [
      "Before I release the remaining budget, show me the return on the first site — energy or euros saved, per euro spent. A measured number, not a projection.",
    ],
  },
  "meridian/email-rafael-incident": {
    id: "meridian/email-rafael-incident",
    kind: "email",
    from: "rafael",
    fromName: "Rafael Costa",
    role: "Head of Operations",
    time: "13:12",
    subject: "This is what I warned about",
    body: [
      "Told you. A cutover in the Bremen warehouse dropped the handheld scanners for forty minutes at peak — around 300 orders delayed and two customers on the phone. Escalating this to the board.",
    ],
  },
  "meridian/slack-marcus-check": {
    id: "meridian/slack-marcus-check",
    kind: "slack",
    channel: "DM",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    time: "13:36",
    message: "the saving is real though, right? I still put it on the board slide?",
  },
  "meridian/memo-elena-pleased": {
    id: "meridian/memo-elena-pleased",
    kind: "memo",
    from: "elena",
    fromName: "Elena",
    to: "Nadia Rahmani",
    date: "Week 11",
    subject: "Re: first-site pilot",
    body: [
      "The one-site pilot shows a real, measured saving per euro spent. Extend it — and now I can defend the line to the board myself.",
    ],
  },
  "meridian/slack-rafael-relieved": {
    id: "meridian/slack-rafael-relieved",
    kind: "slack",
    channel: "DM",
    from: "rafael",
    fromName: "Rafael Costa",
    role: "Head of Operations",
    time: "15:02",
    message: "voluntary guidelines? fine by me. nothing changes in my windows, so no objection.",
  },
  "meridian/email-rafael-partner": {
    id: "meridian/email-rafael-partner",
    kind: "email",
    from: "rafael",
    fromName: "Rafael Costa",
    role: "Head of Operations",
    time: "14:20",
    subject: "Re: shared operating standard",
    body: [
      "Framed as fewer idle systems and cleaner operations, I can sell this to my shift leads — they hate the noise and heat too. Let's write the standard together and pilot it in one aisle first.",
    ],
  },

  // --- Phase 4
  "meridian/org-chart-empty": {
    id: "meridian/org-chart-empty",
    kind: "orgchart",
    highlightNodeId: "owner",
  },
};

export const MERIDIAN_ARTIFACT_IDS = Object.keys(ARTIFACTS);

// ---------------------------------------------------------------- phases

export type TagKey = "clock" | "wallet" | "target" | "eye" | "handshake" | "doc" | "chartDown" | "megaphone" | "shield" | "feather" | "question" | "scales" | "dice" | "globe" | "key" | "warning" | "rocket" | "turtle" | "brain" | "recycle" | "gap" | "trophy";

export type Choice = {
  id: string;
  title: string;
  body: string;
  /**
   * Who has a stake in this option. Knowable before deciding — unlike how they
   * will react, which is the thing the scenario is actually about.
   */
  touches: StakeholderKey[];
  tags: { icon: TagKey; text: string }[];
  category: CategoryCode;
  consequence: {
    weekSet?: number;
    weekAdd?: number;
    budget: number;
    moods: Partial<Record<StakeholderKey, Mood>>;
    /** Applied only when the stakeholder is currently in `whenCurrent`. */
    moodsIf?: { key: StakeholderKey; whenCurrent: Mood; then: Mood }[];
    revealNow: string[];
    revealNextPhase: string[];
  };
};

/** How to think about a phase, never which option to take. */
export type Briefing = {
  short: string;
  /** Each question carries what a good answer sounds like — never which one. */
  questions: { q: string; lookFor: string }[];
  more: {
    title: string;
    paragraphs: string[];
    links: { label: string; source: SourceKey; note: string }[];
  };
};

export type PhaseSpec = {
  id: Phase;
  briefing: Briefing;
  banner: { left: string; right: string };
  readBack: string;
  /** Artifacts shown above the choices for this phase. */
  opener: string[];
  choices: Choice[];
  next: Phase;
};

export const PROLOGUE = {
  company: {
    title: "Meridian Logistics AG",
    subline:
      "Mid-size European logistics & fulfilment · 800 employees · 3 sites (HQ + 2 warehouses)",
    growth:
      "The business has grown 40% in two years. IT has not kept pace with it, and the energy and cost that come with it are now climbing every quarter.",
    /** The state of the estate — the thing Nadia has inherited. */
    estateTitle: "What you have inherited",
    estate: [
      {
        label: "Hybrid, and unplanned",
        text: "An ageing on-premise data centre running at low utilisation, alongside cloud services from three providers adopted at different times for different reasons.",
      },
      {
        label: "A mixed laptop fleet",
        text: "No standard model and no standard age. What a person is issued depends on when and where they joined, and most are past the refresh date on paper.",
      },
      {
        label: "Decentralised device procurement",
        text: "Each site buys its own hardware on price and speed. There is no single list of what Meridian owns, and no life-cycle criterion.",
      },
      {
        label: "Electricity climbing every quarter",
        text: "Data centre and estate consumption has risen in each of the last several quarters. Nobody has been asked why.",
      },
      {
        label: "No number for the footprint",
        text: "Not one person in the company holds a firm figure for IT's energy or resource use. Not IT, not Facilities, not Finance.",
      },
    ],
  },
  role: "You are Nadia, IT Strategy Lead. Six weeks in the role. Direct report to Marcus (CIO).",
  artifacts: [
    "meridian/email-marcus-opening",
    "meridian/slack-sabine-heads-up",
    "meridian/email-rafael-cold",
  ],
  situation:
    "12 weeks. Budget not confirmed. No baseline data. The board wants a first plan to cut IT energy and resource use — and its cost — without disrupting the warehouses.",
};

export const PHASES: PhaseSpec[] = [
  {
    id: "p1",
    briefing: {
      short:
        "A first move is not just what you do — it is what you can still know afterwards. Before picking, separate a driver you can measure from a move that only looks like progress.",
      questions: [
        {
          q: "Which of these produces a number you do not have yet?",
          lookFor:
            "You are listening for whether the output is a fact or an impression. An audit reveals where the energy and resources actually go. A photograph of new laptops produces a feeling. Both are useful; only one can be argued from.",
        },
        {
          q: "Which produces something to show — and is visibility what is scarce right now, or is it evidence?",
          lookFor:
            "Scarcity decides. If the programme is safe, visibility is cheap and evidence is valuable. If it is about to be cut, the reverse is true.",
        },
        {
          q: "What does each one make impossible for the next eight weeks?",
          lookFor:
            "Add the duration on the card to today. Whatever falls after that date is what you just gave up, whether or not anyone names it.",
        },
      ],
      more: {
        title: "Finding the drivers before you spend on a lever",
        paragraphs: [
          "A driver is where energy or resources actually go: a data centre running at low utilisation, a cooling setpoint, devices kept running out of hours, a fleet replaced by the calendar, cloud resources left idle. A first move either reveals a driver you can then reduce, or spends capital before you know which driver was largest.",
          "Every first move spends the same twelve weeks. The real cost of an option is not on its price tag — it is the option it forecloses. Six weeks of audit means six weeks not spent on a visible win. Three weeks of a photo-friendly refresh means arriving at Phase 2 with no baseline to argue from.",
          "Meridian's estate has four candidate drivers: what the data centre draws, how long devices live, how cloud is bought and run, and who decides any of it. Nothing in Phase 1 reduces one. It decides which one you will be able to see clearly.",
        ],
        links: [
          {
            label: "Where a device's footprint actually sits",
            source: "techCarbon",
            note: "Most of it is spent making the device — which is why an early refresh can raise the total.",
          },
          {
            label: "How large data-centre energy really is",
            source: "ieaEnergyAi",
            note: "The dominant line in most estates, and the hardest to see without a baseline.",
          },
        ],
      },
    },
    banner: { left: "Phase 1 · Week 1", right: "Your first move sets the pattern." },
    readBack:
      "One week to establish direction. Marcus wants something for the board. Sabine warned you off new rules mid-quarter. Rafael doesn't want disruption. What do you do first?",
    opener: [],
    next: "p2",
    choices: [
      {
        id: "p1-a",
        touches: ["marcus", "elena"],
        title: "Data first",
        body: "Commission an energy audit and device inventory before any commitments — get the drivers you cannot see yet.",
        tags: [
          { icon: "clock", text: "6–8 weeks" },
          { icon: "wallet", text: "low cost" },
          { icon: "target", text: "fact base" },
        ],
        category: "Op",
        consequence: {
          weekSet: 6,
          budget: 5,
          moods: { marcus: "skeptical" },
          revealNow: ["meridian/artifact-audit-preview"],
          revealNextPhase: [
            "meridian/calendar-urgent-marcus",
            "meridian/slack-marcus-doorway",
          ],
        },
      },
      {
        id: "p1-b",
        touches: ["sabine", "marcus"],
        title: "Visible quick win",
        body: "Fast-track a refresh of the 50 oldest laptops. Photo-friendly and simple to report — but the manufacturing cost of a new fleet is spent up front.",
        tags: [
          { icon: "clock", text: "3 weeks" },
          { icon: "wallet", text: "€80k" },
          { icon: "eye", text: "board-visible" },
        ],
        category: "Rp",
        consequence: {
          weekSet: 4,
          budget: 80,
          moods: { sabine: "hostile", marcus: "warming" },
          revealNow: ["meridian/artifact-laptop-photo"],
          revealNextPhase: [
            "meridian/email-sabine-complaint",
            "meridian/email-audit-late",
          ],
        },
      },
      {
        id: "p1-c",
        touches: ["sabine", "rafael", "elena"],
        title: "Alignment first",
        body: "Convene Procurement, Ops and Finance. Set scope, ownership and shared vocabulary before touching anything.",
        tags: [
          { icon: "clock", text: "2 weeks" },
          { icon: "wallet", text: "low cost" },
          { icon: "handshake", text: "stakeholder buy-in" },
        ],
        category: "Op",
        consequence: {
          weekSet: 3,
          budget: 3,
          moods: { sabine: "wary", rafael: "neutral", marcus: "wary" },
          revealNow: ["meridian/artifact-workshop-notes"],
          revealNextPhase: ["meridian/slack-marcus-nervous"],
        },
      },
      {
        id: "p1-d",
        touches: ["elena", "marcus"],
        title: "External assessment",
        body: "Retain an efficiency advisory firm for a rapid 4-week review. Independent, but generic and expensive.",
        tags: [
          { icon: "clock", text: "4 weeks" },
          { icon: "wallet", text: "€45k" },
          { icon: "doc", text: "external report" },
        ],
        category: "Op",
        consequence: {
          weekSet: 5,
          budget: 45,
          moods: { elena: "skeptical", marcus: "neutral" },
          revealNow: ["meridian/artifact-consultant-report"],
          revealNextPhase: ["meridian/memo-elena-questions"],
        },
      },
    ],
  },
  {
    id: "p2",
    briefing: {
      short:
        "Three drivers, one budget. Impact, feasibility and visibility rarely point at the same lever, and the largest driver is not always the movable one.",
      questions: [
        {
          q: "Which driver is largest, and which lever is most changeable? They are often not the same.",
          lookFor:
            "The percentages give you size. The duration tags give you horizon. Size is the ceiling; horizon decides whether you reach it inside the year.",
        },
        {
          q: "Who has to agree before this can start — and do they know yet?",
          lookFor:
            "Look at whose stake is listed under the option. If someone holding a veto (Rafael on the warehouses, Sabine on buying) is not in the conversation yet, the timeline on the card is optimistic.",
        },
        {
          q: "If this is all you deliver this year, does the year still hold together?",
          lookFor:
            "Ask whether it leaves the next decision easier, or leaves something that has to be defended on its own.",
        },
      ],
      more: {
        title: "Choosing a lever when the three tests disagree",
        paragraphs: [
          "Impact asks how much of the footprint a lever can move. Feasibility asks whether it can be done with the people, budget and authority you actually have. Visibility asks whether anyone outside IT will notice. A strong lever usually wins two and loses one, and being able to name which one it loses is what makes the case defensible.",
          "The trap is treating the biggest percentage as the answer. The data centre is the largest driver and also the one with the longest horizon, the highest cost and the most operational risk — which is a different question from whether it is the right thing to start.",
          "The opposite trap is choosing the smallest, safest lever because it can be finished. Finishing something small is worth a great deal in a first year, and worth very little if it becomes the whole programme.",
        ],
        links: [
          {
            label: "Data-centre energy, in context",
            source: "ieaEnergyAi",
            note: "How large data-centre demand is, and how fast it moves.",
          },
          {
            label: "Why extending device life carries so much weight",
            source: "techCarbon",
            note: "Most of a device's footprint is spent before it is switched on.",
          },
          {
            label: "The German data-centre efficiency duties",
            source: "enefg",
            note: "PUE thresholds and dates — why consolidation and cooling are not only voluntary.",
          },
        ],
      },
    },
    banner: { left: "Phase 2", right: "Choose your first lever." },
    readBack:
      "You now have a rough sense of where Meridian's IT energy and resources go. Three levers stand out. Marcus has approved budget for one serious initiative plus small governance work. What do you fund?",
    opener: ["meridian/dashboard-footprint-preview"],
    next: "p3",
    choices: [
      {
        id: "p2-a",
        touches: ["rafael", "elena"],
        title: "Consolidate the data centre + operating rules",
        body: "Consolidate the low-utilisation on-prem systems and set binding shutdown and operating rules. Largest energy driver, longest horizon, highest disruption risk.",
        tags: [
          { icon: "clock", text: "4–6 months" },
          { icon: "wallet", text: "€110k" },
          { icon: "chartDown", text: "~35% reduction" },
        ],
        category: "Op",
        consequence: {
          weekAdd: 3,
          budget: 40,
          moods: { rafael: "hostile", elena: "skeptical" },
          revealNow: [],
          revealNextPhase: ["meridian/email-rafael-warning"],
        },
      },
      {
        id: "p2-b",
        touches: ["sabine", "marcus"],
        title: "Device service-life programme",
        body: "Extend fleet life with structured refurbishment, condition-based refresh and a repair/reuse route. Fast, visible, Procurement can co-own.",
        tags: [
          { icon: "clock", text: "3–4 months" },
          { icon: "wallet", text: "€120k" },
          { icon: "chartDown", text: "~15% reduction" },
        ],
        category: "Rp",
        consequence: {
          weekAdd: 3,
          budget: 120,
          moods: { sabine: "warming", marcus: "warming" },
          moodsIf: [{ key: "sabine", whenCurrent: "hostile", then: "wary" }],
          revealNow: [],
          revealNextPhase: ["meridian/artifact-fleet-dashboard"],
        },
      },
      {
        id: "p2-c",
        touches: ["elena", "marcus"],
        title: "Cloud consolidation + procurement criteria",
        body: "Consolidate cloud sprawl, kill idle resources, and add life-cycle criteria to procurement. Strong number, low visibility, needs a skilled owner.",
        tags: [
          { icon: "clock", text: "6 months" },
          { icon: "wallet", text: "€90k" },
          { icon: "chartDown", text: "~25% reduction" },
        ],
        category: "Op",
        consequence: {
          weekAdd: 4,
          budget: 90,
          moods: { elena: "warming", marcus: "wary" },
          revealNow: [],
          revealNextPhase: ["meridian/artifact-cloud-savings"],
        },
      },
      {
        id: "p2-d",
        touches: ["marcus", "sabine", "rafael", "elena"],
        title: "Balanced roadmap (start all three small)",
        body: "A staged programme that touches all three levers at reduced scope. Nothing lands fully in 12 weeks. Political cover via breadth.",
        tags: [
          { icon: "clock", text: "ongoing" },
          { icon: "wallet", text: "€150k spread" },
          { icon: "scales", text: "diffused impact" },
        ],
        category: "Op",
        consequence: {
          weekAdd: 4,
          budget: 150,
          moods: {},
          revealNow: [],
          revealNextPhase: ["meridian/slack-team-confusion"],
        },
      },
    ],
  },
  {
    id: "p3",
    briefing: {
      short:
        "A lever is only as good as the goal conflict you resolve to land it. Ops wants availability, Finance wants a return, resource conservation wants change. You cannot fully satisfy all three at once.",
      questions: [
        {
          q: "Whose mandate does this threaten, and what do they say in December?",
          lookFor:
            "Name the person and the sentence. Rafael says a warehouse went down; Elena says she cannot show a return. If you cannot name the objection, you have not found the conflict yet.",
        },
        {
          q: "What evidence would turn a veto into a yes?",
          lookFor:
            "A measured saving on one site answers Elena. A cutover plan with a rollback answers Rafael. The move that gathers that evidence is different from the move that skips it.",
        },
        {
          q: "Which conflict are you actually deciding — speed against availability, or savings against disruption?",
          lookFor:
            "Say it out loud. If your sentence resolves itself, you have named a preference, not a conflict.",
        },
      ],
      more: {
        title: "Weighing the goal conflict",
        paragraphs: [
          "A goal conflict is two people with legitimate mandates who cannot both fully win. Here it is availability (Rafael) against resource and energy conservation, and both against the cost and the return (Elena) and the board's appetite for a quick, visible result (Marcus). The honest move names who objects and prices the trade, rather than pretending the saving is free.",
          "Pushing the change through everywhere at once buys a headline saving and an availability risk that lands in someone else's numbers. Staging it on one site with a rollback buys evidence and keeps Ops onside, at the cost of a smaller result this quarter. Softening it to voluntary guidance keeps the peace and changes very little.",
          "This is the phase the whole scenario turns on: not which lever, but how you land it through a room that will not all say yes.",
        ],
        links: [
          {
            label: "Operating duties that are becoming statutory",
            source: "enefg",
            note: "Consolidation, cooling and utilisation are moving from good practice to obligation.",
          },
          {
            label: "Why replacing is not automatically the answer",
            source: "techCarbon",
            note: "The embodied cost of new kit is why keeping and consolidating often beats replacing.",
          },
        ],
      },
    },
    banner: { left: "Phase 3 · Week 10", right: "The room won't all say yes." },
    readBack:
      "Your chosen lever is real, but it lands on other people's mandates. Rafael can give one site's change window, not three. Elena wants a measured return on the first site before releasing the rest. How do you push it through?",
    opener: ["meridian/memo-rafael-block", "meridian/memo-elena-roi"],
    next: "p4",
    choices: [
      {
        id: "p3-a",
        touches: ["rafael", "marcus"],
        title: "Push it through now — all three sites",
        body: "Enforce the shutdown and consolidation across all three sites this quarter. Fast, board-visible savings — and Rafael's availability risk is real.",
        tags: [
          { icon: "megaphone", text: "high signal" },
          { icon: "warning", text: "availability exposure" },
          { icon: "rocket", text: "aggressive" },
        ],
        category: "Op",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: { rafael: "hostile", marcus: "warming" },
          revealNow: [],
          revealNextPhase: [
            "meridian/email-rafael-incident",
            "meridian/slack-marcus-check",
          ],
        },
      },
      {
        id: "p3-b",
        touches: ["elena", "rafael"],
        title: "Stage it: one site, rollback, measure",
        body: "Pilot on one warehouse with a rollback written in, measure the saving per euro, then extend. Defensible, slower, keeps Ops onside.",
        tags: [
          { icon: "doc", text: "evidence-first" },
          { icon: "shield", text: "defensible" },
          { icon: "chartDown", text: "unglamorous" },
        ],
        category: "Op",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: { elena: "ally", rafael: "warming" },
          revealNow: [],
          revealNextPhase: ["meridian/memo-elena-pleased"],
        },
      },
      {
        id: "p3-c",
        touches: [],
        title: "Soften to voluntary guidelines",
        body: "Drop the “binding” — issue the shutdown and operating rules as guidance so nobody has to object. Safe on paper; little actually changes.",
        tags: [
          { icon: "feather", text: "low-friction" },
          { icon: "question", text: "changes little" },
          { icon: "turtle", text: "symbolic" },
        ],
        category: "U",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: {},
          revealNow: [],
          revealNextPhase: ["meridian/slack-rafael-relieved"],
        },
      },
      {
        id: "p3-d",
        touches: ["rafael", "marcus"],
        title: "Reframe as a shared operating standard",
        body: "Co-own the rules with Ops as an availability-and-cost standard: fewer idle systems, less heat and noise, cleaner operations. Risky — may read as giving away control.",
        tags: [
          { icon: "handshake", text: "partnership move" },
          { icon: "dice", text: "outcome uncertain" },
          { icon: "globe", text: "wider ownership" },
        ],
        category: "Op",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: { rafael: "warming", marcus: "wary" },
          revealNow: [],
          revealNextPhase: ["meridian/email-rafael-partner"],
        },
      },
    ],
  },
  {
    id: "p4",
    briefing: {
      short:
        "Ownership is the decision that decides the others. Ask what survives your own departure, not what works while you are in the room.",
      questions: [
        {
          q: "Who maintains the baseline, the operating rules and the procurement criteria after the attention moves on?",
          lookFor:
            "Name the person out loud. If you cannot, the arrangement has not answered the question yet.",
        },
        {
          q: "What happens to this arrangement if you are promoted in nine months?",
          lookFor:
            "Anything that stops when one person moves was a person, not a structure.",
        },
        {
          q: "Does this need expertise, authority, or both — and does the option supply the one it needs?",
          lookFor:
            "Expertise without a mandate produces recommendations nobody has to act on. A mandate without expertise approves the wrong things confidently.",
        },
      ],
      more: {
        title: "Why ownership is the L3 question",
        paragraphs: [
          "Every earlier phase produced something that has to keep running: a baseline that needs maintaining, operating rules that need enforcing, procurement criteria that need applying. Ownership is the answer to who does that after the attention moves on.",
          "The choice is usually framed as speed against resilience. A single owner decides quickly and stops the moment that person changes role. A committee decides slowly and survives. Expertise and authority are separate things: a specialist without a mandate writes recommendations, and a mandate without expertise approves the wrong ones.",
          "This is where L2 hands over to L3. Everything before was about choosing well. This is about making the next person's choices better than yours were — the only version of the job that compounds.",
        ],
        links: [
          {
            label: "Roles and duties that are becoming statutory",
            source: "enefg",
            note: "German data centres now carry named obligations, not just good intentions.",
          },
          {
            label: "Buying criteria that outlast one decision",
            source: "blueAngel",
            note: "Life-cycle and total-cost criteria, written into procurement so they keep applying.",
          },
        ],
      },
    },
    banner: { left: "Phase 4 · Week 12", right: "Board meeting tomorrow." },
    readBack:
      "Marcus asks the question the board will ask: “Who owns this going forward?”",
    opener: ["meridian/org-chart-empty"],
    next: "debrief",
    choices: [
      {
        id: "p4-a",
        touches: ["marcus"],
        title: "Nadia takes it personally",
        body: "You add the energy-and-resource programme to your remit as IT Strategy Lead. Full control, career accelerator, no protection against burnout or turnover.",
        tags: [
          { icon: "key", text: "clear owner" },
          { icon: "warning", text: "single point of failure" },
          { icon: "rocket", text: "career move" },
        ],
        category: "Op",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
      {
        id: "p4-b",
        touches: ["marcus", "sabine", "rafael", "elena"],
        title: "Cross-functional steering committee",
        body: "IT, Procurement, Ops and Finance sit together monthly to hold the baseline, the rules and the criteria. Slower decisions, resilient to any one person leaving.",
        tags: [
          { icon: "handshake", text: "shared ownership" },
          { icon: "turtle", text: "slower cadence" },
          { icon: "shield", text: "resilient" },
        ],
        category: "Op",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
      {
        id: "p4-c",
        touches: ["elena", "marcus"],
        title: "Hire a dedicated sustainable-IT specialist",
        body: "€90k/year role reporting to the CIO. Expertise from day one; Finance will challenge the ROI early.",
        tags: [
          { icon: "brain", text: "specialist" },
          { icon: "wallet", text: "recurring cost" },
          { icon: "clock", text: "3-month hire" },
        ],
        category: "Op",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
      {
        id: "p4-d",
        touches: [],
        title: "Delegate to Facilities",
        body: "They already report building energy, so it looks like a fit. They do not own the IT estate, though — recommendations risk being unimplementable.",
        tags: [
          { icon: "recycle", text: "reuses org" },
          { icon: "gap", text: "IT–Facilities distance" },
          { icon: "doc", text: "report-shaped" },
        ],
        category: "Op",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
    ],
  },
];

// ---------------------------------------------------------------- endings

export const ENDINGS: Record<
  EndingId,
  { name: string; body: string; art: EndingId; beats: string[] }
> = {
  "photo-op-trap": {
    beats: [
      "The visible device refresh ships. The board applauds.",
      "Month 18: an independent audit shows total footprint barely moved.",
      "The manufacturing cost of the new fleet ate most of the saving, and the capital is gone.",
    ],
    name: "The Early Swap",
    art: "photo-op-trap",
    body: "You shipped the visible device refresh. The board applauds. Eighteen months later an audit shows total footprint barely moved — the manufacturing cost of the new fleet ate the saving — and the capital is spent. The largest driver, the data centre, was never touched.",
  },
  "slow-burn": {
    beats: [
      "Week 8: Marcus asks to see progress before the board pack.",
      "The one-site pilot shows a measured saving per euro, and you extend it.",
      "Elena starts treating energy and resources as a category, not a project.",
    ],
    name: "Quiet Winning",
    art: "slow-burn",
    body: "No spectacle. You staged the change, measured it on one site, and extended it. Rafael kept operating; Elena can defend the line and starts asking about the energy-and-resource number as a category, not a one-off project.",
  },
  overreach: {
    beats: [
      "The saving lands on the board slide.",
      "A peak-season cutover drops a warehouse's scanners for forty minutes.",
      "Rafael escalates. The board asks Marcus. Marcus asks you.",
    ],
    name: "The Hard Push",
    art: "overreach",
    body: "The saving lands on the board slide. Then a peak-season cutover drops a warehouse's handheld scanners for forty minutes — around 300 delayed orders. Rafael escalates, the board asks Marcus, and Marcus asks you. Your calendar changes.",
  },
  "missed-opportunity": {
    beats: [
      "The method was sound and the alignment was real.",
      "Week 12 arrives with analysis and no measured saving to present.",
      "The board asks what actually changed.",
    ],
    name: "Right Process, No Result",
    art: "missed-opportunity",
    body: "The method was sound. The alignment was real. But 12 weeks was not enough runway for the shape you chose. Week 12 arrives with analysis and no measured reduction to show. The board asks what actually changed.",
  },
  "governance-win": {
    beats: [
      "The committee meets monthly and keeps meeting.",
      "The baseline, the operating rules and the procurement criteria keep running.",
      "Ownership survives your promotion nine months later.",
    ],
    name: "The Boring Win",
    art: "governance-win",
    body: "The steering committee is unglamorous but it holds. The baseline, the operating rules and the procurement criteria keep running without you. Ownership survives your next promotion, and energy and resources become a line the business steers rather than a project it forgets.",
  },
  "quiet-architect": {
    name: "The Quiet Architect",
    art: "quiet-architect",
    beats: [
      "Nobody outside the programme noticed the year happening.",
      "The spend never grew large enough to need defending.",
      "The next person inherits a working machine, not a backlog.",
    ],
    body: "You built the capability, kept ownership shared, and did it for less than a single quick win would have cost. There is no announcement and no relaunch, because there is nothing to relaunch — the decisions that follow are simply better than the ones before, and nobody can point to the moment that changed.",
  },
  "quiet-drift": {
    beats: [
      "The board's request is met with a boilerplate paragraph.",
      "No headline decisions and no headline consequences.",
      "The electricity bill keeps climbing; someone else inherits this in eighteen months.",
    ],
    name: "Nothing Happened",
    art: "quiet-drift",
    body: "No headline decisions, no headline consequences. The board's request is met with a boilerplate paragraph. The electricity bill keeps climbing, and someone else will inherit this in eighteen months.",
  },
};

export const DEBRIEF_MESSAGE = [
  "Managing IT's energy and resource footprint is not the question “which lever is correct.” It is the question “does this sequence of choices hold together.” A large saving pushed through against Operations is not braver than a smaller one staged with a rollback — it is more exposed.",
  "Notice which stakeholders you brought with you, and which you left behind. In practice that is what decides whether the change survives the next quarter — and whether anyone maintains the baseline once the attention moves on.",
];

export const SIGNAL_LABELS: { key: keyof import("@/lib/types").Signals; label: string }[] = [
  { key: "visibility", label: "Visibility" },
  { key: "depth", label: "Depth" },
  { key: "governance", label: "Governance" },
  { key: "soloism", label: "Soloism" },
  { key: "deferral", label: "Deferral" },
  { key: "reframe", label: "Reframe" },
];
