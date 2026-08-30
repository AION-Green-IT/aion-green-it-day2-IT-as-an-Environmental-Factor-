"use client";

import clsx from "clsx";

const NAVY = "#231A45";
const LINE = "#D9D3EA";
const ASH = "#6B6484";
const PURPLE = "#5624D0";

type Node = { id: string; role: string };

/** Fixed positions for the five roles: Board on top, CTO under it, three below. */
const POS: Record<string, { x: number; y: number; w: number; h: number }> = {
  "w7-board": { x: 250, y: 14, w: 140, h: 42 },
  "w7-cto": { x: 250, y: 100, w: 140, h: 42 },
  "w7-head-it": { x: 34, y: 210, w: 168, h: 46 },
  "w7-sustainability": { x: 236, y: 210, w: 168, h: 46 },
  "w7-procurement": { x: 438, y: 210, w: 168, h: 46 },
};

const cx = (id: string) => POS[id].x + POS[id].w / 2;

export function GovernanceChart({
  nodes,
  activeId,
  visited,
  onSelect,
}: {
  nodes: Node[];
  activeId: string | null;
  visited: string[];
  onSelect: (id: string) => void;
}) {
  return (
    <figure className="rounded-xl border border-line bg-paper p-3">
      <svg viewBox="0 0 640 300" role="img" aria-labelledby="gov-title gov-desc" className="h-auto w-full">
        <title id="gov-title">Who reports to whom, and who checks whom</title>
        <desc id="gov-desc">
          The Board sits on top, the CTO below it, and Head of IT, Sustainability
          Officer and Procurement Lead in a row underneath. Solid lines are the
          reporting hierarchy. A dashed line joins Head of IT and Procurement,
          who check each other on what can actually be bought. Select a role to
          read what it can decide, must escalate, and cannot hand to anyone.
        </desc>

        {/* solid hierarchy bus */}
        <g stroke={ASH} strokeWidth="2" fill="none">
          <path d={`M320 56 V100`} markerEnd="url(#gov-arrow)" />
          <path d={`M320 142 V182`} />
          <path d={`M${cx("w7-head-it")} 182 H${cx("w7-procurement")}`} />
          <path d={`M${cx("w7-head-it")} 182 V210`} markerEnd="url(#gov-arrow)" />
          <path d={`M${cx("w7-sustainability")} 182 V210`} markerEnd="url(#gov-arrow)" />
          <path d={`M${cx("w7-procurement")} 182 V210`} markerEnd="url(#gov-arrow)" />
        </g>

        {/* dashed cross-check: Head of IT <-> Procurement */}
        <path
          d={`M202 278 H438`}
          stroke={ASH}
          strokeWidth="2"
          strokeDasharray="6 5"
          fill="none"
          markerStart="url(#gov-arrow)"
          markerEnd="url(#gov-arrow)"
        />
        <text x="320" y="294" textAnchor="middle" fill={ASH} fontSize="11">
          check each other on what can actually be bought
        </text>

        {/* role boxes */}
        {nodes.map((n) => {
          const p = POS[n.id];
          if (!p) return null;
          const isActive = activeId === n.id;
          const isVisited = visited.includes(n.id);
          return (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={`${n.role} — select to read`}
              aria-pressed={isActive}
              className="cursor-pointer outline-none"
              onClick={() => onSelect(n.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(n.id);
                }
              }}
            >
              <rect
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx="10"
                fill={isActive ? PURPLE : isVisited ? "#EEE9F9" : "#FFFFFF"}
                stroke={isActive ? PURPLE : LINE}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <text
                x={p.x + p.w / 2}
                y={p.y + p.h / 2 + 5}
                textAnchor="middle"
                fill={isActive ? "#FFFFFF" : NAVY}
                fontSize="14"
                fontWeight="600"
              >
                {n.role}
              </text>
            </g>
          );
        })}

        <defs>
          <marker id="gov-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={ASH} />
          </marker>
        </defs>
      </svg>

      <figcaption className={clsx("mt-2 text-caption", activeId ? "text-navy" : "text-ash")}>
        {activeId
          ? "Reading this role on the right. The line it cannot delegate is the one that matters."
          : "Tap a role to read what it decides, escalates, and cannot hand to anyone else."}
      </figcaption>
    </figure>
  );
}
