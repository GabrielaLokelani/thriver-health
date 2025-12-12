/**
 * Data Service Layer - Abstracts data access for easy backend integration
 * 
 * Currently uses localStorage, but can be easily swapped for API calls
 * when backend is ready. All components should use this service instead
 * of directly accessing storage.
 */

import { 
  UserProfile, 
  WellnessEntry, 
  MetricDataEntry, 
  UserSettings 
} from '../utils/storage';
import { storage } from '../utils/storage';
// Conditionally import Amplify service - only when backend is available
let backendService: any = null;

// Check if we should try to use backend
// This will be true after backend is deployed and amplify_outputs.json exists
const shouldUseBackend = () => {
  try {
    // Check if amplify_outputs.json exists (will be generated after backend deployment)
    require('../amplify_outputs.json');
    return true;
  } catch {
    return false;
  }
};

if (shouldUseBackend()) {
  try {
    // Try to load Amplify service - will only work if aws-amplify is installed
    const { AmplifyDataService } = require('./amplifyDataService');
    if (AmplifyDataService) {
      backendService = new AmplifyDataService();
    }
  } catch (error) {
    // Amplify not available - will use localStorage
    console.log('Amplify backend not available, using localStorage');
  }
}

// Check if backend is available
const USE_BACKEND = backendService !== null;

/**
 * User Profile Service
 */
export const profileService = {
  /**
   * Get current user profile
   */
  async get(): Promise<UserProfile | null> {
    if (USE_BACKEND && backendService) {
      try {
        const profile = await backendService.getUserProfile();
        if (profile) {
          return profile;
        }
        // If backend returns null, fall back to localStorage
        console.log('No profile found in backend, checking localStorage...');
        return storage.getUserProfile();
      } catch (error: any) {
        // If backend fails (e.g., user not authenticated), fall back to localStorage
        console.warn('Backend profile fetch failed, falling back to localStorage:', error.message);
        return storage.getUserProfile();
      }
    }
    return storage.getUserProfile();
  },

  /**
   * Save user profile
   */
  async save(profile: UserProfile): Promise<UserProfile> {
    if (USE_BACKEND && backendService) {
      try {
        return await backendService.saveUserProfile(profile);
      } catch (error: any) {
        // If user is not authenticated, fall back to localStorage
        if (error.message && error.message.includes('not authenticated')) {
          console.warn('User not authenticated, saving to localStorage instead');
          storage.saveUserProfile(profile);
          return profile;
        }
        throw error;
      }
    }
    storage.saveUserProfile(profile);
    return profile;
  },

  /**
   * Update user profile (partial update)
   */
  async update(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (USE_BACKEND && backendService) {
      const updated = await backendService.updateUserProfile(updates);
      if (!updated) {
        throw new Error('Profile not found');
      }
      return updated;
    }
    storage.updateUserProfile(updates);
    const updated = storage.getUserProfile();
    if (!updated) {
      throw new Error('Profile not found');
    }
    return updated;
  },
};

/**
 * Wellness Entries Service
 */
