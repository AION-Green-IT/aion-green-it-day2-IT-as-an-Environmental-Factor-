import type { ReactNode } from "react";

type Props = {
  /** Stable id from the build prompt, so the slot can be found later. */
  slotId: string;
  title: string;
  children: ReactNode;
};

/**
 * Scaffolding only. Each slot marks a section of the build prompt that is not
 * implemented yet, so content can be filled in one piece at a time.
 */
export function Placeholder({ slotId, title, children }: Props) {
  return (
    <section aria-labelledby={`${slotId}-title`} className="placeholder-slot">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={`${slotId}-title`} className="text-h3 text-ink">
          {title}
        </h2>
        <code className="text-caption text-ash">{slotId}</code>
      </div>
      <p className="text-body text-ash">{children}</p>
    </section>
  );
}
