// API Service Layer for AWS Backend Integration
import { UserProfile, WellnessEntry, MetricDataEntry } from '../utils/storage';

// This will be replaced with actual AWS Amplify API calls after setup
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // Add auth token here after Cognito setup
        // 'Authorization': `Bearer ${await getAuthToken()}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// User Profile API
export const profileAPI = {
  // Create new user profile
  async create(profile: UserProfile): Promise<UserProfile> {
    return apiCall('/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  },

  // Get user profile by ID
  async get(userId: string): Promise<UserProfile> {
    return apiCall(`/profile/${userId}`, {
      method: 'GET',
    });
  },

  // Update user profile
  async update(userId: string, profile: Partial<UserProfile>): Promise<UserProfile> {
    return apiCall(`/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  },

  // Delete user profile
  async delete(userId: string): Promise<void> {
    return apiCall(`/profile/${userId}`, {
      method: 'DELETE',
    });
  },
};

// Wellness Entries API
export const wellnessAPI = {
  // Create wellness entry
  async create(entry: WellnessEntry): Promise<WellnessEntry> {
    return apiCall('/wellness', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  },

  // Get all wellness entries for a user
  async getAll(userId: string): Promise<WellnessEntry[]> {
    return apiCall(`/wellness/${userId}`, {
      method: 'GET',
    });
  },

  // Get specific wellness entry
  async get(userId: string, date: string): Promise<WellnessEntry> {
    return apiCall(`/wellness/${userId}/${date}`, {
      method: 'GET',
    });
  },

  // Update wellness entry
  async update(entryId: string, entry: Partial<WellnessEntry>): Promise<WellnessEntry> {
    return apiCall(`/wellness/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
    });
  },

  // Delete wellness entry
  async delete(entryId: string): Promise<void> {
    return apiCall(`/wellness/${entryId}`, {
      method: 'DELETE',
    });
  },
};

// Metrics Data API
export const metricsAPI = {
  // Save new metric data
  async create(data: MetricDataEntry): Promise<MetricDataEntry> {
    return apiCall('/metrics', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get all metric data for a user
  async getAll(userId: string): Promise<MetricDataEntry[]> {
    return apiCall(`/metrics/${userId}`, {
      method: 'GET',
    });
  },

  // Get metric data by metric name
  async getByName(userId: string, metricName: string): Promise<MetricDataEntry[]> {
    return apiCall(`/metrics/${userId}/${metricName}`, {
      method: 'GET',
    });
  },

  // Update metric data
  async update(dataId: string, data: Partial<MetricDataEntry>): Promise<MetricDataEntry> {
    return apiCall(`/metrics/${dataId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete metric data
  async delete(dataId: string): Promise<void> {
    return apiCall(`/metrics/${dataId}`, {
      method: 'DELETE',
    });
  },
};

// Journal/Onboarding Entry API
export const journalAPI = {
  // Create journal entry (onboarding story)
  async create(userId: string, entry: string): Promise<{ id: string; userId: string; entry: string; createdAt: string }> {
    return apiCall('/journal', {
      method: 'POST',
      body: JSON.stringify({ userId, entry }),
    });
  },

  // Get all journal entries for a user
  async getAll(userId: string): Promise<any[]> {
    return apiCall(`/journal/${userId}`, {
      method: 'GET',
    });
  },

  // Process journal entry with AI
  async processWithAI(entry: string): Promise<any> {
    return apiCall('/journal/process', {
      method: 'POST',
      body: JSON.stringify({ entry }),
    });
  },
};

// AI Chat API
export const aiChatAPI = {
  // Send message to AI agent
  async sendMessage(userId: string, message: string, context?: any): Promise<{ response: string; relatedContent?: any }> {
    return apiCall('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ userId, message, context }),
    });
  },

  // Get chat history
  async getHistory(userId: string): Promise<any[]> {
    return apiCall(`/ai/chat/${userId}`, {
      method: 'GET',
    });
  },
};

// Demo mode helper - returns mock data when backend is not available
export const isDemoMode = () => {
  return localStorage.getItem('altmed_demo_mode') === 'true' || !process.env.REACT_APP_API_URL;
};

// Fallback to localStorage when in demo mode
export function getFallbackAPI() {
  return {
    profileAPI: {
      get: async () => JSON.parse(localStorage.getItem('altmed_user_profile') || 'null'),
      create: async (profile: UserProfile) => {
        localStorage.setItem('altmed_user_profile', JSON.stringify(profile));
        return profile;
      },
      update: async (userId: string, profile: Partial<UserProfile>) => {
        const existing = JSON.parse(localStorage.getItem('altmed_user_profile') || '{}');
        const updated = { ...existing, ...profile };
        localStorage.setItem('altmed_user_profile', JSON.stringify(updated));
        return updated;
      },
    },
    wellnessAPI: {
      getAll: async () => JSON.parse(localStorage.getItem('altmed_wellness_entries') || '[]'),
      create: async (entry: WellnessEntry) => {
        const entries = JSON.parse(localStorage.getItem('altmed_wellness_entries') || '[]');
        entries.push(entry);
        localStorage.setItem('altmed_wellness_entries', JSON.stringify(entries));
        return entry;
      },
    },
    metricsAPI: {
      getAll: async () => JSON.parse(localStorage.getItem('altmed_metric_data') || '[]'),
      create: async (data: MetricDataEntry) => {
        const entries = JSON.parse(localStorage.getItem('altmed_metric_data') || '[]');
        entries.push(data);
        localStorage.setItem('altmed_metric_data', JSON.stringify(entries));
        return data;
      },
      getByName: async (userId: string, metricName: string) => {
        const entries = JSON.parse(localStorage.getItem('altmed_metric_data') || '[]');
        return entries.filter((e: MetricDataEntry) => e.metricName === metricName);
      },
    },
  };
}

