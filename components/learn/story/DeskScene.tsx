"use client";

import clsx from "clsx";
import type { SignalId } from "@/data/story";

/** Where each object sits, as a percentage of the scene box. */
export const DESK_SPOTS: Record<SignalId, { x: number; y: number }> = {
  energy: { x: 21, y: 78 },
  devices: { x: 50, y: 68 },
  customer: { x: 81, y: 80 },
};

type State = "idle" | "picked" | "kept" | "dropped";

const stateOf = (id: SignalId, selected: SignalId[], spent: boolean): State => {
  const on = selected.includes(id);
  if (spent) return on ? "kept" : "dropped";
  return on ? "picked" : "idle";
};

const opacity = (s: State) => (s === "dropped" ? 0.3 : 1);

/**
 * The scene is the interface: the three things on the desk are what you click,
 * the way the hotspots on the MediPrint hero are. Drawn rather than
 * photographed so the objects can respond to state.
 */
export function DeskScene({
  selected,
  spent,
  onToggle,
  full,
}: {
  selected: SignalId[];
  spent: boolean;
  onToggle: (id: SignalId) => void;
  full: boolean;
}) {
  const s = (id: SignalId) => stateOf(id, selected, spent);

  const ring = (state: State) =>
    state === "picked"
      ? "#5624D0"
      : state === "kept"
        ? "#2F9E5A"
        : state === "dropped"
          ? "#C0721D"
          : "transparent";

  return (
    <div className="relative overflow-hidden rounded-xl border border-line">
      <svg
        viewBox="0 0 800 450"
        role="img"
        aria-labelledby="desk-title desk-desc"
        className="block h-auto w-full"
      >
        <title id="desk-title">Three things on your desk</title>
        <desc id="desk-desc">
          An electricity bill with a rising red line, a laptop showing a loading spinner
          beside a stack of support tickets, and a sealed envelope with a green mark
          half-buried under other papers.
        </desc>

        <rect width="800" height="450" fill="#F6F4FC" />
        <rect x="30" y="55" width="740" height="345" rx="18" fill="#EEE9F9" stroke="#D9D3EA" strokeWidth="2" />

        {/* Electricity bill */}
        <g opacity={opacity(s("energy"))} transform="rotate(-5 175 225)">
          <rect x="105" y="140" width="140" height="172" rx="5" fill="#FFFFFF" stroke="#D9D3EA" strokeWidth="2" />
          <rect x="122" y="160" width="72" height="7" rx="3.5" fill="#EEE9F9" />
          <rect x="122" y="176" width="50" height="7" rx="3.5" fill="#EEE9F9" />
          <polyline points="124,288 152,262 180,244 208,192" fill="none" stroke="#B33A3A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M203 186 l16 -6 -3 17 z" fill="#B33A3A" />
          <rect
            x="99" y="132" width="152" height="188" rx="8"
            fill="none" stroke={ring(s("energy"))} strokeWidth="4"
            strokeDasharray={s("energy") === "dropped" ? "8 6" : undefined}
          />
        </g>

        {/* Laptop and tickets */}
        <g opacity={opacity(s("devices"))}>
          <rect x="498" y="216" width="62" height="46" rx="4" fill="#FFFFFF" stroke="#D9D3EA" strokeWidth="2" />
          <rect x="490" y="226" width="62" height="46" rx="4" fill="#FFFFFF" stroke="#D9D3EA" strokeWidth="2" />
          <rect x="325" y="148" width="152" height="102" rx="7" fill="#231A45" />
          <rect x="336" y="159" width="130" height="80" rx="4" fill="#5624D0" opacity="0.3" />
          <path d="M401 178 a21 21 0 1 1 -15 36" fill="none" stroke="#F1B24A" strokeWidth="6" strokeLinecap="round" />
          <path d="M308 250 L494 250 L510 270 L292 270 Z" fill="#3F3552" />
          <rect
            x="286" y="140" width="232" height="140" rx="8"
            fill="none" stroke={ring(s("devices"))} strokeWidth="4"
            strokeDasharray={s("devices") === "dropped" ? "8 6" : undefined}
          />
        </g>

        {/* Envelope, half-buried */}
        <g opacity={opacity(s("customer"))} transform="rotate(7 650 255)">
          <rect x="575" y="188" width="152" height="112" rx="5" fill="#FFFFFF" stroke="#D9D3EA" strokeWidth="2" />
          <path d="M575 194 L651 246 L727 194" fill="none" stroke="#D9D3EA" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="700" cy="278" r="11" fill="#6FB56A" />
          <rect x="596" y="272" width="168" height="62" rx="5" fill="#F6F4FC" stroke="#D9D3EA" strokeWidth="2" />
          <rect
            x="569" y="182" width="164" height="124" rx="8"
            fill="none" stroke={ring(s("customer"))} strokeWidth="4"
            strokeDasharray={s("customer") === "dropped" ? "8 6" : undefined}
          />
        </g>
      </svg>

      {/* Hotspots, positioned over the scene the way the case-tab markers are. */}
      {(Object.keys(DESK_SPOTS) as SignalId[]).map((id) => {
        const state = s(id);
        const disabled = spent || (full && state !== "picked");

        return (
          <button
            key={id}
            type="button"
            aria-pressed={state === "picked" || state === "kept"}
            aria-label={`Investigate: ${id}`}
            disabled={disabled}
            onClick={() => onToggle(id)}
            style={{ left: `${DESK_SPOTS[id].x}%`, top: `${DESK_SPOTS[id].y}%` }}
            className={clsx(
              "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border-2 px-2.5 py-0.5 text-[11px] font-semibold shadow-md transition-colors duration-200",
              state === "picked" && "border-paper bg-purple text-paper",
              state === "kept" && "border-paper bg-good text-paper",
              state === "dropped" && "border-warn bg-paper text-warn",
              state === "idle" &&
                (disabled
                  ? "border-line bg-paper text-ash"
                  : "border-purple bg-paper text-purple hover:bg-purple hover:text-paper"),
            )}
          >
            {state === "picked"
              ? "Investigating"
              : state === "kept"
                ? "Investigated"
                : state === "dropped"
                  ? "Left on the pile"
                  : disabled
                    ? "No capacity"
                    : "Investigate"}
          </button>
        );
      })}
    </div>
  );
}
