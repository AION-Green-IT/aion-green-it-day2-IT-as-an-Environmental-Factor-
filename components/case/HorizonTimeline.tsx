const STOPS = [
  { label: "Short-term", when: "start now, visible this quarter", cls: "bg-good/20 border-good/50" },
  { label: "Medium-term", when: "needs a decision, budget or supplier", cls: "bg-warn/20 border-warn/50" },
  { label: "Structural", when: "changes how decisions are made", cls: "bg-navy/10 border-navy/40" },
];

/** A three-stop horizon bar for the short / medium / structural split. */
export function HorizonTimeline() {
  return (
    <figure className="mb-3">
      <div className="flex items-stretch gap-1">
        {STOPS.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-center gap-1">
            <div className={`flex-1 rounded-lg border px-2 py-1.5 text-center ${s.cls}`}>
              <p className="text-caption font-semibold text-ink">{s.label}</p>
              <p className="text-[11px] leading-tight text-ash">{s.when}</p>
            </div>
            {i < STOPS.length - 1 ? (
              <span aria-hidden className="text-ash">→</span>
            ) : null}
          </div>
        ))}
      </div>
      <figcaption className="mt-1 text-caption text-ash">
        Time →. A prioritised plan spreads across all three; it does not pile everything into now.
      </figcaption>
    </figure>
  );
}
