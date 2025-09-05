'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Scale, Filter, Search, Calendar, Briefcase, TrendingUp, AlertTriangle, CheckCircle, Plus, Eye, FileText } from 'lucide-react';

interface LegalCase {
  id: string;
  caseName: string;
  caseType: string;
  client: string;
  court: string;
  filingDate: string;
  status: 'active' | 'pending' | 'closed' | 'on-hold';
  priority: 'high' | 'medium' | 'low';
  strengthScore: number;
  precedentsFound: number;
  vulnerabilities: number;
  nextDeadline: string;
  description: string;
  legalAreas: string[];
}

function TypingAnimation({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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

export default function CaseManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);

  const cases: LegalCase[] = [
    {
      id: '1',
      caseName: 'Smith v. TechCorp Patent Dispute',
      caseType: 'Intellectual Property',
      client: 'Smith Industries',
      court: '9th Circuit Court of Appeals',
      filingDate: '2024-01-15',
      status: 'active',
      priority: 'high',
      strengthScore: 8.5,
      precedentsFound: 12,
      vulnerabilities: 2,
      nextDeadline: '2024-03-01',
      description: 'Patent infringement case involving software algorithms and technical implementation details.',
      legalAreas: ['Patent Law', 'Technology', 'Federal Court']
    },
    {
      id: '2',
      caseName: 'Johnson Contract Breach',
      caseType: 'Contract Law',
      client: 'Johnson Enterprises',
      court: 'Superior Court of California',
      filingDate: '2024-02-01',
      status: 'pending',
      priority: 'medium',
      strengthScore: 6.2,
      precedentsFound: 8,
      vulnerabilities: 4,
      nextDeadline: '2024-02-28',
      description: 'Breach of contract dispute involving force majeure clauses and service delivery obligations.',
      legalAreas: ['Contract Law', 'Commercial Litigation', 'State Court']
    },
    {
      id: '3',
      caseName: 'Davis Employment Discrimination',
      caseType: 'Employment Law',
      client: 'Maria Davis',
      court: 'Federal District Court, N.D. Cal.',
      filingDate: '2024-01-20',
      status: 'active',
      priority: 'high',
      strengthScore: 4.1,
      precedentsFound: 5,
      vulnerabilities: 7,
      nextDeadline: '2024-02-25',
      description: 'Employment discrimination case involving workplace harassment and wrongful termination claims.',
      legalAreas: ['Employment Law', 'Civil Rights', 'Federal Court']
    },
    {
      id: '4',
      caseName: 'Martinez Personal Injury',
      caseType: 'Personal Injury',
      client: 'Roberto Martinez',
      court: 'Los Angeles County Superior Court',
      filingDate: '2024-01-10',
      status: 'active',
      priority: 'medium',
      strengthScore: 7.8,
      precedentsFound: 15,
      vulnerabilities: 3,
      nextDeadline: '2024-03-15',
      description: 'Personal injury case involving vehicle accident and medical malpractice claims.',
      legalAreas: ['Personal Injury', 'Medical Malpractice', 'State Court']
    },
    {
      id: '5',
      caseName: 'GlobalTech M&A Due Diligence',
      caseType: 'Corporate Law',
      client: 'GlobalTech Corporation',
      court: 'Delaware Chancery Court',
      filingDate: '2024-02-05',
      status: 'on-hold',
      priority: 'low',
      strengthScore: 9.1,
      precedentsFound: 20,
      vulnerabilities: 1,
      nextDeadline: '2024-04-01',
      description: 'Merger and acquisition transaction with regulatory compliance and due diligence requirements.',
      legalAreas: ['Corporate Law', 'M&A', 'Securities Law']
    },
    {
      id: '6',
      caseName: 'Environmental Compliance Violation',
      caseType: 'Environmental Law',
      client: 'EcoManufacturing Inc.',
      court: 'EPA Administrative Court',
      filingDate: '2024-01-25',
      status: 'closed',
      priority: 'medium',
      strengthScore: 5.9,
      precedentsFound: 10,
      vulnerabilities: 5,
      nextDeadline: '2024-02-20',
      description: 'Environmental regulation compliance case involving water discharge permits and EPA violations.',
      legalAreas: ['Environmental Law', 'Regulatory Compliance', 'Administrative Law']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Cases' },
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending' },
    { id: 'high-priority', label: 'High Priority' },
    { id: 'weak-cases', label: 'Needs Attention' }
  ];

  const sortOptions = [
    { id: 'deadline', label: 'Next Deadline' },
    { id: 'strength', label: 'Strength Score' },
    { id: 'priority', label: 'Priority' },
    { id: 'filing-date', label: 'Filing Date' },
    { id: 'case-name', label: 'Case Name' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'on-hold':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'closed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStrengthColor = (score: number) => {
    if (score >= 7.5) return 'text-green-600 dark:text-green-400';
    if (score >= 5.0) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const filteredCases = cases
    .filter(caseItem => {
      const matchesSearch = caseItem.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          caseItem.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          caseItem.client.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      switch (selectedFilter) {
        case 'active':
          return caseItem.status === 'active';
        case 'pending':
          return caseItem.status === 'pending';
        case 'high-priority':
          return caseItem.priority === 'high';
        case 'weak-cases':
          return caseItem.strengthScore < 5.0;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.nextDeadline).getTime() - new Date(b.nextDeadline).getTime();
        case 'strength':
          return b.strengthScore - a.strengthScore;
        case 'priority':
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'filing-date':
          return new Date(b.filingDate).getTime() - new Date(a.filingDate).getTime();
        case 'case-name':
          return a.caseName.localeCompare(b.caseName);
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-purple-600" />
              <h1 className="text-2xl font-medium text-foreground">Case Management</h1>
            </div>
            <p><TypingAnimation text="Manage your legal cases and track progress..." speed={70} /></p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Case</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cases by name, type, or client..."
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
          Showing {filteredCases.length} of {cases.length} cases
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-purple-300 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground truncate">{caseItem.caseName}</h3>
                  <p className="text-sm text-muted-foreground truncate">{caseItem.caseType}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Briefcase className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{caseItem.client}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Due: {formatDate(caseItem.nextDeadline)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(caseItem.status)}`}>
                    {caseItem.status}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(caseItem.priority)}`}>
                    {caseItem.priority} priority
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div>
                  <div className={`text-sm font-semibold ${getStrengthColor(caseItem.strengthScore)}`}>
                    {caseItem.strengthScore}/10
                  </div>
                  <div className="text-xs text-muted-foreground">Strength</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {caseItem.precedentsFound}
                  </div>
                  <div className="text-xs text-muted-foreground">Precedents</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {caseItem.vulnerabilities}
                  </div>
                  <div className="text-xs text-muted-foreground">Issues</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{caseItem.description}</p>

              {/* Legal Areas */}
              <div className="flex flex-wrap gap-1 mb-4">
                {caseItem.legalAreas.slice(0, 2).map((area, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full"
                  >
                    {area}
                  </span>
                ))}
                {caseItem.legalAreas.length > 2 && (
                  <span className="px-2 py-1 text-xs text-muted-foreground">
                    +{caseItem.legalAreas.length - 2} more
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex space-x-2 pt-4 border-t border-border/30">
                <button className="flex-1 px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>View Case</span>
                </button>
                <button className="px-3 py-2 text-sm border border-border text-muted-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-center">
                  <FileText className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No cases found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters to find more cases.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}