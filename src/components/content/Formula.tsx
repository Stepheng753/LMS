import React from 'react';

interface FormulaProps {
  children: React.ReactNode;
  label?: string;
  where?: { symbol: string; meaning: string }[];
}

export const Formula: React.FC<FormulaProps> = ({ children, label, where }) => (
  <figure className="my-6 rounded-lg border border-border bg-card overflow-hidden">
    {label && (
      <figcaption className="px-4 py-2 border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </figcaption>
    )}
    <div className="px-4 py-6 text-center font-serif text-xl sm:text-2xl italic text-foreground overflow-x-auto">
      {children}
    </div>
    {where && (
      <dl className="px-5 py-3 border-t border-border grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        {where.map((w) => (
          <React.Fragment key={w.symbol}>
            <dt className="font-serif italic text-foreground">{w.symbol}</dt>
            <dd className="text-muted-foreground">{w.meaning}</dd>
          </React.Fragment>
        ))}
      </dl>
    )}
  </figure>
);
