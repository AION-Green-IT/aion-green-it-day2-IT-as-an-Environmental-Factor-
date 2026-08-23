// L2 delivered as a story. Chapters are fixed — everyone plays all of them, in
// order — and choices change the state you carry forward rather than which
// chapters you see. That keeps curriculum coverage whole while a decision
// still costs something.
//
// Copy is deliberately short. Anything that can be a picture, a meter or a
// chip is not a paragraph.
//
// N3 applies: the company is invented, and is not MediPrint, NordCom or Auron.

export type SignalId = "energy" | "devices" | "customer";

const STYLE =
  "STYLE — Flat vector editorial illustration, isometric, clean corporate infographic " +
  "look. Palette strictly: deep navy #231A45, purple #5624D0, pale lilac #EEE9F9, white, " +
  "with one amber #F1B24A and one green #6FB56A accent used sparingly for emphasis. " +
  "Soft long shadows, generous white space, calm and businesslike — this is for a room " +
  "of executives, not a children's book.\n\n" +
  "MUST NOT — No text, lettering, numbers or logos anywhere (the module is used in " +
  "several languages, so any word in the image would have to be redrawn). No readable " +
  "faces. No smoke, no wilting plants, no polar bears, no globe-in-hands clichés. " +
  "Nothing decorative that does not carry meaning. Aspect ratio 16:9.";

/** Every prompt opens by telling the illustrator what the picture has to teach. */
const brief = (purpose: string, mustRead: string, scene: string) =>
  `CONTEXT — This illustration belongs to a corporate e-learning module on Green IT ` +
  `for German managers. It is a teaching aid, not decoration: if a viewer cannot read ` +
  `the idea from the picture alone, without any caption, it has failed.\n\n` +
  `PURPOSE — ${purpose}\n\n` +
  `THE VIEWER MUST UNDERSTAND, FROM THE IMAGE ALONE — ${mustRead}\n\n` +
  `SCENE — ${scene}\n\n` +
  STYLE;

export const STORY = {
  id: "l2-story",
  xp: 25,
  company: "Verlan Systeme",
  facts: ["420 people", "Two sites", "No extra budget", "No extra people"],
  premise:
    "You run IT operations. Last month you were handed Green IT as well, with one line added to your objectives: first results within the year.",
  role: "Head of IT Operations, now also responsible for Green IT",
  month: "January",
};

// ---------------------------------------------------------------- Q1

export type Signal = {
  id: SignalId;
  label: string;
  /** Matches the perspective tabs used in the Case B dashboard. */
  perspective: string;
  teaser: string;
  learned: string;
  /** The single line carried into Q2. */
  headline: string;
  blindSpot: string;
};

export const Q1 = {
  quarter: "Q1",
  title: "Where do you even look?",
  objective: "Recognise Green IT fields of action in the company",
  brief: "Three things reach your desk. You have capacity for two.",
  budget: 2,
  signals: [
    {
      id: "energy",
      label: "The electricity line",
      perspective: "Operations",
      teaser: "Facilities says IT is “probably a big part of it”. Nobody has checked.",
      learned:
        "IT is about a third of the building's load, and the server room is most of that.",
      headline: "You can say roughly how big IT's energy share is.",
      blindSpot: "Any energy proposal you make this year is about a number you do not have.",
    },
    {
      id: "devices",
      label: "The service desk queue",
      perspective: "Procurement & Use",
      teaser: "Laptop complaints climbing for two quarters. The supply contract “comes up soon”.",
      learned:
        "Fleet averages 3.4 years. The contract renews in nine months, free to exit before then. The complaints cluster on one model — not on the oldest machines.",
      headline: "You know the fleet age, the renewal date, and that age is not the fault.",
      blindSpot:
        "Miss the renewal date and the terms lock for another cycle without anyone deciding.",
    },
    {
      id: "customer",
      label: "The questionnaire",
      perspective: "Customer & Competitiveness",
      teaser: "A key account sent a sustainability questionnaire. Still unopened.",
      learned:
        "It asks for three things: an IT energy figure, a device lifecycle policy, a named contact. Due in five months, and tied to the contract renewal.",
      headline: "You know what is being asked, by when, and what it is attached to.",
      blindSpot: "You do not know what it asks, when it is due, or what it is attached to.",
    },
  ] satisfies Signal[],

  debrief: {
    all: "The questionnaire is the one that ranks the others — it names exactly what you will be asked to produce. Something outside IT usually decides which field of action is urgent.",
    skippedCustomer:
      "You looked at both internal signals and left the external one unread. The thing that sets your deadline is usually the thing nobody owns.",
  },

  /** The point of the chapter, and the one that carries into Case B. */
  missingPerspective: {
    label: "Governance",
    text: "Three signals arrived. Look at the perspectives they came from — Operations, Procurement & Use, Customer & Competitiveness. Governance sent nothing, because governance never does. Nobody files a ticket to report that no one is accountable, and no supplier writes to say your criteria are missing. It is the only field of action you have to go looking for.",
  },
};

