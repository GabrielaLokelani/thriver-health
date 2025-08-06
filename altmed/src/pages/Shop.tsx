import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Clock, 
  Search, 
  Package,
  Leaf,
  Sparkles,
  Droplets,
  Zap,
  BookOpen
} from 'lucide-react';
import PlaceholderImage from '../components/PlaceholderImage';

interface ShopItem {
  id: string;
  title: string;
  provider?: string;
  description: string;
  duration?: string;
  type?: string;
  price: number;
  rating: number;
  reviews: number;
  benefits: string[];
  category: 'consultation' | 'test' | 'product' | 'session' | 'coaching';
  icon: React.ReactNode;
  imageCategory: string;
  isFavorite?: boolean;
}

const shopItems: ShopItem[] = [
  {
    id: '1',
    title: 'Nutrition Consultation',
    provider: 'Dr. James Wilson, Nutritionist',
    description: 'Comprehensive nutrition assessment and personalized meal planning.',
    duration: '90 minutes',
    price: 120,
    rating: 4.6,
    reviews: 203,
    benefits: ['Personalized meal plan', 'Health optimization', 'Lifestyle guidance'],
    category: 'consultation',
    icon: <Leaf className="w-6 h-6 text-green-600" />,
    imageCategory: 'wellness'
  },
  {
    id: '2',
    title: 'Gut Microbiome Test',
    description: 'Comprehensive analysis of your gut bacteria for optimal health insights.',
    type: 'At-home kit',
    price: 199,
    rating: 4.5,
    reviews: 67,
    benefits: ['Detailed analysis', 'Personalized recommendations', 'Health insights'],
    category: 'test',
    icon: <Package className="w-6 h-6 text-gray-600" />,
    imageCategory: 'treatment'
  },
  {
    id: '3',
    title: 'Acupuncture Session',
    provider: 'Dr. Lisa Park, Acupuncturist',
    description: 'Traditional Chinese medicine acupuncture for pain relief and wellness.',
    duration: '60 minutes',
    price: 95,
    rating: 4.8,
    reviews: 234,
    benefits: ['Pain relief', 'Energy flow', 'Stress reduction'],
    category: 'session',
    icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
    imageCategory: 'treatment'
  },
  {
    id: '4',
    title: 'Meditation Coaching',
    provider: 'David Kumar, Meditation Teacher',
    description: 'One-on-one meditation coaching to develop a consistent practice.',
    duration: '45 minutes',
    price: 65,
    rating: 4.7,
    reviews: 98,
    benefits: ['Personalized guidance', 'Technique mastery', 'Ongoing support'],
    category: 'coaching',
    icon: <BookOpen className="w-6 h-6 text-red-600" />,
    imageCategory: 'meditation'
  },
  {
    id: '5',
    title: 'Essential Oil Consultation',
    provider: 'Maria Santos, Aromatherapist',
    description: 'Custom essential oil blend creation for your specific wellness needs.',
    duration: '45 minutes',
    price: 55,
    rating: 4.6,
    reviews: 145,
    benefits: ['Custom blend', 'Natural remedies', 'Usage guidance'],
    category: 'consultation',
    icon: <Droplets className="w-6 h-6 text-green-600" />,
    imageCategory: 'herbs'
  },
  {
    id: '6',
    title: 'Herbal Medicine Kit',
    description: 'Complete herbal medicine starter kit with 20 essential herbs and guide.',
    type: 'Product kit',
    price: 89,
    rating: 4.4,
    reviews: 156,
    benefits: ['20 essential herbs', 'Detailed guide', 'Storage containers'],
    category: 'product',
    icon: <Leaf className="w-6 h-6 text-green-600" />,
    imageCategory: 'herbs'
  },
  {
    id: '7',
    title: 'Energy Healing Session',
    provider: 'Sarah Chen, Energy Healer',
    description: 'Reiki and energy healing session for balance and vitality.',
    duration: '75 minutes',
    price: 85,
    rating: 4.9,
    reviews: 187,
    benefits: ['Energy balance', 'Stress relief', 'Vitality boost'],
    category: 'session',
    icon: <Zap className="w-6 h-6 text-purple-600" />,
    imageCategory: 'wellness'
  },
  {
    id: '8',
    title: 'Crystal Healing Set',
    description: 'Premium crystal collection with healing guide and meditation practices.',
    type: 'Product set',
    price: 145,
    rating: 4.3,
    reviews: 92,
    benefits: ['7 healing crystals', 'Meditation guide', 'Cleansing kit'],
    category: 'product',
    icon: <Sparkles className="w-6 h-6 text-purple-600" />,
    imageCategory: 'crystals'
  }
];

