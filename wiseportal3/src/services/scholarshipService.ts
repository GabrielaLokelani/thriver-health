import { Scholarship, ActivityLog, Document } from '../types/scholarship';

// Mock data for development
const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Technology Excellence Scholarship',
    organization: 'WISE Foundation',
    description: 'Scholarship for outstanding technology students',
    amount: 10000,
    deadline: '2024-12-31',
    status: 'active',
    requirements: [
      'Minimum GPA of 3.5',
      'Major in Computer Science or related field',
      'Demonstrated leadership experience'
    ]
  }
];

const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    studentId: '1',
    type: 'academic',
    title: 'First Semester Excellence',
    description: 'Achieved Dean\'s List in first semester',
    date: '2024-01-15',
    points: 50,
    status: 'pending',
    attachments: []
  }
];

const mockDocuments: Document[] = [
  {
    id: '1',
    studentId: '1',
    name: 'Transcript.pdf',
    type: 'transcript',
    uploadDate: '2024-01-10',
    status: 'approved',
    url: '/documents/transcript.pdf'
  }
];

export const scholarshipService = {
  // Scholarship Methods
  getScholarships: async (): Promise<Scholarship[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockScholarships), 500);
    });
  },

  getScholarshipById: async (id: string): Promise<Scholarship | null> => {
    const scholarship = mockScholarships.find(s => s.id === id);
    return new Promise((resolve) => {
      setTimeout(() => resolve(scholarship || null), 500);
    });
  },

  // Activity Log Methods
  getActivityLogs: async (studentId: string): Promise<ActivityLog[]> => {
    const logs = mockActivityLogs.filter(log => log.studentId === studentId);
    return new Promise((resolve) => {
      setTimeout(() => resolve(logs), 500);
    });
  },

  createActivityLog: async (log: Omit<ActivityLog, 'id'>): Promise<ActivityLog> => {
    const newLog: ActivityLog = {
      ...log,
      id: Date.now().toString()
    };
    mockActivityLogs.push(newLog);
    return new Promise((resolve) => {
      setTimeout(() => resolve(newLog), 500);
    });
  },

  updateActivityLog: async (id: string, updates: Partial<ActivityLog>): Promise<ActivityLog | null> => {
    const index = mockActivityLogs.findIndex(log => log.id === id);
    if (index === -1) return null;

    mockActivityLogs[index] = {
      ...mockActivityLogs[index],
      ...updates
    };

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockActivityLogs[index]), 500);
    });
  },

  // Document Methods
  getDocuments: async (studentId: string): Promise<Document[]> => {
    const docs = mockDocuments.filter(doc => doc.studentId === studentId);
    return new Promise((resolve) => {
      setTimeout(() => resolve(docs), 500);
    });
  },

  uploadDocument: async (doc: Omit<Document, 'id' | 'uploadDate' | 'status'>): Promise<Document> => {
    const newDoc: Document = {
      ...doc,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString(),
      status: 'pending'
    };
    mockDocuments.push(newDoc);
    return new Promise((resolve) => {
      setTimeout(() => resolve(newDoc), 500);
    });
  },

  updateDocument: async (id: string, updates: Partial<Document>): Promise<Document | null> => {
    const index = mockDocuments.findIndex(doc => doc.id === id);
    if (index === -1) return null;

    mockDocuments[index] = {
      ...mockDocuments[index],
      ...updates
    };

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDocuments[index]), 500);
    });
  }
}; 