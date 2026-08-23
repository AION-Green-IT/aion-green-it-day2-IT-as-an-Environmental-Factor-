import clsx from "clsx";
import { CUSTOMER_ASKS, type AskId } from "@/data/story";

/**
 * The questionnaire named three asks. Which of them a choice can answer is the
 * sharpest consequence in the chapter — and no single year's budget answers
 * all three, which is the sequencing lesson seen from outside the company.
 */
export function CustomerAsk({
  delivers,
  deadlineKnown,
}: {
  delivers: AskId[];
  deadlineKnown: boolean;
}) {
  const met = delivers.length;

  return (
    <div className="rounded-xl border border-line p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-body font-semibold text-ink">
          What you can send the customer
        </p>
        <p className="text-caption text-ash">
          {deadlineKnown ? "Due in five months" : "Deadline unknown to you"}
        </p>
      </div>

      <ul className="space-y-2">
        {CUSTOMER_ASKS.map((ask) => {
          const have = delivers.includes(ask.id);
          return (
            <li
              key={ask.id}
              className={clsx(
                "flex items-center gap-3 rounded-lg border p-2",
                have ? "border-good bg-good/10" : "border-dashed border-line bg-lilac/30",
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-caption font-semibold",
                  have ? "bg-good text-paper" : "border-2 border-dashed border-ash text-ash",
                )}
              >
                {have ? "✓" : "—"}
              </span>
              <span className={clsx("text-body", have ? "text-ink" : "text-ash")}>
                {ask.label}
              </span>
              <span
                className={clsx(
                  "ml-auto shrink-0 text-caption font-semibold",
                  have ? "text-good" : "text-ash",
                )}
              >
                {have ? "can answer" : "cannot answer"}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-lilac">
          <div
            className={clsx(
              "h-full rounded-full transition-all duration-300",
              met === 0 ? "bg-danger" : met >= 3 ? "bg-good" : "bg-warn",
            )}
            style={{ width: `${(met / CUSTOMER_ASKS.length) * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-caption tabular-nums text-ash">
          {met} of {CUSTOMER_ASKS.length}
        </span>
      </div>

      <p className="mt-2 text-caption text-navy">
        One year of budget never answers all three. Which two you can answer — and which
        one you have to explain away — is what you actually chose in Q2.
      </p>
    </div>
  );
}
