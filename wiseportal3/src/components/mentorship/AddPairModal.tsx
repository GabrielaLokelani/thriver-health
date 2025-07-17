import React, { useState } from 'react';
import MobileModal from '../common/MobileModal';
import MobileInput from '../common/MobileInput';

interface AddPairModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pair: { mentorId: string; menteeId: string; startDate: string }) => void;
  mentors: { id: string; name: string }[];
  mentees: { id: string; name: string }[];
}

const AddPairModal: React.FC<AddPairModalProps> = ({ isOpen, onClose, onSubmit, mentors, mentees }) => {
  const [formData, setFormData] = useState({
    mentorId: '',
    menteeId: '',
    startDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.mentorId) {
      newErrors.mentorId = 'Please select a mentor';
    }

    if (!formData.menteeId) {
      newErrors.menteeId = 'Please select a mentee';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.startDate = 'Cannot set start date in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <MobileModal isOpen={isOpen} onClose={onClose} title="Add New Mentor-Mentee Pair">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <select
            value={formData.mentorId}
            onChange={(e) => setFormData({ ...formData, mentorId: e.target.value })}
            className={`
              w-full h-12 px-4 text-base rounded-md border appearance-none
              ${errors.mentorId ? 'border-red-300' : 'border-gray-300'}
              focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]
              bg-white
            `}
          >
            <option value="">Select a mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.name}
              </option>
            ))}
          </select>
          <label
            className={`
              absolute left-4 top-1/2 -translate-y-1/2 text-sm
              ${errors.mentorId ? 'text-red-500' : 'text-gray-500'}
              transition-all duration-200
              pointer-events-none
              ${formData.mentorId ? '-top-2.5 left-2 text-xs bg-white px-2' : ''}
            `}
          >
            Mentor
          </label>
          {errors.mentorId && (
            <p className="mt-1 text-sm text-red-500">{errors.mentorId}</p>
          )}
        </div>

        <div className="relative">
          <select
            value={formData.menteeId}
            onChange={(e) => setFormData({ ...formData, menteeId: e.target.value })}
            className={`
              w-full h-12 px-4 text-base rounded-md border appearance-none
              ${errors.menteeId ? 'border-red-300' : 'border-gray-300'}
              focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]
              bg-white
            `}
          >
            <option value="">Select a mentee</option>
            {mentees.map((mentee) => (
              <option key={mentee.id} value={mentee.id}>
                {mentee.name}
              </option>
            ))}
          </select>
          <label
            className={`
              absolute left-4 top-1/2 -translate-y-1/2 text-sm
              ${errors.menteeId ? 'text-red-500' : 'text-gray-500'}
              transition-all duration-200
              pointer-events-none
              ${formData.menteeId ? '-top-2.5 left-2 text-xs bg-white px-2' : ''}
            `}
          >
            Mentee
          </label>
          {errors.menteeId && (
            <p className="mt-1 text-sm text-red-500">{errors.menteeId}</p>
          )}
        </div>

        <MobileInput
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          error={errors.startDate}
          min={new Date().toISOString().split('T')[0]}
        />

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--wise-orange)] border border-transparent rounded-md hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
          >
            Add Pair
          </button>
        </div>
      </form>
    </MobileModal>
  );
};

export default AddPairModal; 