import {
  XMarkIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface Assessment {
  id: string;
  studentName: string;
  studentId: string;
  type: 'HeS' | 'AchieveWorks';
  date: string;
  status: 'completed' | 'in_progress' | 'pending';
  results: {
    category: string;
    score: number;
    percentile: number;
  }[];
  comments?: string;
}

const Assessments: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU1234',
      type: 'HeS',
      date: '2024-03-15',
      status: 'completed',
      results: [
        {
          category: 'Leadership',
          score: 85,
          percentile: 75,
        },
        {
          category: 'Communication',
          score: 92,
          percentile: 88,
        },
      ],
      comments: 'Strong leadership potential, excellent communication skills.',
    },
  ]);

  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleViewDetails = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setShowDetailsModal(true);
  };

  const handleAddComment = () => {
    if (selectedAssessment) {
      setAssessments(assessments.map(assessment =>
        assessment.id === selectedAssessment.id
          ? { ...assessment, comments: newComment }
          : assessment
      ));
      setNewComment('');
      setShowDetailsModal(false);
    }
  };

  const handleExportResults = (assessmentId: string) => {
    // TODO: Implement export functionality
    console.log('Exporting results for assessment:', assessmentId);
  };

  const getStatusColor = (status: Assessment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Psychometric Assessments</h1>
        <div className="flex space-x-4">
          <button className="btn btn-secondary">
            Export All Results
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{assessment.studentName}</div>
                    <div className="text-sm text-gray-500">{assessment.studentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{assessment.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{assessment.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(assessment.status)}`}>
                      {assessment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleViewDetails(assessment)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleExportResults(assessment.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Export
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedAssessment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Assessment Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Student Information</h3>
                <p>Name: {selectedAssessment.studentName}</p>
                <p>ID: {selectedAssessment.studentId}</p>
                <p>Type: {selectedAssessment.type}</p>
                <p>Date: {selectedAssessment.date}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Results</h3>
                <div className="space-y-2">
                  {selectedAssessment.results.map((result, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{result.category}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">Score: {result.score}</span>
                        <span className="text-sm text-gray-500">Percentile: {result.percentile}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Comments</h3>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="input w-full"
                  rows={4}
                  placeholder="Add your comments here..."
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddComment}
                  className="btn btn-primary"
                >
                  Save Comments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments; 