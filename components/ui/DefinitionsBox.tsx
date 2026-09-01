type Item = { term: string; def: string };

/** A short, upfront glossary for the terms a task assumes before it asks you
 * to use them — placed where the task needs them, not filed away in a tab. */
export function DefinitionsBox({
  title = "Working definitions",
  items,
  note,
}: {
  title?: string;
  items: Item[];
  note?: string;
}) {
  return (
    <div className="mb-6 rounded-2xl border border-line bg-paper p-4">
      <h3 className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
        {title}
      </h3>
      <dl className="grid gap-x-6 gap-y-1.5 md:grid-cols-2">
        {items.map((it) => (
          <div key={it.term} className="flex flex-wrap gap-x-1.5 text-body">
            <dt className="font-semibold text-ink">{it.term}</dt>
            <dd className="text-ash">— {it.def}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-3 text-caption text-ash">{note}</p> : null}
    </div>
  );
}
