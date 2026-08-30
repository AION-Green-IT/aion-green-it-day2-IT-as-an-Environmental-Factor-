"use client";

import { useEffect, useRef, useState } from "react";
import { W7 } from "@/data/learn";
import { WidgetShell } from "./WidgetShell";
import { GovernanceChart } from "./GovernanceChart";
import { useWidget } from "./useWidget";

export function W7OrgChart() {
  const [opened, setOpened] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const { complete } = useWidget(W7.id, W7.xp);

  const done = opened.length === W7.nodes.length;
  useEffect(() => {
    if (done) complete();
  }, [done, complete]);

  const open = (id: string) => {
    setActive(active === id ? null : id);
    setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const detailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (active) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [active]);

  const node = W7.nodes.find((n) => n.id === active) ?? null;

  return (
    <WidgetShell
      meta={W7}
      progress={opened.length / W7.nodes.length}
      done={done}
      closing={W7.closing}
    >
      <div className="mb-3">
        <p className="mb-2 text-caption text-ash">
          The picture first — who reports to whom, and who checks whom. Tap a role to read it.
        </p>
        <GovernanceChart
          nodes={W7.nodes}
          activeId={active}
          visited={opened}
          onSelect={open}
        />
      </div>

      <div ref={detailRef} className="rounded-xl border border-line p-4">
        {node ? (
          <>
            <h4 className="mb-3 text-h3 text-ink">{node.role}</h4>
            <p className="mb-2 text-body text-ink">
              <span className="font-semibold text-good">Decides alone: </span>
              {node.decidesAlone}
            </p>
            <p className="mb-2 text-body text-ink">
              <span className="font-semibold text-warn">Must escalate: </span>
              {node.mustEscalate}
            </p>
            <p className="rounded-xl bg-lilac/60 p-3 text-body text-navy">
              <span className="font-semibold">Cannot delegate: </span>
              {node.cannotDelegate}
            </p>
          </>
        ) : (
          <p className="text-body text-ash">
            Select a role above to see what it can decide, what it must escalate, and what
            it cannot hand to anyone else.
          </p>
        )}
      </div>

      <div className="mt-3 rounded-xl border border-line p-3">
        <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
          What each line means
        </p>
        <ul className="space-y-1">
          {W7.flows.map((flow) => (
            <li key={flow} className="text-caption text-ash">
              {flow}
            </li>
          ))}
        </ul>
      </div>
    </WidgetShell>
  );
}
