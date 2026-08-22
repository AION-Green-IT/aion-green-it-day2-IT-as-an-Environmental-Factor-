// N5 — every interactive surface carries a stable, human-readable id that a
// worksheet FIND IT line can reference. Ids are lowercase kebab-case and must
// stay stable across deploys.

export type VisitedKind = "hotspots" | "learnWidgets" | "trainingCards";

export const kebab = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** e.g. scopedId("mediprint", "server-room") -> "mediprint/server-room" */
export const scopedId = (scope: string, id: string): string =>
  `${kebab(scope)}/${kebab(id)}`;
