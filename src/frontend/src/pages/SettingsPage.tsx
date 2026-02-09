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
    <div className="container py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your preferences and view analytics
          </p>
        </div>

        {/* User Profile */}
        {isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
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
                    <Label htmlFor="profile-name">Name</Label>
                    <Input
                      id="profile-name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-bio">Bio</Label>
                    <Textarea
                      id="profile-bio"
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
                    {saveProfile.isPending ? 'Saving...' : 'Save Profile'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure in-app notifications for new projects and lessons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationPreferences />
          </CardContent>
        </Card>

        {/* Offline & Cache */}
        <Card>
          <CardHeader>
            <CardTitle>Offline Mode</CardTitle>
            <CardDescription>
              Manage cached content for offline access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Connection Status</p>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                {isOnline ? (
                  <Wifi className="h-5 w-5 text-green-600" />
                ) : (
                  <WifiOff className="h-5 w-5 text-orange-600" />
                )}
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Last Sync</p>
                <p className="text-sm text-muted-foreground">
                  {lastSync ? lastSync.toLocaleString() : 'Never'}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCache}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Providers */}
        <ProviderStatusPanel />

        {/* Onboarding */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding & Help</CardTitle>
            <CardDescription>
              Replay the welcome tutorial or access help resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={resetOnboarding}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Replay Onboarding
            </Button>
          </CardContent>
        </Card>

        {/* Analytics */}
        <AnalyticsPanel />
      </div>
    </div>
  );
}
