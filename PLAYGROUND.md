# Playground — scaffold status

> **Day 2 conversion (2026-08-29).** This repo was forked from Day 1 and is now
> reframed to **Module 2 — "IT as an Environmental Factor: Energy, Raw Materials,
> Waste"**. Store key `aion-greenit-m2`. Much of the Day-1 detail below still
> describes the engine (accurate) but names the old content — read it for *how*
> things work, not *what* they say. Current Day 2 content:
>
> - **Taxonomy:** five areas — Operations / Procurement / Use / Replacement /
>   Storage (`data/categories.ts`), plus an energy/resource `lens` on hotspots.
> - **Case A `/case/mediprint`** → **DataForm Systems** (Task 1) + **Task 2**
>   measure A/B/C decision (`components/case/DataFormMeasures.tsx`, `data/task2.ts`).
> - **Case B `/case/nordcom`** → **NetCore Manufacturing Services** (case study).
> - **Case C `/case/auron`** → **Artemis Digital Industries** (L3 + allocation).
> - **L2 in Learn** → the **Meridian** scenario, retagged to the five areas.
> - Routes/component/data filenames keep their Day-1 names as stable internal ids;
>   only user-visible labels changed. Heroes are schematic **SVG placeholders**
>   (`public/assets/*-hero.svg`); richer raster art prompts are in
>   `docs/hero-image-prompts.md`.
> - `npm run typecheck` and `npm run build` pass.

`README.md` holds the full build prompt and stays the contract. This file
tracks what is actually built and where the remaining content goes.

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
npm run typecheck
```

**Node 18.17 or newer is required.** `.nvmrc` pins 20 and `package.json` declares
the engine, because a Node 16 default fails the build with nothing but a version
message.

## Deploying

`next.config.mjs` sets `output: "export"`, so `npm run build` writes a plain
static site to `out/` — no Next.js server, no host runtime, no platform plugin.
Any static host serves it, Netlify included; `netlify.toml` sets the publish
directory and pins `NODE_VERSION`.

Two consequences worth knowing:

- There is no image optimiser in a static export, so `images.unoptimized` is on
  and `public/assets/mediprint-hero.jpeg` is pre-sized to 2048px (~500KB). If
  you replace the artwork, size it before committing rather than relying on
  `next/image`.
- `/` cannot redirect server-side. `app/page.tsx` is a client component that
  replaces to `/learn`, with a real link behind it so it works without
  JavaScript.

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

## L2 is the Meridian case study, inside Learn

L2 is not a separate route. `MeridianScenario` renders inside the Learn page's
L2 accordion section with `layout="inline"`, so L1, L2 and L3 are one page and
one scroll.

Three things were changed to make that work rather than merely fit:

- The HUD has a `strip` variant — a sticky horizontal bar instead of a 320px
  rail. Week, budget, four stakeholder chips with mood dots and the last
  decision. Selecting a chip still opens that person's wants / controls / why.
- The Inbox opens a message in a dialog rather than expanding it in place. That
  removes a level of nesting (accordion → phase → inbox → artifact became
  accordion → phase → inbox) and it reads more like opening mail.
- Levels are addressable. `/learn#l2` opens L2 and scrolls to it, and the
  debrief's "Continue to L3" is an in-page `#l3` link that opens that level. A
  mentor can still put a URL for the L2 block on a slide.

Meridian is the whole of L2. The Marchgate Supply dilemma cards that once sat
underneath are deleted: their three tickets were already inside Meridian — the
cloud bill is Phase 2's FinOps option, the dying scanners are the laptop
programme, and the green badge is all of Phase 3 — and their stated objective
was word for word the one Meridian's four phases cover. Two mid-size
distributors with a risen cloud bill and a pile of dead devices was one scenario
written twice.

The earlier Verlan Systeme story is deleted, with `data/story.ts` and
`components/learn/story/`.

## Superseded: L2 as a separate route

L2 is delivered at `/scenario/meridian`, not as widgets inside the Learn page.
The Learn page's L2 section is a handoff card that says what the case study is
and opens it; the scenario page names where it sits between L1 and L3, and its
debrief sends the reader on to L3 rather than to a dead end.

`DilemmaCards` (Marchgate Supply) stays underneath as a shorter alternative for
sessions with ten minutes rather than a block.

The earlier four-quarter story at Verlan Systeme is deleted, along with
`data/story.ts` and `components/learn/story/`. Everything it taught — the
five decision criteria, the trade-off dials, the customer-ask consequence — is
in Meridian's phase briefings and consequences.

## Superseded: L2 had two versions

Both sit in the L2 level and neither replaces the other. They teach the same
three objectives at different speeds, so a session can use whichever fits the
room and the clock.

| | Shape | Runs in |
| --- | --- | --- |
| **v1** `data/story.ts` | One company across a year: method, then four quarters, consequences carried forward | A long block |
| **v2** `data/l2v2.ts` | Three helpdesk tickets, two options each, three dashboard metrics that move | Ten minutes |

