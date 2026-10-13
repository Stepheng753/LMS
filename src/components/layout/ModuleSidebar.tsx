import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Clock } from 'lucide-react';
import { ModuleDefinition, StageItem, StepItem } from '../../types/lms';
import { ProgressBar } from '../common/ProgressBar';

const MIN_WIDTH = 240;
const MAX_WIDTH = 900;
const DEFAULT_WIDTH = 550;
const WIDTH_KEY = 'lms.sidebarWidth.v3';

const clampWidth = (w: number) => Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, w));

interface ModuleSidebarProps {
  module: ModuleDefinition;
  activeStep: StepItem;
  onSelectStep: (step: StepItem) => void;
  onBackToDashboard: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  completedStepIds: string[];
}

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  module,
  activeStep,
  onSelectStep,
  onBackToDashboard,
  mobileOpen,
  onCloseMobile,
  completedStepIds,
}) => {
  // Calculate module total steps and completed count
  const [width, setWidth] = useState(() => {
    try {
      const saved = Number(localStorage.getItem(WIDTH_KEY));
      return saved ? clampWidth(saved) : DEFAULT_WIDTH;
    } catch {
      return DEFAULT_WIDTH;
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const widthRef = useRef(width);
  widthRef.current = width;
  const asideRef = useRef<HTMLElement>(null);

  const startDrag = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: PointerEvent) => {
      const left = asideRef.current?.getBoundingClientRect().left ?? 0;
      setWidth(clampWidth(e.clientX - left));
    };
    const onUp = () => {
      setIsDragging(false);
      try {
        localStorage.setItem(WIDTH_KEY, String(widthRef.current));
      } catch {
        /* ignore */
      }
    };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [isDragging]);

  // The topic tabs show one topic's steps at a time. Moving to a step in another topic switches the tab,
  // and a tab can also be clicked to browse another topic without leaving the current step.
  const activeStageId = module.stages.find((st) => st.steps.some((x) => x.id === activeStep.id))?.id;
  const [selectedStageId, setSelectedStageId] = useState<string | undefined>(activeStageId ?? module.stages[0]?.id);

  useEffect(() => {
    if (activeStageId) setSelectedStageId(activeStageId);
  }, [activeStageId]);

  const selectedStage: StageItem = module.stages.find((st) => st.id === selectedStageId) ?? module.stages[0];
  // "Topic 1: Setup + Bash" becomes "1" on the tab, "Summary: ..." becomes "S", and "Toolkit: ..." becomes "T".
  // The full title shows above the steps and in the tab's tooltip.
  const tabLabel = (title: string) => {
    const head = title.split(':')[0].trim();
    const num = head.match(/(\d+)\s*$/);
    return num ? num[1] : head.charAt(0).toUpperCase();
  };

  const allSteps = module.stages.flatMap((stage) => stage.steps);
  const totalSteps = allSteps.length;
  const completedInModule = allSteps.filter((s) => completedStepIds.includes(s.id)).length;

  return (
    <>
    {/* Mobile drawer backdrop */}
    {mobileOpen && (
      <div
        className="md:hidden fixed inset-x-0 bottom-0 top-14 z-40 bg-black/30"
        onClick={onCloseMobile}
        aria-hidden
      />
    )}
    <aside
      ref={asideRef}
      style={{ '--sidebar-w': `${width}px` } as React.CSSProperties}
      className={`fixed left-0 md:sticky top-14 w-[min(85vw,24rem)] md:w-[var(--sidebar-w)] shrink-0 border-r border-sidebar-border bg-sidebar h-[calc(100vh-3.5rem)] flex flex-col z-50 md:z-30 transition-transform md:transition-none md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      {/* Resize handle (desktop only) */}
      <div
        onPointerDown={startDrag}
        onDoubleClick={() => {
          setWidth(DEFAULT_WIDTH);
          try {
            localStorage.setItem(WIDTH_KEY, String(DEFAULT_WIDTH));
          } catch {
            /* ignore */
          }
        }}
        role="separator"
        aria-orientation="vertical"
        className="group hidden md:flex absolute top-0 -right-2 w-4 h-full cursor-col-resize z-40 items-center justify-center"
      >
        {/* Vertical bar indicator */}
        <div
          className={`w-1 h-14 rounded-full transition-colors ${
            isDragging ? 'bg-primary' : 'bg-muted-foreground/40 group-hover:bg-muted-foreground/70'
          }`}
        />
        {/* Hover label */}
        <span
          className={`pointer-events-none absolute left-full ml-1 px-2.5 py-1 rounded-md border border-border bg-card text-xs font-medium text-foreground shadow-md whitespace-nowrap transition-opacity ${
            isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          Resize
        </span>
      </div>

      {/* Sidebar Header */}
      <div className="p-4 border-b border-sidebar-border">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>All Tracks</span>
        </button>

        <h2 className="font-serif font-bold text-xl text-sidebar-foreground leading-snug">
          {module.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          {module.description}
        </p>

        {/* Module Progress */}
        <div className="mt-3 pt-3 border-t border-sidebar-border/80">
          <ProgressBar current={completedInModule} total={totalSteps} />
        </div>
      </div>

      {/* Topic selector: horizontal tabs, like the navbar */}
      {module.stages.length > 1 && (
        <div
          role="tablist"
          aria-label="Topics"
          className="flex flex-wrap items-stretch gap-x-1 px-3 border-b border-sidebar-border shrink-0"
        >
          {module.stages.map((stage: StageItem) => {
            const isSelected = stage.id === selectedStage.id;
            const complete = stage.steps.every((st) => completedStepIds.includes(st.id));

            return (
              <button
                key={stage.id}
                role="tab"
                aria-selected={isSelected}
                title={stage.title}
                onClick={() => setSelectedStageId(stage.id)}
                className={`px-3 py-3 text-sm transition-colors flex items-center gap-1.5 shrink-0 border-b-2 -mb-px ${
                  isSelected
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-foreground/75 hover:text-foreground hover:border-border font-medium'
                }`}
              >
                {complete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary' : 'bg-primary/50'}`} />
                )}
                <span>{tabLabel(stage.title)}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Steps of the selected topic, vertically */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="px-2 pt-1">
          <div className="flex items-center justify-between gap-2 font-serif text-[18px] font-bold leading-snug text-sidebar-foreground">
            <span>{selectedStage.title}</span>
            {selectedStage.steps.every((st) => completedStepIds.includes(st.id)) ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <span className="shrink-0 font-mono text-[11px] font-normal text-muted-foreground">
                {selectedStage.steps.filter((st) => completedStepIds.includes(st.id)).length}/{selectedStage.steps.length}
              </span>
            )}
          </div>
          {selectedStage.description && (
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{selectedStage.description}</p>
          )}
        </div>

        <div className="space-y-1">
          {selectedStage.steps.map((step: StepItem) => {
            const isActive = step.id === activeStep.id;
            const isCompleted = completedStepIds.includes(step.id);

            return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-all flex items-start gap-2.5 group ${
                isActive
                  ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/60'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isCompleted ? (
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      isActive ? 'text-primary-foreground' : 'text-emerald-700'
                    }`}
                  />
                ) : (
                  <Circle
                    className={`w-5 h-5 ${
                      isActive
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground group-hover:text-primary'
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`font-mono text-xs ${
                      isActive ? 'text-primary-foreground/90' : 'text-muted-foreground'
                    }`}
                  >
                    Step {step.order}
                  </span>
                  <span
                    className={`flex items-center gap-1 text-xs ${
                      isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {step.estimatedMinutes}m
                  </span>
                </div>
                <p className="truncate text-[13px] mt-0.5">{step.title}</p>
              </div>
            </button>
            );
          })}
        </div>
      </div>
    </aside>
    </>
  );
};
