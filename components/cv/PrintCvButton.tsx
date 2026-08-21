"use client";

export function PrintCvButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center justify-center bg-accent px-5 text-sm font-medium text-canvas transition hover:bg-ink"
    >
      {label}
    </button>
  );
}
