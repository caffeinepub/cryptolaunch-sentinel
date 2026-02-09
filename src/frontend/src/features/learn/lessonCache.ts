import type { GeneratedLesson } from './lessonGenerator';

const CACHE_KEY = 'cryptolaunch-lesson-cache';
const SYNC_TIME_KEY = 'cryptolaunch-lesson-sync-time';

interface LessonCache {
  [lessonId: string]: GeneratedLesson;
}

export function cacheLessonContent(lesson: GeneratedLesson) {
  try {
    const cache = getCachedLessons();
    cache[lesson.id] = lesson;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    localStorage.setItem(SYNC_TIME_KEY, Date.now().toString());
  } catch (error) {
    console.error('Failed to cache lesson:', error);
  }
}

export function getCachedLessons(): LessonCache {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function getCachedLesson(lessonId: string): GeneratedLesson | null {
  const cache = getCachedLessons();
  return cache[lessonId] || null;
}

export function clearLessonCache() {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(SYNC_TIME_KEY);
}

export function getLastSyncTime(): Date | null {
  try {
    const stored = localStorage.getItem(SYNC_TIME_KEY);
    return stored ? new Date(parseInt(stored)) : null;
  } catch {
    return null;
  }
}
