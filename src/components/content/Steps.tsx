import React from 'react';

interface StepsProps {
  steps: { title: string; children?: React.ReactNode }[];
}

export const Steps: React.FC<StepsProps> = ({ steps }) => (
  <div className="my-5">
    {steps.map((step, i) => (
      <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
        {i < steps.length - 1 && (
          <span className="absolute left-[15px] top-8 bottom-0 w-px bg-border" aria-hidden />
        )}
        <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full border border-primary bg-background text-primary text-sm font-semibold shrink-0">
          {i + 1}
        </span>
        <div className="flex-1 min-w-0 pt-1">
          <p className="font-semibold text-foreground">{step.title}</p>
          {step.children && <div className="mt-1.5 text-foreground/85 text-[0.95rem] space-y-2">{step.children}</div>}
        </div>
      </div>
    ))}
  </div>
);
