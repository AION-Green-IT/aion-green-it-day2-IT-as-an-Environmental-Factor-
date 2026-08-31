// build_ws2.js — Worksheet 2 · Task 2 · DataForm · L1–L2
// "Which measure should DataForm start first?"

const path = require("path");
const H = require("./ws_helpers");
const { DATAFORM, TASK2 } = require("./ws_content");

const {
  VERCEL_ROOT, BOX, AlignmentType,
  h1, h2, p, pMixed, spacer, howToList, headerInfoTable, referenceBox,
  findItBox, locationNote, markerLine, refItem, refBullet,
  dataTable, cell, fill, tick, row, buildDoc, writeDoc,
} = H;

const RH = 560;

async function build() {
  const children = [];

  children.push(h1("Worksheet 2 — Which measure should DataForm start first?"));
  children.push(pMixed([{ text: "Task 2 · Level 1–2 · Case: DataForm Systems", color: H.ASH, italics: true, size: 20 }]));

  children.push(spacer(80));
  children.push(
    headerInfoTable([
      ["Module", "Module 2 (Day 2) — IT as an Environmental Factor: Energy, Raw Materials, Waste"],
      ["Level", "L1–L2 · prioritisation and decision under uncertainty"],
      ["Playground page", `${VERCEL_ROOT}/case/mediprint/`, true],
      ["Full playground", `${VERCEL_ROOT}/`, true],
      ["Estimated time", "~ 45 minutes"],
      ["How it is marked", "Sections A, B, C and the E self-check = OBJECTIVE. Sections D, the E picks and F = JUDGED (rubric)."],
      ["Self-contained", "Yes. The three measures, five conditions and six criteria are printed below."],
      ["Name / Group", " "],
      ["Date", " "],
    ]),
  );

  children.push(h2("How to use this sheet"));
  children.push(
    ...howToList([
      "Read the Reference Material box below. It carries the three measures, the five conditions and the six assessment criteria — you can complete this worksheet from paper alone.",
      "Optional: open the DataForm page (link in the header) and scroll to Task 2. Assess each measure, then commit to a priority to reveal the comparison.",
      "Follow the section order: A → B → C → D → E → F.",
      "This is a prioritisation task. The examiner is looking for a priority you can defend under incomplete data, and the trade-offs it makes visible — not the measure that sounds greenest.",
    ]),
  );

  children.push(h2("Reference material — everything you need to complete this worksheet"));
  const ref = [];
  ref.push(p("In the short term, DataForm can implement only ONE of three measures.", { size: 20 }));
  ref.push(refBullet("The three measures:", { bold: true }));
  for (const m of TASK2.measures) ref.push(refItem(`Measure ${m.ref} — ${m.title}`, m.full));
  ref.push(refBullet("The five general conditions:", { bold: true }));
  for (const c of TASK2.conditions) ref.push(refItem(c.ref, c.text));
  ref.push(refBullet(`The six assessment criteria:  ${TASK2.criteria.join("  ·  ")}`, { bold: true }));
  children.push(referenceBox("DataForm — the three measures and five conditions, as shown in the app.", ref));

  children.push(h2("Playground map — where each section takes you (if you use the app)"));
  children.push(p("One overview so you never hunt.", { color: H.ASH, size: 20 }));
  children.push(
    dataTable(
      ["Section", "Where to look in the app", "What you do there"],
      [
        row([cell({ text: "A", bold: true }), cell({ text: "DataForm page → Task 2, the three measure panels." }), cell({ text: "Read and copy each measure's full description." })]),
        row([cell({ text: "B", bold: true }), cell({ text: "DataForm page → Task 2, the general-conditions pills." }), cell({ text: "Copy the five conditions verbatim." })]),
        row([cell({ text: "C", bold: true }), cell({ text: "/case/mediprint → Task 2 — the conditions and the three measures (optional)." }), cell({ text: "Clue: budget hits the big-capital measure; a short-term demand hits the slowest; an availability/risk worry hits the one that changes how systems run." })]),
        row([cell({ text: "D", bold: true }), cell({ text: "/case/mediprint → Task 2 — the per-measure assessment (optional)." }), cell({ text: "Clue: rate each measure H/M/L on the six criteria; the pattern of greens/reds is the decision." })]),
        row([cell({ text: "E", bold: true }), cell({ text: "/case/mediprint → Task 2 — “Prioritise this measure” (optional)." }), cell({ text: "Clue: pick the one that makes the other two decidable next, not the greenest-sounding." })]),
        row([cell({ text: "F", bold: true }), cell({ text: "/case/mediprint → Task 2 — the revealed guidance & trade-offs (optional)." }), cell({ text: "Clue: cite a condition and a score; name what data you lack and the trade-offs you accept." })]),
      ],
      [1200, 4080, 4080],
    ),
  );

  // A — copy measures
  children.push(h2("Section A · The three measures (copy verbatim)"));
  children.push(markerLine("OBJECTIVE"));
  children.push(spacer(80));
  children.push(findItBox(`${VERCEL_ROOT}/case/mediprint/ — scroll to Task 2. The three measure panels A, B, C.`, "Read each panel and copy its full description verbatim. If offline, copy from the Reference Material box above."));
  children.push(spacer(100));
  const aW = [1000, 2600, 5760];
  const aRows = TASK2.measures.map((m) =>
    row([cell({ text: m.ref, bold: true, align: AlignmentType.CENTER }), cell({ text: m.title }), fill(aW[2])], RH),
  );
  children.push(dataTable(["Measure", "Short title", "Full description (copy verbatim)"], aRows, aW));

  // B — copy conditions
  children.push(h2("Section B · The five general conditions (copy verbatim)"));
  children.push(markerLine("OBJECTIVE"));
  children.push(spacer(80));
  children.push(findItBox(`${VERCEL_ROOT}/case/mediprint/ — Task 2, the "General conditions" pills.`, "Copy each condition verbatim into the table. If offline, use the Reference Material box."));
  children.push(spacer(100));
  const bW = [900, 8460];
  const bRows = TASK2.conditions.map((c) => row([cell({ text: c.ref, bold: true, align: AlignmentType.CENTER }), fill(bW[1])], 480));
  children.push(dataTable(["Condition #", "Wording (copy verbatim)"], bRows, bW));

  // C — constraint matrix
  children.push(h2("Section C · Constraint matrix — which condition obstructs which measure?"));
  children.push(markerLine("OBJECTIVE"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. Tick each measure a condition makes harder. A condition may obstruct more than one, or none. Clue: match the condition to the measure it lands on hardest.", `${VERCEL_ROOT}/case/mediprint/ — Task 2 (the conditions and the three measures)`));
  children.push(spacer(100));
  const cW = [700, 3260, 1100, 1100, 1100, 2100];
  const cRows = TASK2.conditions.map((c) =>
    row([
      cell({ text: c.ref, bold: true, align: AlignmentType.CENTER }),
      cell({ text: c.text, size: 18 }),
      tick(cW[2]), tick(cW[3]), tick(cW[4]),
      fill(cW[5], { align: AlignmentType.CENTER }),
    ], RH),
  );
  cRows.push(
    row([
      cell({ text: "TOTAL", bold: true, color: H.PURPLE, shading: H.SOFT }),
      cell({ text: "ticks per measure column →", italics: true, color: H.ASH, shading: H.SOFT }),
      fill(cW[2], { shading: H.SOFT, align: AlignmentType.CENTER }),
      fill(cW[3], { shading: H.SOFT, align: AlignmentType.CENTER }),
      fill(cW[4], { shading: H.SOFT, align: AlignmentType.CENTER }),
      cell({ text: "", shading: H.SOFT }),
    ]),
  );
  children.push(dataTable(["C#", "Condition", `A? (${BOX})`, `B? (${BOX})`, `C? (${BOX})`, "# ticked in this row"], cRows, cW));
  children.push(spacer(60));
  children.push(p("Hint — a limited budget hits a big capital outlay (a whole new fleet) harder than a rules-and-consolidation exercise. A short-term-results demand penalises the slowest measure to show. An availability or operating-risk concern lands on the measure that touches how systems run.", { italics: true, color: H.ASH, size: 20 }));

  // D — score
  children.push(h2("Section D · Score each measure on the six criteria"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. Write H / M / L (or a short note) in each cell. Time required: weeks or months.", `${VERCEL_ROOT}/case/mediprint/ — Task 2 (the per-measure assessment, revealed after you choose)`));
  children.push(spacer(100));
  const dW = [1200, 1360, 1360, 1360, 1360, 1360, 1360];
  const dHead = ["Measure", ...TASK2.criteria.map((c) => ({ text: c, size: 16 }))];
  const dRows = TASK2.measures.map((m) =>
    row([cell({ text: `${m.ref} · ${m.title}`, bold: true, size: 16 }), fill(dW[1]), fill(dW[2]), fill(dW[3]), fill(dW[4]), fill(dW[5]), fill(dW[6])], RH),
  );
  children.push(dataTable(dHead, dRows, dW));

  // E — priority decision
  children.push(h2("Section E · Priority decision"));
  children.push(markerLine("OBJECTIVE"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. Circle one letter per row; the three circles across the three rows must be A, B and C — no repeats.", `${VERCEL_ROOT}/case/mediprint/ — Task 2 (“Prioritise this measure”)`));
  children.push(spacer(100));
  const eW = [3000, 6360];
  const eRows = [
    row([cell({ text: "First priority (start now)", bold: true }), cell({ text: "Circle:      A        /        B        /        C" })], 520),
    row([cell({ text: "Second priority", bold: true }), cell({ text: "Circle:      A        /        B        /        C" })], 520),
    row([cell({ text: "Third priority", bold: true }), cell({ text: "Circle:      A        /        B        /        C" })], 520),
    row([cell({ text: "SELF-CHECK", bold: true, color: H.PURPLE, shading: H.SOFT }), cell({ text: "The three circles above must be A, B and C — one each, no repeats.", italics: true, color: H.ASH, shading: H.SOFT })]),
  ];
  children.push(dataTable(["Decision element", "Your answer"], eRows, eW));

  // F — justification
  children.push(h2("Section F · Justification, missing information, trade-offs"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. Cite condition numbers (C1..C5) and your Section D scores.", `${VERCEL_ROOT}/case/mediprint/ — Task 2 (the revealed guidance, trade-offs and “information that would sharpen the decision”)`));
  children.push(spacer(100));
  const fW = [3600, 5760];
  const fRows = [
    ["F1", "Justify your first priority in one sentence, citing at least one condition number."],
    ["F2", "Justify it in one more sentence, citing at least one of your Section D scores."],
    ["F3", "Name at least THREE pieces of information that would help an even better decision."],
    ["F4", "How would you decide responsibly despite the incomplete data? (one sentence)"],
    ["F5", "Name the trade-offs that become visible in your decision."],
  ].map((q) => row([cell({ text: `${q[0]} · ${q[1]}`, size: 20 }), fill(fW[1])], RH + 80));
  children.push(dataTable(["Question", "Your answer"], fRows, fW));

  // rubric
  children.push(h2("How this is marked"));
  children.push(p("L1 sections score 2 points each (Full = 2 / Partial = 1 / None = 0). Total possible = 10.", { color: H.ASH, size: 20 }));
  const rW = [2160, 2400, 2400, 2400];
  const rubric = [
    ["A + B · Copy", "All three measures and five conditions copied verbatim.", "Some copied or reworded.", "Missing."],
    ["C · Constraint matrix", "Every obstruction tick is defensible and totals are filled.", "Most ticks defensible.", "Ticks missing or arbitrary."],
    ["D · Six-criteria scoring", "All three measures scored on all six criteria with a rating.", "Partly scored.", "Missing."],
    ["E · Priority", "Three distinct priorities; self-check satisfied.", "Priorities set but self-check off.", "No decision."],
    ["F · Justification", "Cites a condition AND a score, names ≥3 missing facts and the trade-offs.", "Cites some evidence; partial.", "Assertion without evidence."],
  ].map((r) =>
    row([
      cell({ text: r[0], bold: true }),
      cell({ text: r[1], size: 18, shading: "EAF4EE" }),
      cell({ text: r[2], size: 18, shading: "FBEFE1" }),
      cell({ text: r[3], size: 18, shading: "F6E4E4" }),
    ]),
  );
  children.push(dataTable(["Section", "Full (2)", "Partial (1)", "None (0)"], rubric, rW));

  children.push(h2("One-line closing"));
  children.push(
    pMixed([
      { text: "A priority is a claim about time, not about quality. ", italics: true, color: H.INK, size: 22 },
      { text: "The trap in this task is to pick the measure that sounds greenest instead of the one that makes the other two decidable next.", color: H.INK, size: 22 },
    ]),
  );

  const doc = buildDoc("Worksheet 2 — DataForm — Task 2 — L1", "AION Green IT Module 2 learner worksheet", children);
  const out = path.join(__dirname, "dist", "Worksheet2_DataForm_L2.docx");
  await writeDoc(doc, out);
  console.log("wrote", out);
  return out;
}

module.exports = build;
if (require.main === module) build();
