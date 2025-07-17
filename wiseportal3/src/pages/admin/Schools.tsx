import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { SchoolForm, SchoolFormData } from '../../components/forms/SchoolForm';

interface School extends SchoolFormData {
  id: string;
}

const Schools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schools, setSchools] = useState<School[]>([
    {
      id: '1',
      name: 'Sample School',
      organization: '1',
      type: 'public',
      status: 'active',
      location: '123 Main St',
      contactPerson: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      createdAt: '2024-01-01T00:00:00Z',
      students: 500,
      teachers: 50,
      gradingSchema: {
        type: 'percentage',
        min: 0,
        max: 100,
        passingGrade: 60,
      },
    },
  ]);

  const organizations = [
    { id: '1', name: 'Organization 1' },
    { id: '2', name: 'Organization 2' },
    { id: '3', name: 'Organization 3' },
  ];

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || school.type === selectedType;
    const matchesStatus = !selectedStatus || school.status === selectedStatus;
    const matchesOrganization = !selectedOrganization || school.organization === selectedOrganization;
    return matchesSearch && matchesType && matchesStatus && matchesOrganization;
  });

  // const getStatusColor = (status: School['status']) => {
  //   switch (status) {
  //     case 'active':
  //       return 'bg-green-100 text-green-800';
  //     case 'pending':
  //       return 'bg-yellow-100 text-yellow-800';
  //     case 'archived':
  //       return 'bg-gray-100 text-gray-800';
  //     default:
  //       return 'bg-gray-100 text-gray-800';
  //   }
  // };

  // const handleCreate = () => {
  //   setIsCreateModalOpen(true);
  // };

  // const handleEdit = (school: School) => {
  //   setSelectedSchool(school);
  //   setIsEditModalOpen(true);
  // };

  const handleArchive = (id: string) => {
    setSchools(schools.map(school =>
      school.id === id ? { ...school, status: 'archived' } : school
    ));
  };

  const handleRestore = (id: string) => {
    setSchools(schools.map(school =>
      school.id === id ? { ...school, status: 'active' } : school
    ));
  };

  const handleCreateSubmit = (data: SchoolFormData) => {
    const newSchool: School = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      students: 0,
      teachers: 0,
      status: 'pending',
    };
    setSchools([...schools, newSchool]);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (data: SchoolFormData) => {
    if (!selectedSchool) return;
    
    setSchools(schools.map(school => 
      school.id === selectedSchool.id ? { ...school, ...data } : school
    ));
    setIsEditModalOpen(false);
    setSelectedSchool(null);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Schools</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all schools in your account including their name, organization, and status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add School
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Search schools..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="sr-only">
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="">All Types</option>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="charter">Charter</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="sr-only">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="organization" className="sr-only">
                      Organization
                    </label>
                    <select
                      id="organization"
                      name="organization"
                      className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={selectedOrganization}
                      onChange={(e) => setSelectedOrganization(e.target.value)}
                    >
                      <option value="">All Organizations</option>
                      {organizations.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Organization
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Location
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Contact
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredSchools.map((school) => (
                    <tr key={school.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {school.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {organizations.find(org => org.id === school.organization)?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {school.type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          school.status === 'active' ? 'bg-green-100 text-green-800' :
                          school.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {school.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {school.location}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>{school.contactPerson}</div>
                        <div className="text-gray-400">{school.email}</div>
                        <div className="text-gray-400">{school.phone}</div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => {
                            setSelectedSchool(school);
                            setIsEditModalOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {school.status === 'active' ? (
                          <button
                            onClick={() => handleArchive(school.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <ArchiveBoxIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRestore(school.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Create New School</h3>
              <SchoolForm
                onSubmit={handleCreateSubmit}
                onCancel={() => setIsCreateModalOpen(false)}
                organizations={organizations}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedSchool && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit School</h3>
              <SchoolForm
                onSubmit={handleEditSubmit}
                onCancel={() => {
                  setIsEditModalOpen(false);
                  setSelectedSchool(null);
                }}
                initialData={selectedSchool}
                organizations={organizations}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schools; 