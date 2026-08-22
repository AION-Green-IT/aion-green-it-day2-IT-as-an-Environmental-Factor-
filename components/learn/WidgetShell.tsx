"use client";

import type { ReactNode } from "react";
import type { WidgetMeta } from "@/data/learn";

type Props = {
  meta: WidgetMeta;
  /** 0–1. Drives the small progress pill in the header. */
  progress: number;
  done: boolean;
  children: ReactNode;
  closing: string;
};

export function WidgetShell({ meta, progress, done, children, closing }: Props) {
  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="card p-5"
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 id={`${meta.id}-title`} className="text-h3 text-ink">
            {meta.title}
          </h3>
          <p className="mt-1 text-body text-ash">{meta.task}</p>
        </div>

        <span
          className={
            done
              ? "shrink-0 rounded-full bg-good px-3 py-1 text-caption font-semibold text-paper"
              : "shrink-0 rounded-full border border-line px-3 py-1 text-caption text-ash"
          }
        >
          {done ? `Done · +${meta.xp} XP` : `${Math.round(progress * 100)}%`}
        </span>
      </div>

      <p className="mb-4 rounded-xl bg-lilac/50 p-3 text-body text-navy">
        <span className="font-semibold">Why this matters: </span>
        {meta.why}
      </p>

      {children}

      {done ? (
        <p className="mt-4 border-t border-line pt-3 text-body font-semibold text-ink">
          {closing}
        </p>
      ) : null}
    </section>
  );
}
