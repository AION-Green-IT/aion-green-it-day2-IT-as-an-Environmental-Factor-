"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ARTIFACTS } from "@/data/meridian";
import { InfoDialog } from "@/components/ui/InfoDialog";
import { ArtifactCard } from "./Artifacts";
import { StakeholderAvatar } from "./StakeholderAvatar";

type Row = {
  id: string;
  kind: string;
  who: "marcus" | "sabine" | "rafael" | "elena" | "external";
  from: string;
  subject: string;
  when: string;
};

/** One line per thing that arrived, so the page is a list rather than a wall. */
function rowFor(id: string): Row | null {
  const a = ARTIFACTS[id];
  if (!a) return null;

  if (a.kind === "email")
    return { id, kind: "Email", who: a.from, from: a.fromName, subject: a.subject, when: a.time };
  if (a.kind === "slack")
    return { id, kind: "Message", who: a.from, from: a.fromName, subject: a.message, when: a.time };
  if (a.kind === "memo")
    return { id, kind: "Memo", who: a.from, from: a.fromName, subject: a.subject, when: a.date };
  if (a.kind === "calendar")
    return {
      id,
      kind: "Meeting",
      who: "external",
      from: a.attendees[0] ?? "Calendar",
      subject: a.title,
      when: `${a.day} ${a.time}`,
    };
  if (a.kind === "figure")
    return { id, kind: "Document", who: "external", from: "On your desk", subject: a.title, when: "" };

  return null;
}

export function Inbox({ ids, plain }: { ids: string[]; plain: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [read, setRead] = useState<string[]>([]);
  const seen = useRef<string[]>([]);

  const rows = ids.map(rowFor).filter((r): r is Row => Boolean(r));
  const unread = rows.filter((r) => !read.includes(r.id)).length;

  // Anything present on first paint counts as already delivered, not as new.
  useEffect(() => {
    seen.current = ids;
  }, []);

  if (plain) {
    return (
      <section aria-label="Inbox, as text" className="card p-4">
        <h3 className="mb-2 text-h3 text-ink">Inbox</h3>
        {rows.map((r) => (
          <ArtifactCard key={r.id} id={r.id} plain />
        ))}
      </section>
    );
  }

  return (
    <section aria-label="Inbox" className="card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <h3 className="text-h3 text-ink">Inbox</h3>
        <span
          className={clsx(
            "rounded-full px-2.5 py-0.5 text-caption font-semibold",
            unread > 0 ? "bg-purple text-paper" : "border border-line text-ash",
          )}
        >
          {unread > 0 ? `${unread} unread` : `${rows.length} items`}
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="p-4 text-body text-ash">Nothing yet.</p>
      ) : (
        <ul>
          {rows.map((r) => {
            const isOpen = open === r.id;
            const isUnread = !read.includes(r.id);

            return (
              <li key={r.id} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    setOpen(isOpen ? null : r.id);
                    setRead((prev) => (prev.includes(r.id) ? prev : [...prev, r.id]));
                  }}
                  className={clsx(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200",
                    isOpen ? "bg-lilac/60" : "hover:bg-lilac/40",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "h-2 w-2 shrink-0 rounded-full",
                      isUnread ? "bg-purple" : "bg-transparent",
                    )}
                  />
                  <StakeholderAvatar who={r.who} size={24} />

                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span
                        className={clsx(
                          "truncate text-body",
                          isUnread ? "font-semibold text-ink" : "text-navy",
                        )}
                      >
                        {r.from}
                      </span>
                      <span className="shrink-0 rounded bg-lilac px-1.5 text-caption text-ash">
                        {r.kind}
                      </span>
                    </span>
                    <span className="block truncate text-caption text-ash">{r.subject}</span>
                  </span>

                  <span className="shrink-0 text-caption tabular-nums text-ash">{r.when}</span>
                </button>


              </li>
            );
          })}
        </ul>
      )}

      <p className="border-t border-line px-4 py-2 text-caption text-ash">
        Everything that has reached you. New items arrive as the weeks pass.
      </p>

      <InfoDialog
        open={Boolean(open)}
        title={rows.find((r) => r.id === open)?.subject ?? ""}
        onClose={() => setOpen(null)}
      >
        {open ? <ArtifactCard id={open} /> : null}
      </InfoDialog>
    </section>
  );
}
