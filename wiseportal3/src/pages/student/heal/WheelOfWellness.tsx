import React from 'react';
import { wellnessAreas } from '../../../types/wellness';
import { useNavigate } from 'react-router-dom';

const WheelOfWellness: React.FC = () => {
  const navigate = useNavigate();

  const handleAreaClick = (areaId: string) => {
    navigate(`/student/heal/${areaId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--wise-blue-light)] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wheel of Wellness</h1>
          <p className="text-xl text-gray-600">
            Map your unique pillars of wellness and create a balanced, healthy life
          </p>
        </div>

        {/* How to Engage Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Engage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">1. Discover Your Wheel</h3>
              <p className="text-gray-600">
                Explore the eight dimensions of wellness and understand how they contribute to your overall well-being.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">2. Set Your Goals</h3>
              <p className="text-gray-600">
                Define specific goals for each wellness area and track your progress.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">3. Take Daily Actions</h3>
              <p className="text-gray-600">
                Complete daily challenges and build healthy habits in each area.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">4. Track Your Progress</h3>
              <p className="text-gray-600">
                Monitor your achievements and celebrate your milestones.
              </p>
            </div>
          </div>
        </div>

        {/* Wellness Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wellnessAreas.map((area) => (
            <div
              key={area.id}
              className={`${area.color} rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow`}
              onClick={() => handleAreaClick(area.id)}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{area.emoji}</span>
                <h3 className="text-xl font-semibold">{area.name}</h3>
              </div>
              <p className="text-gray-700">{area.description}</p>
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAreaClick(area.id);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WheelOfWellness; 