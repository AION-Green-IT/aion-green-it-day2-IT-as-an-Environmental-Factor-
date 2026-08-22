import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  intro: ReactNode;
};

export function PageHeader({ eyebrow, title, intro }: Props) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-purple">
        {eyebrow}
      </p>
      <h1 className="mb-3 text-h1 text-ink">{title}</h1>
      <p className="text-body text-ash">{intro}</p>
    </div>
  );
}
