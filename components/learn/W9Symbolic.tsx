"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W9, type StatementTag } from "@/data/learn";
import { WidgetShell } from "./WidgetShell";
import { ImpactLadder } from "./ImpactLadder";
import { useWidget } from "./useWidget";

export function W9Symbolic() {
  const [answers, setAnswers] = useState<Record<string, StatementTag>>({});
  const { complete } = useWidget(W9.id, W9.xp);

  const done = Object.keys(answers).length === W9.statements.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  return (
    <WidgetShell
      meta={W9}
      progress={Object.keys(answers).length / W9.statements.length}
      done={done}
      closing={W9.closing}
    >
      <ImpactLadder tags={W9.tags} />

      <ol className="space-y-3">
        {W9.statements.map((statement, index) => {
          const answer = answers[statement.id];
          const right = answer === statement.answer;

          return (
            <li key={statement.id} className="rounded-xl border border-line p-3">
              <p className="mb-2 text-body text-ink">
                <span className="font-semibold">{index + 1}. </span>
                {statement.text}
              </p>

              <div className="flex flex-wrap gap-2">
                {W9.tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    disabled={Boolean(answer)}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [statement.id]: tag.id }))
                    }
                    className={clsx(
                      "rounded-xl border px-3 py-1.5 text-caption font-semibold transition-colors duration-200",
                      answer === tag.id
                        ? right
                          ? "border-good bg-good text-paper"
                          : "border-danger bg-danger text-paper"
                        : answer && tag.id === statement.answer
                          ? "border-good bg-good/15 text-ink"
                          : answer
                            ? "border-line text-ash"
                            : "border-line text-navy hover:border-purple hover:bg-lilac",
                    )}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              {answer ? (
                <p
                  className={clsx(
                    "mt-2 rounded-lg border-l-4 p-3 text-body text-ink",
                    right ? "border-good bg-good/10" : "border-danger bg-danger/10",
                  )}
                >
                  {right
                    ? statement.why
                    : `Usually filed as ${
                        W9.tags.find((t) => t.id === statement.answer)?.label
                      }. ${statement.why}`}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </WidgetShell>
  );
}