const categories = [
  { id: 'all', label: 'All', count: shopItems.length },
  { id: 'consultation', label: 'Consultations', count: shopItems.filter(item => item.category === 'consultation').length },
  { id: 'test', label: 'Tests', count: shopItems.filter(item => item.category === 'test').length },
  { id: 'product', label: 'Products', count: shopItems.filter(item => item.category === 'product').length },
  { id: 'session', label: 'Sessions', count: shopItems.filter(item => item.category === 'session').length },
  { id: 'coaching', label: 'Coaching', count: shopItems.filter(item => item.category === 'coaching').length }
];

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredItems = shopItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.provider && item.provider.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-nature">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-sage-900 mb-4"
            >
              Verified Treatment Suppliers
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-sage-600 max-w-2xl mx-auto"
            >
              Direct access to verified suppliers and providers of alternative therapies. Support thought leaders like Dr. Makis and earn rewards through our referral program.
            </motion.p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative flex-1 max-w-md"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" size={20} />
              <input
                type="text"
                placeholder="Search services, products, or practitioners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-lavender-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm text-sage-700 hover:bg-white hover:text-sage-900 shadow-md hover:shadow-lg'
                  }`}
                >
                  {category.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeCategory === category.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-lavender-100 text-lavender-700'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-sage-600">
            Showing {filteredItems.length} of {shopItems.length} items
          </p>
        </motion.div>

        {/* Shop Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="modern-card p-8 hover-lift group"
            >
              {/* Item Image */}
              <div className="mb-8">
                <PlaceholderImage 
                  category={item.imageCategory as any} 
                  size="medium" 
                  className="w-full"
                  alt={item.title}
                />
              </div>

              {/* Header with Favorite Button */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <h3 className="text-lg font-semibold text-sage-900 group-hover:text-lavender-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    favorites.includes(item.id)
                      ? 'text-rose-500 hover:text-rose-600'
                      : 'text-sage-400 hover:text-rose-500'
                  }`}
                >
                  <Heart 
                    size={20} 
                    fill={favorites.includes(item.id) ? 'currentColor' : 'none'} 
                  />
                </button>
              </div>

              {/* Provider */}
              {item.provider && (
                <p className="text-base text-lavender-600 font-medium mb-4">
                  {item.provider}
                </p>
              )}

              {/* Description */}
              <p className="text-sage-600 text-base mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Duration/Type */}
              <div className="flex items-center text-base text-sage-500 mb-6">
                <Clock size={18} className="mr-3" />
                {item.duration || item.type}
              </div>

              {/* Price and Rating */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold text-lavender-600">
                  ${item.price}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-sm text-sage-600">
                    ({item.reviews})
                  </span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-sage-700 mb-4">Benefits:</h4>
                <ul className="space-y-3">
                  {item.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-base text-sage-600 flex items-center">
                      <div className="w-2 h-2 bg-lavender-500 rounded-full mr-3 flex-shrink-0"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-gradient-to-r from-lavender-500 to-rose-500 hover:from-lavender-600 hover:to-rose-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Book Now
                </button>
                <button className="flex-1 bg-white/80 backdrop-blur-sm text-lavender-600 hover:text-lavender-700 font-medium py-3 px-4 rounded-xl border border-lavender-200 hover:border-lavender-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-sage-400" />
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">
              No items found
            </h3>
            <p className="text-sage-600">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop; 