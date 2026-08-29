"use client";

import { ALL_WIDGETS } from "@/data/learn";
import { PHASES } from "@/data/meridian";
import type { Phase } from "@/lib/types";
import { CARDS, BADGE_THRESHOLD } from "@/data/training";
import { CATEGORIES } from "@/data/categories";
import { HOTSPOTS } from "@/data/mediprint";
import { HOTSPOTS as NORDCOM_HOTSPOTS } from "@/data/nordcom";
import { HOTSPOTS as AURON_HOTSPOTS } from "@/data/auron";
import { scopedId } from "@/lib/ids";
import { useProgress } from "@/lib/store";

export type OpenItem = { id: string; label: string; done: boolean };

export type CompletionGroup = {
  id: string;
  label: string;
  href: string;
  /** What one unit means, e.g. "widgets". */
  unit: string;
  items: OpenItem[];
  done: number;
  total: number;
};

/**
 * One place that answers "what is still open" for every tab, so the question
 * has the same answer wherever it is asked.
 */
export function useCompletion(): {
  groups: CompletionGroup[];
  done: number;
  total: number;
} {
  const learnVisited = useProgress((s) => s.visited.learnWidgets);
  const meridian = useProgress((s) => s.scenario.meridian);
  const cardsVisited = useProgress((s) => s.visited.trainingCards);
  const hotspotsVisited = useProgress((s) => s.visited.hotspots);
  const correctByCategory = useProgress((s) => s.training.correctByCategory);

  const build = (
    id: string,
    label: string,
    href: string,
    unit: string,
    items: OpenItem[],
  ): CompletionGroup => ({
    id,
    label,
    href,
    unit,
    items,
    done: items.filter((i) => i.done).length,
    total: items.length,
  });

  const groups: CompletionGroup[] = [
    build(
      "learn",
      "Learn — widgets completed",
      "/learn",
      "widgets",
      [
        ...ALL_WIDGETS.map((w) => ({
          id: w.id,
          label: w.title,
          done: learnVisited.includes(w.id),
        })),
      ],
    ),
    build(
      "meridian",
      "L2 · Meridian — decisions taken",
      "/learn#l2",
      "decisions",
      PHASES.map((phase, i) => {
        const chosen = meridian.choices[phase.id as Phase];
        const title = phase.choices.find((c) => c.id === chosen)?.title;
        return {
          id: phase.id,
          label: `${phase.banner.left}${title ? ` — ${title}` : ""}`,
          done: Boolean(chosen),
        };
      }),
    ),
    build(
      "training-cards",
      "Training Ground — cards answered",
      "/training",
      "cards",
      CARDS.map((c, i) => ({
        id: c.id,
        label: `Card ${i + 1} — ${c.snippet.split(" ").slice(0, 6).join(" ")}…`,
        done: cardsVisited.includes(c.id),
      })),
    ),
    build(
      "badges",
      "Training Ground — category badges",
      "/training",
      "badges",
      CATEGORIES.map((c) => ({
        id: `badge-${c.code}`,
        label: `${c.name} — needs all ${BADGE_THRESHOLD} of its cards matched`,
        done: (correctByCategory[c.code] ?? 0) >= BADGE_THRESHOLD,
      })),
    ),
    build(
      "mediprint",
      "Case A · DataForm — passages opened",
      "/case/mediprint",
      "markers",
      HOTSPOTS.map((h, i) => ({
        id: h.id,
        label: `${i + 1}. ${h.label}`,
        done: hotspotsVisited.includes(
          scopedId("mediprint", h.id.replace(/^hs-/, "")),
        ),
      })),
    ),
    build(
      "nordcom",
      "Case B · NetCore — findings opened",
      "/case/nordcom",
      "findings",
      NORDCOM_HOTSPOTS.map((h, i) => ({
        id: h.id,
        label: `${i + 1}. ${h.label}`,
        done: hotspotsVisited.includes(
          scopedId("nordcom", h.id.replace(/^hs-/, "")),
        ),
      })),
    ),
    build(
      "auron",
      "Case C · Artemis — findings opened",
      "/case/auron",
      "findings",
      AURON_HOTSPOTS.map((h, i) => ({
        id: h.id,
        label: `${i + 1}. ${h.label}`,
        done: hotspotsVisited.includes(
          scopedId("auron", h.id.replace(/^hs-/, "")),
        ),
      })),
    ),
  ];

  return {
    groups,
    done: groups.reduce((n, g) => n + g.done, 0),
    total: groups.reduce((n, g) => n + g.total, 0),
  };
}
