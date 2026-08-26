import { PageHeader } from "@/components/ui/PageHeader";
import { MeridianScenario } from "@/components/scenario/MeridianScenario";

export default function MeridianPage() {
  return (
    <>
      <PageHeader
        eyebrow="L2 · Application — the case study"
        title="Meridian Logistics"
        intro="Twelve weeks, four decisions, one contract clause. Every option here is a real option — nothing is marked right or wrong while you play, and the world simply changes around what you chose. The reading comes at the end."
      />

      <p className="mb-6 rounded-2xl border-l-4 border-purple bg-lilac/60 p-4 text-body text-navy">
        <span className="font-semibold">Where this sits: </span>
        L1 in Learn gives you the vocabulary and the five categories. This is L2, where
        those are applied under real constraints. When you reach the debrief, L3 in Learn
        picks the thread up as a governance question.
      </p>

      <MeridianScenario />
    </>
  );
}
