import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'cryptolaunch-onboarding-completed';

export function useOnboarding() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  });

  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setHasCompletedOnboarding(true);
    setShouldShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    setHasCompletedOnboarding(false);
    setShouldShowOnboarding(true);
  };

  const triggerOnboarding = () => {
    if (!hasCompletedOnboarding) {
      setShouldShowOnboarding(true);
    }
  };

  return {
    hasCompletedOnboarding,
    shouldShowOnboarding,
    completeOnboarding,
    resetOnboarding,
    triggerOnboarding,
  };
}
