import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { CaseScaffold } from "@/components/case/CaseScaffold";

const TABS = [
  "Operations",
  "Procurement",
  "Use",
  "Governance",
  "Customer & Competitiveness",
];

export default function NordcomPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 4 · Case B"
        title="NordCom Services GmbH"
        intro="A five-tab dashboard. Each tab holds one to three fact tiles, tagged with a neutral topic area. The tab order matches the perspective column of the Task 3 answer table, so a learner can move tab by tab."
      />

      <CaseScaffold
        brief={
          <Placeholder slotId="nordcom/brief" title="Company brief">
            The NordCom Services GmbH brief goes here.
          </Placeholder>
        }
      >
        <div className="card p-4">
          <h2 className="mb-3 text-h3 text-ink">Dashboard</h2>
          <ul className="mb-4 flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <li
                key={tab}
                className="rounded-xl border border-line bg-lilac px-3 py-1.5 text-caption text-navy"
              >
                {tab}
              </li>
            ))}
          </ul>
          <p className="text-body text-ash">
            The tab strip is fixed in this order. Fact tiles are added per tab, each with its
            own id and topic tag.
          </p>
        </div>

        <Placeholder slotId="nordcom/tiles" title="Fact tiles">
          Nine tiles spread across the five tabs, plus a Show all facts as list toggle.
        </Placeholder>
        <Placeholder slotId="nordcom/context-strip" title="Context strip">
          Three flat pills along the bottom, outside the topic tagging.
        </Placeholder>
      </CaseScaffold>
    </>
  );
}
