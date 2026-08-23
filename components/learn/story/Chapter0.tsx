import { CRITERIA, METHOD } from "@/data/story";

/** Taught before anything is chosen: what a decision at this level runs on. */
export function Chapter0() {
  return (
    <>
      <p className="mb-4 text-body text-ink">{METHOD.intro}</p>

      <div className="mb-4 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-lilac/60">
              <th scope="col" className="p-2 text-caption uppercase tracking-wide text-navy">
                Criterion
              </th>
              <th scope="col" className="p-2 text-caption uppercase tracking-wide text-navy">
                What it asks
              </th>
              <th scope="col" className="p-2 text-caption uppercase tracking-wide text-navy">
                The trap
              </th>
            </tr>
          </thead>
          <tbody>
            {CRITERIA.map((c) => (
              <tr key={c.id} className="border-b border-line align-top last:border-b-0">
                <th scope="row" className="p-2 text-body font-semibold text-ink">
                  {c.name}
                </th>
                <td className="p-2 text-caption text-ink">{c.asks}</td>
                <td className="p-2 text-caption text-warn">{c.trap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="space-y-2">
        {METHOD.rules.map((rule, i) => (
          <li key={rule.title} className="rounded-xl border-l-4 border-purple bg-lilac/40 p-3">
            <p className="text-body font-semibold text-ink">
              {i + 1}. {rule.title}
            </p>
            <p className="mt-1 text-caption text-navy">{rule.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-caption text-ash">{METHOD.closing}</p>
    </>
  );
}
