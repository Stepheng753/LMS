import { useState, useEffect } from 'react';
import { ALL_MODULES, getAllStepsForModule, getModuleBySlug } from './modules';
import { ModuleDefinition, StepItem } from './types/lms';
import { Header } from './components/common/Header';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ModuleSidebar } from './components/layout/ModuleSidebar';
import { StepViewerLayout } from './components/layout/StepViewerLayout';
import { getCompletedSteps, markStepCompleted, toggleStepCompleted } from './utils/storage';

export default function App() {
  const [selectedModule, setSelectedModule] = useState<ModuleDefinition | null>(null);
  const [activeStep, setActiveStep] = useState<StepItem | null>(null);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Initialize completed steps from localStorage
  useEffect(() => {
    setCompletedStepIds(getCompletedSteps());
  }, []);

  // Sync with URL hash for seamless bookmarking/refreshing (e.g. #/swe/swe-1-0)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setSelectedModule(null);
        setActiveStep(null);
        return;
      }

      const [moduleSlug, stepId] = hash.split('/');
      const mod = getModuleBySlug(moduleSlug);
      if (mod) {
        setSelectedModule(mod);
        const allSteps = getAllStepsForModule(mod);
        if (stepId) {
          const step = allSteps.find((s) => s.id === stepId) || allSteps[0];
          setActiveStep(step);
        } else {
          setActiveStep(allSteps[0] || null);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash when state changes
  const navigateToModule = (mod: ModuleDefinition, step?: StepItem) => {
    const allSteps = getAllStepsForModule(mod);
    const targetStep = step || allSteps[0];
    setSelectedModule(mod);
    setActiveStep(targetStep);
    setMobileNavOpen(false);
    window.location.hash = targetStep ? `#/${mod.slug}/${targetStep.id}` : `#/${mod.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setSelectedModule(null);
    setActiveStep(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepSelect = (step: StepItem) => {
    if (selectedModule) {
      setActiveStep(step);
      setMobileNavOpen(false);
      window.location.hash = `#/${selectedModule.slug}/${step.id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleComplete = () => {
    if (activeStep) {
      toggleStepCompleted(activeStep.id);
      setCompletedStepIds(getCompletedSteps());
    }
  };

  // Stepping navigation (Previous & Next)
  const currentModuleSteps = selectedModule ? getAllStepsForModule(selectedModule) : [];
  const currentStepIndex = activeStep
    ? currentModuleSteps.findIndex((s) => s.id === activeStep.id)
    : -1;

  const hasPrevious = currentStepIndex > 0;
  const hasNext = currentStepIndex !== -1 && currentStepIndex < currentModuleSteps.length - 1;

  const handlePreviousStep = () => {
    if (hasPrevious) {
      handleStepSelect(currentModuleSteps[currentStepIndex - 1]);
    }
  };

  // Moving forward counts as finishing the current step.
  const handleNextStep = () => {
    if (hasNext && activeStep) {
      markStepCompleted(activeStep.id);
      setCompletedStepIds(getCompletedSteps());
      handleStepSelect(currentModuleSteps[currentStepIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {!selectedModule || !activeStep ? (
        // Full-screen Dashboard with Ink Blot Carousel, Brand Overlay, and Module Card
        <DashboardLayout
          modules={ALL_MODULES}
          onSelectModule={(mod) => navigateToModule(mod)}
          completedStepIds={completedStepIds}
        />
      ) : (
        // Course Reader LMS View
        <div className="min-h-screen flex flex-col">
          {/* Top Nav: home + module switcher */}
          <Header
            currentModule={selectedModule}
            currentStep={activeStep}
            modules={ALL_MODULES}
            onSelectModule={(mod) => navigateToModule(mod)}
            onNavigateHome={navigateToHome}
            onOpenSteps={() => setMobileNavOpen(true)}
            completedStepIds={completedStepIds}
          />

          <div className="flex-1 flex flex-col md:flex-row">
            {/* Left Sidebar */}
            <ModuleSidebar
              module={selectedModule}
              activeStep={activeStep}
              onSelectStep={handleStepSelect}
              onBackToDashboard={navigateToHome}
              mobileOpen={mobileNavOpen}
              onCloseMobile={() => setMobileNavOpen(false)}
              completedStepIds={completedStepIds}
            />

            {/* Right Step Content Viewer */}
            <StepViewerLayout
              module={selectedModule}
              activeStep={activeStep}
              onPreviousStep={handlePreviousStep}
              onNextStep={handleNextStep}
              previousStep={hasPrevious ? currentModuleSteps[currentStepIndex - 1] : null}
              nextStep={hasNext ? currentModuleSteps[currentStepIndex + 1] : null}
              isCompleted={completedStepIds.includes(activeStep.id)}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
