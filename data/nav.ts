// Section 2 — the six routes, in this order, in the left rail.

export type NavItem = {
  href: string;
  label: string;
  /** Short tab label used when the rail collapses to top tabs on <768px. */
  short: string;
  icon: "learn" | "training" | "case" | "case" | "case" | "map";
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/learn", label: "Learn", short: "Learn", icon: "learn" },
  { href: "/training", label: "Training Ground", short: "Training", icon: "training" },
  { href: "/case/mediprint", label: "Case A — MediPrint", short: "MediPrint", icon: "case" },
  { href: "/case/nordcom", label: "Case B — NordCom", short: "NordCom", icon: "case" },
  { href: "/case/auron", label: "Case C — Auron", short: "Auron", icon: "case" },
  { href: "/task-map", label: "Task map", short: "Task map", icon: "map" },
];
