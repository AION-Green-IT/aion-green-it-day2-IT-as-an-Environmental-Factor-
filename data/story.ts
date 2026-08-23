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
  illustration: {
    file: "story-q1-desk.png",
    alt: "Three signals landing on a desk: an electricity bill, a slow laptop, an unopened envelope",
    prompt: brief(
      "Opens the first chapter of a decision story. The learner is about to be told they " +
      "can investigate only two of three things this quarter, so the picture must make the " +
      "three feel simultaneous and competing — all arriving at once, none obviously first.",
      "Three separate demands have landed at the same time; two are visibly internal and " +
      "noisy, one is external and quiet. The quiet one is the easiest to overlook, and that " +
      "is deliberate — in the story it is the one that sets the deadline.",
      "A tidy office desk seen from above at a slight isometric angle. Exactly three items, " +
      "clearly separated, equal visual weight between the first two: (1) a printed utility " +
      "bill with a red line chart climbing steeply off its right edge, (2) an open laptop " +
      "showing a spinning loading indicator, a small stack of paper tickets beside it, " +
      "(3) a sealed business envelope with a small green leaf mark, half-slid under other " +
      "papers at the desk's edge so it reads as unopened and easy to miss. Nothing else on " +
      "the desk — no coffee cup, no plant, no phone.",
    ),
  },
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
