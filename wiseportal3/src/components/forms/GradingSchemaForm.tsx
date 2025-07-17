import React, { useState } from 'react';

interface GradingSchema {
  type: 'percentage' | 'gpa' | 'letter';
  min: number;
  max: number;
  passingGrade: number;
}

interface GradingSchemaFormProps {
  initialData?: GradingSchema;
  onChange: (schema: GradingSchema) => void;
}

export const GradingSchemaForm: React.FC<GradingSchemaFormProps> = ({
  initialData,
  onChange,
}) => {
  const [schema, setSchema] = useState<GradingSchema>(
    initialData || {
      type: 'percentage',
      min: 0,
      max: 100,
      passingGrade: 60,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newSchema = {
      ...schema,
      [name]: name === 'type' ? value : Number(value),
    };
    setSchema(newSchema);
    onChange(newSchema);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Grading Type
        </label>
        <select
          id="type"
          name="type"
          value={schema.type}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="percentage">Percentage</option>
          <option value="gpa">GPA</option>
          <option value="letter">Letter Grade</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="min" className="block text-sm font-medium text-gray-700">
            Minimum Grade
          </label>
          <input
            type="number"
            id="min"
            name="min"
            value={schema.min}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="max" className="block text-sm font-medium text-gray-700">
            Maximum Grade
          </label>
          <input
            type="number"
            id="max"
            name="max"
            value={schema.max}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="passingGrade" className="block text-sm font-medium text-gray-700">
            Passing Grade
          </label>
          <input
            type="number"
            id="passingGrade"
            name="passingGrade"
            value={schema.passingGrade}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}; 