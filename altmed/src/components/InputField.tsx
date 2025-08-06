import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={name} className="block text-base font-medium text-sage-700 mb-3">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input-field text-base ${error ? 'border-rose-300 focus:ring-rose-500' : ''}`}
        required={required}
      />
      {error && (
        <p className="mt-2 text-sm text-rose-600 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField; 