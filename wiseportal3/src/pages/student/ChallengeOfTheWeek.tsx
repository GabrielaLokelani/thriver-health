import {
  AcademicCapIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  FireIcon,
  PhotoIcon,
  TrophyIcon,
  VideoCameraIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'marked' | 'reflection' | 'hands-on';
  intelligence: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'completed';
  submission?: {
    text: string;
    files: File[];
    status: 'draft' | 'submitted';
    score?: number;
    feedback?: string;
  };
  questions?: {
    id: string;
    type: 'multiple_choice' | 'multi_select' | 'true_false' | 'short_answer';
    question: string;
    options?: string[];
    correctAnswer: string | string[];
    explanation: string;
  }[];
}

const ChallengeOfTheWeek: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'completed'>('current');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionText, setSubmissionText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Logical Problem Solving',
      description: 'Solve a series of logical puzzles to enhance analytical thinking skills.',
      type: 'marked',
      intelligence: 'Logical-Mathematical',
      difficulty: 'intermediate',
      dueDate: '2024-02-20',
      status: 'not_started',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'If all A are B, and all B are C, then:',
          options: ['All A are C', 'Some A are C', 'No A are C', 'Cannot be determined'],
          correctAnswer: 'All A are C',
          explanation: 'This is a basic syllogism. If all members of set A are in set B, and all members of set B are in set C, then all members of set A must be in set C.'
        },
        {
          id: 'q2',
          type: 'true_false',
          question: 'In a sequence where each number is double the previous number, the 5th number will always be 16 times the first number.',
          correctAnswer: 'true',
          explanation: 'Starting with any number x, the sequence would be: x, 2x, 4x, 8x, 16x. Therefore, the 5th number is always 16 times the first number.'
        }
      ]
    },
    {
      id: '2',
      title: 'Creative Writing Reflection',
      description: 'Write a short story that incorporates elements of nature and personal growth.',
      type: 'reflection',
      intelligence: 'Linguistic',
      difficulty: 'beginner',
      dueDate: '2024-02-20',
      status: 'not_started'
    }
  ]);

  const handleStartChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    if (challenge.type === 'marked') {
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowResults(false);
      setQuizScore(0);
    } else {
      setShowSubmissionModal(true);
    }
  };

  const handleAnswerQuestion = (questionId: string, answer: string | string[]) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNextQuestion = () => {
    if (selectedChallenge?.questions && currentQuestionIndex < selectedChallenge.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!selectedChallenge?.questions) return;
    
    let correct = 0;
    selectedChallenge.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (Array.isArray(question.correctAnswer)) {
        if (Array.isArray(userAnswer) && 
            question.correctAnswer.length === userAnswer.length &&
            question.correctAnswer.every(a => userAnswer.includes(a))) {
          correct++;
        }
      } else if (userAnswer === question.correctAnswer) {
        correct++;
      }
    });

    const score = (correct / selectedChallenge.questions.length) * 100;
    setQuizScore(score);
  };

  const handleSubmitChallenge = () => {
    if (selectedChallenge) {
      setSelectedChallenge({
        ...selectedChallenge,
        status: 'completed',
        submission: {
          text: submissionText,
          files,
          status: 'submitted'
        }
      });
      setShowSubmissionModal(false);
      setSubmissionText('');
      setFiles([]);
    }
  };

  const currentQuestion = selectedChallenge?.questions?.[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Challenge of the Week</h1>
              <p className="mt-1 text-sm text-gray-500">Enhance your skills through weekly challenges</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FireIcon className="h-6 w-6 text-orange-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Current Streak: 3 weeks</span>
              </div>
              <div className="flex items-center">
                <TrophyIcon className="h-6 w-6 text-yellow-500" />
                <span className="ml-2 text-sm font-medium text-gray-900">Average Score: 85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('current')}
                className={`${
                  activeTab === 'current'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Current Challenges
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Completed Challenges
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6">
          {challenges
            .filter(challenge => 
              activeTab === 'current' 
                ? challenge.status !== 'completed'
                : challenge.status === 'completed'
            )
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
                        challenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        challenge.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        challenge.status === 'completed' ? 'bg-green-100 text-green-800' :
                        challenge.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {challenge.status === 'completed' ? 'Completed' :
                         challenge.status === 'in_progress' ? 'In Progress' :
                         'Not Started'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{challenge.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{challenge.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Due: {new Date(challenge.dueDate).toLocaleDateString()}
                    </div>
                    {challenge.status !== 'completed' && (
                      <button
                        onClick={() => handleStartChallenge(challenge)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {challenge.status === 'not_started' ? 'Start Challenge' : 'Continue'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quiz Modal */}
      {selectedChallenge?.type === 'marked' && selectedChallenge.questions && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {!showResults ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Question {currentQuestionIndex + 1} of {selectedChallenge.questions.length}
                    </h2>
                    <button
                      onClick={() => setSelectedChallenge(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg font-medium text-gray-900">{currentQuestion?.question}</p>
                    {currentQuestion?.type === 'multiple_choice' && (
                      <div className="space-y-2">
                        {currentQuestion.options?.map((option, index) => (
                          <label key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${currentQuestion.id}`}
                              value={option}
                              checked={answers[currentQuestion.id] === option}
                              onChange={(e) => handleAnswerQuestion(currentQuestion.id, e.target.value)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-3 text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {currentQuestion?.type === 'true_false' && (
                      <div className="space-y-2">
                        <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value="true"
                            checked={answers[currentQuestion.id] === 'true'}
                            onChange={(e) => handleAnswerQuestion(currentQuestion.id, e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-3 text-sm text-gray-700">True</span>
                        </label>
                        <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value="false"
                            checked={answers[currentQuestion.id] === 'false'}
                            onChange={(e) => handleAnswerQuestion(currentQuestion.id, e.target.value)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-3 text-sm text-gray-700">False</span>
                        </label>
                      </div>
                    )}
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={handleNextQuestion}
                        disabled={!answers[currentQuestion?.id || '']}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {currentQuestionIndex === selectedChallenge.questions.length - 1 ? 'Finish' : 'Next Question'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h2>
                    <div className="text-4xl font-bold text-blue-600 mb-4">{quizScore}%</div>
                    <p className="text-gray-500 mb-6">
                      {quizScore >= 70 ? 'Great job! You passed the quiz!' : 'Keep practicing! You can try again.'}
                    </p>
                    <div className="space-y-4">
                      {selectedChallenge.questions.map((question) => (
                        <div key={question.id} className="text-left p-4 border rounded-lg">
                          <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                          <div className="flex items-center">
                            {Array.isArray(question.correctAnswer) ? (
                              <span className="text-sm text-gray-500">
                                Correct answers: {question.correctAnswer.join(', ')}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-500">
                                Correct answer: {question.correctAnswer}
                              </span>
                            )}
                            <span className="ml-2">
                              {answers[question.id] === question.correctAnswer ? (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                              ) : (
                                <XCircleIcon className="h-5 w-5 text-red-500" />
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">{question.explanation}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setSelectedChallenge(null);
                          setShowResults(false);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {showSubmissionModal && selectedChallenge && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Submit Challenge</h2>
                <button
                  onClick={() => setShowSubmissionModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Response</label>
                  <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your response here..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attachments</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                      <DocumentTextIcon className="h-5 w-5 mr-2" />
                      Add Document
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    </label>
                    <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                      <PhotoIcon className="h-5 w-5 mr-2" />
                      Add Image
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                    <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                      <VideoCameraIcon className="h-5 w-5 mr-2" />
                      Add Video
                      <input type="file" className="hidden" accept="video/*" />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowSubmissionModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitChallenge}
                    className="btn-primary"
                  >
                    Submit Response
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