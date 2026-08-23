"use client";

import clsx from "clsx";
import { CategoryChip } from "@/components/case/CategoryChip";
import type { Choice } from "@/data/meridian";
import { Glyph } from "./glyphs";

/**
 * NS2 / R2: before a pick, no card carries an evaluative colour and no tag says
 * anything about quality. Tags are facts — a duration, a cost, a visibility.
 */
export function ChoiceCard({
  choice,
  picked,
  locked,
  onPick,
}: {
  choice: Choice;
  picked: boolean;
  locked: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={locked}
      aria-pressed={picked}
      onClick={onPick}
      className={clsx(
        "flex h-full w-full flex-col rounded-2xl border bg-paper p-4 text-left transition-all duration-200",
        picked && "border-purple",
        !locked && "hover:-translate-y-0.5 hover:border-purple",
        locked && !picked && "pointer-events-none opacity-40",
        locked && picked && "pointer-events-none",
      )}
    >
      <span className="mb-1 text-h3 text-ink">{choice.title}</span>
      <span className="mb-3 text-body text-ash">{choice.body}</span>

      <span className="mb-3 flex flex-wrap gap-x-3 gap-y-1.5">
        {choice.tags.map((tag) => (
          <span key={tag.text} className="flex items-center gap-1.5 text-caption text-ash">
            <Glyph name={tag.icon} />
            {tag.text}
          </span>
        ))}
      </span>

      <span className="mt-auto">
        <CategoryChip code={choice.category} variant="topic" />
      </span>
    </button>
  );
}

export function ChoiceCardGrid({
  choices,
  pickedId,
  onPick,
}: {
  choices: Choice[];
  pickedId: string | null;
  onPick: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {choices.map((choice) => (
        <ChoiceCard
          key={choice.id}
          choice={choice}
          picked={pickedId === choice.id}
          locked={Boolean(pickedId)}
          onPick={() => onPick(choice.id)}
        />
      ))}
    </div>
  );
}
