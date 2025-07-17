import {
  CalendarIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import MessageModal from '../../components/modals/MessageModal';
import ScheduleMeetingModal from '../../components/modals/ScheduleMeetingModal';

interface Mentee {
  id: string;
  name: string;
  progress: number;
  lastMeeting: string;
  nextMeeting: string;
}

const sampleMentees: Mentee[] = [
  {
    id: '1',
    name: 'Andrés Fernandez',
    progress: 75,
    lastMeeting: '2024-03-15',
    nextMeeting: '2024-03-22',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    progress: 60,
    lastMeeting: '2024-03-14',
    nextMeeting: '2024-03-21',
  },
];

const MentorDashboard: React.FC = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleScheduleMeeting = (meetingData: any) => {
    console.log('Scheduling meeting:', meetingData);
    // In a real app, this would make an API call
  };

  const handleSendMessage = (messageData: any) => {
    console.log('Sending message:', messageData);
    // In a real app, this would make an API call
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mentor Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mentees Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">My Mentees</h2>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-[var(--wise-orange)] text-white">
              {sampleMentees.length} Active
            </span>
          </div>

          <div className="space-y-4">
            {sampleMentees.map((mentee) => (
              <div
                key={mentee.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{mentee.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-[var(--wise-orange)] rounded-full"
                        style={{ width: `${mentee.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Progress: {mentee.progress}%
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsScheduleModalOpen(true)}
                      className="btn-primary"
                    >
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Schedule Meeting
                    </button>
                    <button
                      onClick={() => setIsMessageModalOpen(true)}
                      className="btn-secondary btn-sm"
                    >
                      <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="btn-primary"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              Schedule New
            </button>
          </div>

          <div className="space-y-4">
            {sampleMentees.map((mentee) => (
              <div
                key={mentee.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <h3 className="font-medium text-gray-900 mb-1">
                  {mentee.name}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(mentee.nextMeeting).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScheduleMeetingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSubmit={handleScheduleMeeting}
      />

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onSubmit={handleSendMessage}
      />
    </div>
  );
};

export default MentorDashboard; 