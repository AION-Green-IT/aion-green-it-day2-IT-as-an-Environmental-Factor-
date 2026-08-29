// Plain-language definitions for every term the tabs use without explaining.
// Written for a room where English is a second language: short sentences,
// concrete nouns, and one line on why the term matters for a decision.

export type GlossaryEntry = {
  id: string;
  term: string;
  /** The exact string to find in body text, matched case-insensitively. */
  match: string;
  /** Alternative spellings that should also link, e.g. plurals. */
  also?: string[];
  plain: string;
  /** Why a decision-maker should care. Optional — not every term needs one. */
  soWhat?: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    id: "hvac",
    term: "HVAC",
    match: "HVAC",
    plain:
      "Heating, Ventilation and Air Conditioning — the building's climate system. It warms, cools and moves fresh air through the offices.",
    soWhat:
      "In most office buildings this is the single largest electricity user, ahead of all the computers put together. It is also usually managed by facilities, not IT, which is why nobody notices it running at the weekend.",
  },
  {
    id: "skip",
    term: "Skip",
    match: "skip",
    plain:
      "A large open metal container for waste, parked outside a building during a move or renovation. American English calls it a dumpster.",
    soWhat:
      "What goes in a skip goes to landfill. It is the difference between disposal and reuse, decided by whoever is carrying the boxes.",
  },
  {
    id: "embodied-carbon",
    term: "Embodied carbon",
    match: "Embedded carbon",
    also: ["embodied carbon", "embedded carbon", "manufacturing footprint"],
    plain:
      "The emissions already released to make a product — mining, refining, manufacturing, shipping — before anyone switches it on for the first time.",
    soWhat:
      "For a laptop this is roughly four fifths of its lifetime total. You cannot reduce it after the purchase. You can only spread it across more years of use, which is why service life is such a strong lever.",
  },
  {
    id: "grid-mix",
    term: "Grid mix / carbon intensity",
    match: "grid mix",
    also: ["carbon intensity", "coal-heavy region", "coal-heavy"],
    plain:
      "How much CO₂ is released per unit of electricity on a particular power grid, at a particular moment. Coal-heavy grids are high; wind, solar, hydro and nuclear are low.",
    soWhat:
      "The same server doing the same work emits very differently depending on where and when it runs. This is a choice, and it is usually made by default.",
  },
  {
    id: "cloud-region",
    term: "Cloud region",
    match: "region",
    also: ["cloud region"],
    plain:
      "The physical place where a cloud provider actually runs your workload — a cluster of data centres in one country or area. You pick it when you set the service up.",
    soWhat:
      "Most teams pick a region on price or speed and never look at the local energy mix. Changing it later usually means moving data, which is why the first choice matters.",
  },
  {
    id: "finops",
    term: "FinOps",
    match: "FinOps",
    plain:
      "The practice of managing cloud spending — tracking what each team runs and what it costs, month by month.",
    soWhat:
      "It is already the place where cloud usage gets questioned. That makes it the cheapest place to add carbon as a second number next to cost.",
  },
  {
    id: "endpoint",
    term: "Endpoint",
    match: "endpoint",
    also: ["endpoints"],
    plain:
      "The device in front of the person: laptop, desktop, monitor, phone. The opposite end of the connection from the server.",
    soWhat:
      "IT usually controls endpoint default settings centrally. Changing a default changes thousands of decisions at once, without asking anyone to behave differently.",
  },
  {
    id: "setpoint",
    term: "Setpoint",
    match: "setpoint",
    plain:
      "The temperature a cooling system is told to hold. A lower setpoint means the cooling runs harder and uses more electricity.",
    soWhat:
      "Many server rooms are held far colder than the equipment needs, because the number was set once and never revisited.",
  },
  {
    id: "data-hall",
    term: "Data hall",
    match: "data-hall",
    also: ["data hall"],
    plain:
      "The room inside a data centre where the server racks actually stand. The rest of the building is power supply, cooling plant and offices.",
  },
  {
    id: "thermal-survey",
    term: "Thermal survey",
    match: "thermal survey",
    plain:
      "A measurement of how hot and cold air actually move through a server room, taken with sensors rather than assumed from the design drawings.",
    soWhat:
      "It is what turns “we could probably run warmer” into a decision you can defend if a server later fails. The survey is the real work; the setpoint change takes a minute.",
  },
  {
    id: "pue",
    term: "PUE",
    match: "PUE",
    plain:
      "Power Usage Effectiveness. Total electricity entering a data centre, divided by the electricity that reaches the computers. PUE 1.5 means that for every 10 units of computing, 5 more go to cooling, power conversion and the building.",
    soWhat:
      "In Germany this is now a statutory duty with dates attached, not a best-practice metric. It also says nothing about whether the computing was worth doing — a half-empty data centre can post an excellent PUE.",
  },
  {
    id: "wake-on-lan",
    term: "Wake-on-LAN",
    match: "wake-on-LAN",
    plain:
      "A feature that lets IT switch a sleeping computer back on remotely, over the network.",
    soWhat:
      "It is the answer to the standard objection against any sleep policy: “but we need the machines awake at night for updates.” Prepare this answer before proposing the policy.",
  },
  {
    id: "patch-window",
    term: "Patch window",
    match: "patch window",
    also: ["patch windows"],
    plain:
      "The scheduled time, usually at night, when IT installs security updates across the fleet.",
    soWhat:
      "Any power-saving policy has to survive the patch window, or it gets switched off again within a month and nobody tells you.",
  },
  {
    id: "batch",
    term: "Batch job",
    match: "batch reports",
    also: ["batch job", "batch jobs", "batch"],
    plain:
      "Work a computer does in one long run with nobody waiting for the result — overnight reports, backups, billing runs.",
    soWhat:
      "Because nobody is waiting, it can be moved to a different hour. That makes it the easiest work in the estate to shift onto cleaner electricity.",
  },
  {
    id: "load-shift",
    term: "Load shifting",
    match: "load shift",
    also: ["off-peak", "carbon-aware"],
    plain:
      "Moving flexible computing work to a time or a place where the electricity is cleaner. The work itself does not change — only the schedule or the location.",
    soWhat:
      "Nothing is bought and no code is rewritten, which is rare. Reported reductions run from two to ten times for the work that is moved.",
  },
  {
    id: "retention-policy",
    term: "Retention policy",
    match: "retention policy",
    plain:
      "A written rule stating how long each kind of file is kept, and when it is deleted.",
    soWhat:
      "Without one, everything is kept forever. Storage then grows quietly until it is bought again at the next hardware refresh — the same data paid for twice.",
  },
  {
    id: "canonical-store",
    term: "Canonical store",
    match: "canonical store",
    plain:
      "The one agreed location that holds the authoritative version of a file. Everything elsewhere is a copy that may be deleted.",
  },
  {
    id: "redundant",
    term: "Redundant copies",
    match: "redundant file shares",
    also: ["redundancy", "redundant"],
    plain:
      "Extra copies of the same data kept in more than one place.",
    soWhat:
      "Some redundancy protects against loss and is worth paying for. Beyond that it is capacity being bought, powered and backed up for no benefit.",
  },
  {
    id: "kpi",
    term: "KPI",
    match: "KPI",
    also: ["KPIs"],
    plain:
      "Key Performance Indicator — a number that a named person is accountable for and reports on a fixed rhythm.",
    soWhat:
      "A number nobody reports is not a KPI, it is a statistic. The name attached to it is what makes it steer anything.",
  },
  {
    id: "baseline",
    term: "Baseline",
    match: "baseline",
    plain:
      "The starting measurement, taken before you change anything.",
    soWhat:
      "A target with no baseline can be neither met nor missed — only argued about. That, not the target itself, is the reputational risk.",
  },
  {
    id: "net-zero",
    term: "Net zero",
    match: "net zero",
    plain:
      "A claim that whatever emissions remain are balanced by removals somewhere else, so the total is zero.",
    soWhat:
      "It is a claim about a total. On its own it says nothing about whether anything was actually reduced, which is why the baseline and the milestones are what get scrutinised.",
  },
  {
    id: "scope-3",
    term: "Scope 3",
    match: "Scope 3",
    plain:
      "Emissions that happen outside your own company but because of it — at suppliers, at cloud providers, inside the products you buy.",
    soWhat:
      "For most IT organisations it is the largest of the three scopes and the hardest to get data for. Moving a workload to the cloud moves it from Scope 2 into Scope 3: a reporting change, not a reduction.",
  },
  {
    id: "tco",
    term: "TCO",
    match: "total cost of ownership",
    also: ["TCO"],
    plain:
      "Total Cost of Ownership — the purchase price plus energy, support, repairs and disposal, across the whole service life.",
    soWhat:
      "The cheapest device to buy is often not the cheapest to own. German Blue Angel criteria require TCO to be calculated at purchase for exactly this reason.",
  },
  {
    id: "e-waste",
    term: "E-waste",
    match: "e-waste",
    plain:
      "Discarded electrical and electronic equipment — anything with a plug or a battery that has been thrown away.",
    soWhat:
      "About 62 million tonnes a year globally, of which roughly a fifth is formally collected and recycled. The rest is unaccounted for.",
  },
  {
    id: "sci",
    term: "SCI",
    match: "SCI standard",
    also: ["SCI"],
    plain:
      "Software Carbon Intensity — an international standard (ISO/IEC 21031) that scores emissions per unit of useful work: per transaction, per request.",
    soWhat:
      "It deliberately ignores offsets. The score can only improve if the software, or where it runs, actually changes — which is why engineers trust it.",
  },
  {
    id: "refresh-cycle",
    term: "Refresh cycle",
    match: "refresh cycle",
    also: ["refresh cycles", "refresh"],
    plain:
      "How often a company replaces a class of device — laptops every three years, scanners every year, and so on.",
    soWhat:
      "It is usually inherited from a supplier contract rather than chosen from the condition of the hardware. The contract renewal date is your intervention point.",
  },
  {
    id: "shopfloor",
    term: "Shop floor",
    match: "shopfloor",
    also: ["shop floor"],
    plain:
      "The production or warehouse area of a company, where the physical work happens — as opposed to the offices.",
  },
  {
    id: "utilisation",
    term: "Utilisation",
    match: "utilisation",
    plain:
      "How much of the capacity you are paying for is actually doing work. A server at 10% utilisation still draws a large share of its full power.",
    soWhat:
      "Consolidating lightly used servers usually beats making each of them more efficient.",
  },
  {
    id: "esg",
    term: "ESG",
    match: "ESG",
    plain:
      "Environmental, Social, Governance — the reporting framework investors and regulators use. Regulated, numeric and audited.",
    soWhat:
      "It is where your IT figures have to survive an auditor. Green IT produces the data; ESG consumes it.",
  },
  {
    id: "service-life",
    term: "Service life",
    match: "service life",
    plain:
      "How long a device is kept in active use, from first login to retirement.",
    soWhat:
      "Because most of a device's footprint is spent making it, every extra year of service life spreads that fixed cost further. It is the largest resource lever an IT department controls on its own.",
  },
  {
    id: "life-cycle",
    term: "Life cycle",
    match: "life cycle",
    also: ["life-cycle", "lifecycle"],
    plain:
      "The whole span of a device: raw materials, manufacturing, transport, use, and disposal — not just the time it spends switched on.",
    soWhat:
      "A usage-phase view misses most of the impact, which is already spent before the device arrives. Buying and disposal decisions are life-cycle decisions.",
  },
  {
    id: "repairability",
    term: "Repairability",
    match: "repairability",
    also: ["repairable"],
    plain:
      "How easily a device can be opened, diagnosed and fixed — replaceable batteries, standard parts, available spares.",
    soWhat:
      "A device that cannot be repaired can only be replaced. Repairability at the point of purchase is what makes a longer service life possible later.",
  },
  {
    id: "reuse",
    term: "Reuse",
    match: "reuse",
    also: ["re-deployment", "redeploy", "refurbishment", "refurbish"],
    plain:
      "Keeping a device in service — with the same or a different user — instead of discarding it. Includes refurbishment and internal re-deployment.",
    soWhat:
      "Reuse keeps the embedded carbon working instead of throwing it away. It is almost always lower impact than buying new, even a more efficient new.",
  },
];

export const GLOSSARY_BY_ID: Record<string, GlossaryEntry> = Object.fromEntries(
  GLOSSARY.map((entry) => [entry.id, entry]),
);
