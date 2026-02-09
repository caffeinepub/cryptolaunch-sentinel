import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAnalyticsData } from './analyticsEvents';
import { useEffect, useState } from 'react';

export default function AnalyticsPanel() {
  const [analytics, setAnalytics] = useState(getAnalyticsData());

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(getAnalyticsData());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: 'Chain Selections', value: analytics.chainSelections },
    { label: 'Projects Opened', value: analytics.projectOpens },
    { label: 'Risk Details Viewed', value: analytics.riskDetailsExpands },
    { label: 'Lessons Started', value: analytics.lessonStarts },
    { label: 'Lessons Completed', value: analytics.lessonCompletes },
    { label: 'Quizzes Submitted', value: analytics.quizSubmits },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          Your activity summary
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead className="text-right">Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((metric) => (
              <TableRow key={metric.label}>
                <TableCell>{metric.label}</TableCell>
                <TableCell className="text-right font-medium">{metric.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
