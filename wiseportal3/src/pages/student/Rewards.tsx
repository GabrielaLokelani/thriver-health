import { ClockIcon, GiftIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
  available: boolean;
}

interface ClaimedReward extends Reward {
  claimedDate: string;
  status: 'pending' | 'approved' | 'shipped' | 'delivered';
}

const Rewards: React.FC = () => {
  // Dummy data for rewards
  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Amazon Gift Card',
      description: '$25 Amazon Gift Card',
      points: 2500,
      image: 'https://picsum.photos/200',
      available: true
    },
    {
      id: '2',
      title: 'WISE Portal Merch',
      description: 'Custom WISE Portal T-shirt',
      points: 1500,
      image: 'https://picsum.photos/200',
      available: true
    },
    {
      id: '3',
      title: 'Premium Subscription',
      description: '1 Month Premium Access',
      points: 3000,
      image: 'https://picsum.photos/200',
      available: true
    },
    {
      id: '4',
      title: 'Mentorship Session',
      description: '1-hour session with a professional mentor',
      points: 5000,
      image: 'https://picsum.photos/200',
      available: true
    },
    {
      id: '5',
      title: 'Study Materials Bundle',
      description: 'Premium study materials and resources',
      points: 2000,
      image: 'https://picsum.photos/200',
      available: false
    },
    {
      id: '6',
      title: 'Career Coaching',
      description: 'Personal career coaching session',
      points: 4000,
      image: 'https://picsum.photos/200',
      available: true
    }
  ];

  // Dummy data for claimed rewards
  const claimedRewards: ClaimedReward[] = [
    {
      ...rewards[0],
      claimedDate: '2024-03-15',
      status: 'delivered'
    },
    {
      ...rewards[1],
      claimedDate: '2024-03-10',
      status: 'shipped'
    },
    {
      ...rewards[2],
      claimedDate: '2024-03-05',
      status: 'pending'
    }
  ];

  const userPoints = 3500;

  const getStatusColor = (status: ClaimedReward['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'approved':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Rewards Center</h1>
          <p className="mt-2 text-sm text-gray-600">Redeem your points for exclusive rewards</p>
        </div>

        {/* Points Balance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Points Balance</h2>
              <p className="text-sm text-gray-600">Use your points to claim rewards</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary-600">{userPoints}</span>
              <span className="text-sm text-gray-600 ml-2">points</span>
            </div>
          </div>
        </div>

        {/* Rewards Store */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Rewards Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-600">{reward.points} points</span>
                    <button
                      disabled={!reward.available || userPoints < reward.points}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        reward.available && userPoints >= reward.points
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {!reward.available ? 'Out of Stock' : userPoints < reward.points ? 'Not Enough Points' : 'Redeem'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claimed Rewards */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Claimed Rewards</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {claimedRewards.map((reward) => (
                <div key={reward.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <GiftIcon className="w-8 h-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{reward.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <ClockIcon className="w-4 h-4" />
                          <span>Claimed on {new Date(reward.claimedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reward.status)}`}>
                      {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards; 