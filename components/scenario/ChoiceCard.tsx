"use client";

import clsx from "clsx";
import { CategoryChip } from "@/components/case/CategoryChip";
import { STAKEHOLDERS, type Choice } from "@/data/meridian";
import { Glyph } from "./glyphs";
import { StakeholderAvatar } from "./StakeholderAvatar";

/**
 * NS2 / R2: before a pick, no card carries an evaluative colour and no tag says
 * anything about quality. Tags are facts — a duration, a cost, a visibility.
 */
export function ChoiceCard({
  choice,
  picked,
  selected,
  locked,
  onPick,
}: {
  choice: Choice;
  /** Committed. */
  picked: boolean;
  /** Chosen but not yet confirmed — still changeable. */
  selected: boolean;
  locked: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={locked}
      aria-pressed={picked || selected}
      onClick={onPick}
      className={clsx(
        "flex h-full w-full flex-col rounded-2xl border bg-paper p-4 text-left transition-all duration-200",
        (picked || selected) && "border-purple",
        selected && "ring-2 ring-purple ring-offset-2",
        !locked && "hover:-translate-y-0.5 hover:border-purple",
        locked && !picked && "pointer-events-none opacity-40",
        locked && picked && "pointer-events-none",
      )}
    >
      <span className="mb-1 flex items-baseline justify-between gap-2 text-h3 text-ink">
        {choice.title}
        {selected ? (
          <span className="shrink-0 rounded-full bg-purple px-2 py-0.5 text-caption font-semibold text-paper">
            Selected
          </span>
        ) : null}
      </span>
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
  selectedId,
  budgetSpent,
  budgetTotal,
  onSelect,
  onCommit,
}: {
  choices: Choice[];
  pickedId: string | null;
  selectedId: string | null;
  budgetSpent: number;
  budgetTotal: number;
  onSelect: (id: string) => void;
  onCommit: () => void;
}) {
  const selected = choices.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        {choices.map((choice) => (
          <ChoiceCard
            key={choice.id}
            choice={choice}
            picked={pickedId === choice.id}
            selected={!pickedId && selectedId === choice.id}
            locked={Boolean(pickedId)}
            onPick={() => onSelect(choice.id)}
          />
        ))}
      </div>

      {/* Selecting is not committing: the week only moves when you say so. */}
      {!pickedId ? (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line p-3">
          {selected ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="text-body font-semibold text-ink">{selected.title}</p>

                {/* What is knowable now: the arithmetic, and who has a stake.
                    How they will react is the part you commit without. */}
                <dl className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <div className="flex items-baseline gap-2">
                    <dt className="text-caption text-ash">Budget after this</dt>
                    <dd className="text-body font-semibold tabular-nums text-ink">
                      €{Math.max(0, budgetTotal - budgetSpent - selected.consequence.budget)}k
                      left
                      <span className="ml-1 font-normal text-caption text-ash">
                        (−€{selected.consequence.budget}k)
                      </span>
                    </dd>
                  </div>

                  <div className="flex items-center gap-2">
                    <dt className="text-caption text-ash">Has a stake</dt>
                    <dd className="flex items-center gap-1.5">
                      {selected.touches.length === 0 ? (
                        <span className="text-caption text-ash">Nobody directly</span>
                      ) : (
                        selected.touches.map((who) => (
                          <span
                            key={who}
                            title={STAKEHOLDERS[who].name}
                            className="flex items-center gap-1 rounded-full bg-lilac px-1.5 py-0.5"
                          >
                            <StakeholderAvatar who={who} size={24} />
                            <span className="text-caption text-navy">
                              {STAKEHOLDERS[who].role}
                            </span>
                          </span>
                        ))
                      )}
                    </dd>
                  </div>
                </dl>

                <p className="mt-2 text-caption text-ash">
                  How they react is not knowable yet. Select another card to change your
                  mind — committing moves the week forward and cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={onCommit}
                className="shrink-0 rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
              >
                Commit and continue →
              </button>
            </>
          ) : (
            <p className="text-body text-ash">
              Select a card to see it here before you commit.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
