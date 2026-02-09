import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useOnboarding } from './onboardingStore';
import { Rocket, Shield, BookOpen, CheckCircle } from 'lucide-react';

const ONBOARDING_STEPS = [
  {
    title: 'Welcome to CryptoLaunch Sentinel',
    description: 'Your trusted companion for discovering new crypto projects across 20+ blockchains.',
    icon: Rocket,
    content: 'We help you spot new token launches in real-time and provide AI-powered risk assessments to keep you safe.',
  },
  {
    title: 'Select Your Blockchain',
    description: 'Choose which blockchain you want to monitor from our supported networks.',
    icon: Shield,
    content: 'Use the blockchain selector in the header to switch between Ethereum, Solana, BNB Chain, and many more.',
  },
  {
    title: 'Understand Risk Levels',
    description: 'Every project gets a risk score based on audits, team transparency, and market metrics.',
    icon: Shield,
    content: 'Look for the risk badge on each project card. Green means low risk, yellow is medium, and red indicates high risk.',
  },
  {
    title: 'Learn Web3 Basics',
    description: 'Access daily lessons covering blockchain, DeFi, NFTs, and security best practices.',
    icon: BookOpen,
    content: 'Visit the Learn tab to access interactive articles, quizzes, and videos designed for beginners.',
  },
];

export default function OnboardingFlow() {
  const { hasCompletedOnboarding, completeOnboarding, shouldShowOnboarding } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldShowOnboarding) {
      setOpen(true);
    }
  }, [shouldShowOnboarding]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    setOpen(false);
    setCurrentStep(0);
  };

  const handleComplete = () => {
    completeOnboarding();
    setOpen(false);
    setCurrentStep(0);
  };

  const step = ONBOARDING_STEPS[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle>{step.title}</DialogTitle>
          <DialogDescription>{step.description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">{step.content}</p>
        </div>

        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-xs text-center text-muted-foreground">
            Step {currentStep + 1} of {ONBOARDING_STEPS.length}
          </p>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="ghost" onClick={handleSkip} className="w-full sm:w-auto">
            Skip Tutorial
          </Button>
          <Button onClick={handleNext} className="w-full sm:w-auto">
            {currentStep < ONBOARDING_STEPS.length - 1 ? 'Next' : 'Get Started'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
