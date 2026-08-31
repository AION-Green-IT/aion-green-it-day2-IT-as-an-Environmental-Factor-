// build_ws4.js — Worksheet 4 · Task 4 · Artemis · L3
// "Building a Green IT decision architecture for Artemis"

const path = require("path");
const H = require("./ws_helpers");
const { ARTEMIS } = require("./ws_content");

const {
  VERCEL_ROOT, DANGER, AlignmentType,
  h1, h2, p, pMixed, spacer, howToList, headerInfoTable, referenceBox,
  findItBox, locationNote, markerLine, refItem, refBullet,
  dataTable, cell, fill, row, buildDoc, writeDoc,
} = H;

const RH = 640;

async function build() {
  const children = [];

  children.push(h1("Worksheet 4 — Building a Green IT decision architecture for Artemis"));
  children.push(pMixed([{ text: "Task 4 · Level 3 · Case: Artemis Digital Industries", color: H.ASH, italics: true, size: 20 }]));

  children.push(spacer(80));
  children.push(
    headerInfoTable([
      ["Module", "Module 2 (Day 2) — IT as an Environmental Factor: Energy, Raw Materials, Waste"],
      ["Level", "L3 · Management decision — decision architecture and accountability"],
      ["Playground page", `${VERCEL_ROOT}/case/auron/`, true],
      ["Full playground", `${VERCEL_ROOT}/`, true],
      ["Estimated time", "~ 120 minutes (transfer project)"],
      ["How it is marked", "Rubric-graded on a 4-point scale. Judged on internal consistency, not on matching a fixed solution."],
      ["Self-contained", "Yes. The role, ten findings, seven measures and the capacity constraint are printed below."],
      ["Name / Group", " "],
      ["Date", " "],
    ]),
  );

  children.push(h2("How to use this sheet"));
  children.push(
    ...howToList([
      "Read the Reference Material box below. It carries your role, all ten findings (F1–F10), the seven measures (M1–M7) with their point costs, and the capacity constraint — you can complete this worksheet from paper alone.",
      "Optional: open the Artemis page (link in the header). Click the ten findings; the allocation widget lets you fund measures against a 10-point capacity.",
      "Follow the section order: A → B → C.",
      "This is an L3 management task. The examiner is looking for a decision architecture — a rule the next person could apply — not a technical opinion.",
    ]),
  );

  children.push(h2("Reference material — everything you need to complete this worksheet"));
  const ref = [];
  ref.push(p(ARTEMIS.role, { size: 20 }));
  ref.push(refBullet("The six general conditions (F1–F6):", { bold: true }));
  for (const f of ARTEMIS.conditions) ref.push(refItem(f.ref, f.text));
  ref.push(refBullet("The four state-of-IT findings (F7–F10):", { bold: true }));
  for (const f of ARTEMIS.stateFindings) ref.push(refItem(f.ref, f.text));
  ref.push(refBullet("The seven roadmap measures (M# · name (points) — description):", { bold: true }));
  for (const m of ARTEMIS.measures) ref.push(refItem(`${m.ref} · ${m.name} (${m.points} pt)`, m.full));
  ref.push(refBullet(ARTEMIS.constraint, { bold: true, color: DANGER }));
  children.push(referenceBox("Artemis Digital Industries — the ten findings and the seven measures in the 12-month roadmap.", ref));

  children.push(h2("Playground map — where each section takes you (if you use the app)"));
  children.push(p("One overview so you never hunt.", { color: H.ASH, size: 20 }));
  children.push(
    dataTable(
      ["Section", "Where to look in the app", "What you do there"],
      [
        row([cell({ text: "A", bold: true }), cell({ text: "Artemis board — click the ten findings." }), cell({ text: "Answer the seven decision-architecture elements." })]),
        row([cell({ text: "B", bold: true }), cell({ text: "Artemis page → the capacity-allocation widget." }), cell({ text: "Fund a first line of measures within 10 points." })]),
        row([cell({ text: "C", bold: true }), cell({ text: "/learn → L2 scenario & W6 “Decision under incomplete information” rehearse this (optional)." }), cell({ text: "Clue: name the decision, the missing fact, your rule for deciding anyway, and a revisit trigger." })]),
      ],
      [1200, 4080, 4080],
    ),
  );

  // A — 7-element decision architecture
  children.push(h2("Section A · The seven-element decision architecture"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(findItBox(`${VERCEL_ROOT}/case/auron/ — click each of the ten findings on the board.`, "Answer each element. Cite at least one finding (F#) and name the trade-off you own. If offline, use the Reference Material box."));
  children.push(spacer(100));
  const aW = [500, 2200, 3300, 3360];
  const aRows = ARTEMIS.elements.map((e) =>
    row([
      cell({ text: String(e.n), bold: true, align: AlignmentType.CENTER }),
      cell({ text: e.name, bold: true, size: 20 }),
      cell({ text: e.prompt, italics: true, color: H.ASH, size: 18 }),
      fill(aW[3]),
    ], RH),
  );
  children.push(dataTable(["#", "Element", "Prompt (what to answer)", "Your decision — cite ≥1 F# and name the trade-off"], aRows, aW));

  // B — allocation
  children.push(h2("Section B · The first prioritised line of measures (allocation)"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(findItBox(`${VERCEL_ROOT}/case/auron/ — the capacity-allocation widget.`, "Fund a first line of measures within the 10-point capacity. For each measure, write a start quarter (Q1–Q4) or “defer”, and a one-line reason. If offline, decide from the reference."));
  children.push(spacer(100));
  const bW = [500, 3000, 900, 2000, 2960];
  const bRows = ARTEMIS.measures.map((m) =>
    row([
      cell({ text: m.ref, bold: true, align: AlignmentType.CENTER }),
      cell({ text: m.name }),
      cell({ text: String(m.points), align: AlignmentType.CENTER }),
      fill(bW[3], { align: AlignmentType.CENTER }),
      fill(bW[4]),
    ], RH),
  );
  bRows.push(
    row([
      cell({ text: "TOTAL", bold: true, color: H.PURPLE, shading: H.SOFT }),
      cell({ text: "Total funded points (add the points of measures NOT marked “defer”):", italics: true, color: H.ASH, shading: H.SOFT }),
      fill(bW[2], { shading: H.SOFT, align: AlignmentType.CENTER }),
      cell({ text: "≤ 10", bold: true, color: DANGER, align: AlignmentType.CENTER, shading: H.SOFT }),
      cell({ text: "Constraint: this total must be 10 or less.", italics: true, color: DANGER, shading: H.SOFT }),
    ]),
  );
  children.push(dataTable(["#", "Measure", "Points", "Start quarter (Q1–Q4) or “defer”", "One-line reason"], bRows, bW));

  // C — the decision you own
  children.push(h2("Section C · The decision you consciously answer for"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. This is the senior-level requirement: one decision you own under incomplete information.", `${VERCEL_ROOT}/learn/ — the L2 scenario and W6 “Decision under incomplete information”`));
  children.push(spacer(100));
  const cW = [3600, 5760];
  const cRows = [
    ["C1", "Which single decision (from Section A, element 7) do you OWN now?"],
    ["C2", "Which information do you NOT have that would change it?"],
    ["C3", "Your rule for deciding anyway — start: “I will decide X on the basis of Y, and I will revisit if Z happens.”"],
    ["C4", "Who else in the room disagrees, and on what grounds?"],
    ["C5", "What is the cost of NOT deciding — of deferring six months?"],
  ].map((q) => row([cell({ text: `${q[0]} · ${q[1]}`, size: 20 }), fill(cW[1])], RH + 40));
  children.push(dataTable(["Question", "Your answer"], cRows, cW));

  // rubric (L3, 5 cols, 3 rows)
  children.push(h2("How this is marked"));
  children.push(p("L3 sections score on a 4-point scale. Executive-ready means both a decision AND a rule the next person could apply. Total possible = 12.", { color: H.ASH, size: 20 }));
  const rW = [1760, 1900, 1900, 1900, 1900];
  const rubric = [
    ["A · Decision architecture", "All seven elements answered; each cites an F# and names a trade-off; element 3 reads as a rule.", "Most elements answered with evidence.", "Some elements; thin evidence.", "Missing or opinion-only."],
    ["B · Allocation", "A funded line ≤ 10 points, with each deferral named and justified.", "A valid line; some reasons thin.", "Over budget or reasons missing.", "No allocation."],
    ["C · Owned decision", "Owns a decision, names the missing fact, states a revisit trigger and the cost of deferral.", "Most present.", "Partial.", "Missing."],
  ].map((r) =>
    row([
      cell({ text: r[0], bold: true, size: 18 }),
      cell({ text: r[1], size: 16, shading: "EAF4EE" }),
      cell({ text: r[2], size: 16, shading: "EDF2F6" }),
      cell({ text: r[3], size: 16, shading: "FBEFE1" }),
      cell({ text: r[4], size: 16, shading: "F6E4E4" }),
    ]),
  );
  children.push(dataTable(["Section", "4 · Executive-ready", "3 · Solid", "2 · Partial", "1 · Missing"], rubric, rW));

  children.push(h2("One-line closing"));
  children.push(
    pMixed([
      { text: "A management decision is not a technical opinion with authority attached. ", italics: true, color: H.INK, size: 22 },
      { text: "It is a rule under which the next decision can be taken by someone else. If your Section A does not read like a rule, rewrite it.", color: H.INK, size: 22 },
    ]),
  );

  const doc = buildDoc("Worksheet 4 — Artemis — Task 4 — L3", "AION Green IT Module 2 learner worksheet", children);
  const out = path.join(__dirname, "dist", "Worksheet4_Artemis_L3.docx");
  await writeDoc(doc, out);
  console.log("wrote", out);
  return out;
}

module.exports = build;
if (require.main === module) build();
