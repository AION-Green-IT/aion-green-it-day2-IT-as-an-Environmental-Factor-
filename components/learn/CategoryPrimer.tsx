import { CATEGORY_BY_CODE } from "@/data/categories";
import { CATEGORY_PRIMER } from "@/data/learn";
import { CategoryDiagram } from "./CategoryDiagram";
import { FieldNote } from "./FieldNote";

/** Explanation first, then the sorter below it puts the explanation to work. */
export function CategoryPrimer() {
  return (
    <section aria-labelledby="category-primer-title" className="card p-5">
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        Read this first
      </p>
      <h3 id="category-primer-title" className="mb-2 text-h3 text-ink">
        {CATEGORY_PRIMER.title}
      </h3>
      <p className="mb-4 text-body text-ash">{CATEGORY_PRIMER.intro}</p>

      <div className="mb-4">
        <CategoryDiagram />
      </div>

      <ul className="space-y-3">
        {CATEGORY_PRIMER.entries.map((entry) => {
          const category = CATEGORY_BY_CODE[entry.code];
          return (
            <li
              key={entry.code}
              className="rounded-xl border border-line p-4"
              style={{ borderLeft: `4px solid ${category.hex}` }}
            >
              <div className="mb-1 flex flex-wrap items-baseline gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-md text-caption font-semibold text-paper"
                  style={{ backgroundColor: category.hex }}
                >
                  {category.code}
                </span>
                <h4 className="text-h3 text-ink">{category.name}</h4>
              </div>

              <p className="mb-2 text-body text-ink">{entry.meaning}</p>

              <dl className="space-y-1 text-caption">
                <div>
                  <dt className="inline font-semibold text-purple">Ask: </dt>
                  <dd className="inline text-ink">{entry.question}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-ash">For example: </dt>
                  <dd className="inline text-ash">{entry.example}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-ash">You would change: </dt>
                  <dd className="inline text-ash">{entry.lever}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 rounded-xl bg-lilac/60 p-3 text-body font-semibold text-navy">
        {CATEGORY_PRIMER.rule}
      </p>

      <FieldNote note={CATEGORY_PRIMER.note} />

      <p className="mt-4 border-t border-line pt-3 text-body text-ash">
        Now put it to work — the sorter below gives you ten observations to file.
      </p>
    </section>
  );
}
