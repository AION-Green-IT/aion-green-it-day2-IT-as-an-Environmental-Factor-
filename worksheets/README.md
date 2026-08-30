# AION Green IT — Module 2 · Learner Worksheets

Run `node build_all.js` (after `npm install`); the four `.docx` files appear in `dist/`.

## What this is

Four printable / laptop-ready learner worksheets for **Module 2 — IT as an
Environmental Factor**, built to the `AION_GreenIT_M1_Worksheets_BuildSpec.txt`
standard but filled with the **live Day 2 content** (DataForm / NetCore / Artemis,
the five areas Operations / Procurement / Use / Replacement / Storage):

| File | Task | Case | Level |
|---|---|---|---|
| `dist/Worksheet1_DataForm_L1.docx` | Task 1 — make energy & resource use visible | DataForm | L1 |
| `dist/Worksheet2_DataForm_L2.docx` | Task 2 — which measure first (A/B/C) | DataForm | L1–L2 |
| `dist/Worksheet3_NetCore_L2.docx`  | Case study — findings to a first step | NetCore | L2 |
| `dist/Worksheet4_Artemis_L3.docx`  | L3 — decision architecture & allocation | Artemis | L3 |

Each worksheet is **self-contained** (a Reference Material box carries every fact,
verbatim from the app), declares its **grading** (green OBJECTIVE / amber JUDGED)
and **where to look** (purple app callout or lilac paper note) per section, and
ends with a rubric.

## Files

- `ws_helpers.js` — shared docx helpers (design tokens, callouts, tables). Frozen API.
- `ws_content.js` — single source of truth for the verbatim Day 2 content.
- `build_ws1.js … build_ws4.js` — one per worksheet.
- `build_all.js` — runs all four.

## When the app changes

Update the verbatim strings in `ws_content.js`, then re-run `node build_all.js`.
The live playground URL lives in one place: `VERCEL_ROOT` in `ws_helpers.js` —
set it to the Module 2 deployment.
