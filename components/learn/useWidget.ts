"use client";

import { useCallback, useRef } from "react";
import { useProgress } from "@/lib/store";

/**
 * XP is awarded once per widget, on first completion. The ref guards against
 * a re-render awarding it twice within the same session.
 */
export function useWidget(widgetId: string, xp: number) {
  const markVisited = useProgress((s) => s.markVisited);
  const addXp = useProgress((s) => s.addXp);
  const visited = useProgress((s) => s.visited.learnWidgets);
  const awarded = useRef(false);

  const complete = useCallback(() => {
    if (awarded.current) return;
    awarded.current = true;

    if (!visited.includes(widgetId)) {
      addXp(xp);
    }
    markVisited("learnWidgets", widgetId);
  }, [addXp, markVisited, visited, widgetId, xp]);

  return { complete };
}
