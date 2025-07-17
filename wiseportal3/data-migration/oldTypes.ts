export interface User_Old {
  OsuserType: string;
  academicprogram_id: string;
  accomodations: string;
  applicationDecision: string;
  backgroundList: string; // JSON stringified array
  behaviour: string;      // JSON stringified array
  beneficiary: string;
  benefitDate: string;    // Consider: YYYY-MM-DD or empty
  bio: string;
  changePw: string;
  consentForm: string;
  contactId: string;
  created_at: string;     // Milliseconds since epoch as string
  dateOfBirth: string;    // Format: YYYY-MM-DD
  deactivatedBy: string;
  deactivationDate: string;
  email: string;
  feedback: string;
  firstLogin: string;
  fullName: string;
  gdprDeletion: string;
  gradeLevel: string;
  guardianEmail: string;
  guardianFullName: string;
  guardianLastName: string;
  guardianName: string;
  guardianPhone: string;
  id: string;
  initials: string;
  language: string;
  lastLocation: string;
  lastName: string;
  lastSection: string;
  lastSectionDate: string;
  location: string;
  names: string;
  needs: string;             // JSON stringified array
  organizationRoles: string;
  organization_id: string;
  os_generalstatus_id: string;
  oscommunicationmethod_id: string;
  osdeactivationreason2_id: string;
  osdeactivationreason_id: string;
  osregistrationstatus_id: string;
  osusertype_id: string;
  painPoints: string;        // JSON stringified array
  phone: string;
  picture: string;           // JSON stringified object (stringified JSON)
  question_id: string;
  rejectionReason: string;
  relatedSsa: string;
  school_id: string;
  scolarshipReleaseDate: string;
  studentId: string;
  userActivitylog: string;
  userQuote: string;
  user_idTalentlms: string;
  userlog: string;
}

export interface UserActivity_Old {
  id: string;
  user_id?: string;
  status?: 'Accepted' | 'Submitted' | 'Rejected' | 'Deleted';
  period?: number;
  points?: number;
  grade?: number;
  hoursSpent?: number;
  description?: string;
  title?: string;
  document_id?: string;
  relatedFiles?: object[];
  academicprogram_id?: string;
  approvedPoints?: number;
  feedback_id?: string[];
  created_at?: string;     // ISO string format
  datePerformed?: string;
  organization_id?: string;
  organizationpillar_id?: string;
  activitySubmittied?: string;
  activitiyApproved?: string;
}

export interface Pillar_Old {
  id: string;
  created_at: number;
  organizationpillar_id: string;
  period: number;
  weight?: number;
  year?: number;
  academicprogram_id?: number;
  osgradingsystem_id?: number;
  hours?: number;
  exchangeRate?: number;
  awards_id: string;
  GPA?: number;
  pointsLetterReference?: number;
  pointsEssays?: number;
  AwardName1?: string;
  hoursAward1?: number;
  pointsAward1?: number;
  AwardName2?: string;
  hoursAward2?: number;
  pointsAward2?: number;
  AwardName3?: string;
  hoursAward3?: number;
  pointsAward3?: number;
  totalhours?: number;
  startDate?: string;  // ISO date string, e.g., "2025-08-01"
  endDate?: string;    // ISO date string
}

export interface Organization_Old {
  id: string;
  created_at: number;
  name: string;
  logo: string; // JSON stringified file object
  mainColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  quaternaryColor: string;
  acceptanceInstructions: string;
  externalId: string;
  carruselTexts: string; // likely stringified array
  description: string;
  osgradingsystem_id: number;
  website: string;
  objectives: string;
  Goals: string;
  PartnershipStartDate: string; // ideally ISO date
  Pointofcontactphone: string | number;
  contactemail: string;
  Address: string;
  acronym: string;
  legalFiles: string; // JSON stringified array of files
  Pointofcontactname: string;
}

export interface Group_Old{
  id: number;
  created_at: number;
  name: string;
  duration: number;
  objective: string;
  program_date: string; // ISO format
  organization_id: string;
  os_generalstatus_id: number;
  school_id: string;
  psychometricFrequency: string;
  firstGoalScore: number | null;
  secondGoalScore: number | null;
  questionnaire_id: string;
  registration: string;
  registrationToken: string;
  testFile: string;
  periodicity: "Year" | "Semester" | string;
}

export interface Location_Old {
  id: string;
  created_at: number;
  name: string;
  loacation: string; // spelling kept as in CSV
  contactPerson: string;
  contactPhone: string | number;
  contactEmail: string;
  organization_id: string;
  osgradingsystem_id: number;
  creation_date: string; // ISO format
}

export interface Feedback_Old {
  id: number; 
  created_at: number;
  user_id: string;
  feedback: string;
  useractivity_id: number;
  date: string;
  resolved: string;
  file?: string;
}
