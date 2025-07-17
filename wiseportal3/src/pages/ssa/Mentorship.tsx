import React, { useState } from 'react';
import {
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import AddPairModal from '../../components/mentorship/AddPairModal';

interface MentorMenteePair {
  id: string;
  mentorName: string;
  menteeName: string;
  startDate: string;
  status: 'active' | 'completed' | 'pending';
  lastMeeting: string;
  progress: number;
}

interface ProgramStats {
  totalPairs: number;
  activePairs: number;
  completedPairs: number;
  averageProgress: number;
}

const samplePairs: MentorMenteePair[] = [
  {
    id: '1',
    mentorName: 'Dr. Sarah Johnson',
    menteeName: 'Andrés Fernandez',
    startDate: '2024-01-15',
    status: 'active',
    lastMeeting: '2024-03-15',
    progress: 75,
  },
  {
    id: '2',
    mentorName: 'Prof. Michael Chen',
    menteeName: 'Maria Garcia',
    startDate: '2024-02-01',
    status: 'active',
    lastMeeting: '2024-03-10',
    progress: 45,
  },
];

const sampleStats: ProgramStats = {
  totalPairs: 15,
  activePairs: 12,
  completedPairs: 3,
  averageProgress: 65,
};

// Sample data for the add pair modal
const sampleMentors = [
  { id: '1', name: 'Dr. Sarah Johnson' },
  { id: '2', name: 'Prof. Michael Chen' },
  { id: '3', name: 'Dr. Emily Rodriguez' },
];

const sampleMentees = [
  { id: '1', name: 'Andrés Fernandez' },
  { id: '2', name: 'Maria Garcia' },
  { id: '3', name: 'John Smith' },
];

const SSAMentorship: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'pairs' | 'reports'>('overview');
  const [isAddPairModalOpen, setIsAddPairModalOpen] = useState(false);
  const [pairs, setPairs] = useState<MentorMenteePair[]>(samplePairs);
  const [stats, setStats] = useState<ProgramStats>(sampleStats);

  const handleAddPair = (pair: { mentorId: string; menteeId: string; startDate: string }) => {
    const mentor = sampleMentors.find((m) => m.id === pair.mentorId);
    const mentee = sampleMentees.find((m) => m.id === pair.menteeId);

    if (mentor && mentee) {
      const newPair: MentorMenteePair = {
        id: String(pairs.length + 1),
        mentorName: mentor.name,
        menteeName: mentee.name,
        startDate: pair.startDate,
        status: 'active',
        lastMeeting: pair.startDate,
        progress: 0,
      };

      setPairs([...pairs, newPair]);
      setStats({
        ...stats,
        totalPairs: stats.totalPairs + 1,
        activePairs: stats.activePairs + 1,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Mentorship Program</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and monitor the mentorship program</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: ChartBarIcon },
            { id: 'pairs', name: 'Mentor-Mentee Pairs', icon: UserGroupIcon },
            { id: 'reports', name: 'Reports', icon: DocumentTextIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${
                  selectedTab === tab.id
                    ? 'border-[var(--wise-orange)] text-[var(--wise-orange)]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon
                className={`
                  -ml-0.5 mr-2 h-5 w-5
                  ${selectedTab === tab.id ? 'text-[var(--wise-orange)]' : 'text-gray-400 group-hover:text-gray-500'}
                `}
                aria-hidden="true"
              />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Total Pairs</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.totalPairs}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Active Pairs</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.activePairs}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Completed Pairs</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.completedPairs}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Average Progress</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.averageProgress}%</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddPairModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
              >
                <UserPlusIcon className="h-5 w-5 mr-2" />
                Add New Pair
              </button>
            </div>
          </div>
        )}

        {selectedTab === 'pairs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Mentor-Mentee Pairs</h2>
              <button
                onClick={() => setIsAddPairModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
              >
                <UserPlusIcon className="h-5 w-5 mr-2" />
                Add New Pair
              </button>
            </div>

            <div className="space-y-4">
              {pairs.map((pair) => (
                <div
                  key={pair.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {pair.mentorName} → {pair.menteeName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Started: {new Date(pair.startDate).toLocaleDateString()} | Last Meeting:{' '}
                      {new Date(pair.lastMeeting).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-24">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-[var(--wise-orange)] rounded-full"
                          style={{ width: `${pair.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{pair.progress}% Complete</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        pair.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : pair.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {pair.status.charAt(0).toUpperCase() + pair.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Program Reports</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Report Cards */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Monthly Progress Report</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Overview of program progress and achievements
                </p>
                <a
                  href="#"
                  className="mt-2 text-sm text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)] inline-flex items-center"
                >
                  View Report
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Feedback Analysis</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Analysis of mentor and mentee feedback
                </p>
                <a
                  href="#"
                  className="mt-2 text-sm text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)] inline-flex items-center"
                >
                  View Analysis
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddPairModal
        isOpen={isAddPairModalOpen}
        onClose={() => setIsAddPairModalOpen(false)}
        onSubmit={handleAddPair}
        mentors={sampleMentors}
        mentees={sampleMentees}
      />
    </div>
  );
};

export default SSAMentorship; 