import React, { useState } from 'react';
import {
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  FunnelIcon,
  CheckIcon,
  XMarkIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'meeting' | 'event';
  status: 'upcoming' | 'completed' | 'cancelled';
  participants: number;
  maxParticipants: number;
  organizer: string;
}

const Activities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const activities: Activity[] = [
    {
      id: '1',
      title: 'Welcome Workshop',
      description: 'Introduction to the program and its requirements',
      date: '2024-03-25',
      time: '10:00 AM',
      location: 'Main Hall',
      type: 'workshop',
      status: 'upcoming',
      participants: 15,
      maxParticipants: 30,
      organizer: 'John Smith',
    },
    {
      id: '2',
      title: 'Mentor Meeting',
      description: 'Monthly progress review with assigned mentors',
      date: '2024-03-24',
      time: '2:00 PM',
      location: 'Conference Room A',
      type: 'meeting',
      status: 'completed',
      participants: 8,
      maxParticipants: 10,
      organizer: 'Sarah Johnson',
    },
    {
      id: '3',
      title: 'Career Fair',
      description: 'Networking event with industry professionals',
      date: '2024-03-30',
      time: '11:00 AM',
      location: 'Exhibition Center',
      type: 'event',
      status: 'upcoming',
      participants: 45,
      maxParticipants: 50,
      organizer: 'Mike Brown',
    },
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || activity.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Activity['type']) => {
    switch (type) {
      case 'workshop':
        return '🎓';
      case 'meeting':
        return '👥';
      case 'event':
        return '🎉';
      default:
        return '📅';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Activities</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage and monitor program activities and events
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-primary-50 rounded-lg p-2">
                <CalendarIcon className="h-5 w-5 text-primary-600" />
                <span className="ml-2 text-sm font-medium text-primary-600">
                  {activities.length} Total Activities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="workshop">Workshop</option>
                <option value="meeting">Meeting</option>
                <option value="event">Event</option>
              </select>
              <select
                className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-white shadow sm:rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{activity.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
                </div>
                <span className="text-2xl">{getTypeIcon(activity.type)}</span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>{new Date(activity.date).toLocaleDateString()} at {activity.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  <span>{activity.participants}/{activity.maxParticipants} participants</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  <span>{activity.location}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-500">
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                  </button>
                  {activity.status === 'upcoming' && (
                    <>
                      <button className="text-green-600 hover:text-green-500">
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-500">
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities; 