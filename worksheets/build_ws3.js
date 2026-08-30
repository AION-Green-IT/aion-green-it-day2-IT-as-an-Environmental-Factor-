// build_ws3.js — Worksheet 3 · Task 3 (case study) · NetCore · L2
// "Energy and resources at NetCore: from findings to a first step"

const path = require("path");
const H = require("./ws_helpers");
const { NETCORE } = require("./ws_content");

const {
  VERCEL_ROOT, AlignmentType,
  h1, h2, p, pMixed, spacer, howToList, headerInfoTable, referenceBox,
  findItBox, locationNote, markerLine, refItem, refBullet,
  dataTable, cell, fill, row, buildDoc, writeDoc,
} = H;

const RH = 620;

async function build() {
  const children = [];

  children.push(h1("Worksheet 3 — Energy and resources at NetCore: from findings to a first step"));
  children.push(pMixed([{ text: "Task 3 · Level 2 · Case: NetCore Manufacturing Services GmbH", color: H.ASH, italics: true, size: 20 }]));

  children.push(spacer(80));
  children.push(
    headerInfoTable([
      ["Module", "Module 2 (Day 2) — IT as an Environmental Factor: Energy, Raw Materials, Waste"],
      ["Level", "L2 · Application — case-based, with a sample solution"],
      ["Playground page", `${VERCEL_ROOT}/case/nordcom/`, true],
      ["Full playground", `${VERCEL_ROOT}/`, true],
      ["Estimated time", "~ 90 minutes (roughly two units)"],
      ["How it is marked", "Rubric-graded on a 4-point scale (Executive-ready / Solid / Partial / Missing)."],
      ["Self-contained", "Yes. The company brief, eight findings and four action areas are printed below."],
      ["Name / Group", " "],
      ["Date", " "],
    ]),
  );

  children.push(h2("How to use this sheet"));
  children.push(
    ...howToList([
      "Read the Reference Material box below. It carries the company brief, all eight findings (F1–F8) and the four action areas (AA1–AA4) — you can complete this worksheet from paper alone.",
      "Optional: open the NetCore page (link in the header). Click each finding on the board; the “first move” widget lets you commit an action area and read the answer key.",
      "Follow the section order: A → B → C → D → E.",
      "This is an L2 case task. The examiner is looking for analysis fit for management and a first step defended with evidence (F#), not aesthetics.",
    ]),
  );

  children.push(h2("Reference material — everything you need to complete this worksheet"));
  const ref = [];
  ref.push(p(NETCORE.brief, { size: 20 }));
  ref.push(refBullet("The eight findings (F# · label — fact  [area]):", { bold: true }));
  for (const f of NETCORE.findings) ref.push(refItem(`${f.ref} · ${f.label}`, f.fact, `[${f.area}]`));
  ref.push(refBullet("The four action areas (AA# · name — description):", { bold: true }));
  for (const a of NETCORE.actionAreas) ref.push(refItem(`${a.ref} · ${a.name}`, a.full));
  children.push(referenceBox("NetCore Manufacturing Services GmbH — the eight findings and the four action areas.", ref));

  children.push(h2("Playground map — where each section takes you (if you use the app)"));
  children.push(p("One overview so you never hunt.", { color: H.ASH, size: 20 }));
  children.push(
    dataTable(
      ["Section", "Where to look in the app", "What you do there"],
      [
        row([cell({ text: "A", bold: true }), cell({ text: "NetCore board — click the eight findings." }), cell({ text: "Sort the findings across the six perspectives." })]),
        row([cell({ text: "B", bold: true }), cell({ text: "/case/nordcom → the “first move” widget lists the four levers (optional)." }), cell({ text: "Clue: group the eight findings into four levers; cite the F# that drives each." })]),
        row([cell({ text: "C", bold: true }), cell({ text: "/case/nordcom → the answer-key horizon bar (Short → Medium → Structural), optional." }), cell({ text: "Clue: startable now = short; needs a decision/budget/supplier = medium; changes how decisions are made = structural." })]),
        row([cell({ text: "D", bold: true }), cell({ text: "NetCore page → the “first move” widget." }), cell({ text: "Commit a first measure and defend it." })]),
        row([cell({ text: "E", bold: true }), cell({ text: "/learn → L3 “Governance mini org-chart” shows who owns what (optional)." }), cell({ text: "Clue: a name without a reporting line and a rhythm is not an anchor." })]),
      ],
      [1200, 4080, 4080],
    ),
  );

  // A — six perspectives
  children.push(h2("Section A · Analyse from the six perspectives"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(findItBox(`${VERCEL_ROOT}/case/nordcom/ — click each of the eight findings on the board.`, "For each perspective, note which findings sit there (a finding may appear more than once) and the field of action NetCore would work on. If offline, use the Reference Material box."));
  children.push(spacer(80));
  children.push(p("Working definitions — Energy consumption: what draws power. Resource consumption: what is made or thrown away. Service life: how long a device is kept. Operating model: how the estate is run. Procurement: what is bought and on what basis. Management: who steers, and on what data.", { italics: true, color: H.ASH, size: 20 }));
  children.push(spacer(60));
  const aW = [2200, 1600, 5560];
  const aRows = NETCORE.perspectives.map((pv) =>
    row([cell({ text: pv.name, bold: true }), fill(aW[1]), fill(aW[2])], RH),
  );
  aRows.push(row([
    cell({ text: "CHECK", bold: true, color: H.PURPLE, shading: H.SOFT }),
    cell({ text: "F1–F8 all used?", italics: true, color: H.ASH, shading: H.SOFT }),
    cell({ text: "Every finding from F1 to F8 must appear in at least one perspective.", italics: true, color: H.ASH, shading: H.SOFT }),
  ]));
  children.push(dataTable(["Perspective", "Which findings (write F#)", "Field of action — what NetCore would work on (one sentence)"], aRows, aW));

  // B — four priority levers
  children.push(h2("Section B · Four priority action areas"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. Copy the action-area name from the reference, and cite at least one finding (F#) that drives it.", `${VERCEL_ROOT}/case/nordcom/ — the four levers in the “first move” widget`));
  children.push(spacer(100));
  const bW = [500, 2600, 6260];
  const bRows = [1, 2, 3, 4].map((n) =>
    row([cell({ text: String(n), bold: true, align: AlignmentType.CENTER }), fill(bW[1]), fill(bW[2])], RH),
  );
  bRows.push(row([
    cell({ text: "CHECK", bold: true, color: H.PURPLE, shading: H.SOFT }),
    cell({ text: "four different areas", italics: true, color: H.ASH, shading: H.SOFT }),
    cell({ text: "You should end up with FOUR different action areas — if two rows repeat, fix it.", italics: true, color: H.ASH, shading: H.SOFT }),
  ]));
  children.push(dataTable(["#", "Action area (copy the name)", "Why it is a priority for NetCore — cite at least one F#"], bRows, bW));

  // C — short/medium/structural
  children.push(h2("Section C · Short-term, medium-term and structural steps"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. Short-term = startable now. Medium-term = needs a decision, a budget or a supplier. Structural = changes how decisions are made.", `${VERCEL_ROOT}/case/nordcom/ — the answer-key Short → Medium → Structural bar`));
  children.push(spacer(100));
  const cW = [2160, 2400, 2400, 2400];
  const cRows = [1, 2, 3, 4].map(() =>
    row([fill(cW[0]), fill(cW[1]), fill(cW[2]), fill(cW[3])], RH),
  );
  children.push(dataTable(["Action area (from Section B)", "Short-term step", "Medium-term step", "Structural step"], cRows, cW));

  // D — first measure
  children.push(h2("Section D · Which measure is carried out first?"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(findItBox(`${VERCEL_ROOT}/case/nordcom/ — the “Which measure is implemented first?” widget below the board.`, "Commit one action area, read what it buys and costs, then justify across impact, risk and feasibility. If offline, decide from the reference."));
  children.push(spacer(100));
  const dW = [3600, 5760];
  const dRows = [
    ["D1", "Which action area do you start first?  Circle:   AA1   /   AA2   /   AA3   /   AA4"],
    ["D2", "Impact — why this first? (one sentence, cite ≥1 F#)"],
    ["D3", "Risk — what it costs or exposes (one sentence)"],
    ["D4", "Feasibility — why it is startable now (one sentence)"],
  ].map((q) => row([cell({ text: `${q[0]} · ${q[1]}`, size: 20 }), fill(dW[1])], RH));
  children.push(dataTable(["Question", "Your answer"], dRows, dW));

  // E — governance anchoring
  children.push(h2("Section E · Anchoring responsibility and review"));
  children.push(markerLine("JUDGED"));
  children.push(spacer(80));
  children.push(locationNote("Answered from this sheet. A name without a reporting line is not an anchor.", `${VERCEL_ROOT}/learn/ — the L3 “Governance mini org-chart”`));
  children.push(spacer(100));
  const eW = [3000, 2400, 3960];
  const eRows = [
    "Sustainable-IT owner (a single named role)",
    "Reports to",
    "Reporting rhythm",
    "Who is consulted before decisions",
    "Escalation trigger",
  ].map((el) => row([cell({ text: el, bold: true }), fill(eW[1]), fill(eW[2])], RH));
  children.push(dataTable(["Element", "Your choice", "One-line reason"], eRows, eW));

  // rubric (L2, 5 cols)
  children.push(h2("How this is marked"));
  children.push(p("L2 sections score on a 4-point scale. Total possible = 20.", { color: H.ASH, size: 20 }));
  const rW = [1760, 1900, 1900, 1900, 1900];
  const rubric = [
    ["A · Six perspectives", "All F1–F8 placed; every field of action is a lever, not a symptom.", "Most placed; fields mostly levers.", "Some placed.", "Missing or symptom-list."],
    ["B · Four priorities", "Four distinct areas, each driven by a cited F#.", "Four areas, thin evidence.", "Fewer than four or repeats.", "Missing."],
    ["C · Short/med/structural", "Each lever split cleanly across the three horizons.", "Mostly split.", "Partial.", "Missing."],
    ["D · First measure", "A decision defended across impact, risk AND feasibility with F# evidence.", "Defended on two of three.", "A pick with weak reasons.", "No decision."],
    ["E · Anchoring", "Named owner, reporting line, rhythm, consultation and escalation.", "Most elements present.", "Some elements.", "Missing."],
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
      { text: "The model solution's core idea: the greatest leverage is not a premature investment, but first building the ability to steer — transparency and consolidation, with simple operating rules. ", italics: true, color: H.INK, size: 22 },
      { text: "Whether you follow that or defend a different first step, defend it with evidence, not aesthetics.", color: H.INK, size: 22 },
    ]),
  );

  const doc = buildDoc("Worksheet 3 — NetCore — Task 3 — L2", "AION Green IT Module 2 learner worksheet", children);
  const out = path.join(__dirname, "dist", "Worksheet3_NetCore_L2.docx");
  await writeDoc(doc, out);
  console.log("wrote", out);
  return out;
}

module.exports = build;
if (require.main === module) build();
