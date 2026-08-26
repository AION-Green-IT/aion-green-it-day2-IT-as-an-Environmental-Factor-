import type { Phase } from "@/lib/types";

const N = "#231A45";
const P = "#5624D0";
const L = "#EEE9F9";
const LINE = "#D9D3EA";
const ASH = "#6B6484";
const WARN = "#C0721D";
const GOOD = "#2F9E5A";

function Frame({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 320 120"
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
      className="block h-auto w-full"
    >
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      {children}
    </svg>
  );
}

const label = (x: number, y: number, text: string, fill = ASH, size = 8.5) => (
  <text x={x} y={y} fontSize={size} fill={fill}>
    {text}
  </text>
);

/**
 * One picture per phase, showing the frame rather than the options. Nothing
 * here ranks a choice — that would break the rule the whole scenario runs on.
 */
export function BriefingVisual({ phase }: { phase: Phase }) {
  if (phase === "p1") {
    return (
      <Frame
        id="bv-p1"
        title="A first move spends part of the same twelve weeks"
        desc="A twelve-week bar. Three brackets of different lengths sit over its start, showing a short, a medium and a long first move. Whatever the bracket covers, the rest of the bar is what remains for everything else."
      >
        <rect x="10" y="70" width="300" height="16" rx="4" fill={L} stroke={LINE} />
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={10 + (i + 1) * 25} y1="70" x2={10 + (i + 1) * 25} y2="86" stroke={LINE} />
        ))}
        {label(10, 100, "week 1")}
        {label(276, 100, "week 12")}

        {[
          { w: 50, y: 20, text: "a two-week move", c: GOOD },
          { w: 100, y: 38, text: "a four-week move", c: P },
          { w: 175, y: 56, text: "a seven-week move", c: WARN },
        ].map((b) => (
          <g key={b.text}>
            <line x1="10" y1={b.y + 6} x2={10 + b.w} y2={b.y + 6} stroke={b.c} strokeWidth="2.5" />
            <line x1="10" y1={b.y + 2} x2="10" y2={b.y + 10} stroke={b.c} strokeWidth="2.5" />
            <line x1={10 + b.w} y1={b.y + 2} x2={10 + b.w} y2={b.y + 10} stroke={b.c} strokeWidth="2.5" />
            {label(14 + b.w, b.y + 9, b.text, b.c)}
          </g>
        ))}
      </Frame>
    );
  }

  if (phase === "p2") {
    return (
      <svg
        viewBox="0 0 320 150"
        role="img"
        aria-labelledby="bv-p2-t bv-p2-d"
        className="block h-auto w-full"
      >
        <title id="bv-p2-t">Impact, feasibility and visibility rarely agree</title>
        <desc id="bv-p2-d">
          A triangle with impact at the top, feasibility at the lower left and visibility
          at the lower right. A strong option usually reaches two corners and not the
          third.
        </desc>

        <path d="M160 30 L286 96 L34 96 Z" fill={L} stroke={LINE} strokeWidth="1.5" />

        {/* Corner names sit outside the shape; the one note that fits goes inside. */}
        <circle cx="160" cy="30" r="5" fill={P} />
        <text x="160" y="20" textAnchor="middle" fontSize="10" fontWeight="600" fill={N}>
          Impact
        </text>
        <text x="160" y="56" textAnchor="middle" fontSize="8.5" fill={ASH}>
          how much of the footprint moves
        </text>

        <circle cx="34" cy="96" r="5" fill={P} />
        <text x="14" y="114" fontSize="10" fontWeight="600" fill={N}>
          Feasibility
        </text>
        <text x="14" y="126" fontSize="8.5" fill={ASH}>
          people, budget, authority
        </text>

        <circle cx="286" cy="96" r="5" fill={P} />
        <text x="306" y="114" textAnchor="end" fontSize="10" fontWeight="600" fill={N}>
          Visibility
        </text>
        <text x="306" y="126" textAnchor="end" fontSize="8.5" fill={ASH}>
          who notices outside IT
        </text>

        <line x1="92" y1="76" x2="228" y2="76" stroke={P} strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="160" y="72" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={N}>
          reach two, lose one
        </text>
      </svg>
    );
  }

  if (phase === "p3") {
    return (
      <Frame
        id="bv-p3"
        title="The gap between what you can evidence and what you might claim"
        desc="Two stacked bars. The lower shows what can be evidenced today. The upper shows a larger claim. The difference between them is labelled exposure, and it is the part someone else can check."
      >
        <rect x="10" y="26" width="230" height="22" rx="4" fill={WARN} opacity="0.25" stroke={WARN} />
        <rect x="10" y="26" width="96" height="22" rx="4" fill={GOOD} opacity="0.5" />
        {label(12, 20, "what you might claim", WARN)}

        <rect x="10" y="72" width="96" height="22" rx="4" fill={GOOD} opacity="0.5" stroke={GOOD} />
        {label(12, 66, "what you can evidence today", GOOD)}

        <line x1="106" y1="48" x2="106" y2="72" stroke={N} strokeDasharray="4 3" />
        <line x1="240" y1="48" x2="240" y2="60" stroke={N} strokeDasharray="4 3" />
        <line x1="106" y1="60" x2="240" y2="60" stroke={N} strokeWidth="1.5" />
        {label(112, 56, "exposure — the part someone else checks", N)}
      </Frame>
    );
  }

  return (
    <Frame
      id="bv-p4"
      title="Ownership trades speed against survival"
      desc="A horizontal axis from one owner on the left to shared ownership on the right. Speed falls as you move right and resilience rises. Beneath it, expertise and authority are shown as two separate things an arrangement has to supply."
    >
      <line x1="24" y1="42" x2="296" y2="42" stroke={LINE} strokeWidth="2" />
      <circle cx="24" cy="42" r="5" fill={P} />
      <circle cx="296" cy="42" r="5" fill={P} />
      {label(24, 30, "one owner", N, 9.5)}
      <text x="296" y="30" textAnchor="end" fontSize="9.5" fill={N}>
        shared
      </text>
      {label(24, 58, "decides fastest", ASH)}
      <text x="296" y="58" textAnchor="end" fontSize="8.5" fill={ASH}>
        survives a departure
      </text>

      <rect x="24" y="76" width="126" height="26" rx="5" fill={L} stroke={LINE} />
      <rect x="170" y="76" width="126" height="26" rx="5" fill={L} stroke={LINE} />
      {label(34, 87, "Expertise", N, 9)}
      {label(34, 97, "knows what to do", ASH, 8)}
      {label(180, 87, "Authority", N, 9)}
      {label(180, 97, "can make it happen", ASH, 8)}
      <text x="160" y="93" textAnchor="middle" fontSize="11" fill={P}>
        +
      </text>
    </Frame>
  );
}
