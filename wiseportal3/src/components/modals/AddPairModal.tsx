import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface AddPairModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pairData: any) => void;
}

const AddPairModal: React.FC<AddPairModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [pairData, setPairData] = useState({
    mentorId: '',
    menteeId: '',
    startDate: '',
    goals: '',
    meetingFrequency: 'weekly',
    duration: '6',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pairData);
    onClose();
  };

  // Sample data - in a real app, this would come from an API
  const sampleMentors = [
    { id: '1', name: 'Dr. Sarah Johnson' },
    { id: '2', name: 'Prof. Michael Chen' },
    { id: '3', name: 'Dr. Emily Rodriguez' },
  ];

  const sampleMentees = [
    { id: '1', name: 'Andrés Fernandez' },
    { id: '2', name: 'Maria Garcia' },
    { id: '3', name: 'John Smith' },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Add New Mentor-Mentee Pair
            </Dialog.Title>
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Mentor
              </label>
              <select
                value={pairData.mentorId}
                onChange={(e) => setPairData({ ...pairData, mentorId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                required
              >
                <option value="">Select a mentor</option>
                {sampleMentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Mentee
              </label>
              <select
                value={pairData.menteeId}
                onChange={(e) => setPairData({ ...pairData, menteeId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                required
              >
                <option value="">Select a mentee</option>
                {sampleMentees.map((mentee) => (
                  <option key={mentee.id} value={mentee.id}>
                    {mentee.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={pairData.startDate}
                onChange={(e) => setPairData({ ...pairData, startDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meeting Frequency
              </label>
              <select
                value={pairData.meetingFrequency}
                onChange={(e) => setPairData({ ...pairData, meetingFrequency: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                required
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Program Duration (months)
              </label>
              <select
                value={pairData.duration}
                onChange={(e) => setPairData({ ...pairData, duration: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                required
              >
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Goals and Expectations
              </label>
              <textarea
                value={pairData.goals}
                onChange={(e) => setPairData({ ...pairData, goals: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                placeholder="Enter the goals and expectations for this mentorship relationship"
                required
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
              >
                Create Pair
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddPairModal; 