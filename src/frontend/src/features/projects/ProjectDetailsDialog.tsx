import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Twitter, Send, MessageCircle, Globe } from 'lucide-react';
import { SiX, SiTelegram, SiDiscord } from 'react-icons/si';
import type { ProjectSummary } from '../discover/projectMappers';
import RiskDetails from '../risk/RiskDetails';
import { calculateRisk } from '../risk/riskHeuristics';
import { formatTimestamp } from '../../lib/formatting';

interface ProjectDetailsDialogProps {
  project: ProjectSummary;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectDetailsDialog({
  project,
  open,
  onOpenChange,
}: ProjectDetailsDialogProps) {
  const risk = calculateRisk(project);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.name}</DialogTitle>
          <DialogDescription>
            <Badge variant="outline" className="mt-2">{project.chain}</Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>

          <Separator />

          {/* Token Details */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Token Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contract Address:</span>
                <code className="rounded bg-muted px-2 py-1 text-xs">
                  {project.tokenAddress}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Launch Time:</span>
                <span>{formatTimestamp(project.launchTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Liquidity:</span>
                <span>${project.liquidity.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h Volume:</span>
                <span>${project.volume.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Social Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Social Links</h3>
            {project.socials && Object.keys(project.socials).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.socials.twitter && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={project.socials.twitter} target="_blank" rel="noopener noreferrer">
                      <SiX className="mr-2 h-4 w-4" />
                      Twitter
                    </a>
                  </Button>
                )}
                {project.socials.telegram && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={project.socials.telegram} target="_blank" rel="noopener noreferrer">
                      <SiTelegram className="mr-2 h-4 w-4" />
                      Telegram
                    </a>
                  </Button>
                )}
                {project.socials.discord && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={project.socials.discord} target="_blank" rel="noopener noreferrer">
                      <SiDiscord className="mr-2 h-4 w-4" />
                      Discord
                    </a>
                  </Button>
                )}
                {project.socials.website && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={project.socials.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No social links available</p>
            )}
          </div>

          <Separator />

          {/* Risk Assessment */}
          <RiskDetails risk={risk} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
