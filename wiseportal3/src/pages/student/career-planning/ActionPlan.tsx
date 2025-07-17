import React, { useState } from 'react';
import { PlusIcon, CheckIcon, PencilIcon, TrashIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

const ActionItemCard: React.FC<{
  item: ActionItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ActionItem['status']) => void;
}> = ({ item, onEdit, onDelete, onStatusChange }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    not_started: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[item.priority]}`}>
              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(item.id)}
            className="p-2 text-gray-400 hover:text-[var(--wise-orange)] rounded-full"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-gray-400 hover:text-red-500 rounded-full"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">
              Due: {new Date(item.dueDate).toLocaleDateString()}
            </span>
          </div>
          <select
            value={item.status}
            onChange={(e) => onStatusChange(item.id, e.target.value as ActionItem['status'])}
            className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[item.status]} focus:outline-none`}
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {item.status === 'completed' && (
          <div className="flex items-center text-green-600">
            <CheckIcon className="h-5 w-5" />
            <span className="ml-1 text-sm font-medium">Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ActionPlan: React.FC = () => {
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: '1',
      title: 'Complete Resume',
      description: 'Update resume with latest projects and experiences',
      dueDate: '2024-04-15',
      status: 'in_progress',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Research Companies',
      description: 'Identify top 10 companies in target industry',
      dueDate: '2024-04-30',
      status: 'not_started',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Network on LinkedIn',
      description: 'Connect with 5 professionals in desired field',
      dueDate: '2024-04-20',
      status: 'completed',
      priority: 'medium',
    },
  ]);

  const handleStatusChange = (id: string, status: ActionItem['status']) => {
    setActionItems(items =>
      items.map(item =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setActionItems(items => items.filter(item => item.id !== id));
  };

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Edit item:', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Action Plan</h2>
            <p className="mt-1 text-sm text-gray-500">
              Track your career development steps and progress
            </p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <PlusIcon className="h-5 w-5" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Action Items Grid */}
      <div className="grid grid-cols-1 gap-6">
        {actionItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--wise-orange-light)] mb-4">
              <PlusIcon className="h-8 w-8 text-[var(--wise-orange)]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No action items yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start building your career action plan
            </p>
            <button className="mt-4 btn-primary">
              Add First Item
            </button>
          </div>
        ) : (
          actionItems.map(item => (
            <ActionItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ActionPlan; 