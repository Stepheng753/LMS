import React from 'react';

interface FlowStep {
  title: string;
  sub?: string;
  /** Highlights the box (for example the final result). */
  accent?: boolean;
  /** A label on the arrow leading into this box. */
  via?: string;
}

interface FlowProps {
  steps: FlowStep[];
}

const Arrow: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex md:flex-col items-center justify-center gap-1 shrink-0 px-2 py-1 text-[0.7rem] font-semibold text-primary">
    {label && <span>{label}</span>}
    <span className="md:hidden">↓</span>
    <span className="hidden md:inline">→</span>
  </div>
);

// A left-to-right chain of boxes (top-to-bottom on a phone). Long words and URLs wrap instead of overflowing.
export const Flow: React.FC<FlowProps> = ({ steps }) => (
  <div className="my-5 flex flex-col md:flex-row md:flex-wrap items-stretch gap-1">
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        {i > 0 && <Arrow label={step.via} />}
        <div
          className={`flex-1 min-w-0 md:min-w-[9rem] rounded-lg border bg-card p-3 text-center [overflow-wrap:anywhere] ${
            step.accent ? 'border-primary/60' : 'border-border'
          }`}
        >
          <p className="font-semibold text-foreground text-sm !my-0">{step.title}</p>
          {step.sub && <p className="text-xs text-muted-foreground mt-1 !my-0">{step.sub}</p>}
        </div>
      </React.Fragment>
    ))}
  </div>
);
