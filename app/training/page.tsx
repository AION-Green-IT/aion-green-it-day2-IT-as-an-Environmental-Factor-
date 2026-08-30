import { PageHeader } from "@/components/ui/PageHeader";
import { TrainingGround } from "@/components/training/TrainingGround";
import { GlossaryReference } from "@/components/ui/GlossaryReference";

const STEPS = [
  "Read the situation, then pick the category you think it belongs to.",
  "The card opens: what it is, who it affects, the fix, and the rule to take with you.",
  "Being wrong costs nothing. The explanation is the point, not the score.",
];

const SCORES = [
  {
    term: "XP",
    detail: "Five points for each category you match. It measures ground covered, nothing else.",
  },
  {
    term: "Streak",
    detail: "Matches in a row. It resets on a miss and there is no penalty for that.",
  },
  {
    term: "Badges",
    detail:
      "The deck holds three cards per category, so a badge lights when all three matched. A badge that will not light is naming the category worth re-reading.",
  },
];

export default function TrainingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader
        eyebrow="Tab 2"
        title="Training Ground"
        intro="Fifteen situations from practice, one at a time. Every company here is invented — none of them are the case companies."
      />

      <section
        aria-labelledby="how-it-works"
        className="mb-6 rounded-2xl border border-line p-5"
      >
        <h2 id="how-it-works" className="mb-3 text-h3 text-ink">
          How this works
        </h2>

        <ol className="mb-4 space-y-2">
          {STEPS.map((step, i) => (
            <li key={step} className="flex gap-3 text-body text-ink">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-caption font-semibold text-paper">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <dl className="grid gap-3 border-t border-line pt-4 md:grid-cols-3">
          {SCORES.map((score) => (
            <div key={score.term}>
              <dt className="text-body font-semibold text-ink">{score.term}</dt>
              <dd className="mt-1 text-caption text-ash">{score.detail}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 border-t border-line pt-4 text-caption text-navy">
          <span className="font-semibold">Tip: </span>
          decide your answer before you reveal it — even say it out loud. The borderline
          cards are the ones worth pausing on: if two answers feel possible, that hesitation
          is the lesson. Any underlined word opens its plain-language definition, and the
          full glossary is at the bottom.
        </p>
      </section>

      <TrainingGround />

      <GlossaryReference />
    </div>
  );
}
