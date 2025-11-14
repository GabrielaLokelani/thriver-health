// Amplify Gen 2 Data Models for Thriver Health
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// Define your data models
const schema = a.schema({
  // User Profile Model
  UserProfile: a
    .model({
      userId: a.id().required(),
      email: a.email().required(),
      name: a.string().required(),
      dateOfBirth: a.string(),
      sex: a.string(),
      location: a.string(),
      photo: a.string(),
      energyLevel: a.integer(),
      sleepQuality: a.integer(),
      stressLevel: a.integer(),
      mentalClarity: a.integer(),
      lifestyle: a.json(), // { diet, movement, digitalUsage }
      diagnosis: a.json(), // { condition, customCondition, symptoms, diagnosisDate }
      medications: a.json(), // Array of { name, dosage, frequency }
      treatments: a.json(), // Array of { name, type, dosage, frequency }
      conventionalTreatments: a.json(), // Array of { name, type, date, status, notes }
      trackingMetrics: a.json(), // Array of { name, unit, targetRange, frequency, category }
      customNotes: a.string(),
      goals: a.json(), // { shortTerm: [], longTerm: string }
      beliefs: a.json(), // { alignment, modalities }
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  // Wellness Entry Model
  WellnessEntry: a
    .model({
      userId: a.id().required(),
      date: a.datetime().required(),
      energy: a.integer(),
      sleep: a.integer(),
      stress: a.integer(),
      mood: a.integer(),
      notes: a.string(),
      ritualsCompleted: a.json(), // Array of strings
    })
    .authorization((allow) => [allow.owner()]),

  // Metric Data Entry Model
  MetricDataEntry: a
    .model({
      userId: a.id().required(),
      metricName: a.string().required(),
      value: a.string().required(), // Can be number or string
      unit: a.string().required(),
      date: a.datetime().required(),
      notes: a.string(),
      tags: a.json(), // Array of strings
    })
    .authorization((allow) => [allow.owner()]),

  // Journal Entry Model (for onboarding and daily entries)
  JournalEntry: a
    .model({
      userId: a.id().required(),
      entry: a.string().required(),
      entryType: a.string(), // 'onboarding', 'daily', 'gratitude', etc.
      extractedData: a.json(), // AI-extracted structured data
      createdAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  // AI Conversation Model (for chat history)
  AIConversation: a
    .model({
      userId: a.id().required(),
      message: a.string().required(),
      role: a.string().required(), // 'user' or 'assistant'
      relatedContent: a.json(), // { videos, research, recommendations }
      createdAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

