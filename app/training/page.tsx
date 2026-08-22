import { PageHeader } from "@/components/ui/PageHeader";
import { TrainingGround } from "@/components/training/TrainingGround";
import { GlossaryReference } from "@/components/ui/GlossaryReference";
import { OpenItems } from "@/components/ui/OpenItems";

export default function TrainingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader
        eyebrow="Tab 2"
        title="Training Ground"
        intro="Fifteen situations from practice, one at a time. Pick the category, then the card opens: what it is, who it affects, the before-and-after fix, and the rule to take with you. Every company here is invented — none of them are the case companies."
      />

      <p className="mb-6 rounded-2xl border-l-4 border-purple bg-lilac/60 p-4 text-body text-navy">
        <span className="font-semibold">How to use this as a mentor: </span>
        run it as a warm-up before the case tabs, or as a cool-down after. Ask the room to
        commit out loud before the reveal — the disagreement between two participants on a
        borderline card teaches more than the card does. Any underlined word opens its
        plain-language definition, and the full glossary sits at the bottom of this page.
      </p>

      <div className="mb-4">
        <OpenItems
          only={["training-cards", "badges"]}
          title="Where you are on this tab"
          intro="Badges need every card of that category matched, so a badge that will not light is telling you which category to re-read."
          showLinks={false}
        />
      </div>

      <TrainingGround />

      <GlossaryReference />
    </div>
  );
}
