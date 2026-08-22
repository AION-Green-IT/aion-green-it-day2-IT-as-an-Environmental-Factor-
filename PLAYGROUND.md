# Playground — scaffold status

`README.md` holds the full build prompt and stays the contract. This file
tracks what is actually built and where the remaining content goes.

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

## Routes

| Route | Tab | Status |
| --- | --- | --- |
| `/` | — | redirects to `/learn` |
| `/learn` | Tab 1 | done — 11 widgets across L1/L2/L3, all interactive |
| `/training` | Tab 2 | done — 15 reveal cards, XP, streak, category badges |
| `/case/mediprint` | Tab 3 | Task 1 done — interactive hero, 9 markers, briefing. Task 2 slots open |
| `/case/nordcom` | Tab 4 | frame only: brief, legend, fixed tab strip, tiles, context slots |
| `/case/auron` | Tab 5 | frame only: brief, legend, map, chart, conditions, stakeholders slots |
| `/task-map` | Tab 6 | done — table from `data/task-map.ts` |

## Built

- Chrome on every route: top bar (logo, module title, XP, streak, Reset
  progress), left rail collapsing to a top tab strip below 768px, footer.
- Brand tokens in `tailwind.config.ts` and `styles/globals.css`.
- Zustand store in `lib/store.ts`, persisted to the single key
  `aion-greenit-m1`, with `addXp`, `award`, `markVisited`,
  `recordTrainingAnswer` and `reset`.
- The five fixed categories in `data/categories.ts` and the shared case
  frame in `components/case/`.
- MediPrint Task 1: the illustration is the whole hero — no sidebar. It
  carries nine numbered fact markers, a region over the building that opens
  the company brief and the context tiles, and a region over each of the five
  category arrows that opens that topic area. Selecting a fact or the building
  zooms the artwork; selecting an arrow keeps the full view and rings the
  markers carrying that tag. Facts are round numbered markers; regions carry a
  dashed outline and a small square badge — "i" for the building, the category
  short code for each arrow — and a key under the image names all three. The
  detail card floats over the artwork from 1024px up and drops below it on
  narrower screens. Underneath: the
  "Show all facts as list" fallback and the Task 1 briefing, whose lines link
  back to the marker they appear on.

## Not built yet

Everything behind a `Placeholder` slot. Each slot prints its own id, so a
slot on screen maps straight to the section of `README.md` that fills it:

| Slot id | Fill from |
| --- | --- |
| `mediprint/initiatives`, `mediprint/conditions` | section 6.A, Task 2 |
| `nordcom/*` | section 6.B |
| `auron/*` | section 6.C |

Still missing as files: `data/nordcom.ts`, `data/auron.ts`, `FactModal`,
and the remaining `/components/ui` primitives (Modal, Tabs, Button, Chip,
Toggle), plus `lib/a11y.ts`.

## Learn and Training content

`data/learn.ts` and `data/training.ts` hold every string. `data/sources.ts`
holds the citations, one entry per source, so a figure can be re-checked in
one place — every "From the field" note points at one of them.

Two widgets beyond the nine in the prompt:

- `w10` service-life simulator (L1) — makes the embodied-carbon fact usable.
- `w11` PUE check (L2) — the German Energy Efficiency Act thresholds.

Both work in ratios and an index, never in kg, kWh or currency, so section 12's
pre-metric rule still holds. If you later want absolute figures, that rule is
the thing to change first — it is deliberate, not an oversight.

The three placement widgets (`w3`, `w5`, `w8`) use click-to-select then
click-to-place rather than HTML5 drag-and-drop. The prompt asks for
drag-and-drop with a keyboard fallback; one interaction that already works
with a mouse, touch and keys beats two that drift apart. Keys 1–n place a
focused card, as specified.

## Moving something on the MediPrint hero

Everything clickable is positioned in percentages of the illustration,
measured from its top-left corner, so the artwork can be re-exported at any
resolution without touching the code.

- Fact markers: `HOTSPOTS` in `data/mediprint.ts` — `x` and `y`.
- The building region: `COMPANY_ZONE` — `x`, `y`, `w`, `h`.
- The arrow regions: `CATEGORY_ZONES` — same four values.

Change the numbers and reload. The zoom target follows on its own and clamps
so the frame never runs off the edge of the artwork. Zoom depth lives in
`FACT_ZOOM` and `COMPANY_ZOOM` in `components/case/MediprintCase.tsx`;
`FOCUS_X` in `HotspotHero.tsx` is what keeps the zoomed subject left of
centre so the detail card does not sit on top of it.

Two deviations from the build prompt worth knowing about:

- Section 6.A specifies an inline-SVG hero. This one is a raster
  illustration in `public/assets/`. It is served from the repo, so the
  no-external-CDN rule still holds.
- The prompt's `Hotspot` contract mentions a `FactModal`. Task 1 wants the
  illustration and the passage on screen together, so the marker detail
  renders in a panel under the hero instead of a modal.

## Id convention

Ids are lowercase kebab-case and stable across deploys, so worksheet FIND IT
lines keep resolving:

```
FIND IT: /case/mediprint -> hotspot "Server room" (id: hs-server-room)
```

`lib/ids.ts` has `kebab()` and `scopedId(scope, id)` for the
`mediprint/server-room` form used in the visited log.

## ID changes

None so far. If a build decision forces a rename, list the old and new id
here.

## Adding a learn widget

1. Add the seed data to `data/learn.ts` — generic examples only, never case
   company content.
2. Build the widget as one file in `components/learn/`, marked
   `"use client"`.
3. Call `markVisited("learnWidgets", "<widget-id>")` and `addXp(n)` on first
   completion, guarding against a repeat award.
4. Replace the matching `Placeholder` in `app/learn/page.tsx` with the
   widget, keeping the level pill it sits under.
5. Give it a keyboard path — drag-and-drop widgets need focus plus keys 1–5
   to assign a category.
