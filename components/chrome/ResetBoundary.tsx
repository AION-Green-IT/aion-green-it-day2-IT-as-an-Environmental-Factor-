"use client";

import type { ReactNode } from "react";
import { useProgress } from "@/lib/store";

/**
 * Keying page content on the reset counter remounts it, which clears state
 * that lives in components rather than in the store — a part-finished round,
 * an open widget, opened markers. Without this, a reset zeroed the counters
 * and left the page still showing the old answers.
 */
export function ResetBoundary({ children }: { children: ReactNode }) {
  const resetCount = useProgress((s) => s.resetCount);

  return (
    <div key={resetCount} className="contents">
      {children}
    </div>
  );
}
