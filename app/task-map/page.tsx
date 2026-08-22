import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { OpenItems } from "@/components/ui/OpenItems";
import { TASK_MAP } from "@/data/task-map";

export default function TaskMapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tab 6"
        title="Task map"
        intro="Which worksheet is anchored to which case tab, and which Learn widgets support it. Use this to jump straight to the surface a task needs."
      />

      <div className="mb-6">
        <OpenItems
          intro="Everything the playground tracks, in one place. Case tabs never award XP — opening a passage only marks that you have read it."
        />
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-lilac/60">
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">Task</th>
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">Level</th>
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">Case</th>
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">Learn support</th>
              <th scope="col" className="p-3 text-caption uppercase tracking-wide text-navy">Links</th>
            </tr>
          </thead>
          <tbody>
            {TASK_MAP.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-b-0 align-top">
                <th scope="row" className="p-3 text-body font-semibold text-ink">{row.task}</th>
                <td className="p-3 text-body text-ash">{row.level}</td>
                <td className="p-3 text-body text-ash">{row.caseLabel}</td>
                <td className="p-3 text-body text-ash">{row.learnSupport}</td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    <Link href={row.caseHref} className="rounded text-body text-purple underline">
                      Open case
                    </Link>
                    <Link href="/learn" className="rounded text-body text-purple underline">
                      Open learn support
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
