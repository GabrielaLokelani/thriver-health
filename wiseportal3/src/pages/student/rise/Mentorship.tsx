import React, { useState } from 'react';
// import { Dialog } from '@headlessui/react';
import { ChatBubbleLeftRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  videoUrl: string;
  thumbnail: string;
}

interface Message {
  id: string;
  sender: 'mentor' | 'student';
  content: string;
  timestamp: string;
}

const RiseMentorship: React.FC = () => {
  // const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mentor',
      content: 'Welcome to Rise Mentorship! I\'m excited to help you improve your soccer skills and share my experiences.',
      timestamp: '2024-03-20T10:00:00'
    }
  ]);

  const handleVideoClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          sender: 'student',
          content: newMessage,
          timestamp: new Date().toISOString()
        }
      ]);
      setNewMessage('');
    }
  };

  const tutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Basic Ball Control',
      description: 'Learn the fundamentals of ball control and dribbling techniques.',
      duration: '15 mins',
      difficulty: 'Beginner',
      category: 'Fundamentals',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      thumbnail: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781'
    },
    {
      id: '2',
      title: 'Passing Accuracy',
      description: 'Master the art of accurate passing and receiving the ball.',
      duration: '20 mins',
      difficulty: 'Beginner',
      category: 'Fundamentals',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      thumbnail: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781'
    },
    {
      id: '3',
      title: 'Shooting Techniques',
      description: 'Learn proper shooting form and power techniques.',
      duration: '25 mins',
      difficulty: 'Intermediate',
      category: 'Attacking',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      thumbnail: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781'
    },
    {
      id: '4',
      title: 'Defensive Positioning',
      description: 'Understand proper defensive positioning and tackling.',
      duration: '20 mins',
      difficulty: 'Intermediate',
      category: 'Defending',
      videoUrl: 'https://www.youtube.com/watch?v=example4',
      thumbnail: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781'
    },
    {
      id: '5',
      title: 'Advanced Dribbling',
      description: 'Learn advanced dribbling moves and feints.',
      duration: '30 mins',
      difficulty: 'Advanced',
      category: 'Skills',
      videoUrl: 'https://www.youtube.com/watch?v=example5',
      thumbnail: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781'
    }
  ];

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
          <p className="text-xl text-gray-600 mb-2">Learn from professional soccer players and connect with mentors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tutorials Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Soccer Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[var(--wise-orange)] text-white px-3 py-1 rounded-full text-sm">
                      {tutorial.difficulty}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{tutorial.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{tutorial.duration}</span>
                        <span className="text-sm text-gray-500">{tutorial.category}</span>
                      </div>
                      <button
                        onClick={() => handleVideoClick(tutorial.videoUrl)}
                        className="flex items-center text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)] transition-colors"
                      >
                        <PlayCircleIcon className="h-5 w-5 mr-1" />
                        <span className="text-sm">Watch Tutorial</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-[var(--wise-orange)] mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900">Chat with Mentor</h2>
              </div>
              
              <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'mentor' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'mentor'
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-[var(--wise-orange)] text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)]"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[var(--wise-orange)] text-white px-4 py-2 rounded-lg hover:bg-[var(--wise-orange-dark)] transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

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

export default RiseMentorship; 