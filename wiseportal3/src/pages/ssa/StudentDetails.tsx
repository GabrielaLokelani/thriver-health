import {
  CheckCircleIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface PillarPoints {
  name: string;
  current: number;
  target: number;
  color: string;
}

const mockStudents = [
  { id: '1', name: 'Fabian De La Cruz', program: 'Academics', school: 'Just Keep Livin Foundation', dob: '3/16/08', location: '1001 E Brett St, Inglewood, CA 90302', parent: 'Maria', parentPhone: '(310) 234-2846', parentEmail: 'mariaa87@gmail.com', email: 'fabian@jklstudent.jklswmail.org', grade: '9', status: 'active' },
  { id: '2', name: 'Dalila Hernandez', program: 'Academics', school: 'Just Keep Livin Foundation', dob: '6/01/09', location: '7225 Brighton Ave, Los Angeles, CA 90047', parent: 'Maria', parentPhone: '(310) 234-2846', parentEmail: 'mariaa87@gmail.com', email: 'dalila@jklstudent.jklswmail.org', grade: '9', status: 'active' },
  { id: '3', name: 'Agustin Estrada', program: 'Academics', school: 'Just Keep Livin Foundation', dob: '5/01/24', location: '728 E Kelso St, Inglewood, CA 90301', parent: 'Maria', parentPhone: '(310) 234-2846', parentEmail: 'mariaa87@gmail.com', email: 'agustin@jklstudent.jklswmail.org', grade: '9', status: 'active' },
  { id: '4', name: 'Henry Orantes', program: 'Academics', school: 'Just Keep Livin Foundation', dob: '11/21/24', location: 'Henry', parent: 'Maria', parentPhone: '(310) 234-2846', parentEmail: 'mariaa87@gmail.com', email: 'henry@jklstudent.jklswmail.org', grade: '9', status: 'active' },
  { id: '5', name: 'Jacob Aldrete', program: 'Academics', school: 'Just Keep Livin Foundation', dob: '11/21/24', location: 'Jacob', parent: 'Maria', parentPhone: '(310) 234-2846', parentEmail: 'mariaa87@gmail.com', email: 'jacob@jklstudent.jklswmail.org', grade: '9', status: 'active' },
  { id: '6', name: 'Jacob Roman', program: 'Academics', school: 'Just Keep Livin Foundation', dob: '11/21/24', location: 'Jacob', parent: 'Maria', parentPhone: '(310) 234-2846', parentEmail: 'mariaa87@gmail.com', email: 'jacobr@jklstudent.jklswmail.org', grade: '9', status: 'active' },
];

const StudentDetails: React.FC = () => {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id);
  const [selectedTab, setSelectedTab] = useState<'documents' | 'points'>('documents');
  // const [showAddDocument, setShowAddDocument] = useState(false);

  if (!student) {
    return <div className="p-6">Student not found.</div>;
  }

  const documents: Document[] = [
    {
      id: '1',
      name: 'Math Olympiad Certificate',
      type: 'Scholarship',
      date: '2024-04-15',
      points: 10,
      status: 'approved',
    },
    {
      id: '2',
      name: 'Debate Club Leadership',
      type: 'Extracurricular',
      date: '2024-04-10',
      points: 5,
      status: 'pending',
    },
  ];

  const pillarPoints: PillarPoints[] = [
    {
      name: 'Scholarship',
      current: 85,
      target: 100,
      color: '#007BFF',
    },
    {
      name: 'Extracurricular',
      current: 75,
      target: 100,
      color: '#28A745',
    },
    {
      name: 'Social & Non-formal',
      current: 90,
      target: 100,
      color: '#DC3545',
    },
    {
      name: 'References & Essays',
      current: 70,
      target: 100,
      color: '#FD7E14',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{student.name}</h1>
          <p className="text-gray-500">{student.program}</p>
        </div>
        <button
          // onClick={() => setShowAddDocument(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FD7E14] hover:bg-[#FD7E14]/90"
        >
          <DocumentPlusIcon className="w-5 h-5 mr-2" />
          Add Document
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('documents')}
            className={`${
              selectedTab === 'documents'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Documents
          </button>
          <button
            onClick={() => setSelectedTab('points')}
            className={`${
              selectedTab === 'points'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Points Breakdown
          </button>
        </nav>
      </div>

      {/* Content */}
      {selectedTab === 'documents' ? (
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{doc.date}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {doc.points} points
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'approved' ? 'bg-green-100 text-green-700' :
                    doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-4">
                <button className="text-sm text-primary-600 hover:text-primary-700">
                  <PencilIcon className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
                <button className="text-sm text-red-600 hover:text-red-700">
                  <TrashIcon className="w-4 h-4 inline mr-1" />
                  Delete
                </button>
                {doc.status === 'pending' && (
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
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillarPoints.map((pillar) => (
            <div key={pillar.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{pillar.name}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Current Points</span>
                  <span className="text-lg font-semibold" style={{ color: pillar.color }}>
                    {pillar.current}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Target Points</span>
                  <span className="text-lg font-semibold text-gray-900">{pillar.target}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(pillar.current / pillar.target) * 100}%`,
                      backgroundColor: pillar.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDetails; 