import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";

export default function TrainingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 2"
        title="Training Ground"
        intro="Gamified practice on the five categories. One reveal card at a time: pick a category, then the card flips to show the verdict, what it is, who it affects and a before/after fix. Fifteen generic snippets — none of them from the case companies."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr,260px]">
        <div className="space-y-3">
          <Placeholder slotId="xp-bar" title="XP bar and streak">
            The XP bar, current streak and progress readout sit above the card stack.
          </Placeholder>
          <Placeholder slotId="reveal-stack" title="Reveal card stack">
            Fifteen practice snippets shown one at a time, with a Next button after each reveal.
          </Placeholder>
        </div>

        <Placeholder slotId="badge-shelf" title="Badge shelf">
          One badge per category, greyed out until three correct answers in that category.
        </Placeholder>
      </div>
    </>
  );
}