// ---------------------------------------------------------------- Q2

export type AskId = "energy-figure" | "lifecycle-policy" | "named-contact";

export const CUSTOMER_ASKS: { id: AskId; label: string }[] = [
  { id: "energy-figure", label: "An energy figure for IT" },
  { id: "lifecycle-policy", label: "A device lifecycle policy" },
  { id: "named-contact", label: "A named contact" },
];

export type Initiative = {
  id: string;
  letter: string;
  title: string;
  body: string;
  /** 1–3 each, so three options compare at a glance instead of in prose. */
  visible: 1 | 2 | 3;
  lasting: 1 | 2 | 3;
  resistance: 1 | 2 | 3;
  buys: string;
  costs: string;
  /** Which of the customer's three asks this choice can actually answer. */
  delivers: AskId[];
  /** What December looks like under this choice. */
  outcome: { file: string; alt: string; prompt: string };
  weakWithout: Partial<Record<SignalId, string>>;
};

export const Q2 = {
  quarter: "Q2",
  title: "One thing, this year",
  objective: "Derive initial priorities for measures and steering approaches",
  brief: "Budget round. There is money for one of these, not two.",
  meters: {
    visible: "Visible this year",
    lasting: "Still working in three years",
    resistance: "Resistance you will meet",
  },
  initiatives: [
    {
      id: "replace",
      letter: "A",
      title: "Replace the oldest third of the laptops",
      body: "New, efficient models for the machines generating complaints.",
      visible: 3,
      lasting: 1,
      resistance: 1,
      delivers: [],
      outcome: {
        file: "story-q2-outcome-a.png",
        alt: "December under option A: new laptops out, old ones stacked in the store room",
        prompt: brief(
          "Shows the learner what December looks like if they spent the year replacing " +
          "laptops. It has to feel like a success that solved nothing structural.",
          "The visible problem is gone and the underlying one is untouched: new machines " +
          "are in use, the replaced ones are stacked and idle, and the same decision is " +
          "already scheduled to return.",
          "Split isometric view of one office. Foreground: a row of desks with new, " +
          "identical laptops open and in use, everything tidy and working. Background, " +
          "through an open door: a store room where the replaced laptops are stacked in " +
          "neat but growing piles, unplugged. On the wall between them, a simple wall " +
          "calendar with one distant date marked by a plain circle — no numbers, just the " +
          "circle, suggesting the same decision returning.",
        ),
      },
      buys: "Something concrete to show within weeks. The complaints stop.",
      costs:
        "Most of the year's budget on hardware whose manufacturing footprint you just paid again — and you will be here again in three years.",
      weakWithout: {
        devices:
          "You are replacing on age without checking whether age is the problem. If the complaints sit on one model, you bought the wrong fix at full price.",
        customer:
          "You cannot tell the customer what this changes, because you never read what they asked for.",
      },
    },
    {
      id: "policy",
      letter: "B",
      title: "Rewrite the device policy and renegotiate",
      body: "Condition-based service life, environmental criteria in purchasing.",
      visible: 1,
      lasting: 3,
      resistance: 3,
      delivers: ["lifecycle-policy"],
      outcome: {
        file: "story-q2-outcome-b.png",
        alt: "December under option B: every purchase now passes through a rule",
        prompt: brief(
          "Shows what December looks like if the year went into rewriting the device " +
          "policy and the supplier contract. It must convey compounding effect bought at " +
          "the price of two invisible quarters.",
          "Nothing was visible for most of the year, and now everything that arrives has " +
          "to pass a gate that did not exist before. The gain is permanent and applies to " +
          "things not yet bought.",
          "Isometric view of a procurement flow reading left to right. On the left, a " +
          "conveyor or path carrying identical unopened equipment boxes. In the middle, a " +
          "simple gate or archway with a clipboard-and-checklist symbol mounted on it, " +
          "through which every box must pass. On the right, the boxes continue on, now " +
          "each marked with a small green check symbol. Behind the gate, receding into " +
          "the distance, two dim empty stretches of the same path, to suggest the quarters " +
          "where nothing was visible.",
        ),
      },
      buys: "Every purchase after it passes through new rules. The effect compounds each cycle.",
      costs:
        "Nothing visible for two quarters, and Procurement resists — new criteria narrow their supplier field without giving them staff.",
      weakWithout: {
        devices:
          "You do not know when the contract renews. If that date passed while you decided, this is a plan for next year, not a decision for this one.",
        customer:
          "A device lifecycle policy is one of the three things the customer asked for — but you do not know that, so you cannot use it to justify the spend.",
      },
    },
    {
      id: "baseline",
      letter: "C",
      title: "Build an energy baseline and name an owner",
      body: "Sub-metering, one accountable person, a first set of figures.",
      visible: 1,
      lasting: 3,
      resistance: 2,
      delivers: ["energy-figure", "named-contact"],
      outcome: {
        file: "story-q2-outcome-c.png",
        alt: "December under option C: the room is measured and has an owner, and nothing else changed",
        prompt: brief(
          "Shows what December looks like if the year went into a baseline and an owner. " +
          "It must read as quietly powerful and visibly unimpressive at the same time.",
          "Nothing in the estate changed, but for the first time the organisation can see " +
          "what it is doing and knows who is answerable for it. This is capability, not " +
          "improvement — and that distinction is the whole lesson.",
          "Isometric view of a small server room, unchanged and ordinary. Newly mounted on " +
          "the wall beside the door: a clean sub-meter with a simple line rising gently on " +
          "its display, drawn as a shape rather than as digits. Beside the door, a single " +
          "desk with one name plate on it, blank — no lettering. The racks themselves are " +
          "identical to before, deliberately: nothing inside the room has been replaced. " +
          "A soft green highlight on the meter and the name plate only.",
        ),
      },
      buys: "Every later decision gets made on evidence. Cheapest of the three, and it unblocks the other two.",
      costs:
        "No change this year — only the ability to prove one next year. In December the honest answer is “we can now measure it”.",
      weakWithout: {
        energy:
          "You are asking for budget to measure something whose rough size you never established. The first question will be “how big is this?”.",
        customer:
          "You do not know the customer's deadline, so you cannot say whether this lands in time — which is the argument that would have carried it.",
      },
    },
  ] satisfies Initiative[],

  closing:
    "No option here is simply correct. A is defensible if the programme dies without a visible result. C is defensible if it survives two quiet quarters. What is not defensible is choosing without knowing which situation you are in — and that was settled in Q1.",
};


