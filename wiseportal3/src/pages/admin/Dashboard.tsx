import React from 'react';
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface Stat {
  name: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const AdminDashboard: React.FC = () => {
  const stats: Stat[] = [
    { name: 'Total Users', value: '2,567', icon: UserGroupIcon },
    { name: 'Organizations', value: '45', icon: BuildingOfficeIcon },
    { name: 'Schools', value: '89', icon: AcademicCapIcon },
    { name: 'Active Programs', value: '12', icon: ChartBarIcon },
    { name: 'System Alerts', value: '3', icon: BellIcon },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Overview</h1>
        <p className="text-gray-600 font-light">Monitor and manage the entire platform from here.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-primary-600" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">System Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Cog6ToothIcon className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">API Status</p>
                <p className="text-sm text-gray-500">All services operational</p>
              </div>
            </div>
            <span className="text-sm text-green-600">Healthy</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">System Load</p>
                <p className="text-sm text-gray-500">45% CPU, 60% Memory</p>
              </div>
            </div>
            <span className="text-sm text-green-600">Normal</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BellIcon className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Recent Alerts</p>
                <p className="text-sm text-gray-500">3 new alerts in the last 24 hours</p>
              </div>
            </div>
            <span className="text-sm text-yellow-600">Attention</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 