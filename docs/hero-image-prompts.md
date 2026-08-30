# Hero image prompts — Day 2 (DataForm, NetCore, Artemis)

The case hero is not decoration. Learners click numbered markers positioned on top
of it in percent coordinates (`data/*.ts` → `HOTSPOTS[].x`, `.y`), and each marker
opens one verbatim fact from the case. So the picture has one hard requirement:

> **every fact needs its own clearly separated, visually identifiable place.**

## Current state — placeholders in place

Each case currently ships a **schematic SVG placeholder** so the tab is fully
interactive today:

- `public/assets/dataform-hero.svg`
- `public/assets/netcore-hero.svg`
- `public/assets/artemis-hero.svg`

They are clean, on-brand, and clickable, but they read as placeholders on purpose.
When you generate the richer raster art below, save it and see **After generating**.

## Two versions with a corner toggle (current model)

Each case hero ships **both** the AI illustration (v1, default) and the schematic
SVG (v2). `HERO_IMAGE` (in `data/mediprint.ts` = DataForm, `data/nordcom.ts` =
NetCore, `data/auron.ts` = Artemis) carries:

```ts
export const HERO_IMAGE = {
  src: "/assets/dataform-hero.jpeg",     // v1: the illustration (default)
  width: 2752, height: 1536,             // must match the illustration's aspect
  alt: "…",
  schematic: "/assets/dataform-hero.svg" // v2: the schematic SVG
};
```

A small **IMG / SVG** toggle sits in the hero's top-right corner
(`components/case/HotspotHero.tsx`); IMG is the default. The two views can use
**different marker coordinates**: a hotspot/zone carries its SVG coordinates in
`x`/`y` and its illustration coordinates in `imgX`/`imgY` (and `imgPanel`). The
components resolve per view via `hotspotForView` / `zoneForView` in
`data/case-shared.ts`. So the illustration and the schematic each get markers that
sit correctly, without one having to match the other's layout.

## The five areas (Day 2 taxonomy)

The legend down the left of every board is the five Day 2 areas, in this order and
exact spelling:

```
OPERATIONS / PROCUREMENT / USE / REPLACEMENT / STORAGE
```

Suggested arrow colours and icons (match the app tokens):

| Area | Colour | Icon |
|---|---|---|
| OPERATIONS | amber `#F1B24A` | white gear / power symbol |
| PROCUREMENT | blue `#6E8DC1` | white box-with-price-tag |
| USE | purple `#B389D6` | white single person |
| REPLACEMENT | green `#6FB56A` | white circular-refresh arrows |
| STORAGE | slate `#3F3552` | white stacked archive boxes |

---

## Case A — DataForm Systems (ready to paste)

DataForm is a building cutaway. Eight facts, one quiet ninth zone.

```
Wide isometric cutaway illustration of a company building, drawn as a clean
corporate infographic for a business e-learning module. Editorial vector style:
flat shapes, thin dark outlines, soft even shading, calm and businesslike. No
cartoon exaggeration, no drama.

FORMAT
Landscape, aspect ratio 16:9, at least 2048 pixels wide.

PALETTE
Pale sky with a faint low-contrast skyline behind the building. Blue-grey glass
and white concrete exterior. Interiors in warm white and light grey with wood and
blue-grey furniture. Accent colours used sparingly: amber, blue, purple, green,
slate.

LEFT LEGEND COLUMN — reserve the leftmost 15% of the frame
Five horizontal arrows pointing right, stacked, evenly spaced, same size, clear of
the building. Top to bottom:
  1. amber arrow, white gear icon
  2. blue arrow, white box-with-price-tag icon
  3. purple arrow, white single-person icon
  4. green arrow, white circular-refresh icon
  5. slate arrow, white stacked-boxes icon
Each arrow carries ONE word in white capitals, exact spelling:
OPERATIONS / PROCUREMENT / USE / REPLACEMENT / STORAGE

TITLE — top-left corner, above the arrows
Two lines of black text, nothing else:
  DataForm Systems
  Case Study

THE BUILDING
A 420-person office company: a modern building with open-plan desks, a small
server room, a print area, a delivery/procurement desk, and a basement store.
Busy but orderly.

ZONE LAYOUT — the most important instruction
Arrange the interior as a 3 x 3 grid of open cutaway rooms filling the right 85%
of the frame. Rooms clearly separated by walls and floor slabs. Each room holds
exactly ONE subject. Leave clear space at the centre of each room for a circular
marker.

  TOP LEVEL, left to right:
    1. A SMALL server room: three or four racks, modestly lit, most rack lights
       dim to read as low utilisation.
    2. A single small test tower standing apart from the racks, one status light
       on, plainly separate from production.
    3. A cloud shape floating just outside the building at this level, joined to
       the room below by two thin cables.
  MIDDLE LEVEL, left to right:
    4. An open-plan desk area at night: a desktop and monitor still switched on,
       the room otherwise dark and empty.
    5. A print area: one printer with a raised output tray and a modest paper
       stack beside it.
    6. A desk with a single notebook and a circular-refresh arrow over it,
       suggesting a scheduled swap.
  LOWER LEVEL, left to right:
    7. A basement store: a short stack of boxed-up monitors and accessories on
       shelving, lights low.
    8. A procurement/delivery desk: one figure at a monitor and a delivery box on
       the desk, no repair or inspection tools in sight.
    9. LEAVE THIS ROOM QUIET AND NEARLY EMPTY — a plain office corner with a bare
       noticeboard, nothing happening. (It stands for "no systematic look".)

PEOPLE
Simple generic office figures, mixed genders and ages, business-casual. Small in
frame, no readable faces. Two or three per occupied room at most.

MUST NOT
- No text anywhere except the title block and the five arrow words. No speech
  bubbles, callout boxes, signposts, room name plates, screen text, document
  text, numbers, logos or brand marks.
- No environmental cliches: no belching smoke, wilting plants, globes in hands,
  green leaves on devices, recycling arrows, polar bears or solar panels.
- No red warning glow. Neutral and observational, not alarming.
- Nothing decorative that does not correspond to a numbered subject.
```

