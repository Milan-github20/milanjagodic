export function ArchitectureDiagram({
  variant,
  caption,
}: {
  variant: "tennis" | "preferito";
  caption: string;
}) {
  if (variant === "preferito") {
    return (
      <svg
        viewBox="0 0 720 200"
        className="w-full text-ink"
        aria-label="Preferito architecture diagram"
        role="img"
      >
        <defs>
          <marker id="arrow-p" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" className="text-muted" />
          </marker>
        </defs>
        {[
          { x: 20, label: "React SPA" },
          { x: 170, label: "Auth" },
          { x: 320, label: "Postgres + RLS" },
          { x: 490, label: "RPC / triggers" },
          { x: 620, label: "Vercel" },
        ].map((node, i, arr) => (
          <g key={node.label}>
            <rect
              x={node.x}
              y="70"
              width="120"
              height="60"
              rx="8"
              fill="none"
              stroke="currentColor"
              className="text-line"
            />
            <text
              x={node.x + 60}
              y="105"
              textAnchor="middle"
              className="fill-ink text-[11px]"
            >
              {node.label}
            </text>
            {i < arr.length - 1 && (
              <line
                x1={node.x + 120}
                y1="100"
                x2={arr[i + 1].x}
                y2="100"
                stroke="currentColor"
                className="text-muted"
                markerEnd="url(#arrow-p)"
              />
            )}
          </g>
        ))}
        <text x="360" y="175" textAnchor="middle" className="fill-muted text-[10px]">
          {caption}
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 720 220"
      className="w-full text-ink"
      aria-label="Tennis Match architecture diagram"
      role="img"
    >
      <defs>
        <marker id="arrow-t" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" className="text-muted" />
        </marker>
      </defs>
      {[
        { x: 10, label: "Next.js client" },
        { x: 150, label: "Auth" },
        { x: 290, label: "Postgres + RLS" },
        { x: 430, label: "Realtime" },
        { x: 560, label: "ELO jobs" },
      ].map((node, i, arr) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y="80"
            width="120"
            height="60"
            rx="8"
            fill="none"
            stroke="currentColor"
            className="text-line"
          />
          <text
            x={node.x + 60}
            y="115"
            textAnchor="middle"
            className="fill-ink text-[11px]"
          >
            {node.label}
          </text>
          {i < arr.length - 1 && (
            <line
              x1={node.x + 120}
              y1="110"
              x2={arr[i + 1].x}
              y2="110"
              stroke="currentColor"
              className="text-muted"
              markerEnd="url(#arrow-t)"
            />
          )}
        </g>
      ))}
      <text x="360" y="190" textAnchor="middle" className="fill-muted text-[10px]">
        {caption}
      </text>
    </svg>
  );
}
