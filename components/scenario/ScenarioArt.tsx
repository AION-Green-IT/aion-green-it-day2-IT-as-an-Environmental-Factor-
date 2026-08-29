import { CATEGORY_BY_CODE, type CategoryCode } from "@/data/categories";
import type { FigureArt } from "@/data/meridian";
import type { EndingId } from "@/lib/types";

/** Shared frame: every scenario SVG is labelled for a screen reader (R7). */
function Figure({
  id,
  title,
  desc,
  viewBox,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  viewBox: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
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

const N = "#231A45";
const P = "#5624D0";
const L = "#EEE9F9";
const LINE = "#D9D3EA";
const ASH = "#6B6484";

export function FigureArtwork({
  id,
  art,
  title,
  desc,
}: {
  id: string;
  art: FigureArt;
  title: string;
  desc: string;
}) {
  const body: Record<FigureArt, React.ReactNode> = {
    "audit-preview": (
      <>
        <rect width="320" height="140" rx="10" fill={L} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={16 + i * 98} y="16" width="86" height="50" rx="6" fill="#FFF" stroke={LINE} />
            <rect x={26 + i * 98} y={46 - i * 8} width="12" height={12 + i * 8} fill={P} />
            <rect x={44 + i * 98} y={38 - i * 4} width="12" height={20 + i * 4} fill={P} opacity="0.55" />
            <rect x={62 + i * 98} y="30" width="12" height="28" fill={P} opacity="0.3" />
          </g>
        ))}
        {[0, 1].map((i) => (
          <rect
            key={i}
            x={16 + i * 98}
            y="78"
            width="86"
            height="46"
            rx="6"
            fill="none"
            stroke={ASH}
            strokeDasharray="6 5"
          />
        ))}
        <rect x="212" y="78" width="92" height="46" rx="6" fill="#FFF" stroke={LINE} />
      </>
    ),
    "laptop-photo": (
      <>
        <rect width="320" height="140" rx="10" fill={L} />
        <rect x="40" y="86" width="240" height="34" rx="4" fill={N} opacity="0.15" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={58 + i * 52} y={54 - (i % 2) * 8} width="44" height={34 + (i % 2) * 8} rx="4" fill="#FFF" stroke={LINE} />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={84 + i * 52} y="36" width="44" height="20" rx="4" fill="#FFF" stroke={LINE} />
        ))}
      </>
    ),
    "workshop-notes": (
      <>
        <rect width="320" height="140" rx="10" fill="#FFF" stroke={LINE} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line x1={16 + i * 74} y1="14" x2={16 + i * 74} y2="126" stroke={LINE} />
            <rect x={22 + i * 74} y="20" width="52" height="8" rx="4" fill={N} opacity="0.5" />
            {[0, 1, 2].map((j) => (
              <rect
                key={j}
                x={22 + i * 74}
                y={40 + j * 26}
                width="52"
                height="20"
                rx="3"
                fill={[P, "#F1B24A", "#6FB56A"][(i + j) % 3]}
                opacity="0.45"
              />
            ))}
          </g>
        ))}
      </>
    ),
    "consultant-report": (
      <>
        <rect width="320" height="140" rx="10" fill={L} />
        <rect x="104" y="14" width="112" height="112" rx="6" fill="#FFF" stroke={LINE} />
        <rect x="104" y="14" width="10" height="112" fill={P} />
        <rect x="126" y="36" width="72" height="8" rx="4" fill={N} opacity="0.6" />
        <rect x="126" y="52" width="52" height="6" rx="3" fill={ASH} opacity="0.5" />
        <rect x="126" y="96" width="34" height="6" rx="3" fill={ASH} opacity="0.5" />
      </>
    ),
    "fleet-dashboard": (
      <>
        <rect width="320" height="140" rx="10" fill="#FFF" stroke={LINE} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="20" y={22 + i * 22} width={40 + i * 48} height="12" rx="6" fill={P} opacity={0.25 + i * 0.15} />
            <rect x="240" y={22 + i * 22} width="60" height="12" rx="6" fill={L} />
          </g>
        ))}
      </>
    ),
    "cloud-savings": (
      <>
        <rect width="320" height="140" rx="10" fill="#FFF" stroke={LINE} />
        <polyline
          points="20,36 84,52 148,64 212,92 296,104"
          fill="none"
          stroke="#2F9E5A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {[
          [84, 52],
          [148, 64],
          [212, 92],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="4.5" fill="#2F9E5A" />
        ))}
        <line x1="20" y1="120" x2="300" y2="120" stroke={LINE} />
      </>
    ),
  };

  return (
    <Figure id={id} title={title} desc={desc} viewBox="0 0 320 140">
      {body[art]}
    </Figure>
  );
}

export function StackedBar({
  id,
  segments,
}: {
  id: string;
  segments: { label: string; value: number; category: CategoryCode }[];
}) {
  let x = 0;
  return (
    <Figure
      id={id}
      title="Share of IT energy by area"
      desc={segments.map((s) => `${s.label}: ${s.value} percent`).join(". ")}
      viewBox="0 0 320 24"
    >
      {segments.map((s) => {
        const w = (s.value / 100) * 320;
        const el = (
          <rect
            key={s.label}
            x={x}
            y="0"
            width={w}
            height="24"
            fill={CATEGORY_BY_CODE[s.category].hex}
          />
        );
        x += w;
        return el;
      })}
    </Figure>
  );
}

