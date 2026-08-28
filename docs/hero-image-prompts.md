# Hero image prompts — Case A, B, C

The case hero is not decoration. Learners click numbered markers positioned on top
of it in percent coordinates (`data/*.ts` → `HOTSPOTS[].x`, `.y`), and each marker
opens one verbatim fact from the case. So the picture has one hard requirement:

> **every fact needs its own clearly separated, visually identifiable place.**

---

## What Case A got right, and what to fix

Case A (`public/assets/mediprint-hero.jpeg`) works because of five things. Keep them.

| Keep | Why it matters |
|---|---|
| Isometric cutaway, rooms open to the viewer | Many facts visible at once, no scrolling |
| One fact = one room or object | A marker can point at something specific |
| Five category arrows down the left | Evenly spaced, easy to make clickable |
| Dark basement vs lit floors | Visual hierarchy; the neglected stuff reads as neglected |
| Pale sky + faint skyline behind | Empty area for the title and the zoom-out control |

Four things to fix. All four are in the generated image today.

1. **Typos are permanent.** Case A ships with `SECONDART SIFICE SITE`,
   `SERVER RON (OWN)`, `REGUAL EVERY 3 YEARS`, and `IT'S CONTRIBUTION` (should be
   `ITS`). Generated lettering cannot be spell-checked and cannot be corrected
   without regenerating the whole image.
2. **Callout bubbles duplicate the markers.** The bubble says
   `HIGH PRINTING VOLUME`; the panel behind the marker says the verbatim fact.
   Two versions of the same fact, and only one of them is the approved wording.
3. **The audience is German.** Any word baked into the picture is frozen in
   English and cannot be swapped.
4. **Case A is lopsided.** The right two-thirds is crammed; the left third is
   building exterior and empty sky. Markers cluster and collide.

**So: no callout bubbles, no signposts, no labels inside the scene.** The markers
are the labels. The template below keeps only the title block and the five arrow
words — short, few, checkable — and forces a 3x3 zone grid so markers spread evenly.

---

## The reusable template

Fill the bracketed slots. Everything else stays word for word.

```
Wide isometric cutaway illustration of a company building, drawn as a clean
corporate infographic for a business e-learning module. Editorial vector style:
flat shapes, thin dark outlines, soft even shading, moderate detail, calm and
businesslike. No cartoon exaggeration, no drama.

FORMAT
Landscape, aspect ratio 16:9, at least 2048 pixels wide.

PALETTE
Pale blue sky with a faint, low-contrast city skyline silhouette behind the
building. Blue-grey glass and white concrete exterior. Interiors in warm white
and light grey with wood and blue-grey furniture. Accent colours used sparingly:
warm red, amber orange, muted brown, slate grey, corporate blue.

LEFT LEGEND COLUMN — reserve the leftmost 15% of the frame
Five horizontal arrows pointing right, stacked vertically, evenly spaced, all the
same size, clear of the building. Top to bottom:
  1. red arrow, white lightning-bolt icon
  2. brown arrow, white stacked-boxes icon
  3. grey arrow, white smokestack icon
  4. orange arrow, white single-person icon
  5. blue arrow, white document icon
Each arrow carries ONE word in white capitals, in this exact spelling:
ENERGY / RESOURCES / EMISSIONS / USE / GOVERNANCE

TITLE — top-left corner, above the arrows
Two lines of black text, nothing else:
  [COMPANY NAME]
  Case Study

THE BUILDING
[ONE SENTENCE: what kind of company, what the building should feel like]

ZONE LAYOUT — this is the most important instruction
Arrange the interior as a 3 x 3 grid of open cutaway rooms filling the right 85%
of the frame: three rooms across, three levels down. The rooms must be clearly
separated by walls and floor slabs. Each room holds exactly ONE subject from the
list below. Do not merge two subjects into one room. Do not add extra rooms or
extra activity that is not on this list. Leave clear space at the centre of each
room so a circular marker can sit there without covering anything important.

  TOP LEVEL, left to right:
    1. [SUBJECT]
    2. [SUBJECT]
    3. [SUBJECT]
  MIDDLE LEVEL, left to right:
    4. [SUBJECT]
    5. [SUBJECT]
    6. [SUBJECT]
  LOWER LEVEL, left to right:
    7. [SUBJECT]
    8. [SUBJECT]
    9. [SUBJECT]

PEOPLE
Simple generic office figures, mixed genders and ages, business-casual. Small in
frame, no readable faces, no exaggerated expressions. Two or three per occupied
room at most.

MUST NOT
- No text anywhere except the title block and the five arrow words above. No
  speech bubbles, no callout boxes, no signposts, no room name plates, no screen
  text, no document text, no numbers, no logos, no brand marks.
- No environmental cliches: no smoke stacks belching, no wilting plants, no
  globes held in hands, no green leaves sprouting from devices, no recycling
  arrows, no polar bears, no solar panels unless listed as a subject above.
- No red warning glow unless a subject calls for it. Keep the mood neutral and
  observational, not alarming.
- Nothing decorative that does not correspond to a numbered subject.
```