// ------------------------------------------------- The theory underneath

/**
 * Named principles, not a template. The story is a way to meet the theory by
 * doing it; the case tabs are where it gets applied to a real brief. Nothing
 * here mirrors the structure of any particular task.
 */
export const THEORY = {
  title: "The theory you just used",
  intro:
    "Three principles carried this chapter. They are the ones management-level Green IT analysis rests on, and they hold whatever company you apply them to.",
  principles: [
    {
      name: "Read from several perspectives, and go looking for the silent one",
      text: "Fields of action announce themselves unevenly. Operations sends bills, users send tickets, customers send questionnaires. Governance sends nothing — nobody files a ticket to report that no one is accountable. The perspective with no inbox is the one you have to seek out.",
    },
    {
      name: "Capability before investment",
      text: "A single large measure bought early spends the budget on the thing you happened to notice first. Ownership and a baseline cost little, produce nothing visible, and make every later decision arguable on evidence rather than on instinct.",
    },
    {
      name: "A recommendation is judged on what it makes possible next",
      text: "Impact, risk and feasibility are the usual three tests. The fourth, and the one executives actually apply, is whether the decision leaves the organisation better able to decide next time.",
    },
  ],
  closing:
    "You will meet all three again on the case tabs, against companies with different pressures and different right answers. What transfers is the reasoning, never the conclusion.",
};

// ---------------------------------------------------------------- Q3
// The trade-off dials live here now. A goal conflict is not an abstract axis;
// it is two named people who both have a mandate and cannot both win.

