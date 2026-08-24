"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * The root sends people to /learn. A static export has no server to issue a
 * redirect, so this happens on the client — with a real link behind it so the
 * page still works without JavaScript.
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/learn");
  }, [router]);

  return (
    <div className="mx-auto max-w-md p-8 text-center">
      <p className="mb-3 text-body text-ash">Opening the module…</p>
      <Link
        href="/learn"
        className="rounded text-body font-semibold text-purple underline underline-offset-2"
      >
        Continue to Learn
      </Link>
    </div>
  );
}
