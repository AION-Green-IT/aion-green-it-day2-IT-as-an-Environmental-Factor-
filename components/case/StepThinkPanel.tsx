"use client";

import { useState } from "react";
import { Task1StepArt } from "./Task1StepArt";

const BulbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path
      d="M7 1.5c-2.2 0-4 1.7-4 3.9 0 1.4.7 2.4 1.5 3.1.5.4.8.9.8 1.5v.3h3.4v-.3c0-.6.3-1.1.8-1.5.8-.7 1.5-1.7 1.5-3.1 0-2.2-1.8-3.9-4-3.9z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="M5.5 12.2h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/**
 * A pop-out panel attached to a Work Assignment step: closed by default so
 * the step list stays scannable, but visually distinct once open — this is
 * the depth the one-line hint does not have room for.
 */
export function StepThinkPanel({ stepId, think }: { stepId: string; think: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-purple/50 bg-purple/10 px-3 py-1.5 text-caption font-semibold text-purple transition-colors duration-200 hover:bg-purple hover:text-paper"
      >
        <BulbIcon />
        {open ? "Hide how to think about this" : "How to think about this"}
      </button>

      {open ? (
        <div className="mt-2 grid gap-4 rounded-2xl border-l-4 border-purple bg-paper p-4 shadow-sm md:grid-cols-[1fr,auto]">
          <ol className="space-y-2">
            {think.map((line, i) => (
              <li key={i} className="flex gap-2 text-body text-ink">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lilac text-[11px] font-semibold text-purple"
                >
                  {i + 1}
                </span>
                {line}
              </li>
            ))}
          </ol>
          <div className="flex items-center justify-center md:pl-2">
            <Task1StepArt stepId={stepId} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
