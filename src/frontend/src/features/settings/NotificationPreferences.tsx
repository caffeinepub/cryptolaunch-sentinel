import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useNotifications } from '../notifications/notificationsStore';

export default function NotificationPreferences() {
  const { preferences, updatePreferences } = useNotifications();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="new-projects">New Project Launches</Label>
          <p className="text-sm text-muted-foreground">
            Get notified when new projects are detected
          </p>
        </div>
        <Switch
          id="new-projects"
          checked={preferences.newProjects}
          onCheckedChange={(checked) => updatePreferences({ newProjects: checked })}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="new-lessons">New Lessons</Label>
          <p className="text-sm text-muted-foreground">
            Get notified when new learning content is available
          </p>
        </div>
        <Switch
          id="new-lessons"
          checked={preferences.newLessons}
          onCheckedChange={(checked) => updatePreferences({ newLessons: checked })}
        />
      </div>
    </div>
  );
}
