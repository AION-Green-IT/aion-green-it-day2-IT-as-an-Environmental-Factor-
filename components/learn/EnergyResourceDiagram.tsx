"use client";

import clsx from "clsx";

const AMBER = "#F1B24A";
const BLUE = "#6E8DC1";
const GREEN = "#6FB56A";
const SLATE = "#3F3552";
const NAVY = "#231A45";
const INK = "#1B1230";
const ASH = "#6B6484";
const PURPLE = "#5624D0";

const VW = 720;
const VH = 430;
const CX = VW / 2;
const CY = VH / 2;

/** Each clickable part: its W1 card id, a zoom focus, and a hit rectangle. */
const PARTS: {
  id: string;
  label: string;
  focus: { cx: number; cy: number; zoom: number };
  hit: { x: number; y: number; w: number; h: number };
}[] = [
  {
    id: "w1-direct-energy",
    label: "Direct energy — zoom in and read",
    focus: { cx: 165, cy: 175, zoom: 1.9 },
    hit: { x: 40, y: 110, w: 275, h: 120 },
  },
  {
    id: "w1-indirect-energy",
    label: "Indirect energy — zoom in and read",
    focus: { cx: 360, cy: 72, zoom: 1.7 },
    hit: { x: 120, y: 12, w: 480, h: 104 },
  },
  {
    id: "w1-resources",
    label: "Resources — zoom in and read",
    focus: { cx: 360, cy: 350, zoom: 1.8 },
    hit: { x: 278, y: 250, w: 172, h: 176 },
  },
  {
    id: "w1-sufficiency",
    label: "Efficiency vs sufficiency — zoom in and read",
    focus: { cx: 558, cy: 165, zoom: 1.85 },
    hit: { x: 420, y: 112, w: 262, h: 100 },
  },
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

function transformFor(activeId: string | null): string {
  const part = PARTS.find((p) => p.id === activeId);
  if (!part) return "translate(0 0) scale(1)";
  const s = part.focus.zoom;
  const tx = clamp(CX - s * part.focus.cx, VW * (1 - s), 0);
  const ty = clamp(CY - s * part.focus.cy, VH * (1 - s), 0);
  return `translate(${tx} ${ty}) scale(${s})`;
}

export function EnergyResourceDiagram({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const activePart = PARTS.find((p) => p.id === activeId) ?? null;
  const transform = transformFor(activeId);

  return (
    <figure className="relative rounded-xl border border-line bg-paper p-3">
      {activePart ? (
        <button
          type="button"
          onClick={() => onSelect(activePart.id)}
          className="absolute left-4 top-4 z-10 rounded-lg bg-navy px-2.5 py-1 text-caption font-semibold text-paper shadow-lg transition-colors duration-200 hover:bg-purple"
        >
          Zoom out
        </button>
      ) : null}

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        role="img"
        aria-labelledby="er-title er-desc"
        className="h-auto w-full"
      >
        <title id="er-title">How the four words fit around one device</title>
        <desc id="er-desc">
          A laptop sits in the middle. Direct energy is the electricity it draws
          now, flowing in from a plug on the left. Indirect energy flows in from
          the top: the factory and lorry that made and shipped it, and the cloud
          and network it uses. Resources are the materials inside it, shown
          below. On the right, efficiency and sufficiency are the two ways to
          reduce all of it. Select any part to zoom in and read it.
        </desc>

        <g
          transform={transform}
          style={{ transition: "transform 500ms ease", transformOrigin: "0 0" }}
        >
          {/* ---- central device ---- */}
          <g>
            <rect x="312" y="168" width="96" height="60" rx="6" fill={NAVY} />
            <rect x="319" y="175" width="82" height="46" rx="3" fill="#EEE9F9" />
            <path d="M300 228 H420 L432 244 H288 Z" fill={SLATE} />
            <text x="360" y="205" textAnchor="middle" fill={ASH} fontSize="11" fontWeight="600">
              your device
            </text>
          </g>

          {/* ---- DIRECT ENERGY (left, amber) ---- */}
          <g opacity={activeId && activeId !== "w1-direct-energy" ? 0.25 : 1}>
            <rect x="60" y="182" width="46" height="40" rx="7" fill={AMBER} />
            <rect x="70" y="192" width="7" height="9" rx="2" fill={NAVY} />
            <rect x="89" y="192" width="7" height="9" rx="2" fill={NAVY} />
            <path d="M83 206 l-8 12 h6 l-4 10 12 -14 h-6 z" fill={NAVY} />
            <path d="M106 202 H300" stroke={AMBER} strokeWidth="4" fill="none" markerEnd="url(#er-arrow-amber)" />
            <text x="60" y="120" fill={AMBER} fontSize="15" fontWeight="700">Direct energy</text>
            <text x="60" y="140" fill={INK} fontSize="12.5">The electricity it draws</text>
            <text x="60" y="156" fill={INK} fontSize="12.5">right now — your meter.</text>
          </g>

          {/* ---- INDIRECT ENERGY (top, blue) ---- */}
          <g opacity={activeId && activeId !== "w1-indirect-energy" ? 0.25 : 1}>
            <text x="360" y="24" textAnchor="middle" fill={BLUE} fontSize="15" fontWeight="700">Indirect energy</text>
            <text x="360" y="42" textAnchor="middle" fill={INK} fontSize="12.5">Spent making &amp; shipping it, and running the cloud &amp; network it uses —</text>
            <text x="360" y="58" textAnchor="middle" fill={ASH} fontSize="12">mostly on someone else&apos;s meter, before you switch it on.</text>
            <g transform="translate(150,74)">
              <path d="M0 34 V8 l14 8 V8 l14 8 V8 l14 8 V34 Z" fill={BLUE} fillOpacity="0.85" />
              <rect x="42" y="20" width="26" height="14" rx="2" fill={BLUE} fillOpacity="0.7" />
              <circle cx="48" cy="36" r="3.5" fill={NAVY} />
              <circle cx="62" cy="36" r="3.5" fill={NAVY} />
            </g>
            <g transform="translate(500,74)">
              <path d="M8 34 q-16 0 -16 -14 q0 -12 14 -13 q3 -12 17 -12 q14 0 17 12 q13 1 13 13 q0 14 -16 14 z" fill={BLUE} fillOpacity="0.85" />
              <path d="M58 34 a10 10 0 0 1 10 -10 M52 34 a16 16 0 0 1 16 -16" stroke={BLUE} strokeWidth="2.5" fill="none" />
            </g>
            <path d="M188 108 Q300 130 332 166" stroke={BLUE} strokeWidth="3" fill="none" markerEnd="url(#er-arrow-blue)" />
            <path d="M532 108 Q430 130 388 166" stroke={BLUE} strokeWidth="3" fill="none" markerEnd="url(#er-arrow-blue)" />
          </g>

          {/* ---- RESOURCES (bottom, green) ---- */}
          <g opacity={activeId && activeId !== "w1-resources" ? 0.25 : 1}>
            <path d="M360 246 V300" stroke={GREEN} strokeWidth="3" fill="none" markerEnd="url(#er-arrow-green)" />
            <g transform="translate(300,306)">
              <rect x="0" y="0" width="30" height="30" rx="3" fill={GREEN} fillOpacity="0.85" />
              <rect x="6" y="6" width="18" height="18" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
              <rect x="44" y="4" width="34" height="26" rx="4" fill={GREEN} fillOpacity="0.7" />
              <rect x="80" y="0" width="30" height="30" rx="3" fill={GREEN} fillOpacity="0.85" />
              <line x1="90" y1="4" x2="90" y2="26" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2" />
              <line x1="100" y1="4" x2="100" y2="26" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2" />
            </g>
            <text x="360" y="372" textAnchor="middle" fill={GREEN} fontSize="15" fontWeight="700">Resources</text>
            <text x="360" y="392" textAnchor="middle" fill={INK} fontSize="12.5">The metals, plastics &amp; water inside —</text>
            <text x="360" y="408" textAnchor="middle" fill={ASH} fontSize="12">most of it committed the moment it&apos;s built.</text>
          </g>

          {/* ---- EFFICIENCY vs SUFFICIENCY (right, slate) ---- */}
          <g opacity={activeId && activeId !== "w1-sufficiency" ? 0.25 : 1}>
            <path d="M420 198 H612" stroke={SLATE} strokeWidth="2.5" strokeDasharray="6 5" fill="none" markerStart="url(#er-arrow-slate)" />
            <g transform="translate(600,182)">
              <rect x="0" y="0" width="44" height="24" rx="12" fill={SLATE} fillOpacity="0.85" />
              <circle cx="32" cy="12" r="9" fill="#FFFFFF" />
            </g>
            <text x="655" y="128" textAnchor="end" fill={SLATE} fontSize="15" fontWeight="700">Efficiency vs sufficiency</text>
            <text x="655" y="148" textAnchor="end" fill={INK} fontSize="12.5">The two ways to reduce all of it:</text>
            <text x="655" y="164" textAnchor="end" fill={ASH} fontSize="12">do the same with less — or ask if it&apos;s needed.</text>
          </g>

          {/* ---- clickable hit areas + active outline ---- */}
          {PARTS.map((p) => (
            <rect
              key={p.id}
              x={p.hit.x}
              y={p.hit.y}
              width={p.hit.w}
              height={p.hit.h}
              rx="10"
              fill="transparent"
              className="cursor-pointer outline-none"
              tabIndex={0}
              role="button"
              aria-label={p.label}
              aria-pressed={activeId === p.id}
              onClick={() => onSelect(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(p.id);
                }
              }}
            />
          ))}
          {activePart ? (
            <rect
              x={activePart.hit.x}
              y={activePart.hit.y}
              width={activePart.hit.w}
              height={activePart.hit.h}
              rx="10"
              fill="none"
              stroke={PURPLE}
              strokeWidth="2"
              pointerEvents="none"
            />
          ) : null}
        </g>

        <defs>
          {[
            ["er-arrow-amber", AMBER],
            ["er-arrow-blue", BLUE],
            ["er-arrow-green", GREEN],
            ["er-arrow-slate", SLATE],
          ].map(([id, colour]) => (
            <marker
              key={id}
              id={id}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={colour} />
            </marker>
          ))}
        </defs>
      </svg>

      <figcaption
        className={clsx(
          "mt-2 text-caption",
          activePart ? "text-navy" : "text-ash",
        )}
      >
        {activePart
          ? "Reading this part below. Zoom out to see how it connects to the rest."
          : "Tap any part — Direct energy, Indirect energy, Resources, Efficiency vs sufficiency — to zoom in and read it."}
      </figcaption>
    </figure>
  );
}
