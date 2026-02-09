import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ChainSelector from './ChainSelector';
import NotificationCenter from '../features/notifications/NotificationCenter';
import { useNotifications } from '../features/notifications/notificationsStore';
import { useState } from 'react';
import LoginButton from './LoginButton';

interface AppHeaderProps {
  currentPage: string;
  onNavigate: (page: 'dashboard' | 'discover' | 'learn' | 'settings') => void;
}

export default function AppHeader({ currentPage, onNavigate }: AppHeaderProps) {
  const { notifications } = useNotifications();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/cryptolaunch-sentinel-logo.dim_1024x256.png" 
              alt="CryptoLaunch Sentinel" 
              className="h-8 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant={currentPage === 'dashboard' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('dashboard')}
            >
              Dashboard
            </Button>
            <Button
              variant={currentPage === 'discover' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('discover')}
            >
              Discover
            </Button>
            <Button
              variant={currentPage === 'learn' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('learn')}
            >
              Learn
            </Button>
            <Button
              variant={currentPage === 'settings' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('settings')}
            >
              Settings
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ChainSelector />
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setNotificationOpen(true)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -right-1 -top-1 h-5 min-w-5 px-1 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>

          <LoginButton />
        </div>
      </div>

      <NotificationCenter 
        open={notificationOpen} 
        onOpenChange={setNotificationOpen} 
      />
    </header>
  );
}
