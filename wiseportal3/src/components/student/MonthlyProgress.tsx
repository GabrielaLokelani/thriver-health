import { Pillar, UserActivity } from '@/types';
import { CheckCircleIcon, ClockIcon, } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';  

interface MonthlyProgressProps {
  activities: UserActivity[];
  pillars: Pillar[];
  numMonths: number;
}

export const MonthlyProgress: React.FC<MonthlyProgressProps> = ({ activities=[], pillars=[], numMonths }) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [points, setPoints] = useState<number>(0);
  const [maxPoints, setMaxPoints] = useState<number>(1);

  // Load points and max points
  useEffect(() => {
    setPoints(activities.reduce((sum, activity) => sum + (activity.approvedPoints ?? 0), 0));    
  }, [activities]);

  useEffect(() => {
    // Total maxpoints for each pillar of the period, divided by number of months in the period
    setMaxPoints(pillars.reduce((sum, pillar) => sum + (pillar.maxPoints ?? 0), 0) / numMonths)
  }, [pillars])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6 transition-all duration-300">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Monthly Progress - {currentMonth}</h2>
      <div className="space-y-2 sm:space-y-4">
        <div className="flex items-center justify-end">
          <span className="text-xs sm:text-sm font-medium text-primary-600">{points.toFixed(1)} / {maxPoints.toFixed(1)}</span>
        </div>
        <div className="w-full h-1.5 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-500 rounded-full transition-all duration-500"
            style={{
              width: maxPoints > 0
                ? `${Math.min((points / maxPoints) * 100, 100)}%`
                : '0%'
            }}
          />
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-4 text-xs sm:text-sm">
          <span className="inline-flex items-center text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {activities.filter((activity) => activity?.status === 'accepted').length} Approved
          </span>
          <span className="inline-flex items-center text-yellow-600 bg-yellow-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {activities.filter((activity) => activity?.status === 'submitted').length} Pending
          </span>
          {/* <span className="inline-flex items-center text-gray-600 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <DocumentIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            8 Documents
          </span> */}
        </div>
      </div>
    </div>
  );
};
