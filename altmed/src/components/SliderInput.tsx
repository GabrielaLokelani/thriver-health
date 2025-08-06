import React from 'react';

interface SliderInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  className?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  name,
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  showValue = true,
  className = ''
}) => {
  const getValueLabel = (val: number) => {
    if (val <= 2) return 'Very Low';
    if (val <= 4) return 'Low';
    if (val <= 6) return 'Moderate';
    if (val <= 8) return 'High';
    return 'Very High';
  };

  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <label htmlFor={name} className="block text-base font-medium text-sage-700">
          {label}
        </label>
        {showValue && (
          <span className="text-base font-medium text-lavender-600">
            {value} - {getValueLabel(value)}
          </span>
        )}
      </div>
      <input
        id={name}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-sage-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-sm text-sage-500 mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default SliderInput; 