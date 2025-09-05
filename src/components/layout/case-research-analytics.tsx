'use client';

import { useState } from 'react';
import { Scale, TrendingUp, FileText, Award, AlertTriangle, CheckCircle } from 'lucide-react';

interface CaseResearchAnalyticsProps {
  className?: string;
}

interface CaseAnalysis {
  id: number;
  caseName: string;
  caseType: string;
  strengthScore: number;
  precedentsFound: number;
  vulnerabilities: number;
  status: 'strong' | 'moderate' | 'weak';
  lastUpdated: string;
}

export default function CaseResearchAnalytics({ className = '' }: CaseResearchAnalyticsProps) {
  const [analyses, setAnalyses] = useState<CaseAnalysis[]>([
    {
      id: 1,
      caseName: 'Smith v. TechCorp Patent Dispute',
      caseType: 'Intellectual Property',
      strengthScore: 8.5,
      precedentsFound: 12,
      vulnerabilities: 2,
      status: 'strong',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      caseName: 'Johnson Contract Breach',
      caseType: 'Contract Law',
      strengthScore: 6.2,
      precedentsFound: 8,
      vulnerabilities: 4,
      status: 'moderate',
      lastUpdated: '4 hours ago'
    },
    {
      id: 3,
      caseName: 'Davis Employment Discrimination',
      caseType: 'Employment Law',
      strengthScore: 4.1,
      precedentsFound: 5,
      vulnerabilities: 7,
      status: 'weak',
      lastUpdated: '1 day ago'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'strong':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'moderate':
        return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      case 'weak':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'weak':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Scale className="h-5 w-5 text-primary" />
          <span>Case Research Analytics</span>
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All Cases
        </button>
      </div>

      <div className="space-y-4">
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            className="p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  {getStatusIcon(analysis.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate mb-1">
                    {analysis.caseName}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {analysis.caseType} • Updated {analysis.lastUpdated}
                  </p>
                </div>
              </div>
              
              <span className={`px-2 py-1 text-xs rounded-md border ${getStatusColor(analysis.status)}`}>
                {analysis.status.charAt(0).toUpperCase() + analysis.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {analysis.strengthScore}/10
                </div>
                <div className="text-xs text-muted-foreground">Strength Score</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {analysis.precedentsFound}
                </div>
                <div className="text-xs text-muted-foreground">Precedents</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {analysis.vulnerabilities}
                </div>
                <div className="text-xs text-muted-foreground">Vulnerabilities</div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <FileText className="h-3 w-3" />
                <span>View Analysis</span>
              </button>
              
              <button className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                <Award className="h-3 w-3" />
                <span>Voice Practice</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}