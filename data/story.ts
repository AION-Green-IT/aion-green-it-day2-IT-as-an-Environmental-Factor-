// L2 delivered as a story. Chapters are fixed — everyone plays all of them,
// in order — and choices change the state you carry into the next one rather
// than which chapters you see. That is what keeps curriculum coverage whole
// while still letting a decision have consequences.
//
// N3 applies here too: the company is invented, and is not MediPrint,
// NordCom or Auron.

export type SignalId = "energy" | "devices" | "customer";

export const STORY = {
  id: "l2-story",
  xp: 25,
  company: "Verlan Systeme",
  standing:
    "Chapters 1 and 2 of 4. Q3 (the room disagrees) and Q4 (the review) are not built yet.",
  premise:
    "You run IT operations at Verlan Systeme, a 420-person industrial supplier with two sites. Last month you were given Green IT as well — no extra budget, no extra people, and a line in your objectives that says “first results within the year”. It is January.",
  role: "Your role: Head of IT Operations, now also responsible for Green IT.",
};

// ---------------------------------------------------------------- Q1

export type Signal = {
  id: SignalId;
  label: string;
  teaser: string;
  /** What investigating it tells you. */
  learned: string;
  /** The one line that matters most, carried into Q2. */
  headline: string;
  /** What you are left not knowing if you skip it. */
  blindSpot: string;
};

export const Q1 = {
  quarter: "Q1",
  title: "Where do you even look?",
  objective: "Recognise Green IT fields of action in the company",
  brief:
    "Three things reach your desk in the first weeks. You have the capacity to look properly at two of them this quarter. The third stays on the pile.",
  instruction: "Choose two to investigate.",
  budget: 2,
  signals: [
    {
      id: "energy",
      label: "The electricity line",
      teaser:
        "Facilities mentions in passing that the building's electricity is up again, and that IT is “probably a big part of it”. Nobody has ever separated IT's share from lighting and heating.",
      learned:
        "IT is roughly a third of the building's load, and the server room is most of that. You have no per-system breakdown, but you have a defensible starting number and you know which room to argue about.",
      headline: "You can say roughly how large IT's energy share is.",
      blindSpot:
        "You still cannot say what share of the building's electricity is IT. Any energy proposal you make this year is a proposal about a number you do not have.",
    },
    {
      id: "devices",
      label: "The service desk queue",
      teaser:
        "Complaints about slow laptops have climbed for two quarters. Procurement mentions in passing that the supply contract “comes up again soon”, without saying when.",
      learned:
        "The fleet averages 3.4 years. The contract renews in nine months and the break clause costs nothing if notice is given before then. The complaints cluster on one model, not on the oldest machines.",
      headline:
        "You know the fleet age, the renewal date — and that age is not what the complaints are about.",
      blindSpot:
        "You do not know the fleet's age and you do not know when the contract renews. If that date passes, the terms lock for another cycle without anyone deciding to let them.",
    },
    {
      id: "customer",
      label: "The questionnaire",
      teaser:
        "A key account has sent a sustainability questionnaire. It is sitting in someone's inbox. Nobody has read it closely.",
      learned:
        "It asks for exactly three things: an energy figure for IT, a device lifecycle policy, and a named contact. It is due in five months, and answering it is a condition of the next contract round.",
      headline:
        "You know what is being asked of you, by when, and what it is attached to.",
      blindSpot:
        "The questionnaire is still unread. You do not know what it asks for, when it is due, or that it is tied to a contract.",
    },
  ] satisfies Signal[],

  /** Shown after the two are chosen — the lesson of the chapter. */
  debrief: {
    all:
      "Notice what the questionnaire does when you read it: it tells you which of the other two matters, because it names exactly what you will be asked to produce. Fields of action are not equally urgent — something outside IT usually decides which one is.",
    skippedCustomer:
      "You investigated the two internal signals and left the external one unread. That is the most common version of this mistake: the thing that sets your deadline is the thing nobody owns.",
  },
};

// ---------------------------------------------------------------- Q2

export type Initiative = {
  id: string;
  title: string;
  body: string;
  buys: string;
  costs: string;
  /** Weakness that appears only if that signal was skipped in Q1. */
  weakWithout: Partial<Record<SignalId, string>>;
};

export const Q2 = {
  quarter: "Q2",
  title: "One thing, this year",
  objective: "Derive initial priorities for measures and steering approaches",
  brief:
    "The budget round is now. There is money for one of these three, not two. Your objectives still say “first results within the year”.",
  instruction: "Choose one initiative.",
  initiatives: [
    {
      id: "replace",
      title: "A — Replace the oldest third of the laptops",
      body:
        "New, more efficient models for the machines generating the most complaints.",
      buys:
        "Visible within weeks. The complaints stop, and you have something concrete to show at the next review.",
      costs:
        "It spends most of the year on hardware whose manufacturing footprint you have just paid for again, and it changes nothing about what happens at the next refresh. You will be in the same position in three years.",
      weakWithout: {
        devices:
          "You are replacing on age without ever checking whether age is the problem. If the complaints cluster on one model rather than on the oldest machines, you have bought the wrong fix at full price.",
        customer:
          "You cannot tell the customer what this changes, because you never read what they asked for.",
      },
    },
    {
      id: "policy",
      title: "B — Rewrite the device policy and renegotiate the contract",
      body:
        "Service life becomes condition-based rather than contractual, and sustainability criteria enter the purchase decision.",
      buys:
        "Every purchase after it passes through new rules. Service life stops being set by a supplier's default, and the effect compounds with each cycle.",
      costs:
        "Nothing visible for two quarters. Procurement will resist, because new criteria narrow their supplier field without giving them extra staff.",
      weakWithout: {
        devices:
          "You do not know when the contract renews. If that date passed while you were deciding, the terms are locked for another cycle and this becomes a plan for next year rather than a decision for this one.",
        customer:
          "A device lifecycle policy is one of the three things the customer asked for — but you do not know that, so you cannot use it to justify the spend.",
      },
    },
    {
      id: "baseline",
      title: "C — Build an energy baseline and name an owner",
      body:
        "Sub-metering for the server room, a named accountable person, and a first set of figures.",
      buys:
        "Every later decision gets made on evidence rather than argument. It is also the cheapest of the three, and it unblocks the other two.",
      costs:
        "It produces no change this year — only the ability to prove one next year. When you are asked in December what you actually did, the honest answer is “we can now measure it”.",
      weakWithout: {
        energy:
          "You are asking for budget to measure something whose rough size you never established. The first question will be “how big is this?”, and you will not have an answer.",
        customer:
          "You do not know the customer's deadline, so you cannot say whether this baseline will exist in time to answer them — which is the one argument that would have carried it.",
      },
    },
  ] satisfies Initiative[],

  closing:
    "There is no option here that is simply correct. A is defensible if your programme will be cancelled without a visible result. C is defensible if it will survive two quiet quarters. What is not defensible is choosing either one without knowing which situation you are in — and that was decided back in Q1.",
};
