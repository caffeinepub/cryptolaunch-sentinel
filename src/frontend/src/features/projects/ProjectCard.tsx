import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock } from 'lucide-react';
import type { ProjectSummary } from '../discover/projectMappers';
import RiskBadge from '../risk/RiskBadge';
import { calculateRisk } from '../risk/riskHeuristics';
import { useState } from 'react';
import ProjectDetailsDialog from './ProjectDetailsDialog';
import { formatRelativeTime } from '../../lib/formatting';
import { recordAnalyticsEvent } from '../analytics/analyticsEvents';

interface ProjectCardProps {
  project: ProjectSummary;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const risk = calculateRisk(project);

  const handleOpenDetails = () => {
    setDetailsOpen(true);
    recordAnalyticsEvent('projectOpen');
  };

  return (
    <>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="outline">{project.chain}</Badge>
                <span className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(project.launchTime)}
                </span>
              </CardDescription>
            </div>
            <RiskBadge level={risk.level} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {project.socials?.twitter && (
                <Badge variant="secondary" className="text-xs">Twitter</Badge>
              )}
              {project.socials?.telegram && (
                <Badge variant="secondary" className="text-xs">Telegram</Badge>
              )}
              {project.socials?.discord && (
                <Badge variant="secondary" className="text-xs">Discord</Badge>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleOpenDetails}>
              View Details
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <ProjectDetailsDialog
        project={project}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}
