type AnalyticsEvent =
  | 'chainSelection'
  | 'projectOpen'
  | 'riskDetailsExpand'
  | 'lessonStart'
  | 'lessonComplete'
  | 'quizSubmit';

interface AnalyticsData {
  chainSelections: number;
  projectOpens: number;
  riskDetailsExpands: number;
  lessonStarts: number;
  lessonCompletes: number;
  quizSubmits: number;
}

const ANALYTICS_KEY = 'cryptolaunch-analytics';

function getAnalytics(): AnalyticsData {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    return stored
      ? JSON.parse(stored)
      : {
          chainSelections: 0,
          projectOpens: 0,
          riskDetailsExpands: 0,
          lessonStarts: 0,
          lessonCompletes: 0,
          quizSubmits: 0,
        };
  } catch {
    return {
      chainSelections: 0,
      projectOpens: 0,
      riskDetailsExpands: 0,
      lessonStarts: 0,
      lessonCompletes: 0,
      quizSubmits: 0,
    };
  }
}

function saveAnalytics(data: AnalyticsData) {
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

export function recordAnalyticsEvent(event: AnalyticsEvent) {
  const analytics = getAnalytics();

  switch (event) {
    case 'chainSelection':
      analytics.chainSelections++;
      break;
    case 'projectOpen':
      analytics.projectOpens++;
      break;
    case 'riskDetailsExpand':
      analytics.riskDetailsExpands++;
      break;
    case 'lessonStart':
      analytics.lessonStarts++;
      break;
    case 'lessonComplete':
      analytics.lessonCompletes++;
      break;
    case 'quizSubmit':
      analytics.quizSubmits++;
      break;
  }

  saveAnalytics(analytics);
}

export function getAnalyticsData(): AnalyticsData {
  return getAnalytics();
}
