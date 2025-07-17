import {
  AcademicCapIcon,
  ChartBarIcon,
  CheckIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface SystemStats {
  totalStudents: number;
  activeChallenges: number;
  completionRate: number;
  averageScore: number;
  totalSubmissions: number;
  pendingReviews: number;
}

interface ChallengeTemplate {
  id: string;
  title: string;
  description: string;
  type: 'marked' | 'reflection' | 'hands-on';
  intelligence: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  dueDate: string;
  isActive: boolean;
  questions?: {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
  }[];
}

interface SystemSettings {
  defaultDueDate: string;
  autoApprove: boolean;
  requireReview: boolean;
  allowLateSubmissions: boolean;
  maxSubmissionsPerWeek: number;
  notificationPreferences: {
    email: boolean;
    inApp: boolean;
    push: boolean;
  };
}

const ChallengeOfTheWeek: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'stats' | 'settings'>('templates');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ChallengeTemplate | null>(null);
  const [templateForm, setTemplateForm] = useState<Partial<ChallengeTemplate>>({
    title: '',
    description: '',
    type: 'marked',
    intelligence: '',
    difficulty: 'intermediate',
    dueDate: '',
    isActive: true
  });

  const [systemStats] = useState<SystemStats>({
    totalStudents: 150,
    activeChallenges: 12,
    completionRate: 85,
    averageScore: 88,
    totalSubmissions: 450,
    pendingReviews: 25
  });

  const [templates] = useState<ChallengeTemplate[]>([
    {
      id: '1',
      title: 'Logical Problem Solving',
      description: 'Solve a series of logical puzzles to enhance analytical thinking skills.',
      type: 'marked',
      intelligence: 'Logical-Mathematical',
      difficulty: 'intermediate',
      dueDate: '2024-02-26',
      isActive: true,
      questions: [
        {
          id: 'q1',
          text: 'If all A are B, and all B are C, then:',
          options: [
            'All A are C',
            'Some A are C',
            'No A are C',
            'Cannot be determined'
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      id: '2',
      title: 'Creative Writing Reflection',
      description: 'Write a short story that incorporates elements of nature and personal growth.',
      type: 'reflection',
      intelligence: 'Linguistic',
      difficulty: 'beginner',
      dueDate: '2024-02-26',
      isActive: true
    }
  ]);

  const [settings, setSettings] = useState<SystemSettings>({
    defaultDueDate: '2024-02-26',
    autoApprove: false,
    requireReview: true,
    allowLateSubmissions: true,
    maxSubmissionsPerWeek: 3,
    notificationPreferences: {
      email: true,
      inApp: true,
      push: false
    }
  });

  const handleAddTemplate = () => {
    setSelectedTemplate(null);
    setTemplateForm({
      title: '',
      description: '',
      type: 'marked',
      intelligence: '',
      difficulty: 'intermediate',
      dueDate: '',
      isActive: true
    });
    setShowTemplateModal(true);
  };

  const handleEditTemplate = (template: ChallengeTemplate) => {
    setSelectedTemplate(template);
    setTemplateForm(template);
    setShowTemplateModal(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    // Here you would typically make an API call to delete the template
    console.log('Delete template:', templateId);
  };

  const handleSaveTemplate = () => {
    // Here you would typically make an API call to save the template
    console.log('Save template:', templateForm);
    setShowTemplateModal(false);
  };

  const handleSaveSettings = () => {
    // Here you would typically make an API call to save the settings
    console.log('Save settings:', settings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Challenge of the Week Management</h1>
              <p className="mt-1 text-sm text-gray-500">Manage templates and system settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <UserGroupIcon className="h-6 w-6 text-blue-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Total Students: {systemStats.totalStudents}</span>
              </div>
              <div className="flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-green-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Active Challenges: {systemStats.activeChallenges}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('templates')}
                className={`${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Templates
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Statistics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'templates' ? (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={handleAddTemplate}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Template
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-6 w-6 text-blue-500" />
                        <span className="ml-2 text-sm font-medium text-gray-900">{template.intelligence}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          template.type === 'marked' ? 'bg-blue-100 text-blue-800' :
                          template.type === 'reflection' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {template.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          template.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                          template.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {template.difficulty}
                        </span>
                        {template.isActive ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{template.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Due: {new Date(template.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'stats' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-6 w-6 text-blue-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Completion Rate</span>
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{systemStats.completionRate}%</div>
              <div className="mt-1 text-sm text-gray-500">of students complete challenges on time</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <AcademicCapIcon className="h-6 w-6 text-green-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Average Score</span>
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{systemStats.averageScore}%</div>
              <div className="mt-1 text-sm text-gray-500">across all marked challenges</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-purple-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Total Submissions</span>
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{systemStats.totalSubmissions}</div>
              <div className="mt-1 text-sm text-gray-500">challenges submitted this week</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Pending Reviews</span>
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{systemStats.pendingReviews}</div>
              <div className="mt-1 text-sm text-gray-500">submissions awaiting review</div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Default Due Date</label>
                    <input
                      type="date"
                      value={settings.defaultDueDate}
                      onChange={(e) => setSettings({ ...settings, defaultDueDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Submissions Per Week</label>
                    <input
                      type="number"
                      min="1"
                      value={settings.maxSubmissionsPerWeek}
                      onChange={(e) => setSettings({ ...settings, maxSubmissionsPerWeek: Number(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Review Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.autoApprove}
                      onChange={(e) => setSettings({ ...settings, autoApprove: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Auto-approve submissions</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.requireReview}
                      onChange={(e) => setSettings({ ...settings, requireReview: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Require review for all submissions</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.allowLateSubmissions}
                      onChange={(e) => setSettings({ ...settings, allowLateSubmissions: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Allow late submissions</label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.notificationPreferences.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        notificationPreferences: {
                          ...settings.notificationPreferences,
                          email: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Email notifications</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.notificationPreferences.inApp}
                      onChange={(e) => setSettings({
                        ...settings,
                        notificationPreferences: {
                          ...settings.notificationPreferences,
                          inApp: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">In-app notifications</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.notificationPreferences.push}
                      onChange={(e) => setSettings({
                        ...settings,
                        notificationPreferences: {
                          ...settings.notificationPreferences,
                          push: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Push notifications</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedTemplate ? 'Edit Template' : 'Add Template'}
                </h2>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={templateForm.title}
                    onChange={(e) => setTemplateForm({ ...templateForm, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter template title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={templateForm.description}
                    onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter template description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={templateForm.type}
                      onChange={(e) => setTemplateForm({ ...templateForm, type: e.target.value as ChallengeTemplate['type'] })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="marked">Marked</option>
                      <option value="reflection">Reflection</option>
                      <option value="hands-on">Hands-on</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Intelligence</label>
                    <input
                      type="text"
                      value={templateForm.intelligence}
                      onChange={(e) => setTemplateForm({ ...templateForm, intelligence: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter intelligence type"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <select
                      value={templateForm.difficulty}
                      onChange={(e) => setTemplateForm({ ...templateForm, difficulty: e.target.value as ChallengeTemplate['difficulty'] })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                      type="date"
                      value={templateForm.dueDate}
                      onChange={(e) => setTemplateForm({ ...templateForm, dueDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={templateForm.isActive}
                    onChange={(e) => setTemplateForm({ ...templateForm, isActive: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Active Template</label>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowTemplateModal(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <XMarkIcon className="h-4 w-4 mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTemplate}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Save Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeOfTheWeek; 