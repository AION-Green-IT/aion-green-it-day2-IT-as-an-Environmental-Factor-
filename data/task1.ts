// Task 1 briefing shown under the MediPrint hero. Worksheet wording is
// reproduced as issued; only the linking to hotspot ids is added.

export type BriefingLine = {
  id: string;
  text: string;
  /** Hotspot this line can be found on, if any. */
  findIt?: string;
};

export const TASK1 = {
  number: "Task 1",
  title: "Making Green IT visible in a company",

  lead:
    "Participants receive a short description of a fictitious company “MediPrint Solutions” with 280 employees, two sites, its own server room, regular device renewal every three years, a high volume of printing, growing cloud use and no sustainability strategy in IT.",

  // The lead sentence broken into the phrases that appear on the illustration.
  leadFacts: [
    { id: "t1-lead-size", text: "280 employees, two sites" },
    { id: "t1-lead-server", text: "its own server room", findIt: "hs-server-room" },
    {
      id: "t1-lead-renewal",
      text: "regular device renewal every three years",
      findIt: "hs-devices-3yr",
    },
    { id: "t1-lead-print", text: "a high volume of printing", findIt: "hs-print" },
    { id: "t1-lead-cloud", text: "growing cloud use", findIt: "hs-cloud" },
    {
      id: "t1-lead-nostrategy",
      text: "no sustainability strategy in IT",
      findIt: "hs-boardroom",
    },
  ] satisfies BriefingLine[],

  additionalHeading: "Additional information",
  additional: [
    {
      id: "t1-add-elec",
      text: "Electricity costs are rising significantly",
      findIt: "hs-elec-meter",
    },
    {
      id: "t1-add-basement",
      text: "Many old devices are stored unused in the basement",
      findIt: "hs-basement",
    },
    {
      id: "t1-add-rules",
      text: "There are no rules for procurement or device service life",
      findIt: "hs-procurement",
    },
    {
      id: "t1-add-projects",
      text: "IT projects are assessed only in terms of functionality and speed",
      findIt: "hs-project-lens",
    },
    {
      id: "t1-add-mgmt",
      text:
        "Management is asking for the first time about IT's contribution to sustainability",
    },
  ] satisfies BriefingLine[],

  assignmentHeading: "Work assignment",
  assignment: [
    {
      id: "t1-step-1",
      text:
        "Highlight all passages in the text that point to Green-IT-relevant topics.",
      hint: "Open every marker on the illustration above. Each one carries one passage, word for word.",
    },
    {
      id: "t1-step-2",
      text:
        "Assign your observations to the categories energy, resources, emissions, use and organisation/governance.",
      hint: "Write your own assignment down first. The topic area shown on a marker is a tag on the illustration, not a marked answer sheet.",
    },
    {
      id: "t1-step-3",
      text:
        "Formulate five assumptions as to why Green IT is relevant for this company.",
      hint: "Five assumptions, not five facts. Say what each observation could mean for cost, risk, reputation or capability.",
    },
    {
      id: "t1-step-4",
      text: "Distinguish between operational and strategic problem areas.",
      hint: "Ask of each observation: is this something a team can change next month, or does it need a decision from above?",
    },
  ],

  noteHeading: "Didactic note",
  note:
    "The task is deliberately designed so that it can also be completed without prior knowledge. It is based on observation, structuring and common sense.",

  objectiveHeading: "Objective",
  objective: "Practising the systemic identification of Green IT topics.",
};
