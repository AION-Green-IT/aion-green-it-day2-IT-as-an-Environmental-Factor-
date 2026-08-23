"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NAV_ITEMS } from "@/data/nav";
import { CaseIcon, CompassIcon, LearnIcon, MapIcon, TrainingIcon } from "./Icons";

const ICONS = {
  learn: LearnIcon,
  training: TrainingIcon,
  case: CaseIcon,
  compass: CompassIcon,
  map: MapIcon,
} as const;

export function LeftRail() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Module sections"
      className="border-b border-line bg-lilac/40 md:w-64 md:shrink-0 md:border-b-0 md:border-r"
    >
      {/* Collapses to a scrollable top tab strip below 768px. */}
      <ul className="flex overflow-x-auto p-2 md:sticky md:top-[60px] md:flex-col md:gap-1 md:overflow-visible md:p-4">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          const active = pathname === item.href;
          return (
            <li key={item.href} className="shrink-0 md:shrink">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-body transition-colors duration-200",
                  active
                    ? "bg-purple font-semibold text-paper"
                    : "text-ink hover:bg-paper hover:underline",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="md:hidden">{item.short}</span>
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
