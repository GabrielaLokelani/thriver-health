import React from 'react';
import { ChartBarIcon, TrophyIcon, ClockIcon } from '@heroicons/react/24/outline';

interface IntelligenceScore {
  type: string;
  score: number;
  total: number;
  color: string;
}

const ChallengeResults: React.FC = () => {
  const intelligenceScores: IntelligenceScore[] = [
    { type: 'Logical', score: 85, total: 100, color: 'bg-yellow-500' },
    { type: 'Musical', score: 92, total: 100, color: 'bg-rose-500' },
    { type: 'Naturalistic', score: 78, total: 100, color: 'bg-green-500' },
    { type: 'Interpersonal', score: 95, total: 100, color: 'bg-blue-500' },
    { type: 'Linguistic', score: 88, total: 100, color: 'bg-purple-500' },
    { type: 'Intrapersonal', score: 90, total: 100, color: 'bg-orange-500' }
  ];

  const stats = [
    { name: 'Challenges Completed', value: '24', icon: TrophyIcon },
    { name: 'Current Streak', value: '7 days', icon: ChartBarIcon },
    { name: 'Average Time', value: '15 mins', icon: ClockIcon },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Challenge Results</h1>
        <p className="mt-2 text-sm text-gray-600">
          Track your progress and performance across different intelligence types.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-[var(--wise-orange)]" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Intelligence Type Performance */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Intelligence Type Performance</h2>
        <div className="space-y-6">
          {intelligenceScores.map((score) => (
            <div key={score.type}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{score.type}</span>
                <span className="text-sm font-medium text-gray-900">{score.score}%</span>
              </div>
              <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full ${score.color} rounded-full transition-all duration-500 ease-in-out`}
                  style={{ width: `${(score.score / score.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            <li>
              <div className="relative pb-8">
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-[var(--wise-orange)] flex items-center justify-center ring-8 ring-white">
                      <TrophyIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">Completed <span className="font-medium text-gray-900">Arithmetic Exercises</span></p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      2h ago
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="relative pb-8">
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-[var(--wise-orange)] flex items-center justify-center ring-8 ring-white">
                      <TrophyIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">Completed <span className="font-medium text-gray-900">Song Reflection</span></p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      1d ago
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="relative">
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-[var(--wise-orange)] flex items-center justify-center ring-8 ring-white">
                      <TrophyIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">Completed <span className="font-medium text-gray-900">Written Response on Teamwork</span></p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      3d ago
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChallengeResults; 