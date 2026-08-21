export function Marquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="border-t border-b border-line overflow-hidden bg-surface py-3 select-none">
      <div className="marquee-track flex gap-10 whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted/60">
              {item}
            </span>
            <span className="text-accent text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