export type Dial = {
  id: string;
  question: string;
  left: { who: string; wants: string };
  right: { who: string; wants: string };
  /** Readout, who backs you, and what the loser says at the review. */
  bands: {
    readout: string;
    backs: string;
    objects: string;
    line: string;
  }[];
};

export const Q3 = {
  quarter: "Q3",
  title: "The room disagrees",
  objective: "Analyse goal conflicts between economics, sustainability and feasibility",
  brief:
    "Three questions come up in every steering meeting. Each has a person at both ends with a mandate of their own, and no setting satisfies both. Where you land decides who speaks for you in December — and who speaks against.",
  dials: [
    {
      id: "buy",
      question: "How do we buy?",
      left: { who: "Finance", wants: "Lowest purchase price — it is the number in my budget line." },
      right: { who: "Sustainability", wants: "Lowest lifetime cost — the cheap one gets bought twice." },
      bands: [
        {
          readout: "Unit price decides. Fast approvals, and disposal and energy land in someone else's budget.",
          backs: "Finance",
          objects: "Sustainability",
          line: "“We optimised the line item and moved the cost somewhere nobody reports on.”",
        },
        {
          readout: "Environmental criteria are scored but can be outvoted by price. Where most procurement templates already sit.",
          backs: "Nobody strongly",
          objects: "Nobody strongly",
          line: "“It is in the template, so we can say we considered it.”",
        },
        {
          readout: "Total cost of ownership decides. Slower approvals, a narrower supplier field, longer service life.",
          backs: "Sustainability",
          objects: "Finance",
          line: "“We are paying more today against a saving I cannot see in this year's budget.”",
        },
      ],
    },
    {
      id: "run",
      question: "How do we run it?",
      left: { who: "IT Operations", wants: "Headroom everywhere. I am the one paged at three in the morning." },
      right: { who: "Efficiency", wants: "Shave the peaks. Idle capacity is bought, powered and cooled." },
      bands: [
        {
          readout: "Capacity sized for the worst day, every day. Nothing ever falls over, and the meter never falls either.",
          backs: "IT Operations",
          objects: "Efficiency",
          line: "“We are cooling headroom we have used twice this year.”",
        },
        {
          readout: "Efficiency targets exist and yield whenever they collide with a service level. The common real-world setting.",
          backs: "Nobody strongly",
          objects: "Nobody strongly",
          line: "“We have a target and an exception process that is used every time.”",
        },
        {
          readout: "Efficiency is a hard constraint. Peaks are shaved, some latency accepted, capacity planning gets harder.",
          backs: "Efficiency",
          objects: "IT Operations",
          line: "“The next incident will be blamed on this decision, fairly or not.”",
        },
      ],
    },
    {
      id: "show",
      question: "What do we show in December?",
      left: { who: "The Board", wants: "Something visible this year. I have to report progress." },
      right: { who: "You", wants: "A structure that makes next year's decisions better." },
      bands: [
        {
          readout: "Optimised for the December slide. Buys credibility, and buys nothing else.",
          backs: "The Board",
          objects: "You",
          line: "“We showed a result and are no better at deciding than we were in January.”",
        },
        {
          readout: "One visible measure funds the patience for a structural one. The setting most programmes survive on.",
          backs: "Both, weakly",
          objects: "Neither",
          line: "“Half a result and half a foundation — defensible, and nobody's favourite.”",
        },
        {
          readout: "Structure first, and nothing to show for two quarters. Every later decision gets easier.",
          backs: "You",
          objects: "The Board",
          line: "“I asked for results and received a capability. Explain that to the owners.”",
        },
      ],
    },
  ] satisfies Dial[],

  closing:
    "Notice that the middle of every dial has nobody backing it. Compromise is the safest position and the least defensible one — it is the setting you choose when you do not want to have the argument.",
};

// ---------------------------------------------------------------- Q4

