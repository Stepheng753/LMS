import React, { useEffect, useState } from 'react';
import { Calculator } from 'lucide-react';

// ---------- Frame: inputs on the left, results and "the math" on the right ----------

interface Preset {
  label: string;
  hint?: string;
  apply: () => void;
}

interface CalcFrameProps {
  title: string;
  subtitle?: string;
  presets?: Preset[];
  inputs: React.ReactNode;
  results: React.ReactNode;
  math?: React.ReactNode;
  below?: React.ReactNode;
}

export const CalcFrame: React.FC<CalcFrameProps> = ({ title, subtitle, presets, inputs, results, math, below }) => (
  <section className="@container my-8 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
    <header className="flex items-start gap-3 px-5 py-3 border-b border-border bg-muted/60">
      <Calculator className="w-4 h-4 mt-0.5 text-primary shrink-0" />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Calculator</p>
        <p className="font-serif text-lg font-bold text-foreground leading-snug">{title}</p>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </header>

    {presets && presets.length > 0 && (
      <div className="px-5 pt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Try:</span>
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={p.apply}
            title={p.hint}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>
    )}

    <div className="grid grid-cols-1 @4xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-0">
      <div className="p-5 space-y-4 @4xl:border-r border-border">{inputs}</div>
      <div className="p-5 space-y-4 bg-background/40 order-first @4xl:order-none">
        {results}
        {math}
      </div>
    </div>

    {below && <div className="px-5 pb-5 pt-1 space-y-4">{below}</div>}
  </section>
);

// ---------- Inputs ----------

interface NumFieldProps {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  slider?: boolean;
  help?: string;
}

const parse = (s: string) => {
  const n = parseFloat(s.replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

export const NumField: React.FC<NumFieldProps> = ({ label, value, onChange, prefix, suffix, step = 1, min, max, slider, help }) => {
  const [text, setText] = useState(String(value));
  useEffect(() => {
    if (parse(text) !== value) setText(String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const commit = (s: string) => {
    setText(s);
    let n = parse(s);
    if (min !== undefined) n = Math.max(min, n);
    if (max !== undefined) n = Math.min(max, n);
    onChange(n);
  };

  const sliderMax = max ?? Math.max(100, value * 2);
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {help && <span className="text-xs text-muted-foreground text-right">{help}</span>}
      </span>
      <span className="mt-1 flex items-center rounded-md border border-border bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        {prefix && <span className="pl-3 text-sm text-muted-foreground">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={text}
          onChange={(e) => commit(e.target.value)}
          className="w-full bg-transparent px-3 py-2 text-sm text-foreground outline-none tabular-nums"
        />
        {suffix && <span className="pr-3 text-sm text-muted-foreground whitespace-nowrap">{suffix}</span>}
      </span>
      {slider && (
        <input
          type="range"
          min={min ?? 0}
          max={sliderMax}
          step={step}
          value={Math.min(value, sliderMax)}
          onChange={(e) => {
            setText(e.target.value);
            onChange(parse(e.target.value));
          }}
          className="mt-2 w-full accent-[var(--primary)]"
        />
      )}
    </label>
  );
};

interface ChoiceProps<T extends string | number> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}

export function Choice<T extends string | number>({ label, value, options, onChange }: ChoiceProps<T>) {
  return (
    <div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="mt-1 inline-flex flex-wrap gap-1 rounded-lg border border-border bg-background p-1">
        {options.map((o) => (
          <button
            key={String(o.value)}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
              o.value === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export const Toggle: React.FC<{ label: string; checked: boolean; onChange: (b: boolean) => void; help?: string }> = ({
  label,
  checked,
  onChange,
  help,
}) => (
  <label className="flex items-start gap-2 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 accent-[var(--primary)]" />
    <span>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {help && <span className="block text-xs text-muted-foreground">{help}</span>}
    </span>
  </label>
);

export const GroupLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-t border-border first:border-t-0 first:pt-0">
    {children}
  </p>
);

// ---------- Results ----------

interface StatProps {
  label: string;
  value: string;
  sub?: string;
  tone?: 'normal' | 'good' | 'bad';
}

export const Stat: React.FC<StatProps> = ({ label, value, sub, tone = 'normal' }) => (
  <div className="rounded-lg border border-border bg-card px-3 py-2.5 min-w-0">
    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground leading-tight">{label}</p>
    <p
      className={`mt-0.5 font-serif text-xl font-bold tabular-nums break-words ${
        tone === 'good' ? 'text-emerald-700' : tone === 'bad' ? 'text-red-700' : 'text-foreground'
      }`}
    >
      {value}
    </p>
    {sub && <p className="text-xs text-muted-foreground leading-snug">{sub}</p>}
  </div>
);

export const Stats: React.FC<{ children: React.ReactNode; cols?: 2 | 3 }> = ({ children, cols = 2 }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols === 3 ? 'xl:grid-cols-3' : ''} gap-3`}>{children}</div>
);

export interface MathLine {
  label: string;
  formula?: string; // the numbers plugged in, e.g. "$10,000 x 1.10"
  value: string;
  strong?: boolean;
  indent?: boolean;
}

export const MathBlock: React.FC<{ title?: string; lines: MathLine[] }> = ({ title = 'The math', lines }) => (
  <div className="rounded-lg border border-border bg-card">
    <p className="px-4 py-2 border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {title}
    </p>
    <ol className="px-4 py-3 space-y-2 text-sm">
      {lines.map((l, i) => (
        <li key={i} className={`flex items-start justify-between gap-3 ${l.indent ? 'pl-4' : ''}`}>
          <span className="min-w-0">
            <span className={l.strong ? 'font-semibold text-foreground' : 'text-foreground'}>{l.label}</span>
            {l.formula && <span className="block text-xs text-muted-foreground font-mono break-words">{l.formula}</span>}
          </span>
          <span className={`tabular-nums whitespace-nowrap ${l.strong ? 'font-bold text-foreground' : 'text-foreground'}`}>{l.value}</span>
        </li>
      ))}
    </ol>
  </div>
);

export const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs text-muted-foreground leading-relaxed">{children}</p>
);

// A simple scrollable data table for calculator output.
export const DataTable: React.FC<{ headers: string[]; rows: (string | number)[][]; maxHeight?: number; highlight?: (row: (string | number)[]) => boolean }> = ({
  headers,
  rows,
  maxHeight = 320,
  highlight,
}) => (
  <div className="rounded-lg border border-border overflow-auto bg-card" style={{ maxHeight }}>
    <table className="w-full text-sm border-collapse">
      <thead className="sticky top-0">
        <tr className="bg-muted">
          {headers.map((h, i) => (
            <th key={h} className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground ${i === 0 ? 'text-left' : 'text-right'}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri} className={`border-t border-border ${highlight?.(r) ? 'bg-amber-50' : 'even:bg-muted/30'}`}>
            {r.map((c, ci) => (
              <td key={ci} className={`px-3 py-1.5 tabular-nums whitespace-nowrap ${ci === 0 ? 'text-left' : 'text-right'}`}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
