import { useState, useEffect } from 'react';
import { recordAnalyticsEvent } from '../analytics/analyticsEvents';

const PROGRESS_KEY = 'cryptolaunch-lesson-progress';

interface LessonProgress {
  [lessonId: string]: {
    completed: boolean;
    completedAt: number;
  };
}

function getProgress(): LessonProgress {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: LessonProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function useLessonProgress() {
  const [progress, setProgress] = useState<LessonProgress>(getProgress);

  const markCompleted = (lessonId: string) => {
    const newProgress = {
      ...progress,
      [lessonId]: {
        completed: true,
        completedAt: Date.now(),
      },
    };
    setProgress(newProgress);
    saveProgress(newProgress);
    recordAnalyticsEvent('lessonComplete');
  };

  const isCompleted = (lessonId: string): boolean => {
    return progress[lessonId]?.completed || false;
  };

  return {
    progress,
    markCompleted,
    isCompleted,
  };
}
