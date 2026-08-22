"use client";

import clsx from "clsx";
import { CATEGORIES, CATEGORY_BY_CODE, type CategoryCode } from "@/data/categories";
import { VERDICT_LABEL, type PracticeCard } from "@/data/training";
import { FieldNote } from "@/components/learn/FieldNote";

const VERDICT_STYLE = {
  green: "border-good bg-good/10",
  amber: "border-warn bg-warn/10",
  red: "border-danger bg-danger/10",
} as const;

const VERDICT_DOT = {
  green: "bg-good",
  amber: "bg-warn",
  red: "bg-danger",
} as const;

type Props = {
  card: PracticeCard;
  index: number;
  total: number;
  chosen: CategoryCode | null;
  onChoose: (code: CategoryCode) => void;
  onNext: () => void;
  isLast: boolean;
};

export function RevealCard({
  card,
  index,
  total,
  chosen,
  onChoose,
  onNext,
  isLast,
}: Props) {
  const revealed = chosen !== null;
  const right = chosen === card.correctCategory;
  const answer = CATEGORY_BY_CODE[card.correctCategory];

  return (
    <article className="card p-5">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <p className="text-caption uppercase tracking-wide text-ash">
          Card {index + 1} of {total}
        </p>
        <code className="text-caption text-ash">{card.id}</code>
      </div>

      <p className="mb-4 text-h3 font-normal leading-relaxed text-ink">{card.snippet}</p>

      {!revealed ? (
        <>
          <p className="mb-2 text-body text-ash">
            Which category does this belong to? Press 1–5 or choose below.
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category, i) => (
              <button
                key={category.code}
                type="button"
                onClick={() => onChoose(category.code)}
                className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-body text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded bg-navy text-[11px] font-semibold text-paper">
                  {i + 1}
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <div
            className={clsx(
              "flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border-l-4 p-3",
              VERDICT_STYLE[card.verdict],
            )}
          >
            <span
              aria-hidden="true"
              className={clsx("h-3 w-3 shrink-0 rounded-full", VERDICT_DOT[card.verdict])}
            />
            <span className="text-body font-semibold text-ink">
              {VERDICT_LABEL[card.verdict]}
            </span>
            <span
              className={clsx(
                "rounded-full px-3 py-1 text-caption font-semibold",
                right ? "bg-good text-paper" : "bg-danger text-paper",
              )}
            >
              {right ? "You had it" : `You said ${CATEGORY_BY_CODE[chosen].name}`}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-caption text-navy">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: answer.hex }}
              />
              {answer.name}
            </span>
          </div>

          <dl className="grid gap-3 md:grid-cols-2">
            <Row term="What it is" detail={card.whatItIs} />
            <Row term="Who it affects" detail={card.whoItAffects} />
          </dl>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-xl border border-line p-3">
              <p className="text-caption font-semibold uppercase tracking-wide text-danger">
                Before
              </p>
              <p className="text-body text-ink">{card.fixBefore}</p>
            </div>
            <div className="rounded-xl border border-line p-3">
              <p className="text-caption font-semibold uppercase tracking-wide text-good">
                After
              </p>
              <p className="text-body text-ink">{card.fixAfter}</p>
            </div>
          </div>

          <p className="rounded-xl border-l-4 border-navy bg-lilac/60 p-3 text-body text-navy">
            <span className="font-semibold">Take this with you: </span>
            {card.principle}
          </p>

          {card.note ? <FieldNote note={card.note} /> : null}

          <button
            type="button"
            onClick={onNext}
            autoFocus
            className="rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
          >
            {isLast ? "Finish" : "Next card"}
          </button>
        </div>
      )}
    </article>
  );
}

function Row({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="rounded-xl border border-line p-3">
      <dt className="text-caption font-semibold uppercase tracking-wide text-ash">{term}</dt>
      <dd className="mt-1 text-body text-ink">{detail}</dd>
    </div>
  );
}
