"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Long reference text is folded away behind a line that says what is inside, so
 * the page stays readable and the detail is one click from anyone who wants it.
 */
export function Collapsible({
  label,
  hint,
  children,
  defaultOpen = false,
  variant = "panel",
}: {
  label: string;
  /** What the reader gets by opening it. */
  hint?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: "panel" | "quiet";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = label.replace(/\W+/g, "-").toLowerCase();

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-xl",
        variant === "panel" ? "border border-line" : "",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen(!open)}
        className={clsx(
          "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors duration-200",
          open ? "bg-lilac/60" : "bg-paper hover:bg-lilac/40",
        )}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-body font-semibold text-ink">{label}</span>
          {hint ? <span className="block text-caption text-ash">{hint}</span> : null}
        </span>
        <span
          aria-hidden="true"
          className={clsx(
            "shrink-0 text-h3 leading-none text-purple transition-transform duration-200",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </button>

      {open ? (
        <div id={`${id}-panel`} className="border-t border-line p-3">
          {children}
        </div>
      ) : null}
    </div>
  );
}
