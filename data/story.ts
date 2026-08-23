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
  "Flat vector editorial illustration, isometric, clean corporate infographic style. " +
  "Palette strictly: deep navy #231A45, purple #5624D0, pale lilac #EEE9F9, white, " +
  "with one amber #F1B24A and one green #6FB56A accent. Soft long shadows, generous " +
  "white space, no text or lettering anywhere, no logos, no readable faces. 16:9.";

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
    prompt:
      "A tidy office desk viewed from above at a slight isometric angle. Exactly three items " +
      "are arranged on it, clearly separated: (1) a printed utility bill with a red line chart " +
      "climbing steeply, (2) an open laptop showing a spinning loading indicator, with a small " +
      "stack of paper support tickets beside it, (3) a sealed business envelope marked with a " +
      "small green leaf symbol, half-buried under other papers so it looks overlooked. " +
      "Nothing else on the desk. " +
      STYLE,
  },
  signals: [
    {
      id: "energy",
      label: "The electricity line",
      teaser: "Facilities says IT is “probably a big part of it”. Nobody has checked.",
      learned:
        "IT is about a third of the building's load, and the server room is most of that.",
      headline: "You can say roughly how big IT's energy share is.",
      blindSpot: "Any energy proposal you make this year is about a number you do not have.",
    },
    {
      id: "devices",
      label: "The service desk queue",
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
};

// ---------------------------------------------------------------- Q2

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
  weakWithout: Partial<Record<SignalId, string>>;
};

export const Q2 = {
  quarter: "Q2",
  title: "One thing, this year",
  objective: "Derive initial priorities for measures and steering approaches",
  brief: "Budget round. There is money for one of these, not two.",
  illustration: {
    file: "story-q2-doors.png",
    alt: "One person, one budget, three doors",
    prompt:
      "A single figure seen from behind, standing in a plain corporate corridor facing three " +
      "identical closed doors. Above each door is one simple icon and no words: left a laptop, " +
      "middle a clipboard with a checklist, right a round gauge or meter. The figure holds a " +
      "single small envelope, suggesting one budget. Warm light spills from under only one door. " +
      "Composition calm and symmetrical, corridor receding slightly. " +
      STYLE,
  },
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
