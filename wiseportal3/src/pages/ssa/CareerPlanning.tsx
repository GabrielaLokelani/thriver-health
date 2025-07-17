import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, StarIcon, ClipboardDocumentListIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const CareerPlanning: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const path = location.pathname;
    if (path.includes('interests')) return 'interests';
    if (path.includes('action-plan')) return 'action-plan';
    return 'search';
  });

  const tabs = [
    {
      name: 'Job Search',
      href: '/ssa/career-planning/search',
      icon: MagnifyingGlassIcon,
      current: activeTab === 'search',
      description: 'Explore and recommend career options to students'
    },
    {
      name: 'Career Interests',
      href: '/ssa/career-planning/interests',
      icon: StarIcon,
      current: activeTab === 'interests',
      description: 'View and manage student career interests'
    },
    {
      name: 'Action Plan',
      href: '/ssa/career-planning/action-plan',
      icon: ClipboardDocumentListIcon,
      current: activeTab === 'action-plan',
      description: 'Monitor and guide student career development'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Career Planning</h1>
          <p className="mt-1 text-sm text-gray-500">
            Support students in exploring careers, tracking interests, and planning their professional journey
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]">
              <option>All Students</option>
              <option>My Assigned Students</option>
              <option>By Program</option>
            </select>
          </div>
          <button className="btn-primary">
            Generate Reports
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name.toLowerCase().replace(' ', '-'));
                  navigate(tab.href);
                }}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    tab.current
                      ? 'border-[var(--wise-orange)] text-[var(--wise-orange)]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon
                  className={`
                    -ml-0.5 mr-2 h-5 w-5
                    ${tab.current ? 'text-[var(--wise-orange)]' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                  aria-hidden="true"
                />
                <div className="text-left">
                  <div>{tab.name}</div>
                  <div className="text-xs text-gray-500">{tab.description}</div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default CareerPlanning; 