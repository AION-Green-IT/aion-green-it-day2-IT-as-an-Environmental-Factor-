// ws_helpers.js — shared helpers for the AION Green IT Module 2 worksheets.
// Implements the frozen API from the BuildSpec (section 4). Names are frozen.
// Design tokens are verbatim from BuildSpec section 3.

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  AlignmentType,
  VerticalAlign,
  HeightRule,
} = require("docx");
const fs = require("fs");

// ---------------------------------------------------------------- tokens
const NAVY = "231A45";
const PURPLE = "5624D0";
const LILAC = "EEE9F9";
const INK = "1B1230";
const ASH = "6B6484";
const LINE = "D9D3EA";
const OBJ = "E9F3EC";
const OBJ_FG = "1E5B37";
const JDG = "FBEFE1";
const JDG_FG = "7A3D0A";
const REF = "FFF6DF";
const REFBAR = "C08A00";
const DANGER = "B33A3A";
const SOFT = "F7F4FB";
const PAPER = "FFFFFF";

const FONT = "Calibri";
const TOTAL_W = 9360; // twips — total content width for full-width tables

// Live playground. Worksheets are self-contained, so this is a nice-to-have.
// If the deployment URL changes, update it here in exactly one place.
const VERCEL_ROOT = "https://aion-green-it-day2-it-as-an-environ.vercel.app";

// ---------------------------------------------------------------- helpers
const shade = (fill) => ({ type: ShadingType.CLEAR, color: "auto", fill });

function run(text, opts = {}) {
  return new TextRun({
    text,
    font: FONT,
    size: opts.size ?? 22,
    color: opts.color ?? INK,
    bold: opts.bold ?? false,
    italics: opts.italics ?? false,
  });
}

// ---- text primitives ----
function p(text, opts = {}) {
  return new Paragraph({
    children: [run(text, opts)],
    alignment: opts.align,
    spacing: { before: opts.before ?? 0, after: opts.after ?? 80 },
  });
}

function pMixed(runs, opts = {}) {
  return new Paragraph({
    children: runs.map((r) =>
      r instanceof TextRun || r instanceof ExternalHyperlink ? r : run(r.text, r),
    ),
    alignment: opts.align,
    spacing: { before: opts.before ?? 0, after: opts.after ?? 80 },
  });
}

function link(url, label, opts = {}) {
  return new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({
        text: label ?? url,
        font: FONT,
        size: opts.size ?? 22,
        color: PURPLE,
        bold: true,
        underline: {},
      }),
    ],
  });
}

function pWithLink(prefix, url, label, opts = {}) {
  const children = [];
  if (prefix) children.push(run(prefix, opts));
  children.push(link(url, label, opts));
  return new Paragraph({
    children,
    spacing: { before: opts.before ?? 0, after: opts.after ?? 80 },
  });
}

function heading(text, size, opts = {}) {
  return new Paragraph({
    children: [run(text, { size, bold: true, color: NAVY })],
    spacing: { before: opts.before ?? 0, after: opts.after ?? 0 },
  });
}
const h1 = (text) => heading(text, 40, { before: 0, after: 60 });
const h2 = (text, opts = {}) => heading(text, 30, { before: 240, after: 120, ...opts });
const h3 = (text, opts = {}) => heading(text, 26, { before: 180, after: 80, ...opts });

function spacer(sizeTwips = 120) {
  return new Paragraph({ children: [run("", {})], spacing: { before: 0, after: sizeTwips } });
}

// ---- table primitives ----
function cellBorders(colorHex = LINE) {
  const b = { style: BorderStyle.SINGLE, size: 4, color: colorHex };
  return { top: b, bottom: b, left: b, right: b };
}

function cell(opts = {}) {
  const {
    text,
    bold = false,
    italics = false,
    shading,
    width,
    align,
    color = INK,
    size = 20,
    children,
    borders,
    valign,
  } = opts;
  const kids =
    children ??
    [
      new Paragraph({
        children: [run(text ?? "", { bold, italics, color, size })],
        alignment: align,
        spacing: { before: 0, after: 0 },
      }),
    ];
  return new TableCell({
    children: kids,
    shading: shading ? shade(shading) : undefined,
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    borders: borders ?? cellBorders(),
    verticalAlign: valign ?? VerticalAlign.TOP,
  });
}

