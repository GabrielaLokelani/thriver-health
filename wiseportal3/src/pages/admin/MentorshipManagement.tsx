import { CalendarIcon, ChatBubbleLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import AddPairModal from '../../components/modals/AddPairModal';
import MessageModal from '../../components/modals/MessageModal';
import ScheduleMeetingModal from '../../components/modals/ScheduleMeetingModal';

const MentorshipManagement: React.FC = () => {
  const [isAddPairModalOpen, setIsAddPairModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Sample data - in a real app, this would come from an API
  const mentorshipPairs = [
    {
      id: '1',
      mentor: { name: 'Dr. Sarah Johnson', email: 'sarah.j@example.com' },
      mentee: { name: 'Andrés Fernandez', email: 'andres.f@example.com' },
      startDate: '2024-03-01',
      status: 'active',
      nextMeeting: '2024-03-15',
    },
    {
      id: '2',
      mentor: { name: 'Prof. Michael Chen', email: 'michael.c@example.com' },
      mentee: { name: 'Maria Garcia', email: 'maria.g@example.com' },
      startDate: '2024-02-15',
      status: 'active',
      nextMeeting: '2024-03-20',
    },
  ];

  const handleAddPair = (pairData: any) => {
    console.log('Adding new pair:', pairData);
    // In a real app, this would make an API call
  };

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mentorship Management</h1>
        <button
          onClick={() => setIsAddPairModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)]"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Pair
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentorshipPairs.map((pair) => (
          <div
            key={pair.id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {pair.mentor.name} - {pair.mentee.name}
              </h2>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {pair.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Mentor</p>
                <p className="text-sm font-medium">{pair.mentor.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mentee</p>
                <p className="text-sm font-medium">{pair.mentee.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="text-sm font-medium">{pair.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Meeting</p>
                <p className="text-sm font-medium">{pair.nextMeeting}</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
                Schedule Meeting
              </button>
              <button
                onClick={() => setIsMessageModalOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                Send Message
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddPairModal
        isOpen={isAddPairModalOpen}
        onClose={() => setIsAddPairModalOpen(false)}
        onSubmit={handleAddPair}
      />

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

export default MentorshipManagement; 