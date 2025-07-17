import React, { useState } from 'react';
import { PlusIcon, BellIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import GoalCard from '../../components/goals/GoalCard';
import GoalForm from '../../components/goals/GoalForm';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'career' | 'personal';
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  dueDate: string;
  milestones: {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
  }[];
  feedback: {
    id: string;
    content: string;
    author: string;
    date: string;
  }[];
  createdAt: string;
  lastUpdated: string;
}

const StudentGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Computer Science Degree',
      description: 'Graduate with a Bachelor\'s degree in Computer Science',
      category: 'academic',
      status: 'in_progress',
      progress: 75,
      dueDate: '2025-05-15',
      milestones: [
        { id: '1', title: 'Complete Data Structures Course', completed: true, dueDate: '2024-03-15' },
        { id: '2', title: 'Finish Software Engineering Project', completed: true, dueDate: '2024-04-15' },
        { id: '3', title: 'Pass Final Exams', completed: false, dueDate: '2025-05-01' },
      ],
      feedback: [
        { id: '1', content: 'Great progress on your coursework!', author: 'SSA Johnson', date: '2024-03-10' },
      ],
      createdAt: '2023-09-01',
      lastUpdated: '2024-03-15',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCreateGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'lastUpdated'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    setGoals([...goals, newGoal]);
    setShowForm(false);
  };

  const handleUpdateGoal = (goalData: Goal) => {
    setGoals(goals.map(goal => 
      goal.id === goalData.id ? { ...goalData, lastUpdated: new Date().toISOString() } : goal
    ));
    setEditingGoal(null);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleAddMilestone = (goalId: string, milestone: Goal['milestones'][0]) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? { ...goal, milestones: [...goal.milestones, milestone] }
        : goal
    ));
  };

  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            milestones: goal.milestones.map(milestone =>
              milestone.id === milestoneId
                ? { ...milestone, completed: !milestone.completed }
                : milestone
            ),
            progress: calculateProgress(goal.milestones.map(m =>
              m.id === milestoneId ? { ...m, completed: !m.completed } : m
            )),
          }
        : goal
    ));
  };

  const handleAddFeedback = (goalId: string, feedback: Goal['feedback'][0]) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? { ...goal, feedback: [...goal.feedback, feedback] }
        : goal
    ));
  };

  const calculateProgress = (milestones: Goal['milestones']) => {
    const completed = milestones.filter(m => m.completed).length;
    return Math.round((completed / milestones.length) * 100);
  };

  const filteredGoals = goals.filter(goal =>
    selectedCategories.length === 0 || selectedCategories.includes(goal.category)
  );

  const suggestedGoals = [
    {
      title: 'Complete Internship Application',
      description: 'Apply for summer internship opportunities',
      category: 'career' as const,
    },
    {
      title: 'Improve Public Speaking Skills',
      description: 'Join Toastmasters or similar organization',
      category: 'personal' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Goals</h2>
            <p className="mt-1 text-sm text-gray-500">
              Track your academic, career, and personal development goals
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="btn-secondary flex items-center"
            >
              <LightBulbIcon className="h-5 w-5 mr-2" />
              View Suggestions
            </button>
            <button
              onClick={() => {
                setEditingGoal(null);
                setShowForm(true);
              }}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Goal
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {['academic', 'career', 'personal'].map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategories(prev =>
                  prev.includes(category)
                    ? prev.filter(c => c !== category)
                    : [...prev, category]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCategories.includes(category)
                  ? 'bg-[var(--wise-orange)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Suggestions */}
      {showSuggestions && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Suggested Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedGoals.map((goal, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">{goal.title}</h4>
                <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
                <button
                  onClick={() => {
                    setEditingGoal(null);
                    setShowForm(true);
                  }}
                  className="mt-2 text-sm text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)]"
                >
                  Add to My Goals
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredGoals.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--wise-orange-light)] mb-4">
              <PlusIcon className="h-8 w-8 text-[var(--wise-orange)]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No goals yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by creating your first goal
            </p>
            <button
              onClick={() => {
                setEditingGoal(null);
                setShowForm(true);
              }}
              className="mt-4 btn-primary"
            >
              Create First Goal
            </button>
          </div>
        ) : (
          filteredGoals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={() => {
                setEditingGoal(goal);
                setShowForm(true);
              }}
              onDelete={() => handleDeleteGoal(goal.id)}
              onAddMilestone={(milestone) => handleAddMilestone(goal.id, milestone)}
              onToggleMilestone={(milestoneId) => handleToggleMilestone(goal.id, milestoneId)}
              onAddFeedback={(feedback) => handleAddFeedback(goal.id, feedback)}
            />
          ))
        )}
      </div>

      {/* Goal Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
            <GoalForm
              initialData={editingGoal}
              onSubmit={editingGoal ? handleUpdateGoal : handleCreateGoal}
              onCancel={() => {
                setShowForm(false);
                setEditingGoal(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentGoals; 