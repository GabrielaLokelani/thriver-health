import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import { ScholarshipForm, ScholarshipFormData } from '../../components/forms/ScholarshipForm';

// interface Pillar {
//   name: string;
//   description: string;
//   pointsPerYear: number;
//   feedbackQuestions: {
//     id: string;
//     question: string;
//     type: 'rating';
//     scale: {
//       min: number;
//       max: number;
//     };
//   }[];
// }

interface Scholarship {
  id: string;
  name: string;
  organization: string;
  type: 'academic' | 'need-based' | 'merit' | 'athletic';
  description: string;
  amount: number;
  requirements: {
    minGPA?: number;
    minGrade?: number;
    requiredDocuments: string[];
    eligibilityCriteria: string[];
  };
  deadline: string;
  status: 'active' | 'pending' | 'archived';
  createdAt: string;
  students: number;
}

const Scholarships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const scholarships: Scholarship[] = [
    {
      id: '1',
      name: 'Technology Excellence Scholarship',
      organization: 'University of Technology',
      type: 'academic',
      description: 'A comprehensive scholarship program for technology students',
      amount: 5000,
      requirements: {
        minGPA: 3.5,
        minGrade: 85,
        requiredDocuments: ['Transcript', 'Letter of Recommendation'],
        eligibilityCriteria: ['Must be a full-time student', 'Must maintain 3.5 GPA'],
      },
      deadline: '2024-12-31',
      status: 'active',
      createdAt: '2024-01-15',
      students: 150,
    },
  ];

  const organizations = [
    { id: '1', name: 'University of Technology' },
    { id: '2', name: 'Engineering College' },
    { id: '3', name: 'Research Institute' },
  ];

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrganization = selectedOrganization === 'all' || scholarship.organization === selectedOrganization;
    const matchesStatus = selectedStatus === 'all' || scholarship.status === selectedStatus;
    return matchesSearch && matchesOrganization && matchesStatus;
  });

  const getStatusColor = (status: Scholarship['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsEditModalOpen(true);
  };

  // const handleArchive = (id: string) => {
  //   // Implement archive functionality
  // };

  // const handleRestore = (id: string) => {
  //   // Implement restore functionality
  // };

  const handleCreateSubmit = (data: ScholarshipFormData) => {
    // Implement create functionality
    console.log('Create scholarship:', data);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (data: ScholarshipFormData) => {
    // Implement edit functionality
    console.log('Edit scholarship:', data);
    setIsEditModalOpen(false);
    setSelectedScholarship(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Scholarships</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage scholarship programs and their configurations
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="btn-primary"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Scholarship
            </button>
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
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Search scholarships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={selectedOrganization}
                onChange={(e) => setSelectedOrganization(e.target.value)}
              >
                <option value="all">All Organizations</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.name}>{org.name}</option>
                ))}
              </select>
              <select
                className="rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredScholarships.map((scholarship) => (
              <tr key={scholarship.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{scholarship.name}</div>
                  <div className="text-sm text-gray-500">{scholarship.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{scholarship.organization}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{scholarship.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${scholarship.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(scholarship.status)}`}>
                    {scholarship.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {scholarship.students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(scholarship)}
                    className="btn-icon"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  {scholarship.status === 'active' ? (
                    <button
                      // onClick={() => handleArchive(scholarship.id)}
                      className="btn-icon text-red-600 hover:text-red-900"
                    >
                      <ArchiveBoxIcon className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      // onClick={() => handleRestore(scholarship.id)}
                      className="btn-icon text-green-600 hover:text-green-900"
                    >
                      <ArrowPathIcon className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Scholarship"
      >
        <ScholarshipForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsCreateModalOpen(false)}
          organizations={organizations}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Scholarship"
      >
        {selectedScholarship && (
          <ScholarshipForm
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditModalOpen(false)}
            initialData={selectedScholarship}
            organizations={organizations}
          />
        )}
      </Modal>
    </div>
  );
};

export default Scholarships; 