// Training Ground content. Section 8 of the build prompt.
// N3: generic or invented companies only — never DataForm, NetCore or Artemis.
// The deck holds exactly three cards per area, so each area's badge can light.

import type { CategoryCode } from "./categories";
import type { FieldNote } from "./learn";

export type Verdict = "green" | "amber" | "red";

export type PracticeCard = {
  id: string;
  /** One line of scene-setting, so the snippet is not read cold. */
  setting: string;
  snippet: string;
  /** Glossary ids to link inside this card's text. */
  terms: string[];
  /** A nudge towards the diagnostic question. Never names the category. */
  hint: string;
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
  // --- Operations (Op) ---
  {
    id: "t01",
    hint:
      "Nothing is consumed and nothing is bought here. Ask what is simply running while nobody benefits from it.",
    setting:
      "A road freight company with one office building. Facilities manages the building; IT manages the servers inside it. Neither owns the schedule.",
    terms: ["hvac"],
    snippet:
      "GreenLog Freight leaves its server-room cooling running at full through weekends “because nobody wanted to change the schedule”.",
    correctCategory: "Op",
    verdict: "amber",
    whatItIs: "Standing operating draw with no user benefit.",
    whoItAffects: "Facilities and IT share responsibility; nobody owns the schedule.",
    fixBefore: "24/7 cooling.",
    fixAfter: "Scheduled setback plus a named owner for the operating rule.",
    principle:
      "When a waste survives because changing it belongs to nobody, the fix is an operating rule with an owner, not a device.",
  },
  {
    id: "t06",
    hint:
      "This one is a good decision, not a gap. Ask which meter goes down as a result.",
    setting:
      "A bank with its own server room. Someone questioned the temperature setting, and measurements were taken before anything was changed.",
    terms: ["setpoint", "thermal-survey", "pue"],
    snippet:
      "Marlin Bank raises its server-room setpoint from 20 °C to 24 °C after a thermal survey.",
    correctCategory: "Op",
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
    id: "t03",
    hint:
      "The servers are justified; the way they run is not. Ask what keeps drawing power while doing almost nothing.",
    setting:
      "A software firm whose test environments were stood up for a launch that shipped months ago.",
    terms: ["utilisation"],
    snippet:
      "Halden Systems keeps a rack of test servers powered 24/7 at under 10% utilisation, long after the project ended.",
    correctCategory: "Op",
    verdict: "amber",
    whatItIs: "Idle capacity drawing near its full power for almost no work.",
    whoItAffects: "IT operations; whoever signed off the project that ended.",
    fixBefore: "Idle servers left running.",
    fixAfter: "Consolidate the workloads and power down the surplus.",
    principle:
      "A half-idle server still pulls most of its peak. Utilisation, not the badge on the box, is the operating lever.",
  },
  // --- Use (U) ---
  {
    id: "t04",
    hint:
      "The equipment and the network are both fine. Ask whose habit, or whose default setting, is driving the load.",
    setting:
      "A consultancy where every meeting is remote by default. The video tool ships with its highest quality preset switched on.",
    terms: ["endpoint"],
    snippet:
      "Corvel Group teams routinely default to 4K video and screen-share in every internal call.",
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
    id: "t11",
    hint:
      "Ask what is drawing power while the building is empty — and which habit leaves it that way.",
    setting:
      "A healthcare provider with six sites and no central rule about what happens to a computer at the end of the day.",
    terms: ["patch-window", "wake-on-lan"],
    snippet:
      "Cormorant Health's monitors and desktops stay powered on overnight across 6 sites because the default was never changed.",
    correctCategory: "U",
    verdict: "amber",
    whatItIs: "Standing endpoint draw driven by a default nobody set.",
    whoItAffects: "IT policy and users.",
    fixBefore: "No power policy.",
    fixAfter: "Enforced sleep, with wake-on-LAN for patch windows.",
    principle:
      "The usual objection is patching. Answer it before you propose the policy and the objection disappears.",
  },
  {
    id: "t14",
    hint:
      "The storage is working exactly as configured. Ask which behaviour keeps filling it.",
    setting:
      "A law firm where every matter generates dozens of document versions, and nobody has ever been told when to delete one.",
    terms: ["redundant", "retention-policy"],
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
  // --- Replacement (Rp) ---
  {
    id: "t02",
    hint:
      "The laptops still worked. Ask what was destroyed that had already been paid for — in cash and in carbon.",
    setting:
      "A retail chain consolidating two offices into one over a single weekend, with a moving contractor paid by the hour.",
    terms: ["skip", "embodied-carbon"],
    snippet:
      "Kestrel Retail throws working 4-year-old laptops in the skip during an office move rather than redeploying them.",
    correctCategory: "Rp",
    verdict: "red",
    whatItIs: "Working devices retired early, their embedded carbon discarded with them.",
    whoItAffects: "Finance (write-off), IT (disposal), the sustainability report.",
    fixBefore: "Replace and discard.",
    fixAfter: "Redeploy or refurbish before any replacement decision.",
    principle:
      "A working device retired early destroys value that was already paid for, in cash and in carbon.",
    note: {
      text: "Around 80% of a laptop's lifetime carbon is spent in manufacturing, before first boot. Discarding a working four-year-old machine throws away a cost that has almost nothing left to give back.",
      source: "techCarbon",
    },
  },
  {
    id: "t12",
    hint:
      "The scanners are replaced on a date, not on a fault. Ask what is swapped out while it still works.",
    setting:
      "A food distributor whose warehouse scanners are supplied under a framework agreement written five years ago.",
    terms: ["refresh-cycle", "e-waste"],
    snippet:
      "Vibrant Foods replaces all warehouse handheld scanners every year under the vendor's default contract.",
    correctCategory: "Rp",
    verdict: "red",
    whatItIs: "Contract-driven refresh rather than condition-driven.",
    whoItAffects: "Procurement and operations.",
    fixBefore: "Annual swap.",
    fixAfter: "Condition-based swap on a longer contract.",
    principle:
      "Refresh cycles are usually inherited from a contract nobody has reread. The renewal date is your intervention point.",
    note: {
      text: "62 million tonnes of e-waste were generated in 2022 and only 22.3% was formally collected and recycled. Contract-driven refresh is one of the quiet engines behind that number.",
      source: "ewaste",
    },
  },
  {
    id: "t09",
    hint:
      "Ask what triggers the swap here — the calendar, or the condition of the device.",
    setting:
      "A professional-services firm whose device policy was written once and never revisited.",
    terms: ["refresh-cycle", "service-life"],
    snippet:
      "Pinehold Group swaps every laptop at exactly three years, whether or not it still performs.",
    correctCategory: "Rp",
    verdict: "amber",
    whatItIs: "A fixed cycle replacing devices by date rather than by need.",
    whoItAffects: "IT and finance.",
    fixBefore: "Fixed 3-year swap.",
    fixAfter: "Condition-based replacement, with a longer default service life.",
    principle:
      "One extra year of service life removes about a fifth of a device's annual footprint — with no purchase at all.",
  },
  // --- Storage (St) ---
  {
    id: "t07",
    hint:
      "Nothing is switched on. Ask what is sitting still that was expensive to make.",
    setting:
      "An insurer that replaced its monitors last year and kept the old ones rather than deciding what to do with them.",
    terms: ["embodied-carbon"],
    snippet: "Otterbrook Insurance keeps a stockroom of 3-year-old monitors “in case”.",
    correctCategory: "St",
    verdict: "amber",
    whatItIs: "Dormant capital and dormant embedded carbon.",
    whoItAffects: "IT asset management.",
    fixBefore: "Hoard.",
    fixAfter: "Reuse in training rooms, or donate.",
    principle:
      "Hoarding feels prudent and reads as waste on any inventory. Set a shelf-life for spares, the way you would for stock.",
  },
  {
    id: "t10",
    hint:
      "The devices left active service months ago. Ask what route onward was ever set for them.",
    setting:
      "A logistics company that upgraded its field phones and put the old ones in a drawer with no plan.",
    terms: ["reuse", "e-waste"],
    snippet:
      "Alderpost Logistics has 200 retired smartphones in a drawer with no reuse or recycling route.",
    correctCategory: "St",
    verdict: "amber",
    whatItIs: "Retired devices with no onward route, so their remaining value is stranded.",
    whoItAffects: "IT asset management and procurement.",
    fixBefore: "A drawer of dead stock.",
    fixAfter: "A standing reuse, resale or certified-recycling route.",
    principle:
      "Storage is only a waiting room. If nothing leaves it onward, the reuse value quietly expires.",
  },
  {
    id: "t13",
    hint:
      "Ask where these devices actually go at the end — and whether the materials come back.",
    setting:
      "A manufacturer decommissioning a fleet of old servers as part of a data-centre refresh.",
    terms: ["e-waste"],
    snippet:
      "Calder Group sends end-of-life servers to general waste rather than certified recycling.",
    correctCategory: "St",
    verdict: "red",
    whatItIs: "Recoverable materials leaving the economy for landfill or incineration.",
    whoItAffects: "IT, facilities, and the sustainability report.",
    fixBefore: "General waste.",
    fixAfter: "Certified recycling with a documented chain of custody.",
    principle:
      "Disposal is a decision with a paper trail or without one. Only the documented route counts as handled.",
    note: {
      text: "62 million tonnes of e-waste were generated in 2022 and only 22.3% was formally collected and recycled — the rest carries its metals and rare earths out of reach.",
      source: "ewaste",
    },
  },
  // --- Procurement (Pr) ---
  {
    id: "t05",
    hint:
      "Nothing is running yet. Ask what was left out of the question at the moment of buying.",
    setting:
      "An engineering group running a tender for its next fleet of workplace devices.",
    terms: ["life-cycle", "repairability"],
    snippet:
      "Novara Engineering buys laptops on unit price alone; repairability, service life and reuse never enter the tender.",
    correctCategory: "Pr",
    verdict: "red",
    whatItIs: "A purchase decision that fixes the device's whole life on price alone.",
    whoItAffects: "Procurement, finance and — later — IT and asset management.",
    fixBefore: "Price-only tender.",
    fixAfter: "Life-cycle and repairability scored alongside price.",
    principle:
      "The moment of buying is the only moment a device's lifetime is actually set. Leave it out of the criteria and every later lever is smaller.",
  },
  {
    id: "t08",
    hint:
      "The template decides thousands of future purchases. Ask which column it is missing.",
    setting:
      "A media group whose procurement template has not been revised since it was first written.",
    terms: ["service-life", "life-cycle"],
    snippet:
      "Salix Media's procurement template scores price and delivery speed, but not service life or repairability.",
    correctCategory: "Pr",
    verdict: "amber",
    whatItIs: "A buying rule that cannot express the thing that matters most for footprint.",
    whoItAffects: "Every future purchase; procurement owns the template.",
    fixBefore: "Price and delivery only.",
    fixAfter: "Add life-cycle criteria and a repair/reuse check to the template.",
    principle:
      "A criterion missing from the template is a criterion nobody is allowed to apply. Fix the document, not the buyer.",
  },
  {
    id: "t15",
    hint:
      "This one is a good decision, not a gap. Ask what the new rule prevents before it happens.",
    setting:
      "A distributor that added one step to its buying process after a review of early device replacements.",
    terms: ["reuse", "repairability"],
    snippet:
      "Marent Group requires every new device order to justify why the old one is replaced rather than repaired or reused.",
    correctCategory: "Pr",
    verdict: "green",
    whatItIs: "A procurement rule that makes reuse the default and replacement the exception.",
    whoItAffects: "Procurement, IT and finance.",
    fixBefore: "Replacement assumed.",
    fixAfter: "Replacement justified against repair and reuse first.",
    principle:
      "The cheapest device to buy is the one you do not buy. A justify-replacement rule turns that into a habit.",
  },
];

/** Correct answers needed in one category before its badge lights up. */
export const BADGE_THRESHOLD = 3;
