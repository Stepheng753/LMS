import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StepItem } from '../../types/lms';

interface StepNavProps {
  previousStep: StepItem | null;
  nextStep: StepItem | null;
  onPrevious: () => void;
  onNext: () => void;
}

const isTypingTarget = (el: EventTarget | null) => {
  const node = el as HTMLElement | null;
  return !!node && (node.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(node.tagName));
};

export const StepNav: React.FC<StepNavProps> = ({ previousStep, nextStep, onPrevious, onNext }) => {
  // Left/Right arrow keys move between steps (ignored while typing or with modifiers).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || isTypingTarget(e.target)) return;
      if (e.key === 'ArrowLeft' && previousStep) onPrevious();
      if (e.key === 'ArrowRight' && nextStep) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previousStep, nextStep, onPrevious, onNext]);

  return (
    <nav aria-label="Step navigation" className="mt-14 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
      {previousStep ? (
        <button
          onClick={onPrevious}
          className="group text-left p-4 rounded-lg border border-border bg-card hover:border-primary transition-colors"
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Previous
          </span>
          <span className="block mt-1.5 font-mono text-xs text-muted-foreground">Step {previousStep.order}</span>
          <span className="block font-semibold text-foreground">{previousStep.title}</span>
        </button>
      ) : (
        <div />
      )}

      {nextStep ? (
        <button
          onClick={onNext}
          className="group text-right p-4 rounded-lg border border-primary bg-transparent hover:bg-primary/10 transition-colors"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Next
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
          <span className="block mt-1.5 font-mono text-xs text-primary/80">Step {nextStep.order}</span>
          <span className="block font-semibold text-foreground">{nextStep.title}</span>
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2 p-4 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Module Completed!</span>
        </div>
      )}
    </nav>
  );
};
