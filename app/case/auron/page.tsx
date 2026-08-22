import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { CaseScaffold } from "@/components/case/CaseScaffold";

export default function AuronPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 5 · Case C"
        title="Auron Digital Group"
        intro="A deliberately light case: a multi-site map, a growth chart, six general conditions and six stakeholder cards. Each stakeholder card carries a role, an interest and a constraint — no ranking between them."
      />

      <CaseScaffold
        brief={
          <Placeholder slotId="auron/brief" title="Company brief">
            The Auron Digital Group brief goes here.
          </Placeholder>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Placeholder slotId="auron/map" title="Multi-site map">
            Four site markers — Site A to Site D — with an HQ tag on Site A.
          </Placeholder>
          <Placeholder slotId="auron/growth-chart" title="Growth chart">
            An upward revenue index line across five labelled year points, illustrative only.
          </Placeholder>
        </div>

        <Placeholder slotId="auron/conditions" title="General conditions strip">
          Six flat pills describing the setting, outside the topic tagging.
        </Placeholder>
        <Placeholder slotId="auron/stakeholders" title="Stakeholder cards">
          Six cards in a 3x2 grid, each opening a modal with role, interest and constraint.
        </Placeholder>
      </CaseScaffold>
    </>
  );
}
