import React, { forwardRef } from 'react';

interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          {...props}
          className={`
            w-full h-12 px-4 text-base rounded-md border
            ${error ? 'border-red-300' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]
            placeholder-transparent
            ${className}
          `}
          placeholder=" "
        />
        <label
          className={`
            absolute left-4 top-1/2 -translate-y-1/2 text-sm
            ${error ? 'text-red-500' : 'text-gray-500'}
            transition-all duration-200
            pointer-events-none
            ${props.value ? '-top-2.5 left-2 text-xs bg-white px-2' : ''}
          `}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

MobileInput.displayName = 'MobileInput';

export default MobileInput; 