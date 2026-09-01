// Task 1 briefing shown under the DataForm hero. Worksheet wording is
// reproduced as issued; only the linking to hotspot ids is added.

export type BriefingLine = {
  id: string;
  text: string;
  /** Hotspot this line can be found on, if any. */
  findIt?: string;
};

export type AssignmentStep = {
  id: string;
  text: string;
  hint: string;
  /** A short reasoning walkthrough behind the "How to think about this"
   * toggle — deeper than the one-line hint, but still a method, not the
   * DataForm answer itself. */
  think: string[];
};

export const TASK1 = {
  number: "Task 1",
  title: "Where do energy consumption and resource burden arise in an IT landscape?",

  lead:
    "Participants receive the description of a fictitious company “DataForm Systems” with 420 employees. The company operates a mix of office workstations, mobile devices, printers, a local server room, cloud applications and several test systems. Devices are replaced regularly, although many would still be technically usable. There is no systematic examination of energy or resource consumption.",

  // The lead sentence broken into the phrases that appear on the illustration.
  leadFacts: [
    { id: "t1-lead-size", text: "420 employees" },
    { id: "t1-lead-workstations", text: "office workstations", findIt: "hs-workstations" },
    { id: "t1-lead-printers", text: "printers", findIt: "hs-print" },
    { id: "t1-lead-server", text: "a local server room", findIt: "hs-server-room" },
    { id: "t1-lead-cloud", text: "cloud applications", findIt: "hs-cloud" },
    { id: "t1-lead-test", text: "several test systems", findIt: "hs-test-systems" },
  ] satisfies BriefingLine[],

  additionalHeading: "Framework description",
  additional: [
    {
      id: "t1-add-night",
      text: "Workstation computers often keep running at night as well",
      findIt: "hs-workstations",
    },
    {
      id: "t1-add-lowutil",
      text: "Several older systems with low utilisation exist in the server room",
      findIt: "hs-server-room",
    },
    {
      id: "t1-add-notebooks",
      text: "Notebooks are replaced by default after three years",
      findIt: "hs-devices-3yr",
    },
    {
      id: "t1-add-monitors",
      text: "Old monitors and accessories are stored unused",
      findIt: "hs-basement",
    },
    {
      id: "t1-add-procurement",
      text: "New devices are often procured without a repair check or reuse assessment",
      findIt: "hs-procurement",
    },
    {
      id: "t1-add-printers",
      text: "Printers and peripherals are distributed across many areas",
      findIt: "hs-print",
    },
  ] satisfies BriefingLine[],

  assignmentHeading: "Work assignment",
  assignment: [
    {
      id: "t1-step-1",
      text: "Identify all points at which energy consumption arises in the company.",
      hint: "Open the markers. Ask of each: is power being drawn here — while running, idling or cooling?",
      think: [
        "Power is drawn in three ways: while something runs, while it idles, and while it is cooled — not only while a screen is lit.",
        "A device sitting “off” but still plugged in, or a room kept cold for racks that are half-empty, still counts.",
        "If you cannot tell whether it is drawing power right now, that gap is itself worth flagging.",
      ],
    },
    {
      id: "t1-step-2",
      text:
        "Identify all points at which resource consumption or material waste becomes visible.",
      hint: "Now ask a different question of the same markers: what had to be manufactured, and what is being thrown away or left unused?",
      think: [
        "Stop asking about power. Ask instead: what had to be mined, built and shipped for this to exist?",
        "Then ask the mirror question: once it is replaced or unused, where does it go — reused, stored, or wasted?",
        "Words like replaced, stored and procured are the resource signal; running, idling and cooling are the energy signal from step 1.",
      ],
    },
    {
      id: "t1-step-3",
      text:
        "Assign your observations to the areas operations, procurement, use, replacement, storage.",
      hint: "The five bands down the left name the areas. Decide by the lever you would pull, not by the object.",
      think: [
        "Do not sort by the object — a laptop is not automatically “Use”. Sort by who would have to act, and what lever they would pull.",
        "A day-to-day running rule points to Operations. A buying decision points to Procurement. A default habit points to Use.",
        "The timing of a swap points to Replacement. Things sitting around unused point to Storage.",
        "If two areas seem to fit, pick the one closest to where the decision would actually get made.",
      ],
    },
    {
      id: "t1-step-4",
      text: "Formulate at least one initial improvement approach for each area.",
      hint: "One approach per area is enough. Say what you would change, not what you would measure.",
      think: [
        "An improvement is a change someone commits to — not a measurement, a study, or an audit.",
        "Weak: “measure how much power the servers use.” Strong: “set test systems to shut down outside work hours.”",
        "Ask: what is the smallest concrete rule, default or habit that would move this observation in the right direction?",
      ],
    },
    {
      id: "t1-step-5",
      text:
        "Distinguish between what is more of an individual technical problem and what is more of a structural management problem.",
      hint: "Ask of each: could one team fix this next month, or does it need a rule or a decision from above?",
      think: [
        "Could one team fix it next month without asking anyone above them? That is individual / technical.",
        "Does it need a new rule, a budget line, or someone with authority to decide? That is structural / management.",
        "A default setting is usually technical. A purchasing policy is usually structural. When unsure, ask who would have to say yes.",
      ],
    },
  ] satisfies AssignmentStep[],

  noteHeading: "Didactic note",
  note:
    "The task is deliberately designed so that it can be solved without special prior knowledge. Participants work by observing, structuring and applying everyday logic.",

  objectiveHeading: "Objective",
  objective: "Making the invisible environmental impacts of digital infrastructure visible.",
};
