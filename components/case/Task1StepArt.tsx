import { CATEGORIES } from "@/data/categories";

const NAVY = "#231A45";
const ASH = "#6B6484";
const LINE = "#D9D3EA";
const PURPLE = "#5624D0";
const AMBER = "#F1B24A";
const GOOD = "#2F9E5A";
const DANGER = "#B33A3A";

/** A device icon with a bolt above it, used three times at different
 * strengths for step 1 — the same shape, three states. */
function DeviceState({
  x,
  bolt,
  label,
  sub,
  dim,
}: {
  x: number;
  bolt: "full" | "half" | "off";
  label: string;
  sub: string;
  dim?: boolean;
}) {
  return (
    <g transform={`translate(${x} 0)`} opacity={dim ? 0.55 : 1}>
      <rect x="6" y="24" width="44" height="28" rx="3" fill="none" stroke={NAVY} strokeWidth="1.8" />
      <path d="M18 52 h20" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" />
      {bolt === "off" ? (
        <>
          <path d="M24 4 L20 14 h6 l-4 10" fill="none" stroke={ASH} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2 L34 20" stroke={DANGER} strokeWidth="1.8" strokeLinecap="round" />
        </>
      ) : (
        <path
          d="M26 2 L21 14 h7 l-5 12"
          fill="none"
          stroke={bolt === "full" ? AMBER : AMBER}
          strokeOpacity={bolt === "full" ? 1 : 0.55}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <text x="28" y="66" textAnchor="middle" fontSize="10" fontWeight="600" fill={NAVY}>
        {label}
      </text>
      <text x="28" y="78" textAnchor="middle" fontSize="9" fill={ASH}>
        {sub}
      </text>
    </g>
  );
}

function EnergyStates() {
  return (
    <svg viewBox="0 0 240 86" role="img" aria-labelledby="t1a-title" className="h-auto w-full max-w-xs">
      <title id="t1a-title">Three device states, only one of which draws no power</title>
      <DeviceState x={0} bolt="full" label="Running" sub="counts" />
      <DeviceState x={80} bolt="half" label="Idle / cooling" sub="still counts" />
      <DeviceState x={160} bolt="off" label="Unplugged" sub="does not count" dim />
    </svg>
  );
}

function Lifecycle() {
  const stops = [
    { label: "Raw", w: 26, fill: "none" },
    { label: "Manufacture", w: 50, fill: AMBER },
    { label: "Use", w: 20, fill: "none" },
    { label: "Retire", w: 50, fill: AMBER },
  ];
  let x = 4;
  return (
    <svg viewBox="-20 0 300 60" role="img" aria-labelledby="t1b-title" className="h-auto w-full max-w-xs">
      <title id="t1b-title">A device's life, with the resource-heavy ends emphasised</title>
      <line x1="4" y1="20" x2="252" y2="20" stroke={LINE} strokeWidth="2" />
      {stops.map((s, i) => {
        const cxPos = x + s.w / 2;
        const bar = (
          <g key={s.label}>
            <rect
              x={x}
              y={s.fill === "none" ? 15 : 10}
              width={s.w}
              height={s.fill === "none" ? 10 : 20}
              rx="3"
              fill={s.fill}
              stroke={s.fill === "none" ? ASH : "none"}
              strokeWidth="1.4"
            />
            <text x={cxPos} y="42" textAnchor="middle" fontSize="8.5" fill={NAVY} fontWeight={s.fill === "none" ? 400 : 600}>
              {s.label}
            </text>
          </g>
        );
        x += s.w + 8;
        return bar;
      })}
      <text x="130" y="56" textAnchor="middle" fontSize="8" fill={ASH}>
        the tall bars are where the material footprint sits
      </text>
    </svg>
  );
}

function AreaBranches() {
  const triggers: Record<string, string> = {
    Op: "running rule",
    Pr: "buying decision",
    U: "default habit",
    Rp: "swap timing",
    St: "sitting unused",
  };
  const n = CATEGORIES.length;
  const gap = 240 / n;
  return (
    <svg viewBox="0 0 240 96" role="img" aria-labelledby="t1c-title" className="h-auto w-full max-w-xs">
      <title id="t1c-title">What would have to change, branching to the five areas</title>
      <circle cx="120" cy="12" r="11" fill="none" stroke={NAVY} strokeWidth="1.8" />
      <text x="120" y="16" textAnchor="middle" fontSize="12" fill={NAVY} fontWeight="700">
        ?
      </text>
      {CATEGORIES.map((c, i) => {
        const cx = gap * i + gap / 2;
        return (
          <g key={c.code}>
            <path d={`M120 23 L${cx} 40`} stroke={LINE} strokeWidth="1.6" fill="none" />
            <rect x={cx - 20} y="40" width="40" height="22" rx="6" fill={c.hex} opacity="0.16" stroke={c.hex} strokeWidth="1.4" />
            <text x={cx} y="54" textAnchor="middle" fontSize="10" fontWeight="700" fill={NAVY}>
              {c.code}
            </text>
            <text x={cx} y="76" textAnchor="middle" fontSize="7.5" fill={ASH}>
              {triggers[c.code]?.split(" ")[0]}
            </text>
            <text x={cx} y="86" textAnchor="middle" fontSize="7.5" fill={ASH}>
              {triggers[c.code]?.split(" ").slice(1).join(" ")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function BeforeAfter() {
  return (
    <svg viewBox="-15 0 260 70" role="img" aria-labelledby="t1d-title" className="h-auto w-full max-w-xs">
      <title id="t1d-title">A measurement is not an improvement; a committed change is</title>
      <g transform="translate(0 5)">
        <circle cx="30" cy="25" r="18" fill="none" stroke={DANGER} strokeWidth="1.8" />
        <path d="M23 18 L37 32 M37 18 L23 32" stroke={DANGER} strokeWidth="2" strokeLinecap="round" />
        <text x="30" y="54" textAnchor="middle" fontSize="9" fill={NAVY} fontWeight="600">
          “Measure it”
        </text>
        <text x="30" y="64" textAnchor="middle" fontSize="8" fill={ASH}>
          not an improvement
        </text>
      </g>
      <path d="M64 25 H100" stroke={ASH} strokeWidth="1.8" markerEnd="url(#ba-arrow)" fill="none" />
      <g transform="translate(112 5)">
        <circle cx="30" cy="25" r="18" fill="none" stroke={GOOD} strokeWidth="1.8" />
        <path d="M22 26 L28 32 L39 19" stroke={GOOD} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="30" y="54" textAnchor="middle" fontSize="9" fill={NAVY} fontWeight="600">
          “Shut it down at 6pm”
        </text>
        <text x="30" y="64" textAnchor="middle" fontSize="8" fill={ASH}>
          a change someone commits to
        </text>
      </g>
      <defs>
        <marker id="ba-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={ASH} />
        </marker>
      </defs>
    </svg>
  );
}

function TechnicalVsStructural() {
  return (
    <svg viewBox="0 0 240 90" role="img" aria-labelledby="t1e-title" className="h-auto w-full max-w-xs">
      <title id="t1e-title">Two lanes — who can act, and on what authority</title>
      <line x1="120" y1="6" x2="120" y2="84" stroke={LINE} strokeWidth="1.6" strokeDasharray="4 4" />

      <g transform="translate(18 10)">
        <rect x="4" y="0" width="34" height="34" rx="6" fill={PURPLE} opacity="0.12" stroke={PURPLE} strokeWidth="1.4" />
        <path d="M21 8 a6 6 0 1 0 6 6 a6 6 0 0 1 -6 -6 z" fill="none" stroke={PURPLE} strokeWidth="1.8" />
        <path d="M14 27 L27 14" stroke={PURPLE} strokeWidth="1.8" strokeLinecap="round" />
        <text x="21" y="52" textAnchor="middle" fontSize="9" fontWeight="700" fill={NAVY}>
          Technical
        </text>
        <text x="21" y="63" textAnchor="middle" fontSize="8" fill={ASH}>
          one team,
        </text>
        <text x="21" y="73" textAnchor="middle" fontSize="8" fill={ASH}>
          next month
        </text>
      </g>

      <g transform="translate(160 10)">
        <rect x="4" y="0" width="34" height="34" rx="6" fill={NAVY} opacity="0.10" stroke={NAVY} strokeWidth="1.4" />
        <path d="M12 26 h18 M21 26 v-6 M13 12 l8 -6 8 6 M13 12 h16" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="21" y="52" textAnchor="middle" fontSize="9" fontWeight="700" fill={NAVY}>
          Structural
        </text>
        <text x="21" y="63" textAnchor="middle" fontSize="8" fill={ASH}>
          rule, budget,
        </text>
        <text x="21" y="73" textAnchor="middle" fontSize="8" fill={ASH}>
          or decision above
        </text>
      </g>
    </svg>
  );
}

const BY_STEP: Record<string, () => JSX.Element> = {
  "t1-step-1": EnergyStates,
  "t1-step-2": Lifecycle,
  "t1-step-3": AreaBranches,
  "t1-step-4": BeforeAfter,
  "t1-step-5": TechnicalVsStructural,
};

/** The small diagram shown inside a step's "How to think about this" panel. */
export function Task1StepArt({ stepId }: { stepId: string }) {
  const Art = BY_STEP[stepId];
  if (!Art) return null;
  return <Art />;
}
