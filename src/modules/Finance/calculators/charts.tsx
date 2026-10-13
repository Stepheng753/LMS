import React, { useEffect, useRef, useState } from 'react';

export const PALETTE = ['var(--primary)', '#0f766e', '#b45309', '#6d28d9', '#475569', '#be185d'];

export interface Series {
  name: string;
  color?: string;
  points: { x: number; y: number }[];
  dashed?: boolean;
}

interface LineProps {
  title?: string;
  series: Series[];
  format: (n: number) => string;
  xLabel?: string;
  xFormat?: (n: number) => string;
  height?: number;
}

const M = { top: 16, right: 16, bottom: 34, left: 58 };

function niceTicks(max: number): number[] {
  if (max <= 0) return [0, 1];
  const p = Math.pow(10, Math.floor(Math.log10(max)));
  const f = max / p;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  const top = nice * p;
  return [0, 1, 2, 3, 4].map((i) => (top * i) / 4);
}

// Multi-series line chart with a hover read-out for every series.
export const LineChart: React.FC<LineProps> = ({ title, series, format, xLabel = 'Year', xFormat = (n) => String(n), height = 280 }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(640);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const xs = Array.from(new Set(series.flatMap((s) => s.points.map((p) => p.x)))).sort((a, b) => a - b);
  if (xs.length === 0) return null;
  const xMin = xs[0];
  const xMax = xs[xs.length - 1];
  const yMax = Math.max(1, ...series.flatMap((s) => s.points.map((p) => p.y)));
  const ticks = niceTicks(yMax);
  const top = ticks[ticks.length - 1];
  const plotW = w - M.left - M.right;
  const plotH = height - M.top - M.bottom;
  const X = (x: number) => M.left + (xMax === xMin ? 0 : ((x - xMin) / (xMax - xMin)) * plotW);
  const Y = (y: number) => M.top + plotH * (1 - y / top);
  const xTickCount = Math.min(xs.length, w < 420 ? 4 : 8);
  const xTicks = Array.from({ length: xTickCount }, (_, i) => xs[Math.round((i * (xs.length - 1)) / Math.max(1, xTickCount - 1))]);

  const onMove = (e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / rect.width;
    const x = xMin + rel * (xMax - xMin);
    let best = xs[0];
    for (const v of xs) if (Math.abs(v - x) < Math.abs(best - x)) best = v;
    setHover(best);
  };

  return (
    <figure className="rounded-lg border border-border bg-card p-4">
      {title && <figcaption className="font-semibold text-foreground text-sm mb-2">{title}</figcaption>}
      <div ref={wrap} className="relative">
        <svg width={w} height={height} role="img" aria-label={title ?? 'Line chart'} onMouseLeave={() => setHover(null)} className="block overflow-visible">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={M.left} x2={w - M.right} y1={Y(t)} y2={Y(t)} style={{ stroke: 'var(--border)' }} />
              <text x={M.left - 8} y={Y(t) + 4} textAnchor="end" style={{ fill: 'var(--muted-foreground)', fontSize: 11 }}>
                {format(t)}
              </text>
            </g>
          ))}
          {xTicks.map((x) => (
            <text key={x} x={X(x)} y={height - 14} textAnchor="middle" style={{ fill: 'var(--muted-foreground)', fontSize: 11 }}>
              {xFormat(x)}
            </text>
          ))}
          <text x={M.left + plotW / 2} y={height - 1} textAnchor="middle" style={{ fill: 'var(--muted-foreground)', fontSize: 10 }}>
            {xLabel}
          </text>
          {hover !== null && <line x1={X(hover)} x2={X(hover)} y1={M.top} y2={M.top + plotH} style={{ stroke: 'var(--muted-foreground)' }} strokeDasharray="3 3" />}
          {series.map((s, i) => {
            const color = s.color ?? PALETTE[i % PALETTE.length];
            const pts = s.points.map((p) => `${X(p.x)},${Y(p.y)}`).join(' ');
            return (
              <g key={s.name}>
                <polyline points={pts} fill="none" strokeWidth={2.25} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dashed ? '6 4' : undefined} style={{ stroke: color }} />
                {hover !== null &&
                  s.points
                    .filter((p) => p.x === hover)
                    .map((p) => <circle key={p.x} cx={X(p.x)} cy={Y(p.y)} r={4} strokeWidth={2} style={{ fill: color, stroke: 'var(--card)' }} />)}
              </g>
            );
          })}
          <rect x={M.left} y={M.top} width={plotW} height={plotH} fill="transparent" onMouseMove={onMove} onMouseEnter={onMove} />
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute z-10 rounded-md bg-[#1c1917] px-2.5 py-1.5 text-xs text-[#f5f5f4] shadow-lg"
            style={{ left: Math.min(Math.max(X(hover), 80), w - 80), top: 0, transform: 'translate(-50%, 0)' }}
          >
            <div className="text-[#a8a29e] mb-0.5">
              {xLabel} {xFormat(hover)}
            </div>
            {series.map((s, i) => {
              const p = s.points.find((q) => q.x === hover);
              if (!p) return null;
              return (
                <div key={s.name} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: s.color ?? PALETTE[i % PALETTE.length] }} />
                  {s.name}: <span className="font-semibold">{format(p.y)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {series.map((s, i) => (
          <span key={s.name} className="inline-flex items-center gap-1.5">
            <span className="inline-block w-3 h-0.5" style={{ background: s.color ?? PALETTE[i % PALETTE.length] }} />
            {s.name}
          </span>
        ))}
      </div>
    </figure>
  );
};

// ---- Horizontal stacked bar (where does each dollar go) ----
export interface Part {
  label: string;
  value: number;
  color?: string;
}

export const StackedBar: React.FC<{ title?: string; parts: Part[]; format: (n: number) => string }> = ({ title, parts, format }) => {
  const visible = parts.filter((p) => p.value > 0.5);
  const total = visible.reduce((s, p) => s + p.value, 0) || 1;
  return (
    <figure className="rounded-lg border border-border bg-card p-4">
      {title && <figcaption className="font-semibold text-foreground text-sm mb-2">{title}</figcaption>}
      <div className="flex h-7 w-full overflow-hidden rounded-md border border-border">
        {visible.map((p, i) => (
          <div
            key={p.label}
            title={`${p.label}: ${format(p.value)} (${((p.value / total) * 100).toFixed(1)}%)`}
            style={{ width: `${(p.value / total) * 100}%`, background: p.color ?? PALETTE[i % PALETTE.length] }}
          />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
        {visible.map((p, i) => (
          <li key={p.label} className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 min-w-0">
              <span className="inline-block w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: p.color ?? PALETTE[i % PALETTE.length] }} />
              <span className="truncate text-foreground">{p.label}</span>
            </span>
            <span className="tabular-nums text-muted-foreground whitespace-nowrap">
              {format(p.value)} · {((p.value / total) * 100).toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
};

// ---- Horizontal bars, one per bracket / slice ----
export const BarList: React.FC<{ title?: string; rows: { label: string; value: number; note?: string }[]; format: (n: number) => string }> = ({ title, rows, format }) => {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <figure className="rounded-lg border border-border bg-card p-4">
      {title && <figcaption className="font-semibold text-foreground text-sm mb-2">{title}</figcaption>}
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.label} className="text-xs">
            <div className="flex justify-between gap-2">
              <span className="text-foreground">{r.label}</span>
              <span className="tabular-nums text-muted-foreground whitespace-nowrap">{r.note ?? format(r.value)}</span>
            </div>
            <div className="mt-0.5 h-2 rounded bg-muted">
              <div className="h-2 rounded" style={{ width: `${(r.value / max) * 100}%`, background: 'var(--primary)' }} />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
};
