import { ModuleDefinition, StepItem } from '../types/lms';
import { sweModule } from './SWE';
import { financeModule } from './Finance';

// Master list of all registered LMS modules
export const ALL_MODULES: ModuleDefinition[] = [
  sweModule,
  financeModule,
];

export function getAllModules(): ModuleDefinition[] {
  return ALL_MODULES;
}

export function getModuleById(id: string): ModuleDefinition | undefined {
  return ALL_MODULES.find((m) => m.id.toLowerCase() === id.toLowerCase());
}

export function getModuleBySlug(slug: string): ModuleDefinition | undefined {
  return ALL_MODULES.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllStepsForModule(module: ModuleDefinition): StepItem[] {
  return module.stages.flatMap((stage) => stage.steps);
}

export function findStepInModule(module: ModuleDefinition, stepId: string): StepItem | undefined {
  for (const stage of module.stages) {
    const found = stage.steps.find((s) => s.id === stepId);
    if (found) return found;
  }
  return undefined;
}
