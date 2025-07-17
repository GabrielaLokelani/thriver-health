import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// TODO: When in prod, use allow.owner() or allow.publicApiKey() as needed (UserActivity, Feedback, SupportTicket)
// IMPORTANT: DO NOT MODIFY! If needed, only add columns, never remove or edit!

const statuses: string[] = [
  "active",
  "inactive",
  "pending"
]

const gradingSystem: string[] = [
  "GPA",
  "hours",
  "doc_points" // Letter references/essays
]

const questionTypes: string[] = [
  "shortText",
  "longText",
  "integer",
  "decimal",
  "date",
  "singleSelect",
  "multiSelect",
  "file",
  "likert5",
  "likert10",
  "rating"
]

const schema = a.schema({

  // For the user table, DON'T save PII within the dynamoDB table; that will be handled by AWS Cognito
  User: a.model({
    id: a.id().required(),
    cognitoSub: a.id(),
    // cognitoSub: a.id().required(),
    // firstName: a.string().required(), // TODO: Include in Cognito
    // lastName: a.string().required(), // TODO: Include in Cognito
    // fullName: a.string().required(), // TODO: REMOVE
    // gender: a.string().required(), // TODO: Put into cognito!
    organizationId: a.id().required(),
    // email: a.email(), // TODO: Include in Cognito
    // phone: a.phone(), // TODO: Include in Cognito
    // address: a.string(), // TODO: Include in Cognito
    status: a.enum(statuses),
    userType: a.enum(["participant", "ssa", "admin", "alumni"]), // student -> wise_participant
    // Students will have only one location and one group; SSAs can have many.
    locations: a.id().array(),
    groups: a.id().array(), // FIXME: This needs to be a belongs to relationship!!
    userLogs: a.hasMany("UserLog", "userId"),
    // These will be necessary for students
    talentLmsId: a.id(),
    hesId: a.id(),
    journals: a.hasMany("Journal", "userId"),
    userActivities: a.hasMany("UserActivity", "userId"),
    userActivityLogs: a.hasMany("UserActivityLog", "userId"),
    entryDate: a.date(),
    exitDate: a.date(),
    receivedScholarship: a.boolean(), // True or false or null
    scholarshipAmount: a.integer(),
    // guardianFirstName: a.string(), // TODO: Include in Cognito
    // guardianLastName: a.string(), // TODO: Include in Cognito
    // guardianPhone: a.string(), // TODO: Include in Cognito
    // guardianEmail: a.string(), // TODO: Include in Cognito
    consentForm: a.url(), // DON'T include in cognito
    // Challenge of the Week registered intelligences (true/false)
    logical: a.boolean(),
    linguistic: a.boolean(),
    spatial: a.boolean(),
    kinestethic: a.boolean(),
    musical: a.boolean(),
    naturalistic: a.boolean(),
    interpersonal: a.boolean(),
    intrapersonal: a.boolean(),
    existential: a.boolean(),
    // Challenge of the Week Intelligence Scores
    logicalScore: a.integer(),
    linguisticScore: a.integer(),
    spatialScore: a.integer(),
    kinestheticScore: a.integer(),
    musicalScore: a.integer(),
    naturalisticScore: a.integer(),
    interpersonalScore: a.integer(),
    intrapersonalScore: a.integer(),
    existentialScore: a.integer(),
    // Challenge of the Week Difficulty levels
    logicalDifficulty: a.enum(["beginner", "intermediate", "advanced"]),
    linguisticDifficulty: a.enum(["beginner", "intermediate", "advanced"]),
    spatialDifficulty: a.enum(["beginner", "intermediate", "advanced"]),
    kinestheticDifficulty: a.enum(["beginner", "intermediate", "advanced"]),
    musicalDifficulty: a.enum(["beginner", "intermediate", "advanced"]),
    naturalisticDifficulty: a.enum(["beginner", "intermediate", "advanced"]),
    interpersonalDifficulty: a.enum(["beginner", "intermediate", "advanced"]),
    intrapersonalDifficulty: a.enum(["beginner", "intermediate", "advanced"]),
    existentialDifficulty: a.enum(["beginner", "intermediate", "advanced"]),
  })
  .authorization(allow => [allow.publicApiKey()]),

  // Group
  Group: a.model({
    id: a.id().required(),
    name: a.string().required(),
    duration: a.integer(),
    monthsPerPeriod: a.integer(),
    scholarship: a.integer(),
    // weeksPerPeriod: a.integer(),
    objective: a.string(),
    startYear: a.integer(),
    endYear: a.integer(),
    organizationId: a.id(),
    organization: a.belongsTo("Organization", "organizationId"),
    status: a.enum(statuses),
    locationIds: a.id().array(),
    groupLocations: a.hasMany("GroupLocation", "groupId"),
    // questionnaireId: a.id(), // TODO: Implement later
    // questionnaire: a.belongsTo("Questionnaire", "questionnaireId"),
    periodType: a.string(), // "year", "semester", etc.
    awards: a.hasMany("Award", "groupId"),
    pillars: a.hasMany("Pillar", "groupId"),
    events: a.hasMany("Event", "groupId"),
    // These relate to Challenge of the Week
    numIndividualChallenges: a.integer(),
    numGroupChallenges: a.integer(),
    difficultyPromotion: a.enum(["algorithm", "HeSResults"]),
  })
  .authorization(allow => [allow.publicApiKey()]),

  // Groups and Locations have a many to many relationship, so we need a join table
  GroupLocation: a.model({
    id: a.id().required(),
    groupId: a.id(),
    group: a.belongsTo("Group", "groupId"),
    locationId: a.id(),
    location: a.belongsTo("Location", "locationId")
  })
  .authorization(allow => [allow.publicApiKey()]),

  // Survey Answer
  SurveyAnswer: a.model({
    id: a.id().required(),
    userId: a.id().required(),
    surveyQuestionId: a.id(),
    surveyQuestion: a.belongsTo("SurveyQuestion", "surveyQuestionId"),
    answer: a.string(),
  }).authorization(allow => [allow.publicApiKey()]),
  
  // Monthly Survey
  SurveyQuestion: a.model({
    id: a.id().required(),
    text: a.string(),
    textSpanish: a.string(),
    questionType: a.enum(questionTypes),
    surveyAnswers: a.hasMany("SurveyAnswer", "surveyQuestionId"),
    pillarId: a.id(),
    number: a.integer(),
  }).authorization(allow => [allow.publicApiKey()]),

  // Awards
  Award: a.model({
    id: a.id().required(),
    name: a.string().required(),
    groupId: a.id(),
    group: a.belongsTo("Group", "groupId"),
    logo: a.url()
  }).authorization(allow => [allow.publicApiKey()]),

  // Conversation
  Conversation: a.model({
    id: a.id().required(),
    name: a.string().required(),
    participants: a.id().array(),
    image: a.url(),
    messages: a.hasMany("Message", "conversationId"),
  }).authorization(allow => [allow.publicApiKey()]),

  // Daily Answer; these are connected to the Daily Questions
  DailyAnswer: a.model({
    id: a.id().required(),
    date: a.date(),
    dailyQuestionId: a.id().required(),
    dailyQuestion: a.belongsTo("DailyQuestion", "dailyQuestionId"),
    answer: a.string(),
  }).authorization(allow => [allow.publicApiKey()]),

  // Daily Question
  DailyQuestion: a.model({
    id: a.id().required(),
    date: a.date(),
    text: a.string(),
    textSpanish: a.string(),
    dailyAnswers: a.hasMany("DailyAnswer", "dailyQuestionId"),
  }).authorization(allow => [allow.publicApiKey()]),


  // Event
  Event: a.model({
    id: a.id().required(),
    name: a.string().required(),
    groupId: a.id(),
    group: a.belongsTo("Group", "groupId"),
    details: a.string(),
    date: a.date(),
    invitees: a.id().array(),
    gCalLink: a.url(),
    outlookLink: a.url(),
    icallLink: a.url(),
    location: a.string(),
    file: a.url(),
    createdBy: a.id(),
    createdAt: a.date()
  }).authorization(allow => [allow.publicApiKey()]),

  // Feedback
  Feedback: a.model({
    id: a.id().required(),
    userId: a.id(),
    feedback: a.string(),
    userActivityId: a.id(),
    userActivity: a.belongsTo("UserActivity", "userActivityId"),
    date: a.date(),
    resolved: a.date(),
    file: a.url(),
    createdAt: a.date()
  }).authorization(allow => [allow.publicApiKey()]),

  // Journal
  Journal: a.model({
    id: a.id().required(),
    name: a.string(),
    description: a.string(),
    photo: a.url(),
    document: a.url(),
    video: a.url(),
    creator: a.id(),
    userId: a.id(),
    createdAt: a.date(),
    user: a.belongsTo("User", "userId")
  }).authorization(allow => [allow.publicApiKey()]),

  // Message
  Message: a.model({
    id: a.id().required(),
    body: a.string().required(),
    createdBy: a.id(),
    conversationId: a.id(),
    conversation: a.belongsTo("Conversation", "conversationId"),
    readBy: a.id().array()
  }).authorization(allow => [allow.publicApiKey()]),

  // Organization
  Organization: a.model({
    id: a.id().required(),
    name: a.string().required(),
    logo: a.url(),
    mainColor: a.string(),
    secondaryColor: a.string(),
    tertiaryColor: a.string(),
    quaternaryColor: a.string(),
    gradingSystem: a.enum(gradingSystem),
    startDate: a.date(),
    address: a.string(),
    acronym: a.string(),
    legalFiles: a.url().array(),
    groups: a.hasMany("Group", "organizationId"),
    // questionnaires: a.hasMany("Questionnaire", "organizationId"),
    locations: a.hasMany("Location", "organizationId"),
  }).authorization(allow => [allow.publicApiKey()]),

  // Pillar (Associated with group and period) 
  Pillar: a.model({
    id: a.id().required(),
    name: a.string().required(),
    duration: a.integer().required(),
    groupId: a.id().required(),
    group: a.belongsTo("Group", "groupId"),
    status: a.enum(statuses),
    period: a.integer().required(),
    maxPoints: a.float(),
    year: a.integer(),
    color: a.string(),
    exchangeRate: a.float(),
    gradingSystem: a.enum(gradingSystem),
    maxHours: a.integer(), // If grading system is "hours"
    maxGPA: a.integer(), // If gradingSystem is "GPA"
    pointsLettersReferences: a.integer(), // If gradingSystem is "doc_points" (ending letter references)
    pointsEssays: a.integer(), // If gradingSystem is "doc_points" (For ending essays)
    userActivities: a.hasMany("UserActivity", "pillarId"),
    startDate: a.date(),
    endDate: a.date(),
  }).authorization(allow => [allow.publicApiKey()]),

  // Questionnaire
  // Questionnaire: a.model({
  //   id: a.id().required(),
  //   questionnaireType: a.enum([
  //     "registration",
  //     "questionOfTheDay",
  //     "programFeedback",
  //     "psychometrics"
  //   ]),
  //   organizationId: a.id(),
  //   organization: a.belongsTo("Organization", "organizationId"),
  //   answers: a.hasMany("Answer", "questionnaireId"),
  //   questions: a.hasMany("Question", "questionnaireId"),
  //   // groupId: a.id(),
  //   // group: a.hasOne("Group", "groupId"),
  //   type: a.string(),
  //   userQuestionnaires: a.hasMany("UserQuestionnaire", "questionnaireId"),
  // }).authorization(allow => [allow.publicApiKey()]),

  // Location
  Location: a.model({
    id: a.id().required(),
    name: a.string().required(),
    address: a.string(),
    organizationId: a.id(),
    organization: a.belongsTo("Organization", "organizationId"),
    dateCreated: a.date(),
    groupLocations: a.hasMany("GroupLocation", "locationId")
  }).authorization(allow => [allow.publicApiKey()]),

  // User Activity
  UserActivity: a.model({
    id: a.id().required(),
    userId: a.id(),
    user: a.belongsTo("User", "userId"),
    status: a.enum(["accepted", "submitted", "rejected", "archive"]), // TODO: We forgot the draft step!
    period: a.integer(),
    points: a.float(), // Automatically assigned points
    grade: a.float(),
    hours: a.float(),
    description: a.string(),
    title: a.string(),
    files: a.url().array(),
    approvedPoints: a.float(), // The points an SSA decides to give the activity
    feedback: a.hasMany("Feedback", "userActivityId"),
    pillarId: a.id().required(),
    pillar: a.belongsTo("Pillar", "pillarId"),
    dateCreated: a.date(),
    datePerformed: a.date(),
    dateSubmitted: a.date(),
    dateApproved: a.date(),
    activityLogs: a.hasMany("UserActivityLog", "userActivityId"),
  }).authorization(allow => [allow.publicApiKey()]),

  // User Activity Log
  UserActivityLog: a.model({
    id: a.id().required(),
    userActivityId: a.id(),
    userActivity: a.belongsTo("UserActivity", "userActivityId"),
    userId: a.id(),
    user: a.belongsTo("User", "userId"),
    details: a.string(),
    date: a.date(),
    activityLogType: a.enum([
      "recordCreation",
      "recordEdit",
      "pointsRelatedToRecords",
      "deletionOfRecords"
    ]),
    name: a.string()
  }).authorization(allow => [allow.publicApiKey()]),

  // User Answer // FIXME: Where did the rest of the columns come from?
  // SurveyAnswers: a.model({
  //   id: a.id().required(),
  //   userId: a.id().required(),
  //   date: a.date(),
  //   text: a.string(),
  //   textSpanish: a.string(),
  //   number: a.integer(),
  //   multiSelect: a.integer().array(),
  //   singleSelect: a.integer(),
  //   file: a.url(),
  //   questionId: a.id().required(),
  //   questionType: a.enum(questionTypes),
  //   reply: a.string(),
  //   // FIXME: What are these for?
  //   // user2Id: a.id(),
  //   // answerFile2: a.url(),
  //   // pillarTypeId: a.id()
  // }).authorization(allow => [allow.publicApiKey()]),

  // User Log
  UserLog: a.model({
    id: a.id().required(),
    userId: a.id().required(),
    user: a.belongsTo("User", "userId"),
    name: a.string().required(),
    logType: a.enum([
      "login",
      "timeSpent",
      "action1",
      "actionN",
      "change1",
      "changeN"
    ]),
    date: a.date().required(),
    details: a.string(),
  }).authorization(allow => [allow.publicApiKey()]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
