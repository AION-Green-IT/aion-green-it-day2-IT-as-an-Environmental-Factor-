"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CARDS } from "@/data/training";
import { CATEGORIES, type CategoryCode } from "@/data/categories";
import { useProgress } from "@/lib/store";
import { RevealCard } from "./RevealCard";
import { XPBar } from "./XPBar";
import { BadgeShelf } from "./BadgeShelf";

const XP_PER_CORRECT = 5;

type CardResult = "correct" | "missed";

export function TrainingGround() {
  const [index, setIndex] = useState(0);
  // Keyed by card id, so jumping back to an answered card shows its reveal again.
  const [answers, setAnswers] = useState<Record<string, CategoryCode>>({});
  const [finished, setFinished] = useState(false);

  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const correctByCategory = useProgress((s) => s.training.correctByCategory);
  const addXp = useProgress((s) => s.addXp);
  const recordAnswer = useProgress((s) => s.recordTrainingAnswer);
  const markVisited = useProgress((s) => s.markVisited);

  // Persisted values only exist on the client; hold zeros until hydrated.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const card = CARDS[index];
  const chosen = answers[card.id] ?? null;
  const isLast = index === CARDS.length - 1;

  const results = useMemo(() => {
    const out: Record<string, CardResult> = {};
    for (const c of CARDS) {
      const answer = answers[c.id];
      if (!answer) continue;
      out[c.id] = answer === c.correctCategory ? "correct" : "missed";
    }
    return out;
  }, [answers]);

  const seen = Object.keys(results).length;
  const correct = Object.values(results).filter((r) => r === "correct").length;

  const choose = useCallback(
    (code: CategoryCode) => {
      // Answering the same card twice must not award XP twice.
      if (answers[card.id]) return;

      setAnswers((prev) => ({ ...prev, [card.id]: code }));
      recordAnswer(card.id, code, card.correctCategory);
      markVisited("trainingCards", card.id);

      if (code === card.correctCategory) addXp(XP_PER_CORRECT);
    },
    [addXp, answers, card, markVisited, recordAnswer],
  );

  const next = useCallback(() => {
    if (isLast) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  }, [isLast]);

  const jump = useCallback((to: number) => {
    setFinished(false);
    setIndex(to);
  }, []);

  // Keyboard: 1–5 pick a category on an unanswered card.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished || chosen) return;

      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;

      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= CATEGORIES.length) {
        e.preventDefault();
        choose(CATEGORIES[n - 1].code);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, chosen, finished]);

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setFinished(false);
  };

  const missed = CARDS.filter((c) => results[c.id] === "missed");

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr,300px]">
      <div className="min-w-0 space-y-4">
        <XPBar
          seen={seen}
          total={CARDS.length}
          correct={correct}
          streak={hydrated ? streak : 0}
          xp={hydrated ? xp : 0}
        />

        {finished ? (
          <div className="card p-5">
            <h2 className="mb-2 text-h2 text-ink">Round complete</h2>
            <p className="mb-4 text-body text-ash">
              {correct} of {CARDS.length} matched on the first attempt. The number is not
              the point — the ones you missed are. Those are the categories where your
              instinct and the framework disagree, and that is exactly what to check in
              your own organisation.
            </p>

            {missed.length > 0 ? (
              <>
                <h3 className="mb-2 text-h3 text-ink">Worth a second look</h3>
                <ul className="mb-4 space-y-2">
                  {missed.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => jump(CARDS.indexOf(c))}
                        className="w-full rounded-xl border border-line p-3 text-left text-body text-ink transition-colors duration-200 hover:border-purple hover:bg-lilac"
                      >
                        {c.snippet}
                        <span className="mt-1 block text-caption text-purple underline">
                          Open this card again →
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mb-4 rounded-xl bg-lilac/60 p-3 text-body text-navy">
                Nothing missed. Try the round again and argue the borderline cards out
                loud — several of them defend a second category quite well.
              </p>
            )}

            <button
              type="button"
              onClick={restart}
              className="rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
            >
              Clear and run the stack again
            </button>
          </div>
        ) : (
          <RevealCard
            // Keyed so the nudge and any open glossary term reset per card.
            key={card.id}
            card={card}
            index={index}
            total={CARDS.length}
            chosen={chosen}
            onChoose={choose}
            onNext={next}
            isLast={isLast}
          />
        )}
      </div>

      <div className="xl:sticky xl:top-[76px] xl:self-start">
        <BadgeShelf correctByCategory={correctByCategory} answers={answers} />
      </div>
    </div>
  );
}
