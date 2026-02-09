import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { useNotifications } from './notificationsStore';
import { formatRelativeTime } from '../../lib/formatting';

interface NotificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NotificationCenter({ open, onOpenChange }: NotificationCenterProps) {
  const { notifications, markAsRead, markAllAsRead, clearAll, unreadCount } = useNotifications();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Notifications</DialogTitle>
              <DialogDescription>
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  <CheckCheck className="h-4 w-4" />
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`rounded-lg p-3 transition-colors cursor-pointer ${
                      notification.read
                        ? 'bg-muted/30'
                        : 'bg-primary/5 hover:bg-primary/10'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      {!notification.read && (
                        <Badge variant="default" className="h-2 w-2 rounded-full p-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(notification.timestamp)}
                    </p>
                  </div>
                  {index < notifications.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
