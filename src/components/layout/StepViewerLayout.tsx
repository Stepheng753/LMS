import React from 'react';
import { CheckCircle2, ChevronRight, Circle, Clock } from 'lucide-react';
import { ModuleDefinition, StepItem } from '../../types/lms';
import { OnThisPage } from './OnThisPage';
import { StepNav } from './StepNav';

interface StepViewerLayoutProps {
  module: ModuleDefinition;
  activeStep: StepItem;
  previousStep: StepItem | null;
  nextStep: StepItem | null;
  onPreviousStep: () => void;
  onNextStep: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const StepViewerLayout: React.FC<StepViewerLayoutProps> = ({
  module,
  activeStep,
  previousStep,
  nextStep,
  onPreviousStep,
  onNextStep,
  isCompleted,
  onToggleComplete,
}) => {
  const StepComponent = activeStep.component;
  const stage = module.stages.find((st) => st.steps.some((x) => x.id === activeStep.id));

  return (
    <div className="flex-1 min-w-0 flex justify-center">
    <main className="flex-1 min-w-0 py-8 px-4 sm:px-6 lg:px-8 max-w-[54rem]">
      {/* Step Header Utility Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
          <span className="truncate">{module.title}</span>
          {stage && (
            <>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span className="truncate text-foreground/80">{stage.title}</span>
            </>
          )}
          <span className="w-px h-3.5 bg-border" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {activeStep.estimatedMinutes} min read
          </span>
        </div>

        {/* Mark as Complete Button */}
        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all shadow-sm ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              : 'bg-transparent text-primary border border-primary hover:bg-primary/10'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Completed</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4" />
              <span>Mark as Complete</span>
            </>
          )}
        </button>
      </div>

      {/* Render the Active Step Component Content */}
      <article className="lms-content">
        <StepComponent />
      </article>

      <StepNav
        previousStep={previousStep}
        nextStep={nextStep}
        onPrevious={onPreviousStep}
        onNext={onNextStep}
      />
    </main>

    {/* Right rail: section outline (wide screens only) */}
    <aside className="hidden 2xl:block w-56 shrink-0 py-8 pr-6">
      <OnThisPage stepId={activeStep.id} />
    </aside>
    </div>
  );
};
