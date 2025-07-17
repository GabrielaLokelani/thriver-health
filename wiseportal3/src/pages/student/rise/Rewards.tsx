import React from 'react';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
  category: string;
}

const Rewards: React.FC = () => {
  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Soccer Training Session',
      description: 'One-on-one training session with a professional soccer player',
      points: 1000,
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974',
      category: 'Training'
    },
    {
      id: '2',
      title: 'Premium Soccer Kit',
      description: 'Complete soccer kit including jersey, shorts, and socks',
      points: 750,
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974',
      category: 'Equipment'
    },
    {
      id: '3',
      title: 'Match Tickets',
      description: 'Two tickets to a professional soccer match',
      points: 500,
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974',
      category: 'Experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--wise-blue-light)] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/risexshine/risexshinelogo.png" 
              alt="Rise x Shine Logo" 
              className="h-20 w-auto"
            />
          </div>
          <p className="text-xl text-gray-600 mb-2">Earn points and redeem exciting rewards</p>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[var(--wise-orange)] text-white px-3 py-1 rounded-full text-sm">
                  {reward.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--wise-orange)] font-semibold">{reward.points} points</span>
                  <button
                    className="bg-[var(--wise-orange)] text-white px-4 py-2 rounded-lg hover:bg-[var(--wise-orange-dark)] transition-colors"
                    onClick={() => {/* Handle reward redemption */}}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Title Image */}
        <div className="flex justify-center mt-16 mb-16">
          <img 
            src="/images/risexshine/risexshinetitle.png" 
            alt="Rise x Shine Title" 
            className="w-auto h-[480px] opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default Rewards; 