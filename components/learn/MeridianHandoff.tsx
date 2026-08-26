import Link from "next/link";
import { PROLOGUE } from "@/data/meridian";

/**
 * L2 is a full-page scenario rather than a widget, so the level hands over
 * rather than pretending to contain it. The card carries enough for a mentor to
 * decide whether to run it now.
 */
export function MeridianHandoff() {
  return (
    <section aria-labelledby="meridian-handoff" className="card p-5">
      <p className="mb-1 text-caption font-semibold uppercase tracking-wide text-purple">
        The L2 case study
      </p>
      <h3 id="meridian-handoff" className="mb-2 text-h3 text-ink">
        {PROLOGUE.company.title}
      </h3>
      <p className="mb-4 text-body text-ash">
        Twelve weeks at a logistics distributor under a customer clause, played as four
        chained decisions. Each phase opens by teaching how to weigh it, then asks you to
        commit — and the consequences arrive a phase later, as mail rather than as a
        verdict. Nothing here is scored.
      </p>

      <dl className="mb-4 grid gap-3 sm:grid-cols-2">
        {[
          ["Runs in", "One long block, or one phase per session"],
          ["Ends with", "One of seven outcomes, and why yours followed"],
          ["Carries", "An inbox, a budget, and four people with their own mandates"],
          ["Leads to", "L3 below, where governance becomes the question"],
        ].map(([term, detail]) => (
          <div key={term} className="rounded-xl border border-line p-3">
            <dt className="text-caption font-semibold uppercase tracking-wide text-ash">
              {term}
            </dt>
            <dd className="mt-1 text-body text-ink">{detail}</dd>
          </div>
        ))}
      </dl>

      <Link
        href="/scenario/meridian"
        className="inline-block rounded-xl bg-purple px-4 py-2 text-body font-semibold text-paper transition-colors duration-200 hover:bg-navy"
      >
        Open the Meridian case study →
      </Link>
    </section>
  );
}
