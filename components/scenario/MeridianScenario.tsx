"use client";

import { useEffect, useMemo, useState } from "react";
import { PHASES, PROLOGUE, type Choice } from "@/data/meridian";
import { MERIDIAN_INITIAL, type Phase } from "@/lib/types";
import { useProgress } from "@/lib/store";
import { ArtifactCard } from "./Artifacts";
import { ChoiceCardGrid } from "./ChoiceCard";
import { HUD } from "./HUD";
import { Debrief } from "./Debrief";

const ORDER: Phase[] = ["p1", "p2", "p3", "p4"];

export function MeridianScenario() {
  const state = useProgress((s) => s.scenario.meridian);
  const pickChoice = useProgress((s) => s.pickChoice);
  const resetMeridian = useProgress((s) => s.resetMeridian);

  const [plain, setPlain] = useState(false);

  // Persisted state only exists on the client; render the opening until then.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const view = hydrated ? state : MERIDIAN_INITIAL;

  // Which phases are on screen: everything already answered, plus the current one.
  const shown = useMemo(() => {
    if (view.currentPhase === "debrief") return ORDER;
    // The prologue runs straight into Phase 1 on the same page.
    if (view.currentPhase === "prologue") return [ORDER[0]];
    const idx = ORDER.indexOf(view.currentPhase as Phase);
    return idx < 0 ? [] : ORDER.slice(0, idx + 1);
  }, [view.currentPhase]);

  const log = ORDER.flatMap((phase) => {
    const id = view.choices[phase];
    if (!id) return [];
    const spec = PHASES.find((p) => p.id === phase);
    const choice = spec?.choices.find((c) => c.id === id);
    return choice ? [{ week: weekOf(phase, view), title: choice.title }] : [];
  });

  const pick = (phase: Phase, choice: Choice) => {
    const spec = PHASES.find((p) => p.id === phase);
    if (!spec) return;

    // A conditional mood only applies when the stakeholder is in that state now.
    const moods = { ...choice.consequence.moods };
    for (const rule of choice.consequence.moodsIf ?? []) {
      if (view.moods[rule.key] === rule.whenCurrent) moods[rule.key] = rule.then;
    }

    pickChoice(
      phase,
      choice.id,
      {
        weekSet: choice.consequence.weekSet,
        weekAdd: choice.consequence.weekAdd,
        budget: choice.consequence.budget,
        moods,
        // The opener of the next phase arrives with it.
        revealNow: [...choice.consequence.revealNow, ...choice.consequence.revealNextPhase],
      },
      spec.next,
    );
  };

  if (view.currentPhase === "debrief") {
    return <Debrief state={view} onReplay={resetMeridian} />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
      <div className="min-w-0 space-y-6">
        <div className="flex justify-end">
          <button
            type="button"
            aria-pressed={plain}
            onClick={() => setPlain(!plain)}
            className="rounded-xl border border-line px-3 py-1.5 text-caption font-semibold text-navy transition-colors duration-200 hover:border-purple hover:bg-lilac hover:underline"
          >
            {plain ? "Show the full layout" : "Read this phase as text"}
          </button>
        </div>

        {/* ------------------------------------------------ prologue */}
        <section aria-label="Prologue" className="space-y-3">
          <div className="card p-5">
            <h2 className="text-h2 text-ink">{PROLOGUE.company.title}</h2>
            <p className="mt-1 text-body text-ash">{PROLOGUE.company.subline}</p>

            <p className="mt-3 text-body text-ink">{PROLOGUE.company.growth}</p>

            <div className="mt-4 rounded-xl border border-line p-4">
              <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                {PROLOGUE.company.estateTitle}
              </p>
              <dl className="space-y-2">
                {PROLOGUE.company.estate.map((item) => (
                  <div key={item.label}>
                    <dt className="text-body font-semibold text-ink">{item.label}</dt>
                    <dd className="text-caption text-ash">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-4 rounded-xl bg-lilac/60 p-3 text-body text-navy">
              {PROLOGUE.role}
            </p>
          </div>

          {PROLOGUE.artifacts.map((id) => (
            <ArtifactCard key={id} id={id} plain={plain} />
          ))}

          <p className="rounded-xl border border-line p-3 text-body font-semibold text-ink">
            {PROLOGUE.situation}
          </p>
        </section>

        {/* ------------------------------------------------ phases */}
        {shown.map((phaseId) => {
          const spec = PHASES.find((p) => p.id === phaseId);
          if (!spec) return null;

          const picked = view.choices[phaseId];
          const opener = spec.opener.filter((id) => view.visibleArtifacts.includes(id) || spec.opener.includes(id));
          const arrived = view.visibleArtifacts.filter(
            (id) => !PROLOGUE.artifacts.includes(id) && !spec.opener.includes(id),
          );

          return (
            <section key={phaseId} aria-label={spec.banner.left} className="space-y-3">
              <hr className="border-line" />

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-h3 text-ink">
                  {spec.banner.left.replace("Phase 2", `Phase 2 · Week ${view.weekNow}`)}
                </h3>
                <p className="text-caption text-ash">{spec.banner.right}</p>
              </div>

              {/* Anything that arrived since the previous phase. */}
              {phaseId !== "p1" ? (
                <div className="space-y-3">
                  {arrived
                    .filter((id) => shouldShowInPhase(id, phaseId, view.choices))
                    .map((id) => (
                      <ArtifactCard key={id} id={id} plain={plain} />
                    ))}
                </div>
              ) : null}

              <p className="rounded-xl bg-lilac/50 p-3 text-body text-ink">{spec.readBack}</p>

              {opener.map((id) => (
                <ArtifactCard key={id} id={id} plain={plain} />
              ))}

              <ChoiceCardGrid
                choices={spec.choices}
                pickedId={picked}
                onPick={(id) => {
                  const choice = spec.choices.find((c) => c.id === id);
                  if (choice && !picked) pick(phaseId, choice);
                }}
              />
            </section>
          );
        })}
      </div>

      <div className="lg:sticky lg:top-[76px] lg:self-start">
        <HUD state={view} log={log} />
      </div>
    </div>
  );
}

/** Weeks are recorded at the moment a phase resolves. */
function weekOf(phase: Phase, state: typeof MERIDIAN_INITIAL) {
  if (phase === "p1") return 1;
  if (phase === "p3") return 10;
  if (phase === "p4") return 12;
  return state.weekNow;
}

/**
 * An artifact revealed by a phase-N choice belongs above phase N+1. Anything
 * revealed by the current phase's own pick stays with it.
 */
function shouldShowInPhase(
  id: string,
  phase: Phase,
  choices: Record<Phase, string | null>,
) {
  const previous: Record<string, Phase> = { p2: "p1", p3: "p2", p4: "p3" };
  const from = previous[phase];
  if (!from) return false;

  const spec = PHASES.find((p) => p.id === from);
  const chosen = spec?.choices.find((c) => c.id === choices[from]);
  if (!chosen) return false;

  return [...chosen.consequence.revealNow, ...chosen.consequence.revealNextPhase].includes(id);
}
