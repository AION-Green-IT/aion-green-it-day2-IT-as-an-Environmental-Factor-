import { CATEGORY_BY_CODE } from "@/data/categories";

const OP = CATEGORY_BY_CODE.Op.hex;
const PR = CATEGORY_BY_CODE.Pr.hex;
const U = CATEGORY_BY_CODE.U.hex;
const RP = CATEGORY_BY_CODE.Rp.hex;
const ST = CATEGORY_BY_CODE.St.hex;

const STAGES: { code: string; name: string; sub: string; hex: string }[] = [
  { code: "Pr", name: "Procurement", sub: "on what criteria it is bought", hex: PR },
  { code: "U", name: "Use", sub: "the habits and defaults on top", hex: U },
  { code: "Op", name: "Operations", sub: "how it is run while in service", hex: OP },
  { code: "Rp", name: "Replacement", sub: "by the calendar, or by condition", hex: RP },
  { code: "St", name: "Storage", sub: "where it goes once retired", hex: ST },
];

/**
 * One picture for the whole scheme: the five areas are the questions you ask
 * along a device's life cycle, left to right. The two lenses cut across it —
 * resources are committed at the ends (buying and discarding), energy is spent
 * in the middle (using and running). The life-cycle view, not the usage phase
 * alone, is the point.
 */
export function CategoryDiagram() {
  const n = STAGES.length;
  const gap = 12;
  const boxW = (680 - 32 - gap * (n - 1)) / n; // fit five across a 680 canvas
  const boxY = 150;
  const boxH = 92;

  return (
    <figure className="rounded-xl border border-line bg-paper p-3">
      <svg
        viewBox="0 0 680 360"
        role="img"
        aria-labelledby="cat-diagram-title cat-diagram-desc"
        className="h-auto w-full"
      >
        <title id="cat-diagram-title">
          The five areas along a device life cycle
        </title>
        <desc id="cat-diagram-desc">
          Five areas run left to right as a life cycle: procurement, use,
          operations, replacement and storage. Above them, two lenses cut
          across: resources are committed at the ends, when devices are bought
          and when they are discarded; energy is spent in the middle, while they
          are used and run.
        </desc>

        {/* Resources lens — committed at the ends */}
        <rect x="16" y="40" width="146" height="30" rx="15" fill={PR} opacity="0.16" stroke={PR} />
        <text x="89" y="59" textAnchor="middle" fill="#1B1230" fontSize="12" fontWeight="600">
          Resources committed
        </text>
        <rect x="518" y="40" width="146" height="30" rx="15" fill={RP} opacity="0.16" stroke={RP} />
        <text x="591" y="59" textAnchor="middle" fill="#1B1230" fontSize="12" fontWeight="600">
          Resources wasted
        </text>

        {/* Energy lens — spent in the middle */}
        <rect x="180" y="40" width="320" height="30" rx="15" fill={OP} opacity="0.20" stroke={OP} />
        <text x="340" y="59" textAnchor="middle" fill="#1B1230" fontSize="12" fontWeight="600">
          Energy spent while used and run
        </text>

        {/* brackets down to the band */}
        <path d="M89 72 L89 96 L200 96 L200 146" fill="none" stroke={PR} strokeWidth="1.6" opacity="0.7" />
        <path d="M340 72 L340 120" fill="none" stroke={OP} strokeWidth="1.6" opacity="0.7" />
        <path d="M591 72 L591 96 L470 96 L470 146" fill="none" stroke={RP} strokeWidth="1.6" opacity="0.7" />

        {/* The life-cycle band */}
        {STAGES.map((s, i) => {
          const x = 16 + i * (boxW + gap);
          return (
            <g key={s.code}>
              <rect
                x={x}
                y={boxY}
                width={boxW}
                height={boxH}
                rx="12"
                fill={s.hex}
                opacity="0.16"
                stroke={s.hex}
              />
              <rect x={x + 10} y={boxY + 12} width="26" height="18" rx="9" fill={s.hex} />
              <text x={x + 23} y={boxY + 25} textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="700">
                {s.code}
              </text>
              <text x={x + boxW / 2} y={boxY + 54} textAnchor="middle" fill="#1B1230" fontSize="13" fontWeight="600">
                {s.name}
              </text>
              <text x={x + boxW / 2} y={boxY + 74} textAnchor="middle" fill="#6B6484" fontSize="10">
                {s.sub}
              </text>
              {i < n - 1 && (
                <path
                  d={`M${x + boxW + 1} ${boxY + boxH / 2} L${x + boxW + gap - 1} ${boxY + boxH / 2}`}
                  stroke="#6B6484"
                  strokeWidth="2"
                  markerEnd="url(#lc-arrow)"
                />
              )}
            </g>
          );
        })}

        <defs>
          <marker id="lc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B6484" />
          </marker>
        </defs>
      </svg>

      <figcaption className="mt-2 text-caption text-ash">
        The same laptop appears in every area, depending on the question you ask.
        Energy and resources are not one number: they land at different points in
        the life cycle.
      </figcaption>
    </figure>
  );
}
