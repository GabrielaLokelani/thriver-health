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

// Configuration flag - set to true when backend is ready
const USE_BACKEND = false; // TODO: Set to true when backend is deployed

/**
 * User Profile Service
 */
export const profileService = {
  /**
   * Get current user profile
   */
  async get(): Promise<UserProfile | null> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.get('/profile');
      throw new Error('Backend not yet implemented');
    }
    return storage.getUserProfile();
  },

  /**
   * Save user profile
   */
  async save(profile: UserProfile): Promise<UserProfile> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.post('/profile', profile);
      throw new Error('Backend not yet implemented');
    }
    storage.saveUserProfile(profile);
    return profile;
  },

  /**
   * Update user profile (partial update)
   */
  async update(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.patch('/profile', updates);
      throw new Error('Backend not yet implemented');
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
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.get('/wellness-entries');
      throw new Error('Backend not yet implemented');
    }
    return storage.getWellnessEntries();
  },

  /**
   * Get wellness entries for a date range
   */
  async getByDateRange(startDate: string, endDate: string): Promise<WellnessEntry[]> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.get(`/wellness-entries?start=${startDate}&end=${endDate}`);
      throw new Error('Backend not yet implemented');
    }
    const entries = storage.getWellnessEntries();
    return entries.filter(entry => entry.date >= startDate && entry.date <= endDate);
  },

  /**
   * Create a new wellness entry
   */
  async create(entry: WellnessEntry): Promise<WellnessEntry> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.post('/wellness-entries', entry);
      throw new Error('Backend not yet implemented');
    }
    storage.saveWellnessEntry(entry);
    return entry;
  },

  /**
   * Update an existing wellness entry
   */
  async update(id: string, updates: Partial<WellnessEntry>): Promise<WellnessEntry> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.patch(`/wellness-entries/${id}`, updates);
      throw new Error('Backend not yet implemented');
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
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.delete(`/wellness-entries/${id}`);
      throw new Error('Backend not yet implemented');
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
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.get('/metrics');
      throw new Error('Backend not yet implemented');
    }
    return storage.getMetricData();
  },

  /**
   * Get metric data by metric name
   */
  async getByMetricName(metricName: string): Promise<MetricDataEntry[]> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.get(`/metrics?name=${metricName}`);
      throw new Error('Backend not yet implemented');
    }
    return storage.getMetricDataByName(metricName);
  },

  /**
   * Get metric data by date range
   */
  async getByDateRange(metricName: string, startDate: string, endDate: string): Promise<MetricDataEntry[]> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.get(`/metrics?name=${metricName}&start=${startDate}&end=${endDate}`);
      throw new Error('Backend not yet implemented');
    }
    const entries = storage.getMetricDataByName(metricName);
    return entries.filter(entry => entry.date >= startDate && entry.date <= endDate);
  },

  /**
   * Create a new metric data entry
   */
  async create(entry: MetricDataEntry): Promise<MetricDataEntry> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.post('/metrics', entry);
      throw new Error('Backend not yet implemented');
    }
    storage.saveMetricData(entry);
    return entry;
  },

  /**
   * Update an existing metric data entry
   */
  async update(id: string, updates: Partial<MetricDataEntry>): Promise<MetricDataEntry> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.patch(`/metrics/${id}`, updates);
      throw new Error('Backend not yet implemented');
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
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.delete(`/metrics/${id}`);
      throw new Error('Backend not yet implemented');
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
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.get('/settings');
      throw new Error('Backend not yet implemented');
    }
    return storage.getUserSettings();
  },

  /**
   * Save user settings
   */
  async save(settings: UserSettings): Promise<UserSettings> {
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.post('/settings', settings);
      throw new Error('Backend not yet implemented');
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
    if (USE_BACKEND) {
      // TODO: Replace with API call
      // return await api.delete('/data');
      throw new Error('Backend not yet implemented');
    }
    storage.clearAllData();
  },
};

