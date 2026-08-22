import { CATEGORY_BY_CODE, type CategoryCode } from "@/data/categories";

type Props = {
  code: CategoryCode;
  /** Case tabs always use "topic". "answer" is for learn and training. */
  variant?: "topic" | "answer";
};

/** Chip text sits on a light tint of the category colour, never on the raw hue. */
export function CategoryChip({ code, variant = "topic" }: Props) {
  const category = CATEGORY_BY_CODE[code];
  const label =
    variant === "topic" ? `Topic area: ${category.name}` : category.name;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-lilac px-3 py-1 text-caption text-navy">
      <span
        aria-hidden="true"
        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: category.hex }}
      />
      {label}
    </span>
  );
}
