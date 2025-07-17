// These are the up to date schema types

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type UserStatus = "active" | "inactive" | "pending";
export type UserActivityStatus = "accepted" | "submitted" | "rejected" | "archive";
// type GradingSystem = "GPA" | "hours" | "doc_points" 
// type QuestionType = "shortText" | "longText" | "integer" | "decimal" | "date" | 
// 	"singleSelect" | "multiSelect" | "file" | "likert5" | "likert10" | "rating"

export type UserType = 'participant' | 'ssa' | 'admin' | 'alumni'

export interface User {
  id: string;
  organizationId: string;
  status?: UserStatus;
  userType?: UserType;
  locations?: string[];
  groups?: string[];
  userLogs?: any[]; // Replace `any` with UserLog[] if you have a type
  talentLmsId?: string;
  hesId?: string;
  journals?: any[]; // Replace `any` with Journal[] if you have a type
  userActivities?: any[]; // Replace `any` with UserActivity[] if you have a type
  userActivityLogs?: any[]; // Replace `any` with UserActivityLog[] if you have a type
  entryDate?: string; // Format: YYYY-MM-DD
  exitDate?: string;  // Format: YYYY-MM-DD
  receivedScholarship?: boolean | null;
  scholarshipAmount?: number;
  consentForm?: string; // URL

  // Challenge of the Week registered intelligences
  logical?: boolean;
  linguistic?: boolean;
  spatial?: boolean;
  kinestethic?: boolean;
  musical?: boolean;
  naturalistic?: boolean;
  interpersonal?: boolean;
  intrapersonal?: boolean;
  existential?: boolean;

  // Intelligence Scores
  logicalScore?: number;
  linguisticScore?: number;
  spatialScore?: number;
  kinestheticScore?: number;
  musicalScore?: number;
  naturalisticScore?: number;
  interpersonalScore?: number;
  intrapersonalScore?: number;
  existentialScore?: number;

  // Difficulty levels
  logicalDifficulty?: DifficultyLevel;
  linguisticDifficulty?: DifficultyLevel;
  spatialDifficulty?: DifficultyLevel;
  kinestheticDifficulty?: DifficultyLevel;
  musicalDifficulty?: DifficultyLevel;
  naturalisticDifficulty?: DifficultyLevel;
  interpersonalDifficulty?: DifficultyLevel;
  intrapersonalDifficulty?: DifficultyLevel;
  existentialDifficulty?: DifficultyLevel;
}
export interface UserActivity {
  id: string;
  pillarId: string;
  userId?: string;
  user?: User; // Assuming you have a `User` type defined elsewhere
  status?: UserActivityStatus;
  period?: number;
  points?: number;
  grade?: number;
  hours?: number;
  description?: string;
  title?: string;
  files?: string[]; // URLs
  approvedPoints?: number;
  feedback?: any[]; // Replace with actual Feedback type
  dateCreated?: string;    // Format: YYYY-MM-DD
  datePerformed?: string;  // Format: YYYY-MM-DD
  dateSubmitted?: string;  // Format: YYYY-MM-DD
  dateApproved?: string;   // Format: YYYY-MM-DD
  userActivityLogs?: any[]; // Replace with actual UserActivityLog type
}

export interface Pillar {
  id: string;
  name?: string;
  duration?: number;
  groupId?: string;
  status?: string;
  period: number;
  maxPoints?: number;
  year?: number;
  color?: string;
  exchangeRate?: number;
  gradingSystem?: string;
  maxHours?: number;
  maxGPA?: number;
  pointsLettersReferences?: number;
  pointsEssays?: number;
  startDate?: string;
  endDate?: string;
};

export interface Organization {
  id: string;
  name: string;
  logo?: string; // a.url()
  mainColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  quaternaryColor?: string;
  gradingSystem?: "GPA" | "points" | "hours" | "doc_points"; // Adjust based on your `gradingSystem` enum
  startDate?: string; // ISO date format
  address?: string;
  acronym?: string;
  legalFiles?: string[]; // Array of URLs
  groups?: Group[]; // Relationship (optional unless eagerly loaded)
  locations?: Location[]; // Relationship (optional)
};

export interface Group {
  id: string;
  name: string;
  duration?: number;
  monthsPerPeriod?: number;
  objective?: string;
  startYear?: number;
  endYear?: number;
  organizationId?: string;
  organization?: Organization;
  status?: "active" | "archived" | "draft" | "completed"; // Adjust enum `statuses` as needed
  locationIds?: string[];
  groupLocations?: any[]; // Assume this is defined elsewhere
  periodType?: string; // "year", "semester", etc.
  awards?: any[]; // todo
  pillars?: Pillar[]; // Assume defined elsewhere
  events?: Event[]; // Assume defined elsewhere
  numIndividualChallenges?: number;
  numGroupChallenges?: number;
  difficultyPromotion?: "algorithm" | "HeSResults";
};

export interface Location {
  id: string;
  name: string;
  address?: string;
  organizationId?: string;
  organization?: Organization;
  dateCreated?: string; // YYYY-MM-DD
  groupLocations?: any[]; // Assume defined elsewhere
};

export interface Feedback {
  id: string;
  userId?: string;
  feedback?: string;
  userActivityId?: string;
  userActivity?: UserActivity;
  date?: string;         // YYYY-MM-DD
  resolved?: string;
  file?: string;         // URL string
  createdAt?: string;
}
