import { Pillar, UserActivity } from '@/types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUsers, FaStar, FaClipboardList, FaMedal, FaPuzzlePiece } from 'react-icons/fa';

interface PillarCardProps extends Pillar {
    activities: UserActivity[];
}

const colorPalette = [
  '#4169e1', // Royal Blue
  '#e67e22', // Carrot
  '#16a085', // Greenish
  '#8e44ad', // Purple
  '#e74c3c', // Red
  '#f1c40f', // Yellow
  '#2ecc71', // Emerald
  '#2980b9', // Belize Hole
];
const iconMap = {
  'academic': FaBook,
  'academics': FaBook,
  'extracurricular': FaUsers,
  'extracurricular activities': FaUsers,
  'social': FaUsers,
  'non-formal': FaPuzzlePiece,
  'references': FaClipboardList,
  'exit essay': FaClipboardList,
  'essay': FaClipboardList,
  'default': FaStar,
};
const encouragements = [
  'Keep going!',
  'Almost there!',
  'Great work!',
  'You’re doing awesome!',
  'Stay motivated!',
  'Keep up the momentum!',
];

export const PillarCard: React.FC<PillarCardProps> = ({activities, ...pillar}) => {
    const [animatedPoints, setAnimatedPoints] = useState(0);
    const defaultColor = colorPalette[(pillar.id?.charCodeAt(0) ?? 0) % colorPalette.length];
    const color = pillar.color || defaultColor;
    // Pick icon based on pillar name
    const nameKey = (pillar.name || '').toLowerCase();
    const Icon = Object.entries(iconMap).find(([key]) => nameKey.includes(key))?.[1] || iconMap['default'];
    // Calculate current points and max points
    const currentPoints = Math.min(activities.reduce((sum, activity) => sum += (activity.approvedPoints ?? 0), 0), pillar.maxPoints ?? 7.5);
    const maxPoints = pillar.maxPoints ?? 7.5;
    // Calculate hours logged for the year
    const hours = activities.reduce((sum, activity) => sum + (activity.hours ?? 0), 0);
    // Pick a random encouragement
    const encouragement = encouragements[(pillar.id?.charCodeAt(0) ?? 0) % encouragements.length];

    const navigate = useNavigate();

    // Load points
    useEffect(() => {
        setAnimatedPoints(currentPoints);
    }, [currentPoints]);


    return (
        <div 
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 transform`}
        style={{ 
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            border: `1px solid ${color}20`
        }}
        >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
            <div 
            className={`absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-10 transition-all duration-1000`}
            style={{ 
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                top: '-20%',
                right: '-20%'
            }}
            />
            <div 
            className={`absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-10 transition-all duration-1000`}
            style={{ 
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                bottom: '-10%',
                left: '-10%'
            }}
            />
        </div>

        {/* Pillar icon, name, and number of points */}
        <div className="relative p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                {/* Icon and Name */}
                <div className="flex items-center space-x-3">
                    <div 
                      className="p-2 sm:p-3 rounded-xl transition-all duration-500 shadow-lg"
                      style={{ background: color, boxShadow: `0 4px 15px ${color}30` }}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{pillar.name}</h3>
                </div>
                {/* Points For Pillar */}
                <div 
                    className={`relative w-[60px] h-[60px] sm:w-20 sm:h-20 flex-shrink-0 transition-transform duration-500`}
                >
                    <div className="absolute inset-0 rounded-full" style={{ background: `${color}15` }} />
                        {
                            maxPoints &&
                            <div 
                                className="absolute inset-0 rounded-full transition-all duration-1000"
                                style={{ 
                                    background: `conic-gradient(${color} ${animatedPoints * (360 / maxPoints)}deg, transparent ${animatedPoints * (360/maxPoints)}deg)`,
                                    transition: 'transform 20s linear'
                                }}
                            />
                        }
                        <div className="absolute inset-1 sm:inset-1.5 rounded-full bg-white flex items-center justify-center shadow-inner">
                        <div className="text-center">
                            <span className="text-lg sm:text-2xl font-bold" style={{ color }}>{currentPoints.toFixed(1)}<span className="text-xs text-gray-500"> / {maxPoints}</span></span>
                            <span className="text-[8px] sm:text-xs text-gray-500 block mt-[-2px] sm:mt-0">points</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
            {/* Progress Bar */}
            {
                maxPoints &&
                <div className="h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                        width: `${(animatedPoints / maxPoints) * 100}%`,
                        background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`
                    }}
                    />
                </div>
            }
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-sm text-gray-500">Total Activities</span>
                        <span className="text-[10px] sm:text-sm font-medium text-gray-900">{activities.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-sm text-gray-500">Pending</span>
                        <span className="text-[10px] sm:text-sm font-medium text-yellow-600">{activities.filter(activity => activity.status === 'submitted').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-sm text-gray-500">Hours Logged</span>
                        <span className="text-[10px] sm:text-sm font-medium text-blue-600">{hours.toFixed(1)}</span>
                    </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-sm text-gray-500">Approved</span>
                        <span className="text-[10px] sm:text-sm font-medium text-green-600">{activities.filter(activity => activity.status === 'accepted').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-sm text-gray-500">Feedback</span>
                        <span className="text-[10px] sm:text-sm font-medium text-gray-900">{activities.filter(activity => activity.status === 'rejected').length}</span>
                    </div>
                </div>
            </div>
            {/* Encouragement */}
            <div className="mt-2 text-sm font-semibold text-gray-700 text-center">{encouragement}</div>
            <button
                onClick={() => {
                    navigate(`/student/activities?category=${pillar.id}`)
                }}
                className={`w-full py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-white text-sm sm:text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                style={{ 
                background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
                boxShadow: `0 4px 15px ${color}30`
                }}
            >
                View All Activities
            </button>
            </div>
        </div>
        </div>
    );
    };
  