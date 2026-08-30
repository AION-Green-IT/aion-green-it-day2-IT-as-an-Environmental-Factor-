"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { GLOSSARY_BY_ID } from "@/data/glossary";
import { GlossaryText, TermPanel } from "@/components/ui/GlossaryText";
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
  const [term, setTerm] = useState<string | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const revealed = chosen !== null;

  // Every prose field goes through this, so a term is explained wherever it appears.
  const gloss = (text: string) => (
    <GlossaryText
      text={text}
      termIds={card.terms}
      activeId={term}
      onSelect={(id) => setTerm(term === id ? null : id)}
    />
  );
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

      <p className="mb-3 rounded-xl border-l-4 border-line bg-lilac/40 p-3 text-body text-ash">
        <span className="font-semibold text-navy">The setting: </span>
        {card.setting}
      </p>

      <p className="mb-3 text-h3 font-normal leading-relaxed text-ink">
        {gloss(card.snippet)}
      </p>

      {card.terms.length > 0 ? (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-caption text-ash">Words on this card:</span>
          {card.terms.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={term === id}
              onClick={() => setTerm(term === id ? null : id)}
              className={clsx(
                "rounded-lg border px-2 py-1 text-caption transition-colors duration-200",
                term === id
                  ? "border-purple bg-purple text-paper"
                  : "border-line text-navy hover:border-purple hover:bg-lilac",
              )}
            >
              {GLOSSARY_BY_ID[id]?.term ?? id}
            </button>
          ))}
        </div>
      ) : null}

      {term ? <TermPanel termId={term} onClose={() => setTerm(null)} /> : null}

      <div className="mb-4" />

      {!revealed ? (
        <>
          <p className="mb-2 text-body text-ash">
            Which category does this belong to? Press 1–5 or choose below.
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
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

          <button
            type="button"
            aria-expanded={hintOpen}
            onClick={() => setHintOpen(!hintOpen)}
            className="rounded-xl border border-line px-3 py-1.5 text-caption font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
          >
            {hintOpen ? "Hide the nudge" : "Stuck? Take a nudge"}
          </button>

          {hintOpen ? (
            <p className="mt-2 rounded-xl border-l-4 border-warn bg-warn/10 p-3 text-body text-ink">
              {card.hint}
            </p>
          ) : null}

          {/* Without this the card ends abruptly and reads as broken. */}
          <div className="mt-4 rounded-xl border border-dashed border-line bg-lilac/30 p-4">
            <p className="mb-3 text-caption font-semibold uppercase tracking-wide text-ash">
              Opens once you choose — nothing is lost by choosing wrong
            </p>
            <ul className="grid gap-2 md:grid-cols-2">
              {[
                "The verdict, and whether your pick matched",
                "What it is, and who it affects",
                "The before-and-after fix",
                "The rule to take back to your own organisation",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-body text-ash">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-dashed border-ash"
                  />
                  {line}
                </li>
              ))}
            </ul>
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
            <Row term="What it is" detail={gloss(card.whatItIs)} />
            <Row term="Who it affects" detail={gloss(card.whoItAffects)} />
          </dl>

          <div className="grid items-stretch gap-2 md:grid-cols-[1fr,auto,1fr]">
            <div className="rounded-xl border border-danger/40 bg-danger/5 p-3">
              <p className="mb-1 flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-danger">
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4.5 4.5 L9.5 9.5 M9.5 4.5 L4.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Before
              </p>
              <p className="text-body text-ink">{gloss(card.fixBefore)}</p>
            </div>
            <div className="flex items-center justify-center text-ash" aria-hidden="true">
              <span className="md:hidden">↓</span>
              <span className="hidden text-2xl md:inline">→</span>
            </div>
            <div className="rounded-xl border border-good/40 bg-good/5 p-3">
              <p className="mb-1 flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-good">
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4.2 7.2 L6.2 9.2 L9.8 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                After
              </p>
              <p className="text-body text-ink">{gloss(card.fixAfter)}</p>
            </div>
          </div>

          <p className="rounded-xl border-l-4 border-navy bg-lilac/60 p-3 text-body text-navy">
            <span className="font-semibold">Take this with you: </span>
            {gloss(card.principle)}
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

function Row({ term, detail }: { term: string; detail: ReactNode }) {
  return (
    <div className="rounded-xl border border-line p-3">
      <dt className="text-caption font-semibold uppercase tracking-wide text-ash">{term}</dt>
      <dd className="mt-1 text-body text-ink">{detail}</dd>
    </div>
  );
}
