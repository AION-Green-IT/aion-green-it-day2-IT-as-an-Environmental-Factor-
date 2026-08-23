import { STAKEHOLDERS } from "@/data/meridian";
import type { StakeholderKey } from "@/lib/types";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

/**
 * Geometric only: a tinted rounded square with initials. No facial features and
 * nothing that encodes ethnicity (NS7).
 */
export function StakeholderAvatar({
  who,
  size = 40,
}: {
  who: StakeholderKey | "external";
  size?: 24 | 40 | 64;
}) {
  const person = who === "external" ? null : STAKEHOLDERS[who];
  const tint = person?.tint ?? "#6B6484";
  const text = person ? initials(person.name) : "··";

  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-lg font-semibold text-paper"
      style={{
        width: size,
        height: size,
        backgroundColor: tint,
        fontSize: size === 24 ? 10 : size === 40 ? 14 : 22,
      }}
    >
      {text}
    </span>
  );
}
