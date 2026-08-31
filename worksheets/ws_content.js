// ws_content.js — the single source of truth for verbatim worksheet content.
// Module 2 (Day 2) — "IT as an Environmental Factor: Energy, Raw Materials, Waste".
// Strings are copied VERBATIM from the live app data files:
//   data/mediprint.ts (DataForm), data/task2.ts, data/nordcom.ts (NetCore),
//   data/auron.ts (Artemis). If the app changes, update here and rebuild.

// The five Day 2 areas (replace the Day 1 Energy/Resources/Emissions/Use/Governance).
const AREAS = [
  { code: "Op", name: "Operations" },
  { code: "Pr", name: "Procurement" },
  { code: "U", name: "Use" },
  { code: "Rp", name: "Replacement" },
  { code: "St", name: "Storage" },
];

// ===================================================================
// DATAFORM — Worksheet 1 (Task 1) and Worksheet 2 (Task 2)
// ===================================================================
const DATAFORM = {
  brief:
    "DataForm Systems — 420 employees. The company operates a mix of office workstations, mobile devices, printers, a local server room, cloud applications and several test systems. Devices are replaced regularly, although many would still be technically usable. There is no systematic examination of energy or resource consumption.",

  // label · verbatim fact · area · lens (energy / resource / both)
  hotspots: [
    { ref: "H1", label: "Server room", fact: "Several older systems with low utilisation exist in the server room.", area: "Operations", lens: "Energy" },
    { ref: "H2", label: "Test systems", fact: "Several test systems run alongside the production estate — convenient to leave powered, and easy to forget once the test they were built for is over.", area: "Operations", lens: "Energy" },
    { ref: "H3", label: "Cloud applications", fact: "Cloud applications are in growing use. The energy behind them sits on the provider's meter, not tracked here.", area: "Operations", lens: "Energy" },
    { ref: "H4", label: "Workstations", fact: "Workstation computers often keep running at night as well.", area: "Use", lens: "Energy" },
    { ref: "H5", label: "Printers & peripherals", fact: "Printers and peripherals are distributed across many areas.", area: "Use", lens: "Energy + Resources" },
    { ref: "H6", label: "3-year notebook refresh", fact: "Notebooks are replaced by default after three years.", area: "Replacement", lens: "Resources" },
    { ref: "H7", label: "Unused devices in store", fact: "Old monitors and accessories are stored unused.", area: "Storage", lens: "Resources" },
    { ref: "H8", label: "Procurement desk", fact: "New devices are often procured without a repair check or reuse assessment.", area: "Procurement", lens: "Resources" },
  ],

  contexts: [
    "Devices are replaced regularly, although many would still be technically usable.",
    "There is no systematic examination of energy or resource consumption.",
  ],

  // Section D answer key — individual/technical vs structural/management (Task 1, step 5)
  techVsStructural: {
    H1: "Structural", // operating model / consolidation decision
    H2: "Technical",  // a team can power the test systems down
    H3: "Structural", // needs measurement and a governance view of cloud
    H4: "Technical",  // an operating default a team can set
    H5: "Technical",  // consolidate / manage the peripherals
    H6: "Structural", // the replacement policy is a management decision
    H7: "Technical",  // asset reuse / disposal hygiene
    H8: "Structural", // procurement criteria are a rule
  },
};

// ===================================================================
// DATAFORM TASK 2 — Worksheet 2 (the A/B/C measure decision)
// ===================================================================
const TASK2 = {
  measures: [
    { ref: "A", title: "Replace old workplace devices", full: "Replacing old workplace devices with new, more energy-efficient models." },
    { ref: "B", title: "Consolidate servers + operating rules", full: "Consolidating servers with low utilisation and introducing binding shutdown and operating rules." },
    { ref: "C", title: "Extend device service life", full: "Extending device service life through repair, reuse and changed procurement criteria." },
  ],

  conditions: [
    { ref: "C1", text: "The investment budget is limited." },
    { ref: "C2", text: "Precise consumption data is only partly available." },
    { ref: "C3", text: "The board expects results that are visible in the short term." },
    { ref: "C4", text: "IT wants to avoid operating risks." },
    { ref: "C5", text: "The departments want high availability and little disruption." },
  ],

  criteria: [
    "Environmental impact",
    "Economic viability",
    "Feasibility",
    "Risk",
    "Time required",
    "Strategic significance",
  ],

  // Section C answer key — which measure each condition most obstructs
  constraintKey: {
    C1: "A", // limited budget hits the largest capital outlay (new fleet)
    C2: "A", // buying efficient devices without a baseline is guesswork
    C3: "C", // service life pays back over years — slowest to show
    C4: "B", // consolidation and operating rules carry availability risk
    C5: "B", // shutdown / operating rules touch availability
  },

  // Section E answer key — first priority
  firstPriority: {
    pick: "B",
    reason:
      "Under a limited budget and thin data, B (consolidation plus binding shutdown and operating rules) is the strongest first move: effective short-term, low capital, lower risk than a blanket replacement (A), and it produces the consumption baseline the other two decisions need. Its obstructions (C4 operating risk, C5 availability) are manageable — stage it and keep a rollback — whereas A's obstructions (budget, thin data) are fundamental.",
  },
};

