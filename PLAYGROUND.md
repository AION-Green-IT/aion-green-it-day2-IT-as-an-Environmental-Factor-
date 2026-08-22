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
| `/learn` | Tab 1 | chrome + L1/L2/L3 sections, W1–W9 as empty slots |
| `/training` | Tab 2 | layout only: XP bar, card stack, badge shelf slots |
| `/case/mediprint` | Tab 3 | frame only: brief, legend, hero, initiatives, conditions slots |
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

## Not built yet

Everything behind a `Placeholder` slot. Each slot prints its own id, so a
slot on screen maps straight to the section of `README.md` that fills it:

| Slot id | Fill from |
| --- | --- |
| `w1` … `w9` | section 7 (and 7.1 for the sorter snippets) |
| `xp-bar`, `reveal-stack`, `badge-shelf` | section 8 |
| `mediprint/*` | section 6.A |
| `nordcom/*` | section 6.B |
| `auron/*` | section 6.C |

Still missing as files: `data/learn.ts`, `data/training.ts`,
`data/mediprint.ts`, `data/nordcom.ts`, `data/auron.ts`, the widget
components, `RevealCard`, the hero SVGs, `Hotspot`, `FactModal`,
`CategoryChip`, and the `/components/ui` primitives (Accordion, Modal,
Tabs, Button, Chip, Toggle), plus `lib/a11y.ts`.

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
