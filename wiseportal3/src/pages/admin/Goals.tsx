import React, { useState } from 'react';
import { PlusIcon, ChartBarIcon, CogIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import GoalCard from '../../components/goals/GoalCard';
import GoalForm from '../../components/goals/GoalForm';

interface Student {
  id: string;
  name: string;
  program: string;
  ssa: string;
  goals: Goal[];
}

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

const AdminGoals: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      program: 'Computer Science',
      ssa: 'SSA Johnson',
      goals: [
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
      ],
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<string>('1');
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleCreateGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'lastUpdated'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    setStudents(students.map(student =>
      student.id === selectedStudent
        ? { ...student, goals: [...student.goals, newGoal] }
        : student
    ));
    setShowForm(false);
  };

  const handleUpdateGoal = (goalData: Goal) => {
    setStudents(students.map(student =>
      student.id === selectedStudent
        ? {
            ...student,
            goals: student.goals.map(goal =>
              goal.id === goalData.id
                ? { ...goalData, lastUpdated: new Date().toISOString() }
                : goal
            ),
          }
        : student
    ));
    setEditingGoal(null);
  };

  const handleDeleteGoal = (id: string) => {
    setStudents(students.map(student =>
      student.id === selectedStudent
        ? { ...student, goals: student.goals.filter(goal => goal.id !== id) }
        : student
    ));
  };

  const handleAddMilestone = (goalId: string, milestone: Goal['milestones'][0]) => {
    setStudents(students.map(student =>
      student.id === selectedStudent
        ? {
            ...student,
            goals: student.goals.map(goal =>
              goal.id === goalId
                ? { ...goal, milestones: [...goal.milestones, milestone] }
                : goal
            ),
          }
        : student
    ));
  };

  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    setStudents(students.map(student =>
      student.id === selectedStudent
        ? {
            ...student,
            goals: student.goals.map(goal =>
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
            ),
          }
        : student
    ));
  };

  const handleAddFeedback = (goalId: string, feedback: Goal['feedback'][0]) => {
    setStudents(students.map(student =>
      student.id === selectedStudent
        ? {
            ...student,
            goals: student.goals.map(goal =>
              goal.id === goalId
                ? { ...goal, feedback: [...goal.feedback, feedback] }
                : goal
            ),
          }
        : student
    ));
  };

  const calculateProgress = (milestones: Goal['milestones']) => {
    const completed = milestones.filter(m => m.completed).length;
    return Math.round((completed / milestones.length) * 100);
  };

  const currentStudent = students.find(student => student.id === selectedStudent);
  const filteredGoals = currentStudent?.goals.filter(goal =>
    selectedCategories.length === 0 || selectedCategories.includes(goal.category)
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">System Goals</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor system-wide goal progress
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="btn-secondary flex items-center"
            >
              <CogIcon className="h-5 w-5 mr-2" />
              System Settings
            </button>
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="btn-secondary flex items-center"
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              System Analytics
            </button>
            <button
              onClick={() => {
                setEditingGoal(null);
                setShowForm(true);
              }}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Goal
            </button>
          </div>
        </div>
      </div>

      {/* Student Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <UserGroupIcon className="h-5 w-5 text-gray-400" />
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="block w-full md:w-64 rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
          >
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} - {student.program} ({student.ssa})
              </option>
            ))}
          </select>
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

      {/* System Analytics */}
      {showAnalytics && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Total Students</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {students.length}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Total Goals</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {students.reduce((acc, student) => acc + student.goals.length, 0)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Average Progress</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {Math.round(students.reduce((acc, student) => 
                  acc + student.goals.reduce((acc, goal) => acc + goal.progress, 0) / student.goals.length, 0
                ) / students.length)}%
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Completed Goals</h4>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {students.reduce((acc, student) => 
                  acc + student.goals.filter(goal => goal.status === 'completed').length, 0
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* System Settings */}
      {showSettings && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Default Goal Categories</label>
              <div className="mt-2 space-y-2">
                {['academic', 'career', 'personal'].map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-[var(--wise-orange)] focus:ring-[var(--wise-orange)] border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Goal Status Options</label>
              <div className="mt-2 space-y-2">
                {['not_started', 'in_progress', 'completed'].map((status) => (
                  <div key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-[var(--wise-orange)] focus:ring-[var(--wise-orange)] border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
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
              Start by creating a goal for this student
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

export default AdminGoals; 