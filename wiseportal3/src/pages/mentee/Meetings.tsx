import React, { useState } from 'react';
import { CalendarIcon, ChatBubbleLeftIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import ScheduleMeetingModal from '../../components/modals/ScheduleMeetingModal';

const MenteeMeetings: React.FC = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  // Sample data - in a real app, this would come from an API
  const meetings = {
    upcoming: [
      {
        id: '1',
        title: 'Career Development Discussion',
        mentor: 'Dr. Sarah Johnson',
        date: '2024-03-15',
        time: '14:00',
        type: 'virtual',
        agenda: 'Discuss career goals and potential internship opportunities',
        status: 'confirmed',
      },
      {
        id: '2',
        title: 'Research Project Review',
        mentor: 'Dr. Sarah Johnson',
        date: '2024-03-20',
        time: '15:30',
        type: 'virtual',
        agenda: 'Review progress on current research project and discuss next steps',
        status: 'pending',
      },
    ],
    past: [
      {
        id: '3',
        title: 'Initial Meeting',
        mentor: 'Dr. Sarah Johnson',
        date: '2024-02-15',
        time: '14:00',
        type: 'virtual',
        agenda: 'Introduction and goal setting',
        status: 'completed',
      },
    ],
  };

  const handleScheduleMeeting = (meetingData: any) => {
    console.log('Scheduling meeting:', meetingData);
    // In a real app, this would make an API call
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)]"
        >
          <CalendarIcon className="h-5 w-5 mr-2" />
          Request New Meeting
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`${
              selectedTab === 'upcoming'
                ? 'border-[var(--wise-orange)] text-[var(--wise-orange)]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Upcoming Meetings
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`${
              selectedTab === 'past'
                ? 'border-[var(--wise-orange)] text-[var(--wise-orange)]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Past Meetings
          </button>
        </nav>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings[selectedTab].map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {meeting.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  {meeting.mentor}
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  meeting.status
                )}`}
              >
                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {meeting.date} at {meeting.time}
              </div>
              <p className="text-sm text-gray-600">{meeting.agenda}</p>
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {meeting.type}
              </span>
            </div>

            {selectedTab === 'upcoming' && (
              <div className="mt-4 flex space-x-3">
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                  Send Message
                </button>
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Request Reschedule
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <ScheduleMeetingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleScheduleMeeting}
      />
    </div>
  );
};

export default MenteeMeetings; 