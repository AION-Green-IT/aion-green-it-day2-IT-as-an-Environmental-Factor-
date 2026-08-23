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

## What is still open

`lib/completion.ts` is the one place that answers "what have I not done yet",
for every tab. It reads the store and returns four groups — Learn widgets,
training cards, category badges, MediPrint markers — each with its items and
a done flag. `OpenItems` renders it: pass `only` for one tab's groups, omit it
for the whole module, which is what the Task map shows.

Adding a trackable thing means adding a group there, not a counter in a page.

The badge shelf deserves a note. The deck holds exactly three cards per
category, so a badge lights only when all three of that category matched —
which makes the shelf a diagnostic rather than a score. Each row ends in one
sentence saying what to do next: nothing, re-read what you missed, or keep
going. Card numbers were tried there and removed — knowing a card is number 6
tells a learner nothing, and the end-of-round summary already lists missed
cards by their actual text.

The Training Ground opens with a "How this works" block: the three steps, then
what XP, the streak and the badges each mean. Gamification that is not
explained reads as noise, so if you add a score, explain it there in the same
breath.

`OpenItems` is deliberately not on Learn or Training. Learn widgets carry
their own progress pill, and Training explains itself in the block above; a
second unexplained counter on those tabs was worse than none. It stays on the
Task map, which is the overview tab, and on MediPrint, where it names the
passages not yet opened for Task 1.

## Reset progress

`reset()` clears the persisted store, but a lot of what a learner sees lives in
component state — the answers in the current round, which widgets are open,
which markers have been clicked. Clearing only the store left the counters at
zero while the page still showed the old answers.

So `reset()` also bumps `resetCount`, which `ResetBoundary` uses as a React key
around the page content in the layout. Changing it remounts everything below,
which is what clears the component state. `resetCount` is deliberately left out
of `partialize`: it is a signal inside one session, not progress.

The button opens `ConfirmDialog` rather than `window.confirm`, listing what
will be cleared. The confirmation toast is rendered from `TopBar`, outside the
boundary, so it survives the remount it just caused.

## Judging the roadmap without scoring it

W8 used to check one thing — whether a measure ran before its prerequisite —
which meant putting all six in Q4 passed clean. It does not any more.

`W8_PROFILES` classifies the whole plan (out of sequence, everything at once,
back-loaded, front-loaded, foundation first, evenly paced) and states what that
shape costs. `W8_TRADEOFFS` adds a line per measure for a late or stacked
placement — KPIs agreed in Q4 govern nothing that year, procurement rewritten
in Q4 means the whole year's buying happened under the old rules.
`W8_REFERENCE` is the answer key: one defensible order with the reason for each
step. It sits behind its own button above the board, reachable at any point
rather than only after all six are placed — someone who is stuck needs it then,
not later. It can also lay itself out on the board, and there is a clear button
next to it so an order can be tried, priced, cleared and tried again.

"There is no correct roadmap" stays true: the widget still does not mark you.
It prices the ordering you chose, which is the thing a learner can act on.

## Explain, then practise

A widget that tests a distinction has to be preceded by the explanation of that
distinction. `CategoryPrimer` sits above the sorter and does that job for the
five categories: a diagram, then per category a plain meaning, the question
that identifies it, an example, and the lever you would pull. It ends by
handing over to the widget below it.

`CategoryDiagram` is the picture: Governance drawn as the frame around
everything, the other four as flows in and out of the same IT. Inline SVG with
a real `<desc>`, so it works for a screen reader too. If you add a concept that
needs a picture, follow that shape rather than reaching for an image file.

Real cases live on the comparator cards as `cases`, next to the definition they
test — the DWS greenwashing fine for ESG, Microsoft's Scope 3 share for the
value-chain point. A definition plus a thing that actually happened lands
better than either alone. Every case carries its source.

## Glossary

`data/glossary.ts` holds every term the tabs would otherwise use without
explaining — HVAC, setpoint, wake-on-LAN, Scope 3, PUE and the rest. Each
entry has a plain-language definition and, where a decision hangs on it, a
"why it matters" line.

Each training card declares which terms it uses in its `terms` array.
`GlossaryText` links the first occurrence of each declared term anywhere in
that card's prose; nothing outside the declared list is ever matched, so no
unrelated word gets caught. `GlossaryReference` renders the whole vocabulary
with a filter, at the bottom of both Learn and Training.

Adding a term: add the entry, then list its id on the cards that use it.
Give `also` every spelling that should link, including plurals — a phrase
only matches on a whole-word boundary, so "refresh cycle" will not match
"refresh cycles" unless the plural is listed.

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
