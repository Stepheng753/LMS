const STORAGE_KEY = 'lms_completed_steps';

export function getCompletedSteps(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading completed steps from localStorage:', e);
    return [];
  }
}

export function isStepCompleted(stepId: string): boolean {
  return getCompletedSteps().includes(stepId);
}

export function toggleStepCompleted(stepId: string): boolean {
  const current = getCompletedSteps();
  let updated: string[];
  let isNowCompleted: boolean;

  if (current.includes(stepId)) {
    updated = current.filter(id => id !== stepId);
    isNowCompleted = false;
  } else {
    updated = [...current, stepId];
    isNowCompleted = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving completed steps to localStorage:', e);
  }

  return isNowCompleted;
}

export function markStepCompleted(stepId: string): void {
  const current = getCompletedSteps();
  if (!current.includes(stepId)) {
    const updated = [...current, stepId];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }
}
