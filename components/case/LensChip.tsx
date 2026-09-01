export type Lens = "energy" | "resource" | "both";

const LENS_LABEL: Record<Lens, string> = {
  energy: "Energy",
  resource: "Resource / material",
  both: "Energy & resource",
};

const LENS_HEX: Record<Lens, string> = {
  energy: "#C0721D",
  resource: "#2F9E5A",
  both: "#5624D0",
};

/** Marks whether a finding is an energy point, a resource point, or both — the
 * second lens Task 1 (and the six-perspectives step) asks for, made visible
 * once a learner opens the marker instead of staying only in their own head. */
export function LensChip({ lens }: { lens: Lens }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-lilac px-3 py-1 text-caption text-navy">
      <span
        aria-hidden="true"
        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: LENS_HEX[lens] }}
      />
      Lens: {LENS_LABEL[lens]}
    </span>
  );
}
