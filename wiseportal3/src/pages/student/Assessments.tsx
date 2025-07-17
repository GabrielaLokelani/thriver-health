import {
  AcademicCapIcon,
  BoltIcon,
  DocumentTextIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

interface Assessment {
  id: string;
  title: string;
  type: 'learning' | 'intelligence' | 'personality' | 'skills';
  status: 'completed' | 'in_progress' | 'not_started';
  icon: React.ElementType;
  description?: string;
}

interface AssessmentResult {
  id: string;
  type: string;
  completedDate: string;
}

const Assessments: React.FC = () => {
  const assessments: Assessment[] = [
    {
      id: '1',
      title: 'Learning and productivity',
      type: 'learning',
      status: 'in_progress',
      icon: AcademicCapIcon,
      description: 'Understand your learning style and productivity patterns',
    },
    {
      id: '2',
      title: 'Intelligences',
      type: 'intelligence',
      status: 'not_started',
      icon: BoltIcon,
      description: 'Discover your unique intelligence profile',
    },
    {
      id: '3',
      title: 'Personality',
      type: 'personality',
      status: 'not_started',
      icon: UserIcon,
      description: 'Explore your personality traits and preferences',
    },
    {
      id: '4',
      title: 'Skills',
      type: 'skills',
      status: 'not_started',
      icon: WrenchScrewdriverIcon,
      description: 'Assess your current skill set and areas for growth',
    },
  ];

  const results: AssessmentResult[] = [
    {
      id: '13376581',
      type: 'AchieveWorks® Intelligences',
      completedDate: '12/18/24',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Questions</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500">Wise</span>
                  <span className="text-gray-400 mx-2">/</span>
                </div>
              </li>
              <li>
                <span className="text-sm font-medium text-gray-500">Questions</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Assessment Cards */}
      <div className="grid gap-6">
        {assessments.map((assessment) => {
          const Icon = assessment.icon;
          return (
            <div key={assessment.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-[var(--wise-orange)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{assessment.title}</h3>
                      {assessment.description && (
                        <p className="mt-1 text-sm text-gray-500">{assessment.description}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    {assessment.status === 'in_progress' ? (
                      <button className="btn-primary">
                        Resume
                      </button>
                    ) : (
                      <button className="btn-primary">
                        Start assessment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Results</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assessment type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result) => (
                  <tr key={result.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {result.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {result.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {result.completedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="btn-secondary inline-flex items-center">
                        <DocumentTextIcon className="h-4 w-4 mr-2" />
                        Assessment Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments; 