---

## Case B — NordCom Services GmbH (ready to paste)

```
Wide isometric cutaway illustration of a company building, drawn as a clean
corporate infographic for a business e-learning module. Editorial vector style:
flat shapes, thin dark outlines, soft even shading, moderate detail, calm and
businesslike. No cartoon exaggeration, no drama.

FORMAT
Landscape, aspect ratio 16:9, at least 2048 pixels wide.

PALETTE
Pale blue sky with a faint, low-contrast city skyline silhouette behind the
building. Blue-grey glass and white concrete exterior. Interiors in warm white
and light grey with wood and blue-grey furniture. Accent colours used sparingly:
warm red, amber orange, muted brown, slate grey, corporate blue.

LEFT LEGEND COLUMN — reserve the leftmost 15% of the frame
Five horizontal arrows pointing right, stacked vertically, evenly spaced, all the
same size, clear of the building. Top to bottom:
  1. red arrow, white lightning-bolt icon
  2. brown arrow, white stacked-boxes icon
  3. grey arrow, white smokestack icon
  4. orange arrow, white single-person icon
  5. blue arrow, white document icon
Each arrow carries ONE word in white capitals, in this exact spelling:
ENERGY / RESOURCES / EMISSIONS / USE / GOVERNANCE

TITLE — top-left corner, above the arrows
Two lines of black text, nothing else:
  NordCom Services GmbH
  Case Study

THE BUILDING
A mid-size IT services company of about 600 people: a modern four-storey office
with open-plan project floors, glass meeting rooms, a small technical room and a
goods-in bay at street level. Busy but orderly.

ZONE LAYOUT — this is the most important instruction
Arrange the interior as a 3 x 3 grid of open cutaway rooms filling the right 85%
of the frame: three rooms across, three levels down. The rooms must be clearly
separated by walls and floor slabs. Each room holds exactly ONE subject from the
list below. Do not merge two subjects into one room. Do not add extra rooms or
extra activity that is not on this list. Leave clear space at the centre of each
room so a circular marker can sit there without covering anything important.

  TOP LEVEL, left to right:
    1. A SMALL server room: only three or four racks, modestly lit, plainly not a
       large data centre. An electrical meter and a thick power conduit on the
       wall beside the racks, the meter dial clearly in motion.
    2. A cloud shape floating in the sky just outside the building at this level,
       joined to the server room by two thick cables that run in through the
       wall. Some server icons sit inside the cloud and some stay in the room, so
       the workload visibly lives in both places at once.
    3. An executive corner office: two figures at a small round table, a large
       wall planner behind them showing a short bar that stops well before the
       right-hand edge of the planner.

  MIDDLE LEVEL, left to right:
    4. An open-plan project team at a desk cluster, unpacking new laptops from
       their own delivery boxes, with a small delivery van visible outside their
       window.
    5. A DIFFERENT open-plan project team on the same level, in a separate room,
       also unpacking new laptops from delivery boxes of a clearly different
       colour and shape, with a different delivery van outside their own window.
       The two teams are visibly buying separately from each other.
    6. A glass-walled client meeting room: two company figures on one side of the
       table, one visitor in a darker suit on the other side sliding a thick
       document across the table toward them.

  LOWER LEVEL, left to right:
    7. A procurement desk: one figure at a monitor, and beside the keyboard a
       printed form with three tall columns, the first two filled with tick marks
       and the third column completely blank and empty.
    8. A storage room with a wheeled trolley and open shelving holding a dozen
       laptops. Every laptop is open and its screen is glowing, showing the
       devices still work. A stack of flattened cardboard boxes waits beside the
       trolley.
    9. An operations wall: a very large wall-mounted dashboard screen divided into
       six rectangular panels, and every panel is completely blank and empty.
       Pinned on the wall beside it, an organisation chart of connected boxes in
       which the single top box is empty while the boxes below it are filled in.

PEOPLE
Simple generic office figures, mixed genders and ages, business-casual. Small in
frame, no readable faces, no exaggerated expressions. Two or three per occupied
room at most.

MUST NOT
- No text anywhere except the title block and the five arrow words above. No
  speech bubbles, no callout boxes, no signposts, no room name plates, no screen
  text, no document text, no numbers, no logos, no brand marks.
- No environmental cliches: no smoke stacks belching, no wilting plants, no
  globes held in hands, no green leaves sprouting from devices, no recycling
  arrows, no polar bears, no solar panels.
- No red warning glow. Keep the mood neutral and observational, not alarming.
- Nothing decorative that does not correspond to a numbered subject.
```