export const wellnessService = {
  /**
   * Get all wellness entries
   */
  async getAll(): Promise<WellnessEntry[]> {
    if (USE_BACKEND && backendService) {
      return await backendService.getWellnessEntries();
    }
    return storage.getWellnessEntries();
  },

  /**
   * Get wellness entries for a date range
   */
  async getByDateRange(startDate: string, endDate: string): Promise<WellnessEntry[]> {
    if (USE_BACKEND && backendService) {
      return await backendService.getWellnessEntries(startDate, endDate);
    }
    const entries = storage.getWellnessEntries();
    return entries.filter(entry => entry.date >= startDate && entry.date <= endDate);
  },

  /**
   * Create a new wellness entry
   */
  async create(entry: WellnessEntry): Promise<WellnessEntry> {
    if (USE_BACKEND && backendService) {
      try {
        return await backendService.saveWellnessEntry(entry);
      } catch (error: any) {
        // If user is not authenticated, fall back to localStorage
        if (error.message && error.message.includes('not authenticated')) {
          console.warn('User not authenticated, saving wellness entry to localStorage instead');
          storage.saveWellnessEntry(entry);
          return entry;
        }
        throw error;
      }
    }
    storage.saveWellnessEntry(entry);
    return entry;
  },

  /**
   * Update an existing wellness entry
   */
  async update(id: string, updates: Partial<WellnessEntry>): Promise<WellnessEntry> {
    if (USE_BACKEND && backendService) {
      const updated = await backendService.updateWellnessEntry(id, updates);
      if (!updated) {
        throw new Error('Entry not found');
      }
      return updated;
    }
    storage.updateWellnessEntry(id, updates);
    const entries = storage.getWellnessEntries();
    const updated = entries.find(e => e.id === id);
    if (!updated) {
      throw new Error('Entry not found');
    }
    return updated;
  },

  /**
   * Delete a wellness entry
   */
  async delete(id: string): Promise<void> {
    if (USE_BACKEND && backendService) {
      return await backendService.deleteWellnessEntry(id);
    }
    // Note: storage doesn't have delete, so we'll filter it out
    const entries = storage.getWellnessEntries();
    const filtered = entries.filter(e => e.id !== id);
    localStorage.setItem('altmed_wellness_entries', JSON.stringify(filtered));
  },
};

/**
 * Metric Data Service
 */
export const metricService = {
  /**
   * Get all metric data entries
   */
  async getAll(): Promise<MetricDataEntry[]> {
    if (USE_BACKEND && backendService) {
      return await backendService.getMetricData();
    }
    return storage.getMetricData();
  },

  /**
   * Get metric data by metric name
   */
  async getByMetricName(metricName: string): Promise<MetricDataEntry[]> {
    if (USE_BACKEND && backendService) {
      return await backendService.getMetricData(metricName);
    }
    return storage.getMetricDataByName(metricName);
  },

  /**
   * Get metric data by date range
   */
  async getByDateRange(metricName: string, startDate: string, endDate: string): Promise<MetricDataEntry[]> {
    if (USE_BACKEND && backendService) {
      return await backendService.getMetricData(metricName, startDate, endDate);
    }
    const entries = storage.getMetricDataByName(metricName);
    return entries.filter(entry => entry.date >= startDate && entry.date <= endDate);
  },

  /**
   * Create a new metric data entry
   */
  async create(entry: MetricDataEntry): Promise<MetricDataEntry> {
    if (USE_BACKEND && backendService) {
      return await backendService.saveMetricData(entry);
    }
    storage.saveMetricData(entry);
    return entry;
  },

  /**
   * Update an existing metric data entry
   */
  async update(id: string, updates: Partial<MetricDataEntry>): Promise<MetricDataEntry> {
    if (USE_BACKEND && backendService) {
      const updated = await backendService.updateMetricData(id, updates);
      if (!updated) {
        throw new Error('Entry not found');
      }
      return updated;
    }
    storage.updateMetricData(id, updates);
    const entries = storage.getMetricData();
    const updated = entries.find(e => e.id === id);
    if (!updated) {
      throw new Error('Entry not found');
    }
    return updated;
  },

  /**
   * Delete a metric data entry
   */
  async delete(id: string): Promise<void> {
    if (USE_BACKEND && backendService) {
      return await backendService.deleteMetricData(id);
    }
    storage.deleteMetricData(id);
  },
};

/**
 * Settings Service
 */
export const settingsService = {
  /**
   * Get user settings
   */
  async get(): Promise<UserSettings> {
    if (USE_BACKEND && backendService) {
      return await backendService.getUserSettings();
    }
    return storage.getUserSettings();
  },

  /**
   * Save user settings
   */
  async save(settings: UserSettings): Promise<UserSettings> {
    if (USE_BACKEND && backendService) {
      return await backendService.saveUserSettings(settings);
    }
    storage.saveUserSettings(settings);
    return settings;
  },
};

/**
 * General Data Service
 */
export const dataService = {
  /**
   * Clear all user data
   */
  async clearAll(): Promise<void> {
    if (USE_BACKEND && backendService) {
      return await backendService.clearAllData();
    }
    storage.clearAllData();
  },
};

