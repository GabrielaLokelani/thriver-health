import { UserProfile, WellnessEntry, storage } from './storage';

export const demoUserProfile: UserProfile = {
  id: 'demo-user-123',
  name: 'Sarah Johnson',
  age: 32,
  sex: 'Female',
  location: 'San Francisco, CA',
  photo: '',
  energyLevel: 7,
  sleepQuality: 6,
  stressLevel: 4,
  mentalClarity: 8,
  lifestyle: {
    diet: 'Mostly plant-based with occasional fish, trying to eat more whole foods',
    movement: 'Yoga 3x/week, walking daily, occasional strength training',
    digitalUsage: 'Moderate - 4-6 hours daily, trying to reduce screen time before bed'
  },
  primaryIssues: ['Anxiety', 'Sleep', 'Focus'],
  customNotes: 'Looking to improve overall wellness and find natural ways to manage stress and sleep better.',
  goals: {
    shortTerm: ['Better sleep', 'Less stress', 'More energy'],
    longTerm: 'Achieve sustainable wellness routine that supports my busy lifestyle and helps me feel more balanced and energized daily.'
  },
  beliefs: {
    alignment: 'both',
    modalities: ['Ayurveda', 'Meditation', 'Yoga', 'Herbalism']
  },
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  updatedAt: new Date().toISOString()
};

export const demoWellnessEntries: WellnessEntry[] = [
  {
    id: 'entry-1',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 days ago
    mood: 8,
    energy: 7,
    sleep: 6,
    stress: 5,
    notes: 'Great day! Started the morning with sun salutations and felt energized throughout. Had a productive work day and managed to get some yoga in.',
    ritualsCompleted: ['Morning Sun Salutation', '4-7-8 Breathing', 'Yoga']
  },
  {
    id: 'entry-2',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
    mood: 6,
    energy: 5,
    sleep: 5,
    stress: 7,
    notes: 'Stressful day at work, but managed to stay calm with breathing exercises. Sleep was okay but could be better.',
    ritualsCompleted: ['4-7-8 Breathing', 'Lavender Tea']
  },
  {
    id: 'entry-3',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days ago
    mood: 9,
    energy: 8,
    sleep: 7,
    stress: 3,
    notes: 'Amazing day! Woke up feeling refreshed, had a great workout, and felt very productive. Evening meditation really helped.',
    ritualsCompleted: ['Morning Sun Salutation', 'Mindful Walking', 'Evening Meditation']
  },
  {
    id: 'entry-4',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
    mood: 7,
    energy: 6,
    sleep: 6,
    stress: 4,
    notes: 'Good day overall. Tried the golden milk recipe and it was delicious! Helped me relax before bed.',
    ritualsCompleted: ['Golden Milk', 'Gratitude Journal']
  },
  {
    id: 'entry-5',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
    mood: 8,
    energy: 7,
    sleep: 8,
    stress: 3,
    notes: 'Excellent sleep last night! Felt very focused and energized today. The morning routine is really working.',
    ritualsCompleted: ['Morning Sun Salutation', '4-7-8 Breathing', 'Lavender Tea']
  },
  {
    id: 'entry-6',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 day ago
    mood: 7,
    energy: 6,
    sleep: 5,
    stress: 6,
    notes: 'Busy day but managed to stay balanced. Evening walk in nature was very grounding.',
    ritualsCompleted: ['Mindful Walking', 'Evening Meditation']
  },
  {
    id: 'entry-7',
    date: new Date().toISOString().split('T')[0], // Today
    mood: 8,
    energy: 7,
    sleep: 7,
    stress: 4,
    notes: 'Feeling great today! The wellness routine is really paying off. Looking forward to continuing this journey.',
    ritualsCompleted: ['Morning Sun Salutation', 'Gratitude Journal']
  }
];

export const demoSavedRecommendations = ['1', '2', '3', '5', '7']; // IDs of saved recommendations

export const loadDemoData = () => {
  try {
    console.log('Starting to load demo data...');
    
    // Save demo user profile
    storage.saveUserProfile(demoUserProfile);
    console.log('Demo user profile saved');
    
    // Save demo wellness entries
    demoWellnessEntries.forEach(entry => {
      storage.saveWellnessEntry(entry);
    });
    console.log('Demo wellness entries saved');
    
    // Save demo recommendations
    demoSavedRecommendations.forEach(recId => {
      storage.saveRecommendation(recId);
    });
    console.log('Demo recommendations saved');
    
    // Save demo settings
    storage.saveUserSettings({
      soundEnabled: true,
      animationsEnabled: true,
      dashboardLayout: 'grid',
      theme: 'light'
    });
    console.log('Demo settings saved');
    
    // Mark as demo user for special features
    localStorage.setItem('altmed_demo_mode', 'true');
    console.log('Demo mode flag set');
    
    console.log('Demo data loaded successfully!');
  } catch (error) {
    console.error('Error in loadDemoData:', error);
    throw error;
  }
}; 