### How the nine zones map to the case

| # | What is drawn | Verbatim fact | Area · lens |
|---|---|---|---|
| 1 | Small server room, dim racks | Several older systems with low utilisation exist in the server room | Operations · energy |
| 2 | Single test tower, apart | Several test systems run alongside the production estate | Operations · energy |
| 3 | Cloud joined by cables | Cloud applications are in growing use | Operations · energy |
| 4 | Desktop on in a dark office | Workstation computers often keep running at night as well | Use · energy |
| 5 | Printer and paper | Printers and peripherals are distributed across many areas | Use · both |
| 6 | Notebook with refresh arrow | Notebooks are replaced by default after three years | Replacement · resource |
| 7 | Boxed monitors in a store | Old monitors and accessories are stored unused | Storage · resource |
| 8 | Delivery box on a desk | New devices are often procured without a repair check or reuse assessment | Procurement · resource |
| 9 | Empty office corner | (no marker — "no systematic examination of energy or resource consumption") | — |

---

## Case B — NetCore Manufacturing Services GmbH (ready to paste)

NetCore is a **board**: a company scene on the left, six drawn panels on the right,
and two extra points on the company scene. Six facts on panels, two on the scene.

```
Wide illustration for a business e-learning module, drawn as a clean corporate
infographic. Editorial vector style: flat shapes, thin dark outlines, soft even
shading, calm and businesslike. No cartoon exaggeration, no drama.

FORMAT
Landscape, aspect ratio 16:9, at least 2048 pixels wide.

PALETTE
Warm white and light grey, with amber, blue, purple, green and slate accents used
sparingly.

LEFT — reserve the leftmost third of the frame for the COMPANY SCENE
A medium industrial company across three sites: three simple building blocks
labelled only by shape (no text), a grown IT landscape suggested by many small
device icons and a few local server cabinets. Include, as two clearly separate
small elements on this scene:
  - a cloud symbol joined to the buildings (increasing cloud use)
  - a small round-the-clock shield or clock (high availability)

RIGHT — six drawn panels in a 2-columns x 3-rows grid, clearly bordered, each
holding exactly ONE subject, with clear centre space for a circular marker:
  1. A rack of servers with most activity lights dim (low utilisation).
  2. A desk of monitors still glowing in an otherwise empty, after-hours office.
  3. A calendar swapping out working laptops on a timer (fixed replacement cycle).
  4. A pile of retired devices with no route drawn onward from them (no reuse).
  5. A buyer comparing only price tags and a delivery clock (procurement on price).
  6. A large blank dashboard screen with empty panels (no sustainability data).

MUST NOT
- No text anywhere. No speech bubbles, callout boxes, signposts, name plates,
  screen text, document text, numbers, logos or brand marks.
- No environmental cliches, no red warning glow, nothing decorative that is not
  one of the listed subjects.
```

### Mapping

