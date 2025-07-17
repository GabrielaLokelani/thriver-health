import {
  XMarkIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface Application {
  id: string;
  studentName: string;
  email: string;
  program: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  studentId?: string;
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      studentName: 'John Doe',
      email: 'john@example.com',
      program: 'Computer Science',
      status: 'pending',
      submittedDate: '2024-03-15',
    },
  ]);

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (application: Application) => {
    const studentId = `STU${Math.floor(Math.random() * 10000)}`;
    setApplications(applications.map(app =>
      app.id === application.id
        ? { ...app, status: 'approved', studentId }
        : app
    ));
    // TODO: Send approval email
  };

  const handleReject = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleConfirmRejection = () => {
    if (selectedApplication) {
      setApplications(applications.map(app =>
        app.id === selectedApplication.id
          ? { ...app, status: 'rejected' }
          : app
      ));
      setShowDetailsModal(false);
      setRejectionReason('');
      // TODO: Send rejection email with reason
    }
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Student Applications</h1>
        <div className="flex space-x-4">
          <button className="btn btn-secondary">
            Export Applications
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
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
                    <div className="text-sm text-gray-500">{application.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.program}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.submittedDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : application.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.studentId || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleViewDetails(application)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(application)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(application)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Application Details</h2>
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
                <p>Name: {selectedApplication.studentName}</p>
                <p>Email: {selectedApplication.email}</p>
                <p>Program: {selectedApplication.program}</p>
                <p>Submitted: {selectedApplication.submittedDate}</p>
              </div>

              {selectedApplication.status === 'pending' && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Rejection Reason</h3>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="input w-full"
                    rows={4}
                    placeholder="Enter reason for rejection..."
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                {selectedApplication.status === 'pending' && (
                  <button
                    onClick={handleConfirmRejection}
                    className="btn btn-primary"
                  >
                    Confirm Rejection
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications; 