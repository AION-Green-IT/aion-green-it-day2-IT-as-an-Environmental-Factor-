import type { ReactNode } from "react";
import { CategoryLegend } from "./CategoryLegend";

type Props = {
  /** Left panel: company brief. */
  brief: ReactNode;
  /** Right column: hero illustration, dashboard or map. */
  children: ReactNode;
};

/**
 * Shared frame for the three case tabs. Case tabs are observation surfaces:
 * facts carry a neutral topic tag and nothing here suggests an action.
 */
export function CaseScaffold({ brief, children }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-[300px,1fr]">
      <div className="space-y-4">
        {brief}
        <CategoryLegend />
      </div>
      <div className="min-w-0 space-y-4">{children}</div>
    </div>
  );
}
