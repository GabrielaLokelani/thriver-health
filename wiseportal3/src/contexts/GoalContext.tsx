import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'career' | 'personal';
  deadline: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface GoalContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'progress' | 'status'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  getGoalById: (id: string) => Goal | undefined;
  getGoalsByCategory: (category: Goal['category']) => Goal[];
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load goals from localStorage on mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'progress' | 'status'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      progress: 0,
      status: 'not_started',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id
          ? { ...goal, ...updates, updatedAt: new Date().toISOString() }
          : goal
      )
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const getGoalById = (id: string) => {
    return goals.find(goal => goal.id === id);
  };

  const getGoalsByCategory = (category: Goal['category']) => {
    return goals.filter(goal => goal.category === category);
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        getGoalById,
        getGoalsByCategory,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}; 