function cellMulti(paragraphs, opts = {}) {
  return new TableCell({
    children: paragraphs,
    shading: opts.shading ? shade(opts.shading) : undefined,
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    borders: opts.borders ?? cellBorders(),
    verticalAlign: opts.valign ?? VerticalAlign.TOP,
  });
}

function headerRow(cells, shading = LILAC) {
  return new TableRow({
    tableHeader: true,
    children: cells.map((c) =>
      typeof c === "string"
        ? cell({ text: c, bold: true, color: NAVY, size: 20, shading })
        : cell({ ...c, bold: true, color: c.color ?? NAVY, shading: c.shading ?? shading }),
    ),
  });
}

function fullWidthTable(rows, columnWidths) {
  return new Table({
    rows,
    width: { size: TOTAL_W, type: WidthType.DXA },
    columnWidths,
  });
}

// ---- callouts ----
function markerLine(kind) {
  const isObj = kind === "OBJECTIVE";
  const bg = isObj ? OBJ : JDG;
  const fg = isObj ? OBJ_FG : JDG_FG;
  const label = isObj
    ? "OBJECTIVE — marked right / wrong"
    : "JUDGED — marked with a rubric";
  return fullWidthTable(
    [
      new TableRow({
        children: [
          cell({
            text: label,
            bold: true,
            color: fg,
            size: 20,
            shading: bg,
            width: TOTAL_W,
            borders: cellBorders(bg),
          }),
        ],
      }),
    ],
    [TOTAL_W],
  );
}

function barCallout(barColor, bodyBg, paragraphs) {
  const barW = 260;
  const bodyW = TOTAL_W - barW;
  return fullWidthTable(
    [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [run("", {})] })],
            width: { size: barW, type: WidthType.DXA },
            shading: shade(barColor),
            borders: cellBorders(barColor),
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
          }),
          cellMulti(paragraphs, { width: bodyW, shading: bodyBg, borders: cellBorders(bodyBg) }),
        ],
      }),
    ],
    [barW, bodyW],
  );
}

function findItBox(routeText, howText) {
  return barCallout(PURPLE, LILAC, [
    new Paragraph({
      children: [
        run("IF YOU HAVE THE APP · ", { bold: true, color: PURPLE, size: 20 }),
        run(routeText, { size: 20, color: INK }),
      ],
      spacing: { before: 0, after: 40 },
    }),
    new Paragraph({
      children: [
        run("HOW · ", { bold: true, color: PURPLE, size: 20 }),
        run(howText, { size: 20, color: INK }),
      ],
      spacing: { before: 0, after: 0 },
    }),
  ]);
}

function locationNote(text, appRoute) {
  const paras = [
    new Paragraph({
      children: [
        run("WHERE TO LOOK · ", { bold: true, color: PURPLE, size: 20 }),
        run(text, { size: 20, color: INK }),
      ],
      spacing: { before: 0, after: appRoute ? 40 : 0 },
    }),
  ];
  if (appRoute) {
    paras.push(
      new Paragraph({
        children: [
          run("In the app (optional) · ", { bold: true, italics: true, color: ASH, size: 18 }),
          run(appRoute, { italics: true, color: ASH, size: 18 }),
        ],
        spacing: { before: 0, after: 0 },
      }),
    );
  }
  return barCallout(PURPLE, SOFT, paras);
}

function referenceBox(title, paragraphs) {
  const header = new Paragraph({
    children: [
      run("REFERENCE MATERIAL · ", { bold: true, color: REFBAR, size: 22 }),
      run(title, { bold: true, color: NAVY, size: 22 }),
    ],
    spacing: { before: 0, after: 60 },
  });
  const disclaimer = new Paragraph({
    children: [
      run(
        "You do not need the app for this worksheet — everything you need is printed below. The app is a nice-to-have if you want to explore visually.",
        { italics: true, color: ASH, size: 18 },
      ),
    ],
    spacing: { before: 0, after: 120 },
  });
  return barCallout(REFBAR, REF, [header, disclaimer, ...paragraphs]);
}

