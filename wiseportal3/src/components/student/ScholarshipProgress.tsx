// import ProgressBar from '@ramonak/react-progress-bar';
import { ChevronUpIcon } from '@heroicons/react/16/solid';
import React, { useState, useEffect } from 'react';
import UserAvatar from '../common/UserAvatar';

interface ScholarshipProgressProps {
  points: number;
  studentName: string;
  organizationName?: string;
  givenName?: string;
  familyName?: string;
}

const SegmentedProgressBar = ({ points, givenName, familyName }: { points: number, givenName?: string, familyName?: string }) => {
  // Segments for the full bar background
  const segments = [
    { range: [0, 70], color: 'bg-red-600' },
    { range: [70, 90], color: 'bg-yellow-400' },
    { range: [90, 100], color: 'bg-green-600' },
  ];

  // Calculate marker position (0-100 scale)
  const markerLeft = `${Math.min(Math.max(points, 0), 100)}%`;
  const getMarkerLeft = (val: number) => `calc(${val}% - 48px)`;

  return (
    <div className="relative w-full flex flex-col items-center" style={{ minHeight: 180 }}>
      {/* Bar at the top */}
      <div className="relative w-full h-8 rounded-full overflow-hidden bg-gray-200 border border-gray-300" style={{ zIndex: 1 }}>
        {/* Full segmented color bar as background */}
        <div className="absolute top-0 left-0 flex h-full w-full z-0">
          {segments.map(({ range, color }, index) => {
            const [from, to] = range;
            const widthPercent = to - from;
            return (
              <div
                key={index}
                className={`${color} h-full`}
                style={{ width: `${widthPercent}%` }}
                aria-hidden="true"
              />
            );
          })}
        </div>
        {/* Gray overlay for unearned points */}
        <div className="absolute top-0 left-0 h-full z-10 bg-gray-200 opacity-80" style={{ width: `${100 - Math.min(points, 100)}%`, left: `${Math.min(points, 100)}%` }} />
        {/* Tick Marks */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className={`absolute top-0 bottom-0 bg-gray-700 transition-opacity duration-300 ${i === 0 || i === 10 ? 'opacity-0' : 'opacity-60'}`}
              style={{ left: `${(i / 10) * 100}%`, width: '2px' }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      {/* Scholarship banners below the bar */}
      <div className="relative w-full flex justify-between mt-2" style={{ minHeight: 32 }}>
        <div style={{ position: 'absolute', left: getMarkerLeft(70), top: 0, zIndex: 10 }}>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-400 text-yellow-900 font-bold text-xs rounded px-3 py-1 shadow border border-yellow-600 whitespace-nowrap pointer-events-auto">
              <ChevronUpIcon fontSize={14} className="w-4 h-4 inline-block mb-0.5 mr-1 text-yellow-700" />
              Eligible for Scholarship!
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: getMarkerLeft(90), top: 0, zIndex: 10 }}>
          <div className="flex flex-col items-center">
            <div className="bg-green-500 text-white font-bold text-xs rounded px-3 py-1 shadow border border-green-700 whitespace-nowrap pointer-events-auto">
              <ChevronUpIcon fontSize={14} className="w-4 h-4 inline-block mb-0.5 mr-1 text-white" />
              Eligible for Full
            </div>
          </div>
        </div>
      </div>
      {/* Scale numbers below banners */}
      <div className="relative w-full mt-8" style={{ minHeight: 20 }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 text-xs font-extrabold text-gray-900"
            style={{ left: `${(i / 10) * 100}%`, top: 0 }}
          >
            {i * 10}
          </div>
        ))}
      </div>
      {/* Profile marker and label below scale, pointing up */}
      <div
        className="absolute flex flex-col items-center"
        style={{ left: `calc(${markerLeft} - 24px)`, top: 110 }}
        aria-label="Your current score"
      >
        <div className="relative">
          <UserAvatar givenName={givenName} familyName={familyName} size={48} />
          {/* Pointer triangle, pointing up */}
          <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-800" />
        </div>
        <div className="mt-2 text-xs font-bold text-white bg-gray-800 rounded-full px-3 py-1 shadow border border-gray-900">
          {points.toFixed(1)} pts
        </div>
      </div>
    </div>
  );
};

const ScholarshipProgress: React.FC<ScholarshipProgressProps> = ({ points, studentName, organizationName, givenName, familyName }) => {
  const [animatedPoints, setAnimatedPoints] = useState(0);

  useEffect(() => {
    // Animate points from 0 to current value
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = points / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= points) {
        setAnimatedPoints(points);
        clearInterval(timer);
      } else {
        setAnimatedPoints(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [points]);

  // Dynamic motivational message
  let message = '';
  if (points >= 90) {
    message = `Outstanding! You’ve earned ${points} points and qualify for a full ride scholarship through the ${organizationName || 'program'}. Amazing achievement—keep it up!`;
  } else if (points >= 70) {
    message = `Great work! With ${points} points earned, you’re eligible for a prorated scholarship through the ${organizationName || 'program'}. You’re on a strong path—keep pushing toward the full 100 points!`;
  } else {
    message = `You’re making progress! Keep going and aim for 100 points to unlock your scholarship. Every action you take moves you closer to your goal.`;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl transition-all duration-500 transform pr-4" style={{ background: 'linear-gradient(135deg, #fff 0%, #f3f4f6 100%)', border: '1px solid #e5e7eb' }}>
      <div className="relative p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 space-y-4 sm:space-y-0">
          {/* Progress Circle */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto sm:mx-0 flex-shrink-0 transition-transform duration-500">
            <div className="absolute inset-0 rounded-full bg-yellow-100 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-full transition-all duration-1000" style={{ background: `conic-gradient(#f59e42 ${animatedPoints * 3.6}deg, #e5e7eb ${animatedPoints * 3.6}deg)`, transition: 'transform 20s linear' }} />
            <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-inner">
              <div className="text-center transform transition-transform duration-500">
                <span className="text-4xl font-bold text-yellow-600">{(Math.round(animatedPoints * 10) / 10).toFixed(1)}</span>
                <span className="text-xs text-gray-700 block mt-1">points</span>
              </div>
            </div>
          </div>
          {/* Text Content */}
          <div className="flex-grow text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Hello {studentName}, Here’s Your Scholarship Progress
            </h2>
            <p className="text-gray-800 text-base mb-4 sm:mb-6 font-medium" style={{maxWidth:'700px'}}>{message}</p>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="relative mx-4 mb-12 mt-8">
          <SegmentedProgressBar points={points} givenName={givenName} familyName={familyName} />
        </div>
      </div>
    </div>
  );
};

export default ScholarshipProgress; 