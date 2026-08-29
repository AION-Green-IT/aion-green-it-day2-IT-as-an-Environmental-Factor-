"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CategoryCode } from "@/data/categories";
import type { VisitedKind } from "@/lib/ids";
import {
  MERIDIAN_INITIAL,
  computeEnding,
  type MeridianState,
  type Mood,
  type Phase,
  type StakeholderKey,
} from "@/lib/types";

export const STORAGE_KEY = "aion-greenit-m2";

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
  scenario: {
    meridian: MeridianState;
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

  // --- Meridian scenario. Awards no XP: it is a rehearsal, not an assessment.
  pickChoice: (
    phase: Phase,
    choiceId: string,
    delta: {
      weekSet?: number;
      weekAdd?: number;
      budget: number;
      moods: Partial<Record<StakeholderKey, Mood>>;
      revealNow: string[];
    },
    nextPhase: Phase,
  ) => void;
  revealArtifact: (id: string) => void;
  resetMeridian: () => void;
};

const emptyProgress: Progress = {
  xp: 0,
  streak: 0,
  badges: [],
  visited: { hotspots: [], learnWidgets: [], trainingCards: [] },
  training: {
    seenCardIds: [],
    correctByCategory: { Op: 0, Pr: 0, U: 0, Rp: 0, St: 0 },
  },
  scenario: { meridian: MERIDIAN_INITIAL },
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

      pickChoice: (phase, choiceId, delta, nextPhase) =>
        set((s) => {
          const m = s.scenario.meridian;

          const week = delta.weekSet ?? m.weekNow + (delta.weekAdd ?? 0);
          const choices = { ...m.choices, [phase]: choiceId };

          const next: MeridianState = {
            ...m,
            currentPhase: nextPhase,
            weekNow: Math.min(12, week),
            budgetSpent: m.budgetSpent + delta.budget,
            choices,
            moods: { ...m.moods, ...delta.moods },
            visibleArtifacts: [
              ...m.visibleArtifacts,
              ...delta.revealNow.filter((id) => !m.visibleArtifacts.includes(id)),
            ],
            ending: m.ending,
          };

          // The story ends at Phase 4; the ending is a function of the sequence.
          if (nextPhase === "debrief") {
            next.weekNow = 12;
            next.ending = computeEnding(choices, 12, next.budgetSpent);
          }

          return { scenario: { ...s.scenario, meridian: next } };
        }),

      revealArtifact: (id) =>
        set((s) => {
          const m = s.scenario.meridian;
          if (m.visibleArtifacts.includes(id)) return {};
          return {
            scenario: {
              ...s.scenario,
              meridian: { ...m, visibleArtifacts: [...m.visibleArtifacts, id] },
            },
          };
        }),

      resetMeridian: () =>
        set((s) => ({ scenario: { ...s.scenario, meridian: MERIDIAN_INITIAL } })),
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
        scenario: s.scenario,
      }),
    },
  ),
);
