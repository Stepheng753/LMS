import React from 'react';

interface StepHeaderProps {
  eyebrow: string;
  title: string;
  summary?: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ eyebrow, title, summary }) => (
  <header className="border-b border-border pb-4">
    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>
    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mt-1">{title}</h1>
    {summary && <p className="text-base text-muted-foreground mt-2">{summary}</p>}
  </header>
);
