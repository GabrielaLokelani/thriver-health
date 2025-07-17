import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentPlusIcon,
  ChatBubbleLeftIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface ActivityLog {
  id: string;
  studentName: string;
  title: string;
  category: string;
  date: string;
  description: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
  documents: Array<{ id: string; name: string; url: string }>;
}

const ActivityLogCard: React.FC<{ activity: ActivityLog }> = ({ activity }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-gray-900">{activity.title}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              activity.status === 'approved' ? 'bg-green-100 text-green-700' :
              activity.status === 'rejected' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
          
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-sm text-gray-500">{activity.date}</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {activity.points} points
            </span>
            {activity.documents.length > 0 && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <DocumentPlusIcon className="w-4 h-4 mr-1" />
                {activity.documents.length} document{activity.documents.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {showDetails && (
            <div className="mt-4 space-y-4">
              {activity.documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Documents</h4>
                  <div className="flex flex-wrap gap-2">
                    {activity.documents.map(doc => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm text-gray-700 bg-gray-100 hover:bg-gray-200"
                      >
                        <DocumentPlusIcon className="w-4 h-4 mr-2" />
                        {doc.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        <button className="text-sm text-primary-600 hover:text-primary-700">
          <ChatBubbleLeftIcon className="w-4 h-4 inline mr-1" />
          Request Info
        </button>
        <button className="text-sm text-primary-600 hover:text-primary-700">
          <PencilIcon className="w-4 h-4 inline mr-1" />
          Edit
        </button>
        <button className="text-sm text-red-600 hover:text-red-700">
          <TrashIcon className="w-4 h-4 inline mr-1" />
          Delete
        </button>
        {activity.status === 'pending' && (
          <>
            <button className="text-sm text-green-600 hover:text-green-700">
              <CheckCircleIcon className="w-4 h-4 inline mr-1" />
              Approve
            </button>
            <button className="text-sm text-red-600 hover:text-red-700">
              <XCircleIcon className="w-4 h-4 inline mr-1" />
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const ActivityLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data - replace with actual API call
  const activities: ActivityLog[] = [
    {
      id: '1',
      studentName: 'John Doe',
      title: 'Math Olympiad Participation',
      category: 'Scholarship',
      date: '2024-04-15',
      description: 'Participated in the regional math competition and secured first place.',
      points: 10,
      status: 'pending',
      documents: [
        { id: '1', name: 'Certificate.pdf', url: '#' },
        { id: '2', name: 'Results.pdf', url: '#' },
      ],
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      title: 'Debate Club Leadership',
      category: 'Extracurricular',
      date: '2024-04-10',
      description: 'Led weekly debate club meetings and organized a school-wide debate competition.',
      points: 5,
      status: 'approved',
      documents: [
        { id: '3', name: 'Meeting Minutes.pdf', url: '#' },
      ],
    },
  ];

  const categories = [
    { id: 'scholarship', name: 'Scholarship', color: 'blue' },
    { id: 'extracurricular', name: 'Extracurricular', color: 'green' },
    { id: 'social', name: 'Social & Non-formal', color: 'red' },
    { id: 'references', name: 'References & Essays', color: 'orange' },
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || activity.status === selectedStatus;
    const matchesCategory = !selectedCategory || activity.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Activity Logs</h1>
          <p className="text-gray-500">Review and manage student activities</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FD7E14] hover:bg-[#FD7E14]/90">
          <DocumentPlusIcon className="w-5 h-5 mr-2" />
          Upload Verification
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <select
              value={selectedStatus || ''}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-4">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCategory === cat.id
                    ? `bg-${cat.color}-100 text-${cat.color}-700`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <ActivityLogCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs; 