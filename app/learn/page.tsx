import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { W1Comparator } from "@/components/learn/W1Comparator";
import { W2FlipCards } from "@/components/learn/W2FlipCards";
import { W3Sorter } from "@/components/learn/W3Sorter";
import { CategoryPrimer } from "@/components/learn/CategoryPrimer";
import { MeridianScenario } from "@/components/scenario/MeridianScenario";
import { W10ServiceLife } from "@/components/learn/W10ServiceLife";
import { GlossaryReference } from "@/components/ui/GlossaryReference";
import { W7OrgChart } from "@/components/learn/W7OrgChart";
import { W8Roadmap } from "@/components/learn/W8Roadmap";
import { W9Symbolic } from "@/components/learn/W9Symbolic";

// The three levels of the Day 2 curriculum. Objectives are the promise to the
// learner: what you can do after working through this level.
const LEVELS = [
  {
    id: "l1",
    pill: "L1 · Knowledge",
    summary: "Understand where IT's energy and resources go, and why it is strategic",
    objectives: [
      "Understand the energy consumption of IT systems as an environmental and cost factor.",
      "Distinguish direct from indirect energy, and energy from resource consumption.",
      "Place resource consumption across the whole life cycle, not the usage phase alone.",
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
    summary: "Find the drivers, weigh the levers, name the goal conflicts",
    objectives: [
      "Analyse the typical drivers of energy and resource consumption in an IT estate.",
      "Identify levers for reduction and assess first measures under economic and organisational conditions.",
      "Weigh the goal conflicts between performance, availability, cost and resource conservation.",
    ],
    widgets: (
      <MeridianScenario layout="inline" />
    ),
  },
  {
    id: "l3",
    pill: "L3 · Management decision",
    summary: "Treat energy and resources as a steering topic, and decide under uncertainty",
    objectives: [
      "Treat energy and resource consumption as management parameters for investment, procurement, architecture and operations.",
      "Take responsibility for priorities and trade-offs, and decide under incomplete data.",
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
        intro="Seven hands-on widgets and a case study, across three levels. Each one is something to do, not something to read — and each carries a checkable figure from practice rather than a claim. Verdicts are shown here on purpose: this is where you are allowed to be wrong cheaply."
      />

      <p className="mb-6 rounded-2xl border-l-4 border-purple bg-lilac/60 p-4 text-body text-navy">
        <span className="font-semibold">How to use this: </span>
        work top to bottom, one level at a time, and try each activity before you read
        the explanation — getting it wrong first is the fastest way to remember it. Every
        activity opens with a <span className="font-semibold">“What&apos;s in it for you”</span> line
        so you know why it is worth your time, and the “From the field” notes give you a
        real figure and its source you can rely on.
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
                  After this level, you can
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
