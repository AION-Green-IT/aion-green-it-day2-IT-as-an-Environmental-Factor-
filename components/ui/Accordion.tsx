"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";

export type AccordionItem = {
  id: string;
  /** Small pill on the header, e.g. "L1 · Knowledge". */
  pill: string;
  summary: string;
  content: ReactNode;
};

export function Accordion({
  items,
  defaultOpen,
}: {
  items: AccordionItem[];
  defaultOpen?: string;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-line">
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className={clsx(
                  "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200",
                  isOpen ? "bg-lilac" : "bg-paper hover:bg-lilac/60",
                )}
              >
                <span className="rounded-full bg-navy px-3 py-1 text-caption font-semibold text-paper">
                  {item.pill}
                </span>
                <span className="min-w-0 flex-1 text-body text-ink">{item.summary}</span>
                <span aria-hidden="true" className="text-h3 text-purple">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h2>

            {isOpen ? (
              <div id={`${item.id}-panel`} className="space-y-4 border-t border-line p-4">
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
