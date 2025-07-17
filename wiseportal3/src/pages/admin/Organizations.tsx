import React, { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, ArchiveBoxIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Modal from '../../components/common/Modal';
import { OrganizationForm, OrganizationFormData } from '../../components/forms/OrganizationForm';

interface Organization extends OrganizationFormData {
  id: string;
  schools: number;
  students: number;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    logo: string;
  };
}

const Organizations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

  // Mock data - replace with API call
  const organizations: Organization[] = [
    {
      id: '1',
      name: 'University of Example',
      type: 'nonprofit',
      description: 'A leading educational institution',
      website: 'https://example.edu',
      contactPerson: 'John Doe',
      email: 'contact@example.edu',
      phone: '(555) 123-4567',
      address: '123 University Ave, Example City, ST 12345',
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      schools: 5,
      students: 1000,
      branding: {
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        accentColor: '#cccccc',
        logo: '',
      },
    },
    // Add more mock organizations as needed
  ];

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || org.type === selectedType;
    const matchesStatus = !selectedStatus || org.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsEditModalOpen(true);
  };

  const handleArchive = (id: string) => {
    // Implement archive functionality
    console.log('Archive organization:', id);
  };

  const handleRestore = (id: string) => {
    // Implement restore functionality
    console.log('Restore organization:', id);
  };

  const handleCreateSubmit = (data: OrganizationFormData) => {
    const newOrganization: Organization = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      schools: 0,
      students: 0,
      branding: {
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        accentColor: '#cccccc',
        logo: '',
      },
    };
    // Implement create functionality
    console.log('Create organization:', newOrganization);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (data: OrganizationFormData) => {
    if (!selectedOrganization) return;
    
    const updatedOrganization: Organization = {
      ...selectedOrganization,
      ...data,
    };
    // Implement edit functionality
    console.log('Update organization:', updatedOrganization);
    setIsEditModalOpen(false);
    setSelectedOrganization(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
        <button
          onClick={handleCreate}
          className="btn-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Organization
        </button>
      </div>

      <div className="mb-6 flex space-x-4">
        <div className="flex-1">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search organizations..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="">All Types</option>
            <option value="nonprofit">Non-Profit</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredOrganizations.map((org) => (
            <li key={org.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-600 truncate">{org.name}</p>
                    <p className="text-sm text-gray-500">{org.address}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <button
                      onClick={() => handleEdit(org)}
                      className="btn-icon"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    {org.status === 'active' ? (
                      <button
                        onClick={() => handleArchive(org.id)}
                        className="btn-icon text-red-600 hover:text-red-900"
                      >
                        <ArchiveBoxIcon className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRestore(org.id)}
                        className="btn-icon text-green-600 hover:text-green-900"
                      >
                        <ArrowPathIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {org.type.charAt(0).toUpperCase() + org.type.slice(1)}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {org.schools} schools
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {org.students} students
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      org.status === 'active' ? 'bg-green-100 text-green-800' :
                      org.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Organization"
      >
        <OrganizationForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Organization"
      >
        {selectedOrganization && (
          <OrganizationForm
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditModalOpen(false)}
            initialData={selectedOrganization}
          />
        )}
      </Modal>
    </div>
  );
};

export default Organizations; 