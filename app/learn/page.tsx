import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";

const LEVELS = [
  {
    pill: "L1 · Knowledge",
    slots: [
      { id: "w1", title: "W1 — What Green IT is, and what it is not", note: "Comparator widget: Green IT, Digital Sustainability, ESG, CSR." },
      { id: "w2", title: "W2 — IT as cause and enabler", note: "Six flip cards, each with a cause impact and an enabler impact." },
      { id: "w3", title: "W3 — Category sorter", note: "Ten generic snippets sorted into the five category buckets." },
    ],
  },
  {
    pill: "L2 · Application",
    slots: [
      { id: "w4", title: "W4 — Trade-off dial", note: "Three dials: performance/efficiency, cost/sustainability, quick win/leverage." },
      { id: "w5", title: "W5 — Priority matrix (Impact x Feasibility)", note: "Eight generic initiative cards moved across a 2x2 quadrant." },
      { id: "w6", title: "W6 — Decision under incomplete information", note: "A decision taken with three of five evidence tiles still covered." },
    ],
  },
  {
    pill: "L3 · Management decision",
    slots: [
      { id: "w7", title: "W7 — Governance mini org-chart", note: "Five roles: Board, CTO, Head of IT, Sustainability Officer, Procurement Lead." },
      { id: "w8", title: "W8 — Roadmap sequencer", note: "Six measures placed across Q1–Q4, each with a prerequisite tag." },
      { id: "w9", title: "W9 — Symbolic vs strategic check", note: "Five statements tagged symbolic, operational improvement or strategic decision." },
    ],
  },
];

export default function LearnPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 1"
        title="Learn"
        intro="Nine interactive widgets across three levels. Reveals are on here: widgets teach, so verdicts and category answers are shown freely. All examples are generic — no case company content appears on this tab."
      />

      <div className="space-y-8">
        {LEVELS.map((level) => (
          <section key={level.pill} aria-label={level.pill}>
            <p className="mb-3 inline-block rounded-full bg-lilac px-3 py-1 text-caption font-semibold text-navy">
              {level.pill}
            </p>
            <div className="space-y-3">
              {level.slots.map((slot) => (
                <Placeholder key={slot.id} slotId={slot.id} title={slot.title}>
                  {slot.note}
                </Placeholder>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
