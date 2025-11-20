/**
 * Amplify Data Service - Backend implementation using AWS Amplify
 * 
 * This service uses Amplify Gen 2 Data client to interact with the backend
 * Only used when backend is deployed and amplify_outputs.json is available
 */

import { 
  UserProfile, 
  WellnessEntry, 
  MetricDataEntry, 
  UserSettings 
} from '../utils/storage';

// Conditional import - only use when backend is available
// The Schema type will be available after backend deployment generates types
type Schema = any; // Will be replaced with actual schema after backend deployment

// Check if Amplify is available
const isAmplifyAvailable = (): boolean => {
  try {
    require('aws-amplify/data');
    return true;
  } catch {
    return false;
  }
};

// Generate the Amplify client - only when backend is available
let client: any = null;

const initializeClient = () => {
  if (!isAmplifyAvailable()) {
    return null;
  }
  
  if (!client) {
    try {
      const { generateClient } = require('aws-amplify/data');
      // Type assertion needed because require() returns any
      const generateClientTyped = generateClient as <T = any>(config: { authMode: string }) => any;
      client = generateClientTyped({
        authMode: 'userPool',
      });
    } catch (error) {
      console.error('Failed to initialize Amplify client:', error);
      return null;
    }
  }
  return client;
};

/**
 * Amplify implementation of data service
 * This will be used when backend is deployed
 */
export class AmplifyDataService {
  private getCurrentUserId(): string {
    // TODO: Get from Amplify Auth
    // For now, return a placeholder
    return 'current-user-id';
  }

  // User Profile methods
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.UserProfile.list({
        filter: { userId: { eq: this.getCurrentUserId() } },
      });
      
      if (errors || !data || data.length === 0) {
        return null;
      }
      
