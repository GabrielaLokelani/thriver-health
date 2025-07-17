import React from 'react';
import { WellnessArea } from '../../types/wellness';

interface WellnessAreaCardProps {
  area: WellnessArea;
  onSelect: (area: WellnessArea) => void;
}

const WellnessAreaCard: React.FC<WellnessAreaCardProps> = ({ area, onSelect }) => {
  const progress = Math.round(
    ((area.goals.filter(g => g.completed).length + 
      area.resources.filter(r => r.completed).length + 
      area.milestones.filter(m => m.completed).length) / 
      (area.goals.length + area.resources.length + area.milestones.length)) * 100
  );

  return (
    <div 
      className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${area.color}`}
      onClick={() => onSelect(area)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-4xl mr-3">{area.emoji}</span>
          <h3 className="text-xl font-semibold">{area.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{progress}%</div>
          <div className="text-xs text-gray-600">Progress</div>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{area.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Goals</h4>
          <ul className="list-disc list-inside text-sm">
            {area.goals.slice(0, 3).map((goal, index) => (
              <li key={index} className={goal.completed ? 'line-through text-gray-500' : ''}>
                {goal.text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Tips</h4>
          <ul className="list-disc list-inside text-sm">
            {area.tips.slice(0, 3).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
      {area.dailyChallenge && (
        <div className="mt-4 p-3 bg-white rounded-md shadow-sm">
          <h4 className="font-semibold text-sm mb-1">Today's Challenge</h4>
          <p className="text-sm text-gray-600">{area.dailyChallenge.text}</p>
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(area);
        }}
      >
        Learn More
      </button>
    </div>
  );
};

export default WellnessAreaCard; 