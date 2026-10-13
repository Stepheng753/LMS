import React from 'react';
import { Calculator, Dumbbell } from 'lucide-react';
import { Collapsible } from './Collapsible';

interface ExerciseProps {
  title: string;
  children: React.ReactNode;
  hint?: React.ReactNode;
  solution: React.ReactNode;
  /** 'exercise' hides the solution; 'example' shows a worked solution up front. */
  kind?: 'exercise' | 'example';
}

export const Exercise: React.FC<ExerciseProps> = ({ title, children, hint, solution, kind = 'exercise' }) => {
  const isExample = kind === 'example';
  const Icon = isExample ? Calculator : Dumbbell;

  return (
    <div className="my-6 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-primary">
        <Icon className="w-4 h-4" />
        {isExample ? 'Worked Example' : 'Try It Yourself'}
      </div>
      <div className="p-5">
        <p className="font-semibold text-foreground">{title}</p>
        <div className="mt-2 text-sm text-foreground/85 space-y-2">{children}</div>
        {hint && (
          <Collapsible title="Need a hint?" className="mt-4">
            {hint}
          </Collapsible>
        )}
        <Collapsible
          title={isExample ? 'Solution' : 'Show solution'}
          defaultOpen={isExample}
          className="mt-3"
        >
          {solution}
        </Collapsible>
      </div>
    </div>
  );
};
