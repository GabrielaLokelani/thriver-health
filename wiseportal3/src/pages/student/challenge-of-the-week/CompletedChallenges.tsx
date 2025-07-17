import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Challenge {
  id: string;
  title: string;
  type: string;
  intelligenceType: 'Logical' | 'Musical' | 'Naturalistic' | 'Interpersonal';
  difficulty: 'Beginner' | 'Intermediate';
}

const CompletedChallenges: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [intelligenceFilter, setIntelligenceFilter] = useState('all');

  const completedChallenges: Challenge[] = [
    {
      id: '1',
      title: 'Arithmetic Exercises',
      type: 'Marked Challenge',
      intelligenceType: 'Logical',
      difficulty: 'Intermediate'
    },
    {
      id: '2',
      title: 'Song Reflection',
      type: 'Reflection Challenge',
      intelligenceType: 'Musical',
      difficulty: 'Intermediate'
    },
    {
      id: '3',
      title: 'Arithmetic Exercises',
      type: 'Marked Challenge',
      intelligenceType: 'Logical',
      difficulty: 'Beginner'
    },
    {
      id: '4',
      title: 'Written Response on Sustainability',
      type: 'Reflection Challenge',
      intelligenceType: 'Naturalistic',
      difficulty: 'Intermediate'
    },
    {
      id: '5',
      title: 'Written Response on Teamwork',
      type: 'Reflection Challenge',
      intelligenceType: 'Interpersonal',
      difficulty: 'Beginner'
    }
  ];

  const getIntelligenceTag = (type: Challenge['intelligenceType']) => {
    const styles = {
      Logical: 'bg-yellow-100 text-yellow-800',
      Musical: 'bg-rose-100 text-rose-800',
      Naturalistic: 'bg-green-100 text-green-800',
      Interpersonal: 'bg-blue-100 text-blue-800'
    };
    return styles[type];
  };

  const getDifficultyTag = (difficulty: Challenge['difficulty']) => {
    const styles = {
      Beginner: 'border-green-500 text-green-700',
      Intermediate: 'border-orange-500 text-orange-700'
    };
    return styles[difficulty];
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">All Completed Challenges</h1>
        <p className="mt-2 text-sm text-gray-600">
          Access challenges you had previously completed.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="time-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <div className="relative">
            <select
              id="time-filter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)] sm:text-sm rounded-md"
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ChevronDownIcon className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label htmlFor="intelligence-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter: All Intelligences
          </label>
          <div className="relative">
            <select
              id="intelligence-filter"
              value={intelligenceFilter}
              onChange={(e) => setIntelligenceFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)] sm:text-sm rounded-md"
            >
              <option value="all">All Intelligences</option>
              <option value="logical">Logical</option>
              <option value="musical">Musical</option>
              <option value="naturalistic">Naturalistic</option>
              <option value="interpersonal">Interpersonal</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ChevronDownIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Challenge List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {completedChallenges.map((challenge) => (
            <li key={challenge.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {challenge.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{challenge.type}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getIntelligenceTag(challenge.intelligenceType)}`}>
                      {challenge.intelligenceType}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyTag(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    <button
                      onClick={() => {}}
                      className="btn-secondary text-sm"
                    >
                      View Answer Explanation
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <nav className="flex items-center justify-between">
          <div className="flex-1 flex justify-between">
            <button
              className="btn-secondary"
              disabled
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page 1 of 1
            </span>
            <button
              className="btn-secondary"
              disabled
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default CompletedChallenges; 