import { PageHeader } from "@/components/ui/PageHeader";
import { OpenItems } from "@/components/ui/OpenItems";
import { CaseBoard } from "@/components/case/CaseBoard";
import { AuronAllocation } from "@/components/case/AuronAllocation";
import {
  BRIEF,
  COMPANY_ZONE,
  CONTEXT,
  DELIVERABLE,
  HERO_IMAGE,
  HOTSPOTS,
  TASK4,
} from "@/data/auron";

export default function AuronPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 5 · Case C"
        title="Artemis Digital Industries"
        intro="Developing a management proposal for reducing energy and resource consumption. You are the head of IT strategy / CIO advisor. The board carries ten findings — six titled panels holding the conditions your decision has to survive, and four points on the company scene holding the state of the IT itself."
      />

      <CaseBoard
        caseKey="auron"
        image={HERO_IMAGE}
        companyZone={COMPANY_ZONE}
        hotspots={HOTSPOTS}
        brief={BRIEF}
        context={CONTEXT}
        contextHeading="Your position"
        categoryNote="At this level the findings cut across the five areas rather than sitting inside one. That is the point: management is above the areas and decides how they trade off."
      />

      <div className="mx-auto mt-6 w-full max-w-4xl space-y-4">
        <OpenItems
          only={["auron"]}
          title="Findings opened on this board"
          intro="Every condition below constrains the proposal you are about to write. This lists the ones you have not opened yet."
          showLinks={false}
        />

        {/* ---------------- Task 4 ---------------- */}
        <section aria-labelledby="task4-title" className="card p-5 md:p-6">
          <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
            {TASK4.number}
          </p>
          <h2 id="task4-title" className="mb-2 text-h2 text-ink">
            {TASK4.title}
          </h2>

          <p className="mb-4 text-body text-ash">{TASK4.lead}</p>

          <div className="mb-6 rounded-2xl border border-purple/40 bg-lilac/50 p-4">
            <h3 className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
              What you deliver
            </h3>
            <p className="text-body font-semibold text-ink">{DELIVERABLE}</p>
          </div>

          <ol className="mb-6 space-y-3">
            {TASK4.assignment.map((step, index) => (
              <li key={step.id} className="rounded-2xl bg-lilac/60 p-4">
                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-caption font-semibold text-paper">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-body font-semibold text-ink">{step.text}</p>
                    <p className="mt-1 text-caption text-ash">{step.hint}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mb-4 rounded-2xl border-2 border-navy p-4">
            <h3 className="mb-1 text-h3 text-ink">{TASK4.seniorHeading}</h3>
            <p className="text-body text-ink">{TASK4.senior}</p>
          </div>

          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-2 text-h3 text-ink">{TASK4.objectiveHeading}</h3>
            <ul className="space-y-1">
              {TASK4.objectives.map((objective) => (
                <li key={objective} className="flex gap-2 text-body text-ash">
                  <span aria-hidden="true" className="text-purple">
                    &middot;
                  </span>
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AuronAllocation />
      </div>
    </>
  );
}
