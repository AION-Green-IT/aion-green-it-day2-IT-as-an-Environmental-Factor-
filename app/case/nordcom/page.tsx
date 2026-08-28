import { PageHeader } from "@/components/ui/PageHeader";
import { OpenItems } from "@/components/ui/OpenItems";
import { CaseBoard } from "@/components/case/CaseBoard";
import { NordcomFirstStep } from "@/components/case/NordcomFirstStep";
import {
  BRIEF,
  COMPANY_ZONE,
  CONTEXT,
  HERO_IMAGE,
  HOTSPOTS,
  TASK3,
} from "@/data/nordcom";

export default function NordcomPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 4 · Case B"
        title="NordCom Services GmbH"
        intro="Green IT between cost pressure and competitiveness. The board carries everything: the company block on the left opens the brief, and nine findings — six titled panels and three points on the scene — each carry one passage from the description. The assignment sits below it."
      />

      <CaseBoard
        caseKey="nordcom"
        image={HERO_IMAGE}
        companyZone={COMPANY_ZONE}
        hotspots={HOTSPOTS}
        brief={BRIEF}
        context={CONTEXT}
        contextHeading="At the same time"
        categoryNote="Six of the nine findings tag as Organisation & Governance. That spread is the case: almost nothing here is blocked by technology."
      />

      <div className="mx-auto mt-6 w-full max-w-4xl space-y-4">
        <OpenItems
          only={["nordcom"]}
          title="Findings opened on this board"
          intro="Step 1 asks you to analyse the initial situation from five perspectives. This lists the findings you have not opened yet, so none is missed by accident."
          showLinks={false}
        />

        {/* ---------------- Task 3 ---------------- */}
        <section aria-labelledby="task3-title" className="card p-5 md:p-6">
          <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
            {TASK3.number}
          </p>
          <h2 id="task3-title" className="mb-4 text-h2 text-ink">
            {TASK3.title}
          </h2>

          <p className="mb-5 text-body text-ash">{TASK3.lead}</p>

          <ol className="mb-6 space-y-3">
            {TASK3.assignment.map((step, index) => (
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

          <div className="rounded-2xl border border-line p-4">
            <h3 className="mb-1 text-h3 text-ink">{TASK3.objectiveHeading}</h3>
            <p className="text-body text-ash">{TASK3.objective}</p>
          </div>
        </section>

        <NordcomFirstStep />
      </div>
    </>
  );
}
