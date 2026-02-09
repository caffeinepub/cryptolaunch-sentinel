import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import NotificationPreferences from '../features/settings/NotificationPreferences';
import ProviderStatusPanel from '../features/settings/ProviderStatusPanel';
import AnalyticsPanel from '../features/analytics/AnalyticsPanel';
import { useOnboarding } from '../features/onboarding/onboardingStore';
import { RotateCcw, Trash2, Wifi, WifiOff, Save, User } from 'lucide-react';
import { useOfflineStatus } from '../features/offline/offlineStatus';
import { clearLessonCache, getLastSyncTime } from '../features/learn/lessonCache';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';

export default function SettingsPage() {
  const { resetOnboarding } = useOnboarding();
  const { isOnline } = useOfflineStatus();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [lastSync, setLastSync] = useState<Date | null>(null);
  
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const isAuthenticated = !!identity;

  useEffect(() => {
    setLastSync(getLastSyncTime());
  }, []);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setBio(userProfile.bio || '');
    }
  }, [userProfile]);

  const handleClearCache = () => {
    clearLessonCache();
    setLastSync(null);
    toast.success('Lesson cache cleared');
  };

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        bio: bio.trim() || undefined,
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <Separator />

      {/* User Profile Section */}
      {isAuthenticated && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Profile</CardTitle>
            </div>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileLoading ? (
              <p className="text-sm text-muted-foreground">Loading profile...</p>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="settings-name">Name</Label>
                  <Input
                    id="settings-name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="settings-bio">Bio</Label>
                  <Textarea
                    id="settings-bio"
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleSaveProfile}
                  disabled={saveProfile.isPending}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saveProfile.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      <NotificationPreferences />

      {/* Offline Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-5 w-5 text-green-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-orange-600" />
            )}
            <CardTitle>Connection Status</CardTitle>
          </div>
          <CardDescription>
            {isOnline ? 'You are online' : 'You are offline'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {isOnline
                ? 'All features are available.'
                : 'Some features may be limited while offline. Cached lessons remain available.'}
            </p>
            {lastSync && (
              <p className="text-xs text-muted-foreground">
                Last synced: {lastSync.toLocaleString()}
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCache}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Lesson Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Providers */}
      <ProviderStatusPanel />

      {/* Onboarding */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding</CardTitle>
          <CardDescription>
            Replay the welcome tutorial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() => {
              resetOnboarding();
              toast.success('Onboarding reset. Refresh the page to see the tutorial again.');
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Onboarding
          </Button>
        </CardContent>
      </Card>

      {/* Analytics */}
      {isAuthenticated && <AnalyticsPanel />}
    </div>
  );
}
