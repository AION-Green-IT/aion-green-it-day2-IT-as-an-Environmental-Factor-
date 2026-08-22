import { CATEGORIES } from "@/data/categories";

/**
 * The 5-arrow category legend in the left column of a case hero.
 * Purely informative — it does not filter and it ranks nothing.
 */
export function CategoryLegend() {
  return (
    <div className="card p-4">
      <h2 className="mb-3 text-h3 text-ink">Topic areas</h2>
      <ul className="space-y-2">
        {CATEGORIES.map((c) => (
          <li key={c.code} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 shrink-0 rounded-sm"
              style={{ backgroundColor: c.hex }}
            />
            <span className="text-body text-ink">
              {c.name} <span className="text-ash">({c.code})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