export const Q4 = {
  quarter: "Q4",
  title: "The review",
  objective: "Justify the decision on impact, risk and feasibility",
  brief: "December. Twenty minutes, four people, three questions.",

  /** The regulated question. Everyone meets it, whether or not they can answer. */
  pue: {
    question: "“Where does our data centre sit against the 2027 threshold?”",
    canAnswer:
      "You can put a number on this, because you spent Q1 or Q2 building the ground for it.",
    cannotAnswer:
      "You cannot answer this. The instrument below is the one you would have needed — meet it now, because the threshold does not move to suit your roadmap.",
    thresholds: [
      { id: "pue-2027", label: "PUE ≤ 1.5 from July 2027", limit: 1.5, applies: "Data centres already operating before July 2026." },
      { id: "pue-2030", label: "PUE ≤ 1.3 from July 2030", limit: 1.3, applies: "The same centres, three years later." },
      { id: "pue-new", label: "PUE ≤ 1.2 for new build", limit: 1.2, applies: "Centres starting operation from July 2026." },
    ],
    draftNote:
      "A draft amendment from April 2026 would relax these to 1.6, 1.4 and 1.3. Plan against the stricter numbers until it is law.",
    note: {
      text: "The Energy Efficiency Act also requires data centres to match 50% of their electricity with renewables, to run a certified energy management system from 1 MW, and — for centres commissioned from July 2026 — to reuse a rising share of their waste heat.",
      source: "enefg" as const,
    },
    closing:
      "PUE says nothing about whether the computing was worth doing. A half-empty data centre posts an excellent one. Read it beside utilisation, never alone.",
  },

  counterfactual: {
    title: "The year you did not have",
    intro: "Same company, same budget, the other choice in Q2.",
  },

  verdicts: {
    strong:
      "You leave with a number, an owner and a rule. None of it is impressive to look at, and all of it survives the next budget round.",
    mixed:
      "You leave with something to show and a gap you had to talk around. That is an ordinary year, and it is defensible if you name the gap before somebody else does.",
    thin:
      "You leave with a visible result and no answer to the question that was actually asked. The programme survives this review and is harder to fund at the next one.",
  },
};

// ------------------------------------------------- Chapter 0: the method
// Taught before anything is chosen. The criteria are the ones the curriculum
// names — impact, feasibility, acceptance, time, strategic leverage — and each
// carries the trap that makes people score it wrongly.

export type Criterion = {
  id: "impact" | "feasibility" | "acceptance" | "time" | "leverage";
  name: string;
  asks: string;
  trap: string;
};

export const CRITERIA: Criterion[] = [
  {
    id: "impact",
    name: "Impact",
    asks: "How much does this change the thing you are actually trying to change?",
    trap: "Confusing impact with visibility. The measurable and the noticeable are not the same, and the noticeable one is easier to fund.",
  },
  {
    id: "feasibility",
    name: "Feasibility",
    asks: "Can this be done with the people, budget and authority you actually have?",
    trap: "Assuming feasibility is a technical question. It is usually a question of authority and calendar.",
  },
  {
    id: "acceptance",
    name: "Acceptance",
    asks: "Who has to agree to this, and will they?",
    trap: "Treating acceptance as someone else's problem. A measure nobody accepts is not cheaper — it is unfinished.",
  },
  {
    id: "time",
    name: "Time",
    asks: "When does the effect first appear, and against which date does that matter?",
    trap: "Measuring speed in the abstract. Something that lands in six weeks but answers nothing is not fast, it is early.",
  },
  {
    id: "leverage",
    name: "Strategic leverage",
    asks: "What does this make possible next?",
    trap: "Skipping it, because it never appears in this year's numbers. It is the criterion executives apply and rarely name.",
  },
];

export const METHOD = {
  quarter: "Method",
  title: "How a decision like this is made",
  objective: "Before you choose anything, know what you are choosing on",
  intro:
    "You are about to be given three options and the budget for one. Preference is not a reason, and neither is enthusiasm. A decision at this level is made on named criteria, scored openly, so that someone who disagrees can point at the place they disagree.",
  rules: [
    {
      title: "Score every option on every criterion before you compare any two",
      text: "Comparing options one pair at a time is how the first thing you looked at wins. Fill the whole grid, then read it.",
    },
    {
      title: "The criterion that decides is the one where your situation is tightest",
      text: "There is no universal ranking. A deadline you cannot move, a budget that will be withdrawn, a supplier contract about to renew — whichever constraint is hardest is the criterion that outranks the others, for this company, this year.",
    },
    {
      title: "Name what your choice scores badly on, before someone else does",
      text: "Every option is weak somewhere. Saying so is what makes the rest of your case credible.",
    },
  ],
  closing:
    "You will use this grid twice: once to choose in Q2, and once in Q4 to defend the choice to four people who each care about a different column.",
};

