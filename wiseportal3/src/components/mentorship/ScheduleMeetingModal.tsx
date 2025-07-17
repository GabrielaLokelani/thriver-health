import React, { useState } from 'react';
import MobileModal from '../common/MobileModal';
import FormField, { Input, Textarea } from '../common/FormField';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (meeting: { date: string; time: string; topic: string }) => void;
}

const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    topic: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Cannot schedule meetings in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.topic) {
      newErrors.topic = 'Topic is required';
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
    <MobileModal isOpen={isOpen} onClose={onClose} title="Schedule Meeting">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Date"
            id="date"
            required
            error={errors.date}
            helper="Select a future date for the meeting"
          >
            <Input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              error={errors.date}
              min={new Date().toISOString().split('T')[0]}
            />
          </FormField>

          <FormField
            label="Time"
            id="time"
            required
            error={errors.time}
            helper="Select a time for the meeting"
          >
            <Input
              type="time"
              id="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              error={errors.time}
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField
              label="Topic"
              id="topic"
              required
              error={errors.topic}
              helper="Briefly describe what you'd like to discuss"
            >
              <Textarea
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                error={errors.topic}
                placeholder="Enter meeting topic"
                rows={3}
              />
            </FormField>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--wise-orange)] border border-transparent rounded-md shadow-sm hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
          >
            Schedule
          </button>
        </div>
      </form>
    </MobileModal>
  );
};

export default ScheduleMeetingModal; 