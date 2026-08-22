"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/store";
import { AionLogo } from "./Icons";

function Readout({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-caption uppercase tracking-wide text-lilac/80">{label}</span>
      <span className="text-readout tabular-nums text-paper">{value}</span>
    </div>
  );
}

export function TopBar() {
  // Persisted values only exist on the client; hold zeros until hydrated so
  // server and client markup match.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const reset = useProgress((s) => s.reset);

  const onReset = () => {
    if (window.confirm("Reset progress? This clears XP, streak, badges and the visited log.")) {
      reset();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-navy text-paper">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-6">
        <Link href="/learn" className="flex items-center gap-3 rounded-md" aria-label="AION Green IT — go to Learn">
          <AionLogo className="h-6 w-20 text-paper" />
        </Link>

        <p className="min-w-0 flex-1 truncate text-caption text-lilac/90 md:text-body">
          Module 1 — Green IT as a Lever for Climate Protection &amp; Competitiveness
        </p>

        <div className="flex items-center gap-5">
          <Readout label="XP" value={hydrated ? xp : 0} />
          <Readout label="Streak" value={hydrated ? streak : 0} />
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-lilac/40 px-3 py-1.5 text-caption text-paper transition-colors duration-200 hover:border-paper hover:bg-paper/10 hover:underline"
          >
            Reset progress
          </button>
        </div>
      </div>
    </header>
  );
}
