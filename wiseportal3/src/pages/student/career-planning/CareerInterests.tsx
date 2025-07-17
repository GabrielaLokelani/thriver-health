import React, { useState } from 'react';
import { StarIcon, TrashIcon, ChartBarIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

interface CareerInterest {
  id: string;
  title: string;
  description: string;
  salary: string;
  education: string;
  skills: string[];
  outlook: string;
  addedDate: string;
}

const CareerInterestCard: React.FC<{ 
  career: CareerInterest;
  onRemove: (id: string) => void;
}> = ({ career, onRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{career.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{career.description}</p>
        </div>
        <button
          onClick={() => onRemove(career.id)}
          className="p-2 text-gray-400 hover:text-red-500 rounded-full"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-[var(--wise-orange-light)]">
            <BriefcaseIcon className="h-5 w-5 text-[var(--wise-orange)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Salary Range</p>
            <p className="text-sm text-gray-900">{career.salary}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-[var(--wise-blue-light)]">
            <AcademicCapIcon className="h-5 w-5 text-[var(--wise-blue)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Education Required</p>
            <p className="text-sm text-gray-900">{career.education}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-[var(--wise-green-light)]">
            <ChartBarIcon className="h-5 w-5 text-[var(--wise-green)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Job Outlook</p>
            <p className="text-sm text-gray-900">{career.outlook}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Key Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {career.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--wise-orange-light)] text-[var(--wise-orange)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Added on {new Date(career.addedDate).toLocaleDateString()}
        </p>
        <button className="btn-primary">
          View Details
        </button>
      </div>
    </div>
  );
};

const CareerInterests: React.FC = () => {
  const [careers, setCareers] = useState<CareerInterest[]>([
    {
      id: '1',
      title: 'Software Engineer',
      description: 'Develop and maintain software applications and systems',
      salary: '$120,000 - $150,000',
      education: 'Bachelor\'s in Computer Science',
      skills: ['JavaScript', 'Python', 'React', 'Node.js'],
      outlook: 'Strong growth (22% projected)',
      addedDate: '2024-03-15',
    },
    {
      id: '2',
      title: 'Data Scientist',
      description: 'Analyze complex data sets to extract insights and inform decisions',
      salary: '$130,000 - $160,000',
      education: 'Master\'s in Data Science',
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      outlook: 'Very strong growth (31% projected)',
      addedDate: '2024-03-10',
    },
  ]);

  const handleRemoveCareer = (id: string) => {
    setCareers(careers.filter(career => career.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Career Interests</h2>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage your career interests and preferences
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]">
              <option>Recently Added</option>
              <option>Salary (High to Low)</option>
              <option>Job Outlook</option>
            </select>
          </div>
        </div>
      </div>

      {/* Career Interests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--wise-orange-light)] mb-4">
              <StarIcon className="h-8 w-8 text-[var(--wise-orange)]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No career interests yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start exploring careers and add them to your interests
            </p>
          </div>
        ) : (
          careers.map(career => (
            <CareerInterestCard
              key={career.id}
              career={career}
              onRemove={handleRemoveCareer}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CareerInterests; 