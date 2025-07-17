import { Menu, Transition } from '@headlessui/react';
import {
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { signOut } from 'aws-amplify/auth';
import UserAvatar from '../common/UserAvatar';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const { user, logout, setUser } = useUser();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    return path.charAt(0).toUpperCase() + path.slice(1) || 'Dashboard';
  };

  const handleRoleSwitch = (role: 'participant' | 'ssa' | 'admin' | 'mentor') => {
    setUser({
      sub: '1',
      role,
      givenName: user?.givenName,
      familyName: user?.familyName,
      email: user?.email,
    });
    navigate(`/${getRoute(role)}`)
  };

  function getRoute(role?: string) {
    switch (role) {
      case 'participant':
        return 'student';
      case 'ssa':
        return 'ssa';
      case 'admin':
        return 'admin';
      case 'mentor':
        return 'mentor';
      default:
        return 'login';
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-900 tracking-tight">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            type="button"
            className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </button>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
              <UserAvatar givenName={user?.givenName} familyName={user?.familyName} />
              <span className="sr-only">Open user menu</span>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 tracking-tight">{user?.givenName} {user?.familyName}</p>
                  <p className="text-xs text-gray-500 font-light">{user?.email}</p>
                </div>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate(`/${getRoute(user?.role)}/profile`)}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block w-full px-4 py-2 text-left text-sm font-medium`}
                    >
                      Your Profile
                    </button>
                  )}
                </Menu.Item>

                <div className="px-4 py-2 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">View as</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleRoleSwitch('participant')}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                        user?.role === 'participant' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <AcademicCapIcon className="mr-3 h-5 w-5 text-gray-400" />
                      Student
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('mentor')}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                        user?.role === 'mentor' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <UserPlusIcon className="mr-3 h-5 w-5 text-gray-400" />
                      Mentor
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('ssa')}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                        user?.role === 'ssa' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <UserGroupIcon className="mr-3 h-5 w-5 text-gray-400" />
                      SSA
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('admin')}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                        user?.role === 'admin' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ShieldCheckIcon className="mr-3 h-5 w-5 text-gray-400" />
                      Admin
                    </button>
                  </div>
                </div>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        signOut();
                        logout();
                      }}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } flex w-full items-center px-4 py-2 text-sm font-medium`}
                    >
                      <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header; 