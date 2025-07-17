import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

interface SidebarProps {
  onClose?: () => void;
  className?: string;
}

interface NavItem {
  name: string;
  href: string;
  emoji: string;
  subItems?: {
    name: string;
    href: string;
    emoji: string;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, className = '' }) => {
  const location = useLocation();
  const { user } = useUser();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const studentNavigation: NavItem[] = [
    { name: 'Dashboard', href: '/student/dashboard', emoji: '🏠' },
    {
      name: 'Challenge of the Week',
      href: '/student/challenge',
      emoji: '🏆',
      subItems: [
        {
          name: "This Week's Challenges",
          href: '/student/challenge-of-the-week/current',
          emoji: '🎯'
        },
        {
          name: 'All Completed Challenges',
          href: '/student/challenge-of-the-week/completed',
          emoji: '✅'
        },
        {
          name: 'Challenge Results',
          href: '/student/challenge-of-the-week/results',
          emoji: '📊'
        }
      ]
    },
    { name: 'Question of the Day', href: '/student/question-of-the-day', emoji: '❓' },
    { name: 'Mentorship', href: '/student/mentorship', emoji: '👥' },
    { name: 'Journal', href: '/student/journal', emoji: '📔' },
    { name: 'My Activities', href: '/student/activities', emoji: '🧩' },
    { name: 'Messages', href: '/student/messages', emoji: '💬' },
    { name: 'Profile', href: '/student/profile', emoji: '👤' },
    { name: 'Feedback', href: '/student/feedback', emoji: '📢' },
    { name: 'Documents', href: '/student/documents', emoji: '📄' },
    { name: 'Assessments', href: '/student/assessments', emoji: '📝' },
    { name: 'Goals', href: '/student/goals', emoji: '🎯' },
    {
      name: 'Career Planning',
      href: '/student/career',
      emoji: '💼',
      subItems: [
        {
          name: 'Job Search',
          href: '/student/career-planning/search',
          emoji: '🔍'
        },
        {
          name: 'Career Interests',
          href: '/student/career-planning/interests',
          emoji: '⭐'
        },
        {
          name: 'Action Plan',
          href: '/student/career-planning/action-plan',
          emoji: '📋'
        }
      ]
    },
    {
      name: 'Rise X Shine',
      href: '/student/rise',
      emoji: '⭐',
      subItems: [
        {
          name: 'Rise Mentorship',
          href: '/student/rise/mentorship',
          emoji: '🎓'
        },
        {
          name: 'Rise Challenges',
          href: '/student/rise/challenges',
          emoji: '🏆'
        },
        {
          name: 'Rise Rewards',
          href: '/student/rise/rewards',
          emoji: '🎁'
        }
      ]
    },
    {
      name: 'HEAL',
      href: '/student/heal',
      emoji: '💚',
      subItems: [
        {
          name: 'Wheel of Wellness',
          href: '/student/heal/wheel',
          emoji: '🎯'
        },
        {
          name: 'Physical Wellness',
          href: '/student/heal/physical',
          emoji: '💪'
        },
        {
          name: 'Emotional Wellness',
          href: '/student/heal/emotional',
          emoji: '😊'
        },
        {
          name: 'Mental Wellness',
          href: '/student/heal/mental',
          emoji: '🧠'
        },
        {
          name: 'Environmental Wellness',
          href: '/student/heal/environmental',
          emoji: '🌱'
        },
        {
          name: 'Medical Wellness',
          href: '/student/heal/medical',
          emoji: '🏥'
        },
        {
          name: 'Financial Wellness',
          href: '/student/heal/financial',
          emoji: '💰'
        },
        {
          name: 'Spiritual Wellness',
          href: '/student/heal/spiritual',
          emoji: '✨'
        },
        {
          name: 'Social Wellness',
          href: '/student/heal/social',
          emoji: '🤝'
        }
      ]
    },
    { name: 'Camila\'s Healthy Recipes', href: '/student/healthy-recipes', emoji: '🥗' },
    { name: 'Lyrics of Livin\'', href: '/student/lyrics-of-livin', emoji: '🎵' }
  ];

  const ssaNavigation: NavItem[] = [
    { name: 'Dashboard', href: '/ssa/dashboard', emoji: '🏠' },
    {
      name: 'Challenge of the Week',
      href: '/ssa/challenge',
      emoji: '🏆',
      subItems: [
        {
          name: "This Week's Challenges",
          href: '/ssa/challenge-of-the-week/current',
          emoji: '🎯'
        },
        {
          name: 'All Completed Challenges',
          href: '/ssa/challenge-of-the-week/completed',
          emoji: '✅'
        },
        {
          name: 'Challenge Results',
          href: '/ssa/challenge-of-the-week/results',
          emoji: '📊'
        }
      ]
    },
    { name: 'Mentorship', href: '/ssa/mentorship', emoji: '👥' },
    {
      name: 'Students',
      href: '/ssa/students',
      emoji: '👨‍🎓',
      subItems: [
        { name: 'All Students', href: '/ssa/students', emoji: '👥' }
      ],
    },
    { name: 'Activities', href: '/ssa/activities', emoji: '🎨' },
    { name: 'Registration', href: '/ssa/registration', emoji: '📝' },
    { name: 'Documents', href: '/ssa/documents', emoji: '📄' },
    { name: 'Reports', href: '/ssa/reports', emoji: '📊' },
    { name: 'Messages', href: '/ssa/messages', emoji: '💬' },
    { name: 'Profile', href: '/ssa/profile', emoji: '👤' },
    { name: 'Assessments', href: '/ssa/assessments', emoji: '📝' },
    { name: 'Goals', href: '/ssa/goals', emoji: '🎯' },
    {
      name: 'Career Planning',
      href: '/ssa/career',
      emoji: '💼',
      subItems: [
        {
          name: 'Job Search',
          href: '/ssa/career-planning/search',
          emoji: '🔍'
        },
        {
          name: 'Career Interests',
          href: '/ssa/career-planning/interests',
          emoji: '⭐'
        },
        {
          name: 'Action Plan',
          href: '/ssa/career-planning/action-plan',
          emoji: '📋'
        }
      ]
    },
    {
      name: 'Rise X Shine',
      href: '/ssa/rise',
      emoji: '⭐',
      subItems: [
        {
          name: 'Rise Mentorship',
          href: '/ssa/rise/mentorship',
          emoji: '🎓'
        },
        {
          name: 'Rise Challenges',
          href: '/ssa/rise/challenges',
          emoji: '🏆'
        },
        {
          name: 'Rise Rewards',
          href: '/ssa/rise/rewards',
          emoji: '🎁'
        }
      ]
    },
    { name: 'Camila\'s Healthy Recipes', href: '/ssa/healthy-recipes', emoji: '🥗' },
    { name: 'Lyrics of Livin\'', href: '/ssa/lyrics-of-livin', emoji: '🎵' },
  ];

  const adminNavigation: NavItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', emoji: '🏠' },
    {
      name: 'Challenge of the Week',
      href: '/admin/challenge',
      emoji: '🏆',
      subItems: [
        {
          name: "This Week's Challenges",
          href: '/admin/challenge-of-the-week/current',
          emoji: '🎯'
        },
        {
          name: 'All Completed Challenges',
          href: '/admin/challenge-of-the-week/completed',
          emoji: '✅'
        },
        {
          name: 'Challenge Results',
          href: '/admin/challenge-of-the-week/results',
          emoji: '📊'
        }
      ]
    },
    { name: 'Mentorship', href: '/admin/mentorship', emoji: '👥' },
    {
      name: 'Users',
      href: '/admin/users',
      emoji: '👥',
      subItems: [
        { name: 'All Users', href: '/admin/users', emoji: '👥' },
        { name: 'Review Students', href: '/admin/review-students', emoji: '📝' },
      ],
    },
    { name: 'Organizations', href: '/admin/organizations', emoji: '🏢' },
    { name: 'Schools', href: '/admin/schools', emoji: '🏫' },
    { name: 'Scholarships', href: '/admin/scholarships', emoji: '💰' },
    { name: 'Programs', href: '/admin/programs', emoji: '📚' },
    { name: 'Reports', href: '/admin/reports', emoji: '📊' },
    { name: 'Settings', href: '/admin/settings', emoji: '⚙️' },
    { name: 'Goals', href: '/admin/goals', emoji: '🎯' },
    {
      name: 'Career Planning',
      href: '/admin/career',
      emoji: '💼',
      subItems: [
        {
          name: 'Job Search',
          href: '/admin/career-planning/search',
          emoji: '🔍'
        },
        {
          name: 'Career Interests',
          href: '/admin/career-planning/interests',
          emoji: '⭐'
        },
        {
          name: 'Action Plan',
          href: '/admin/career-planning/action-plan',
          emoji: '📋'
        }
      ]
    },
    { name: 'Rise Mentorship', href: '/admin/rise-mentorship', emoji: '🎓' },
    { name: 'Camila\'s Healthy Recipes', href: '/admin/healthy-recipes', emoji: '🥗' },
    { name: 'Lyrics of Livin\'', href: '/admin/lyrics-of-livin', emoji: '🎵' },
    { name: 'Rise Challenges', href: '/admin/rise-challenges', emoji: '🏆' },
    { name: 'Rise Rewards Center', href: '/admin/rewards', emoji: '🎁' },
  ];

  const mentorNavigation: NavItem[] = [
    { name: 'Dashboard', href: '/mentor', emoji: '🏠' },
    { name: 'Meetings', href: '/mentor/meetings', emoji: '👥' },
    { name: 'Messages', href: '/mentor/messages', emoji: '💬' },
    { name: 'Profile', href: '/mentor/profile', emoji: '👤' }
  ];

  const getNavigation = () => {
    switch (user.role) {
      case 'participant':
        return studentNavigation;
      case 'ssa':
        return ssaNavigation;
      case 'admin':
        return adminNavigation;
      case 'mentor':
        return mentorNavigation;
      default:
        return [];
    }
  };

  const toggleExpand = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  const isActive = (href: string, subItems?: NavItem['subItems']) => {
    if (location.pathname === href) return true;
    if (subItems) {
      return subItems.some(subItem => location.pathname === subItem.href);
    }
    return false;
  };

  return (
    <div className={`flex flex-col h-full bg-[var(--wise-yellow-light)] border-r border-gray-200 ${className}`}>
      {/* Close button for mobile */}
      <div className="flex items-center justify-between p-4 lg:hidden">
        <span className="text-lg font-semibold text-gray-900">Menu</span>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {getNavigation().map((item) => {
          const active = isActive(item.href, item.subItems);
          return (
            <div key={item.name}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100/30 ${
                      active ? 'bg-[var(--wise-yellow)]' : ''
                    }`}
                  >
                    <span className="mr-3 text-xl">{item.emoji}</span>
                    <span className={active ? 'text-[var(--wise-orange)]' : 'text-gray-900'}>{item.name}</span>
                    <ChevronRightIcon
                      className={`ml-3 h-5 w-5 transform transition-transform duration-200 ${
                        expandedItem === item.name ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedItem === item.name && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => {
                        const subActive = location.pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={() => onClose?.()}
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100/30 ${
                              subActive ? 'bg-[var(--wise-yellow)]' : ''
                            }`}
                          >
                            <span className="mr-3 text-xl">{subItem.emoji}</span>
                            <span className={subActive ? 'text-[var(--wise-orange)]' : 'text-gray-900'}>{subItem.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => onClose?.()}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100/30 ${
                    active ? 'bg-[var(--wise-yellow)]' : ''
                  }`}
                >
                  <span className="mr-3 text-xl">{item.emoji}</span>
                  <span className={active ? 'text-[var(--wise-orange)]' : 'text-gray-900'}>{item.name}</span>
                </Link>
              )}
            </div>
          );
        })}

        <div className="text-center">
          <img 
            className="cursor-pointer" 
            onClick={() => window.open('https://thesteelefamilyfoundation.com/', '_blank')} 
            alt="Steele Family and WISE Logos" 
            src="/public/images/steele_wise_logo.avif" 
          />
          <span className="mt-4 text-gray-900">Proudly funded by the Steele Family Foundation</span>  
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 