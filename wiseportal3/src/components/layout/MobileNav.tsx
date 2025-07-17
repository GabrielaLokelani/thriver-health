import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const MobileNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/student/dashboard', icon: HomeIcon },
    { name: 'Mentorship', href: '/student/mentorship', icon: UserGroupIcon },
    { name: 'Journal', href: '/student/journal', icon: BookOpenIcon },
    { name: 'Messages', href: '/student/messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Schedule', href: '/student/schedule', icon: CalendarIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-[var(--wise-orange)]' : 'text-gray-500'
              }`}
            >
              <item.icon
                className={`h-6 w-6 ${
                  isActive ? 'text-[var(--wise-orange)]' : 'text-gray-400'
                }`}
              />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNav; 