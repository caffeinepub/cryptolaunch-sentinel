import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { RiskAssessment } from './riskHeuristics';
import RiskBadge from './RiskBadge';
import { recordAnalyticsEvent } from '../analytics/analyticsEvents';

interface RiskDetailsProps {
  risk: RiskAssessment;
}

export default function RiskDetails({ risk }: RiskDetailsProps) {
  const handleExpand = () => {
    recordAnalyticsEvent('riskDetailsExpand');
  };

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">Risk Assessment</h3>
      
      <div className="mb-4">
        <RiskBadge level={risk.level} size="lg" />
      </div>

      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{risk.explanation}</AlertDescription>
      </Alert>

      <Accordion type="single" collapsible onValueChange={handleExpand}>
        <AccordionItem value="details">
          <AccordionTrigger>View Detailed Analysis</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {/* Positive Signals */}
              {risk.signalsUsed.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-green-700 dark:text-green-400">
                    Positive Signals
                  </h4>
                  <ul className="space-y-1">
                    {risk.signalsUsed.map((signal, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Signals */}
              {risk.missingSignals.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-orange-700 dark:text-orange-400">
                    Missing or Concerning
                  </h4>
                  <ul className="space-y-1">
                    {risk.missingSignals.map((signal, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {risk.level === 'unknown' && (
                <Alert>
                  <AlertDescription className="text-xs">
                    This assessment is based on limited data. Always conduct your own research before investing.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
