// Task 1 briefing shown under the DataForm hero. Worksheet wording is
// reproduced as issued; only the linking to hotspot ids is added.

export type BriefingLine = {
  id: string;
  text: string;
  /** Hotspot this line can be found on, if any. */
  findIt?: string;
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
    },
    {
      id: "t1-step-2",
      text:
        "Identify all points at which resource consumption or material waste becomes visible.",
      hint: "Now ask a different question of the same markers: what had to be manufactured, and what is being thrown away or left unused?",
    },
    {
      id: "t1-step-3",
      text:
        "Assign your observations to the areas operations, procurement, use, replacement, storage.",
      hint: "The five bands down the left name the areas. Decide by the lever you would pull, not by the object.",
    },
    {
      id: "t1-step-4",
      text: "Formulate at least one initial improvement approach for each area.",
      hint: "One approach per area is enough. Say what you would change, not what you would measure.",
    },
    {
      id: "t1-step-5",
      text:
        "Distinguish between what is more of an individual technical problem and what is more of a structural management problem.",
      hint: "Ask of each: could one team fix this next month, or does it need a rule or a decision from above?",
    },
  ],

  noteHeading: "Didactic note",
  note:
    "The task is deliberately designed so that it can be solved without special prior knowledge. Participants work by observing, structuring and applying everyday logic.",

  objectiveHeading: "Objective",
  objective: "Making the invisible environmental impacts of digital infrastructure visible.",
};
