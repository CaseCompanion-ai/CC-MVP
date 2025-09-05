'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { BookOpen, Filter, Search, Calendar, Scale, Star, TrendingUp, ExternalLink, Eye, Plus, Award } from 'lucide-react';

interface Precedent {
  id: string;
  caseName: string;
  court: string;
  year: number;
  relevanceScore: number;
  caseType: string;
  outcome: 'favorable' | 'unfavorable' | 'neutral';
  citation: string;
  summary: string;
  keyPoints: string[];
  applicableToCase: string;
  dateFound: string;
  jurisdiction: string;
}

function TypingAnimation({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTypingComplete, setIsTypingComplete] = React.useState(false);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`text-purple-400 transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-70'}`}>
      {displayText}
    </span>
  );
}

export default function PrecedentResearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedPrecedent, setSelectedPrecedent] = useState<Precedent | null>(null);

  const precedents: Precedent[] = [
    {
      id: '1',
      caseName: 'Anderson v. Digital Systems Inc.',
      court: '9th Circuit Court of Appeals',
      year: 2023,
      relevanceScore: 9.2,
      caseType: 'Patent Infringement',
      outcome: 'favorable',
      citation: '2023 U.S. App. LEXIS 12345 (9th Cir.)',
      summary: 'Court ruled that software patents require specific technical implementation details to be valid and enforceable.',
      keyPoints: [
        'Software patents must include specific technical implementation',
        'Abstract ideas cannot be patented without technical specificity',
        'Prior art analysis must consider functional equivalents'
      ],
      applicableToCase: 'Smith v. TechCorp Patent Dispute',
      dateFound: '2 hours ago',
      jurisdiction: 'Federal Circuit'
    },
    {
      id: '2',
      caseName: 'Wilson Contract Holdings v. State of California',
      court: 'Supreme Court of California',
      year: 2022,
      relevanceScore: 8.7,
      caseType: 'Contract Dispute',
      outcome: 'favorable',
      citation: '15 Cal. 5th 234 (2022)',
      summary: 'Established precedent for contract interpretation in force majeure situations during pandemic-related disruptions.',
      keyPoints: [
        'Force majeure clauses apply to unforeseeable circumstances',
        'Contract performance impossibility requires objective evidence',
        'Good faith efforts to mitigate must be demonstrated'
      ],
      applicableToCase: 'Johnson Contract Breach',
      dateFound: '5 hours ago',
      jurisdiction: 'California State'
    },
    {
      id: '3',
      caseName: 'Employment Rights Coalition v. TechGroup LLC',
      court: 'Federal District Court, N.D. Cal.',
      year: 2021,
      relevanceScore: 7.1,
      caseType: 'Employment Discrimination',
      outcome: 'unfavorable',
      citation: '2021 U.S. Dist. LEXIS 45678 (N.D. Cal.)',
      summary: 'Court narrowly interpreted discrimination claims in tech sector cases, requiring higher burden of proof.',
      keyPoints: [
        'Discrimination claims require direct evidence or strong circumstantial evidence',
        'Company diversity programs do not preclude discrimination claims',
        'Statistical evidence alone insufficient without individual harm proof'
      ],
      applicableToCase: 'Davis Employment Discrimination',
      dateFound: '1 day ago',
      jurisdiction: 'Federal District'
    },
    {
      id: '4',
      caseName: 'Martinez v. Regional Medical Center',
      court: 'California Court of Appeal',
      year: 2023,
      relevanceScore: 8.4,
      caseType: 'Medical Malpractice',
      outcome: 'favorable',
      citation: '2023 Cal. App. LEXIS 78901 (2d Dist.)',
      summary: 'Court expanded liability for hospitals in cases involving emergency room treatment protocols.',
      keyPoints: [
        'Hospital liability extends to independent contractor physicians',
        'Emergency room standard of care includes adequate staffing',
        'Documentation requirements for informed consent in emergency situations'
      ],
      applicableToCase: 'Martinez Personal Injury',
      dateFound: '3 hours ago',
      jurisdiction: 'California State'
    },
    {
      id: '5',
      caseName: 'Corporate Merger Solutions v. Federal Trade Commission',
      court: 'D.C. Circuit Court of Appeals',
      year: 2022,
      relevanceScore: 9.5,
      caseType: 'Corporate Merger',
      outcome: 'favorable',
      citation: '2022 U.S. App. LEXIS 23456 (D.C. Cir.)',
      summary: 'Court clarified antitrust analysis standards for technology sector mergers and market concentration.',
      keyPoints: [
        'Market definition must consider potential competition',
        'Vertical integration benefits can offset concentration concerns',
        'Innovation competition analysis required for tech mergers'
      ],
      applicableToCase: 'GlobalTech M&A Due Diligence',
      dateFound: '6 hours ago',
      jurisdiction: 'Federal Circuit'
    },
    {
      id: '6',
      caseName: 'Environmental Defense Fund v. Coastal Manufacturing',
      court: 'EPA Administrative Law Judge',
      year: 2023,
      relevanceScore: 6.8,
      caseType: 'Environmental Compliance',
      outcome: 'neutral',
      citation: 'EPA ALJ Decision 2023-14',
      summary: 'Administrative decision provided framework for water discharge permit violations and penalty calculations.',
      keyPoints: [
        'Penalty calculations must consider economic benefit of noncompliance',
        'Voluntary disclosure and remediation efforts reduce penalties',
        'Repeat violations subject to enhanced penalty guidelines'
      ],
      applicableToCase: 'Environmental Compliance Violation',
      dateFound: '4 hours ago',
      jurisdiction: 'Federal Administrative'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Precedents' },
    { id: 'favorable', label: 'Favorable Outcomes' },
    { id: 'recent', label: 'Recent (2022+)' },
    { id: 'high-relevance', label: 'High Relevance (8+)' },
    { id: 'federal', label: 'Federal Courts' }
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Relevance Score' },
    { id: 'year', label: 'Year' },
    { id: 'court', label: 'Court' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'case-name', label: 'Case Name' }
  ];

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

  const filteredPrecedents = precedents
    .filter(precedent => {
      const matchesSearch = precedent.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          precedent.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          precedent.court.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      switch (selectedFilter) {
        case 'favorable':
          return precedent.outcome === 'favorable';
        case 'recent':
          return precedent.year >= 2022;
        case 'high-relevance':
          return precedent.relevanceScore >= 8.0;
        case 'federal':
          return precedent.jurisdiction.includes('Federal');
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevanceScore - a.relevanceScore;
        case 'year':
          return b.year - a.year;
        case 'court':
          return a.court.localeCompare(b.court);
        case 'outcome':
          return a.outcome.localeCompare(b.outcome);
        case 'case-name':
          return a.caseName.localeCompare(b.caseName);
        default:
          return 0;
      }
    });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h1 className="text-2xl font-medium text-foreground">Precedent Research</h1>
            </div>
            <p><TypingAnimation text="Discover relevant legal precedents to strengthen your cases..." speed={70} /></p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Research</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search precedents by case name, court, or legal issue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-3">
            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter:</span>
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                    selectedFilter === filter.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 text-xs bg-muted/50 border border-border/50 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredPrecedents.length} of {precedents.length} precedents
        </div>

        {/* Precedents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrecedents.map((precedent) => (
            <div
              key={precedent.id}
              className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-purple-300 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground truncate">{precedent.caseName}</h3>
                  <p className="text-sm text-muted-foreground truncate">{precedent.court}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{precedent.year}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{precedent.jurisdiction}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
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

              {/* Case Type */}
              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-md">
                  {precedent.caseType}
                </span>
              </div>

              {/* Summary */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{precedent.summary}</p>

              {/* Key Points */}
              <div className="mb-4">
                <h4 className="text-xs font-medium text-foreground mb-2">Key Points:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {precedent.keyPoints.slice(0, 2).map((point, index) => (
                    <li key={index} className="line-clamp-1">• {point}</li>
                  ))}
                  {precedent.keyPoints.length > 2 && (
                    <li className="text-muted-foreground">+{precedent.keyPoints.length - 2} more points...</li>
                  )}
                </ul>
              </div>

              {/* Citation */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground font-mono">
                  {precedent.citation}
                </p>
              </div>

              {/* Applicable Case */}
              <div className="mb-4 p-2 bg-purple-50 dark:bg-purple-900/10 rounded-md">
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Applicable to: {precedent.applicableToCase}
                </p>
              </div>

              {/* Footer */}
              <div className="flex space-x-2 pt-4 border-t border-border/30">
                <button className="flex-1 px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>View Full Case</span>
                </button>
                <button className="px-3 py-2 text-sm border border-border text-muted-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-center">
                  <Award className="h-3 w-3" />
                </button>
                <button className="px-3 py-2 text-sm border border-border text-muted-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-center">
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrecedents.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No precedents found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters to find relevant precedents.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}