import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import DashboardPage from './pages/DashboardPage';
import DiscoverPage from './pages/DiscoverPage';
import LearnPage from './pages/LearnPage';
import SettingsPage from './pages/SettingsPage';
import { ChainProvider } from './state/chain';
import OnboardingFlow from './features/onboarding/OnboardingFlow';
import ProfileSetupDialog from './components/ProfileSetupDialog';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { useOnboarding } from './features/onboarding/onboardingStore';

type Page = 'dashboard' | 'discover' | 'learn' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { triggerOnboarding } = useOnboarding();
  const [profileSetupComplete, setProfileSetupComplete] = useState(false);

  const isAuthenticated = !!identity;

  // Show profile setup if authenticated and no profile exists
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null && !profileSetupComplete;

  // Trigger onboarding after profile setup is complete
  useEffect(() => {
    if (isAuthenticated && userProfile !== null && profileSetupComplete) {
      triggerOnboarding();
    }
  }, [isAuthenticated, userProfile, profileSetupComplete, triggerOnboarding]);

  const handleProfileSetupComplete = () => {
    setProfileSetupComplete(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'discover':
        return <DiscoverPage />;
      case 'learn':
        return <LearnPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <ChainProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <AppHeader currentPage={currentPage} onNavigate={setCurrentPage} />
            <main className="flex-1">
              {renderPage()}
            </main>
            <AppFooter />
            <ProfileSetupDialog 
              open={showProfileSetup} 
              onComplete={handleProfileSetupComplete}
            />
            <OnboardingFlow />
          </div>
          <Toaster />
        </ChainProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
