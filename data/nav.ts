// Section 2 — the six routes, in this order, in the left rail.

export type NavItem = {
  href: string;
  label: string;
  /** Short tab label used when the rail collapses to top tabs on <768px. */
  short: string;
  icon: "learn" | "training" | "case" | "map";
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/learn", label: "Learn", short: "Learn", icon: "learn" },
  { href: "/training", label: "Training Ground", short: "Training", icon: "training" },
  { href: "/case/mediprint", label: "Case A — DataForm", short: "DataForm", icon: "case" },
  { href: "/case/nordcom", label: "Case B — NetCore", short: "NetCore", icon: "case" },
  { href: "/case/auron", label: "Case C — Artemis", short: "Artemis", icon: "case" },
  { href: "/task-map", label: "Task map", short: "Task map", icon: "map" },
];
