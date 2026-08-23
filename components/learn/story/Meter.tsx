import clsx from "clsx";

/** Three-step bar. Comparing three options at a glance beats three paragraphs. */
export function Meter({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: 1 | 2 | 3;
  tone?: "good" | "warn" | "neutral";
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1 truncate text-caption text-ash">{label}</p>
      <div className="flex gap-1" role="img" aria-label={`${label}: ${value} of 3`}>
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={clsx(
              "h-1.5 flex-1 rounded-full",
              step > value
                ? "bg-line"
                : tone === "good"
                  ? "bg-good"
                  : tone === "warn"
                    ? "bg-warn"
                    : "bg-purple",
            )}
          />
        ))}
      </div>
    </div>
  );
}
