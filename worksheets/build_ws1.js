// build_ws1.js — Worksheet 1 · Task 1 · DataForm · L1
// "Making energy and resource use visible at DataForm"

const path = require("path");
const H = require("./ws_helpers");
const { DATAFORM, AREAS } = require("./ws_content");

const {
  VERCEL_ROOT, TOTAL_W, BOX, AlignmentType,
  h1, h2, p, pMixed, spacer, howToList, headerInfoTable, referenceBox,
  findItBox, locationNote, markerLine, refItem, refBullet,
  headerRow, dataTable, cell, fill, tick, row, buildDoc, writeDoc,
} = H;

const AREAS_LINE = AREAS.map((a) => `${a.name} (${a.code})`).join("  ·  ");
const RH = 540; // fill-row min height for writing room

async function build() {
  const children = [];

  // 1-2. title + meta
  children.push(h1("Worksheet 1 — Making energy and resource use visible at DataForm"));
  children.push(
    pMixed([{ text: "Task 1 · Level 1 · Case: DataForm Systems", color: H.ASH, italics: true, size: 20 }]),
  );

  // 3. header info
  children.push(spacer(80));
  children.push(
    headerInfoTable([
      ["Module", "Module 2 (Day 2) — IT as an Environmental Factor: Energy, Raw Materials, Waste"],
      ["Level", "L1 · Knowledge — observation, structuring, common sense"],
      ["Playground page", `${VERCEL_ROOT}/case/mediprint/`, true],
      ["Full playground", `${VERCEL_ROOT}/`, true],
      ["Estimated time", "~ 30 minutes (after the 60-minute knowledge input)"],
      ["How it is marked", "Sections A and B and the tick columns in D = OBJECTIVE (right/wrong). Section C and the reasons in D = JUDGED (rubric)."],
      ["Self-contained", "Yes. Everything you need is printed in the Reference Material box below."],
      ["Name / Group", " "],
      ["Date", " "],
    ]),
  );

  // 4. how to use
  children.push(h2("How to use this sheet"));
  children.push(
    ...howToList([
      "Read the Reference Material box below. It carries the company brief, all eight observations and the five areas — so you can complete this worksheet from paper alone.",
      "Optional: open the DataForm page (link in the header). Click each marker on the illustration to see the same passages, or use the IMG / SVG toggle and the “Show all facts as list” fallback.",
      "Follow the section order: A → B → C → D.",
      "This is an L1 observation task. The examiner is looking for the invisible energy and resource impacts made visible, sorted into the five areas, with a first improvement per area.",
    ]),
  );

  // 5. reference material
  children.push(h2("Reference material — everything you need to complete this worksheet"));
  const refParas = [];
  refParas.push(p(DATAFORM.brief, { size: 20 }));
  refParas.push(refBullet("The eight observations (label — passage  [area · lens]):", { bold: true }));
  for (const hs of DATAFORM.hotspots) {
    refParas.push(refItem(hs.label, hs.fact, `[${hs.area} · ${hs.lens}]`));
  }
  refParas.push(refBullet(`The five areas:  ${AREAS_LINE}`, { bold: true }));
  refParas.push(refBullet("The two context conditions:", { bold: true }));
  for (const c of DATAFORM.contexts) refParas.push(refBullet(c));
  children.push(referenceBox("DataForm Systems — the eight observations and the five areas, as shown in the app.", refParas));

  // 6. playground map
  children.push(h2("Playground map — where each section takes you (if you use the app)"));
  children.push(p("One overview so you never hunt. Every section below tells you again in its own callout.", { color: H.ASH, size: 20 }));
  const mapW = [1200, 4080, 4080];
  children.push(
    dataTable(
      ["Section", "Where to look in the app", "What you do there"],
      [
        row([cell({ text: "A", bold: true }), cell({ text: "/case/mediprint — the DataForm illustration; click each of the eight markers." }), cell({ text: "Read and copy the passage on each marker; decide energy and/or resource." })]),
        row([cell({ text: "B", bold: true }), cell({ text: "/case/mediprint — the five area bands (or /learn → “Area sorter”). Optional — the reference has all you need." }), cell({ text: "Clue: assign by the lever you would pull. Running/idling → Operations; buying → Procurement; a habit/default → Use; swap timing → Replacement; sitting unused → Storage." })]),
        row([cell({ text: "C", bold: true }), cell({ text: "/case/mediprint — the five area bands (optional)." }), cell({ text: "Clue: write the change (a rule, a schedule, a reuse route), not a measurement." })]),
        row([cell({ text: "D", bold: true }), cell({ text: "/case/mediprint — Task 1, step 5 asks the same thing (optional)." }), cell({ text: "Clue: can one team fix it next month → technical; needs a rule/budget/decision → structural." })]),
      ],
      mapW,
    ),
  );

  // 7A. Section A — observation log
  children.push(h2("Section A · Observation log — where energy and resources arise"));
  children.push(markerLine("OBJECTIVE"));
  children.push(spacer(80));
  children.push(
    findItBox(
      `${VERCEL_ROOT}/case/mediprint/ — the DataForm building illustration. Click each numbered marker.`,
      "Click a marker to read its passage, then copy it verbatim. Tick whether the passage shows energy use, resource use, or both. If offline, copy from the Reference Material box above.",
    ),
  );
  children.push(spacer(100));
  const aW = [500, 2000, 4360, 1250, 1250];
  const aRows = DATAFORM.hotspots.map((hs, i) =>
    row([
      cell({ text: String(i + 1), bold: true, align: AlignmentType.CENTER }),
      cell({ text: hs.label }),
      fill(aW[2]),
      tick(aW[3]),
      tick(aW[4]),
    ], RH),
  );
  children.push(dataTable(["#", "Observation (on-screen label)", "Passage (copy verbatim)", `Energy? (${BOX})`, `Resource? (${BOX})`], aRows, aW));

  // 7B. Section B — assign to areas + tally
  children.push(h2("Section B · Assign to the five areas, and tally"));
  children.push(markerLine("OBJECTIVE"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. Use the labels (H1..H8) from Section A. Each observation sits in exactly one area. Clue — decide by the lever you would pull, not the object.", `${VERCEL_ROOT}/case/mediprint/ (the area bands) · ${VERCEL_ROOT}/learn/ (the “Area sorter” teaches the five areas)`));
  children.push(spacer(100));
  const bW = [2200, 900, 1500, 4760];
  const bRows = AREAS.map((a) =>
    row([
      cell({ text: a.name, bold: true }),
      cell({ text: a.code, align: AlignmentType.CENTER }),
      fill(bW[2], { align: AlignmentType.CENTER }),
      fill(bW[3]),
    ], RH),
  );
  bRows.push(
    row([
      cell({ text: "SELF-CHECK", bold: true, color: H.PURPLE, shading: H.SOFT }),
      cell({ text: "", shading: H.SOFT }),
      cell({ text: "= 8", bold: true, align: AlignmentType.CENTER, shading: H.SOFT }),
      cell({ text: "The counts must sum to 8 — each of the eight observations is assigned to exactly one area.", italics: true, color: H.ASH, shading: H.SOFT }),
    ]),
  );
  children.push(dataTable(["Area", "Code", "How many", "Which observations (write the labels)"], bRows, bW));

  // 7C. Section C — one improvement per area
  children.push(h2("Section C · One first improvement per area"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. One approach per area is enough — say what you would change, not what you would measure.", `${VERCEL_ROOT}/case/mediprint/ — the five area bands`));
  children.push(spacer(100));
  const cW = [2400, 6960];
  const cRows = AREAS.map((a) =>
    row([cell({ text: a.name, bold: true }), fill(cW[1])], RH + 60),
  );
  children.push(dataTable(["Area", "One initial improvement approach (one sentence)"], cRows, cW));

  // 7D. Section D — individual/technical vs structural/management
  children.push(h2("Section D · Individual / technical vs structural / management"));
  children.push(markerLine("OBJECTIVE"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet — the same eight observations as Section A, pre-filled below.", `${VERCEL_ROOT}/case/mediprint/ — Task 1, step 5`));
  children.push(spacer(80));
  children.push(
    p(
      "Working definition — Individual / technical: one team can change it next month with the current process. Structural / management: it needs a rule, a budget, or a decision from above.",
      { italics: true, color: H.ASH, size: 20 },
    ),
  );
  children.push(spacer(60));
  const dW = [500, 2000, 1500, 1500, 3860];
  const dRows = DATAFORM.hotspots.map((hs, i) =>
    row([
      cell({ text: String(i + 1), bold: true, align: AlignmentType.CENTER }),
      cell({ text: hs.label }),
      tick(dW[2]),
      tick(dW[3]),
      fill(dW[4]),
    ], RH),
  );
  dRows.push(
    row([
      cell({ text: "SELF-CHECK", bold: true, color: H.PURPLE, shading: H.SOFT }),
      cell({ text: "", shading: H.SOFT }),
      cell({ text: "= 8", bold: true, align: AlignmentType.CENTER, shading: H.SOFT }),
      cell({ text: "total", italics: true, color: H.ASH, align: AlignmentType.CENTER, shading: H.SOFT }),
      cell({ text: "Exactly one tick per row. The two tick columns together contain 8 ticks.", italics: true, color: H.ASH, shading: H.SOFT }),
    ]),
  );
  children.push(dataTable(["#", "Observation", `Individual / technical (${BOX})`, `Structural / management (${BOX})`, "Short reason (one sentence)"], dRows, dW));

  // 8. how this is marked (rubric)
  children.push(h2("How this is marked"));
  children.push(p("L1 sections score 2 points each (Full = 2 / Partial = 1 / None = 0). Total possible = 8.", { color: H.ASH, size: 20 }));
  const rW = [2160, 2400, 2400, 2400];
  const rubric = [
    ["A · Observation log", "All eight passages copied verbatim, and each energy/resource tick correct.", "Some passages copied or some ticks correct.", "Passages missing or reworded."],
    ["B · Areas + tally", "All eight assigned to the correct area and the tally sums to 8.", "Most assigned correctly.", "Assignment absent or does not sum to 8."],
    ["C · Improvement per area", "All five areas carry a concrete change (a lever), not a measurement.", "Some areas carry a concrete change.", "Vague or missing."],
    ["D · Technical vs structural", "One tick per row and each reason names why it is fixable now or needs a rule/decision.", "Most ticks defensible; some reasons thin.", "Ticks missing or reasons absent."],
  ].map((r) =>
    row([
      cell({ text: r[0], bold: true }),
      cell({ text: r[1], size: 18, shading: "EAF4EE" }),
      cell({ text: r[2], size: 18, shading: "FBEFE1" }),
      cell({ text: r[3], size: 18, shading: "F6E4E4" }),
    ]),
  );
  children.push(dataTable(["Section", "Full (2)", "Partial (1)", "None (0)"], rubric, rW));

  // 9. closing
  children.push(h2("One-line closing"));
  children.push(
    pMixed([
      { text: "This task trains making the invisible visible. ", italics: true, color: H.INK, size: 22 },
      { text: "If two participants disagree in Section A or B, one has misread the reference; if they disagree in Section C or the D reasons, both may be right — what is marked is how the reasoning is built.", color: H.INK, size: 22 },
    ]),
  );

  const doc = buildDoc(
    "Worksheet 1 — DataForm — Task 1 — L1",
    "AION Green IT Module 2 learner worksheet",
    children,
  );
  const out = path.join(__dirname, "dist", "Worksheet1_DataForm_L1.docx");
  await writeDoc(doc, out);
  console.log("wrote", out);
  return out;
}

module.exports = build;
if (require.main === module) build();
