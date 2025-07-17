import React from 'react';
import { Link } from 'react-router-dom';

interface Challenge {
  id: string;
  title: string;
  type: string;
  intelligenceType: 'Intrapersonal' | 'Linguistic' | 'Musical';
  status: 'not_started' | 'in_progress' | 'completed';
}

const CurrentChallenges: React.FC = () => {
  const currentWeek = {
    startDate: new Date('2025-03-31'),
    endDate: new Date('2025-04-06')
  };

  const individualChallenges: Challenge[] = [
    {
      id: '1',
      title: 'Written Response on Personal Development',
      type: 'Reflection Challenge',
      intelligenceType: 'Intrapersonal',
      status: 'not_started'
    },
    {
      id: '2',
      title: 'Word Scrambles',
      type: 'Marked Challenge',
      intelligenceType: 'Linguistic',
      status: 'not_started'
    },
    {
      id: '3',
      title: 'Song Reflection',
      type: 'Reflection Challenge',
      intelligenceType: 'Musical',
      status: 'not_started'
    }
  ];

  const groupChallenges: Challenge[] = [
    {
      id: '4',
      title: 'Written Response on Teamwork',
      type: 'Reflection Challenge',
      intelligenceType: 'Intrapersonal',
      status: 'not_started'
    },
    {
      id: '5',
      title: 'Song Reflection',
      type: 'Reflection Challenge',
      intelligenceType: 'Musical',
      status: 'not_started'
    },
    {
      id: '6',
      title: 'Written Response on Personal Development',
      type: 'Reflection Challenge',
      intelligenceType: 'Intrapersonal',
      status: 'not_started'
    }
  ];

  const getIntelligenceTag = (type: Challenge['intelligenceType']) => {
    const styles = {
      Intrapersonal: 'bg-blue-100 text-blue-800',
      Linguistic: 'bg-purple-100 text-purple-800',
      Musical: 'bg-rose-100 text-rose-800'
    };
    return styles[type];
  };

  const formatDateRange = (start: Date, end: Date) => {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Challenges: Week of {formatDateRange(currentWeek.startDate, currentWeek.endDate)}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Complete all of your Challenges for this week to start a streak!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Individual Challenges */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">Individual Challenges</h2>
            <p className="mt-1 text-sm text-gray-600">
              You have {individualChallenges.length} Challenges to complete on your own this week.
            </p>
            <div className="mt-6 space-y-4">
              {individualChallenges.map((challenge) => (
                <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{challenge.title}</h3>
                      <p className="text-xs text-gray-500">{challenge.type}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getIntelligenceTag(challenge.intelligenceType)}`}>
                        {challenge.intelligenceType}
                      </span>
                    </div>
                    <Link
                      to={`/student/challenge-of-the-week/${challenge.id}`}
                      className={`btn-primary text-sm ${
                        challenge.status === 'completed' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {challenge.status === 'not_started' ? 'Start' : 
                       challenge.status === 'in_progress' ? 'Resume' : 'Completed'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Group Challenges */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">Group Challenges</h2>
            <p className="mt-1 text-sm text-gray-600">
              You are enrolled in {groupChallenges.length} group challenges this week.
            </p>
            <div className="mt-6 space-y-4">
              {groupChallenges.map((challenge) => (
                <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{challenge.title}</h3>
                      <p className="text-xs text-gray-500">{challenge.type}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getIntelligenceTag(challenge.intelligenceType)}`}>
                        {challenge.intelligenceType}
                      </span>
                    </div>
                    <Link
                      to={`/student/challenge-of-the-week/${challenge.id}`}
                      className={`btn-primary text-sm ${
                        challenge.status === 'completed' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {challenge.status === 'not_started' ? 'Start' : 
                       challenge.status === 'in_progress' ? 'Resume' : 'Completed'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentChallenges; 