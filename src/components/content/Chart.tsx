import React, { useEffect, useRef, useState } from 'react';
import { Table } from './Table';

interface Datum {
  label: string;
  value: number;
}

interface ChartProps {
  type?: 'bar' | 'line';
  title: string;
  subtitle?: string;
  data: Datum[];
  /** Formats values for axis, labels and tooltip. */
  format?: (value: number) => string;
}

const HEIGHT = 260;
const M = { top: 22, right: 16, bottom: 34, left: 52 };
const NICE = [1, 1.2, 1.6, 2, 2.4, 4, 6, 8, 10];

function niceMax(v: number) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  return (NICE.find((n) => n * p >= v) ?? 10) * p;
}

const TEXT = { fill: 'var(--muted-foreground)', fontSize: 12 } as const;

// Single-series chart: brand-colour marks, recessive grid, direct labels, hover tooltip, table view.
export const Chart: React.FC<ChartProps> = ({ type = 'bar', title, subtitle, data, format = String }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [hover, setHover] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(280, entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const plotW = width - M.left - M.right;
  const plotH = HEIGHT - M.top - M.bottom;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const band = plotW / data.length;
  const xC = (i: number) => M.left + band * i + band / 2;
  const yOf = (v: number) => M.top + plotH * (1 - v / max);
  const ticks = [0, 1, 2, 3, 4].map((i) => (max * i) / 4);
  const showValueLabels = data.length <= 8;

  const barPath = (i: number, v: number) => {
    const bw = Math.min(56, band * 0.6);
    const x = xC(i) - bw / 2;
    const top = yOf(v);
    const h = M.top + plotH - top;
    const r = Math.min(4, h);
    return `M${x},${top + h} V${top + r} Q${x},${top} ${x + r},${top} H${x + bw - r} Q${x + bw},${top} ${x + bw},${top + r} V${top + h} Z`;
  };

  const points = data.map((d, i) => `${xC(i)},${yOf(d.value)}`).join(' ');
  const hovered = hover !== null ? data[hover] : null;

  return (
    <figure className="my-6 rounded-lg border border-border bg-card p-4">
      <figcaption>
        <p className="font-semibold text-foreground text-sm">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </figcaption>

      <div ref={wrapRef} className="relative mt-3">
        <svg
          width={width}
          height={HEIGHT}
          role="img"
          aria-label={`${title}. ${data.map((d) => `${d.label}: ${format(d.value)}`).join(', ')}`}
          onMouseLeave={() => setHover(null)}
          className="block overflow-visible"
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={M.left} x2={width - M.right} y1={yOf(t)} y2={yOf(t)} style={{ stroke: 'var(--border)' }} strokeWidth={1} />
              <text x={M.left - 8} y={yOf(t) + 4} textAnchor="end" style={TEXT}>
                {format(t)}
              </text>
            </g>
          ))}

          {type === 'bar' &&
            data.map((d, i) => (
              <path
                key={d.label}
                d={barPath(i, d.value)}
                style={{ fill: 'var(--primary)', opacity: hover === null || hover === i ? 1 : 0.4, transition: 'opacity 120ms' }}
              />
            ))}

          {type === 'line' && (
            <>
              {hover !== null && (
                <line x1={xC(hover)} x2={xC(hover)} y1={M.top} y2={M.top + plotH} style={{ stroke: 'var(--muted-foreground)' }} strokeWidth={1} />
              )}
              <polyline points={points} fill="none" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" style={{ stroke: 'var(--primary)' }} />
              {data.map((d, i) => (
                <circle
                  key={d.label}
                  cx={xC(i)}
                  cy={yOf(d.value)}
                  r={hover === i ? 5 : 4}
                  strokeWidth={2}
                  style={{ fill: 'var(--primary)', stroke: 'var(--card)' }}
                />
              ))}
            </>
          )}

          {showValueLabels &&
            data.map((d, i) =>
              type === 'bar' || i === data.length - 1 ? (
                <text
                  key={d.label}
                  x={xC(i)}
                  y={yOf(d.value) - 10}
                  textAnchor="middle"
                  style={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 600 }}
                >
                  {format(d.value)}
                </text>
              ) : null
            )}

          {data.map((d, i) => (
            <text key={d.label} x={xC(i)} y={HEIGHT - 12} textAnchor="middle" style={TEXT}>
              {d.label}
            </text>
          ))}

          {/* Hover hit areas, wider than the marks */}
          {data.map((d, i) => (
            <rect
              key={d.label}
              x={M.left + band * i}
              y={M.top}
              width={band}
              height={plotH}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseMove={() => setHover(i)}
            />
          ))}
        </svg>

        {hovered && hover !== null && (
          <div
            className="pointer-events-none absolute z-10 rounded-md bg-[#1c1917] px-2.5 py-1.5 text-xs text-[#f5f5f4] shadow-lg whitespace-nowrap"
            style={{ left: xC(hover), top: yOf(hovered.value) - 14, transform: 'translate(-50%, -100%)' }}
          >
            <span className="text-[#a8a29e]">{hovered.label}</span>{' '}
            <span className="font-semibold">{format(hovered.value)}</span>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowTable((s) => !s)}
        className="mt-2 text-xs font-medium text-primary hover:underline"
      >
        {showTable ? 'Hide data table' : 'View as table'}
      </button>
      {showTable && (
        <Table
          headers={['Category', 'Value']}
          rows={data.map((d) => [d.label, format(d.value)])}
          align={['left', 'right']}
        />
      )}
    </figure>
  );
};
