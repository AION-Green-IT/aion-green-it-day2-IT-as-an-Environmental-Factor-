"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/lib/store";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const TOAST_MS = 5000;

export function ResetProgress() {
  const [asking, setAsking] = useState(false);
  const [done, setDone] = useState(false);
  const reset = useProgress((s) => s.reset);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), TOAST_MS);
    return () => clearTimeout(t);
  }, [done]);

  const confirm = () => {
    reset();
    setAsking(false);
    setDone(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="rounded-xl border border-lilac/40 px-3 py-1.5 text-caption text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/10 hover:underline"
      >
        Reset progress
      </button>

      <ConfirmDialog
        open={asking}
        title="Reset your progress?"
        confirmLabel="Yes, clear everything"
        cancelLabel="No, keep it"
        onConfirm={confirm}
        onCancel={() => setAsking(false)}
        body={
          <>
            <p className="mb-2">This clears, on this device:</p>
            <ul className="mb-3 list-disc space-y-1 pl-5">
              <li>XP and the current streak</li>
              <li>Category badges</li>
              <li>Which Learn widgets you have completed</li>
              <li>The round you are part-way through in the Training Ground</li>
              <li>Which case findings you have opened</li>
            </ul>
            <p>
              Nothing else is affected, and it cannot be undone. If you pressed this by
              accident, choose “No, keep it”.
            </p>
          </>
        }
      />

      {/* Sits outside the reset boundary, so it survives the remount it triggers. */}
      {done ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-1/2 z-50 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border-l-4 border-good bg-paper p-4 shadow-lg"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-body text-ink">
              <span className="font-semibold">Progress cleared. </span>
              XP, streak, badges and everything you had opened are back to zero.
            </p>
            <button
              type="button"
              onClick={() => setDone(false)}
              className="shrink-0 rounded-lg border border-line px-2 py-1 text-caption text-ash transition-colors duration-200 hover:text-navy hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
