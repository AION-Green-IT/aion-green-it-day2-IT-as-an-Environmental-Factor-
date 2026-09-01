import { PageHeader } from "@/components/ui/PageHeader";
import { MediprintCase } from "@/components/case/MediprintCase";
import { DataFormMeasures } from "@/components/case/DataFormMeasures";
import { OpenItems } from "@/components/ui/OpenItems";

export default function DataformPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 3 · Case A"
        title="DataForm Systems"
        intro="An observation surface. The illustration carries everything: the banner opens the company brief, the five bands open the areas, and each marker carries one passage from the description. Task 1 sits below it, Task 2 under that."
      />

      {/* The artwork is the hero — no sidebar repeating what is already drawn on it. */}
      <MediprintCase />

      <div className="mx-auto mt-6 w-full max-w-4xl">
        <OpenItems
          only={["mediprint"]}
          title="Passages opened on this illustration"
          intro="Task 1 asks you to mark every point where energy or resources are at stake. This lists the ones you have not opened yet, so none is missed by accident."
          showLinks={false}
        />
      </div>

      <div className="mt-6">
        <DataFormMeasures />
      </div>
    </>
  );
}
