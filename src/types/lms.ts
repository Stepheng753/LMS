import { ComponentType } from 'react';

export interface StepItem {
  id: string;               // Unique ID: e.g. 'swe-1.0-bash'
  order: string;            // Display order: e.g. '1.0'
  title: string;            // Step title: e.g. 'Introduction to Bash'
  description?: string;     // Brief summary of this step
  estimatedMinutes: number; // Reading / exercise duration
  component: ComponentType; // React component rendering this step's content
}

export interface StageItem {
  id: string;               // Unique stage ID: e.g. 'swe-stage-1'
  title: string;            // Stage title: e.g. 'Stage 1: Terminal & Shell Mastery'
  description?: string;     // Stage objective
  steps: StepItem[];        // Ordered list of steps
}

export interface ModuleDefinition {
  id: string;               // Unique module ID: e.g. 'SWE'
  slug: string;             // URL-friendly identifier: e.g. 'swe'
  title: string;            // Display name: e.g. 'Software Engineering'
  category: string;         // e.g. 'Engineering & Systems'
  description: string;      // Overview of course
  icon: 'Terminal' | 'DollarSign' | 'BookOpen' | 'Code' | 'Cpu' | 'BarChart3'; // Lucide icon name
  badge?: string;           // Optional highlight e.g. 'Core Foundation'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  stages: StageItem[];      // Grouped stages/phases
}

export interface UserProgress {
  completedStepIds: string[]; // List of IDs marked completed
  lastVisitedStepId?: string;
}
