import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  rating: number;
  date: string;
  status: 'pending' | 'submitted';
}

const Feedback: React.FC = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([
    {
      id: '1',
      title: 'Program Experience',
      description: 'Share your experience with the WISE program so far.',
      rating: 0,
      date: '2024-03-15',
      status: 'pending',
    },
  ]);

  const handleRatingChange = (itemId: string, rating: number) => {
    setFeedbackItems(
      feedbackItems.map((item) =>
        item.id === itemId ? { ...item, rating } : item
      )
    );
  };

  const handleSubmit = (itemId: string) => {
    setFeedbackItems(
      feedbackItems.map((item) =>
        item.id === itemId ? { ...item, status: 'submitted' } : item
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Feedback</h1>

        <div className="space-y-6">
          {feedbackItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-6 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'submitted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {item.status === 'submitted' ? 'Submitted' : 'Pending'}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(item.id, rating)}
                      className={`focus:outline-none ${
                        rating <= item.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      <StarIcon className="h-6 w-6" />
                    </button>
                  ))}
                </div>
              </div>

              {item.status === 'pending' && (
                <div className="mt-4">
                  <button
                    onClick={() => handleSubmit(item.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Submit Feedback
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback; 