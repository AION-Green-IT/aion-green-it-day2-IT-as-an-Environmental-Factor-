"use client";

import { useCallback, useEffect, useState } from "react";
import { CARDS } from "@/data/training";
import { CATEGORIES, type CategoryCode } from "@/data/categories";
import { useProgress } from "@/lib/store";
import { RevealCard } from "./RevealCard";
import { XPBar } from "./XPBar";
import { BadgeShelf } from "./BadgeShelf";

const XP_PER_CORRECT = 5;

export function TrainingGround() {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<CategoryCode | null>(null);
  const [correct, setCorrect] = useState(0);
  const [seen, setSeen] = useState(0);
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
  const isLast = index === CARDS.length - 1;

  const choose = useCallback(
    (code: CategoryCode) => {
      if (chosen) return;

      setChosen(code);
      setSeen((n) => n + 1);
      recordAnswer(card.id, code, card.correctCategory);
      markVisited("trainingCards", card.id);

      if (code === card.correctCategory) {
        setCorrect((n) => n + 1);
        addXp(XP_PER_CORRECT);
      }
    },
    [addXp, card, chosen, markVisited, recordAnswer],
  );

  const next = useCallback(() => {
    setChosen(null);
    if (isLast) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  }, [isLast]);

  // Keyboard: 1–5 pick a category, Enter moves on once revealed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;

      if (!chosen) {
        const n = Number(e.key);
        if (Number.isInteger(n) && n >= 1 && n <= CATEGORIES.length) {
          e.preventDefault();
          choose(CATEGORIES[n - 1].code);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, chosen, finished]);

  const restart = () => {
    setIndex(0);
    setChosen(null);
    setCorrect(0);
    setSeen(0);
    setFinished(false);
  };

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
              {correct} of {CARDS.length} on the first attempt. The number is not the
              point — the ones you missed are. Those are the categories where your
              instinct and the framework disagree, and that is exactly what to check in
              your own organisation.
            </p>
            <button
              type="button"
              onClick={restart}
              className="rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
            >
              Run the stack again
            </button>
          </div>
        ) : (
          <RevealCard
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
        <BadgeShelf correctByCategory={correctByCategory} />
      </div>
    </div>
  );
}