// ===================================================================
// NETCORE — Worksheet 3 (the case study)
// ===================================================================
const NETCORE = {
  brief:
    "NetCore Manufacturing Services GmbH — a medium-sized industrial company with 900 employees at three sites. The IT landscape has grown strongly in recent years: many workplace devices, several local server systems, increasing cloud use, high availability requirements and a growing rate of end-device replacement. Management notices rising IT costs, but has so far not developed a systematic view of environmental impacts. It requires a proposal on how IT costs and environmental impact can be improved together.",

  findings: [
    { ref: "F1", label: "Servers at low utilisation", fact: "Numerous servers run with low utilisation.", area: "Operations" },
    { ref: "F2", label: "Devices left on after hours", fact: "Workstation computers and monitors often remain in operation outside usage hours.", area: "Use" },
    { ref: "F3", label: "Fixed replacement cycles", fact: "Devices are replaced in fixed cycles, regardless of their actual condition.", area: "Replacement" },
    { ref: "F4", label: "No repair or reuse concept", fact: "There is no repair or reuse concept.", area: "Storage" },
    { ref: "F5", label: "Procurement on price alone", fact: "Procurement decisions are based almost exclusively on price, performance and availability of supply.", area: "Procurement" },
    { ref: "F6", label: "Sustainability data hardly available", fact: "Sustainability data on IT systems is hardly available.", area: "Operations" },
    { ref: "F7", label: "Increasing cloud use", fact: "Cloud use is increasing across the three sites.", area: "Operations" },
    { ref: "F8", label: "High availability requirements", fact: "High availability requirements shape how the estate is run.", area: "Operations" },
  ],

  actionAreas: [
    { ref: "AA1", name: "Consolidate + operating model", full: "Consolidate low-utilisation systems and review the operating model. Remove idle and duplicated capacity, and — with simple usage and shutdown rules — set when systems and devices run." },
    { ref: "AA2", name: "Energy & usage rules", full: "Introduce binding energy and usage rules for end devices and infrastructure. Agree shutdown, sleep and operating rules for workstations, monitors and infrastructure across the three sites." },
    { ref: "AA3", name: "Service-life extension", full: "Extend device service life through repair, reuse and condition-based replacement. Replace the fixed cycle with condition-based renewal, and set up a repair and reuse route for devices that still work." },
    { ref: "AA4", name: "Procurement criteria", full: "Adapt procurement criteria to include life cycle and sustainability aspects. Rewrite what devices and services are bought on, so life cycle and sustainability sit beside price, performance and supply." },
  ],

  // Section A — the six perspectives from the curriculum, and which findings sit in each
  perspectives: [
    { name: "Energy consumption", findings: "F1, F2, F7, F8" },
    { name: "Resource consumption", findings: "F3, F4, F5" },
    { name: "Service life", findings: "F3, F4" },
    { name: "Operating model", findings: "F1, F6, F8" },
    { name: "Procurement", findings: "F5" },
    { name: "Management", findings: "F6" },
  ],

  // Section D answer key — the first step
  firstStep: {
    pick: "AA1",
    reason:
      "The model solution's prioritised first measure is a transparency and consolidation initiative in ongoing operations, combined with simple usage and shutdown rules (AA1, taken together with AA2). It is effective in the short term, comparatively easy to implement, lower in cost and risk than a blanket replacement, creates a basis for later investment decisions, and combines the cost and environmental perspectives. Another action area passes IF it is defended across impact, risk and feasibility with F#-level evidence.",
  },
};