export function SlideMockup({ id }: { id: string }) {
  return (
    <Figure
      id={id}
      title="Draft presentation slide"
      desc="A slide frame with an empty headline box and four empty bullet lines. Corner label: Marketing, draft version two."
      viewBox="0 0 320 180"
    >
      <rect width="320" height="180" rx="8" fill="#FFF" stroke={LINE} />
      <rect x="20" y="20" width="280" height="44" rx="6" fill="none" stroke={P} strokeDasharray="7 5" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="28" cy={90 + i * 20} r="3" fill={ASH} />
          <rect x="38" y={86 + i * 20} width={200 - i * 22} height="8" rx="4" fill={L} />
        </g>
      ))}
      <rect x="228" y="158" width="72" height="12" rx="3" fill={L} />
    </Figure>
  );
}

export function OrgChart({ id }: { id: string }) {
  const box = (x: number, y: number, w: number, label: string, on?: boolean) => (
    <g key={label}>
      <rect
        x={x}
        y={y}
        width={w}
        height="30"
        rx="6"
        fill={on ? "#FFF" : L}
        stroke={on ? P : LINE}
        strokeWidth={on ? 2.5 : 1}
        strokeDasharray={on ? "6 4" : undefined}
      />
      <text x={x + w / 2} y={y + 19} textAnchor="middle" fontSize="10" fill={N}>
        {label}
      </text>
    </g>
  );

  return (
    <Figure
      id={id}
      title="Green IT ownership is unassigned"
      desc="An organisation chart with Board, CIO, IT Strategy Lead, Procurement Lead and Operations Lead filled in, and one highlighted empty box labelled Green IT ownership."
      viewBox="0 0 320 190"
    >
      <path d="M160 46v14M60 74h200M60 74v12M160 74v12M260 74v12M160 116v14" stroke={LINE} fill="none" />
      {box(120, 16, 80, "Board")}
      {box(120, 46, 80, "CIO")}
      {box(20, 86, 80, "IT Strategy")}
      {box(120, 86, 80, "Procurement")}
      {box(220, 86, 80, "Operations")}
      {box(100, 130, 120, "Green IT ownership: ?", true)}
    </Figure>
  );
}

export function EndingArt({ ending }: { ending: EndingId }) {
  const art: Record<EndingId, { desc: string; body: React.ReactNode }> = {
    "photo-op-trap": {
      desc: "A flat line under a bright spotlight.",
      body: (
        <>
          <path d="M150 20l60 90H90z" fill="#F1B24A" opacity="0.25" />
          <line x1="40" y1="112" x2="260" y2="112" stroke={N} strokeWidth="3" />
        </>
      ),
    },
    "slow-burn": {
      desc: "A single small candle burning steadily.",
      body: (
        <>
          <rect x="138" y="70" width="24" height="52" rx="4" fill={L} stroke={LINE} />
          <path d="M150 44c8 10 8 16 0 22-8-6-8-12 0-22Z" fill="#2F9E5A" />
          <line x1="150" y1="66" x2="150" y2="70" stroke={N} strokeWidth="2" />
        </>
      ),
    },
    overreach: {
      desc: "An arrow that overshoots its target and continues past the frame.",
      body: (
        <>
          <circle cx="120" cy="80" r="26" fill="none" stroke={LINE} strokeWidth="3" />
          <path d="M40 120L250 36" stroke="#B33A3A" strokeWidth="3" />
          <path d="M250 36l-18 2 6 14z" fill="#B33A3A" />
        </>
      ),
    },
    "missed-opportunity": {
      desc: "An hourglass with all the sand at the bottom.",
      body: (
        <>
          <path d="M120 36h60l-30 40 30 40h-60l30-40z" fill="none" stroke={N} strokeWidth="2.5" />
          <path d="M126 110h48l-24-28z" fill="#C0721D" />
        </>
      ),
    },
    "governance-win": {
      desc: "A relay baton passing from one hand to another.",
      body: (
        <>
          <rect x="112" y="72" width="76" height="12" rx="6" fill="#2F9E5A" />
          <path d="M96 62c-10 8-10 24 0 32M204 62c10 8 10 24 0 32" stroke={N} strokeWidth="3" fill="none" />
        </>
      ),
    },
    "quiet-architect": {
      desc: "Foundation stones set below ground level, with a clean structure standing on them.",
      body: (
        <>
          <path d="M60 116h180" stroke={N} strokeWidth="2.5" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={72 + i * 44} y="98" width="36" height="18" rx="3" fill="#2F9E5A" opacity="0.55" />
          ))}
          <rect x="104" y="52" width="92" height="46" rx="4" fill="none" stroke={N} strokeWidth="2.5" />
          <path d="M104 52l46-22 46 22" fill="none" stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
        </>
      ),
    },
    "quiet-drift": {
      desc: "An empty desk with a single chair pushed in.",
      body: (
        <>
          <rect x="80" y="86" width="140" height="8" rx="3" fill={N} opacity="0.6" />
          <path d="M92 94v26M208 94v26" stroke={N} strokeWidth="3" />
          <rect x="132" y="60" width="36" height="26" rx="4" fill="none" stroke={LINE} strokeWidth="2.5" />
        </>
      ),
    },
  };

  return (
    <Figure
      id={`ending-${ending}`}
      title={`Ending illustration: ${ending}`}
      desc={art[ending].desc}
      viewBox="0 0 300 150"
    >
      <rect width="300" height="150" rx="10" fill={L} opacity="0.5" />
      {art[ending].body}
    </Figure>
  );
}