v2 is Marchgate Supply — a retail distributor whose cloud bill keeps climbing
and whose warehouse has three hundred retired scanners nobody will sign off.
Every option carries explicit deltas on 💰 Budget, 🌿 ESG and ⚙️ Feasibility,
shown as a preview on hover before the click, so the cost is visible while
deciding rather than after.

The teaching sits in the profile at the end, which reads from where the three
metrics land: all-pragmatic gives "you solved three complaints and built
nothing", all-ideal gives "you chose well and may not be able to deliver".
Neither extreme wins, which is the point — no option in the deck pays all three
dials. Keep that property if you add tickets.

## L2 v1: the story

`data/story.ts` holds the whole of L2 as a four-chapter narrative. It is not one
widget among several any more — it **is** the level, and the four widgets that
used to sit here have been folded into it:

| Was | Now |
| --- | --- |
| W6 incomplete information | Q1 — investigate two of three signals |
| W5 priority matrix | Q2 — one budget, three initiatives |
| W4 trade-off dials | Q3 — each dial has a named person at both ends |
| W11 PUE check | Q4 — the board asks where you sit against the 2027 threshold |

The component files still exist but nothing renders them. `WIDGET_INDEX` lists
no L2 widgets, and `lib/completion.ts` tracks the story instead — check both if
you re-add anything here.

A learner who finishes Q4 has met every L2 objective without needing to read
anything else.

The structural rule is: **branch the consequences, not the content.** Every
learner plays every chapter in the same order — choices never remove a chapter,
they change the state carried into the next one. That is what keeps curriculum
coverage complete while a decision still has a cost. Each chapter names the
L2 objective it serves, on screen.

### Pictures, and holes shaped like pictures

Text is the last resort, not the default. Anything comparable becomes a meter,
anything statable becomes a chip, anything spatial becomes SVG — `YearTimeline`,
`SignalIcon` and `Meter` in `components/learn/story/` exist for that. Three
options with three meters each compare in one glance; the same content as prose
does not.

Where a real illustration is needed, `ImagePlaceholder` renders a picture-shaped
box carrying the brief and a **Copy the image prompt** button. Generate the image
anywhere, drop it at the filename the box names, and pass `exists` to swap the
box for the picture. Two are outstanding:

Q1's scene is not one of them. It is drawn as inline SVG in `DeskScene` so the
three objects on the desk *are* the controls — the same pattern as the MediPrint
hero, where clicking the artwork is how you work. A picture that can be clicked
beats a picture that can be looked at, so reach for SVG first and only brief an
illustration where the scene is too rich to draw.

| File | Scene |
| --- | --- |
| `public/assets/story-q2-outcome-a.png` | December after replacing laptops |
| `public/assets/story-q2-outcome-b.png` | December after rewriting the rules |
| `public/assets/story-q2-outcome-c.png` | December after building a baseline |

Every prompt opens with a CONTEXT / PURPOSE / THE VIEWER MUST UNDERSTAND block
before the scene, so whichever model draws it knows what the picture has to
teach — an image that only decorates has failed the brief. They pin the brand
palette and forbid lettering, so nothing needs translating.

Note that three of the four are **outcome** images, keyed to the option chosen.
The picture is part of the consequence, not the wallpaper above it.

### Teaching the method before asking for a decision

The story opens on a Method chapter, not on Q1. `CRITERIA` holds the five the
curriculum names — impact, feasibility, acceptance, time, strategic leverage —
each with the trap that makes people score it wrongly. `METHOD.rules` carries
the part that keeps it honest: score every option on every criterion before
comparing any two, and let the criterion decide where the situation is tightest.

### Choosing badly, defensibly

`SCORECARD` scores all three Q2 options on all five criteria, and every score
cites a fact from the scenario rather than an opinion — the complaints cluster
on one model, the contract renews in nine months, the questionnaire is due in
five. A learner who disagrees has somewhere specific to push.

`DECISIVE` names which criterion this scenario makes decisive and why. Crucially
each option also carries `rightWhen`: the conditions under which the weakest
choice becomes the correct one. Option A is hard to defend here and would be
right in a company about to cancel the programme. That is what keeps the verdict
a judgement about the situation rather than about the option.

If the learner skipped the questionnaire in Q1 they never knew the deadline
existed, and the panel says exactly that: not that they chose badly, but that
they chose without knowing which criterion mattered.

### Wiring

The wiring lives in `Initiative.weakWithout`: a Q2 option carries one line per
Q1 signal, shown only if that signal was skipped. So the same Q2 choice reads
differently depending on Q1 — which is the whole point, and the thing to keep
if the story is extended.

Q3 is where the dials earn their keep: a goal conflict is not an axis, it is two
people with mandates who cannot both win, so every position names who objects
and the sentence they say in December. Note that the middle of each dial has
nobody backing it — deliberately, and the chapter closes on it.

Leaving a dial at its default is a position, not an absence of one, so Q4 is
gated on a commit button rather than on having moved all three sliders. That was
a real bug: a learner who chose the middle on purpose could not proceed.

Q4 gates the PUE question on state — if the learner never investigated energy
and never chose the baseline, they cannot answer it, and the instrument is shown
as the one they would have needed. The threshold content is met either way, so
coverage never depends on the path taken.

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
