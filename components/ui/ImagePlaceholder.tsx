"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  /** Drop the file at public/assets/<file> and it renders instead of the box. */
  file: string;
  alt: string;
  prompt: string;
  /** Where the image sits in the layout. */
  ratio?: string;
  exists?: boolean;
};

/**
 * A picture-shaped hole with the brief for filling it. Until the file exists
 * the box states what belongs there and hands over a prompt to generate it
 * elsewhere; set `exists` and the real image takes over.
 */
export function ImagePlaceholder({
  file,
  alt,
  prompt,
  ratio = "16 / 9",
  exists = false,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  if (exists) {
    return (
      <div
        className="relative overflow-hidden rounded-xl border border-line"
        style={{ aspectRatio: ratio }}
      >
        <Image src={`/assets/${file}`} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setOpen(true);
    }
  };

  return (
    <figure className="rounded-xl border-2 border-dashed border-purple/50 bg-lilac/30 p-4">
      <div
        className="mb-3 flex items-center justify-center rounded-lg bg-paper/60"
        style={{ aspectRatio: ratio }}
      >
        <div className="px-4 text-center">
          <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            className="mx-auto mb-2 h-10 w-10 text-purple"
          >
            <rect x="5" y="9" width="38" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="16" cy="19" r="3.5" fill="currentColor" />
            <path d="M8 34l10-10 7 7 6-5 9 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
          <p className="text-caption font-semibold text-navy">Illustration goes here</p>
          <p className="mt-1 text-caption text-ash">{alt}</p>
        </div>
      </div>

      <figcaption className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copy}
            className="rounded-xl bg-purple px-3 py-1.5 text-caption font-semibold text-paper transition-colors duration-200 hover:bg-navy"
          >
            {copied ? "Prompt copied" : "Copy the image prompt"}
          </button>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-line px-3 py-1.5 text-caption font-semibold text-navy transition-colors duration-200 hover:bg-lilac hover:underline"
          >
            {open ? "Hide the prompt" : "Read the prompt"}
          </button>
          <code className="text-caption text-ash">
            save as public/assets/{file}
          </code>
        </div>

        {open ? (
          <textarea
            readOnly
            rows={7}
            value={prompt}
            onFocus={(e) => e.currentTarget.select()}
            className="w-full rounded-xl border border-line bg-paper p-3 text-caption text-ink"
          />
        ) : null}
      </figcaption>
    </figure>
  );
}
