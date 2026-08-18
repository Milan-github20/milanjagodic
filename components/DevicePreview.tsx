function ListUi() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="mb-1 h-7 rounded-md bg-accent/80" />
      {[72, 88, 64, 80, 56].map((width, index) => (
        <div
          key={index}
          className="flex items-center gap-2 rounded-md border border-line/60 bg-surface px-2 py-1.5"
        >
          <span className="size-5 shrink-0 rounded-full bg-accent-soft" />
          <span
            className="h-1.5 rounded-full bg-line"
            style={{ width: `${width}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function CalendarUi() {
  const filled = new Set([8, 9, 15, 22]);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-7 rounded-md bg-ink/20" />
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 28 }, (_, index) => (
          <div
            key={index}
            className={`aspect-square rounded-[3px] ${
              filled.has(index) ? "bg-accent/70" : "bg-line/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function DevicePreview({
  variant,
}: {
  variant: "list" | "calendar";
}) {
  return (
    <div className="mx-auto w-[190px] sm:w-[210px]">
      <div className="rounded-[1.75rem] border border-line bg-surface-raised px-3 pb-4 pt-3 shadow-[0_0_40px_var(--glow)]">
        <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-ink/20" />
        {variant === "list" ? <ListUi /> : <CalendarUi />}
      </div>
    </div>
  );
}
