import React from 'react';
import { Goal } from '../../types/goal';
import { ProgressBar } from '../common/ProgressBar';
import { formatDate } from '../../utils/date';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface GoalCardProps {
  goal: Goal;
  onEdit?: (goal: Goal) => void;
  onDelete?: (goalId: string) => void;
  onAddMilestone?: (goalId: string) => void;
  onToggleMilestone?: (goalId: string, milestoneId: string) => void;
  onAddFeedback?: (goalId: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onDelete,
  onAddMilestone,
  onToggleMilestone,
  onAddFeedback,
}) => {
  const statusColors = {
    not_started: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-[var(--wise-blue-light)] text-[var(--wise-blue)]',
    completed: 'bg-[var(--wise-green-light)] text-[var(--wise-green)]',
  };

  const categoryColors = {
    academic: 'bg-[var(--wise-purple-light)] text-[var(--wise-purple)]',
    career: 'bg-[var(--wise-blue-light)] text-[var(--wise-blue)]',
    personal: 'bg-[var(--wise-pink-light)] text-[var(--wise-pink)]',
    professional: 'bg-[var(--wise-green-light)] text-[var(--wise-green)]',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
          <p className="text-sm text-gray-600">{goal.description}</p>
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(goal)}
              className="p-1 text-gray-400 hover:text-[var(--wise-orange)] rounded-full hover:bg-gray-100 transition-colors duration-200"
              title="Edit goal"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors duration-200"
              title="Delete goal"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[goal.category]}`}>
          {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
        </span>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[goal.status]}`}>
          {goal.status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </span>
        <span className="text-sm text-gray-500">
          Due: {formatDate(goal.deadline)}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-[var(--wise-orange)]">{Math.round(goal.progress)}%</span>
        </div>
        <ProgressBar value={goal.progress} size="md" showLabel={false} />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-700">Milestones</h4>
          {onAddMilestone && (
            <button
              onClick={() => onAddMilestone(goal.id)}
              className="inline-flex items-center text-sm text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)]"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Milestone
            </button>
          )}
        </div>
        <div className="space-y-2">
          {goal.milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md">
              <input
                type="checkbox"
                checked={milestone.completed}
                onChange={() => onToggleMilestone?.(goal.id, milestone.id)}
                className="h-4 w-4 text-[var(--wise-orange)] focus:ring-[var(--wise-orange)] border-gray-300 rounded"
              />
              <div className="flex-1">
                <span className={`text-sm ${milestone.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                  {milestone.title}
                </span>
                <span className="block text-xs text-gray-500">
                  Due: {formatDate(milestone.deadline)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {goal.feedback && goal.feedback.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Feedback</h4>
          <div className="space-y-2">
            {goal.feedback.map((feedback) => (
              <div key={feedback.id} className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">{feedback.content}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {formatDate(feedback.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {onAddFeedback && (
        <button
          onClick={() => onAddFeedback(goal.id)}
          className="w-full inline-flex items-center justify-center text-sm text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)] py-2 border border-[var(--wise-orange)] rounded-md hover:bg-[var(--wise-orange-light)] transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Feedback
        </button>
      )}
    </div>
  );
};

export default GoalCard; 