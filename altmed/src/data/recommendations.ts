export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'physical' | 'mental' | 'emotional' | 'spiritual';
  urgency: 'immediate' | 'weekly' | 'long-term';
  type: 'ritual' | 'supplement' | 'food' | 'breathing' | 'meditation' | 'practitioner' | 'exercise' | 'diet' | 'therapy' | 'ai-generated';
  benefits: string[];
  image?: string;
  duration?: string;
  frequency?: string;
  cost: 'free' | 'low' | 'medium' | 'high';
  aiGenerated?: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string[];
  instructions?: string[];
}

export const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Morning Sun Salutation',
    description: 'Start your day with 5 minutes of gentle sun salutations to awaken your body and mind.',
    category: 'physical',
    urgency: 'immediate',
    type: 'exercise',
    benefits: ['Increases energy', 'Improves circulation', 'Reduces stiffness'],
    duration: '5 minutes',
    frequency: 'Daily',
    cost: 'free',
    difficulty: 'beginner',
    equipment: ['Yoga mat (optional)'],
    instructions: [
      'Stand in mountain pose with feet together',
      'Raise arms overhead and arch back slightly',
      'Fold forward from hips, reaching toward toes',
      'Step back into plank pose',
      'Lower to ground and lift chest (cobra)',
      'Return to plank and step forward',
      'Fold forward again, then rise with arms overhead'
    ]
  },
  {
    id: '2',
    title: 'Anti-Inflammatory Diet Protocol',
    description: 'AI-generated personalized diet plan focusing on reducing inflammation and supporting immune function.',
    category: 'physical',
    urgency: 'immediate',
    type: 'diet',
    benefits: ['Reduces inflammation', 'Boosts immunity', 'Improves energy'],
    frequency: 'Daily',
    cost: 'free',
    aiGenerated: true,
    difficulty: 'beginner',
    instructions: [
      'Eliminate processed foods and refined sugars',
      'Increase omega-3 rich foods (salmon, walnuts, flaxseeds)',
      'Add turmeric, ginger, and garlic to meals',
      'Include colorful vegetables and fruits',
      'Stay hydrated with filtered water',
      'Consider intermittent fasting (16:8 protocol)'
    ]
  },
  {
    id: '3',
    title: '4-7-8 Breathing Exercise',
    description: 'A simple breathing technique to calm your nervous system and reduce stress.',
    category: 'mental',
    urgency: 'immediate',
    type: 'breathing',
    benefits: ['Reduces stress', 'Improves focus', 'Better sleep'],
    duration: '2 minutes',
    frequency: '3x daily',
    cost: 'free',
    difficulty: 'beginner',
    instructions: [
      'Sit comfortably with back straight',
      'Place tip of tongue behind upper front teeth',
      'Inhale quietly through nose for 4 counts',
      'Hold breath for 7 counts',
      'Exhale completely through mouth for 8 counts',
      'Repeat cycle 4 times'
    ]
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'AI-recommended therapy technique to systematically relax muscle groups and reduce tension.',
    category: 'mental',
    urgency: 'weekly',
    type: 'therapy',
    benefits: ['Reduces muscle tension', 'Improves sleep', 'Reduces anxiety'],
    duration: '15 minutes',
    frequency: 'Daily',
    cost: 'free',
    aiGenerated: true,
    difficulty: 'beginner',
    instructions: [
      'Find a quiet, comfortable place to sit or lie down',
      'Start with your toes - tense them for 5 seconds',
      'Release and feel the relaxation for 10 seconds',
      'Move up to calves, thighs, abdomen, chest, arms, hands, neck, face',
      'Focus on the contrast between tension and relaxation',
      'End with deep breathing for 2 minutes'
    ]
  },
  {
    id: '5',
    title: 'Mindful Walking Meditation',
    description: 'Practice mindfulness while walking in nature for 15 minutes.',
    category: 'spiritual',
    urgency: 'weekly',
    type: 'meditation',
    benefits: ['Reduces stress', 'Improves mood', 'Connects with nature'],
    duration: '15 minutes',
    frequency: '3x weekly',
    cost: 'free',
    difficulty: 'beginner',
    equipment: ['Comfortable walking shoes'],
    instructions: [
      'Choose a safe, quiet path in nature',
      'Walk at a slower, deliberate pace',
      'Focus on the sensation of your feet touching the ground',
      'Notice the rhythm of your breath',
      'Observe sights, sounds, and smells without judgment',
      'If mind wanders, gently return to walking sensations'
    ]
  },
  {
    id: '6',
    title: 'Gut Health Protocol',
    description: 'AI-generated protocol to improve gut microbiome and overall health.',
    category: 'physical',
    urgency: 'long-term',
    type: 'diet',
    benefits: ['Improves gut health', 'Boosts immunity', 'Better digestion'],
    frequency: 'Daily',
    cost: 'free',
    aiGenerated: true,
    difficulty: 'intermediate',
    instructions: [
      'Include fermented foods daily (kimchi, sauerkraut, kefir)',
      'Eat prebiotic foods (garlic, onions, asparagus, bananas)',
      'Avoid artificial sweeteners and processed foods',
      'Include bone broth or collagen-rich foods',
      'Practice stress reduction techniques',
      'Get adequate sleep (7-9 hours)'
    ]
  },
  {
    id: '7',
    title: 'Gratitude Journaling',
    description: 'Write down 3 things you\'re grateful for each evening.',
    category: 'emotional',
    urgency: 'weekly',
    type: 'therapy',
    benefits: ['Improves mood', 'Reduces stress', 'Better sleep'],
    duration: '5 minutes',
    frequency: 'Daily',
    cost: 'free',
    difficulty: 'beginner',
    equipment: ['Journal or notebook'],
    instructions: [
      'Set aside 5 minutes each evening',
      'Write down 3 specific things you\'re grateful for',
      'Include why you\'re grateful for each item',
      'Reflect on how these things made you feel',
      'Consider sharing gratitude with others'
    ]
  },
  {
    id: '8',
    title: 'Cold Exposure Therapy',
    description: 'AI-recommended cold therapy to boost immune function and reduce inflammation.',
    category: 'physical',
    urgency: 'long-term',
    type: 'therapy',
    benefits: ['Boosts immunity', 'Reduces inflammation', 'Improves circulation'],
    duration: '2-3 minutes',
    frequency: '3x weekly',
    cost: 'free',
    aiGenerated: true,
    difficulty: 'intermediate',
    equipment: ['Cold shower or ice bath'],
    instructions: [
      'Start with 30 seconds of cold water at end of shower',
      'Gradually increase to 2-3 minutes',
      'Focus on controlled breathing during exposure',
      'Build up tolerance over several weeks',
      'Listen to your body and don\'t overdo it'
    ]
  },
  {
    id: '9',
    title: 'Sleep Optimization Protocol',
    description: 'AI-generated sleep hygiene protocol for better rest and recovery.',
    category: 'physical',
    urgency: 'immediate',
    type: 'therapy',
    benefits: ['Better sleep quality', 'Improved recovery', 'Enhanced mood'],
    frequency: 'Daily',
    cost: 'free',
    aiGenerated: true,
    difficulty: 'beginner',
    instructions: [
      'Maintain consistent sleep schedule (same bedtime/wake time)',
      'Create dark, cool, quiet sleep environment',
      'Avoid screens 1 hour before bed',
      'Practice relaxation techniques before sleep',
      'Avoid caffeine after 2 PM',
      'Get morning sunlight exposure'
    ]
  },
  {
    id: '10',
    title: 'Intermittent Fasting Protocol',
    description: 'AI-recommended fasting schedule to support cellular repair and metabolic health.',
    category: 'physical',
    urgency: 'long-term',
    type: 'diet',
    benefits: ['Cellular repair', 'Improved metabolism', 'Reduced inflammation'],
    frequency: 'Daily',
    cost: 'free',
    aiGenerated: true,
    difficulty: 'intermediate',
    instructions: [
      'Start with 12:12 fasting (12 hours eating, 12 hours fasting)',
      'Gradually increase to 16:8 protocol',
      'Eat during 8-hour window (e.g., 10 AM - 6 PM)',
      'Stay hydrated during fasting periods',
      'Listen to your body and adjust as needed',
      'Consult healthcare provider if you have medical conditions'
    ]
  }
];

export const getRecommendationsByCategory = (category: string) => {
  return recommendations.filter(rec => rec.category === category);
};

export const getRecommendationsByUrgency = (urgency: string) => {
  return recommendations.filter(rec => rec.urgency === urgency);
};

export const getFreeRecommendations = () => {
  return recommendations.filter(rec => rec.cost === 'free');
};

export const getAIRecommendations = () => {
  return recommendations.filter(rec => rec.aiGenerated === true);
};

export const getRecommendationsByDifficulty = (difficulty: string) => {
  return recommendations.filter(rec => rec.difficulty === difficulty);
}; 