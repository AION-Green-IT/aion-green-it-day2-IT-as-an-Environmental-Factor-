// N4 — the five Day 2 areas are fixed. Exact labels, exact short codes.
// Do not introduce a sixth area. These are the areas the curriculum names in
// Task 1 step 3: operations, procurement, use, replacement, storage.
// They also read as a device life cycle: procurement -> use -> operations ->
// replacement -> storage.

export type CategoryCode = "Op" | "Pr" | "U" | "Rp" | "St";

export type Category = {
  code: CategoryCode;
  name: string;
  /** Tailwind token name under `colors.cat` */
  token: "operations" | "procurement" | "use" | "replacement" | "storage";
  hex: string;
};

export const CATEGORIES: Category[] = [
  { code: "Op", name: "Operations", token: "operations", hex: "#F1B24A" },
  { code: "Pr", name: "Procurement", token: "procurement", hex: "#6E8DC1" },
  { code: "U", name: "Use", token: "use", hex: "#B389D6" },
  { code: "Rp", name: "Replacement", token: "replacement", hex: "#6FB56A" },
  { code: "St", name: "Storage", token: "storage", hex: "#3F3552" },
];

export const CATEGORY_BY_CODE: Record<CategoryCode, Category> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.code] = c;
    return acc;
  },
  {} as Record<CategoryCode, Category>,
);
