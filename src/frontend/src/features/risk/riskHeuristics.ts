import type { ProjectSummary } from '../discover/projectMappers';

export type RiskLevel = 'low' | 'medium' | 'high' | 'unknown';

export interface RiskAssessment {
  level: RiskLevel;
  explanation: string;
  signalsUsed: string[];
  missingSignals: string[];
}

export function calculateRisk(project: ProjectSummary): RiskAssessment {
  const signals: string[] = [];
  const missing: string[] = [];
  let score = 0;

  // Audit presence
  if (project.auditPresence) {
    score += 2;
    signals.push('Smart contract audit completed');
  } else {
    missing.push('Smart contract audit');
  }

  // Team transparency
  if (project.teamTransparency) {
    score += 2;
    signals.push('Team information publicly available');
  } else {
    missing.push('Team transparency');
  }

  // Liquidity check
  if (project.liquidity > 50000) {
    score += 2;
    signals.push('High liquidity ($50k+)');
  } else if (project.liquidity > 10000) {
    score += 1;
    signals.push('Moderate liquidity ($10k-$50k)');
  } else {
    missing.push('Sufficient liquidity (below $10k)');
  }

  // Volume check
  if (project.volume > 100000) {
    score += 1;
    signals.push('High trading volume ($100k+)');
  } else if (project.volume < 10000) {
    missing.push('Significant trading volume (below $10k)');
  }

  // Token age (newer = riskier)
  const ageInHours = (Date.now() - project.launchTime) / (1000 * 60 * 60);
  if (ageInHours < 24) {
    score -= 1;
    signals.push('Very new project (less than 24 hours old)');
  }

  // Determine risk level
  let level: RiskLevel;
  let explanation: string;

  if (missing.length >= 3) {
    level = 'unknown';
    explanation = 'Insufficient data to assess risk accurately. Missing key indicators.';
  } else if (score >= 5) {
    level = 'low';
    explanation = 'This project shows strong positive signals including audits, team transparency, and healthy market metrics.';
  } else if (score >= 2) {
    level = 'medium';
    explanation = 'This project has moderate risk. Some positive signals present but lacks certain safety features.';
  } else {
    level = 'high';
    explanation = 'This project exhibits high risk factors. Exercise extreme caution and do your own research.';
  }

  return {
    level,
    explanation,
    signalsUsed: signals,
    missingSignals: missing,
  };
}
