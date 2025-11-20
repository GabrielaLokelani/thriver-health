import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via the identity provider can
"create", "read", "update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  UserProfile: a
    .model({
      userId: a.string().required(),
      email: a.string().required(),
      name: a.string().required(),
      dateOfBirth: a.string(),
      sex: a.string(),
      location: a.string(),
      energyLevel: a.integer(),
      sleepQuality: a.integer(),
      stressLevel: a.integer(),
      mentalClarity: a.integer(),
      lifestyle: a.json(),
      diagnosis: a.json(),
      medications: a.json(),
      treatments: a.json(),
      conventionalTreatments: a.json(),
      trackingMetrics: a.json(),
      customNotes: a.string(),
      goals: a.json(),
      beliefs: a.json(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  WellnessEntry: a
    .model({
      userId: a.string().required(),
      date: a.string().required(),
      mood: a.integer(),
      energy: a.integer(),
      sleep: a.integer(),
      stress: a.integer(),
      notes: a.string(),
      ritualsCompleted: a.json(),
    })
    .authorization((allow) => [allow.owner()]),

  MetricDataEntry: a
    .model({
      userId: a.string().required(),
      metricName: a.string().required(),
      value: a.string().required(),
      unit: a.string().required(),
      date: a.string().required(),
      notes: a.string(),
      tags: a.json(),
    })
    .authorization((allow) => [allow.owner()]),

  UserSettings: a
    .model({
      userId: a.string().required(),
      soundEnabled: a.boolean(),
      animationsEnabled: a.boolean(),
      dashboardLayout: a.string(),
      theme: a.string(),
      notifications: a.json(),
      privacy: a.json(),
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

