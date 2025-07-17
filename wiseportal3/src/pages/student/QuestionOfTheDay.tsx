import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface Option {
  id: string;
  text: string;
}

const QuestionOfTheDay: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: Option[] = [
    { id: 'always', text: 'Always' },
    { id: 'usually', text: 'Usually' },
    { id: 'sometimes', text: 'Sometimes' },
    { id: 'never', text: 'Never' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Question of the Day!</h1>
        <p className="text-gray-600">Solve the question of the day.</p>
      </div>

      <div className="bg-[var(--wise-yellow-light)] rounded-lg p-8 shadow-sm">
        <div className="space-y-6">
          <p className="text-lg font-medium text-gray-900">
            I will reread a section if I don't understand.
          </p>

          <RadioGroup value={selectedOption} onChange={setSelectedOption}>
            <div className="space-y-4">
              {options.map((option) => (
                <RadioGroup.Option
                  key={option.id}
                  value={option.id}
                  className={({ checked }) => `
                    relative flex cursor-pointer rounded-lg px-5 py-4 
                    ${checked 
                      ? 'bg-white ring-2 ring-[var(--wise-orange)]' 
                      : 'bg-white hover:bg-gray-50'
                    }
                  `}
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium ${
                                checked ? 'text-[var(--wise-orange)]' : 'text-gray-900'
                              }`}
                            >
                              {option.text}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-[var(--wise-orange)]">
                            <CheckCircleIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                // Handle sending the answer
              }}
              className="btn-primary px-8"
            >
              Send
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => {}}
              className="px-8 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Come back later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionOfTheDay; 