import Step1_0_Bash from './content/step1.0_bash';
import Step1_1_Traversing from './content/step1.1_traversing';
import Step1_2_Directories from './content/step1.2_directories';
import { ModuleDefinition } from '../../types/lms';

export const sweModule: ModuleDefinition = {
  id: 'SWE',
  slug: 'swe',
  title: 'Software Engineering',
  category: 'Systems & Shell Mastery',
  description:
    'Master Unix terminal workflows, modern directory structures, command line tooling, and developer environments.',
  icon: 'Terminal',
  badge: 'Core Track',
  difficulty: 'Beginner',
  stages: [
    {
      id: 'swe-stage-1',
      title: 'Stage 1: Terminal & Shell Mastery',
      description: 'Foundational shell commands, navigation, and file system manipulation.',
      steps: [
        {
          id: 'swe-1-0',
          order: '1.0',
          title: 'Bash Fundamentals',
          description: 'Shell overview, standard streams, and redirection.',
          estimatedMinutes: 8,
          component: Step1_0_Bash,
        },
        {
          id: 'swe-1-1',
          order: '1.1',
          title: 'Traversing the File System',
          description: 'Absolute vs relative paths and directory inspection.',
          estimatedMinutes: 12,
          component: Step1_1_Traversing,
        },
        {
          id: 'swe-1-2',
          order: '1.2',
          title: 'Directories & Permissions',
          description: 'Creating structures, moving files, and chmod permissions.',
          estimatedMinutes: 10,
          component: Step1_2_Directories,
        },
      ],
    },
  ],
};
