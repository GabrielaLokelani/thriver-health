// Amplify Gen 2 Data Service - Replaces localStorage with AWS backend
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { UserProfile, WellnessEntry, MetricDataEntry } from '../utils/storage';

const client = generateClient<Schema>({
  authMode: 'userPool',
});

// Helper to get current user ID
async function getCurrentUserId(): Promise<string> {
  const { fetchUserAttributes } = await import('aws-amplify/auth');
  const attributes = await fetchUserAttributes();
  return attributes.sub || '';
}

// Helper to get current user email
async function getCurrentUserEmail(): Promise<string> {
  const { fetchUserAttributes } = await import('aws-amplify/auth');
  const attributes = await fetchUserAttributes();
  return attributes.email || '';
}

// User Profile Service
export const profileService = {
  // Create or update user profile
  async save(profile: UserProfile): Promise<UserProfile> {
    const userId = await getCurrentUserId();
    
    // Check if profile exists
    const existing = await client.models.UserProfile.list({
      filter: { userId: { eq: userId } },
    });

    if (existing.data && existing.data.length > 0) {
      // Update existing
      const { id, ...profileWithoutId } = profile as any;
      const updated = await client.models.UserProfile.update({
        id: existing.data[0].id,
        ...profileWithoutId,
        updatedAt: new Date().toISOString(),
      });
      return updated.data as any;
    } else {
      // Create new
      const email = await getCurrentUserEmail();
      const created = await client.models.UserProfile.create({
        userId,
        email: email || '',
        name: profile.name,
        dateOfBirth: profile.dateOfBirth,
        sex: profile.sex,
        location: profile.location,
        photo: profile.photo,
        energyLevel: profile.energyLevel,
        sleepQuality: profile.sleepQuality,
        stressLevel: profile.stressLevel,
        mentalClarity: profile.mentalClarity,
        lifestyle: profile.lifestyle as any,
        diagnosis: profile.diagnosis as any,
        medications: profile.medications as any,
        treatments: profile.treatments as any,
        conventionalTreatments: profile.conventionalTreatments as any,
        trackingMetrics: profile.trackingMetrics as any,
        customNotes: profile.customNotes,
        goals: profile.goals as any,
        beliefs: profile.beliefs as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return created.data as any;
    }
  },

  // Get current user's profile
  async get(): Promise<UserProfile | null> {
    const userId = await getCurrentUserId();
    
    const result = await client.models.UserProfile.list({
      filter: { userId: { eq: userId } },
    });

    if (result.data && result.data.length > 0) {
      return result.data[0] as any;
    }
    return null;
  },

  // Delete user profile
  async delete(): Promise<void> {
    const userId = await getCurrentUserId();
    
    const result = await client.models.UserProfile.list({
      filter: { userId: { eq: userId } },
    });

    if (result.data && result.data.length > 0) {
      await client.models.UserProfile.delete({ id: result.data[0].id });
    }
  },
};

// Wellness Entry Service
export const wellnessService = {
  // Create wellness entry
  async create(entry: WellnessEntry): Promise<WellnessEntry> {
    const userId = await getCurrentUserId();
    
    const created = await client.models.WellnessEntry.create({
      userId,
      date: entry.date,
      energy: entry.energy,
      sleep: entry.sleep,
      stress: entry.stress,
      mood: entry.mood,
      notes: entry.notes,
      ritualsCompleted: entry.ritualsCompleted as any,
    });
    
    return created.data as any;
  },

  // Get all wellness entries for current user
  async getAll(): Promise<WellnessEntry[]> {
    const userId = await getCurrentUserId();
    
    const result = await client.models.WellnessEntry.list({
      filter: { userId: { eq: userId } },
    });

    return (result.data || []) as any[];
  },

  // Get entry by date
  async getByDate(date: string): Promise<WellnessEntry | null> {
    const userId = await getCurrentUserId();
    
    const result = await client.models.WellnessEntry.list({
      filter: {
        userId: { eq: userId },
        date: { eq: date },
      },
    });

    return result.data && result.data.length > 0 ? (result.data[0] as any) : null;
  },

  // Update wellness entry
  async update(entryId: string, updates: Partial<WellnessEntry>): Promise<WellnessEntry> {
    const updated = await client.models.WellnessEntry.update({
      id: entryId,
      ...updates,
    });
    
    return updated.data as any;
  },

  // Delete wellness entry
  async delete(entryId: string): Promise<void> {
    await client.models.WellnessEntry.delete({ id: entryId });
  },
};

// Metric Data Service
export const metricService = {
  // Create metric data entry
  async create(data: MetricDataEntry): Promise<MetricDataEntry> {
    const userId = await getCurrentUserId();
    
    const created = await client.models.MetricDataEntry.create({
      userId,
      metricName: data.metricName,
      value: data.value.toString(),
      unit: data.unit,
      date: data.date,
      notes: data.notes,
      tags: data.tags as any,
    });
    
    return created.data as any;
  },

  // Get all metric data for current user
  async getAll(): Promise<MetricDataEntry[]> {
    const userId = await getCurrentUserId();
    
    const result = await client.models.MetricDataEntry.list({
      filter: { userId: { eq: userId } },
    });

    return (result.data || []) as any[];
  },

  // Get metric data by metric name
  async getByName(metricName: string): Promise<MetricDataEntry[]> {
    const userId = await getCurrentUserId();
    
    const result = await client.models.MetricDataEntry.list({
      filter: {
        userId: { eq: userId },
        metricName: { eq: metricName },
      },
    });

    return (result.data || []) as any[];
  },

  // Update metric data
  async update(dataId: string, updates: Partial<MetricDataEntry>): Promise<MetricDataEntry> {
    const updated = await client.models.MetricDataEntry.update({
      id: dataId,
      ...updates,
    });
    
    return updated.data as any;
  },

  // Delete metric data
  async delete(dataId: string): Promise<void> {
    await client.models.MetricDataEntry.delete({ id: dataId });
  },
};

// Journal Entry Service
export const journalService = {
  // Create journal entry
  async create(entry: string, entryType: string = 'daily'): Promise<any> {
    const userId = await getCurrentUserId();
    
    const created = await client.models.JournalEntry.create({
      userId,
      entry,
      entryType,
      createdAt: new Date().toISOString(),
    });
    
    return created.data;
  },

  // Get all journal entries
  async getAll(): Promise<any[]> {
    const userId = await getCurrentUserId();
    
    const result = await client.models.JournalEntry.list({
      filter: { userId: { eq: userId } },
    });

    return result.data || [];
  },

  // Update journal entry with extracted data
  async updateWithExtractedData(entryId: string, extractedData: any): Promise<any> {
    const updated = await client.models.JournalEntry.update({
      id: entryId,
      extractedData: extractedData as any,
    });
    
    return updated.data;
  },
};

// AI Conversation Service
export const conversationService = {
  // Create conversation message
  async create(message: string, role: 'user' | 'assistant', relatedContent?: any): Promise<any> {
    const userId = await getCurrentUserId();
    
    const created = await client.models.AIConversation.create({
      userId,
      message,
      role,
      relatedContent: relatedContent as any,
      createdAt: new Date().toISOString(),
    });
    
    return created.data;
  },

  // Get conversation history
  async getHistory(): Promise<any[]> {
    const userId = await getCurrentUserId();
    
    const result = await client.models.AIConversation.list({
      filter: { userId: { eq: userId } },
    });

    return result.data || [];
  },
};

// Real-time subscriptions (optional - for live updates)
export const subscribeToWellnessEntries = (callback: (entry: WellnessEntry) => void) => {
  return client.models.WellnessEntry.observeQuery().subscribe({
    next: ({ items }) => {
      items.forEach(callback);
    },
  });
};