// ---- reference-content primitives ----
function refItem(label, body, extra) {
  const children = [
    run("• ", { bold: true, color: REFBAR, size: 20 }),
    run(label, { bold: true, color: NAVY, size: 20 }),
    run(" — ", { color: ASH, size: 20 }),
    run(body, { color: INK, size: 20 }),
  ];
  if (extra) children.push(run("  " + extra, { italics: true, color: ASH, size: 18 }));
  return new Paragraph({ children, spacing: { before: 0, after: 60 } });
}

function refBullet(text, opts = {}) {
  return new Paragraph({
    children: [
      run("• ", { bold: true, color: REFBAR, size: 20 }),
      run(text, { color: opts.color ?? INK, bold: opts.bold ?? false, size: 20 }),
    ],
    spacing: { before: 0, after: 60 },
  });
}

// ---- header info card ----
function headerInfoTable(rows) {
  const labelW = 2400;
  const valueW = TOTAL_W - labelW;
  const trs = rows.map(([label, value, isLink]) =>
    new TableRow({
      children: [
        cell({ text: label, bold: true, color: NAVY, size: 20, width: labelW, shading: LILAC }),
        cellMulti(
          [
            isLink
              ? new Paragraph({ children: [link(value, value, { size: 20 })], spacing: { after: 0 } })
              : new Paragraph({ children: [run(value, { size: 20 })], spacing: { after: 0 } }),
          ],
          { width: valueW, shading: PAPER },
        ),
      ],
    }),
  );
  return fullWidthTable(trs, [labelW, valueW]);
}

// ---- how-to list ----
function howToList(items) {
  return items.map(
    (text, i) =>
      new Paragraph({
        children: [
          run(`${i + 1}.  `, { bold: true, color: PURPLE, size: 22 }),
          run(text, { size: 22, color: INK }),
        ],
        spacing: { before: 0, after: 80 },
      }),
  );
}

// ---- tick box character ----
const BOX = "☐";
const TICKBOX = BOX;

// ---- fill-in table helpers ----
function row(cells, heightTwips) {
  return new TableRow({
    children: cells,
    height: heightTwips ? { value: heightTwips, rule: HeightRule.ATLEAST } : undefined,
  });
}

// an empty cell for the learner to write in
function fill(width, opts = {}) {
  return cell({ text: opts.text ?? " ", width, align: opts.align, shading: opts.shading });
}

// a centred tick-box cell
function tick(width) {
  return cell({ text: BOX, width, align: AlignmentType.CENTER, size: 22 });
}

// build a full-width data table: a header row + data rows, with per-column widths
function dataTable(headerCells, dataRows, columnWidths, headerShading = LILAC) {
  return new Table({
    rows: [headerRow(headerCells, headerShading), ...dataRows],
    width: { size: TOTAL_W, type: WidthType.DXA },
    columnWidths,
  });
}

// ---- document build ----
function buildDoc(title, description, children) {
  return new Document({
    title,
    description,
    styles: {
      default: {
        document: { run: { font: FONT, size: 22, color: INK } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });
}

async function writeDoc(doc, outPath) {
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  return outPath;
}

module.exports = {
  // tokens
  NAVY, PURPLE, LILAC, INK, ASH, LINE, OBJ, OBJ_FG, JDG, JDG_FG, REF, REFBAR,
  DANGER, SOFT, PAPER, FONT, VERCEL_ROOT, TOTAL_W, BOX, TICKBOX,
  // text
  p, pMixed, link, pWithLink, h1, h2, h3, spacer, run,
  // tables
  cellBorders, cell, cellMulti, headerRow, fullWidthTable, row, fill, tick, dataTable,
  AlignmentType,
  // callouts
  findItBox, locationNote, markerLine, referenceBox,
  // reference
  refItem, refBullet,
  // header + howto
  headerInfoTable, howToList,
  // doc
  buildDoc, writeDoc,
};