// ===================================================================
// ARTEMIS — Worksheet 4 (the L3 management proposal)
// ===================================================================
const ARTEMIS = {
  role:
    "You take on the role of head of IT strategy / CIO advisor for Artemis Digital Industries. The company is growing, operates hybrid IT structures, procures in a decentralised way, has rising operating costs, and is under increasing pressure to reduce environmental impacts in a comprehensible way without jeopardising the performance of IT.",

  conditions: [
    { ref: "F1", text: "Differing interests of IT operations, purchasing, finance and management." },
    { ref: "F2", text: "High requirements for availability and performance." },
    { ref: "F3", text: "Incomplete data transparency on consumption and inventories." },
    { ref: "F4", text: "Budget restrictions and the expectation of short-term results." },
    { ref: "F5", text: "Existing replacement and procurement routines have grown historically." },
    { ref: "F6", text: "Sustainability should become visible, but must not remain mere symbolic politics." },
  ],

  stateFindings: [
    { ref: "F7", text: "The company is growing and operates across several sites." },
    { ref: "F8", text: "The company operates hybrid IT structures." },
    { ref: "F9", text: "The company procures in a decentralised way." },
    { ref: "F10", text: "The company has rising operating costs." },
  ],

  measures: [
    { ref: "M1", name: "Sustainable-IT owner", points: 1, full: "Appoint a sustainable-IT owner with decision rights. One named person who can settle a question between IT, purchasing and finance without escalating it." },
    { ref: "M2", name: "Baseline across sites", points: 3, full: "Baseline across all sites: consumption and device inventory. A first picture of what is actually running and how old it is, in a landscape that is not uniform." },
    { ref: "M3", name: "Energy & usage rules", points: 2, full: "Binding energy and usage rules (shutdown and operating). The small, visible waste stopped now — devices and infrastructure that run when nobody benefits." },
    { ref: "M4", name: "Consolidate low-utilisation systems", points: 4, full: "Consolidate low-utilisation systems and review the operating model. Work on the largest idle-capacity waste, where the rising operating cost on the board originates." },
    { ref: "M5", name: "Device service-life extension", points: 3, full: "Device service-life extension through repair and reuse. Longer service life on equipment that already exists — the clearest resource effect available here." },
    { ref: "M6", name: "Procurement criteria (life-cycle)", points: 2, full: "Procurement criteria with a life-cycle perspective. A rule that applies at the moment of buying, which is the only moment a device's lifetime is actually set." },
    { ref: "M7", name: "ESG reporting integration", points: 3, full: "Integration into ESG and sustainability reporting. The traceable statement customers and the board are asking for, on the reporting pressure already running." },
  ],

  constraint:
    "Total capacity requested: 18 points. Capacity available: 10 points. The shortfall is deliberate — a prioritised roadmap is one where some things sit late on purpose.",

  // The 7 elements of the decision architecture (Task, verbatim)
  elements: [
    { n: 1, name: "Strategic relevance", prompt: "A management view of why energy and resource consumption in IT are strategically relevant." },
    { n: 2, name: "Three decision fields", prompt: "Name the three most important decision fields for the next twelve months." },
    { n: 3, name: "Decision logic", prompt: "Develop a decision logic according to which measures are to be prioritised." },
    { n: 4, name: "Central trade-offs", prompt: "Analyse the central trade-offs between efficiency, investment, usability, availability and sustainability." },
    { n: 5, name: "First prioritised line", prompt: "Recommend a first prioritised line of measures, with justification." },
    { n: 6, name: "Responsibilities & review", prompt: "Propose responsibilities, management and review mechanisms." },
    { n: 7, name: "Decision now, under uncertainty", prompt: "Name at least one decision that should be taken immediately despite an incomplete information situation." },
  ],

  // Section B — a defensible first line that fits the 10-point capacity
  firstLine: {
    funded: ["M1", "M2", "M3", "M4"], // 1 + 3 + 2 + 4 = 10
    reason:
      "A defensible first line funds ownership, transparency and the operating model: M1 owner (1) + M2 baseline (3) + M3 rules (2) + M4 consolidation (4) = 10, exactly the capacity. Service life (M5), procurement criteria (M6) and reporting (M7) follow once the baseline exists. Any allocation ≤ 10 passes if the deferrals are named and justified.",
  },
};

module.exports = { AREAS, DATAFORM, TASK2, NETCORE, ARTEMIS };
