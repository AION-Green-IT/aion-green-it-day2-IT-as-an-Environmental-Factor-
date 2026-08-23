import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { W1Comparator } from "@/components/learn/W1Comparator";
import { W2FlipCards } from "@/components/learn/W2FlipCards";
import { W3Sorter } from "@/components/learn/W3Sorter";
import { CategoryPrimer } from "@/components/learn/CategoryPrimer";
import { StoryL2 } from "@/components/learn/StoryL2";
import { W10ServiceLife } from "@/components/learn/W10ServiceLife";
import { W11Pue } from "@/components/learn/W11Pue";
import { GlossaryReference } from "@/components/ui/GlossaryReference";
import { W4Dials } from "@/components/learn/W4Dials";
import { W5Matrix } from "@/components/learn/W5Matrix";
import { W6Incomplete } from "@/components/learn/W6Incomplete";
import { W7OrgChart } from "@/components/learn/W7OrgChart";
import { W8Roadmap } from "@/components/learn/W8Roadmap";
import { W9Symbolic } from "@/components/learn/W9Symbolic";

// The three levels of the Day 1 curriculum. Objectives are the mentor's
// contract with the room: what a participant can do afterwards.
const LEVELS = [
  {
    id: "l1",
    pill: "L1 · Knowledge",
    summary: "Understand the terms, and place Green IT's strategic relevance",
    objectives: [
      "Understand the vocabulary and the basics of Green IT.",
      "Place why Green IT is strategically relevant for a company.",
      "Distinguish and assess IT's contribution to climate protection.",
    ],
    widgets: (
      <>
        <W1Comparator />
        <W2FlipCards />
        <W10ServiceLife />
        <CategoryPrimer />
        <W3Sorter />
      </>
    ),
  },
  {
    id: "l2",
    pill: "L2 · Application",
    summary: "Find the fields of action, and name the goal conflicts",
    objectives: [
      "Recognise Green IT fields of action inside a company.",
      "Derive a first set of priorities for measures and steering.",
      "Analyse goal conflicts between economics, sustainability and feasibility.",
    ],
    widgets: (
      <>
        <StoryL2 />
        <W4Dials />
        <W11Pue />
        <W5Matrix />
        <W6Incomplete />
      </>
    ),
  },
  {
    id: "l3",
    pill: "L3 · Management decision",
    summary: "Treat Green IT as a steering topic, and decide under uncertainty",
    objectives: [
      "Position Green IT as a leadership and steering topic at company level.",
      "Take responsibility for priorities, governance and decisions under uncertainty.",
    ],
    widgets: (
      <>
        <W7OrgChart />
        <W8Roadmap />
        <W9Symbolic />
      </>
    ),
  },
];

export default function LearnPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader
        eyebrow="Tab 1"
        title="Learn"
        intro="Eleven widgets across three levels. Each one is something to do, not something to read — and each carries a checkable figure from practice rather than a claim. Verdicts are shown here on purpose: this is where you are allowed to be wrong cheaply."
      />

      <p className="mb-6 rounded-2xl border-l-4 border-purple bg-lilac/60 p-4 text-body text-navy">
        <span className="font-semibold">How to use this as a mentor: </span>
        run one level per block. Let the room attempt each widget before you explain
        anything — the widgets are built so that being wrong is the teaching moment. The
        “From the field” notes carry the numbers you will be challenged on, with the
        source next to them.
      </p>

      <Accordion
        defaultOpen="l1"
        items={LEVELS.map((level) => ({
          id: level.id,
          pill: level.pill,
          summary: level.summary,
          content: (
            <>
              <div className="rounded-xl border border-line p-4">
                <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                  After this level, a participant can
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  {level.objectives.map((objective) => (
                    <li key={objective} className="text-body text-ink">
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              {level.widgets}
            </>
          ),
        }))}
      />

      <GlossaryReference />
    </div>
  );
}
