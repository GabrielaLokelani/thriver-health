import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const MentorProfile: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your mentor profile and preferences</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                <UserCircleIcon className="h-20 w-20 text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Dr. Emily Chen</h3>
              <p className="text-sm text-gray-500">Mentor</p>
            </div>
          </div>

          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  defaultValue="Emily"
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  defaultValue="Chen"
                  className="input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue="emily.chen@example.com"
                className="input"
              />
            </div>

            <div>
              <label htmlFor="bio" className="label">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                defaultValue="Experienced mentor with expertise in software development and career guidance. Passionate about helping students achieve their goals."
                className="input"
              />
            </div>

            <div>
              <label htmlFor="expertise" className="label">
                Areas of Expertise
              </label>
              <input
                type="text"
                id="expertise"
                name="expertise"
                defaultValue="Software Development, Career Planning, Technical Skills"
                className="input"
              />
            </div>

            <div>
              <label htmlFor="availability" className="label">
                Availability
              </label>
              <textarea
                id="availability"
                name="availability"
                rows={3}
                defaultValue="Available for meetings Monday-Friday, 9:00 AM - 5:00 PM EST. Preferred meeting duration: 30-60 minutes."
                className="input"
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile; 