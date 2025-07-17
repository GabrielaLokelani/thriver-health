import React, { useState } from 'react';
import {
  DocumentIcon,
  FolderIcon,
  ArrowUpTrayIcon,
  DocumentCheckIcon,
  XMarkIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface Document {
  id: string;
  title: string;
  type: 'folder' | 'file';
  category: 'program' | 'student' | 'template';
  status: 'pending' | 'approved' | 'rejected';
  uploadedBy: string;
  uploadedAt: string;
  size: string;
  studentName?: string;
}

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const documents: Document[] = [
    {
      id: '1',
      title: 'Program Guidelines',
      type: 'file',
      category: 'program',
      status: 'approved',
      uploadedBy: 'Admin',
      uploadedAt: '2024-03-20',
      size: '2.4 MB',
    },
    {
      id: '2',
      title: 'Student Applications',
      type: 'folder',
      category: 'student',
      status: 'pending',
      uploadedBy: 'System',
      uploadedAt: '2024-03-21',
      size: '15 MB',
    },
    {
      id: '3',
      title: 'Progress Report - John Doe',
      type: 'file',
      category: 'student',
      status: 'pending',
      uploadedBy: 'John Doe',
      uploadedAt: '2024-03-22',
      size: '1.2 MB',
      studentName: 'John Doe',
    },
    {
      id: '4',
      title: 'Activity Templates',
      type: 'folder',
      category: 'template',
      status: 'approved',
      uploadedBy: 'Admin',
      uploadedAt: '2024-03-19',
      size: '5.6 MB',
    },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doc.studentName?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'pending':
        return <DocumentIcon className="h-5 w-5" />;
      case 'approved':
        return <DocumentCheckIcon className="h-5 w-5" />;
      case 'rejected':
        return <XMarkIcon className="h-5 w-5" />;
      default:
        return <DocumentIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Documents</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage program documents and student submissions
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              Upload Document
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
                  <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="program">Program</option>
                <option value="student">Student</option>
                <option value="template">Template</option>
              </select>
              <select
                className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <li key={doc.id} className="py-5">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {doc.type === 'folder' ? (
                        <FolderIcon className="h-8 w-8 text-gray-400" />
                      ) : (
                        <DocumentIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{doc.title}</p>
                      <p className="truncate text-sm text-gray-500">
                        {doc.studentName ? `Student: ${doc.studentName}` : `Uploaded by ${doc.uploadedBy}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {getStatusIcon(doc.status)}
                        <span className="ml-1">{doc.status}</span>
                      </span>
                      <span className="text-sm text-gray-500">{doc.size}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents; 