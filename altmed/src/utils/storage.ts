export interface MetricDataEntry {
  id: string;
  metricName: string;
  value: number | string;
  unit: string;
  date: string; // ISO date string
  notes?: string;
  tags?: string[]; // Optional tags for context
}

export interface UserProfile {
  id: string;
  name: string;
  dateOfBirth: string; // Changed from age to dateOfBirth (YYYY-MM-DD format)
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
  diagnosis: {
    condition: string;        // Main diagnosis (e.g., "Prostate Cancer")
    customCondition?: string; // Custom input if "Other" is selected
    symptoms: string[];       // List of symptoms to address
    diagnosisDate?: string;   // When diagnosed (optional)
  };
  medications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];                        // List of current medications
  treatments: {
    name: string;
    type: string;             // e.g., "Supplement", "Therapy", "Protocol"
    dosage?: string;          // Optional for therapies that don't have dosage
    frequency: string;
  }[];                        // List of alternative treatments
  conventionalTreatments: {
    name: string;
    type: string;             // e.g., "Surgery", "Chemotherapy", "Radiation"
    date?: string;            // When performed/started
    status: string;           // e.g., "Completed", "Ongoing", "Scheduled"
    notes?: string;           // Additional details
  }[];                        // List of conventional medical treatments
  trackingMetrics: {
    name: string;             // Metric name (e.g., "PSA Level", "Blood Sugar")
    unit: string;             // Unit of measurement (e.g., "ng/mL", "mg/dL")
    targetRange?: string;     // Optional target range (e.g., "< 4.0", "70-130")
    frequency: string;        // How often to track (e.g., "Daily", "Weekly", "Monthly")
    category: string;         // "Health Marker", "Wellness", "Activity", "Custom"
  }[];                        // Custom metrics user wants to track
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

// Helper function to calculate age from date of birth
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

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

  // Metric Data Management
  saveMetricData: (entry: MetricDataEntry): void => {
    try {
      const existingData = storage.getMetricData();
      const updatedData = [...existingData, entry];
      localStorage.setItem('altmed_metric_data', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving metric data:', error);
    }
  },

  getMetricData: (): MetricDataEntry[] => {
    try {
      const data = localStorage.getItem('altmed_metric_data');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting metric data:', error);
      return [];
    }
  },

  getMetricDataByName: (metricName: string): MetricDataEntry[] => {
    try {
      const allData = storage.getMetricData();
      return allData.filter(entry => entry.metricName === metricName);
    } catch (error) {
      console.error('Error getting metric data by name:', error);
      return [];
    }
  },

  updateMetricData: (id: string, updatedEntry: Partial<MetricDataEntry>): void => {
    try {
      const existingData = storage.getMetricData();
      const updatedData = existingData.map(entry => 
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      );
      localStorage.setItem('altmed_metric_data', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error updating metric data:', error);
    }
  },

  deleteMetricData: (id: string): void => {
    try {
      const existingData = storage.getMetricData();
      const updatedData = existingData.filter(entry => entry.id !== id);
      localStorage.setItem('altmed_metric_data', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error deleting metric data:', error);
    }
  },

  clearMetricData: (): void => {
    try {
      localStorage.removeItem('altmed_metric_data');
    } catch (error) {
      console.error('Error clearing metric data:', error);
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