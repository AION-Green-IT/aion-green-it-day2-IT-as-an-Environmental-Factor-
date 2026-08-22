"use client";

import clsx from "clsx";

export type BoardItem = { id: string; text: string; trailing?: string };
export type BoardTarget = { id: string; label: string; hint?: string };

export type Verdict = { tone: "good" | "warn" | "danger" | "neutral"; message: string };

const TONE: Record<Verdict["tone"], string> = {
  good: "border-good bg-good/10 text-ink",
  warn: "border-warn bg-warn/10 text-ink",
  danger: "border-danger bg-danger/10 text-ink",
  neutral: "border-line bg-lilac/60 text-ink",
};

type Props = {
  items: BoardItem[];
  targets: BoardTarget[];
  /** itemId -> targetId */
  placements: Record<string, string>;
  verdicts: Record<string, Verdict>;
  selectedId: string | null;
  onSelectItem: (id: string | null) => void;
  onPlace: (itemId: string, targetId: string) => void;
  /** Grid classes for the target area. */
  targetGrid?: string;
};

/**
 * Click a card, then click a target. Keyboard: focus a card and press 1–9.
 * Chosen over HTML5 drag-and-drop because the keyboard path has to exist
 * anyway, and one interaction that works everywhere beats two that diverge.
 */
export function PlacementBoard({
  items,
  targets,
  placements,
  verdicts,
  selectedId,
  onSelectItem,
  onPlace,
  targetGrid = "grid gap-3 md:grid-cols-2",
}: Props) {
  const unplaced = items.filter((i) => !placements[i.id]);

  const onItemKeyDown = (e: React.KeyboardEvent, itemId: string) => {
    const n = Number(e.key);
    if (Number.isInteger(n) && n >= 1 && n <= targets.length) {
      e.preventDefault();
      onPlace(itemId, targets[n - 1].id);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
          To place ({unplaced.length} left)
        </p>

        {unplaced.length === 0 ? (
          <p className="rounded-xl bg-lilac/60 p-3 text-body text-navy">
            Everything is placed. Read the verdicts below, then move on.
          </p>
        ) : (
          <ul className="space-y-2">
            {unplaced.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={selectedId === item.id}
                  onClick={() => onSelectItem(selectedId === item.id ? null : item.id)}
                  onKeyDown={(e) => onItemKeyDown(e, item.id)}
                  className={clsx(
                    "w-full rounded-xl border p-3 text-left text-body transition-colors duration-200",
                    selectedId === item.id
                      ? "border-purple bg-purple/10 text-ink"
                      : "border-line bg-paper text-ink hover:border-purple hover:bg-lilac/50",
                  )}
                >
                  {item.text}
                  {item.trailing ? (
                    <span className="mt-1 block text-caption text-ash">{item.trailing}</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        )}

        {selectedId ? (
          <p className="mt-2 text-caption text-purple">
            Now choose a target below, or press 1–{targets.length}.
          </p>
        ) : (
          <p className="mt-2 text-caption text-ash">
            Select a card, or focus one and press 1–{targets.length}.
          </p>
        )}
      </div>

      <div className={targetGrid}>
        {targets.map((target, index) => {
          const inside = items.filter((i) => placements[i.id] === target.id);

          return (
            <div key={target.id} className="rounded-xl border border-line p-3">
              <button
                type="button"
                disabled={!selectedId}
                onClick={() => selectedId && onPlace(selectedId, target.id)}
                className={clsx(
                  "mb-2 flex w-full items-baseline gap-2 rounded-lg px-2 py-1 text-left transition-colors duration-200",
                  selectedId
                    ? "cursor-pointer hover:bg-lilac"
                    : "cursor-default opacity-90",
                )}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-navy text-caption font-semibold text-paper">
                  {index + 1}
                </span>
                <span className="text-body font-semibold text-ink">{target.label}</span>
              </button>

              {target.hint ? (
                <p className="mb-2 px-2 text-caption text-ash">{target.hint}</p>
              ) : null}

              <ul className="space-y-2">
                {inside.map((item) => {
                  const verdict = verdicts[item.id];
                  return (
                    <li
                      key={item.id}
                      className={clsx(
                        "rounded-lg border p-2 text-body",
                        verdict ? TONE[verdict.tone] : TONE.neutral,
                      )}
                    >
                      <p>{item.text}</p>
                      {verdict ? (
                        <p className="mt-1 text-caption">{verdict.message}</p>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => onPlace(item.id, "")}
                        className="mt-1 rounded text-caption text-ash underline underline-offset-2 hover:text-navy"
                      >
                        Move back
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
