export interface KnowledgeTest {
  description: string;
  maximumScore: number;
  dateTaken: string;
  score: number;
};

export interface CommunityIndicators {
  indicators: 'community';
  knowledgeTests?: KnowledgeTest[];
  surveyCount?: number;
  otherPeopleSurveyedTested?: number;
  volunteerHours?: number;
};

export function defaultCommunityIndicators(): CommunityIndicators {
  return { indicators: 'community' };
}

export function communityScore(indicators: CommunityIndicators) {
  let knowledgeTestsScore = 0;
  const tests = indicators.knowledgeTests ?? [];
  for (const test of tests) {
    const maxScore = Math.max(test.maximumScore, 0);
    if (maxScore === 0) {
      continue;
    }
    const score = Math.min(test.score, maxScore);
    const baseline = maxScore / 2;
    knowledgeTestsScore += (score - baseline) / maxScore;
  }
  return knowledgeTestsScore
    + (indicators.surveyCount ?? 0)
    + (indicators.otherPeopleSurveyedTested ?? 0)
    + (indicators.volunteerHours ?? 0);
}
