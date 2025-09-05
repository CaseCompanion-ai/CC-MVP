'use client';

import { useState } from 'react';
import { Scale, BookOpen, Calendar, TrendingUp, ExternalLink, Star } from 'lucide-react';

interface PrecedentFindingsProps {
  className?: string;
}

interface Precedent {
  id: number;
  caseName: string;
  court: string;
  year: number;
  relevanceScore: number;
  caseType: string;
  outcome: 'favorable' | 'unfavorable' | 'neutral';
  summary: string;
  dateFound: string;
}

export default function PrecedentFindings({ className = '' }: PrecedentFindingsProps) {
  const [precedents] = useState<Precedent[]>([
    {
      id: 1,
      caseName: 'Anderson v. Digital Systems Inc.',
      court: '9th Circuit Court of Appeals',
      year: 2023,
      relevanceScore: 9.2,
      caseType: 'Patent Infringement',
      outcome: 'favorable',
      summary: 'Court ruled that software patents require specific technical implementation details.',
      dateFound: '2 hours ago'
    },
    {
      id: 2,
      caseName: 'Wilson Contract Holdings v. State',
      court: 'Supreme Court of California',
      year: 2022,
      relevanceScore: 8.7,
      caseType: 'Contract Dispute',
      outcome: 'favorable',
      summary: 'Established precedent for contract interpretation in force majeure situations.',
      dateFound: '5 hours ago'
    },
    {
      id: 3,
      caseName: 'Employment Rights Coalition v. TechGroup',
      court: 'Federal District Court, N.D. Cal.',
      year: 2021,
      relevanceScore: 7.1,
      caseType: 'Employment Law',
      outcome: 'unfavorable',
      summary: 'Court narrowly interpreted discrimination claims in tech sector cases.',
      dateFound: '1 day ago'
    }
  ]);

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'favorable':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'unfavorable':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'neutral':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600 dark:text-green-400';
    if (score >= 7.0) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>Recent Precedent Findings</span>
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {precedents.map((precedent) => (
          <div
            key={precedent.id}
            className="p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground mb-1">
                    {precedent.caseName}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    {precedent.court} • {precedent.year}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Found {precedent.dateFound}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getOutcomeColor(precedent.outcome)}`}>
                  {precedent.outcome}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className={`text-xs font-medium ${getRelevanceColor(precedent.relevanceScore)}`}>
                    {precedent.relevanceScore}/10
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <span className="inline-block px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-md mb-2">
                {precedent.caseType}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {precedent.summary}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <BookOpen className="h-3 w-3" />
                <span>Read Full Case</span>
              </button>
              
              <button className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                <TrendingUp className="h-3 w-3" />
                <span>Apply to Case</span>
              </button>
              
              <button className="flex items-center space-x-1 px-3 py-1.5 text-xs border border-border text-muted-foreground rounded-md hover:bg-muted/50 transition-colors">
                <ExternalLink className="h-3 w-3" />
                <span>View Source</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}