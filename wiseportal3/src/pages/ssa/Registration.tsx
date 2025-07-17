import {
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface RegistrationForm {
  id: string;
  name: string;
  program: string;
  status: 'active' | 'inactive';
  questions: {
    id: string;
    text: string;
    type: 'text' | 'select' | 'checkbox';
    required: boolean;
  }[];
}

const Registration: React.FC = () => {
  const [forms, setForms] = useState<RegistrationForm[]>([
    {
      id: '1',
      name: 'Default Registration Form',
      program: 'All Programs',
      status: 'active',
      questions: [
        {
          id: 'q1',
          text: 'Full Name',
          type: 'text',
          required: true,
        },
        {
          id: 'q2',
          text: 'Email Address',
          type: 'text',
          required: true,
        },
      ],
    },
  ]);

  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<RegistrationForm | null>(null);

  const handleCreateForm = () => {
    setSelectedForm(null);
    setShowFormModal(true);
  };

  const handleEditForm = (form: RegistrationForm) => {
    setSelectedForm(form);
    setShowFormModal(true);
  };

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter(form => form.id !== formId));
  };

  const handleToggleStatus = (formId: string) => {
    setForms(forms.map(form => 
      form.id === formId 
        ? { ...form, status: form.status === 'active' ? 'inactive' : 'active' }
        : form
    ));
  };

  const handleGenerateToken = (formId: string) => {
    // TODO: Implement token generation
    console.log('Generating token for form:', formId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Registration Management</h1>
        <button
          onClick={handleCreateForm}
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Registration Form
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forms.map((form) => (
                <tr key={form.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{form.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{form.program}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      form.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {form.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{form.questions.length} questions</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleToggleStatus(form.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {form.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => handleGenerateToken(form.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Generate Token
                      </button>
                      <button
                        onClick={() => handleEditForm(form)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteForm(form.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedForm ? 'Edit Registration Form' : 'Create Registration Form'}
              </h2>
              <button
                onClick={() => setShowFormModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            {/* Form content will go here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration; 