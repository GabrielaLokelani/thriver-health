export interface Scholarship {
  id: string;
  name: string;
  organization: string;
  description: string;
  amount: number;
  deadline: string;
  status: 'active' | 'inactive' | 'pending';
  requirements: string[];
}

export interface ActivityLog {
  id: string;
  studentId: string;
  type: 'academic' | 'extracurricular' | 'community' | 'other';
  title: string;
  description: string;
  date: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
  attachments: string[];
}

export interface Document {
  id: string;
  studentId: string;
  name: string;
  type: 'transcript' | 'recommendation' | 'certificate' | 'other';
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  url: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  school: string;
  major: string;
  graduationYear: number;
  gpa: number;
  totalPoints: number;
  scholarshipId: string;
  status: 'active' | 'inactive' | 'graduated';
} 