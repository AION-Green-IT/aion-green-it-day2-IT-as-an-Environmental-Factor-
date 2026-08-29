# aion-green-it-day2 — IT as an Environmental Factor


## Building the next training day

`MASTER-PROMPT.txt` at the root of this repo is the reusable standard
distilled from this build: architecture, non-negotiable rules, design
tokens, component contracts, the L1/L2/L3 model, the inline-SVG standard,
ready-to-paste image prompts, and a list of every failure this build hit
and how it was fixed.

To start a new day: copy `MASTER-PROMPT.txt` into the new repository,
fill in PART 16 (Curriculum Intake) with that day's material, and hand
the whole file to the assistant. The subject matter is the only variable.

# PROPMT
========================================================================
AION GREEN IT — MODULE 1 PLAYGROUND
Build prompt for Claude Code
========================================================================

You are building the interactive learner playground for AION Green IT
Module 1 ("Green IT as a Lever for Climate Protection and Competitiveness").
This is a static Next.js site. No backend, no auth, no database.
Everything the learner sees or does lives in the app and localStorage.

Read this whole prompt end to end before writing any code. Then produce
the whole project in one pass. Do NOT ask clarifying questions unless a
concrete requirement contradicts itself.

------------------------------------------------------------------------
0. NON-NEGOTIABLES  (violate any of these and the build fails)
------------------------------------------------------------------------

N1. Every fact, hotspot label, category chip, initiative name and
    stakeholder name shipped in this build must appear VERBATIM as
    written in section 6 of this prompt. The worksheets and answer keys
    reference exact on-screen strings. Do not paraphrase, do not "clean
    up", do not translate.

N2. Reveal rules:
    - Tab 1 LEARN: reveals ON (widgets teach; show verdicts freely).
    - Tab 2 TRAINING GROUND: reveals ON (gamified practice with
      before/after cards).
    - Tab 3, 4, 5 CASE tabs: reveals OFF. Never label a fact as "flaw",
      "problem", "issue" or "correct category". Category chips are
      shown as "Topic area" and are neutral tags, not verdicts.

N3. LEARN and TRAINING GROUND never use content from the three graded
    case companies (MediPrint, NordCom, Auron). They use the generic
    practice snippets in section 7. Leaking assessment answers into the
    teach/practice surface is a hard fail.

N4. The five Green IT categories are fixed and must be used everywhere
    with these exact labels and short codes:
       Energy (E)
       Resources (R)
       Emissions (Em)
       Use (U)
       Organisation & Governance (G)
    Do NOT introduce a sixth category. Do NOT use WCAG POUR or any UX
    framework anywhere.

