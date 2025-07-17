import { CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import MessageModal from '../../components/modals/MessageModal';
import ScheduleMeetingModal from '../../components/modals/ScheduleMeetingModal';

const MenteeDashboard: React.FC = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Sample data - in a real app, this would come from an API
  const mentor = {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.j@example.com',
    expertise: ['Career Development', 'Research Methods', 'Academic Writing'],
    bio: 'Experienced academic mentor with over 10 years of experience in higher education. Specialized in helping students develop their research skills and academic writing abilities.',
  };

  const upcomingMeetings = [
    {
      id: '1',
      title: 'Career Development Discussion',
      date: '2024-03-15',
      time: '14:00',
      type: 'virtual',
      agenda: 'Discuss career goals and potential internship opportunities',
    },
    {
      id: '2',
      title: 'Research Project Review',
      date: '2024-03-20',
      time: '15:30',
      type: 'virtual',
      agenda: 'Review progress on current research project and discuss next steps',
    },
  ];

  const progress = {
    overall: 75,
    goals: [
      { name: 'Research Proposal', completed: true },
      { name: 'Literature Review', completed: true },
      { name: 'Data Collection', completed: false },
      { name: 'Analysis', completed: false },
    ],
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
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mentee Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mentor Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">My Mentor</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="p-2 text-gray-600 hover:text-[var(--wise-orange)]"
              >
                <CalendarIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsMessageModalOpen(true)}
                className="p-2 text-gray-600 hover:text-[var(--wise-orange)]"
              >
                <ChatBubbleLeftIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">{mentor.name}</h3>
              <p className="text-sm text-gray-500">{mentor.email}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Bio</h4>
              <p className="text-sm text-gray-600">{mentor.bio}</p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">My Progress</h2>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-gray-900">{progress.overall}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-[var(--wise-orange)] rounded-full"
                  style={{ width: `${progress.overall}%` }}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Goals</h4>
              <div className="space-y-2">
                {progress.goals.map((goal) => (
                  <div key={goal.name} className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full mr-2 ${
                        goal.completed
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className="text-sm text-gray-600">{goal.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)]"
            >
              <CalendarIcon className="h-4 w-4 mr-1" />
              Schedule New
            </button>
          </div>

          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <h3 className="font-medium text-gray-900 mb-1">
                  {meeting.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {meeting.date} at {meeting.time}
                </div>
                <p className="text-sm text-gray-600 mb-2">{meeting.agenda}</p>
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {meeting.type}
                </span>
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

export default MenteeDashboard; 