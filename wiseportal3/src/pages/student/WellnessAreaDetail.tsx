import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { wellnessAreas, WellnessArea } from '../../types/wellness';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const WellnessAreaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [area, setArea] = useState<WellnessArea | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem(`wellness_${id}`);
    const foundArea = wellnessAreas.find(a => a.id === id);
    
    if (foundArea) {
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        setArea({ ...foundArea, ...parsedProgress });
      } else {
        setArea(foundArea);
      }
      setIsLoading(false);
    } else {
      setError('Wellness area not found');
      setIsLoading(false);
      setTimeout(() => navigate('/student/heal/wheel'), 2000);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (area) {
      // Calculate progress
      const totalItems = area.goals.length + area.resources.length + area.milestones.length;
      const completedItems = [
        ...area.goals.filter(g => g.completed),
        ...area.resources.filter(r => r.completed),
        ...area.milestones.filter(m => m.completed)
      ].length;
      setProgress((completedItems / totalItems) * 100);
      
      // Save progress to localStorage
      localStorage.setItem(`wellness_${id}`, JSON.stringify({
        goals: area.goals,
        resources: area.resources,
        milestones: area.milestones
      }));
    }
  }, [area, id]);

  const toggleGoal = (index: number) => {
    if (!area) return;
    const updatedGoals = [...area.goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    setArea({ ...area, goals: updatedGoals });
  };

  const toggleResource = (index: number) => {
    if (!area) return;
    const updatedResources = [...area.resources];
    updatedResources[index].completed = !updatedResources[index].completed;
    setArea({ ...area, resources: updatedResources });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <p className="text-sm text-red-600 mt-2">Redirecting to wellness wheel...</p>
        </div>
      </div>
    );
  }

  if (!area) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate('/student/heal/wheel')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Wellness Wheel
      </button>

      <div className={`p-8 rounded-lg shadow-lg ${area.color} transition-all duration-300`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="text-6xl mr-4">{area.emoji}</span>
            <h1 className="text-3xl font-bold">{area.name}</h1>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{Math.round(progress)}%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">{area.description}</p>

          {area.dailyChallenge && (
            <div className="mb-8 p-4 bg-white rounded-lg shadow transform hover:scale-[1.02] transition-transform">
              <h3 className="text-xl font-semibold mb-2">Today's Challenge</h3>
              <p className="text-gray-700">{area.dailyChallenge.text}</p>
              <div className="mt-2 text-sm text-gray-500">
                Points: {area.dailyChallenge.points}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Goals</h2>
              <ul className="space-y-2">
                {area.goals.map((goal, index) => (
                  <li key={index} className="flex items-center group">
                    <button
                      onClick={() => toggleGoal(index)}
                      className="mr-3 transition-transform hover:scale-110"
                      title={goal.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {goal.completed ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircleIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-600" />
                      )}
                    </button>
                    <span className={`transition-colors ${goal.completed ? 'line-through text-gray-500' : 'group-hover:text-gray-700'}`}>
                      {goal.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Resources</h2>
              <ul className="space-y-4">
                {area.resources.map((resource, index) => (
                  <li key={index} className="flex items-start group">
                    <button
                      onClick={() => toggleResource(index)}
                      className="mr-3 mt-1 transition-transform hover:scale-110"
                      title={resource.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {resource.completed ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircleIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-600" />
                      )}
                    </button>
                    <div>
                      <h3 className={`font-medium ${resource.completed ? 'line-through text-gray-500' : 'group-hover:text-gray-700'}`}>
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        View {resource.type}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Milestones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {area.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    milestone.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{milestone.badge}</span>
                    <h3 className="font-medium">{milestone.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessAreaDetail; 