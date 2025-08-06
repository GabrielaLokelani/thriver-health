export interface UserProfile {
  id: string;
  name: string;
  age: number;
  sex: string;
  location: string;
  photo?: string;
  energyLevel: number;
  sleepQuality: number;
  stressLevel: number;
  mentalClarity: number;
  lifestyle: {
    diet: string;
    movement: string;
    digitalUsage: string;
  };
  primaryIssues: string[];
  customNotes: string;
  goals: {
    shortTerm: string[];
    longTerm: string;
  };
  beliefs: {
    alignment: 'spiritual' | 'scientific' | 'both';
    modalities: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface WellnessEntry {
  id: string;
  date: string;
  mood: number;
  energy: number;
  sleep: number;
  stress: number;
  notes: string;
  ritualsCompleted: string[];
}

export interface UserSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  dashboardLayout: 'grid' | 'list';
  theme: 'light' | 'dark' | 'auto';
  notifications?: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  privacy?: {
    shareData: boolean;
    showProfile: boolean;
    allowAnalytics: boolean;
  };
}

const STORAGE_KEYS = {
  USER_PROFILE: 'altmed_user_profile',
  WELLNESS_ENTRIES: 'altmed_wellness_entries',
  USER_SETTINGS: 'altmed_user_settings',
  RECOMMENDATIONS: 'altmed_recommendations'
};

export const storage = {
  // User Profile
  getUserProfile: (): UserProfile | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading user profile from storage:', error);
      return null;
    }
  },

  saveUserProfile: (profile: UserProfile): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile to storage:', error);
    }
  },

  updateUserProfile: (updates: Partial<UserProfile>): void => {
    const current = storage.getUserProfile();
    if (current) {
      const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
      storage.saveUserProfile(updated);
    }
  },

  // Wellness Entries
  getWellnessEntries: (): WellnessEntry[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WELLNESS_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading wellness entries from storage:', error);
      return [];
    }
  },

  saveWellnessEntry: (entry: WellnessEntry): void => {
    try {
      const entries = storage.getWellnessEntries();
      const updatedEntries = [...entries, entry];
      localStorage.setItem(STORAGE_KEYS.WELLNESS_ENTRIES, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error saving wellness entry to storage:', error);
    }
  },

  updateWellnessEntry: (id: string, updates: Partial<WellnessEntry>): void => {
    try {
      const entries = storage.getWellnessEntries();
      const updatedEntries = entries.map(entry => 
        entry.id === id ? { ...entry, ...updates } : entry
      );
      localStorage.setItem(STORAGE_KEYS.WELLNESS_ENTRIES, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error updating wellness entry in storage:', error);
    }
  },

  // User Settings
  getUserSettings: (): UserSettings => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
      return data ? JSON.parse(data) : {
        soundEnabled: true,
        animationsEnabled: true,
        dashboardLayout: 'grid',
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          reminders: true
        },
        privacy: {
          shareData: true,
          showProfile: true,
          allowAnalytics: true
        }
      };
    } catch (error) {
      console.error('Error reading user settings from storage:', error);
      return {
        soundEnabled: true,
        animationsEnabled: true,
        dashboardLayout: 'grid',
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          reminders: true
        },
        privacy: {
          shareData: true,
          showProfile: true,
          allowAnalytics: true
        }
      };
    }
  },

  saveUserSettings: (settings: UserSettings): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving user settings to storage:', error);
    }
  },

  // Recommendations
  getSavedRecommendations: (): string[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading saved recommendations from storage:', error);
      return [];
    }
  },

  saveRecommendation: (recommendationId: string): void => {
    try {
      const saved = storage.getSavedRecommendations();
      if (!saved.includes(recommendationId)) {
        const updated = [...saved, recommendationId];
        localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error saving recommendation to storage:', error);
    }
  },

  removeRecommendation: (recommendationId: string): void => {
    try {
      const saved = storage.getSavedRecommendations();
      const updated = saved.filter(id => id !== recommendationId);
      localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing recommendation from storage:', error);
    }
  },

  // Clear all data
  clearAllData: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}; 