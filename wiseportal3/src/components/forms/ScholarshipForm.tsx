import React, { useState } from 'react';
import FormContainer from '../common/FormContainer';
import FormField, { Input, Select, Textarea } from '../common/FormField';
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export interface ScholarshipFormData {
  name: string;
  organization: string;
  type: 'academic' | 'need-based' | 'merit' | 'athletic';
  description: string;
  amount: number;
  requirements: {
    minGPA?: number;
    minGrade?: number;
    requiredDocuments: string[];
    eligibilityCriteria: string[];
  };
  deadline: string;
  status: 'active' | 'pending' | 'archived';
  createdAt?: string;
}

interface ScholarshipFormProps {
  onSubmit: (data: ScholarshipFormData) => void;
  onCancel: () => void;
  initialData?: ScholarshipFormData | null;
  organizations: Array<{ id: string; name: string }>;
}

export const ScholarshipForm: React.FC<ScholarshipFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  organizations,
}) => {
  const [formData, setFormData] = useState<ScholarshipFormData>(
    initialData || {
      name: '',
      organization: '',
      type: 'academic',
      description: '',
      amount: 0,
      requirements: {
        minGPA: 3.0,
        minGrade: 70,
        requiredDocuments: [],
        eligibilityCriteria: [],
      },
      deadline: '',
      status: 'pending',
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof ScholarshipFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ScholarshipFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Scholarship name is required';
    }

    if (!formData.organization) {
      newErrors.organization = 'Organization is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ScholarshipFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleRequirementChange = (field: keyof ScholarshipFormData['requirements'], value: any) => {
    setFormData(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [field]: value,
      },
    }));
  };

  const addDocument = () => {
    const newDocument = prompt('Enter required document:');
    if (newDocument) {
      handleRequirementChange('requiredDocuments', [...formData.requirements.requiredDocuments, newDocument]);
    }
  };

  const removeDocument = (index: number) => {
    handleRequirementChange(
      'requiredDocuments',
      formData.requirements.requiredDocuments.filter((_, i) => i !== index)
    );
  };

  const addCriterion = () => {
    const newCriterion = prompt('Enter eligibility criterion:');
    if (newCriterion) {
      handleRequirementChange('eligibilityCriteria', [...formData.requirements.eligibilityCriteria, newCriterion]);
    }
  };

  const removeCriterion = (index: number) => {
    handleRequirementChange(
      'eligibilityCriteria',
      formData.requirements.eligibilityCriteria.filter((_, i) => i !== index)
    );
  };

  return (
    <FormContainer 
      title={initialData ? 'Edit Scholarship' : 'Create New Scholarship'}
      showBackButton={false}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Scholarship Name"
            id="name"
            required
            error={errors.name}
          >
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter scholarship name"
            />
          </FormField>

          <FormField
            label="Organization"
            id="organization"
            required
            error={errors.organization}
          >
            <Select
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              error={errors.organization}
            >
              <option value="">Select an organization</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField
            label="Scholarship Type"
            id="type"
          >
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="academic">Academic</option>
              <option value="need-based">Need-Based</option>
              <option value="merit">Merit</option>
              <option value="athletic">Athletic</option>
            </Select>
          </FormField>

          <FormField
            label="Amount"
            id="amount"
            required
            error={errors.amount}
          >
            <Input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              error={errors.amount}
              min="0"
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField
              label="Description"
              id="description"
              required
              error={errors.description}
              helper="Provide a detailed description of the scholarship"
            >
              <Textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                placeholder="Enter scholarship description"
              />
            </FormField>
          </div>

          <FormField
            label="Application Deadline"
            id="deadline"
            required
            error={errors.deadline}
          >
            <Input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              error={errors.deadline}
            />
          </FormField>

          <FormField
            label="Minimum GPA"
            id="minGPA"
            helper="Enter a value between 0.0 and 4.0"
          >
            <Input
              type="number"
              id="minGPA"
              name="minGPA"
              value={formData.requirements.minGPA}
              onChange={e => handleRequirementChange('minGPA', Number(e.target.value))}
              step="0.1"
              min="0"
              max="4.0"
            />
          </FormField>

          <FormField
            label="Minimum Grade"
            id="minGrade"
            helper="Enter a value between 0 and 100"
          >
            <Input
              type="number"
              id="minGrade"
              name="minGrade"
              value={formData.requirements.minGrade}
              onChange={e => handleRequirementChange('minGrade', Number(e.target.value))}
              min="0"
              max="100"
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField
              label="Required Documents"
              id="requiredDocuments"
              helper="Add all required documents for this scholarship"
            >
              <div className="mt-2 space-y-2">
                {formData.requirements.requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <span className="text-sm text-gray-900">{doc}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDocument}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  <PlusCircleIcon className="w-5 h-5 mr-1" />
                  Add Document
                </button>
              </div>
            </FormField>
          </div>

          <div className="md:col-span-2">
            <FormField
              label="Eligibility Criteria"
              id="eligibilityCriteria"
              helper="Add all eligibility requirements for this scholarship"
            >
              <div className="mt-2 space-y-2">
                {formData.requirements.eligibilityCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <span className="text-sm text-gray-900">{criterion}</span>
                    <button
                      type="button"
                      onClick={() => removeCriterion(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCriterion}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  <PlusCircleIcon className="w-5 h-5 mr-1" />
                  Add Criterion
                </button>
              </div>
            </FormField>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {initialData ? 'Update Scholarship' : 'Create Scholarship'}
          </button>
        </div>
      </form>
    </FormContainer>
  );
}; 