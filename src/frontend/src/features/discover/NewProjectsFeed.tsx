import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Clock, AlertCircle } from 'lucide-react';
import { useChain } from '../../state/chain';
import { useProjectPolling } from './useProjectPolling';
import ProjectCard from '../projects/ProjectCard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function NewProjectsFeed() {
  const { selectedChain } = useChain();
  const { projects, isLoading, error, lastUpdated, refresh, isRefreshing } = useProjectPolling(selectedChain.id);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const handleRefresh = () => {
    refresh();
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>New Projects on {selectedChain.name}</CardTitle>
              <CardDescription>
                Real-time feed updated automatically
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="gap-1.5">
                    <Clock className="h-3 w-3" />
                    {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last updated time</p>
                </TooltipContent>
              </Tooltip>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load projects. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Projects List */}
      {!isLoading && !error && projects.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No new projects found on {selectedChain.name} yet. Check back soon!
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && projects.length > 0 && (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <ProjectCard key={`${project.name}-${index}`} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
