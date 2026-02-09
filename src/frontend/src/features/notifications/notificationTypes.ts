export type NotificationType = 'newProject' | 'newLesson';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  data?: any;
}

export interface NotificationPreferences {
  newProjects: boolean;
  newLessons: boolean;
}
