// Training Ground content. Section 8 of the build prompt.
// N3: generic or invented companies only — never MediPrint, NordCom or Auron.

import type { CategoryCode } from "./categories";
import type { FieldNote } from "./learn";

export type Verdict = "green" | "amber" | "red";

export type PracticeCard = {
  id: string;
  snippet: string;
  correctCategory: CategoryCode;
  verdict: Verdict;
  whatItIs: string;
  whoItAffects: string;
  fixBefore: string;
  fixAfter: string;
  /** The transferable rule — what to carry into your own organisation. */
  principle: string;
  note?: FieldNote;
};

export const VERDICT_LABEL: Record<Verdict, string> = {
  green: "Working as intended",
  amber: "Costly habit",
  red: "Structural gap",
};

export const CARDS: PracticeCard[] = [
  {
    id: "t01",
    snippet:
      "GreenLog Freight leaves its office HVAC running through weekends “because nobody wanted to change the schedule”.",
    correctCategory: "E",
    verdict: "amber",
    whatItIs: "Standing energy draw with no user benefit.",
    whoItAffects: "Facilities and IT share responsibility; nobody owns it.",
    fixBefore: "24/7 HVAC.",
    fixAfter: "Scheduled setback plus a named owner.",
    principle:
      "When a waste survives because changing it belongs to nobody, the fix is an owner, not a device.",
  },
  {
    id: "t02",
    snippet:
      "Kestrel Retail throws working 4-year-old laptops in the skip during an office move.",
    correctCategory: "R",
    verdict: "red",
    whatItIs: "Embedded carbon and materials discarded early.",
    whoItAffects: "Finance (write-off), IT (disposal), the sustainability report.",
    fixBefore: "Disposal.",
    fixAfter: "Refurbish, then secondary use or donation.",
    principle:
      "A working device thrown away destroys value that was already paid for, in cash and in carbon.",
    note: {
      text: "Around 80% of a laptop's lifetime carbon is spent in manufacturing, before first boot. Discarding a working four-year-old machine throws away a cost that has almost nothing left to give back.",
      source: "techCarbon",
    },
  },
  {
    id: "t03",
    snippet:
      "Novara Analytics trains a large model in a coal-heavy region because it is 12% cheaper.",
    correctCategory: "Em",
    verdict: "red",
    whatItIs: "Compute-driven emissions inflated by the grid mix.",
    whoItAffects: "Data science, cloud FinOps, sustainability reporting.",
    fixBefore: "Region chosen on cost alone.",
    fixAfter: "Region weighted for carbon intensity as well as cost.",
    principle:
      "Same workload, same code, different grid — emissions can differ by a multiple. Region is a decision, not a default.",
    note: {
      text: "Carbon-aware placement and scheduling is reported to cut workload emissions by 2–10x with no application change. The SCI standard (ISO/IEC 21031:2024) counts this properly and deliberately excludes offsets, so the score only improves through real change.",
      source: "sci",
    },
  },
  {
    id: "t04",
    snippet:
      "Halden Group teams routinely default to 4K video and screen-share in every internal call.",
    correctCategory: "U",
    verdict: "amber",
    whatItIs: "Bandwidth and endpoint energy up with no meeting benefit.",
    whoItAffects: "Every user; IT sets the defaults.",
    fixBefore: "4K default.",
    fixAfter: "720p default, HD on request.",
    principle:
      "Changing a default changes thousands of decisions at once. Asking people to choose better changes almost none.",
    note: {
      text: "The energy split for streaming is not where most people expect: viewing devices about 72%, transmission 23%, data centres 5%. Earlier figures blaming the network overstated it by up to 50x. Lowering the default resolution acts on the endpoint — the large share.",
      source: "ieaStreaming",
    },
  },
  {
    id: "t05",
    snippet:
      "Ferronova has bought a Green IT dashboard but nobody is accountable for its numbers.",
    correctCategory: "G",
    verdict: "red",
    whatItIs: "A tool without ownership, so the metrics are ignored.",
    whoItAffects: "Board, CIO, the sustainability lead who does not exist yet.",
    fixBefore: "Unowned tool.",
    fixAfter: "Named owner plus a monthly review in an existing meeting.",
    principle:
      "Measurement without accountability is decoration. Buy the owner before you buy the tool.",
  },
  {
    id: "t06",
    snippet:
      "Marlin Bank raises its data-hall setpoint from 20 °C to 24 °C after a thermal survey.",
    correctCategory: "E",
    verdict: "green",
    whatItIs: "Cooling load cut with no reliability trade-off.",
    whoItAffects: "Facilities and IT operations.",
    fixBefore: "Kept as is.",
    fixAfter: "Publish the setpoint and repeat the thermal survey annually.",
    principle:
      "The survey is what makes this defensible. The same change without evidence is a gamble that happened to work.",
    note: {
      text: "Cooling is the main thing PUE measures. In Germany this is now regulated: existing data centres must reach an annual PUE of 1.5 by July 2027 and 1.3 by July 2030, with a 2026 draft amendment proposing 1.6 and 1.4 instead.",
      source: "enefg",
    },
  },
  {
    id: "t07",
    snippet: "Otterbrook Insurance keeps a stockroom of 3-year-old monitors “in case”.",
    correctCategory: "R",
    verdict: "amber",
    whatItIs: "Dormant capital and dormant embedded carbon.",
    whoItAffects: "IT asset management.",
    fixBefore: "Hoard.",
    fixAfter: "Reuse in training rooms, or donate.",
    principle:
      "Hoarding feels prudent and reads as waste on any inventory. Set a shelf-life for spares, the way you would for stock.",
  },
  {
    id: "t08",
    snippet: "Salix Media flies 8 people to a 2-hour internal review each month.",
    correctCategory: "Em",
    verdict: "amber",
    whatItIs: "Avoidable travel emissions.",
    whoItAffects: "The business unit and the travel policy owner.",
    fixBefore: "Monthly flight.",
    fixAfter: "Quarterly in person, monthly remote.",
    principle:
      "This is IT as enabler. The emissions sit outside IT, but the alternative is IT's to make good enough to choose.",
  },
  {
    id: "t09",
    snippet:
      "Delton Manufacturing keeps 40 shopfloor screens streaming a dashboard 24/7 that only day-shift supervisors read.",
    correctCategory: "U",
    verdict: "red",
    whatItIs: "Always-on display for a part-time audience.",
    whoItAffects: "Operations and IT.",
    fixBefore: "24/7.",
    fixAfter: "Scheduled on during shifts, motion-off outside them.",
    principle:
      "Match the runtime to the audience, not to the equipment's capability.",
  },
  {
    id: "t10",
    snippet: "Astra Freight has a sustainability strategy but IT is not in it.",
    correctCategory: "G",
    verdict: "amber",
    whatItIs: "A strategy without IT scope, which is a blind spot by construction.",
    whoItAffects: "Board, CSO, CIO.",
    fixBefore: "IT absent from scope.",
    fixAfter: "IT written into scope, with its own KPIs.",
    principle:
      "If IT is not named in the strategy, no IT budget holder is obliged to act on it. Scope is permission.",
  },
  {
    id: "t11",
    snippet:
      "Cormorant Health's monitors and desktops stay powered on overnight across 6 sites.",
    correctCategory: "E",
    verdict: "amber",
    whatItIs: "Standing endpoint draw.",
    whoItAffects: "IT policy and users.",
    fixBefore: "No power policy.",
    fixAfter: "Enforced sleep, with wake-on-LAN for patch windows.",
    principle:
      "The usual objection is patching. Answer it before you propose the policy and the objection disappears.",
  },
  {
    id: "t12",
    snippet:
      "Vibrant Foods replaces all warehouse handheld scanners every year under the vendor's default contract.",
    correctCategory: "R",
    verdict: "red",
    whatItIs: "Contract-driven refresh rather than need-driven.",
    whoItAffects: "Procurement and operations.",
    fixBefore: "Annual swap.",
    fixAfter: "Condition-based swap on a 3-year contract.",
    principle:
      "Refresh cycles are usually inherited from a contract nobody has reread. The renewal date is your intervention point.",
    note: {
      text: "62 million tonnes of e-waste were generated in 2022 and only 22.3% was formally collected and recycled. Contract-driven refresh is one of the quiet engines behind that number.",
      source: "ewaste",
    },
  },
  {
    id: "t13",
    snippet:
      "Northlake Utilities moves batch reports to run overnight during off-peak, lower-carbon hours.",
    correctCategory: "Em",
    verdict: "green",
    whatItIs: "A load shift with a carbon benefit.",
    whoItAffects: "Data platform team and sustainability.",
    fixBefore: "Kept as is.",
    fixAfter: "Publish the runtime shift and the intensity delta.",
    principle:
      "Deferrable work is the cheapest carbon lever in most estates, because nothing has to be bought or rewritten.",
  },
  {
    id: "t14",
    snippet:
      "Bracken Legal saves every draft, revision and email attachment on three redundant file shares.",
    correctCategory: "U",
    verdict: "amber",
    whatItIs: "Storage sprawl driving avoidable capacity.",
    whoItAffects: "IT and records management.",
    fixBefore: "Three-times redundancy by default.",
    fixAfter: "A retention policy plus a single canonical store.",
    principle:
      "Storage sprawl is bought twice: once as capacity, and again at the next hardware refresh.",
  },
  {
    id: "t15",
    snippet:
      "Zephyr Retail's board declares “net zero IT by 2030” with no baseline, no owner, and no budget.",
    correctCategory: "G",
    verdict: "red",
    whatItIs: "An announcement without architecture.",
    whoItAffects: "Board and CIO.",
    fixBefore: "Press release.",
    fixAfter: "Baseline, owner, budget and milestones — then the announcement.",
    principle:
      "A target with no baseline cannot be missed or met, only argued about. That is the reputational risk, not the target itself.",
  },
];

/** Correct answers needed in one category before its badge lights up. */
export const BADGE_THRESHOLD = 3;
