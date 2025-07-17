import React, { useState } from 'react';
import {
  Cog6ToothIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

interface ProgramSettings {
  maxMenteesPerMentor: number;
  meetingFrequency: string;
  programDuration: string;
  requiredMeetings: number;
}

interface MentorStats {
  totalMentors: number;
  activeMentors: number;
  availableSlots: number;
  averageRating: number;
}

const sampleSettings: ProgramSettings = {
  maxMenteesPerMentor: 3,
  meetingFrequency: 'Weekly',
  programDuration: '6 months',
  requiredMeetings: 24,
};

const sampleStats: MentorStats = {
  totalMentors: 25,
  activeMentors: 20,
  availableSlots: 15,
  averageRating: 4.8,
};

const AdminMentorship: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'mentors' | 'settings' | 'analytics'>('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Mentorship Program</h1>
        <p className="mt-1 text-sm text-gray-500">Manage the mentorship program and its settings</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: ChartBarIcon },
            { id: 'mentors', name: 'Mentors', icon: UserGroupIcon },
            { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
            { id: 'analytics', name: 'Analytics', icon: DocumentTextIcon },
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
                <h3 className="text-sm font-medium text-gray-500">Total Mentors</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{sampleStats.totalMentors}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Active Mentors</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{sampleStats.activeMentors}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Available Slots</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{sampleStats.availableSlots}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{sampleStats.averageRating}/5.0</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-end space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]">
                <UserPlusIcon className="h-5 w-5 mr-2" />
                Add New Mentor
              </button>
            </div>
          </div>
        )}

        {selectedTab === 'mentors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Mentor Management</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]">
                <UserPlusIcon className="h-5 w-5 mr-2" />
                Add New Mentor
              </button>
            </div>

            {/* Mentor List */}
            <div className="space-y-4">
              {/* Sample Mentor Card */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">Computer Science, Software Engineering</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                  <span className="text-sm text-gray-500">2/3 mentees</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Program Settings</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum Mentees per Mentor
                  </label>
                  <input
                    type="number"
                    value={sampleSettings.maxMenteesPerMentor}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Meeting Frequency
                  </label>
                  <select
                    value={sampleSettings.meetingFrequency}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                  >
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Program Duration
                  </label>
                  <select
                    value={sampleSettings.programDuration}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                  >
                    <option>3 months</option>
                    <option>6 months</option>
                    <option>12 months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Required Meetings
                  </label>
                  <input
                    type="number"
                    value={sampleSettings.requiredMeetings}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Program Analytics</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Analytics Cards */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Program Performance</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Overall program metrics and success rates
                </p>
                <button className="mt-2 text-sm text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)]">
                  View Details →
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Mentor Performance</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Mentor effectiveness and feedback analysis
                </p>
                <button className="mt-2 text-sm text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)]">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMentorship; 