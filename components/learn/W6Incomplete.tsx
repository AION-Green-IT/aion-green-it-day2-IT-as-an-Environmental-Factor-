"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { W6 } from "@/data/learn";
import { WidgetShell } from "./WidgetShell";
import { useWidget } from "./useWidget";

export function W6Incomplete() {
  const [chosen, setChosen] = useState<string | null>(null);
  const { complete } = useWidget(W6.id, W6.xp);

  const done = chosen !== null;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  return (
    <WidgetShell meta={W6} progress={done ? 1 : 0} done={done} closing={W6.closing}>
      <p className="mb-4 rounded-xl border border-line p-3 text-body text-ink">
        {W6.scenario}
      </p>

      <div className="mb-4 grid gap-2 md:grid-cols-3">
        {W6.tiles.map((tile) => {
          const revealed = !tile.covered || done;
          return (
            <div
              key={tile.id}
              className={clsx(
                "rounded-xl border p-3 transition-colors duration-200",
                revealed ? "border-line bg-paper" : "border-dashed border-ash bg-lilac/40",
              )}
            >
              <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-ash">
                {tile.label}
              </p>
              {revealed ? (
                <p className="text-body text-ink">{tile.content}</p>
              ) : (
                <p className="text-body text-ash">Covered — you do not have this yet.</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        {W6.options.map((option) => {
          const isChosen = chosen === option.id;
          return (
            <div
              key={option.id}
              className={clsx(
                "rounded-xl border p-3",
                isChosen ? "border-purple bg-purple/10" : "border-line bg-paper",
              )}
            >
              <button
                type="button"
                disabled={done}
                onClick={() => setChosen(option.id)}
                className={clsx(
                  "w-full rounded-lg text-left text-body font-semibold text-ink",
                  done ? "cursor-default" : "hover:underline",
                )}
              >
                {option.label}
              </button>
              <p className="mt-1 text-caption text-ash">{option.immediate}</p>

              {done ? (
                <p
                  className={clsx(
                    "mt-2 rounded-lg p-2 text-body",
                    isChosen ? "bg-paper text-ink" : "bg-lilac/50 text-navy",
                  )}
                >
                  {option.afterReveal}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {done ? (
        <p className="mt-4 rounded-xl border-l-4 border-purple bg-lilac/60 p-3 text-body font-semibold text-navy">
          {W6.message}
        </p>
      ) : null}
    </WidgetShell>
  );
}
