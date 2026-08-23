import { PageHeader } from "@/components/ui/PageHeader";
import { MeridianScenario } from "@/components/scenario/MeridianScenario";

export default function MeridianPage() {
  return (
    <>
      <PageHeader
        eyebrow="Scenario · L2"
        title="Meridian Logistics"
        intro="Twelve weeks, four decisions, one contract clause. Every option here is a real option — nothing is marked right or wrong while you play, and the world simply changes around what you chose. The reading comes at the end."
      />

      <MeridianScenario />
    </>
  );
}
