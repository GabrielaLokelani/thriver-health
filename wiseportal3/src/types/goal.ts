export type GoalCategory = 'academic' | 'career' | 'personal' | 'professional';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  deadline: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  userId: string;
  createdAt: string;
  updatedAt: string;
  milestones: Milestone[];
  feedback?: Feedback[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  completedAt?: string;
}

export interface Feedback {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface GoalSuggestion {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  basedOn: string[];
  relevance: number;
} 