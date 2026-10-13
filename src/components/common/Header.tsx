import React, { useEffect, useState } from 'react';
import { CheckCircle2, Menu } from 'lucide-react';
import { ModuleDefinition, StepItem } from '../../types/lms';

interface HeaderProps {
  currentModule: ModuleDefinition;
  currentStep?: StepItem | null;
  modules: ModuleDefinition[];
  onSelectModule: (module: ModuleDefinition) => void;
  onNavigateHome: () => void;
  onOpenSteps?: () => void;
  completedStepIds: string[];
}

export const Header: React.FC<HeaderProps> = ({
  currentModule,
  currentStep,
  modules,
  onSelectModule,
  onNavigateHome,
  onOpenSteps,
  completedStepIds,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [currentStep?.id]);

  return (
    <header className="sticky top-0 z-40 w-full h-14 border-b border-border bg-[#faf7f5]/95 backdrop-blur-md px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      {/* Left: Home Button with CrossRoads Logo */}
      <div className="flex items-center shrink-0 justify-self-start">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 px-2.5 py-1.5 -ml-2 rounded-lg hover:bg-[#f0ebe8] transition-colors group"
          title="Return to Main Slideshow"
        >
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt="CrossRoads Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left hidden sm:block">
            <span className="font-serif font-bold text-sm text-foreground tracking-tight block leading-none">
              CrossRoads
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold block mt-0.5">
              Upskill LMS
            </span>
          </div>
        </button>
      </div>

      {/* Center: Module Switcher (Shows all modules with current highlighted) */}
      <nav className="flex items-stretch gap-1 self-stretch min-w-0 max-w-full overflow-x-auto">
        {modules.map((mod) => {
          const isSelected = mod.id === currentModule.id;
          const modSteps = mod.stages.flatMap((s) => s.steps);
          const isComplete = modSteps.length > 0 && modSteps.every((s) => completedStepIds.includes(s.id));

          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className={`px-3.5 text-xs transition-colors flex items-center gap-1.5 shrink-0 border-b-2 ${
                isSelected
                  ? 'border-primary text-primary font-semibold'
                  : 'border-transparent text-foreground/75 hover:text-foreground hover:border-border font-medium'
              }`}
            >
              {isComplete ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary' : 'bg-primary/50'}`} />
              )}
              <span>{mod.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Right column keeps the module switcher centred */}
      <div className="justify-self-end md:hidden">
        <button
          onClick={onOpenSteps}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-primary text-primary text-xs font-semibold hover:bg-primary/10 transition-colors"
        >
          <Menu className="w-4 h-4" />
          Steps
        </button>
      </div>

      {/* Reading progress */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-[width] duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </header>
  );
};
