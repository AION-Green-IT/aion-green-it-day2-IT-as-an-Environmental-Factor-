// N4 — the five Green IT categories are fixed. Exact labels, exact short codes.
// Do not introduce a sixth category.

export type CategoryCode = "E" | "R" | "Em" | "U" | "G";

export type Category = {
  code: CategoryCode;
  name: string;
  /** Tailwind token name under `colors.cat` */
  token: "energy" | "resources" | "emissions" | "use" | "governance";
  hex: string;
};

export const CATEGORIES: Category[] = [
  { code: "E", name: "Energy", token: "energy", hex: "#F1B24A" },
  { code: "R", name: "Resources", token: "resources", hex: "#6FB56A" },
  { code: "Em", name: "Emissions", token: "emissions", hex: "#6E8DC1" },
  { code: "U", name: "Use", token: "use", hex: "#B389D6" },
  {
    code: "G",
    name: "Organisation & Governance",
    token: "governance",
    hex: "#3F3552",
  },
];

export const CATEGORY_BY_CODE: Record<CategoryCode, Category> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.code] = c;
    return acc;
  },
  {} as Record<CategoryCode, Category>,
);
