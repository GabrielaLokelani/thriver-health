import React, { useState } from 'react';
import { Goal, GoalCategory } from '../../types/goal';
import FormField, { Input, Select, Textarea } from '../common/FormField';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface GoalFormProps {
  initialData?: Partial<Goal>;
  onSubmit: (goal: Partial<Goal>) => void;
  onCancel: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Goal>>({
    title: '',
    description: '',
    category: 'academic',
    deadline: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const deadline = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadline < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {initialData.id ? 'Edit Goal' : 'Create New Goal'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors duration-200"
          title="Close form"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <FormField
        label="Title"
        id="title"
        required
        error={errors.title}
      >
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          placeholder="Enter goal title"
          className="focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]"
        />
      </FormField>

      <FormField
        label="Description"
        id="description"
        required
        error={errors.description}
        helper="Provide a detailed description of your goal"
      >
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
          placeholder="Enter goal description"
          rows={4}
          className="focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Category"
          id="category"
          required
        >
          <Select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as GoalCategory })}
            className="focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]"
          >
            <option value="academic">Academic</option>
            <option value="career">Career</option>
            <option value="personal">Personal</option>
            <option value="professional">Professional</option>
          </Select>
        </FormField>

        <FormField
          label="Deadline"
          id="deadline"
          required
          error={errors.deadline}
        >
          <Input
            type="date"
            id="deadline"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            error={errors.deadline}
            min={new Date().toISOString().split('T')[0]}
            className="focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]"
          />
        </FormField>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[var(--wise-orange)] border border-transparent rounded-md shadow-sm hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
        >
          {initialData.id ? 'Update Goal' : 'Create Goal'}
        </button>
      </div>
    </form>
  );
};

export default GoalForm; 