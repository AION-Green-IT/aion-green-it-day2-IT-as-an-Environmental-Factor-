// Types for the Meridian L2 scenario. Kept out of data/ so the store can use
// them without importing content.

export type Phase = "prologue" | "p1" | "p2" | "p3" | "p4" | "debrief";

export type ChoiceId = string;

export type EndingId =
  | "photo-op-trap"
  | "slow-burn"
  | "overreach"
  | "missed-opportunity"
  | "governance-win"
  | "quiet-drift"
  /** Hidden. Reachable only by the combination in computeEnding below. */
  | "quiet-architect";

export type StakeholderKey = "marcus" | "sabine" | "rafael" | "elena";

export type Mood =
  | "unknown"
  | "hostile"
  | "skeptical"
  | "wary"
  | "neutral"
  | "warming"
  | "ally";

export type MeridianState = {
  currentPhase: Phase;
  /** Out of 200, representing €200k. */
  budgetSpent: number;
  weekNow: number;
  choices: Record<Phase, ChoiceId | null>;
  moods: Record<StakeholderKey, Mood>;
  visibleArtifacts: string[];
  ending: EndingId | null;
};

export const MERIDIAN_INITIAL: MeridianState = {
  currentPhase: "prologue",
  budgetSpent: 0,
  weekNow: 1,
  choices: { prologue: null, p1: null, p2: null, p3: null, p4: null, debrief: null },
  moods: { marcus: "neutral", sabine: "skeptical", rafael: "wary", elena: "unknown" },
  visibleArtifacts: [],
  ending: null,
};

/** Signal model: endings come from the shape of the sequence, not one choice. */
export type Signals = {
  visibility: number;
  depth: number;
  governance: number;
  soloism: number;
  deferral: number;
  reframe: number;
};

export function computeSignals(choices: Record<Phase, ChoiceId | null>): Signals {
  const is = (phase: Phase, letter: string) => choices[phase] === `${phase}-${letter}`;

  return {
    visibility: (is("p1", "b") ? 1 : 0) + (is("p2", "b") ? 1 : 0) + (is("p3", "a") ? 2 : 0),
    depth:
      (is("p1", "a") ? 1 : 0) +
      (is("p2", "a") || is("p2", "c") ? 1 : 0) +
      (is("p3", "b") ? 1 : 0),
    governance: (is("p1", "c") ? 1 : 0) + (is("p2", "d") ? 1 : 0) + (is("p4", "b") ? 1 : 0),
    soloism: (is("p4", "a") ? 2 : 0) + (is("p4", "c") ? 1 : 0),
    deferral: (is("p1", "d") ? 1 : 0) + (is("p3", "c") ? 1 : 0) + (is("p4", "d") ? 1 : 0),
    reframe: (is("p3", "d") ? 2 : 0) + (is("p4", "b") ? 1 : 0),
  };
}

/** First match wins. Order matters. */
export function computeEnding(
  choices: Record<Phase, ChoiceId | null>,
  weekNow: number,
  budgetSpent = 0,
): EndingId {
  const s = computeSignals(choices);
  const p3 = choices.p3;

  // Hidden, and checked first so it can win: depth and shared governance,
  // bought cheaply enough that nobody ever had to defend the spend. Two paths
  // out of 256 qualify, which is what makes it worth finding.
  if (
    s.depth >= 2 &&
    s.governance >= 2 &&
    s.soloism === 0 &&
    budgetSpent < 100
  ) {
    return "quiet-architect";
  }

  if (s.visibility >= 3 && s.depth <= 1) return "photo-op-trap";
  if (s.deferral >= 2) return "quiet-drift";
  if (s.visibility === 2 && p3 === "p3-a") return "overreach";
  if (s.depth >= 2 && weekNow >= 11 && p3 === "p3-b") return "slow-burn";
  if (s.governance >= 2 || (s.reframe >= 2 && s.soloism === 0)) return "governance-win";
  return "missed-opportunity";
}
