import {
  AcademicCapIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  DocumentTextIcon,
  FlagIcon,
  StarIcon,
  UserGroupIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  streak: number;
  averageScore: number;
  completionRate: number;
  recentChallenges: {
    id: string;
    title: string;
    type: 'marked' | 'reflection' | 'hands-on';
    status: 'completed' | 'in_progress' | 'not_started';
    score?: number;
    submittedAt?: string;
  }[];
}

interface Challenge {
  id: string;
  title: string;
  type: 'marked' | 'reflection' | 'hands-on';
  intelligence: string;
  student: {
    id: string;
    name: string;
  };
  submission: {
    text: string;
    files: File[];
    status: 'draft' | 'submitted';
    submittedAt: string;
  };
  status: 'pending_review' | 'approved' | 'rejected';
  flagged: boolean;
  score?: number;
  feedback?: string;
}

const ChallengeOfTheWeek: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'review' | 'progress'>('review');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewScore, setReviewScore] = useState<number | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [isFlagged, setIsFlagged] = useState(false);

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      streak: 3,
      averageScore: 85,
      completionRate: 90,
      recentChallenges: [
        {
          id: 'c1',
          title: 'Logical Problem Solving',
          type: 'marked',
          status: 'completed',
          score: 90,
          submittedAt: '2024-02-19'
        },
        {
          id: 'c2',
          title: 'Creative Writing Reflection',
          type: 'reflection',
          status: 'completed',
          submittedAt: '2024-02-18'
        }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      streak: 5,
      averageScore: 92,
      completionRate: 100,
      recentChallenges: [
        {
          id: 'c3',
          title: 'Group Project: Environmental Impact',
          type: 'hands-on',
          status: 'completed',
          submittedAt: '2024-02-19'
        }
      ]
    }
  ]);

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Logical Problem Solving',
      type: 'marked',
      intelligence: 'Logical-Mathematical',
      student: {
        id: '1',
        name: 'John Doe'
      },
      submission: {
        text: 'I solved the logical puzzles by breaking them down into smaller parts...',
        files: [],
        status: 'submitted',
        submittedAt: '2024-02-19T10:30:00'
      },
      status: 'pending_review',
      flagged: false
    },
    {
      id: '2',
      title: 'Creative Writing Reflection',
      type: 'reflection',
      intelligence: 'Linguistic',
      student: {
        id: '1',
        name: 'John Doe'
      },
      submission: {
        text: 'In my reflection on personal growth...',
        files: [],
        status: 'submitted',
        submittedAt: '2024-02-18T15:45:00'
      },
      status: 'pending_review',
      flagged: true
    }
  ]);

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleReviewChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowReviewModal(true);
  };

  const handleApproveChallenge = () => {
    if (selectedChallenge) {
      setSelectedChallenge({
        ...selectedChallenge,
        status: 'approved',
        score: reviewScore || undefined,
        feedback: reviewFeedback
      });
      setShowReviewModal(false);
      setReviewScore(null);
      setReviewFeedback('');
    }
  };

  const handleRejectChallenge = () => {
    if (selectedChallenge) {
      setSelectedChallenge({
        ...selectedChallenge,
        status: 'rejected',
        feedback: reviewFeedback
      });
      setShowReviewModal(false);
      setReviewFeedback('');
    }
  };

  const handleFlagChallenge = () => {
    if (selectedChallenge) {
      setSelectedChallenge({
        ...selectedChallenge,
        flagged: !selectedChallenge.flagged
      });
      setIsFlagged(!isFlagged);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Challenge of the Week Review</h1>
              <p className="mt-1 text-sm text-gray-500">Review and monitor student progress</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <UserGroupIcon className="h-6 w-6 text-blue-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Active Students: {students.length}</span>
              </div>
              <div className="flex items-center">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Pending Reviews: {challenges.filter(c => c.status === 'pending_review').length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('review')}
                className={`${
                  activeTab === 'review'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Review Challenges
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`${
                  activeTab === 'progress'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Monitor Progress
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'review' ? (
          <div className="grid grid-cols-1 gap-6">
            {challenges
              .filter(challenge => challenge.status === 'pending_review')
              .map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-6 w-6 text-blue-500" />
                        <span className="ml-2 text-sm font-medium text-gray-900">{challenge.intelligence}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          challenge.type === 'marked' ? 'bg-blue-100 text-blue-800' :
                          challenge.type === 'reflection' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {challenge.type}
                        </span>
                        {challenge.flagged && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            Flagged
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{challenge.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <UserGroupIcon className="h-4 w-4 mr-1" />
                      {challenge.student.name}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Submitted: {new Date(challenge.submission.submittedAt).toLocaleString()}
                      </div>
                      <button
                        onClick={() => handleReviewChallenge(challenge)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Review Submission
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <UserGroupIcon className="h-6 w-6 text-blue-500" />
                      <span className="ml-2 text-sm font-medium text-gray-900">{student.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <span className="ml-2 text-sm font-medium text-gray-900">{student.streak} week streak</span>
                      </div>
                      <div className="flex items-center">
                        <ChartBarIcon className="h-5 w-5 text-green-500" />
                        <span className="ml-2 text-sm font-medium text-gray-900">{student.averageScore}% average</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500">Completion Rate</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">{student.completionRate}%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500">Recent Challenges</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">{student.recentChallenges.length}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500">Last Submission</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">
                        {new Date(student.recentChallenges[0]?.submittedAt || '').toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleViewStudent(student)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Progress Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Student Progress</h2>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Challenges</h3>
                  <div className="space-y-4">
                    {selectedStudent.recentChallenges.map((challenge) => (
                      <div key={challenge.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{challenge.title}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            challenge.status === 'completed' ? 'bg-green-100 text-green-800' :
                            challenge.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {challenge.status}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          Submitted: {new Date(challenge.submittedAt || '').toLocaleString()}
                        </div>
                        {challenge.score && (
                          <div className="mt-2 flex items-center text-sm">
                            <ChartBarIcon className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-gray-900">Score: {challenge.score}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500">Current Streak</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">{selectedStudent.streak} weeks</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500">Average Score</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">{selectedStudent.averageScore}%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500">Completion Rate</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">{selectedStudent.completionRate}%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-500">Total Challenges</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">{selectedStudent.recentChallenges.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedChallenge && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Review Challenge</h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedChallenge.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    {selectedChallenge.student.name}
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{selectedChallenge.submission.text}</p>
                  </div>
                  {selectedChallenge.submission.files.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                      <div className="space-y-2">
                        {selectedChallenge.submission.files.map((file, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-500">
                            <DocumentTextIcon className="h-4 w-4 mr-2" />
                            {file.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {selectedChallenge.type === 'marked' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Score</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={reviewScore || ''}
                      onChange={(e) => setReviewScore(Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter score (0-100)"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Feedback</label>
                  <textarea
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter feedback..."
                  />
                </div>
                <div className="flex items-center">
                  <button
                    onClick={handleFlagChallenge}
                    className={`inline-flex items-center px-4 py-2 border ${
                      isFlagged ? 'border-red-300 text-red-700 bg-red-50' : 'border-gray-300 text-gray-700 bg-white'
                    } rounded-md shadow-sm text-sm font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                  >
                    <FlagIcon className="h-4 w-4 mr-2" />
                    {isFlagged ? 'Flagged for Review' : 'Flag for Review'}
                  </button>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleRejectChallenge}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <XCircleIcon className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                  <button
                    onClick={handleApproveChallenge}
                    disabled={selectedChallenge.type === 'marked' && !reviewScore}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeOfTheWeek; 