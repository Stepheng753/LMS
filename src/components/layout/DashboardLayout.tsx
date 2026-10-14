import React, { useState } from 'react';
import { ArrowRight, BookOpen, Terminal, DollarSign } from 'lucide-react';
import { ModuleDefinition } from '../../types/lms';
import { ProgressBar } from '../common/ProgressBar';
import InkBlotCarousel, { Slide } from '../ui/ink-blot-carousel';

interface DashboardLayoutProps {
  modules: ModuleDefinition[];
  onSelectModule: (module: ModuleDefinition) => void;
  completedStepIds: string[];
}

// Atmospheric high-resolution landscape slides
const U = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=1800&auto=format&fit=crop`;

const CAROUSEL_SLIDES: Slide[] = [
  {
    image: U('1506905925346-21bda4d32df4'),
    title: 'CrossRoads LMS',
    caption: 'Self-paced learning tracks, built to study at your own pace.',
  },
  {
    image: U('1469474968028-56623f02e42e'),
    title: 'Software Engineering',
    caption: 'Terminal, tools and full-stack fundamentals, from your first command to a deployed app.',
  },
  {
    image: U('1464822759023-fed622ff2c3b'),
    title: 'Personal Finance',
    caption: 'Money basics, investing and planning, explained in plain language.',
  },
  {
    image: U('1500534314209-a25ddb2bd429'),
    title: 'AI',
    caption: 'Work with AI tools and agents to learn faster and build more.',
  },
];

// The carousel advances on pointer press, so overlays must stop pointer events as well as clicks.
const stopPress = (e: React.SyntheticEvent) => e.stopPropagation();

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  modules,
  onSelectModule,
  completedStepIds,
}) => {
  // Independent module selection state (does NOT switch automatically on slide transitions)
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  const currentModule = modules[selectedModuleIndex] || modules[0];

  // Module step metrics
  const moduleSteps = currentModule ? currentModule.stages.flatMap((s) => s.steps) : [];
  const completedInModule = moduleSteps.filter((s) => completedStepIds.includes(s.id)).length;
  const totalStepsInModule = moduleSteps.length;

  const getModuleIcon = (icon: string) => {
    switch (icon) {
      case 'Terminal':
        return <Terminal className="w-3.5 h-3.5" />;
      case 'DollarSign':
        return <DollarSign className="w-3.5 h-3.5" />;
      default:
        return <BookOpen className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="relative w-full h-[100svh] min-h-[580px] bg-[#0d0d0f] overflow-hidden">
      {/* Full-Bleed Ink Blot Carousel */}
      <InkBlotCarousel
        slides={CAROUSEL_SLIDES}
        height="100%"
        autoplay={6000}
        bleed={85}
        duration={2200}
        ink="#ffffff"
        ariaLabel="CrossRoads Upskill Course Showcase"
      >
        {/* Top-Left Branding with Frosted Translucent Backdrop */}
        <div
          className="absolute top-6 left-6 sm:top-8 sm:left-10 z-30 flex items-center gap-3.5 sm:gap-4 p-2 sm:p-2.5 pr-5 sm:pr-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl pointer-events-auto cursor-default transition-all"
          onClick={stopPress}
          onPointerDown={stopPress}
          onPointerUp={stopPress}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 p-2 border border-white/10 flex items-center justify-center shrink-0 shadow-sm">
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt="CrossRoads Logo"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
          <div className="text-left select-none">
            <span className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight block leading-none drop-shadow-md">
              CrossRoads
            </span>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#fdf2d6] block mt-1.5 opacity-90 drop-shadow font-medium">
              Upskill LMS
            </span>
          </div>
        </div>

        {/* Top-Right Floating Learning Module Card (matches the course reader styling) */}
        {currentModule && (
          <div
            className="absolute top-6 right-6 sm:top-8 sm:right-10 z-30 w-full max-w-[380px] sm:max-w-[460px] md:max-w-[480px] pointer-events-auto cursor-default"
            onClick={stopPress}
            onPointerDown={stopPress}
            onPointerUp={stopPress}
          >
            {/* Max height keeps the card clear of the carousel controls (44px buttons, bottom: clamp(44px, 8vh, 80px)) */}
            <div
              className="flex flex-col rounded-xl bg-background border border-border text-foreground shadow-2xl overflow-hidden"
              style={{ maxHeight: 'calc(100svh - clamp(44px, 8vh, 80px) - 6rem)' }}
            >
              {/* Track tabs: same underline style as the course navbar */}
              <div role="tablist" className="flex gap-1 px-3 border-b border-border shrink-0">
                {modules.map((mod, idx) => (
                  <button
                    key={mod.id}
                    role="tab"
                    aria-selected={selectedModuleIndex === idx}
                    onClick={() => setSelectedModuleIndex(idx)}
                    className={`px-3.5 py-3 text-xs border-b-2 -mb-px transition-colors min-w-0 truncate ${
                      selectedModuleIndex === idx
                        ? 'border-primary text-primary font-semibold'
                        : 'border-transparent text-foreground/70 hover:text-foreground font-medium'
                    }`}
                  >
                    {mod.title}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-7 flex flex-col gap-5 min-h-0 overflow-y-auto">
                {/* Title block */}
                <div className="shrink-0">
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    {getModuleIcon(currentModule.icon)}
                    Track {String(selectedModuleIndex + 1).padStart(2, '0')} • {currentModule.category}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-foreground leading-tight mt-1.5">
                    {currentModule.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {currentModule.description}
                  </p>
                </div>

                <ProgressBar current={completedInModule} total={totalStepsInModule} className="shrink-0" />

                {/* CTA */}
                <button
                  onClick={() => onSelectModule(currentModule)}
                  className="w-full py-3 px-4 rounded-lg border border-primary bg-transparent text-primary hover:bg-primary/10 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group shrink-0"
                >
                  <span>{completedInModule > 0 ? 'Continue Track' : 'Start Track'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </InkBlotCarousel>
    </div>
  );
};
