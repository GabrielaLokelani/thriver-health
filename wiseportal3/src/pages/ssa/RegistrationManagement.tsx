import {
  ClipboardIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface Program {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  registrationEnabled: boolean;
  formFields: FormField[];
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'file';
  required: boolean;
  options?: string[];
  validation?: {
    pattern?: string;
    message?: string;
  };
}

interface RegistrationToken {
  id: string;
  programId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  used: boolean;
}

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  program: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  studentId?: string;
  feedback?: string;
  formData: Record<string, any>;
  essayUrl?: string;
}

const RegistrationManagement: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      name: 'Computer Science',
      status: 'active',
      registrationEnabled: true,
      formFields: [
        {
          id: '1',
          label: 'Full Name',
          type: 'text',
          required: true,
        },
        {
          id: '2',
          label: 'Email',
          type: 'email',
          required: true,
          validation: {
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
            message: 'Please enter a valid email address',
          },
        },
        {
          id: '3',
          label: 'Entry Essay',
          type: 'file',
          required: true,
          validation: {
            pattern: '\\.(pdf|doc|docx)$',
            message: 'Please upload a PDF or Word document',
          },
        },
      ],
    },
  ]);

  // const [tokens, setTokens] = useState<RegistrationToken[]>([
  //   {
  //     id: '1',
  //     programId: '1',
  //     token: 'CS-2024-001',
  //     createdAt: '2024-03-20',
  //     expiresAt: '2024-04-20',
  //     used: false,
  //   },
  // ]);

  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentEmail: 'john.doe@example.com',
      program: 'Computer Science',
      status: 'pending',
      submittedAt: new Date().toISOString(),
      formData: {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        essay: 'essay.pdf'
      }
    },
  ]);

  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [showFormEditor, setShowFormEditor] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [currentToken, setCurrentToken] = useState<RegistrationToken | null>(null);
  const [newField, setNewField] = useState<Partial<FormField>>({});
  const [showNewFieldModal, setShowNewFieldModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const handleToggleRegistration = (programId: string) => {
    setPrograms(programs.map(program =>
      program.id === programId
        ? { ...program, registrationEnabled: !program.registrationEnabled }
        : program
    ));
  };

  const generateToken = (programId: string) => {
    const token = `${programId}-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
    const newToken: RegistrationToken = {
      id: Date.now().toString(),
      programId,
      token,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      used: false,
    };
    setCurrentToken(newToken);
    setShowTokenModal(true);
  };

  const copyTokenToClipboard = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  // const handleApproveApplication = (applicationId: string) => {
  //   setApplications(applications.map(app => 
  //     app.id === applicationId 
  //       ? { ...app, status: 'approved', studentId: `STU-${Date.now()}` }
  //       : app
  //   ));
  // };

  // const handleRejectApplication = (applicationId: string) => {
  //   setApplications(applications.map(app => 
  //     app.id === applicationId 
  //       ? { ...app, status: 'rejected' }
  //       : app
  //   ));
  // };

  const handleDeleteField = (programId: string, fieldId: string) => {
    setPrograms(programs.map(program =>
      program.id === programId
        ? {
            ...program,
            formFields: program.formFields.filter(field => field.id !== fieldId),
          }
        : program
    ));
  };

  const handleAddField = () => {
    if (!selectedProgram || !newField.label || !newField.type) return;
    
    const field: FormField = {
      id: Date.now().toString(),
      label: newField.label,
      type: newField.type as FormField['type'],
      required: newField.required || false,
      options: newField.type === 'select' ? newField.options : undefined,
      validation: newField.validation,
    };

    setPrograms(programs.map(program =>
      program.id === selectedProgram
        ? { ...program, formFields: [...program.formFields, field] }
        : program
    ));
    setShowNewFieldModal(false);
    setNewField({});
  };

  const handleReviewApplication = (application: Application, status: 'approved' | 'rejected') => {
    setApplications(applications.map(app =>
      app.id === application.id
        ? {
            ...app,
            status,
            feedback: feedbackText,
            studentId: status === 'approved' ? `STU-${Date.now()}` : undefined,
          }
        : app
    ));
    setSelectedApplication(null);
    setShowApplicationModal(false);
    setFeedbackText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Program Registration Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage registration settings and generate tokens for each program.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Programs List */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{program.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        program.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {program.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleRegistration(program.id)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          program.registrationEnabled ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {program.registrationEnabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => generateToken(program.id)}
                          className="text-primary-600 hover:text-primary-900"
                          title="Generate Token"
                        >
                          <DocumentDuplicateIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProgram(program.id);
                            setShowFormEditor(true);
                          }}
                          className="text-primary-600 hover:text-primary-900"
                          title="Edit Form Fields"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Token Modal */}
      {showTokenModal && currentToken && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Token Generated</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500 mb-2">Token:</p>
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <code className="text-sm">{currentToken.token}</code>
                  <button
                    onClick={() => copyTokenToClipboard(currentToken.token)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <ClipboardIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expires: {new Date(currentToken.expiresAt).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowTokenModal(false)}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle email sharing
                    setShowTokenModal(false);
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Share via Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Editor Modal */}
      {showFormEditor && selectedProgram && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Registration Form</h3>
              <button
                onClick={() => setShowFormEditor(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {programs
                .find(p => p.id === selectedProgram)
                ?.formFields.map((field) => (
                  <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{field.label}</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{field.type}</span>
                        {field.required && (
                          <span className="text-xs text-red-500">Required</span>
                        )}
                        {field.validation && (
                          <span className="text-xs text-blue-500">Validated</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteField(selectedProgram, field.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              
              <button
                onClick={() => setShowNewFieldModal(true)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Field
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Field Modal */}
      {showNewFieldModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add Form Field</h3>
              <button
                onClick={() => setShowNewFieldModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Field Label</label>
                <input
                  type="text"
                  value={newField.label || ''}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Enter field label"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Field Type</label>
                <select
                  value={newField.type || ''}
                  onChange={(e) => setNewField({ ...newField, type: e.target.value as FormField['type'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">Select type</option>
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="select">Select</option>
                  <option value="textarea">Text Area</option>
                  <option value="file">File Upload</option>
                </select>
              </div>
              {newField.type === 'select' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Options</label>
                  <textarea
                    value={newField.options?.join('\n') || ''}
                    onChange={(e) => setNewField({
                      ...newField,
                      options: e.target.value.split('\n').filter(Boolean)
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="Enter options (one per line)"
                    rows={3}
                  />
                </div>
              )}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newField.required || false}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label className="ml-2 block text-sm text-gray-900">Required field</label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowNewFieldModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddField}
                  disabled={!newField.label || !newField.type}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Field
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Applications</h3>
              <p className="mt-1 text-sm text-gray-500">
                Review and manage student applications.
              </p>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Student
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Program
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Submitted
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="font-medium text-gray-900">{application.studentName}</div>
                      <div className="text-gray-500">{application.studentEmail}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{application.program}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        application.status === 'approved' ? 'bg-green-100 text-green-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowApplicationModal(true);
                        }}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Review Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Review Application</h3>
              <button
                onClick={() => {
                  setShowApplicationModal(false);
                  setSelectedApplication(null);
                  setFeedbackText('');
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Student Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedApplication.studentEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Program</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedApplication.program}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Submitted</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedApplication.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Application Details</label>
                <div className="mt-2 bg-gray-50 rounded-lg p-4 space-y-2">
                  {Object.entries(selectedApplication.formData).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-sm font-medium text-gray-700">{key}: </span>
                      <span className="text-sm text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Feedback</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Enter feedback for the student..."
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowApplicationModal(false);
                    setSelectedApplication(null);
                    setFeedbackText('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReviewApplication(selectedApplication, 'rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleReviewApplication(selectedApplication, 'approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationManagement; 