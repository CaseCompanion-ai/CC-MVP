'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Upload, User, Scale, GraduationCap, Mail, FileText, Award, Building } from 'lucide-react';

function TypingAnimation({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
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

export default function LegalProfilePage() {
  const [activeSection, setActiveSection] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    
    // Legal Education & Bar Admissions
    lawSchool: '',
    graduationYear: '',
    barAdmissions: '',
    
    // Legal Specialties & Practice Areas
    practiceAreas: '',
    legalSpecialties: '',
    
    // Firm/Organization Information
    firmName: '',
    position: '',
    yearsOfExperience: '',
    
    // Legal Technology & Tools
    legalTechExperience: '',
    
    // Resume/CV
    resume: null as File | null,
  });

  const sections = [
    {
      title: 'Basic Information',
      icon: User,
      description: 'Your professional contact information'
    },
    {
      title: 'Legal Education & Bar',
      icon: GraduationCap,
      description: 'Law school and bar admission details'
    },
    {
      title: 'Practice Areas',
      icon: Scale,
      description: 'Your legal specialties and practice areas'
    },
    {
      title: 'Professional Experience',
      icon: Building,
      description: 'Your current firm and legal experience'
    },
    {
      title: 'Legal Technology',
      icon: Award,
      description: 'Technology tools and AI experience'
    },
    {
      title: 'Legal Resume/CV',
      icon: FileText,
      description: 'Upload your legal resume or CV'
    }
  ];

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('resume', file);
    }
  };

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your professional email"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="City, State (e.g., San Francisco, CA)"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Law School <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lawSchool}
                onChange={(e) => handleInputChange('lawSchool', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your law school name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Graduation Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="2024"
                min="1900"
                max="2030"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bar Admissions <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.barAdmissions}
                onChange={(e) => handleInputChange('barAdmissions', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List all jurisdictions where you are admitted to practice (e.g., California State Bar, New York State Bar, Federal Courts, etc.)"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Practice Areas <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.practiceAreas}
                onChange={(e) => handleInputChange('practiceAreas', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List your primary practice areas (e.g., Intellectual Property, Corporate Law, Employment Law, Personal Injury, etc.)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Legal Specialties & Certifications <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.legalSpecialties}
                onChange={(e) => handleInputChange('legalSpecialties', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List any legal specialties, certifications, or areas of expertise (e.g., Board Certified in Patent Law, Certified Information Privacy Professional, etc.)"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Current Firm/Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.firmName}
                onChange={(e) => handleInputChange('firmName', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your law firm or organization name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Position/Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your current position (e.g., Associate, Partner, General Counsel, Solo Practitioner)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Years of Legal Experience <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.yearsOfExperience}
                onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select years of experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-15">11-15 years</option>
                <option value="16-20">16-20 years</option>
                <option value="20+">20+ years</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Legal Technology Experience
              </label>
              <textarea
                value={formData.legalTechExperience}
                onChange={(e) => handleInputChange('legalTechExperience', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your experience with legal technology tools, AI-powered legal research platforms, case management software, document review tools, or any other legal tech solutions you've used..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                This helps CC LexiAI better understand your technology comfort level and provide more relevant features
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Legal Resume/CV <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-purple-300 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-2">
                    {formData.resume ? formData.resume.name : 'Upload your legal resume or CV'}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    PDF, DOC, or DOCX files accepted (Max 10MB)
                  </p>
                </label>
              </div>
              {formData.resume && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <FileText className="h-4 w-4" />
                  <span>{formData.resume.name} uploaded successfully</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Your resume will help CC LexiAI provide more personalized case recommendations and research assistance
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Scale className="h-8 w-8 text-purple-600" />
            <span>Legal Professional Profile</span>
          </h1>
          <p className="text-muted-foreground">
            <TypingAnimation text="Complete your legal profile for personalized AI assistance..." speed={70} />
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = index === activeSection;
            const isCompleted = index < activeSection;
            
            return (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : isCompleted 
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-border text-muted-foreground'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                {index < sections.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-border'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Section Content */}
        <div className="bg-card/50 rounded-xl p-8 border border-purple-100">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {sections[activeSection].title}
            </h2>
            <p className="text-muted-foreground">
              {sections[activeSection].description}
            </p>
          </div>

          {renderSection()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <button
              onClick={prevSection}
              disabled={activeSection === 0}
              className="px-6 py-2 text-foreground hover:text-purple-600 disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={nextSection}
              disabled={activeSection === sections.length - 1}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {activeSection === sections.length - 1 ? 'Save Legal Profile' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}