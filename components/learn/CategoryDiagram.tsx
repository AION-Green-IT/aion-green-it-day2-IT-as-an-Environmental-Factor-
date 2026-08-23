import { CATEGORY_BY_CODE } from "@/data/categories";

const E = CATEGORY_BY_CODE.E.hex;
const R = CATEGORY_BY_CODE.R.hex;
const EM = CATEGORY_BY_CODE.Em.hex;
const U = CATEGORY_BY_CODE.U.hex;
const G = CATEGORY_BY_CODE.G.hex;

/**
 * One picture for the whole scheme: governance is the frame everything else
 * sits inside, and the other four are the flows in and out of the same IT.
 */
export function CategoryDiagram() {
  return (
    <figure className="rounded-xl border border-line bg-paper p-3">
      <svg
        viewBox="0 0 680 380"
        role="img"
        aria-labelledby="cat-diagram-title cat-diagram-desc"
        className="h-auto w-full"
      >
        <title id="cat-diagram-title">
          The five Green IT categories around one IT estate
        </title>
        <desc id="cat-diagram-desc">
          Organisation and Governance forms a frame around the whole picture. Inside it,
          Resources flows in from the top as devices and materials, Energy flows in from
          the left as power drawn while running, Emissions flows out to the right as what
          the energy released, and Use sits below as the habits and default settings
          people apply.
        </desc>

        {/* Governance frame */}
        <rect
          x="8" y="8" width="664" height="364" rx="20"
          fill="none" stroke={G} strokeWidth="2" strokeDasharray="8 6"
        />
        {/* Straddles the frame line at y=8 so it reads as a label on the frame. */}
        <rect x="26" y="-4" width="406" height="26" rx="13" fill={G} />
        <text id="cat-diagram-g-label" x="42" y="13" fill="#FFFFFF" fontSize="12.5" fontWeight="600">
          Organisation &amp; Governance — who decides, and by which rule
        </text>

        {/* The estate */}
        <rect x="252" y="150" width="176" height="80" rx="14" fill="#EEE9F9" stroke="#D9D3EA" />
        <text x="340" y="184" textAnchor="middle" fill="#1B1230" fontSize="15" fontWeight="600">
          Your IT
        </text>
        <text x="340" y="204" textAnchor="middle" fill="#6B6484" fontSize="12">
          devices · servers · cloud
        </text>

        {/* Resources in, from the top */}
        <g>
          <rect x="240" y="46" width="200" height="46" rx="12" fill={R} opacity="0.18" stroke={R} />
          <text x="340" y="66" textAnchor="middle" fill="#1B1230" fontSize="13" fontWeight="600">
            Resources (R)
          </text>
          <text x="340" y="83" textAnchor="middle" fill="#1B1230" fontSize="11">
            what was made, and what is thrown away
          </text>
          <path d="M340 96 L340 144" stroke={R} strokeWidth="2.5" markerEnd="url(#arrowR)" />
        </g>

        {/* Energy in, from the left */}
        <g>
          <rect x="30" y="167" width="180" height="46" rx="12" fill={E} opacity="0.22" stroke={E} />
          <text x="120" y="187" textAnchor="middle" fill="#1B1230" fontSize="13" fontWeight="600">
            Energy (E)
          </text>
          <text x="120" y="204" textAnchor="middle" fill="#1B1230" fontSize="11">
            power drawn while running
          </text>
          <path d="M214 190 L246 190" stroke={E} strokeWidth="2.5" markerEnd="url(#arrowE)" />
        </g>

        {/* Emissions out, to the right */}
        <g>
          <rect x="470" y="167" width="180" height="46" rx="12" fill={EM} opacity="0.22" stroke={EM} />
          <text x="560" y="187" textAnchor="middle" fill="#1B1230" fontSize="13" fontWeight="600">
            Emissions (Em)
          </text>
          <text x="560" y="204" textAnchor="middle" fill="#1B1230" fontSize="11">
            what that energy released
          </text>
          <path d="M434 190 L466 190" stroke={EM} strokeWidth="2.5" markerEnd="url(#arrowEm)" />
        </g>

        {/* Use, underneath */}
        <g>
          <rect x="240" y="288" width="200" height="46" rx="12" fill={U} opacity="0.22" stroke={U} />
          <text x="340" y="308" textAnchor="middle" fill="#1B1230" fontSize="13" fontWeight="600">
            Use (U)
          </text>
          <text x="340" y="325" textAnchor="middle" fill="#1B1230" fontSize="11">
            the habits and defaults on top
          </text>
          <path d="M340 284 L340 236" stroke={U} strokeWidth="2.5" markerEnd="url(#arrowU)" />
        </g>

        <defs>
          {[
            ["arrowR", R],
            ["arrowE", E],
            ["arrowEm", EM],
            ["arrowU", U],
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

      <figcaption className="mt-2 text-caption text-ash">
        Governance is drawn as the frame on purpose: it is the only one of the five that
        decides the other four.
      </figcaption>
    </figure>
  );
}