      return this.mapAmplifyProfileToUserProfile(data[0]);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  async saveUserProfile(profile: UserProfile): Promise<UserProfile> {
    try {
      const existing = await this.getUserProfile();
      const amplifyProfile = this.mapUserProfileToAmplify(profile);
      
      if (existing) {
        // Update existing
        const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.UserProfile.update({
          id: existing.id,
          ...amplifyProfile,
        });
        
        if (errors) throw new Error(errors[0].message);
        return this.mapAmplifyProfileToUserProfile(data!);
      } else {
        // Create new
        const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.UserProfile.create({
          ...amplifyProfile,
          userId: this.getCurrentUserId(),
        });
        
        if (errors) throw new Error(errors[0].message);
        return this.mapAmplifyProfileToUserProfile(data!);
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  }

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const existing = await this.getUserProfile();
    if (!existing) return null;
    
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    return this.saveUserProfile(updated);
  }

  async deleteUserProfile(): Promise<void> {
    const existing = await this.getUserProfile();
    if (!existing) return;
    
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { errors } = await amplifyClient.models.UserProfile.delete({ id: existing.id });
    if (errors) throw new Error(errors[0].message);
  }

  // Wellness Entry methods
  async getWellnessEntries(startDate?: string, endDate?: string): Promise<WellnessEntry[]> {
    try {
      let filter: any = { userId: { eq: this.getCurrentUserId() } };
      
      if (startDate && endDate) {
        filter = {
          ...filter,
          date: { between: [startDate, endDate] },
        };
      } else if (startDate) {
        filter = {
          ...filter,
          date: { ge: startDate },
        };
      } else if (endDate) {
        filter = {
          ...filter,
          date: { le: endDate },
        };
      }
      
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.WellnessEntry.list({ filter });
      
      if (errors) throw new Error(errors[0].message);
      return (data || []).map(this.mapAmplifyWellnessToWellnessEntry);
    } catch (error) {
      console.error('Error fetching wellness entries:', error);
      return [];
    }
  }

  async saveWellnessEntry(entry: Omit<WellnessEntry, 'id'>): Promise<WellnessEntry> {
    try {
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.WellnessEntry.create({
        userId: this.getCurrentUserId(),
        date: entry.date,
        mood: entry.mood,
        energy: entry.energy,
        sleep: entry.sleep,
        stress: entry.stress,
        notes: entry.notes,
        ritualsCompleted: entry.ritualsCompleted || [],
      });
      
      if (errors) throw new Error(errors[0].message);
      return this.mapAmplifyWellnessToWellnessEntry(data!);
    } catch (error) {
      console.error('Error saving wellness entry:', error);
      throw error;
    }
  }

  async updateWellnessEntry(id: string, updates: Partial<WellnessEntry>): Promise<WellnessEntry | null> {
    try {
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.WellnessEntry.update({
        id,
        ...updates,
      });
      
      if (errors) throw new Error(errors[0].message);
      return data ? this.mapAmplifyWellnessToWellnessEntry(data) : null;
    } catch (error) {
      console.error('Error updating wellness entry:', error);
      return null;
    }
  }

  async deleteWellnessEntry(id: string): Promise<void> {
    try {
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { errors } = await amplifyClient.models.WellnessEntry.delete({ id });
      if (errors) throw new Error(errors[0].message);
    } catch (error) {
      console.error('Error deleting wellness entry:', error);
      throw error;
    }
  }

  // Metric Data methods
  async getMetricData(metricName?: string, startDate?: string, endDate?: string): Promise<MetricDataEntry[]> {
    try {
      let filter: any = { userId: { eq: this.getCurrentUserId() } };
      
      if (metricName) {
        filter.metricName = { eq: metricName };
      }
      
      if (startDate && endDate) {
        filter.date = { between: [startDate, endDate] };
      } else if (startDate) {
        filter.date = { ge: startDate };
      } else if (endDate) {
        filter.date = { le: endDate };
      }
      
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.MetricDataEntry.list({ filter });
      
      if (errors) throw new Error(errors[0].message);
      return (data || []).map(this.mapAmplifyMetricToMetricDataEntry);
    } catch (error) {
      console.error('Error fetching metric data:', error);
      return [];
    }
  }

  async saveMetricData(entry: Omit<MetricDataEntry, 'id'>): Promise<MetricDataEntry> {
    try {
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.MetricDataEntry.create({
        userId: this.getCurrentUserId(),
        metricName: entry.metricName,
        value: String(entry.value),
        unit: entry.unit,
        date: entry.date,
        notes: entry.notes,
        tags: entry.tags || [],
      });
      
      if (errors) throw new Error(errors[0].message);
      return this.mapAmplifyMetricToMetricDataEntry(data!);
    } catch (error) {
      console.error('Error saving metric data:', error);
      throw error;
    }
  }

  async updateMetricData(id: string, updates: Partial<MetricDataEntry>): Promise<MetricDataEntry | null> {
    try {
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.MetricDataEntry.update({
        id,
        ...updates,
        value: updates.value ? String(updates.value) : undefined,
      });
      
      if (errors) throw new Error(errors[0].message);
      return data ? this.mapAmplifyMetricToMetricDataEntry(data) : null;
    } catch (error) {
      console.error('Error updating metric data:', error);
      return null;
    }
  }

  async deleteMetricData(id: string): Promise<void> {
    try {
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { errors } = await amplifyClient.models.MetricDataEntry.delete({ id });
      if (errors) throw new Error(errors[0].message);
    } catch (error) {
      console.error('Error deleting metric data:', error);
      throw error;
    }
  }

  // Settings methods
  async getUserSettings(): Promise<UserSettings> {
    try {
      const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.UserSettings.list({
        filter: { userId: { eq: this.getCurrentUserId() } },
      });
      
      if (errors || !data || data.length === 0) {
        // Return default settings
        return this.getDefaultSettings();
      }
      
      return this.mapAmplifySettingsToUserSettings(data[0]);
    } catch (error) {
      console.error('Error fetching user settings:', error);
      return this.getDefaultSettings();
    }
  }

  async saveUserSettings(settings: UserSettings): Promise<UserSettings> {
    try {
      const existing = await this.getUserSettings();
      const amplifySettings = this.mapUserSettingsToAmplify(settings);
      
      if (existing && (existing as any).id) {
        // Update existing
        const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.UserSettings.update({
          id: (existing as any).id,
          ...amplifySettings,
        });
        
        if (errors) throw new Error(errors[0].message);
        return this.mapAmplifySettingsToUserSettings(data!);
      } else {
        // Create new
        const amplifyClient = initializeClient();
      if (!amplifyClient) {
        throw new Error('Amplify client not initialized');
      }
      const { data, errors } = await amplifyClient.models.UserSettings.create({
          ...amplifySettings,
          userId: this.getCurrentUserId(),
        });
        
        if (errors) throw new Error(errors[0].message);
        return this.mapAmplifySettingsToUserSettings(data!);
      }
    } catch (error) {
      console.error('Error saving user settings:', error);
      throw error;
    }
  }

  async clearAllData(): Promise<void> {
    // Delete all user data
    await this.deleteUserProfile();
    // TODO: Delete wellness entries, metric data, settings
  }

  // Helper methods for mapping between Amplify and local types
  private mapAmplifyProfileToUserProfile(amplifyProfile: any): UserProfile {
    return {
      id: amplifyProfile.id,
      name: amplifyProfile.name,
      dateOfBirth: amplifyProfile.dateOfBirth || '',
      sex: amplifyProfile.sex || '',
      location: amplifyProfile.location || '',
      energyLevel: amplifyProfile.energyLevel || 5,
      sleepQuality: amplifyProfile.sleepQuality || 5,
      stressLevel: amplifyProfile.stressLevel || 5,
      mentalClarity: amplifyProfile.mentalClarity || 5,
      lifestyle: amplifyProfile.lifestyle || { diet: '', movement: '', digitalUsage: '' },
      diagnosis: amplifyProfile.diagnosis || { condition: '', symptoms: [] },
      medications: amplifyProfile.medications || [],
      treatments: amplifyProfile.treatments || [],
      conventionalTreatments: amplifyProfile.conventionalTreatments || [],
      trackingMetrics: amplifyProfile.trackingMetrics || [],
      customNotes: amplifyProfile.customNotes || '',
      goals: amplifyProfile.goals || { shortTerm: [], longTerm: '' },
      beliefs: amplifyProfile.beliefs || { alignment: 'both', modalities: [] },
      createdAt: amplifyProfile.createdAt || new Date().toISOString(),
      updatedAt: amplifyProfile.updatedAt || new Date().toISOString(),
    };
  }

  private mapUserProfileToAmplify(profile: UserProfile): any {
    return {
      name: profile.name,
      dateOfBirth: profile.dateOfBirth,
      sex: profile.sex,
      location: profile.location,
      energyLevel: profile.energyLevel,
      sleepQuality: profile.sleepQuality,
      stressLevel: profile.stressLevel,
      mentalClarity: profile.mentalClarity,
      lifestyle: profile.lifestyle,
      diagnosis: profile.diagnosis,
      medications: profile.medications,
      treatments: profile.treatments,
      conventionalTreatments: profile.conventionalTreatments,
      trackingMetrics: profile.trackingMetrics,
      customNotes: profile.customNotes,
      goals: profile.goals,
      beliefs: profile.beliefs,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  private mapAmplifyWellnessToWellnessEntry(amplifyWellness: any): WellnessEntry {
    return {
      id: amplifyWellness.id,
      date: amplifyWellness.date,
      mood: amplifyWellness.mood || 5,
      energy: amplifyWellness.energy || 5,
      sleep: amplifyWellness.sleep || 5,
      stress: amplifyWellness.stress || 5,
      notes: amplifyWellness.notes || '',
      ritualsCompleted: amplifyWellness.ritualsCompleted || [],
    };
  }

  private mapAmplifyMetricToMetricDataEntry(amplifyMetric: any): MetricDataEntry {
    return {
      id: amplifyMetric.id,
      metricName: amplifyMetric.metricName,
      value: amplifyMetric.value,
      unit: amplifyMetric.unit,
      date: amplifyMetric.date,
      notes: amplifyMetric.notes,
      tags: amplifyMetric.tags || [],
    };
  }

  private mapAmplifySettingsToUserSettings(amplifySettings: any): UserSettings {
    return {
      soundEnabled: amplifySettings.soundEnabled ?? true,
      animationsEnabled: amplifySettings.animationsEnabled ?? true,
      dashboardLayout: (amplifySettings.dashboardLayout as 'grid' | 'list') || 'grid',
      theme: (amplifySettings.theme as 'light' | 'dark' | 'auto') || 'dark',
      notifications: amplifySettings.notifications || {
        email: true,
        push: true,
        reminders: true,
      },
      privacy: amplifySettings.privacy || {
        shareData: true,
        showProfile: true,
        allowAnalytics: true,
      },
    };
  }

  private mapUserSettingsToAmplify(settings: UserSettings): any {
    return {
      soundEnabled: settings.soundEnabled,
      animationsEnabled: settings.animationsEnabled,
      dashboardLayout: settings.dashboardLayout,
      theme: settings.theme,
      notifications: settings.notifications,
      privacy: settings.privacy,
    };
  }

  private getDefaultSettings(): UserSettings {
    return {
      soundEnabled: true,
      animationsEnabled: true,
      dashboardLayout: 'grid',
      theme: 'dark',
      notifications: {
        email: true,
        push: true,
        reminders: true,
      },
      privacy: {
        shareData: true,
        showProfile: true,
        allowAnalytics: true,
      },
    };
  }
}

