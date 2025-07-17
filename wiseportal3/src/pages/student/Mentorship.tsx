import React, { useState } from 'react';
import {
  UserCircleIcon,
  CalendarIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import ScheduleMeetingModal from '../../components/mentorship/ScheduleMeetingModal';
import MessageModal from '../../components/mentorship/MessageModal';

interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  bio: string;
  availability: string;
}

interface Meeting {
  id: string;
  date: string;
  time: string;
  topic: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const sampleMentor: Mentor = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  expertise: ['Computer Science', 'Software Engineering', 'Career Development'],
  bio: 'Experienced software engineer with 15+ years in the industry. Passionate about mentoring students and helping them grow in their careers.',
  availability: 'Monday, Wednesday, Friday 2-5 PM',
};

const sampleMeetings: Meeting[] = [
  {
    id: '1',
    date: '2024-03-20',
    time: '3:00 PM',
    topic: 'Career Planning Discussion',
    status: 'scheduled',
  },
  {
    id: '2',
    date: '2024-03-15',
    time: '2:30 PM',
    topic: 'Project Review',
    status: 'completed',
  },
];

const StudentMentorship: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'meetings' | 'resources'>('overview');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>(sampleMeetings);

  const handleScheduleMeeting = (meeting: { date: string; time: string; topic: string }) => {
    const newMeeting: Meeting = {
      id: String(meetings.length + 1),
      ...meeting,
      status: 'scheduled',
    };
    setMeetings([...meetings, newMeeting]);
  };

  const handleSendMessage = (message: { subject: string; content: string }) => {
    // TODO: Implement message sending functionality
    console.log('Sending message:', message);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Mentorship Program</h1>
        <p className="mt-1 text-sm text-gray-500">Connect with your mentor and access mentorship resources</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: UserCircleIcon },
            { id: 'meetings', name: 'Meetings', icon: CalendarIcon },
            { id: 'resources', name: 'Resources', icon: BookOpenIcon },
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
            {/* Mentor Information */}
            <div className="flex items-start space-x-4">
              <UserCircleIcon className="h-16 w-16 text-gray-400" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{sampleMentor.name}</h2>
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-500">Areas of Expertise</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {sampleMentor.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--wise-yellow-light)] text-[var(--wise-orange)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                  <p className="mt-1 text-sm text-gray-700">{sampleMentor.bio}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                  <p className="mt-1 text-sm text-gray-700">{sampleMentor.availability}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
              >
                <CalendarIcon className="h-5 w-5 mr-2" />
                Schedule Meeting
              </button>
              <button
                onClick={() => setIsMessageModalOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-blue)] hover:bg-[var(--wise-blue-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-blue)]"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        )}

        {selectedTab === 'meetings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Scheduled Meetings</h2>
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
              >
                <CalendarIcon className="h-5 w-5 mr-2" />
                Schedule New Meeting
              </button>
            </div>

            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{meeting.topic}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      meeting.status === 'scheduled'
                        ? 'bg-green-100 text-green-800'
                        : meeting.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'resources' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Mentorship Resources</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Resource Cards */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Career Development Guide</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Comprehensive guide for career planning and professional development
                </p>
                <a
                  href="#"
                  className="mt-2 text-sm text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)] inline-flex items-center"
                >
                  View Guide
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Meeting Templates</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Templates for setting meeting agendas and tracking progress
                </p>
                <a
                  href="#"
                  className="mt-2 text-sm text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)] inline-flex items-center"
                >
                  View Templates
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

export default StudentMentorship; 