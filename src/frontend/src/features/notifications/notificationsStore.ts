import { useState, useEffect } from 'react';
import type { Notification, NotificationPreferences } from './notificationTypes';

const NOTIFICATIONS_KEY = 'cryptolaunch-notifications';
const PREFERENCES_KEY = 'cryptolaunch-notification-preferences';

function getStoredNotifications(): Notification[] {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getStoredPreferences(): NotificationPreferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    return stored ? JSON.parse(stored) : { newProjects: true, newLessons: true };
  } catch {
    return { newProjects: true, newLessons: true };
  }
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(getStoredNotifications);
  const [preferences, setPreferences] = useState<NotificationPreferences>(getStoredPreferences);

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const updatePreferences = (newPreferences: Partial<NotificationPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  return {
    notifications,
    preferences,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    unreadCount,
    updatePreferences,
  };
}
