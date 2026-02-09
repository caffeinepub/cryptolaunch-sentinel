import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, BookOpen, TrendingUp } from 'lucide-react';
import { useChain } from '../state/chain';

export default function DashboardPage() {
  const { selectedChain } = useChain();

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/50 to-muted/20 p-8 md:p-12">
          <div className="relative z-10 grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Discover New Crypto Projects
              </h1>
              <p className="text-lg text-muted-foreground">
                Monitor {selectedChain.name} and 20+ other blockchains for new token launches. 
                Get AI-powered risk insights and learn Web3 fundamentals.
              </p>
              <div className="flex gap-3">
                <Button size="lg">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/assets/generated/cryptolaunch-sentinel-hero.dim_1600x900.png"
                alt="CryptoLaunch Sentinel"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Real-Time Discovery</CardTitle>
              <CardDescription>
                Spot new projects within seconds of launch across 20+ blockchains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Integrated with leading APIs to bring you the latest token launches and project updates.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                AI-powered analysis to help you evaluate project safety
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get instant risk scores based on audits, team transparency, liquidity, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Learn Web3</CardTitle>
              <CardDescription>
                Daily lessons covering blockchain, DeFi, NFTs, and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Interactive articles, quizzes, and videos designed for beginners.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Currently Monitoring</CardTitle>
            <CardDescription>Active blockchain: {selectedChain.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Supported Chains</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Data Sources</p>
                <p className="text-2xl font-bold">7+</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Learn Lessons</p>
                <p className="text-2xl font-bold">50+</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