N5. Every worksheet answer must be findable inside this playground.
    Every hotspot, dashboard cell, stakeholder card, initiative panel
    and condition tile has a stable, human-readable id that can be
    referenced by a FIND IT line in a worksheet (e.g.
    #mediprint/server-room, #nordcom/procurement, #auron/stakeholder/board).
    Ids are lowercase kebab-case, stable across deploys.

N6. No backend calls. No third-party analytics. No external image CDNs.
    Illustrations are inline SVG built in-repo. Fonts self-hosted
    (Calibri fallback stack, see section 3).

------------------------------------------------------------------------
1. TECH STACK  (exact)
------------------------------------------------------------------------

- Next.js 14 (App Router), TypeScript strict mode
- Tailwind CSS
- React 18
- Zustand for cross-tab state (XP, badges, streak, hotspot-visited log)
- localStorage persistence (single key: `aion-greenit-m1`)
- No CSS-in-JS libs beyond Tailwind + a small `clsx`/`cva` helper
- Framer Motion allowed for accordion/modal transitions only
- Deploy target: Vercel (Netlify also fine). Static export enabled
  where possible; if a route needs client-only React, use "use client".

Do not add: shadcn/ui, Radix, Chakra, MUI, Redux, tRPC, Supabase,
Firebase, analytics, tracking, cookies.

------------------------------------------------------------------------
2. FILE / ROUTE LAYOUT
------------------------------------------------------------------------

Routes (App Router):
  /                        -> redirects to /learn
  /learn                   -> Tab 1 (accordion L1/L2/L3, widgets)
  /training                -> Tab 2 (gamified practice)
  /case/mediprint          -> Tab 3 (Case A hero — Task 1 & 2 anchor)
  /case/nordcom            -> Tab 4 (Case B dashboard — Task 3 anchor)
  /case/auron              -> Tab 5 (Case C multi-site — Task 4 anchor)
  /task-map                -> Tab 6 (Task -> Case -> Learn map)

Global chrome on every route:
  - Top bar: AION logo (SVG), module title "Module 1 — Green IT as a
    Lever for Climate Protection & Competitiveness", XP counter,
    streak counter, "Reset progress" button (confirms then clears the
    localStorage key).
  - Left rail nav (collapses to top tabs on <768px width): the 6 routes
    above, in that order, with icons.
  - Footer: "AION Green IT · Module 1 · English (executive edition)".

Folder shape:
  /app
    layout.tsx           (chrome + providers)
    page.tsx             (redirect)
    /learn/page.tsx
    /training/page.tsx
    /case/mediprint/page.tsx
    /case/nordcom/page.tsx
    /case/auron/page.tsx
    /task-map/page.tsx
  /components
    /chrome              (TopBar, LeftRail, Footer)
    /learn               (all widgets — one file per widget)
    /training            (RevealCard, XPBar, BadgeShelf)
    /case                (HeroFrame, Hotspot, FactModal, CategoryChip,
                          ConditionTile, InitiativePanel,
                          StakeholderCard, MultiSiteMap, GrowthChart)
    /ui                  (Accordion, Modal, Tabs, Button, Chip, Toggle)
  /data
    categories.ts
    learn.ts             (widget seed data — generic, non-case)
    training.ts          (practice snippets — generic, non-case)
    mediprint.ts         (Case A data — see section 6.A)
    nordcom.ts           (Case B data — see section 6.B)
    auron.ts             (Case C data — see section 6.C)
    task-map.ts
  /lib
    store.ts             (Zustand + localStorage)
    ids.ts               (stable id helpers)
    a11y.ts              (keyboard/focus helpers)
  /styles
    globals.css          (Tailwind base + brand tokens)
  /public
    /svg                 (logo, icons)

------------------------------------------------------------------------
3. BRAND / DESIGN TOKENS
------------------------------------------------------------------------

Colours (Tailwind theme extension):
  navy      #231A45   (primary text, top bar bg)
  purple    #5624D0   (primary action, active nav)
  lilac     #EEE9F9   (surface, accordion bg, chip bg)
  ink       #1B1230   (headings on light)
  ash       #6B6484   (secondary text)
  paper     #FFFFFF   (base)
  line      #D9D3EA   (borders)
  good      #2F9E5A   (only inside LEARN + TRAINING reveals)
  warn      #C0721D   (only inside LEARN + TRAINING reveals)
  danger    #B33A3A   (only inside LEARN + TRAINING reveals)

Category tag colours (used as chip bg + left arrow legend on hero;
neutral in feel, NOT good/bad):
  Energy (E)                     #F1B24A
  Resources (R)                  #6FB56A
  Emissions (Em)                 #6E8DC1
  Use (U)                        #B389D6
  Organisation & Governance (G)  #3F3552

Typography:
  Font stack: "Calibri", "Segoe UI", "Helvetica Neue", Arial, sans-serif
  H1: 32/40 semibold
  H2: 24/32 semibold
  H3: 18/26 semibold
  Body: 16/24 regular
  Caption: 13/18 regular
  Numeric readouts (widget values): tabular-nums, 18/24 semibold

Elevation / radius:
  Cards: bg-paper, border line, rounded-2xl, shadow-sm
  Modals: rounded-2xl, shadow-lg, backdrop rgba(35,26,69,0.55)

Motion:
  200ms ease-out for accordion/modal
  Reduced-motion respected via prefers-reduced-motion

------------------------------------------------------------------------
4. GLOBAL STATE  (Zustand, persisted to `aion-greenit-m1`)
------------------------------------------------------------------------

type Progress = {
  xp: number;
  streak: number;
  badges: string[];              // e.g. ["cat-energy", "cat-governance"]
  visited: {                     // Set-like, string ids
    hotspots: string[];          // "mediprint/server-room" etc.
    learnWidgets: string[];
    trainingCards: string[];
  };
  training: {
    seenCardIds: string[];
    correctByCategory: Record<CategoryCode, number>;
  };
};

Actions: addXp(n), award(badge), markVisited(kind,id),
recordTrainingAnswer(cardId, chosenCategory, correctCategory),
reset().

Rules:
- XP only awarded inside /learn (first-visit per widget) and /training
  (per correctly-sorted card). Case tabs never award XP.
- Streak increments on consecutive correct training answers, resets on
  wrong. Never shown as failure — just a number.

------------------------------------------------------------------------
5. REUSABLE COMPONENTS  (minimum contracts)
------------------------------------------------------------------------

CategoryChip
  props: { code: "E"|"R"|"Em"|"U"|"G"; variant?: "topic"|"answer" }
  In case tabs, always variant="topic" and label reads
  "Topic area: <full name>". In learn/training, variant="answer" is
  allowed and reads "<full name>".

Hotspot
  props: { id, x, y, label, category, factText, contextText? }
  Behaviour: pulse on first mount, tab-focusable, opens FactModal on
  click/Enter/Space. Marks visited on open.

FactModal
  Shows: hotspot label as title, factText verbatim, CategoryChip
  (variant="topic"), optional contextText. NO fix, NO verdict, NO
  "correct answer" language. Close button + Esc.

Accordion
  Controlled, one item open at a time by default (allow multi with prop).
  Level headers show a small pill "L1 · Knowledge" etc.

RevealCard  (training only)
  Front: snippet + 5 category buttons. On pick, flip to back:
  verdict (green / amber / red), what it is, who/what it affects,
  category (variant="answer"), before-after fix.

HeroFrame  (case tabs)
  Left column: 5-arrow category legend (E/R/Em/U/G stacked) — purely
  informative, doesn't filter. Right column: the hero illustration
  or dashboard. Below: "Show all facts as list" toggle -> renders the
  same facts as an ordered accessible list with the same ids and chips.

------------------------------------------------------------------------
6. CASE DATA  (verbatim — do not edit)
------------------------------------------------------------------------

========================================================================
6.A  MEDIPRINT SOLUTIONS   route: /case/mediprint
     Anchors: Worksheet 1 (Task 1) and Worksheet 2 (Task 2)
========================================================================

Company brief (shown in the left panel above the category legend):
  MediPrint Solutions
  280 employees, two sites, own server room, device renewal every
  three years, high volume of printing, growing cloud use, no
  sustainability strategy in IT.

Context conditions (shown as a small "Context" tile group under the
brief — NOT category-tagged, NOT hotspots):
  ctx-elec-rising     "Electricity costs are rising significantly."
  ctx-mgmt-asking     "Management is asking for the first time about
                       IT's contribution to sustainability."
  ctx-projects-fnspd  "IT projects are assessed only in terms of
                       functionality and speed."

(Note: ctx-projects-fnspd doubles as a governance signal but is placed
in context to keep the hotspot set clean; it re-appears as a Governance
hotspot below — see hs-project-lens. Do not deduplicate; both surfaces
show it.)

Hero illustration:
  Isometric cutaway of a two-storey office building with a small
  attached server room, a print room, a basement storage, an open-plan
  workspace with desktops, a boardroom, a procurement desk, a cloud
  icon floating above the building, and an electricity meter on the
  outside wall. Build this as inline SVG in /components/case/HeroMediprint.tsx.

Hotspots (8) — id, on-screen label, category, verbatim fact:

hs-server-room
  Label:    "Server room"
  Category: Energy (E)
  Fact:     "Own server room on site. Runs continuously; cooling and
             uptime are the operational priority."

hs-elec-meter
  Label:    "Electricity meter"
  Category: Energy (E)
  Fact:     "Electricity costs are rising significantly."

hs-cloud
  Label:    "Cloud services"
  Category: Energy (E)
  Fact:     "Growing cloud use. Compute and storage are shifting to
             external providers whose energy mix is not tracked here."
  Secondary chip: Emissions (Em)   (render both chips)

hs-devices-3yr
  Label:    "Workplace devices"
  Category: Resources (R)
  Fact:     "Regular device renewal every three years across the
             workforce."

hs-basement
  Label:    "Basement storage"
  Category: Resources (R)
  Fact:     "Many old devices are stored unused in the basement."

hs-print
  Label:    "Print area"
  Category: Resources (R)
  Fact:     "High volume of printing."
  Secondary chip: Emissions (Em)

hs-procurement
  Label:    "Procurement desk"
  Category: Organisation & Governance (G)
  Fact:     "There are no rules for procurement or device service life."

hs-boardroom
  Label:    "Boardroom"
  Category: Organisation & Governance (G)
  Fact:     "No sustainability strategy in IT."

hs-project-lens
  Label:    "Project intake board"
  Category: Organisation & Governance (G)
  Fact:     "IT projects are assessed only in terms of functionality
             and speed."

--- Task-2 support panels on the SAME MediPrint page ---

Below the hero, render two additional read-only panels:

Panel: "Three initiatives on the table"
  Renders three InitiativePanel components. Buttons on each open a
  modal with the verbatim text. NO ranking, NO recommendation shown.

  init-A
    Title: "Initiative A — New devices"
    Body:  "Replacing all workplace devices with new energy-efficient
            models."

  init-B
    Title: "Initiative B — Rules for devices & procurement"
    Body:  "Introducing rules for device service life, reuse and
            sustainable procurement."

  init-C
    Title: "Initiative C — Green IT steering committee"
    Body:  "Establishing a Green IT steering committee with metrics,
            responsibilities and targets."

Panel: "General conditions"  (5 ConditionTile items, non-category)
  cond-budget        "The budget is limited."
  cond-data          "The data situation regarding energy consumption
                      is incomplete."
  cond-board         "The board demands results that are visible in
                      the short term."
  cond-capacity      "The IT department's staff capacity is heavily
                      utilised."
  cond-purchasing    "Purchasing is sceptical about new requirements."

Distinguish visually: hotspots on the hero = clickable pulsing dots.
Initiatives = card buttons. Conditions = flat pills. All three surfaces
share the same "Show all as list" toggle behaviour.

========================================================================
6.B  NORDCOM SERVICES GMBH   route: /case/nordcom
     Anchor: Task 3
========================================================================

Company brief (left panel):
  NordCom Services GmbH
  Medium-sized IT service provider, 600 employees. Operates hybrid IT
  structures, uses cloud services, runs a small internal data centre,
  procures end devices in a decentralised way. Customer sustainability
  requirements are rising. Cost pressure, supply bottlenecks, heavy
  project workload.

Hero pattern: a 5-tab dashboard (Tabs component), tab order fixed:
  1. Operations
  2. Procurement
  3. Use
  4. Governance
  5. Customer & Competitiveness

Each tab shows 1–3 fact tiles. Each tile has:
  id, tab (perspective), title, verbatim fact, CategoryChip(variant="topic").

The dashboard is intentionally aligned to the Task 3 answer table's
"Perspective" column so a learner working on Task 3 can move tab by tab.

Operations tab:
  op-electricity
    Title:    "Electricity in internal IT operations"
    Fact:     "High electricity consumption in internal IT operations."
    Category: Energy (E)
  op-hybrid
    Title:    "Hybrid IT footprint"
    Fact:     "Operates hybrid IT structures with a small internal
               data centre alongside cloud services."
    Category: Energy (E)
    Secondary: Emissions (Em)

Procurement tab:
  pr-decentralised
    Title:    "Decentralised procurement"
    Fact:     "End devices are procured in a decentralised way."
    Category: Organisation & Governance (G)
  pr-no-criteria
    Title:    "No sustainability criteria in procurement"
    Fact:     "Sustainability criteria are missing in IT procurement."
    Category: Organisation & Governance (G)

Use tab:
  us-early-replace
    Title:    "Early device replacement"
    Fact:     "End devices are frequently replaced although they would
               still be technically usable."
    Category: Resources (R)
    Secondary: Use (U)

Governance tab:
  gv-no-kpi
    Title:    "No Green IT KPIs"
    Fact:     "There are no Green IT KPIs and no clear responsibilities."
    Category: Organisation & Governance (G)

Customer & Competitiveness tab:
  cc-major-customer
    Title:    "Major customer request"
    Fact:     "A major customer demands robust statements on IT's
               contribution to sustainability."
    Category: Organisation & Governance (G)
  cc-market-request
    Title:    "Rising market expectations"
    Fact:     "On the customer side, requirements for evidence of
               sustainability are increasing."
    Category: Organisation & Governance (G)

Context strip along the bottom (non-category, non-hotspot):
  nc-cost-pressure   "Cost pressure and supply bottlenecks."
  nc-project-load    "Heavy project workload."
  nc-mgmt-tone       "Management wants quick results, but no symbolic
                      politics."

========================================================================
6.C  AURON DIGITAL GROUP   route: /case/auron
     Anchor: Task 4
========================================================================

Company brief (left panel):
  Auron Digital Group
  Strongly growing company with several sites, rising energy costs, an
  inconsistent IT landscape, increasing pressure from customers and
  supervisory bodies to address sustainability in a comprehensible way.

Hero (lighter than the other two — the case is deliberately thin on
hard facts):

  Element 1: Multi-site map
    A stylised map with 4 site markers labelled Site A, Site B,
    Site C, Site D (visual only; do not invent locations). One marker
    (Site A) shows a small "HQ" tag.

  Element 2: Growth chart
    Simple upward line/area chart with a "revenue (index)" y-axis and
    5 labelled year points. Purely illustrative; no numbers referenced
    by any worksheet.

  Element 3: General conditions strip
    Flat pills (non-category, non-hotspot):
      gc-growth        "A strongly growing business model."
      gc-interests     "Differing interests of IT, purchasing, finance
                        and management."
      gc-data          "The data situation is incomplete."
      gc-budget        "The budget is limited."
      gc-time          "Time pressure from market requirements and
                        reporting obligations."
      gc-quickwin      "A desire for quick wins, but the danger of
                        symbolic individual actions."

  Element 4: Stakeholder cards (6)
    StakeholderCard components in a 3x2 grid. Each opens a modal.
    Fields: role, interest, constraint. Verbatim below:

    sh-it
      Role:       "IT"
      Interest:   "Consolidate an inconsistent IT landscape and manage
                   rising energy costs across sites."
      Constraint: "Incomplete data, limited budget, competing project
                   demand."

    sh-purchasing
      Role:       "Purchasing"
      Interest:   "Predictable supplier terms and unit prices."
      Constraint: "New sustainability requirements arrive without extra
                   staff or authority."

    sh-finance
      Role:       "Finance"
      Interest:   "Cash discipline, avoidance of stranded assets, clear
                   payback on any Green IT investment."
      Constraint: "Business growth is consuming capital; visible short-
                   term results are demanded."

    sh-board
      Role:       "Board"
      Interest:   "Sustain growth while showing credible sustainability
                   progress to markets."
      Constraint: "Wants quick wins without falling into symbolic
                   individual actions."

    sh-regulator
      Role:       "Regulator / supervisory bodies"
      Interest:   "Comprehensible, comparable sustainability reporting."
      Constraint: "Reporting obligations arrive on a fixed schedule
                   regardless of the company's data readiness."

    sh-customer
      Role:       "Customer"
      Interest:   "Evidence that suppliers' IT is addressing
                   sustainability in a comprehensible way."
      Constraint: "Requests are becoming a condition of continued
                   business, not a nice-to-have."

------------------------------------------------------------------------
7. LEARN TAB  (route /learn)  — widgets and content
------------------------------------------------------------------------

Layout: single-column, three accordion sections. Each section header
carries a level pill: "L1 · Knowledge", "L2 · Application", "L3 ·
Management decision". Only one open at a time by default.

Every widget is INTERACTIVE FIRST. Text bullets are captions under the
widget, not the primary content. Every widget uses generic examples,
never MediPrint / NordCom / Auron content.

--- L1 · Knowledge ---

W1  "What Green IT is — and what it is not"
    Comparator widget: 4 side-by-side cards (Green IT, Digital
    Sustainability, ESG, CSR). Click a card to expand its one-line
    definition and one-line boundary ("This is where Green IT stops
    and ESG begins."). No quiz. Marks visited on any card open.

W2  "IT as cause and enabler"
    Flip-card widget with 6 cards. Front: a generic IT phenomenon
    (e.g. "video conferencing", "AI training run", "smart building
    controls"). Back: two rows — Cause impact (energy/resources/
    emissions/e-waste) and Enabler impact (what it lets the business
    avoid). Learner flips all 6 to complete.

W3  "Category sorter"
    Drag-and-drop 10 generic snippets into the 5 category buckets
    (E/R/Em/U/G). Immediate green/red on drop, streak awarded per
    correct. Snippets in section 7.1.

--- L2 · Application ---

W4  "Trade-off dial"
    Three separate radial dials on one card:
      Dial A: Performance <-> Energy efficiency
      Dial B: Cost <-> Sustainability
      Dial C: Quick win <-> Strategic leverage
    Each dial shows a live readout describing the current position
    (e.g. "Dial A at 30% -> maximise performance; efficiency is the
    residual"). No 'right answer'. Widget teaches that every dial has
    a price on both ends. Marks visited when all three dials are
    moved at least once.

W5  "Priority matrix (Impact x Feasibility)"
    A 2x2 quadrant. 8 generic initiative cards are placed by default
    in one quadrant; learner drags them into the correct quadrant
    they judge. There's no scoring — the widget shows a small
    consequence line for each quadrant ("high impact / low
    feasibility -> requires leadership sponsorship or it dies"). This
    is preparation for Worksheet 2's ranking.

W6  "Decision under incomplete information"
    Widget: a decision has to be taken with 3 of 5 evidence tiles
    covered. Learner picks an option; the covered tiles then flip
    open and show what they would have changed. Message: "Deferring
    the decision until all tiles are open is itself a decision —
    priced in time." No scoring.

--- L3 · Management decision ---

W7  "Governance mini org-chart"
    Interactive org chart with 5 nodes: Board, CTO, Head of IT,
    Sustainability Officer, Procurement Lead. Click a node to see:
    - what this role can decide alone
    - what it must escalate
    - what it cannot delegate
    Small edge labels show accountability flows. No scoring.

W8  "Roadmap sequencer"
    12-month strip divided into Q1/Q2/Q3/Q4. Learner drags 6 generic
    Green IT measures onto the strip. Each measure has a "requires"
    tag (e.g. "requires: baseline data") and the widget shows a
    warning if a measure is placed before its prerequisite. Teaches
    ordering, not correctness.

W9  "Symbolic vs strategic check"
    Learner reads 5 short generic press-release-style statements and
    tags each as "Symbolic", "Operational improvement" or "Strategic
    decision". Reveal explains why. This is the L3 training wheel.

7.1  Category sorter (W3) — the 10 generic snippets and their answers:

  1. "A finance team's monthly report is printed on paper and archived
     in binders."                                        -> Resources
  2. "The office lights, screens and desktops are left on over the
     weekend."                                           -> Energy
  3. "A vendor is chosen on price alone; no environmental criteria
     enter the evaluation."                              -> Organisation & Governance
  4. "A company runs its dev/test workloads on a cloud region powered
     largely by coal."                                   -> Emissions
  5. "Colleagues stream 4K video calls when audio-only would do."      -> Use
  6. "Old laptops are stockpiled in a cupboard instead of being reused
     or refurbished."                                    -> Resources
  7. "The server room is over-cooled: the setpoint is 18 C when
     22 C would be safe."                                -> Energy
  8. "There is no owner in the org chart for Green IT metrics."        -> Organisation & Governance
  9. "A team keeps a dashboard open on 12 wall-mounted screens 24/7
     when only one is watched."                          -> Use
 10. "The corporate travel policy defaults to flights for meetings
     that could be video calls."                         -> Emissions

------------------------------------------------------------------------
8. TRAINING GROUND  (route /training)
------------------------------------------------------------------------

Layout: XP bar top, current streak, category badge shelf on the right
(5 badges — one per category, greys out until 3 correct in that
category). Centre: a stack of RevealCard components, one shown at a
time. "Next" button after reveal.

Content: 15 practice snippets from GENERIC or invented companies that
are NOT MediPrint/NordCom/Auron. Below is the seed set. Add more only
if needed for pacing; never take from case data.

RevealCard fields per item:
  id, snippet, correctCategory (E/R/Em/U/G), verdict (green/amber/red),
  what_it_is (one line), who_it_affects (one line),
  short_fix ("Before: ... / After: ...")

Seed 15:

t01 (E, amber)
  "GreenLog Freight leaves its office HVAC running through weekends
   'because nobody wanted to change the schedule'."
  what: "Standing energy draw with no user benefit."
  who: "Facilities and IT share responsibility; nobody owns it."
  fix: "Before: 24/7 HVAC. After: scheduled setback + a named owner."

t02 (R, red)
  "Kestrel Retail throws working 4-year-old laptops in the skip during
   an office move."
  what: "Embedded carbon and materials discarded early."
  who: "Finance (write-off), IT (disposal), sustainability report."
  fix: "Before: disposal. After: refurbish -> secondary use / donation."

t03 (Em, red)
  "Novara Analytics trains a large model in a coal-heavy region because
   it is 12% cheaper."
  what: "Compute-driven emissions inflated by grid mix."
  who: "Data science team, cloud FinOps, sustainability reporting."
  fix: "Before: cost-only region choice. After: region choice weighted
        for carbon intensity."

t04 (U, amber)
  "Halden Group teams routinely default to 4K video and screen-share
   in every internal call."
  what: "Bandwidth and endpoint energy up with no meeting benefit."
  who: "Every user; IT sets defaults."
  fix: "Before: 4K default. After: 720p default, HD on request."

t05 (G, red)
  "Ferronova has bought a Green IT dashboard but nobody is accountable
   for its numbers."
  what: "Tool without ownership -> metrics ignored."
  who: "Board / CIO / would-be sustainability lead."
  fix: "Before: unowned tool. After: named owner + monthly review."

t06 (E, green)
  "Marlin Bank raises its data-hall setpoint from 20 C to 24 C after
   a thermal survey."
  what: "Cooling load cut with no reliability trade-off."
  who: "Facilities + IT ops."
  fix: "Kept. Publish the setpoint and thermal survey annually."

t07 (R, amber)
  "Otterbrook Insurance keeps a stockroom of 3-year-old monitors
   'in case'."
  what: "Dormant capital and dormant embedded carbon."
  who: "IT asset management."
  fix: "Before: hoard. After: reuse in training rooms / donate."

t08 (Em, amber)
  "Salix Media flies 8 people to a 2-hour internal review each month."
  what: "Avoidable travel emissions."
  who: "Business unit, travel policy owner."
  fix: "Before: monthly flight. After: quarterly in-person + monthly
        remote."

t09 (U, red)
  "Delton Manufacturing keeps 40 shopfloor screens streaming a
   dashboard 24/7 that only day-shift supervisors read."
  what: "Always-on display for a part-time audience."
  who: "Ops / IT."
  fix: "Before: 24/7. After: scheduled on during shifts + motion off."

t10 (G, amber)
  "Astra Freight has a sustainability strategy but IT is not in it."
  what: "Strategy without IT scope = blind spot."
  who: "Board, CSO, CIO."
  fix: "Before: IT absent. After: IT written into scope + KPIs."

t11 (E, amber)
  "Cormorant Health's monitors and desktops stay powered on overnight
   across 6 sites."
  what: "Standing endpoint draw."
  who: "IT policy, users."
  fix: "Before: no power policy. After: enforced sleep + wake-on-LAN
        for updates."

t12 (R, red)
  "Vibrant Foods replaces all warehouse handheld scanners every year
   under the vendor's default contract."
  what: "Contract-driven, not need-driven refresh."
  who: "Procurement + operations."
  fix: "Before: annual swap. After: condition-based swap + 3-year
        contract."

t13 (Em, green)
  "Northlake Utilities moves batch reports to run overnight during
   off-peak, lower-carbon hours."
  what: "Load-shift with a carbon benefit."
  who: "Data platform team + sustainability."
  fix: "Kept. Publish the runtime shift and the intensity delta."

t14 (U, amber)
  "Bracken Legal saves every draft, revision and email attachment on
   three redundant file shares."
  what: "Storage sprawl driving avoidable capacity."
  who: "IT + records management."
  fix: "Before: 3x redundancy by default. After: retention policy +
        single canonical store."

t15 (G, red)
  "Zephyr Retail's board declares 'net zero IT by 2030' with no
   baseline, no owner, and no budget."
  what: "Announcement without architecture."
  who: "Board, CIO."
  fix: "Before: press release. After: baseline + owner + budget +
        milestones."

------------------------------------------------------------------------
9. TASK MAP  (route /task-map)
------------------------------------------------------------------------

Static table + a small clickable legend. Rows:

  Worksheet 1 (L1 objective)
    Case: /case/mediprint (hero hotspots + context)
    Learn support: W1, W3 (definitions + category sorter)

  Worksheet 2 (L1 objective + judged)
    Case: /case/mediprint (initiative panels + conditions)
    Learn support: W5 (priority matrix), W6 (incomplete information)

  Task 3 (L2)
    Case: /case/nordcom (5-tab dashboard)
    Learn support: W4 (trade-off dial), W5 (matrix), W6 (incomplete info)

  Task 4 (L3)
    Case: /case/auron (stakeholders + conditions)
    Learn support: W7 (governance chart), W8 (roadmap), W9 (symbolic
    vs strategic)

Each row has a "Open case" and "Open learn support" set of links.

------------------------------------------------------------------------
10. INTERACTION & COPY RULES  (please re-read after coding)
------------------------------------------------------------------------

R1. In case tabs, the words "problem", "flaw", "issue", "correct",
    "wrong", "improvement" MUST NOT appear anywhere. Neutral words:
    "fact", "observation", "topic area", "condition", "role",
    "interest", "constraint".

R2. In case tabs, do NOT show which category is the "right" answer.
    The category chip is a topic tag. If a fact has a secondary chip,
    show both without ranking them.

R3. In LEARN and TRAINING, verdicts and category answers are allowed
    and expected. Use `variant="answer"` on CategoryChip.

R4. Every clickable surface has:
    - visible focus ring (2px purple)
    - accessible name matching the on-screen label
    - hover state that does not rely on colour alone

R5. Every modal is dismissable by Esc, backdrop click, and a visible
    Close button. Focus is trapped while open and restored on close.

R6. "Show all facts as list" toggle on each case tab renders the same
    ids, labels, facts and chips as the hero, in DOM order matching
    the id order in section 6. Screen readers get the same content
    without needing to navigate the SVG.

R7. Nothing on any case tab suggests an action ("you should...",
    "consider...", "recommended..."). Case tabs are observation
    surfaces only.

R8. Do not add tooltips that reveal category answers on hover in the
    case tabs.

------------------------------------------------------------------------
11. ACCESSIBILITY MINIMUMS
------------------------------------------------------------------------

- Colour contrast: body text >= 4.5:1 against paper; chip text >= 4.5:1
  against its chip bg.
- Full keyboard operability for all widgets (drag-and-drop widgets need
  a keyboard fallback: focus a snippet, press 1-5 to assign to a
  category bucket).
- prefers-reduced-motion disables the hotspot pulse and Framer
  transitions.
- All SVG hero elements have aria-labels; the hero SVG has
  role="img" and an aria-labelledby pointing at a hidden description.
- Language attribute on <html> is "en".

------------------------------------------------------------------------
12. EXPLICIT DO-NOT LIST
------------------------------------------------------------------------

- Do NOT invent extra hotspots, roles, initiatives, stakeholders, or
  facts. Only what is in section 6 ships.
- Do NOT translate any string. English only.
- Do NOT show numeric CO2 estimates, kWh figures or currency amounts
  anywhere. This module is pre-metric.
- Do NOT add a "score" screen, a "pass/fail" screen, or a certificate.
- Do NOT show the learner which category is "correct" on any case tab.
- Do NOT add a chatbot, AI helper or generative-anything.
- Do NOT persist to any cloud store. localStorage only.
- Do NOT bring in shadcn/ui or any component library — the design
  system is small enough to build from Tailwind primitives.
- Do NOT add sample answers, model solutions or worksheet hints inside
  the app.

------------------------------------------------------------------------
13. ACCEPTANCE CHECKLIST  (self-verify before you say "done")
------------------------------------------------------------------------

[ ] `pnpm dev` runs with no console errors on /learn, /training,
    /case/mediprint, /case/nordcom, /case/auron, /task-map.
[ ] Every hotspot, initiative, condition, tab tile and stakeholder
    card in section 6 renders with the exact id and exact wording.
[ ] Category chips in case tabs read "Topic area: <name>" and never
    "correct" / "answer".
[ ] Case tabs contain zero good/warn/danger colours.
[ ] LEARN and TRAINING never reference MediPrint, NordCom, or Auron
    by name or content.
[ ] All widgets are operable with keyboard alone.
[ ] "Show all facts as list" toggle on each case tab renders the same
    ids and content as the hero.
[ ] Reset progress clears XP, streak, badges and visited log.
[ ] Static build passes: `pnpm build` succeeds.
[ ] README.md documents: routes, id conventions (for worksheet FIND
    IT lines), and how to add a learn widget.

------------------------------------------------------------------------
14. HAND-OFF NOTE (for the worksheet author, not for you)
------------------------------------------------------------------------

Worksheets will reference on-screen strings via FIND IT lines shaped
like:

  FIND IT: /case/mediprint -> hotspot "Server room" (id: hs-server-room)

So the ids in section 6 are a contract. If a build decision forces an
id change, list every renamed id in README.md under "ID changes".

========================================================================
END OF BUILD PROMPT
========================================================================

------------------------------------------------------------------------
L2 SCENARIO — MERIDIAN LOGISTICS
------------------------------------------------------------------------

Added by a follow-up build prompt. Additive: no existing route was changed.

Route:      /scenario/meridian
Nav:        LeftRail entry 6 of 7, between /case/auron and /task-map
Data:       /data/meridian.ts  (artifact ids in MERIDIAN_ARTIFACT_IDS)
Types:      /lib/types.ts      (Phase, EndingId, MeridianState, signal model)
Components: /components/scenario/
Store:      progress.scenario.meridian, persisted in the existing
            `aion-greenit-m1` key. Cleared by the TopBar "Reset progress".

Phases:  p1, p2, p3, p4, debrief
Choices: p1-a..p1-d, p2-a..p2-d, p3-a..p3-d, p4-a..p4-d
Endings: photo-op-trap, slow-burn, overreach, missed-opportunity,
         governance-win, quiet-drift

Signal model (computeSignals / computeEnding in /lib/types.ts):

  VISIBILITY  +1 p1-b, +1 p2-b, +2 p3-a
  DEPTH       +1 p1-a, +1 p2-a or p2-c, +1 p3-b
  GOVERNANCE  +1 p1-c, +1 p2-d, +1 p4-b
  SOLOISM     +2 p4-a, +1 p4-c
  DEFERRAL    +1 p1-d, +1 p3-c, +1 p4-d
  REFRAME     +2 p3-d, +1 p4-b

  1. VISIBILITY >= 3 and DEPTH <= 1        -> photo-op-trap
  2. DEFERRAL >= 2                          -> quiet-drift
  3. VISIBILITY == 2 and p3-a               -> overreach
  4. DEPTH >= 2 and week >= 11 and p3-b     -> slow-burn
  5. GOVERNANCE >= 2, or REFRAME >= 2 and SOLOISM == 0
                                            -> governance-win
  6. fallback                               -> missed-opportunity

All six endings verified reachable across the 256 choice paths.

This scenario awards no XP and does not gate progress anywhere.

Briefings are a picture and three questions
  `BriefingVisual` draws the frame for each phase — the twelve-week bar showing
  what a first move consumes, the impact/feasibility/visibility triangle, the
  gap between what can be evidenced and what could be claimed, and the
  one-owner-to-shared axis with expertise and authority as separate supplies.
  None of them plots or ranks an option; they teach the shape of the question.

  Each question then opens to what a good answer sounds like, which is the
  interactive half. Keep both halves free of anything that names an option —
  that is the line the whole scenario runs on.

Teaching before deciding
  Each phase carries a `briefing`: one line on what the phase is really asking,
  three questions to ask before choosing, and a "read more" dialog with the
  fuller reasoning plus external reading drawn from data/sources.ts. It teaches
  the pattern, never the option — no briefing names a choice or ranks one.

What is previewed before a commit, and what is not
  The confirm bar shows the budget arithmetic and which stakeholders have a
  stake in the option. Both are knowable in advance in real life.

  It deliberately does NOT preview mood changes. Showing "Sabine will turn
  hostile" before the pick would turn a decision under uncertainty into a puzzle
  with the answers printed on it, which is the one thing this scenario exists to
  avoid. The bar says so in as many words: "How they react is not knowable yet."
  Keep that line if you extend the preview.

Choosing is two steps
  Clicking a card selects it; a confirm bar then commits. Selecting changes
  nothing — the week, the budget and the moods only move on commit, and the bar
  says so. NS4 still holds: after committing there is no undo, which is exactly
  why the pause before it exists.

Inbox
  Everything that arrives — mail, messages, memos, meeting invitations and
  documents — goes to the Inbox with an unread count, rather than into the
  narrative scroll. Phase openers (the footprint dashboard, the draft slide, the
  org chart) stay in the phase, because they are the material the decision is
  made on rather than something that arrived. Keep that split if you add
  artifacts.

Hidden ending
  `quiet-architect` is checked before every other rule and needs depth >= 2,
  governance >= 2, soloism 0 and under EUR100k spent. Exactly two of the 256
  paths qualify: p1-c/p2-a/p3-b/p4-b and p1-c/p2-c/p3-b/p4-b. It is never hinted
  at when it is not earned.

Reading length
  Nothing long sits open by default. `Collapsible` folds reference text behind a
  line that says what is inside: the inherited-estate list on the company plate,
  and every phase once it has been answered. A settled phase collapses to its
  heading plus "You chose: <title>" and reopens for review with its cards still
  locked. If you add copy to this scenario and it runs past a few lines, fold it
  the same way rather than letting the page grow.

Stakeholders
  Each of the four carries wants / controls / why in STAKEHOLDERS, revealed by
  selecting the name in the HUD. This is character context, not evaluation —
  it says what a person is pushing for and what lever they hold, never whether
  a choice was good. Keep it that way if you extend it: the HUD is a phase
  surface and NS3 applies to it.

ID changes
  None. All ids are as specified in the scenario build prompt.

Deviations from the scenario build prompt
  - Framer Motion is NOT used. It is not a dependency of this repo and the
    prompt forbids adding dependencies, so the artifact enter animation is a
    CSS keyframe (`artifactIn`) applied through Tailwind's `motion-safe:`
    variant. prefers-reduced-motion therefore disables it, as required.
  - Elena is referred to by first name and role only; the prompt names no
    surname for her and forbids inventing beyond section 6.
