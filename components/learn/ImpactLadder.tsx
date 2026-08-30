const STYLE: Record<string, { colour: string; heightPct: number }> = {
  symbolic: { colour: "#C0721D", heightPct: 40 },
  operational: { colour: "#6E8DC1", heightPct: 68 },
  strategic: { colour: "#2F9E5A", heightPct: 96 },
};

type Tag = { id: string; label: string; hint: string };

/**
 * The three kinds of measure as a rising staircase: symbolic is cheap and
 * changes nothing downstream; strategic changes who decides. Height = leverage.
 */
export function ImpactLadder({ tags }: { tags: Tag[] }) {
  return (
    <figure className="mb-4 rounded-xl border border-line bg-paper p-3">
      <p className="mb-2 text-caption text-ash">
        Same effort can sit on any rung — the higher it is, the more future
        decisions it changes.
      </p>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {tags.map((tag, i) => {
          const s = STYLE[tag.id] ?? { colour: "#6B6484", heightPct: 60 };
          return (
            <div key={tag.id}>
              <div className="flex h-24 items-end">
                <div
                  className="w-full rounded-t-lg"
                  style={{ height: `${s.heightPct}%`, backgroundColor: s.colour }}
                >
                  <span className="block p-2 text-caption font-bold text-paper">
                    {i + 1}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-body font-semibold text-ink">{tag.label}</p>
              <p className="mt-0.5 text-caption text-ash">{tag.hint}</p>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-2 text-caption text-ash">
        Rising leverage → . A small measure is not the problem; calling it the top
        rung when it sits on the bottom one is.
      </figcaption>
    </figure>
  );
}