// --------------------------------------------- Scoring the three options
// Every score cites a fact from the scenario rather than a preference, so a
// learner who disagrees has somewhere specific to push back.

export type Score = { value: 1 | 2 | 3; why: string };

export type OptionScore = {
  id: string;
  scores: Record<Criterion["id"], Score>;
  verdict: "hard-to-defend" | "defensible" | "strongest";
  headline: string;
  reasons: string[];
  /** The conditions under which this becomes the right answer instead. */
  rightWhen: string;
};

export const SCORECARD: OptionScore[] = [
  {
    id: "replace",
    verdict: "hard-to-defend",
    headline: "Hard to defend in this company, this year",
    scores: {
      impact: { value: 1, why: "The complaints cluster on one model, not on the oldest machines. Replacing by age does not fix what was reported." },
      feasibility: { value: 3, why: "Budget exists and the supplier is already under contract. Nothing blocks it." },
      acceptance: { value: 3, why: "Nobody objects to new laptops." },
      time: { value: 3, why: "Visible within weeks — but visible is not the same as answering anything." },
      leverage: { value: 1, why: "Nothing about the next refresh changes. The same decision returns in three years." },
    },
    reasons: [
      "It scores highest on the two criteria that are easiest to feel and lowest on the two that decide whether the year mattered.",
      "It answers none of the customer's three asks, with the deadline five months out and a contract attached to it.",
      "It spends the year's budget on the problem you noticed first rather than the one you measured.",
    ],
    rightWhen:
      "If the programme will be cancelled without a visible result before the mid-year review, buying credibility first is a legitimate move — and then this is the correct choice. Nothing in this scenario says that is the case, but in your own organisation it might be.",
  },
  {
    id: "policy",
    verdict: "defensible",
    headline: "Defensible, and it turns on a date you may not have",
    scores: {
      impact: { value: 3, why: "Applies to every future purchase rather than to one batch." },
      feasibility: { value: 2, why: "Possible, but the contract renewal is the window — and it closes in nine months." },
      acceptance: { value: 1, why: "Procurement resists: new criteria narrow their supplier field without giving them staff." },
      time: { value: 1, why: "Nothing visible for two quarters." },
      leverage: { value: 3, why: "Every later device decision inherits the rule, without being re-argued." },
    },
    reasons: [
      "Strongest available on impact and leverage, which is the pair that compounds.",
      "It answers one of the customer's three asks — the device lifecycle policy.",
      "Its weakness is acceptance, and acceptance is the criterion people skip because it belongs to somebody else.",
    ],
    rightWhen:
      "This is the right choice when you know the renewal date and it is close — which you only know if you spent Q1 on the service desk queue. Choosing it blind is choosing it on hope.",
  },
  {
    id: "baseline",
    verdict: "strongest",
    headline: "Strongest here, and the least impressive to present",
    scores: {
      impact: { value: 2, why: "Changes no consumption directly. It makes every later change provable, which is a different kind of impact." },
      feasibility: { value: 3, why: "Cheapest of the three, needs no supplier and no contract window." },
      acceptance: { value: 2, why: "Little resistance and little enthusiasm — nobody fights it, nobody champions it." },
      time: { value: 2, why: "First figures inside the year, no visible improvement to show for them." },
      leverage: { value: 3, why: "Unblocks both other options, and answers two of the customer's three asks before the deadline." },
    },
    reasons: [
      "It is the only option that answers more than one of the three things the customer actually asked for.",
      "It is the cheapest, which leaves the other two still available next year — neither of the others does that.",
      "Its cost is real and worth naming out loud: in December you have a capability and no improvement.",
    ],
    rightWhen:
      "It stops being the right choice when the programme will not survive two quiet quarters. Capability is worth nothing to a programme that is cancelled before it is used.",
  },
];

/** Which criterion this scenario makes decisive, and why. */
export const DECISIVE = {
  criterion: "time" as const,
  title: "Which criterion decides here",
  text: "The customer questionnaire is due in five months and answering it is a condition of the contract renewal. That is the tightest constraint in the scenario, so Time outranks the rest — but read the trap on Time before you use it. The question is not which option is fastest. It is which option produces something that answers the question being asked, before the date it is asked by.",
  ifBlind:
    "You left the questionnaire unread, so you did not know this constraint existed when you chose. That is the honest consequence of Q1: not that you chose badly, but that you chose without knowing which criterion mattered.",
};
