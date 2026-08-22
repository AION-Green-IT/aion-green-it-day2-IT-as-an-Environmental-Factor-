import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { CaseScaffold } from "@/components/case/CaseScaffold";
import { CompanyBrief } from "@/components/case/CompanyBrief";
import { MediprintCase } from "@/components/case/MediprintCase";
import { BRIEF, CONTEXT } from "@/data/mediprint";

export default function MediprintPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 3 · Case A"
        title="MediPrint Solutions"
        intro="An observation surface. Nine markers sit on the illustration; each carries one passage from the company description and a neutral topic area. The work assignment sits below the illustration."
      />

      <CaseScaffold
        brief={
          <>
            <CompanyBrief name={BRIEF.name} lines={BRIEF.lines} />
            <div className="card p-4">
              <h2 className="mb-3 text-h3 text-ink">Context</h2>
              <ul className="space-y-2">
                {CONTEXT.map((tile) => (
                  <li
                    key={tile.id}
                    id={tile.id}
                    className="rounded-xl bg-lilac px-3 py-2 text-caption text-navy"
                  >
                    {tile.text}
                  </li>
                ))}
              </ul>
            </div>
          </>
        }
      >
        <MediprintCase />

        <Placeholder slotId="mediprint/initiatives" title="Three initiatives on the table">
          Task 2 surface. Three read-only panels, each opening the initiative text in a modal.
        </Placeholder>
        <Placeholder slotId="mediprint/conditions" title="General conditions">
          Task 2 surface. Five flat pills describing the setting the initiatives sit in.
        </Placeholder>
      </CaseScaffold>
    </>
  );
}
