import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, TrophyIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  completed: boolean;
  duration: string;
  category: string;
  videoUrl?: string;
  deadline: string;
  tasks: string[];
}

const RiseChallenges: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Challenges', icon: SparklesIcon },
    { id: 'active', name: 'Active', icon: FireIcon },
    { id: 'completed', name: 'Completed', icon: TrophyIcon }
  ];

  // Featured WISE challenge with video
  const featuredChallenge = {
    id: 'jay-demerit',
    title: 'From Sunday League to World Cup: The Jay DeMerit Story',
    description: 'Discover the incredible journey of Jay DeMerit, who went from playing amateur soccer in Sunday leagues to representing the USA in the World Cup. His story of perseverance, determination, and never giving up on your dreams will inspire you to chase your own goals.',
    videoUrl: 'https://www.youtube.com/embed/54S3FYrABOY',
    category: 'Soccer',
    points: 100,
    deadline: '2024-04-30',
    tasks: [
      'Watch Jay DeMerit\'s inspiring story',
      'Write a reflection on what this story means to you',
      'Share one goal you want to achieve in soccer',
      'Create an action plan to work towards your goal'
    ]
  };

  // Dummy data for challenges
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Soccer Skills Development',
      description: 'Master essential soccer skills with our comprehensive training program. Watch tutorial videos and practice daily drills.',
      difficulty: 'Medium',
      points: 200,
      completed: false,
      duration: '4 weeks',
      category: 'sports',
      videoUrl: 'https://www.youtube.com/embed/4gsh7JPcO10',
      deadline: '2024-04-30',
      tasks: []
    },
    {
      id: '2',
      title: 'Youth Soccer Leadership',
      description: 'Develop leadership skills through soccer. Learn team management, communication, and motivation techniques.',
      difficulty: 'Hard',
      points: 300,
      completed: false,
      duration: '3 weeks',
      category: 'leadership',
      videoUrl: 'https://www.youtube.com/embed/RMiQSRNXAwI',
      deadline: '2024-04-30',
      tasks: []
    },
    {
      id: '3',
      title: 'Soccer Fitness Challenge',
      description: 'Improve your soccer-specific fitness with structured workouts and drills.',
      difficulty: 'Medium',
      points: 250,
      completed: false,
      duration: '2 weeks',
      category: 'fitness',
      videoUrl: 'https://www.youtube.com/embed/3DAWLIHC5Uo',
      deadline: '2024-04-30',
      tasks: []
    },
    {
      id: '4',
      title: 'WISE Innovation Project',
      description: 'Create an innovative solution to a real-world problem using STEM principles.',
      difficulty: 'Hard',
      points: 400,
      completed: false,
      duration: '4 weeks',
      category: 'stem',
      videoUrl: 'https://www.youtube.com/embed/GtSYAUn2I7I',
      deadline: '2024-04-30',
      tasks: []
    },
    {
      id: '5',
      title: 'Team Building Workshop',
      description: 'Lead a workshop that combines soccer drills with team-building exercises.',
      difficulty: 'Medium',
      points: 200,
      completed: false,
      duration: '1 week',
      category: 'leadership',
      deadline: '2024-04-30',
      tasks: []
    }
  ];

  const filteredChallenges = challenges.filter(challenge => {
    switch (selectedFilter) {
      case 'active':
        return !challenge.completed;
      case 'completed':
        return challenge.completed;
      default:
        return true;
    }
  });

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
    }
  };

  const openChallengeModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--wise-blue-light)] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/risexshine/risexshinelogo.png" 
              alt="Rise x Shine Logo" 
              className="h-20 w-auto"
            />
          </div>
          <p className="text-xl text-gray-600">Push your boundaries and achieve greatness</p>
        </div>

        {/* Featured WISE Challenge */}
        <div className="bg-white rounded-2xl shadow-xl border border-[var(--wise-orange)] p-8 mb-12">
          <h2 className="text-2xl font-bold text-[var(--wise-orange)] mb-6">Featured Challenge: Soccer Inspiration</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <iframe
                src={featuredChallenge.videoUrl}
                title={featuredChallenge.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">{featuredChallenge.title}</h3>
              <p className="text-gray-600">{featuredChallenge.description}</p>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Challenge Tasks:</h4>
                <ul className="list-disc list-inside space-y-2">
                  {featuredChallenge.tasks.map((task, index) => (
                    <li key={index} className="text-gray-600">{task}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Points:</span> {featuredChallenge.points}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Deadline:</span> {new Date(featuredChallenge.deadline).toLocaleDateString()}
                </div>
              </div>
              <button
                className="w-full bg-[var(--wise-orange)] text-white py-2 px-4 rounded-lg hover:bg-[var(--wise-orange-dark)] transition-colors"
                onClick={() => {/* Handle challenge acceptance */}}
              >
                Accept Challenge
              </button>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id as 'all' | 'active' | 'completed')}
                className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === category.id
                    ? 'bg-[var(--wise-orange)] text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-[var(--wise-orange-light)] hover:text-[var(--wise-orange)]'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-[var(--wise-orange)]">{challenge.points} points</span>
                    <span className="text-sm text-gray-500">• {challenge.duration}</span>
                  </div>
                  <button
                    onClick={() => openChallengeModal(challenge)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      challenge.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-[var(--wise-orange)] text-white hover:shadow-md hover:scale-105'
                    }`}
                  >
                    {challenge.completed ? 'View Details' : 'Start Challenge'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Challenge Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-lg bg-white rounded-2xl shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  {selectedChallenge?.title}
                </Dialog.Title>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {selectedChallenge?.videoUrl && (
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden mb-6">
                    <iframe
                      src={selectedChallenge.videoUrl}
                      title={selectedChallenge.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="mt-1 text-sm text-gray-600">{selectedChallenge?.description}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Duration</h4>
                    <p className="mt-1 text-sm text-gray-600">{selectedChallenge?.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Points</h4>
                    <p className="mt-1 text-sm text-[var(--wise-orange)]">{selectedChallenge?.points} points</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Difficulty</h4>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedChallenge ? getDifficultyColor(selectedChallenge.difficulty) : ''
                    }`}>
                      {selectedChallenge?.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  {!selectedChallenge?.completed && (
                    <button
                      className="px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange)] hover:shadow-lg transform transition-all duration-300 hover:scale-105"
                    >
                      Begin Challenge
                    </button>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Bottom Title Image */}
        <div className="flex justify-center mt-16 mb-16">
          <img 
            src="/images/risexshine/risexshinetitle.png" 
            alt="Rise x Shine Title" 
            className="w-auto h-[480px] opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default RiseChallenges; 