### How the nine zones map to the case

| # | What is drawn | Fact it carries | Category |
|---|---|---|---|
| 1 | Small server room, meter turning | High electricity consumption in internal IT operations | Energy |
| 2 | Cloud joined to the room by cables | Hybrid IT: small own data centre alongside cloud services | Energy, Emissions |
| 3 | Executive table, short planner bar | Management wants quick results, not symbolic politics | Governance |
| 4 | Team A unpacking its own delivery | Devices procured decentrally | Governance |
| 5 | Team B unpacking a different delivery | ...by several teams independently, with no single buyer | Governance |
| 6 | Visitor sliding a document across | A major customer demands reliable statements | Governance |
| 7 | Form with the third column blank | No sustainability criteria in IT procurement | Governance, Resources |
| 8 | Working laptops boxed for replacement | Devices replaced while still technically usable | Resources, Use |
| 9 | Blank dashboard, empty top box | No Green IT KPIs and no clear responsibility | Governance |

Zone 5 exists only to make "decentralised" visible. One team buying its own
laptops reads as normal; two teams buying differently in the same building is the
actual finding.

Zones 3, 6 and 9 are the three that matter for the answer key — management wants
speed, the customer wants proof, and nobody owns the numbers. The blank dashboard
in zone 9 is the picture of the recommended first step being absent.

---

## Case C — Auron

Same template. Send the Auron case text and the zone list gets written the same
way. Note that Auron is specified as stakeholders plus conditions rather than a
site walk-through, so its nine zones will likely be people and relationships
(who wants what, who can block whom) rather than rooms and equipment — the grid
may become a meeting floor rather than a building section.

---

## After generating

1. Save as `public/assets/nordcom-hero.jpeg` (or `.png`).
2. Tell Claude the filename. The marker coordinates are read off the actual
   generated image — the grid above is what was asked for, not necessarily what
   came back, so positions get measured rather than assumed.
3. Each hotspot also needs an `onTheImage` line describing what is visible at
   that spot, written from the delivered image.

If a zone comes back merged or missing, regenerate rather than compromise: a
marker pointing at nothing is worse than a plainer picture.
