export interface WellnessArea {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  goals: {
    text: string;
    completed: boolean;
  }[];
  tips: string[];
  resources: {
    title: string;
    description: string;
    type: 'guide' | 'workshop' | 'challenge' | 'checklist' | 'tools';
    url: string;
    completed: boolean;
  }[];
  milestones: {
    title: string;
    description: string;
    badge: string;
    completed: boolean;
  }[];
  dailyChallenge?: {
    text: string;
    points: number;
  };
}

export const wellnessAreas: WellnessArea[] = [
  {
    id: 'physical',
    name: 'Physical Wellness',
    emoji: '💪',
    color: 'bg-blue-50',
    description: 'Focus on maintaining a healthy body through regular exercise, proper nutrition, and adequate rest.',
    goals: [
      { text: 'Exercise for 30 minutes daily', completed: false },
      { text: 'Get 7-8 hours of sleep each night', completed: false },
      { text: 'Eat 5 servings of fruits and vegetables daily', completed: false }
    ],
    tips: [
      'Start with small, achievable goals',
      'Find activities you enjoy',
      'Stay hydrated throughout the day',
      'Take regular breaks from sitting'
    ],
    resources: [
      {
        title: 'Fitness Guide',
        description: 'A comprehensive guide to starting your fitness journey',
        type: 'guide',
        url: '/resources/fitness-guide',
        completed: false
      },
      {
        title: 'Nutrition Workshop',
        description: 'Learn about balanced nutrition and meal planning',
        type: 'workshop',
        url: '/resources/nutrition-workshop',
        completed: false
      }
    ],
    milestones: [
      {
        title: 'Fitness Beginner',
        description: 'Complete your first week of regular exercise',
        badge: '🏃‍♂️',
        completed: false
      },
      {
        title: 'Health Champion',
        description: 'Maintain healthy habits for 30 days',
        badge: '🏆',
        completed: false
      }
    ],
    dailyChallenge: {
      text: 'Take a 15-minute walk during your lunch break',
      points: 10
    }
  },
  {
    id: 'mental',
    name: 'Mental Wellness',
    emoji: '🧠',
    color: 'bg-purple-50',
    description: 'Develop strategies to manage stress, build resilience, and maintain a positive mindset.',
    goals: [
      { text: 'Practice mindfulness for 10 minutes daily', completed: false },
      { text: 'Learn a new stress management technique', completed: false },
      { text: 'Keep a gratitude journal', completed: false }
    ],
    tips: [
      'Take regular mental breaks',
      'Practice deep breathing exercises',
      'Set realistic expectations',
      'Seek support when needed'
    ],
    resources: [
      {
        title: 'Mindfulness Guide',
        description: 'Introduction to mindfulness and meditation practices',
        type: 'guide',
        url: '/resources/mindfulness-guide',
        completed: false
      },
      {
        title: 'Stress Management Workshop',
        description: 'Learn effective stress management techniques',
        type: 'workshop',
        url: '/resources/stress-workshop',
        completed: false
      }
    ],
    milestones: [
      {
        title: 'Mindful Beginner',
        description: 'Complete 7 days of mindfulness practice',
        badge: '🧘‍♀️',
        completed: false
      },
      {
        title: 'Stress Master',
        description: 'Successfully implement 3 stress management techniques',
        badge: '🌟',
        completed: false
      }
    ],
    dailyChallenge: {
      text: 'Practice 5 minutes of deep breathing exercises',
      points: 10
    }
  },
  {
    id: 'social',
    name: 'Social Wellness',
    emoji: '🤝',
    color: 'bg-green-50',
    description: 'Build and maintain healthy relationships, develop communication skills, and create a support network.',
    goals: [
      { text: 'Connect with a friend or family member daily', completed: false },
      { text: 'Join a new social group or club', completed: false },
      { text: 'Practice active listening in conversations', completed: false }
    ],
    tips: [
      'Be present in conversations',
      'Show appreciation for others',
      'Set healthy boundaries',
      'Be open to new connections'
    ],
    resources: [
      {
        title: 'Communication Skills Guide',
        description: 'Improve your communication and relationship-building skills',
        type: 'guide',
        url: '/resources/communication-guide',
        completed: false
      },
      {
        title: 'Social Skills Workshop',
        description: 'Develop confidence in social situations',
        type: 'workshop',
        url: '/resources/social-workshop',
        completed: false
      }
    ],
    milestones: [
      {
        title: 'Social Butterfly',
        description: 'Make 3 new meaningful connections',
        badge: '🦋',
        completed: false
      },
      {
        title: 'Community Builder',
        description: 'Organize or participate in a group activity',
        badge: '👥',
        completed: false
      }
    ],
    dailyChallenge: {
      text: 'Reach out to someone you haven\'t spoken to in a while',
      points: 10
    }
  },
  {
    id: 'emotional',
    name: 'Emotional Wellness',
    emoji: '😊',
    color: 'bg-pink-50',
    description: 'Develop emotional awareness, build resilience, and practice self-compassion.',
    goals: [
      { text: 'Practice emotional awareness daily', completed: false },
      { text: 'Develop healthy coping strategies', completed: false },
      { text: 'Express gratitude regularly', completed: false }
    ],
    tips: [
      'Keep a feelings journal',
      'Practice self-compassion',
      'Identify emotional triggers',
      'Seek professional help when needed'
    ],
    resources: [
      {
        title: 'Emotional Intelligence Guide',
        description: 'Learn about emotional awareness and regulation',
        type: 'guide',
        url: '/resources/emotional-intelligence-guide',
        completed: false
      },
      {
        title: 'Resilience Building Workshop',
        description: 'Develop strategies to build emotional resilience',
        type: 'workshop',
        url: '/resources/resilience-workshop',
        completed: false
      }
    ],
    milestones: [
      {
        title: 'Emotional Explorer',
        description: 'Identify and name 5 different emotions',
        badge: '🔍',
        completed: false
      },
      {
        title: 'Resilience Builder',
        description: 'Successfully navigate a challenging situation',
        badge: '💪',
        completed: false
      }
    ],
    dailyChallenge: {
      text: 'Write down three things you\'re grateful for',
      points: 10
    }
  },
  {
    id: 'environmental',
    name: 'Environmental Wellness',
    emoji: '🌱',
    color: 'bg-green-50',
    description: 'Create a sustainable living space and develop eco-friendly habits.',
    goals: [
      { text: 'Reduce personal environmental impact', completed: false },
      { text: 'Create a sustainable living space', completed: false },
      { text: 'Learn about environmental issues', completed: false }
    ],
    tips: [
      'Start small with recycling',
      'Reduce energy consumption',
      'Spend time outdoors',
      'Support local environmental initiatives'
    ],
    resources: [
      {
        title: 'Sustainable Living Guide',
        description: 'Tips for reducing your environmental footprint',
        type: 'guide',
        url: '/resources/sustainable-living-guide',
        completed: false
      },
      {
        title: 'Nature Connection Challenge',
        description: '30-day challenge to connect with nature',
        type: 'challenge',
        url: '/resources/nature-challenge',
        completed: false
      }
    ],
    milestones: [
      {
        title: 'Eco-Conscious',
        description: 'Implement 3 sustainable practices',
        badge: '♻️',
        completed: false
      },
      {
        title: 'Green Champion',
        description: 'Complete the 30-day nature challenge',
        badge: '🌍',
        completed: false
      }
    ],
    dailyChallenge: {
      text: 'Spend 15 minutes in nature',
      points: 10
    }
  },
  {
    id: 'medical',
    name: 'Medical Wellness',
    emoji: '🏥',
    color: 'bg-purple-50',
    description: 'Take charge of your health through regular check-ups and preventive care.',
    goals: [
      { text: 'Schedule regular health check-ups', completed: false },
      { text: 'Maintain a health record', completed: false },
      { text: 'Learn about preventive care', completed: false }
    ],
    tips: [
      'Keep track of medical history',
      'Stay up to date with vaccinations',
      'Know your family health history',
      'Ask questions during doctor visits'
    ],
    resources: [
      {
        title: 'Health Record Guide',
        description: 'How to maintain and organize your health records',
        type: 'guide',
        url: '/resources/health-record-guide',
        completed: false
      },
      {
        title: 'Preventive Care Checklist',
        description: 'Comprehensive guide to preventive health measures',
        type: 'checklist',
        url: '/resources/preventive-care-checklist',
        completed: false
      }
    ],
    milestones: [
      {
        title: 'Health Advocate',
        description: 'Complete annual health check-up',
        badge: '🩺',
        completed: false
      },
      {
        title: 'Prevention Pro',
        description: 'Implement preventive care measures',
        badge: '✅',
        completed: false
      }
    ],
    dailyChallenge: {
      text: 'Review and update your health records',
      points: 10
    }
  },
  {
    id: 'financial',
    name: 'Financial Wellness',
    emoji: '💰',
    color: 'bg-yellow-50',
    description: 'Develop healthy financial habits and build long-term financial security.',
    goals: [
      { text: 'Create and maintain a budget', completed: false },
      { text: 'Build an emergency fund', completed: false },
      { text: 'Learn about investing basics', completed: false }
    ],
    tips: [
      'Track your spending habits',
      'Set realistic financial goals',
      'Review your budget regularly',
      'Seek financial advice when needed'
    ],
    resources: [
      {
        title: 'Budgeting Basics',
        description: 'Guide to creating and maintaining a budget',
        type: 'guide',
        url: '/resources/budgeting-basics',
        completed: false
      },
      {
        title: 'Financial Planning Tools',
        description: 'Tools and resources for financial planning',
        type: 'tools',
        url: '/resources/financial-tools',
        completed: false
      }
    ],
    milestones: [
      {
        title: 'Budget Builder',
        description: 'Create and maintain a budget for 30 days',
        badge: '📊',
        completed: false
      },
      {
        title: 'Financial Planner',
        description: 'Set up an emergency fund',
        badge: '💼',
        completed: false
      }
    ],
    dailyChallenge: {
      text: 'Review your daily spending',
      points: 10
    }
  },
  {
    id: 'spiritual',
    name: 'Spiritual Wellness',
    emoji: '✨',
    color: 'bg-indigo-50',
    description: 'Explore personal values, find meaning and purpose, and develop inner peace.',
    goals: [
      { text: 'Practice daily reflection', completed: false },
      { text: 'Explore personal values', completed: false },
      { text: 'Develop a meditation practice', completed: false }
    ],
    tips: [
      'Set aside time for quiet reflection',
      'Connect with a supportive community',
      'Practice gratitude',
      'Explore different spiritual practices'
    ],
    resources: [
      {
        title: 'Meditation Guide',
        description: 'Introduction to meditation and mindfulness',
        type: 'guide',
        url: '/resources/meditation-guide',
        completed: false
      },
      {
        title: 'Values Exploration Workshop',
        description: 'Discover and align with your core values',
        type: 'workshop',
        url: '/resources/values-workshop',
        completed: false
      }
    ],
    milestones: [
      {
        title: 'Mindful Beginner',
        description: 'Establish a daily meditation practice',
        badge: '🧘‍♂️',
        completed: false
      },
      {
        title: 'Spiritual Explorer',
        description: 'Identify and explore your core values',
        badge: '🌟',
        completed: false
      }
    ],
    dailyChallenge: {
      text: 'Spend 10 minutes in quiet reflection',
      points: 10
    }
  }
]; 