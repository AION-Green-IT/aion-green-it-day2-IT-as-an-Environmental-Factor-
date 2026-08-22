import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { CaseScaffold } from "@/components/case/CaseScaffold";

export default function MediprintPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 3 · Case A"
        title="MediPrint Solutions"
        intro="An observation surface. The hero carries eight facts, each tagged with a neutral topic area. Below it sit three initiatives and five general conditions. Nothing on this tab is rated or ranked."
      />

      <CaseScaffold
        brief={
          <Placeholder slotId="mediprint/brief" title="Company brief">
            The MediPrint Solutions brief goes here, followed by the three context tiles.
          </Placeholder>
        }
      >
        <Placeholder slotId="mediprint/hero" title="Hero illustration">
          Isometric cutaway of the building with eight clickable facts placed on it, plus a
          Show all facts as list toggle.
        </Placeholder>
        <Placeholder slotId="mediprint/initiatives" title="Three initiatives on the table">
          Three read-only panels, each opening the initiative text in a modal.
        </Placeholder>
        <Placeholder slotId="mediprint/conditions" title="General conditions">
          Five flat pills describing the setting the initiatives sit in.
        </Placeholder>
      </CaseScaffold>
    </>
  );
}
