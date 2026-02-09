import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, AlertCircle, HelpCircle } from 'lucide-react';
import type { RiskLevel } from './riskHeuristics';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'default' | 'lg';
}

export default function RiskBadge({ level, size = 'default' }: RiskBadgeProps) {
  const config = {
    low: {
      label: 'Low Risk',
      icon: Shield,
      className: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
    },
    medium: {
      label: 'Medium Risk',
      icon: AlertTriangle,
      className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
    },
    high: {
      label: 'High Risk',
      icon: AlertCircle,
      className: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
    },
    unknown: {
      label: 'Unknown',
      icon: HelpCircle,
      className: 'bg-muted text-muted-foreground border-border',
    },
  };

  const { label, icon: Icon, className } = config[level];

  return (
    <Badge variant="outline" className={`gap-1.5 ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
}