| # | Panel/point | Verbatim fact | Area · lens |
|---|---|---|---|
| 1 | Low-utilisation servers | Numerous servers run with low utilisation | Operations · energy |
| 2 | Monitors on after hours | Workstation computers and monitors often remain in operation outside usage hours | Use · energy |
| 3 | Calendar-driven swap | Devices are replaced in fixed cycles, regardless of their actual condition | Replacement · resource |
| 4 | Retired devices, no route | There is no repair or reuse concept | Storage · resource |
| 5 | Price-only buying | Procurement decisions are based almost exclusively on price, performance and availability of supply | Procurement · resource |
| 6 | Blank dashboard | Sustainability data on IT systems is hardly available | Operations · both |
| 7 (scene) | Cloud on the scene | Cloud use is increasing across the three sites | Operations · energy |
| 8 (scene) | 24/7 shield | High availability requirements shape how the estate is run | Operations · energy |

---

## Case C — Artemis Digital Industries (ready to paste)

Artemis is a **decision board**, not a building. Six condition panels on the right,
four points on a company scene on the left. This one reads as people, pressures and
relationships rather than rooms and equipment.

```
Wide illustration for a business e-learning module, drawn as a clean corporate
infographic. Editorial vector style: flat shapes, thin dark outlines, soft even
shading, calm and businesslike. No drama.

FORMAT
Landscape, aspect ratio 16:9, at least 2048 pixels wide.

PALETTE
Warm white and light grey, with amber, blue, purple, green and slate accents used
sparingly.

TOP-LEFT — a plain banner block (no text baked in beyond the title below).

TITLE — top-left, two lines of black text, nothing else:
  Artemis Digital Industries
  Case Study

LEFT — company scene (leftmost third): a growing company across several sites
(a small skyline still under construction), a hybrid IT structure (a cloud joined
to local servers), separate buying happening at more than one site (decentralised
procurement), and a meter with its needle swung high (rising operating costs).

RIGHT — six drawn panels in a 2-columns x 3-rows grid, clearly bordered, each with
clear centre space for a circular marker:
  1. Four figures pulling one document in four directions (differing interests).
  2. A round-the-clock service dial held near its ceiling (availability/performance).
  3. A dashboard with blank readings (incomplete data transparency).
  4. A small budget with several claims pointing at it (budget / short-term).
  5. A worn, faded process diagram nobody has revisited (historically grown routines).
  6. A green sticker slapped on a server, with one unconvinced onlooker (must not be
     merely symbolic).

MUST NOT
- No text except the two-line title. No speech bubbles, callout boxes, signposts,
  name plates, screen text, document text, numbers, logos or brand marks.
- No environmental cliches, no red warning glow, nothing decorative that is not one
  of the listed subjects.
```

### Mapping

| # | Panel/point | Verbatim fact | Area(s) |
|---|---|---|---|
| 1 | Four-way pull | Differing interests of IT operations, purchasing, finance and management | Operations, Procurement |
| 2 | Availability dial | High requirements for availability and performance | Operations, Use |
| 3 | Blank dashboard | Incomplete data transparency on consumption and inventories | Operations |
| 4 | Small budget | Budget restrictions and the expectation of short-term results | Procurement |
| 5 | Worn process diagram | Existing replacement and procurement routines have grown historically | Replacement, Procurement |
| 6 | Green sticker | Sustainability should become visible, but must not remain mere symbolic politics | Operations |
| 7 (scene) | Skyline under construction | The company is growing and operates across several sites | Operations |
| 8 (scene) | Cloud + local servers | The company operates hybrid IT structures | Operations |
| 9 (scene) | Separate buying | The company procures in a decentralised way | Procurement |
| 10 (scene) | Meter needle high | The company has rising operating costs | Operations |

---

## After generating a new illustration

1. Save as `public/assets/<case>-hero.jpeg` (dataform / netcore / artemis), and
   point `HERO_IMAGE.src` at it with matching `width`/`height`. Keep `schematic`
   pointing at the SVG so the toggle stays.
2. **Re-measure the illustration coordinates.** Open the image, read where each
   subject (or its drawn white marker circle) sits as a percentage of width/height,
   and set each hotspot's `imgX`/`imgY` (and `imgPanel` for panel findings) plus the
   zone `imgX/imgY/imgW/imgH`. Leave `x`/`y` (the SVG coordinates) untouched.
3. Rewrite each hotspot's `onTheImage` line from what the picture actually shows.

If a subject came back merged or missing, regenerate rather than compromise. The
schematic SVG (v2) is always there as a fallback, with its own `x`/`y` coordinates.
