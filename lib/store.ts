"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CategoryCode } from "@/data/categories";
import type { VisitedKind } from "@/lib/ids";

export const STORAGE_KEY = "aion-greenit-m1";

export type Progress = {
  xp: number;
  streak: number;
  badges: string[];
  visited: {
    hotspots: string[];
    learnWidgets: string[];
    trainingCards: string[];
  };
  training: {
    seenCardIds: string[];
    correctByCategory: Record<CategoryCode, number>;
  };
};

type Session = {
  /**
   * Bumped by reset(). Page content is keyed on it, so a reset also clears
   * state that lives in components — a round's answers, an open widget —
   * which the persisted store knows nothing about. Deliberately not
   * persisted: it is a signal within one session, not progress.
   */
  resetCount: number;
};

type Actions = {
  addXp: (n: number) => void;
  award: (badge: string) => void;
  markVisited: (kind: VisitedKind, id: string) => void;
  recordTrainingAnswer: (
    cardId: string,
    chosenCategory: CategoryCode,
    correctCategory: CategoryCode,
  ) => void;
  reset: () => void;
};

const emptyProgress: Progress = {
  xp: 0,
  streak: 0,
  badges: [],
  visited: { hotspots: [], learnWidgets: [], trainingCards: [] },
  training: {
    seenCardIds: [],
    correctByCategory: { E: 0, R: 0, Em: 0, U: 0, G: 0 },
  },
};

const addUnique = (list: string[], id: string) =>
  list.includes(id) ? list : [...list, id];

export const useProgress = create<Progress & Session & Actions>()(
  persist(
    (set) => ({
      ...emptyProgress,
      resetCount: 0,

      addXp: (n) => set((s) => ({ xp: s.xp + n })),

      award: (badge) => set((s) => ({ badges: addUnique(s.badges, badge) })),

      markVisited: (kind, id) =>
        set((s) => ({
          visited: { ...s.visited, [kind]: addUnique(s.visited[kind], id) },
        })),

      recordTrainingAnswer: (cardId, chosenCategory, correctCategory) =>
        set((s) => {
          const correct = chosenCategory === correctCategory;
          return {
            // Streak grows on consecutive correct answers, resets on wrong.
            // Never presented as failure — it is just a number.
            streak: correct ? s.streak + 1 : 0,
            training: {
              seenCardIds: addUnique(s.training.seenCardIds, cardId),
              correctByCategory: correct
                ? {
                    ...s.training.correctByCategory,
                    [correctCategory]:
                      s.training.correctByCategory[correctCategory] + 1,
                  }
                : s.training.correctByCategory,
            },
          };
        }),

      reset: () =>
        set((s) => ({ ...emptyProgress, resetCount: s.resetCount + 1 })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        xp: s.xp,
        streak: s.streak,
        badges: s.badges,
        visited: s.visited,
        training: s.training,
      }),
    },
  ),
);
