type Point = { label: string; value: number; key: string };

export function RadarChart({
  data,
  size = 420,
  showLabels = true,
}: {
  data: Point[];
  size?: number;
  showLabels?: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const rings = [0.25, 0.5, 0.75, 1];

  const angle = (i: number) => (Math.PI * 2 * i) / data.length - Math.PI / 2;
  const point = (i: number, r: number) => {
    const a = angle(i);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  };

  const polygon = data
    .map((d, i) => {
      const [x, y] = point(i, (d.value / 100) * radius);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-auto"
      role="img"
      aria-label="Quotient radar"
    >
      {/* rings */}
      {rings.map((r, i) => (
        <polygon
          key={i}
          points={data
            .map((_, idx) => {
              const [x, y] = point(idx, radius * r);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="var(--border)"
          strokeWidth={i === rings.length - 1 ? 1 : 0.5}
          opacity={0.7}
        />
      ))}
      {/* axes */}
      {data.map((_, i) => {
        const [x, y] = point(i, radius);
        return (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border)" strokeWidth={0.5} />
        );
      })}
      {/* polygon */}
      <polygon
        points={polygon}
        fill="var(--gold)"
        fillOpacity={0.12}
        stroke="var(--gold)"
        strokeWidth={1.25}
      />
      {/* nodes */}
      {data.map((d, i) => {
        const [x, y] = point(i, (d.value / 100) * radius);
        return <circle key={i} cx={x} cy={y} r={3} fill="var(--gold)" />;
      })}
      {/* labels */}
      {showLabels &&
        data.map((d, i) => {
          const [x, y] = point(i, radius + 26);
          return (
            <g key={d.key}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-mono)"
                fontSize="10"
                letterSpacing="0.18em"
                fill="var(--muted-foreground)"
              >
                {d.label.toUpperCase()}
              </text>
              <text
                x={x}
                y={y + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-display)"
                fontSize="13"
                fill="var(--foreground)"
              >
                {d.value}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
