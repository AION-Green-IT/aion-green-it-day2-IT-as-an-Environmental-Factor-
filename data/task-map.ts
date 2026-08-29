// Section 9 — the Task -> Case -> Learn map.

export type TaskMapRow = {
  id: string;
  task: string;
  level: string;
  caseHref: string;
  caseLabel: string;
  learnSupport: string;
};

export const TASK_MAP: TaskMapRow[] = [
  {
    id: "task-1",
    task: "Task 1",
    level: "L1 · Knowledge",
    caseHref: "/case/mediprint",
    caseLabel: "DataForm (hero markers: energy & resource points)",
    learnSupport: "W1 (energy & resource terms), W3 (area sorter)",
  },
  {
    id: "task-2",
    task: "Task 2",
    level: "L2 · Application",
    caseHref: "/case/mediprint",
    caseLabel: "DataForm (measure A/B/C decision)",
    learnSupport: "W4 (trade-off dial), W5 (priority matrix), W6 (incomplete information)",
  },
  {
    id: "case-netcore",
    task: "Case study",
    level: "L2 → Management",
    caseHref: "/case/nordcom",
    caseLabel: "NetCore (board findings + first-move decision)",
    learnSupport: "W5 (matrix), W8 (roadmap: short/medium/structural), W10 (service life)",
  },
  {
    id: "l3-artemis",
    task: "Level 3",
    level: "L3 · Management decision",
    caseHref: "/case/auron",
    caseLabel: "Artemis (conditions + capacity allocation)",
    learnSupport: "W7 (governance chart), W8 (roadmap), W9 (symbolic vs strategic)",
  },
];
