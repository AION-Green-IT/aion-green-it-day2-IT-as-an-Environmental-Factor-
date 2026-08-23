import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { MediprintCase } from "@/components/case/MediprintCase";
import { OpenItems } from "@/components/ui/OpenItems";

export default function MediprintPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 3 · Case A"
        title="MediPrint Solutions"
        intro="An observation surface. The illustration carries everything: the building opens the company brief, the arrows open the topic areas, and nine markers each carry one passage from the description. The work assignment sits below it."
      />

      {/* The artwork is the hero — no sidebar repeating what is already drawn on it. */}
      <MediprintCase />

      <div className="mx-auto mt-6 w-full max-w-4xl space-y-3">
        <OpenItems
          only={["mediprint"]}
          title="Passages opened on this illustration"
          intro="Task 1 asks you to mark every Green-IT-relevant passage. This lists the ones you have not opened yet, so none is missed by accident."
          showLinks={false}
        />

        <Placeholder slotId="mediprint/initiatives" title="Three initiatives on the table">
          Task 2 surface. Three read-only panels, each opening the initiative text in a modal.
        </Placeholder>
        <Placeholder slotId="mediprint/conditions" title="General conditions">
          Task 2 surface. Five flat pills describing the setting the initiatives sit in.
        </Placeholder>
      </div>
    </>
  );
}
